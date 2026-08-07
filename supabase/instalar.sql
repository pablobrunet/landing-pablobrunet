-- =====================================================================
-- INSTALACIÓN COMPLETA — tabla `leads` + función `registrar_lead`
-- ---------------------------------------------------------------------
-- ES EL ÚNICO ARCHIVO QUE HACE FALTA CORRER.
-- Supabase → SQL Editor → pegar todo → Run.
--
-- Funciona con la base vacía, con la tabla a medio migrar o ya al día:
-- cada paso comprueba antes de actuar. Se puede correr las veces que sea.
--
-- QUÉ ARREGLA respecto del estado anterior
--   El error 42P10 "there is no unique or exclusion constraint matching
--   the ON CONFLICT specification" aparece cuando la función existe pero
--   la tabla todavía tiene la restricción vieja (`email` único a secas).
--   El `ON CONFLICT (email, origen)` no encuentra contra qué chocar y
--   Postgres aborta con 400. Los pasos 2 a 4 corrigen eso.
--
-- MODELO: cada fila es UN PEDIDO, no una persona.
--   ana@ejemplo.com | newsletter         | 10 de marzo
--   ana@ejemplo.com | guias-y-materiales | 02 de abril   <- permitido
--   ana@ejemplo.com | newsletter         | 05 de abril   <- suma un pedido
-- =====================================================================


-- ---------------------------------------------------------------------
-- 1) La tabla y sus columnas
--    `pedidos` y `ultimo_pedido` registran los pedidos repetidos: si
--    alguien vuelve a pedir las guías porque perdió el correo, no se
--    pierde el pedido, se cuenta y se actualiza la fecha.
-- ---------------------------------------------------------------------
create table if not exists public.leads (
  id            uuid primary key default gen_random_uuid(),
  email         text not null,
  -- 'newsletter' | 'guias-y-materiales'. Es lo que usás en n8n para
  -- decidir qué mandarle a cada persona.
  origen        text not null default 'desconocido',
  creado_en     timestamptz not null default now(),
  pedidos       int not null default 1,
  ultimo_pedido timestamptz not null default now(),

  constraint leads_email_origen_key unique (email, origen)
);

-- Por si la tabla ya existía sin estas columnas.
alter table public.leads
  add column if not exists pedidos       int         not null default 1,
  add column if not exists ultimo_pedido timestamptz not null default now();


-- ---------------------------------------------------------------------
-- 2) Fuera cualquier restricción única sobre (email) SOLA
--    Es la que impedía que una misma persona pidiera dos cosas distintas.
--    No se busca por nombre —puede variar— sino por las columnas que
--    abarca. Los índices NO únicos (los de búsqueda) no se tocan.
-- ---------------------------------------------------------------------
do $$
declare
  r        record;
  v_attnum smallint;
begin
  select attnum into v_attnum
  from pg_attribute
  where attrelid = 'public.leads'::regclass and attname = 'email';

  -- 2a) Restricciones únicas declaradas sobre (email)
  for r in
    select con.conname
    from pg_constraint con
    where con.conrelid = 'public.leads'::regclass
      and con.contype  = 'u'
      and con.conkey   = array[v_attnum]::smallint[]
  loop
    execute format('alter table public.leads drop constraint %I', r.conname);
    raise notice '[2a] Restricción única sobre (email) eliminada: %', r.conname;
  end loop;

  -- 2b) Índices únicos sueltos sobre (email), creados sin constraint
  for r in
    select i.relname as idx
    from pg_index x
    join pg_class i on i.oid = x.indexrelid
    where x.indrelid    = 'public.leads'::regclass
      and x.indisunique
      and x.indnkeyatts = 1
      and x.indkey[0]   = v_attnum
      and not exists (
        select 1 from pg_constraint c where c.conindid = x.indexrelid
      )
  loop
    execute format('drop index public.%I', r.idx);
    raise notice '[2b] Índice único sobre (email) eliminado: %', r.idx;
  end loop;
end $$;


-- ---------------------------------------------------------------------
-- 3) Normalizar los correos ya cargados
--    'Ana@Gmail.com' y 'ana@gmail.com' son la misma persona. Hoy pueden
--    estar como dos filas; hay que juntarlas ANTES de crear la
--    restricción nueva, o el paso 4 falla por duplicados.
--    Se conserva la fila más vieja y se le suman los pedidos.
-- ---------------------------------------------------------------------

-- 3a) Acumular en la fila que se conserva
with agrupado as (
  select (array_agg(id order by creado_en, id))[1] as id_conservado,
         sum(pedidos)::int                         as pedidos_total,
         max(ultimo_pedido)                        as ultimo
  from public.leads
  group by lower(trim(email)), origen
  having count(*) > 1
)
update public.leads l
set pedidos       = a.pedidos_total,
    ultimo_pedido = a.ultimo
from agrupado a
where l.id = a.id_conservado;

-- 3b) Borrar las filas sobrantes (mismo criterio de orden que 3a)
delete from public.leads l
using (
  select id,
         row_number() over (
           partition by lower(trim(email)), origen
           order by creado_en, id
         ) as rn
  from public.leads
) d
where l.id = d.id
  and d.rn > 1;

-- 3c) Ahora sí, pasar todo a minúsculas sin riesgo de colisión
update public.leads
set email = lower(trim(email))
where email <> lower(trim(email));


-- ---------------------------------------------------------------------
-- 4) La restricción que necesita el ON CONFLICT
--    Única por PAR (email, origen). Esto es lo que faltaba.
-- ---------------------------------------------------------------------
do $$
declare
  v_cols smallint[];
begin
  select array_agg(attnum order by attnum) into v_cols
  from pg_attribute
  where attrelid = 'public.leads'::regclass
    and attname in ('email', 'origen');

  if exists (
    select 1
    from pg_constraint con
    where con.conrelid = 'public.leads'::regclass
      and con.contype  = 'u'
      and (select array_agg(k order by k) from unnest(con.conkey) k) = v_cols
  ) then
    raise notice '[4] La restricción única (email, origen) ya estaba. OK.';
  else
    alter table public.leads
      add constraint leads_email_origen_key unique (email, origen);
    raise notice '[4] Restricción única (email, origen) creada.';
  end if;
end $$;

-- Índices de consulta (no únicos)
create index if not exists leads_origen_idx on public.leads (origen);
create index if not exists leads_email_idx  on public.leads (email);


-- ---------------------------------------------------------------------
-- 5) Borrar cualquier versión anterior de la función
--
--    NO ALCANZA con `create or replace`. Postgres se niega a reemplazar
--    una función si cambia el tipo de retorno o el nombre de un
--    parámetro; tira 42P13 "cannot change return type of existing
--    function" y, como el SQL Editor corre todo en una transacción,
--    aborta el script entero y no se aplica NADA. Es exactamente lo que
--    pasaba cuando quedaba dando vueltas una versión previa con
--    `on conflict (email)`.
--
--    Se borran todas las firmas, no solo (text, text), por si quedó
--    alguna sobrecarga de pruebas anteriores.
-- ---------------------------------------------------------------------
do $$
declare
  r record;
begin
  for r in
    select p.oid::regprocedure as firma
    from pg_proc p
    join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public'
      and p.proname = 'registrar_lead'
  loop
    execute format('drop function if exists %s', r.firma);
    raise notice '[5] Versión anterior de la función eliminada: %', r.firma;
  end loop;
end $$;


-- ---------------------------------------------------------------------
-- 6) La función
--    SECURITY DEFINER: corre con los permisos de quien la creó, así la
--    clave pública no necesita ningún permiso sobre la tabla — solo el
--    de ejecutar esto. `search_path` fijo para que nadie pueda
--    redirigirla a un esquema propio.
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
  -- Las validaciones viven acá: no dependen de lo que mande el navegador.
  if v_email !~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' or length(v_email) > 254 then
    raise exception 'correo invalido' using errcode = '22023';
  end if;

  if p_origen not in ('newsletter', 'guias-y-materiales') then
    raise exception 'origen invalido' using errcode = '22023';
  end if;

  insert into public.leads (email, origen)
  values (v_email, p_origen)
  on conflict (email, origen) do update
    set pedidos       = leads.pedidos + 1,
        ultimo_pedido = now()
  -- xmax = 0 solo cuando la fila se insertó de verdad; si se actualizó,
  -- trae el id de la transacción que la bloqueó.
  returning (xmax = 0) into v_nuevo;

  return case when v_nuevo then 'nuevo' else 'repetido' end;
end;
$$;


-- ---------------------------------------------------------------------
-- 7) Permisos y RLS
--    La clave pública (rol `anon`) solo puede ejecutar la función.
--    Sin política de SELECT la tabla es invisible desde afuera: nadie
--    puede leerse la lista de correos aunque tenga la clave.
-- ---------------------------------------------------------------------
alter table public.leads enable row level security;

-- Ya no necesita escribir directo en la tabla: lo hace la función.
drop policy if exists "anon puede insertar" on public.leads;

revoke all on function public.registrar_lead(text, text) from public;
grant execute on function public.registrar_lead(text, text) to anon;

-- Que PostgREST vea la función nueva sin esperar al refresco automático.
notify pgrst, 'reload schema';


-- ---------------------------------------------------------------------
-- REPORTE FINAL
-- Es la última consulta del script, así que su resultado es lo que
-- muestra el SQL Editor al terminar. Las tres filas tienen que decir OK.
-- ---------------------------------------------------------------------
select 'función'      as que,
       coalesce((select pg_get_function_result(p.oid)
                 from pg_proc p
                 join pg_namespace n on n.oid = p.pronamespace
                 where n.nspname = 'public' and p.proname = 'registrar_lead'),
                'NO EXISTE') as detalle,
       case when (select count(*) from pg_proc p
                  join pg_namespace n on n.oid = p.pronamespace
                  where n.nspname = 'public'
                    and p.proname = 'registrar_lead') = 1
            then 'OK' else 'REVISAR' end as estado
union all
select 'restricción única',
       coalesce((select string_agg(a.attname, ', ' order by a.attname)
                 from pg_constraint con
                 join unnest(con.conkey) k on true
                 join pg_attribute a
                   on a.attrelid = con.conrelid and a.attnum = k
                 where con.conrelid = 'public.leads'::regclass
                   and con.contype = 'u'), 'NINGUNA'),
       case when exists (
              select 1 from pg_constraint con
              where con.conrelid = 'public.leads'::regclass
                and con.contype = 'u'
                and (select count(*) from unnest(con.conkey)) = 2)
            then 'OK' else 'REVISAR' end
union all
select 'permiso de anon',
       case when has_function_privilege('anon',
              'public.registrar_lead(text,text)', 'execute')
            then 'puede ejecutar la función' else 'SIN PERMISO' end,
       case when has_function_privilege('anon',
              'public.registrar_lead(text,text)', 'execute')
            then 'OK' else 'REVISAR' end;


-- =====================================================================
-- 8) COMPROBACIÓN — corré esto APARTE, después de que el script termine.
--    (No lo pegues junto con lo de arriba.)
-- ---------------------------------------------------------------------
--   select public.registrar_lead('Prueba@Ejemplo.com', 'guias-y-materiales');
--     -> 'nuevo'     (se guarda en minúsculas)
--   select public.registrar_lead('prueba@ejemplo.com', 'guias-y-materiales');
--     -> 'repetido'  (pedidos pasa a 2, ultimo_pedido se actualiza)
--   select public.registrar_lead('prueba@ejemplo.com', 'newsletter');
--     -> 'nuevo'     (otro origen, fila aparte)
--   select public.registrar_lead('no-es-un-correo', 'newsletter');
--     -> error 'correo invalido'
--
--   select * from public.leads order by creado_en desc;
--   delete from public.leads where email = 'prueba@ejemplo.com';
-- =====================================================================


-- =====================================================================
-- 9) EL WEBHOOK — Supabase → Integrations → Webhooks
--    Tiene que escuchar INSERT **y UPDATE**. Si queda solo en INSERT,
--    los pedidos repetidos no disparan el reenvío, que es justamente lo
--    que arregla este diseño.
--
--    En n8n, para distinguirlos:
--      record.pedidos = 1  -> primera vez
--      record.pedidos > 1  -> lo está pidiendo de nuevo
-- =====================================================================
