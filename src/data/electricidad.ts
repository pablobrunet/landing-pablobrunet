/* =====================================================================
   DER ELECTRICIDAD — contenido de /cotizacion-der-electricidad
   ---------------------------------------------------------------------
   Cotización para UN cliente concreto: la puesta en marcha de un sistema
   de atención y seguimiento automático por WhatsApp sobre Chatwoot.
   Todo el texto vive acá; los componentes de /src/components/electricidad
   sólo lo dibujan.

   ⚠️ ESTA COTIZACIÓN ES CORTA A PROPÓSITO.
   No es el documento largo de Milman ni el de Royjo. El pedido fue
   explícito: lenguaje conciso, sin relato, que se entienda de una pasada
   qué se está proponiendo. De ahí las reglas de escritura:

   1 · FRASES CORTAS, UNA IDEA POR LÍNEA. Los bloques del alcance son
       listas, no párrafos. Si una línea necesita una subordinada, casi
       siempre se puede partir en dos.

   2 · SE DESCRIBE LO QUE SE HACE, NO LO QUE SE LOGRA. "Detecta
       conversaciones sin respuesta y envía un mensaje de reactivación",
       no "recupera clientes que se enfriaron". Sin promesas de resultado,
       sin adjetivos de venta, sin llamados a la acción.

   3 · SI ALGO NO ESTÁ DEFINIDO, SE DICE QUE NO ESTÁ DEFINIDO. El tiempo
       de espera del seguimiento está sin cerrar y figura como tal.

   Si más adelante hay que ampliar el documento, se agregan puntos a las
   listas antes que párrafos nuevos.

   ---------------------------------------------------------------------
   ⚠️ LO QUE HAY QUE REVISAR ANTES DE ENVIAR

   · MONEDA. `economicas.importe` está en USD 900. El valor que se pasó
     fue "900" a secas: se interpretó en dólares porque en pesos no
     tendría sentido para este trabajo. Si la moneda es otra, se corrige
     `importe` y `monedaNota` acá abajo y no hace falta tocar nada más.

   · FORMA DE PAGO y VALIDEZ son redacciones propuestas, no confirmadas.

   ---------------------------------------------------------------------
   ⚠️ EL DOCUMENTO CIERRA EN EL IMPORTE, SIN PRÓXIMOS PASOS NI FIRMA.
   Es una decisión, no un olvido: la cotización dice qué se hace, en qué
   plazo y cuánto sale, y la conversación sigue por donde ya venía. Las
   vías de contacto quedan en el botón flotante de WhatsApp y en el pie
   del sitio. Si alguna vez hace falta recuperar la sección, el patrón
   está en components/milman/MilmanCierre.astro.

   ---------------------------------------------------------------------
   ⚠️ EL ALCANCE ES LA PUESTA EN MARCHA, Y NADA MÁS
   No hay mantenimiento, ni soporte, ni ajustes posteriores. Eso está
   dicho dos veces —en la ficha de la portada y en el bloque de fuera de
   alcance— y no se ablanda: es lo que separa este trabajo de un abono
   mensual.

   ⚠️ CHATWOOT YA ESTÁ, EL RESTO NO
   La empresa ya tiene Chatwoot desplegado. El bot de derivación y el
   seguimiento automático se construyen desde cero. Esa distinción es lo
   primero que dice el documento y es lo que sostiene el precio.

   NOTA DE INDEXACIÓN: la página va con `noindex`. Es una cotización, no
   contenido del sitio: se comparte por enlace directo.
   ===================================================================== */

/* ---------------------------------------------------------------------
   01 · SITUACIÓN ACTUAL
   Tres líneas: lo que ya está y lo que no. Nada más.
   ------------------------------------------------------------------- */
const situacion = {
  n: "01",
  id: "situacion",
  eyebrow: "01 · Situación actual",
  titulo: "Situación actual",
  puntos: [
    {
      icono: "check",
      estado: "Ya está",
      hay: true,
      texto: "Chatwoot desplegado como plataforma de conversaciones.",
    },
    {
      icono: "flow",
      estado: "No existe",
      hay: false,
      texto:
        "Un bot que identifique y derive las consultas automáticamente. Se construye desde cero.",
    },
    {
      icono: "campana",
      estado: "No existe",
      hay: false,
      texto: "Un flujo de seguimiento automático de conversaciones pendientes.",
    },
  ],
} as const;

/* ---------------------------------------------------------------------
   02 · ALCANCE
   Los cuatro puntos del pedido, en el orden en que llegaron. Cada uno
   con su lista corta.

   El bloque de fuera de alcance va DENTRO de esta misma sección: es la
   contracara de la lista, y separarlo en una sección propia alargaría el
   documento sin agregar nada.
   ------------------------------------------------------------------- */
const alcance = {
  n: "02",
  id: "alcance",
  eyebrow: "02 · Alcance",
  titulo: "Qué se hace",
  intro: "Puesta en marcha inicial. Cuatro frentes de trabajo:",
  bloques: [
    {
      n: "1",
      icono: "flow",
      titulo: "Chatbot de derivación",
      pie: "Nuevo, sobre Chatwoot",
      items: [
        "Lo construimos desde cero, usando Chatwoot como base.",
        "Lee cada mensaje entrante y detecta qué necesita el cliente.",
        "Deriva al área correcta, siguiendo el protocolo de clasificación que la empresa ya tiene definido.",
        "Objetivo: que ninguna consulta quede sin leer ni mal derivada.",
      ],
    },
    {
      n: "2",
      icono: "campana",
      titulo: "Seguimiento automático de conversaciones pendientes",
      pie: "Chatwoot, con backend propio",
      items: [
        "Usa Chatwoot como herramienta principal.",
        "Desplegamos todo el backend necesario para que el seguimiento funcione: Chatwoot solo no lo hace.",
        "Detecta conversaciones sin respuesta y envía un mensaje personalizado de reactivación.",
        "El tiempo de espera antes de reactivar una conversación queda a definir.",
      ],
    },
    {
      n: "3",
      icono: "shield",
      titulo: "Revisión de infraestructura",
      pie: "Diagnóstico y configuración",
      items: [
        "Hoy el sistema corre en un modo no preparado para mucho volumen simultáneo.",
        "Hacemos un diagnóstico de la infraestructura actual.",
        "Configuramos el stack más confiable para sostener ese volumen.",
      ],
    },
    {
      n: "4",
      icono: "chip",
      titulo: "Configuración de Google Cloud",
      pie: "Modelos Gemini",
      items: [
        "Configuramos el proyecto en Google Cloud para conectar el sistema con los modelos Gemini.",
        "Son los modelos que procesan la detección de consultas y la redacción de los mensajes de seguimiento.",
        "Incluye la configuración de credenciales y accesos.",
      ],
    },
  ],
  fueraTitulo: "Fuera de alcance",
  fuera: [
    "Mantenimiento o soporte post-entrega.",
    "Ajustes posteriores a la puesta en marcha.",
  ],
} as const;

/* ---------------------------------------------------------------------
   03 · DINÁMICA DE TRABAJO
   Treinta días, cuatro fases. Los rangos de días son estimados y así
   están declarados: lo que está comprometido es el plazo total.

   ⚠️ LA FASE DE TESTEOS NO ES UNA FORMALIDAD. Es la que necesita al
   equipo interno de la empresa, y es la razón por la que el plazo son
   treinta días y no una semana. Si se recorta el documento, esta fase no
   es la que se recorta.

   ⚠️ EL PLAZO ARRANCA CON LA CONFIRMACIÓN Y LOS ACCESOS, no con la
   presentación de la cotización. Eso está dicho en `condiciones`, y es lo
   que evita discutirlo después.
   ------------------------------------------------------------------- */
const dinamica = {
  n: "03",
  id: "dinamica",
  eyebrow: "03 · Dinámica de trabajo",
  titulo: "Cómo se trabaja",
  intro: "Treinta días corridos, en cuatro fases:",
  fases: [
    {
      n: "1",
      dias: "Días 1 a 5",
      icono: "lupa",
      titulo: "Relevamiento",
      items: [
        "Revisamos el protocolo de clasificación y las áreas de derivación.",
        "Diagnóstico de la infraestructura actual.",
        "Definimos el tiempo de espera del seguimiento.",
      ],
    },
    {
      n: "2",
      dias: "Días 6 a 18",
      icono: "chip",
      titulo: "Armado",
      items: [
        "Construcción del chatbot de derivación.",
        "Despliegue del backend de seguimiento.",
        "Configuración del stack y del proyecto de Google Cloud.",
      ],
    },
    {
      n: "3",
      dias: "Días 19 a 27",
      icono: "intercambio",
      titulo: "Testeos e iteraciones",
      items: [
        "Pruebas con el equipo interno, sobre conversaciones reales.",
        "Ajustes de la derivación y de los mensajes de reactivación.",
        "Idas y vueltas hasta que el criterio quede afinado.",
      ],
    },
    {
      n: "4",
      dias: "Días 28 a 30",
      icono: "cohete",
      titulo: "Puesta en productivo",
      items: [
        "El sistema pasa a operar sobre el WhatsApp de la empresa.",
        "Entrega de accesos y de la configuración final.",
        "Con esto cierra el alcance de esta cotización.",
      ],
    },
  ],
  condicionesTitulo: "Sobre el plazo",
  condiciones: [
    "Los treinta días corren desde la confirmación y la entrega de los accesos.",
    "Las fases 1 y 3 requieren disponibilidad del equipo interno de la empresa.",
    "Los rangos de días son estimados; el plazo total es el comprometido.",
  ],
} as const;

/* ---------------------------------------------------------------------
   04 · CONDICIONES ECONÓMICAS
   Un solo valor. La banda oscura le da la jerarquía que en un documento
   de un único importe no puede dar la comparación entre tarjetas.

   ⚠️ Moneda interpretada: ver el encabezado del archivo.
   ------------------------------------------------------------------- */
const economicas = {
  n: "04",
  id: "condiciones-economicas",
  eyebrow: "04 · Condiciones económicas",
  titulo: "Condiciones económicas",
  conceptoTitulo: "Concepto",
  concepto:
    "Puesta en marcha completa de los cuatro puntos del alcance, en las cuatro fases descritas en el punto 3.",
  incluye: [
    "Chatbot de derivación sobre Chatwoot",
    "Seguimiento automático, con su backend",
    "Diagnóstico y configuración de infraestructura",
    "Proyecto de Google Cloud y modelos Gemini",
  ],
  importeTitulo: "Honorarios",
  importe: "USD 900",
  monedaNota: "Pago único por la puesta en marcha",
  pendiente: "A definir",
  detalles: [
    {
      icono: "documento",
      titulo: "Forma de pago",
      /* En dos renglones y con el porcentaje en número: son dos momentos
         de pago distintos y se consultan por separado. Escritos de
         corrido había que leer la frase entera para encontrar el
         segundo. */
      texto: "",
      items: ["50% a la confirmación.", "50% contra entrega."],
    },
    {
      icono: "clock",
      titulo: "Validez",
      texto: "Treinta días corridos desde la fecha de emisión.",
      items: [],
    },
  ],
} as const;

/* =====================================================================
   DOCUMENTO
   ===================================================================== */
export const electricidad = {
  seo: {
    title: "Cotización para DER Electricidad — Atención y seguimiento automático por WhatsApp",
    description:
      "Alcance y condiciones de la puesta en marcha de un chatbot de derivación y un seguimiento automático de conversaciones sobre Chatwoot, con modelos Gemini en Google Cloud.",
  },

  hero: {
    /* Logo del cliente, a modo de membrete. Todavía no lo tenemos: con
       `src` vacío la portada NO dibuja el bloque —no queda hueco ni
       imagen rota— y el título encabeza la columna. Cuando lo aporten,
       va a /public/images/der-electricidad/ y se completan las cuatro
       claves. */
    logo: {
      src: "",
      alt: "DER Electricidad",
      ancho: 1024,
      alto: 231,
    },
    titulo: "Atención y seguimiento automático",
    tituloResalte: "por WhatsApp.",
    subtitulo:
      "Un chatbot que lee cada mensaje entrante y lo deriva al área que corresponde, y un seguimiento que reactiva las conversaciones que quedaron sin respuesta. Sobre el Chatwoot que ya tienen.",
    enlaces: [
      { etiqueta: "Ir al alcance", id: "alcance" },
      { etiqueta: "Ir a las condiciones", id: "condiciones-economicas" },
    ],
    fichaTitulo: "Datos de la cotización",
    fichaFilas: [
      { etiqueta: "Cliente", valor: "DER Electricidad", icono: "people" },
      { etiqueta: "Presentada por", valor: "Pablo Brunet", icono: "estrella" },
      { etiqueta: "Fecha de emisión", valor: "22 de agosto de 2026", icono: "calendario" },
      { etiqueta: "Referencia", valor: "PB-2026-08-DER", icono: "documento" },
      { etiqueta: "Alcance", valor: "Puesta en marcha inicial", icono: "target" },
      { etiqueta: "Plazo", valor: "30 días corridos", icono: "calendario" },
      { etiqueta: "No incluye", valor: "Mantenimiento ni soporte posterior", icono: "shield" },
      { etiqueta: "Validez", valor: "30 días corridos desde la emisión", icono: "clock" },
    ],
  },

  indiceTitulo: "Contenido",

  situacion,
  alcance,
  dinamica,
  economicas,

  /* Orden del documento y fuente del índice. Debe coincidir con el orden
     de los componentes en la página. */
  indice: [situacion, alcance, dinamica, economicas],

  /* ---- WhatsApp: mensaje propio de esta cotización ---- */
  whatsapp: {
    mensaje:
      "Hola Pablo, te escribo por la cotización de atención y seguimiento por WhatsApp. Quería consultarte por…",
    etiqueta: "Consultar por la cotización",
  },
} as const;

export type Electricidad = typeof electricidad;
