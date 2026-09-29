/* =====================================================================
   CHEQUEO INTEGRA — envío del lead a Supabase
   ---------------------------------------------------------------------
   Lo usa la autoevaluación de /programa-integra. Igual que el resto de los
   formularios, no escribe en la tabla: llama a la función
   `registrar_chequeo` (supabase/migracion-03-chequeo.sql), que guarda en
   `newsletter-prospects` con origen 'chequeo' y decide si es un chequeo
   nuevo o uno repetido.

   El mail con el informe NO sale de acá: la fila guardada dispara un
   Database Webhook hacia n8n, y n8n lo manda con Resend. Por eso viaja el
   informe entero, tal cual se ve en pantalla.

   DIFERENCIA IMPORTANTE con enviarLead(): acá el envío NO puede frenar la
   experiencia. La persona ya respondió seis preguntas; si la base está
   caída o todavía no se corrió el SQL, igual tiene que ver su resultado.
   Por eso esta función nunca lanza: devuelve `ok:false` y quien la llama
   muestra el resultado con un aviso chico.
   ===================================================================== */

export interface DatosChequeo {
  nombre: string;
  email: string;
  empresa: string;
  /** UTMs de la URL con la que se llegó, si las hubo. */
  utm?: Record<string, string>;
  /** Lo que la persona vio en pantalla. Es lo que arma el mail. */
  informe: InformeChequeo;
}

export interface InformeChequeo {
  nivel: string;
  /** 0, 1 o 2: posición en la escala de tres niveles. */
  nivelIndice: number;
  texto: string;
  recomendacion: string;
  hallazgos: string[];
  respuestas: { pregunta: string; respuesta: string }[];
  /** Ruta desde la que se hizo, para distinguir versiones de la landing. */
  pagina: string;
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
        p_empresa: datos.empresa,
        p_informe: datos.informe,
        p_utm: datos.utm ?? {},
      }),
    });

    if (!r.ok) {
      /* Causas más comunes, por código:
           404 / PGRST202 → falta correr supabase/migracion-03-chequeo.sql
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
