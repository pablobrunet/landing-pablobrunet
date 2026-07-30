/* =====================================================================
   VIDEOS — charlas grabadas (home) y participaciones en TV (/sobre-mi)
   ---------------------------------------------------------------------
   CÓMO CARGAR UN VIDEO
   Pegá la URL de YouTube en `youtube`, tal como la copiás del navegador.
   Se aceptan todos estos formatos (o el ID suelto):

     https://www.youtube.com/watch?v=ABC123xyz00
     https://youtu.be/ABC123xyz00
     https://www.youtube.com/shorts/ABC123xyz00
     https://www.youtube.com/embed/ABC123xyz00
     https://www.youtube.com/live/ABC123xyz00
     ABC123xyz00

   Si `youtube` queda vacío (""), la tarjeta muestra un marco punteado
   avisando que falta el video: la sección no se rompe.

   La miniatura y el reproductor los trae YouTube a partir del ID. El video
   NO se descarga hasta que alguien hace clic en reproducir.
   ===================================================================== */

export interface Video {
  titulo: string; // título de la charla / entrevista
  contexto: string; // evento, programa o canal
  fecha?: string; // vacío = la tarjeta no muestra fecha
  youtube: string;
}

/** Segundos de arranque a partir del parámetro `t` o `start` de la URL.
    Acepta `t=12007`, `t=12007s` y `t=3h20m7s`. */
const segundosDeInicio = (valor: string): number => {
  const m = valor.match(/[?&](?:t|start)=([\dhms]+)/i);
  if (!m) return 0;
  const bruto = m[1];

  if (/^\d+s?$/.test(bruto)) return parseInt(bruto, 10);

  const partes = bruto.match(/(\d+)h|(\d+)m|(\d+)s/gi) ?? [];
  return partes.reduce((total, p) => {
    const n = parseInt(p, 10);
    if (/h$/i.test(p)) return total + n * 3600;
    if (/m$/i.test(p)) return total + n * 60;
    return total + n;
  }, 0);
};

export interface DatosYoutube {
  id: string; // "" si la URL no tiene un ID válido
  inicio: number; // segundos; 0 = desde el principio
}

/** Lee una URL de YouTube en cualquiera de sus formatos y devuelve el ID y
    el segundo de arranque. Si el ID no es válido, `id` queda en "" y la
    tarjeta muestra el marco de "video pendiente" en lugar de un embed roto. */
export const parseYoutube = (valor: string): DatosYoutube => {
  const v = (valor ?? "").trim();
  const vacio = { id: "", inicio: 0 };
  if (v === "") return vacio;

  const inicio = segundosDeInicio(v);

  // ID suelto: 11 caracteres del alfabeto de YouTube.
  if (/^[\w-]{11}$/.test(v)) return { id: v, inicio: 0 };

  const patrones = [
    /[?&]v=([\w-]{11})(?![\w-])/, // watch?v=ID
    /youtu\.be\/([\w-]{11})(?![\w-])/, // youtu.be/ID
    /\/shorts\/([\w-]{11})(?![\w-])/, // shorts/ID
    /\/embed\/([\w-]{11})(?![\w-])/, // embed/ID
    /\/live\/([\w-]{11})(?![\w-])/, // live/ID
  ];
  for (const p of patrones) {
    const m = v.match(p);
    if (m) return { id: m[1], inicio };
  }
  return vacio;
};

/* =====================================================================
   CHARLAS GRABADAS — va debajo de la sección de Charlas en el home
   ===================================================================== */
export const charlasMeta = {
  eyebrow: "En video",
  titulo: "Charlas grabadas",
  subtitulo: "Charlas completas registradas en distintos eventos.",
};

export const charlas: Video[] = [
  {
    // Título tal como está publicado en el canal de AgroActiva.
    titulo: "IA práctica para empresas agropecuarias",
    contexto: "AgroActiva Arena",
    fecha: "Junio de 2026",
    youtube: "https://www.youtube.com/watch?v=2-pffMobZM0",
  },
  {
    titulo: "De cero a CEO: 30 minutos de IA para validar el ADN de tu emprendimiento",
    contexto: "JIJE · Universidad Nacional del Litoral",
    fecha: "Octubre de 2025",
    // Transmisión larga: el `t=12007` arranca en tu charla (3 h 20 min),
    // no al comienzo de la jornada. No lo borres al editar la URL.
    youtube: "https://www.youtube.com/live/v8FND3kfdSY?si=pB_CUlWC65ElKL1J&t=12007",
  },
  {
    /* Título descriptivo armado con lo que citó El Litoral de tu charla
       (tecnología, IA y nuevas generaciones). Si tenía un título propio,
       reemplazalo. */
    titulo: "Tecnología e IA para emprender",
    contexto: "3er. TEDIND-X · Unión Industrial de Santa Fe",
    fecha: "Abril de 2025",
    // Transmisión completa del evento: el `t=4035` arranca en tu charla
    // (1 h 07 min). No lo borres al editar la URL.
    youtube: "https://www.youtube.com/live/RIEMhpVYOOA?si=k3XIOvDEM9rm0AGh&t=4035",
  },
  {
    // Título tal como está publicado en el canal de AgroActiva.
    titulo: "60 días para dominar la IA",
    contexto: "FARO · AgroActiva",
    fecha: "Noviembre de 2025",
    youtube: "https://www.youtube.com/watch?v=9CNLDkD04Rs",
  },
];

/* =====================================================================
   PARTICIPACIONES EN TELEVISIÓN — sección de /sobre-mi
   Dos programas de TV y una entrevista en un canal de YouTube.
   ===================================================================== */
export const televisionMeta = {
  /* Ya no es solo televisión: hay streams, un programa boliviano y notas.
     El nombre de la sección lo refleja. */
  eyebrow: "Entrevistas y medios",
  titulo: "Entrevistas *y notas*",
  subtitulo:
    "Participaciones en televisión, streams y programas sobre inteligencia artificial aplicada a negocios.",
};

/* OJO CON LAS FECHAS de las de Recreo Diario y Dos Tercios: están subidas a
   tu canal ("Pablo Brunet | IA para Empresas") y la fecha de YouTube es la de
   la re-subida, no la de emisión. Completá cuándo salió al aire cada una.
   Las que están en canales de terceros sí llevan su fecha real. */
export const television: Video[] = [
  {
    titulo: "Comercio electrónico, experiencias con IA y qué significa emprender",
    contexto: "Dos Tercios Stream",
    youtube: "https://www.youtube.com/watch?v=ThitwdIdODA",
  },
  {
    titulo: "Tendencias de IA y cómo aplicarla en el campo",
    contexto: "AgroActiva Stream",
    youtube: "https://www.youtube.com/watch?v=IB_ArQbIIFI",
  },
  {
    // Título del capítulo tal como está publicado en el canal del programa.
    titulo: "LLMs, IA agéntica y superinteligencia",
    contexto: "IAdáptate Bolivia",
    fecha: "Julio de 2026",
    youtube: "https://youtu.be/9DPlqFnbh1U?si=P1oaz6j9h7kLgocV",
  },
  {
    titulo: "Qué es NotebookLM y para qué sirve",
    contexto: "Recreo Diario",
    youtube: "https://www.youtube.com/watch?v=cmhQZyfvoWo",
  },
  {
    titulo: "Nuevas tendencias de consumo con inteligencia artificial",
    contexto: "Recreo Diario",
    youtube: "https://www.youtube.com/watch?v=XU4GKt66Oxc",
  },
  {
    titulo: "Nuevas tendencias en el comercio y el impacto de la IA",
    contexto: "Recreo Diario",
    youtube: "https://www.youtube.com/watch?v=cNaCgPu1KdY",
  },
];

/* =====================================================================
   SESIONES CONSTITUCIONALES — reforma de la Constitución de Santa Fe
   ---------------------------------------------------------------------
   Las dos sesiones son de la misma exposición, así que las tarjetas llevan
   el detalle corto: el desarrollo completo está en el texto de la sección.
   La Comisión de Declaraciones, Derechos y Garantías sesionó entre el 22 de
   julio y el 8 de septiembre de 2025. Si querés la fecha exacta de cada
   sesión, reemplazá el año.
   ===================================================================== */
export const reformaVideos: Video[] = [
  {
    titulo: "Exposición de la propuesta · primera sesión",
    contexto: "Comisión de Declaraciones, Derechos y Garantías",
    fecha: "2025",
    youtube: "https://www.youtube.com/watch?v=3Maza-HcKQE",
  },
  {
    titulo: "Exposición de la propuesta · segunda sesión",
    contexto: "Comisión de Declaraciones, Derechos y Garantías",
    fecha: "2025",
    youtube: "https://www.youtube.com/watch?v=AGD8VxrD9sw",
  },
];
