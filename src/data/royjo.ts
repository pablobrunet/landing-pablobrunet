/* =====================================================================
   DISTRIBUIDORA ROYJO — contenido de /cotizacion-distribuidora-royjo
   ---------------------------------------------------------------------
   Página de propuesta comercial para UN cliente concreto. Todo el texto
   vive acá; los componentes de /src/components/royjo sólo lo dibujan.

   FUENTE: "Propuesta de Programa de Adopción de Inteligencia Artificial
   aplicada al proceso comercial — Distribuidora Royjo". Si el documento
   cambia, se corrige acá y se propaga solo.

   TRES CAMPOS QUEDAN ABIERTOS A PROPÓSITO — no son huecos por completar:
     · `alternativas.opciones[].inversion` — el monto se define recién
       cuando Royjo elige la alternativa. Vacío se dibuja como "A definir"
       con el peso visual que tendría el precio.
     · `alternativas.gastos` — traslados, alojamiento y viáticos se cotizan
       por separado, sobre la base de dos jornadas presenciales.
     · `continuidad.plataforma.acceso` — el período lo define Royjo y puede
       extenderse.
   Si en algún momento se cierran los montos, se cargan en `inversion` y
   aparecen solos.

   NOTA DE INDEXACIÓN: la página va con `noindex` (ver la página en
   /src/pages/cotizacion-distribuidora-royjo). Es una cotización, no
   contenido del sitio: se comparte por enlace directo.

   ⚠️ TONO — REGLA DURA DE ESTA PÁGINA
   Se le habla a la empresa DIRECTAMENTE, en "ustedes": "Cuentan con un
   equipo comercial…", nunca "Distribuidora Royjo cuenta con…". El nombre
   propio queda sólo donde es el VALOR de un campo —la ficha de la
   portada, el título de la pestaña, el asunto del correo, el chip de la
   portada— y en ningún texto corrido. Si se agrega copy nuevo, seguir
   esta regla: es lo que hace que la propuesta se lea como una
   conversación y no como un informe sobre un tercero.
   ===================================================================== */

/* Cada opción de implementación. `inversion` vacío se dibuja como "A
   definir" en vez de romper la tarjeta. */
export interface OpcionRoyjo {
  codigo: string;
  nombre: string;
  /** Sólo una: es la que se destaca visualmente. */
  recomendada?: boolean;
  resumen: string;
  duracion: string;
  objetivo: string;
  alcance: string[];
  /** La salvedad honesta de la opción, cuando la tiene. */
  consideracion?: string;
  inversion: string;
}

export const royjo = {
  seo: {
    title: "Propuesta para Distribuidora Royjo — Programa de adopción de IA en el proceso comercial",
    description:
      "Alcance del programa de adopción de Inteligencia Artificial aplicada a su proceso comercial: relevamiento, segmentación por rol, encuentros presenciales, plataforma de recursos y tres alternativas de implementación.",
  },

  /* ---- Anclas de navegación interna ---- */
  anclas: {
    alcance: "alcance",
    alternativas: "alternativas",
    proximos: "proximos-pasos",
  },

  /* =====================================================================
     1 · PORTADA
     El titular es el remate del documento original: es la frase que mejor
     resume qué se compra. El resto de la portada son los datos duros de la
     propuesta, para que quien la abra sepa en un vistazo de qué se trata.
     ===================================================================== */
  hero: {
    chip: "Propuesta · Distribuidora Royjo",
    titulo: "Que la IA deje de ser una herramienta que algunos usan a veces",
    tituloResalte: "y pase a ser una capacidad de su equipo comercial.",
    subtitulo:
      "Su equipo comercial ya tiene experiencia, conocimiento técnico y formación en ventas. Lo que falta no son más conceptos comerciales: es una forma de trabajo aumentada por Inteligencia Artificial, aplicada sobre situaciones reales de su actividad diaria.",
    ctaPrimario: "Ver las alternativas",
    ctaSecundario: "Ver el alcance completo",
    /* Ficha de la propuesta, en la tarjeta de la derecha. El orden es el
       del encabezado del documento original. */
    fichaTitulo: "Ficha de la propuesta",
    fichaFilas: [
      { etiqueta: "Empresa", valor: "Distribuidora Royjo", icono: "people" },
      { etiqueta: "Propuesta presentada por", valor: "Pablo Brunet", icono: "estrella" },
      { etiqueta: "Modalidad", valor: "Presencial + recursos digitales de acompañamiento", icono: "flow" },
      { etiqueta: "Participantes estimados", valor: "18 personas", icono: "target" },
      { etiqueta: "Duración sugerida", valor: "Según la alternativa seleccionada", icono: "calendario" },
    ],
  },

  /* =====================================================================
     2 · CONTEXTO Y OPORTUNIDAD
     ===================================================================== */
  contexto: {
    eyebrow: "Contexto",
    titulo: "El desafío no es aprender IA.",
    tituloResalte: "Es cambiar la forma de trabajar.",
    parrafos: [
      "Cuentan con un equipo comercial con experiencia, conocimiento técnico y formación previa en ventas. El desafío que identificamos no pasa exclusivamente por incorporar nuevos conceptos comerciales, sino por desarrollar nuevas formas de trabajo que les permitan aprovechar la Inteligencia Artificial para aumentar la productividad, mejorar el seguimiento comercial y generar una actitud más proactiva frente al desarrollo de clientes.",
    ],
    listaTitulo: "Oportunidades identificadas",
    oportunidades: [
      "Generar mayor sistematicidad en el seguimiento de clientes.",
      "Mejorar la prospección y búsqueda de nuevas oportunidades comerciales.",
      "Reactivar clientes que dejaron de comprar.",
      "Reducir tiempo destinado a tareas operativas o administrativas.",
      "Aprovechar mejor la información disponible sobre clientes, productos y territorios.",
      "Incorporar IA dentro de las herramientas que su equipo ya utiliza.",
      "Nivelar las diferencias entre usuarios principiantes y quienes ya usan IA.",
      "Crear buenas prácticas compartidas, para que la adopción no dependa de iniciativas individuales.",
      "Generar una metodología que permita sostener el uso de IA una vez finalizada la capacitación.",
    ],
    remate:
      "El objetivo no es solamente enseñarles a utilizar herramientas de Inteligencia Artificial, sino acompañar a su equipo en la incorporación de una forma de trabajo aumentada por IA, aplicable a situaciones reales de su actividad comercial.",
  },

  /* =====================================================================
     3 · OBJETIVOS
     ===================================================================== */
  objetivos: {
    eyebrow: "Objetivos",
    titulo: "Adónde queremos llegar",
    general: {
      etiqueta: "Objetivo general",
      texto:
        "Acompañarlos en un proceso inicial de adopción de Inteligencia Artificial orientado a su área comercial, desarrollando capacidades individuales y prácticas de equipo que les permitan mejorar productividad, prospección, seguimiento de clientes y gestión de información.",
    },
    especificosTitulo: "Al finalizar el programa, su equipo va a poder:",
    especificos: [
      "Comprender las posibilidades actuales de la IA aplicadas a su trabajo.",
      "Identificar actividades concretas donde la IA genera mejoras de tiempo, calidad o productividad.",
      "Utilizar herramientas de IA para preparar y ejecutar actividades comerciales.",
      "Investigar clientes, mercados, territorios y oportunidades con mayor velocidad.",
      "Diseñar mejores comunicaciones y seguimientos comerciales.",
      "Trabajar sobre procesos de prospección y recuperación de clientes.",
      "Sistematizar información dispersa y transformarla en insumos accionables.",
      "Aplicar IA sobre documentos, planillas, correos, presupuestos e información técnica.",
      "Usar de manera más efectiva las herramientas que ya tienen disponibles.",
      "Identificar y compartir buenas prácticas puertas adentro.",
      "Desarrollar autonomía para continuar aprendiendo y experimentando luego del programa.",
    ],
  },

  /* =====================================================================
     4 · ENFOQUE METODOLÓGICO
     La distinción adopción / capacitación es el eje de toda la propuesta:
     por eso las cuatro dimensiones van juntas y con el mismo peso.
     ===================================================================== */
  enfoque: {
    eyebrow: "Enfoque",
    titulo: "Lógica de adopción,",
    tituloResalte: "no sólo de capacitación.",
    subtitulo:
      "Un curso termina cuando termina el curso. Una adopción se sostiene porque se trabajó sobre cuatro dimensiones complementarias a la vez.",
    dimensiones: [
      {
        numero: "01",
        icono: "people",
        titulo: "Personas",
        texto:
          "Comprender los diferentes niveles de experiencia, roles, necesidades y resistencias frente al uso de Inteligencia Artificial.",
      },
      {
        numero: "02",
        icono: "lupa",
        titulo: "Casos de uso",
        texto:
          "Partir de situaciones reales del trabajo cotidiano y transformarlas en aplicaciones concretas de IA.",
      },
      {
        numero: "03",
        icono: "chip",
        titulo: "Herramientas",
        texto:
          "Trabajar prioritariamente sobre el ecosistema que ya tienen —incluyendo Google Workspace y Gemini cuando corresponda—, e incorporar otras soluciones sólo cuando generen valor y sean accesibles para su equipo.",
      },
      {
        numero: "04",
        icono: "growth",
        titulo: "Adopción y sustentabilidad",
        texto:
          "Experimentación, documentación de casos, intercambio de buenas prácticas, biblioteca de recursos y referentes internos: lo que hace que los aprendizajes continúen después de los encuentros.",
      },
    ],
  },

  /* =====================================================================
     5 · ETAPA 1 — RELEVAMIENTO INICIAL
     ===================================================================== */
  relevamiento: {
    eyebrow: "Etapa 1",
    titulo: "Antes de definir contenidos,",
    tituloResalte: "un relevamiento.",
    subtitulo:
      "Los contenidos definitivos y la segmentación de los encuentros se deciden a partir de lo que muestre este diagnóstico. Es lo que evita una capacitación genérica.",
    bloques: [
      {
        icono: "documento",
        etiqueta: "Relevamiento individual",
        titulo: "Un breve diagnóstico por participante",
        items: [
          "Rol dentro de la organización.",
          "Principales responsabilidades.",
          "Actividades comerciales que desarrolla.",
          "Herramientas digitales que utiliza habitualmente.",
          "Frecuencia actual de utilización de IA.",
          "Herramientas de IA utilizadas.",
          "Nivel de autonomía percibido.",
          "Principales dificultades o dudas.",
          "Actividades repetitivas o de alto consumo de tiempo.",
          "Casos en los que considera que la IA podría ayudarlo.",
          "Expectativas respecto del programa.",
        ],
        remate: "Con esto armamos un mapa inicial de la madurez y las necesidades de su equipo.",
      },
      {
        icono: "people",
        etiqueta: "Relevamiento organizacional",
        titulo: "Una reunión con sus referentes",
        subtitulo:
          "Por ejemplo, su gerencia comercial, marketing / comunicación y los responsables del proyecto.",
        items: [
          "Su estructura comercial, responsabilidades y zonas.",
          "Cómo generan hoy las oportunidades.",
          "Gestión y seguimiento de los clientes existentes.",
          "Recuperación de clientes inactivos.",
          "Mecanismos actuales de registro y herramientas disponibles.",
          "Procesos administrativos vinculados a ventas.",
          "Qué información usan sus comerciales.",
          "Principales fricciones operativas.",
          "Sus prioridades comerciales.",
        ],
        remate: "Es lo que permite que los ejercicios trabajen sobre su proceso real, no sobre ejemplos.",
      },
    ],
  },

  /* =====================================================================
     6 · SEGMENTACIÓN DE PARTICIPANTES
     El selector de roles usa el mismo patrón de las fases INTEGRA: radios
     + `:has()`, sin JavaScript. Los textos están emparejados en largo a
     propósito — el panel mide lo que el más largo de los cuatro.
     ===================================================================== */
  segmentacion: {
    eyebrow: "Segmentación",
    titulo: "Grupos con necesidades parecidas,",
    tituloResalte: "no con cargos parecidos.",
    subtitulo:
      "Cómo quedan armados los grupos lo definimos después del relevamiento. Contemplamos dos criterios posibles, que además pueden combinarse.",
    porRol: {
      etiqueta: "Criterio A",
      titulo: "Segmentación por rol",
      texto: "Grupos con necesidades similares dentro de su proceso comercial.",
      grupos: [
        {
          clave: "campo",
          icono: "brujula",
          nombre: "Ingeniería y equipo comercial de campo",
          corto: "Comercial de campo",
          lema: "El ciclo completo, de la investigación previa al seguimiento.",
          aplicaciones: [
            "Investigación de clientes y prospectos",
            "Preparación de visitas",
            "Planificación de recorridos comerciales",
            "Análisis previo de una cuenta",
            "Identificación de oportunidades",
            "Elaboración de argumentos comerciales",
            "Preparación de reuniones",
            "Seguimiento posterior",
            "Recuperación de clientes",
            "Comunicaciones personalizadas",
            "Investigación técnica",
            "Síntesis de documentación",
            "Organización de la información obtenida en visitas",
          ],
        },
        {
          clave: "admin",
          icono: "documento",
          nombre: "Administración comercial",
          corto: "Administración",
          lema: "Menos tiempo en lo operativo, más criterio sobre la información.",
          aplicaciones: [
            "Armado y revisión de presupuestos",
            "Tratamiento de información",
            "Análisis de planillas",
            "Google Sheets / Excel con asistencia de IA",
            "Generación y revisión de correos",
            "Preparación de documentos",
            "Sistematización de consultas",
            "Búsqueda y síntesis de información",
            "Automatización o simplificación de tareas repetitivas",
          ],
        },
        {
          clave: "marketing",
          icono: "campana",
          nombre: "Marketing y comunicación",
          corto: "Marketing",
          lema: "Del dato de mercado al contenido que llega al cliente.",
          aplicaciones: [
            "Investigación de clientes y mercados",
            "Análisis de información comercial",
            "Desarrollo de contenidos",
            "Segmentación",
            "Generación de campañas",
            "Preparación de materiales comerciales",
            "Procesamiento de información de publicidad y generación de leads",
          ],
        },
        {
          clave: "gerencia",
          icono: "barras",
          nombre: "Gerencia y responsables comerciales",
          corto: "Gerencia",
          lema: "Decidir con mejor información y sostener la adopción de su equipo.",
          aplicaciones: [
            "Análisis comercial",
            "Preparación de reuniones",
            "Seguimiento de indicadores",
            "Interpretación de información",
            "Identificación de oportunidades",
            "Priorización",
            "Desarrollo de procesos internos de adopción",
            "Generación y supervisión de buenas prácticas",
          ],
        },
      ],
    },
    porNivel: {
      etiqueta: "Criterio B",
      titulo: "Segmentación por nivel de utilización de IA",
      texto:
        "Si el diagnóstico muestra diferencias importantes de conocimiento dentro de su equipo, los grupos pueden organizarse por madurez en vez de por rol.",
      niveles: [
        {
          nombre: "Grupo inicial",
          icono: "lupa",
          texto:
            "Para quienes usan IA poco o de manera ocasional. El objetivo es que desarrollen autonomía y una base sólida de utilización.",
          items: [],
        },
        {
          nombre: "Grupo avanzado / Power Users",
          icono: "cohete",
          texto: "Para quienes ya usan herramientas de IA regularmente. Con ellos profundizamos en:",
          items: [
            "Diseño avanzado de instrucciones",
            "Construcción de flujos de trabajo",
            "Investigación y análisis",
            "Trabajo con múltiples fuentes",
            "Automatización",
            "Creación de asistentes",
            "Uso avanzado del ecosistema disponible",
          ],
        },
      ],
    },
    nota:
      "La segmentación definitiva la definimos a partir del relevamiento previo, combinando rol, necesidades, procesos de trabajo, madurez en IA y los casos de uso que sean prioritarios para ustedes.",
  },

  /* =====================================================================
     7 · CONTENIDOS POTENCIALES
     Acordeón: son ocho ejes con listas largas y desplegados de una vez
     tapaban el resto de la propuesta.
     ===================================================================== */
  contenidos: {
    eyebrow: "Contenidos",
    titulo: "Los ejes que se contemplan",
    subtitulo:
      "Los contenidos definitivos surgen del diagnóstico. Estos son los ejes que tenemos previstos: los seleccionamos y profundizamos según lo que necesite cada grupo.",
    ejes: [
      {
        icono: "chip",
        titulo: "Fundamentos para trabajar con IA",
        items: [
          "Qué puede y qué no puede hacer actualmente la IA.",
          "Principales modelos y herramientas.",
          "Criterios para seleccionar una herramienta.",
          "Errores frecuentes.",
          "Buenas prácticas de interacción.",
          "Privacidad y manejo responsable de información empresarial.",
        ],
      },
      {
        icono: "intercambio",
        titulo: "Ingeniería de instrucciones aplicada",
        items: [
          "Cómo transformar una necesidad en una instrucción efectiva.",
          "Contexto.",
          "Objetivos.",
          "Restricciones.",
          "Formatos de salida.",
          "Iteración y refinamiento.",
        ],
      },
      {
        icono: "flow",
        titulo: "IA aplicada al proceso comercial",
        subtitulo: "Aplicaciones a los distintos momentos del ciclo.",
        items: [
          "Investigación.",
          "Prospección.",
          "Preparación.",
          "Contacto.",
          "Reunión.",
          "Propuesta.",
          "Seguimiento.",
          "Fidelización.",
          "Recuperación de clientes.",
        ],
      },
      {
        icono: "lupa",
        titulo: "Prospección y desarrollo de clientes",
        items: [
          "Definición de perfiles.",
          "Investigación de prospectos.",
          "Preparación de información.",
          "Identificación de oportunidades.",
          "Personalización de comunicaciones.",
          "Diseño de secuencias de contacto.",
          "Reactivación de clientes inactivos.",
        ],
      },
      {
        icono: "brujula",
        titulo: "Preparación de visitas comerciales",
        items: [
          "Investigación previa.",
          "Construcción de hipótesis.",
          "Preparación de preguntas.",
          "Organización de antecedentes.",
          "Síntesis de información.",
          "Preparación de próximos pasos.",
        ],
      },
      {
        icono: "clock",
        titulo: "Seguimiento comercial",
        items: [
          "Organización del seguimiento.",
          "Generación de recordatorios y rutinas.",
          "Síntesis posterior a reuniones.",
          "Preparación de correos.",
          "Registro estructurado de información.",
          "Priorización de oportunidades.",
        ],
      },
      {
        icono: "cohete",
        titulo: "Productividad personal",
        items: [
          "Síntesis.",
          "Investigación.",
          "Preparación de documentos.",
          "Organización de información.",
          "Planificación de actividades.",
          "Automatización de tareas recurrentes cuando resulte posible.",
        ],
      },
      {
        icono: "data",
        titulo: "Google Workspace + IA",
        subtitulo: "En función de las licencias y funcionalidades que tengan efectivamente disponibles.",
        items: [
          "Gemini.",
          "Gmail.",
          "Docs.",
          "Sheets.",
          "Drive.",
          "NotebookLM.",
          "Otras funcionalidades del entorno corporativo.",
        ],
      },
    ],
  },

  /* =====================================================================
     8 · QUÉ PASA ENTRE ENCUENTROS Y DESPUÉS
     Los tres mecanismos que evitan que el aprendizaje quede atrapado en la
     jornada presencial: el ciclo entre encuentros, la plataforma
     asincrónica y la biblioteca interna de casos.
     ===================================================================== */
  continuidad: {
    eyebrow: "Sostenibilidad",
    titulo: "Que no termine",
    tituloResalte: "cuando termina la jornada.",
    subtitulo:
      "Tres mecanismos que trabajan juntos para que lo aprendido se aplique, se comparta y les quede puertas adentro.",

    ciclo: {
      titulo: "Dinámica entre encuentros",
      texto:
        "Entre los encuentros proponemos pequeñas experiencias de aplicación. Cada participante elige uno o más casos reales de su trabajo, y esos casos los usamos como insumo del encuentro siguiente.",
      pasosTitulo: "El ciclo",
      pasos: ["Aprender", "Aplicar", "Compartir", "Mejorar", "Incorporar"],
      detalle: [
        "Experimentar.",
        "Aplicar alguna de las herramientas trabajadas.",
        "Registrar el resultado.",
        "Compartir aprendizajes o dificultades.",
      ],
    },

    plataforma: {
      icono: "documento",
      titulo: "Plataforma de recursos y contenidos asincrónicos",
      texto:
        "Su equipo recibe acceso a un espacio digital privado de formación y recursos.",
      items: [
        "Cursos introductorios y técnicos",
        "Tutoriales y guías prácticas",
        "Materiales complementarios",
        "Plantillas y ejemplos",
        "Biblioteca de prompts",
        "Grabaciones y recursos seleccionados",
        "Nuevos contenidos durante la vigencia del programa",
      ],
      /* El período no está cerrado a propósito: lo definen ellos, y puede
         extenderse más allá de lo que dure el programa. */
      acceso: "El período de acceso lo definen ustedes — puede extenderse por más tiempo",
      remate:
        "Resuelve la principal dificultad de los grupos heterogéneos: quienes recién comienzan se nivelan sin frenar a quienes ya tienen experiencia, y quienes están más avanzados profundizan de manera autónoma.",
    },

    practicas: {
      icono: "lista",
      titulo: "Construcción de buenas prácticas internas",
      texto:
        "Además de las capacidades individuales, empiezan a construir una lógica propia de adopción. Durante el programa identificamos:",
      items: [
        "Casos de uso relevantes",
        "Prompts que funcionan particularmente bien",
        "Procesos susceptibles de ser mejorados",
        "Herramientas útiles",
        "Participantes con mayor nivel de adopción",
        "Oportunidades de estandarización",
      ],
      remate: "Empiezan a construir su propia biblioteca interna de casos de uso de IA.",
    },
  },

  /* =====================================================================
     9 · ALTERNATIVAS DE IMPLEMENTACIÓN
     El núcleo comercial de la propuesta. La Opción 2 va destacada porque
     es la recomendada en el documento original.
     ===================================================================== */
  alternativas: {
    eyebrow: "Alternativas",
    titulo: "Tres formas de implementarlo",
    subtitulo:
      "Las tres comparten el mismo enfoque. Cambian la profundidad, el tiempo presencial y qué tanto los acompañamos en la adopción después de los encuentros.",
    opciones: [
      {
        codigo: "Opción 1",
        nombre: "Jornada de introducción y aplicación",
        resumen: "Una primera experiencia intensiva con todo su equipo junto.",
        duracion: "3 a 4 horas presenciales",
        objetivo:
          "Darles una primera experiencia intensiva que introduzca conceptos, muestre oportunidades y empiece a desarrollar casos de uso.",
        alcance: [
          "Relevamiento previo breve",
          "Una jornada presencial",
          "Trabajo conjunto con todo su equipo",
          "Introducción a IA aplicada al trabajo",
          "Casos comerciales y casos de productividad",
          "Aplicaciones sobre las herramientas disponibles",
          "Ejercicios prácticos",
          "Acceso posterior a recursos digitales",
        ],
        consideracion:
          "Genera sensibilización y aprendizaje inicial, pero ofrece menor profundidad para acompañarlos en la incorporación efectiva de nuevas prácticas.",
        inversion: "",
      },
      {
        codigo: "Opción 2",
        nombre: "Programa de adopción aplicado por roles",
        recomendada: true,
        resumen: "Dos jornadas, hasta cuatro talleres segmentados y trabajo real entre encuentros.",
        duracion: "≈ 8 horas presenciales, en dos jornadas",
        objetivo:
          "Trabajar con grupos segmentados sobre casos reales de cada rol, con aplicación entre jornadas y una segunda instancia para profundizar sobre lo que efectivamente les pasó al aplicarlo.",
        alcance: [
          "Relevamiento previo",
          "Diseño personalizado de los contenidos",
          "Dos jornadas presenciales",
          "Hasta cuatro talleres",
          "Aproximadamente 8 horas totales de interacción presencial",
          "Actividades entre encuentros",
          "Acceso al portal y recursos digitales",
          "Casos de uso adaptados",
          "Recomendaciones finales",
        ],
        inversion: "",
      },
      {
        codigo: "Opción 3",
        nombre: "Programa de adopción + acompañamiento",
        resumen: "Todo el alcance de la Opción 2 más una instancia posterior de acompañamiento.",
        duracion: "30 a 60 días",
        objetivo:
          "Trabajar no solamente sobre la capacitación, sino sobre el comienzo de un proceso de adopción más estructurado puertas adentro.",
        alcance: [
          "Todo el alcance de la Opción 2",
          "Reunión remota de seguimiento",
          "Revisión de casos desarrollados",
          "Consultas",
          "Actualización de la biblioteca de casos",
          "Revisión de buenas prácticas",
          "Definición de referentes internos",
          "Recomendaciones para continuar el proceso",
        ],
        inversion: "",
      },
    ] as OpcionRoyjo[],

    /* Cronograma de la opción recomendada, desplegado aparte: en la tarjeta
       no entraba sin volverla ilegible frente a las otras dos. */
    cronograma: {
      etiqueta: "Opción recomendada",
      titulo: "Cómo se despliega el programa por roles",
      subtitulo: "Los grupos los definimos en función del diagnóstico previo.",
      pasos: [
        {
          etiqueta: "Etapa previa",
          titulo: "Diagnóstico y diseño",
          items: [
            "Diagnóstico individual",
            "Reunión con sus referentes",
            "Segmentación de los participantes",
            "Diseño de contenidos específicos",
          ],
        },
        {
          etiqueta: "Jornada 1",
          titulo: "Dos espacios de ≈ 2 horas",
          texto:
            "Por ejemplo: Grupo A — ingeniería y equipo comercial; Grupo B — administración, marketing y gerencia. O bien Grupo A inicial y Grupo B power users.",
          items: [],
        },
        {
          etiqueta: "Entre jornadas",
          titulo: "7 a 15 días de aplicación",
          items: [
            "Acceden al portal",
            "Consumen contenidos seleccionados",
            "Prueban herramientas",
            "Aplican casos reales",
            "Documentan experiencias",
          ],
        },
        {
          etiqueta: "Jornada 2",
          titulo: "Dos nuevos espacios de ≈ 2 horas",
          items: [
            "Analizar las experiencias",
            "Resolver dificultades",
            "Profundizar herramientas",
            "Desarrollar casos más avanzados",
            "Compartir buenas prácticas",
            "Identificar qué prácticas pueden sostener solos",
          ],
        },
      ],
    },

    gastosTitulo: "Gastos",
    gastos:
      "Traslados, alojamiento y viáticos se cotizan por separado, considerando dos jornadas presenciales en sus instalaciones.",
    inversionPendiente: "A definir",
    inversionNota:
      "El valor se define según la alternativa que consideren más conveniente: cada opción tiene un alcance distinto y por lo tanto una inversión distinta.",
  },

  /* =====================================================================
     10 · POSIBLES ENTREGABLES
     ===================================================================== */
  entregables: {
    eyebrow: "Entregables",
    titulo: "Qué les queda en la mano",
    subtitulo: "Según la modalidad que elijan, el programa puede incluir:",
    items: [
      "Diagnóstico inicial de su equipo",
      "Mapa de niveles de adopción",
      "Identificación de necesidades por rol",
      "Diseño personalizado de los encuentros",
      "Encuentros presenciales",
      "Acceso al portal de formación",
      "Biblioteca de recursos",
      "Plantillas de trabajo",
      "Ejemplos de prompts",
      "Casos de uso específicos de su operación",
      "Recomendaciones de implementación",
      "Documento final de buenas prácticas",
      "Identificación de próximos pasos",
    ],
  },

  /* =====================================================================
     11 · PRÓXIMOS PASOS + CIERRE
     ===================================================================== */
  cierre: {
    eyebrow: "Próximos pasos",
    titulo: "Una vez que elijan la modalidad",
    pasos: [
      "Confirmamos el alcance.",
      "Hacemos el relevamiento.",
      "Analizamos la composición de su equipo.",
      "Definimos los grupos.",
      "Ajustamos los contenidos.",
      "Habilitamos el acceso a los recursos que correspondan.",
      "Hacemos los encuentros.",
      "Documentamos aprendizajes y próximos pasos.",
    ],
    remate:
      "La propuesta busca que la Inteligencia Artificial deje de ser solamente una herramienta que algunos usan de vez en cuando, y empiece a transformarse en una capacidad concreta de su equipo comercial.",
    ctaTitulo: "¿Conversamos el alcance?",
    ctaTexto:
      "Cualquier duda sobre la propuesta, los contenidos o las alternativas, la vemos por donde les resulte más cómodo.",
    ctaWhatsapp: "Escribirme por WhatsApp",
    ctaEmail: "Escribirme por correo",
    firma: "Pablo Brunet",
    firmaPie: "IA aplicada a negocios · Creador del Método INTEGRA",
  },

  /* ---- WhatsApp: mensaje propio de esta propuesta ---- */
  whatsapp: {
    mensaje:
      "Hola Pablo, te escribo desde la propuesta para Distribuidora Royjo. Quería consultarte por…",
    etiqueta: "Consultar por la propuesta",
  },
} as const;

export type Royjo = typeof royjo;
