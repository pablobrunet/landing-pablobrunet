/* =====================================================================
   SPEEDAGRO — contenido de /cotizacion-speedagro
   ---------------------------------------------------------------------
   Cotización para UN cliente concreto: una charla de una hora sobre
   Inteligencia Artificial aplicada al agro, para el grupo de productores
   agropecuarios del Uruguay que visita la planta de la empresa junto a
   Agrofuturo, su distribuidor allá. Todo el texto vive acá; los
   componentes de /src/components/speedAgro sólo lo dibujan.

   ⚠️ ESTA COTIZACIÓN ES CORTA A PROPÓSITO, sobre el mismo patrón que
   /cotizacion-der-electricidad: cuatro puntos, sin relato, frases cortas.
   No es un programa de varios encuentros como Santa María: es una charla
   única de una hora.

   ⚠️ ORIGEN. Surge de la llamada del 3/9/2026 con Emanuel Cimolini
   (SpeedAgro). Puntos que definen el contenido:

     · La empresa fabrica coadyuvantes —productos que mejoran la
       aplicación de fitosanitarios (herbicida, fungicida, insecticida)—
       y recibe cada año a un grupo de productores agropecuarios del
       Uruguay, clientes vía Agrofuturo, su distribuidor allá.
     · El grupo (~50 personas) llega el miércoles por la noche, se aloja
       en el Hotel Los Silos y al otro día recorre planta, laboratorio y
       depósito automatizado. La charla cierra esa jornada, antes de que
       el grupo siga viaje a Corrientes a pescar.
     · En la edición anterior, una charla técnica más extensa (mezclas de
       fitosanitarios) se hizo pesada y generó quejas: de ahí la duración
       acotada de una hora y el pedido explícito de un formato práctico.
     · Pablo propuso un formato con demostraciones en vivo —comparte
       pantalla y resuelve tareas reales sobre la marcha— con un mínimo de
       marco teórico para que el por qué de la práctica se entienda, y no
       sólo la herramienta. Tres prácticas adaptadas a la realidad del
       campo: cuáles, se define más cerca de la fecha y no es parte de
       esta cotización.

   ⚠️ QUÉ SE COTIZA (a confirmar antes de enviar):
     · Honorarios — $ 500.000, por la charla completa de una hora.
     · Moneda interpretada en pesos argentinos, por tratarse de un
       trabajo facturado en Argentina. Confirmar antes de enviar.
     · FORMA DE PAGO y VALIDEZ son redacciones propuestas, no discutidas
       en la llamada: mismo esquema de 50/50 que usan las demás
       cotizaciones del sitio. La validez se fija hasta la fecha del
       evento, porque una vigencia de treinta días no tiene sentido para
       una charla que se da en una semana.
     · VIÁTICOS: no surgieron en la conversación. Quedan "a definir, en
       caso de corresponder", igual que en la propuesta de Santa María.

   ⚠️ FECHA DEL EVENTO: jueves 10 de septiembre de 2026 ("el jueves de la
   semana que viene" respecto de la llamada del 3/9/2026, un jueves).
   Sede: Sala Zoom del Parque Industrial de Sauce Viejo, con alternativa
   en un predio propio de la empresa —la ex Fiat—, lindero al parque.
   Ambas opciones tienen pantalla y proyector.

   NOTA DE INDEXACIÓN: la página va con `noindex`. Es una cotización, no
   contenido del sitio: se comparte por enlace directo.
   ===================================================================== */

/* ---------------------------------------------------------------------
   01 · CONTEXTO Y AUDIENCIA
   ------------------------------------------------------------------- */
const contexto = {
  n: "01",
  id: "contexto",
  eyebrow: "01 · Contexto",
  titulo: "Contexto y audiencia",
  intro:
    "La charla se da en el marco de la visita anual de un grupo de productores agropecuarios del Uruguay a la planta de la empresa, junto a Agrofuturo, su distribuidor allá:",
  puntos: [
    "El grupo está formado por aproximadamente 50 productores agropecuarios del Uruguay, clientes de la empresa a través de Agrofuturo.",
    "Llegan el miércoles por la noche y se alojan en el Hotel Los Silos. Al día siguiente recorren la planta, el laboratorio y el depósito automatizado, y reciben charlas sobre los productos de la empresa.",
    "La charla sobre Inteligencia Artificial cierra esa jornada en la empresa, antes de que el grupo continúe viaje hacia Corrientes para una actividad de pesca.",
    "En la edición anterior, una charla técnica más extensa generó cansancio en el grupo. El formato de esta edición se ajusta a esa experiencia: una hora, con foco práctico.",
  ],
} as const;

/* ---------------------------------------------------------------------
   02 · CONTENIDO DE LA CHARLA
   Tres bloques: el marco, la parte práctica y los datos. Ninguno
   describe QUÉ prácticas puntuales se muestran: eso se define más cerca
   de la fecha y no es parte de esta cotización.
   ------------------------------------------------------------------- */
const contenido = {
  n: "02",
  id: "contenido",
  eyebrow: "02 · Contenido",
  titulo: "Contenido de la charla",
  intro:
    "Una hora de formato teórico-práctico. El marco teórico es breve, y está para que se entienda el por qué de cada práctica, no como un fin en sí mismo:",
  bloques: [
    {
      n: "1",
      icono: "target",
      titulo: "La Inteligencia Artificial como revolución transversal",
      pie: "Marco teórico",
      items: [
        "Por qué adoptar Inteligencia Artificial es un proceso organizacional, y no sólo la incorporación de una herramienta.",
        "Los desafíos que enfrenta cualquier dueño de una explotación agropecuaria al incorporar una tecnología nueva, y el factor humano detrás de la resistencia al cambio.",
        "Un panorama de las distintas verticales en las que la Inteligencia Artificial se puede aplicar a la actividad agropecuaria.",
      ],
    },
    {
      n: "2",
      icono: "play",
      titulo: "Demostraciones en vivo, adaptadas al campo",
      pie: "Prácticas en tiempo real",
      items: [
        "Ejercicios en vivo, compartiendo pantalla, sobre situaciones concretas de la actividad agropecuaria.",
        "Tres prácticas adaptadas a la realidad del campo, pensadas para que cada productor se lleve al menos una aplicación concreta para su propia explotación.",
        "No es una demostración de herramientas en abstracto: el objetivo es que cada uno identifique en qué proceso propio puede empezar a aplicarlo.",
      ],
    },
    {
      n: "3",
      icono: "data",
      titulo: "Datos propios y gobernanza",
      pie: "Cierre de la charla",
      items: [
        "Por qué la calidad de los datos propios de la explotación —rindes, campañas, aplicaciones— condiciona lo que la Inteligencia Artificial puede devolver.",
        "Cómo empezar a estructurar información que hoy está dispersa en planillas o notas sueltas, para poder aprovecharla más adelante.",
      ],
    },
  ],
} as const;

/* ---------------------------------------------------------------------
   03 · DINÁMICA
   Cuatro tarjetas parejas, sin timeline: no hay fases, es un único
   encuentro de una hora.
   ------------------------------------------------------------------- */
const dinamica = {
  n: "03",
  id: "dinamica",
  eyebrow: "03 · Dinámica",
  titulo: "Cómo se da la charla",
  intro: "Un único encuentro, a continuación de la recorrida que organiza la empresa:",
  detalles: [
    {
      icono: "play",
      titulo: "Formato",
      texto:
        "Charla teórico-práctica, con demostraciones en vivo compartiendo pantalla. No requiere materiales previos ni instalación de nada por parte de los asistentes.",
    },
    {
      icono: "calendario",
      titulo: "Fecha y lugar",
      texto:
        "Jueves 10 de septiembre de 2026, en la Sala Zoom del Parque Industrial de Sauce Viejo, o en el predio propio de la empresa, según lo que se confirme más cerca de la fecha.",
    },
    {
      icono: "clock",
      titulo: "Duración",
      texto: "Una hora, a continuación de la recorrida por planta, laboratorio y depósito.",
    },
    {
      icono: "intercambio",
      titulo: "Coordinación",
      texto:
        "Canal directo con el referente de la empresa para confirmar horario final, equipo disponible en la sede (pantalla y proyector) y cualquier ajuste de último momento.",
    },
  ],
} as const;

/* ---------------------------------------------------------------------
   04 · CONDICIONES ECONÓMICAS
   Un solo valor, igual que en la cotización de DER Electricidad.
   ------------------------------------------------------------------- */
const economicas = {
  n: "04",
  id: "condiciones-economicas",
  eyebrow: "04 · Condiciones económicas",
  titulo: "Condiciones económicas",
  conceptoTitulo: "Concepto",
  concepto:
    "Charla de una hora sobre Inteligencia Artificial aplicada al agro, con marco teórico y demostraciones prácticas en vivo, adaptada a la audiencia y a la realidad del campo.",
  incluye: [
    "Charla completa de una hora, marco teórico y práctica",
    "Adaptación de contenidos a la actividad agropecuaria",
    "Demostraciones en vivo, compartiendo pantalla",
  ],
  importeTitulo: "Honorarios",
  importe: "$ 500.000",
  monedaNota: "Pesos argentinos, pago único",
  pendiente: "A definir",
  detalles: [
    {
      icono: "documento",
      titulo: "Forma de pago",
      texto: "",
      items: ["50% a la confirmación de la fecha.", "50% el día de la charla."],
    },
    {
      icono: "location",
      titulo: "Viáticos",
      texto: "A definir, en caso de corresponder según la sede final del evento.",
      items: [],
    },
    {
      icono: "clock",
      titulo: "Validez",
      texto: "Esta propuesta mantiene su vigencia hasta la fecha del evento, el 10 de septiembre de 2026.",
      items: [],
    },
  ],
} as const;

/* =====================================================================
   DOCUMENTO
   ===================================================================== */
export const speedAgro = {
  seo: {
    title: "Cotización para SpeedAgro — Charla de Inteligencia Artificial aplicada al agro",
    description:
      "Alcance, dinámica y condiciones de una charla de una hora sobre Inteligencia Artificial aplicada al agro, para el grupo de productores agropecuarios del Uruguay que visita SpeedAgro.",
  },

  hero: {
    /* No hay logo del cliente cargado: con `src` vacío la portada no
       dibuja el bloque del membrete. Si la empresa lo aporta, sube a
       /public/images/speedagro/ y se completa acá. */
    logo: {
      src: "",
      alt: "SpeedAgro",
      ancho: 0,
      alto: 0,
    },
    titulo: "Charla sobre Inteligencia Artificial",
    tituloResalte: "aplicada al agro.",
    subtitulo:
      "Una hora de contenido teórico-práctico para el grupo de productores agropecuarios del Uruguay que visita la planta de la empresa, con demostraciones en vivo adaptadas a la realidad del campo. Este documento detalla el alcance, la dinámica y las condiciones del servicio.",
    enlaces: [
      { etiqueta: "Ir al contenido", id: "contenido" },
      { etiqueta: "Ir a las condiciones", id: "condiciones-economicas" },
    ],
    fichaTitulo: "Datos de la cotización",
    fichaFilas: [
      { etiqueta: "Cliente", valor: "SpeedAgro", icono: "people" },
      { etiqueta: "Presentada por", valor: "Pablo Brunet", icono: "estrella" },
      { etiqueta: "Fecha de emisión", valor: "3 de septiembre de 2026", icono: "documento" },
      { etiqueta: "Referencia", valor: "PB-2026-09-SPA", icono: "documento" },
      { etiqueta: "Audiencia", valor: "~50 productores agropecuarios del Uruguay", icono: "people" },
      { etiqueta: "Fecha del evento", valor: "10 de septiembre de 2026", icono: "calendario" },
      { etiqueta: "Duración", valor: "Una hora", icono: "clock" },
      { etiqueta: "Validez", valor: "Hasta el 10 de septiembre de 2026", icono: "shield" },
    ],
  },

  indiceTitulo: "Contenido",

  contexto,
  contenido,
  dinamica,
  economicas,

  /* Orden del documento y fuente del índice. Debe coincidir con el orden
     de los componentes en la página. */
  indice: [contexto, contenido, dinamica, economicas],

  /* ---- WhatsApp: mensaje propio de esta cotización ---- */
  whatsapp: {
    mensaje: "Hola Pablo, te escribo por la cotización para la charla de SpeedAgro. Quería consultarte por…",
    etiqueta: "Consultar por la cotización",
  },
} as const;

export type SpeedAgro = typeof speedAgro;
