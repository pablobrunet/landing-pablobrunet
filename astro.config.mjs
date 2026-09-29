// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Rutas que NO van al sitemap. Son las páginas marcadas con `noindex` más las
// URLs que sólo existen para redirigir: un sitemap es una lista de "esto quiero
// que Google indexe", así que meter ahí algo con `noindex` es mandar dos
// señales contradictorias.
//
// Las cotizaciones se excluyen por PREFIJO, no por lista: cada propuesta nueva
// vive en /cotizacion-<empresa>-<token> y queda afuera automáticamente. No hay
// que acordarse de tocar este archivo al agregar una.
const EXCLUIDAS_DEL_SITEMAP = (ruta) =>
  ruta.startsWith('/cotizacion-') ||
  ['/programa-integra-3', '/programa-integra-4'].includes(ruta) ||
  // Páginas de gracias: son el final de un embudo, no contenido del sitio.
  // Las dos llevan `noindex`; nadie debería caer acá desde una búsqueda.
  ['/programa-ejecutivos/agenda-confirmada',
   '/programa-integra/gracias'].includes(ruta) ||
  // URLs viejas que sólo redirigen (ver `redirects` más abajo).
  ['/integra', '/integra/gracias', '/metodo-integra', '/programa-integra-2',
   '/servicios/estrategia-e-implementacion-de-ia',
   '/servicios/metodo-integra'].includes(ruta);

// https://astro.build/config
export default defineConfig({
  site: 'https://pablobrunet.com',
  integrations: [
    sitemap({
      // `pagina` llega como URL absoluta con barra final
      // (https://pablobrunet.com/blog/algo/). La normalizamos a ruta sin barra
      // final para comparar cómodo.
      filter: (pagina) => {
        const ruta = new URL(pagina).pathname.replace(/\/$/, '') || '/';
        return !EXCLUIDAS_DEL_SITEMAP(ruta);
      },
    }),
  ],
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
    // Borrador de la versión que terminó reemplazando a la landing.
    '/programa-integra-2': '/programa-integra',
  },
  // Sitio multipágina 100% estático (SSG) con navegación instantánea.
  prefetch: {
    // Precarga las páginas al pasar el mouse / enfocar un link → sin latencia.
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
});
