/* =====================================================================
   CAPTURA DE CORREOS — configuración compartida
   ---------------------------------------------------------------------
   La newsletter y el desbloqueo de recursos son dos cosas distintas para
   quien navega, pero van a la MISMA tabla de Supabase. Lo que las separa
   es el campo `origen`, que después usás en n8n para decidir qué mandarle
   a cada uno.

   Cada fila es un PEDIDO, no una persona: la tabla es única por
   (email, origen), así que alguien suscripto al newsletter puede pedir las
   guías más adelante y queda registrado como un pedido aparte. Y si repite
   un pedido, se cuenta en lugar de perderse.

   Las credenciales salen de variables de entorno, NO del código:
   así no viajan al repositorio y Vercel las inyecta en el build.

   ⚠️ El prefijo PUBLIC_ es obligatorio en Astro para que la variable llegue
   al navegador. Y sí: la clave queda a la vista en el JS compilado. Es
   correcto — la publishable key está diseñada para eso. Lo que protege la
   tabla es la política RLS de solo-inserción, no el secreto de la clave.

   CLAVE: usá la publishable key (sb_publishable_…). Supabase va a dar de
   baja las anon/service_role a fines de 2026. Se sigue leyendo la variable
   vieja como respaldo, por si el proyecto todavía usa la anterior.
   ===================================================================== */

/** De dónde vino el correo. Se guarda en la columna `origen`. */
export type OrigenLead = "newsletter" | "guias-y-materiales";

/* Se acepta la URL en cualquiera de sus dos formas: el dashboard de Supabase
   muestra tanto la URL del proyecto como la del Data API, y son distintas.
     https://xxxx.supabase.co            ← URL del proyecto
     https://xxxx.supabase.co/rest/v1    ← la del Data API, con la ruta ya puesta
   Si no se recortara la segunda, el endpoint quedaría con /rest/v1 repetido
   y Supabase responde 404 con "PGRST125: Invalid path specified in request URL". */
const url = (import.meta.env.PUBLIC_SUPABASE_URL ?? "")
  .trim()
  .replace(/\/+$/, "") // barra final
  .replace(/\/rest\/v\d+$/, ""); // ruta del Data API, si vino incluida
const clave =
  import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY ?? // respaldo: clave anterior
  "";

export const leads = {
  /* Apunta a la función `registrar_lead`, no a la tabla: la clave pública
     no tiene permiso de escritura sobre `leads`, solo de ejecutar esa
     función. La crea supabase/instalar.sql. */
  endpoint: url ? `${url}/rest/v1/rpc/registrar_lead` : "",
  /* Chequeo INTEGRA: guarda nombre, empresa, las respuestas del quiz y el
     resultado, así que va a su propia tabla y su propia función.
     La crea supabase/integra-chequeo.sql. Si todavía no se corrió, el
     formulario sigue funcionando: muestra el resultado igual y solo se
     pierde el registro (ver scripts/enviarChequeo.ts). */
  endpointChequeo: url ? `${url}/rest/v1/rpc/registrar_chequeo_integra` : "",
  /** Publishable key. Viaja en el header `apikey`, nunca en Authorization. */
  clave,
  /** ¿Está listo para recibir correos? */
  activo: Boolean(url && clave),
};
