/* =====================================================================
   /programa-ejecutivos/pablo-brunet — contenido del mini sitio
   ---------------------------------------------------------------------
   Perfil de Pablo Brunet dentro del programa para ejecutivos. Se llega
   desde la tarjeta del equipo ("Conocer más"). Misma estructura que el
   de Alejandro (data/rostagno.ts).

   Todo sale de lo que ya está publicado en el sitio, sin inventar nada:
   cifras y formación de data/sobreMi.ts, lugares y temas de las
   capacitaciones de data/servicios.ts, eventos de data/prensa.ts y los
   testimonios del muro (data/testimonios.ts), textuales.

   Las fotos son copias en webp de las que ya estaban en /public/images/
   (speaker, capacitaciones, prensa, reforma) y viven en
   /public/images/pablo/.
   ===================================================================== */

import { comentarios } from "./testimonios";
import { empresas } from "./empresas";

const IMG = "/images/pablo";

/* Testimonios: mensajes reales de participantes de charlas y
   capacitaciones. Se toman del muro por nombre para no duplicar el texto. */
const elegidos = ["Florencia B.", "Marce", "Seba M.", "Diego A.", "Agus", "Nico R."];

export const pablo = {
  seo: {
    title: "Pablo Brunet — Consultor, capacitador y speaker en IA aplicada | Programas AI First",
    description:
      "Especialista en inteligencia artificial aplicada a pymes: consultoría, capacitaciones y charlas. Capacitador del Programa para Ejecutivos junto a Alejandro Rostagno.",
  },

  hero: {
    chip: "Equipo del Programa para Ejecutivos",
    nombre: "Pablo Brunet",
    rol: "Consultor · Capacitador · Speaker",
    bajada:
      "Ayuda a empresas a convertir la inteligencia artificial en una ventaja real. No arranca por la herramienta: arranca por la tarea que hoy le hace perder tiempo o plata al equipo, y recién ahí evalúa si la IA aporta algo.",
    imagen: `${IMG}/tedindx.webp`,
    imagenAlt: "Pablo Brunet dando una charla en el escenario de TEDIND-X",
    /* La foto es 16:9 y el marco 4:3: el recorte se corre a la izquierda
       para que Pablo quede adentro junto al cartel. */
    imagenPos: "30% center",
    pie: "TEDIND-X · Santa Fe",
  },

  /* Las mismas cifras que el home (data/sobreMi.ts) + la credencial */
  cifras: [
    { valor: "+16", label: "años trabajando con pymes", detalle: "8 de ellos como consultor" },
    { valor: "+3.000", label: "personas capacitadas", detalle: "en empresas, cámaras y universidades" },
    { valor: "+50", label: "charlas y eventos", detalle: "como speaker, ante públicos muy distintos" },
    { valor: "Select", label: "Partner de OpenAI", detalle: "nivel con el que está acreditada InnerFlow AI" },
  ],

  /* Quién es: retrato + los seis roles */
  perfil: {
    eyebrow: "Quién es",
    titulo: "Primero entender la empresa.",
    tituloResalte: "Después, la herramienta.",
    retrato: `${IMG}/retrato.webp`,
    texto:
      "Pablo trabaja con pymes desde bastante antes de que la IA fuera un tema de conversación. Conoce de cerca lo que pasa adentro de una empresa: poco tiempo, demasiadas urgencias, procesos que dependen de personas clave. En el programa aporta la mirada de inteligencia artificial aplicada: qué tareas conviene resolver primero, con qué herramientas y cómo lograr que el equipo las siga usando.",
    roles: [
      { titulo: "Consultor", desc: "Lidera InnerFlow AI: diagnóstico, automatizaciones y soluciones de IA para empresas." },
      { titulo: "Capacitador", desc: "Talleres prácticos en empresas, cámaras y parques industriales, sobre el trabajo real de cada equipo." },
      { titulo: "Speaker", desc: "Charlas en AgroActiva, TEDIND-X, ASSAL y las Jornadas de Jóvenes Emprendedores de la UNL." },
      { titulo: "Creador del Método INTEGRA", desc: "El sistema con el que las pymes suman IA con orden, paso a paso." },
      { titulo: "Formación", desc: "MBA y Lic. en Administración (UNL). Posgrado en Gestión Estratégica de IA (UCEMA)." },
      { titulo: "Participación pública", desc: "Expuso ante la Convención Reformadora de Santa Fe sobre IA y formación en las pymes." },
    ],
  },

  /* Carrusel: la misma lista que la tira de la portada (data/empresas.ts).
     Los que todavía no tienen logo (img: "") se dibujan en texto. */
  logos: {
    eyebrow: "Organizaciones",
    titulo: "Empresas, cámaras e instituciones donde trabajó.",
    items: empresas.map(({ nombre, img }) => ({ nombre, img: img || undefined })),
  },

  /* Galería: la primera foto de cada fila de seis va en grande */
  galeria: {
    eyebrow: "En acción",
    titulo: "Del escenario al taller.",
    fotos: [
      { src: `${IMG}/auditorio.webp`, pie: "TEDIND-X · Santa Fe" },
      { src: `${IMG}/agroactiva-domo.webp`, pie: "AgroActiva 2026" },
      { src: `${IMG}/uisf.webp`, pie: "UISF · IA y Ventas para empresas" },
      { src: `${IMG}/assal.webp`, pie: "ASSAL · Escuela Expone" },
      { src: `${IMG}/convencion-reformadora.webp`, pie: "Convención Reformadora de Santa Fe" },
      { src: `${IMG}/venado-tuerto.webp`, pie: "Venado Tuerto · Capacitación a empresas y comercios" },
      { src: `${IMG}/fragmentacion.webp`, pie: "“El principal riesgo ya no es tecnológico”" },
      { src: `${IMG}/sauce-viejo.webp`, pie: "Parque Industrial Sauce Viejo · IA y Ventas" },
      { src: `${IMG}/estaciones-de-servicio.webp`, pie: "Cámara de Estaciones de Servicio · Talleres de IA" },
      { src: `${IMG}/capital-activa.webp`, pie: "Capital Activa · Automatizaciones inteligentes" },
      { src: `${IMG}/cefose-galvez.webp`, pie: "CeFoSe Gálvez · IA y Ventas para empresas" },
      { src: `${IMG}/espacio-demos.webp`, pie: "Espacio DEMOS · Taller de Agentes de IA" },
    ],
  },

  /* Temas: los de sus charlas, talleres y artículos del blog */
  temas: {
    eyebrow: "Temas",
    titulo: "Sobre qué habla y capacita.",
    items: [
      "IA aplicada a pymes",
      "IA y ventas",
      "Automatizaciones inteligentes",
      "Agentes de IA",
      "IA en el agro",
      "ChatGPT en la empresa",
      "Liderazgo en la era de la IA",
      "Cómo lograr que el equipo adopte la IA",
      "Hoja de ruta de IA para la empresa",
      "Procesos y gestión pyme",
    ],
  },

  testimonios: {
    eyebrow: "Lo que dicen",
    titulo: "Salas que se van",
    tituloResalte: "con algo para aplicar.",
    items: elegidos.map((n) => {
      const c = comentarios.find((x) => x.nombre === n)!;
      return { texto: c.texto, autor: c.nombre, cargo: "Participante de una capacitación" };
    }),
  },

  cierre: {
    titulo: "Pablo es parte del Programa para Ejecutivos.",
    subtitulo: "Si querés que trabajemos con tu empresa, arranquemos por una Consultoría Estratégica Gratuita.",
    ctaPrimario: "Agendar Consultoría Estratégica Gratuita",
    ctaSecundario: "Ver el programa",
  },
};
