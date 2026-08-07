/* =====================================================================
   SERVICIOS — datos + páginas de detalle (/servicios y /servicios/[slug])
   ---------------------------------------------------------------------
   El ORDEN de este array es el orden en que aparecen en toda la web
   (home, /servicios, menú del navbar y footer). El primero es la punta de
   lanza de la propuesta: speaker y capacitador.

   `externo`: si tiene una URL, ese servicio NO genera subpágina acá y
   todos los enlaces apuntan al sitio externo en una pestaña nueva.

   `ruta`: si tiene una ruta interna (ej. la landing /programa-integra), tampoco
   genera subpágina en /servicios/[slug] — los enlaces van directo ahí.
   En ese caso los campos de la ficha larga (hero, paraQuien, enfoque,
   entregables…) no hacen falta: el contenido vive en la landing y
   duplicarlo acá solo abre la puerta a que queden dos versiones distintas.

   Los títulos admiten *un fragmento entre asteriscos* para resaltarlo.
   ===================================================================== */

export interface Servicio {
  slug: string;
  titulo: string;
  icon: string;
  resumen: string; // aparece en tarjetas / índice
  /* De acá para abajo, todo lo que arma la subpágina. Es opcional porque
     los servicios con `ruta` o `externo` no la generan. */
  hero?: string; // frase de la cabecera de su página
  paraQuien?: string;
  problema?: string;
  enfoque?: { titulo: string; texto: string }[];
  entregables?: string[];
  faq?: { q: string; a: string }[];
  img?: string;
  imgLabel?: string;
  /* Cada foto se muestra en su propia proporción: forzarlas todas a un mismo
     marco recorta de más. `imgPos` corrige el encuadre si hace falta. */
  imgRatio?: string;
  imgPos?: string;
  /* Párrafo de entrada de la subpágina, antes de "¿Para quién es?". */
  intro?: string;
  /* Foto de cabecera de la tarjeta en el listado de servicios (home y
     /servicios). Es distinta de `img`, que va en la subpágina. */
  imgTarjeta?: string;
  /* Encuadre de la foto de la tarjeta, si el recorte centrado no sirve. */
  imgTarjetaPos?: string;
  externo?: string; // URL externa (ej. innerflowai.com). Si existe, no hay subpágina.
  ruta?: string; // Ruta interna propia (ej. /programa-integra). Tampoco genera subpágina.
  /* Texto del enlace en las tarjetas. Por defecto: "Ver servicio". */
  cta?: string;
  /* Muestra en la subpágina la misma grilla de charlas grabadas del home
     (los videos viven en data/videos.ts → `charlas`). */
  mostrarCharlas?: boolean;
  /* Carrusel de fotos al pie de la subpágina. Con `fotos` vacío no se dibuja. */
  galeria?: {
    eyebrow: string;
    titulo: string;
    texto?: string;
    /* `titulo` (el lugar) y `subtitulo` (el tema) se dibujan sobre la foto,
       abajo a la izquierda. Sin `titulo` la foto va limpia. */
    fotos: {
      img: string;
      imgLabel: string;
      alt?: string;
      titulo?: string;
      subtitulo?: string;
      pos?: string; // encuadre, si el recorte centrado no sirve
    }[];
  };
}

export const serviciosMeta = {
  eyebrow: "Servicios",
  titulo: "Así podemos *trabajar juntos*",
  subtitulo: "Estrategia clara. Implementación efectiva. Resultados medibles.",
};

export const servicios: Servicio[] = [
  {
    slug: "speaker-y-capacitador",
    titulo: "Speaker y capacitador",
    icon: "mic",
    resumen:
      "Charlas, keynotes y programas de formación en IA aplicada, para equipos y organizaciones que quieren adoptarla con criterio.",
    hero: "Charlas que mueven la aguja y formaciones que dejan al equipo trabajando distinto.",
    paraQuien:
      "Empresas, cámaras, universidades y eventos que necesitan bajar la IA a tierra: qué cambia, qué no, y qué hacer el lunes a la mañana.",
    problema:
      "Sobra ruido y falta criterio. Los equipos escuchan hablar de IA todo el día, pero nadie les explica en su idioma qué significa para su trabajo concreto.",
    enfoque: [
      {
        titulo: "Contexto",
        texto: "Entiendo la audiencia, el sector y el momento de la organización antes de armar el contenido.",
      },
      {
        titulo: "Charla o keynote",
        texto: "Una exposición clara, con ejemplos reales y sin tecnicismos innecesarios.",
      },
      {
        titulo: "Formación práctica",
        texto: "Talleres donde el equipo trabaja sobre sus propias tareas, no sobre casos de laboratorio.",
      },
      {
        titulo: "Seguimiento",
        texto: "Materiales, buenas prácticas y acompañamiento para que la adopción no se apague.",
      },
    ],
    entregables: [
      "Charla o keynote adaptada a tu audiencia",
      "Programa de formación a medida por rol",
      "Talleres en vivo (presenciales u online)",
      "Materiales, guías de buenas prácticas y plan de adopción interno",
    ],
    faq: [], // las preguntas frecuentes aparecen solas cuando cargues alguna
    // Charla para el Ministerio de Trabajo de Santa Fe.
    imgTarjeta: "/images/speaker/speaker1.jpg",
    /* La foto es casi cuadrada (1.16) y la tarjeta pide 16:10: centrado te
       corta la cabeza. Al 12% desde arriba entrás completo. */
    imgTarjetaPos: "center 12%",
    img: "/images/speaker/evento-01.jpg",
    imgLabel: "/images/speaker/evento-01.jpg",
    imgRatio: "4/5",
    mostrarCharlas: true,
    galeria: {
      eyebrow: "Capacitaciones",
      titulo: "Dónde vengo capacitando",
      texto:
        "Cámaras, parques industriales, municipios y espacios de emprendedores. Talleres en los que el equipo trabaja sobre sus propias tareas, no sobre casos de laboratorio.",
      /* PARA SUMAR UNA CAPACITACIÓN: copiá la foto en
         /public/images/capacitaciones/ (ver el README de esa carpeta) y
         agregá una línea acá. `titulo` es el lugar y `subtitulo` el tema:
         se dibujan sobre la foto, abajo a la izquierda.
         Mientras el array esté vacío, la sección no se dibuja. */
      fotos: [
        {
          img: "/images/capacitaciones/venado-tuerto.jpg",
          imgLabel: "/images/capacitaciones/venado-tuerto.jpg",
          titulo: "Venado Tuerto",
          subtitulo: "Capacitación a empresas, comercios y emprendedores",
          alt: "Capacitación a empresas, comercios y emprendedores en Venado Tuerto",
        },
        {
          img: "/images/capacitaciones/cefose-galvez.jpg",
          imgLabel: "/images/capacitaciones/cefose-galvez.jpg",
          titulo: "CeFoSe Gálvez",
          subtitulo: "IA y Ventas para empresas",
          alt: "Capacitación de IA y Ventas en el CeFoSe de Gálvez",
        },
        {
          img: "/images/capacitaciones/parque-industrial-sauce-viejo.jpg",
          imgLabel: "/images/capacitaciones/parque-industrial-sauce-viejo.jpg",
          titulo: "Parque Industrial Sauce Viejo",
          subtitulo: "IA y Ventas para empresas",
          alt: "Capacitación de IA y Ventas en el Parque Industrial Sauce Viejo",
          /* Es la única vertical: centrada, el 4:3 se come la pantalla. Al 40%
             entran la pantalla, el disertante y las primeras filas. */
          pos: "center 40%",
        },
        {
          img: "/images/capacitaciones/uisf.jpg",
          imgLabel: "/images/capacitaciones/uisf.jpg",
          titulo: "UISF",
          subtitulo: "IA y Ventas para empresas",
          alt: "Capacitación de IA y Ventas en la Unión Industrial de Santa Fe",
        },
        {
          img: "/images/capacitaciones/camara-estaciones-de-servicio.jpg",
          imgLabel: "/images/capacitaciones/camara-estaciones-de-servicio.jpg",
          titulo: "Cámara de Estaciones de Servicio",
          subtitulo: "Talleres de IA aplicada",
          alt: "Taller de IA aplicada en la Cámara de Estaciones de Servicio",
        },
        {
          img: "/images/capacitaciones/club-pyxo.jpg",
          imgLabel: "/images/capacitaciones/club-pyxo.jpg",
          titulo: "Club Pyxo",
          subtitulo: "Talleres de IA aplicada",
          alt: "Taller de IA aplicada en el Club Pyxo",
        },
        {
          img: "/images/capacitaciones/capital-activa.jpg",
          imgLabel: "/images/capacitaciones/capital-activa.jpg",
          titulo: "Capital Activa",
          subtitulo: "Talleres de Automatizaciones Inteligentes",
          alt: "Taller de Automatizaciones Inteligentes en Capital Activa",
        },
        {
          img: "/images/capacitaciones/ceca.jpg",
          imgLabel: "/images/capacitaciones/ceca.jpg",
          titulo: "CECA",
          subtitulo: "Taller de IA aplicada",
          alt: "Taller de IA aplicada en CECA",
        },
        {
          img: "/images/capacitaciones/espacio-demos.jpg",
          imgLabel: "/images/capacitaciones/espacio-demos.jpg",
          titulo: "Espacio DEMOS",
          subtitulo: "Taller de Agentes de IA",
          alt: "Taller de Agentes de IA en Espacio DEMOS",
        },
      ],
    },
  },
  {
    /* Reemplazó a "Estrategia e implementación de IA" (la ficha de IA
       Simple para PyMEs, línea ADOPTA-60), que quedó retirada junto con
       esos nombres. Ahora el servicio es el Método INTEGRA y su contenido
       vive completo en la landing /programa-integra: acá va solo la tarjeta.
       La URL vieja /servicios/estrategia-e-implementacion-de-ia redirige
       a /programa-integra (ver astro.config.mjs). */
    slug: "metodo-integra",
    titulo: "Método INTEGRA",
    icon: "chip",
    resumen:
      "INTEGRA 60: en 60 días instalo en tu empresa la capacidad de identificar oportunidades de IA, priorizarlas, probarlas sobre trabajo real y decidir con evidencia. Operado por gente de la casa.",
    ruta: "/programa-integra",
    cta: "Ver el programa",
    // Charla en la Unión Industrial de Santa Fe. Apaisada: va en 4:3.
    imgTarjeta: "/images/servicios/estrategia-tarjeta.jpg",
  },
  {
    slug: "automatizacion-de-procesos",
    titulo: "Automatización de procesos",
    icon: "flow",
    resumen:
      "Automatizaciones que reducen trabajo manual, conectan herramientas y liberan tiempo del equipo. Lo llevamos adelante desde InnerFlow AI.",
    hero: "Menos tareas repetitivas, más foco en lo que importa.",
    paraQuien:
      "Equipos que pierden horas en tareas manuales, repetitivas o propensas a error.",
    problema:
      "Procesos que dependen de copiar y pegar entre herramientas, planillas dispersas y pasos que se olvidan.",
    enfoque: [
      { titulo: "Relevamiento", texto: "Mapeo del proceso actual y sus cuellos de botella." },
      { titulo: "Diseño", texto: "Flujo automatizado que conecta tus herramientas." },
      { titulo: "Implementación", texto: "Puesta en marcha con controles y alertas." },
      { titulo: "Soporte", texto: "Ajustes y monitoreo hasta que corra solo." },
    ],
    entregables: [
      "Diagrama del proceso automatizado",
      "Automatización funcionando end-to-end",
      "Panel de control / alertas",
      "Guía de uso para el equipo",
    ],
    faq: [],
    imgTarjeta: "/images/servicios/automatizacion.jpg",
    img: "",
    imgLabel: "/images/servicios/automatizacion.jpg",
    externo: "https://innerflowai.com",
  },
];

/** A dónde apunta cada servicio: su landing propia, el sitio externo o su subpágina. */
export const hrefServicio = (s: Servicio) => s.externo ?? s.ruta ?? `/servicios/${s.slug}`;

/** Texto del enlace en las tarjetas del home y de /servicios. */
export const ctaServicio = (s: Servicio) =>
  s.cta ?? (s.externo ? "Ir a innerflowai.com" : "Ver servicio");

/** Servicios que generan subpágina en /servicios/[slug]. */
export const serviciosInternos = servicios.filter((s) => !s.externo && !s.ruta);

export const getServicio = (slug: string) => servicios.find((s) => s.slug === slug);
