/* =====================================================================
   POST /api/chequeo — autoevaluación de /programa-integra
   ---------------------------------------------------------------------
   Recibe { nombre, empresa, email, informe, utm, captcha } desde
   I2Autoevaluacion.astro. Verifica el captcha y llama a `registrar_chequeo`.

   Si el correo ya hizo el chequeo antes, la función sólo suma un pedido:
   no pisa el nombre, la empresa ni el informe guardados
   (supabase/migracion-04-chequeo-sin-pisar.sql). La respuesta es la misma
   en los dos casos.

   El límite de envíos por IP lo pone el firewall de Vercel.
   ===================================================================== */
import { esCorreo, ipDe, leerCuerpo, llamarFuncion, mismoSitio, responder } from "./_lib/servidor.js";
import { captchaValido } from "./_lib/turnstile.js";

const esObjeto = (v: unknown): v is Record<string, unknown> =>
  !!v && typeof v === "object" && !Array.isArray(v);

/* Sólo las UTM conocidas, como texto corto. Lo demás se descarta. */
function limpiarUtm(v: unknown): Record<string, string> {
  if (!esObjeto(v)) return {};
  const utm: Record<string, string> = {};
  for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
    if (typeof v[k] === "string") utm[k] = (v[k] as string).slice(0, 120);
  }
  return utm;
}

/* Función de Vercel con la interfaz estándar Request/Response. */
export default { fetch: atender };

async function atender(request: Request): Promise<Response> {
  if (request.method !== "POST") return responder(405);
  if (!mismoSitio(request)) return responder(403);

  const cuerpo = await leerCuerpo(request);
  if (!cuerpo) return responder(400);
  const { nombre, empresa, email, informe, utm, captcha } = cuerpo;

  /* Los mismos límites que valida la función en la base: cortar acá evita
     gastar una verificación de captcha y una llamada en algo que va a
     rebotar igual. */
  if (
    typeof nombre !== "string" || nombre.trim().length === 0 || nombre.length > 120 ||
    typeof empresa !== "string" || empresa.length > 160 ||
    !esCorreo(email) ||
    !esObjeto(informe) || JSON.stringify(informe).length > 9_000
  ) {
    return responder(400);
  }

  if (!(await captchaValido(captcha, "chequeo", request, ipDe(request)))) return responder(403);

  const r = await llamarFuncion("registrar_chequeo", {
    p_nombre: nombre.trim(),
    p_email: email.trim(),
    p_empresa: empresa.trim(),
    p_informe: informe,
    p_utm: limpiarUtm(utm),
  });
  return responder(r === "ok" ? 200 : r === "invalido" ? 400 : 502);
}
