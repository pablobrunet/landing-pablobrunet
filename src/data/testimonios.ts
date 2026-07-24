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
