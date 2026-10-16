/* =====================================================================
   ENVÍO DE UN CORREO — lógica compartida por los formularios
   ---------------------------------------------------------------------
   Se importa desde el <script> de Newsletter.astro, LeadMagnet.astro y la
   página /newsletter, así la lógica vive en un solo lugar.

   No habla con Supabase: pide un token al captcha y manda todo a
   /api/lead (src/pages/api/lead.ts). Esa ruta verifica el captcha y llama
   a la función `registrar_lead`, que valida, normaliza el correo y decide
   si es un alta o un pedido repetido.

   La respuesta es la misma sea un correo nuevo o uno que ya estaba: el
   formulario muestra "quedaste anotado" en los dos casos.
   ===================================================================== */

/**
 * Registra el pedido. Lanza un error si no se pudo, para que el formulario
 * muestre el aviso y deje reintentar.
 * @param endpoint  ruta de la API (/api/lead)
 * @param email     correo a guardar
 * @param origen    'newsletter' | 'guias-y-materiales'
 * @param pedirToken la función que devuelve crearCaptcha()
 */
export async function enviarLead(
  endpoint: string,
  email: string,
  origen: string,
  pedirToken: () => Promise<string>
): Promise<void> {
  const captcha = await pedirToken();

  const r = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, origen, captcha }),
  });

  if (!r.ok) {
    /* Los detalles quedan en los logs de Vercel, no acá. Por código:
         400 → el correo o el origen no pasaron la validación
         403 → falló el captcha (o el pedido no vino de este sitio)
         429 → demasiados envíos seguidos desde la misma IP (firewall)
         502 → Supabase no respondió o rechazó la llamada */
    console.error(`[leads] La API rechazó el registro (HTTP ${r.status}).`, { origen });
    throw new Error(`La API respondió ${r.status}`);
  }
}
