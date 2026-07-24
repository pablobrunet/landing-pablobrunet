/* =====================================================================
   SERVICIOS — datos + páginas de detalle (/servicios y /servicios/[slug])
   Editá acá los servicios. Cada `slug` genera su propia subpágina.
   Textos genéricos y verificables; ajustá a tu propuesta real.
   ===================================================================== */

export interface Servicio {
  slug: string;
  titulo: string;
  icon: string;
  resumen: string; // aparece en tarjetas / índice
  hero: string; // frase de la cabecera de su página
  paraQuien: string;
  problema: string;
  enfoque: { titulo: string; texto: string }[];
  entregables: string[];
  faq: { q: string; a: string }[];
  img: string;
  imgLabel: string;
}

export const serviciosMeta = {
  eyebrow: "Servicios",
  titulo: "Servicios de alto valor",
  subtitulo: "Estrategia clara. Implementación efectiva. Resultados medibles.",
};

export const servicios: Servicio[] = [
  {
    slug: "estrategia-e-implementacion-de-ia",
    titulo: "Estrategia e implementación de IA",
    icon: "chip",
    resumen:
      "Identifico oportunidades, priorizo casos de uso y llevo la IA de la idea a producción.",
    hero: "De la idea a producción: IA integrada a tu operación, con foco en el retorno.",
    paraQuien:
      "Empresas que quieren aplicar IA con criterio y evitar experimentos que no llegan a producción.",
    problema:
      "Hay entusiasmo con la IA, pero falta un plan: qué casos priorizar, cómo medir el impacto y cómo integrarlo sin frenar al equipo.",
    enfoque: [
      { titulo: "Diagnóstico", texto: "Relevamiento de procesos, datos y oportunidades reales de IA." },
      { titulo: "Priorización", texto: "Casos de uso ordenados por impacto y esfuerzo." },
      { titulo: "Implementación", texto: "Diseño, prueba y puesta en producción de la solución." },
      { titulo: "Medición", texto: "Métricas claras para evaluar el retorno y escalar lo que funciona." },
    ],
    entregables: [
      "Mapa de oportunidades de IA priorizado",
      "Prototipo o solución en producción",
      "Documentación y traspaso al equipo",
      "Plan de escalado y próximos pasos",
    ],
    faq: [
      { q: "¿Necesito tener mis datos ordenados para empezar?", a: "COMPLETAR con tu respuesta." },
      { q: "¿Cuánto dura un proyecto típico?", a: "COMPLETAR con tu respuesta." },
    ],
    img: "",
    imgLabel: "/images/servicios/estrategia.jpg",
  },
  {
    slug: "automatizacion-de-procesos",
    titulo: "Automatización de procesos",
    icon: "flow",
    resumen:
      "Automatizaciones que reducen trabajo manual, conectan herramientas y liberan tiempo del equipo.",
    hero: "Menos tareas repetitivas, más foco en lo que importa.",
    paraQuien:
      "Equipos que pierden horas en tareas manuales, repetitivas o propensas a error.",
    problema:
      "Procesos que dependen de copiar y pegar entre herramientas, planillas dispersas y pasos que se olvidan.",
    enfoque: [
      { titulo: "Relevamiento", texto: "Mapeo del proceso actual y sus cuellos de botella." },
      { titulo: "Diseño", texto: "Flujo automatizado que conecta tus herramientas." },
      { titulo: "Implementación", texto: "Puesta en marcha con controles y alertas." },
      { titulo: "Soporte", texto: "Ajustes y monitoreo hasta que corra solo." },
    ],
    entregables: [
      "Diagrama del proceso automatizado",
      "Automatización funcionando end-to-end",
      "Panel de control / alertas",
      "Guía de uso para el equipo",
    ],
    faq: [
      { q: "¿Con qué herramientas trabajás?", a: "COMPLETAR con tu respuesta." },
      { q: "¿Qué pasa si cambia mi proceso?", a: "COMPLETAR con tu respuesta." },
    ],
    img: "",
    imgLabel: "/images/servicios/automatizacion.jpg",
  },
  {
    slug: "formacion-y-capacitacion",
    titulo: "Formación y capacitación",
    icon: "people",
    resumen:
      "Capacito a equipos y líderes para adoptar IA con criterio, autonomía y buenas prácticas.",
    hero: "Equipos que usan IA con criterio y autonomía.",
    paraQuien:
      "Organizaciones que quieren que sus equipos adopten IA de forma segura y efectiva.",
    problema:
      "La IA se usa a medias o de forma dispar: falta un marco común, buenas prácticas y confianza.",
    enfoque: [
      { titulo: "Diagnóstico de madurez", texto: "Punto de partida del equipo con IA." },
      { titulo: "Programa a medida", texto: "Contenidos adaptados a los roles y casos reales." },
      { titulo: "Talleres prácticos", texto: "Aprender haciendo, sobre tareas del día a día." },
      { titulo: "Seguimiento", texto: "Refuerzo y acompañamiento post-formación." },
    ],
    entregables: [
      "Programa de formación a medida",
      "Materiales y guías de buenas prácticas",
      "Talleres en vivo (presencial u online)",
      "Plan de adopción interno",
    ],
    faq: [
      { q: "¿Las formaciones son presenciales u online?", a: "COMPLETAR con tu respuesta." },
      { q: "¿Para qué tamaño de equipo sirve?", a: "COMPLETAR con tu respuesta." },
    ],
    img: "",
    imgLabel: "/images/servicios/formacion.jpg",
  },
  {
    slug: "diagnostico-de-ia",
    titulo: "Diagnóstico de IA",
    icon: "target",
    resumen:
      "Una radiografía de dónde la IA puede generar impacto en tu negocio, con un plan de acción.",
    hero: "El primer paso: entender dónde la IA mueve la aguja en tu negocio.",
    paraQuien:
      "Empresas que quieren empezar con IA pero no saben por dónde.",
    problema:
      "Demasiadas opciones y ruido: es difícil saber qué conviene priorizar y qué es solo hype.",
    enfoque: [
      { titulo: "Entrevistas", texto: "Conversaciones con áreas clave del negocio." },
      { titulo: "Análisis", texto: "Detección de oportunidades y riesgos." },
      { titulo: "Roadmap", texto: "Plan priorizado de iniciativas de IA." },
    ],
    entregables: [
      "Informe de oportunidades de IA",
      "Roadmap priorizado (impacto / esfuerzo)",
      "Recomendaciones de quick wins",
    ],
    faq: [
      { q: "¿Cuánto tiempo lleva el diagnóstico?", a: "COMPLETAR con tu respuesta." },
      { q: "¿Es un paso obligatorio?", a: "COMPLETAR con tu respuesta." },
    ],
    img: "",
    imgLabel: "/images/servicios/diagnostico.jpg",
  },
];

export const getServicio = (slug: string) => servicios.find((s) => s.slug === slug);
