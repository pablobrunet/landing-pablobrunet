/* =====================================================================
   RESALTADO DE TÍTULOS
   ---------------------------------------------------------------------
   `resaltar()` pinta el fragmento y se usa SOLO en títulos principales
   (Hero.astro y PageHero.astro). Los títulos de sección usan `sinMarcas()`,
   que descarta los asteriscos y devuelve el texto plano: así el recurso no
   se repite en cada bloque de la página.
   ---------------------------------------------------------------------
   En cualquier título de los archivos de /src/data podés envolver un
   fragmento entre asteriscos. Si ese título va a un H1, se pinta:

     titulo: "Una identidad que transmite confianza, claridad y *visión en movimiento*"

   El componente que lo muestra llama a `resaltar()` y lo inyecta con
   `set:html`. El color vive en la clase global `.hl` (styles/global.css),
   que se adapta sola a fondos claros y oscuros.
   ===================================================================== */

const escaparHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

/** Convierte *fragmento* en <span class="hl">fragmento</span>. */
export const resaltar = (texto: string): string =>
  escaparHtml(texto)
    .replace(/\*([^*]+)\*/g, '<span class="hl">$1</span>')
    .replace(/\n/g, "<br>");

/** Misma cadena sin marcas — para <title>, alt, meta description, etc. */
export const sinMarcas = (texto: string): string =>
  texto.replace(/\*/g, "").replace(/\n/g, " ");

/* ---------------------------------------------------------------------
   Texto enriquecido para los párrafos del blog.
   Admite **negrita** y [enlaces](https://…), nada más. Los enlaces salen
   siempre a una pestaña nueva porque en los artículos apuntan a fuentes.
   --------------------------------------------------------------------- */
export const enriquecer = (texto: string): string =>
  escaparHtml(texto)
    .replace(
      /\[([^\]]+)\]\(([^)\s]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener">$1</a>'
    )
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
