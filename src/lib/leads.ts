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

   El navegador NO habla con Supabase. Manda el formulario a nuestra propia
   API (src/pages/api/), que verifica el captcha y llama a la función con
   una clave que nunca llega al navegador. Por eso acá no hay URL ni clave
   de Supabase: no hace falta ninguna variable PUBLIC_ para la base.
   ===================================================================== */

/** De dónde vino el correo. Se guarda en la columna `origen`. */
export type OrigenLead = "newsletter" | "guias-y-materiales";

export const leads = {
  /** Newsletter y recursos → `registrar_lead`. */
  endpoint: "/api/lead",
  /** Autoevaluación de /programa-integra → `registrar_chequeo`. */
  endpointChequeo: "/api/chequeo",
};
