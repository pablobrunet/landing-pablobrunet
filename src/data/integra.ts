/* =====================================================================
   MÉTODO INTEGRA — contenido de la landing /programa-integra
   ---------------------------------------------------------------------
   TODO el texto de la landing vive acá. Las páginas y los componentes de
   /src/components/integra sólo lo dibujan: para cambiar una palabra no
   hace falta tocar código.

   Arquitectura de nombres (Brief Maestro del 2026-08-05, confirmado):
     Marca      → Pablo Brunet (creador del Método INTEGRA)
     Método     → Método INTEGRA
     Programa   → INTEGRA 60   (con espacio, nunca "INTEGRA-60")
     Sistema    → Sistema INTEGRA
     Diagnóstico gratuito → Chequeo INTEGRA (nombre todavía provisorio)

   PROHIBIDO en toda la página (regla dura del brief): prometer "un caso
   implementado", "una automatización funcionando" o "un resultado medido
   a los 30 días" como producto. Lo que se vende es capacidad instalada.
   ===================================================================== */

/* ---------------------------------------------------------------------
   Tipos de las dos estructuras heterogéneas (no todas las fases tienen
   `destacado`, no todas las opciones del quiz tienen `hallazgo`). Van
   tipadas a mano para que los componentes puedan leer esos campos sin
   pelearse con la inferencia de `as const`.
   --------------------------------------------------------------------- */
export interface ClaveFase {
  icono: string;
  titulo: string;
  texto: string;
}

export interface FaseIntegra {
  letra: string;
  nombre: string;
  /** Ícono del selector; nombre del set de Icon.astro. */
  icono: string;
  /** Tramo del calendario, en la píldora del panel. */
  dias: string;
  /** Frase corta del panel oscuro. Lo que va entre *asteriscos* se pinta. */
  lema: string;
  /** La pregunta que ordena la fase: encabeza el panel. */
  pregunta: string;
  texto: string;
  /** Las tres cosas concretas que deja la fase. */
  claves: ClaveFase[];
  /** Línea que cierra el panel. */
  remate: string;
  /** Solo la G: corre del día 1 al 60, no es un paso del camino. */
  transversal?: boolean;
}

export interface OpcionChequeo {
  texto: string;
  /** 0 (peor) a 2 (mejor). Sin peso, no puntúa: solo segmenta. */
  peso?: number;
  /** Lectura que se devuelve si eligió esta opción. */
  hallazgo?: string;
}

export interface PreguntaChequeo {
  id: string;
  texto: string;
  opciones: OpcionChequeo[];
}

export const integra = {
  /* ---- Nombres centralizados ----
     Están acá para que un cambio de nombre se propague solo. Los dos
     provisorios (chequeo y membresía) son los que más riesgo tienen. */
  marca: {
    persona: "Pablo Brunet",
    firma: "Creador del Método INTEGRA",
    metodo: "Método INTEGRA",
    programa: "INTEGRA 60",
    sistema: "Sistema INTEGRA",
    chequeo: "Chequeo INTEGRA",
    clinica: "Clínica INTEGRA",
    workbook: "Workbook INTEGRA",
    repositorio: "Repositorio INTEGRA",
  },

  seo: {
    title: "Método INTEGRA — Instalá en tu empresa la capacidad de integrar IA con método",
    description:
      "INTEGRA 60: en 60 días tu empresa aprende a identificar oportunidades de inteligencia artificial, priorizarlas, probarlas sobre trabajo real y decidir con evidencia. Primer paso gratis: el Chequeo INTEGRA.",
  },

  /* ---- Ancla de navegación interna de la propia landing ---- */
  anclas: {
    metodo: "metodo",
    chequeo: "chequeo",
    agenda: "agenda-integra",
  },

  /* =====================================================================
     1 · HERO + VSL
     ===================================================================== */
  hero: {
    chip: "Para PyMEs que ya usan IA y no ven resultados",
    /* Headline principal. Las alternativas validadas quedan anotadas para
       testear sin volver a buscarlas en la spec:
         A · "Tu PyME no necesita otro curso de inteligencia artificial."
         B · "Tu empresa ya paga por IA. Todavía no cobró nada a cambio."
         C · "En 60 días instalamos en tu empresa la capacidad para
              integrar inteligencia artificial con método." */
    titulo: "El resultado no es usar IA.",
    tituloResalte: "Es saber qué hacer con ella.",
    subtitulo:
      "Cada persona usa una herramienta distinta, se pagan suscripciones que nadie controla y las capacitaciones no cambiaron nada. En 60 días instalamos en tu empresa un sistema práctico para integrar IA: gente formada, oportunidades priorizadas, pruebas sobre trabajo real y una forma de decidir.",
    ctaPrimario: "Agendar diagnóstico gratuito",
    ctaPrimarioNota: "30 minutos, por videollamada. Te vas con claridad, lo contrates o no.",
    ctaSecundario: "Hacer el chequeo de 2 minutos",
    /* Franja de confianza, debajo de los botones. */
    confianza: [
      { tipo: "logo", texto: "Miembro del OpenAI Partner Network", img: "/images/credenciales/openai-partner-network.png" },
    ],
  },

  /* ---- Imagen del hero ----
     Va sin reproductor: todavía no hay video. El archivo vive en
     src/assets/hero/ y no en public/, para que Astro lo comprima y sirva
     en webp — el original son 3,2 MB de cámara de celular.
     Cuando exista el video, esta imagen pasa a ser su portada. */
  imagen: {
    alt: "Pablo Brunet trabajando con un equipo durante un encuentro del Método INTEGRA",
  },

  /* =====================================================================
     2 · ESPEJO DEL PROBLEMA (interactivo)
     ===================================================================== */
  espejo: {
    titulo: "¿Cuántas de estas te pasan hoy?",
    subtitulo: "Tocá las que reconozcas en tu empresa. Sin registro, sin trampa.",
    dolores: [
      "Cada persona usa herramientas de IA diferentes, sin criterio común.",
      "Se pagan suscripciones sin saber si hacen falta.",
      "El equipo conoce herramientas, pero no sabe aplicarlas al trabajo real.",
      "Las capacitaciones quedaron desconectadas del día a día.",
      "No se sabe qué tarea, área o proceso mejorar primero.",
      "Hay iniciativas aisladas, pero no una estrategia sostenida.",
    ],
    /* Una respuesta POR CANTIDAD marcada, no por tramos: así el
       diagnóstico sube de a poco en vez de saltar de golpe.
       ⚠️ Invariante: una entrada por cada dolor, en orden (la primera es
       "marcó 1", la última "marcó todas"). Si cambia `dolores`, esta
       lista tiene que cambiar igual. Con cero marcadas no se usa ninguna:
       ahí se muestra la pista de "tocá las que reconozcas". */
    respuestas: [
      {
        titulo: "Una sola, y ya se nota",
        texto:
          "Con una alcanza para que el resto empiece a desordenarse: es la que después explica por qué las demás aparecen. Todavía estás a tiempo de ordenarlo barato.",
      },
      {
        titulo: "Dos frentes abiertos",
        texto:
          "Dos ya no es casualidad. Son las primeras señales de que el uso de IA está creciendo más rápido que el criterio para dirigirlo.",
      },
      {
        titulo: "Acá empieza a costar plata",
        texto:
          "Con tres, tu empresa está en el punto exacto donde la IA dispersa empieza a costar plata. No porque falten herramientas: porque todavía no hay una forma común de decidir dónde aplicarlas.",
      },
      {
        titulo: "Ya es el patrón, no la excepción",
        texto:
          "Cuatro dejan de ser problemas sueltos y pasan a ser cómo funciona la empresa con la IA. A esta altura cada mes que pasa se paga en horas y en suscripciones.",
      },
      {
        titulo: "No es un problema de IA. Es de método.",
        texto:
          "Con cinco, el diagnóstico es bastante claro: nadie adentro tiene hoy la forma de identificar, priorizar y decidir. Eso es exactamente lo que se instala en 60 días.",
      },
      {
        titulo: "Las seis. Y ninguna se arregla comprando software.",
        texto:
          "Marcaste todas. La buena noticia es que las seis tienen la misma causa y una sola salida: un método propio, operado por gente de la casa. Es lo que hacemos en 60 días.",
      },
    ],
    /* La sección cierra con el conteo y su lectura, sin remate ni botón:
       el llamado a agendar aparece en la siguiente, después del costo de
       no tener método. */
  },

  /* =====================================================================
     3 · EL COSTO DE SEGUIR ASÍ
     ===================================================================== */
  costo: {
    /* Partido en dos: la segunda oración se resalta en celeste, que es lo
       que da vuelta la frase. */
    titulo: "El problema no es lo que la IA te va a costar.",
    tituloResalte: "Es lo que ya te está costando.",
    bloques: [
      {
        icono: "billete",
        titulo: "Suscripciones que nadie audita",
        texto:
          "Herramientas que se pagan todos los meses y se usan al 10% — o directamente no se usan. El primer gasto a auditar no es de IA: es el que ya estás pagando sin usar.",
      },
      {
        icono: "birrete",
        titulo: "Capacitaciones que no cambiaron nada",
        texto:
          "Un curso de IA sin aplicación real es lo mismo que no haberlo hecho. La inversión en aprender ya se hizo — falta el método para convertirla en trabajo distinto.",
      },
      {
        icono: "reloj",
        titulo: "Horas que se van todas las semanas",
        texto:
          "Cotizaciones, reportes, respuestas a clientes, tareas administrativas: procesos donde la IA bien aplicada ya está ahorrando horas en otras PyMEs — mientras en la tuya siguen haciéndose a mano.",
      },
    ],
    cierre:
      "Cada mes sin método no es neutro: es tiempo, dinero y oportunidad que la empresa no está capturando — y el mes que viene vuelve a empezar de cero, porque no queda nada aprendido.",
    cta: "Quiero mi diagnóstico",
  },

  /* =====================================================================
     4 · EL MÉTODO: LAS SIETE FASES INTEGRA
     ---------------------------------------------------------------------
     Cada fase trae, además de su pregunta y su desarrollo:
       · `icono`  — el del selector, uno distinto por fase
       · `lema`   — la frase corta del panel oscuro; lo que va entre
                    *asteriscos* se pinta (ver lib/texto.ts)
       · `dias`   — el tramo del calendario, en la píldora del panel
       · `claves` — las tres cosas concretas que deja la fase
       · `remate` — la línea que cierra el panel

     ⚠️ Los tramos de días salen de los cuatro puntos de control del
     método (15, 30, 45 y 60) y de qué pregunta cada uno: el del día 15
     revisa Identificar; el del 30, Negociar y Transformar; el del 45,
     Ejecutar; el del 60, Rentabilizar y Acelerar. Gestionar es la única
     que corre de punta a punta. Si el despliegue real usa otro reparto,
     se corrige acá y se propaga solo.
     ===================================================================== */
  metodo: {
    eyebrow: "Método INTEGRA",
    titulo: "Así funciona",
    tituloResalte: "INTEGRA",
    subtitulo:
      "Siete fases en sesenta días. Cada una responde una pregunta concreta sobre tu empresa, y juntas dejan instalado el criterio para decidir dónde conviene aplicar inteligencia artificial y dónde no.",
    /* Ayuda de uso del selector: sin esto no es obvio que las letras se
       tocan. */
    pista: "Tocá cada letra para ver la fase.",
    fases: [
      {
        letra: "I",
        nombre: "Identificar",
        icono: "lupa",
        dias: "Días 1 a 15",
        lema: "*Ordena* el punto de partida, revela las *oportunidades*.",
        pregunta: "¿Cuál es el punto de partida y dónde hay problemas u oportunidades que merecen atención?",
        texto:
          "Se designan los roles (sponsor, referente interno, responsables de área), se releva qué sabe hoy cada persona, se inventaría qué herramientas se pagan y quién las usa, se fijan reglas básicas de uso responsable y se registran las primeras oportunidades, expresadas como problemas.",
        claves: [
          {
            icono: "people",
            titulo: "Roles con nombre",
            texto: "Sponsor, referente interno y responsables de área, cada uno con tiempo asignado.",
          },
          {
            icono: "lista",
            titulo: "Inventario real",
            texto: "Qué herramientas se pagan hoy, quién las usa y para qué sirven de verdad.",
          },
          {
            icono: "lupa",
            titulo: "Oportunidades a la vista",
            texto: "Se registran como problemas concretos del trabajo, no como ideas de herramienta.",
          },
        ],
        remate: "Sin un punto de partida claro, todo lo que viene después se discute a ciegas.",
      },
      {
        letra: "N",
        nombre: "Negociar prioridades",
        icono: "lista",
        dias: "Días 15 a 30",
        lema: "*Ordena* la discusión, define *qué va primero*.",
        pregunta: "¿Qué merece atención primero, qué se deja para después y qué no se va a hacer en este ciclo?",
        texto:
          "Las áreas dejan de hablar de «usar IA» y empiezan a hablar de problemas concretos. Cada oportunidad se puntúa por impacto, esfuerzo, riesgo y capacidad, y entra al Tablero de Oportunidades con responsable asignado. Dirección respalda la cartera.",
        claves: [
          {
            icono: "target",
            titulo: "Una sola vara",
            texto: "Impacto, esfuerzo, riesgo y capacidad: todas las áreas puntúan con los mismos criterios.",
          },
          {
            icono: "lista",
            titulo: "Tablero de Oportunidades",
            texto: "Cada oportunidad entra con responsable asignado y con el respaldo de dirección.",
          },
          {
            icono: "check",
            titulo: "Foco, no lista de deseos",
            texto: "Hasta dos oportunidades priorizadas por área, y una sola activa por vez.",
          },
        ],
        remate: "Priorizar también es acordar qué no se hace en este ciclo. Eso se decide junto, y por escrito.",
      },
      {
        letra: "T",
        nombre: "Transformar",
        icono: "intercambio",
        dias: "Días 15 a 30",
        lema: "*Convierte* la idea en algo *que se puede probar*.",
        pregunta: "¿Cómo convertimos una oportunidad en una iniciativa chica, segura y decidible?",
        texto:
          "Cada oportunidad priorizada se transforma en una Prueba Aplicada: problema, mejora esperada, responsable, alcance acotado, herramienta o enfoque, riesgos y controles, evidencia a observar y decisión final.",
        claves: [
          {
            icono: "intercambio",
            titulo: "Alcance acotado",
            texto: "Una prueba chica que tu equipo puede ejecutar con los recursos que ya tiene.",
          },
          {
            icono: "shield",
            titulo: "Riesgos y controles",
            texto: "Qué puede salir mal y qué control humano lo cubre, definido antes de empezar.",
          },
          {
            icono: "data",
            titulo: "Evidencia definida",
            texto: "Qué se va a mirar para poder decidir después sin discutir impresiones.",
          },
        ],
        remate:
          "Transformar no significa construir la automatización: significa dejar la prueba lista para que tu equipo la corra.",
      },
      {
        letra: "E",
        nombre: "Ejecutar",
        icono: "play",
        dias: "Días 30 a 45",
        lema: "*Prueba* sobre el trabajo real, *no sobre ejercicios*.",
        pregunta: "¿Qué pasa cuando tu equipo prueba el enfoque sobre trabajo real?",
        texto:
          "Las áreas ejecutan sus Pruebas Aplicadas sobre tareas y procesos reales —no sobre ejercicios—, con alcance chico, controles humanos y registro de evidencia. Ejecuta tu empresa, con nuestro acompañamiento.",
        claves: [
          {
            icono: "people",
            titulo: "Lo hace tu equipo",
            texto: "Con nuestro acompañamiento: nadie aprende a decidir mirando cómo decide otro.",
          },
          {
            icono: "flow",
            titulo: "Sobre tareas de todos los días",
            texto: "Cotizaciones, reportes, respuestas a clientes: el trabajo que ya existe.",
          },
          {
            icono: "documento",
            titulo: "Registro mientras pasa",
            texto: "La evidencia se anota en el momento, no se reconstruye de memoria al final.",
          },
        ],
        remate: "Acá es donde la capacidad deja de ser una idea y empieza a ser algo que el equipo sabe hacer.",
      },
      {
        letra: "G",
        nombre: "Gestionar",
        icono: "growth",
        transversal: true,
        dias: "Del día 1 al 60",
        lema: "*Sostiene* el cambio, multiplica los *resultados*.",
        pregunta: "¿Cómo se sostiene el proceso mientras la operación diaria compite por atención?",
        texto:
          "Formación según rol y nivel, ritual interno semanal, panel de alertas, resolución de bloqueos y gestión del cambio. Es la fase que evita que la iniciativa se apague — por eso no es una semana del calendario: corre todo el tiempo.",
        claves: [
          {
            icono: "people",
            titulo: "Rituales y cadencia",
            texto: "Hábitos semanales que mantienen el foco y la ejecución en el día a día.",
          },
          {
            icono: "campana",
            titulo: "Visibilidad y alertas",
            texto: "Un panel simple que anticipa desvíos y permite actuar a tiempo.",
          },
          {
            icono: "shield",
            titulo: "Gestión del cambio",
            texto: "Acompañamos a las personas para sostener la adopción y superar resistencias.",
          },
        ],
        remate: "Esta fase no termina: es el sistema que asegura que lo logrado hoy se mejore mañana.",
      },
      {
        letra: "R",
        nombre: "Rentabilizar",
        icono: "barras",
        dias: "Días 45 a 60",
        lema: "*Cierra* cada prueba con una *decisión*.",
        pregunta: "¿Qué valor produjo cada prueba y qué decisión conviene tomar?",
        texto:
          "Cada prueba activa termina en una decisión fundada: adoptar, iterar, pausar, descartar o escalar. La decisión se toma con la evidencia a la vista y queda registrada con su motivo.",
        claves: [
          {
            icono: "target",
            titulo: "Cinco salidas posibles",
            texto: "Adoptar, iterar, pausar, descartar o escalar. Ninguna prueba queda abierta.",
          },
          {
            icono: "data",
            titulo: "Se decide con evidencia",
            texto: "Con lo que efectivamente pasó, no con lo que se esperaba que pasara.",
          },
          {
            icono: "check",
            titulo: "Descartar también suma",
            texto: "Te ahorraste una inversión mala y tu equipo aprendió a distinguir cuál lo era.",
          },
        ],
        remate:
          "Rentabilizar no es una promesa de retorno financiero: es que ninguna prueba quede sin decisión.",
      },
      {
        letra: "A",
        nombre: "Acelerar",
        icono: "cohete",
        dias: "Días 45 a 60",
        lema: "*Convierte* lo aprendido en *forma de trabajo*.",
        pregunta: "¿Cómo logra tu empresa repetir el ciclo con más autonomía y menos fricción?",
        texto:
          "Lo aprendido se convierte en forma de trabajo: quién carga las oportunidades nuevas, quién prioriza, qué ritual semanal queda corriendo y dónde vive la documentación para que nada dependa de la memoria de una persona.",
        claves: [
          {
            icono: "people",
            titulo: "Roles que quedan",
            texto: "Quién carga las oportunidades nuevas y quién prioriza, de acá en adelante.",
          },
          {
            icono: "clock",
            titulo: "El ritual sigue corriendo",
            texto: "La cadencia semanal no se apaga cuando termina el acompañamiento.",
          },
          {
            icono: "documento",
            titulo: "Todo documentado",
            texto: "Dónde vive lo que funcionó y, sobre todo, lo que no funcionó y por qué.",
          },
        ],
        remate: "Acelerar no es implementar más soluciones: es que el próximo ciclo te cueste la mitad.",
      },
    ] as FaseIntegra[],
  },

  /* =====================================================================
     5 · QUÉ QUEDA INSTALADO
     ===================================================================== */
  instalado: {
    titulo: "Al día 60 tu empresa se queda con esto.",
    subtitulo:
      "No con una automatización que funciona hasta que se rompe. Con un sistema propio para seguir identificando, decidiendo y probando.",
    capacidades: {
      titulo: "Lo que se lleva instalado",
      etiqueta: "3 capacidades",
      items: [
        /* `icono` sale del set de Icon.astro. Uno distinto por capacidad:
           tres tildes iguales no decían nada de lo que hay adentro. */
        {
          titulo: "Capacidad técnica",
          icono: "chip",
          texto:
            "Gente que sabe usar con responsabilidad la herramienta principal de la empresa: dar contexto, trabajar con documentos y datos internos, iterar, verificar salidas, detectar invenciones y aplicar controles humanos.",
        },
        {
          titulo: "Capacidad metodológica",
          icono: "target",
          texto:
            "Gente que sabe mirar su propio trabajo, distinguir un problema real de una idea genérica de herramienta, expresar la mejora esperada, negociar prioridades con criterios comunes, diseñar una prueba chica y decidir con evidencia.",
        },
        {
          titulo: "Capacidad organizacional",
          icono: "people",
          texto:
            "Cada persona sabe qué le toca dentro de una iniciativa de IA: qué decide dirección, qué sostiene el referente interno, qué autoriza el responsable de un área y qué ejecuta y documenta quien lleva adelante una prueba.",
        },
      ],
    },
    cita:
      "Ahora tenemos responsables, criterios compartidos, una forma de detectar y priorizar oportunidades, un protocolo para probarlas, espacios para decidir, un registro de evidencia y un plan para continuar avanzando.",
    citaPie: "Así suena una empresa con el sistema instalado.",
    cta: "Quiero mi diagnóstico",
  },

  /* =====================================================================
     6 · QUIÉN HACE QUÉ
     Tres columnas parejas y cortas. La versión larga (trece ítems de un
     lado, nueve del otro) se leía como un contrato y desinflaba la
     sección justo antes del cierre.
     ===================================================================== */
  reparto: {
    /* El título va partido en dos: la segunda oración baja de renglón y se
       resalta en azul, igual que en el hero. */
    titulo: "Esto no lo hacemos por vos.",
    tituloResalte: "Lo hacemos con vos.",
    subtitulo:
      "Tu equipo aprende haciendo, sobre el trabajo real de todos los días. Nosotros ponemos el método y el ritmo para que eso pase.",
    columnas: [
      {
        titulo: "Ponemos nosotros",
        tono: "nosotros",
        icono: "brujula",
        items: ["El método y los materiales", "La facilitación de cada reunión", "El acompañamiento semanal"],
      },
      /* "Juntos" va en el MEDIO a propósito: es la zona donde se cruzan
         las dos partes, y el diseño la dibuja como tal. Si se reordena
         esta lista, se rompe esa lectura. */
      {
        titulo: "Lo hacemos juntos",
        tono: "juntos",
        icono: "manos",
        items: ["Priorizar las oportunidades", "Probar sobre trabajo real", "Decidir con la evidencia a la vista"],
      },
      {
        titulo: "Pone tu empresa",
        tono: "empresa",
        icono: "equipo",
        items: ["Un referente interno", "Las personas y su tiempo", "Las decisiones"],
      },
    ],
  },

  /* =====================================================================
     7 · LA GARANTÍA (de sistema instalado, no de implementación)
     ===================================================================== */
  garantia: {
    titulo: "Garantía: el sistema queda instalado.",
    texto:
      "Si al día 60 no queda instalado el Sistema INTEGRA definido en el programa, seguimos acompañando a tu empresa sin costo hasta completarlo.",
    cierre: "Preferimos una garantía chica que podamos cumplir siempre antes que una grande que no te creerías.",
  },

  /* =====================================================================
     8 · QUIÉN SOY (autoridad)
     ===================================================================== */
  autoridad: {
    titulo: "Quién está del otro lado del método",
    foto: "/images/about/retrato-sobre-mi.png",
    fotoAlt: "Pablo Brunet, creador del Método INTEGRA",
    cuerpo: [
      "Soy Pablo Brunet. Trabajo en la intersección entre estrategia comercial, inteligencia artificial e integración tecnológica en empresas.",
      "No vengo a venderte herramientas ni cursos, y tampoco a hacerte el trabajo: ayudo a empresas como la tuya a decidir dónde aplicar IA, a desarrollar capacidad real en el equipo y a quedarse con un método propio para seguir sin mí.",
      "Hablo el idioma de las PyMEs — no sólo el de los departamentos de sistemas.",
    ],
    credencialDestacada: {
      img: "/images/credenciales/openai-partner-network.png",
      titulo: "Miembro del OpenAI Partner Network",
      texto: "Acreditación oficial dentro del ecosistema de partners de OpenAI.",
      href: "/sobre-mi#openai",
    },
    credenciales: [
      "Posgrado en Inteligencia Artificial y Automatizaciones (UCEMA)",
      "Certificaciones en RevOps y AI Sales",
      "Más de 16 años trabajando con PyMEs no técnicas",
      "Diseño y facilitación de programas de integración de IA, cohortes y comunidades de acompañamiento",
    ],
    cita:
      "El objetivo no es que tu empresa use más inteligencia artificial. Es que sepa decidir dónde usarla: para trabajar con mayor productividad, gastar menos y ganar más.",
  },

  /* =====================================================================
     9 · CHEQUEO EXPRÉS (quiz de 6 preguntas + captura)
     Versión web liviana del Chequeo INTEGRA.
     `peso` va de 0 (peor) a 2 (mejor). La pregunta 1 no puntúa: segmenta.
     `hallazgo` es la lectura que se devuelve si eligió esa opción; está
     escrito en clave de capacidad faltante, nunca de automatización.
     ===================================================================== */
  chequeo: {
    titulo: "¿Está su empresa lista para integrar IA?",
    subtitulo: "6 preguntas, 2 minutos. Resultado al instante.",
    empezar: "Empezar el chequeo",
    preguntas: [
      {
        id: "tamano",
        texto: "¿Cuánta gente trabaja en tu empresa?",
        opciones: [
          { texto: "Menos de 10" },
          { texto: "Entre 10 y 30" },
          { texto: "Entre 30 y 80" },
          { texto: "Entre 80 y 150" },
          { texto: "Más de 150" },
        ],
      },
      {
        id: "uso",
        texto: "¿Quiénes usan IA hoy?",
        opciones: [
          { texto: "Nadie, o casi nadie", peso: 0, hallazgo: "Todavía no hay uso real: la oportunidad completa está sin abrir, y también el riesgo de que empiece desordenado." },
          { texto: "Algunos, por su cuenta", peso: 0, hallazgo: "El uso arrancó por iniciativa personal. Cuando esa persona se ocupa de otra cosa, la iniciativa se apaga con ella." },
          { texto: "Varios, sin coordinación", peso: 1, hallazgo: "Hay uso, pero cada área resuelve por su lado: no existe un criterio común para decidir dónde aplicarla." },
          { texto: "Hay un uso ordenado", peso: 2, hallazgo: "El uso está ordenado. El paso siguiente es que ese orden sobreviva a un cambio de gente." },
        ],
      },
      {
        id: "suscripciones",
        texto: "¿Cuántas suscripciones de IA pagan por mes?",
        opciones: [
          { texto: "Ninguna", peso: 1 },
          { texto: "Una o dos", peso: 2 },
          { texto: "Entre tres y cinco", peso: 1, hallazgo: "Hay gasto mensual repartido en varias herramientas: sin un inventario y un responsable, es imposible saber cuál se está usando de verdad." },
          { texto: "No sabemos", peso: 0, hallazgo: "Nadie tiene la cuenta de lo que se paga. Ese es el primer gasto a auditar, y no requiere comprar nada nuevo." },
        ],
      },
      {
        id: "capacitacion",
        texto: "¿Hicieron alguna capacitación en IA?",
        opciones: [
          { texto: "No", peso: 0, hallazgo: "El equipo todavía no tiene una base común: hoy cada quien aplica lo que entendió por su cuenta." },
          { texto: "Sí, y no cambió nada", peso: 0, hallazgo: "La inversión en aprender ya se hizo. Lo que falta no es más contenido: es el método para convertirlo en trabajo distinto." },
          { texto: "Sí, y se aplica", peso: 2, hallazgo: "La formación se aplicó, que es lo difícil. Falta el paso siguiente: que las mejoras se prioricen y se decidan con evidencia." },
        ],
      },
      {
        id: "prioridad",
        texto: "¿Saben qué proceso mejorar primero con IA?",
        opciones: [
          { texto: "Ni idea", peso: 0, hallazgo: "No hay una lista de oportunidades priorizada: sin eso, la discusión vuelve a empezar en cada reunión." },
          { texto: "Tenemos una intuición", peso: 1, hallazgo: "Hay intuición pero no criterios comunes: cada área defiende su prioridad sin una vara compartida." },
          { texto: "Lo tenemos claro", peso: 2 },
        ],
      },
      {
        id: "responsable",
        texto: "¿Hay alguien a cargo de que esto avance?",
        opciones: [
          { texto: "Nadie", peso: 0, hallazgo: "Nadie tiene asignado el rol de sostener esto. Es el factor que mejor predice si una iniciativa de IA se apaga a las seis semanas." },
          { texto: "El dueño, cuando puede", peso: 1, hallazgo: "El avance depende de que dirección tenga un rato libre: la operación diaria siempre gana esa pulseada." },
          { texto: "Alguien designado, con tiempo asignado", peso: 2 },
        ],
      },
    ] as PreguntaChequeo[],
    /* Tres niveles, ordenados de menor a mayor puntaje. `hasta` es el tope
       del tramo sobre un máximo de 10 puntos (5 preguntas puntuadas). */
    niveles: [
      {
        hasta: 3,
        nombre: "Uso disperso",
        color: "rojo",
        texto:
          "En tu empresa la IA existe, pero sin dueño ni criterio: cada persona resuelve como puede y lo aprendido no queda en ningún lado. Es el escenario donde más plata se pierde sin que aparezca en ningún informe.",
        recomendacion:
          "Empezá por ordenar antes de sumar: un punto de partida claro, un responsable con tiempo asignado y una lista corta de oportunidades priorizadas. Eso es exactamente lo que instala INTEGRA 60.",
      },
      {
        hasta: 6,
        nombre: "En transición",
        color: "ambar",
        texto:
          "Hay movimiento real y gente con ganas, pero todavía falta la forma común de decidir qué se prueba, quién lo hace y cómo se cierra. Es el punto donde una empresa avanza rápido si instala método, o se estanca si sigue improvisando.",
        recomendacion:
          "Lo que falta no es más herramienta: es un tablero de oportunidades, un protocolo de pruebas y espacios de decisión con dirección. En 60 días queda funcionando con gente de la casa.",
      },
      {
        hasta: 10,
        nombre: "Con método",
        color: "verde",
        texto:
          "Tu empresa está por delante de la mayoría: hay uso ordenado y responsables. El riesgo ahora es otro — que todo dependa de las mismas dos o tres personas y no exista un sistema que sobreviva a un cambio de equipo.",
        recomendacion:
          "El paso siguiente es institucionalizar: documentar el criterio, formar más gente y dejar corriendo un ciclo que produzca la próxima oportunidad sin que nadie lo empuje.",
      },
    ],
    formulario: {
      titulo: "Tu resultado está listo",
      subtitulo: "Decinos a dónde te lo mandamos y lo ves ahora mismo.",
      nombre: "Nombre",
      email: "Email",
      empresa: "Empresa",
      boton: "Ver mi resultado",
      privacidad:
        "Usamos tus datos solo para enviarte el resultado y contactarte por el diagnóstico. No compartimos tu información con nadie.",
      error: "No pudimos guardar tus datos, pero tu resultado está abajo igual.",
    },
    resultadoCta: "Quiero mi diagnóstico gratuito",
    reiniciar: "Volver a empezar",
  },

  /* =====================================================================
     10 · OBJECIONES Y PREGUNTAS FRECUENTES
     ===================================================================== */
  faq: {
    titulo: "Lo que seguramente te estás preguntando",
    items: [
      {
        q: "¿Esto es otro curso de IA?",
        a: "No. Los cursos son un componente, no el producto. El método incluye el relevamiento de tu empresa, un tablero de oportunidades propio, acompañamiento semanal en vivo, pruebas sobre trabajo real y una forma de decidir. Nada se consume «suelto».",
      },
      {
        q: "¿Ustedes nos implementan las automatizaciones?",
        a: "No dentro de este programa, y es a propósito. INTEGRA 60 te ayuda a definir el problema, acotar la solución, preparar una prueba y decidir con evidencia. Si después necesitás desarrollar, automatizar o integrar técnicamente, se cotiza como proyecto independiente.",
      },
      {
        q: "No somos una empresa técnica.",
        a: "Mejor. El método está diseñado para PyMEs sin área de tecnología. Hablamos de cotizaciones, clientes y horas — no de modelos ni de código.",
      },
      {
        q: "No tenemos tiempo para esto.",
        a: "No te pedimos que dejes de trabajar para capacitarte: se aplica sobre lo que ya estás haciendo. Contamos con números: unas 1,5 horas semanales por participante, 3 a 4 horas semanales para el referente interno y 30 minutos cada quince días para dirección.",
      },
      {
        q: "¿Y si las pruebas no salen bien?",
        a: "Una prueba que se descarta con fundamento también es un resultado: tu empresa se ahorró una inversión mala y aprendió a decidir. El programa no se mide por cantidad de automatizaciones, sino por la capacidad que queda instalada.",
      },
      {
        q: "¿Cuánto cuesta?",
        a: "El programa tiene un valor único según la cantidad de personas de tu empresa que participen. Lo conversamos en el diagnóstico, cuando sepamos qué necesita tu empresa — la reunión es gratuita y sin compromiso.",
      },
      {
        q: "¿Es presencial?",
        a: "Es 100% remoto, con encuentros semanales en vivo por videollamada. Presencialidad solo puntual, si se justifica.",
      },
    ],
  },

  /* =====================================================================
     11 · CIERRE + CALENDARIO
     `id` es el calendario de LeadConnector del Método INTEGRA. Es distinto
     del calendario general de Pablo (data/site.ts → agenda.id).
     ===================================================================== */
  cierre: {
    eyebrow: "El primer paso",
    titulo: "Descubrí dónde la IA puede generar mayor impacto en tu empresa",
    subtitulo:
      "Agendá la reunión de diagnóstico gratuita. En 30 minutos analizamos cómo está usando IA tu empresa, cuáles son sus brechas y dónde están las oportunidades más grandes. Te vas con claridad, avances con nosotros o no.",
    calendarioId: "rx4hxRbfbinJEsJoBWWF",
    refuerzos: ["Sin costo", "Sin compromiso", "30 minutos"],
    /* El número es real y sale de la carga operativa (~25 h por empresa por
       ciclo). No inflarlo ni convertirlo en contador falso de lugares. */
    escasez:
      "Trabajamos con 4 o 5 empresas a la vez, porque el acompañamiento es en vivo y privado, no grabado. Los lugares se toman por orden de arranque.",
    fallbackTitulo: "¿Preferís escribirnos directo?",
    fallbackCta: "Escribirme por WhatsApp",
  },

  /* ---- WhatsApp: mensaje propio de esta landing ---- */
  whatsapp: {
    mensaje:
      "Hola Pablo, vengo de la página del Método INTEGRA y quiero saber más sobre el diagnóstico gratuito.",
    etiqueta: "Consultar por el Método INTEGRA",
  },

  /* ---- Página de gracias ---- */
  gracias: {
    titulo: "Listo — nos vemos en la reunión",
    subtitulo:
      "Te llega la confirmación por correo con el enlace de la videollamada. Si necesitás reprogramar, avisame y lo movemos sin problema.",
    queEsperar: {
      titulo: "Qué vamos a hacer en esos 30 minutos",
      items: [
        "Miramos cómo usa IA tu empresa hoy: quién la usa, con qué herramientas y con qué criterio.",
        "Identificamos las brechas y las oportunidades más grandes, en tu operación real.",
        "Te digo qué modalidad conviene y por dónde empezar — te vayas con nosotros o no.",
      ],
    },
    pedido: {
      titulo: "Una sola cosa antes de la reunión",
      texto:
        "Sumá a la invitación a quien podría ser el referente interno del proceso, o a tu socio, si querés que participe. La conversación rinde mucho más cuando están las dos cabezas que van a decidir.",
    },
    volver: "Volver al Método INTEGRA",
  },
} as const;

export type Integra = typeof integra;
