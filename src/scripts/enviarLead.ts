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
 * @param clave    publishable key del proyecto (sb_publishable_…)
 * @param email    correo a guardar
 * @param origen   de qué formulario vino
 */
export async function enviarLead(
  endpoint: string,
  clave: string,
  email: string,
  origen: string
): Promise<ResultadoLead> {
  if (!endpoint || !clave) {
    console.warn(
      "[leads] Falta configurar PUBLIC_SUPABASE_URL / PUBLIC_SUPABASE_PUBLISHABLE_KEY. " +
        "El correo NO se guardó."
    );
    return { ok: false, repetido: false };
  }

  const r = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      /* SOLO el header `apikey`. Las claves publishable (sb_publishable_…)
         NO son JWT: si además se mandan en `Authorization: Bearer`, Supabase
         intenta parsearlas como token y devuelve "Invalid JWT".
         Sin Authorization, la petición corre como rol `anon`, que es
         justamente lo que habilita la política RLS. Esto también funciona
         con la anon key vieja, así que sirve para las dos. */
      apikey: clave,
      // La tabla no permite SELECT: pedir la fila de vuelta daría error.
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ email, origen }),
  });

  // 409 = choque con el UNIQUE de `email`: ya estaba anotado.
  if (r.status === 409) return { ok: true, repetido: true };

  if (!r.ok) {
    /* Supabase manda el motivo real en el cuerpo. Sin esto, el error en
       pantalla es genérico y no hay forma de saber qué falló. Las causas
       más comunes, por código:
         404 / PGRST205 → la tabla no existe (falta correr leads.sql)
         401 / 403      → RLS rechazó el INSERT, o la clave es incorrecta
         400            → falta una columna, o `origen` no pasa el CHECK */
    let detalle = "";
    try {
      detalle = await r.text();
    } catch {
      /* cuerpo ilegible: seguimos con el código de estado */
    }
    console.error(
      `[leads] Supabase rechazó la inserción (HTTP ${r.status}).`,
      detalle || "(sin cuerpo)",
      { endpoint, origen }
    );
    throw new Error(`Supabase respondió ${r.status}`);
  }

  return { ok: true, repetido: false };
}
