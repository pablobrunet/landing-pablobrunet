/* =====================================================================
   EN LOS MEDIOS / PRENSA — sección de /sobre-mi
   ---------------------------------------------------------------------
   Pegá acá las notas periodísticas donde te mencionan. Estructura vacía;
   duplicá un item por cada nota. Subí los logos de los medios a
   /public/images/prensa/  (si el `logo` está vacío se muestra el nombre).
   ===================================================================== */

export interface NotaPrensa {
  medio: string; // nombre del medio
  logo: string; // ruta del logo (vacío = muestra el nombre)
  logoLabel: string;
  titulo: string; // título de la nota
  cita: string; // fragmento citado donde te mencionan
  fecha: string; // ej "Mayo 2026"
  url: string; // link a la nota
}

export const prensaMeta = {
  eyebrow: "En los medios",
  titulo: "Prensa y menciones",
  subtitulo: "Notas y publicaciones donde participé o fui mencionado.",
};

// COMPLETAR: pegá cada nota real acá.
export const notas: NotaPrensa[] = [
  {
    medio: "Nombre del medio",
    logo: "",
    logoLabel: "/images/prensa/medio-01.svg",
    titulo: "Título de la nota periodística",
    cita: "Pegá acá el fragmento de la nota donde te mencionan.",
    fecha: "COMPLETAR",
    url: "#",
  },
  {
    medio: "Nombre del medio",
    logo: "",
    logoLabel: "/images/prensa/medio-02.svg",
    titulo: "Título de la nota periodística",
    cita: "Pegá acá el fragmento de la nota donde te mencionan.",
    fecha: "COMPLETAR",
    url: "#",
  },
  {
    medio: "Nombre del medio",
    logo: "",
    logoLabel: "/images/prensa/medio-03.svg",
    titulo: "Título de la nota periodística",
    cita: "Pegá acá el fragmento de la nota donde te mencionan.",
    fecha: "COMPLETAR",
    url: "#",
  },
];
