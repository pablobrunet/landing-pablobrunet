/* =====================================================================
   CAPTCHA (Cloudflare Turnstile) — lado navegador
   ---------------------------------------------------------------------
   Lo usan los formularios de newsletter, recursos y el chequeo. El widget
   se carga recién cuando alguien envía: quien sólo mira la página no
   descarga nada de Cloudflare.

   Va en modo "interaction-only": a casi todo el mundo no le aparece nada.
   Sólo si Cloudflare tiene dudas se muestra el recuadro para tildar, en el
   lugar del formulario marcado con [data-captcha].

   El token que entrega no prueba nada por sí solo: lo verifica la API en
   el servidor (src/lib/turnstile.ts). Sirve una sola vez, así que se pide
   uno nuevo en cada envío.
   ===================================================================== */

interface Turnstile {
  render(contenedor: HTMLElement, opciones: Record<string, unknown>): string;
  execute(widget: string): void;
  reset(widget: string): void;
}

declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

const SCRIPT = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const CLAVE = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY ?? "";

let carga: Promise<Turnstile> | null = null;

function cargarTurnstile(): Promise<Turnstile> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  carga ??= new Promise<Turnstile>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = SCRIPT;
    s.async = true;
    s.onload = () =>
      window.turnstile ? resolve(window.turnstile) : reject(new Error("Turnstile no cargó"));
    s.onerror = () => {
      carga = null; // que el próximo intento vuelva a probar
      reject(new Error("No se pudo cargar Turnstile"));
    };
    document.head.appendChild(s);
  });
  return carga;
}

/**
 * Prepara el captcha de un formulario.
 * @param contenedor elemento [data-captcha] dentro del formulario
 * @param accion     'lead' | 'chequeo' (el servidor la compara)
 * @returns una función que pide un token nuevo cada vez que se la llama
 */
export function crearCaptcha(contenedor: HTMLElement, accion: "lead" | "chequeo") {
  let widget: string | null = null;
  let pendiente: { resolve: (t: string) => void; reject: (e: Error) => void } | null = null;

  const terminar = (token: string | null, error?: string) => {
    const p = pendiente;
    pendiente = null;
    if (!p) return;
    if (token) p.resolve(token);
    else p.reject(new Error(error ?? "captcha"));
  };

  return async function pedirToken(): Promise<string> {
    if (!CLAVE) throw new Error("Falta configurar PUBLIC_TURNSTILE_SITE_KEY.");
    const ts = await cargarTurnstile();

    if (widget === null) {
      widget = ts.render(contenedor, {
        sitekey: CLAVE,
        action: accion,
        execution: "execute",
        appearance: "interaction-only",
        language: "es",
        callback: (t: string) => terminar(t),
        "error-callback": () => terminar(null, "captcha: error"),
        "timeout-callback": () => terminar(null, "captcha: tiempo agotado"),
      });
    } else {
      ts.reset(widget); // el token anterior ya se usó
    }

    return new Promise<string>((resolve, reject) => {
      const este = { resolve, reject };
      pendiente = este;
      ts.execute(widget!);
      // Margen amplio por si a la persona le toca tildar el recuadro.
      window.setTimeout(() => {
        if (pendiente === este) terminar(null, "captcha: sin respuesta");
      }, 60_000);
    });
  };
}
