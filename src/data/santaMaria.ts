/* =====================================================================
   GRUPO SANTA MARÍA — contenido de /cotizacion-grupo-santa-maria
   ---------------------------------------------------------------------
   Propuesta de servicios para UN cliente concreto. Todo el texto vive
   acá; los componentes de /src/components/santaMaria sólo lo dibujan.

   ⚠️ QUÉ ES ESTA PÁGINA, Y QUÉ NO
   Es una propuesta escrita, publicada como página web en vez de como
   PDF. De ahí las dos reglas que la gobiernan y que hay que sostener si
   se agrega contenido nuevo:

   1 · EL LENGUAJE ES EL DE UNA PROPUESTA, NO EL DE UNA LANDING.
       Registro descriptivo —"el servicio comprende", "queda a cargo de
       la empresa", "quedan fuera del alcance"—. Los títulos nombran lo
       que hay debajo ("Encuentros del programa"), no buscan convencer.
       No hay promesas de resultado, no hay adjetivos de venta, no hay
       llamados a la acción. Quien abre esto ya pidió el presupuesto: lo
       que necesita es saber con precisión qué se contrata.

   2 · LA FORMA APROVECHA QUE ES HTML.
       Secciones con aire, índice navegable, tarjetas por encuentro. La
       lectura tiene que ser cómoda; lo que no puede es volverse
       publicitaria.

   Numeración: cada sección lleva su número (01 a 06) en el rótulo
   superior. El índice se arma con el array `indice` del final. Si se
   agrega, se saca o se reordena una sección, hay que tocar el array, el
   `n` de la sección y el orden de los componentes en la página.

   Tratamiento: "la empresa" en las condiciones, "ustedes" sólo cuando la
   frase se dirige al destinatario. El nombre propio queda en la ficha de
   la portada, el <title> y el asunto del correo.

   ⚠️ ORIGEN Y AJUSTE DE ESTA PROPUESTA
   Parte de una cotización preliminar de dos encuentros (taller general +
   encuentro con dirección). El ajuste pedido divide el taller general en
   DOS instancias diferenciadas por audiencia, y fija el ORDEN DE EJECUCIÓN
   de los tres encuentros —confirmado por Pablo, no es el orden en que se
   describían en la propuesta preliminar—:

     1 · Encuentro estratégico con la dirección. Se mantiene como en la
         propuesta original, pero pasa a ser el PRIMERO de los tres.
     2 · Taller de sensibilización, de una hora, para el personal que
         trabaja en territorio (no en oficina).
     3 · Taller AVANZADO de agentes y automatización con IA, para el
         personal que trabaja en oficina (administrativo, comercial,
         operativo, soporte). Profundiza en funcionalidades agénticas de
         ChatGPT/OpenAI y en el armado de flujos delegados a agentes.

   ⚠️ El orden importa y se repite en tres lugares que tienen que quedar
   consistentes: el array `etapas` de `encuentros` (numerados 1, 2 y 3), la
   lista `incluye` de `economicas`, y los ítems de `pasos`. Si se vuelve a
   reordenar la secuencia, hay que tocar los tres.

   ⚠️ QUÉ SE COTIZA (redactado por Pablo, en pesos argentinos):
     · Honorarios — $ 900.000 por el programa completo de tres encuentros.
     · Los viáticos NO están confirmados: quedan "a definir, en caso de
       corresponder", igual que en la propuesta original.
   La FORMA DE PAGO (50 % a la confirmación / 50 % antes del primer
   encuentro) y la VALIDEZ de 30 días son redacciones propuestas sobre el
   mismo esquema que usan las demás cotizaciones del sitio: confirmar
   antes de enviar si hace falta un esquema distinto.

   NOTA DE INDEXACIÓN: la página va con `noindex`. Es una propuesta, no
   contenido del sitio: se comparte por enlace directo.
   ===================================================================== */

/* ---------------------------------------------------------------------
   01 · DIAGNÓSTICO
   ------------------------------------------------------------------- */
const diagnostico = {
  n: "01",
  id: "diagnostico",
  eyebrow: "01 · Diagnóstico",
  titulo: "Diagnóstico y consideraciones previas",
  intro: "De los intercambios previos con la empresa surgen los siguientes puntos de partida:",
  puntos: [
    "Uso informal y no gobernado de herramientas de inteligencia artificial: colaboradores que ya las utilizan por cuenta propia, sin protocolo ni criterios definidos.",
    "Ausencia de criterios claros de seguridad y confidencialidad: no está definido qué información puede compartirse con herramientas externas y cuál no.",
    "Desconocimiento del potencial real de la inteligencia artificial en las tareas cotidianas de las áreas administrativas, comerciales y operativas, tanto en oficina como en territorio.",
    "Falta de un marco común de conducción: la dirección y los mandos medios aún no cuentan con criterios compartidos para liderar un proceso de adopción sostenible.",
  ],
} as const;

/* ---------------------------------------------------------------------
   02 · OBJETO
   ------------------------------------------------------------------- */
const objeto = {
  n: "02",
  id: "objeto",
  eyebrow: "02 · Objeto",
  titulo: "Objeto de la propuesta",
  parrafos: [
    "El presente documento detalla el alcance, la organización y las condiciones de un programa de formación en Inteligencia Artificial, dirigido a tres audiencias con necesidades distintas dentro de la empresa: el personal de oficina, el personal que trabaja en territorio y la dirección.",
    "El programa se estructura en tres encuentros independientes, cada uno con un objetivo, una duración y un nivel de profundidad ajustados a la audiencia a la que se dirige.",
  ],
  finalidadTitulo: "Finalidad",
  finalidad:
    "Que cada audiencia adopte criterios de uso seguro y responsable de la información, identifique aplicaciones concretas de Inteligencia Artificial en su propio trabajo, y que la dirección disponga de un marco para conducir el proceso de adopción de manera sostenible.",
} as const;

/* ---------------------------------------------------------------------
   03 · ENCUENTROS DEL PROGRAMA
   Los tres encuentros van con el mismo formato de tarjeta —icono, número,
   título, texto, recorrido y resultado esperado—: ninguno es "el
   principal". El 1A y el 1B nacen de dividir el taller general original
   por audiencia; el 2 se mantiene igual que en la propuesta preliminar.
   ------------------------------------------------------------------- */
const encuentros = {
  n: "03",
  id: "encuentros",
  eyebrow: "03 · Encuentros",
  titulo: "Encuentros del programa",
  intro:
    "El programa comprende tres encuentros, cada uno dirigido a una audiencia distinta, que se realizan en el orden en que se detallan a continuación. Los tres están incluidos en el importe indicado en el punto 05.",
  etapas: [
    {
      n: "1",
      icono: "target",
      titulo: "Encuentro estratégico con la dirección",
      texto:
        "Destinado a la dirección, las gerencias y los referentes de conducción de la empresa. Formato teórico-práctico. Duración: 2 horas.",
      items: [
        "La Inteligencia Artificial como transformación organizacional, y no solamente tecnológica.",
        "Demostraciones aplicadas a la toma de decisiones: análisis de datos, lectura de reportes e indicadores y consulta de documentación interna.",
        "Memoria organizacional: cómo el conocimiento disperso de la empresa se vuelve consultable y utilizable para decidir.",
        "Por qué fracasan las adopciones: uso desordenado desde abajo y delegación del tema al área de sistemas desde arriba.",
        "El efecto derrame del liderazgo: legitimar el uso, habilitar tiempo de experimentación y definir reglas claras de gobernanza de datos.",
        "El rol crítico de los mandos medios, los champions de Inteligencia Artificial y los agentes de cambio internos.",
        "Criterios para priorizar casos de uso, diseñar experiencias piloto y medir resultados.",
      ],
      cierre:
        "Resultado esperado: la dirección cuenta con una visión clara de oportunidades y riesgos, comprende su responsabilidad en la conducción del proceso y dispone de una agenda inicial de decisiones para los próximos 90 días.",
    },
    {
      n: "2",
      icono: "location",
      titulo: "Taller de sensibilización — Personal en territorio",
      texto:
        "Destinado al personal que no trabaja en oficina, sino en territorio. Formato taller introductorio, con demostraciones en vivo adaptadas a su forma de trabajo. Duración: 1 hora.",
      items: [
        "El impacto de la inteligencia artificial en el trabajo cotidiano, también fuera de la oficina.",
        "Qué es realmente esta tecnología, explicado en términos simples y sin tecnicismos.",
        "Aplicaciones prácticas demostradas en vivo, sobre tareas propias del trabajo en territorio: notas de voz, fotos, mensajes e informes rápidos desde el celular.",
        "Seguridad y confidencialidad: qué información no debe compartirse con herramientas externas, con criterios simples de aplicar.",
      ],
      cierre:
        "Resultado esperado: los participantes comprenden qué es la Inteligencia Artificial y sus criterios básicos de uso responsable, y finalizan con al menos una aplicación concreta identificada para su trabajo diario.",
    },
    {
      n: "3",
      icono: "chip",
      titulo: "Taller avanzado — Automatización y agentes de Inteligencia Artificial",
      texto:
        "Destinado al personal de áreas administrativas, comerciales, operativas y de soporte que trabaja en oficina. Formato taller teórico-práctico, con demostraciones en vivo. Duración: 2 horas.",
      items: [
        "Base de trabajo con Inteligencia Artificial: seguridad, privacidad y confidencialidad, con criterios simples sobre qué información puede compartirse y cuál no.",
        "Comparación práctica entre ChatGPT, Gemini y Claude, y diferencias entre herramientas gratuitas, planes pagos y soluciones empresariales.",
        "Qué es un agente de Inteligencia Artificial y en qué se diferencia de un asistente conversacional: de delegar una tarea a delegar un proceso completo.",
        "Recorrido por las funcionalidades agénticas de ChatGPT y del ecosistema OpenAI: asistentes personalizados, tareas programadas, ejecución de acciones de varios pasos y conexión con herramientas externas.",
        "Cómo se arma un flujo de trabajo delegado a un agente: contexto, herramientas disponibles, memoria y supervisión de los resultados.",
        "Demostraciones en vivo sobre tareas administrativas, comerciales y operativas de mayor complejidad, que requieren varios pasos encadenados.",
      ],
      cierre:
        "Resultado esperado: los participantes comprenden el funcionamiento del ecosistema de agentes de Inteligencia Artificial, sus posibilidades y sus límites, y finalizan con al menos una aplicación concreta identificada para resolver con agentes en su propio trabajo.",
    },
  ],
} as const;

/* ---------------------------------------------------------------------
   04 · METODOLOGÍA
   ------------------------------------------------------------------- */
const metodologia = {
  n: "04",
  id: "metodologia",
  eyebrow: "04 · Metodología",
  titulo: "Plan de trabajo y metodología",
  intro: "Los tres encuentros se coordinan de manera conjunta y se ajustan al perfil de cada audiencia.",
  detalles: [
    {
      icono: "calendario",
      titulo: "Plazo de ejecución",
      texto:
        "Los tres encuentros se realizan en fechas a coordinar con la empresa, dentro de las cuatro semanas posteriores a la confirmación de la propuesta.",
    },
    {
      icono: "chip",
      titulo: "Personalización del material",
      texto: "Los contenidos y las demostraciones se adaptan al perfil de cada audiencia: oficina, territorio y dirección.",
    },
    {
      icono: "intercambio",
      titulo: "Coordinación",
      texto:
        "Canal directo por WhatsApp con el referente interno de la empresa, para coordinar fechas, logística y contenidos de cada encuentro.",
    },
    {
      icono: "documento",
      titulo: "Material de apoyo",
      texto:
        "Se entrega a los participantes de oficina y de dirección una guía de referencia con los criterios de uso seguro, la comparación de herramientas y los ejemplos trabajados. Queda abierto un canal de consultas durante los quince días posteriores a cada encuentro.",
    },
  ],
} as const;

/* ---------------------------------------------------------------------
   05 · CONDICIONES ECONÓMICAS
   ⚠️ La forma de pago y la validez son redacciones propuestas sobre el
   mismo esquema que usan las demás cotizaciones del sitio: confirmar con
   Pablo antes de enviar si la empresa pide otro esquema.
   ------------------------------------------------------------------- */
const economicas = {
  n: "05",
  id: "condiciones-economicas",
  eyebrow: "05 · Condiciones económicas",
  titulo: "Condiciones económicas",
  conceptoTitulo: "Concepto",
  concepto: "Programa completo: los tres encuentros descritos en el punto 03, con material personalizado por audiencia.",
  incluye: [
    "Encuentro estratégico con la dirección (1)",
    "Taller de sensibilización para personal en territorio (2)",
    "Taller avanzado de agentes de Inteligencia Artificial para oficina (3)",
  ],
  importeTitulo: "Honorarios",
  importe: "$ 900.000",
  moneda: "ARS",
  monedaNota: "Pesos argentinos",
  pendiente: "A definir",
  detalles: [
    {
      icono: "documento",
      titulo: "Forma de pago",
      texto:
        "50 % del valor a la confirmación de la propuesta, en concepto de reserva de fecha, y el 50 % restante hasta 48 horas antes del primer encuentro.",
    },
    {
      icono: "location",
      titulo: "Viáticos",
      texto: "A definir, en caso de corresponder según la sede de cada encuentro. No están contemplados en esta propuesta.",
    },
    {
      icono: "clock",
      titulo: "Validez",
      texto: "Los valores indicados mantienen su vigencia durante treinta días corridos desde la fecha de emisión de esta propuesta.",
    },
    {
      icono: "candado",
      titulo: "Confidencialidad",
      texto:
        "La información de la empresa a la que se acceda durante los encuentros recibe tratamiento confidencial y se utiliza exclusivamente para la ejecución de este trabajo.",
    },
  ],
} as const;

/* ---------------------------------------------------------------------
   06 · PRÓXIMOS PASOS
   ------------------------------------------------------------------- */
const pasos = {
  n: "06",
  id: "proximos-pasos",
  eyebrow: "06 · Próximos pasos",
  titulo: "Próximos pasos",
  intro: "En caso de avanzar, la secuencia prevista es la siguiente:",
  items: [
    "Confirmación de la propuesta y acuerdo de las fechas de los tres encuentros.",
    "Coordinación de logística y contenidos por el canal de WhatsApp con el referente interno.",
    "Realización del Encuentro 1 — encuentro estratégico con la dirección.",
    "Realización del Encuentro 2 — taller de sensibilización para territorio.",
    "Realización del Encuentro 3 — taller avanzado para oficina.",
    "Entrega del material de apoyo y apertura del canal de consultas por quince días.",
  ],
  cierre: "Quedo a disposición para ampliar cualquiera de los puntos de este documento o para ajustar el alcance a lo que la empresa considere necesario.",
  contactoTitulo: "Consultas sobre la propuesta",
  contactoTexto: "Por cualquier aclaración sobre el alcance, las condiciones o las fechas, por la vía que les resulte más cómoda.",
  ctaWhatsapp: "Escribir por WhatsApp",
  ctaEmail: "Escribir por correo",
  firma: "Pablo Brunet",
  firmaPie: "Inteligencia Artificial aplicada a negocios",
} as const;

/* =====================================================================
   DOCUMENTO
   ===================================================================== */
export const santaMaria = {
  seo: {
    title: "Propuesta para Grupo Santa María — Programa de Formación en IA",
    description:
      "Alcance, encuentros y condiciones de un programa de formación en Inteligencia Artificial, con encuentros diferenciados para oficina, territorio y dirección.",
  },

  /* =====================================================================
     PORTADA
     El titular nombra el servicio; no argumenta a favor de contratarlo.
     La ficha es lo primero que se chequea en una propuesta, así que va a
     la altura del título y no al pie.
     ===================================================================== */
  hero: {
    /* No hay logo del cliente cargado: el campo queda vacío y la portada
       no dibuja el bloque del membrete. Si la empresa aporta un archivo,
       se sube a /public/images/santa-maria/ y se completa acá. */
    logo: {
      src: "",
      alt: "Grupo Santa María",
      ancho: 0,
      alto: 0,
    },
    titulo: "Programa de Formación en Inteligencia Artificial",
    tituloResalte: "por audiencia: oficina, territorio y dirección.",
    subtitulo:
      "Tres encuentros independientes, cada uno con un objetivo y una profundidad ajustados a quienes lo reciben: un taller avanzado sobre agentes de Inteligencia Artificial para el personal de oficina, un taller de sensibilización para el personal en territorio y un encuentro estratégico con la dirección. Este documento detalla el alcance, la organización y las condiciones del servicio.",
    enlaces: [
      { etiqueta: "Ir a los encuentros", id: "encuentros" },
      { etiqueta: "Ir a las condiciones", id: "condiciones-economicas" },
    ],
    fichaTitulo: "Datos de la propuesta",
    fichaFilas: [
      { etiqueta: "Cliente", valor: "Grupo Santa María", icono: "people" },
      { etiqueta: "Presentada por", valor: "Pablo Brunet", icono: "estrella" },
      { etiqueta: "Fecha de emisión", valor: "27 de agosto de 2026", icono: "calendario" },
      { etiqueta: "Referencia", valor: "PB-2026-08-GSM", icono: "documento" },
      { etiqueta: "Modalidad", valor: "Presencial, en instalaciones de la empresa", icono: "location" },
      { etiqueta: "Encuentros", valor: "Tres, diferenciados por audiencia", icono: "target" },
      { etiqueta: "Duración", valor: "De 1 a 2 horas por encuentro", icono: "clock" },
      { etiqueta: "Validez", valor: "30 días corridos desde la emisión", icono: "shield" },
    ],
  },

  /* Rótulo del índice navegable que va debajo de la portada. */
  indiceTitulo: "Contenido de la propuesta",

  diagnostico,
  objeto,
  encuentros,
  metodologia,
  economicas,
  pasos,

  /* Orden del documento y fuente del índice. Debe coincidir con el orden
     de los componentes en la página. */
  indice: [diagnostico, objeto, encuentros, metodologia, economicas, pasos],

  /* ---- WhatsApp: mensaje propio de esta propuesta ---- */
  whatsapp: {
    mensaje: "Hola Pablo, te escribo por la propuesta para Grupo Santa María. Quería consultarte por…",
    etiqueta: "Consultar por la propuesta",
  },
} as const;

export type SantaMaria = typeof santaMaria;
