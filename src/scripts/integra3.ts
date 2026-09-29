import { integra3 } from '../data/integra3';
import { orientar } from '../lib/integra3-assessment.js';
import { site } from '../data/site';

function iniciarPortal() {
  const boton = document.querySelector<HTMLButtonElement>('[data-i3-portal-open]');
  const dialogo = document.querySelector<HTMLDialogElement>('[data-i3-portal-dialog]');
  if (!boton || !dialogo || boton.dataset.i3Bound) return;
  boton.dataset.i3Bound = 'true';
  boton.addEventListener('click', () => dialogo.showModal());
  dialogo.querySelector<HTMLButtonElement>('[data-i3-portal-close]')?.addEventListener('click', () => dialogo.close());
  dialogo.addEventListener('close', () => boton.focus());
  dialogo.addEventListener('click', (event) => {
    if (event.target === dialogo) dialogo.close();
  });
}

function iniciarEvaluacion() {
  const raiz = document.querySelector<HTMLElement>('[data-i3-assessment]');
  if (!raiz || raiz.dataset.i3Bound) return;
  raiz.dataset.i3Bound = 'true';
  const vistas = new Map(
    Array.from(raiz.querySelectorAll<HTMLElement>('[data-i3-view]')).map((nodo) => [nodo.dataset.i3View, nodo]),
  );
  const progreso = raiz.querySelector<HTMLElement>('[data-i3-progress]');
  const leyenda = raiz.querySelector<HTMLElement>('[data-i3-legend]');
  const opciones = raiz.querySelector<HTMLElement>('[data-i3-options]');
  const error = raiz.querySelector<HTMLElement>('[data-i3-error]');
  const formulario = raiz.querySelector<HTMLFormElement>('[data-i3-form]');
  const atras = raiz.querySelector<HTMLButtonElement>('[data-i3-back]');
  const continuar = raiz.querySelector<HTMLButtonElement>('[data-i3-next]');
  const resultado = raiz.querySelector<HTMLElement>('[data-i3-result-list]');
  const tituloResultado = raiz.querySelector<HTMLElement>('[data-i3-result-heading]');
  const mensaje = raiz.querySelector<HTMLTextAreaElement>('[data-i3-message]');
  const compartir = raiz.querySelector<HTMLAnchorElement>('[data-i3-share]');
  if (!progreso || !leyenda || !opciones || !error || !formulario || !atras || !continuar || !resultado || !tituloResultado || !mensaje || !compartir) return;

  const respuestas: Array<number | undefined> = Array(integra3.preguntas.length).fill(undefined);
  let indice = 0;
  const vista = (nombre: 'intro' | 'question' | 'result') => {
    vistas.forEach((nodo, clave) => { nodo.hidden = clave !== nombre; });
  };

  const mostrarPregunta = () => {
    vista('question');
    const pregunta = integra3.preguntas[indice];
    progreso.textContent = `Pregunta ${indice + 1} de ${integra3.preguntas.length}`;
    leyenda.textContent = pregunta.titulo;
    opciones.replaceChildren();
    pregunta.opciones.forEach((texto, valor) => {
      const etiqueta = document.createElement('label');
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'i3-opcion';
      radio.value = String(valor);
      radio.checked = respuestas[indice] === valor;
      const copia = document.createElement('span');
      copia.textContent = texto;
      etiqueta.append(radio, copia);
      opciones.append(etiqueta);
    });
    atras.textContent = indice === 0 ? '← Volver al inicio' : '← Anterior';
    continuar.textContent = indice === integra3.preguntas.length - 1 ? 'Ver orientación →' : 'Continuar →';
    error.hidden = true;
    leyenda.setAttribute('tabindex', '-1');
    leyenda.focus();
  };

  const mostrarResultado = () => {
    vista('result');
    resultado.replaceChildren();
    const observaciones = orientar(respuestas);
    if (observaciones.length === 0) {
      const item = document.createElement('li');
      const origen = document.createElement('strong');
      origen.textContent = 'Siguiente revisión';
      const texto = document.createElement('span');
      texto.textContent = 'Tus respuestas no señalan una prioridad clara. Revisá la evidencia de una prueba reciente y conversá con el equipo qué conviene hacer después.';
      item.append(origen, texto);
      resultado.append(item);
    } else {
      observaciones.forEach(({ origen, texto }) => {
        const item = document.createElement('li');
        const nombre = document.createElement('strong');
        nombre.textContent = origen;
        const explicacion = document.createElement('span');
        explicacion.textContent = texto;
        item.append(nombre, explicacion);
        resultado.append(item);
      });
    }
    const lineas = integra3.preguntas.map((pregunta, i) => `• ${pregunta.titulo} ${pregunta.opciones[respuestas[i] ?? 0]}`);
    mensaje.value = [
      'Hola Pablo, hice la autoevaluación de la página del Programa INTEGRA.',
      '',
      ...lineas,
      '',
      'Puntos que voy a revisar:',
      ...(observaciones.length ? observaciones.map((item) => `• ${item.origen}: ${item.texto}`) : ['• Revisar la evidencia de una prueba reciente.']),
      '',
      'Me gustaría conversarlo en la Consultoría Estratégica Gratuita.',
    ].join('\n');
    compartir.href = `https://wa.me/${site.whatsapp.numero}?text=${encodeURIComponent(mensaje.value)}`;
    tituloResultado.focus();
  };

  raiz.querySelector('[data-i3-start]')?.addEventListener('click', () => { indice = 0; mostrarPregunta(); });
  formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    const elegida = formulario.querySelector<HTMLInputElement>('input[name="i3-opcion"]:checked');
    if (!elegida) { error.hidden = false; return; }
    respuestas[indice] = Number(elegida.value);
    if (indice === integra3.preguntas.length - 1) mostrarResultado();
    else { indice += 1; mostrarPregunta(); }
  });
  atras.addEventListener('click', () => {
    if (indice === 0) vista('intro');
    else { indice -= 1; mostrarPregunta(); }
  });
  raiz.querySelector('[data-i3-edit]')?.addEventListener('click', () => { indice = 0; mostrarPregunta(); });
  raiz.querySelector('[data-i3-reset]')?.addEventListener('click', () => {
    respuestas.fill(undefined);
    indice = 0;
    vista('intro');
    raiz.querySelector<HTMLButtonElement>('[data-i3-start]')?.focus();
  });
}

function iniciarCalendario() {
  const caja = document.querySelector<HTMLElement>('[data-i3-calendar]');
  if (!caja || caja.dataset.i3Bound) return;
  caja.dataset.i3Bound = 'true';
  const iframe = caja.querySelector<HTMLIFrameElement>('iframe');
  const estado = caja.querySelector<HTMLElement>('[data-i3-calendar-status]');
  const reintentar = caja.querySelector<HTMLButtonElement>('[data-i3-calendar-retry]');
  if (!iframe || !estado || !reintentar) return;
  let temporizador: ReturnType<typeof setTimeout> | undefined;
  const montar = () => {
    if (temporizador) clearTimeout(temporizador);
    estado.hidden = false;
    estado.textContent = 'Cargando el calendario…';
    reintentar.hidden = true;
    iframe.hidden = false;
    iframe.src = iframe.dataset.src ?? '';
    temporizador = setTimeout(() => {
      estado.textContent = 'La agenda está demorando. Podés abrirla en otra pestaña o reintentar aquí.';
      reintentar.hidden = false;
    }, 10000);
    if (!document.querySelector('script[data-i3-calendar-script]')) {
      const script = document.createElement('script');
      script.dataset.i3CalendarScript = 'true';
      script.src = 'https://link.msgsndr.com/js/form_embed.js';
      script.async = true;
      document.body.append(script);
    }
  };
  iframe.addEventListener('load', () => {
    if (temporizador) clearTimeout(temporizador);
    estado.hidden = true;
    reintentar.hidden = true;
  });
  reintentar.addEventListener('click', montar);
  if (!('IntersectionObserver' in window)) { montar(); return; }
  const observador = new IntersectionObserver((entradas) => {
    if (entradas.some((entrada) => entrada.isIntersecting)) {
      observador.disconnect();
      montar();
    }
  }, { rootMargin: '700px 0px' });
  observador.observe(caja);
}

export function initIntegra3() {
  if (!document.querySelector('.i3')) return;
  iniciarPortal();
  iniciarEvaluacion();
  iniciarCalendario();
}
