/* =====================================================================
   CASOS DE ÉXITO — /casos y /casos/[slug]
   PLANTILLA: completá con casos reales. No hay datos ni cifras inventadas;
   los campos marcados "COMPLETAR" / "—" están vacíos a propósito.
   ===================================================================== */

export interface Resultado {
  valor: string; // ej "-40%", "3x", "COMPLETAR"
  label: string; // qué mide
}

export interface Caso {
  slug: string;
  titulo: string;
  categoria: string;
  sector: string;
  ubicacion: string;
  resumen: string;
  desafio: string;
  solucion: string;
  resultados: Resultado[];
  img: string;
  imgLabel: string;
  galeria: { img: string; imgLabel: string }[];
}

export const casosMeta = {
  eyebrow: "Portfolio · Casos",
  titulo: "Casos reales",
  subtitulo: "Proyectos de IA aplicada a negocios. (Sección en construcción.)",
};

// Duplicá un bloque para agregar más casos. Subí imágenes a /images/casos/
export const casos: Caso[] = Array.from({ length: 6 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return {
    slug: `caso-${n}`,
    titulo: "Nombre del caso",
    categoria: "Categoría",
    sector: "Sector",
    ubicacion: "Ubicación",
    resumen: "Breve descripción del caso. Reemplazá este texto.",
    desafio: "COMPLETAR: cuál era el problema o la necesidad del cliente.",
    solucion: "COMPLETAR: qué solución de IA implementaste y cómo.",
    resultados: [
      { valor: "—", label: "Resultado 1" },
      { valor: "—", label: "Resultado 2" },
      { valor: "—", label: "Resultado 3" },
    ],
    img: "",
    imgLabel: `/images/casos/${`caso-${n}`}/portada.jpg`,
    galeria: [
      { img: "", imgLabel: `/images/casos/caso-${n}/foto-01.jpg` },
      { img: "", imgLabel: `/images/casos/caso-${n}/foto-02.jpg` },
    ],
  };
});

export const getCaso = (slug: string) => casos.find((c) => c.slug === slug);
