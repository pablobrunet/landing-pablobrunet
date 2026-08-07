// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://pablobrunet.com',
  // La landing del programa vive en /programa-integra. Todo lo que alguna
  // vez apuntó ahí —el servicio viejo "Estrategia e implementación de IA",
  // la URL corta /integra que usaron los primeros enlaces y artículos del
  // blog— redirige en lugar de devolver 404. En un sitio estático Astro
  // genera una página de redirección; Vercel además la resuelve del lado
  // del servidor.
  redirects: {
    '/integra': '/programa-integra',
    '/integra/gracias': '/programa-integra/gracias',
    '/servicios/estrategia-e-implementacion-de-ia': '/programa-integra',
    '/servicios/metodo-integra': '/programa-integra',
    '/metodo-integra': '/programa-integra',
  },
  // Sitio multipágina 100% estático (SSG) con navegación instantánea.
  prefetch: {
    // Precarga las páginas al pasar el mouse / enfocar un link → sin latencia.
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
});
