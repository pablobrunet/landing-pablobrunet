/* =====================================================================
   SOBRE MÍ — alimenta la sección del home y la página completa /sobre-mi
   Solo datos verificables + placeholders marcados "COMPLETAR".
   ===================================================================== */

export const sobreMi = {
  eyebrow: "Sobre mí",
  titulo: "Una identidad que transmite confianza, claridad y visión en movimiento.",
  parrafo:
    "La IA no es solo tecnología: es una herramienta estratégica para transformar y hacer crecer negocios. Trabajo cerca del equipo, con foco en datos y orientado a resultados medibles.",
  img: "",
  imgLabel: "/images/about/retrato.jpg",

  // Pilares del brand board (verificable)
  pilares: [
    { icon: "target", titulo: "Preciso", texto: "Enfoque analítico y basado en datos." },
    { icon: "people", titulo: "Humano", texto: "Cercano, empático y colaborativo." },
    { icon: "growth", titulo: "Orientado a resultados", texto: "IA aplicada para generar valor real." },
  ],

  /* ---- Contenido extendido para la página /sobre-mi ---- */
  pagina: {
    hero:
      "Ayudo a empresas a convertir la inteligencia artificial en una ventaja real.",
    bio: [
      "COMPLETAR: contá tu historia — de dónde venís, qué hacés hoy y por qué te dedicás a la IA aplicada a negocios.",
      "COMPLETAR: sumá contexto sobre tu forma de trabajar y qué te diferencia.",
    ],
    // Insignia REAL confirmada
    credenciales: [
      { titulo: "OpenAI Partner Network", detalle: "Miembro de la red de partners de OpenAI." },
      // Agregá acá otras credenciales reales (no incluir cursos/certificaciones que no hiciste).
    ],
    valores: [
      { titulo: "Preciso", texto: "Decisiones basadas en datos, no en intuición." },
      { titulo: "Humano", texto: "La tecnología al servicio de las personas y los equipos." },
      { titulo: "Orientado a resultados", texto: "Impacto medible por sobre el hype." },
    ],
    // Recorrido / experiencia (COMPLETAR con datos reales)
    recorrido: [
      { periodo: "COMPLETAR", titulo: "Hito o rol", texto: "Descripción breve." },
      { periodo: "COMPLETAR", titulo: "Hito o rol", texto: "Descripción breve." },
    ],
    galeria: [
      { img: "", imgLabel: "/images/about/foto-01.jpg" },
      { img: "", imgLabel: "/images/about/foto-02.jpg" },
    ],
  },
};
