/* =====================================================================
   LADO SERVIDOR — lo que comparten /api/lead y /api/chequeo
   ---------------------------------------------------------------------
   Las funciones de esta carpeta (api/) las arma Vercel aparte del sitio:
   Astro no las toca y nada de acá llega al navegador. La carpeta _lib/
   empieza con guion bajo para que Vercel no la publique como una ruta.

   Por qué no son rutas de Astro: el adaptador de Vercel para Astro 4 arma
   las funciones para Node 18, que Vercel ya no acepta. Así el sitio sigue
   100% estático y estas funciones corren con el Node del proyecto.

   Por qué existe: hasta octubre de 2026 los formularios llamaban a las
   funciones de Supabase directo desde el navegador, con la clave pública.
   Eso dejaba a cualquiera cargar miles de registros salteando el
   formulario. Ahora el navegador habla con nuestra API, la API verifica el
   captcha y recién ahí llama a Supabase con una clave que no es pública.
   A `anon` se le sacó el permiso de ejecutar las funciones
   (supabase/migracion-05-cerrar-anon.sql).
   ===================================================================== */

/** Variable de entorno del proyecto en Vercel (o de .env con `vercel dev`). */
export function variable(nombre: string): string {
  return (process.env[nombre] ?? "").trim();
}

/** IP de quien envía. Vercel la pone en x-real-ip. */
export function ipDe(request: Request): string | undefined {
  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    undefined
  );
}

/* Misma respuesta para todo lo que salió bien: no se dice si el correo ya
   estaba cargado. Los errores tampoco dan detalles: el motivo real queda en
   los logs de Vercel. */
export function responder(estado: number): Response {
  return new Response(JSON.stringify({ ok: estado === 200 }), {
    status: estado,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

/* El pedido tiene que venir de una página de este mismo sitio. No frena a
   quien arme el pedido a mano (eso lo frena el captcha), pero sí a otra web
   que quiera usar nuestro formulario desde el navegador de sus visitas. */
export function mismoSitio(request: Request): boolean {
  const origen = request.headers.get("origin");
  if (!origen) return false;
  try {
    return new URL(origen).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

/** Lee el cuerpo JSON. Devuelve null si no es un objeto o pesa demasiado. */
export async function leerCuerpo(request: Request): Promise<Record<string, unknown> | null> {
  try {
    const texto = await request.text();
    if (texto.length > 20_000) return null;
    const cuerpo: unknown = JSON.parse(texto);
    return cuerpo && typeof cuerpo === "object" && !Array.isArray(cuerpo)
      ? (cuerpo as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
}

export const esCorreo = (v: unknown): v is string =>
  typeof v === "string" && v.length <= 254 && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.trim());

/* Se acepta la URL en cualquiera de sus dos formas (la del proyecto o la
   del Data API, que ya trae /rest/v1). Sin el recorte, el endpoint quedaría
   con /rest/v1 repetido y Supabase responde 404 / PGRST125. */
const supabaseUrl = () =>
  variable("SUPABASE_URL").replace(/\/+$/, "").replace(/\/rest\/v\d+$/, "");

export type ResultadoRpc = "ok" | "invalido" | "fallo";

/**
 * Llama a una función de Supabase con la clave secreta. La respuesta de la
 * función no se usa: venga 'nuevo' o 'repetido', quien llena el formulario
 * recibe lo mismo.
 */
export async function llamarFuncion(
  funcion: "registrar_lead" | "registrar_chequeo",
  parametros: Record<string, unknown>
): Promise<ResultadoRpc> {
  const url = supabaseUrl();
  const clave = variable("SUPABASE_SECRET_KEY");
  if (!url || !clave) {
    console.error("[api] Falta configurar SUPABASE_URL / SUPABASE_SECRET_KEY.");
    return "fallo";
  }

  try {
    const r = await fetch(`${url}/rest/v1/rpc/${funcion}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        /* Sólo `apikey`: las claves sb_secret_… no son JWT y en
           `Authorization: Bearer` Supabase responde "Invalid JWT". */
        apikey: clave,
      },
      body: JSON.stringify(parametros),
      signal: AbortSignal.timeout(10_000),
    });
    if (r.ok) return "ok";

    /* Causas más comunes:
         404 / PGRST202 → la función no existe o cambió su firma
         401 / 403      → la clave no puede ejecutarla (¿es la secret?)
         400 / 22023    → los datos no pasaron la validación de la función */
    const detalle = await r.text().catch(() => "");
    console.error(`[api] ${funcion} respondió ${r.status}.`, detalle.slice(0, 300));
    return r.status === 400 && detalle.includes("22023") ? "invalido" : "fallo";
  } catch (e) {
    console.error(`[api] No se pudo contactar a Supabase (${funcion}).`, e);
    return "fallo";
  }
}
