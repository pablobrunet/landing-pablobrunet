/* =====================================================================
   CONTENIDO GLOBAL — Pablo Brunet
   ---------------------------------------------------------------------
   Datos generales, navegación y secciones exclusivas del home.
   El contenido de cada dominio vive en su propio archivo:
     servicios.ts · blog.ts · recursos.ts · television.ts · sobreMi.ts

   FOTOS: cada campo `img` apunta a /public/images/...  Si está vacío ("")
   se muestra un MARCO VACÍO con la ruta esperada. Subí la foto y poné la ruta.

   TÍTULOS: el resalte verde de *un fragmento entre asteriscos* se aplica
   SOLO a los títulos principales — el H1 del hero y el H1 de cada página.
   En los títulos de sección (H2) los asteriscos se ignoran y el texto sale
   en un solo color, para no repetir el recurso en toda la página.
   Ver src/lib/texto.ts.
   ===================================================================== */

export const site = {
  /* ---- Datos generales / SEO ---- */
  nombre: "Pablo Brunet",
  /* Es lo que arma el título de la home: `nombre — tagline`. Eso es lo que
     muestra Google como encabezado del resultado y lo que aparece en la
     pestaña del navegador y en las previsualizaciones al compartir el
     enlace (og:title). Cambiarlo acá lo cambia en los tres lados.
     Las páginas internas arman su propio título y no lo usan. */
  tagline: "IA para PyMEs",
  rol: "Speaker y capacitador en inteligencia artificial",
  // Chips del hero: son la oferta, no capacidades abstractas.
  disciplinas: ["Charlas y keynotes", "Capacitación de equipos", "Método INTEGRA"],
  ubicacion: "Santa Fe, Argentina",
  email: "pbrunet@innerflowai.com",
  web: "pablobrunet.com",
  seoDescription:
    "Pablo Brunet — Speaker y capacitador en inteligencia artificial aplicada a negocios. Charlas, keynotes y programas de formación para equipos y organizaciones.",

  /* ---- LOGO DE MARCA ----
       claro  → versión para fondos claros (navbar). Es "Logo v1" con el
                fondo blanco recortado, así se apoya bien sobre la barra
                translúcida.
       oscuro → versión para fondos oscuros (footer). Derivada de v1: el
                wordmark azul petróleo pasa a blanco, la bajada y el isotipo
                a los verdes claros de la paleta. Fondo transparente.
     Ambas se generaron desde /images/logos/Logo v1.PNG, que viene con fondo
     blanco opaco y sobre la barra translúcida se notaría como un recuadro. */
  logo: {
    claro: "/images/brand/logo-pablo-brunet.png",
    oscuro: "/images/brand/logo-pablo-brunet-claro.png",
    alto: 38, // alto en px con el que se muestra
  },

  /* ---- Navegación (rutas reales) ----
     `menu` indica qué desplegable mostrar; se arma en Navbar desde los datos. */
  nav: [
    { label: "Sobre mí", href: "/sobre-mi" },
    { label: "Servicios", href: "/servicios", menu: "servicios" },
    { label: "Recursos", href: "/recursos", menu: "recursos" },
    { label: "Contacto", href: "/contacto" },
  ],
  cta: { label: "Hablemos", href: "/contacto" },

  /* ---- WHATSAPP (botón flotante, abajo a la derecha) ----
     `numero` va en formato internacional, sin +, sin espacios ni guiones.
     54 (Argentina) · 9 (móvil) · 342 (Santa Fe) · 6112533
     `mensaje` es el texto con el que se abre el chat, ya escrito. */
  whatsapp: {
    numero: "5493426112533",
    mensaje: "Hola Pablo, te escribo desde tu web. Quería consultarte por…",
    etiqueta: "Escribime por WhatsApp",
  },

  /* ---- Redes ----
     El ORDEN del array es el orden de prioridad: así se muestran en el pie,
     en la barra y en el bloque grande del home. */
  redesMeta: {
    eyebrow: "Seguime",
    titulo: "Todos los días subo algo nuevo",
    subtitulo: "Contenido sobre IA aplicada a negocios, en el formato de cada red.",
  },
  redes: [
    { label: "LinkedIn", handle: "in/pablobrunet", href: "https://www.linkedin.com/in/pablobrunet/", icon: "linkedin" },
    { label: "YouTube", handle: "@soypablobrunet", href: "https://www.youtube.com/@soypablobrunet", icon: "youtube" },
    { label: "Instagram", handle: "@soypablobrunet.ai", href: "https://www.instagram.com/soypablobrunet.ai", icon: "instagram" },
    { label: "TikTok", handle: "@soypablobrunet", href: "https://www.tiktok.com/@soypablobrunet", icon: "tiktok" },
  ],

  /* ---- HERO (home) ---- */
  hero: {
    /* La insignia sola obliga a entrecerrar los ojos y no dice por qué
       importa. Al lado va una etiqueta de dos líneas que NO repite lo que
       ya se lee en la imagen ("OpenAI Select Partner"), sino que aporta el
       dato que falta: que es una acreditación formal. El bloque enlaza a la
       explicación completa en /sobre-mi. */
    badgeImg: "/images/credenciales/openai-partner-network.png",
    badgeAlt: "Insignia oficial OpenAI Select Partner",
    badgeTitulo: "Acreditación oficial",
    badgeDetalle: "Partner del ecosistema de OpenAI",
    badgeHref: "/sobre-mi#openai",
    /* Todo en un renglón: la tipografía corta donde le toque según el ancho.
       El resalte va en la segunda frase porque ahí está el giro — el
       contraste entre hablar y usar es todo el mensaje.
       (Un \n forzaría el corte; los *asteriscos* pintan el fragmento.) */
    titulo: "Dejá de hablar de IA. *Empezá a usarla.*",
    // Dos párrafos: el primero abre, el segundo desarrolla.
    subtitulo: [
      "Acompaño a empresas que quieren trabajar mejor, decidir más rápido y crecer con inteligencia artificial.",
      "Ayudo a líderes y organizaciones a transformar su manera de trabajar, desarrollar nuevas capacidades y convertir la inteligencia artificial en una ventaja real. Trabajo para que la IA deje de ser un tema de conversación y empiece a mover resultados.",
    ],
    ctas: [
      { label: "Quiero una charla", href: "/servicios/speaker-y-capacitador", primary: true },
      { label: "Ver mi agenda", href: "/contacto", primary: false },
    ],
    // PNG recortado (fondo transparente) → lo dibuja <Retrato />, no <Frame />
    img: "/images/hero/retrato-hero.png",
  },

  /* ---- AGENDA ----
     Widget de reserva de LeadConnector. Si cambiás de calendario, sólo
     reemplazá el `id`: la URL se arma sola.
     ⚠️ Este es el calendario GENERAL de Pablo (el de /contacto y el home).
     El diagnóstico del Método INTEGRA usa otro calendario distinto, que
     vive en data/integra.ts → cierre.calendarioId. No mezclarlos. */
  agenda: {
    eyebrow: "Agenda",
    titulo: "Reservá un espacio *en mi calendario*",
    subtitulo:
      "Elegí el día y el horario que mejor te queden. Son 30 minutos para entender tu caso y decirte por dónde empezar.",
    id: "nm0xMF4ZzrA3ycbREOLG",
  },

  /* ---- HERRAMIENTAS (home) — carrusel infinito ----
     Dejá solo herramientas que realmente implementás.
     `key` elige el logo monocromo dibujado en components/ToolLogo.astro
     (chatgpt · claude · gemini · n8n · supabase · notion · google ·
      gohighlevel · vercel).
     Si preferís el logo oficial a color, subilo a /public/images/logos/ y
     poné la ruta en `img`: tiene prioridad sobre el dibujo. */
  herramientas: {
    titulo: "Herramientas que *uso e implemento*",
    logos: [
      { nombre: "ChatGPT", key: "chatgpt", img: "", imgLabel: "/images/logos/chatgpt.svg" },
      { nombre: "Claude", key: "claude", img: "", imgLabel: "/images/logos/claude.svg" },
      { nombre: "Gemini", key: "gemini", img: "", imgLabel: "/images/logos/gemini.svg" },
      { nombre: "n8n", key: "n8n", img: "", imgLabel: "/images/logos/n8n.svg" },
      { nombre: "GoHighLevel", key: "gohighlevel", img: "", imgLabel: "/images/logos/gohighlevel.svg" },
      { nombre: "Supabase", key: "supabase", img: "", imgLabel: "/images/logos/supabase.svg" },
      { nombre: "Vercel", key: "vercel", img: "", imgLabel: "/images/logos/vercel.svg" },
      { nombre: "Notion", key: "notion", img: "", imgLabel: "/images/logos/notion.svg" },
      { nombre: "Google Workspace", key: "google", img: "", imgLabel: "/images/logos/google.svg" },
    ],
  },

  /* ---- SPEAKER / CHARLAS (home) ----
     Las fotos salen de /images/speaker/ (ver el README de esa carpeta). */
  speaker: {
    eyebrow: "Charlas",
    titulo: "Charlas y formación sobre *IA aplicada*",
    /* Redactado con eventos verificables (los mismos que están en prensa.ts).
       Si sumás otro escenario, agregalo acá también. */
    subtitulo:
      "Doy charlas y capacito equipos en eventos, empresas y universidades. Pasé por AgroActiva, TEDIND-X, las Jornadas Internacionales de Jóvenes Emprendedores de la UNL y la Escuela Expone de ASSAL, hablándole a públicos muy distintos: productores agropecuarios, industria alimentaria, jóvenes emprendedores y equipos de dirección.",
    cta: { label: "Quiero una charla", href: "/contacto" },
    fotos: [
      { img: "/images/speaker/evento-01.jpg", imgLabel: "/images/speaker/evento-01.jpg" },
      { img: "/images/speaker/evento-07.jpg", imgLabel: "/images/speaker/evento-07.jpg" },
      { img: "/images/speaker/evento-03.jpg", imgLabel: "/images/speaker/evento-03.jpg" },
      { img: "/images/speaker/evento-08.jpg", imgLabel: "/images/speaker/evento-08.jpg" },
      { img: "/images/speaker/evento-05.jpg", imgLabel: "/images/speaker/evento-05.jpg" },
    ],
  },

  /* ---- NEWSLETTER ---- */
  newsletter: {
    eyebrow: "Newsletter",
    titulo: "Suscribite a *mi newsletter*",
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
          { label: "Speaker y capacitador", href: "/servicios/speaker-y-capacitador", externo: false },
          { label: "Método INTEGRA", href: "/programa-integra", externo: false },
          { label: "EcomCloser™", href: "https://innerflowai.com", externo: true },
        ],
      },
      {
        titulo: "Explorar",
        links: [
          { label: "Sobre mí", href: "/sobre-mi", externo: false },
          { label: "Blog", href: "/blog", externo: false },
          { label: "Contacto", href: "/contacto", externo: false },
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
