/* =====================================================================
   EMPRESAS QUE CONFÍAN — tira con carrusel infinito (home)
   ---------------------------------------------------------------------
   CÓMO CARGAR UN LOGO
   1. Subí el archivo a /public/images/empresas/  (ver el README de esa
      carpeta: SVG o PNG transparente, alto ≥ 120 px, sin márgenes).
   2. Poné la ruta en `img`. Si queda vacío ("") se muestra el nombre en
      texto, así la tira nunca se ve rota mientras juntás los logos.

   Los logos van en escala de grises y recuperan color al pasar el mouse.

   ⚠️ Sumá solo empresas con las que efectivamente trabajaste y que estén
   de acuerdo con aparecer: es una afirmación pública sobre ellas.
   ===================================================================== */

export interface Empresa {
  nombre: string;
  img: string;
  imgLabel: string;
}

export const empresasMeta = {
  titulo: "Empresas que *confían*",
};

/* Cargá una línea por empresa. Mientras el array esté vacío, la tira NO se
   dibuja: preferimos que no aparezca antes que mostrar nombres de relleno.
   Con menos de 6 el loop del carrusel se nota; a partir de ahí queda parejo. */
export const empresas: Empresa[] = [
  // { nombre: "Nombre de la empresa", img: "/images/empresas/nombre.svg", imgLabel: "/images/empresas/nombre.svg" },
];
