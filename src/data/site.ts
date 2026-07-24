/* =====================================================================
   CONTENIDO GLOBAL — Pablo Brunet
   ---------------------------------------------------------------------
   Datos generales, navegación y secciones exclusivas del home.
   El contenido de cada dominio vive en su propio archivo:
     servicios.ts · casos.ts · verticales.ts · blog.ts · recursos.ts · sobreMi.ts

   FOTOS: cada campo `img` apunta a /public/images/...  Si está vacío ("")
   se muestra un MARCO VACÍO con la ruta esperada. Subí la foto y poné la ruta.
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

  /* ---- Navegación (rutas reales) ----
     `menu` indica qué desplegable mostrar; se arma en Navbar desde los datos. */
  nav: [
    { label: "Sobre mí", href: "/sobre-mi" },
    { label: "Servicios", href: "/servicios", menu: "servicios" },
    { label: "Casos", href: "/casos", menu: "casos" },
    { label: "Verticales", href: "/verticales", menu: "verticales" },
    { label: "Recursos", href: "/recursos", menu: "recursos" },
    { label: "Contacto", href: "/contacto" },
  ],
  cta: { label: "Hablemos", href: "/contacto" },

  /* ---- Redes (COMPLETAR: reemplazá "#" por tus URLs) ---- */
  redes: [
    { label: "LinkedIn", href: "#", icon: "linkedin" },
    { label: "Instagram", href: "#", icon: "instagram" },
    { label: "YouTube", href: "#", icon: "youtube" },
    { label: "X", href: "#", icon: "x" },
  ],

  /* ---- HERO (home) ---- */
  hero: {
    badge: "OpenAI Partner Network",
    titulo: "IA que transforma\nnegocios reales.",
    subtitulo:
      "Acompaño a empresas a identificar oportunidades, diseñar soluciones y aplicar inteligencia artificial para optimizar procesos, mejorar decisiones y generar resultados.",
    ctas: [
      { label: "Agendar diagnóstico", href: "/contacto", primary: true },
      { label: "Sobre mí", href: "/sobre-mi", primary: false },
    ],
    img: "",
    imgLabel: "/images/hero/retrato.jpg",
  },

  /* ---- HERRAMIENTAS (home) ----
     Dejá solo herramientas que realmente implementás. Subí logos a /images/logos/ */
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

  /* ---- SPEAKER / CHARLAS (home) ----
     COMPLETAR con tus datos reales. Fotos en /images/speaker/ */
  speaker: {
    eyebrow: "Charlas",
    titulo: "Charlas y formación sobre IA aplicada",
    subtitulo:
      "COMPLETAR: contá acá tu experiencia dando charlas, talleres y formaciones. Este texto es un placeholder.",
    cta: { label: "Quiero una charla", href: "/contacto" },
    fotos: [
      { img: "", imgLabel: "/images/speaker/evento-01.jpg" },
      { img: "", imgLabel: "/images/speaker/evento-02.jpg" },
      { img: "", imgLabel: "/images/speaker/evento-03.jpg" },
      { img: "", imgLabel: "/images/speaker/evento-04.jpg" },
      { img: "", imgLabel: "/images/speaker/evento-05.jpg" },
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
  },

  /* ---- CTA FINAL (reutilizable) ---- */
  finalCta: {
    titulo: "¿Listo para escalar con inteligencia artificial?",
    subtitulo:
      "Convertí la IA en una ventaja competitiva. Agendá un diagnóstico y definamos el primer paso.",
    cta: { label: "Agendar diagnóstico", href: "/contacto" },
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
          { label: "Estrategia e implementación de IA", href: "/servicios/estrategia-e-implementacion-de-ia" },
          { label: "Automatización de procesos", href: "/servicios/automatizacion-de-procesos" },
          { label: "Formación y capacitación", href: "/servicios/formacion-y-capacitacion" },
          { label: "Diagnóstico de IA", href: "/servicios/diagnostico-de-ia" },
        ],
      },
      {
        titulo: "Explorar",
        links: [
          { label: "Sobre mí", href: "/sobre-mi" },
          { label: "Casos", href: "/casos" },
          { label: "Verticales", href: "/verticales" },
          { label: "Blog", href: "/blog" },
          { label: "Contacto", href: "/contacto" },
        ],
      },
    ],
    legales: [
      { label: "Términos", href: "/legal/terminos" },
      { label: "Privacidad", href: "/legal/privacidad" },
      { label: "Cookies", href: "/legal/cookies" },
    ],
  },
} as const;

export type Site = typeof site;
