# Sitio — Pablo Brunet · IA aplicada a negocios

**Sitio multipágina (MPA)** construido con [Astro](https://astro.build):
estático, muy rápido y con **navegación instantánea** (precarga las páginas al
pasar el mouse + transiciones sin recargar). Es una **versión preliminar**: las
secciones sin datos reales (casos, testimonios, blog) están como estructura
lista para completar, y los espacios de foto se muestran como **marcos vacíos**
hasta que subas tus imágenes.

## Mapa del sitio (rutas)

```
/                         Home
/sobre-mi                 Quién soy (bio, valores, recorrido, credenciales)
/servicios                Índice de servicios
/servicios/[slug]         Página de cada servicio
/programa-integra         Landing del Método INTEGRA (programa INTEGRA 60)
/programa-integra/gracias Confirmación después de agendar el diagnóstico
/blog                     Índice del blog
/blog/[slug]              Cada artículo
/recursos                 Hub de recursos (blog, newsletter, materiales)
/newsletter               Suscripción
/contacto                 Formulario + datos de contacto
/legal/terminos · /legal/privacidad · /legal/cookies
404                       Página de error
```

Los menús **Servicios y Recursos** se despliegan en la barra de navegación y se
arman solos a partir de los datos: si agregás un servicio, aparece en el menú y
como página nueva automáticamente.

**Redirecciones** (en `astro.config.mjs`): `/integra`, `/integra/gracias`,
`/servicios/estrategia-e-implementacion-de-ia`, `/servicios/metodo-integra` y
`/metodo-integra` van a `/programa-integra`. Son URLs que estuvieron publicadas
(el servicio que la landing reemplazó, y la ruta corta que usaron los primeros
enlaces y tres artículos del blog): redirigen en vez de dar 404.

## La landing del Método INTEGRA

Es un **anexo** del sitio: comparte navbar, footer, tipografías y componentes,
pero usa la paleta azul del método (`src/styles/integra.css`, que redefine los
tokens verdes de la marca y sólo viaja en esas dos páginas). Los siete colores
de marca están listados y justificados al principio de ese archivo — si cambia
la identidad, se tocan ahí y se propagan solos.

- Todo el texto está en `src/data/integra.ts`. No hace falta tocar componentes.
- Las piezas visuales viven en `src/components/integra/`, una por sección.
- Usa **su propio calendario** de GoHighLevel (`integra.cierre.calendarioId`),
  distinto del calendario general de Pablo (`site.agenda.id`). No mezclarlos.
- El **redirect post-booking** a `/programa-integra/gracias` se configura del
  lado de GHL, en ese calendario.
- El **Chequeo exprés** guarda los leads en la tabla `leads_integra` de
  Supabase. Antes de usarlo hay que correr una vez `supabase/integra-chequeo.sql`.
  Si no se corre, el quiz funciona igual: muestra el resultado y sólo se pierde
  el registro.
- El **VSL todavía no está grabado**: mientras `integra.vsl.url` esté vacío se
  muestra la portada con el aviso. Al pegar un enlace de YouTube/Vimeo aparece
  el reproductor solo.

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

El contenido está en `src/data/`, un archivo por dominio. No hace falta tocar
los componentes ni las páginas:

| Archivo               | Qué controla                                            |
|-----------------------|---------------------------------------------------------|
| `site.ts`             | Datos globales, navegación, redes, hero y secciones del home |
| `sobreMi.ts`          | Página "Sobre mí" (bio, valores, recorrido, credenciales) |
| `servicios.ts`        | Servicios (con `ruta` o `externo` no generan subpágina)  |
| `integra.ts`          | Toda la landing del Método INTEGRA y su página de gracias |
| `blog.ts`             | Artículos del blog                                      |
| `recursos.ts`         | Hub de recursos                                         |
| `prensa.ts`           | Apariciones en prensa                                   |
| `videos.ts`           | Charlas grabadas                                        |
| `empresas.ts`         | Logos de empresas                                       |

**Agregar una página nueva** (ej. un servicio o caso) = duplicar un item en su
array y cambiarle el `slug`. La ruta, el menú y los enlaces se generan solos.

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
