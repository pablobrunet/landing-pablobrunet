/* =====================================================================
   TESTIMONIOS — sección del home (/#testimonios)
   PLANTILLA: sin nombres ni ratings inventados. Completá con reseñas reales.
   Avatares en /public/images/testimonials/
   ===================================================================== */

export interface Testimonio {
  texto: string;
  nombre: string;
  cargo: string;
  img: string;
  imgLabel: string;
}

export const testimoniosMeta = {
  eyebrow: "Testimonios",
  titulo: "Lo que dicen quienes trabajaron conmigo",
  subtitulo: "COMPLETAR con testimonios reales.",
};

export const testimonios: Testimonio[] = Array.from({ length: 3 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return {
    texto: "«Testimonio pendiente. Reemplazá este texto por una reseña real.»",
    nombre: "Nombre Apellido",
    cargo: "Cargo · Empresa",
    img: "",
    imgLabel: `/images/testimonials/avatar-${n}.jpg`,
  };
});

/* =====================================================================
   MURO DE TESTIMONIOS (página /sobre-mi) — dos filas en movimiento.
   ⚠️ EJEMPLOS FICTICIOS: nombres y comentarios inventados como marcador de
   posición para mostrar el diseño. REEMPLAZALOS por testimonios reales
   antes de publicar el sitio.
   ===================================================================== */
export interface Comentario {
  texto: string;
  nombre: string;
  rol: string;
}

export const comentariosDemo: Comentario[] = [
  { texto: "Pablo nos ayudó a ordenar el caos: hoy sabemos exactamente en qué procesos aplicar IA y por qué.", nombre: "Sofía Marchetti", rol: "Directora de Operaciones" },
  { texto: "La formación fue práctica desde el minuto uno. Mi equipo salió usando las herramientas ese mismo día.", nombre: "Gonzalo Rivas", rol: "Gerente Comercial" },
  { texto: "Automatizamos tareas que nos comían horas cada semana. El retorno se notó al primer mes.", nombre: "Valeria Duarte", rol: "Fundadora" },
  { texto: "Lo que más valoro es que no vende humo: te dice con criterio qué conviene y qué no.", nombre: "Martín Aguirre", rol: "CEO" },
  { texto: "Explica temas complejos de IA de forma simple, sin tecnicismos innecesarios. Ideal para equipos no técnicos.", nombre: "Carla Benítez", rol: "Responsable de RR. HH." },
  { texto: "Pasamos de la curiosidad a tener casos de uso reales funcionando. Un antes y un después.", nombre: "Diego Falcón", rol: "Director de Marketing" },
  { texto: "Cercano, paciente y muy claro. Acompañó a todo el equipo en la adopción, no solo a la dirección.", nombre: "Lucía Herrera", rol: "Líder de Proyecto" },
  { texto: "Su diagnóstico nos dio un plan concreto y priorizado. Dejamos de improvisar con la IA.", nombre: "Federico Sosa", rol: "COO" },
  { texto: "Súper recomendable para cualquier pyme que quiera empezar con IA con los pies en la tierra.", nombre: "Andrea Vidal", rol: "Emprendedora" },
  { texto: "Combina estrategia y ejecución: no solo asesora, deja las cosas funcionando.", nombre: "Nicolás Ferrari", rol: "CTO" },
  { texto: "Trabajar con Pablo fue una inversión, no un gasto. Cada sesión terminaba con acciones claras.", nombre: "Paula Miranda", rol: "Gerenta General" },
  { texto: "Nos abrió la cabeza sobre lo que la IA puede hacer hoy por un negocio como el nuestro.", nombre: "Ramiro Castro", rol: "Dueño de pyme" },
];

// Fotos intercaladas en el muro. Si `img` está vacío se muestra el marco.
export interface ImagenMuro {
  img: string;
  imgLabel: string;
}
export const imagenesMuro: ImagenMuro[] = [
  { img: "/images/testimonials/muro-01.jpg", imgLabel: "/images/testimonials/muro-01.jpg" },
  { img: "/images/testimonials/muro-02.jpg", imgLabel: "/images/testimonials/muro-02.jpg" },
  { img: "/images/testimonials/muro-03.jpg", imgLabel: "/images/testimonials/muro-03.jpg" },
  { img: "/images/testimonials/muro-04.jpg", imgLabel: "/images/testimonials/muro-04.jpg" },
];
