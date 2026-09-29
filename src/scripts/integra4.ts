/* Comportamiento de /programa-integra-4. Sin dependencias.
   Todo lo que hace es mejora: sin JavaScript la ficha se ve completa, la
   autoevaluación avisa que lo necesita y el calendario tiene enlace directo. */
import { integra4 } from "../data/integra4";
import { orientar } from "../lib/integra4-orientacion.js";
import { site } from "../data/site";

/* ---------- La ficha que se completa del día 1 al 60 ----------
   Sólo en escritorio, donde la ficha acompaña al costado. Una línea
   imaginaria al 55% de la pantalla marca por dónde va la lectura: el
   tramo que la cruzó es el activo, el día se interpola dentro de su rango
   y los campos de ese tramo (y los anteriores) aparecen escritos. */
function iniciarFicha() {
  const raiz = document.querySelector<HTMLElement>("[data-i4-tarea]");
  if (!raiz || raiz.dataset.listo) return;
  raiz.dataset.listo = "1";

  const tramos = Array.from(raiz.querySelectorAll<HTMLElement>("[data-i4-tramo]"));
  const campos = Array.from(raiz.querySelectorAll<HTMLElement>("[data-i4-campo]"));
  const saltos = Array.from(raiz.querySelectorAll<HTMLElement>("[data-i4-salto]"));
  const dia = raiz.querySelector<HTMLElement>("[data-i4-dia]");
  const barra = raiz.querySelector<HTMLElement>("[data-i4-barra]");
  const escritorio = window.matchMedia("(min-width: 961px)");
  let activoPrevio = -2;

  const pintar = () => {
    if (!escritorio.matches) return;
    const linea = window.innerHeight * 0.55;
    let activo = -1;
    tramos.forEach((t, i) => {
      if (t.getBoundingClientRect().top <= linea) activo = i;
    });

    let d = 1;
    if (activo >= 0) {
      const t = tramos[activo];
      const r = t.getBoundingClientRect();
      const desde = Number(t.dataset.desde);
      const hasta = Number(t.dataset.hasta);
      const avance = Math.min(1, Math.max(0, (linea - r.top) / Math.max(r.height, 1)));
      d = Math.round(desde + avance * (hasta - desde));
    }
    if (dia) dia.textContent = String(d);
    barra?.style.setProperty("--p", String(d / 60));

    if (activo === activoPrevio) return;
    tramos.forEach((t, i) => t.classList.toggle("is-activo", i === activo));
    saltos.forEach((s, i) => s.classList.toggle("is-activo", i === activo));
    campos.forEach((c) => {
      const lleno = Number(c.dataset.i4Campo) <= activo;
      const eraLleno = c.classList.contains("is-lleno");
      c.classList.toggle("is-lleno", lleno);
      // Resaltador: sólo cuando se escribe hacia adelante, no al volver.
      if (lleno && !eraLleno && activo > activoPrevio) {
        c.classList.add("is-nuevo");
        window.setTimeout(() => c.classList.remove("is-nuevo"), 900);
      }
    });
    activoPrevio = activo;
  };

  let pendiente = false;
  const pedir = () => {
    if (pendiente) return;
    pendiente = true;
    requestAnimationFrame(() => {
      pendiente = false;
      pintar();
    });
  };

  document.querySelector(".i4")?.classList.add("i4-js");
  pintar();
  window.addEventListener("scroll", pedir, { passive: true });
  window.addEventListener("resize", pedir);
  escritorio.addEventListener("change", () => {
    activoPrevio = -2;
    pedir();
  });
}

/* ---------- Captura del portal ampliada ---------- */
function iniciarPortal() {
  const abrir = document.querySelector<HTMLButtonElement>("[data-i4-portal-abrir]");
  const dialogo = document.querySelector<HTMLDialogElement>("[data-i4-portal-dialogo]");
  if (!abrir || !dialogo || abrir.dataset.listo) return;
  abrir.dataset.listo = "1";
  abrir.addEventListener("click", () => dialogo.showModal());
  dialogo.querySelector("[data-i4-portal-cerrar]")?.addEventListener("click", () => dialogo.close());
  dialogo.addEventListener("click", (e) => {
    if (e.target === dialogo) dialogo.close();
  });
  dialogo.addEventListener("close", () => abrir.focus());
}

/* ---------- Autoevaluación: una hoja, seis preguntas ---------- */
function iniciarAutoevaluacion() {
  const form = document.querySelector<HTMLFormElement>("[data-i4-auto]");
  const caja = document.querySelector<HTMLElement>("[data-i4-resultado]");
  if (!form || !caja || form.dataset.listo) return;
  form.dataset.listo = "1";

  const preguntas = integra4.auto.preguntas;
  const error = form.querySelector<HTMLElement>("[data-i4-error]");
  const titulo = caja.querySelector<HTMLElement>("[data-i4-resultado-titulo]");
  const lista = caja.querySelector<HTMLElement>("[data-i4-resultado-lista]");
  const mensaje = caja.querySelector<HTMLTextAreaElement>("[data-i4-mensaje]");
  const whatsapp = caja.querySelector<HTMLAnchorElement>("[data-i4-whatsapp]");
  const fieldsets = Array.from(form.querySelectorAll<HTMLFieldSetElement>("[data-i4-pregunta]"));

  const leer = () =>
    preguntas.map((p) => {
      const marcada = form.querySelector<HTMLInputElement>(`input[name="i4-${p.id}"]:checked`);
      return marcada ? Number(marcada.value) : undefined;
    });

  const mostrar = (respuestas: number[], enfocar: boolean) => {
    const obs = orientar(respuestas) as { pregunta: number; tema: string; texto: string }[];
    lista?.replaceChildren(
      ...(obs.length
        ? obs
        : [{ pregunta: -1, tema: "Van bien encaminados", texto: "Tus respuestas no muestran un punto flojo claro. Lo que sigue es revisar qué dejó la última prueba y elegir la próxima tarea." }]
      ).map((o) => {
        const li = document.createElement("li");
        const tema = document.createElement("strong");
        tema.textContent = o.tema;
        const texto = document.createElement("span");
        texto.textContent = o.texto;
        li.append(tema, texto);
        if (o.pregunta >= 0) {
          const origen = document.createElement("em");
          origen.textContent = `Porque respondiste: «${preguntas[o.pregunta].opciones[respuestas[o.pregunta]]}»`;
          texto.append(origen);
        }
        return li;
      }),
    );

    const texto = [
      "Hola Pablo, hice la autoevaluación del Programa INTEGRA.",
      "",
      ...preguntas.map((p, i) => `• ${p.texto} ${p.opciones[respuestas[i]]}`),
      "",
      "Lo que me sugirió revisar:",
      ...(obs.length ? obs.map((o) => `• ${o.tema}: ${o.texto}`) : ["• Revisar la última prueba y elegir la próxima tarea."]),
      "",
      "Me gustaría charlarlo en la Consultoría Estratégica Gratuita.",
    ].join("\n");
    if (mensaje) mensaje.value = texto;
    actualizarWhatsapp();

    caja.hidden = false;
    if (enfocar) {
      titulo?.focus({ preventScroll: true });
      caja.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    }
  };

  const actualizarWhatsapp = () => {
    if (mensaje && whatsapp) whatsapp.href = `https://wa.me/${site.whatsapp.numero}?text=${encodeURIComponent(mensaje.value)}`;
  };
  mensaje?.addEventListener("input", actualizarWhatsapp);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const respuestas = leer();
    const faltan = respuestas.map((r, i) => (r === undefined ? i : -1)).filter((i) => i >= 0);
    fieldsets.forEach((f, i) => f.classList.toggle("is-falta", faltan.includes(i)));
    if (faltan.length) {
      if (error) {
        const nums = faltan.map((i) => i + 1);
        error.textContent =
          nums.length === 1
            ? `Falta responder la pregunta ${nums[0]}.`
            : `Faltan las preguntas ${nums.slice(0, -1).join(", ")} y ${nums[nums.length - 1]}.`;
        error.hidden = false;
      }
      fieldsets[faltan[0]]?.querySelector<HTMLInputElement>("input")?.focus();
      return;
    }
    if (error) error.hidden = true;
    mostrar(respuestas as number[], true);
  });

  // Si ya hay resultado, cambiar una respuesta lo actualiza al instante.
  form.addEventListener("change", (e) => {
    const fs = (e.target as HTMLElement).closest("fieldset");
    fs?.classList.remove("is-falta");
    if (caja.hidden) return;
    const respuestas = leer();
    if (respuestas.every((r) => r !== undefined)) mostrar(respuestas as number[], false);
  });

  caja.querySelector("[data-i4-editar]")?.addEventListener("click", () => {
    form.scrollIntoView({ behavior: "smooth", block: "start" });
    fieldsets[0]?.querySelector<HTMLInputElement>("input:checked, input")?.focus({ preventScroll: true });
  });
}

/* ---------- Calendario: se carga al acercarse o al pedir la agenda ---------- */
function iniciarCalendario() {
  const caja = document.querySelector<HTMLElement>("[data-i4-calendario]");
  if (!caja || caja.dataset.listo) return;
  caja.dataset.listo = "1";
  const iframe = caja.querySelector<HTMLIFrameElement>("iframe");
  const estado = caja.querySelector<HTMLElement>("[data-i4-calendario-estado]");
  const reintentar = caja.querySelector<HTMLButtonElement>("[data-i4-calendario-reintentar]");
  if (!iframe || !estado || !reintentar) return;

  let montado = false;
  let espera: number | undefined;
  const montar = () => {
    montado = true;
    window.clearTimeout(espera);
    estado.hidden = false;
    estado.textContent = "Cargando el calendario…";
    reintentar.hidden = true;
    iframe.hidden = false;
    iframe.src = iframe.dataset.src ?? "";
    espera = window.setTimeout(() => {
      estado.textContent = "El calendario está tardando. Podés abrir la agenda en otra pestaña o reintentar.";
      reintentar.hidden = false;
    }, 10000);
    if (!document.querySelector("script[data-i4-calendario-script]")) {
      const s = document.createElement("script");
      s.dataset.i4CalendarioScript = "1";
      s.src = "https://link.msgsndr.com/js/form_embed.js";
      s.async = true;
      document.body.append(s);
    }
  };
  iframe.addEventListener("load", () => {
    window.clearTimeout(espera);
    estado.hidden = true;
    reintentar.hidden = true;
  });
  reintentar.addEventListener("click", montar);

  document.querySelectorAll('a[href="#agenda"]').forEach((a) =>
    a.addEventListener("click", () => {
      if (!montado) montar();
    }),
  );
  if (!("IntersectionObserver" in window)) return montar();
  const obs = new IntersectionObserver(
    (entradas) => {
      if (entradas.some((e) => e.isIntersecting)) {
        obs.disconnect();
        if (!montado) montar();
      }
    },
    { rootMargin: "800px 0px" },
  );
  obs.observe(caja);
}

/* ---------- Eventos de medición ----------
   Si el sitio suma una herramienta de analítica que use dataLayer, los
   clics marcados con data-i4-evento ya quedan registrados. Hoy no hay. */
function iniciarEventos() {
  const w = window as unknown as { dataLayer?: unknown[] };
  document.querySelectorAll<HTMLElement>("[data-i4-evento]").forEach((el) => {
    if (el.dataset.i4Escucha) return;
    el.dataset.i4Escucha = "1";
    el.addEventListener("click", () => {
      w.dataLayer?.push({ event: el.dataset.i4Evento, version: "integra-4", lugar: el.dataset.i4Lugar });
    });
  });
}

export function initIntegra4() {
  if (!document.querySelector(".i4")) return;
  iniciarFicha();
  iniciarPortal();
  iniciarAutoevaluacion();
  iniciarCalendario();
  iniciarEventos();
}
