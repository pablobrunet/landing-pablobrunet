/* =====================================================================
   CAPTURA DE CORREOS — configuración compartida
   ---------------------------------------------------------------------
   La newsletter y el desbloqueo de recursos son dos cosas distintas para
   quien navega, pero van a la MISMA tabla de Supabase. Lo que las separa
   es el campo `origen`, que después usás en n8n para decidir qué mandarle
   a cada uno.

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

const url = import.meta.env.PUBLIC_SUPABASE_URL ?? "";
const clave =
  import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY ?? // respaldo: clave anterior
  "";
const tabla = import.meta.env.PUBLIC_SUPABASE_TABLA ?? "leads";

export const leads = {
  /** URL completa del endpoint REST. Vacía si falta configurar el entorno. */
  endpoint: url ? `${url.replace(/\/$/, "")}/rest/v1/${tabla}` : "",
  /** Publishable key. Viaja en el header `apikey`, nunca en Authorization. */
  clave,
  /** ¿Está listo para recibir correos? */
  activo: Boolean(url && clave),
};
