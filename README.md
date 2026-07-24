# Landing — Pablo Brunet · IA aplicada a negocios

Sitio personal construido con [Astro](https://astro.build). Estático, rápido y
fácil de editar. Esta es una **versión preliminar (v1)**: las secciones que
todavía no tienen datos reales (casos, testimonios, blog) están como estructura
lista para completar, y los espacios de foto se muestran como **marcos vacíos**
hasta que subas tus imágenes.

## Requisitos

- Node.js 18.14 o superior.

## Correr el proyecto

```bash
npm install      # instala dependencias (una sola vez)
npm run dev      # servidor local en http://localhost:4321
npm run build    # genera el sitio en /dist para publicar
npm run preview  # previsualiza el build de producción
```

## Editar el contenido

**Todo el texto, links e imágenes se editan en un solo archivo:**

```
src/data/site.ts
```

Ahí cambiás títulos, servicios, redes sociales, casos, etc. No hace falta tocar
los componentes.

## Subir fotos

1. Poné tus archivos en `public/images/<carpeta>/` (ver
   [public/images/README.md](public/images/README.md) para carpetas y medidas).
2. En `src/data/site.ts`, completá el campo `img` de esa sección con la ruta,
   por ejemplo `img: "/images/hero/retrato.jpg"`.
3. El marco vacío se reemplaza automáticamente por la foto.

## Qué falta completar (marcado en el código)

- **Redes sociales**: reemplazá los `href: "#"` en `site.redes`.
- **Herramientas**: dejá solo las que realmente implementás y subí sus logos.
- **Casos / Testimonios / Blog**: son plantillas de ejemplo, completalas con
  info real (no hay datos inventados).
- **Speaker**: el texto es un placeholder; contá tu experiencia real.
- **Newsletter**: el formulario no está conectado; enganchá tu proveedor en
  `src/components/Newsletter.astro`.
- **Logo definitivo**: el logo actual es una aproximación en código. Subí el SVG
  oficial a `public/images/brand/` cuando lo tengas.

## Estructura

```
src/
  data/site.ts          → contenido editable (textos, links, rutas de fotos)
  layouts/Base.astro    → <head>, fuentes (Google Sans Flex), SEO/OG
  styles/               → tokens.css (paleta + tipografía) y global.css
  components/            → una pieza por sección + Frame/Icon/Logo reutilizables
  pages/index.astro     → arma la página con todas las secciones en orden
public/images/          → tus fotos y logos (con marcos vacíos por defecto)
```

## Identidad visual

Paleta y tipografía de la marca "Confianza en movimiento" en `src/styles/tokens.css`:
Azul Petróleo `#0B1F2A`, Azul Pizarra `#334E68`, Verde Azulado `#3BA39A`,
Verde Acento `#00BF72`. Tipografía base: **Google Sans Flex**.
