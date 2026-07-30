/* =====================================================================
   SERVICIOS — datos + páginas de detalle (/servicios y /servicios/[slug])
   ---------------------------------------------------------------------
   El ORDEN de este array es el orden en que aparecen en toda la web
   (home, /servicios, menú del navbar y footer). El primero es la punta de
   lanza de la propuesta: speaker y capacitador.

   `externo`: si tiene una URL, ese servicio NO genera subpágina acá y
   todos los enlaces apuntan al sitio externo en una pestaña nueva.

   Los títulos admiten *un fragmento entre asteriscos* para resaltarlo.
   ===================================================================== */

export interface Servicio {
  slug: string;
  titulo: string;
  icon: string;
  resumen: string; // aparece en tarjetas / índice
  hero: string; // frase de la cabecera de su página
  paraQuien: string;
  problema: string;
  enfoque: { titulo: string; texto: string }[];
  entregables: string[];
  faq: { q: string; a: string }[];
  img: string;
  imgLabel: string;
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
  /* Muestra en la subpágina la misma grilla de charlas grabadas del home
     (los videos viven en data/videos.ts → `charlas`). */
  mostrarCharlas?: boolean;
  /* Carrusel de fotos al pie de la subpágina. Con `fotos` vacío no se dibuja. */
  galeria?: {
    eyebrow: string;
    titulo: string;
    texto?: string;
    fotos: { img: string; imgLabel: string; alt?: string }[];
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
      titulo: "Cómo se ve una capacitación",
      texto:
        "Talleres en los que el equipo trabaja sobre sus propias tareas, no sobre casos de laboratorio.",
      /* PARA CARGAR LAS FOTOS: copialas en /public/images/capacitaciones/
         (ver el README de esa carpeta) y sumá una línea por cada una.
         Mientras esté vacío, la sección no se dibuja. */
      fotos: [
        // { img: "/images/capacitaciones/capacitacion-01.jpg", imgLabel: "/images/capacitaciones/capacitacion-01.jpg", alt: "Capacitación en IA aplicada" },
      ],
    },
  },
  {
    /* Es la ficha de IA Simple para PyMEs (línea ADOPTA-60). El detalle fino
       del método —los seis movimientos, los 13 componentes del sistema, la
       ficha de 8 campos— queda para la propuesta comercial: acá va lo que
       necesita entender alguien que todavía no te conoce. */
    slug: "estrategia-e-implementacion-de-ia",
    titulo: "Estrategia e implementación de IA",
    icon: "chip",
    resumen:
      "Instalo en tu empresa un sistema propio para detectar, priorizar, probar y escalar oportunidades de IA. En 60 días, operado por tu propia gente.",
    hero: "No te dejo un caso que funcionó. Te dejo la forma de seguir encontrando los próximos.",
    paraQuien:
      "PyMEs que ya entendieron que la IA sirve, pero no quieren depender de un consultor externo cada vez que aparece una oportunidad. Aplica a toda la empresa, no solo al área comercial.",
    problema:
      "El problema no es que falten herramientas: es que nadie adentro tiene un método para decidir cuáles valen la pena, probarlas en serio y escalar lo que funciona. Así cada iniciativa arranca de cero, depende de quien la empuja y se apaga cuando esa persona se ocupa de otra cosa.",
    /* Las cuatro etapas quincenales: es la forma más clara de contar el
       recorrido sin entrar en la mecánica interna. */
    enfoque: [
      {
        titulo: "Preparar · días 1 a 15",
        texto:
          "Aterrizamos el punto de partida: cómo trabaja hoy la empresa, quién decide qué y dónde duele de verdad.",
      },
      {
        titulo: "Priorizar · días 15 a 30",
        texto:
          "Ordenamos las oportunidades detectadas y elegimos cuáles se prueban primero, por impacto y por esfuerzo.",
      },
      {
        titulo: "Experimentar · días 30 a 45",
        texto:
          "Pruebas aplicadas: una oportunidad concreta por vez, con responsable, plazo y evidencia. Cada una cierra en una decisión — adoptar, iterar, pausar, descartar o escalar.",
      },
      {
        titulo: "Institucionalizar · días 45 a 60",
        texto:
          "El método queda funcionando con gente de la casa, con su cadencia de seguimiento y un plan operativo para los 90 días siguientes.",
      },
    ],
    entregables: [
      "Un sistema de adopción de IA documentado: roles, tablero de oportunidades, protocolo de pruebas y repositorio",
      "Tablero de oportunidades priorizado por área",
      "Pruebas aplicadas cerradas, cada una con su evidencia y su decisión",
      "Equipo interno formado para seguir sin acompañamiento externo",
      "Plan operativo para los 90 días posteriores al ciclo",
    ],
    faq: [
      {
        q: "¿Quién hace el trabajo, vos o mi equipo?",
        a: "Tu equipo. Yo guío el proceso, sostengo la cadencia y aporto el método, pero no ejecuto ni construyo por ustedes. Es la única forma de que la capacidad quede instalada: si lo hago yo, cuando me voy se va conmigo.",
      },
      {
        q: "¿Cuánto tiempo le demanda a la empresa?",
        a: "Una persona cumple el rol de referente de adopción con unas 3 o 4 horas semanales. El resto del equipo participa según el área y la prueba en curso. Hay un encuentro operativo por semana y una alineación con dirección cada quince días.",
      },
      {
        q: "¿Incluye desarrollo, integraciones o automatizaciones?",
        a: "No dentro del ciclo. El foco de estos 60 días es que la empresa sepa decidir y probar. Cuando una prueba justifica construir algo, se cotiza y se ejecuta aparte — normalmente desde InnerFlow AI.",
      },
      {
        q: "¿Qué pasa si una prueba sale mal?",
        a: "Descartar con evidencia también es un resultado. Saber que algo no conviene, y por qué, ahorra la plata y el tiempo que se hubieran ido en implementarlo.",
      },
    ],
    intro:
      "Este servicio es **IA Simple para PyMEs**, el programa que fundé para acompañar a empresas a implementar un sistema práctico con el que detectar, priorizar, probar y escalar oportunidades reales de inteligencia artificial. El ciclo dura 60 días y lo opera gente de la casa.",
    // Charla en la Unión Industrial de Santa Fe. Apaisada: va en 4:3.
    imgTarjeta: "/images/servicios/estrategia-tarjeta.jpg",
    img: "/images/servicios/estrategia.jpg",
    imgLabel: "/images/servicios/estrategia.jpg",
    imgRatio: "4/3",
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

/** A dónde apunta cada servicio: su subpágina, o el sitio externo. */
export const hrefServicio = (s: Servicio) => s.externo ?? `/servicios/${s.slug}`;

/** Servicios con página propia dentro de este sitio. */
export const serviciosInternos = servicios.filter((s) => !s.externo);

export const getServicio = (slug: string) => servicios.find((s) => s.slug === slug);
