/* =====================================================================
   SPEEDAGRO — contenido de /cotizacion-speedagro
   ---------------------------------------------------------------------
   Cotización para UN cliente concreto: una charla de una hora sobre
   Inteligencia Artificial aplicada al agro, para un grupo de productores
   agropecuarios del Uruguay que visita la empresa. Todo el texto vive
   acá; los componentes de /src/components/speedAgro sólo lo dibujan.

   ⚠️ ESTA COTIZACIÓN ES CORTA A PROPÓSITO, sobre el mismo patrón que
   /cotizacion-der-electricidad: cinco puntos, sin relato, frases cortas.
   No es un programa de varios encuentros como Santa María: es una charla
   única de una hora.

   ⚠️ QUÉ NO VA EN ESTE DOCUMENTO — decisión de Pablo, no es un olvido:

     · NO hay sección de contexto NI de audiencia. La primera versión
       abría con la agenda de la visita —el hotel, la recorrida por
       planta, el viaje a Corrientes, la charla de la edición anterior— y
       la segunda dejaba una sección sólo para la audiencia. Se sacaron
       las dos: el cliente conoce su propio evento, y a quién se le habla
       ya está dicho en la ficha de la portada, en una línea y sin número
       de asistentes. El documento arranca directo en el contenido.
     · NO se listan temas de interés tentativos ni las prácticas puntuales
       que se muestran en vivo. El documento dice que son tres prácticas
       adaptadas a la realidad del campo, y eso es todo: cuáles, se define
       más cerca de la fecha.
     · NO hay número de referencia en la ficha: es una charla que se
       acuerda por WhatsApp, no un expediente.
     · NO hay viáticos: el evento es cerca y no se contemplan.
     · NO hay validez de la propuesta: la charla es la semana que viene,
       así que una vigencia de treinta días no significaría nada.

   ⚠️ ORIGEN. Surge de la llamada del 3/9/2026 con Emanuel Cimolini
   (SpeedAgro). Lo que define el contenido:

     · Pedido explícito de un formato práctico y de una hora, no más.
     · Pablo propuso demostraciones en vivo —comparte pantalla y resuelve
       tareas reales sobre la marcha— con un mínimo de marco teórico para
       que se entienda el por qué de la práctica, y no sólo la
       herramienta.
     · El bloque de datos —gobernanza y estructuración de la información
       propia de la explotación— es parte del contenido desde el arranque:
       sin datos cuidados, el resto no rinde.

   ⚠️ QUÉ SE COTIZA:
     · Honorarios — $ 500.000, por la charla completa de una hora.
     · Moneda en pesos argentinos.
     · FORMA DE PAGO — 100 % hasta 48 horas antes de la charla. Definida
       por Pablo; no es el 50/50 de las demás cotizaciones del sitio.

   ⚠️ FECHA DEL EVENTO: jueves 10 de septiembre de 2026 ("el jueves de la
   semana que viene" respecto de la llamada del 3/9/2026, un jueves).
   Sede: Sala Zoom del Parque Industrial de Sauce Viejo, con alternativa
   en un predio propio de la empresa —la ex Fiat—, lindero al parque.
   Ambas opciones tienen pantalla y proyector.

   NOTA DE INDEXACIÓN: la página va con `noindex`. Es una cotización, no
   contenido del sitio: se comparte por enlace directo.
   ===================================================================== */

/* ---------------------------------------------------------------------
   01 · CONTENIDO DE LA CHARLA
   Abre el documento: la audiencia quedó en la ficha de la portada y no
   tiene sección propia. Tres bloques —el marco, la parte práctica y los
   datos—, y ninguno describe QUÉ prácticas puntuales se muestran en vivo.
   ------------------------------------------------------------------- */
const contenido = {
  n: "01",
  id: "contenido",
  eyebrow: "01 · Contenido",
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
   02 · OBJETIVO
   Va DESPUÉS del contenido y ANTES de la dinámica: primero qué se dice,
   después para qué, y recién ahí cómo se da. Son tres líneas de "qué se
   lleva el que escucha", más la frase que cierra la sección.

   Es la única sección oscura del documento: con la portada arriba y el
   contenido en fondo tenue, el objetivo es lo que conviene que salte al
   scrollear.
   ------------------------------------------------------------------- */
const objetivo = {
  n: "02",
  id: "objetivo",
  eyebrow: "02 · Objetivo",
  titulo: "Qué buscamos con la charla",
  intro: "Lo que los participantes se llevan del encuentro:",
  items: [
    "Entender, sin tecnicismos, qué puede y qué no puede hacer hoy la Inteligencia Artificial en la actividad agropecuaria.",
    "Salir con al menos una aplicación concreta identificada para la propia explotación, y saber por dónde empezar.",
    "Dimensionar el valor de los datos propios del establecimiento, y qué hace falta para poder aprovecharlos.",
  ],
  finalidadTitulo: "En una frase",
  finalidad:
    "En una hora nadie se vuelve experto en una herramienta. Lo que se busca es que cada productor salga con criterio propio para decidir por dónde empezar en su explotación.",
} as const;

/* ---------------------------------------------------------------------
   03 · DINÁMICA
   Cuatro tarjetas parejas, sin timeline: no hay fases, es un único
   encuentro de una hora. Sin bajada: el título alcanza y las cuatro
   tarjetas se explican solas.
   ------------------------------------------------------------------- */
const dinamica = {
  n: "03",
  id: "dinamica",
  eyebrow: "03 · Dinámica",
  titulo: "Cómo se da la charla",
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
      texto: "Una hora.",
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
   Un solo valor y una sola condición: la forma de pago. Sin viáticos y
   sin validez —ver la nota del encabezado—, así que la condición va como
   franja al pie del importe y no como grilla de tarjetas.
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
  pago: {
    icono: "documento",
    titulo: "Forma de pago",
    texto: "100 % del valor hasta 48 horas antes de la charla.",
  },
} as const;

/* =====================================================================
   DOCUMENTO
   ===================================================================== */
export const speedAgro = {
  seo: {
    title: "Cotización para SpeedAgro — Charla de Inteligencia Artificial aplicada al agro",
    description:
      "Alcance, objetivo, dinámica y condiciones de una charla de una hora sobre Inteligencia Artificial aplicada al agro, para productores agropecuarios del Uruguay.",
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
      "Una hora de contenido teórico-práctico para productores agropecuarios del Uruguay, con demostraciones en vivo adaptadas a la realidad del campo. Este documento detalla el contenido, el objetivo, la dinámica y las condiciones del servicio.",
    enlaces: [
      { etiqueta: "Ir al contenido", id: "contenido" },
      { etiqueta: "Ir a las condiciones", id: "condiciones-economicas" },
    ],
    /* La AUDIENCIA vive acá y en ningún otro lado: no tiene sección
       propia. Es la fila que dice a quién se le habla, en una línea y sin
       número de asistentes. */
    fichaTitulo: "Datos de la cotización",
    fichaFilas: [
      { etiqueta: "Cliente", valor: "SpeedAgro", icono: "people" },
      { etiqueta: "Presentada por", valor: "Pablo Brunet", icono: "estrella" },
      { etiqueta: "Fecha de emisión", valor: "3 de septiembre de 2026", icono: "documento" },
      { etiqueta: "Audiencia", valor: "Productores agropecuarios del Uruguay, de distintos grupos", icono: "people" },
      { etiqueta: "Fecha del evento", valor: "10 de septiembre de 2026", icono: "calendario" },
      { etiqueta: "Duración", valor: "Una hora", icono: "clock" },
      { etiqueta: "Modalidad", valor: "Presencial, con demostraciones en vivo", icono: "location" },
    ],
  },

  indiceTitulo: "Contenido",

  contenido,
  objetivo,
  dinamica,
  economicas,

  /* Orden del documento y fuente del índice. Debe coincidir con el orden
     de los componentes en la página. */
  indice: [contenido, objetivo, dinamica, economicas],

  /* ---- WhatsApp: mensaje propio de esta cotización ---- */
  whatsapp: {
    mensaje: "Hola Pablo, te escribo por la cotización para la charla de SpeedAgro. Quería consultarte por…",
    etiqueta: "Consultar por la cotización",
  },
} as const;

export type SpeedAgro = typeof speedAgro;
