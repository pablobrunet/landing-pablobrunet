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
     Sistema    → Sistema Mínimo INTEGRA
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
export interface FaseIntegra {
  letra: string;
  nombre: string;
  /** La pregunta central: se ve en la tarjeta sin desplegarla. */
  pregunta: string;
  texto: string;
  /** Solo la G: corre del día 1 al 60, no es un paso del camino. */
  transversal?: boolean;
  etiqueta?: string;
  regla?: string;
  destacado?: string;
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
    sistema: "Sistema Mínimo INTEGRA",
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
    chip: "Para PyMEs de 10 a 150 personas que ya probaron IA y no vieron resultados",
    /* Headline principal. Las alternativas validadas quedan anotadas para
       testear sin volver a buscarlas en la spec:
         A · "Tu PyME no necesita otro curso de inteligencia artificial."
         B · "Tu empresa ya paga por IA. Todavía no cobró nada a cambio."
         C · "En 60 días instalamos en tu empresa la capacidad para
              integrar inteligencia artificial con método." */
    titulo: "La inteligencia artificial ya entró a tu empresa.",
    tituloResalte: "Entró sin plan — y así no va a dar resultados.",
    subtitulo:
      "Cada persona usa una herramienta distinta, se pagan suscripciones que nadie controla y las capacitaciones no cambiaron nada. En 60 días instalamos en tu empresa un sistema práctico para integrar IA: gente formada, oportunidades priorizadas, pruebas sobre trabajo real y una forma de decidir — sin armar un área de tecnología y sin quedar colgados de un consultor externo.",
    ctaPrimario: "Agendar mi diagnóstico gratuito",
    ctaPrimarioNota: "30 minutos, por videollamada. Te vas con claridad, lo contrates o no.",
    ctaSecundario: "Hacer el chequeo de 2 minutos",
    /* Franja de confianza, debajo de los botones. */
    confianza: [
      { tipo: "logo", texto: "Miembro del OpenAI Partner Network", img: "/images/credenciales/openai-partner-network.png" },
      { tipo: "texto", texto: "Método propio: Método INTEGRA" },
      { tipo: "texto", texto: "100% remoto · reuniones semanales en vivo" },
    ],
  },

  /* ---- VSL ----
     El video todavía no está grabado (supuesto 1 de la spec). Mientras
     `url` esté vacío se dibuja la portada con el aviso; en cuanto pegues
     un enlace de YouTube/Vimeo el reproductor aparece solo.
     ⚠️ Si el video se grabó con un guion anterior (resultado medido a los
     30 días, o la marca ADOPTA-60), hay que regrabarlo. */
  vsl: {
    url: "",
    /* Portada mientras no haya video: una foto real dando una charla lee
       como miniatura de video mucho mejor que un retrato recortado. */
    poster: "/images/about/tedindx-charla.jpg",
    duracion: "90 segundos",
    titulo: "Qué es el Método INTEGRA, en 90 segundos",
    avisoSinVideo: "Video en grabación. Mientras tanto, el método está contado abajo, paso por paso.",
  },

  /* =====================================================================
     2 · ESPEJO DEL PROBLEMA (interactivo)
     Los 8 dolores son textuales de la propuesta madre: no se editan.
     ===================================================================== */
  espejo: {
    eyebrow: "El espejo",
    titulo: "¿Cuántas de estas te pasan hoy?",
    subtitulo: "Tocá las que reconozcas en tu empresa. Sin registro, sin trampa.",
    dolores: [
      "Cada persona usa herramientas de IA diferentes.",
      "No hay un criterio común dentro de la empresa.",
      "Se pagan suscripciones sin saber si hacen falta.",
      "El equipo conoce herramientas, pero no sabe aplicarlas al trabajo real.",
      "Las capacitaciones quedaron desconectadas del día a día.",
      "No se sabe qué tarea, área o proceso mejorar primero.",
      "Hay iniciativas aisladas, pero no una estrategia sostenida.",
      "Nadie mide cuánto tiempo o dinero se está ganando (si se está ganando algo).",
    ],
    /* Respuesta según cuántas marcó. `hasta` es el tope del tramo. */
    respuestas: [
      {
        hasta: 1,
        titulo: "Mejor que la mayoría",
        texto:
          "Tu empresa está mejor que la mayoría. La pregunta que ordena todo es la siguiente: si mañana aparece una oportunidad nueva, ¿tienen una forma acordada de decidir si vale la pena? La reunión de diagnóstico sirve para responderla.",
      },
      {
        hasta: 4,
        titulo: "El punto exacto donde empieza a costar plata",
        texto:
          "Tu empresa está en el punto exacto donde la IA dispersa empieza a costar plata. No porque falten herramientas: porque todavía no hay una forma común de decidir dónde aplicarlas. Es el mejor momento para instalarla.",
      },
      {
        hasta: 8,
        titulo: "No es un problema de IA. Es de método.",
        texto:
          "Tu empresa no tiene un problema de inteligencia artificial. Tiene un problema de método: nadie adentro sabe hoy cómo identificar, priorizar y decidir. Eso es exactamente lo que se instala en 60 días.",
      },
    ],
    fija:
      "Ninguna de estas se arregla comprando otra herramienta ni contratando a alguien que la use por vos. Se arregla cuando tu equipo sabe decidir.",
    cta: "Quiero que mi empresa sepa resolver esto sola — agendar diagnóstico",
  },

  /* =====================================================================
     3 · EL COSTO DE SEGUIR ASÍ
     ===================================================================== */
  costo: {
    eyebrow: "La cuenta que ya estás pagando",
    titulo: "El problema no es lo que la IA te va a costar. Es lo que ya te está costando.",
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
    cta: "Ver dónde lo estoy perdiendo — diagnóstico gratuito",
  },

  /* =====================================================================
     4 · EL MÉTODO: LAS SIETE FASES INTEGRA
     La G no es un paso más: es una banda transversal que corre del día 1
     al 60. No aplanarla a un séptimo escalón (nota de build de la spec).
     ===================================================================== */
  metodo: {
    eyebrow: "El método",
    titulo: "No empezamos por las herramientas. Empezamos por los resultados que tu empresa necesita.",
    subtitulo:
      "El Método INTEGRA es un método de integración práctica de inteligencia artificial. No es un curso ni un catálogo de herramientas: son siete fases cuyas iniciales forman el nombre del método, recorridas en 60 días con cuatro puntos de control donde dirección revisa que el proceso está realmente avanzando.",
    fases: [
      {
        letra: "I",
        nombre: "Identificar",
        pregunta: "¿Cuál es el punto de partida y dónde hay problemas u oportunidades que merecen atención?",
        texto:
          "Se designan los roles (sponsor, referente interno, responsables de área), se releva qué sabe hoy cada persona, se inventaría qué herramientas se pagan y quién las usa, se fijan reglas básicas de uso responsable y se registran las primeras oportunidades, expresadas como problemas.",
      },
      {
        letra: "N",
        nombre: "Negociar prioridades",
        pregunta: "¿Qué merece atención primero, qué se deja para después y qué no se va a hacer en este ciclo?",
        texto:
          "Las áreas dejan de hablar de «usar IA» y empiezan a hablar de problemas concretos. Cada oportunidad se puntúa por impacto, esfuerzo, riesgo y capacidad, y entra al Tablero de Oportunidades con responsable asignado. Dirección respalda la cartera.",
        regla: "Regla visible: hasta dos oportunidades priorizadas por área, una sola activa.",
      },
      {
        letra: "T",
        nombre: "Transformar",
        pregunta: "¿Cómo convertimos una oportunidad en una iniciativa chica, segura y decidible?",
        texto:
          "Cada oportunidad priorizada se transforma en una Prueba Aplicada: problema, mejora esperada, responsable, alcance acotado, herramienta o enfoque, riesgos y controles, evidencia a observar y decisión final.",
        destacado:
          "Transformar no significa construir la automatización. Significa convertir una idea amplia en una prueba que tu equipo puede ejecutar con sus propios recursos.",
      },
      {
        letra: "E",
        nombre: "Ejecutar",
        pregunta: "¿Qué pasa cuando tu equipo prueba el enfoque sobre trabajo real?",
        texto:
          "Las áreas ejecutan sus Pruebas Aplicadas sobre tareas y procesos reales —no sobre ejercicios—, con alcance chico, controles humanos y registro de evidencia. Ejecuta tu empresa, con nuestro acompañamiento: nadie aprende a decidir mirando cómo decide otro.",
      },
      {
        letra: "G",
        nombre: "Gestionar",
        transversal: true,
        etiqueta: "Del día 1 al 60",
        pregunta: "¿Cómo se sostiene el proceso mientras la operación diaria compite por atención?",
        texto:
          "Formación según rol y nivel, ritual interno semanal, panel de alertas, resolución de bloqueos y gestión del cambio. Es la fase que evita que la iniciativa se apague — por eso no es una semana del calendario: corre todo el tiempo.",
      },
      {
        letra: "R",
        nombre: "Rentabilizar",
        pregunta: "¿Qué valor produjo cada prueba y qué decisión conviene tomar?",
        texto:
          "Cada prueba activa termina en una decisión fundada: adoptar, iterar, pausar, descartar o escalar.",
        destacado:
          "Descartar una oportunidad con evidencia también es rentabilizar: te ahorraste una inversión mala y tu equipo aprendió a decidir. Rentabilizar no es una promesa de retorno financiero — es que ninguna prueba quede sin decisión.",
      },
      {
        letra: "A",
        nombre: "Acelerar",
        pregunta: "¿Cómo logra tu empresa repetir el ciclo con más autonomía y menos fricción?",
        texto:
          "Lo aprendido se convierte en forma de trabajo: quién carga las oportunidades nuevas, quién prioriza, qué ritual semanal queda corriendo, dónde vive la documentación y qué se hace en los siguientes 90 días. Acelerar no es implementar más soluciones: es que el próximo ciclo te cueste la mitad.",
      },
    ] as FaseIntegra[],
    /* En documentos internos se llaman «gates». En la landing, siempre
       «punto de control» (supuesto 11 de la spec). */
    puntosDeControl: {
      titulo: "Cuatro puntos de control con dirección",
      subtitulo:
        "No es un programa que se evalúa al final. Cada quince días dirección revisa, con una pregunta concreta, si el proceso avanza de verdad.",
      items: [
        { dia: 15, pregunta: "¿Tu empresa identificó su punto de partida y están dadas las condiciones para integrar IA con método?" },
        { dia: 30, pregunta: "¿Tu empresa sabe negociar prioridades y transformar una oportunidad en una Prueba Aplicada?" },
        { dia: 45, pregunta: "¿Tu empresa sabe ejecutar, leer evidencia y convertir lo que pasó en una decisión?" },
        { dia: 60, pregunta: "¿Quedó instalado el sistema y tu empresa está lista para acelerar el siguiente ciclo?" },
      ],
    },
    acompanamiento: {
      titulo: "El acompañamiento no es una fase: es lo que evita que las fases se caigan.",
      texto:
        "Todas las semanas hay una clínica privada de 60 minutos con el equipo (la Clínica INTEGRA), y cada quince días una alineación con dirección de 30 minutos donde se toman las decisiones que destraban — cada punto de control coincide con una de esas alineaciones. Más el encuentro grupal de la comunidad.",
    },
    remate:
      "Todo remoto, con encuentros semanales en vivo. Tu empresa pone las personas, el tiempo y las decisiones; nosotros ponemos el método, los materiales, el acompañamiento y el ritmo.",
  },

  /* =====================================================================
     5 · QUÉ QUEDA INSTALADO
     Regla de la sección: artefactos y capacidades SIEMPRE juntos.
     ===================================================================== */
  instalado: {
    eyebrow: "Qué te queda",
    titulo: "Al día 60 tu empresa se queda con esto.",
    subtitulo:
      "No con una automatización que funciona hasta que se rompe. Con un sistema propio para seguir identificando, decidiendo y probando — lo llamamos el Sistema Mínimo INTEGRA.",
    artefactos: {
      titulo: "Lo que se lleva escrito",
      etiqueta: "3 artefactos",
      items: [
        {
          titulo: "El Workbook INTEGRA",
          texto:
            "Un único documento vivo con cinco pestañas: alineación y gobierno · personas y capacidades · el Tablero de Oportunidades y las pruebas · alertas, decisiones y aprendizajes · el plan de los próximos 90 días.",
        },
        {
          titulo: "El Repositorio INTEGRA",
          texto:
            "Cinco carpetas ordenadas donde viven el workbook, los sistemas y plantillas que funcionaron, las pruebas y sus resultados, la política de uso y los materiales de formación. Incluye lo que no funcionó y por qué — es lo que evita repetir errores dentro de seis meses.",
        },
        {
          titulo: "El Plan Operativo de 90 días",
          texto:
            "Qué sigue después del programa: próximas oportunidades, responsables, cadencia, fechas de revisión y riesgos a vigilar. Con un resumen ejecutivo breve, escrito para dirección y no para técnicos.",
        },
      ],
    },
    capacidades: {
      titulo: "Lo que se lleva instalado",
      etiqueta: "3 capacidades",
      items: [
        {
          titulo: "Capacidad técnica",
          texto:
            "Gente que sabe usar con responsabilidad la herramienta principal de la empresa: dar contexto, trabajar con documentos y datos internos, iterar, verificar salidas, detectar invenciones y aplicar controles humanos.",
        },
        {
          titulo: "Capacidad metodológica",
          texto:
            "Gente que sabe mirar su propio trabajo, distinguir un problema real de una idea genérica de herramienta, expresar la mejora esperada, negociar prioridades con criterios comunes, diseñar una prueba chica y decidir con evidencia.",
        },
        {
          titulo: "Capacidad organizacional",
          texto:
            "Cada persona sabe qué le toca dentro de una iniciativa de IA: qué decide dirección, qué sostiene el referente interno, qué autoriza el responsable de un área y qué ejecuta y documenta quien lleva adelante una prueba.",
        },
      ],
    },
    cita:
      "Ahora tenemos responsables, criterios compartidos, una forma de detectar y priorizar oportunidades, un protocolo para probarlas, espacios para decidir, un registro de evidencia y un plan para continuar avanzando.",
    citaPie: "Así suena una empresa con el sistema instalado.",
    nota:
      "Puede haber ciclos que dejen tres mejoras adoptadas y ciclos que dejen una. Lo que no puede faltar es la capacidad de producir la siguiente sin nosotros.",
    cta: "Empezar por el diagnóstico gratuito",
  },

  /* =====================================================================
     6 · QUIÉN HACE QUÉ
     Filtra al prospecto que busca un done-for-you: es el punto.
     ===================================================================== */
  reparto: {
    eyebrow: "El reparto",
    titulo: "Esto no lo hacemos por vos. Lo hacemos con vos — y queda claro desde el primer día.",
    subtitulo:
      "La mitad de los programas de IA fracasan por un malentendido de reparto. Preferimos ponerlo por escrito antes de empezar.",
    columnas: [
      {
        titulo: "Nosotros ponemos",
        tono: "nosotros",
        items: [
          "El método",
          "La capacitación y los materiales",
          "La facilitación de todas las reuniones",
          "Ayuda para identificar y negociar prioridades",
          "Revisión del diseño de cada prueba",
          "Recomendación de herramientas y enfoques",
          "Ayuda para achicar el alcance cuando se agranda solo",
          "Señalamiento de riesgos",
          "El ritmo semanal",
          "Visibilidad sobre avances, bloqueos y decisiones",
          "Ayuda para interpretar la evidencia",
          "Toda la documentación del sistema",
          "La transferencia final",
        ],
      },
      {
        titulo: "Tu empresa pone",
        tono: "empresa",
        items: [
          "Un sponsor y un referente interno",
          "Tiempo asignado y explícito",
          "Accesos e información",
          "La ejecución de las pruebas",
          "El uso real de las herramientas",
          "El registro de resultados",
          "Las decisiones",
          "La resolución de los bloqueos internos",
          "El sostenimiento de los rituales",
        ],
      },
      {
        titulo: "Lo hacemos juntos",
        tono: "juntos",
        items: [
          "Negociar las prioridades",
          "Definir los criterios de éxito",
          "Revisar la evidencia",
          "Decidir si algo se adopta, se ajusta o se descarta",
          "Armar el plan de los próximos 90 días",
        ],
      },
    ],
    frase: [
      "Somos responsables de que exista y funcione el proceso de integración.",
      "Tu empresa es responsable de ejecutar su trabajo dentro de ese proceso.",
    ],
    fuera: {
      titulo: "Qué no incluye",
      texto:
        "Desarrollo de software, automatizaciones complejas, integraciones, configuración técnica extensa, migraciones de datos y mantenimiento técnico continuo quedan fuera del programa. Cuando una oportunidad pide eso, se registra, se evalúa y se cotiza aparte como proyecto de implementación.",
    },
    tiempo: {
      titulo: "Cuánto tiempo hay que poner",
      chips: [
        "Referente interno: 3-4 h por semana",
        "Cada participante: ~1,5 h por semana",
        "Dirección: 30 minutos cada quince días",
      ],
    },
  },

  /* =====================================================================
     7 · LA GARANTÍA (de sistema instalado, no de implementación)
     ===================================================================== */
  garantia: {
    eyebrow: "Sin riesgo",
    titulo: "Garantía: el sistema queda instalado.",
    texto:
      "Si tu empresa cumple con las condiciones de participación, dedicación y ejecución acordadas, y al día 60 no queda instalado el Sistema Mínimo INTEGRA definido en el programa, seguimos acompañándola sin costo hasta completarlo.",
    bloques: [
      {
        titulo: "Qué cubre",
        items: [
          "La metodología",
          "El acompañamiento",
          "La capacitación",
          "La transferencia",
          "El sistema de trabajo y los entregables mínimos",
        ],
      },
      {
        titulo: "Qué no garantizamos",
        items: [
          "Ahorros determinados",
          "Un retorno específico",
          "Una cantidad de automatizaciones",
          "Resultados que dependan de la ejecución de tu empresa",
          "Implementaciones técnicas fuera del alcance",
        ],
      },
      {
        titulo: "Qué acepta tu empresa",
        items: [
          "Designar responsables",
          "Participar y asignar tiempo",
          "Dar accesos",
          "Ejecutar las pruebas y registrar evidencia",
          "Que dirección participe de los cuatro puntos de control",
        ],
      },
    ],
    cierre: "Preferimos una garantía chica que podamos cumplir siempre antes que una grande que no te creerías.",
  },

  /* =====================================================================
     8 · QUIÉN SOY (autoridad)
     ===================================================================== */
  autoridad: {
    eyebrow: "Quién está detrás",
    titulo: "Quién está del otro lado del método",
    foto: "/images/about/retrato-sobre-mi.png",
    fotoAlt: "Pablo Brunet, creador del Método INTEGRA",
    cuerpo: [
      "Soy Pablo Brunet. Trabajo en la intersección entre estrategia comercial, inteligencia artificial e integración tecnológica en empresas.",
      "No vengo a venderte herramientas ni cursos, y tampoco a hacerte el trabajo: ayudo a empresas como la tuya a decidir dónde aplicar IA, a desarrollar capacidad real en el equipo y a quedarse con un método propio para seguir sin mí.",
      "Hablo el idioma de las PyMEs — no el de los departamentos de sistemas.",
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
    eyebrow: "Chequeo exprés",
    titulo: "¿Cuánta IA se le está escapando a tu empresa?",
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
    resultadoCta: "Convertir este resultado en un plan — agendar diagnóstico gratuito",
    reiniciar: "Volver a empezar",
  },

  /* =====================================================================
     10 · OBJECIONES Y PREGUNTAS FRECUENTES
     ===================================================================== */
  faq: {
    eyebrow: "Preguntas frecuentes",
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
