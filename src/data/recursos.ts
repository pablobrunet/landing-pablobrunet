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
  titulo: "Recursos sobre *IA aplicada*",
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
    descripcion: "Plantillas, guías y recursos descargables para aplicar IA en tu negocio.",
    // Ruta absoluta: el ancla suelta ("#materiales") rompe desde el menú,
    // porque el navegador la resuelve contra la página en la que estás.
    href: "/recursos#materiales",
    icon: "shield",
    cta: "Pedir acceso",
  },
];

/* =====================================================================
   LEAD MAGNET — pedido de acceso a las guías y materiales
   ---------------------------------------------------------------------
   La persona deja SOLO su correo. El envío va a Supabase (tabla `leads`),
   y desde ahí un Database Webhook dispara el flujo de n8n que la carga en
   GHL y en la lista de newsletter. Los materiales se los mandás por mail
   desde ese mismo flujo.

   La conexión con Supabase se configura por variables de entorno, en un
   solo lugar para toda la web: ver src/lib/leads.ts y el archivo
   .env.example de la raíz.
   ===================================================================== */
export const materiales = {
  eyebrow: "Acceso libre",
  titulo: "Llevate las *guías y plantillas*",
  subtitulo:
    "Dejame tu correo y te mando la carpeta con los materiales que uso en las capacitaciones: plantillas, guías de prompts y checklists para arrancar con IA.",
  boton: "Quiero los materiales",
  // Lo que se muestra cuando el envío salió bien.
  exito: {
    titulo: "Listo, ya está en camino",
    texto: "Te mando los materiales por correo en los próximos minutos. Revisá también la carpeta de spam.",
  },
};
