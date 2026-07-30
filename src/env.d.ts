/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  /** URL del proyecto de Supabase (Project Settings → Data API). */
  readonly PUBLIC_SUPABASE_URL: string;
  /**
   * Publishable key (sb_publishable_…). Es pública a propósito: la tabla la
   * protege RLS. Viaja en el header `apikey`, nunca en Authorization.
   */
  readonly PUBLIC_SUPABASE_PUBLISHABLE_KEY: string;
  /** Clave anterior (eyJhbGci…). Solo como respaldo; se da de baja en 2026. */
  readonly PUBLIC_SUPABASE_ANON_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
