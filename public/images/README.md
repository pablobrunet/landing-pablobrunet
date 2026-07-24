# Carpeta de imágenes

Acá subís todas las fotos y logos del sitio. Mientras una carpeta esté vacía,
la página muestra un **marco vacío** con la ruta esperada del archivo.

## Cómo hacer que aparezca una foto

1. Subí el archivo a la carpeta que corresponde (respetá el nombre sugerido).
2. Abrí `src/data/site.ts` y en el campo `img` de esa sección poné la ruta.
   Ejemplo:
   ```ts
   img: "/images/hero/retrato.jpg",   // antes estaba ""
   ```
3. Guardá. El marco vacío se reemplaza por tu foto.

> Las rutas empiezan en `/images/...` (NO incluyas `/public`).

## Carpetas y dimensiones recomendadas

| Carpeta          | Qué va                                   | Formato   | Tamaño sugerido           |
|------------------|------------------------------------------|-----------|---------------------------|
| `brand/`         | Logo definitivo, monograma, favicon      | SVG/PNG   | logo vectorial            |
| `hero/`          | Tu retrato principal (`retrato.jpg`)     | JPG/WebP  | 900 × 1125 px (4:5)       |
| `about/`         | Foto para "Sobre mí" (`retrato.jpg`)     | JPG/WebP  | 900 × 1125 px (4:5)       |
| `speaker/`       | Fotos de eventos (`evento-01..05.jpg`)   | JPG/WebP  | 600 × 800 px (3:4)        |
| `portfolio/`     | Miniaturas de casos (`caso-01..NN.jpg`)  | JPG/WebP  | 800 × 500 px (16:10)      |
| `testimonials/`  | Avatares (`avatar-01..NN.jpg`)           | JPG/WebP  | 200 × 200 px (1:1)        |
| `blog/`          | Portadas de artículos (`post-01..NN.jpg`)| JPG/WebP  | 1200 × 675 px (16:9)      |
| `logos/`         | Logos de herramientas                    | SVG/PNG   | alto ~80 px, fondo transp.|
| `og/`            | Imagen para redes (`og.jpg`)             | JPG       | 1200 × 630 px             |

Consejo: exportá en WebP (o JPG bien comprimido) para que el sitio cargue rápido.
