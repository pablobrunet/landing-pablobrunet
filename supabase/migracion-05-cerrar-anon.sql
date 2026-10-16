-- =====================================================================
-- MIGRACIÓN 05 — las funciones sólo se llaman desde el servidor
-- ---------------------------------------------------------------------
-- APLICADA el 2026-10-16 en el proyecto qiucglxylkidfpwbuibb
-- (migración `landing_cerrar_anon_formularios`).
--
-- ⚠️ CORRER RECIÉN CUANDO la web nueva esté publicada y probada: los
-- formularios tienen que estar mandando a /api/lead y /api/chequeo, y en
-- Vercel tienen que estar SUPABASE_URL y SUPABASE_SECRET_KEY. Si se corre
-- antes, la web vieja deja de guardar correos.
--
-- ⚠️ La base es compartida con la plataforma INTEGRA. Esto sólo toca las
-- dos funciones de la landing y su tabla.
--
-- QUÉ HACE
--
-- Le saca a `anon` (la clave pública) el permiso de ejecutar las dos
-- funciones y de escribir directo en la tabla. Desde acá, la única forma
-- de cargar un lead es pasar por la API del sitio, que verifica el captcha
-- y está detrás del límite por IP del firewall de Vercel.
--
-- No toca lo que puede hacer `authenticated` sobre la tabla: si algún
-- panel de la plataforma INTEGRA la lee, se rompería. Revisar la consulta
-- de control (b) de la migración 04 antes de decidir algo ahí.
-- =====================================================================

revoke execute on function public.registrar_lead(text, text) from anon;
revoke execute on function public.registrar_chequeo(text, text, text, jsonb, jsonb) from anon;

revoke insert, update, delete, truncate on public."newsletter-prospects" from anon;

notify pgrst, 'reload schema';

-- Después: volver a correr la consulta de control (a) de la migración 04.
-- anon y authenticated tienen que dar false en las dos funciones.
--
-- Prueba desde afuera (tiene que fallar con 401 o 403 y code 42501):
--
--   curl -i -X POST "https://qiucglxylkidfpwbuibb.supabase.co/rest/v1/rpc/registrar_lead" \
--     -H "apikey: <PUBLISHABLE_KEY>" -H "Content-Type: application/json" \
--     -d '{"p_email":"prueba@ejemplo.com","p_origen":"newsletter"}'
