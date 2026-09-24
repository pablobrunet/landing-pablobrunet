/* =====================================================================
   ACORDEÓN SUAVE — despliegue animado para <details data-suave>
   ---------------------------------------------------------------------
   <details> abre y cierra de golpe: el navegador no sabe animar hacia
   `height: auto`. Acá se intercepta el clic en el <summary>, se mide la
   altura cerrada y abierta y se anima entre las dos con Web Animations.
   La respuesta, además, entra con un fundido y un leve desplazamiento.

   Sin JavaScript (o con "reducir movimiento") todo sigue funcionando como
   un <details> común.

   Exclusividad: el atributo `name` hace que el navegador cierre el
   anterior al instante, lo que cortaría su animación. Por eso se pasa a
   `data-grupo` y el cierre de los hermanos lo maneja este script.

   Mientras se cierra, el <details> sigue [open] hasta que termina la
   animación y lleva la clase `is-cerrando`: el CSS la usa para girar el
   ícono y soltar el color apenas se hace clic, no al final.
   ===================================================================== */

const DURACION_ABRIR = 420;
const DURACION_CERRAR = 320;
const CURVA = "cubic-bezier(0.22, 1, 0.36, 1)";

const animaciones = new WeakMap<HTMLDetailsElement, Animation>();
const fundidos = new WeakMap<HTMLDetailsElement, Animation[]>();

function cortarFundidos(d: HTMLDetailsElement) {
  fundidos.get(d)?.forEach((a) => a.cancel());
  fundidos.delete(d);
}

function contenido(d: HTMLDetailsElement): HTMLElement[] {
  return Array.from(d.children).filter(
    (el): el is HTMLElement => el.tagName !== "SUMMARY"
  );
}

function alturaCerrada(d: HTMLDetailsElement): number {
  const estabaAbierto = d.open;
  d.open = false;
  const h = d.offsetHeight;
  d.open = estabaAbierto;
  return h;
}

function animarAltura(d: HTMLDetailsElement, desde: number, hasta: number, duracion: number) {
  animaciones.get(d)?.cancel();
  d.style.overflow = "hidden";
  const anim = d.animate(
    { height: [`${desde}px`, `${hasta}px`] },
    { duration: duracion, easing: CURVA }
  );
  animaciones.set(d, anim);
  return anim;
}

function limpiar(d: HTMLDetailsElement) {
  animaciones.delete(d);
  d.style.overflow = "";
}

function abrir(d: HTMLDetailsElement) {
  const desde = d.offsetHeight;
  cortarFundidos(d);
  d.classList.remove("is-cerrando");
  d.open = true;
  const hasta = d.offsetHeight;

  const anim = animarAltura(d, desde, hasta, DURACION_ABRIR);
  anim.onfinish = () => limpiar(d);

  fundidos.set(
    d,
    contenido(d).map((el) =>
      el.animate(
        { opacity: [0, 1], transform: ["translateY(-8px)", "translateY(0)"] },
        { duration: DURACION_ABRIR, delay: 80, easing: CURVA, fill: "backwards" }
      )
    )
  );

  // Cierra las otras preguntas del mismo grupo.
  const grupo = d.dataset.grupo;
  if (grupo) {
    document
      .querySelectorAll<HTMLDetailsElement>(`details[data-grupo="${grupo}"]`)
      .forEach((otro) => {
        if (otro !== d && otro.open && !otro.classList.contains("is-cerrando")) cerrar(otro);
      });
  }
}

function cerrar(d: HTMLDetailsElement) {
  const desde = d.offsetHeight;
  const hasta = alturaCerrada(d);
  d.classList.add("is-cerrando");

  cortarFundidos(d);
  const anim = animarAltura(d, desde, hasta, DURACION_CERRAR);
  anim.onfinish = () => {
    d.open = false;
    d.classList.remove("is-cerrando");
    cortarFundidos(d);
    limpiar(d);
  };

  fundidos.set(
    d,
    contenido(d).map((el) =>
      el.animate(
        { opacity: [1, 0], transform: ["translateY(0)", "translateY(-4px)"] },
        { duration: DURACION_CERRAR * 0.6, easing: "ease-out", fill: "forwards" }
      )
    )
  );
}

export function iniciarAcordeonSuave() {
  const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducido || !("animate" in HTMLElement.prototype)) return;

  document.querySelectorAll<HTMLDetailsElement>("details[data-suave]").forEach((d) => {
    if (d.dataset.suaveListo) return;
    d.dataset.suaveListo = "1";

    const nombre = d.getAttribute("name");
    if (nombre) {
      d.dataset.grupo = nombre;
      d.removeAttribute("name");
    }

    d.querySelector("summary")?.addEventListener("click", (e) => {
      e.preventDefault();
      if (d.open && !d.classList.contains("is-cerrando")) cerrar(d);
      else abrir(d);
    });
  });
}
