/* =====================================================================
   CREDENCIALES Y CERTIFICACIONES VERIFICABLES — sección de /sobre-mi
   ---------------------------------------------------------------------
   ESTRUCTURA VACÍA. Cargá tus certificaciones reales acá cuando las tengas.
   - Agrupá por entidad emisora (ej. OpenAI, Google, etc.).
   - Cada entidad muestra su insignia de partner oficial (subí el logo a
     /public/images/credenciales/) y sus certificaciones en tarjetas.
   - El contador total se calcula solo a partir de las tarjetas cargadas.
   ===================================================================== */

export interface Certificacion {
  titulo: string;
  fecha: string; // ej "2026-03" o "Marzo 2026"
  id: string; // ID / código de credencial
  url?: string; // link de verificación (opcional)
}

export interface EntidadCred {
  entidad: string; // nombre de la entidad emisora
  badge: string; // ruta del logo/insignia de partner (vacío = marco)
  badgeLabel: string; // ruta esperada del logo
  certificaciones: Certificacion[];
}

export const credencialesMeta = {
  eyebrow: "Credenciales",
  titulo: "Certificaciones verificables",
  subtitulo:
    "Formación y partnerships oficiales. Podés verificar cada credencial en mi perfil.",
  // COMPLETAR: link a tu LinkedIn (o a la sección de certificaciones)
  linkedin: "#",
  linkedinLabel: "Verificar en LinkedIn",
};

// COMPLETAR: reemplazá estas entidades y tarjetas por las reales.
export const credenciales: EntidadCred[] = [
  {
    entidad: "Entidad emisora 1",
    badge: "",
    badgeLabel: "/images/credenciales/entidad-01.svg",
    certificaciones: [
      { titulo: "Título de la certificación", fecha: "COMPLETAR", id: "COMPLETAR", url: "#" },
      { titulo: "Título de la certificación", fecha: "COMPLETAR", id: "COMPLETAR", url: "#" },
    ],
  },
  {
    entidad: "Entidad emisora 2",
    badge: "",
    badgeLabel: "/images/credenciales/entidad-02.svg",
    certificaciones: [
      { titulo: "Título de la certificación", fecha: "COMPLETAR", id: "COMPLETAR", url: "#" },
    ],
  },
];

// Contador total (se recalcula solo)
export const totalCertificaciones = credenciales.reduce(
  (acc, e) => acc + e.certificaciones.length,
  0
);
