/* =====================================================================
   CLOUDFLARE TURNSTILE — verificación del captcha en el servidor
   ---------------------------------------------------------------------
   El widget del navegador sólo entrega un token. Lo que decide si es una
   persona es esta consulta a Cloudflare, con la clave secreta. Cada token
   sirve una sola vez y vence a los 5 minutos.

   Sólo se importa desde las funciones de api/.
   ===================================================================== */
import { variable } from "./servidor.js";

const VERIFICAR = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/* Claves de prueba de Cloudflare (para `astro dev`): siempre aprueban o
   siempre rechazan, y no devuelven ni la acción ni el dominio reales. */
const esClaveDePrueba = (secreta: string) => /^[123]x0{30,}/.test(secreta);

/**
 * @param token   lo que mandó el widget (cf-turnstile-response)
 * @param accion  'lead' | 'chequeo': un token sacado en un formulario no
 *                sirve para el otro
 * @param request el pedido original, para comparar el dominio
 * @param ip      IP de quien envía, si se conoce
 */
export async function captchaValido(
  token: unknown,
  accion: "lead" | "chequeo",
  request: Request,
  ip?: string
): Promise<boolean> {
  const secreta = variable("TURNSTILE_SECRET_KEY");
  if (!secreta) {
    console.error("[captcha] Falta configurar TURNSTILE_SECRET_KEY.");
    return false;
  }
  if (typeof token !== "string" || token.length === 0 || token.length > 2048) return false;

  const datos = new URLSearchParams({ secret: secreta, response: token });
  if (ip) datos.set("remoteip", ip);

  try {
    const r = await fetch(VERIFICAR, {
      method: "POST",
      body: datos,
      signal: AbortSignal.timeout(8_000),
    });
    const res = (await r.json()) as {
      success?: boolean;
      action?: string;
      hostname?: string;
      "error-codes"?: string[];
    };

    if (!res.success) {
      console.warn("[captcha] Rechazado.", res["error-codes"] ?? []);
      return false;
    }
    if (esClaveDePrueba(secreta)) return true;

    if (res.action !== accion) {
      console.warn(`[captcha] Acción inesperada: ${res.action} (se esperaba ${accion}).`);
      return false;
    }
    if (res.hostname !== new URL(request.url).hostname) {
      console.warn(`[captcha] Dominio inesperado: ${res.hostname}.`);
      return false;
    }
    return true;
  } catch (e) {
    console.error("[captcha] No se pudo verificar con Cloudflare.", e);
    return false;
  }
}
