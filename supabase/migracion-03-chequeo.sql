-- =====================================================================
-- MIGRACIÓN 03 — el chequeo INTEGRA entra al mismo circuito que la newsletter
-- ---------------------------------------------------------------------
-- YA APLICADA el 2026-09-28 en el proyecto qiucglxylkidfpwbuibb
-- (migración `leads_chequeo_integra`). Queda acá como registro. Se puede
-- volver a correr: todo es create or replace / if not exists.
--
-- QUÉ HACE
--
-- 1. Arregla `registrar_lead`. La tabla se renombró de `leads` a
--    `newsletter-prospects` y la función siguió escribiendo en la vieja:
--    newsletter y recursos fallaban con 42P01 desde el renombre.
--
-- 2. Suma a `newsletter-prospects` tres columnas que sólo usa el chequeo:
--    nombre, empresa y datos (jsonb con el informe y las UTM). Newsletter
--    y recursos las dejan vacías.
--
-- 3. Crea `registrar_chequeo`: guarda con origen 'chequeo'. Como la tabla
--    es única por (email, origen), si la persona repite el chequeo se
--    actualiza su fila con el último informe y suma un pedido.
--
-- 4. Separa los webhooks por origen:
--      newsletter / guias-y-materiales → n8n "INTEGRA - Newsletter + Recursos gratuitos"
--      chequeo                         → n8n "INTEGRA - Chequeo con informe por mail"
--    Van como triggers SQL (no desde el panel de Database Webhooks) porque
--    el panel no deja filtrar por columna.
-- =====================================================================

-- 1) registrar_lead apunta a la tabla real.
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
        ultimo_pedido = now()
  returning (xmax = 0) into v_nuevo;

  return case when v_nuevo then 'nuevo' else 'repetido' end;
end;
$$;

-- 2) Columnas del chequeo.
alter table public."newsletter-prospects"
  add column if not exists nombre  text  not null default '',
  add column if not exists empresa text  not null default '',
  add column if not exists datos   jsonb not null default '{}'::jsonb;

-- 3) Registro del chequeo.
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
  v_nuevo boolean;
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

  insert into public."newsletter-prospects" as l (email, origen, nombre, empresa, datos)
  values (v_email, 'chequeo', trim(p_nombre), trim(coalesce(p_empresa, '')), v_datos)
  on conflict (email, origen) do update
    set nombre        = excluded.nombre,
        empresa       = excluded.empresa,
        datos         = excluded.datos,
        pedidos       = l.pedidos + 1,
        ultimo_pedido = now()
  returning (xmax = 0) into v_nuevo;

  return case when v_nuevo then 'nuevo' else 'repetido' end;
end;
$$;

revoke all on function public.registrar_chequeo(text, text, text, jsonb, jsonb) from public;
grant execute on function public.registrar_chequeo(text, text, text, jsonb, jsonb) to anon, authenticated;

-- 4) Webhooks por origen. SECRETO_NEWSLETTER y SECRETO_CHEQUEO van
--    reemplazados por los valores reales: son los que validan los filtros
--    "x-webhook-secret" de cada flujo de n8n (nodo "Filter1" en el de
--    newsletter, "Solo si viene de Supabase" en el del chequeo). No se
--    guardan en el repositorio.
drop trigger if exists lead_pedidos_a_n8n on public."newsletter-prospects";
create trigger lead_pedidos_a_n8n
  after insert or update on public."newsletter-prospects"
  for each row
  when (new.origen in ('newsletter', 'guias-y-materiales'))
  execute function supabase_functions.http_request(
    'https://n8n.innerflowai.com/webhook/pablobrunet-landing-newsletter',
    'POST',
    '{"Content-Type":"application/json","x-webhook-secret":"SECRETO_NEWSLETTER"}',
    '{}',
    '5000'
  );

drop trigger if exists chequeo_a_n8n on public."newsletter-prospects";
create trigger chequeo_a_n8n
  after insert or update on public."newsletter-prospects"
  for each row
  when (new.origen = 'chequeo')
  execute function supabase_functions.http_request(
    'https://n8n.innerflowai.com/webhook/pablobrunet-landing-chequeo',
    'POST',
    '{"Content-Type":"application/json","x-webhook-secret":"SECRETO_CHEQUEO"}',
    '{}',
    '5000'
  );

notify pgrst, 'reload schema';
