/* =====================================================================
   SEO + DATOS ESTRUCTURADOS
   ---------------------------------------------------------------------
   Todo lo que los buscadores y los asistentes de IA (ChatGPT, Perplexity,
   Gemini, los resúmenes de Google) leen para entender QUIÉN es Pablo,
   QUÉ ofrece y DÓNDE, sin depender de cómo esté diseñada cada página.

   Base.astro mete el "grafo" del sitio (WebSite + Person +
   ProfessionalService) en todas las páginas indexables. Las páginas que
   necesitan algo más (el programa, cada artículo) le pasan bloques extra
   por la prop `esquema`.

   REGLA: acá sólo van datos que ya están publicados en el sitio. Nada de
   cifras o títulos que no se puedan leer en alguna página: si Google o una
   IA encuentran una contradicción, desconfían de los dos lados.
   ===================================================================== */
import { site } from "../data/site";

export const SITIO = "https://www.pablobrunet.com";

/** URL absoluta a partir de una ruta del sitio ("/sobre-mi" → https://www…). */
export const absoluta = (ruta: string) => new URL(ruta, SITIO).href;

/** Dirección canónica: www, sin barra final (salvo la home) y sin ?query. */
export function canonica(pathname: string) {
  const limpia = pathname.replace(/\/+$/, "") || "/";
  return absoluta(limpia);
}

/** Recorta un texto para la meta description sin cortar palabras.
    Si entra una oración completa, prefiere cortar ahí. */
export function recortar(texto: string, max = 158) {
  const plano = texto.replace(/\*\*|\*/g, "").replace(/\s+/g, " ").trim();
  if (plano.length <= max) return plano;
  const corte = plano.slice(0, max);
  const finOracion = corte.lastIndexOf(". ");
  if (finOracion > max * 0.6) return corte.slice(0, finOracion + 1);
  return corte.slice(0, corte.lastIndexOf(" ")).replace(/[,;:—–-]+$/, "") + "…";
}

/** Saca el formato propio del sitio (**negrita**, [texto](url), *resalte*)
    para que en los datos estructurados quede texto llano. */
export function textoPlano(texto: string) {
  return texto
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*|\*/g, "")
    .replace(/\s*\n+\s*/g, " ")
    .trim();
}

/* ---- Identificadores fijos ----
   Cada entidad tiene un @id estable. Así los bloques de distintas páginas
   se enlazan entre sí ("el autor de este artículo es #pablo") en lugar de
   describir a Pablo de nuevo cada vez. */
export const ID = {
  sitio: `${SITIO}/#sitio`,
  pablo: `${SITIO}/#pablo`,
  servicio: `${SITIO}/#consultoria`,
  innerflow: `${SITIO}/#innerflow`,
  integra: `${SITIO}/programa-integra#programa`,
  charlas: `${SITIO}/servicios/speaker-y-capacitador#servicio`,
};

const direccion = {
  "@type": "PostalAddress",
  addressLocality: "Santa Fe",
  addressRegion: "Santa Fe",
  addressCountry: "AR",
};

/** Grafo base: va en todas las páginas indexables. */
export function grafoSitio() {
  return [
    {
      "@type": "WebSite",
      "@id": ID.sitio,
      url: `${SITIO}/`,
      name: site.nombre,
      description: site.seoDescription,
      inLanguage: "es-AR",
      publisher: { "@id": ID.pablo },
    },
    {
      "@type": "Person",
      "@id": ID.pablo,
      name: site.nombre,
      url: absoluta("/sobre-mi"),
      image: absoluta("/images/hero/retrato-hero.png"),
      jobTitle: "Consultor de inteligencia artificial para PyMEs",
      description:
        "Pablo Brunet es consultor de inteligencia artificial para PyMEs, con base en Santa Fe, Argentina. Trabaja con PyMEs hace más de 16 años, creó el Método INTEGRA y capacitó a más de 3.000 personas en empresas, cámaras y universidades.",
      address: direccion,
      worksFor: { "@id": ID.innerflow },
      alumniOf: [
        { "@type": "CollegeOrUniversity", name: "Universidad Nacional del Litoral" },
        { "@type": "CollegeOrUniversity", name: "Universidad del CEMA" },
      ],
      knowsAbout: [
        "Inteligencia artificial aplicada a PyMEs",
        "Adopción de inteligencia artificial en empresas",
        "Capacitación en inteligencia artificial para equipos",
        "Gestión de PyMEs",
      ],
      knowsLanguage: "es",
      sameAs: site.redes.map((r) => r.href),
    },
    {
      "@type": "Organization",
      "@id": ID.innerflow,
      name: "InnerFlow AI",
      url: "https://innerflowai.com",
    },
    {
      "@type": "ProfessionalService",
      "@id": ID.servicio,
      name: `${site.nombre} — Consultoría de inteligencia artificial para PyMEs`,
      url: `${SITIO}/`,
      image: absoluta("/images/og/og.jpg"),
      description: site.seoDescription,
      founder: { "@id": ID.pablo },
      provider: { "@id": ID.pablo },
      address: direccion,
      email: site.email,
      telephone: `+${site.whatsapp.numero}`,
      areaServed: { "@type": "Country", name: "Argentina" },
      knowsLanguage: "es",
      makesOffer: [
        { "@type": "Offer", itemOffered: { "@id": ID.integra } },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            "@id": ID.charlas,
            name: "Charlas y capacitaciones en inteligencia artificial para empresas",
            url: absoluta("/servicios/speaker-y-capacitador"),
            provider: { "@id": ID.pablo },
          },
        },
      ],
    },
  ];
}

/** Migas de pan: le dicen a Google dónde está la página dentro del sitio. */
export function migas(items: { nombre: string; ruta: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ nombre: "Inicio", ruta: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.nombre,
      item: canonica(it.ruta),
    })),
  };
}

/** Preguntas frecuentes, con el MISMO texto que se ve en la página. */
export function preguntas(items: readonly { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: textoPlano(it.q),
      acceptedAnswer: { "@type": "Answer", text: textoPlano(it.a) },
    })),
  };
}
