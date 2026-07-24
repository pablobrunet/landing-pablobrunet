/* =====================================================================
   CONTENIDO EDITABLE — Pablo Brunet
   ---------------------------------------------------------------------
   Este es el ÚNICO archivo que necesitás tocar para cambiar textos,
   links y rutas de imágenes de toda la página.

   FOTOS: cada campo `img` apunta a un archivo dentro de /public/images/...
   - Mientras el campo esté vacío ("") se muestra un MARCO VACÍO con la
     ruta esperada. Subí tu foto a esa ruta y escribí la ruta acá para
     que aparezca. Ej:  img: "/images/hero/retrato.jpg"
   ===================================================================== */

export const site = {
  /* ---- Datos generales / SEO ---- */
  nombre: "Pablo Brunet",
  tagline: "IA aplicada a negocios",
  rol: "Consultor en inteligencia artificial",
  disciplinas: ["Estrategia", "Automatización", "Datos", "Personas"],
  ubicacion: "Madrid, España",
  email: "hola@pablobrunet.com",
  web: "pablobrunet.com",
  seoDescription:
    "Pablo Brunet — Consultor en inteligencia artificial. Estrategia, implementación y formación para generar impacto real en tu negocio.",

  /* ---- Navegación ---- */
  nav: [
    { label: "Inicio", href: "#inicio" },
    { label: "Sobre mí", href: "#sobre-mi" },
    { label: "Servicios", href: "#servicios" },
    { label: "Casos", href: "#casos" },
    { label: "Recursos", href: "#recursos" },
    { label: "Contacto", href: "#contacto" },
  ],
  cta: { label: "Hablemos", href: "#contacto" },

  /* ---- Redes (COMPLETAR: reemplazá "#" por tus URLs) ---- */
  redes: [
    { label: "LinkedIn", href: "#", icon: "linkedin" },
    { label: "Instagram", href: "#", icon: "instagram" },
    { label: "YouTube", href: "#", icon: "youtube" },
    { label: "X", href: "#", icon: "x" },
  ],

  /* ---- HERO ---- */
  hero: {
    badge: "OpenAI Partner Network",
    titulo: "IA que transforma\nnegocios reales.",
    subtitulo:
      "Acompaño a empresas a identificar oportunidades, diseñar soluciones y aplicar inteligencia artificial para optimizar procesos, mejorar decisiones y generar resultados.",
    ctas: [
      { label: "Agendar diagnóstico", href: "#contacto", primary: true },
      { label: "Sobre mí", href: "#sobre-mi", primary: false },
    ],
    // Subí tu retrato a /public/images/hero/retrato.jpg y poné la ruta acá
    img: "",
    imgLabel: "/images/hero/retrato.jpg",
  },

  /* ---- HERRAMIENTAS QUE USO E IMPLEMENTO ----
     Dejé solo herramientas verificables. Sumá/quitá logos según lo que
     realmente implementás. Subí cada logo (svg/png) a /public/images/logos/
     y poné su ruta en `img`. Si `img` está vacío se muestra el nombre. */
  herramientas: {
    titulo: "Herramientas que uso e implemento",
    logos: [
      { nombre: "OpenAI", img: "", imgLabel: "/images/logos/openai.svg" },
      { nombre: "ChatGPT", img: "", imgLabel: "/images/logos/chatgpt.svg" },
      { nombre: "Claude", img: "", imgLabel: "/images/logos/claude.svg" },
      { nombre: "Gemini", img: "", imgLabel: "/images/logos/gemini.svg" },
      { nombre: "n8n", img: "", imgLabel: "/images/logos/n8n.svg" },
      { nombre: "Supabase", img: "", imgLabel: "/images/logos/supabase.svg" },
      { nombre: "Notion", img: "", imgLabel: "/images/logos/notion.svg" },
      { nombre: "Google Workspace", img: "", imgLabel: "/images/logos/google.svg" },
    ],
  },

  /* ---- SOBRE MÍ / PILARES (brand board) ---- */
  sobreMi: {
    eyebrow: "Sobre mí",
    titulo: "Una identidad que transmite confianza, claridad y visión en movimiento.",
    parrafo:
      "La IA no es solo tecnología: es una herramienta estratégica para transformar y hacer crecer negocios. Trabajo cerca del equipo, con foco en datos y orientado a resultados medibles.",
    // Subí tu foto a /public/images/about/retrato.jpg
    img: "",
    imgLabel: "/images/about/retrato.jpg",
    pilares: [
      {
        icon: "target",
        titulo: "Preciso",
        texto: "Enfoque analítico y basado en datos.",
      },
      {
        icon: "people",
        titulo: "Humano",
        texto: "Cercano, empático y colaborativo.",
      },
      {
        icon: "growth",
        titulo: "Orientado a resultados",
        texto: "IA aplicada para generar valor real.",
      },
    ],
  },

  /* ---- SERVICIOS ---- */
  servicios: {
    eyebrow: "Servicios",
    titulo: "Servicios de alto valor",
    subtitulo: "Estrategia clara. Implementación efectiva. Resultados medibles.",
    items: [
      {
        icon: "chip",
        titulo: "Estrategia e implementación de IA",
        texto:
          "Identifico oportunidades, priorizo casos de uso y llevo la IA de la idea a la producción, integrada a tus procesos.",
        cta: "Cómo trabajamos",
      },
      {
        icon: "flow",
        titulo: "Automatización de procesos",
        texto:
          "Diseño automatizaciones que reducen trabajo manual, conectan tus herramientas y liberan tiempo del equipo.",
        cta: "Cómo trabajamos",
      },
      {
        icon: "people",
        titulo: "Formación y capacitación",
        texto:
          "Capacito a equipos y líderes para adoptar IA con criterio, autonomía y buenas prácticas.",
        cta: "Cómo trabajamos",
      },
    ],
  },

  /* ---- SPEAKER / CHARLAS ----
     COMPLETAR con tus datos reales de charlas. Subí fotos de eventos a
     /public/images/speaker/  (evento-01.jpg ... evento-05.jpg). */
  speaker: {
    eyebrow: "Charlas",
    titulo: "Charlas y formación sobre IA aplicada",
    subtitulo:
      "COMPLETAR: contá acá tu experiencia dando charlas, talleres y formaciones. Este texto es un placeholder.",
    cta: { label: "Quiero una charla", href: "#contacto" },
    fotos: [
      { img: "", imgLabel: "/images/speaker/evento-01.jpg" },
      { img: "", imgLabel: "/images/speaker/evento-02.jpg" },
      { img: "", imgLabel: "/images/speaker/evento-03.jpg" },
      { img: "", imgLabel: "/images/speaker/evento-04.jpg" },
      { img: "", imgLabel: "/images/speaker/evento-05.jpg" },
    ],
  },

  /* ---- PORTFOLIO / CASOS (scaffold — completá con casos reales) ----
     Duplicá un item y completá. Subí la miniatura a /public/images/portfolio/ */
  casos: {
    eyebrow: "Portfolio · Casos",
    titulo: "Casos reales",
    subtitulo: "Proyectos de IA aplicada a negocios. (Sección en construcción.)",
    verMas: { label: "Ver todos", href: "#" },
    items: [
      {
        titulo: "Nombre del caso",
        categoria: "Categoría",
        ubicacion: "Ubicación",
        img: "",
        imgLabel: "/images/portfolio/caso-01.jpg",
        href: "#",
      },
      {
        titulo: "Nombre del caso",
        categoria: "Categoría",
        ubicacion: "Ubicación",
        img: "",
        imgLabel: "/images/portfolio/caso-02.jpg",
        href: "#",
      },
      {
        titulo: "Nombre del caso",
        categoria: "Categoría",
        ubicacion: "Ubicación",
        img: "",
        imgLabel: "/images/portfolio/caso-03.jpg",
        href: "#",
      },
      {
        titulo: "Nombre del caso",
        categoria: "Categoría",
        ubicacion: "Ubicación",
        img: "",
        imgLabel: "/images/portfolio/caso-04.jpg",
        href: "#",
      },
      {
        titulo: "Nombre del caso",
        categoria: "Categoría",
        ubicacion: "Ubicación",
        img: "",
        imgLabel: "/images/portfolio/caso-05.jpg",
        href: "#",
      },
      {
        titulo: "Nombre del caso",
        categoria: "Categoría",
        ubicacion: "Ubicación",
        img: "",
        imgLabel: "/images/portfolio/caso-06.jpg",
        href: "#",
      },
    ],
  },

  /* ---- TESTIMONIOS (scaffold — sin nombres ni ratings inventados) ----
     Completá con testimonios reales. Subí avatares a /public/images/testimonials/ */
  testimonios: {
    eyebrow: "Testimonios",
    titulo: "Lo que dicen quienes trabajaron conmigo",
    subtitulo: "COMPLETAR con testimonios reales.",
    items: [
      {
        texto: "«Testimonio pendiente. Reemplazá este texto por una reseña real.»",
        nombre: "Nombre Apellido",
        cargo: "Cargo · Empresa",
        img: "",
        imgLabel: "/images/testimonials/avatar-01.jpg",
      },
      {
        texto: "«Testimonio pendiente. Reemplazá este texto por una reseña real.»",
        nombre: "Nombre Apellido",
        cargo: "Cargo · Empresa",
        img: "",
        imgLabel: "/images/testimonials/avatar-02.jpg",
      },
      {
        texto: "«Testimonio pendiente. Reemplazá este texto por una reseña real.»",
        nombre: "Nombre Apellido",
        cargo: "Cargo · Empresa",
        img: "",
        imgLabel: "/images/testimonials/avatar-03.jpg",
      },
    ],
  },

  /* ---- BLOG / INSIGHTS (scaffold) ----
     Subí las portadas a /public/images/blog/ */
  blog: {
    eyebrow: "Blog · Insights",
    titulo: "Ideas sobre IA aplicada",
    subtitulo: "Artículos y aprendizajes. (Sección en construcción.)",
    verMas: { label: "Ver todos", href: "#" },
    items: [
      {
        titulo: "Título del artículo",
        categoria: "Categoría",
        resumen: "Breve descripción del artículo. Reemplazá este texto.",
        img: "",
        imgLabel: "/images/blog/post-01.jpg",
        href: "#",
      },
      {
        titulo: "Título del artículo",
        categoria: "Categoría",
        resumen: "Breve descripción del artículo. Reemplazá este texto.",
        img: "",
        imgLabel: "/images/blog/post-02.jpg",
        href: "#",
      },
      {
        titulo: "Título del artículo",
        categoria: "Categoría",
        resumen: "Breve descripción del artículo. Reemplazá este texto.",
        img: "",
        imgLabel: "/images/blog/post-03.jpg",
        href: "#",
      },
    ],
  },

  /* ---- NEWSLETTER ---- */
  newsletter: {
    eyebrow: "Newsletter",
    titulo: "Suscribite a mi newsletter",
    nombreNewsletter: "COMPLETAR: nombre de tu newsletter",
    subtitulo:
      "IA aplicada a negocios: novedades, casos y herramientas, directo a tu correo. Sin spam.",
    placeholder: "tu@email.com",
    boton: "Suscribirme",
    // El form NO está conectado. Ver comentario en Newsletter.astro para
    // integrar tu proveedor (Mailchimp, Beehiiv, ConvertKit, etc.).
  },

  /* ---- CTA FINAL ---- */
  finalCta: {
    titulo: "¿Listo para escalar con inteligencia artificial?",
    subtitulo:
      "Convertí la IA en una ventaja competitiva. Agendá un diagnóstico y definamos el primer paso.",
    cta: { label: "Agendar diagnóstico", href: "#contacto" },
    nota: "Respuesta en 24 h",
  },

  /* ---- FOOTER ---- */
  footer: {
    mision:
      "Estrategia, implementación y formación en inteligencia artificial para generar impacto real en tu empresa.",
    columnas: [
      {
        titulo: "Servicios",
        links: [
          { label: "Estrategia e implementación de IA", href: "#servicios" },
          { label: "Automatización de procesos", href: "#servicios" },
          { label: "Formación y capacitación", href: "#servicios" },
        ],
      },
      {
        titulo: "Explorar",
        links: [
          { label: "Sobre mí", href: "#sobre-mi" },
          { label: "Casos", href: "#casos" },
          { label: "Blog", href: "#recursos" },
          { label: "Contacto", href: "#contacto" },
        ],
      },
    ],
    legales: [
      { label: "Términos", href: "#" },
      { label: "Privacidad", href: "#" },
      { label: "Cookies", href: "#" },
    ],
  },
} as const;

export type Site = typeof site;
