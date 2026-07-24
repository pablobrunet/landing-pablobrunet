/* =====================================================================
   RECURSOS — /recursos (hub que agrupa blog, newsletter y materiales)
   ===================================================================== */

export interface Recurso {
  titulo: string;
  descripcion: string;
  href: string;
  icon: string;
  cta: string;
  externo?: boolean;
}

export const recursosMeta = {
  eyebrow: "Recursos",
  titulo: "Recursos sobre IA aplicada",
  subtitulo:
    "Contenido para entender y aplicar inteligencia artificial en tu negocio.",
};

export const recursos: Recurso[] = [
  {
    titulo: "Blog",
    descripcion: "Artículos, ideas y aprendizajes sobre IA aplicada a negocios.",
    href: "/blog",
    icon: "data",
    cta: "Leer el blog",
  },
  {
    titulo: "Newsletter",
    descripcion: "Novedades, casos y herramientas de IA, directo a tu correo.",
    href: "/newsletter",
    icon: "mail",
    cta: "Suscribirme",
  },
  {
    titulo: "Guías y materiales",
    descripcion: "COMPLETAR: sumá acá descargables, plantillas o guías cuando las tengas.",
    href: "#",
    icon: "shield",
    cta: "Próximamente",
  },
];
