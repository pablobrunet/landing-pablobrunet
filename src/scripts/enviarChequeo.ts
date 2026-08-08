/* =====================================================================
   CHEQUEO INTEGRA — envío del lead a Supabase
   ---------------------------------------------------------------------
   Lo usa el quiz de la landing /integra. Igual que el resto de los
   formularios, no escribe en la tabla: llama a la función
   `registrar_chequeo_integra` (supabase/integra-chequeo.sql), que valida
   el correo y decide si es un chequeo nuevo o uno repetido.

   DIFERENCIA IMPORTANTE con enviarLead(): acá el envío NO puede frenar la
   experiencia. La persona ya respondió seis preguntas; si la base está
   caída o todavía no se corrió el SQL, igual tiene que ver su resultado.
   Por eso esta función nunca lanza: devuelve `ok:false` y quien la llama
   muestra el resultado con un aviso chico.
   ===================================================================== */

export interface DatosChequeo {
  nombre: string;
  email: string;
  /** El formulario ya no lo pide. Se manda igual, vacío: la función de
   *  Supabase declara `p_empresa` sin valor por defecto y PostgREST
   *  rechaza la llamada si falta un argumento. La columna admite ''. */
  empresa?: string;
  /** Par pregunta → respuesta elegida, tal cual las leyó la persona. */
  respuestas: Record<string, string>;
  /** Nivel devuelto: 'Uso disperso' | 'En transición' | 'Con método'. */
  resultado: string;
  /** UTMs capturadas en el primer pageview, si las hubo. */
  utm?: Record<string, string>;
}

export interface ResultadoChequeo {
  ok: boolean;
  repetido: boolean;
}

export async function enviarChequeo(
  endpoint: string,
  clave: string,
  datos: DatosChequeo
): Promise<ResultadoChequeo> {
  if (!endpoint || !clave) {
    console.warn(
      "[chequeo] Falta configurar PUBLIC_SUPABASE_URL / PUBLIC_SUPABASE_PUBLISHABLE_KEY. " +
        "El chequeo NO se guardó."
    );
    return { ok: false, repetido: false };
  }

  try {
    const r = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        /* Solo el header `apikey`: las claves publishable no son JWT y en
           `Authorization: Bearer` devuelven "Invalid JWT". */
        apikey: clave,
      },
      // Los nombres coinciden con los parámetros de la función SQL.
      body: JSON.stringify({
        p_nombre: datos.nombre,
        p_email: datos.email,
        p_empresa: datos.empresa ?? "",
        p_respuestas: datos.respuestas,
        p_resultado: datos.resultado,
        p_utm: datos.utm ?? {},
      }),
    });

    if (!r.ok) {
      /* Causas más comunes, por código:
           404 / PGRST202 → falta correr supabase/integra-chequeo.sql
           404 / PGRST125 → PUBLIC_SUPABASE_URL trae /rest/v1 repetido
           401 / 403      → la clave no puede ejecutar la función
           400 / 22023    → el correo no pasó la validación */
      let detalle = "";
      try {
        detalle = await r.text();
      } catch {
        /* cuerpo ilegible: alcanza con el código de estado */
      }
      console.error(
        `[chequeo] Supabase rechazó el registro (HTTP ${r.status}).`,
        detalle || "(sin cuerpo)"
      );
      return { ok: false, repetido: false };
    }

    const texto = await r.text();
    return { ok: true, repetido: texto.includes("repetido") };
  } catch (e) {
    console.error("[chequeo] No se pudo contactar a Supabase.", e);
    return { ok: false, repetido: false };
  }
}
