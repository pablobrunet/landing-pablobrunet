-- =====================================================================
-- MIGRACIÓN 04 — el chequeo deja de pisar datos ajenos
-- ---------------------------------------------------------------------
-- TODAVÍA NO APLICADA. Proyecto: qiucglxylkidfpwbuibb.
-- Se puede correr ya: es compatible con la web de antes y con la nueva.
-- Se puede volver a correr: todo es create or replace / revoke / grant.
--
-- ⚠️ La base es compartida con la plataforma INTEGRA. Esto sólo toca las
-- dos funciones de la landing; nada que empiece con integra_.
--
-- QUÉ HACE
--
-- 1. `registrar_chequeo`: si el correo ya hizo el chequeo, sólo suma un
--    pedido y actualiza ultimo_pedido. Antes también reemplazaba nombre,
--    empresa y datos: cualquiera, sin login, podía pisar el chequeo de otra
--    persona con sólo saber su correo (y con eso cambiarle el nombre en GHL
--    y mandarle un mail con datos inventados, porque n8n arma las dos cosas
--    con lo que hay en la fila).
--
--    Consecuencia buscada: quien repite su propio chequeo ve el resultado
--    nuevo en pantalla, pero por mail le llega el informe del primero (el
--    trigger chequeo_a_n8n sigue disparando en cada UPDATE).
--
-- 2. Las dos funciones devuelven siempre 'ok'. Antes devolvían 'nuevo' o
--    'repetido', y probando correos se podía saber quién está en la lista.
--    Nada lee esa respuesta: la web nunca la usó para mostrar algo distinto.
--
-- 3. Permisos: se los saca a `authenticated` (los usuarios logueados de la
--    plataforma INTEGRA no tienen nada que hacer con estos formularios) y se
--    los da explícitamente a `service_role`, que es el rol de la clave
--    secreta con la que llama ahora el servidor (api/ en el repositorio).
--    `anon` lo conserva hasta la migración 05.
--
-- ANTES DE CORRER: las consultas de control del final, para ver el estado.
-- =====================================================================

-- 1 y 2) registrar_chequeo
create or replace function public.registrar_chequeo(
  p_nombre  text,
  p_email   text,
  p_empresa text,
  p_informe jsonb,
  p_utm     jsonb default '{}'::jsonb
)
returns text
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_email text := lower(trim(p_email));
  v_datos jsonb := jsonb_build_object(
    'informe', coalesce(p_informe, '{}'::jsonb),
    'utm',     coalesce(p_utm, '{}'::jsonb)
  );
begin
  if v_email !~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' or length(v_email) > 254 then
    raise exception 'correo invalido' using errcode = '22023';
  end if;
  if length(trim(coalesce(p_nombre, ''))) = 0
     or length(p_nombre) > 120 or length(coalesce(p_empresa, '')) > 160 then
    raise exception 'nombre o empresa invalidos' using errcode = '22023';
  end if;
  if length(v_datos::text) > 10000 then
    raise exception 'informe demasiado largo' using errcode = '22023';
  end if;

  -- Si el correo ya existe, sólo se cuenta el pedido: nombre, empresa y
  -- datos quedan como los dejó la primera vez.
  insert into public."newsletter-prospects" as l (email, origen, nombre, empresa, datos)
  values (v_email, 'chequeo', trim(p_nombre), trim(coalesce(p_empresa, '')), v_datos)
  on conflict (email, origen) do update
    set pedidos       = l.pedidos + 1,
        ultimo_pedido = now();

  return 'ok';
end;
$$;

-- 2) registrar_lead: misma validación de siempre, misma respuesta para todos.
create or replace function public.registrar_lead(p_email text, p_origen text)
returns text
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_email text := lower(trim(p_email));
begin
  if v_email !~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' or length(v_email) > 254 then
    raise exception 'correo invalido' using errcode = '22023';
  end if;

  if p_origen not in ('newsletter', 'guias-y-materiales') then
    raise exception 'origen invalido' using errcode = '22023';
  end if;

  insert into public."newsletter-prospects" as l (email, origen)
  values (v_email, p_origen)
  on conflict (email, origen) do update
    set pedidos       = l.pedidos + 1,
        ultimo_pedido = now();

  return 'ok';
end;
$$;

-- 3) Permisos. `create or replace` conserva los que ya había.
revoke execute on function public.registrar_chequeo(text, text, text, jsonb, jsonb) from public, authenticated;
revoke execute on function public.registrar_lead(text, text) from public, authenticated;
grant execute on function public.registrar_chequeo(text, text, text, jsonb, jsonb) to service_role;
grant execute on function public.registrar_lead(text, text) to service_role;

notify pgrst, 'reload schema';


-- =====================================================================
-- CONSULTAS DE CONTROL (sólo lectura). Correr antes y después.
-- =====================================================================
--
-- a) Quién puede ejecutar cada función. Después de esta migración:
--    anon = true, authenticated = false, service_role = true.
--    Después de la 05: anon = false.
--
--   select p.oid::regprocedure as funcion,
--          has_function_privilege('anon', p.oid, 'execute')          as anon,
--          has_function_privilege('authenticated', p.oid, 'execute') as authenticated,
--          has_function_privilege('service_role', p.oid, 'execute')  as service_role
--   from pg_proc p join pg_namespace n on n.oid = p.pronamespace
--   where n.nspname = 'public'
--     and p.proname in ('registrar_lead', 'registrar_chequeo', 'registrar_chequeo_integra');
--
-- b) Qué puede hacer cada rol directo sobre la tabla (sin pasar por las
--    funciones). Si `anon` tiene INSERT, la 05 se lo saca.
--
--   select grantee, string_agg(privilege_type, ', ' order by privilege_type) as permisos
--   from information_schema.role_table_grants
--   where table_schema = 'public' and table_name = 'newsletter-prospects'
--   group by grantee;
--
--   select polname, polcmd, polroles::regrole[] as roles
--   from pg_policy where polrelid = 'public."newsletter-prospects"'::regclass;
--
-- c) Cuántas personas repitieron el chequeo (a esas, desde ahora, el mail
--    de un chequeo repetido les llega con el informe del primero).
--
--   select count(*) as chequeos, count(*) filter (where pedidos > 1) as repetidos
--   from public."newsletter-prospects" where origen = 'chequeo';
