/* =====================================================================
   EN LOS MEDIOS / PRENSA — sección de /sobre-mi
   ---------------------------------------------------------------------
   Notas reales, verificadas contra la publicación original: título, medio,
   fecha y una cita textual. Para sumar una nota, duplicá un bloque.

   `img`     → foto del encabezado de la tarjeta (16:9, se recorta al centro).
   `imgPos`  → corrige el encuadre cuando la foto es vertical u off-center
               (ej. "center 25%" sube el recorte para no cortar una cara).
   `logo`    → si subís el logo del medio a /public/images/prensa/ y lo
               completás, se muestra en lugar del nombre en texto.
   ===================================================================== */

export interface NotaPrensa {
  medio: string;
  logo: string;
  logoLabel: string;
  titulo: string;
  cita: string; // el componente ya le pone las comillas
  fecha: string;
  url: string;
  img: string;
  imgPos?: string;
}

export const prensaMeta = {
  eyebrow: "En los medios",
  titulo: "Prensa *y menciones*",
  subtitulo: "Notas y publicaciones donde participé o fui mencionado.",
};

export const notas: NotaPrensa[] = [
  {
    medio: "AgroActiva",
    logo: "",
    logoLabel: "/images/prensa/logo-agroactiva.svg",
    titulo:
      "«No se empieza por la herramienta, se empieza por una pregunta»: las claves de la IA en el agro según Pablo Brunet",
    cita:
      "Pablo Brunet, especialista en la materia, brindó una charla práctica y despejó las principales dudas de un sector cada vez más atento a la tecnología.",
    fecha: "Julio de 2026",
    url: "https://agroactiva.com/no-se-empieza-por-la-herramienta-se-empieza-por-una-pregunta-las-claves-de-la-ia-en-el-agro-segun-pablo-brunet/",
    img: "/images/prensa/agroactiva1.jpg",
    // Foto vertical: el recorte sube para dejar la cara en el centro del marco.
    imgPos: "center 22%",
  },
  {
    medio: "Todo Agro",
    logo: "",
    logoLabel: "/images/prensa/logo-todoagro.svg",
    titulo: "Inteligencia artificial en el agro: cómo pasar de la curiosidad a la acción",
    cita:
      "Brunet destacó que el agro ya convive con tecnología avanzada, como drones, sensores y plataformas que generan grandes volúmenes de información. Sin embargo, remarcó que el verdadero salto está en usar esos datos para tomar mejores decisiones.",
    fecha: "Junio de 2026",
    url: "https://www.todoagro.com.ar/inteligencia-artificial-en-el-agro-como-pasar-de-la-curiosidad-a-la-accion/",
    img: "/images/prensa/agroactiva-arena.jpg",
  },
  {
    medio: "El Santafesino",
    logo: "",
    logoLabel: "/images/prensa/logo-elsantafesino.svg",
    titulo:
      "Se vienen las Jornadas Internacionales de Jóvenes Emprendedores en la Universidad Nacional del Litoral",
    cita:
      "Entre las actividades más esperadas del jueves se destacan las charlas de Pablo Brunet titulada «De cero a CEO: 30 minutos de IA para validar el ADN de tu emprendimiento».",
    fecha: "Octubre de 2025",
    url: "https://elsantafesino.com/se-vienen-las-jornadas-internacionales-de-jovenes-emprendedores-en-la-universidad-nacional-del-litoral/",
    img: "/images/prensa/jije.jpg",
  },
  {
    medio: "Radiofónica 100.7",
    logo: "",
    logoLabel: "/images/prensa/logo-radiofonica.svg",
    titulo:
      "AgroActiva 2026: Di Stefano, Siri y Brunet, las tres charlas que marcan el futuro del campo",
    cita:
      "La IA ya llegó al campo. Pablo Brunet compartirá casos reales, herramientas concretas y oportunidades específicas para empresas agropecuarias que quieren incorporar inteligencia artificial a su operación.",
    fecha: "Mayo de 2026",
    url: "https://radiofonica.com/agroactiva-2026-di-stefano-siri-y-brunet-las-tres-charlas-que-marcan-el-futuro-del-campo/",
    img: "/images/prensa/radiofonica.jpg",
  },
  {
    medio: "El Litoral",
    logo: "",
    logoLabel: "/images/prensa/logo-ellitoral.svg",
    titulo:
      "Emprendimiento e innovación: más de 1.200 jóvenes participaron de Tedind-X en Santa Fe",
    cita:
      "La creación, la tecnología te permite crear. Y hoy una de las cosas tan fantásticas que trae es que no solo resuelve cosas, sino que te ayuda a crear y a tener mejores ideas.",
    fecha: "Abril de 2025",
    url: "https://www.ellitoral.com/area-metropolitana/union-industrial-santa-fe-tedind-x-2025-emprendedores-capacitaciones-jovenes-economia-inteligencia-artificial_0_xeBltwFCu0.html",
    img: "/images/prensa/ellitoral.png",
  },
  {
    medio: "ASSAL · Escuela Expone",
    logo: "",
    logoLabel: "/images/prensa/logo-assal.svg",
    titulo:
      "Nuevas tendencias de la industria alimentaria — Jornada de disertaciones, La Fluvial, Rosario",
    cita:
      "De los algoritmos al plato: el impacto real de la IA en el negocio de los alimentos.",
    fecha: "Junio de 2025",
    url: "https://www.assal.gov.ar/escuelaexpone/industria-alimentaria-post.html",
    img: "/images/prensa/assal.jpg",
  },
];
