/* =====================================================================
   EMPRESAS QUE CONFÍAN — carrusel infinito de logos
   ---------------------------------------------------------------------
   Una sola lista para los dos lugares donde aparece:
     · la portada (components/Empresas.astro), debajo del hero
     · el perfil de Pablo en /programa-ejecutivos (data/pablo.ts)

   CÓMO CARGAR UN LOGO
   1. Subí el archivo a /public/images/empresas/  (ver el README de esa
      carpeta: SVG o PNG transparente, alto ≥ 120 px, sin márgenes).
   2. Poné la ruta en `img`. Si queda vacío ("") se muestra el nombre en
      texto, así la tira nunca se ve rota mientras juntás los logos.

   Los logos que ya estaban del perfil siguen en /images/pablo/logos/. El
   de la Bolsa de Comercio acá es la versión compacta (sello + BCSF); el
   perfil de Alejandro sigue usando la horizontal larga.

   Los logos van en escala de grises y recuperan color al pasar el mouse.

   ⚠️ Sumá solo empresas con las que efectivamente trabajaste y que estén
   de acuerdo con aparecer: es una afirmación pública sobre ellas.
   ===================================================================== */

export interface Empresa {
  nombre: string;
  img: string;
}

export const empresasMeta = {
  eyebrow: "Quienes nos eligen",
  titulo: "Empresas e instituciones que confían.",
};

const EMP = "/images/empresas";
const PABLO = "/images/pablo/logos";

/* Empresas y organizaciones intercaladas, para que la tira no quede
   partida en dos bloques. */
export const empresas: Empresa[] = [
  { nombre: "SpeedAgro", img: `${EMP}/speedagro.png` },
  { nombre: "AgroActiva", img: `${PABLO}/agroactiva.png` },
  { nombre: "Grupo Santa María", img: `${EMP}/grupo-santa-maria.svg` },
  { nombre: "Gobierno de la Provincia de Santa Fe", img: `${EMP}/provincia-santa-fe.png` },
  { nombre: "Bolsa de Comercio de Santa Fe", img: "/images/empresas/bolsa-comercio-santa-fe.png" },
  { nombre: "Unión Industrial de Santa Fe (UISF)", img: `${PABLO}/uisf.png` },
  { nombre: "Advice Bookshop", img: `${EMP}/advice-bookshop.png` },
  { nombre: "ASSAL · Agencia Santafesina de Seguridad Alimentaria", img: `${PABLO}/assal.png` },
  { nombre: "Universidad Nacional del Litoral", img: "/images/rostagno/logos/unl.svg" },
  { nombre: "Advice EdTech", img: `${EMP}/advice-edtech.png` },
  { nombre: "Parque Industrial Sauce Viejo", img: `${PABLO}/parque-industrial-sauce-viejo.svg` },
  { nombre: "El Emporio de la Construcción", img: `${EMP}/emporio-de-la-construccion.png` },
  { nombre: "Sociedad Rural de Rafaela", img: `${EMP}/sociedad-rural-rafaela.png` },
  { nombre: "CECA · Cámara de Expendedores de Combustibles y Afines de Santa Fe", img: `${PABLO}/ceca.png` },
  { nombre: "Universidad Católica de Santa Fe", img: `${EMP}/universidad-catolica-santa-fe.png` },
  { nombre: "EcoAislación", img: `${EMP}/ecoaislacion.png` },
  { nombre: "CeFoSe Gálvez", img: `${PABLO}/cefose-galvez.png` },
  { nombre: "APAS · Asociación de Productores Asesores de Seguros de Santa Fe", img: `${EMP}/apas.png` },
  { nombre: "Capital Activa · Municipalidad de Santa Fe", img: `${PABLO}/municipalidad-santa-fe.png` },
  { nombre: "FAPASA · Federación de Asociaciones de Productores Asesores de Seguros de Argentina", img: `${EMP}/fapasa.svg` },
  { nombre: "Club PYXO", img: `${PABLO}/club-pyxo.png` },
  { nombre: "DEMOS · Centro Cultural y de Estudios", img: `${PABLO}/espacio-demos.png` },
];
