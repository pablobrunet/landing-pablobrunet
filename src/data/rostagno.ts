/* =====================================================================
   /programa-ejecutivos/alejandro-rostagno — contenido del mini sitio
   ---------------------------------------------------------------------
   Perfil de Alejandro Rostagno, el otro capacitador del programa para
   ejecutivos. Se llega desde la tarjeta del equipo ("Conocer más").

   Todo sale de su dossier "Antecedente en fotos" (ago-26): los títulos,
   las cifras y los testimonios son los que figuran ahí, sin inventar
   nada. Las fotos se extrajeron de ese PDF y viven en
   /public/images/rostagno/.
   ===================================================================== */

const IMG = "/images/rostagno";

export const rostagno = {
  seo: {
    title: "Alejandro Rostagno — Speaker, consultor y capacitador | Programas AI First",
    description:
      "Conferencista internacional en experiencia de cliente, venta consultiva e IA aplicada a la gestión comercial. Capacitador del Programa para Ejecutivos junto a Pablo Brunet.",
  },

  hero: {
    chip: "Equipo del Programa para Ejecutivos",
    nombre: "Alejandro Rostagno",
    rol: "Conferencista internacional · Consultor · Capacitador",
    bajada:
      "Hace que los equipos comerciales y de atención miren al cliente con otros ojos. Experiencia de cliente, venta consultiva e IA aplicada a la gestión comercial, contadas desde el escenario y bajadas al trabajo de todos los días.",
    imagen: `${IMG}/convergencia.webp`,
    imagenAlt: "Alejandro Rostagno dando una conferencia frente al público",
    pie: "Convergencia · La visión de los CxOs",
  },

  /* Cifras que figuran en el dossier */
  cifras: [
    { valor: "6", label: "países donde dio conferencias", detalle: "Argentina, EE.UU., Chile, Bolivia, Paraguay y Uruguay" },
    { valor: "+900", label: "participantes en una sola conferencia", detalle: "y varias salas de +300 y +600" },
    { valor: "100%", label: "volvería a convocarlo", detalle: "encuesta al público asistente, 2025" },
    { valor: "#1", label: "mejor mentor votado", detalle: "Startup Weekend" },
  ],

  /* Quién es: retrato + los seis roles con los que se presenta */
  perfil: {
    eyebrow: "Quién es",
    titulo: "Seis roles, un mismo foco:",
    tituloResalte: "el cliente.",
    retrato: `${IMG}/retrato-vertical.webp`,
    texto:
      "Alejandro combina escenario, aula y consultoría. Lleva años trabajando con empresas, cámaras, universidades y congresos de la región sobre cómo se vende, cómo se atiende y cómo se lidera cuando el cliente está en el centro. En el programa aporta la mirada de experiencia de cliente, rentabilidad y ejecución comercial.",
    roles: [
      { titulo: "Conferencista", desc: "Conferencias de apertura y cierre en congresos de Argentina, EE.UU. y Latinoamérica." },
      { titulo: "Capacitador", desc: "Trainings y workshops in company: venta consultiva, atención premium, negociación." },
      { titulo: "Consultor", desc: "CRM, gestión de relaciones con clientes y transformación digital de la atención." },
      { titulo: "Docente", desc: "Cátedras universitarias de Competencias Directivas y Marketing de Relaciones." },
      { titulo: "Mentor", desc: "Startup Weekend, IncuBAte y programas de emprendedores de la UNL." },
      { titulo: "Coach", desc: "Acompañamiento a líderes y equipos comerciales en procesos de cambio." },
    ],
  },

  /* Carrusel de logos: organizaciones del dossier que lo convocaron.
     Los archivos viven en /public/images/rostagno/logos/ (bajados de
     Wikimedia Commons o del sitio de cada empresa). */
  logos: {
    eyebrow: "Organizaciones",
    titulo: "Empresas e instituciones que lo convocaron.",
    items: [
      { nombre: "Meta", img: `${IMG}/logos/meta.svg` },
      { nombre: "Sancor Seguros", img: `${IMG}/logos/sancor-seguros.svg` },
      { nombre: "Abbott", img: `${IMG}/logos/abbott.svg` },
      { nombre: "Bayer", img: `${IMG}/logos/bayer.svg` },
      { nombre: "Alcatel-Lucent Enterprise", img: `${IMG}/logos/alcatel-lucent-enterprise.svg` },
      { nombre: "Nieto Senetiner", img: `${IMG}/logos/nieto-senetiner.svg` },
      { nombre: "Yoizen", img: `${IMG}/logos/yoizen.svg` },
      { nombre: "Prevención Salud", img: `${IMG}/logos/prevencion-salud.svg` },
      { nombre: "Granix", img: `${IMG}/logos/granix.png` },
      { nombre: "Techstars · Startup Weekend", img: `${IMG}/logos/techstars.png` },
      { nombre: "Bolsa de Comercio de Santa Fe", img: `${IMG}/logos/bcsf.png` },
      { nombre: "Universidad Nacional del Litoral", img: `${IMG}/logos/unl.svg` },
      { nombre: "Universidad Adventista del Plata", img: `${IMG}/logos/uap.svg` },
    ],
  },

  /* Galería: la primera foto de cada fila va en grande */
  galeria: {
    eyebrow: "En acción",
    titulo: "Del escenario al taller.",
    fotos: [
      { src: `${IMG}/tedx.webp`, pie: "TEDxUAP" },
      { src: `${IMG}/cx-day-argentina.webp`, pie: "CX Day Argentina 2025" },
      { src: `${IMG}/teatro-colon.webp`, pie: "Cierre IncuBAte 2025 · Teatro Colón" },
      { src: `${IMG}/soar-usa-2026.webp`, pie: "Método SOAR aplicado a Ventas · EE.UU. 2026" },
      { src: `${IMG}/quien-mato-la-experiencia.webp`, pie: "¿Quién mató a la experiencia del cliente?" },
      { src: `${IMG}/cx-day-chile.webp`, pie: "CX Day Chile 2025" },
      { src: `${IMG}/escenario-cx-day.webp`, pie: "CX Day Argentina 2025" },
      { src: `${IMG}/meta.webp`, pie: "Meta · Transformación digital en Salud" },
      { src: `${IMG}/sancor-taller.webp`, pie: "Grupo Sancor Seguros · IA aplicada a la gestión comercial" },
      { src: `${IMG}/cx-day-argentina-publico.webp`, pie: "CX Day Argentina 2025" },
      { src: `${IMG}/coner-tech.webp`, pie: "ConER Tech · Entre Ríos" },
      { src: `${IMG}/sancor-equipo.webp`, pie: "Masterclass: Experiencias Memorables" },
    ],
  },

  /* Temas con los que trabaja */
  temas: {
    eyebrow: "Temas",
    titulo: "Sobre qué habla y capacita.",
    items: [
      "Experiencia de cliente (CX)",
      "Venta consultiva",
      "IA aplicada a la gestión comercial",
      "Atención al cliente premium",
      "Negociación y cobranzas",
      "Customer Journey",
      "Management Gamification",
      "Marketing de relaciones",
      "Competencias directivas",
      "Marca personal",
    ],
  },

  testimonios: {
    eyebrow: "Lo que dicen",
    titulo: "Salas que se quieren",
    tituloResalte: "comer la cancha.",
    items: [
      {
        texto: "Impresionados con tu conferencia. Tenés un talento muy especial. Nos atrapás…",
        autor: "Ing. Jorge Grabina",
        cargo: "CEO de CyT Comunicaciones",
      },
      {
        texto: "…me ayudaste a hacer el “click” respecto a la óptica desde la cual encarar un problema…",
        autor: "Ing. Martín Beltramone",
        cargo: "Jefe de Infraestructura y Tecnología, Sancor Salud",
      },
      {
        texto: "Excelente. Tus movimientos, interacción con el público, posturas, cambios de tono… espectacular.",
        autor: "Eugenio Picazo",
        cargo: "Director Comercial, Isoplus",
      },
      {
        texto: "Su profesionalismo, actitud positiva, conocimiento técnico y empatía hacen que sea un placer llevar adelante un proyecto con él.",
        autor: "Martha Palacio",
        cargo: "Australia",
      },
      {
        texto: "Es una capacitación 100% recomendable: dinámica, interesante y, sobre todo, te cambia la cabeza y te brinda herramientas para crecer.",
        autor: "P.A.",
        cargo: "Prevención Salud",
      },
      {
        texto: "…outstanding personal and professional conditions…",
        autor: "Horacio Hourbeigt",
        cargo: "Director Comercial, Alcatel-Lucent Enterprise",
      },
    ],
  },

  cierre: {
    titulo: "Alejandro es parte del Programa para Ejecutivos.",
    subtitulo: "Si querés que trabajemos con tu empresa, arranquemos por una reunión.",
    ctaPrimario: "Agendar reunión de descubrimiento",
    ctaSecundario: "Ver el programa",
  },
} as const;
