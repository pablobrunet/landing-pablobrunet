/* =====================================================================
   BLOG / INSIGHTS — /blog y /blog/[slug]
   ---------------------------------------------------------------------
   El `cuerpo` de cada artículo es una lista de bloques que renderiza
   <Prose />. Tipos disponibles:

     parrafo   → texto; admite **negrita** y [enlaces](https://…)
     subtitulo → h2 dentro del artículo
     lista     → viñetas
     cita      → frase destacada
     dato      → cifra grande + explicación (para un número que pega fuerte)
     tabla     → columnas + filas + fuente
     grafico   → barras horizontales comparables (una sola unidad)
     apilado   → una barra 100% partida en tres (parte-sobre-el-todo)
     fuentes   → listado de links al pie del artículo

   Todas las cifras citadas acá salen de informes públicos y están
   enlazadas a su fuente. Si actualizás un número, actualizá también el
   bloque `fuentes`.
   ===================================================================== */

export interface Barra {
  label: string;
  valor: number; // define el largo de la barra
  texto?: string; // qué se imprime en la punta (por defecto, el valor)
  tono?: "neutro"; // gris pizarra en lugar del verde de marca
}

export type Bloque =
  | { tipo: "parrafo"; texto: string }
  | { tipo: "subtitulo"; texto: string }
  | { tipo: "lista"; items: string[] }
  | { tipo: "cita"; texto: string }
  | { tipo: "dato"; valor: string; texto: string }
  | { tipo: "tabla"; titulo?: string; columnas: string[]; filas: string[][]; fuente?: string }
  | {
      tipo: "grafico";
      titulo: string;
      bajada?: string;
      barras: Barra[];
      nota?: string;
      fuente?: string;
    }
  | {
      tipo: "apilado";
      titulo: string;
      bajada?: string;
      partes: { label: string; valor: number }[];
      nota?: string;
      fuente?: string;
    }
  | { tipo: "fuentes"; items: { label: string; url: string }[] };

export interface Post {
  slug: string;
  titulo: string;
  categoria: string;
  fecha: string; // formato ISO
  fechaLabel: string; // cómo se muestra
  lectura: string;
  resumen: string;
  img: string;
  imgLabel: string;
  cuerpo: Bloque[];
}

export const blogMeta = {
  eyebrow: "Blog · Insights",
  titulo: "Ideas sobre *IA aplicada*",
  subtitulo:
    "Datos, lecturas y aprendizajes sobre cómo la inteligencia artificial está cambiando el trabajo y los negocios.",
};

/* =====================================================================
   DESTACADOS — pool para el bloque "Más leídos" de /blog
   ---------------------------------------------------------------------
   Todavía no hay analítica real conectada, así que esta lista es una
   curaduría manual: los seis artículos con mejor combinación de
   potencial SEO (título con intención de búsqueda clara: "cómo
   implementar", "por dónde empezar", "ChatGPT", "ejemplos") y de interés
   general para el lector típico de una PyME (guías accionables, no
   ensayos de opinión). /blog/index.astro elige 4 al azar de esta lista
   en cada carga. Cuando haya datos reales de lectura, reemplazar por un
   ranking basado en analítica.
   ===================================================================== */
export const destacados: string[] = [
  "como-implementar-inteligencia-artificial-en-una-pyme",
  "por-donde-empezar-a-implementar-ia-en-una-empresa",
  "chatgpt-para-empresas-que-se-puede-y-que-no",
  "15-ejemplos-reales-de-ia-aplicada-a-pymes",
  "auditar-suscripciones-de-ia-pyme",
  "capacitacion-de-ia-no-alcanza",
];

/* ---------------------------------------------------------------------
   Texto plano de un artículo, para el buscador de /blog.
   Concatena todos los bloques del cuerpo y descarta las marcas de
   markdown (**negrita**, [links](url)) para que la búsqueda no tenga
   que lidiar con símbolos sueltos.
   --------------------------------------------------------------------- */
const textoDeBloque = (b: Bloque): string => {
  switch (b.tipo) {
    case "parrafo":
    case "subtitulo":
    case "cita":
      return b.texto;
    case "lista":
      return b.items.join(" ");
    case "dato":
      return `${b.valor} ${b.texto}`;
    case "tabla":
      return [b.titulo ?? "", ...b.columnas, ...b.filas.flat(), b.fuente ?? ""].join(" ");
    case "grafico":
      return [
        b.titulo,
        b.bajada ?? "",
        ...b.barras.map((x) => `${x.label} ${x.texto ?? ""}`),
        b.nota ?? "",
        b.fuente ?? "",
      ].join(" ");
    case "apilado":
      return [b.titulo, b.bajada ?? "", ...b.partes.map((x) => x.label), b.nota ?? "", b.fuente ?? ""].join(
        " "
      );
    case "fuentes":
      return b.items.map((x) => x.label).join(" ");
    default:
      return "";
  }
};

export const textoPlano = (post: Post): string =>
  `${post.resumen} ${post.cuerpo.map(textoDeBloque).join(" ")}`
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/[*_[\]()]/g, " ");

export const blog: Post[] = [
  /* =================================================================
     N01 — NOVEDADES DE IA PARA PYMES: AGOSTO Y SEPTIEMBRE DE 2026
     ================================================================= */
  {
    slug: "novedades-ia-pymes-agosto-septiembre-2026",
    titulo: "Novedades de IA para PyMEs: lo que pasó en agosto y septiembre de 2026",
    categoria: "Novedades",
    fecha: "2026-09-29",
    fechaLabel: "29 de septiembre de 2026",
    lectura: "8 min de lectura",
    resumen:
      "Modelos nuevos de OpenAI, Google y Anthropic, ChatGPT gratis sin límite de mensajes de texto, cambios en lo que cobra WhatsApp y dos novedades argentinas. Lo que pasó en dos meses, filtrado por una sola pregunta: qué cambia para tu empresa.",
    img: "/images/blog/novedades-ia-pymes-agosto-septiembre-2026.png",
    imgLabel: "/images/blog/novedades-ia-pymes-agosto-septiembre-2026.png",
    cuerpo: [
      {
        tipo: "parrafo",
        texto:
          "Agosto y septiembre fueron dos meses cargados. Salieron modelos nuevos de las tres empresas grandes, cambió lo que se puede hacer gratis con ChatGPT, WhatsApp ajustó lo que cobra a las empresas y en Argentina aparecieron dos novedades que tocan de cerca a las PyMEs. Si intentaste seguir todo, probablemente terminaste con la sensación de siempre: mucho ruido y poca claridad sobre qué hacer el lunes.",
      },
      {
        tipo: "parrafo",
        texto:
          "Este resumen deja afuera lo que sólo le importa a quien programa y se queda con lo que cambia algo concreto en una empresa chica o mediana. Cada novedad tiene su fecha, su fuente y un párrafo con lo que yo haría con ella.",
      },
      {
        tipo: "tabla",
        titulo: "Los dos meses en una tabla",
        columnas: ["Fecha", "Novedad"],
        filas: [
          ["1 de agosto", "WhatsApp empieza a cobrar las respuestas de su agente de IA para empresas"],
          ["6 de agosto", "ChatGPT anuncia mensajes de texto sin límite en el plan gratuito"],
          ["2 de septiembre", "Google lanza Gemini 3.8 Flash, también dentro de Google Sheets"],
          ["3 de septiembre", "OpenAI presenta GPT-6 Astra, que puede usar la computadora"],
          ["15 de septiembre", "Anthropic amplía Claude for Small Business a 43 flujos de trabajo"],
          ["22 de septiembre", "OpenAI lanza GPT-6 Sol y Luna; Anthropic lanza Claude Opus 5.5"],
          ["24 de septiembre", "MODO y Frávega: la primera compra real desde ChatGPT en Argentina"],
          ["25 de septiembre", "El Kit 4.0 suma un kit de IA comercial de hasta $15 millones"],
          ["28 de septiembre", "Anthropic lanza Claude Sonnet 5.5"],
          ["1 de octubre", "WhatsApp empieza a cobrar mensajes de servicio por encima de 1.000 al mes"],
        ],
      },
      {
        tipo: "subtitulo",
        texto: "ChatGPT gratis, sin límite de mensajes de texto",
      },
      {
        tipo: "parrafo",
        texto:
          "El 6 de agosto OpenAI anunció que el plan gratuito deja de tener tope de mensajes de texto, según [TechCrunch](https://techcrunch.com/2026/08/06/openai-brings-unlimited-chatgpt-text-chats-to-free-users/). Los planes Free y Go pasaron a usar GPT-5.6 Luna y sumaron un botón «Think» para pedirle más razonamiento en preguntas difíciles. Siguen existiendo límites aparte para archivos, imágenes, voz y generación de imágenes.",
      },
      {
        tipo: "parrafo",
        texto:
          "**Qué cambia para tu empresa.** La excusa de «se me terminaron los mensajes» desaparece para el uso básico de texto. Eso es bueno para que más gente del equipo pruebe, pero trae de vuelta una pregunta que muchas PyMEs no se hicieron: qué información de la empresa se puede pegar en una cuenta personal gratuita y cuál no. Si todavía no tienen ese criterio escrito, este es un buen momento. Y ojo: que el texto sea ilimitado no significa que convenga cargar planillas con datos de clientes en una cuenta gratis.",
      },
      {
        tipo: "subtitulo",
        texto: "OpenAI: GPT-6 Astra, y después Sol y Luna",
      },
      {
        tipo: "parrafo",
        texto:
          "El 3 de septiembre OpenAI presentó GPT-6 Astra, su modelo más potente, con una función de «uso de computadora»: navegar páginas, completar formularios y moverse por planillas como lo haría una persona, según [Fortune](https://fortune.com/2026/09/03/openai-debuts-gpt-6-astra-computer-use-greg-brockman-says-start-of-agi/). Primero llegó a clientes empresariales y después a los planes pagos.",
      },
      {
        tipo: "parrafo",
        texto:
          "El 22 de septiembre llegaron GPT-6 Sol y GPT-6 Luna, versiones más rápidas y baratas basadas en Astra. Según [TechCrunch](https://techcrunch.com/2026/09/22/openai-launches-gpt-6-sol-and-luna/), cuestan en la API la mitad que la generación anterior. Sol está pensado para tareas complejas; Luna, para trabajo repetitivo con un objetivo claro, como resumir documentos, extraer datos o responder preguntas rápidas. Están en ChatGPT Work y Codex para las cuentas pagas, y los usuarios Free y Go pueden probar Luna desde la aplicación de escritorio.",
      },
      {
        tipo: "parrafo",
        texto:
          "**Qué cambia para tu empresa.** Si nadie en tu empresa usa la API, el precio de la API no te cambia nada. Lo que sí importa es la dirección: el trabajo administrativo de volumen —extraer datos de facturas, ordenar consultas, resumir correos— es cada vez más barato de automatizar. Si tenés una tarea así identificada y la venías postergando por costo, vale la pena volver a pedir números.",
      },
      {
        tipo: "subtitulo",
        texto: "Google: Gemini 3.8 Flash, también en Sheets",
      },
      {
        tipo: "parrafo",
        texto:
          "El 2 de septiembre Google lanzó Gemini 3.8 Flash, tres semanas después de la versión anterior. Según [9to5Google](https://9to5google.com/2026/09/02/gemini-3-8-flash-launch/), está disponible en la app de Gemini para quienes pagan Google AI Pro o Ultra, en el Modo IA del buscador y dentro de Google Sheets. En la API mantiene un precio promocional hasta el 31 de diciembre.",
      },
      {
        tipo: "parrafo",
        texto:
          "**Qué cambia para tu empresa.** Lo relevante no es el número de versión sino dónde aparece. Muchas PyMEs viven en planillas de Google: que el modelo esté adentro de Sheets significa que se puede pedir un análisis o una fórmula sin salir del archivo. Si tu equipo ya trabaja en Google Workspace, conviene probarlo con una planilla real antes de pagar otra herramienta.",
      },
      {
        tipo: "subtitulo",
        texto: "Anthropic: Claude for Small Business y los modelos 5.5",
      },
      {
        tipo: "parrafo",
        texto:
          "El 15 de septiembre Anthropic [amplió Claude for Small Business](https://claude.com/blog/claude-for-small-business-launches-new-workflows-integrations-and-training-programs) a 43 flujos de trabajo y sumó 27 integraciones nuevas, entre ellas Shopify, Xero, Square, Stripe, Zoom y Zapier. Funciona dentro de Claude Cowork, la aplicación de escritorio, y todos los flujos arrancan en modo de aprobación: Claude prepara el trabajo y espera que el dueño lo confirme antes de enviar, publicar o pagar algo.",
      },
      {
        tipo: "parrafo",
        texto:
          "En modelos, el 22 de septiembre salió Claude Opus 5.5, que según [TechCrunch](https://techcrunch.com/2026/09/22/anthropic-releases-opus-5-5-with-lower-prices-and-fable-level-performance/) baja el precio respecto de Opus 5, y el 28 llegó Claude Sonnet 5.5, más rápido y con el mismo precio que Sonnet 5, según [9to5Mac](https://9to5mac.com/2026/09/28/anthropic-upgrades-claude-with-new-sonnet-5-5-model-details-here/).",
      },
      {
        tipo: "parrafo",
        texto:
          "**Qué cambia para tu empresa.** De todo el bimestre, el modo de aprobación me parece la decisión más sensata para una PyME. Automatizar la cobranza o el seguimiento de presupuestos da miedo justamente porque algo puede salir mal sin que nadie lo vea. Que la herramienta prepare y una persona apruebe es una buena manera de empezar. Eso sí: muchas de esas integraciones son con programas que en Argentina se usan poco. Antes de entusiasmarse, conviene revisar si conecta con lo que tu empresa usa de verdad.",
      },
      {
        tipo: "subtitulo",
        texto: "WhatsApp: lo que empieza a cobrarse",
      },
      {
        tipo: "parrafo",
        texto:
          "Este cambio afecta a las empresas que usan WhatsApp conectado a un sistema, un CRM o un bot —lo que técnicamente se llama WhatsApp Business Platform—, no a quien atiende desde la aplicación común de WhatsApp Business en el celular. Según la [documentación de Meta para desarrolladores](https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing/non-template-messages), desde el 1 de agosto se cobran las respuestas de Meta Business Agent, el agente de IA de Meta para atender clientes, a US$ 2 por millón de tokens, que Meta estima en unos 4 o 5 centavos de dólar por mensaje. Y desde el 1 de octubre se empiezan a cobrar los mensajes de servicio, las respuestas comunes dentro de las 24 horas de una consulta. Los primeros 1.000 por número y por mes siguen siendo gratis, según detalla [Techweez](https://techweez.com/2026/09/28/whatsapp-business-pricing-october-2026/).",
      },
      {
        tipo: "parrafo",
        texto:
          "**Qué cambia para tu empresa.** Si tenés un bot o un sistema conectado a WhatsApp, pedile hoy a tu proveedor dos cosas: cuántos mensajes de servicio manda tu número por mes y si la cuenta de WhatsApp tiene un medio de pago cargado, porque desde octubre esos mensajes se facturan. Si atendés desde el celular con la app, esto no te toca.",
      },
      {
        tipo: "subtitulo",
        texto: "En Argentina: comprar desde ChatGPT y plata para IA",
      },
      {
        tipo: "parrafo",
        texto:
          "El 24 de septiembre MODO, la billetera de los bancos, anunció una integración con ChatGPT para elegir, comprar y pagar sin salir de la conversación, con Frávega como primer comercio, según [Infobae](https://www.infobae.com/economia/2026/09/24/cambios-en-el-e-commerce-la-billetera-de-los-bancos-se-integra-con-chatgpt-para-elegir-comprar-y-pagar-un-producto-con-ia/). Es la primera vez que se puede hacer una compra real así en el país. Escribí más sobre qué implica para un comercio en [esta nota sobre comprar desde ChatGPT](/blog/comprar-desde-chatgpt-argentina-comercio).",
      },
      {
        tipo: "parrafo",
        texto:
          "Un día después, el 25, la [Disposición 106/2026](https://www.boletinoficial.gob.ar/detalleAviso/primera/347979/20260925) sumó al programa nacional Kit 4.0 un kit de inteligencia artificial comercial que cofinancia hasta el 50 % del proyecto, con un tope de $15 millones. Tiene requisitos y letra chica que conviene leer con calma; los desarmé en [este artículo sobre el Kit 4.0](/blog/kit-4-0-ia-como-acceder-hasta-15-millones-pyme).",
      },
      {
        tipo: "parrafo",
        texto:
          "**Qué cambia para tu empresa.** Si vendés online, lo de MODO es una señal de hacia dónde va la cosa más que algo para implementar mañana. Lo del Kit 4.0, en cambio, puede ser plata concreta si tu actividad califica y ya tenés claro qué querés resolver.",
      },
      {
        tipo: "subtitulo",
        texto: "Qué haría yo con todo esto",
      },
      {
        tipo: "parrafo",
        texto:
          "Nada de lo que salió en estos dos meses obliga a cambiar de herramienta. Lo que sí cambió es que hacer las cosas bien es cada vez más barato: más uso gratis, modelos más baratos y funciones que se meten en las planillas y programas que tu equipo ya abre todos los días. El cuello de botella en una PyME casi nunca es la herramienta. Es no tener claro por dónde arrancar, o que lo que aprendió una persona no llegue al resto del equipo.",
      },
      {
        tipo: "cita",
        texto:
          "Cada mes va a haber un modelo nuevo. La pregunta útil no es cuál salió, sino qué tarea de tu empresa sigue esperando que alguien la ordene.",
      },
      {
        tipo: "parrafo",
        texto:
          "Si querés una mano para bajar todo esto a tu empresa, en el [Programa INTEGRA](/programa-integra) trabajamos justo eso: elegir por dónde empezar y lograr que el uso se contagie al equipo, sin correr detrás de cada lanzamiento. El primer paso es una Consultoría Estratégica Gratuita.",
      },
      {
        tipo: "fuentes",
        items: [
          {
            label: "TechCrunch — ChatGPT brings unlimited text chats to free users (6 de agosto de 2026)",
            url: "https://techcrunch.com/2026/08/06/openai-brings-unlimited-chatgpt-text-chats-to-free-users/",
          },
          {
            label: "Fortune — OpenAI launches GPT-6 Astra (3 de septiembre de 2026)",
            url: "https://fortune.com/2026/09/03/openai-debuts-gpt-6-astra-computer-use-greg-brockman-says-start-of-agi/",
          },
          {
            label: "TechCrunch — OpenAI launches GPT-6 Sol and Luna (22 de septiembre de 2026)",
            url: "https://techcrunch.com/2026/09/22/openai-launches-gpt-6-sol-and-luna/",
          },
          {
            label: "9to5Google — Gemini 3.8 Flash rolling out (2 de septiembre de 2026)",
            url: "https://9to5google.com/2026/09/02/gemini-3-8-flash-launch/",
          },
          {
            label: "Claude — Claude for Small Business launches new workflows, integrations, and training programs",
            url: "https://claude.com/blog/claude-for-small-business-launches-new-workflows-integrations-and-training-programs",
          },
          {
            label: "TechCrunch — Anthropic releases Opus 5.5 (22 de septiembre de 2026)",
            url: "https://techcrunch.com/2026/09/22/anthropic-releases-opus-5-5-with-lower-prices-and-fable-level-performance/",
          },
          {
            label: "9to5Mac — Anthropic upgrades Claude with new Sonnet 5.5 model (28 de septiembre de 2026)",
            url: "https://9to5mac.com/2026/09/28/anthropic-upgrades-claude-with-new-sonnet-5-5-model-details-here/",
          },
          {
            label: "Meta for Developers — Upcoming pricing updates for Meta Business Agent, service and utility messages",
            url: "https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing/non-template-messages",
          },
          {
            label: "Techweez — WhatsApp Business to charge for service messages above 1,000 (28 de septiembre de 2026)",
            url: "https://techweez.com/2026/09/28/whatsapp-business-pricing-october-2026/",
          },
          {
            label: "Infobae — La billetera de los bancos se integra con ChatGPT (24 de septiembre de 2026)",
            url: "https://www.infobae.com/economia/2026/09/24/cambios-en-el-e-commerce-la-billetera-de-los-bancos-se-integra-con-chatgpt-para-elegir-comprar-y-pagar-un-producto-con-ia/",
          },
          {
            label: "Boletín Oficial — Disposición 106/2026 (25 de septiembre de 2026)",
            url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/347979/20260925",
          },
        ],
      },
    ],
  },

  /* =================================================================
     N02 — KIT 4.0: CÓMO ACCEDER A HASTA $15 MILLONES PARA IA EN TU PYME
     ================================================================= */
  {
    slug: "kit-4-0-ia-como-acceder-hasta-15-millones-pyme",
    titulo: "Kit 4.0: cómo acceder a hasta $15 millones para sumar IA en tu PyME",
    categoria: "Costos",
    fecha: "2026-09-26",
    fechaLabel: "26 de septiembre de 2026",
    lectura: "7 min de lectura",
    resumen:
      "El programa nacional Kit 4.0 sumó un kit de inteligencia artificial comercial que cofinancia hasta la mitad del proyecto, con un tope de $15 millones. Qué cubre, quién puede pedirlo, cómo es el trámite y la letra chica que conviene leer antes de llamar a un proveedor.",
    img: "/images/blog/kit-4-0-ia-como-acceder-hasta-15-millones-pyme.png",
    imgLabel: "/images/blog/kit-4-0-ia-como-acceder-hasta-15-millones-pyme.png",
    cuerpo: [
      {
        tipo: "parrafo",
        texto:
          "El jueves 25 de septiembre salió en el Boletín Oficial una disposición que en pocas horas se convirtió en titular: «hasta $15 millones para que las PyMEs sumen inteligencia artificial». Desde entonces me llegaron varios mensajes con la misma pregunta: ¿esto es para nosotros? La respuesta corta es «puede ser, pero leé la letra chica antes». La larga es este artículo.",
      },
      {
        tipo: "parrafo",
        texto:
          "Lo escribo con todo lo que pude verificar en la norma y en las páginas oficiales. Donde algo no está claro, lo digo. Es plata del Estado con reglas propias, y conviene entenderlas antes de pedir un presupuesto.",
      },
      {
        tipo: "subtitulo",
        texto: "Qué es el Kit 4.0",
      },
      {
        tipo: "parrafo",
        texto:
          "Es un programa nacional, no provincial. Lo creó la [Resolución 8/2026](https://www.argentina.gob.ar/normativa/nacional/norma-425190/texto) de la Secretaría de Industria, Comercio y de la Pequeña y Mediana Empresa, en abril de este año, y lo administra la Subsecretaría de Industria y Economía del Conocimiento. La idea es simple: la PyME elige un «kit» —un paquete estandarizado de servicios, software y a veces hardware—, lo contrata con un proveedor de la economía del conocimiento inscripto en el programa, y el Estado cofinancia una parte. Una empresa de Santa Fe accede exactamente igual que una de cualquier otra provincia.",
      },
      {
        tipo: "parrafo",
        texto:
          "El programa tiene un cupo total de $9.000 millones y se asigna por orden de llegada: cuando se agota, se cierra. Hasta ahora el catálogo estaba armado alrededor de la industria 4.0, según la [página oficial del programa](https://www.argentina.gob.ar/economia/industria-y-economia-del-conocimiento/kit-40).",
      },
      {
        tipo: "subtitulo",
        texto: "Qué cambió el 25 de septiembre",
      },
      {
        tipo: "parrafo",
        texto:
          "La [Disposición 106/2026](https://www.boletinoficial.gob.ar/detalleAviso/primera/347979/20260925), firmada el 23 y publicada el 25 de septiembre, sumó cuatro kits nuevos al catálogo. Rige para las solicitudes que se presenten desde esa fecha.",
      },
      {
        tipo: "tabla",
        titulo: "Los cuatro kits que se sumaron",
        columnas: ["Kit", "Para qué es"],
        filas: [
          ["COM-01 · Canales y comercio digital", "Tienda online y canales de venta digitales"],
          ["COM-02 · CRM, automatización y experiencia de cliente", "Ordenar consultas, clientes y seguimiento comercial"],
          ["COM-03 · Analítica e inteligencia artificial comercial", "Aplicar IA a tareas concretas de ventas y análisis comercial"],
          ["CAL-01 · Sistema de gestión", "Consultoría para normas ISO 9001, 14001 o 45001"],
        ],
        fuente: "Disposición 106/2026, Subsecretaría de Industria y Economía del Conocimiento",
      },
      {
        tipo: "dato",
        valor: "$15 millones",
        texto:
          "es el tope de beneficio del kit de IA comercial (COM-03), y nunca puede superar el 50 % del monto neto elegible del proyecto.",
      },
      {
        tipo: "subtitulo",
        texto: "Qué cubre, en concreto, el kit de IA",
      },
      {
        tipo: "parrafo",
        texto:
          "La disposición dice que el COM-03 apunta a incorporar analítica e inteligencia artificial en tareas comerciales concretas, y da ejemplos: priorizar oportunidades de venta, predecir demanda, recomendar acciones, analizar conversaciones con clientes o implementar asistentes. Los resúmenes del anexo técnico que publicaron [Contadores en Red](https://contadoresenred.com/programa-kit-4-0-suma-comercio-digital-crm-ia-y-normas-iso-a-quienes-alcanza/) y [Novedades del Contador](https://blog.aconpy.com/2026/09/25/programa-kit-4-0-suma-comercio-digital-crm-ia-y-normas-iso-a-quienes-alcanza/) agregan que financia una o dos aplicaciones por proyecto.",
      },
      {
        tipo: "parrafo",
        texto:
          "Lo más interesante está en lo que exige. El proyecto tiene que contar con **datos identificados, criterios de validación, usuarios definidos y una solución efectivamente desplegada y operativa**. Dicho en criollo: no alcanza con probar algo. Tiene que quedar funcionando, con gente que lo use y una forma de saber si anda bien.",
      },
      {
        tipo: "lista",
        items: [
          "**No financia diagnósticos** como resultado final del proyecto.",
          "**No financia tableros descriptivos** como único entregable: un gráfico de ventas del mes pasado no es IA aplicada.",
          "**No financia prototipos que no queden en uso.**",
          "**Los servicios profesionales complementarios** (consultoría, horas de acompañamiento) no pueden pasar del 10 % del presupuesto del kit; lo que exceda se factura aparte y no entra en el beneficio.",
        ],
      },
      {
        tipo: "cita",
        texto:
          "El kit no paga por probar. Paga por dejar algo funcionando, con datos, con usuarios y con una forma de medir si sirve.",
      },
      {
        tipo: "subtitulo",
        texto: "Quién puede pedirlo",
      },
      {
        tipo: "parrafo",
        texto:
          "Según el reglamento del programa (Resolución 8/2026), la empresa que recibe el kit tiene que cumplir con todo esto:",
      },
      {
        tipo: "lista",
        items: [
          "**Certificado MiPyME vigente.**",
          "**Dos años o más de actividad.**",
          "**Sin deuda fiscal ni previsional exigible.**",
          "**Realizar alguna de las actividades de la nómina de actividades elegibles** (el Anexo IV del reglamento).",
          "**CUIT y clave fiscal activos en ARCA**, y estar adherido a Trámites a Distancia (TAD).",
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "El cuarto punto es el que más dudas me genera. El programa nació para la PyME industrial, y la disposición que sumó los kits comerciales amplió el catálogo, pero no encontré en el texto publicado ningún cambio sobre qué actividades pueden pedirlo. Si tenés un comercio o una empresa de servicios, lo primero es que tu contador confirme si tu actividad figura en esa nómina. Antes de eso, no vale la pena pedir presupuestos.",
      },
      {
        tipo: "parrafo",
        texto:
          "Hay además un tope por empresa: sumando todos los kits que pida, el beneficio no puede superar los $45 millones.",
      },
      {
        tipo: "subtitulo",
        texto: "Cómo es el trámite, paso a paso",
      },
      {
        tipo: "lista",
        items: [
          "**Elegir el kit y el proveedor.** Tiene que estar inscripto en el listado del programa. El proveedor arma el presupuesto con el formato que pide el Estado.",
          "**Presentar la Solicitud de Elegibilidad (TSE)** por TAD, con tu CUIT y clave fiscal, adjuntando ese presupuesto.",
          "**Recibir el Ticket de Elegibilidad y Reserva (TER).** Si la solicitud se aprueba, el TER reserva el cupo y dice cuánto beneficio te corresponde como máximo.",
          "**Firmar el acta de inicio con el proveedor** dentro de los 60 días corridos desde que sale el TER.",
          "**Implementar.** El reglamento da hasta 300 días corridos más para ejecutar el kit.",
          "**Firmar el acta de recepción conforme** cuando la solución está entregada y funcionando.",
          "**Rendición.** El proveedor presenta la rendición de cuentas; recién cuando se aprueba, cobra el beneficio.",
        ],
      },
      {
        tipo: "subtitulo",
        texto: "La cuenta que conviene hacer antes",
      },
      {
        tipo: "parrafo",
        texto:
          "Acá está lo que los titulares no cuentan. La plata no entra a tu empresa. El beneficio se acredita en la cuenta tributaria de ARCA del proveedor, una vez aprobada la rendición, y funciona como una forma de cancelar parte de lo que te facturó. Tu empresa paga su parte —como mínimo la mitad del monto neto— más el IVA y cualquier otro concepto que no entre en el kit.",
      },
      {
        tipo: "tabla",
        titulo: "Cómo se reparte según el tamaño del proyecto (montos netos, sin IVA)",
        columnas: ["Proyecto neto", "Beneficio máximo", "Pone tu empresa"],
        filas: [
          ["$10 millones", "$5 millones", "$5 millones + IVA"],
          ["$20 millones", "$10 millones", "$10 millones + IVA"],
          ["$30 millones", "$15 millones", "$15 millones + IVA"],
          ["$40 millones", "$15 millones (tope)", "$25 millones + IVA"],
        ],
        fuente: "Elaboración propia con el 50 % y el tope de $15 millones de la Disposición 106/2026",
      },
      {
        tipo: "parrafo",
        texto:
          "O sea: para llegar a los $15 millones del titular, el proyecto tiene que costar al menos $30 millones netos. Y hay que tener espalda para pagar tu mitad mientras dura la implementación. Eso no lo hace un mal programa; lo hace un programa para empresas que ya saben qué quieren resolver.",
      },
      {
        tipo: "subtitulo",
        texto: "Lo que yo miraría antes de llamar a un proveedor",
      },
      {
        tipo: "parrafo",
        texto:
          "Lo que me parece más valioso del COM-03 es que pide por escrito lo que a la mayoría de las PyMEs les falta cuando arrancan con IA: una tarea elegida, datos ordenados, gente que lo va a usar y una forma de medir. Es justo lo contrario de las pruebas sueltas que veo en tantas empresas, donde alguien arma algo con entusiasmo, funciona un par de semanas y queda en la nada.",
      },
      {
        tipo: "lista",
        items: [
          "**Qué tarea comercial querés mejorar.** Una, con nombre y apellido: responder consultas, priorizar presupuestos pendientes, anticipar qué se va a vender el mes que viene.",
          "**Dónde están los datos que esa tarea necesita.** Si están en un sistema, bien. Si están en tres planillas y en la cabeza del vendedor más viejo, el primer trabajo es otro.",
          "**Quién lo va a usar todos los días.** Si nadie del equipo se compromete a usarlo, el requisito de «usuarios definidos» se cae solo.",
          "**Cómo vas a saber si funciona.** Un número de hoy contra el que comparar dentro de tres meses.",
          "**Si tu actividad entra en la nómina.** Antes que nada de lo anterior, con tu contador.",
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "Si esas cinco preguntas tienen respuesta, el kit puede ser una muy buena forma de financiar la mitad de algo que igual ibas a hacer. Si no la tienen, el riesgo es contratar un proyecto de $30 millones para descubrir a mitad de camino que no había datos o que nadie lo iba a usar. El programa también ofrece un autodiagnóstico en su [página oficial](https://www.argentina.gob.ar/economia/industria-y-economia-del-conocimiento/kit-40), que vale la pena completar antes de pedir presupuestos.",
      },
      {
        tipo: "parrafo",
        texto:
          "Ordenar esas respuestas es justamente la primera parte del trabajo que hacemos en el [Programa INTEGRA](/programa-integra): elegir la tarea, revisar los datos y definir quién la sostiene, antes de gastar un peso en herramientas. Si querés hacer ese ejercicio con alguien de afuera, el primer paso es una Consultoría Estratégica Gratuita.",
      },
      {
        tipo: "fuentes",
        items: [
          {
            label: "Boletín Oficial — Disposición 106/2026, Subsecretaría de Industria y Economía del Conocimiento (25 de septiembre de 2026)",
            url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/347979/20260925",
          },
          {
            label: "Resolución 8/2026 — reglamento del Programa Kit 4.0 (texto original)",
            url: "https://www.argentina.gob.ar/normativa/nacional/norma-425190/texto",
          },
          {
            label: "Argentina.gob.ar — Kit 4.0",
            url: "https://www.argentina.gob.ar/economia/industria-y-economia-del-conocimiento/kit-40",
          },
          {
            label: "Argentina.gob.ar — Acceder al Kit 4.0",
            url: "https://www.argentina.gob.ar/servicio/acceder-al-kit-40",
          },
          {
            label: "Contadores en Red — Programa Kit 4.0 suma comercio digital, CRM, IA y normas ISO",
            url: "https://contadoresenred.com/programa-kit-4-0-suma-comercio-digital-crm-ia-y-normas-iso-a-quienes-alcanza/",
          },
          {
            label: "Novedades del Contador — Programa Kit 4.0 suma comercio digital, CRM, IA y normas ISO",
            url: "https://blog.aconpy.com/2026/09/25/programa-kit-4-0-suma-comercio-digital-crm-ia-y-normas-iso-a-quienes-alcanza/",
          },
        ],
      },
    ],
  },

  /* =================================================================
     N03 — CHATGPT, GEMINI O CLAUDE: CUÁL CONVIENE (SEPTIEMBRE 2026)
     ================================================================= */
  {
    slug: "chatgpt-gemini-claude-cual-conviene-empresa-septiembre",
    titulo: "ChatGPT, Gemini o Claude: cuál conviene para tu empresa en septiembre de 2026",
    categoria: "Herramientas",
    fecha: "2026-09-23",
    fechaLabel: "23 de septiembre de 2026",
    lectura: "7 min de lectura",
    resumen:
      "Los tres cuestan parecido y hacen casi lo mismo en las tareas de todos los días. Lo que define cuál conviene es otra cosa: dónde vive hoy el correo y los documentos de tu empresa. Precios, privacidad y una recomendación según el tipo de empresa.",
    img: "/images/blog/chatgpt-gemini-claude-cual-conviene-empresa-septiembre.png",
    imgLabel: "/images/blog/chatgpt-gemini-claude-cual-conviene-empresa-septiembre.png",
    cuerpo: [
      {
        tipo: "parrafo",
        texto:
          "«¿Cuál nos conviene, ChatGPT, Gemini o Claude?» es de las preguntas que más me hacen dueños y gerentes. Casi siempre viene después de que alguien del equipo empezó a usar uno por su cuenta, otro probó un segundo con la cuenta personal y nadie sabe bien qué se está pagando ni con qué datos.",
      },
      {
        tipo: "parrafo",
        texto:
          "La respuesta corta es que, para las tareas típicas de una PyME —redactar, resumir, ordenar información, armar un primer borrador—, los tres rinden bien. La diferencia entre ellos existe, pero es más chica de lo que parece en las comparaciones de internet, y cambia cada pocos meses con cada versión nueva. Lo que no cambia tan rápido, y pesa mucho más en la decisión, es dónde trabaja tu gente todos los días.",
      },
      {
        tipo: "subtitulo",
        texto: "Antes de comparar: lo que no conviene es seguir con cuentas personales",
      },
      {
        tipo: "parrafo",
        texto:
          "El escenario más común que encuentro no es una empresa que eligió mal, sino una que no eligió: tres o cuatro personas con cuentas gratuitas o individuales, cada una con su herramienta, pagadas con la tarjeta que había a mano. Así es difícil que el uso se contagie al resto, porque no hay un espacio común donde compartir lo que funciona, y la información de la empresa queda repartida en cuentas que no son de la empresa. Si ya estás en ese punto, antes de sumar nada vale la pena hacer el [inventario de lo que se paga hoy](/blog/auditar-suscripciones-de-ia-pyme).",
      },
      {
        tipo: "parrafo",
        texto:
          "Los tres proveedores tienen planes pensados para equipos, y en los tres la condición de privacidad es la misma en lo esencial: los datos de la empresa no se usan para entrenar los modelos, salvo que la empresa lo autorice. OpenAI lo dice para ChatGPT Business en su [página de privacidad para empresas](https://openai.com/enterprise-privacy/); Anthropic lo aclara en la [página de precios de Claude](https://claude.com/pricing) para los planes Team y Enterprise; y Google lo explica en su [centro de privacidad de Gemini para Workspace](https://knowledge.workspace.google.com/admin/gemini/generative-ai-in-google-workspace-privacy-hub), donde agrega que las interacciones no salen de la organización sin permiso. Esa es la primera razón para pasar de cuentas sueltas a un plan de empresa, más allá de cuál elijas.",
      },
      {
        tipo: "subtitulo",
        texto: "Los planes para equipos, lado a lado",
      },
      {
        tipo: "tabla",
        titulo: "Planes para empresas a septiembre de 2026 (precios de lista en dólares, por persona)",
        columnas: ["", "ChatGPT Business", "Gemini en Google Workspace", "Claude Team"],
        filas: [
          [
            "Precio con pago anual",
            "USD 20 por mes",
            "Viene incluido en el plan de Workspace: Business Standard cuesta USD 14 por mes (USD 11,20 el primer año)",
            "USD 20 por mes (asiento estándar)",
          ],
          [
            "Precio mes a mes",
            "USD 25",
            "USD 14 en Business Standard",
            "USD 25",
          ],
          [
            "Asiento para uso intensivo",
            "Premium: USD 100 anual o USD 125 mes a mes",
            "Complemento aparte para más uso de IA",
            "Premium: USD 100 anual o USD 125 mes a mes",
          ],
          [
            "Correo y documentos",
            "Se conecta a Gmail, Google Drive, Outlook, SharePoint y Teams, entre otros",
            "Está adentro de Gmail, Docs, Hojas de cálculo y Meet",
            "Se conecta a Gmail, Drive y Calendar, y a Microsoft 365 (Outlook, OneDrive, SharePoint y Teams)",
          ],
          [
            "¿Entrena con los datos de la empresa?",
            "No, por defecto",
            "No, sin permiso del cliente",
            "No, por defecto",
          ],
        ],
        fuente:
          "Páginas oficiales de precios de Claude y Google Workspace; OpenAI bajó el precio de Business el 2 de abril de 2026. Consultado el 23 de septiembre de 2026",
      },
      {
        tipo: "parrafo",
        texto:
          "Dos aclaraciones sobre la tabla. La primera: en Google Workspace el plan más barato, Business Starter (USD 7 por persona), trae Gemini sólo en Gmail y un acceso básico a la aplicación de Gemini; para tenerlo en Docs, Hojas de cálculo y Meet hay que estar en Business Standard o superior, según la [página de precios de Workspace](https://workspace.google.com/pricing). La segunda: el recorte de precio de ChatGPT Business, que lo dejó en USD 20 anual y USD 25 mes a mes con un mínimo de dos personas, es de abril de este año; si ves comparaciones más viejas con USD 25 y 30, ya no corren.",
      },
      {
        tipo: "subtitulo",
        texto: "Cómo se paga desde Argentina",
      },
      {
        tipo: "parrafo",
        texto:
          "Los tres se pagan en dólares con tarjeta. Desde que dejó de existir el impuesto PAIS, a un consumo en dólares pagado en pesos se le suma la percepción del 30 % a cuenta de Ganancias; si el resumen se cancela con dólares propios de una caja de ahorro, esa percepción no se aplica, [según explica Perfil](https://www.perfil.com/noticias/economia/sin-impuesto-pais-como-cambia-el-costo-real-de-pagar-con-tarjeta-en-el-exterior-en-2026.phtml). Aparte está el IVA del 21 % sobre servicios digitales del exterior: si la empresa es responsable inscripta, la tarjeta no se lo percibe y se liquida por otra vía, [según ARCA](https://www.afip.gob.ar/iva/servicios-digitales/reg-percepcion-4240.asp). Como el costo final depende de cómo esté armada tu empresa, es una conversación de diez minutos con el contador antes de contratar.",
      },
      {
        tipo: "subtitulo",
        texto: "En qué rinde mejor cada uno",
      },
      {
        tipo: "parrafo",
        texto:
          "Lo que sigue es mi criterio después de usarlos con equipos de trabajo, no un ranking técnico. Los tres mejoran cada pocos meses y en tareas comunes la diferencia es chica. Aun así, hay perfiles que se repiten:",
      },
      {
        tipo: "tabla",
        columnas: ["Tarea", "Dónde suele rendir mejor", "Por qué"],
        filas: [
          [
            "Contestar y ordenar mails, resumir hilos largos",
            "Gemini, si la empresa usa Gmail",
            "Trabaja adentro del correo, sin copiar y pegar nada",
          ],
          [
            "Resumir reuniones",
            "Gemini, si las reuniones son por Meet",
            "Está integrado a la videollamada",
          ],
          [
            "Propuestas comerciales, informes, textos largos con tono cuidado",
            "Claude",
            "Escribe con un tono más natural y sostiene mejor documentos extensos",
          ],
          [
            "Uso variado: imágenes, voz, búsquedas, preguntas sueltas del día a día",
            "ChatGPT",
            "Es el más completo como herramienta general y el que la mayoría ya conoce",
          ],
          [
            "Analizar una planilla o un archivo con números",
            "ChatGPT o Claude",
            "Los dos ejecutan cálculos sobre el archivo en lugar de estimar a ojo; igual hay que revisar el resultado",
          ],
        ],
      },
      {
        tipo: "subtitulo",
        texto: "Lo que más pesa: dónde vive el trabajo de tu empresa",
      },
      {
        tipo: "parrafo",
        texto:
          "Si la empresa ya paga Google Workspace Business Standard o superior, Gemini ya está pagado. Ahí la pregunta no es cuál comprar, sino si la gente lo está usando. Muchas veces no: está activado, pero nadie lo abrió porque nadie explicó para qué sirve en su tarea concreta.",
      },
      {
        tipo: "parrafo",
        texto:
          "Si la empresa trabaja con Microsoft 365, conviene saber que el chat de Copilot viene incluido sin costo adicional para los usuarios con una suscripción que califica, y que la versión que trabaja con los correos y archivos de la empresa, Microsoft 365 Copilot Business, cuesta [USD 21 por persona por mes con pago anual](https://justinmckelvey.com/blog/microsoft-365-copilot-pricing). No entra en esta comparación, pero es la alternativa natural en ese entorno. Claude, además, tiene un [conector con Microsoft 365](https://support.claude.com/en/articles/12542951-set-up-the-microsoft-365-connector) que busca en Outlook, OneDrive, SharePoint y Teams.",
      },
      {
        tipo: "cita",
        texto: "La mejor herramienta de IA para tu empresa suele ser la que tu gente puede abrir sin salir de donde ya trabaja.",
      },
      {
        tipo: "subtitulo",
        texto: "Qué haría según el tipo de empresa",
      },
      {
        tipo: "lista",
        items: [
          "**Ya usan Google Workspace (Standard o más).** Arrancá por Gemini, que ya está pagado. Elegí dos o tres tareas concretas —responder consultas frecuentes por mail, resumir reuniones, armar borradores de presupuestos— y hacé que se usen de verdad antes de sumar otra suscripción.",
          "**Ya usan Microsoft 365.** Probá primero el chat de Copilot incluido. Si queda corto, compará Copilot Business contra ChatGPT Business o Claude Team para las personas que lo van a usar todos los días.",
          "**No tienen una suite o el correo está en otro lado.** ChatGPT Business es la opción más pareja para uso general. Si el trabajo pesado es escribir —propuestas, informes, respuestas largas a clientes—, Claude Team.",
          "**Pocas personas usan IA a diario y el resto casi nada.** No hace falta un asiento para todos. Empezá con las personas que ya lo usan, en un plan de empresa, y sumá a otros a medida que aparezcan tareas concretas.",
          "**Tienen dos herramientas pagas a la vez.** Casi siempre sobra una. Quedate con la que se usa más y con la que está conectada al correo y los documentos.",
        ],
      },
      {
        tipo: "subtitulo",
        texto: "La elección de herramienta no resuelve lo difícil",
      },
      {
        tipo: "parrafo",
        texto:
          "Elegir cualquiera de las tres, con un plan de empresa, ya es un paso bien dado. Pero lo que veo una y otra vez es que el problema no estaba en la herramienta: estaba en que una persona sabe usarla y el resto no se entera de qué hace ni cómo. Cambiar de ChatGPT a Claude, o de Claude a Gemini, no arregla eso. Lo arregla [acordar un criterio común](/blog/criterio-comun-de-ia-en-la-empresa): para qué tareas se usa, con qué datos sí y con cuáles no, y quién se ocupa de que lo que funciona le llegue al resto del equipo.",
      },
      {
        tipo: "parrafo",
        texto:
          "Eso es lo que trabajamos en el [Programa INTEGRA](/programa-integra): no te vendemos una herramienta, te ayudamos a decidir cuál conviene para tus tareas reales y a que la use el equipo, no sólo una persona. Si todavía no sabés por dónde arrancar, el primer paso es una Consultoría Estratégica Gratuita.",
      },
      {
        tipo: "fuentes",
        items: [
          {
            label: "OpenAI — Enterprise privacy (ChatGPT Business, Enterprise y API)",
            url: "https://openai.com/enterprise-privacy/",
          },
          {
            label: "OpenAI — Precios de ChatGPT para empresas",
            url: "https://openai.com/business/chatgpt-pricing/",
          },
          {
            label: "Sayfe AI — ChatGPT Business Pricing in 2026 (recorte del 2 de abril de 2026)",
            url: "https://www.sayfeai.com/blog/chatgpt-business-pricing-2026",
          },
          {
            label: "Anthropic — Precios de Claude (Pro, Max, Team y Enterprise)",
            url: "https://claude.com/pricing",
          },
          {
            label: "Anthropic — Configurar el conector de Microsoft 365",
            url: "https://support.claude.com/en/articles/12542951-set-up-the-microsoft-365-connector",
          },
          {
            label: "Google Workspace — Planes y precios",
            url: "https://workspace.google.com/pricing",
          },
          {
            label: "Google Workspace — Centro de privacidad de la IA generativa",
            url: "https://knowledge.workspace.google.com/admin/gemini/generative-ai-in-google-workspace-privacy-hub",
          },
          {
            label: "Justin McKelvey — Microsoft 365 Copilot Pricing 2026",
            url: "https://justinmckelvey.com/blog/microsoft-365-copilot-pricing",
          },
          {
            label: "Perfil — Sin impuesto PAIS, cómo cambia el costo de pagar con tarjeta en el exterior (enero de 2026)",
            url: "https://www.perfil.com/noticias/economia/sin-impuesto-pais-como-cambia-el-costo-real-de-pagar-con-tarjeta-en-el-exterior-en-2026.phtml",
          },
          {
            label: "ARCA — Servicios digitales: régimen de percepción de IVA",
            url: "https://www.afip.gob.ar/iva/servicios-digitales/reg-percepcion-4240.asp",
          },
        ],
      },
    ],
  },

  /* =================================================================
     N04 — CUÁNTO SALE UN BOT DE WHATSAPP CON IA (SEPTIEMBRE 2026)
     ================================================================= */
  {
    slug: "bot-whatsapp-ia-negocio-septiembre-cuanto-sale",
    titulo: "Cuánto sale un bot de WhatsApp con IA para tu negocio (septiembre de 2026)",
    categoria: "Costos",
    fecha: "2026-09-20",
    fechaLabel: "20 de septiembre de 2026",
    lectura: "8 min de lectura",
    resumen:
      "El precio de un bot de WhatsApp con IA no es un número: son cuatro costos que se suman, y desde el 1 de octubre uno de ellos cambia. Qué cobra Meta en Argentina, cuánto pesa el modelo de IA, qué cuestan las plataformas y para qué tareas conviene de verdad.",
    img: "/images/blog/bot-whatsapp-ia-negocio-septiembre-cuanto-sale.png",
    imgLabel: "/images/blog/bot-whatsapp-ia-negocio-septiembre-cuanto-sale.png",
    cuerpo: [
      {
        tipo: "parrafo",
        texto:
          "«¿Cuánto sale poner un bot en el WhatsApp?» Es de las primeras cosas que pregunta el dueño de un comercio, una clínica o una distribuidora cuando piensa en IA, y tiene lógica: WhatsApp es por donde entran las consultas, y contestar lo mismo cuarenta veces por día se come horas de alguien del equipo.",
      },
      {
        tipo: "parrafo",
        texto:
          "El problema es que la respuesta que suelen recibir es un número suelto —«tanto por mes»— que mezcla cosas muy distintas. Un bot de WhatsApp con IA tiene cuatro costos que conviene mirar por separado: lo que cobra Meta por los mensajes, lo que cuesta el modelo de IA que redacta las respuestas, la plataforma donde se arma el bot y el trabajo de dejarlo funcionando. Y uno de esos cuatro cambia en menos de dos semanas.",
      },
      {
        tipo: "subtitulo",
        texto: "Primero: la app gratuita no alcanza",
      },
      {
        tipo: "parrafo",
        texto:
          "La aplicación WhatsApp Business que muchos negocios ya usan en el celular es gratuita y tiene respuestas rápidas y mensajes de ausencia, pero para que un bot responda solo, conectado a un modelo de IA y a tus sistemas, hace falta la plataforma de WhatsApp Business de Meta, la que se conoce como «la API». Esa es la que cobra por mensaje, directamente o a través de un proveedor. Los cambios de precio que siguen afectan a la API; la app gratuita [no se ve afectada](https://sendpulse.com/blog/whatsapp-service-message-pricing).",
      },
      {
        tipo: "subtitulo",
        texto: "Costo 1: lo que cobra Meta por cada mensaje",
      },
      {
        tipo: "parrafo",
        texto:
          "Desde julio de 2025, Meta cobra por mensaje entregado según su categoría. Las plantillas —mensajes que la empresa inicia, aprobados de antemano— se dividen en marketing, utilidad (confirmaciones, recordatorios, avisos de envío) y autenticación (códigos de verificación). Las respuestas a un cliente que te escribió primero, dentro de las 24 horas, son «mensajes de servicio».",
      },
      {
        tipo: "parrafo",
        texto:
          "Hasta el 30 de septiembre, los mensajes de servicio son gratis. **Desde el 1 de octubre de 2026 empiezan a cobrarse**: cada número de teléfono del negocio tiene 1.000 mensajes de servicio gratis por mes, que no se acumulan, y a partir de ahí se pagan a la misma tarifa que los de utilidad, según la [documentación de precios de Meta](https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing). También empiezan a cobrarse las plantillas de utilidad enviadas dentro de esa ventana de 24 horas, que hasta ahora eran gratis. Y un detalle operativo: si la cuenta no tiene un medio de pago cargado, Meta deja de entregar los mensajes de servicio cuando pasan a ser pagos.",
      },
      {
        tipo: "tabla",
        titulo: "Tarifas de Meta para Argentina, por mensaje entregado",
        columnas: ["Categoría", "En dólares", "En pesos", "Desde el 1 de octubre de 2026"],
        filas: [
          ["Marketing", "USD 0,0618", "$ 89,56", "Sin cambios"],
          ["Utilidad", "USD 0,026", "$ 37,68", "Se cobra también dentro de la ventana de 24 horas"],
          ["Autenticación", "USD 0,026", "$ 37,68", "Sin cambios"],
          [
            "Servicio (respuestas al cliente)",
            "Gratis hasta el 30 de septiembre",
            "Gratis hasta el 30 de septiembre",
            "1.000 gratis por mes por número; después USD 0,026 ($ 37,68)",
          ],
        ],
        fuente: "Meta, tarifas vigentes desde el 1 de julio de 2026 y desde el 1 de octubre de 2026",
      },
      {
        tipo: "parrafo",
        texto:
          "Sigue habiendo una excepción: cuando la conversación empieza desde un anuncio que lleva a WhatsApp o desde el botón de una página de Facebook, los mensajes son gratis durante 72 horas. Para un negocio que ya invierte en anuncios, eso cambia bastante la cuenta.",
      },
      {
        tipo: "parrafo",
        texto:
          "Un ejemplo para ponerle números. Un negocio que en un mes manda 3.000 respuestas de servicio (unas 600 conversaciones de cinco mensajes), 500 recordatorios de turno y una campaña de 1.000 mensajes de promoción pagaría a Meta, desde octubre: 2.000 respuestas por encima de las gratuitas a USD 0,026 (USD 52), 500 recordatorios a USD 0,026 (USD 13) y 1.000 mensajes de marketing a USD 0,0618 (USD 61,80). Total: unos **USD 127 por mes**. Si no manda la campaña, baja a USD 65. Si recibe pocas consultas, puede quedar en cero.",
      },
      {
        tipo: "dato",
        valor: "1.000",
        texto:
          "mensajes de servicio gratis por mes y por número de teléfono, desde el 1 de octubre de 2026. Un negocio chico puede no pasar nunca de ese cupo; uno con un bot que responde mucho, sí.",
      },
      {
        tipo: "parrafo",
        texto:
          "Ojo con un efecto que no es obvio: un bot que contesta en tres mensajes lo que una persona contestaba en uno cuesta el triple en Meta. Con el cambio de octubre, que las respuestas sean cortas y completas pasa a ser también una cuestión de plata.",
      },
      {
        tipo: "subtitulo",
        texto: "Costo 2: el modelo de IA que redacta las respuestas",
      },
      {
        tipo: "parrafo",
        texto:
          "Es la capa que más asusta y la que menos pesa. Anthropic publica en su [página de precios](https://platform.claude.com/docs/en/about-claude/pricing) un ejemplo de atención al cliente con su modelo más económico, Claude Haiku 4.5: diez mil conversaciones de unos 3.700 tokens cada una cuestan alrededor de USD 37. Es menos de medio centavo de dólar por conversación. Google tiene modelos todavía más baratos en su línea Flash-Lite, según su [lista de precios](https://ai.google.dev/gemini-api/docs/pricing).",
      },
      {
        tipo: "parrafo",
        texto:
          "Meta, además, ofrece su propio asistente dentro de la plataforma, Meta Business Agent, que se cobra por uso: la misma Meta estima [alrededor de 4 a 5 centavos de dólar por mensaje](https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing/non-template-messages). Es bastante más caro por mensaje que conectar un modelo por tu cuenta, a cambio de no tener que armar nada por fuera.",
      },
      {
        tipo: "subtitulo",
        texto: "Costo 3: la plataforma donde se arma el bot",
      },
      {
        tipo: "parrafo",
        texto:
          "La mayoría de los negocios no se conecta a la API de Meta directamente, sino a través de una plataforma que ya trae la bandeja de mensajes, el armado del bot, la derivación a una persona y los reportes. Cobran un abono mensual, y casi siempre **los mensajes de Meta van aparte**. Algunos ejemplos con precios publicados:",
      },
      {
        tipo: "tabla",
        titulo: "Plataformas con precio público (septiembre de 2026)",
        columnas: ["Plataforma", "Plan", "Precio por mes", "Qué tener en cuenta"],
        filas: [
          [
            "Cliengo",
            "Premium",
            "USD 119",
            "2.000 conversaciones; la API de WhatsApp tiene costo adicional",
          ],
          [
            "Cliengo",
            "Business",
            "USD 259",
            "4.000 conversaciones; incluye una línea de la API de WhatsApp",
          ],
          [
            "respond.io",
            "Starter",
            "USD 79",
            "Sin agentes de IA; hasta 5 usuarios",
          ],
          [
            "respond.io",
            "Growth",
            "USD 159",
            "Con agentes de IA incluidos; hasta 10 usuarios",
          ],
        ],
        fuente: "Páginas de precios de Cliengo y respond.io, consultadas en septiembre de 2026. En todos los casos, lo que cobra Meta por mensaje se paga aparte",
      },
      {
        tipo: "parrafo",
        texto:
          "Además del abono, algunos proveedores cobran un recargo sobre la tarifa de Meta. La guía de precios de Cliengo menciona que [suele estar entre el 10 % y el 30 %](https://guiawabusiness.cliengo.com/precios). Antes de firmar, pedí por escrito si el proveedor te traslada el costo de Meta tal cual o con recargo, y cuánto.",
      },
      {
        tipo: "subtitulo",
        texto: "Costo 4: dejarlo funcionando, que es donde se va el tiempo",
      },
      {
        tipo: "parrafo",
        texto:
          "Esta es la parte que casi nadie presupuesta y la que define si el bot sirve. Hay que juntar las respuestas correctas —precios, horarios, condiciones, zonas de entrega—, decidir qué contesta el bot y qué pasa a una persona, probarlo con consultas reales y, sobre todo, decidir quién lo mantiene actualizado. Un bot que responde con la lista de precios del mes pasado hace más daño que no tener bot.",
      },
      {
        tipo: "tabla",
        titulo: "Plataforma armada o desarrollo a medida",
        columnas: ["", "Plataforma armada", "Desarrollo a medida"],
        filas: [
          [
            "Costo inicial",
            "Bajo: configuración y carga de información, que podés hacer vos o con ayuda",
            "Más alto: se presupuesta por horas y depende de con qué sistemas se conecta",
          ],
          [
            "Costo mensual",
            "Abono de la plataforma más Meta",
            "Meta, modelo de IA y servidor; sin abono de plataforma",
          ],
          [
            "Cuándo conviene",
            "Preguntas frecuentes, turnos, derivar consultas: lo que resuelve la mayoría de los negocios",
            "Cuando el bot tiene que consultar o cargar datos en tus sistemas (stock, pedidos, facturación) de una forma que la plataforma no permite",
          ],
          [
            "Riesgo principal",
            "Quedar atado a un proveedor y a su recargo",
            "Depender de quien lo desarrolló para cada cambio",
          ],
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "Mi recomendación para la mayoría de las PyMEs es empezar con una plataforma armada. Si en unos meses aparece una necesidad concreta que no cubre, recién ahí tiene sentido pensar en un desarrollo propio, y para entonces ya vas a saber qué preguntas entran, cuántas y cuáles se resuelven solas.",
      },
      {
        tipo: "subtitulo",
        texto: "Para qué tareas conviene y para cuáles no",
      },
      {
        tipo: "lista",
        items: [
          "**Conviene para preguntas que se repiten y tienen una respuesta clara:** horarios, ubicación, medios de pago, precios de lista, requisitos para un trámite.",
          "**Conviene para dar y confirmar turnos o reservas**, sobre todo si se conecta con la agenda real.",
          "**Conviene para ordenar la consulta antes de pasarla a una persona:** preguntar qué necesita, de dónde es, qué producto busca, y que el vendedor reciba la consulta ya armada.",
          "**Conviene para avisos de estado:** pedido confirmado, en camino, listo para retirar. Son plantillas de utilidad, de las más baratas.",
          "**No conviene para reclamos ni para clientes enojados.** Ahí la respuesta automática empeora las cosas; el bot tiene que derivar rápido.",
          "**No conviene para negociar precios o condiciones especiales**, ni para nada que comprometa a la empresa sin que una persona lo apruebe.",
          "**No conviene si la información cambia seguido y nadie la actualiza.** Primero se resuelve quién mantiene las respuestas; después se arma el bot.",
          "**No se puede usar como asistente general.** Desde el 15 de enero de 2026, las condiciones de Meta [prohíben los chatbots de propósito general](https://techcrunch.com/2025/10/18/whatssapp-changes-its-terms-to-bar-general-purpose-chatbots-from-its-platform/) en la API. Un bot que atiende a los clientes de tu negocio está permitido; uno que responde cualquier cosa sobre cualquier tema, no.",
        ],
      },
      {
        tipo: "cita",
        texto: "Un bot de WhatsApp no ordena la atención de un negocio. La automatiza. Si antes estaba desordenada, automatiza el desorden.",
      },
      {
        tipo: "subtitulo",
        texto: "Un rango honesto",
      },
      {
        tipo: "parrafo",
        texto:
          "Con los números de arriba, un negocio chico que recibe pocas consultas y usa una plataforma armada puede quedar en el abono de la plataforma más unos pocos dólares de IA, con Meta en cero o cerca. Un negocio con volumen, que además manda campañas y recordatorios, va a sumar entre decenas y algunos cientos de dólares por mes en Meta, según cuántos mensajes mande y cuántas respuestas pasen el cupo gratuito. En casi todos los casos que veo, el modelo de IA es lo más barato de la cuenta y el tiempo de armado y mantenimiento es lo más caro.",
      },
      {
        tipo: "parrafo",
        texto:
          "Antes de pedir presupuestos, vale la pena hacer un ejercicio simple: contar durante dos semanas cuántas consultas entran por WhatsApp, cuáles son y cuántas se contestan siempre igual. Ese número te dice si el bot tiene sentido y te permite comparar presupuestos con algo concreto en la mano. En el [Programa INTEGRA](/programa-integra) arrancamos justamente por ahí: mirar qué tareas se repiten en tu empresa y cuál conviene resolver primero, antes de contratar cualquier herramienta.",
      },
      {
        tipo: "fuentes",
        items: [
          {
            label: "Meta — Precios en la plataforma de WhatsApp Business (tarifas y cambios del 1 de octubre de 2026)",
            url: "https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing",
          },
          {
            label: "Meta — Próximas actualizaciones de precios de Meta Business Agent, servicio y utilidad",
            url: "https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing/non-template-messages",
          },
          {
            label: "SendPulse — WhatsApp Service Message Pricing Changes in October 2026",
            url: "https://sendpulse.com/blog/whatsapp-service-message-pricing",
          },
          {
            label: "Anthropic — Precios de la API de Claude",
            url: "https://platform.claude.com/docs/en/about-claude/pricing",
          },
          {
            label: "Google — Precios de la API de Gemini",
            url: "https://ai.google.dev/gemini-api/docs/pricing",
          },
          {
            label: "Cliengo — Precios",
            url: "https://www.cliengo.com/pricing",
          },
          {
            label: "Cliengo — Guía de precios de la API de WhatsApp Business 2026",
            url: "https://guiawabusiness.cliengo.com/precios",
          },
          {
            label: "respond.io — Precios",
            url: "https://respond.io/pricing",
          },
          {
            label: "TechCrunch — WhatsApp changes its terms to bar general-purpose chatbots (octubre de 2025)",
            url: "https://techcrunch.com/2025/10/18/whatssapp-changes-its-terms-to-bar-general-purpose-chatbots-from-its-platform/",
          },
        ],
      },
    ],
  },

  /* =================================================================
     N05 — CUÁNTO CUESTA IMPLEMENTAR IA EN UNA PYME EN 2026
     ================================================================= */
  {
    slug: "cuanto-cuesta-implementar-ia-pyme-2026",
    titulo: "Cuánto cuesta implementar IA en una PyME en 2026",
    categoria: "Costos",
    fecha: "2026-09-17",
    fechaLabel: "17 de septiembre de 2026",
    lectura: "9 min de lectura",
    resumen:
      "La licencia es la parte más visible y la más barata. Las cuatro partidas reales de una implementación de IA, con los precios vigentes de los planes de equipo, de qué depende que el número suba o baje y cómo arrancar gastando poco.",
    img: "/images/blog/cuanto-cuesta-implementar-ia-pyme-2026.png",
    imgLabel: "/images/blog/cuanto-cuesta-implementar-ia-pyme-2026.png",
    cuerpo: [
      {
        tipo: "parrafo",
        texto:
          "«¿Cuánto sale esto?» es una de las primeras preguntas que me hacen, casi siempre antes de saber qué se quiere hacer. Es una pregunta razonable, pero la respuesta que la gente espera —un número, el precio de una licencia— es la parte más chica del costo real.",
      },
      {
        tipo: "parrafo",
        texto:
          "Implementar IA en una PyME tiene cuatro partidas. Una se ve en el resumen de la tarjeta. Las otras tres no, y son las que definen si la plata de la primera rinde o se pierde.",
      },
      {
        tipo: "subtitulo",
        texto: "Las cuatro partidas",
      },
      {
        tipo: "tabla",
        titulo: "De qué está hecho el costo",
        columnas: ["Partida", "Qué incluye", "De qué depende"],
        filas: [
          [
            "Licencias",
            "Los planes de equipo de ChatGPT, Claude, Copilot o Gemini",
            "Cuántas personas las necesitan de verdad y si ya pagás Google Workspace o Microsoft 365",
          ],
          [
            "Tiempo interno",
            "Las horas de quien sostiene el proceso, de quien hace la tarea y de dirección",
            "Cuántas tareas se encaran a la vez y si hay alguien con horas asignadas",
          ],
          [
            "Acompañamiento externo",
            "Capacitación, ordenamiento del proceso, seguimiento durante los primeros meses",
            "Cuántas áreas entran, cuánto dura y qué queda instalado al final",
          ],
          [
            "Automatizaciones y desarrollos",
            "Conectar la IA con tus sistemas: mails, planillas, sistema de gestión, WhatsApp",
            "Cuántos sistemas hay que conectar y quién mantiene lo que se construye",
          ],
        ],
      },
      {
        tipo: "subtitulo",
        texto: "Licencias: los precios reales, a septiembre de 2026",
      },
      {
        tipo: "parrafo",
        texto:
          "Para una empresa, lo que corresponde es un plan de equipo, no cuentas personales pagadas con la tarjeta de cada uno. La diferencia no está en la calidad de las respuestas: está en quién administra los accesos y en qué pasa con los datos, un tema que desarrollé en [este otro artículo](/blog/es-seguro-subir-datos-empresa-chatgpt). Estos son los precios publicados por cada proveedor:",
      },
      {
        tipo: "tabla",
        titulo: "Planes de equipo, en dólares por usuario por mes",
        columnas: ["Plan", "Pago mensual", "Pago anual", "Lo que conviene saber"],
        filas: [
          [
            "ChatGPT Business (puesto estándar)",
            "USD 25",
            "USD 20",
            "Mínimo dos puestos. Hay un puesto Premium de USD 125 mensual o USD 100 anual, con cinco veces más uso",
          ],
          [
            "Claude Team (puesto estándar)",
            "USD 25",
            "USD 20",
            "Para equipos de 2 a 150 personas. El puesto Premium cuesta USD 125 mensual o USD 100 anual",
          ],
          [
            "Microsoft 365 Copilot Business",
            "USD 25,20",
            "USD 21 (USD 18 en promoción hasta el 31 de diciembre de 2026)",
            "Es un agregado: exige tener aparte una licencia de Microsoft 365. Para empresas de hasta 300 usuarios",
          ],
          [
            "Google Workspace Business Standard",
            "USD 14 (precio de lista)",
            "Con descuento por compromiso anual",
            "Incluye Gemini en Gmail, Docs, Sheets, Meet y Drive. El plan Starter, de USD 7, trae un acceso más limitado",
          ],
        ],
        fuente:
          "Páginas oficiales de precios de OpenAI, Anthropic, Microsoft y Google, consultadas en septiembre de 2026. Precios sin impuestos; pueden variar según el país",
      },
      {
        tipo: "parrafo",
        texto:
          "Con esos números, la cuenta se hace sola. Un equipo de ocho personas con ChatGPT Business o Claude Team en pago anual son 160 dólares por mes, 1.920 por año. A eso hay que sumarle los impuestos que se aplican a los servicios digitales del exterior, que conviene revisar con tu contador antes de dar el alta.",
      },
      {
        tipo: "parrafo",
        texto:
          "Antes de comprar nada, un control que casi nadie hace: fijate qué pagás hoy. Si la empresa ya tiene Google Workspace en un plan Standard, Gemini ya está incluido en la factura de todos los meses. Si tiene Microsoft 365, sumar Copilot puede tener más sentido que abrir una herramienta nueva. Y si hay suscripciones sueltas pagadas por distintas personas, el primer ahorro está en [ordenarlas](/blog/auditar-suscripciones-de-ia-pyme), no en contratar otra.",
      },
      {
        tipo: "subtitulo",
        texto: "El tiempo del equipo: la partida que nadie presupuesta",
      },
      {
        tipo: "parrafo",
        texto:
          "Es la partida más grande y la única que no aparece en ninguna factura. Una adopción que funciona necesita que alguien convoque, haga seguimiento y persiga lo que se trabó; que la persona que hace la tarea tenga tiempo para probarla de otra manera; y que dirección aparezca cada tanto a decidir. Con los [tres roles que propongo para una PyME](/blog/adopcion-de-ia-sin-depender-de-una-persona), en los primeros tres meses el cálculo queda más o menos así:",
      },
      {
        tipo: "tabla",
        titulo: "Horas internas en un primer ciclo de doce semanas",
        columnas: ["Rol", "Dedicación", "Total aproximado"],
        filas: [
          ["Referente de adopción", "3 a 4 horas por semana", "36 a 48 horas"],
          ["Dueño del proceso que se prueba", "2 horas por semana", "24 horas"],
          ["Dirección", "1 hora cada dos semanas", "6 horas"],
        ],
        fuente: "Estimación propia, sobre la dedicación de cada rol",
      },
      {
        tipo: "parrafo",
        texto:
          "Entre 66 y 78 horas en tres meses. Multiplicadas por el costo hora de cada persona, en casi cualquier PyME ese número es mayor que un año entero de licencias. Por eso digo que la licencia es la parte barata. Y por eso, cuando esas horas no se asignan y se suman a la carga de siempre, la plata de las licencias se pierde: la herramienta está, pero nadie tiene tiempo para cambiar cómo se trabaja.",
      },
      {
        tipo: "cita",
        texto:
          "La licencia se paga con la tarjeta. El cambio se paga con horas, y esas horas hay que sacarlas de algún lado.",
      },
      {
        tipo: "subtitulo",
        texto: "Acompañamiento externo: qué estás pagando",
      },
      {
        tipo: "parrafo",
        texto:
          "Acá no voy a darte un rango de mercado, porque no existe una fuente seria que lo publique y las propuestas varían muchísimo según quién las arma. Lo que sí puedo decirte es qué mirar en cualquier propuesta, incluida la mía:",
      },
      {
        tipo: "lista",
        items: [
          "**Qué queda instalado cuando termina.** Una capacitación deja criterio y habilidad; un acompañamiento tendría que dejar un proceso funcionando y gente de la casa que lo sostenga. Si la propuesta no dice qué queda, lo más probable es que no quede nada.",
          "**Sobre qué tareas se trabaja.** Si la propuesta habla de «transformación» y no nombra ninguna tarea concreta de tu empresa, pedí que la nombre.",
          "**Cuánto tiempo de tu gente requiere.** Un buen acompañamiento te dice de entrada cuántas horas vas a tener que poner. Si promete resultados sin pedirte tiempo, desconfiá.",
          "**Si incluye desarrollo o no.** No es lo mismo ordenar cómo se usa una herramienta que construir una automatización. Son trabajos distintos y se cotizan distinto.",
        ],
      },
      {
        tipo: "subtitulo",
        texto: "Automatizaciones y desarrollos: la plataforma es lo de menos",
      },
      {
        tipo: "parrafo",
        texto:
          "Cuando la tarea necesita que la IA lea los mails que llegan, cargue datos en una planilla o responda por WhatsApp, entra una tercera capa de costo. Las plataformas para armar esas automatizaciones son accesibles: [n8n](https://n8n.io/pricing/) tiene un plan en la nube desde 20 euros por mes con pago anual (2.500 ejecuciones) y una versión gratuita para instalar en un servidor propio; [Zapier](https://zapier.com/pricing) tiene un plan gratuito de 100 tareas por mes y uno profesional desde 19,99 dólares mensuales con pago anual.",
      },
      {
        tipo: "parrafo",
        texto:
          "Pero la plataforma es la parte chica. Lo que cuesta es el diseño, las pruebas y, sobre todo, el mantenimiento: una automatización que conecta tres sistemas se rompe cuando cambia cualquiera de los tres. A eso se suma el consumo de la API del modelo, que se factura por uso y aparte: por ejemplo, [la suscripción a ChatGPT Business no incluye el uso de la API](https://help.openai.com/en/articles/8792828-what-is-chatgpt-business). Mi consejo es no arrancar por acá. Primero probá la tarea a mano, con la herramienta de chat, hasta que el resultado sea confiable. Recién ahí tiene sentido automatizarla.",
      },
      {
        tipo: "subtitulo",
        texto: "Tres formas de arrancar, con números",
      },
      {
        tipo: "tabla",
        titulo: "Lo que cuesta en licencias cada punto de partida",
        columnas: ["Escenario", "Licencias por mes", "Lo que no hay que olvidar"],
        filas: [
          [
            "Una tarea, dos o tres personas, pago mensual",
            "USD 50 a 75",
            "Las horas del referente y del dueño del proceso",
          ],
          [
            "Herramienta común para un equipo de diez, pago anual",
            "USD 200",
            "Un criterio escrito de uso y alguien que administre las cuentas",
          ],
          [
            "Lo anterior más una automatización",
            "USD 200 más la plataforma (desde 20 euros) y el consumo de API",
            "Las horas de desarrollo y quién la mantiene cuando algo cambie",
          ],
        ],
        fuente: "Cálculo sobre los precios publicados de ChatGPT Business, Claude Team y n8n",
      },
      {
        tipo: "subtitulo",
        texto: "El costo de no hacer nada",
      },
      {
        tipo: "parrafo",
        texto:
          "No hacer nada también tiene un precio, aunque no llegue en una factura. El primero es que la IA ya se está usando en tu empresa: con cuentas personales, con datos de clientes pegados en chats que nadie administra y sin ningún criterio común. No gastar en licencias de empresa no evita ese uso. Solo lo deja fuera de tu control.",
      },
      {
        tipo: "parrafo",
        texto:
          "El segundo es la distancia con quienes sí se ordenaron. El estudio [The Widening AI Value Gap](https://www.bcg.com/press/30september2025-ai-leaders-outpace-laggards-revenue-growth-cost-savings) de BCG, sobre 1.250 ejecutivos, encontró que el 5 % de empresas que construye capacidades de IA en todas sus áreas logra 1,7 veces el crecimiento de ingresos y 1,6 veces el margen operativo de las rezagadas, que son el 60 %. Son empresas grandes y no conviene trasladar esos números a una PyME de treinta personas. Pero la dirección es clara: la brecha se abre con el tiempo, no se cierra sola.",
      },
      {
        tipo: "dato",
        valor: "5,4 %",
        texto:
          "de sus horas de trabajo ahorraban en promedio quienes usaban IA generativa, según una encuesta a trabajadores de Estados Unidos analizada por la Reserva Federal de St. Louis. Unas 2,2 horas en una semana de 40.",
      },
      {
        tipo: "parrafo",
        texto:
          "El dato de la [Reserva Federal de St. Louis](https://www.stlouisfed.org/on-the-economy/2025/feb/impact-generative-ai-work-productivity) sirve para poner los pies en la tierra: no es una revolución por persona, son un par de horas por semana. Multiplicadas por un equipo y sostenidas en el tiempo, son muchas horas. Pero solo aparecen si alguien las [mide](/blog/como-medir-si-ia-sirve-pyme) y decide en qué se usan.",
      },
      {
        tipo: "subtitulo",
        texto: "Cómo empezar gastando poco",
      },
      {
        tipo: "lista",
        items: [
          "**Hacé el inventario de lo que ya pagás.** Suscripciones sueltas, módulos de IA dentro de software que ya tenés, Gemini o Copilot incluidos en tu paquete de oficina. Muchas veces la primera herramienta ya está paga.",
          "**Elegí una sola tarea.** Una que se repita, que hoy haga alguien a mano y que se pueda medir. El [mapa de impacto contra facilidad](/blog/por-donde-empezar-a-implementar-ia-en-una-empresa) ayuda a encontrarla en una tarde.",
          "**Licencias solo para quienes hacen esa tarea, con pago mensual.** Pagás 25 dólares en lugar de 20, pero no te atás un año a algo que todavía no probaste.",
          "**Asigná las horas antes de empezar.** Tres o cuatro horas semanales para quien sostiene el proceso, sacadas de algo que deja de hacer.",
          "**Pasá al plan anual y sumá gente recién cuando haya un resultado medido.** Ahí el ahorro del pago anual tiene sentido, porque ya sabés que lo vas a usar.",
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "Con este orden, los primeros tres meses cuestan poco en plata y bastante en atención, que es exactamente al revés de como suele hacerse. En el [Programa INTEGRA](/programa-integra) trabajamos con ese orden, y el primer paso es una Consultoría Estratégica Gratuita donde miramos juntos qué pagás hoy, qué tarea conviene encarar primero y cuánto tiempo de tu equipo va a hacer falta.",
      },
      {
        tipo: "fuentes",
        items: [
          {
            label: "OpenAI — ChatGPT Business, precios y tipos de puesto",
            url: "https://help.openai.com/en/articles/8792828-what-is-chatgpt-business",
          },
          {
            label: "Anthropic — Precios de Claude",
            url: "https://claude.com/pricing",
          },
          {
            label: "Microsoft — Precios de Microsoft 365 Copilot",
            url: "https://www.microsoft.com/en-us/microsoft-365-copilot/pricing",
          },
          {
            label: "Google — Precios de Google Workspace",
            url: "https://workspace.google.com/pricing",
          },
          {
            label: "n8n — Precios",
            url: "https://n8n.io/pricing/",
          },
          {
            label: "Zapier — Precios",
            url: "https://zapier.com/pricing",
          },
          {
            label: "BCG — AI Leaders Outpace Laggards (The Widening AI Value Gap), septiembre de 2025",
            url: "https://www.bcg.com/press/30september2025-ai-leaders-outpace-laggards-revenue-growth-cost-savings",
          },
          {
            label: "Federal Reserve Bank of St. Louis — The Impact of Generative AI on Work Productivity, febrero de 2025",
            url: "https://www.stlouisfed.org/on-the-economy/2025/feb/impact-generative-ai-work-productivity",
          },
        ],
      },
    ],
  },

  /* =================================================================
     N06 — POR QUÉ LOS EMPLEADOS NO QUIEREN USAR IA
     ================================================================= */
  {
    slug: "empleados-no-quieren-usar-ia-por-que-y-que-hacer",
    titulo: "Tu equipo no quiere usar IA: por qué pasa y qué hacer desde la dirección",
    categoria: "Equipos",
    fecha: "2026-09-14",
    fechaLabel: "14 de septiembre de 2026",
    lectura: "9 min de lectura",
    resumen:
      "Casi la mitad de la gente que usa IA en el trabajo no se anima a contárselo a su jefe, y buena parte del resto no la usa porque nadie le dijo para qué ni con qué permiso. Lo que dicen las encuestas y lo que puede hacer, en concreto, la dirección de una PyME.",
    img: "/images/blog/empleados-no-quieren-usar-ia-por-que-y-que-hacer.png",
    imgLabel: "/images/blog/empleados-no-quieren-usar-ia-por-que-y-que-hacer.png",
    cuerpo: [
      {
        tipo: "parrafo",
        texto:
          "Cuando un dueño me dice «mi gente no quiere saber nada con la IA», casi siempre le pido lo mismo: que no saque conclusiones todavía. Porque detrás de esa frase suelen convivir dos grupos bien distintos. Los que de verdad no la usan, y los que la usan todos los días pero no lo dicen.",
      },
      {
        tipo: "parrafo",
        texto:
          "Los dos grupos parecen iguales desde la oficina de dirección: no aparecen en ningún informe, no proponen nada, no cambia ningún proceso. Pero tienen motivos distintos y se destraban de maneras distintas. Confundirlos es el primer error.",
      },
      {
        tipo: "subtitulo",
        texto: "Primero: mucha de esa gente ya la usa, a escondidas",
      },
      {
        tipo: "parrafo",
        texto:
          "El [Work Trend Index 2024 de Microsoft y LinkedIn](https://www.microsoft.com/en-us/worklab/work-trend-index/ai-at-work-is-here-now-comes-the-hard-part), que encuestó a 31.000 trabajadores del conocimiento en 31 países, encontró que el 75 % ya usaba IA generativa en el trabajo y que el 78 % de esos usuarios llevaba sus propias herramientas, sin esperar a que la empresa se las diera. El mismo estudio mostró la otra cara: el 52 % de los que la usan se resiste a admitirlo cuando la aplica a sus tareas más importantes.",
      },
      {
        tipo: "parrafo",
        texto:
          "No es un dato aislado. El [Workforce Index de Slack de otoño de 2024](https://slack.com/blog/news/the-fall-2024-workforce-index-shows-executives-and-employees-investing-in-ai-but-uncertainty-holding-back-adoption), con más de 17.000 respuestas en quince países, encontró que el 48 % de los empleados de oficina se sentiría incómodo contándole a su jefe que usó IA para tareas comunes. Y el estudio global de [KPMG y la Universidad de Melbourne](https://kpmg.com/xx/en/media/press-releases/2025/04/trust-of-ai-remains-a-critical-challenge.html), publicado en abril de 2025 con 48.000 personas de 47 países, fue más lejos: el 57 % de los empleados dice que oculta su uso de IA y presenta como propio trabajo hecho con ella.",
      },
      {
        tipo: "grafico",
        titulo: "Usar IA y no decirlo",
        bajada: "Porcentaje de trabajadores que declara cada situación, según tres encuestas internacionales.",
        barras: [
          { label: "Oculta su uso y presenta el trabajo como propio (KPMG)", valor: 57, texto: "57 %" },
          {
            label: "Se resiste a admitir que la usa en sus tareas importantes (Microsoft)",
            valor: 52,
            texto: "52 %",
            tono: "neutro",
          },
          {
            label: "Se sentiría incómodo contándole a su jefe que la usó (Slack)",
            valor: 48,
            texto: "48 %",
            tono: "neutro",
          },
        ],
        nota: "Las tres preguntas no son idénticas ni las muestras son las mismas, pero apuntan al mismo lugar: una parte grande del uso real no se ve desde arriba.",
        fuente:
          "KPMG y Universidad de Melbourne, abril de 2025 · Microsoft Work Trend Index, mayo de 2024 · Slack Workforce Index, otoño de 2024",
      },
      {
        tipo: "parrafo",
        texto:
          "Para una PyME, esto tiene una consecuencia práctica. Si la gente que ya sabe usar IA la usa callada, lo que aprende no le llega a nadie más. Es exactamente el problema de la persona que sabe y no contagia: no es que no quiera compartir, es que compartir la expone.",
      },
      {
        tipo: "subtitulo",
        texto: "Los motivos de fondo, uno por uno",
      },
      {
        tipo: "parrafo",
        texto:
          "Cuando se les pregunta a los que no se animan a contarlo por qué, las respuestas de la encuesta de Slack son reveladoras. Casi ninguna tiene que ver con la tecnología.",
      },
      {
        tipo: "grafico",
        titulo: "Por qué no le cuentan al jefe que usan IA",
        bajada: "Entre quienes se sentirían incómodos, porcentaje que menciona cada motivo.",
        barras: [
          { label: "Siente que usar IA es hacer trampa", valor: 47, texto: "47 %" },
          { label: "Teme que lo vean como menos capaz", valor: 46, texto: "46 %" },
          { label: "Teme que lo vean como vago", valor: 46, texto: "46 %" },
          {
            label: "La política de la empresa la desaconseja o prohíbe",
            valor: 21,
            texto: "21 %",
            tono: "neutro",
          },
        ],
        nota: "La prohibición formal es el motivo menos citado. Lo que frena es la mirada del otro.",
        fuente: "Slack Workforce Index · encuesta del 2 al 30 de agosto de 2024, 17.372 respuestas",
      },
      {
        tipo: "parrafo",
        texto:
          "A esos motivos se suman otros que escucho seguido en las capacitaciones y que las encuestas también registran. Los ordeno en cinco, porque cada uno pide una respuesta distinta:",
      },
      {
        tipo: "lista",
        items: [
          "**Miedo a quedar como reemplazable.** El 53 % de los usuarios de IA encuestados por Microsoft teme que usarla en tareas importantes lo haga parecer reemplazable. Y el temor no es de un solo nivel: el estudio [AI at Work 2025 de BCG](https://www.bcg.com/publications/2025/ai-at-work-momentum-builds-but-gaps-remain) encontró que el 43 % de los líderes y gerentes y el 36 % del personal de primera línea teme perder su trabajo en los próximos diez años.",
          "**No ver para qué.** Mucha gente probó una vez, le pidió algo genérico, recibió una respuesta genérica y concluyó que «no sirve para lo mío». No es desinterés: es que nadie le mostró una tarea de su propio trabajo resuelta mejor.",
          "**Falta de tiempo.** Aprender algo nuevo cuesta más al principio. Si la persona está al límite con lo urgente, la IA compite contra la entrega de mañana y pierde. El mismo informe de Slack encontró que el 61 % de los empleados había dedicado menos de cinco horas a aprender a usarla.",
          "**Una mala primera experiencia.** Un dato inventado en un informe, un mail que salió con un error vergonzoso. Una sola vez alcanza para que alguien decida no volver. Es razonable: el estudio de KPMG encontró que el 56 % de los empleados cometió errores en su trabajo por culpa de la IA, y que el 66 % usa lo que devuelve sin verificarlo.",
          "**No saber si está permitido.** Según Slack, el 45 % de los empleados no tiene permiso explícito para usar IA. Y según KPMG, solo el 40 % dice que su lugar de trabajo tiene una política o una guía sobre IA generativa. Ante la duda, mucha gente elige no usarla o usarla sin avisar.",
        ],
      },
      {
        tipo: "cita",
        texto:
          "La mayoría de las veces el freno no es la herramienta ni la edad de la gente. Es no saber qué piensa el que decide.",
      },
      {
        tipo: "subtitulo",
        texto: "Lo que las encuestas dicen que sí mueve la aguja",
      },
      {
        tipo: "parrafo",
        texto:
          "La parte buena de estos estudios es que también miden qué cambia cuando la dirección hace algo. Y los efectos son grandes.",
      },
      {
        tipo: "tabla",
        titulo: "Qué pasa cuando la dirección se mueve",
        columnas: ["Lo que hace la dirección", "Lo que se midió", "Fuente"],
        filas: [
          [
            "Da permiso explícito para usar IA",
            "Los empleados con permiso son casi 6 veces más propensos a haber probado herramientas de IA",
            "Slack, marzo de 2024",
          ],
          [
            "Apoya el uso de forma visible",
            "La opinión positiva sobre la IA sube del 15 % al 55 % cuando hay apoyo fuerte de los líderes",
            "BCG, junio de 2025",
          ],
          [
            "El jefe directo acompaña el uso",
            "Los empleados son 1,7 veces más propensos a usarla con frecuencia",
            "Gallup, 2026",
          ],
          [
            "Comunica un plan claro",
            "Solo el 25 % de los empleados en Estados Unidos dice que su organización lo hizo",
            "Gallup, mayo de 2026",
          ],
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "El dato de [Slack de marzo de 2024](https://slack.com/blog/news/the-workforce-index-june-2024) es el que más me gusta mostrar, porque desarma una intuición común. No hace falta una política sofisticada: lo que multiplica el uso es que exista un permiso claro. Incluso las empresas con reglas que limitan el uso tienen más gente probando que las que no dicen nada. El silencio es peor que una regla estricta.",
      },
      {
        tipo: "parrafo",
        texto:
          "El indicador de [Gallup sobre IA en el trabajo](https://www.gallup.com/699797/indicator-artificial-intelligence.aspx) va en la misma línea: en mayo de 2026, tres de cada cuatro empleados en Estados Unidos decían que su organización no les había comunicado un plan claro para integrar la IA. Si eso pasa en las empresas grandes, que tienen áreas enteras dedicadas a comunicar, en una PyME el silencio suele ser total.",
      },
      {
        tipo: "subtitulo",
        texto: "Qué hacer desde la dirección, en concreto",
      },
      {
        tipo: "parrafo",
        texto:
          "Nada de lo que sigue requiere comprar una herramienta ni contratar un curso. Requiere decisiones y, sobre todo, conversaciones.",
      },
      {
        tipo: "lista",
        items: [
          "**Decí en voz alta que está permitido, y qué no.** Una página alcanza: qué se puede hacer sin preguntar, qué información de la empresa no se carga nunca y qué tiene que revisar una persona antes de salir hacia un cliente. Lo desarrollé en [este artículo sobre el criterio común](/blog/criterio-comun-de-ia-en-la-empresa). Lo importante es que lo diga el dueño, no el de sistemas.",
          "**Sacá el uso de la sombra sin castigar a nadie.** Preguntá quién ya la usa y para qué, aclarando antes que no hay consecuencias. El mensaje tiene que ser «queremos aprender de lo que ya hacen», no «queremos saber quién la usa».",
          "**Contestá la pregunta del reemplazo antes de que la hagan.** Si no la contestás vos, la contesta el rumor. No prometas lo que no podés garantizar, pero sí podés decir qué vas a hacer con el tiempo que se libere. Qué dicen los datos sobre esto lo repasé en [otro artículo](/blog/ia-reemplazar-empleados-datos-2026).",
          "**Elegí una tarea real de cada área, no un curso general.** La forma más rápida de pasar de «no sirve para lo mío» a usarla es ver resuelta una tarea propia: la respuesta a un reclamo típico, el resumen de una reunión con un cliente, la primera versión de una cotización.",
          "**Dale tiempo protegido, aunque sea poco.** Una hora por semana, en la agenda, para probar sobre trabajo real. Si el aprendizaje tiene que entrar en los huecos que deja lo urgente, no entra.",
          "**Premiá al que muestra, no al que esconde.** Cuando alguien comparte cómo resolvió algo, que se note. Es la forma de que lo que sabe una persona le sirva a las demás, que es el problema de fondo de casi todas las PyMEs con las que trabajo.",
          "**Usala vos, a la vista.** Si el dueño llega a la reunión con algo que preparó con IA y cuenta cómo lo revisó, el equipo entiende más que con cualquier comunicado. Volví sobre este punto en [el artículo sobre liderazgo](/blog/liderazgo-en-la-era-de-la-ia).",
        ],
      },
      {
        tipo: "subtitulo",
        texto: "Lo que conviene no hacer",
      },
      {
        tipo: "parrafo",
        texto:
          "Prohibir no funciona. BCG encontró que más de la mitad de los empleados que no tienen las herramientas que necesitan dicen que igual buscarían alternativas y las usarían. La prohibición no elimina el uso: lo empuja a cuentas personales, con datos de la empresa y sin ningún criterio común.",
      },
      {
        tipo: "parrafo",
        texto:
          "Tampoco conviene obligar a usarla con metas de uso. «Todos tienen que usar IA al menos tres veces por semana» produce exactamente eso: tres usos por semana, casi siempre en lo que menos importa. Lo que interesa medir no es cuánto se usa la herramienta, sino si alguna tarea concreta se hace mejor o más rápido que antes.",
      },
      {
        tipo: "cita",
        texto:
          "Un equipo que no usa IA casi nunca es un equipo que se niega. Es un equipo que todavía no sabe qué espera de él la empresa.",
      },
      {
        tipo: "parrafo",
        texto:
          "La resistencia, cuando se la mira de cerca, suele ser una suma de preguntas sin contestar: si está permitido, si es trampa, si me va a dejar sin trabajo, para qué me sirve a mí. Ninguna de esas preguntas la contesta un proveedor de tecnología. Las contesta la dirección, y cuanto antes, mejor.",
      },
      {
        tipo: "parrafo",
        texto:
          "En el [Programa INTEGRA](/programa-integra) empezamos justamente por ahí: antes de hablar de herramientas, ordenamos qué se permite, qué tarea de cada área vale la pena tocar primero y quién lo sostiene dentro de la empresa. El primer paso es una Consultoría Estratégica Gratuita, donde miramos juntos dónde está el freno en tu equipo.",
      },
      {
        tipo: "fuentes",
        items: [
          {
            label: "Microsoft y LinkedIn — Work Trend Index 2024: AI at work is here. Now comes the hard part",
            url: "https://www.microsoft.com/en-us/worklab/work-trend-index/ai-at-work-is-here-now-comes-the-hard-part",
          },
          {
            label: "Slack — Workforce Index, otoño de 2024",
            url: "https://slack.com/blog/news/the-fall-2024-workforce-index-shows-executives-and-employees-investing-in-ai-but-uncertainty-holding-back-adoption",
          },
          {
            label: "Slack — Workforce Index, marzo de 2024",
            url: "https://slack.com/blog/news/the-workforce-index-june-2024",
          },
          {
            label: "KPMG y Universidad de Melbourne — Trust, attitudes and use of AI: a global study 2025",
            url: "https://kpmg.com/xx/en/media/press-releases/2025/04/trust-of-ai-remains-a-critical-challenge.html",
          },
          {
            label: "BCG — AI at Work 2025: Momentum Builds, but Gaps Remain, junio de 2025",
            url: "https://www.bcg.com/publications/2025/ai-at-work-momentum-builds-but-gaps-remain",
          },
          {
            label: "Gallup — Indicador de inteligencia artificial en el trabajo",
            url: "https://www.gallup.com/699797/indicator-artificial-intelligence.aspx",
          },
        ],
      },
    ],
  },

  /* =================================================================
     N07 — ¿ES SEGURO SUBIR DATOS DE LA EMPRESA A CHATGPT?
     ================================================================= */
  {
    slug: "es-seguro-subir-datos-empresa-chatgpt",
    titulo: "¿Es seguro subir datos de tu empresa a ChatGPT?",
    categoria: "Herramientas",
    fecha: "2026-09-11",
    fechaLabel: "11 de septiembre de 2026",
    lectura: "8 min de lectura",
    resumen:
      "Depende de qué cuenta uses, cómo la tengas configurada y qué dato estés pegando. Qué cambia entre un plan personal y uno de empresa, qué no se sube nunca, qué dice la Ley 25.326 y cinco reglas simples para el equipo.",
    img: "/images/blog/es-seguro-subir-datos-empresa-chatgpt.png",
    imgLabel: "/images/blog/es-seguro-subir-datos-empresa-chatgpt.png",
    cuerpo: [
      {
        tipo: "parrafo",
        texto:
          "La pregunta aparece en casi todas las capacitaciones, y casi siempre la hace alguien de administración o el dueño: «¿es seguro poner los datos de la empresa en ChatGPT?». Detrás hay una preocupación real, y muchas veces tardía: para cuando se pregunta, ya hay gente del equipo pegando planillas, mails de clientes y contratos en una cuenta personal.",
      },
      {
        tipo: "parrafo",
        texto:
          "La respuesta corta es que depende de tres cosas: qué cuenta usás, cómo está configurada y qué dato estás subiendo. Las tres se pueden ordenar sin ser experto en seguridad informática.",
      },
      {
        tipo: "subtitulo",
        texto: "Cuenta personal o cuenta de empresa: la diferencia que importa",
      },
      {
        tipo: "parrafo",
        texto:
          "Las herramientas de IA tienen dos familias de planes: los personales (gratis o pagos, como ChatGPT Plus o Claude Pro) y los de empresa (ChatGPT Business, Claude Team, Gemini dentro de Google Workspace). El modelo que responde puede ser el mismo. Lo que cambia es el contrato y, con él, lo que el proveedor puede hacer con lo que escribís.",
      },
      {
        tipo: "tabla",
        titulo: "Qué pasa con tus conversaciones según el plan",
        columnas: ["Cuenta", "¿Se usan para entrenar modelos?", "Lo que conviene saber"],
        filas: [
          [
            "ChatGPT gratis o Plus",
            "Sí, salvo que apagues «Mejorar el modelo para todos» en Controles de datos",
            "Los chats temporales no se usan para entrenar, pero pueden guardarse hasta 30 días por seguridad",
          ],
          [
            "ChatGPT Business o Enterprise",
            "No, por defecto",
            "La empresa administra usuarios, roles y accesos desde un panel",
          ],
          [
            "Claude Free, Pro o Max",
            "Lo elige cada usuario, desde un cambio anunciado en agosto de 2025",
            "Si aceptás, las conversaciones se guardan hasta cinco años; si no, 30 días",
          ],
          [
            "Claude Team o Enterprise",
            "No; ese cambio no alcanza a los planes comerciales",
            "Rigen los términos comerciales de Anthropic",
          ],
          [
            "App de Gemini con cuenta personal",
            "Puede usarse para mejorar los servicios de Google",
            "Si no apagás la actividad, una parte de los chats la leen revisores humanos y se conserva hasta tres años",
          ],
          [
            "Gemini dentro de Google Workspace",
            "No fuera de tu dominio sin permiso",
            "Google se compromete a que no lo revisen personas",
          ],
        ],
        fuente:
          "Centros de ayuda y páginas de privacidad de OpenAI, Anthropic y Google, consultados en septiembre de 2026",
      },
      {
        tipo: "parrafo",
        texto:
          "Algunos detalles de esa tabla vale la pena leerlos en la fuente. OpenAI explica que, aun con el entrenamiento apagado, [si le das pulgar arriba o abajo a una respuesta, la conversación completa puede usarse para mejorar sus modelos](https://help.openai.com/en/articles/5722486-how-your-data-is-used-to-improve-model-performance). Anthropic [cambió sus términos para los planes personales en agosto de 2025](https://www.anthropic.com/news/updates-to-our-consumer-terms) y pidió a cada usuario que eligiera. Y Google, en la [ayuda de la app de Gemini](https://support.google.com/gemini/answer/13594961?hl=en), lo dice sin vueltas: no ingreses información confidencial que no querrías que vea un revisor.",
      },
      {
        tipo: "cita",
        texto:
          "La pregunta no es si ChatGPT es seguro. Es si la cuenta con la que tu equipo lo usa es de la empresa o de cada uno.",
      },
      {
        tipo: "subtitulo",
        texto: "Que no entrene no quiere decir que no guarde",
      },
      {
        tipo: "parrafo",
        texto:
          "Aun en un plan de empresa, lo que subís queda en servidores de otra compañía, en otro país, durante un tiempo. En ChatGPT Enterprise, por ejemplo, [el administrador define cuánto tiempo se conservan las conversaciones, y las borradas se eliminan dentro de los 30 días](https://openai.com/enterprise-privacy/), salvo obligación legal. Es razonable, pero no es lo mismo que «no pasó nada».",
      },
      {
        tipo: "parrafo",
        texto:
          "Además, hay errores que dependen de quien usa la herramienta, no del proveedor. En 2023, [Samsung prohibió el uso de estas herramientas](https://www.cnbc.com/2023/05/02/samsung-bans-use-of-ai-like-chatgpt-for-staff-after-misuse-of-chatbot.html) después de que empleados subieran código interno a ChatGPT. En 2025, [miles de conversaciones compartidas con un link público aparecieron en los resultados de Google](https://www.searchenginejournal.com/openai-is-pulling-shared-chatgpt-chats-from-google-search/552671/), porque sus autores habían tildado una opción para que fueran encontrables; OpenAI la sacó el 1 de agosto de ese año. En ninguno de los dos casos hubo un ataque. Hubo gente que no sabía bien qué estaba haciendo.",
      },
      {
        tipo: "subtitulo",
        texto: "Lo que no se sube nunca, ni en un plan pago",
      },
      {
        tipo: "lista",
        items: [
          "**Contraseñas, claves de acceso y datos de tarjetas o cuentas bancarias.** No hay tarea que lo justifique.",
          "**Datos sensibles de personas.** La ley argentina los define con precisión: salud, origen racial o étnico, opiniones políticas, convicciones religiosas, filosóficas o morales, afiliación sindical, vida sexual. Un certificado médico de un empleado entra en esta categoría.",
          "**Información de terceros que firmaste mantener en reserva.** Si tenés un acuerdo de confidencialidad con un cliente o proveedor, subir sus documentos a un servicio externo puede incumplirlo, aunque el plan sea de empresa.",
          "**Bases completas de clientes o empleados.** Casi nunca hace falta la planilla entera. Para que la IA entienda el formato o arme una fórmula, alcanza con diez filas con los nombres cambiados.",
          "**Cualquier cosa, desde una cuenta personal, que no publicarías en la web de la empresa.** Si la cuenta no es de la empresa, tratala como si fuera pública.",
        ],
      },
      {
        tipo: "subtitulo",
        texto: "Qué dice la Ley 25.326",
      },
      {
        tipo: "parrafo",
        texto:
          "En Argentina, la [Ley 25.326 de Protección de Datos Personales](https://servicios.infoleg.gob.ar/infolegInternet/anexos/60000-64999/64790/texact.htm) sigue siendo la norma vigente. Es del año 2000 y no menciona la inteligencia artificial, pero varios de sus artículos se aplican de lleno a lo que hace tu equipo cuando pega datos en un chat. No soy abogado, así que lo que sigue es un mapa para saber qué preguntar, no un dictamen:",
      },
      {
        tipo: "tabla",
        titulo: "Cuatro artículos que conviene conocer",
        columnas: ["Artículo", "Qué dice", "Qué significa para tu equipo"],
        filas: [
          [
            "Art. 2 — Definiciones",
            "Dato personal es información referida a personas humanas o jurídicas determinadas o determinables. Define también los datos sensibles",
            "El nombre, el mail o el CUIT de un cliente son datos personales. No hace falta que sea un dato íntimo",
          ],
          [
            "Art. 4 — Calidad de los datos",
            "Los datos no pueden usarse para fines distintos o incompatibles con aquellos para los que se obtuvieron",
            "Que un cliente te haya dado sus datos para facturarle no habilita cualquier otro uso",
          ],
          [
            "Art. 9 — Seguridad",
            "Quien tiene la base de datos debe adoptar medidas técnicas y organizativas para garantizar su seguridad y confidencialidad",
            "Dejar que cada empleado decida qué pega en una cuenta personal difícilmente cuente como una medida organizativa",
          ],
          [
            "Art. 12 — Transferencia internacional",
            "Prohíbe transferir datos personales a países que no den un nivel de protección adecuado, con excepciones",
            "Los servidores de estas herramientas suelen estar en el exterior, y Estados Unidos no figura en la lista de países adecuados",
          ],
        ],
        fuente: "Ley 25.326, texto actualizado en InfoLEG",
      },
      {
        tipo: "parrafo",
        texto:
          "El último punto es el que más sorprende. La [Agencia de Acceso a la Información Pública](https://www.argentina.gob.ar/transferencias-internacionales) publica la lista de países con protección adecuada: incluye a la Unión Europea, el Reino Unido, Suiza, Uruguay y otros, pero no a Estados Unidos. Para transferir datos a un país que no está en la lista, la agencia prevé mecanismos como el consentimiento expreso de las personas o cláusulas contractuales modelo. Si tu empresa maneja datos de clientes en volumen, esta es una conversación para tener con un abogado antes de elegir herramienta, no después.",
      },
      {
        tipo: "subtitulo",
        texto: "Cinco reglas para el equipo, en una página",
      },
      {
        tipo: "parrafo",
        texto:
          "Nada de esto se resuelve con un reglamento de veinte páginas. Se resuelve con [un criterio común](/blog/criterio-comun-de-ia-en-la-empresa) que entre en una hoja y que todos conozcan. Estas cinco reglas cubren la mayoría de los casos:",
      },
      {
        tipo: "lista",
        items: [
          "**Para trabajar, cuentas de la empresa.** Un plan de equipo, a nombre de la empresa, con alguien que administre las altas y las bajas. Cuando alguien se va, se le da de baja desde el panel y listo.",
          "**Mientras tanto, cuentas personales configuradas.** Si todavía no hay plan de empresa, cada persona apaga el entrenamiento en la configuración y usa chats temporales para cualquier cosa del trabajo.",
          "**Nombres cambiados antes de pegar.** «Cliente A», «Proveedor 3», montos redondeados. La IA resuelve igual y el dato real no sale de la empresa.",
          "**Nada de links públicos.** Las conversaciones de trabajo no se comparten con un link: se copia lo que haga falta y se manda por el canal de siempre.",
          "**Una persona a quien preguntar.** Cuando alguien duda si puede subir algo, tiene que saber a quién consultar en cinco minutos. Si no hay a quién, decide solo, y cada uno decide distinto.",
        ],
      },
      {
        tipo: "tabla",
        titulo: "El semáforo, para colgar al lado de la pantalla",
        columnas: ["Color", "Qué entra", "Dónde"],
        filas: [
          [
            "Verde",
            "Textos públicos, borradores genéricos, ideas, fórmulas de planilla con datos de ejemplo",
            "En cualquier cuenta",
          ],
          [
            "Amarillo",
            "Información interna sin datos de personas: procedimientos, informes de gestión, textos comerciales",
            "Solo en la cuenta de empresa",
          ],
          [
            "Rojo",
            "Datos sensibles, claves, datos bancarios, bases de clientes identificables, documentos bajo confidencialidad",
            "No se sube",
          ],
        ],
      },
      {
        tipo: "subtitulo",
        texto: "Prohibir no lo hace más seguro",
      },
      {
        tipo: "parrafo",
        texto:
          "Frente a este panorama, la reacción de muchos dueños es prohibir. Lo entiendo, pero en una PyME casi nunca funciona: el uso no desaparece, se muda al celular personal, que es el lugar donde menos control hay. El informe [Superagency in the workplace](https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/superagency-in-the-workplace-empowering-people-to-unlock-ais-full-potential) de McKinsey encontró que los empleados adoptan la IA generativa bastante más rápido de lo que sus líderes creen. Lo más probable es que en tu empresa ya se esté usando.",
      },
      {
        tipo: "parrafo",
        texto:
          "Lo que sí funciona es darle a la gente una forma segura de hacer lo que ya está haciendo: una cuenta de empresa, una hoja con el semáforo y alguien a quien preguntar. Es de las primeras cosas que dejamos armadas en el [Programa INTEGRA](/programa-integra), porque sin esa base cualquier avance posterior se apoya sobre datos que nadie sabe dónde terminaron.",
      },
      {
        tipo: "fuentes",
        items: [
          {
            label: "OpenAI — Controles de datos en ChatGPT",
            url: "https://help.openai.com/en/articles/7730893-data-controls-faq",
          },
          {
            label: "OpenAI — Cómo se usan los datos para mejorar los modelos",
            url: "https://help.openai.com/en/articles/5722486-how-your-data-is-used-to-improve-model-performance",
          },
          {
            label: "OpenAI — Enterprise privacy",
            url: "https://openai.com/enterprise-privacy/",
          },
          {
            label: "OpenAI — ChatGPT Business",
            url: "https://help.openai.com/en/articles/8792828-what-is-chatgpt-business",
          },
          {
            label: "Anthropic — Updates to our consumer terms, agosto de 2025",
            url: "https://www.anthropic.com/news/updates-to-our-consumer-terms",
          },
          {
            label: "Google — Privacidad de las apps de Gemini",
            url: "https://support.google.com/gemini/answer/13594961?hl=en",
          },
          {
            label: "Google — Generative AI in Google Workspace Privacy Hub",
            url: "https://knowledge.workspace.google.com/admin/gemini/generative-ai-in-google-workspace-privacy-hub",
          },
          {
            label: "Ley 25.326 de Protección de Datos Personales (InfoLEG)",
            url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/60000-64999/64790/texact.htm",
          },
          {
            label: "AAIP — Transferencias internacionales de datos personales",
            url: "https://www.argentina.gob.ar/transferencias-internacionales",
          },
          {
            label: "CNBC — Samsung bans use of AI like ChatGPT for employees, mayo de 2023",
            url: "https://www.cnbc.com/2023/05/02/samsung-bans-use-of-ai-like-chatgpt-for-staff-after-misuse-of-chatbot.html",
          },
          {
            label: "Search Engine Journal — OpenAI is pulling shared ChatGPT chats from Google Search, agosto de 2025",
            url: "https://www.searchenginejournal.com/openai-is-pulling-shared-chatgpt-chats-from-google-search/552671/",
          },
          {
            label: "McKinsey — Superagency in the workplace, enero de 2025",
            url: "https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/superagency-in-the-workplace-empowering-people-to-unlock-ais-full-potential",
          },
        ],
      },
    ],
  },

  /* =================================================================
     N08 — COMPRAR DESDE CHATGPT: QUÉ HAY HOY Y QUÉ PREPARAR EN ARGENTINA
     ================================================================= */
  {
    slug: "comprar-desde-chatgpt-argentina-comercio",
    titulo: "Comprar desde ChatGPT: qué hay hoy y qué tiene que preparar un comercio argentino",
    categoria: "Herramientas",
    fecha: "2026-09-08",
    fechaLabel: "8 de septiembre de 2026",
    lectura: "7 min de lectura",
    resumen:
      "OpenAI lanzó la compra dentro del chat, la cerró seis meses después y hoy apuesta a recomendar productos y mandar al cliente a la tienda. Qué está disponible, qué llega a la Argentina y qué conviene ordenar en tu catálogo mientras tanto.",
    img: "/images/blog/comprar-desde-chatgpt-argentina-comercio.png",
    imgLabel: "/images/blog/comprar-desde-chatgpt-argentina-comercio.png",
    cuerpo: [
      {
        tipo: "parrafo",
        texto:
          "Cada tanto alguien que tiene un comercio me pregunta si «ya se puede vender por ChatGPT». La pregunta tiene sentido: hace un año se anunció con bombos y platillos que se iba a poder comprar sin salir del chat. Lo que pasó después se contó bastante menos, y es lo que más le sirve entender a un comercio argentino antes de invertir tiempo o plata en esto.",
      },
      {
        tipo: "subtitulo",
        texto: "Qué es eso de comprar desde un chat",
      },
      {
        tipo: "parrafo",
        texto:
          "La idea, que en inglés se llama agentic commerce, es simple de explicar: en lugar de buscar en Google, abrir cinco pestañas y comparar, le contás al asistente qué necesitás, te muestra opciones y, en la versión más ambiciosa, hace la compra por vos. Para que eso funcione, el asistente necesita tres cosas del comercio: el catálogo con datos completos y actualizados, una forma de cobrar sin que la tarjeta pase por el chat, y confianza del cliente en que lo que compró va a llegar.",
      },
      {
        tipo: "subtitulo",
        texto: "Lo que se lanzó y lo que se cerró",
      },
      {
        tipo: "parrafo",
        texto:
          "El 29 de septiembre de 2025 OpenAI y Stripe lanzaron [Instant Checkout](https://stripe.com/newsroom/news/stripe-openai-instant-checkout): compras dentro de ChatGPT, sólo para usuarios de Estados Unidos, arrancando con vendedores de Etsy y con comercios de Shopify anunciados para más adelante. Junto con eso publicaron el Agentic Commerce Protocol (ACP), un estándar abierto para que los comercios y los asistentes de IA hablen el mismo idioma.",
      },
      {
        tipo: "parrafo",
        texto:
          "En marzo de 2026 OpenAI dio marcha atrás. Según [Digital Commerce 360](https://www.digitalcommerce360.com/2026/03/24/openai-agentic-commerce-updates-chatgpt-walmart/), la empresa reconoció que la primera versión de Instant Checkout «no ofrecía la flexibilidad» que buscaba, y el 24 de marzo anunció que ChatGPT se iba a concentrar en ayudar a descubrir productos, dejando el cobro en manos de cada comercio. El ACP siguió vivo, pero ahora para que los comercios compartan su catálogo y sus promociones con ChatGPT.",
      },
      {
        tipo: "cita",
        texto:
          "La compra dentro del chat no desapareció por falta de tecnología. Desapareció porque comprar bien requiere cosas que un chat todavía no resuelve solo: stock real, envíos, cambios, promociones.",
      },
      {
        tipo: "subtitulo",
        texto: "Qué hay hoy, en el mundo",
      },
      {
        tipo: "tabla",
        titulo: "Dónde está la compra con IA a principios de septiembre",
        columnas: ["Qué", "Cómo funciona", "Dónde está disponible"],
        filas: [
          [
            "Descubrimiento de productos en ChatGPT",
            "ChatGPT recomienda y compara productos; el cliente compra en la tienda del comercio",
            "El estándar de catálogo de OpenAI apunta hoy a Estados Unidos",
          ],
          [
            "Apps de comercios dentro de ChatGPT",
            "Cada comercio arma su propia experiencia, con su cuenta, su programa de fidelidad y sus medios de pago (el caso de Walmart)",
            "Comercios grandes, mayormente de Estados Unidos",
          ],
          [
            "Compra con IA de Google (UCP)",
            "Botón de compra dentro del Modo IA del buscador y de Gemini",
            "Estados Unidos, Canadá y Australia, para comercios seleccionados",
          ],
          [
            "Publicidad en ChatGPT",
            "Anuncios marcados como patrocinados debajo de las respuestas",
            "52 países al 3 de septiembre; en América Latina, sólo Brasil y México",
          ],
        ],
        fuente:
          "OpenAI Developers, Google Merchant Center, Digital Commerce 360 y Digital Applied",
      },
      {
        tipo: "parrafo",
        texto:
          "Los detalles, con sus fuentes: la [especificación del catálogo de OpenAI](https://developers.openai.com/commerce/specs/file-upload/products) dice que el estándar «actualmente se dirige a EE. UU.»; la [ayuda de Google Merchant Center](https://support.google.com/merchants/answer/16837055?hl=en) limita la compra con su protocolo a productos de Estados Unidos, Canadá y Australia; y el relevamiento de [Digital Applied](https://www.digitalapplied.com/blog/where-chatgpt-ads-are-sold-every-market-and-date) sobre la publicidad en ChatGPT no incluye a la Argentina en la lista de países al 3 de septiembre.",
      },
      {
        tipo: "subtitulo",
        texto: "Qué llega (y qué no) a la Argentina",
      },
      {
        tipo: "parrafo",
        texto:
          "Hoy un comercio argentino no puede subir su catálogo a ChatGPT por la vía oficial ni vender con el botón de compra de Google. Eso no quiere decir que la IA no le esté mandando clientes. ChatGPT, Gemini y Claude recomiendan productos con lo que encuentran publicado, y esas recomendaciones ya generan visitas.",
      },
      {
        tipo: "dato",
        valor: "396 %",
        texto:
          "creció en 2025 el tráfico que llega desde herramientas de IA a las tiendas de Tiendanube, según datos de la plataforma citados por Expansión.",
      },
      {
        tipo: "parrafo",
        texto:
          "El dato es de Tiendanube, que tiene más de 180.000 tiendas en América Latina, y lo publicó [Expansión](https://expansion.mx/tecnologia/2026/05/28/chatgpt-gemini-cambian-completo-forma-de-comprar-ropa) en mayo. En otra nota de agosto, [Expansión](https://expansion.mx/tecnologia/2026/08/03/chatgpt-quintuplico-visitas-tiendas-en-linea) agrega que de cada 100 visitas que llegan por recomendación de una IA, entre 3 y 5 terminan en compra. Desde la misma plataforma explican que estos agentes no entran por la página de inicio: van directo al catálogo. Por eso importa tanto cómo está escrita cada ficha de producto.",
      },
      {
        tipo: "parrafo",
        texto:
          "Del lado de los pagos, el movimiento local existe pero todavía en etapa de prueba. En marzo, [Infobae](https://www.infobae.com/economia/2026/03/29/comprar-y-pagar-con-chatgpt-como-se-preparan-los-bancos-las-billeteras-y-las-tarjetas-para-sumar-la-ia-al-e-commerce/) contó que Mastercard había hecho transacciones de prueba con agentes de IA junto al Banco Nación, que Visa estaba probando algo parecido con Santander en cinco países de la región, incluida la Argentina, y que MODO ya tenía una app dentro de ChatGPT funcionando en Estados Unidos, a la espera de habilitarse acá.",
      },
      {
        tipo: "subtitulo",
        texto: "Qué preparar mientras tanto",
      },
      {
        tipo: "parrafo",
        texto:
          "La buena noticia es que casi todo lo que hay que hacer para que una IA recomiende bien tus productos es lo mismo que ya deberías tener para vender bien online. No hay que esperar a que la compra dentro del chat llegue al país para empezar.",
      },
      {
        tipo: "lista",
        items: [
          "**Fichas de producto completas.** Nombre claro, marca, descripción con materiales, medidas, talles y para qué sirve, precio, disponibilidad e imágenes. Son, casi uno por uno, los campos obligatorios que pide el catálogo de OpenAI: título, descripción, link, marca, vendedor, imagen, disponibilidad y precio.",
          "**Descripciones que respondan preguntas.** Un cliente le pregunta a ChatGPT «zapatillas para caminar en ripio, talle 43, que no pasen de tanto». Si tu ficha dice sólo «Zapatilla modelo X negra», no hay nada que la IA pueda usar para recomendarte.",
          "**Precio y stock al día.** El estándar de OpenAI pide actualizar el catálogo apenas cambia un precio o se termina una oferta. Una IA que recomienda un producto sin stock te hace perder la venta y la confianza.",
          "**Código de barras cuando lo tengas.** El GTIN (el número del código de barras) es opcional, pero ayuda a que el producto se identifique sin confusiones.",
          "**Políticas visibles.** Envíos, cambios y devoluciones escritos en la tienda, no sólo en la cabeza de quien atiende el WhatsApp.",
        ],
      },
      {
        tipo: "subtitulo",
        texto: "Mercado Libre, tienda propia o las dos",
      },
      {
        tipo: "parrafo",
        texto:
          "Para la mayoría de los comercios argentinos la pregunta real no es ChatGPT sí o no. Es dónde tener el catálogo bien armado. Mercado Libre te da tráfico y confianza, pero las reglas y el vínculo con el cliente son de la plataforma. Una tienda propia, en Tiendanube o en otra plataforma, te deja controlar cómo se describe cada producto y es la página a la que una IA puede mandarte clientes directamente.",
      },
      {
        tipo: "parrafo",
        texto:
          "Mi recomendación, para un comercio chico o mediano: no dupliques el trabajo. Armá una sola planilla maestra de productos, con las descripciones completas, y desde ahí alimentá Mercado Libre y la tienda propia. Esa planilla ordenada es lo que te va a permitir sumar el canal que venga —ChatGPT, Google o el que aparezca— en días y no en meses.",
      },
      {
        tipo: "parrafo",
        texto:
          "**Actualización, 24 de septiembre.** MODO anunció que su integración con ChatGPT ya está disponible en la Argentina, con Frávega como primer comercio: se puede elegir, comprar y pagar sin salir de la conversación, según [Infobae](https://www.infobae.com/economia/2026/09/24/cambios-en-el-e-commerce-la-billetera-de-los-bancos-se-integra-con-chatgpt-para-elegir-comprar-y-pagar-un-producto-con-ia/). La empresa dice que es un ecosistema abierto al que se irán sumando más comercios, pero todavía no publicó cómo puede hacerlo uno. Por ahora es una señal clara de hacia dónde va la cosa, y otra razón para tener el catálogo en orden.",
      },
      {
        tipo: "parrafo",
        texto:
          "Ordenar el catálogo es una de esas tareas que todo comercio sabe que tiene que hacer y que siempre queda para la semana que viene. Con IA se hace mucho más rápido: redactar descripciones a partir de una planilla, completar datos faltantes, unificar formatos. Es el tipo de trabajo concreto con el que solemos arrancar en el [Programa INTEGRA](/programa-integra), y el primer paso es una Consultoría Estratégica Gratuita.",
      },
      {
        tipo: "fuentes",
        items: [
          {
            label: "Stripe — Stripe powers Instant Checkout in ChatGPT and releases Agentic Commerce Protocol (29 de septiembre de 2025)",
            url: "https://stripe.com/newsroom/news/stripe-openai-instant-checkout",
          },
          {
            label: "Digital Commerce 360 — OpenAI reveals updates to its agentic commerce experience for ChatGPT (24 de marzo de 2026)",
            url: "https://www.digitalcommerce360.com/2026/03/24/openai-agentic-commerce-updates-chatgpt-walmart/",
          },
          {
            label: "OpenAI Developers — Agentic Commerce: especificación del catálogo de productos",
            url: "https://developers.openai.com/commerce/specs/file-upload/products",
          },
          {
            label: "Google Merchant Center — About the Universal Commerce Protocol (UCP)",
            url: "https://support.google.com/merchants/answer/16837055?hl=en",
          },
          {
            label: "Digital Applied — Where ChatGPT Ads are sold: every market, every date",
            url: "https://www.digitalapplied.com/blog/where-chatgpt-ads-are-sold-every-market-and-date",
          },
          {
            label: "Expansión — ChatGPT y Gemini cambian por completo la forma de comprar ropa (28 de mayo de 2026)",
            url: "https://expansion.mx/tecnologia/2026/05/28/chatgpt-gemini-cambian-completo-forma-de-comprar-ropa",
          },
          {
            label: "Expansión — ChatGPT quintuplicó las visitas a tiendas en línea (3 de agosto de 2026)",
            url: "https://expansion.mx/tecnologia/2026/08/03/chatgpt-quintuplico-visitas-tiendas-en-linea",
          },
          {
            label: "Infobae — Comprar y pagar con ChatGPT: cómo se preparan los bancos, las billeteras y las tarjetas (29 de marzo de 2026)",
            url: "https://www.infobae.com/economia/2026/03/29/comprar-y-pagar-con-chatgpt-como-se-preparan-los-bancos-las-billeteras-y-las-tarjetas-para-sumar-la-ia-al-e-commerce/",
          },
          {
            label: "Infobae — La billetera de los bancos se integra con ChatGPT (24 de septiembre de 2026)",
            url: "https://www.infobae.com/economia/2026/09/24/cambios-en-el-e-commerce-la-billetera-de-los-bancos-se-integra-con-chatgpt-para-elegir-comprar-y-pagar-un-producto-con-ia/",
          },
        ],
      },
    ],
  },

  /* =================================================================
     N09 — ¿LA IA VA A REEMPLAZAR EMPLEADOS? LOS DATOS A 2026
     ================================================================= */
  {
    slug: "ia-reemplazar-empleados-datos-2026",
    titulo: "¿La IA va a reemplazar empleados? Lo que dicen los datos en 2026",
    categoria: "Futuro del trabajo",
    fecha: "2026-09-05",
    fechaLabel: "5 de septiembre de 2026",
    lectura: "9 min de lectura",
    resumen:
      "Casi cuatro años después de ChatGPT, ya no hace falta adivinar: hay estudios del mercado laboral con datos reales. Muestran menos destrucción de empleo de la que anuncian los titulares y un cambio más silencioso, que empieza por las tareas y por la contratación de gente joven.",
    img: "/images/blog/ia-reemplazar-empleados-datos-2026.png",
    imgLabel: "/images/blog/ia-reemplazar-empleados-datos-2026.png",
    cuerpo: [
      {
        tipo: "parrafo",
        texto:
          "Es la pregunta que aparece en todas las charlas, a veces al principio y a veces al final, cuando alguien se anima: «¿esto nos va a dejar sin trabajo?». Durante los primeros dos años la única respuesta honesta era «no sabemos». Hoy, a fines de 2026, sabemos bastante más, porque ya no dependemos solo de proyecciones: hay estudios que miran qué pasó de verdad en el mercado laboral.",
      },
      {
        tipo: "parrafo",
        texto:
          "La respuesta corta es que, hasta ahora, la IA no produjo una ola de despidos generalizada. La respuesta larga tiene matices que a un dueño de PyME le conviene conocer, porque algunos ya lo están afectando.",
      },
      {
        tipo: "subtitulo",
        texto: "Tareas, no puestos: la distinción que ordena todo",
      },
      {
        tipo: "parrafo",
        texto:
          "Casi todos los estudios serios parten de la misma idea: la IA no hace puestos, hace tareas. Un puesto es un conjunto de tareas, y muy pocos están hechos enteramente de tareas que una máquina pueda resolver sola. Por eso los organismos internacionales hablan de «exposición»: qué parte del trabajo podría verse afectada, para bien o para mal.",
      },
      {
        tipo: "parrafo",
        texto:
          "La [Organización Internacional del Trabajo](https://www.ilo.org/resource/news/one-four-jobs-risk-being-transformed-genai-new-ilo%E2%80%93nask-global-index-shows) publicó en mayo de 2025 su índice más completo, construido sobre casi 30.000 tareas. Encontró que uno de cada cuatro trabajadores del mundo está en una ocupación con algún grado de exposición a la IA generativa, pero que solo el 3,3 % del empleo mundial cae en la categoría de exposición más alta. Su conclusión textual es que lo más probable para la mayoría de los puestos expuestos es la transformación, no el reemplazo.",
      },
      {
        tipo: "dato",
        valor: "3,3 %",
        texto:
          "del empleo mundial está en la categoría de mayor exposición a la IA generativa, según el índice de la OIT de mayo de 2025. Uno de cada cuatro trabajadores tiene algún grado de exposición.",
      },
      {
        tipo: "parrafo",
        texto:
          "El Fondo Monetario Internacional había llegado a una cifra más alta en enero de 2024: cerca del 40 % del empleo mundial expuesto a la IA, 60 % en las economías avanzadas. Pero el propio FMI aclaraba que exposición no es pérdida: en alrededor de la mitad de esos puestos, la IA podía complementar el trabajo en lugar de reemplazarlo. Las cifras distintas salen de métodos distintos; lo que tienen en común es que ninguna dice que un cuarto o un 40 % de la gente vaya a perder el empleo.",
      },
      {
        tipo: "tabla",
        titulo: "Cuánto trabajo está expuesto a la IA, según quién mide",
        columnas: ["Estudio", "Qué encontró", "Qué no dice"],
        filas: [
          [
            "OIT y NASK, mayo de 2025",
            "25 % del empleo mundial con alguna exposición; 3,3 % en la exposición más alta",
            "Que esos puestos vayan a desaparecer: espera sobre todo transformación",
          ],
          [
            "FMI, enero de 2024",
            "Cerca del 40 % del empleo mundial expuesto; 60 % en economías avanzadas",
            "Que la exposición implique pérdida: en cerca de la mitad, la IA complementa",
          ],
          [
            "OIT y Banco Mundial, julio de 2024 (América Latina)",
            "Entre 26 % y 38 % del empleo regional expuesto; entre 2 % y 5 % en riesgo de automatización total",
            "Que la región esté a salvo: la brecha digital frena también las mejoras de productividad",
          ],
        ],
        fuente: "OIT · FMI · OIT y Banco Mundial, Buffer or Bottleneck?",
      },
      {
        tipo: "subtitulo",
        texto: "Lo que ya se ve en el mercado laboral",
      },
      {
        tipo: "parrafo",
        texto:
          "Las proyecciones son una cosa. Los datos de empleo, otra. Y los estudios que miran datos reales coinciden bastante.",
      },
      {
        tipo: "parrafo",
        texto:
          "El Budget Lab de la Universidad de Yale [analizó en octubre de 2025](https://fortune.com/2025/10/02/ai-job-losses-apocalypse-research-yale) la composición del mercado laboral de Estados Unidos desde el lanzamiento de ChatGPT y no encontró una alteración apreciable. Sus medidas de exposición a la IA no mostraban relación con cambios en el empleo ni en el desempleo, y sus [actualizaciones periódicas](https://budgetlab.yale.edu/research/tracking-impact-ai-labor-market) de 2026 no cambiaron ese cuadro general.",
      },
      {
        tipo: "parrafo",
        texto:
          "Anthropic, la empresa que desarrolla Claude, publicó en marzo de 2026 un [estudio sobre el impacto en el mercado laboral](https://www.anthropic.com/research/labor-market-impacts) que cruza el uso real de su herramienta con datos oficiales de empleo. Tampoco encontró un aumento significativo del desempleo en las ocupaciones más expuestas. Y marcó otra cosa: la distancia entre lo que la IA podría hacer en teoría y lo que efectivamente hace es enorme. En las tareas de informática y matemática, por ejemplo, la teoría hablaba de un 94 % de tareas alcanzables y el uso observado cubría el 33 %. Además, el 30 % de los trabajadores —cocineros, mecánicos, mozos— tenía una exposición observada nula.",
      },
      {
        tipo: "subtitulo",
        texto: "La señal de alerta: la gente joven que no entra",
      },
      {
        tipo: "parrafo",
        texto:
          "Que no haya despidos masivos no significa que no pase nada. El efecto más claro que se registró hasta ahora es otro, más silencioso: se contrata menos gente joven en las ocupaciones más expuestas.",
      },
      {
        tipo: "parrafo",
        texto:
          "El estudio más citado sobre esto es el del Laboratorio de Economía Digital de Stanford, conocido como «Canarios en la mina». Con datos de nómina de millones de trabajadores de Estados Unidos, su [actualización de agosto de 2026](https://digitaleconomy.stanford.edu/news/canariesaug26/) encontró que el empleo de las personas de 22 a 25 años en ocupaciones expuestas a la IA está un 19 % por debajo de donde estaría si hubiera seguido el ritmo de sus pares menos expuestos. Un año antes, la brecha era del 15 %. Para los trabajadores con más experiencia, no aparece una brecha comparable.",
      },
      {
        tipo: "grafico",
        titulo: "Dónde aparece el efecto, por ahora",
        bajada: "Brecha de empleo de los trabajadores de 22 a 25 años en ocupaciones expuestas a la IA, frente a sus pares menos expuestos.",
        barras: [
          { label: "Medición de julio de 2025", valor: 15, texto: "−15 %", tono: "neutro" },
          { label: "Medición de agosto de 2026 (datos a junio)", valor: 19, texto: "−19 %" },
        ],
        nota: "El ajuste pasa sobre todo por menos contrataciones, no por más despidos. Los trabajadores mayores de 25 no muestran una brecha comparable.",
        fuente: "Stanford Digital Economy Lab, Canaries in the Coal Mine? · agosto de 2026",
      },
      {
        tipo: "parrafo",
        texto:
          "Hay dos detalles del mismo estudio que importan. El ajuste ocurre sobre todo porque se contrata menos, no porque se despida más. Y la caída se concentra en las ocupaciones donde la IA automatiza tareas; donde la IA complementa el trabajo, el empleo se mantiene o crece. El estudio de Anthropic encontró algo parecido por otro camino: una caída del 14 % en la tasa con que la gente joven consigue empleo en las ocupaciones expuestas, comparada con 2022, con un margen estadístico ajustado.",
      },
      {
        tipo: "cita",
        texto:
          "Hasta ahora, la IA no está echando gente. Está cambiando a quién se contrata para empezar.",
      },
      {
        tipo: "subtitulo",
        texto: "Qué esperan las empresas",
      },
      {
        tipo: "parrafo",
        texto:
          "El [Future of Jobs Report 2025](https://www.weforum.org/press/2025/01/future-of-jobs-report-2025-78-million-new-job-opportunities-by-2030-but-urgent-upskilling-needed-to-prepare-workforces/) del Foro Económico Mundial, que ya comenté en [el artículo sobre cómo cambian los roles](/blog/como-cambian-los-roles-con-ia), tiene un dato que conviene poner al lado de los anteriores: el 40 % de los empleadores espera reducir personal allí donde la IA pueda automatizar tareas. Pero la respuesta más mencionada no es esa, sino capacitar a su gente, que el 77 % planea hacer.",
      },
      {
        tipo: "parrafo",
        texto:
          "Y del lado de los que usan IA todos los días, la foto tampoco es de pánico. En la [encuesta que Anthropic publicó en junio de 2026](https://www.anthropic.com/research/economic-index-june-2026-report) entre usuarios de Claude, el 10 % consideraba probable o muy probable perder su propio trabajo, y el 57 % decía que la IA había hecho más valiosas sus habilidades. Es gente que ya la adoptó, así que no representa a todos los trabajadores, pero el dato es útil: los que más la usan no son los que más miedo tienen.",
      },
      {
        tipo: "subtitulo",
        texto: "Y en una PyME argentina, ¿qué cambia?",
      },
      {
        tipo: "parrafo",
        texto:
          "No hay todavía un estudio del mercado laboral argentino con la calidad de datos de los de Estados Unidos, así que conviene no inventar certezas. Lo que sí hay son algunas piezas. El informe de la [OIT y el Banco Mundial para América Latina](https://www.ilo.org/resource/news/press-release-ai-latin-america) estima que entre el 26 % y el 38 % del empleo de la región está expuesto, que solo entre el 2 % y el 5 % corre riesgo de automatización total, y que la falta de acceso digital limita justamente las mejoras de productividad.",
      },
      {
        tipo: "parrafo",
        texto:
          "Del lado del uso, el [Anthropic Economic Index](https://www.anthropic.com/economic-index) muestra que en mayo de 2026 Argentina usaba Claude un 48 % más de lo que predeciría su población en edad de trabajar, en el puesto 45 de 121 países, y que cerca del 47 % de esas conversaciones eran de trabajo, algo por encima del promedio mundial. Es un dato de uso, no de empleo: dice que la gente la está usando, no qué le pasa a su puesto.",
      },
      {
        tipo: "parrafo",
        texto:
          "Traducido a una empresa de veinte o cien personas, lo que veo es esto:",
      },
      {
        tipo: "lista",
        items: [
          "**Las tareas administrativas son las primeras en cambiar.** Carga de datos, armado de informes, respuestas a consultas repetidas, conciliaciones. Todos los estudios ubican ahí la mayor exposición. No quiere decir que esos puestos sobren: quiere decir que su semana se va a parecer cada vez menos a la actual.",
          "**El trabajo de planta, depósito, reparto o atención presencial cambia mucho menos.** Buena parte del empleo en las PyMEs argentinas está ahí, y es justamente donde el uso observado es más bajo.",
          "**La decisión más delicada es la de la próxima contratación.** Es donde los datos muestran el efecto real. Antes de reemplazar a alguien que se va o de sumar un puesto junior, vale preguntarse qué tareas va a hacer, y cuáles de ellas ya cambiaron.",
          "**La gente que aprende a trabajar con IA vale más, no menos.** Si una persona de tu equipo resuelve en una mañana lo que antes le llevaba tres días, lo que tenés no es un puesto de sobra: es capacidad para hacer cosas que hoy no hacés.",
        ],
      },
      {
        tipo: "subtitulo",
        texto: "Qué conviene hacer",
      },
      {
        tipo: "parrafo",
        texto:
          "Con los datos disponibles, la postura más razonable no es el alarmismo ni la tranquilidad total. Es mirar las tareas en lugar de los puestos. Tres cosas concretas:",
      },
      {
        tipo: "lista",
        items: [
          "**Hacé el inventario de tareas de dos o tres puestos clave.** Qué hace cada persona en una semana típica, cuánto tiempo le lleva cada cosa, y cuáles de esas tareas son repetitivas y con criterio estable. Es el ejercicio que describí en [el artículo sobre roles](/blog/como-cambian-los-roles-con-ia).",
          "**Decidí antes qué vas a hacer con el tiempo que se libere.** Si no lo decidís, el equipo va a suponer lo peor, y con razón. Más atención al cliente, más seguimiento comercial, menos horas extra: cualquiera de esas respuestas es mejor que el silencio.",
          "**Hablalo con tu equipo con datos, no con promesas.** Nadie puede garantizar qué va a pasar en cinco años. Sí se puede contar qué dicen los estudios hoy y qué piensa hacer la empresa. Por qué ese silencio frena la adopción lo desarrollé en [otro artículo](/blog/empleados-no-quieren-usar-ia-por-que-y-que-hacer).",
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "Los datos van a seguir cambiando, y conviene revisarlos cada tanto sin dramatismo. Lo que no va a cambiar es que las empresas que ordenan sus tareas antes de que el cambio las obligue tienen más margen para decidir cómo lo atraviesan. En el [Programa INTEGRA](/programa-integra) trabajamos exactamente sobre eso: qué tareas de tu empresa conviene tocar primero, con qué criterio y con la gente adentro del proceso, no enfrente.",
      },
      {
        tipo: "fuentes",
        items: [
          {
            label: "OIT — One in four jobs at risk of being transformed by GenAI, mayo de 2025",
            url: "https://www.ilo.org/resource/news/one-four-jobs-risk-being-transformed-genai-new-ilo%E2%80%93nask-global-index-shows",
          },
          {
            label: "FMI — AI Will Transform the Global Economy, enero de 2024",
            url: "https://www.imf.org/en/Blogs/Articles/2024/01/14/ai-will-transform-the-global-economy-lets-make-sure-it-benefits-humanity",
          },
          {
            label: "OIT y Banco Mundial — IA generativa y empleo en América Latina, julio de 2024",
            url: "https://www.ilo.org/resource/news/press-release-ai-latin-america",
          },
          {
            label: "Yale Budget Lab — Tracking the Impact of AI on the Labor Market",
            url: "https://budgetlab.yale.edu/research/tracking-impact-ai-labor-market",
          },
          {
            label: "Fortune — Yale Budget Lab: sin alteración apreciable del empleo, octubre de 2025",
            url: "https://fortune.com/2025/10/02/ai-job-losses-apocalypse-research-yale",
          },
          {
            label: "Anthropic — Labor market impacts of AI: a new measure and early evidence, marzo de 2026",
            url: "https://www.anthropic.com/research/labor-market-impacts",
          },
          {
            label: "Anthropic Economic Index — Cadences, junio de 2026",
            url: "https://www.anthropic.com/research/economic-index-june-2026-report",
          },
          {
            label: "Anthropic Economic Index — datos por país",
            url: "https://www.anthropic.com/economic-index",
          },
          {
            label: "Stanford Digital Economy Lab — Canaries in the Coal Mine?, actualización de agosto de 2026",
            url: "https://digitaleconomy.stanford.edu/news/canariesaug26/",
          },
          {
            label: "World Economic Forum — Future of Jobs Report 2025",
            url: "https://www.weforum.org/press/2025/01/future-of-jobs-report-2025-78-million-new-job-opportunities-by-2030-but-urgent-upskilling-needed-to-prepare-workforces/",
          },
        ],
      },
    ],
  },

  /* =================================================================
     N10 — GOOGLE ADS AI MAX: QUÉ REVISAR EN LAS CAMPAÑAS
     ================================================================= */
  {
    slug: "google-ads-ai-max-que-revisar-campanas",
    titulo: "Google Ads AI Max: qué revisar en tus campañas de búsqueda",
    categoria: "Herramientas",
    fecha: "2026-09-02",
    fechaLabel: "2 de septiembre de 2026",
    lectura: "7 min de lectura",
    resumen:
      "Desde este mes, Google empieza a pasar campañas de búsqueda a AI Max por su cuenta. Qué cambia en cómo se muestran tus anuncios, qué riesgos tiene para una PyME con presupuesto chico y qué revisar esta semana.",
    img: "/images/blog/google-ads-ai-max-que-revisar-campanas.png",
    imgLabel: "/images/blog/google-ads-ai-max-que-revisar-campanas.png",
    cuerpo: [
      {
        tipo: "parrafo",
        texto:
          "En muchas PyMEs las campañas de Google Ads funcionan así: alguien las armó hace un tiempo —una agencia, un sobrino, el mismo dueño un fin de semana—, se cargó una tarjeta y desde entonces nadie las mira demasiado, mientras las consultas sigan llegando. Si ese es tu caso, este mes conviene mirarlas, porque Google está cambiando cómo deciden en qué búsquedas aparecen tus anuncios, qué dicen y a qué página llevan.",
      },
      {
        tipo: "parrafo",
        texto:
          "El cambio se llama AI Max, y este mes empezó la migración automática de una parte de las campañas de búsqueda. No hay que entrar en pánico ni apagar todo. Hay que saber qué se activó y revisar cinco o seis cosas.",
      },
      {
        tipo: "subtitulo",
        texto: "Qué es AI Max, sin vueltas",
      },
      {
        tipo: "parrafo",
        texto:
          "AI Max es un conjunto de funciones que Google agrega a las campañas de búsqueda y que [presentó en mayo de 2025](https://blog.google/products/ads-commerce/google-ai-max-for-search-campaigns/). Son tres cosas distintas, y conviene separarlas porque cada una tiene su riesgo:",
      },
      {
        tipo: "tabla",
        columnas: ["Función", "Qué hace", "Qué puede salir mal"],
        filas: [
          [
            "Coincidencia de términos de búsqueda",
            "Muestra tus anuncios en búsquedas que no están en tus palabras clave, usando concordancia amplia y búsquedas «sin palabra clave» que la IA considera relacionadas",
            "Que aparezcas en búsquedas que no te sirven y pagues clics que nunca iban a comprar",
          ],
          [
            "Personalización de texto",
            "Genera títulos y descripciones nuevos a partir de tus anuncios, tu sitio web y tus palabras clave",
            "Que un anuncio prometa algo que no hacés: un precio, un envío, una garantía",
          ],
          [
            "Expansión de URL final",
            "Elige a qué página de tu sitio mandar a cada persona, en lugar de la que definiste vos",
            "Que el clic termine en una nota del blog, en «Trabajá con nosotros» o en un producto sin stock",
          ],
        ],
      },
      {
        tipo: "subtitulo",
        texto: "Por qué te puede tocar aunque no hayas hecho nada",
      },
      {
        tipo: "parrafo",
        texto:
          "Google anunció que a partir de septiembre de 2026 pasa a AI Max, de forma automática, a las campañas de búsqueda que usaban dos configuraciones viejas: los recursos creados automáticamente y la concordancia amplia a nivel de campaña. En las primeras se activan la coincidencia de términos y la personalización de texto; en las segundas, la coincidencia de términos. Los anuncios dinámicos de búsqueda también van a pasar a AI Max, pero Google [corrió esa fecha a febrero de 2027](https://blog.google/products/ads-commerce/dsa-upgrade-to-ai-max-2026/).",
      },
      {
        tipo: "parrafo",
        texto:
          "Además, según la [ayuda de Google Ads](https://support.google.com/google-ads/answer/15909989?hl=en), las campañas de búsqueda nuevas ya se crean con AI Max activado. Si alguien armó una campaña en los últimos meses y aceptó lo que venía por defecto, lo más probable es que lo tenga prendido.",
      },
      {
        tipo: "subtitulo",
        texto: "Lo que promete Google, y cómo leerlo",
      },
      {
        tipo: "dato",
        valor: "14 %",
        texto:
          "más de conversiones o de valor de conversión, a un costo por conversión similar, es lo que Google dice que obtienen típicamente los anunciantes que activan AI Max. El dato sale de mediciones internas de Google.",
      },
      {
        tipo: "parrafo",
        texto:
          "Puede ser cierto en promedio y no ser cierto en tu cuenta. Ese número se apoya en que la cuenta mida bien sus conversiones y tenga presupuesto para que el sistema aprenda. La misma ayuda de Google dice que AI Max [no va a ser efectivo si la campaña está limitada por presupuesto](https://support.google.com/google-ads/answer/15910187?hl=en), y que la coincidencia de términos, la expansión de URL y la personalización de texto necesitan estrategias de oferta automáticas basadas en conversiones. Una PyME que invierte poco, con conversiones mal configuradas, está justo en el caso donde el promedio menos la representa.",
      },
      {
        tipo: "subtitulo",
        texto: "Los riesgos concretos para una PyME",
      },
      {
        tipo: "lista",
        items: [
          "**Que el sistema optimice hacia algo que no es una venta.** Si la «conversión» configurada es una visita a la página de contacto o un clic en el botón de WhatsApp, AI Max va a buscar más de eso, aunque esas personas nunca compren.",
          "**Que el presupuesto se reparta entre más búsquedas.** Con un presupuesto diario chico, abrir el abanico puede sacarle plata a las búsquedas que ya funcionaban.",
          "**Que los textos generados digan lo que no querés.** Precios, plazos de entrega, «envío gratis», cuotas: la IA arma los textos con lo que encuentra en tu sitio, incluso si esa página está desactualizada.",
          "**Que aparezcas buscando a la competencia, o pagues por tu propia marca.** Con la coincidencia ampliada, tus anuncios pueden salir en búsquedas de otras marcas, o en las de tu nombre, que igual te iban a encontrar.",
          "**Que los clics lleguen a la página equivocada.** Con la expansión de URL, Google puede elegir una página que no fue pensada para vender.",
        ],
      },
      {
        tipo: "subtitulo",
        texto: "Qué revisar esta semana",
      },
      {
        tipo: "parrafo",
        texto:
          "Nada de esto requiere ser especialista. Requiere una hora con la cuenta abierta y, si las campañas las maneja una agencia, hacerle estas preguntas por escrito.",
      },
      {
        tipo: "lista",
        items: [
          "**Si AI Max está activado y qué funciones.** En la configuración de cada campaña hay una sección AI Max. Ahí se ve si está prendido y cuáles de las tres funciones: la personalización de texto y la expansión de URL se pueden manejar por separado, aunque la expansión de URL necesita la personalización de texto activada.",
          "**Qué se está midiendo como conversión.** Si no es una venta, un pedido de presupuesto o una consulta real, arreglá eso antes que cualquier otra cosa.",
          "**El informe de términos de búsqueda.** Filtrá la columna de tipo de concordancia por «AI Max» y vas a ver las búsquedas que vinieron por la ampliación, según el [informe de AI Max](https://support.google.com/google-ads/answer/16470459). Durante el primer mes, miralo una vez por semana.",
          "**Las palabras clave negativas.** Se siguen respetando con AI Max activado, según las [preguntas frecuentes de Google](https://support.google.com/google-ads/answer/15913066?hl=en). Todo lo que aparezca en el informe y no te sirva —«gratis», «empleo», «usado», productos que no vendés— va a la lista de negativas.",
          "**Las exclusiones de URL.** En el informe de páginas de destino se ven las URL que eligió la expansión. Las que no sirven para vender se excluyen desde la configuración de AI Max de la campaña.",
          "**Los controles de marca.** Se pueden excluir marcas a nivel de campaña (tu propio nombre en las campañas que no son de marca, o competidores) e incluir marcas a nivel de campaña o de grupo de anuncios.",
          "**Las pautas de texto.** Si la personalización de texto está activa, podés cargar hasta 25 términos excluidos y hasta 40 restricciones de mensaje por campaña, escritas en tus palabras, como «no mencionar envío gratis». Un detalle de la [ayuda de Google](https://support.google.com/google-ads/answer/16489313?hl=en-GB): excluir términos no evita que se generen textos con precios; para eso hace falta una restricción de mensaje. Desde febrero, esta función está [disponible para todos los anunciantes](https://blog.google/products/ads-commerce/text-guidelines-beta-global-expansion/) y en todos los idiomas.",
          "**Las ubicaciones.** Si vendés en una zona, revisá la segmentación geográfica y, a nivel de grupo de anuncios, las ubicaciones de interés que ofrece AI Max.",
        ],
      },
      {
        tipo: "tabla",
        titulo: "Una rutina mínima para el primer mes",
        columnas: ["Qué mirar", "Dónde", "Cada cuánto"],
        filas: [
          ["Búsquedas que trajo AI Max", "Informe de términos de búsqueda, filtrado por «AI Max»", "Semanal"],
          ["Páginas a las que mandó los clics", "Informe de páginas de destino", "Semanal"],
          ["Títulos y descripciones generados", "Informe de recursos (marcados como «Google AI»)", "Cada quince días"],
          ["Costo por conversión real, antes y después", "Resumen de la campaña, comparando períodos", "Al cumplir cuatro semanas"],
        ],
      },
      {
        tipo: "subtitulo",
        texto: "¿Lo apago o lo dejo?",
      },
      {
        tipo: "parrafo",
        texto:
          "Se puede apagar. Google avisa que, si lo hacés, se desactivan todas las funciones de AI Max, incluidas las exclusiones de marca. Mi sugerencia es no decidir por intuición ni por lo que dice un foro: decidir con los números de tu cuenta.",
      },
      {
        tipo: "parrafo",
        texto:
          "Google tiene experimentos que dividen el tráfico de la campaña en dos, una mitad con AI Max y otra sin, y en agosto [sumó herramientas para probarlo](https://blog.google/products/ads-commerce/ai-max-testing-planning-tools/) manteniendo activos los controles de marca y ubicación. Si tu campaña tiene volumen suficiente, es la forma más limpia de saber si te conviene. Definí antes de empezar qué número te haría quedarte con AI Max y cuál te haría apagarlo; es el mismo principio que uso para [cualquier prueba con IA](/blog/cuando-abandonar-una-prueba-de-ia). Si la campaña es muy chica para un experimento, la alternativa es la rutina de la tabla de arriba durante un mes y una comparación honesta del costo por conversión real.",
      },
      {
        tipo: "cita",
        texto: "Que Google decida más cosas por vos no es malo en sí. Lo malo es que nadie en tu empresa esté mirando qué decidió.",
      },
      {
        tipo: "parrafo",
        texto:
          "AI Max es un ejemplo de algo que va a pasar cada vez más: herramientas que ya usás incorporan IA que toma decisiones sola, sin que nadie lo haya pedido. No hace falta resistirse, pero sí que haya alguien en la empresa que sepa qué se activó y lo revise. En el [Programa INTEGRA](/programa-integra) trabajamos eso con los equipos: que cada herramienta tenga un responsable y un momento fijo para mirar si está dando resultado.",
      },
      {
        tipo: "fuentes",
        items: [
          {
            label: "Google — Presentación de AI Max para campañas de búsqueda (mayo de 2025)",
            url: "https://blog.google/products/ads-commerce/google-ai-max-for-search-campaigns/",
          },
          {
            label: "Google — Los anuncios dinámicos de búsqueda pasan a AI Max (actualizado en junio de 2026)",
            url: "https://blog.google/products/ads-commerce/dsa-upgrade-to-ai-max-2026/",
          },
          {
            label: "Google Ads Help — About AI Max for Search campaigns",
            url: "https://support.google.com/google-ads/answer/15910366?hl=en",
          },
          {
            label: "Google Ads Help — How AI Max for Search campaigns works",
            url: "https://support.google.com/google-ads/answer/15910187?hl=en",
          },
          {
            label: "Google Ads Help — Set up AI Max for Search campaigns",
            url: "https://support.google.com/google-ads/answer/15909989?hl=en",
          },
          {
            label: "Google Ads Help — About reporting in AI Max for Search campaigns",
            url: "https://support.google.com/google-ads/answer/16470459",
          },
          {
            label: "Google Ads Help — Frequently asked questions about AI Max",
            url: "https://support.google.com/google-ads/answer/15913066?hl=en",
          },
          {
            label: "Google Ads Help — Use text guidelines with Performance Max and Search campaigns",
            url: "https://support.google.com/google-ads/answer/16489313?hl=en-GB",
          },
          {
            label: "Google — Pautas de texto disponibles para todos los anunciantes (febrero de 2026)",
            url: "https://blog.google/products/ads-commerce/text-guidelines-beta-global-expansion/",
          },
          {
            label: "Google — Nuevas herramientas para probar y planificar AI Max (agosto de 2026)",
            url: "https://blog.google/products/ads-commerce/ai-max-testing-planning-tools/",
          },
        ],
      },
    ],
  },

  /* =================================================================
     N11 — CÓMO MEDIR SI LA IA LE SIRVE A TU PYME
     ================================================================= */
  {
    slug: "como-medir-si-ia-sirve-pyme",
    titulo: "Cómo medir si la IA le sirve a tu PyME",
    categoria: "Método",
    fecha: "2026-08-30",
    fechaLabel: "30 de agosto de 2026",
    lectura: "9 min de lectura",
    resumen:
      "«La gente la usa bastante» no es una medición. Qué medir antes de empezar, cómo contar tiempo, calidad, errores y uso real en tareas concretas, y con qué resultados conviene adoptar, ajustar o descartar.",
    img: "/images/blog/como-medir-si-ia-sirve-pyme.png",
    imgLabel: "/images/blog/como-medir-si-ia-sirve-pyme.png",
    cuerpo: [
      {
        tipo: "parrafo",
        texto:
          "Cuando pregunto en una empresa si la IA les está sirviendo, la respuesta más común es «sí, la gente la usa bastante». Después pregunto cuánto tiempo ahorraron, en qué tarea, comparado con qué. Ahí la conversación se pone más lenta.",
      },
      {
        tipo: "parrafo",
        texto:
          "No es falta de interés. Es que casi nadie midió cómo estaban las cosas antes de empezar, y sin ese número cualquier respuesta es una impresión. El problema es que las impresiones sobre la IA tienen un sesgo conocido: suelen ser más optimistas que la realidad.",
      },
      {
        tipo: "subtitulo",
        texto: "La sensación de ir más rápido no es ir más rápido",
      },
      {
        tipo: "parrafo",
        texto:
          "En 2025, el instituto METR hizo un experimento con 16 programadores con experiencia, sobre 246 tareas reales de sus propios proyectos. Antes de empezar, esperaban que la IA los hiciera un 24 % más rápidos. Al terminar, creían que los había acelerado un 20 %. [La medición mostró lo contrario](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/): con IA tardaron un 19 % más.",
      },
      {
        tipo: "dato",
        valor: "+19 %",
        texto:
          "más de tiempo tardaron programadores experimentados usando IA, mientras creían haber ido un 20 % más rápido. METR, julio de 2025.",
      },
      {
        tipo: "parrafo",
        texto:
          "Es un estudio chico, sobre un tipo de trabajo muy específico, y no dice que la IA no sirva. Dice algo más útil: que la percepción de quien la usa no alcanza para saberlo. La misma distancia aparece a escala. El [State of AI 2026 de McKinsey](https://www.theregister.com/ai-and-ml/2026/08/25/mckinsey-says-enterprise-ai-is-finally-on-the-road-to-roi/5292388), con 1.719 encuestados, encontró que el 80 % de quienes usan IA en su trabajo dice que mejoró su productividad, pero solo el 37 % atribuye a la IA algún impacto en el resultado operativo de su empresa.",
      },
      {
        tipo: "grafico",
        titulo: "Lo que se siente y lo que llega al resultado",
        bajada: "Porcentaje de encuestados que afirma cada punto.",
        barras: [
          { label: "Dice que la IA mejoró su productividad individual", valor: 80, texto: "80 %" },
          {
            label: "Atribuye a la IA algún impacto en el resultado operativo (EBIT)",
            valor: 37,
            texto: "37 %",
            tono: "neutro",
          },
        ],
        nota: "Entre una cosa y la otra hay una tarea que alguien tiene que medir.",
        fuente: "McKinsey, The state of AI in 2026: On the road to ROI · agosto de 2026",
      },
      {
        tipo: "parrafo",
        texto:
          "Parte de esa distancia se explica por algo muy simple. En su edición de marzo de 2025, [McKinsey encontró](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-how-organizations-are-rewiring-to-capture-value) que menos de una de cada cinco organizaciones seguía indicadores concretos de sus soluciones de IA generativa, y que esa era, entre todas las prácticas que analizaron, la que más se asociaba con el impacto en el resultado. Medir no es un trámite posterior. Es parte de lo que hace que funcione.",
      },
      {
        tipo: "subtitulo",
        texto: "Antes de empezar: la línea de base",
      },
      {
        tipo: "parrafo",
        texto:
          "La línea de base es cómo está la tarea hoy, sin IA. Sin ella, dentro de un mes vas a tener un número suelto que no se compara con nada. Tomarla no requiere un sistema ni un cronómetro. Alcanza con esto:",
      },
      {
        tipo: "lista",
        items: [
          "**Una tarea, no un área.** «Responder las consultas que llegan por mail», no «atención al cliente».",
          "**Diez casos anotados.** Durante una o dos semanas, quien hace la tarea anota en una planilla la hora de inicio y de fin de diez casos. No hace falta más precisión que esa.",
          "**Cuántas veces por semana pasa.** El volumen es lo que convierte minutos en horas.",
          "**Cuántos casos vuelven.** Un error que llega al cliente, una corrección de un jefe, un retrabajo. Aunque sea un conteo aproximado.",
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "Lo importante es anotarlo antes de probar nada. Una estimación escrita el primer día vale más que un dato exacto reconstruido de memoria un mes después, cuando ya todos quieren que haya funcionado.",
      },
      {
        tipo: "subtitulo",
        texto: "Las cuatro cosas que conviene medir",
      },
      {
        tipo: "tabla",
        titulo: "Qué medir y dónde está la trampa",
        columnas: ["Qué", "Cómo se mide", "La trampa típica"],
        filas: [
          [
            "Tiempo",
            "Minutos por caso, contando la revisión humana, contra la línea de base",
            "Medir solo lo que tarda la IA y olvidarse del tiempo de revisar y corregir",
          ],
          [
            "Calidad",
            "Una persona que no hizo la tarea revisa una muestra con un criterio escrito antes",
            "Que evalúe el mismo que la hizo, que siempre la va a ver mejor",
          ],
          [
            "Errores",
            "Cuántos llegan al cliente, al sistema o a otra área, y cuántos se frenan antes",
            "Contar errores solo cuando alguien se queja, que es cuando ya es tarde",
          ],
          [
            "Uso real",
            "Qué parte de los casos de la semana se hizo de la nueva forma y cuántas personas la usaron",
            "Contar licencias pagadas o gente capacitada en lugar de casos resueltos",
          ],
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "La columna de errores es la que más se saltea y la que más importa. Una tarea puede hacerse en la mitad del tiempo y estar produciendo, sin que nadie lo note, resultados peores. Por eso, en cualquier medición, tiempo y calidad van juntos. Uno sin el otro no dice nada.",
      },
      {
        tipo: "subtitulo",
        texto: "Tres tareas, tres formas de medirlas",
      },
      {
        tipo: "tabla",
        titulo: "Ejemplos de medición en tareas comunes de una PyME",
        columnas: ["Tarea", "Línea de base", "Qué mirar durante la prueba"],
        filas: [
          [
            "Responder consultas de clientes por mail",
            "Tiempo desde que entra la consulta hasta la primera respuesta, y cuántas respuestas necesitaron una segunda aclaración",
            "Mismo tiempo, más una revisión semanal de diez respuestas hecha por alguien que conoce al cliente",
          ],
          [
            "Armar presupuestos comerciales",
            "Horas entre el pedido y el envío, y cuántos presupuestos salieron con un precio o una condición mal",
            "Mismo tiempo, errores de precio encontrados antes de enviar y errores encontrados después",
          ],
          [
            "Cargar facturas de proveedores",
            "Facturas cargadas por hora y diferencias encontradas al conciliar a fin de mes",
            "Qué porcentaje pasa sin corrección y cuántas diferencias aparecen en la conciliación",
          ],
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "Un ejemplo con números, para que se vea la cuenta. Supongamos que entran 60 consultas por semana y cada una lleva 12 minutos: son 12 horas semanales. Si con IA el borrador sale en 5 minutos y revisarlo lleva 4, cada consulta pasa a 9 minutos y la semana a 9 horas. El ahorro no son los 7 minutos que parece a primera vista, son 3 por consulta: 3 horas por semana, unas 12 por mes. Es un buen resultado, pero bastante menos espectacular que el que uno se imagina mirando lo rápido que escribe la herramienta.",
      },
      {
        tipo: "cita",
        texto:
          "El ahorro real se mide con la revisión incluida. Si no, estás midiendo lo rápido que escribe la IA, no lo rápido que trabaja tu equipo.",
      },
      {
        tipo: "subtitulo",
        texto: "Qué resultados son razonables esperar",
      },
      {
        tipo: "parrafo",
        texto:
          "Tener una referencia ayuda a no decepcionarse ni entusiasmarse de más. Una encuesta a trabajadores de Estados Unidos analizada por la [Reserva Federal de St. Louis](https://www.stlouisfed.org/on-the-economy/2025/feb/impact-generative-ai-work-productivity) encontró que quienes usaban IA generativa ahorraban en promedio el 5,4 % de sus horas de trabajo: unas 2,2 horas en una semana de 40. Un tercio de esos usuarios ahorraba una hora o menos; uno de cada cinco, cuatro horas o más.",
      },
      {
        tipo: "parrafo",
        texto:
          "El otro dato que conviene tener a mano viene de un estudio de Erik Brynjolfsson y otros investigadores sobre [5.179 agentes de atención al cliente](https://www.nber.org/papers/w31161). Con un asistente de IA, resolvieron en promedio un 14 % más de consultas por hora. Pero la mejora no fue pareja: los más nuevos y menos experimentados mejoraron un 34 %, y en los más experimentados el efecto fue mínimo.",
      },
      {
        tipo: "parrafo",
        texto:
          "Eso tiene una consecuencia práctica para la medición: mirá el resultado por persona, no solo el promedio. Si la mejora se concentra en los que recién empiezan, la IA está funcionando como una forma de pasar lo que saben los más experimentados al resto. Y eso, en empresas donde hay una o dos personas que saben mucho y no logran contagiar al equipo, puede valer más que las horas ahorradas.",
      },
      {
        tipo: "subtitulo",
        texto: "Cuánto se usa de verdad",
      },
      {
        tipo: "parrafo",
        texto:
          "Hay una métrica que casi nadie mira y que explica muchos fracasos: qué parte de los casos se está haciendo de la nueva forma. Una herramienta puede funcionar muy bien y no mover ningún número porque la usa una sola persona de seis. Los planes de empresa suelen mostrar el uso en el panel de administración; si no, alcanza con preguntar una vez por semana cuántos casos se hicieron de cada manera.",
      },
      {
        tipo: "parrafo",
        texto:
          "Cuando el uso es bajo, el problema casi nunca es la herramienta. Es que nadie decidió que la tarea se hace así ahora, o que a la persona que la hace nadie le mostró cómo, o que lo nuevo todavía cuesta un poco más y aparece una urgencia. Se arregla distinto que un problema de calidad, y por eso conviene medirlos por separado.",
      },
      {
        tipo: "subtitulo",
        texto: "Adoptar, ajustar o descartar",
      },
      {
        tipo: "parrafo",
        texto:
          "Con las cuatro mediciones sobre la mesa, al final del plazo la decisión suele ser bastante clara. Lo ideal es haber escrito los umbrales [antes de empezar](/blog/cuando-abandonar-una-prueba-de-ia); si no se hizo, esta tabla sirve de guía:",
      },
      {
        tipo: "tabla",
        titulo: "Qué hacer según lo que muestran los números",
        columnas: ["Lo que muestran", "Decisión"],
        filas: [
          [
            "El tiempo baja, la calidad se mantiene o mejora y la mayoría del equipo lo usa",
            "Adoptar: escribir cómo se hace, sumar a quienes faltan y pasar a la siguiente tarea",
          ],
          [
            "El tiempo baja pero aparecen errores o cae la calidad",
            "Ajustar la tarea: achicarla a la parte que sale bien o sumar un control antes de que el resultado salga",
          ],
          [
            "Funciona bien, pero lo usa una o dos personas",
            "Ajustar la adopción, no la herramienta: quién enseña, cuándo, y qué se deja de hacer de la forma vieja",
          ],
          [
            "No hay mejora de tiempo después del plazo, o hubo errores graves",
            "Descartar, y [dejar escrito por qué](/blog/descartar-una-iniciativa-de-ia-con-evidencia)",
          ],
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "Durante la prueba, la medición se mira una vez por semana, en la [reunión de seguimiento](/blog/reunion-semanal-de-adopcion-de-ia). Una vez adoptada, alcanza con una revisión mensual de las mismas cuatro cosas, para detectar a tiempo si el uso se cae o si la calidad empieza a bajar.",
      },
      {
        tipo: "parrafo",
        texto:
          "Medir así parece más trabajo del que vale una prueba chica. Pero es lo único que te permite contestar, dentro de tres meses, si la IA le sirve a tu empresa con un número en lugar de una impresión. En el [Programa INTEGRA](/programa-integra) la línea de base se toma antes de probar cualquier herramienta, y cada tarea termina con una de esas tres decisiones.",
      },
      {
        tipo: "fuentes",
        items: [
          {
            label: "METR — Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity, julio de 2025",
            url: "https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/",
          },
          {
            label: "The Register — McKinsey says enterprise AI is finally on the road to ROI, agosto de 2026",
            url: "https://www.theregister.com/ai-and-ml/2026/08/25/mckinsey-says-enterprise-ai-is-finally-on-the-road-to-roi/5292388",
          },
          {
            label: "McKinsey — The state of AI in 2026: On the road to ROI",
            url: "https://www.mckinsey.com/~/media/mckinsey/business%20functions/quantumblack/our%20insights/the%20state%20of%20ai/the-state-of-ai-in-2026-on-the-road-to-roi.pdf",
          },
          {
            label: "McKinsey — The state of AI: How organizations are rewiring to capture value, marzo de 2025",
            url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-how-organizations-are-rewiring-to-capture-value",
          },
          {
            label: "Federal Reserve Bank of St. Louis — The Impact of Generative AI on Work Productivity, febrero de 2025",
            url: "https://www.stlouisfed.org/on-the-economy/2025/feb/impact-generative-ai-work-productivity",
          },
          {
            label: "Brynjolfsson, Li y Raymond — Generative AI at Work (NBER)",
            url: "https://www.nber.org/papers/w31161",
          },
        ],
      },
    ],
  },

  /* =================================================================
     N12 — QUÉ ES UN AGENTE DE IA Y EN QUÉ SE DIFERENCIA DE UN CHATBOT
     ================================================================= */
  {
    slug: "que-es-agente-ia-diferencia-chatbot",
    titulo: "Qué es un agente de IA y en qué se diferencia de un chatbot",
    categoria: "Herramientas",
    fecha: "2026-08-27",
    fechaLabel: "27 de agosto de 2026",
    lectura: "8 min de lectura",
    resumen:
      "Un chatbot te contesta. Un agente hace cosas en tus sistemas: busca, carga, manda, decide el próximo paso. Qué pueden hacer hoy de verdad en una PyME, qué todavía no, y qué controles poner antes de dejarlos actuar.",
    img: "/images/blog/que-es-agente-ia-diferencia-chatbot.png",
    imgLabel: "/images/blog/que-es-agente-ia-diferencia-chatbot.png",
    cuerpo: [
      {
        tipo: "parrafo",
        texto:
          "En los últimos meses, la palabra «agente» aparece en casi todas las conversaciones sobre IA. Los proveedores la usan para vender, los medios para titular y muchos dueños de PyME me la traen como pregunta: «¿necesito un agente?». Antes de contestar, vale la pena entender qué es, porque buena parte de lo que hoy se ofrece con ese nombre no lo es.",
      },
      {
        tipo: "subtitulo",
        texto: "La diferencia, en una frase",
      },
      {
        tipo: "parrafo",
        texto:
          "Un chatbot conversa: le preguntás algo y te devuelve un texto. Lo que hacés con ese texto depende de vos. Un agente actúa: recibe un objetivo, decide qué pasos seguir, usa herramientas —tu correo, una planilla, el sistema de gestión, un buscador— y va ajustando el camino según lo que encuentra, hasta terminar o hasta que necesita que alguien intervenga.",
      },
      {
        tipo: "parrafo",
        texto:
          "Anthropic lo definió con bastante precisión en una [guía publicada en diciembre de 2024](https://www.anthropic.com/research/building-effective-agents), que sigue siendo una de las referencias más usadas. Distingue dos cosas que en el mercado se mezclan todo el tiempo: los **flujos de trabajo**, donde un modelo de IA sigue un camino fijo, definido de antemano, y los **agentes**, donde el propio modelo decide sus pasos y qué herramientas usar.",
      },
      {
        tipo: "tabla",
        titulo: "Chatbot, flujo automatizado y agente",
        columnas: ["", "Chatbot", "Flujo automatizado con IA", "Agente"],
        filas: [
          [
            "Qué hace",
            "Responde preguntas y redacta textos",
            "Sigue siempre los mismos pasos, con IA en alguno de ellos",
            "Decide los pasos para llegar a un objetivo",
          ],
          [
            "Toca tus sistemas",
            "No, salvo que copies y pegues",
            "Sí, en los puntos que se programaron",
            "Sí, según lo que el agente decida en cada momento",
          ],
          [
            "Ejemplo en una PyME",
            "Pedirle un borrador de respuesta a un reclamo",
            "Cada mail con factura adjunta se lee, se extraen los datos y se cargan en una planilla",
            "Revisar los pedidos pendientes, averiguar cuáles tienen stock, avisar a cada cliente y dejar anotado lo que no pudo resolver",
          ],
          [
            "Riesgo si se equivoca",
            "Bajo: una persona lee antes de usar",
            "Medio: el error se repite igual en todos los casos",
            "Más alto: el error puede encadenarse con otros pasos",
          ],
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "La columna del medio es la que más le sirve hoy a una PyME, y es la que menos se nombra porque suena menos novedosa. La misma guía de Anthropic recomienda buscar siempre la solución más simple posible y sumar complejidad solo cuando hace falta, y advierte que los agentes cambian velocidad y costo por flexibilidad, con el riesgo de que los errores se acumulen.",
      },
      {
        tipo: "cita",
        texto:
          "Si podés escribir los pasos de una tarea en una hoja, probablemente no necesitás un agente. Necesitás un flujo que los siga siempre igual.",
      },
      {
        tipo: "subtitulo",
        texto: "Tareas donde un agente tiene sentido",
      },
      {
        tipo: "parrafo",
        texto:
          "Un agente vale la pena cuando la tarea tiene un objetivo claro pero el camino cambia según el caso, y cuando equivocarse en un paso intermedio no es grave porque alguien revisa antes del final. Algunos ejemplos que tienen sentido en empresas chicas y medianas:",
      },
      {
        tipo: "lista",
        items: [
          "**Preparar una cotización.** El agente lee el pedido del cliente, busca los productos en la lista de precios, arma el borrador con las condiciones habituales y lo deja listo para que un vendedor lo revise y lo mande.",
          "**Seguir cobranzas.** Revisa qué facturas vencieron, arma un recordatorio distinto según la antigüedad y el historial de cada cliente, y deja para una persona los casos raros: montos grandes, clientes con reclamos abiertos.",
          "**Investigar antes de una reunión.** Junta lo que hay en la web sobre una empresa, lo cruza con el historial de compras en tu sistema y te deja un resumen de una página.",
          "**Ordenar lo que entra.** Lee los mails de proveedores, identifica cuáles traen listas de precios nuevas, compara con las anteriores y marca las subas que superan un porcentaje.",
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "En los cuatro casos hay algo en común: el agente prepara y una persona decide. Esa división no es timidez; es lo que hoy funciona.",
      },
      {
        tipo: "subtitulo",
        texto: "Lo que todavía no pueden hacer bien",
      },
      {
        tipo: "parrafo",
        texto:
          "El experimento más instructivo que conozco sobre esto lo hizo la propia Anthropic. En el [Project Vend](https://www.anthropic.com/research/project-vend-1), publicado en junio de 2025, le dieron a una versión de Claude la gestión de un pequeño kiosco en su oficina durante alrededor de un mes: podía buscar proveedores en la web, mandar mails, llevar notas, atender a los clientes por chat y cambiar precios. El resultado: vendió productos por debajo del costo, regaló descuentos a quien se los pedía con suficiente insistencia, dejó pasar oportunidades de ganancia claras e inventó una cuenta de pago que no existía. La conclusión de la propia empresa fue que, si tuvieran que contratar a alguien para ese kiosco, no lo contratarían.",
      },
      {
        tipo: "parrafo",
        texto:
          "La [segunda etapa](https://www.anthropic.com/research/project-vend-2), publicada en diciembre de 2025, es igual de interesante. Con modelos más nuevos, mejores herramientas y procedimientos más estrictos, el kiosco dejó de perder plata casi todas las semanas. Pero siguieron apareciendo problemas: empleados que lo convencían de saltearse las reglas financieras y decisiones ingenuas que podían tener problemas legales. Una de las lecciones que sacaron es muy de PyME: los procedimientos y los controles, eso que a veces llamamos burocracia, protegen contra los errores.",
      },
      {
        tipo: "lista",
        items: [
          "**No tienen buen criterio comercial propio.** Tienden a complacer al que les habla, y eso en una negociación es un problema.",
          "**Se los puede manipular.** Un mail o un mensaje bien armado puede hacer que un agente haga algo que no debería. Cuanto más acceso tiene, más grave es.",
          "**Los errores se encadenan.** Un dato mal leído en el paso dos termina en una acción equivocada en el paso siete, y nadie lo vio en el medio.",
          "**Las tareas largas siguen siendo frágiles.** El instituto METR [midió en 2025](https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/) que la duración de las tareas que los agentes pueden completar se venía duplicando cada siete meses aproximadamente. Es un avance enorme, pero la medición toma como referencia la mitad de los intentos exitosos, y en una empresa acertar la mitad de las veces no alcanza.",
        ],
      },
      {
        tipo: "subtitulo",
        texto: "Cuidado con los agentes que no son agentes",
      },
      {
        tipo: "parrafo",
        texto:
          "Gartner publicó en junio de 2025 una [predicción](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027) que conviene tener a mano cuando llega una oferta: más del 40 % de los proyectos de agentes de IA se van a cancelar antes de fines de 2027, por costos que crecen, valor poco claro o controles de riesgo insuficientes. En el mismo informe describió lo que llamó «agent washing»: productos existentes, como asistentes, chatbots o automatizaciones de siempre, que se vuelven a vender con la etiqueta de agente sin serlo. Según su estimación, de los miles de proveedores que dicen ofrecer agentes, unos 130 lo hacen de verdad.",
      },
      {
        tipo: "parrafo",
        texto:
          "Las empresas grandes tampoco están tan adelantadas como parece. El [State of AI 2025 de McKinsey](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai) encontró que el 23 % de las organizaciones está usando agentes a escala en alguna parte de su negocio y otro 39 % recién empezó a probarlos. Y en ninguna función en particular —ventas, finanzas, atención— más del 10 % los usa a escala.",
      },
      {
        tipo: "dato",
        valor: "+40 %",
        texto:
          "de los proyectos de agentes de IA se cancelarán antes de fines de 2027, según Gartner, por costos crecientes, valor poco claro o controles de riesgo insuficientes.",
      },
      {
        tipo: "subtitulo",
        texto: "Los controles, antes de darle acceso a nada",
      },
      {
        tipo: "parrafo",
        texto:
          "Si vas a probar un agente, estas son las reglas que pondría antes de conectarlo a cualquier sistema de la empresa:",
      },
      {
        tipo: "lista",
        items: [
          "**Que proponga antes de ejecutar.** Las primeras semanas, el agente deja todo como borrador: la cotización, el mail, la carga. Una persona aprueba. Recién cuando se ve que acierta, se le deja hacer sola la parte de menor riesgo.",
          "**Acceso mínimo.** Solo a lo que necesita para esa tarea. Si prepara cotizaciones, lee la lista de precios; no necesita entrar al banco.",
          "**Nada irreversible sin una persona.** Pagar, borrar, mandar algo a un cliente, cambiar un precio: siempre con aprobación humana.",
          "**Límites explícitos.** Montos máximos, cantidad de mails por día, clientes que no toca. Escritos, no supuestos.",
          "**Registro de todo lo que hizo.** Qué leyó, qué decidió y qué hizo, en un lugar que alguien revisa. Sin registro, un error se descubre cuando lo reclama un cliente.",
          "**Un dueño con nombre.** Alguien de la empresa responde por lo que hace el agente. Si nadie responde, no está listo para funcionar.",
        ],
      },
      {
        tipo: "subtitulo",
        texto: "Por dónde empezar",
      },
      {
        tipo: "parrafo",
        texto:
          "La mayoría de las PyMEs con las que trabajo no necesita un agente como primer paso. Necesita resolver bien una tarea con IA, con un criterio claro sobre qué datos se usan y quién revisa. Si eso todavía no pasó, un agente no lo va a resolver: va a automatizar el desorden.",
      },
      {
        tipo: "lista",
        items: [
          "**Elegí una tarea repetitiva que hoy te consuma horas.** Con pasos que alguien del equipo pueda explicar en diez minutos. Cómo elegirla lo expliqué en [este artículo](/blog/por-donde-empezar-a-implementar-ia-en-una-empresa).",
          "**Resolvela primero con un chat y una persona.** Si con el chat común ya no sale bien, un agente tampoco va a sacarla bien. Qué se puede hacer con esas herramientas lo repasé en [otro artículo](/blog/chatgpt-para-empresas-que-se-puede-y-que-no).",
          "**Si funciona, automatizá los pasos fijos.** Un flujo que se repite siempre igual, con revisión humana al final.",
          "**Recién ahí, probá un agente en la parte que cambia según el caso.** Con los controles de arriba, con fecha de cierre y con un criterio escrito de antes para decidir si sigue o [se abandona](/blog/cuando-abandonar-una-prueba-de-ia).",
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "Los agentes van a ser cada vez más capaces, y es razonable prepararse. Pero la preparación no pasa por comprar el primero que aparece, sino por tener tareas ordenadas, datos accesibles y reglas claras, que es lo que después permite dejar actuar a un agente sin miedo. En el [Programa INTEGRA](/programa-integra) te acompañamos en ese orden: primero la tarea y el criterio, después la herramienta. Si no sabés por dónde arrancar, la Consultoría Estratégica Gratuita es para eso.",
      },
      {
        tipo: "fuentes",
        items: [
          {
            label: "Anthropic — Building effective agents, diciembre de 2024",
            url: "https://www.anthropic.com/research/building-effective-agents",
          },
          {
            label: "Anthropic — Project Vend: Can Claude run a small shop?, junio de 2025",
            url: "https://www.anthropic.com/research/project-vend-1",
          },
          {
            label: "Anthropic — Project Vend: Phase two, diciembre de 2025",
            url: "https://www.anthropic.com/research/project-vend-2",
          },
          {
            label: "Gartner — Over 40% of agentic AI projects will be canceled by end of 2027, junio de 2025",
            url: "https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027",
          },
          {
            label: "McKinsey — The State of AI in 2025: Agents, innovation, and transformation",
            url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
          },
          {
            label: "METR — Measuring AI ability to complete long tasks, marzo de 2025",
            url: "https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/",
          },
        ],
      },
    ],
  },

  /* =================================================================
     00a — POR DÓNDE EMPEZAR A IMPLEMENTAR IA
     ================================================================= */
  {
    slug: "por-donde-empezar-a-implementar-ia-en-una-empresa",
    titulo: "Por dónde empezar a implementar IA en una empresa",
    categoria: "Método",
    fecha: "2026-08-23",
    fechaLabel: "23 de agosto de 2026",
    lectura: "7 min de lectura",
    resumen:
      "La pregunta que más me hacen no es qué herramienta usar, sino por dónde arrancar. Un método de tres pasos para elegir el primer proyecto sin quedarte paralizado en el menú de opciones.",
    img: "/images/blog/11-por-donde-empezar-a-implementar-ia-en-una-empresa.png",
    imgLabel: "/images/blog/11-por-donde-empezar-a-implementar-ia-en-una-empresa.png",
    cuerpo: [
      {
        tipo: "parrafo",
        texto:
          "La pregunta que más escucho no es «¿qué herramienta de IA deberíamos usar?». Es otra, más incómoda: «tenemos ganas, tenemos algo de presupuesto y hasta tenemos a alguien con tiempo, pero no sabemos por dónde arrancar». La hacen dueños de empresas de treinta personas y gerentes de compañías de quinientas. El tamaño cambia; la parálisis, no.",
      },
      {
        tipo: "parrafo",
        texto:
          "Tiene sentido que pase. Todos los días aparece una herramienta nueva, un caso de éxito ajeno que no se parece en nada al tuyo, un conocido que «ya lo está usando para todo» sin que quede claro para qué. Con tanto ruido, la reacción más común es no moverse, o peor: moverse en cinco direcciones a la vez, que en la práctica es lo mismo que no moverse.",
      },
      {
        tipo: "subtitulo",
        texto: "El error más común: empezar por la herramienta",
      },
      {
        tipo: "parrafo",
        texto:
          "Casi todas las implementaciones que terminan estancadas arrancaron de la misma manera: alguien vio un producto, se entusiasmó y salió a buscar dónde meterlo. El orden correcto es el inverso. Primero el problema, después el proceso, recién al final la herramienta. Cuando se invierte ese orden, la empresa termina con una licencia cara y nadie que sepa bien para qué la compraron.",
      },
      {
        tipo: "subtitulo",
        texto: "Tres preguntas antes de mirar cualquier producto",
      },
      {
        tipo: "parrafo",
        texto:
          "Antes de agendar una demo con nadie, valen la pena tres preguntas. No hacen falta consultores ni comités: las contesta cualquiera que conozca la operación de cerca.",
      },
      {
        tipo: "tabla",
        titulo: "El filtro de las tres preguntas",
        columnas: ["Pregunta", "Qué buscás"],
        filas: [
          [
            "¿Qué tarea nos consume tiempo o plata de forma repetida?",
            "Un dolor operativo real, no una intuición sobre el futuro",
          ],
          [
            "¿Ese dolor se puede medir hoy, con los datos que ya tenemos?",
            "Una línea de base. Sin número de partida no hay forma de saber después si algo mejoró",
          ],
          [
            "¿Quién en la empresa quiere de verdad resolver esto?",
            "Un dueño dispuesto a cambiar su proceso, no solo a aprobarlo desde afuera",
          ],
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "Si las tres preguntas tienen respuesta, ya tenés más información que la mayoría de las empresas que arrancan con IA. Si alguna queda en blanco, ese es el trabajo de esta semana — antes de mirar una sola herramienta.",
      },
      {
        tipo: "subtitulo",
        texto: "El mapa de una tarde: impacto contra facilidad",
      },
      {
        tipo: "parrafo",
        texto:
          "Con una lista de candidatos —y casi toda empresa tiene entre cinco y diez dolores dando vueltas apenas se los pregunta— el siguiente paso es ordenarlos en un cuadro de dos ejes: cuánto impacto tendría resolverlos y cuán fácil es probarlos ya, con lo que hay hoy.",
      },
      {
        tipo: "tabla",
        titulo: "Dónde conviene mirar primero",
        columnas: ["Cuadrante", "Qué hacer"],
        filas: [
          [
            "Alto impacto y fácil de probar",
            "Acá arranca el primer proyecto. No hay razón para esperar",
          ],
          [
            "Alto impacto y difícil de probar",
            "Se anota y se prioriza para más adelante, cuando ya haya una victoria que sostenga la siguiente inversión",
          ],
          [
            "Bajo impacto y fácil de probar",
            "Se prueba si sobra tiempo, pero nunca compite por el primer lugar",
          ],
          [
            "Bajo impacto y difícil de probar",
            "Se descarta sin culpa. Es el cuadrante que más energía consume por menos motivo",
          ],
        ],
      },
      {
        tipo: "cita",
        texto: "El primer proyecto no tiene que ser el más ambicioso. Tiene que ser el que se pueda cerrar antes.",
      },
      {
        tipo: "subtitulo",
        texto: "Facilidad no es la herramienta. Son los datos y el permiso",
      },
      {
        tipo: "parrafo",
        texto:
          "Un error frecuente es confundir «fácil» con «hay una app para eso». Lo que realmente determina la facilidad de un proyecto es si los datos que necesita ya existen en un formato utilizable, y si la persona dueña del proceso puede decidir sin pedir permiso a media empresa. Un caso de uso brillante que depende de datos que están en la cabeza de alguien, o de una aprobación de cuatro áreas, es un caso de uso difícil, por más simple que parezca la tecnología detrás.",
      },
      {
        tipo: "subtitulo",
        texto: "La primera semana, en concreto",
      },
      {
        tipo: "lista",
        items: [
          "**Día 1 y 2 — listar y medir.** Juntá a dos o tres personas que conocen la operación y armen la lista de dolores con su línea de base. No hace falta precisión: alcanza con un número aproximado.",
          "**Día 3 — ubicar en el cuadro.** Con la lista armada, el mapa de impacto contra facilidad sale en media hora de conversación.",
          "**Día 4 — elegir uno solo.** El del cuadrante de alto impacto y fácil de probar. Si hay dos empatados, gana el que tenga un dueño más entusiasmado.",
          "**Día 5 — escribir qué significa terminar.** Una línea: qué se va a medir y en cuánto tiempo. Sin esto, la prueba puede estirarse para siempre.",
        ],
      },
      {
        tipo: "subtitulo",
        texto: "Por qué conviene resistir la tentación de arrancar por todos lados",
      },
      {
        tipo: "parrafo",
        texto:
          "El [State of AI 2025 de McKinsey](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai) encontró que el 88 % de las organizaciones ya usa IA en al menos una función. La cifra suena a que el «por dónde empezar» ya dejó de ser un problema. Pero el mismo informe encontró que solo alrededor de un tercio logró escalar esa adopción más allá de un experimento aislado. La diferencia no está en cuántos frentes abrieron: está en si el primero se resolvió de punta a punta antes de abrir el segundo.",
      },
      {
        tipo: "parrafo",
        texto:
          "Elegir bien el primer proyecto no es el paso previo al método. Es el método. Todo lo que sigue —medir, decidir, escalar— se apoya en haber arrancado por el lugar correcto. Es exactamente la primera etapa de lo que trabajamos en el [Método INTEGRA](/programa-integra): antes de sumar una herramienta, ordenar por dónde entra.",
      },
      {
        tipo: "fuentes",
        items: [
          {
            label: "McKinsey — The State of AI, 2025",
            url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
          },
          {
            label: "BCG — The Widening AI Value Gap, septiembre de 2025",
            url: "https://media-publications.bcg.com/The-Widening-AI-Value-Gap-Sept-2025.pdf",
          },
        ],
      },
    ],
  },

  /* =================================================================
     00b — CÓMO IMPLEMENTAR IA EN UNA PYME (HOJA DE RUTA COMPLETA)
     ================================================================= */
  {
    slug: "como-implementar-inteligencia-artificial-en-una-pyme",
    titulo: "Cómo implementar inteligencia artificial en una PyME",
    categoria: "Método",
    fecha: "2026-08-19",
    fechaLabel: "19 de agosto de 2026",
    lectura: "9 min de lectura",
    resumen:
      "No es un proyecto de sistemas ni un curso de dos días. Es un proceso de cinco etapas que convierte el entusiasmo inicial en una capacidad que la empresa conserva. La hoja de ruta completa, con lo que corresponde a cada etapa.",
    img: "/images/blog/14-como-implementar-ia-en-una-pyme.png",
    imgLabel: "/images/blog/14-como-implementar-ia-en-una-pyme.png",
    cuerpo: [
      {
        tipo: "parrafo",
        texto:
          "«¿Cómo implementamos IA?» se pregunta casi siempre como si tuviera una única respuesta correcta: un software para comprar, un proveedor para contratar. No la tiene. Implementar IA en una PyME es un proceso de cinco etapas, y la mayoría de las empresas que quedan a mitad de camino se saltearon alguna sin darse cuenta.",
      },
      {
        tipo: "parrafo",
        texto:
          "Hay dos modelos mentales que llevan directo al estancamiento. El primero trata la IA como un proyecto de sistemas: se compra la licencia, se hace un anuncio interno y se espera que el uso aparezca solo. El segundo la trata como un tema de capacitación: se forma a la gente y se da por hecho que el cambio en el proceso va a seguir por su cuenta — algo que [ya vimos que casi nunca pasa](/blog/capacitacion-de-ia-no-alcanza). Ninguno de los dos es un método completo. Son, a lo sumo, una etapa de cinco.",
      },
      {
        tipo: "subtitulo",
        texto: "Las cinco etapas, de punta a punta",
      },
      {
        tipo: "tabla",
        titulo: "La hoja de ruta completa",
        columnas: ["Etapa", "Qué produce"],
        filas: [
          ["1. Diagnóstico", "Un mapa honesto de qué hace la empresa hoy, con o sin IA"],
          ["2. Priorización", "Un único primer proyecto, elegido con criterio y no por entusiasmo"],
          ["3. Piloto", "Una prueba chica, con plazo y con criterio de éxito escrito antes de empezar"],
          ["4. Medición y decisión", "Una decisión tomada con datos: adoptar, ajustar o cortar"],
          ["5. Escalamiento y gobierno", "Un sistema que sigue funcionando aunque la persona que lo armó esté de vacaciones"],
        ],
      },
      {
        tipo: "subtitulo",
        texto: "Etapa 1 — Diagnóstico: dónde está la empresa hoy",
      },
      {
        tipo: "parrafo",
        texto:
          "Antes de decidir hacia dónde ir hace falta saber desde dónde se sale, y en la mayoría de las PyMEs ese punto de partida es más avanzado de lo que dirección cree. Casi siempre ya hay uso de IA dentro de la empresa — informal, disperso, sin que nadie lo haya autorizado ni lo esté midiendo.",
      },
      {
        tipo: "lista",
        items: [
          "**Qué procesos existen hoy** y cuáles son manuales, repetitivos y de alto volumen.",
          "**En qué estado están los datos** que esos procesos usan: si están en un sistema, en una planilla o en la cabeza de alguien.",
          "**Qué se usa ya, sin permiso formal.** Casi siempre hay alguien redactando con IA o armando reportes con ella por su cuenta.",
          "**Cuánto se involucra la dirección.** El compromiso de quien lidera es, en la práctica, la variable que más pesa en si el proceso avanza o se apaga.",
        ],
      },
      {
        tipo: "subtitulo",
        texto: "Etapa 2 — Priorización: elegir sin comité eterno",
      },
      {
        tipo: "parrafo",
        texto:
          "Con el diagnóstico hecho, aparece la tentación de atacar todo a la vez. El [mapa de impacto contra facilidad de probar](/blog/por-donde-empezar-a-implementar-ia-en-una-empresa) resuelve esto en una tarde: se ordenan los candidatos en un cuadro de dos ejes y se elige uno solo, el de mayor impacto entre los que ya se pueden probar con lo que hay hoy.",
      },
      {
        tipo: "subtitulo",
        texto: "Etapa 3 — Piloto: probar chico, medir en serio",
      },
      {
        tipo: "parrafo",
        texto:
          "Un piloto bien armado tiene tres características que casi nunca aparecen juntas cuando una empresa arranca por su cuenta: alcance acotado, plazo corto y un criterio de abandono escrito antes de empezar, no inventado después con el resultado ya sobre la mesa.",
      },
      {
        tipo: "tabla",
        titulo: "Lo que no puede faltar en un piloto",
        columnas: ["Elemento", "Por qué"],
        filas: [
          [
            "Alcance acotado a un proceso, no a un área entera",
            "Un piloto que abarca demasiado no termina nunca, y lo que no termina no se puede evaluar",
          ],
          [
            "Plazo de tres a cuatro semanas",
            "Suficiente para ver una señal real, corto como para no perder la atención de dirección",
          ],
          [
            "Criterio de éxito y de abandono, [escritos antes de empezar](/blog/cuando-abandonar-una-prueba-de-ia)",
            "Es la única forma de que la decisión final no dependa del humor de la reunión",
          ],
        ],
      },
      {
        tipo: "subtitulo",
        texto: "Etapa 4 — Medición y decisión: adoptar, ajustar o cortar",
      },
      {
        tipo: "parrafo",
        texto:
          "Al cierre del plazo hay solo tres decisiones posibles, y las tres son válidas: adoptar el cambio porque cruzó el umbral que se había definido, ajustarlo porque quedó en la zona gris y todavía no está claro, o cortarlo porque no llegó al mínimo. Lo que no es una decisión válida es «sigamos probando un poco más» sin haber cambiado nada del criterio original.",
      },
      {
        tipo: "cita",
        texto: "Una PyME no necesita más pilotos. Necesita que los pilotos que ya tiene terminen en una decisión.",
      },
      {
        tipo: "subtitulo",
        texto: "Etapa 5 — Escalamiento y gobierno: que no dependa de una persona",
      },
      {
        tipo: "parrafo",
        texto:
          "Un piloto exitoso que vive en la cabeza de quien lo armó no es una capacidad instalada: es [un riesgo con fecha de vencimiento](/blog/adopcion-de-ia-sin-depender-de-una-persona). Escalar significa documentar lo mínimo indispensable y repartir tres roles entre personas distintas.",
      },
      {
        tipo: "lista",
        items: [
          "**Referente de adopción**, que sostiene el método: convoca, hace seguimiento, no ejecuta todo solo.",
          "**Dueño de cada proceso**, que decide si el cambio se adopta en su área porque después va a convivir con él todos los días.",
          "**Dirección**, que prioriza entre áreas y ratifica los cierres cada quince días.",
        ],
      },
      {
        tipo: "subtitulo",
        texto: "Cuánto tarda todo esto en una PyME real",
      },
      {
        tipo: "tabla",
        titulo: "Un cronograma realista para el primer ciclo completo",
        columnas: ["Semanas", "Etapa"],
        filas: [
          ["1 y 2", "Diagnóstico"],
          ["3", "Priorización"],
          ["4 a 7", "Piloto"],
          ["8", "Medición y decisión"],
          ["9 a 12", "Primer escalamiento y arranque del segundo piloto"],
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "Tres meses para el primer ciclo completo es un plazo exigente pero real, siempre que las cinco etapas se respeten en orden. El atajo más tentador —y el más caro— es saltar de la etapa 1 directo a comprar una herramienta en la etapa 3. Ahí es donde el [60 % de las organizaciones del mundo](https://media-publications.bcg.com/The-Widening-AI-Value-Gap-Sept-2025.pdf) queda estancado, según BCG: pagando la tecnología, sin haber construido nada del proceso que la sostiene.",
      },
      {
        tipo: "parrafo",
        texto:
          "Este recorrido de cinco etapas, con sus roles y su cadencia, es exactamente lo que estructura el [Método INTEGRA](/programa-integra): no un curso ni un software, sino el sistema que hace que la primera prueba no sea también la última.",
      },
      {
        tipo: "fuentes",
        items: [
          {
            label: "McKinsey — The State of AI, 2025",
            url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
          },
          {
            label: "BCG — The Widening AI Value Gap, septiembre de 2025",
            url: "https://media-publications.bcg.com/The-Widening-AI-Value-Gap-Sept-2025.pdf",
          },
        ],
      },
    ],
  },

  /* =================================================================
     00c — CHATGPT PARA EMPRESAS: QUÉ SE PUEDE Y QUÉ NO
     ================================================================= */
  {
    slug: "chatgpt-para-empresas-que-se-puede-y-que-no",
    titulo: "ChatGPT para empresas: qué se puede hacer y qué no",
    categoria: "Herramientas",
    fecha: "2026-08-14",
    fechaLabel: "14 de agosto de 2026",
    lectura: "8 min de lectura",
    resumen:
      "La pregunta no es si ChatGPT sirve para tu empresa. Es para qué sirve y dónde empieza a fallar sin avisar. Un mapa práctico de lo que funciona casi solo, lo que funciona con supervisión y lo que todavía no conviene delegarle.",
    img: "/images/blog/13-chatgpt-para-empresas-que-se-puede-y-que-no.png",
    imgLabel: "/images/blog/13-chatgpt-para-empresas-que-se-puede-y-que-no.png",
    cuerpo: [
      {
        tipo: "parrafo",
        texto:
          "En casi todas las reuniones aparece la misma pregunta, formulada distinto: «¿ChatGPT sirve para nuestra empresa?». Es la pregunta equivocada, aunque entiendo por qué se hace: ChatGPT se convirtió en el nombre genérico con el que se habla de toda la IA generativa, del mismo modo en que durante años «Google» significó buscar en internet.",
      },
      {
        tipo: "parrafo",
        texto:
          "La pregunta correcta tiene dos partes: para qué sirve muy bien, y dónde empieza a fallar de una manera que no se nota a simple vista. La segunda parte es la que casi nadie se hace, y es la que termina costando más cara.",
      },
      {
        tipo: "subtitulo",
        texto: "La frontera irregular: por qué funciona espectacular acá y falla feo allá",
      },
      {
        tipo: "parrafo",
        texto:
          "El experimento [Navigating the Jagged Technological Frontier](https://aiinstitute.hbs.edu/navigating-the-jagged-technological-frontier/), de Harvard Business School junto con BCG, le puso nombre a este fenómeno: la capacidad de estos modelos no crece de forma pareja. Hay tareas que quedan muy adentro de lo que resuelven bien, y otras —a veces con un aire de familia engañoso— que quedan apenas afuera. En esas últimas, los consultores que usaron IA en el experimento fueron 19 puntos porcentuales más propensos a entregar respuestas incorrectas que los que no la usaron.",
      },
      {
        tipo: "cita",
        texto:
          "El riesgo más caro de ChatGPT en una empresa no es que se equivoque en lo difícil. Es que se equivoque con la misma confianza con la que acierta en lo fácil.",
      },
      {
        tipo: "subtitulo",
        texto: "Lo que hace bien, casi sin supervisión",
      },
      {
        tipo: "tabla",
        columnas: ["Tarea", "Por qué funciona bien"],
        filas: [
          [
            "Redactar borradores de textos internos",
            "El costo de un error es bajo y se corrige leyendo una vez antes de enviar",
          ],
          [
            "Resumir documentos largos",
            "Comprimir información existente es justo lo que estos modelos hacen mejor",
          ],
          [
            "Adaptar el tono de un mismo texto a distintos públicos",
            "Es una tarea de forma, no de contenido nuevo: no hay dato que pueda inventarse",
          ],
          [
            "Generar variantes de una idea para elegir entre varias",
            "El humano sigue siendo quien decide; la IA solo amplía las opciones sobre la mesa",
          ],
          [
            "Programar y depurar código, o explicar un concepto técnico en lenguaje simple",
            "Son dominios con reglas explícitas donde el modelo entrenó con enorme volumen de ejemplos correctos",
          ],
        ],
      },
      {
        tipo: "subtitulo",
        texto: "Lo que hace, pero necesita revisión humana siempre",
      },
      {
        tipo: "tabla",
        columnas: ["Tarea", "Qué revisar antes de usarlo"],
        filas: [
          [
            "Análisis de datos propios de la empresa",
            "Que las cifras de origen sean correctas y que la interpretación no dé por sentado algo que el dato no dice",
          ],
          [
            "Respuestas a clientes reales",
            "Que el tono y la información sean exactos para ese cliente puntual, no una generalización razonable",
          ],
          [
            "Contenido que sale a nombre de la empresa",
            "Que no haya afirmaciones que la marca no pueda sostener si alguien las cuestiona",
          ],
          [
            "Cálculos financieros o cuentas con varios pasos",
            "El resultado numérico, siempre, con una calculadora o una planilla — no a ojo",
          ],
          [
            "Resúmenes de reuniones con decisiones tomadas",
            "Que las decisiones que quedaron registradas sean las que realmente se tomaron, no una versión plausible",
          ],
        ],
      },
      {
        tipo: "subtitulo",
        texto: "Lo que todavía no conviene delegarle",
      },
      {
        tipo: "lista",
        items: [
          "**Decisiones legales o regulatorias sin que las revise un abogado.** El modelo puede redactar un borrador razonable y estar completamente desactualizado o equivocado sobre la normativa que aplica a tu caso.",
          "**Datos sensibles o confidenciales en una cuenta personal gratuita.** No se trata de prohibir el uso, sino de resolver primero el plan y la configuración correctos para la empresa — es una decisión de gobierno de datos, no de entusiasmo individual.",
          "**Cualquier tarea donde un error no se note a tiempo.** Si el resultado se usa varios pasos después, sin control intermedio, un error queda enterrado hasta que explota en otro lado.",
          "**Tareas que dependen de información interna actualizada que el modelo no tiene.** Precios vigentes, stock real, el estado de una cuenta con un cliente: si esa información no se le da explícitamente, el modelo puede completar el vacío con algo verosímil pero falso.",
        ],
      },
      {
        tipo: "subtitulo",
        texto: "El error que más veo: tratarlo como un buscador de verdades",
      },
      {
        tipo: "parrafo",
        texto:
          "ChatGPT no busca información y la reporta: genera la respuesta más probable dada la pregunta, y esa respuesta puede sonar completamente segura de sí misma incluso cuando está mal. Para uso personal, el costo de esa confusión suele ser bajo. Para una decisión de negocio, no. La regla que uso con los equipos que capacito es simple: cualquier dato que vaya a sostener una decisión —un precio, una fecha, una cifra, una cita— se verifica en la fuente original antes de usarse, sin excepción.",
      },
      {
        tipo: "subtitulo",
        texto: "Una regla simple para decidir caso por caso",
      },
      {
        tipo: "parrafo",
        texto:
          "Antes de soltarle una tarea nueva sin supervisión, una sola pregunta ordena casi todos los casos: si esta tarea sale mal y nadie lo nota a tiempo, ¿cuánto cuesta? Si el costo es bajo y el error se nota rápido —un borrador con un tono raro, una variante de texto floja—, se puede avanzar con confianza. Si el costo es alto o el error tarda en notarse —una cifra mal calculada que llega a un cliente, una cláusula legal mal redactada—, la supervisión humana no es opcional.",
      },
      {
        tipo: "cita",
        texto: "No hay que preguntarse si la tarea es fácil para la IA. Hay que preguntarse qué pasa si se equivoca.",
      },
      {
        tipo: "parrafo",
        texto:
          "Antes de invertir tiempo real en una tarea nueva, vale la pena aplicar la [prueba del sobre cerrado](/blog/de-la-idea-al-proyecto-de-ia): probarla a mano diez veces y ver si el resultado es consistente. Si en esos diez intentos aparecen errores erráticos que no podés explicar, probablemente estés parado sobre uno de esos salientes de la frontera irregular, y conviene recortar la tarea a la parte que sí funciona de manera confiable.",
      },
      {
        tipo: "fuentes",
        items: [
          {
            label: "Harvard Business School / BCG — Navigating the Jagged Technological Frontier",
            url: "https://aiinstitute.hbs.edu/navigating-the-jagged-technological-frontier/",
          },
          {
            label: "McKinsey — The State of AI, 2025",
            url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
          },
        ],
      },
    ],
  },

  /* =================================================================
     00d — QUINCE EJEMPLOS REALES DE IA EN PYMES
     ================================================================= */
  {
    slug: "15-ejemplos-reales-de-ia-aplicada-a-pymes",
    titulo: "15 ejemplos reales de inteligencia artificial aplicada a PyMEs",
    categoria: "Casos",
    fecha: "2026-08-09",
    fechaLabel: "9 de agosto de 2026",
    lectura: "10 min de lectura",
    resumen:
      "Nada de casos de Silicon Valley. Quince ejemplos concretos, agrupados por área, de cómo empresas de veinte a quinientas personas ya usan IA en el día a día — con el problema que resolvían y el resultado que buscaban.",
    img: "/images/blog/12-quince-ejemplos-reales-de-ia-en-pymes.png",
    imgLabel: "/images/blog/12-quince-ejemplos-reales-de-ia-en-pymes.png",
    cuerpo: [
      {
        tipo: "parrafo",
        texto:
          "Cuando pido ejemplos concretos de IA aplicada, la mayoría de la gente piensa en casos que no tienen nada que ver con su empresa: un modelo que diagnostica enfermedades, un auto que se maneja solo. Son notables, pero no sirven de referencia para una empresa de cincuenta personas que factura, atiende clientes y compra insumos todos los días.",
      },
      {
        tipo: "parrafo",
        texto:
          "Los quince que siguen son distintos: son composiciones armadas a partir de casos reales anonimizados, del tipo de trabajo que acompaño habitualmente. Ninguno es glamoroso. Todos son tareas repetitivas, de alto volumen, que hoy hace una persona a mano — y esa es exactamente la razón por la que funcionan.",
      },
      {
        tipo: "subtitulo",
        texto: "Atención al cliente",
      },
      {
        tipo: "tabla",
        columnas: ["Qué hace", "Cómo se ve en el día a día", "Qué resultado busca"],
        filas: [
          [
            "Borrador de respuestas a consultas frecuentes",
            "La IA redacta una primera versión de la respuesta; una persona la revisa y la envía",
            "Bajar el tiempo medio de respuesta sin perder precisión",
          ],
          [
            "Clasificación de tickets por urgencia y área",
            "Cada consulta que entra se etiqueta sola y llega directo a quien corresponde",
            "Que nada quede esperando en una bandeja general sin dueño",
          ],
          [
            "Resumen de conversaciones largas para el pase de turno",
            "Un chat de quince mensajes con un cliente queda resumido en tres líneas para quien sigue el caso",
            "Que el siguiente turno no tenga que releer todo desde cero",
          ],
        ],
      },
      {
        tipo: "subtitulo",
        texto: "Administración y finanzas",
      },
      {
        tipo: "tabla",
        columnas: ["Qué hace", "Cómo se ve en el día a día", "Qué resultado busca"],
        filas: [
          [
            "Lectura y carga de facturas de proveedores",
            "El PDF que llega por mail se procesa solo y carga los datos en el sistema contable",
            "Bajar las horas-persona dedicadas a tipeo manual, dejando las excepciones para revisión",
          ],
          [
            "Conciliación de pagos contra el resumen bancario",
            "Se cruzan automáticamente los movimientos del banco contra lo registrado en el sistema",
            "Detectar diferencias el mismo día, no al cierre del mes",
          ],
          [
            "Borrador de reportes mensuales para dirección",
            "Los números del mes se convierten en un resumen narrativo, no solo una planilla",
            "Que dirección entienda el número sin depender de que alguien se lo explique en una reunión",
          ],
        ],
      },
      {
        tipo: "subtitulo",
        texto: "Ventas y marketing",
      },
      {
        tipo: "tabla",
        columnas: ["Qué hace", "Cómo se ve en el día a día", "Qué resultado busca"],
        filas: [
          [
            "Borrador de propuestas comerciales personalizadas",
            "El vendedor arma la propuesta a partir de una plantilla con los datos del cliente y la IA completa el resto",
            "Bajar el tiempo entre la reunión y el envío de la propuesta",
          ],
          [
            "Calificación de leads entrantes",
            "Cada consulta nueva se ordena según qué tan cerca está del perfil que más convierte",
            "Que el equipo comercial priorice a quién llamar primero",
          ],
          [
            "Generación de variantes de contenido para redes",
            "A partir de una idea, se arman varias versiones para elegir y ajustar antes de publicar",
            "Sostener una frecuencia de publicación sin sumar horas",
          ],
        ],
      },
      {
        tipo: "subtitulo",
        texto: "Operaciones y logística",
      },
      {
        tipo: "tabla",
        columnas: ["Qué hace", "Cómo se ve en el día a día", "Qué resultado busca"],
        filas: [
          [
            "Planificación de rutas de entrega",
            "Las entregas del día se ordenan solas según cercanía y ventana horaria",
            "Menos kilómetros recorridos y entregas más puntuales",
          ],
          [
            "Previsión simple de demanda para compras",
            "A partir del historial de ventas, se sugiere cuánto reponer de cada producto",
            "Reducir el quiebre de stock y el sobrestock al mismo tiempo",
          ],
        ],
      },
      {
        tipo: "subtitulo",
        texto: "Recursos humanos",
      },
      {
        tipo: "tabla",
        columnas: ["Qué hace", "Cómo se ve en el día a día", "Qué resultado busca"],
        filas: [
          [
            "Primer filtro de CVs contra el perfil buscado",
            "De cien postulaciones, la IA arma una preselección para que RR. HH. revise",
            "Que el tiempo de RR. HH. se concentre en entrevistar, no en leer CVs uno por uno",
          ],
          [
            "Borrador de respuestas a consultas frecuentes de empleados",
            "Preguntas repetidas sobre licencias, vacaciones o beneficios se resuelven con una respuesta clara al toque",
            "Bajar la carga de consultas repetidas sobre el equipo de RR. HH.",
          ],
        ],
      },
      {
        tipo: "subtitulo",
        texto: "Compras",
      },
      {
        tipo: "tabla",
        columnas: ["Qué hace", "Cómo se ve en el día a día", "Qué resultado busca"],
        filas: [
          [
            "Comparación automática de cotizaciones de proveedores",
            "Los mails con presupuestos se convierten en un cuadro comparable de precio y condiciones",
            "Que armar el comparativo deje de llevar horas cada vez que se pide una cotización",
          ],
          [
            "Seguimiento de vencimientos de contratos",
            "El sistema avisa con anticipación cuándo vence cada acuerdo con un proveedor",
            "Que ningún contrato se renueve solo, sin que nadie lo haya revisado antes",
          ],
        ],
      },
      {
        tipo: "subtitulo",
        texto: "Lo que tienen en común los quince",
      },
      {
        tipo: "lista",
        items: [
          "**Todos son repetitivos y de alto volumen.** Ninguno es una tarea que alguien hace una vez al mes: son tareas diarias o semanales, que es justo lo que vuelve rentable automatizarlas.",
          "**Todos tienen hoy a una persona haciéndolos a mano.** No inventan trabajo nuevo: le sacan la parte mecánica a un trabajo que ya existe.",
          "**Todos se miden con un número simple.** Tiempo, errores, horas-persona. Ninguno necesita un tablero sofisticado para saber si funcionó.",
          "**Ninguno reemplaza a una persona.** Reduce el tiempo que esa persona dedica a la parte mecánica de su trabajo, para que quede más tiempo para lo que sí necesita criterio humano.",
        ],
      },
      {
        tipo: "cita",
        texto: "Ningún ejemplo de esta lista es una revolución por sí solo. Juntos, son la diferencia entre una empresa que decide con datos y una que decide a las apuradas.",
      },
      {
        tipo: "subtitulo",
        texto: "Cómo elegir cuál probar primero en tu empresa",
      },
      {
        tipo: "parrafo",
        texto:
          "Ninguno de estos quince es «el correcto» para empezar: el correcto es el que aparece en el cruce entre un dolor real de tu operación y datos que ya tenés disponibles. El [mapa de impacto contra facilidad de probar](/blog/por-donde-empezar-a-implementar-ia-en-una-empresa) es la forma más rápida de encontrarlo sin dar vueltas.",
      },
      {
        tipo: "parrafo",
        texto:
          "Si al leer la lista pensaste «nosotros hacemos tres de estas cosas a mano todavía», esa reacción es exactamente el punto de partida del [Método INTEGRA](/programa-integra): convertir esa lista mental en una prueba concreta, con fecha y con resultado.",
      },
      {
        tipo: "fuentes",
        items: [
          {
            label: "McKinsey — The State of AI, 2025",
            url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
          },
        ],
      },
    ],
  },

  /* =================================================================
     01 — AUDITAR LAS SUSCRIPCIONES DE IA
     ================================================================= */
  {
    slug: "auditar-suscripciones-de-ia-pyme",
    titulo: "Por qué tu PyME paga suscripciones de IA que no usa",
    categoria: "Costos",
    fecha: "2026-08-04",
    fechaLabel: "4 de agosto de 2026",
    lectura: "7 min de lectura",
    resumen:
      "Nadie decidió gastar eso. Se fue acumulando: una prueba acá, una licencia allá, un plan que se duplicó. Cómo hacer el inventario completo en una tarde y qué hacer con lo que aparece.",
    img: "/images/blog/01-suscripciones-ia-no-usadas.png",
    imgLabel: "/images/blog/01-suscripciones-ia-no-usadas.png",
    cuerpo: [
      {
        tipo: "parrafo",
        texto:
          "Hay un ejercicio que hago en la primera reunión con casi cualquier empresa y que nunca falla. Pido una lista de todas las herramientas de inteligencia artificial que la empresa paga hoy, con el monto mensual al lado. Nadie la tiene. En el mejor de los casos alguien dice «tenemos el ChatGPT», y en el peor —que es el más frecuente— tres personas distintas empiezan a acordarse en voz alta de cosas que contrataron.",
      },
      {
        tipo: "parrafo",
        texto:
          "No es desprolijidad. Es la consecuencia natural de cómo entró la IA a las PyMEs: por abajo, de a una persona por vez, con montos chicos que nunca activaron ninguna alarma.",
      },
      {
        tipo: "subtitulo",
        texto: "El gasto no está en el presupuesto de IA. Está repartido en cinco lugares",
      },
      {
        tipo: "parrafo",
        texto:
          "Una licencia de veinte dólares no pasa por ningún comité. La aprueba quien la necesita, se paga con la tarjeta que esté a mano y se rinde como gasto menor. El problema no es el primer cargo: es que ese cargo se repite todos los meses durante dos años sin que nadie vuelva a preguntarse si sigue haciendo falta.",
      },
      {
        tipo: "tabla",
        titulo: "Dónde suele esconderse el gasto en IA de una PyME",
        columnas: ["Dónde está", "Cómo entró", "Por qué no se ve"],
        filas: [
          [
            "Tarjeta personal de un empleado",
            "Alguien probó una herramienta para su trabajo y la siguió pagando",
            "Se reintegra como gasto menor, sin categoría propia",
          ],
          [
            "Tarjeta corporativa de un socio",
            "Se contrató en un momento de entusiasmo, después de una charla o un congreso",
            "El resumen lo mira contabilidad, no quien podría dar de baja",
          ],
          [
            "Dentro de un software que ya pagabas",
            "El proveedor sumó un módulo de IA con costo adicional por usuario",
            "Llega en la misma factura de siempre, con un total un poco más alto",
          ],
          [
            "Planes por asiento con asientos vacíos",
            "Se compraron diez licencias para un equipo de diez",
            "Se factura por asiento contratado, no por asiento usado",
          ],
          [
            "Herramientas de un proyecto que terminó",
            "Se contrató para una campaña, una migración o un piloto puntual",
            "El proyecto cerró, la suscripción no",
          ],
        ],
      },
      {
        tipo: "subtitulo",
        texto: "El inventario, en una tarde",
      },
      {
        tipo: "parrafo",
        texto:
          "No hace falta una herramienta de gestión de gastos ni un proyecto de tres semanas. Con estos cinco pasos, en una tarde tenés la foto completa:",
      },
      {
        tipo: "lista",
        items: [
          "**Extractos de los últimos 12 meses** de todas las tarjetas de la empresa. Buscá los cargos en dólares y los importes chicos que se repiten. Ahí está el 80 % de lo que no sabés que pagás.",
          "**Una pregunta a cada responsable de área**, formulada sin sospecha: «¿qué herramientas de IA usás o pagás para tu trabajo, aunque sean tuyas?». Si la pregunta suena a auditoría, la respuesta va a ser incompleta.",
          "**Las facturas de tus proveedores de software habituales**. Compará el importe de hoy contra el de hace un año: los módulos de IA se agregaron casi siempre sin que nadie los pidiera explícitamente.",
          "**La lista de accesos**. Por cada herramienta, quién tiene usuario y quién es el titular de la cuenta. Si el titular es alguien que ya no trabaja en la empresa, tenés un problema más grande que el gasto.",
          "**El detalle de asientos contratados contra asientos activos**. Casi todas las plataformas lo muestran en la pantalla de administración, y casi nadie la abre.",
        ],
      },
      {
        tipo: "subtitulo",
        texto: "Cuatro columnas convierten la lista en una decisión",
      },
      {
        tipo: "parrafo",
        texto:
          "Una lista de herramientas y precios no sirve para nada por sí sola. Lo que la vuelve accionable es cruzarla con el uso real. Cuatro columnas alcanzan:",
      },
      {
        tipo: "tabla",
        titulo: "La planilla mínima de auditoría",
        columnas: ["Columna", "Qué contestar", "Qué te dice"],
        filas: [
          [
            "Herramienta y costo anual",
            "El monto mensual multiplicado por doce, en pesos",
            "El número anual duele mucho más que el mensual, y es el que corresponde para decidir",
          ],
          [
            "Quién la pidió y para qué",
            "Nombre y el problema concreto que iba a resolver",
            "Si nadie se acuerda del problema original, la respuesta ya está",
          ],
          [
            "Cuántas personas la usaron en los últimos 30 días",
            "El número real, sacado del panel de administración",
            "Separa las herramientas vivas de las que solo generan débito",
          ],
          [
            "Qué pasa si la damos de baja mañana",
            "Una frase concreta: qué proceso se rompe y de quién es",
            "Si nadie puede completar esta celda, no hay nada que romper",
          ],
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "La cuarta columna es la más incómoda y la más útil. En la mayoría de las auditorías que acompañé, entre un tercio y la mitad de las herramientas se quedan con esa celda en blanco.",
      },
      {
        tipo: "cita",
        texto:
          "El problema de las PyMEs con la IA no es que gasten poco. Es que gastan sin haber decidido nada.",
      },
      {
        tipo: "subtitulo",
        texto: "Gastar no es lo mismo que adoptar",
      },
      {
        tipo: "parrafo",
        texto:
          "Vale la pena poner el hallazgo en contexto, porque el problema no es local. El estudio [The Widening AI Value Gap](https://media-publications.bcg.com/The-Widening-AI-Value-Gap-Sept-2025.pdf) de BCG, de septiembre de 2025, clasificó a las organizaciones del mundo según su capacidad de convertir la IA en resultados y encontró que la enorme mayoría todavía no lo logra.",
      },
      {
        tipo: "dato",
        valor: "60 %",
        texto:
          "de las organizaciones del mundo está en el grupo de las rezagadas: impacto mínimo en ingresos y costos, aun cuando ya están pagando por la tecnología.",
      },
      {
        tipo: "parrafo",
        texto:
          "Dicho de otro modo: la factura llega igual en todos los grupos. Lo que cambia entre uno y otro no es cuánto se contrató, sino si alguien decidió para qué.",
      },
      {
        tipo: "subtitulo",
        texto: "Qué hacer con lo que encontraste",
      },
      {
        tipo: "lista",
        items: [
          "**Dar de baja lo que nadie tocó en 60 días.** Sin reuniones ni comités. Si alguien la extraña, se vuelve a contratar en dos minutos, y esa es exactamente la prueba que necesitabas.",
          "**Consolidar en cuentas de empresa.** Las herramientas que sí se usan tienen que estar a nombre de la empresa, con facturación única y un administrador identificado. Además de ordenar el gasto, evita que el acceso se vaya con la persona.",
          "**Ajustar los asientos al uso real.** Casi todos los planes permiten bajar la cantidad de licencias en el ciclo siguiente. Es el ahorro más rápido de toda la auditoría.",
          "**Poner un dueño por herramienta.** Una persona responsable de decir, cada trimestre, si sigue o no. Sin dueño, todo sigue por defecto.",
          "**Agendar la próxima revisión.** Trimestral, con fecha en el calendario. Una auditoría que se hace una sola vez vuelve al punto de partida en un año.",
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "El resultado de este ejercicio, en las empresas que lo hicieron, casi nunca es el ahorro. Es el mapa. Por primera vez alguien puede mirar en una hoja qué usa la empresa, quién lo usa y para qué — que es la única base sólida sobre la que se puede decidir qué probar después.",
      },
      {
        tipo: "parrafo",
        texto:
          "Si al terminar la planilla te queda la sensación de que estás pagando bastante y decidiendo poco, ese es exactamente el punto de partida del [Método INTEGRA](/programa-integra): ordenar lo que ya hay antes de sumar una herramienta más.",
      },
      {
        tipo: "fuentes",
        items: [
          {
            label: "BCG — The Widening AI Value Gap, septiembre de 2025",
            url: "https://media-publications.bcg.com/The-Widening-AI-Value-Gap-Sept-2025.pdf",
          },
          {
            label: "McKinsey — The State of AI, 2025",
            url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
          },
        ],
      },
    ],
  },

  /* =================================================================
     02 — LA CAPACITACIÓN SOLA NO ALCANZA
     ================================================================= */
  {
    slug: "capacitacion-de-ia-no-alcanza",
    titulo: "Tu equipo usa ChatGPT pero nada cambió",
    categoria: "Adopción",
    fecha: "2026-07-31",
    fechaLabel: "31 de julio de 2026",
    lectura: "7 min de lectura",
    resumen:
      "Capacitaste a cuarenta personas, salieron entusiasmadas y tres meses después los indicadores son idénticos. No es que la capacitación esté mal: es que sola no alcanza. Qué le falta alrededor.",
    img: "/images/blog/02-chatgpt-y-nada-cambio.png",
    imgLabel: "/images/blog/02-chatgpt-y-nada-cambio.png",
    cuerpo: [
      {
        tipo: "parrafo",
        texto:
          "Doy capacitaciones de IA hace años, así que lo que voy a decir juega en contra de mi propio negocio: una capacitación sola, por buena que sea, casi nunca cambia los números de una empresa.",
      },
      {
        tipo: "parrafo",
        texto:
          "Lo aprendí de la peor manera. Una empresa mediana me contrató para formar a cuarenta personas. Las evaluaciones fueron excelentes, la gente salió entusiasmada, hubo aplausos. Tres meses después volví por otro tema y pregunté qué había cambiado. Silencio. Después alguien dijo: «usamos bastante el ChatGPT ahora». Los tiempos de respuesta al cliente eran los mismos, las horas de administración eran las mismas, los errores eran los mismos.",
      },
      {
        tipo: "subtitulo",
        texto: "El problema no es la capacitación. Es lo que pasa el lunes",
      },
      {
        tipo: "parrafo",
        texto:
          "El principio 10-20-70 de BCG, que ya usé [en otro artículo](https://www.bcg.com/publications/2025/closing-the-ai-impact-gap), explica bien por qué. El 70 % del valor de una iniciativa de IA sale de personas, procesos y cultura. Una capacitación trabaja sobre las personas — que es una parte real de ese 70 %, pero es una parte. Si el proceso no se toca, si nadie decide qué se hace distinto y si no hay quien sostenga el cambio, la formación queda flotando.",
      },
      {
        tipo: "tabla",
        titulo: "Lo que una capacitación deja y lo que no",
        columnas: ["Lo que sí entrega", "Lo que no puede entregar sola"],
        filas: [
          [
            "Criterio: qué sirve, qué no, dónde están los límites",
            "La decisión de qué proceso se rediseña",
          ],
          ["Habilidad concreta para usar las herramientas", "El tiempo protegido para aplicarla"],
          ["Lenguaje común dentro del equipo", "Un responsable que sostenga la aplicación"],
          ["Entusiasmo y permiso para probar", "Una línea de base contra la cual medir la mejora"],
          ["Ejemplos aplicados al negocio", "La cadencia de seguimiento que evita que se apague"],
        ],
      },
      {
        tipo: "subtitulo",
        texto: "Tres razones por las que el efecto se apaga",
      },
      {
        tipo: "lista",
        items: [
          "**No hay dónde aplicarlo.** La persona vuelve a un proceso que no cambió, con los mismos plazos y la misma carga. Aprender a redactar más rápido no sirve de nada si el cuello de botella estaba en la aprobación, no en la redacción.",
          "**Nadie decidió qué se hace distinto.** Sin una decisión explícita —«a partir de ahora los informes mensuales se arman así»—, cada persona improvisa su propio uso y el resultado no se acumula en ningún lado.",
          "**No hay quien lo sostenga.** Las primeras semanas hay energía. En la cuarta aparece una urgencia, y lo nuevo, que todavía cuesta un poco más, se abandona por lo conocido. Sin una revisión periódica no hay forma de detectarlo a tiempo.",
        ],
      },
      {
        tipo: "cita",
        texto:
          "Capacitar sin rediseñar el proceso es enseñarle a alguien a manejar y devolverlo al mismo colectivo de siempre.",
      },
      {
        tipo: "subtitulo",
        texto: "El test de las dos semanas",
      },
      {
        tipo: "parrafo",
        texto:
          "Hay una forma barata de saber si una capacitación va a dejar algo. A los catorce días, pedí que tres personas muestren **un entregable real de su trabajo hecho de otra manera**: un informe, una propuesta, una respuesta al cliente, un análisis. No una demostración, no un ejercicio del curso: algo que se usó de verdad.",
      },
      {
        tipo: "parrafo",
        texto:
          "Si aparecen los tres, la formación agarró y lo que falta es escalarla. Si no aparece ninguno, no perdiste el dinero de la capacitación: perdiste la ventana de las dos semanas, que es cuando todavía hay energía disponible para cambiar algo.",
      },
      {
        tipo: "subtitulo",
        texto: "Cómo se arma una formación que sí mueve la aguja",
      },
      {
        tipo: "tabla",
        titulo: "Los tres momentos que definen el resultado",
        columnas: ["Momento", "Qué hay que hacer", "Por qué"],
        filas: [
          [
            "Antes",
            "Elegir dos o tres procesos concretos sobre los que va a trabajar la formación y medir cómo están hoy",
            "Sin línea de base no hay forma de saber después si algo mejoró, y sin foco la capacitación se vuelve un panorama general",
          ],
          [
            "Durante",
            "Trabajar sobre material propio de la empresa, no sobre ejemplos genéricos",
            "El salto difícil no es aprender la herramienta, es traducirla al caso propio. Si eso no pasa en la sala, después no pasa",
          ],
          [
            "Después",
            "Compromisos de aplicación con nombre y fecha, y una revisión a los 30 días",
            "Es la diferencia entre un evento y un cambio. La revisión no controla: destraba lo que se atascó",
          ],
        ],
      },
      {
        tipo: "subtitulo",
        texto: "Y el que capacita primero es el que dirige",
      },
      {
        tipo: "parrafo",
        texto:
          "El [State of AI 2025 de McKinsey](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai) encontró que las organizaciones de alto desempeño en IA son tres veces más propensas que sus pares a afirmar que sus líderes senior demuestran compromiso real con las iniciativas — y aclara que ese compromiso incluye usar las herramientas ellos mismos, a la vista del equipo.",
      },
      {
        tipo: "parrafo",
        texto:
          "Es la parte que ninguna capacitación puede reemplazar. Si el equipo sale de la formación entusiasmado y vuelve a un lugar donde nadie que decide usa lo que se enseñó, la conclusión que saca no es «esto no sirve». Es algo peor: «esto no es prioridad».",
      },
      {
        tipo: "parrafo",
        texto:
          "Por eso, cuando me piden una capacitación, la primera pregunta que hago no es cuántas personas son ni cuántas horas quieren. Es qué proceso esperan que esté funcionando distinto dentro de dos meses. Si hay respuesta, la formación va a rendir. Si no la hay, lo que hace falta primero no es una [capacitación](/servicios/speaker-y-capacitador): es decidir.",
      },
      {
        tipo: "fuentes",
        items: [
          {
            label: "McKinsey — The State of AI, 2025",
            url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
          },
          {
            label: "BCG — From Potential to Profit: Closing the AI Impact Gap",
            url: "https://www.bcg.com/publications/2025/closing-the-ai-impact-gap",
          },
        ],
      },
    ],
  },

  /* =================================================================
     03 — LÍMITE DE TRABAJO EN CURSO
     ================================================================= */
  {
    slug: "limite-de-iniciativas-de-ia-en-curso",
    titulo: "Cinco iniciativas de IA abiertas y ninguna cierra",
    categoria: "Método",
    fecha: "2026-07-28",
    fechaLabel: "28 de julio de 2026",
    lectura: "6 min de lectura",
    resumen:
      "Empezar una prueba es gratis y se siente como avanzar. Cerrarla obliga a decidir. Por qué limitar a una prueba activa por área no es una restricción burocrática, sino lo único que hace que las cosas terminen.",
    img: "/images/blog/03-cinco-iniciativas-ninguna-cierra.png",
    imgLabel: "/images/blog/03-cinco-iniciativas-ninguna-cierra.png",
    cuerpo: [
      {
        tipo: "parrafo",
        texto:
          "En una reunión de seguimiento, un gerente me mostró el pizarrón de iniciativas de IA de la empresa. Cinco tarjetas, todas en la columna «en curso». Le pregunté desde cuándo. La más nueva tenía seis semanas; la más vieja, cinco meses. Ninguna había producido todavía una decisión.",
      },
      {
        tipo: "parrafo",
        texto:
          "Le hice una sola pregunta más: ¿cuál de las cinco vas a terminar esta semana? Se quedó pensando y contestó lo que contesta todo el mundo: «un poco de todas».",
      },
      {
        tipo: "subtitulo",
        texto: "Empezar es gratis. Terminar cuesta",
      },
      {
        tipo: "parrafo",
        texto:
          "Abrir una iniciativa da una señal inmediata de movimiento. Se anuncia en la reunión, queda lindo en el pizarrón y no obliga a nadie a comprometerse con nada. Cerrarla es lo contrario: exige mirar un resultado y decidir si se adopta, si se escala o si se descarta. Y descartar, en la mayoría de las empresas, todavía se lee como fracaso.",
      },
      {
        tipo: "parrafo",
        texto:
          "Entonces pasa lo previsible. Nadie cierra nada, todo queda «en curso», y la energía disponible se reparte entre cinco frentes hasta volverse insuficiente en todos.",
      },
      {
        tipo: "tabla",
        titulo: "El pizarrón típico de una PyME que arrancó con entusiasmo",
        columnas: ["Iniciativa", "Semanas abierta", "Estado real"],
        filas: [
          [
            "Bot de respuestas para atención al cliente",
            "20",
            "Alguien lo probó dos tardes; quedó esperando una decisión sobre el tono de las respuestas",
          ],
          [
            "Lectura automática de facturas de proveedores",
            "14",
            "Funcionó en las pruebas; falta definir quién revisa las excepciones",
          ],
          [
            "Generación de contenido para redes",
            "11",
            "Lo usa una persona por su cuenta; nunca se comparó contra lo que hacía antes",
          ],
          [
            "Análisis de datos de ventas",
            "8",
            "Frenado hasta que exporten bien la información del sistema",
          ],
          [
            "Asistente interno de consultas de RRHH",
            "6",
            "Se anunció en la reunión de gerentes; todavía nadie lo tocó",
          ],
        ],
        fuente: "Ejemplo compuesto, armado con casos reales anonimizados",
      },
      {
        tipo: "parrafo",
        texto:
          "Mirado así, el pizarrón no muestra cinco proyectos avanzando. Muestra cinco decisiones postergadas.",
      },
      {
        tipo: "subtitulo",
        texto: "El límite de trabajo en curso no frena: acelera",
      },
      {
        tipo: "parrafo",
        texto:
          "La regla que instalo en las empresas que acompaño es simple hasta la incomodidad: **una sola prueba activa por área**. No una por persona, no una por herramienta. Una por área, con responsable, plazo y criterio de cierre.",
      },
      {
        tipo: "parrafo",
        texto:
          "La reacción inicial siempre es la misma: «así vamos a ir más lento». Pasa exactamente lo contrario, y por una razón aritmética. Cinco pruebas que avanzan un 20 % por semana no terminan nada en cinco semanas. Una prueba que recibe toda la atención termina en dos, y después empieza la siguiente. A las cinco semanas, en el primer caso tenés cinco cosas a medio hacer; en el segundo, dos decisiones tomadas y una prueba en marcha.",
      },
      {
        tipo: "cita",
        texto:
          "Una empresa no avanza por la cantidad de cosas que empieza. Avanza por la cantidad de decisiones que cierra.",
      },
      {
        tipo: "subtitulo",
        texto: "Qué cambia cuando el límite es uno",
      },
      {
        tipo: "lista",
        items: [
          "**La prioridad se vuelve explícita.** Con cinco iniciativas abiertas, la prioridad es una opinión. Con una sola activa, hay que elegir, y esa elección se discute con dirección en lugar de resolverse por quién grita más fuerte.",
          "**El cierre pasa a ser la condición para empezar lo próximo.** Es el mecanismo entero: si querés arrancar la siguiente idea —y siempre hay una siguiente idea—, primero tenés que cerrar la que está.",
          "**Nadie queda esperando.** En un frente único, cuando algo se traba se ve al día siguiente. Repartido en cinco, un bloqueo puede pasar tres semanas sin que nadie lo note.",
          "**El equipo ve resultados.** Y eso importa más de lo que parece: una prueba terminada, aunque haya salido que no, sostiene la credibilidad de todo el proceso mucho mejor que cinco iniciativas eternamente prometedoras.",
        ],
      },
      {
        tipo: "subtitulo",
        texto: "Cómo bajarlo a la práctica esta semana",
      },
      {
        tipo: "lista",
        items: [
          "Listá **todo** lo que hoy está abierto, incluyendo lo que nadie llama proyecto: la herramienta que alguien está probando por su cuenta también ocupa atención.",
          "Elegí una por área. El criterio que mejor funciona no es cuál es más importante, sino **cuál se puede cerrar antes** con la información que ya tenés.",
          "Al resto ponele estado «congelado» y una fecha de revisión. Congelado no es cancelado, y esa distinción hay que decirla en voz alta.",
          "Para la prueba activa, escribí en una línea qué significa terminar: qué se va a mirar y qué decisión se va a tomar con eso.",
          "Revisala una vez por semana, siempre el mismo día. Sin cadencia fija, el límite de uno se convierte en un límite de cero.",
        ],
      },
      {
        tipo: "subtitulo",
        texto: "El error frecuente: confundir congelar con cancelar",
      },
      {
        tipo: "parrafo",
        texto:
          "Cuando una iniciativa se congela sin explicación, la persona que la impulsaba entiende que su idea se descartó y no vuelve a proponer nada. El costo de eso es mucho más alto que el de la iniciativa misma.",
      },
      {
        tipo: "parrafo",
        texto:
          "La conversación correcta dura treinta segundos: «tu idea entra en el tablero, no la vamos a probar ahora porque estamos terminando esta otra, y la fecha en que la miramos es el 15». Una idea con fecha se sostiene sola. Una idea sin fecha se muere, y con ella la voluntad de proponer la próxima.",
      },
      {
        tipo: "parrafo",
        texto:
          "Vale la pena mirar el contexto: el [State of AI de McKinsey](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai) encontró que el 88 % de las organizaciones ya usa IA en al menos una función, pero solo alrededor de un tercio logró escalarla. La distancia entre esos dos números no se explica por falta de ideas. Se explica por falta de cierres.",
      },
      {
        tipo: "fuentes",
        items: [
          {
            label: "McKinsey — The State of AI, 2025",
            url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
          },
          {
            label: "BCG — The Widening AI Value Gap, septiembre de 2025",
            url: "https://media-publications.bcg.com/The-Widening-AI-Value-Gap-Sept-2025.pdf",
          },
        ],
      },
    ],
  },

  /* =================================================================
     04 — DE LA IDEA VAGA AL PROYECTO DECIDIBLE
     ================================================================= */
  {
    slug: "de-la-idea-al-proyecto-de-ia",
    titulo: "Una idea no se puede probar si sigue siendo una frase",
    categoria: "Método",
    fecha: "2026-07-24",
    fechaLabel: "24 de julio de 2026",
    lectura: "8 min de lectura",
    resumen:
      "«Usemos IA en compras» no es una oportunidad: es un deseo. Ocho preguntas que convierten una frase de pasillo en algo que se puede probar, medir y decidir — con ejemplos en compras, administración y atención.",
    img: "/images/blog/04-idea-a-prueba-aplicada.png",
    imgLabel: "/images/blog/04-idea-a-prueba-aplicada.png",
    cuerpo: [
      {
        tipo: "parrafo",
        texto:
          "«Queremos usar IA en compras.» La frase la escuché tal cual, con esas seis palabras, en una empresa de ochenta personas. Pregunté qué esperaban que pasara. La respuesta fue: «que sea más eficiente».",
      },
      {
        tipo: "parrafo",
        texto:
          "No hay forma de probar eso. No porque la idea sea mala —probablemente haya algo bueno adentro—, sino porque tal como está enunciada no se puede empezar, no se puede medir y, sobre todo, no se puede terminar. Cualquier resultado va a poder interpretarse como éxito o como fracaso según el humor de la reunión.",
      },
      {
        tipo: "subtitulo",
        texto: "La diferencia entre una idea y una oportunidad",
      },
      {
        tipo: "parrafo",
        texto:
          "Una idea es una intuición: alguien vio algo, escuchó algo, sintió que ahí hay una mejora. Es valiosa y hay que cuidarla. Una oportunidad es otra cosa: es una idea que ya pasó por suficientes preguntas como para saber qué se va a hacer, quién, con qué información y cómo vamos a saber si funcionó.",
      },
      {
        tipo: "parrafo",
        texto:
          "El trabajo de traducción entre una y otra lleva menos de una hora y es, en mi experiencia, el paso que más veces se saltea. Ocho preguntas alcanzan.",
      },
      {
        tipo: "tabla",
        titulo: "Las ocho preguntas que vuelven decidible una idea",
        columnas: ["Pregunta", "Qué revela"],
        filas: [
          [
            "1. ¿Qué tarea concreta hace hoy una persona, paso por paso?",
            "Si no se puede describir el paso a paso actual, no hay proceso: hay una idea sobre un proceso",
          ],
          [
            "2. ¿Cuántas veces por semana pasa y cuánto tiempo lleva cada vez?",
            "El volumen define si vale la pena. Una tarea de dos horas por mes rara vez justifica el esfuerzo",
          ],
          [
            "3. ¿Qué duele exactamente: el tiempo, los errores, la demora o la carga mental?",
            "Cada dolor se mide distinto y se resuelve distinto. «Es ineficiente» no es un dolor",
          ],
          [
            "4. ¿Con qué información se hace hoy y en qué estado está?",
            "Es el filtro que más iniciativas frena. Si el dato está en la cabeza de alguien o en un PDF escaneado torcido, eso es el proyecto",
          ],
          [
            "5. ¿Qué pasa si sale mal una vez?",
            "Distingue entre lo que se puede probar de entrada y lo que necesita revisión humana obligatoria",
          ],
          [
            "6. ¿Quién es el dueño de este proceso y está dispuesto a cambiarlo?",
            "Sin un dueño que quiera, la mejor prueba del mundo muere en la implementación",
          ],
          [
            "7. ¿Cómo se ve hoy ese número y cuánto tendría que mejorar para que valga la pena?",
            "La línea de base y el umbral. Escritos antes, no después de ver el resultado",
          ],
          [
            "8. ¿En cuántas semanas podríamos tener una respuesta?",
            "Si la respuesta es «unos meses», la prueba está mal recortada: hay que buscar adentro una pregunta más chica",
          ],
        ],
      },
      {
        tipo: "subtitulo",
        texto: "Los mismos ocho filtros en tres áreas distintas",
      },
      {
        tipo: "parrafo",
        texto:
          "Lo interesante es que el ejercicio no cambia según el área. Cambia el contenido, no el método. Estos son tres ejemplos de recorrido completo, con la frase de entrada tal como suele decirse y la versión que ya se puede probar:",
      },
      {
        tipo: "tabla",
        titulo: "De la frase de pasillo a la prueba con fecha",
        columnas: ["Área", "Cómo se dice", "Cómo queda después de las ocho preguntas"],
        filas: [
          [
            "Compras",
            "«Usemos IA en compras»",
            "Extraer automáticamente producto, cantidad y precio de las ~120 cotizaciones que llegan por mail cada mes, para armar el cuadro comparativo. Hoy lleva 6 horas semanales a una persona. Éxito: bajar a menos de 2 horas con menos del 5 % de correcciones, en 3 semanas",
          ],
          [
            "Administración",
            "«Que la IA nos ordene la facturación»",
            "Clasificar y cargar las facturas de proveedores que llegan en PDF, dejando en una bandeja de excepciones las que no se leen bien. Hoy son ~400 por mes y dos personas dedican 3 días. Éxito: que el 70 % pase sin intervención, en 4 semanas",
          ],
          [
            "Atención al cliente",
            "«Pongamos un bot»",
            "Redactar el borrador de respuesta a las 5 consultas más frecuentes —que son el 60 % del total— para que el equipo revise y envíe. Hoy el tiempo medio de respuesta es de 5 horas. Éxito: bajarlo a menos de 1 hora sin caída en la valoración del cliente, en 3 semanas",
          ],
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "Fijate lo que pasó en los tres casos. Ninguna de las versiones de la derecha es más ambiciosa que la de la izquierda: todas son **más chicas**. La idea vaga siempre suena más grande, porque no tiene bordes. La oportunidad tiene bordes, y por eso se puede empezar el lunes.",
      },
      {
        tipo: "cita",
        texto:
          "Achicar la idea no es bajar la ambición. Es lo único que permite averiguar, en tres semanas, si la ambición tenía razón.",
      },
      {
        tipo: "subtitulo",
        texto: "La prueba del sobre cerrado",
      },
      {
        tipo: "parrafo",
        texto:
          "Cuando dudo de si una idea ya está lista para probarse, uso un truco. Imaginá que escribís en un papel qué vas a mirar dentro de tres semanas y en qué caso vas a decir que funcionó, lo metés en un sobre y lo abrís recién ese día. Si podés escribir esa línea sin ambigüedad, la idea está lista. Si necesitás explicar «depende de cómo venga», todavía no.",
      },
      {
        tipo: "parrafo",
        texto:
          "Este ejercicio, además, protege de un sesgo bastante humano: cuando el resultado ya está a la vista, es facilísimo acomodar el criterio de éxito para que lo que pasó cuente como éxito.",
      },
      {
        tipo: "subtitulo",
        texto: "Un filtro extra: ¿está dentro de la frontera?",
      },
      {
        tipo: "parrafo",
        texto:
          "Hay una pregunta novena, opcional pero valiosa. El experimento [Navigating the Jagged Technological Frontier](https://aiinstitute.hbs.edu/navigating-the-jagged-technological-frontier/), de Harvard Business School junto con BCG, mostró que la IA mejora fuerte los resultados dentro de cierto terreno y los empeora fuera de él: en las tareas que quedaban afuera, los consultores que la usaron fueron 19 puntos porcentuales más propensos a entregar respuestas incorrectas.",
      },
      {
        tipo: "parrafo",
        texto:
          "La consecuencia práctica es concreta: antes de invertir tres semanas, probá la tarea a mano diez veces. No es una prueba estadística ni pretende serlo; es un sondeo barato. Si en diez intentos el resultado es errático de una forma que no podés explicar, probablemente estés parado sobre un saliente de esa frontera, y conviene recortar la tarea a la parte que sí funciona de manera consistente.",
      },
      {
        tipo: "subtitulo",
        texto: "Dónde hacer este ejercicio",
      },
      {
        tipo: "parrafo",
        texto:
          "No hace falta un taller ni un consultor. Alcanza con una hora, la persona que hace la tarea hoy —no su jefe: quien la hace— y alguien que pregunte sin dar por obvio nada. La regla es que no se habla de herramientas hasta terminar la pregunta ocho. En cuanto aparece un nombre de producto, la conversación se muda a las funcionalidades y ya no vuelve al proceso.",
      },
      {
        tipo: "parrafo",
        texto:
          "Cuando una empresa arma el hábito de hacer pasar cada idea por estas ocho preguntas, cambia algo más de fondo que la calidad de los proyectos: deja de depender de que aparezca alguien iluminado. Las oportunidades empiezan a salir de donde tienen que salir, que es de la gente que hace el trabajo todos los días. Ese es, exactamente, el sistema que instalo en el [Programa INTEGRA](/programa-integra).",
      },
      {
        tipo: "fuentes",
        items: [
          {
            label: "Harvard Business School / BCG — Navigating the Jagged Technological Frontier",
            url: "https://aiinstitute.hbs.edu/navigating-the-jagged-technological-frontier/",
          },
          {
            label: "BCG — From Potential to Profit: Closing the AI Impact Gap",
            url: "https://www.bcg.com/publications/2025/closing-the-ai-impact-gap",
          },
        ],
      },
    ],
  },

  /* =================================================================
     05 — ADOPCIÓN DE IA EN AMÉRICA LATINA
     ================================================================= */
  {
    slug: "adopcion-ia-empresas-latinoamerica-datos",
    titulo: "La región que más usa la IA y menos invierte en ella",
    categoria: "Datos",
    fecha: "2026-07-21",
    fechaLabel: "21 de julio de 2026",
    lectura: "8 min de lectura",
    resumen:
      "América Latina aporta el 14 % de las visitas mundiales a herramientas de IA y el 1,12 % de la inversión. Los números detrás de una adopción entusiasta que todavía no se traduce en valor.",
    // ⚠️ Esta imagen es una vista previa de stock CON MARCA DE AGUA de 123RF.
    // Reemplazala por la versión licenciada antes de publicar el sitio.
    img: "/images/blog/adopcion-latam.jpg",
    imgLabel: "/images/blog/adopcion-latam.jpg",
    cuerpo: [
      {
        tipo: "parrafo",
        texto:
          "Hay una escena que se repite en casi todas las empresas medianas que visito. Alguien del equipo comercial abre el ChatGPT en el celular y muestra, con una mezcla de orgullo y culpa, cómo redacta las propuestas. Nadie se lo pidió. Nadie se lo prohibió. Tampoco figura en ningún proceso, en ningún manual, en ninguna métrica.",
      },
      {
        tipo: "parrafo",
        texto:
          "Esa escena explica bastante bien la paradoja latinoamericana con la inteligencia artificial: la usamos mucho más de lo que la gestionamos, y la gestionamos mucho más de lo que la financiamos.",
      },
      {
        tipo: "subtitulo",
        texto: "Consumimos IA de primer mundo con presupuestos de tercero",
      },
      {
        tipo: "parrafo",
        texto:
          "La tercera edición del [Índice Latinoamericano de Inteligencia Artificial (ILIA)](https://www.cepal.org/en/pressreleases/latin-america-and-caribbean-accelerate-adoption-artificial-intelligence-though), publicada en octubre de 2025 y elaborada sobre más de cien subindicadores en diecinueve países, dejó un contraste difícil de ignorar. América Latina y el Caribe concentran el **14 % de las visitas globales a soluciones de IA**, con apenas el 11 % de los internautas del mundo. Es decir: usamos estas herramientas por encima de nuestro peso demográfico.",
      },
      {
        tipo: "parrafo",
        texto:
          "Del otro lado del mostrador, la foto se invierte. La región recibe el **1,12 % de la inversión global en IA**, mientras aporta el 6,6 % del PBI mundial. Ningún país de la región supera el promedio mundial de inversión en IA relativa a su PBI per cápita; el promedio regional está seis veces por debajo de ese umbral.",
      },
      {
        tipo: "grafico",
        titulo: "El desbalance latinoamericano en una sola imagen",
        bajada: "Participación de América Latina y el Caribe en cuatro indicadores globales.",
        barras: [
          { label: "Visitas globales a soluciones de IA", valor: 14, texto: "14 %" },
          { label: "Internautas del mundo", valor: 11, texto: "11 %", tono: "neutro" },
          { label: "PBI mundial", valor: 6.6, texto: "6,6 %", tono: "neutro" },
          { label: "Inversión global en IA", valor: 1.12, texto: "1,12 %" },
        ],
        nota: "Consumimos por encima de nuestro peso demográfico e invertimos muy por debajo de nuestro peso económico.",
        fuente: "ILIA 2025 (CEPAL), tercera edición · octubre de 2025",
      },
      {
        tipo: "parrafo",
        texto:
          "El ILIA agrupa a los países en tres categorías según su madurez. La distancia entre el primer grupo y el último es la distancia entre tener política pública de IA y tener buenas intenciones.",
      },
      {
        tipo: "tabla",
        titulo: "Madurez en IA por país",
        columnas: ["Grupo", "Países", "Qué los distingue"],
        filas: [
          [
            "Pioneros (60+ puntos)",
            "Chile, Brasil, Uruguay",
            "Estrategia nacional en ejecución, infraestructura de cómputo y ecosistema de investigación consolidado",
          ],
          [
            "Adoptantes",
            "Colombia, Ecuador, Costa Rica, República Dominicana y otros (8 en total)",
            "Marcos regulatorios en desarrollo y adopción empresarial creciente, con brechas de talento",
          ],
          [
            "Exploradores",
            "Más de un tercio de los países analizados",
            "Iniciativas aisladas, sin política sostenida ni capacidad de cómputo propia",
          ],
        ],
        fuente: "ILIA 2025 (CEPAL) · 19 países relevados",
      },
      {
        tipo: "subtitulo",
        texto: "Una de cada diez empresas la usa. Seis de cada cien le sacan provecho",
      },
      {
        tipo: "parrafo",
        texto:
          "Si el dato de arriba es el macro, el micro es todavía más incómodo. Un informe del Centro para la Convergencia de América Latina publicado en julio de 2026 —firmado por Víctor Muñoz y Ángel Melguizo— midió el uso empresarial real y encontró que **apenas una de cada diez empresas de la región utiliza inteligencia artificial**, y que solo el 6 % captura valor significativo de esa tecnología.",
      },
      {
        tipo: "dato",
        valor: "6 %",
        texto:
          "de las empresas latinoamericanas captura valor significativo de la IA, según el informe del CCLATAM (julio de 2026).",
      },
      {
        tipo: "parrafo",
        texto:
          "El detalle que más me llamó la atención del mismo informe: cerca de la mitad de las empresas de la región ya cuenta con banda ancha de alta velocidad. La conectividad, que durante veinte años fue la excusa favorita, dejó de ser el cuello de botella. El cuello de botella se mudó.",
      },
      {
        tipo: "cita",
        texto:
          "La infraestructura dejó de ser el problema. Lo que falta ahora no se compra: se decide, se organiza y se practica.",
      },
      {
        tipo: "subtitulo",
        texto: "No es un problema latinoamericano, es un problema de management",
      },
      {
        tipo: "parrafo",
        texto:
          "Antes de sacar conclusiones regionalistas, conviene mirar afuera. El [State of AI 2025 de McKinsey](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai) encontró que el 88 % de las organizaciones del mundo ya usa IA en al menos una función. Pero solo alrededor de un tercio logró escalarla al conjunto de la empresa. Adoptar es fácil. Escalar es otra cosa.",
      },
      {
        tipo: "parrafo",
        texto:
          "El estudio [The Widening AI Value Gap](https://media-publications.bcg.com/The-Widening-AI-Value-Gap-Sept-2025.pdf) de BCG, de septiembre de 2025, pone números a esa distancia con una clasificación que se volvió referencia.",
      },
      {
        tipo: "grafico",
        titulo: "Dónde está parada cada empresa del mundo con la IA",
        bajada: "Distribución global de organizaciones según su capacidad de generar valor.",
        barras: [
          { label: "Rezagadas · impacto mínimo en ingresos y costos", valor: 60, texto: "60 %", tono: "neutro" },
          { label: "En escalamiento · empiezan a generar valor", valor: 35, texto: "35 %", tono: "neutro" },
          { label: "Preparadas a futuro · capacidades de IA en todas las áreas", valor: 5, texto: "5 %" },
        ],
        nota: "Solo el 5 % de las empresas del mundo construye capacidades de IA de forma sistemática en todas sus funciones.",
        fuente: "BCG, The Widening AI Value Gap · septiembre de 2025",
      },
      {
        tipo: "parrafo",
        texto:
          "Puesto de otro modo: el 75 % de los ejecutivos considera que la IA es una prioridad estratégica, pero solo el 25 % consigue traducir esa ambición en valor concreto. La brecha no está entre países ricos y pobres. Está entre empresas que trataron a la IA como un proyecto de tecnología y empresas que la trataron como un cambio en la forma de trabajar.",
      },
      {
        tipo: "subtitulo",
        texto: "Lo que sí es un problema estructural nuestro",
      },
      {
        tipo: "parrafo",
        texto:
          "Dicho todo eso, hay condiciones locales que no se resuelven con buena gestión. El informe del CCLATAM estima un **déficit de financiamiento de 99.000 millones de dólares anuales hasta 2030** para cerrar la brecha digital de la región. Y recuerda un dato que ordena cualquier discusión sobre productividad: la productividad laboral latinoamericana equivale a alrededor de un tercio de la de las economías de altos ingresos.",
      },
      {
        tipo: "parrafo",
        texto:
          "El talento también preocupa. El ILIA señala que la brecha regional de talento en IA respecto del promedio mundial **se amplió desde 2022**, y que la formación avanzada sigue siendo escasa y concentrada en unos pocos países. Formamos gente que sabe usar herramientas, no gente que sabe construirlas ni gobernarlas.",
      },
      {
        tipo: "subtitulo",
        texto: "Qué haría yo si dirigiera una pyme latinoamericana hoy",
      },
      {
        tipo: "parrafo",
        texto:
          "Los datos son un diagnóstico, no una receta. Pero si tuviera que traducirlos en decisiones para una empresa de veinte, cien o quinientas personas en la región, serían estas cuatro:",
      },
      {
        tipo: "lista",
        items: [
          "Dejar de preguntar «¿qué podemos hacer con IA?» y empezar por «¿qué proceso nos duele y cuánto nos cuesta al mes?». El caso de uso sale del dolor, no del catálogo de herramientas.",
          "Sacar la IA de la sombra. Si la gente ya la usa sin permiso —y la usa—, conviene saber en qué, con qué datos y con qué criterio. Prohibir no funciona; ordenar sí.",
          "Medir antes de empezar. Sin una línea de base —horas, errores, tiempo de respuesta— no hay forma de saber si algo funcionó, y sin eso ningún proyecto sobrevive al segundo trimestre.",
          "Elegir un caso, terminarlo y contarlo internamente. Un proceso resuelto de punta a punta convence más que diez pilotos abiertos.",
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "La buena noticia escondida en estos informes es que la mayor parte de la brecha no depende de comprar tecnología de frontera. Depende de decisiones de gestión que están al alcance de cualquier empresa que se lo tome en serio. Y en una región donde el 90 % todavía no arrancó, eso es una ventaja competitiva enorme para el que arranque primero.",
      },
      {
        tipo: "fuentes",
        items: [
          {
            label: "ILIA 2025 — Índice Latinoamericano de IA (CEPAL), octubre de 2025",
            url: "https://www.cepal.org/en/pressreleases/latin-america-and-caribbean-accelerate-adoption-artificial-intelligence-though",
          },
          {
            label:
              "CCLATAM — Unlocking the Digital Potential of Latin America and the Caribbean, julio de 2026",
            url: "https://www.infobae.com/america/america-latina/2026/07/14/america-latina-podria-sumar-48-millones-de-empleos-formales-si-acelera-la-adopcion-de-inteligencia-artificial/",
          },
          {
            label: "McKinsey — The State of AI, 2025",
            url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
          },
          {
            label: "BCG — The Widening AI Value Gap, septiembre de 2025",
            url: "https://media-publications.bcg.com/The-Widening-AI-Value-Gap-Sept-2025.pdf",
          },
        ],
      },
    ],
  },

  /* =================================================================
     06 — EL CRITERIO DE ABANDONO, ESCRITO ANTES
     ================================================================= */
  {
    slug: "cuando-abandonar-una-prueba-de-ia",
    titulo: "La pregunta que hay que hacerse antes de empezar cualquier prueba de IA",
    categoria: "Decisiones",
    fecha: "2026-07-17",
    fechaLabel: "17 de julio de 2026",
    lectura: "6 min de lectura",
    resumen:
      "¿Qué tendría que pasar para que digamos que no? Definir de antemano qué evidencia te haría abandonar una prueba es la decisión más barata de todo el proceso — y la que casi nadie toma.",
    img: "/images/blog/05-pregunta-antes-de-empezar.png",
    imgLabel: "/images/blog/05-pregunta-antes-de-empezar.png",
    cuerpo: [
      {
        tipo: "parrafo",
        texto:
          "Cuando una empresa me presenta una prueba de IA que está por arrancar, hago siempre la misma pregunta, y siempre incomoda un poco: «¿qué tendría que pasar para que dentro de tres semanas digamos que no?».",
      },
      {
        tipo: "parrafo",
        texto:
          "La respuesta habitual es una versión de «bueno, si no funciona». Y eso no es un criterio: es una manera de dejar la decisión para después, cuando ya haya plata invertida, expectativas creadas y alguien que puso su nombre en el proyecto.",
      },
      {
        tipo: "subtitulo",
        texto: "Por qué la pregunta se evita",
      },
      {
        tipo: "parrafo",
        texto:
          "Nadie arranca algo pensando en cómo va a dejarlo. Preguntarlo en el día uno suena a desconfianza, casi a mala onda. Pero el momento en que se define el criterio de abandono determina qué tan honesto va a ser ese criterio: escrito antes, es una regla; escrito después, es una justificación.",
      },
      {
        tipo: "parrafo",
        texto:
          "Y hay un motivo psicológico bastante estudiado detrás. A medida que una iniciativa acumula horas, reuniones y explicaciones a dirección, el costo de decir que no sube — no el costo real, el social. A las tres semanas, abandonar es sensato. A los cinco meses, abandonar parece admitir que se desperdiciaron cinco meses, así que se sigue.",
      },
      {
        tipo: "cita",
        texto:
          "El criterio de abandono es lo único que se abarata escribiéndolo temprano. Todo lo demás de un proyecto se puede definir sobre la marcha.",
      },
      {
        tipo: "subtitulo",
        texto: "Cómo se escribe, en concreto",
      },
      {
        tipo: "parrafo",
        texto:
          "Un criterio de abandono útil tiene cuatro partes y entra en tres renglones. No es un documento: es una fila de una planilla.",
      },
      {
        tipo: "tabla",
        titulo: "Las cuatro columnas del criterio, escritas antes de tocar una herramienta",
        columnas: ["Columna", "Ejemplo — lectura de facturas de proveedores"],
        filas: [
          [
            "Qué decisión toma esta prueba",
            "Si automatizamos o no la carga de facturas de proveedores en el sistema contable",
          ],
          [
            "Qué medimos, contra qué línea de base",
            "Porcentaje de facturas procesadas sin intervención humana. Hoy: 0 %. Tiempo actual: 3 días-persona por mes sobre ~400 facturas",
          ],
          [
            "Umbral para seguir",
            "70 % o más sin intervención, con menos de 2 % de errores que lleguen al sistema",
          ],
          [
            "Umbral para cortar",
            "Menos del 50 % sin intervención, o cualquier error que pase sin detectarse al asiento contable",
          ],
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "Entre los dos umbrales queda una zona gris deliberada —entre el 50 % y el 70 %— y está bien que quede. Esa franja es la que se discute en la reunión, con datos sobre la mesa en lugar de impresiones. Lo que no puede quedar difuso son los extremos.",
      },
      {
        tipo: "subtitulo",
        texto: "Por qué descartar rápido sale más barato",
      },
      {
        tipo: "parrafo",
        texto:
          "El costo visible de una prueba que se estira es el tiempo de la gente. El invisible, que es mayor, se compone de tres cosas:",
      },
      {
        tipo: "lista",
        items: [
          "**Ocupa el cupo.** Si tu empresa sostiene una prueba activa por área —que es lo que recomiendo—, una iniciativa que no cierra bloquea todas las que vienen atrás. El costo real no es lo que gastás en ella: es lo que no probaste mientras tanto.",
          "**Gasta credibilidad.** Cada vez que alguien pregunta «¿cómo viene lo de la IA?» y la respuesta es «ahí va», el proceso entero pierde un poco de crédito. A la cuarta vez, la gente deja de preguntar y de proponer.",
          "**Contamina la próxima decisión.** Una prueba sin cierre no deja aprendizaje. Seis meses después alguien propone algo parecido y nadie puede decir con precisión por qué la anterior no anduvo.",
        ],
      },
      {
        tipo: "subtitulo",
        texto: "Hay tareas donde la IA no falla: acierta con seguridad cosas equivocadas",
      },
      {
        tipo: "parrafo",
        texto:
          "Un motivo adicional, y menos obvio, para definir el umbral de corte por adelantado. El experimento de Harvard Business School y BCG con 758 consultores, [Navigating the Jagged Technological Frontier](https://aiinstitute.hbs.edu/navigating-the-jagged-technological-frontier/), encontró que en las tareas fuera del terreno donde el modelo es competente, quienes usaron IA fueron más propensos a entregar respuestas incorrectas que quienes trabajaron sin ella.",
      },
      {
        tipo: "dato",
        valor: "+19 pp",
        texto:
          "más de probabilidad de entregar una solución incorrecta usando IA, en las tareas ubicadas fuera de la frontera de capacidad del modelo.",
      },
      {
        tipo: "parrafo",
        texto:
          "Esto tiene una consecuencia práctica para el criterio de abandono: no alcanza con medir velocidad. Una prueba puede mostrar que ahora todo se hace tres veces más rápido y estar produciendo, sin que nadie lo note, resultados peores. Por eso todo umbral de corte necesita, además de la métrica de eficiencia, **una métrica de error revisada por una persona sobre una muestra**.",
      },
      {
        tipo: "subtitulo",
        texto: "Las cuatro cosas que se escriben antes de empezar",
      },
      {
        tipo: "lista",
        items: [
          "**Qué decisión toma esta prueba.** Si no hay una decisión esperando el resultado, no es una prueba: es una demostración.",
          "**Qué medimos y contra qué.** Con la línea de base tomada antes, aunque sea a ojo. Una estimación escrita el día uno vale más que un dato exacto conseguido el día treinta.",
          "**Cuánto dura y quién la lleva.** Fecha de cierre en el calendario y un nombre. Sin fecha no hay prueba, hay una nueva forma de trabajar que se instaló sin que nadie la aprobara.",
          "**Qué resultado nos hace cortar.** El umbral explícito, incluyendo al menos un error que sea inaceptable por sí solo, sin importar cuán buenos sean los demás números.",
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "Escribir esas cuatro líneas lleva veinte minutos. Es, de lejos, la mejor relación entre esfuerzo y riesgo evitado de todo el proceso de adopción — y lo que convierte una prueba en algo que efectivamente termina, en lugar de en una actividad que se va apagando sin que nadie recuerde bien cómo empezó.",
      },
      {
        tipo: "fuentes",
        items: [
          {
            label: "Harvard Business School / BCG — Navigating the Jagged Technological Frontier",
            url: "https://aiinstitute.hbs.edu/navigating-the-jagged-technological-frontier/",
          },
          {
            label: "BCG — The Widening AI Value Gap, septiembre de 2025",
            url: "https://media-publications.bcg.com/The-Widening-AI-Value-Gap-Sept-2025.pdf",
          },
        ],
      },
    ],
  },

  /* =================================================================
     07 — LIDERAZGO EN LA ERA DE LA IA
     ================================================================= */
  {
    slug: "liderazgo-en-la-era-de-la-ia",
    titulo: "El cuello de botella de la IA está en la oficina de dirección",
    categoria: "Liderazgo",
    fecha: "2026-07-14",
    fechaLabel: "14 de julio de 2026",
    lectura: "7 min de lectura",
    resumen:
      "Solo el 10 % del valor de la inteligencia artificial viene de los algoritmos. El otro 70 % sale de personas, procesos y cultura: el territorio exacto donde manda la dirección.",
    // 672x378 px: se ve algo blanda al ancho completo del artículo (~1080 px).
    // Si tenés el original más grande, reemplazala.
    img: "/images/blog/liderazgo-ia.png",
    imgLabel: "/images/blog/liderazgo-ia.png",
    cuerpo: [
      {
        tipo: "parrafo",
        texto:
          "En una reunión de directorio, hace unos meses, un gerente general me hizo la pregunta más honesta que escuché en mucho tiempo: «Pablo, ¿yo tengo que aprender a usar esto o alcanza con que lo entienda?».",
      },
      {
        tipo: "parrafo",
        texto:
          "Le dije que la respuesta estaba en los datos, no en mi opinión. Y los datos son bastante crudos al respecto.",
      },
      {
        tipo: "subtitulo",
        texto: "El 70 % del valor está donde menos se mira",
      },
      {
        tipo: "parrafo",
        texto:
          "BCG lleva años sistematizando el trabajo con cientos de empresas en lo que llama el principio 10-20-70. La proporción describe de dónde sale, efectivamente, el valor de una iniciativa de IA.",
      },
      {
        tipo: "apilado",
        titulo: "De dónde sale el valor de una iniciativa de IA",
        bajada: "Distribución del esfuerzo que separa a las empresas que capturan valor de las que no.",
        partes: [
          { label: "Algoritmos", valor: 10 },
          { label: "Datos y tecnología", valor: 20 },
          { label: "Personas, procesos y cultura", valor: 70 },
        ],
        nota: "El modelo es la parte más pequeña del problema. Y la única que se puede comprar.",
        fuente: "BCG · principio 10-20-70",
      },
      {
        tipo: "parrafo",
        texto:
          "Leído al revés, el número dice algo incómodo: el 90 % de lo que determina si la IA funciona en una empresa no está en manos del proveedor de tecnología. Está en manos de quien decide cómo se trabaja. Y eso es, textualmente, la definición del rol de dirección.",
      },
      {
        tipo: "cita",
        texto:
          "El algoritmo se compra. El rediseño del proceso, la decisión de qué se automatiza y la confianza del equipo, no.",
      },
      {
        tipo: "subtitulo",
        texto: "Los que escalan tienen líderes que lo usan, no que lo aprueban",
      },
      {
        tipo: "parrafo",
        texto:
          "El [State of AI 2025 de McKinsey](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai) buscó qué distingue a las organizaciones de alto desempeño en IA del resto. El predictor más fuerte no fue el presupuesto, ni el tamaño, ni el sector. Fue el involucramiento real de la dirección.",
      },
      {
        tipo: "parrafo",
        texto:
          "Las organizaciones de alto desempeño son **tres veces más propensas** que sus pares a afirmar con convicción que sus líderes senior demuestran compromiso con las iniciativas de IA. Y no compromiso declarativo: el informe destaca específicamente que esos líderes modelan el uso —usan las herramientas ellos mismos, delante de sus equipos.",
      },
      {
        tipo: "parrafo",
        texto:
          "Es un detalle que parece menor y no lo es. Un equipo lee muy rápido la diferencia entre un director que aprobó el presupuesto de IA y uno que llega a la reunión con un análisis que preparó él mismo con la herramienta.",
      },
      {
        tipo: "subtitulo",
        texto: "Tu gente ya la está usando, y probablemente vos no lo sepas",
      },
      {
        tipo: "parrafo",
        texto:
          "El informe [Superagency in the workplace](https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/superagency-in-the-workplace-empowering-people-to-unlock-ais-full-potential) de McKinsey, de enero de 2025, encontró un desfasaje sistemático: los empleados están adoptando IA generativa mucho más rápido de lo que sus líderes creen. La brecha no es de porcentajes menores; es de percepción estructural.",
      },
      {
        tipo: "parrafo",
        texto:
          "Esto genera una situación que en las empresas argentinas veo todo el tiempo. La IA entra por abajo, se usa en la sombra, y la dirección se entera cuando ya hay costumbres formadas, criterios dispares y —en el peor de los casos— información sensible pegada en un chat que nadie audita. La conclusión operativa del informe es directa: el trabajo del liderazgo no es prohibir, es habilitar con reglas claras.",
      },
      {
        tipo: "subtitulo",
        texto: "La frontera irregular: dónde la IA ayuda y dónde arruina",
      },
      {
        tipo: "parrafo",
        texto:
          "Hay un experimento que debería ser lectura obligatoria en cualquier comité de dirección. Investigadores de Harvard Business School, junto con BCG, tomaron a **758 consultores reales** y les dieron dieciocho tareas de consultoría con y sin acceso a GPT-4. Lo llamaron [Navigating the Jagged Technological Frontier](https://aiinstitute.hbs.edu/navigating-the-jagged-technological-frontier/).",
      },
      {
        tipo: "tabla",
        titulo: "Qué pasó con 758 consultores de BCG",
        columnas: ["Indicador", "Con acceso a IA", "Qué significa"],
        filas: [
          ["Tareas completadas", "+12,2 %", "Más volumen de trabajo terminado en el mismo período"],
          ["Velocidad", "25,1 % más rápido", "Reducción directa del tiempo por tarea"],
          ["Calidad del resultado", "40 % del grupo mejoró", "Evaluado por jurados ciegos sobre el output final"],
          [
            "Tareas fuera de la frontera",
            "+19 puntos de error",
            "Mayor probabilidad de entregar soluciones incorrectas con la IA que sin ella",
          ],
        ],
        fuente:
          "Dell'Acqua et al., Harvard Business School / BCG · publicado en Organization Science",
      },
      {
        tipo: "parrafo",
        texto:
          "Las tres primeras filas se citan en todas las presentaciones. La cuarta casi nunca. Y es la más importante para quien dirige: fuera del terreno donde el modelo es competente, los consultores que usaron IA fueron **19 puntos porcentuales más propensos a entregar respuestas incorrectas** que los que trabajaron sin ella.",
      },
      {
        tipo: "parrafo",
        texto:
          "La capacidad de la IA no es una línea recta que avanza parejo: es una frontera irregular, con entrantes y salientes que no se ven desde afuera. Adentro, multiplica. Afuera, convence con seguridad de cosas que están mal. Y quien tiene que definir de qué lado de esa frontera se toman las decisiones de la empresa no es el equipo de tecnología.",
      },
      {
        tipo: "subtitulo",
        texto: "Cuatro preguntas para la próxima reunión de dirección",
      },
      {
        tipo: "lista",
        items: [
          "¿Cuántas horas de esta semana usé yo, personalmente, alguna herramienta de IA para trabajar? Si la respuesta es cero, el equipo ya sacó sus conclusiones.",
          "¿Qué está usando mi gente hoy, con qué datos, y quién lo sabe? El mapa del uso real suele sorprender más que cualquier diagnóstico externo.",
          "¿En qué decisiones aceptamos que la IA participe y en cuáles no? Sin ese límite escrito, cada persona improvisa el suyo.",
          "¿Qué proceso vamos a rediseñar? No «qué herramienta vamos a comprar»: qué proceso. El 70 % del valor vive ahí.",
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "Volviendo a la pregunta del gerente general del principio. La respuesta es que no alcanza con entenderla. No porque haya que convertirse en técnico, sino porque las decisiones que definen el 70 % del valor —qué se rediseña, qué se automatiza, dónde está el límite, cómo se forma el equipo— no se pueden delegar a alguien que no las va a tomar.",
      },
      {
        tipo: "fuentes",
        items: [
          {
            label: "McKinsey — The State of AI, 2025",
            url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
          },
          {
            label: "McKinsey — Superagency in the workplace, enero de 2025",
            url: "https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/superagency-in-the-workplace-empowering-people-to-unlock-ais-full-potential",
          },
          {
            label: "Harvard Business School / BCG — Navigating the Jagged Technological Frontier",
            url: "https://aiinstitute.hbs.edu/navigating-the-jagged-technological-frontier/",
          },
          {
            label: "BCG — From Potential to Profit: Closing the AI Impact Gap",
            url: "https://www.bcg.com/publications/2025/closing-the-ai-impact-gap",
          },
        ],
      },
    ],
  },

  /* =================================================================
     08 — DESCARTAR CON EVIDENCIA
     ================================================================= */
  {
    slug: "descartar-una-iniciativa-de-ia-con-evidencia",
    titulo: "«Probamos IA, no funcionó y lo cerramos en dos semanas»",
    categoria: "Decisiones",
    fecha: "2026-07-10",
    fechaLabel: "10 de julio de 2026",
    lectura: "6 min de lectura",
    resumen:
      "Me lo contaron con vergüenza, como si fuera una confesión. Les dije que era el mejor resultado del trimestre. Por qué un descarte bien cerrado vale más que una iniciativa que sigue abierta porque nadie se anima a matarla.",
    img: "/images/blog/06-probamos-ia-y-cerramos.png",
    imgLabel: "/images/blog/06-probamos-ia-y-cerramos.png",
    cuerpo: [
      {
        tipo: "parrafo",
        texto:
          "«Che, tengo que contarte algo. Probamos lo del asistente para atención al cliente y no funcionó. Lo cerramos a las dos semanas.» Me lo dijo bajando la voz, con el tono de quien está a punto de que lo reten.",
      },
      {
        tipo: "parrafo",
        texto:
          "Le pedí que me contara cómo lo habían cerrado. Habían medido el tiempo de respuesta, comparado contra el mes anterior, revisado a mano cuarenta respuestas, encontrado que en las consultas sobre garantías el asistente inventaba plazos que no existían, y decidido cortar. Todo escrito en una página.",
      },
      {
        tipo: "parrafo",
        texto:
          "Eso no es un fracaso. Es una empresa que en dos semanas aprendió algo verdadero sobre su operación, gastando menos de lo que cuesta una reunión larga.",
      },
      {
        tipo: "subtitulo",
        texto: "La iniciativa zombi cuesta más que el fracaso",
      },
      {
        tipo: "parrafo",
        texto:
          "El verdadero problema de las empresas con la IA no son los proyectos que salen mal. Son los que nunca terminan de salir. La iniciativa zombi tiene una característica que la vuelve especialmente cara: consume recursos sin producir información.",
      },
      {
        tipo: "tabla",
        titulo: "Dos formas de que algo no funcione",
        columnas: ["Dimensión", "Descarte con evidencia", "Iniciativa zombi"],
        filas: [
          ["Duración", "2 a 4 semanas", "Meses, sin fecha de cierre"],
          [
            "Costo",
            "Acotado y conocido desde el inicio",
            "Difuso: horas dispersas que nadie suma nunca",
          ],
          [
            "Qué queda escrito",
            "Qué se probó, con qué datos, qué se midió y por qué se cortó",
            "Nada. A los seis meses nadie recuerda en qué quedó",
          ],
          [
            "Efecto en el equipo",
            "Confianza: se prueba, se decide, se sigue",
            "Cinismo: «acá se anuncian cosas y no pasa nada»",
          ],
          [
            "Efecto en la próxima idea",
            "Sale mejor formulada, porque hay un aprendizaje concreto",
            "Sale igual de vaga, y arrastra la sospecha de que tampoco va a terminar",
          ],
          [
            "Qué habilita",
            "El cupo queda libre para la siguiente prueba",
            "Bloquea el cupo por tiempo indefinido",
          ],
        ],
      },
      {
        tipo: "cita",
        texto:
          "Una prueba cerrada con un «no» produce más valor que tres pruebas abiertas con un «ahí va».",
      },
      {
        tipo: "subtitulo",
        texto: "Tres descartes que valieron lo que costaron",
      },
      {
        tipo: "parrafo",
        texto:
          "Estos casos son reales y están anonimizados. Los elijo porque en los tres, lo que se aprendió al cortar valía más que el ahorro que se buscaba.",
      },
      {
        tipo: "lista",
        items: [
          "**Lectura automática de remitos en una distribuidora.** Se cortó a las tres semanas: los remitos llegaban fotografiados con el celular, arrugados y con mala luz, y la tasa de error era inaceptable. El aprendizaje real no fue sobre IA — fue que el problema estaba en cómo se recibían los remitos. Cambiaron eso primero, y un año después la automatización sí funcionó.",
          "**Generación de contenido para redes en una empresa de servicios.** Se cortó a las dos semanas. Los textos salían rápido y eran correctos, pero no sonaban a la empresa, y la revisión para que sonaran llevaba más tiempo que escribirlos de cero. Descubrieron que no tenían escrito en ningún lado cómo hablaba la marca. Ese, y no la herramienta, era el proyecto.",
          "**Asistente interno de consultas de RRHH en una industria.** Se cortó a la semana y media, y fue el descarte más barato de los tres. Las respuestas dependían de convenios y adicionales que cambiaban por sector y que estaban en la cabeza de dos personas. No había base documental para sostener nada. La conclusión fue que primero había que escribir esa información — algo que además hacía falta por muchas otras razones.",
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "En los tres casos, el descarte destapó el problema de fondo: información desordenada, criterios no escritos, procesos que dependían de personas. La IA funcionó como reactivo, no como solución. Y eso solo se ve cuando la prueba se cierra y alguien se sienta a escribir por qué.",
      },
      {
        tipo: "subtitulo",
        texto: "Cómo se cierra bien",
      },
      {
        tipo: "parrafo",
        texto:
          "Un cierre bien hecho es una página. Cinco puntos, sin florituras, guardados donde el próximo los pueda encontrar:",
      },
      {
        tipo: "lista",
        items: [
          "**Qué se probó exactamente.** La tarea concreta, no el título del proyecto. «Extraer tres campos de las cotizaciones que llegan por mail», no «IA en compras».",
          "**Con qué información y en qué condiciones.** Volumen, calidad de los datos, quién participó. Es lo que permite saber, más adelante, si algo cambió lo suficiente como para volver a intentarlo.",
          "**Qué se midió y qué dio.** Los números, contra la línea de base. Incluyendo lo que salió bien: casi todos los descartes tienen una parte que funcionó.",
          "**Por qué se corta.** Contra el umbral que se había escrito antes. Si no había umbral escrito, esta es la lección principal del cierre.",
          "**En qué condiciones se revisaría.** «Si migramos el sistema de facturación», «si conseguimos los remitos en digital». Esto convierte el descarte en una idea archivada con criterio, y no en una puerta cerrada.",
        ],
      },
      {
        tipo: "subtitulo",
        texto: "Lo que esto le hace a la cultura de la empresa",
      },
      {
        tipo: "parrafo",
        texto:
          "Hay una consecuencia que se ve recién unos meses después. Si descartar se castiga —aunque sea con una cara larga en la reunión—, la gente aprende rápido que la forma segura de no equivocarse es no proponer. Y si nadie propone, las oportunidades tienen que bajar siempre desde arriba, que es exactamente el modelo que no escala.",
      },
      {
        tipo: "parrafo",
        texto:
          "Cuando en cambio el descarte se cuenta en la reunión con el mismo tono que un éxito, pasa algo distinto: la gente propone cosas más audaces, porque sabe que probarlas no le va a costar la reputación. El [State of AI de McKinsey](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai) señala que lo que más distingue a las organizaciones que escalan IA no es el presupuesto sino el compromiso visible de sus líderes. Cómo se recibe un descarte es una de las señales más fuertes que puede dar un líder.",
      },
      {
        tipo: "parrafo",
        texto:
          "Por eso, cuando alguien me cuenta un cierre en dos semanas con la voz baja, lo primero que hago es pedirle que lo cuente en la reunión siguiente en voz alta. No para hacer terapia de grupo: porque descartar con evidencia es un resultado, y los resultados se comunican.",
      },
      {
        tipo: "fuentes",
        items: [
          {
            label: "McKinsey — The State of AI, 2025",
            url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
          },
          {
            label: "BCG — The Widening AI Value Gap, septiembre de 2025",
            url: "https://media-publications.bcg.com/The-Widening-AI-Value-Gap-Sept-2025.pdf",
          },
        ],
      },
    ],
  },

  /* =================================================================
     09 — CÓMO CAMBIAN LOS ROLES
     ================================================================= */
  {
    slug: "como-cambian-los-roles-con-ia",
    titulo: "Tu puesto no va a desaparecer: se va a reescribir",
    categoria: "Futuro del trabajo",
    fecha: "2026-07-07",
    fechaLabel: "7 de julio de 2026",
    lectura: "8 min de lectura",
    resumen:
      "El Foro Económico Mundial proyecta 170 millones de empleos nuevos y 92 millones desplazados hacia 2030. El dato que más importa no es ese: es que el 39 % de las competencias de tu puesto van a cambiar.",
    img: "/images/blog/roles-ia.png",
    imgLabel: "/images/blog/roles-ia.png",
    cuerpo: [
      {
        tipo: "parrafo",
        texto:
          "La pregunta llega siempre en el mismo momento de las capacitaciones, cuando ya bajó la guardia el grupo y alguien se anima: «¿Esto me va a dejar sin trabajo?».",
      },
      {
        tipo: "parrafo",
        texto:
          "La respuesta honesta es que depende de qué entendamos por «trabajo». Si es el puesto —el título en el organigrama—, probablemente no. Si es el conjunto de tareas que hacés hoy de lunes a viernes, casi con seguridad sí, y bastante antes de lo que la mayoría calcula.",
      },
      {
        tipo: "subtitulo",
        texto: "El saldo neto es positivo. El movimiento debajo, enorme",
      },
      {
        tipo: "parrafo",
        texto:
          "El [Future of Jobs Report 2025](https://www.weforum.org/press/2025/01/future-of-jobs-report-2025-78-million-new-job-opportunities-by-2030-but-urgent-upskilling-needed-to-prepare-workforces/) del Foro Económico Mundial encuestó a alrededor de mil empleadores que representan a más de catorce millones de trabajadores, en veintidós sectores y cincuenta y cinco economías. Su proyección al 2030 es la referencia que hoy usa casi todo el mundo.",
      },
      {
        tipo: "grafico",
        titulo: "Movimiento de empleo global proyectado al 2030",
        bajada: "Millones de puestos creados, desplazados y saldo neto.",
        barras: [
          { label: "Empleos creados", valor: 170, texto: "170 M" },
          { label: "Empleos desplazados", valor: 92, texto: "92 M", tono: "neutro" },
          { label: "Saldo neto", valor: 78, texto: "+78 M" },
        ],
        nota: "El 22 % de todos los puestos de trabajo se verá afectado de alguna forma por esta reconfiguración.",
        fuente: "World Economic Forum, Future of Jobs Report 2025 · enero de 2025",
      },
      {
        tipo: "parrafo",
        texto:
          "Un saldo positivo de 78 millones de empleos suena tranquilizador hasta que uno se detiene en la letra chica: los 170 millones que se crean y los 92 millones que se pierden no son las mismas personas, ni están en los mismos lugares, ni requieren las mismas capacidades. El neto es una estadística. La transición es un problema individual.",
      },
      {
        tipo: "subtitulo",
        texto: "El número que de verdad importa es el 39 %",
      },
      {
        tipo: "dato",
        valor: "39 %",
        texto:
          "de las competencias clave de los puestos actuales van a cambiar hacia 2030, según los propios empleadores. En 2023 la estimación era del 44 %.",
      },
      {
        tipo: "parrafo",
        texto:
          "Que la cifra haya bajado de 44 % a 39 % no significa que la disrupción se esté frenando. Significa que las empresas ya empezaron a moverse: parte de esa reconversión dejó de ser futuro y pasó a ser presente. Los que se preparan reducen el porcentaje pendiente.",
      },
      {
        tipo: "grafico",
        titulo: "Lo que esperan los empleadores hacia 2030",
        bajada: "Porcentaje de empleadores encuestados que afirma cada punto.",
        barras: [
          { label: "Espera mayor demanda de habilidades en IA y big data", valor: 90, texto: "90 %" },
          {
            label: "Espera que la IA transforme su negocio",
            valor: 86,
            texto: "86 %",
            tono: "neutro",
          },
          {
            label: "Se compromete a reconvertir y capacitar a su gente",
            valor: 77,
            texto: "77 %",
            tono: "neutro",
          },
          { label: "Competencias clave que cambiarán", valor: 39, texto: "39 %" },
        ],
        nota: "Casi todos ven venir el cambio. Tres de cada cuatro dicen que van a invertir en su gente para atravesarlo.",
        fuente: "World Economic Forum, Future of Jobs Report 2025",
      },
      {
        tipo: "subtitulo",
        texto: "Qué crece y qué se apaga",
      },
      {
        tipo: "parrafo",
        texto:
          "El informe distingue entre los roles que más crecen en términos relativos y los que más caen. Vale mirar las dos columnas juntas, porque el patrón que las une dice más que cualquiera de las dos por separado.",
      },
      {
        tipo: "tabla",
        titulo: "Roles en crecimiento y en retroceso hacia 2030",
        columnas: ["Los que más crecen", "Los que más caen"],
        filas: [
          ["Especialistas en big data", "Empleados de servicios postales"],
          ["Ingenieros fintech", "Cajeros de banco y roles afines"],
          ["Especialistas en IA y machine learning", "Empleados de carga de datos"],
          ["Desarrolladores de software y aplicaciones", "Personal administrativo y de secretaría"],
          ["Especialistas en gestión de seguridad", "Empleados de contabilidad y facturación"],
        ],
        fuente: "World Economic Forum, Future of Jobs Report 2025",
      },
      {
        tipo: "parrafo",
        texto:
          "La columna de la derecha tiene una característica común: son puestos construidos alrededor de **trasladar información de un lado a otro sin transformarla**. Cargar un dato, verificar un formulario, pasar un número de una planilla a un sistema. Es exactamente la clase de tarea que un modelo hace bien, barato y sin cansarse.",
      },
      {
        tipo: "parrafo",
        texto:
          "La columna de la izquierda, en cambio, agrupa puestos donde alguien tiene que decidir algo: qué significa este dato, qué riesgo estamos tomando, qué arquitectura conviene. Ahí la IA acelera, pero no reemplaza el criterio.",
      },
      {
        tipo: "cita",
        texto:
          "Lo que se automatiza primero no son los trabajos difíciles. Son los trabajos repetitivos, por difíciles que parezcan.",
      },
      {
        tipo: "subtitulo",
        texto: "El caso raro: la IA crea y destruye casi en la misma proporción",
      },
      {
        tipo: "parrafo",
        texto:
          "Hay un dato del informe que suele pasar desapercibido y que conviene tener a mano cuando alguien afirma que «la IA va a destruir el empleo». Dentro del rubro específico de IA y procesamiento de datos, el Foro proyecta **11 millones de puestos creados y 9 millones reemplazados**. Es de los rubros más equilibrados de todo el estudio.",
      },
      {
        tipo: "parrafo",
        texto:
          "La tecnología que más miedo genera es, en su propio terreno, bastante menos destructiva de lo que anuncia el titular promedio. Lo que sí hace, y con fuerza, es empujar competencias hacia arriba: el 90 % de los empleadores espera un aumento de la demanda de habilidades en IA y big data hacia 2030 —el crecimiento más rápido de todas las competencias medidas.",
      },
      {
        tipo: "subtitulo",
        texto: "Cómo se reescribe un puesto, en concreto",
      },
      {
        tipo: "parrafo",
        texto:
          "En las formaciones uso un ejercicio simple que se puede hacer en veinte minutos, solo o con el equipo. Consiste en desarmar el puesto en tareas y clasificarlas en tres columnas:",
      },
      {
        tipo: "lista",
        items: [
          "**Tareas que puedo delegar.** Repetitivas, con criterio estable y bajo costo de error. Redacción de borradores, resúmenes, transcripciones, primeras versiones de un análisis. Acá la IA gana tiempo y hay que dárselo.",
          "**Tareas que puedo amplificar.** Donde hoy hacés una versión y con ayuda podrías hacer cinco y elegir la mejor: ideas de campaña, escenarios financieros, revisiones de un contrato. Acá el valor no está en ir más rápido sino en explorar más opciones.",
          "**Tareas que son tuyas y no se negocian.** Decisiones con impacto en personas, juicios sobre información incompleta, conversaciones difíciles, cualquier cosa que requiera hacerse cargo del resultado. Acá la IA puede aportar insumos, nunca la firma.",
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "Cuando alguien termina ese ejercicio y ve que la primera columna se llevó el 30 o el 40 % de su semana, la pregunta cambia sola. Deja de ser «¿me van a reemplazar?» y pasa a ser «¿qué hago con el tiempo que se libera?». Esa segunda pregunta es mucho más difícil, y es la que verdaderamente define quién sale ganando.",
      },
      {
        tipo: "parrafo",
        texto:
          "Porque la reconversión no la va a resolver ninguna empresa por vos, aunque el 77 % diga que va a invertir en su gente. La va a acompañar. La decisión de qué columna querés que crezca en tu semana sigue siendo, todavía, bastante personal.",
      },
      {
        tipo: "fuentes",
        items: [
          {
            label: "World Economic Forum — Future of Jobs Report 2025, enero de 2025",
            url: "https://www.weforum.org/press/2025/01/future-of-jobs-report-2025-78-million-new-job-opportunities-by-2030-but-urgent-upskilling-needed-to-prepare-workforces/",
          },
          {
            label: "WEF — Los empleos que más crecen y más caen hacia 2030",
            url: "https://www.weforum.org/stories/2025/01/future-of-jobs-report-2025-the-fastest-growing-and-declining-jobs/",
          },
          {
            label: "WEF — Los empleos del futuro y las habilidades para conseguirlos",
            url: "https://www.weforum.org/stories/2025/01/future-of-jobs-report-2025-jobs-of-the-future-and-the-skills-you-need-to-get-them/",
          },
        ],
      },
    ],
  },

  /* =================================================================
     10 — LA REUNIÓN SEMANAL QUE SOSTIENE LA ADOPCIÓN
     ================================================================= */
  {
    slug: "reunion-semanal-de-adopcion-de-ia",
    titulo: "Sesenta minutos por semana es lo que sostiene una adopción de IA",
    categoria: "Método",
    fecha: "2026-07-03",
    fechaLabel: "3 de julio de 2026",
    lectura: "6 min de lectura",
    resumen:
      "Las adopciones de IA no se caen por falta de plan. Se caen en la semana cuatro, cuando aparece la primera urgencia. La cadencia fija es lo único que las sostiene: qué pasa en esa reunión, quién va y qué se revisa.",
    img: "/images/blog/07-sesenta-minutos-por-semana.png",
    imgLabel: "/images/blog/07-sesenta-minutos-por-semana.png",
    cuerpo: [
      {
        tipo: "parrafo",
        texto:
          "Si tuviera que quedarme con una sola práctica de todo lo que instalo en una empresa, y tirar el resto, me quedaría con la reunión semanal. No con el tablero de oportunidades, no con el protocolo de pruebas, no con la capacitación. Con los sesenta minutos del jueves.",
      },
      {
        tipo: "parrafo",
        texto:
          "Suena a poco. Es lo único que hace que todo lo demás siga existiendo en la semana seis.",
      },
      {
        tipo: "subtitulo",
        texto: "La adopción no se cae por falta de plan. Se cae en la semana cuatro",
      },
      {
        tipo: "parrafo",
        texto:
          "El patrón se repite con una regularidad casi aburrida. Semana uno: entusiasmo, todo el mundo participa. Semana dos: avances reales, se prueban cosas. Semana tres: aparece la primera urgencia del negocio y alguien no puede venir. Semana cuatro: la reunión «se pasa para la próxima». Semana seis: ya nadie la agenda, y si preguntás por el proyecto te dicen que quedó medio parado.",
      },
      {
        tipo: "parrafo",
        texto:
          "Nunca hay una decisión de abandonar. Es siempre lo mismo: la adopción de IA compite contra lo urgente en igualdad de condiciones, y en esa pelea pierde todas las veces. La cadencia fija es lo que la saca de esa competencia.",
      },
      {
        tipo: "cita",
        texto:
          "Nadie decide dejar de adoptar IA. Simplemente se deja de tener la reunión, que es la forma silenciosa de decidirlo.",
      },
      {
        tipo: "subtitulo",
        texto: "Los sesenta minutos, minuto a minuto",
      },
      {
        tipo: "parrafo",
        texto:
          "La agenda importa más de lo que parece, porque sin ella la reunión se convierte en una charla sobre herramientas nuevas. Esta es la que uso, y el reparto de tiempos no es decorativo:",
      },
      {
        tipo: "tabla",
        titulo: "Agenda de la reunión semanal de adopción",
        columnas: ["Bloque", "Minutos", "Qué pasa"],
        filas: [
          [
            "Compromisos de la semana pasada",
            "10",
            "Se leen uno por uno: hecho, no hecho, trabado. Sin discusión todavía. El objetivo es que quede a la vista lo que no avanzó",
          ],
          [
            "La prueba en curso",
            "20",
            "Quien la lleva muestra lo que hizo y los números que tiene hasta ahora, contra la línea de base. Se muestra el trabajo, no se cuenta",
          ],
          [
            "Decisiones",
            "15",
            "Cada prueba que llegó a su fecha se cierra con una de cinco palabras: adoptar, iterar, pausar, descartar o escalar. No se sale de la reunión sin la palabra dicha",
          ],
          [
            "Tablero de oportunidades",
            "10",
            "Ideas nuevas que aparecieron en la semana. Se anotan y se priorizan; no se discute su viabilidad acá",
          ],
          [
            "Compromisos",
            "5",
            "Qué hace cada uno hasta la próxima, con nombre. Se escribe en el momento y se manda al grupo antes de que termine el día",
          ],
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "El bloque más importante es el tercero, y es el que más se saltea cuando la reunión se estira. Si las decisiones quedan siempre para el final y el final siempre se come, la reunión se transforma en un informe de avance semanal — que es exactamente el formato que nadie sostiene más de dos meses.",
      },
      {
        tipo: "subtitulo",
        texto: "Quién va, y sobre todo quién no",
      },
      {
        tipo: "lista",
        items: [
          "**El referente de adopción.** Una persona de la casa que sostiene el proceso: convoca, modera, escribe los compromisos y persigue lo que quedó trabado. Le lleva tres o cuatro horas semanales contando la reunión.",
          "**Un responsable por cada área con prueba activa.** No el área entera: quien la está llevando adelante. Si un área no tiene prueba activa esa semana, no necesita estar.",
          "**Alguien de dirección, cada quince días.** No todas las semanas: cada dos. Presente en el bloque de decisiones, que es donde su participación cambia algo. Su presencia intermitente y previsible funciona mejor que la permanente, que termina convirtiendo la reunión en una rendición de cuentas.",
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "Lo que no es esta reunión: una reunión de todos. Si van doce personas, se vuelve una presentación y deja de ser un espacio de trabajo. Con cuatro o cinco alcanza y sobra.",
      },
      {
        tipo: "subtitulo",
        texto: "Las tres reglas que la mantienen viva",
      },
      {
        tipo: "lista",
        items: [
          "**Día y hora fijos, en el calendario, recurrente.** Si cada semana hay que coordinar cuándo, la reunión ya está muerta y todavía no se dieron cuenta. Elegí un horario que no compita con el pico de trabajo del negocio.",
          "**Se hace igual aunque no haya novedades.** Es la regla más resistida y la más importante. Una reunión de quince minutos donde se dice «esta semana no avanzamos por X» es información valiosísima: es la señal temprana de que algo se está apagando. Cancelarla por falta de novedades es tapar justo el dato que hacía falta ver.",
          "**Termina con decisiones escritas.** Cinco líneas en el grupo de trabajo, el mismo día. Sin ese registro, la semana siguiente arranca discutiendo qué se había acordado.",
        ],
      },
      {
        tipo: "subtitulo",
        texto: "Cómo se ve a los tres meses",
      },
      {
        tipo: "parrafo",
        texto:
          "Una empresa que sostuvo la cadencia doce semanas llega a un lugar bastante distinto del que imaginaba al empezar. Suele tener entre cuatro y seis pruebas cerradas —con varias descartadas, que es lo esperable—, dos o tres procesos funcionando de otra manera, un tablero con más ideas de las que puede probar y, sobre todo, gente que ya sabe cómo se hace. Ese último punto es el que importa: para ese momento, la reunión ya no la sostengo yo.",
      },
      {
        tipo: "parrafo",
        texto:
          "El [State of AI 2025 de McKinsey](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai) encontró que las organizaciones de alto desempeño en IA son tres veces más propensas a que sus líderes senior muestren compromiso sostenido con las iniciativas. «Sostenido» es una palabra difícil de convertir en una acción concreta. Aparecer una hora cada quince días, siempre el mismo día, es lo más concreto que se me ocurre.",
      },
      {
        tipo: "parrafo",
        texto:
          "Instalar esa cadencia, y dejarla funcionando con gente de la casa, es literalmente el objetivo del [Programa INTEGRA](/programa-integra). Todo lo demás —el tablero, el protocolo, los roles— existe para darle contenido a esos sesenta minutos.",
      },
      {
        tipo: "fuentes",
        items: [
          {
            label: "McKinsey — The State of AI, 2025",
            url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
          },
          {
            label: "BCG — From Potential to Profit: Closing the AI Impact Gap",
            url: "https://www.bcg.com/publications/2025/closing-the-ai-impact-gap",
          },
        ],
      },
    ],
  },

  /* =================================================================
     11 — DEL CAOS AL CRITERIO COMÚN
     ================================================================= */
  {
    slug: "criterio-comun-de-ia-en-la-empresa",
    titulo: "De «cada uno usa una IA distinta» a tener un criterio común",
    categoria: "Adopción",
    fecha: "2026-06-30",
    fechaLabel: "30 de junio de 2026",
    lectura: "7 min de lectura",
    resumen:
      "Seis herramientas, ninguna regla y datos de clientes viajando por chats que nadie audita. El recorrido de una empresa que pasó del uso disperso a un método común, y los tres pasos que marcaron la diferencia.",
    img: "/images/blog/08-de-fragmentacion-a-criterio-comun.png",
    imgLabel: "/images/blog/08-de-fragmentacion-a-criterio-comun.png",
    cuerpo: [
      {
        tipo: "parrafo",
        texto:
          "Una distribuidora de sesenta personas me llamó con un pedido raro: querían «poner orden con la IA». Cuando pregunté qué estaba desordenado, la respuesta fue larga. Comercial armaba propuestas con una herramienta, administración usaba otra para resumir mails, alguien de marketing había contratado una tercera con su tarjeta, y el gerente de operaciones le pasaba planillas con datos de clientes a un chat para que se las analizara.",
      },
      {
        tipo: "parrafo",
        texto:
          "Nadie estaba haciendo nada malo. Cada uno resolvía su problema con lo que tenía a mano. El problema era que la suma de esas soluciones individuales no era una capacidad de la empresa: era ruido con riesgo adentro.",
      },
      {
        tipo: "subtitulo",
        texto: "El diagnóstico: seis herramientas, ningún criterio",
      },
      {
        tipo: "parrafo",
        texto:
          "El primer hallazgo fue de escala. El uso real era mucho mayor de lo que la dirección creía. Es un desfasaje sistemático, no una particularidad de esta empresa: el informe [Superagency in the workplace](https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/superagency-in-the-workplace-empowering-people-to-unlock-ais-full-potential) de McKinsey encontró que los empleados adoptan IA generativa mucho más rápido de lo que sus líderes estiman.",
      },
      {
        tipo: "parrafo",
        texto:
          "El segundo hallazgo fue de criterio. Preguntamos a doce personas la misma cosa: «¿qué información de la empresa no pondrías en una de estas herramientas?». Hubo doce respuestas distintas. Algunas muy prudentes, algunas muy despreocupadas, ninguna equivocada — porque no había ninguna regla contra la cual estar equivocado.",
      },
      {
        tipo: "cita",
        texto:
          "Cuando no hay criterio escrito, cada persona improvisa el suyo. Y después la empresa descubre que tenía sesenta políticas de datos distintas.",
      },
      {
        tipo: "subtitulo",
        texto: "Los tres pasos que marcaron la diferencia",
      },
      {
        tipo: "parrafo",
        texto:
          "Lo que hicieron en los dos meses siguientes fue notablemente poco sofisticado. Tres pasos, en este orden, que es el orden que importa:",
      },
      {
        tipo: "lista",
        items: [
          "**Primero, mapear el uso real sin castigar a nadie.** La dirección mandó un mensaje explícito: queremos saber qué usás, no vamos a prohibir nada y no hay consecuencias. Sin esa aclaración —dicha por el dueño, no por el área de sistemas— el mapa habría salido incompleto y no habría servido para nada.",
          "**Segundo, escribir un criterio de una página.** Una sola página, en el idioma de la empresa: qué se puede hacer sin preguntar, qué información no sale nunca de la empresa, y qué salidas requieren revisión humana antes de mandarse a un cliente. Nada de un reglamento de veinte páginas que nadie va a leer.",
          "**Tercero, elegir una herramienta común con cuentas de empresa y un dueño.** No la mejor del mercado: una que cubriera el 80 % de los usos, contratada a nombre de la empresa, con una persona responsable de administrarla y de contestar dudas.",
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "El orden es lo que hace que funcione. Casi todas las empresas que fracasan en esto empiezan por el tercer paso —compran una plataforma— y después descubren que nadie sabe para qué usarla ni con qué límites.",
      },
      {
        tipo: "tabla",
        titulo: "Antes y después, a los dos meses",
        columnas: ["Dimensión", "Antes", "Después"],
        filas: [
          [
            "Herramientas",
            "Seis, contratadas por cuatro personas distintas",
            "Una común con cuenta de empresa, más dos específicas justificadas",
          ],
          [
            "Datos sensibles",
            "Cada uno decidía por su cuenta qué pegar en un chat",
            "Una regla escrita de tres líneas que todos conocen",
          ],
          [
            "Dueño",
            "Nadie",
            "Una persona con nombre, con tres horas semanales asignadas",
          ],
          [
            "Lo que funcionaba bien",
            "Se quedaba en el escritorio de quien lo descubría",
            "Se comparte en la reunión quincenal y queda en un repositorio",
          ],
          [
            "Gasto",
            "Disperso en tarjetas personales, sin total conocido",
            "Una factura, un número, revisión trimestral",
          ],
        ],
      },
      {
        tipo: "subtitulo",
        texto: "Lo que no hicieron",
      },
      {
        tipo: "lista",
        items: [
          "**No prohibieron nada.** La prohibición no elimina el uso: lo esconde, y lo esconde justo de la gente que necesitaría verlo. Un uso invisible no se puede mejorar ni proteger.",
          "**No compraron una plataforma cara.** La tentación de resolver un problema de criterio con una compra es enorme, porque una compra se ejecuta en una tarde y un criterio lleva conversaciones. Pero la plataforma sin criterio reproduce el mismo caos con mejor interfaz.",
          "**No armaron un comité.** Un dueño con tiempo asignado y una reunión quincenal funcionaron mucho mejor que seis personas reunidas una vez por mes para aprobar cosas.",
        ],
      },
      {
        tipo: "subtitulo",
        texto: "Lo que sí cambió de fondo",
      },
      {
        tipo: "parrafo",
        texto:
          "El efecto más importante no fue el orden ni el ahorro. Fue que lo que descubría una persona empezó a servirle a las demás. Antes, alguien de administración encontraba una manera mucho mejor de resolver una tarea y esa mejora moría en su escritorio; nadie más se enteraba. Después, esa misma mejora aparecía en la reunión quincenal y a la semana la estaban usando tres áreas.",
      },
      {
        tipo: "parrafo",
        texto:
          "Ese es el cambio real entre uso individual y capacidad organizacional: no que la gente use mejor las herramientas, sino que los hallazgos se acumulen en algún lado en vez de evaporarse.",
      },
      {
        tipo: "parrafo",
        texto:
          "Y ninguna de las tres cosas que hicieron requería tecnología. Requerían estructura: alguien que decida, algo escrito y un lugar donde las cosas se junten. Eso es lo que hay que instalar antes —no después— de comprar la próxima herramienta.",
      },
      {
        tipo: "fuentes",
        items: [
          {
            label: "McKinsey — Superagency in the workplace, enero de 2025",
            url: "https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/superagency-in-the-workplace-empowering-people-to-unlock-ais-full-potential",
          },
          {
            label: "McKinsey — The State of AI, 2025",
            url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
          },
        ],
      },
    ],
  },

  /* =================================================================
     12 — DE LA ANSIEDAD DEL DUEÑO A UN PLAN
     ================================================================= */
  {
    slug: "el-dueno-quiere-hacer-algo-con-ia",
    titulo: "Del «el dueño quiere hacer algo con IA» a un plan ejecutable",
    categoria: "Liderazgo",
    fecha: "2026-06-26",
    fechaLabel: "26 de junio de 2026",
    lectura: "7 min de lectura",
    resumen:
      "Vuelve de un congreso convencido de que se están quedando atrás y baja la orden. La ansiedad es buen combustible y pésima brújula: siete preguntas que la convierten en una dirección concreta.",
    img: "/images/blog/09-de-idea-del-dueno-a-plan.png",
    imgLabel: "/images/blog/09-de-idea-del-dueno-a-plan.png",
    cuerpo: [
      {
        tipo: "parrafo",
        texto:
          "El llamado empieza casi siempre igual: «Pablo, el dueño volvió de un congreso y quiere que hagamos algo con IA. No sabemos bien qué, pero quiere que arranquemos ya».",
      },
      {
        tipo: "parrafo",
        texto:
          "Del otro lado hay un gerente incómodo, que necesita llevar una respuesta a una reunión y que sabe que si contesta cualquier cosa va a terminar sosteniendo un proyecto que nadie definió.",
      },
      {
        tipo: "subtitulo",
        texto: "La ansiedad es buen combustible y pésima brújula",
      },
      {
        tipo: "parrafo",
        texto:
          "Conviene decir algo a favor del dueño: esa urgencia suele estar bien fundada. Vio algo real, entendió que el contexto cambió y quiere moverse. La energía que trae es un activo escaso — muchos proyectos de IA fracasan justamente por falta de esa convicción arriba.",
      },
      {
        tipo: "parrafo",
        texto:
          "El problema es que la ansiedad empuja pero no orienta. Y como no orienta, la empresa hace lo primero que se le ocurre, que casi siempre es comprar una herramienta o contratar una capacitación general. Dos meses después la energía se gastó, no pasó nada medible, y la próxima vez que el dueño proponga algo va a encontrar un equipo bastante más escéptico.",
      },
      {
        tipo: "cita",
        texto:
          "La pregunta no es qué hacemos con IA. Es qué problema de esta empresa vale la pena que la IA toque primero.",
      },
      {
        tipo: "subtitulo",
        texto: "Las siete preguntas que convierten urgencia en dirección",
      },
      {
        tipo: "parrafo",
        texto:
          "Esta conversación dura una hora y hay que tenerla con el dueño, no sobre el dueño. Es la diferencia entre volver con una orden y volver con un encuadre.",
      },
      {
        tipo: "tabla",
        titulo: "La conversación que cambia todo",
        columnas: ["Pregunta", "Por qué funciona"],
        filas: [
          [
            "¿Qué viste que te impresionó?",
            "Recupera el caso concreto que disparó todo. Muchas veces es algo mucho más acotado de lo que parecía, y ahí ya hay un candidato a primera prueba",
          ],
          [
            "¿Qué te preocupa que pase si no hacemos nada?",
            "Distingue miedo competitivo de dolor operativo. Son urgencias distintas y llevan a proyectos distintos",
          ],
          [
            "Si dentro de seis meses esto salió bien, ¿qué es distinto acá adentro?",
            "Obliga a describir un resultado observable. Si la respuesta es «estaríamos más avanzados», hay que insistir hasta que aparezca algo que se pueda ver",
          ],
          [
            "¿Qué proceso de la empresa te duele hoy?",
            "Trae la conversación desde la tecnología hacia la operación, que es donde vive el valor",
          ],
          [
            "¿Cuánto estás dispuesto a poner: plata, horas de tu gente y tiempo tuyo?",
            "Las tres, y en ese orden de dificultad. El tercero es el que predice el resultado — un dueño que no pone tiempo propio está delegando algo que no se delega",
          ],
          [
            "¿Quién va a ser el dueño interno de esto?",
            "Sin un nombre y horas asignadas, cualquier plan es una lista de deseos. Y ese nombre no puede ser «el de sistemas» por defecto",
          ],
          [
            "¿Qué NO estamos dispuestos a cambiar?",
            "La más subestimada. Define los límites reales del proyecto antes de chocar contra ellos en la semana cinco",
          ],
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "La quinta pregunta es la que más incomoda y la que más información da. El principio 10-20-70 de BCG estima que el 70 % del valor de una iniciativa de IA sale de personas, procesos y cultura — es decir, del territorio que solo se mueve si quien dirige se involucra. Un presupuesto sin tiempo de dirección compra tecnología, no resultados.",
      },
      {
        tipo: "subtitulo",
        texto: "De las respuestas al plan: tres decisiones",
      },
      {
        tipo: "parrafo",
        texto:
          "Con esas siete respuestas, el plan sale en media hora y tiene tres decisiones. No más:",
      },
      {
        tipo: "lista",
        items: [
          "**Alcance: un área, no la empresa.** La que combine dolor real con un responsable dispuesto. Empezar por todos lados es la manera más segura de no terminar en ninguno.",
          "**Dueño interno con horas asignadas.** Tres o cuatro horas semanales, sacadas de algo que deje de hacer. Si esas horas se suman a su carga actual, el proyecto ya está compitiendo contra lo urgente y va a perder.",
          "**Primera prueba con fecha de cierre.** Chica, medible y cerrada en tres o cuatro semanas. La primera prueba no busca el mayor impacto posible: busca demostrar que en esta empresa las cosas se prueban y se cierran.",
        ],
      },
      {
        tipo: "subtitulo",
        texto: "El error más caro: contestar con una herramienta",
      },
      {
        tipo: "parrafo",
        texto:
          "Cuando el dueño baja la urgencia, la respuesta más rápida —y la más tentadora, porque se ejecuta en una tarde— es comprar algo. Una plataforma, licencias para todos, un curso para cuarenta personas. Se puede informar en la próxima reunión y suena a acción.",
      },
      {
        tipo: "parrafo",
        texto:
          "El costo aparece después. La herramienta llega a una empresa que no definió qué proceso quería cambiar, así que cada uno la usa como puede o no la usa. A los tres meses la conclusión que circula no es «no supimos implementarlo», que sería útil, sino «la IA no era para nosotros», que cierra la puerta por un año.",
      },
      {
        tipo: "parrafo",
        texto:
          "Por eso, cuando me llaman con el pedido del título, mi primera propuesta nunca es un plan de trabajo. Es una reunión de una hora con el dueño y estas siete preguntas. En la mayoría de los casos, de esa hora sale un proyecto bastante más chico, bastante más concreto y bastante más ambicioso que el que estaba en la cabeza de todos.",
      },
      {
        tipo: "fuentes",
        items: [
          {
            label: "BCG — From Potential to Profit: Closing the AI Impact Gap",
            url: "https://www.bcg.com/publications/2025/closing-the-ai-impact-gap",
          },
          {
            label: "McKinsey — The State of AI, 2025",
            url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
          },
        ],
      },
    ],
  },

  /* =================================================================
     13 — QUE NO DEPENDA DE UNA SOLA PERSONA
     ================================================================= */
  {
    slug: "adopcion-de-ia-sin-depender-de-una-persona",
    titulo: "Si el experto en IA se va, se cae todo",
    categoria: "Equipos",
    fecha: "2026-06-23",
    fechaLabel: "23 de junio de 2026",
    lectura: "7 min de lectura",
    resumen:
      "Toda empresa que arrancó con IA tiene un entusiasta que sabe más que el resto. Es el mejor activo del proceso y su punto más frágil. Cómo pasar de excepciones personales a un sistema que sobrevive a las vacaciones.",
    img: "/images/blog/10-si-el-experto-se-va.png",
    imgLabel: "/images/blog/10-si-el-experto-se-va.png",
    cuerpo: [
      {
        tipo: "parrafo",
        texto:
          "Una empresa me escribió en marzo con un problema muy concreto: se les iba Martín. Martín no era el gerente de sistemas ni el director de innovación. Era un analista de veintiocho años que había aprendido a usar bien las herramientas de IA y que, sin que nadie se lo pidiera formalmente, había terminado resolviendo con ellas media docena de tareas de tres áreas distintas.",
      },
      {
        tipo: "parrafo",
        texto:
          "Cuando renunció, nadie sabía qué hacía exactamente ni cómo. Los informes que él armaba en veinte minutos volvieron a llevar medio día. Y lo peor: nadie podía explicar por qué antes salían bien.",
      },
      {
        tipo: "subtitulo",
        texto: "La diferencia entre una excepción y un sistema",
      },
      {
        tipo: "parrafo",
        texto:
          "Todo lo que Martín había construido era una excepción: funcionaba porque él estaba. Un sistema es lo contrario — funciona porque está escrito, tiene dueño y se puede transferir. La distinción parece obvia enunciada así, pero en la práctica cuesta verla, porque una excepción que funciona muy bien se parece bastante a un sistema.",
      },
      {
        tipo: "tabla",
        titulo: "Cómo distinguir una de otro",
        columnas: ["Dimensión", "Excepción", "Sistema"],
        filas: [
          ["Quién sabe cómo se hace", "Una persona", "Al menos dos, y está escrito"],
          [
            "Dónde vive el conocimiento",
            "En su cabeza y en su historial de chats",
            "En un repositorio que el resto puede abrir hoy",
          ],
          [
            "Si esa persona falta tres semanas",
            "La tarea vuelve al método anterior o no se hace",
            "Otro la toma con una hora de lectura",
          ],
          [
            "Cómo mejora",
            "Cuando a esa persona se le ocurre algo",
            "Cualquiera propone un cambio y se revisa en la reunión",
          ],
          [
            "Cómo se detecta un error",
            "Cuando explota",
            "Hay un control definido y alguien que lo mira",
          ],
        ],
      },
      {
        tipo: "cita",
        texto:
          "Si tu adopción de IA depende de una persona, no tenés una capacidad instalada. Tenés un talento contratado, y los talentos se van.",
      },
      {
        tipo: "subtitulo",
        texto: "Qué documentación importa de verdad",
      },
      {
        tipo: "parrafo",
        texto:
          "Acá hay una trampa. Cuando una empresa se asusta con esto, la reacción típica es pedir «documentación», y lo que llega son cuarenta páginas explicando cómo se usa una herramienta que además cambia cada tres meses. Eso no sirve y nadie lo lee.",
      },
      {
        tipo: "parrafo",
        texto:
          "Lo que hay que documentar es mucho más corto y mucho más específico de tu empresa:",
      },
      {
        tipo: "lista",
        items: [
          "**La instrucción que funciona, y por qué.** El texto exacto que se usa, pegado tal cual, con dos renglones explicando qué se probó antes y por qué esta versión quedó. El «por qué» es lo que permite adaptarla cuando algo cambie.",
          "**Qué información entra y cuál no.** Qué archivos, de qué sistema, en qué formato. Y explícitamente qué no se carga nunca.",
          "**Qué se revisa antes de que salga.** El control humano concreto: qué mira una persona antes de mandar el resultado a un cliente, a un proveedor o al sistema contable.",
          "**Qué se probó y se descartó.** Es la parte que más se olvida y la que más tiempo ahorra. Sin esto, el reemplazo de Martín va a pasar tres semanas redescubriendo los mismos callejones sin salida.",
          "**Dónde está el error típico.** En qué casos falla, cómo se nota y qué hacer cuando pasa.",
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "Son cinco puntos y entran en una página por proceso. La regla que uso: si documentar un proceso lleva más de treinta minutos, probablemente el proceso todavía no está lo suficientemente entendido como para documentarlo.",
      },
      {
        tipo: "subtitulo",
        texto: "Roles, no héroes",
      },
      {
        tipo: "parrafo",
        texto:
          "El otro pilar es que las responsabilidades estén repartidas por rol y no concentradas en quien más entusiasmo tiene. Con tres roles alcanza para una PyME:",
      },
      {
        tipo: "tabla",
        titulo: "Los tres roles mínimos",
        columnas: ["Rol", "Qué decide", "Cuánto tiempo pide"],
        filas: [
          [
            "Referente de adopción",
            "Sostiene el método: convoca la reunión, mantiene el tablero y el repositorio, persigue lo trabado. No decide qué se prueba: garantiza que se decida",
            "3 o 4 horas por semana",
          ],
          [
            "Dueño de proceso",
            "Es de cada área. Decide si el cambio se adopta en su proceso, porque después va a convivir con él todos los días",
            "2 horas por semana mientras hay una prueba activa en su área",
          ],
          [
            "Dirección",
            "Prioriza entre áreas, habilita recursos y ratifica los cierres. Aparece cada quince días",
            "1 hora cada dos semanas",
          ],
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "Lo importante de esta tabla no son los roles sino la última columna. Un rol sin horas asignadas es un título honorífico: la persona lo va a atender con lo que le sobre, y en una PyME nunca sobra nada.",
      },
      {
        tipo: "subtitulo",
        texto: "La prueba de las tres semanas",
      },
      {
        tipo: "parrafo",
        texto:
          "Hay una manera muy simple de saber si tenés un sistema o una excepción, y no requiere que se te vaya nadie: mandá de vacaciones a la persona que más sabe y no la llames.",
      },
      {
        tipo: "parrafo",
        texto:
          "Si a las tres semanas los procesos siguen funcionando —quizás un poco más lento, con alguna consulta—, tenés un sistema. Si a los tres días alguien la está llamando por WhatsApp para preguntarle cómo se hacía algo, tenés una excepción muy bien disfrazada. Y es mejor descubrirlo mientras esa persona todavía trabaja con vos.",
      },
      {
        tipo: "parrafo",
        texto:
          "El principio 10-20-70 de BCG dice que el 70 % del valor de la IA sale de personas, procesos y cultura. Lo que casi nunca se aclara es que ese 70 % es también la parte más frágil: los algoritmos no renuncian, la gente sí. Por eso la meta no puede ser que alguien de la casa sepa mucho de IA. Tiene que ser que la empresa sepa — que es una cosa distinta y bastante más difícil de construir.",
      },
      {
        tipo: "fuentes",
        items: [
          {
            label: "BCG — From Potential to Profit: Closing the AI Impact Gap",
            url: "https://www.bcg.com/publications/2025/closing-the-ai-impact-gap",
          },
          {
            label: "McKinsey — The State of AI, 2025",
            url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
          },
        ],
      },
    ],
  },
];

export const getPost = (slug: string) => blog.find((p) => p.slug === slug);
