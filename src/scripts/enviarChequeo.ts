/* =====================================================================
   CHEQUEO INTEGRA — envío del lead
   ---------------------------------------------------------------------
   Lo usa la autoevaluación de /programa-integra. No habla con Supabase:
   pide un token al captcha y manda todo a /api/chequeo
   (src/pages/api/chequeo.ts). Esa ruta verifica el captcha y llama a
   `registrar_chequeo`, que guarda en `newsletter-prospects` con origen
   'chequeo'. Si el correo ya había hecho el chequeo, sólo suma un pedido:
   no pisa lo que estaba guardado.

   El mail con el informe NO sale de acá: la fila guardada dispara un
   Database Webhook hacia n8n, y n8n lo manda con Resend. Por eso viaja el
   informe entero, tal cual se ve en pantalla.

   DIFERENCIA IMPORTANTE con enviarLead(): acá el envío NO puede frenar la
   experiencia. La persona ya respondió seis preguntas; si la base está
   caída o el captcha falla, igual tiene que ver su resultado. Por eso esta
   función nunca lanza: devuelve `ok:false` y quien la llama muestra el
   resultado con un aviso chico.
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
}

export async function enviarChequeo(
  endpoint: string,
  datos: DatosChequeo,
  pedirToken: () => Promise<string>
): Promise<ResultadoChequeo> {
  try {
    const captcha = await pedirToken();
    const r = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: datos.nombre,
        email: datos.email,
        empresa: datos.empresa,
        informe: datos.informe,
        utm: datos.utm ?? {},
        captcha,
      }),
    });

    if (!r.ok) {
      /* Los detalles quedan en los logs de Vercel. Por código:
           400 → nombre, empresa o correo no pasaron la validación
           403 → falló el captcha (o el pedido no vino de este sitio)
           429 → demasiados envíos seguidos desde la misma IP (firewall)
           502 → Supabase no respondió o rechazó la llamada */
      console.error(`[chequeo] La API rechazó el registro (HTTP ${r.status}).`);
      return { ok: false };
    }
    return { ok: true };
  } catch (e) {
    console.error("[chequeo] No se pudo enviar.", e);
    return { ok: false };
  }
}
