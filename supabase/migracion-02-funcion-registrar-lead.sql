-- =====================================================================
-- ⚠️  ARCHIVO HISTÓRICO — NO CORRER
--     Dependía de que la migración 01 se hubiera corrido antes. Si no,
--     creaba la función pero fallaba al usarla con 42P10.
--     `instalar.sql` hace las dos cosas y no depende del orden.
--
--     >>> Para poner la base al día: correr `instalar.sql` <<<
-- =====================================================================

-- =====================================================================
-- MIGRACIÓN 02 — registrar los pedidos con una función, no con INSERT directo
-- ---------------------------------------------------------------------
--
-- QUÉ RESUELVE
--
-- 1. Pedidos repetidos. Si alguien pide las guías de nuevo porque perdió el
--    correo, hoy choca contra el UNIQUE, no pasa nada y no se le reenvía.
--    Ahora se cuenta el pedido y se actualiza la fecha, así el webhook
--    dispara y n8n puede volver a mandarlo.
--
-- 2. Correos que se escriben distinto. Hoy 'Ana@Gmail.com' y 'ana@gmail.com'
--    entran como dos personas. La función los normaliza antes de guardar.
--
-- 3. Permisos. Hoy la clave pública puede insertar filas en la tabla. Con la
--    función se le quita ese permiso: solo puede ejecutar esta función, que
--    controla exactamente qué se escribe. Es MENOS superficie que antes.
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1) Columnas para seguir los pedidos repetidos
-- ---------------------------------------------------------------------
alter table public.leads
  add column if not exists pedidos int not null default 1,
  add column if not exists ultimo_pedido timestamptz not null default now();

-- ---------------------------------------------------------------------
-- 2) Normalizar lo que ya está cargado
--    Si al pasar todo a minúsculas quedaran duplicados, esto los junta
--    quedándose con el más viejo y sumando los pedidos.
-- ---------------------------------------------------------------------
with normalizados as (
  select
    lower(trim(email)) as email_norm,
    origen,
    min(creado_en)     as creado_en,
    max(ultimo_pedido) as ultimo_pedido,
    sum(pedidos)       as pedidos,
    min(id::text)::uuid as id_conservado
  from public.leads
  group by lower(trim(email)), origen
)
, borrados as (
  delete from public.leads l
  using normalizados n
  where lower(trim(l.email)) = n.email_norm
    and l.origen = n.origen
    and l.id <> n.id_conservado
  returning 1
)
update public.leads l
set email         = n.email_norm,
    pedidos       = n.pedidos,
    ultimo_pedido = n.ultimo_pedido
from normalizados n
where l.id = n.id_conservado
  and l.email <> n.email_norm;

-- ---------------------------------------------------------------------
-- 3) La función
--    SECURITY DEFINER: corre con los permisos de quien la creó, así que la
--    clave pública no necesita permiso sobre la tabla. `search_path` fijo
--    para que nadie pueda redirigirla a otro esquema.
-- ---------------------------------------------------------------------
create or replace function public.registrar_lead(p_email text, p_origen text)
returns text
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_email text := lower(trim(p_email));
  v_nuevo boolean;
begin
  -- Validaciones acá adentro: no dependen de lo que mande el navegador.
  if v_email !~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' or length(v_email) > 254 then
    raise exception 'correo invalido' using errcode = '22023';
  end if;

  if p_origen not in ('newsletter', 'guias-y-materiales') then
    raise exception 'origen invalido' using errcode = '22023';
  end if;

  insert into public.leads (email, origen)
  values (v_email, p_origen)
  on conflict (email, origen) do update
    set pedidos       = public.leads.pedidos + 1,
        ultimo_pedido = now()
  -- xmax = 0 solo cuando la fila se insertó; si se actualizó, trae el id
  -- de la transacción que la bloqueó.
  returning (xmax = 0) into v_nuevo;

  return case when v_nuevo then 'nuevo' else 'repetido' end;
end;
$$;

-- ---------------------------------------------------------------------
-- 4) Permisos: la clave pública solo puede ejecutar la función
-- ---------------------------------------------------------------------
revoke all on function public.registrar_lead(text, text) from public;
grant execute on function public.registrar_lead(text, text) to anon;

-- Y ya no necesita escribir directo en la tabla.
drop policy if exists "anon puede insertar" on public.leads;

-- ---------------------------------------------------------------------
-- 5) EL WEBHOOK
--    Acordate de cambiarlo en Database -> Webhooks para que escuche
--    INSERT **y UPDATE**. Si queda solo en INSERT, los pedidos repetidos
--    no van a disparar el reenvío, que es justamente lo que arregla esto.
--
--    En n8n, para distinguirlos:
--      record.pedidos = 1  -> primera vez
--      record.pedidos > 1  -> lo está pidiendo de nuevo
-- ---------------------------------------------------------------------

-- =====================================================================
-- COMPROBACIÓN
--   select public.registrar_lead('Prueba@Ejemplo.com', 'guias-y-materiales');
--     -> 'nuevo'      (y se guarda en minúsculas)
--   select public.registrar_lead('prueba@ejemplo.com', 'guias-y-materiales');
--     -> 'repetido'   (pedidos pasa a 2, ultimo_pedido se actualiza)
--   select public.registrar_lead('prueba@ejemplo.com', 'newsletter');
--     -> 'nuevo'      (otro origen, fila aparte)
--   select public.registrar_lead('no-es-un-correo', 'newsletter');
--     -> error 'correo invalido'
-- =====================================================================
