/* =====================================================================
   BLOG / INSIGHTS — /blog y /blog/[slug]
   PLANTILLA: reemplazá por artículos reales. El `cuerpo` es una lista de
   bloques que renderiza <Prose />.
   ===================================================================== */

export type Bloque =
  | { tipo: "parrafo"; texto: string }
  | { tipo: "subtitulo"; texto: string }
  | { tipo: "lista"; items: string[] }
  | { tipo: "cita"; texto: string };

export interface Post {
  slug: string;
  titulo: string;
  categoria: string;
  fecha: string; // COMPLETAR (ej "2026-07-20")
  resumen: string;
  img: string;
  imgLabel: string;
  cuerpo: Bloque[];
}

export const blogMeta = {
  eyebrow: "Blog · Insights",
  titulo: "Ideas sobre IA aplicada",
  subtitulo: "Artículos y aprendizajes. (Sección en construcción.)",
};

export const blog: Post[] = Array.from({ length: 3 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return {
    slug: `articulo-${n}`,
    titulo: "Título del artículo",
    categoria: "Categoría",
    fecha: "COMPLETAR",
    resumen: "Breve descripción del artículo. Reemplazá este texto.",
    img: "",
    imgLabel: `/images/blog/post-${n}.jpg`,
    cuerpo: [
      { tipo: "parrafo", texto: "COMPLETAR: introducción del artículo." },
      { tipo: "subtitulo", texto: "Un subtítulo de ejemplo" },
      { tipo: "parrafo", texto: "COMPLETAR: desarrollo de la idea." },
      { tipo: "lista", items: ["Punto uno", "Punto dos", "Punto tres"] },
      { tipo: "cita", texto: "Una cita o idea destacada." },
      { tipo: "parrafo", texto: "COMPLETAR: cierre y conclusión." },
    ],
  };
});

export const getPost = (slug: string) => blog.find((p) => p.slug === slug);
