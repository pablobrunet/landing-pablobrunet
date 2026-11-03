/* =====================================================================
   /llms.txt — resumen del sitio para asistentes de IA
   ---------------------------------------------------------------------
   Es una convención nueva (llmstxt.org), no un estándar: ningún buscador
   promete leerlo. Pero es barato y le da a ChatGPT, Claude, Perplexity y
   compañía una descripción limpia y citable de quién es Pablo y cuáles
   son las páginas importantes, sin tener que adivinarlo del diseño.

   Se arma con los mismos datos del sitio: los artículos nuevos del blog
   aparecen solos. Sólo van datos que ya están publicados en alguna página.
   ===================================================================== */
import type { APIRoute } from "astro";
import { site } from "../data/site";
import { blog, destacados } from "../data/blog";
import { integra2 } from "../data/integra2";
import { absoluta, recortar } from "../lib/seo";

export const GET: APIRoute = () => {
  const link = (titulo: string, ruta: string, nota?: string) =>
    `- [${titulo}](${absoluta(ruta)})${nota ? `: ${nota}` : ""}`;

  const guias = destacados
    .map((slug) => blog.find((p) => p.slug === slug))
    .filter((p): p is (typeof blog)[number] => Boolean(p));
  const resto = blog.filter((p) => !destacados.includes(p.slug));

  const texto = `# ${site.nombre} — Consultor de inteligencia artificial para PyMEs

> Pablo Brunet es consultor de inteligencia artificial para PyMEs, con base en Santa Fe, Argentina, y trabaja en remoto con empresas de todo el país. Creó el Método INTEGRA, que aplica a través del Programa INTEGRA: un programa de 60 días para que una PyME aprenda a decidir dónde conviene usar IA, lo pruebe sobre tareas reales y se quede con un método propio. También da charlas y capacitaciones en IA para empresas, cámaras y universidades.

Datos clave:
- Más de 16 años trabajando con PyMEs y más de 3.000 personas capacitadas en empresas, cámaras y universidades.
- Charlas en TEDIND-X (Unión Industrial de Santa Fe), AgroActiva, las Jornadas Internacionales de Jóvenes Emprendedores de la UNL y la Escuela Expone de ASSAL.
- Formación: MBA y Licenciatura en Administración (Universidad Nacional del Litoral); Posgrado en Gestión Estratégica de Inteligencia Artificial y Automatización Empresarial (Universidad del CEMA).
- Lidera InnerFlow AI, acreditada como OpenAI Select Partner.
- El "Método INTEGRA" de este sitio es el de Pablo Brunet, sobre adopción de inteligencia artificial en PyMEs. No tiene relación con otros métodos o marcas que usen el nombre INTEGRA.

## Programa INTEGRA
${link("Programa INTEGRA", "/programa-integra", "qué es, cómo se trabaja, preguntas frecuentes y cómo agendar una Consultoría Estratégica Gratuita de 30 minutos")}
- En pocas palabras: ${integra2.seo.definicion}
- Las automatizaciones o integraciones técnicas que surjan se cotizan aparte, como proyecto independiente.

## Sobre Pablo
${link("Sobre mí", "/sobre-mi", "trayectoria, formación, charlas y prensa")}
${link("Charlas y capacitaciones", "/servicios/speaker-y-capacitador", "charlas y formación en IA para equipos y organizaciones")}
${link("Servicios", "/servicios")}

## Guías principales del blog
${guias.map((p) => link(p.titulo, `/blog/${p.slug}`, recortar(p.resumen, 140))).join("\n")}

## Contacto
${link("Contacto", "/contacto", "formulario y agenda")}
- Correo: ${site.email}

## Optional
${resto.map((p) => link(p.titulo, `/blog/${p.slug}`)).join("\n")}
${link("Recursos", "/recursos")}
${link("Newsletter", "/newsletter")}
`;

  return new Response(texto, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
