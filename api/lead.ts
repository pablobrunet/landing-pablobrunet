/* =====================================================================
   POST /api/lead — newsletter y recursos gratuitos
   ---------------------------------------------------------------------
   Recibe { email, origen, captcha } desde Newsletter.astro, LeadMagnet.astro
   y /newsletter. Verifica el captcha y llama a `registrar_lead`.

   Responde siempre igual cuando sale bien, sea un correo nuevo o uno que ya
   estaba: así nadie puede averiguar quién está en la lista.

   El límite de envíos por IP lo pone el firewall de Vercel, antes de que el
   pedido llegue acá (ver docs/chequeo-lead-magnet.md).
   ===================================================================== */
import { esCorreo, ipDe, leerCuerpo, llamarFuncion, mismoSitio, responder } from "./_lib/servidor.js";
import { captchaValido } from "./_lib/turnstile.js";

const ORIGENES = ["newsletter", "guias-y-materiales"];

/* Función de Vercel con la interfaz estándar Request/Response. */
export default { fetch: atender };

async function atender(request: Request): Promise<Response> {
  if (request.method !== "POST") return responder(405);
  if (!mismoSitio(request)) return responder(403);

  const cuerpo = await leerCuerpo(request);
  if (!cuerpo) return responder(400);
  const { email, origen, captcha } = cuerpo;
  if (!esCorreo(email) || typeof origen !== "string" || !ORIGENES.includes(origen)) {
    return responder(400);
  }

  if (!(await captchaValido(captcha, "lead", request, ipDe(request)))) return responder(403);

  const r = await llamarFuncion("registrar_lead", { p_email: email.trim(), p_origen: origen });
  return responder(r === "ok" ? 200 : r === "invalido" ? 400 : 502);
}
