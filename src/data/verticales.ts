/* =====================================================================
   VERTICALES / SECTORES — /verticales y /verticales/[slug]
   Áreas donde la IA puede aplicarse. Copy GENÉRICO (capacidades, no
   clientes). Ajustá los sectores a los que realmente trabajás.
   ===================================================================== */

export interface Vertical {
  slug: string;
  nombre: string;
  icon: string;
  resumen: string;
  descripcion: string;
  aplicaciones: string[];
  img: string;
  imgLabel: string;
}

export const verticalesMeta = {
  eyebrow: "Verticales",
  titulo: "IA aplicada por sector",
  subtitulo:
    "Cómo la inteligencia artificial puede generar valor en distintas industrias.",
};

const base = (
  slug: string,
  nombre: string,
  icon: string
): Vertical => ({
  slug,
  nombre,
  icon,
  resumen: `Aplicaciones de IA para ${nombre.toLowerCase()}. (Editá este texto.)`,
  descripcion:
    "COMPLETAR: describí cómo aplicás IA en este sector, con ejemplos y beneficios concretos.",
  aplicaciones: [
    "Aplicación 1 (editá)",
    "Aplicación 2 (editá)",
    "Aplicación 3 (editá)",
  ],
  img: "",
  imgLabel: `/images/verticales/${slug}.jpg`,
});

export const verticales: Vertical[] = [
  base("comercio-y-ecommerce", "Comercio y eCommerce", "growth"),
  base("industria", "Industria", "chip"),
  base("servicios-profesionales", "Servicios profesionales", "people"),
  base("logistica", "Logística", "flow"),
  base("finanzas", "Finanzas", "data"),
  base("turismo", "Turismo", "location"),
];

export const getVertical = (slug: string) => verticales.find((v) => v.slug === slug);
