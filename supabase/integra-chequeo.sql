-- =====================================================================
-- CHEQUEO INTEGRA — tabla `leads_integra` + función de registro
-- ---------------------------------------------------------------------
-- Es el quiz de la landing /integra. Guarda más cosas que el resto de los
-- formularios (nombre, empresa, las seis respuestas y el nivel que dio),
-- así que va a su propia tabla y su propia función.
--
-- POR QUÉ UNA TABLA APARTE Y NO `leads`
--   `leads` guarda un pedido de correo: (email, origen) y poco más. Meterle
--   columnas que solo usa el chequeo la ensucia y obliga a tocar la función
--   `registrar_lead`, que ya está funcionando para newsletter y materiales.
--   Separado, nada de lo que anda hoy se toca.
--
-- CÓMO CORRERLO
--   Supabase → SQL Editor → pegar todo → Run. Se puede correr las veces
--   que sea: cada paso comprueba antes de actuar.
--
-- SI NO SE CORRE
--   La landing sigue andando: el quiz calcula y muestra el resultado
--   igual, y solo se pierde el registro del lead (queda un aviso en la
--   consola del navegador). Ver src/scripts/enviarChequeo.ts.
-- =====================================================================


-- ---------------------------------------------------------------------
-- 1) La tabla
--    Una fila por PERSONA que hizo el chequeo. Si la repite, se actualiza
--    su última respuesta y se cuenta: sirve para ver quién volvió.
-- ---------------------------------------------------------------------
create table if not exists public.leads_integra (
  id             uuid primary key default gen_random_uuid(),
  email          text not null,
  nombre         text not null default '',
  empresa        text not null default '',
  -- Par pregunta → respuesta elegida, tal cual la leyó la persona.
  respuestas     jsonb not null default '{}'::jsonb,
  -- 'Uso disperso' | 'En transición' | 'Con método'
  resultado      text not null default '',
  -- utm_source, utm_medium, utm_campaign, utm_content, utm_term
  utm            jsonb not null default '{}'::jsonb,
  creado_en      timestamptz not null default now(),
  chequeos       int not null default 1,
  ultimo_chequeo timestamptz not null default now(),

  constraint leads_integra_email_key unique (email)
);

create index if not exists leads_integra_creado_idx on public.leads_integra (creado_en desc);
create index if not exists leads_integra_resultado_idx on public.leads_integra (resultado);


-- ---------------------------------------------------------------------
-- 2) Fuera cualquier versión anterior de la función
--    `create or replace` no alcanza: si cambia el tipo de retorno o el
--    nombre de un parámetro, Postgres tira 42P13 y —como el SQL Editor
--    corre todo en una transacción— aborta el script entero.
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
      and p.proname = 'registrar_chequeo_integra'
  loop
    execute format('drop function if exists %s', r.firma);
    raise notice '[2] Versión anterior eliminada: %', r.firma;
  end loop;
end $$;


-- ---------------------------------------------------------------------
-- 3) La función
--    SECURITY DEFINER: corre con los permisos de quien la creó, así la
--    clave pública no necesita ningún permiso sobre la tabla — solo el de
--    ejecutar esto. `search_path` fijo para que nadie pueda redirigirla.
--    Las validaciones viven acá, no en el navegador.
-- ---------------------------------------------------------------------
create or replace function public.registrar_chequeo_integra(
  p_nombre     text,
  p_email      text,
  p_empresa    text,
  p_respuestas jsonb,
  p_resultado  text,
  p_utm        jsonb default '{}'::jsonb
)
returns text
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_email text := lower(trim(p_email));
  v_nuevo boolean;
begin
  if v_email !~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' or length(v_email) > 254 then
    raise exception 'correo invalido' using errcode = '22023';
  end if;

  -- Topes defensivos: nadie necesita mandar más que esto.
  if length(coalesce(p_nombre, '')) > 120 or length(coalesce(p_empresa, '')) > 160 then
    raise exception 'datos demasiado largos' using errcode = '22023';
  end if;

  insert into public.leads_integra (email, nombre, empresa, respuestas, resultado, utm)
  values (
    v_email,
    left(trim(coalesce(p_nombre, '')), 120),
    left(trim(coalesce(p_empresa, '')), 160),
    coalesce(p_respuestas, '{}'::jsonb),
    left(trim(coalesce(p_resultado, '')), 60),
    coalesce(p_utm, '{}'::jsonb)
  )
  on conflict (email) do update
    set nombre         = excluded.nombre,
        empresa        = excluded.empresa,
        respuestas     = excluded.respuestas,
        resultado      = excluded.resultado,
        utm            = case when excluded.utm = '{}'::jsonb
                              then leads_integra.utm else excluded.utm end,
        chequeos       = leads_integra.chequeos + 1,
        ultimo_chequeo = now()
  -- xmax = 0 solo cuando la fila se insertó de verdad.
  returning (xmax = 0) into v_nuevo;

  return case when v_nuevo then 'nuevo' else 'repetido' end;
end;
$$;


-- ---------------------------------------------------------------------
-- 4) Permisos y RLS
--    Sin política de SELECT la tabla es invisible desde afuera: nadie
--    puede leerse los leads aunque tenga la clave pública.
-- ---------------------------------------------------------------------
alter table public.leads_integra enable row level security;

revoke all on function public.registrar_chequeo_integra(text, text, text, jsonb, text, jsonb) from public;
grant execute on function public.registrar_chequeo_integra(text, text, text, jsonb, text, jsonb) to anon;

-- Que PostgREST vea la función nueva sin esperar al refresco automático.
notify pgrst, 'reload schema';


-- ---------------------------------------------------------------------
-- REPORTE FINAL — las dos filas tienen que decir OK.
-- ---------------------------------------------------------------------
select 'función' as que,
       coalesce((select pg_get_function_identity_arguments(p.oid)
                 from pg_proc p
                 join pg_namespace n on n.oid = p.pronamespace
                 where n.nspname = 'public' and p.proname = 'registrar_chequeo_integra'),
                'NO EXISTE') as detalle,
       case when exists (select 1 from pg_proc p
                         join pg_namespace n on n.oid = p.pronamespace
                         where n.nspname = 'public'
                           and p.proname = 'registrar_chequeo_integra')
            then 'OK' else 'REVISAR' end as estado
union all
select 'permiso de anon',
       case when has_function_privilege('anon',
              'public.registrar_chequeo_integra(text,text,text,jsonb,text,jsonb)', 'execute')
            then 'puede ejecutar la función' else 'SIN PERMISO' end,
       case when has_function_privilege('anon',
              'public.registrar_chequeo_integra(text,text,text,jsonb,text,jsonb)', 'execute')
            then 'OK' else 'REVISAR' end;


-- =====================================================================
-- COMPROBACIÓN — corré esto APARTE, después de que el script termine.
-- ---------------------------------------------------------------------
--   select public.registrar_chequeo_integra(
--     'Ana', 'Prueba@Ejemplo.com', 'ACME SA',
--     '{"uso":"Varios, sin coordinación"}'::jsonb, 'En transición');
--     -> 'nuevo'
--   select * from public.leads_integra order by creado_en desc;
--   delete from public.leads_integra where email = 'prueba@ejemplo.com';
-- =====================================================================
