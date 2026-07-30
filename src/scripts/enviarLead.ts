/* =====================================================================
   ENVÍO DE UN CORREO A SUPABASE — lógica compartida por los formularios
   ---------------------------------------------------------------------
   Se importa desde el <script> de Newsletter.astro, LeadMagnet.astro y la
   página /newsletter, así la lógica vive en un solo lugar.

   No escribe en la tabla: llama a la función `registrar_lead`, que valida,
   normaliza el correo y decide si es un alta o un pedido repetido.

   Por qué una función y no un INSERT directo:
   - La clave pública NO necesita permiso de escritura sobre la tabla, solo
     de ejecutar esta función. Menos superficie expuesta.
   - Un pedido repetido no se pierde: suma al contador y actualiza la fecha,
     así el webhook dispara y se puede reenviar el material.
   - El correo se normaliza en la base, no en el navegador, así que
     'Ana@Gmail.com' y 'ana@gmail.com' son la misma persona.
   ===================================================================== */

export interface ResultadoLead {
  ok: boolean;
  /** true si esta persona ya había pedido lo mismo antes. */
  repetido: boolean;
}

/**
 * Registra el pedido en Supabase.
 * @param endpoint URL de la función (…/rest/v1/rpc/registrar_lead)
 * @param clave    publishable key del proyecto (sb_publishable_…)
 * @param email    correo a guardar
 * @param origen   'newsletter' | 'guias-y-materiales'
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
         intenta parsearlas como token y devuelve "Invalid JWT". */
      apikey: clave,
    },
    // Los nombres tienen que coincidir con los parámetros de la función.
    body: JSON.stringify({ p_email: email, p_origen: origen }),
  });

  if (!r.ok) {
    /* Supabase manda el motivo real en el cuerpo. Sin esto, el error en
       pantalla es genérico y no hay forma de saber qué falló. Las causas
       más comunes, por código:
         404 / PGRST202 → la función no existe (falta correr la migración 02)
         401 / 403      → la clave no tiene permiso de ejecutarla
         400            → el correo o el origen no pasaron la validación */
    let detalle = "";
    try {
      detalle = await r.text();
    } catch {
      /* cuerpo ilegible: seguimos con el código de estado */
    }
    console.error(
      `[leads] Supabase rechazó el registro (HTTP ${r.status}).`,
      detalle || "(sin cuerpo)",
      { endpoint, origen }
    );
    throw new Error(`Supabase respondió ${r.status}`);
  }

  // La función devuelve 'nuevo' o 'repetido'.
  const resultado = await r.text();
  return { ok: true, repetido: resultado.includes("repetido") };
}
