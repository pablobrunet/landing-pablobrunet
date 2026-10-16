/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  /** Clave del sitio de Cloudflare Turnstile. Es pública a propósito. */
  readonly PUBLIC_TURNSTILE_SITE_KEY: string;
  /* Las variables del servidor (SUPABASE_URL, SUPABASE_SECRET_KEY,
     TURNSTILE_SECRET_KEY) no pasan por Astro: las lee api/ con process.env.
     Ver .env.example. */
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
