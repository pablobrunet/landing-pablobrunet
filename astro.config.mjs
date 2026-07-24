// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://pablobrunet.com',
  // Sitio multipágina 100% estático (SSG) con navegación instantánea.
  prefetch: {
    // Precarga las páginas al pasar el mouse / enfocar un link → sin latencia.
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
});
