/* =====================================================================
   ENVÍO DE UN CORREO A SUPABASE — lógica compartida por los dos formularios
   ---------------------------------------------------------------------
   Se importa desde el <script> de Newsletter.astro y LeadMagnet.astro, así
   la lógica vive en un solo lugar y los dos se comportan igual.
   ===================================================================== */

export interface ResultadoLead {
  ok: boolean;
  /** true si el correo ya estaba cargado. Para la persona también es un éxito. */
  repetido: boolean;
}

/**
 * Inserta el correo en la tabla de Supabase.
 * @param endpoint URL REST de la tabla
 * @param anonKey  clave anon del proyecto
 * @param email    correo a guardar
 * @param origen   de qué formulario vino
 */
export async function enviarLead(
  endpoint: string,
  anonKey: string,
  email: string,
  origen: string
): Promise<ResultadoLead> {
  if (!endpoint || !anonKey) {
    console.warn(
      "[leads] Falta configurar PUBLIC_SUPABASE_URL / PUBLIC_SUPABASE_ANON_KEY. " +
        "El correo NO se guardó."
    );
    return { ok: false, repetido: false };
  }

  const r = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
      // La tabla no permite SELECT: pedir la fila de vuelta daría error.
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ email, origen }),
  });

  // 409 = choque con el UNIQUE de `email`: ya estaba anotado.
  if (r.status === 409) return { ok: true, repetido: true };
  if (!r.ok) throw new Error(`Supabase respondió ${r.status}`);
  return { ok: true, repetido: false };
}
