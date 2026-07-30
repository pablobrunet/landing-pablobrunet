/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  /** URL del proyecto de Supabase (Project Settings → Data API). */
  readonly PUBLIC_SUPABASE_URL: string;
  /** Clave anon/public. Es pública a propósito: la tabla la protege RLS. */
  readonly PUBLIC_SUPABASE_ANON_KEY: string;
  /** Tabla donde se guardan los correos. Por defecto, `leads`. */
  readonly PUBLIC_SUPABASE_TABLA: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
