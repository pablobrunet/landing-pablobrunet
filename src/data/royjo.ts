/* =====================================================================
   DISTRIBUIDORA ROYJO — contenido de /cotizacion-distribuidora-royjo
   ---------------------------------------------------------------------
   Página de propuesta comercial para UN cliente concreto. Todo el texto
   vive acá; los componentes de /src/components/royjo sólo lo dibujan.

   FUENTE: "Propuesta de Programa de Adopción de Inteligencia Artificial
   aplicada al proceso comercial — Distribuidora Royjo". Si el documento
   cambia, se corrige acá y se propaga solo.

   VALORES (cerrados el 2026-08-10, en pesos argentinos):
     · Opción 1 — $ 1.800.000
     · Opción 2 — $ 2.400.000, con 30 días de acceso al portal al terminar
     · Ninguno incluye viáticos: se cotizan aparte, sobre la base de dos
       jornadas presenciales en la empresa.
   La diferencia de $ 600.000 es exactamente el acceso al portal para las
   18 personas, y así está dicho en `inversionNota`. Si cambia un monto,
   revisar que esa resta siga cerrando.

   La página NO aclara si los valores llevan IVA, y es una decisión de
   Pablo: no agregar esa línea. Lo único que se dice sobre lo que queda
   afuera son los viáticos.

   Si algún monto se vacía, la tarjeta lo dibuja como "A definir" en vez
   de romperse (ver `inversionPendiente`).

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
      "Alcance del programa de adopción de Inteligencia Artificial aplicada a su proceso comercial: relevamiento, segmentación por rol, dos jornadas presenciales y dos alternativas de implementación.",
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
      { etiqueta: "Duración", valor: "Dos jornadas presenciales — ≈ 8 horas", icono: "calendario" },
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
     ---------------------------------------------------------------------
     Esta sección prepara la decisión de la siguiente: las dos jornadas y
     el trabajo aplicado entre medio están en las dos alternativas, y el
     portal está en una sola. Por eso el ciclo va primero (es común) y el
     portal después, marcado como lo que separa una opción de la otra.
     ===================================================================== */
  continuidad: {
    eyebrow: "Sostenibilidad",
    titulo: "Lo que pasa",
    tituloResalte: "entre una jornada y la otra.",
    subtitulo:
      "El trabajo real ocurre en ese tramo, no en el aula. Con qué cuentan las personas mientras tanto es, justamente, lo único que separa a las dos alternativas.",

    ciclo: {
      etiqueta: "En las dos opciones",
      titulo: "Dinámica entre encuentros",
      texto:
        "Entre las dos jornadas proponemos pequeñas experiencias de aplicación. Cada participante elige uno o más casos reales de su trabajo, y esos casos los usamos como insumo del segundo encuentro. Se llevan además las guías, las plantillas y la biblioteca de prompts para trabajar con eso.",
      pasosTitulo: "El ciclo",
      pasos: ["Aprender", "Aplicar", "Compartir", "Mejorar", "Incorporar"],
      detalle: [
        "Experimentar.",
        "Aplicar alguna de las herramientas trabajadas.",
        "Registrar el resultado.",
        "Compartir aprendizajes o dificultades.",
      ],
    },

    /* La captura del portal es el único elemento de prueba de toda la
       propuesta: el resto son promesas de lo que va a pasar, y esto ya
       existe. Por eso va a todo el ancho y no metida en una tarjeta.

       ⚠️ Los textos de acá describen lo que SE VE en la captura y nada
       más — usuario propio, avance guardado, cursos por nivel, cursos por
       herramienta, comunidad y archivos. Si se cambia la captura, revisar
       que sigan siendo ciertos, sobre todo los nombres de los cursos. No
       agregar cifras de catálogo ni promesas de resultado: el portal
       acompaña el programa, no lo reemplaza.

       La captura vive en /public/images/integra/ y mide 1358×594. Si se
       reemplaza por una de otra proporción, actualizar `width`/`height`
       en RoyjoContinuidad.astro: están ahí para reservar el espacio y
       evitar que la página salte cuando la imagen termina de cargar. */
    plataforma: {
      icono: "documento",
      etiqueta: "Sólo en la Opción 2",
      titulo: "El portal con los cursos en video",
      texto:
        "Además de las guías, su equipo puede tener acceso a un espacio privado de formación. No es una carpeta con PDFs: cada persona entra con su usuario, ve los cursos en video que le corresponden y retoma donde dejó.",
      /* La sección va ANTES de las alternativas, así que la etiqueta "Sólo
         en la Opción 2" todavía no significa nada para quien lee. Esta
         nota lo aclara y ofrece el salto. */
      nota: "El portal es lo único que cambia entre las dos alternativas: una lo incluye y la otra no.",
      notaCta: "Ver las alternativas",

      captura: "/images/integra/portal-integra.png",
      capturaAlt:
        "Portal INTEGRA: el panel de un participante, con el curso en progreso y su barra de avance, el resumen de actividad y el catálogo de cursos por nivel",
      capturaPie: "El portal tal como lo ve cada participante cuando entra.",

      claves: [
        {
          icono: "people",
          titulo: "Un usuario por persona",
          texto:
            "El avance queda guardado. Se retoma donde se dejó, sin volver a empezar ni depender de que alguien reenvíe un enlace.",
        },
        {
          icono: "lista",
          titulo: "Nivelar sin frenar al resto",
          texto:
            "Los cursos van por nivel: quien viene desde cero se pone al día solo antes del segundo encuentro, y quien ya sabe saltea. Es lo que las guías por sí solas no resuelven.",
        },
        {
          icono: "chip",
          titulo: "Cursos por herramienta",
          /* Los nombres son los que se leen en la captura, textuales. Si
             cambia el catálogo, cambiar acá también. */
          texto:
            "Bases y buenas prácticas de IA, Claude para tu negocio y Gemini para el trabajo — este último conecta directo con el entorno de Google que ya usan.",
        },
        {
          icono: "barras",
          titulo: "El avance se ve",
          texto:
            "Cursos en progreso y completados por persona: su referente interno sabe cómo viene el equipo sin tener que preguntar uno por uno.",
        },
      ],

      /* Durante el programa cubre el tramo entre jornadas; los 30 días
         posteriores son para seguir después de la segunda. */
      acceso: "Acceso durante todo el programa y 30 días más al terminar",
      remate:
        "El portal no reemplaza los encuentros: los sostiene. Con 18 personas de niveles distintos, es la diferencia entre que el segundo encuentro arranque parejo o que haya que volver a explicar lo básico.",
    },
  },

  /* =====================================================================
     9 · ALTERNATIVAS DE IMPLEMENTACIÓN
     ---------------------------------------------------------------------
     El núcleo comercial. Las dos tienen EXACTAMENTE la misma estructura
     presencial —relevamiento, dos jornadas, hasta cuatro talleres, ≈8
     horas— y difieren en una sola cosa: si entre jornada y jornada hay
     portal con videos o sólo material escrito.

     Que compartan duración y alcance presencial NO es un descuido: es lo
     que hace la comparación honesta. La Opción 2 no vende "más horas",
     vende que 18 personas de niveles distintos lleguen parejas al
     segundo encuentro. Si alguna vez se agregan opciones, mantener este
     principio: una sola variable de diferencia por vez.
     ===================================================================== */
  alternativas: {
    eyebrow: "Alternativas",
    titulo: "Dos formas de implementarlo",
    subtitulo:
      "Las dos tienen la misma estructura: relevamiento previo, dos jornadas presenciales y trabajo aplicado entre medio. Lo único que cambia es con qué cuenta cada persona entre una jornada y la otra.",
    opciones: [
      {
        codigo: "Opción 1",
        nombre: "Programa de adopción aplicado por roles",
        resumen: "Las dos jornadas, con guías y plantillas para el trabajo entre medio.",
        duracion: "≈ 8 horas presenciales, en dos jornadas",
        objetivo:
          "Trabajar con grupos segmentados sobre casos reales de cada rol, con aplicación entre jornadas y una segunda instancia para profundizar sobre lo que efectivamente les pasó al aplicarlo.",
        alcance: [
          "Relevamiento previo: diagnóstico individual y reunión con referentes",
          "Diseño personalizado de los contenidos",
          "Dos jornadas presenciales",
          "Hasta cuatro talleres segmentados por grupo",
          "Aproximadamente 8 horas totales de trabajo presencial",
          "Actividades de aplicación entre jornadas",
          "Guías prácticas y plantillas de trabajo",
          "Biblioteca de prompts",
          "Casos de uso adaptados a su operación",
          "Documento final de buenas prácticas y recomendaciones",
        ],
        consideracion:
          "Entre jornada y jornada cada persona aplica con el material escrito que le dejamos. Quien arranca desde cero no tiene dónde nivelarse por su cuenta, y con 18 participantes de niveles distintos esa diferencia se nota en el segundo encuentro.",
        inversion: "$ 1.800.000",
      },
      {
        codigo: "Opción 2",
        nombre: "Programa de adopción + portal de formación",
        recomendada: true,
        resumen: "Lo mismo, más el portal con los cursos en video durante todo el programa.",
        duracion: "≈ 8 horas presenciales, en dos jornadas",
        objetivo:
          "Lo mismo que la Opción 1, con el portal cubriendo el tramo entre jornadas: cada persona se nivela o profundiza por su cuenta, según de dónde parta.",
        alcance: [
          "Todo el alcance de la Opción 1",
          "Acceso al Portal INTEGRA para los 18 participantes",
          "Cursos en video, ordenados por nivel y por herramienta",
          "Avance guardado por persona",
          "Comunidad y archivos compartidos",
          "Nuevos contenidos durante la vigencia del acceso",
          "30 días de acceso al portal después del programa",
        ],
        inversion: "$ 2.400.000",
      },
    ] as OpcionRoyjo[],

    /* El cronograma es el MISMO para las dos opciones: por eso ya no se
       titula "de la recomendada". La única diferencia vive en el paso
       "Entre jornadas", y está dicha ahí con todas las letras. */
    cronograma: {
      etiqueta: "Las dos opciones",
      titulo: "Cómo se despliega el programa",
      subtitulo:
        "La estructura es idéntica en las dos alternativas. Los grupos los definimos en función del diagnóstico previo.",
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
          /* Único punto donde las dos opciones se separan. */
          texto: "Es el tramo donde se diferencian las dos opciones: con la 2, además, tienen el portal.",
          items: [
            "Trabajan con las guías y la biblioteca de prompts",
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

    /* Moneda al lado del monto: los dos valores son argentinos y sin la
       aclaración un "$" a secas se puede leer en dólares. */
    moneda: "ARS",
    /* Título y texto se dibujan pegados y en ese orden: "Título: texto".
       La redacción es textual de Pablo — no reescribirla. */
    gastosTitulo: "Los viáticos no están incluidos",
    gastos:
      "el monto se obtiene de un calculador propio, cuyo cálculo será compartido oportunamente a la empresa. Se calcula sobre la base de dos jornadas presenciales en sus oficinas.",
    /* Se usa sólo si algún monto queda vacío: hoy los dos están cargados. */
    inversionPendiente: "A definir",
    inversionNota:
      "El trabajo presencial es idéntico en las dos: la diferencia son los $ 600.000 del acceso al portal para las 18 personas, durante el programa y 30 días más.",
  },

  /* =====================================================================
     10 · POSIBLES ENTREGABLES
     ===================================================================== */
  entregables: {
    eyebrow: "Entregables",
    titulo: "Qué les queda en la mano",
    subtitulo:
      "Todo esto va en las dos opciones. El acceso al portal es lo único que depende de cuál elijan.",
    items: [
      "Diagnóstico inicial de su equipo",
      "Mapa de niveles de adopción",
      "Identificación de necesidades por rol",
      "Diseño personalizado de los encuentros",
      "Dos jornadas presenciales",
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
