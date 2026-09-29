// =====================================================================
// n8n · "INTEGRA - Chequeo con informe por mail" → nodo "Preparar contacto e informe"
// ---------------------------------------------------------------------
// Este archivo es la fuente. Se pega entero en el nodo Code (modo "Run
// Once for Each Item"). Si se cambia algo en n8n, traerlo acá también.
//
// Arma el informe del lado del servidor: de lo que manda el navegador sólo
// usa QUÉ OPCIÓN eligió la persona en cada pregunta. El nivel se recalcula
// acá y todos los textos salen de este archivo. Una respuesta que no
// coincide con una opción real se ignora: nadie puede meter texto propio
// en un mail que sale desde nuestro dominio.
//
// Las preguntas y opciones tienen que coincidir con src/data/integra2.ts
// (se comparan por el rótulo corto y el texto de la opción).
// =====================================================================

// ===== AJUSTAR (siempre entre comillas simples) =====
const REMITENTE = 'Programa INTEGRA <comunicaciones@integra.innerflowai.com>';
const RESPONDER_A = 'comunicaciones@integra.innerflowai.com';
const AGENDA = 'https://api.leadconnectorhq.com/widget/booking/rx4hxRbfbinJEsJoBWWF';
const WHATSAPP = '5493426112533';
const LOCATION_ID = 'wSkZuDdnT8tbCo2X89Pu';
// ====================================================

// ---------------------------------------------------------------------
// CONTENIDO
// ---------------------------------------------------------------------
const NIVELES = [
  {
    nombre: 'Uso disperso',
    hasta: 3,
    diagnostico:
      'La IA está, pero sin dueño ni criterio: cada persona resuelve como puede y lo que aprende no queda en ningún lado. Es el punto de partida de la mayoría de las PyMEs, y también donde más tiempo se pierde sin que nadie lo vea. La buena noticia: ordenar esto no requiere comprar nada, requiere decidir por dónde empezar.',
    etapas: [
      {
        cuando: 'Esta semana',
        titulo: 'Ordenar lo que hay',
        pasos: [
          'Hacé una ronda rápida con el equipo: quién usa IA hoy, para qué tarea y con qué herramienta.',
          'Listá las tareas que más tiempo les consumen y que se repiten igual todas las semanas.',
          'Definí una regla básica: qué información de la empresa no se carga en herramientas de IA (datos de clientes, precios, contratos).',
        ],
      },
      {
        cuando: 'Próximos 30 días',
        titulo: 'Probar con foco',
        pasos: [
          'Elegí una sola tarea de esa lista y dos o tres personas para trabajarla.',
          'Medí cuánto tarda hoy y cuánto tarda con IA, durante cuatro semanas.',
          'Reservá 20 minutos por semana para ver qué funcionó y qué no.',
        ],
      },
      {
        cuando: 'A 90 días',
        titulo: 'Que se quede',
        pasos: [
          'Si funcionó, escribí cómo se hace, paso a paso, para que lo pueda repetir cualquiera del área.',
          'Mostrale el resultado al resto del equipo, con los números.',
          'Elegí la segunda tarea y repetí el ciclo.',
        ],
      },
    ],
  },
  {
    nombre: 'En transición',
    hasta: 6,
    diagnostico:
      'Hay movimiento y gente con ganas, pero falta una forma común de decidir qué se prueba, quién lo hace y cómo se cierra. Es el momento en que una PyME acelera o se estanca: con un poco de orden, lo que hoy son pruebas sueltas se convierte en mejoras que se sostienen.',
    etapas: [
      {
        cuando: 'Esta semana',
        titulo: 'Poner en común',
        pasos: [
          'Juntá a quienes ya usan IA y armá una lista de lo que hace cada uno.',
          'Marcá qué pruebas se repiten entre áreas y cuáles ya dieron resultado.',
          'Nombrá a una persona que siga el tema, aunque sea unas horas por semana.',
        ],
      },
      {
        cuando: 'Próximos 30 días',
        titulo: 'Elegir con criterio',
        pasos: [
          'Ordená las ideas por horas que ahorran y por lo grave que sería un error.',
          'Elegí dos tareas, en áreas distintas, y ponele a cada una fecha y responsable.',
          'Armá un lugar compartido donde quede escrito lo que funciona.',
        ],
      },
      {
        cuando: 'A 90 días',
        titulo: 'Llevarlo al resto',
        pasos: [
          'Revisá los resultados de esas dos tareas, con números.',
          'Que quienes lo hicieron le enseñen a otras áreas.',
          'Armá la lista siguiente y repetí el ciclo con nuevos responsables.',
        ],
      },
    ],
  },
  {
    nombre: 'Con método',
    hasta: 10,
    diagnostico:
      'Tu PyME está por delante de la mayoría: hay uso ordenado y lo que se aprende se comparte. El riesgo ahora es otro: que todo dependa de las mismas dos o tres personas, o que el ritmo se frene porque ya no hay una próxima meta clara.',
    etapas: [
      {
        cuando: 'Esta semana',
        titulo: 'Asegurar lo logrado',
        pasos: [
          'Listá las tareas que ya mejoraron con IA y quién sabe hacer cada una.',
          'Marcá las que dependen de una sola persona.',
          'Empezá por esas: escribí cómo se hacen, paso a paso.',
        ],
      },
      {
        cuando: 'Próximos 30 días',
        titulo: 'Sumar gente',
        pasos: [
          'Que cada persona que sabe le enseñe a otra de su área.',
          'Sumá un área que todavía no participe, empezando por la que tenga más tareas repetitivas.',
          'Revisá las reglas de uso: qué información se puede usar con IA y cuál no.',
        ],
      },
      {
        cuando: 'A 90 días',
        titulo: 'Crecer con dirección',
        pasos: [
          'Medí el impacto total: horas ahorradas por mes y errores que se dejaron de cometer.',
          'Buscá tareas que crucen áreas, por ejemplo de ventas a administración.',
          'Armá una revisión cada tres meses con dirección para decidir los próximos pasos.',
        ],
      },
    ],
  },
];

// Clave: el rótulo corto de la pregunta, tal cual lo manda la web.
const PREGUNTAS = {
  'Tamaño': {
    tamano: true,
    opciones: {
      'Menos de 10': { nota: 'Con menos de 10 personas, la ventaja es la velocidad: una conversación alcanza para decidir. Lo más probable es que las primeras pruebas las tengas que empujar vos.' },
      'Entre 10 y 30': { nota: 'Entre 10 y 30 personas, todavía se puede coordinar todo con una reunión corta por semana. Conviene que una persona siga el tema, aunque sea unas horas.' },
      'Entre 30 y 80': { nota: 'Entre 30 y 80 personas ya hay áreas con dinámicas distintas. Conviene arrancar por una o dos áreas y usar lo que salga ahí para sumar al resto.' },
      'Entre 80 y 150': { nota: 'Entre 80 y 150 personas, si nadie coordina, cada área va a su ritmo. Conviene un grupo chico con una persona por área y alguien de dirección que decida.' },
      'Más de 150': { nota: 'Con más de 150 personas, el orden importa más que la velocidad: reglas claras sobre qué información se usa, un grupo que coordine y áreas que avancen por etapas.' },
    },
  },
  'Uso de IA': {
    opciones: {
      'Nadie, o casi nadie': {
        peso: 0,
        lectura: 'Hoy la IA no forma parte del trabajo diario. Es un buen momento para empezar: no hay malos hábitos que desarmar ni herramientas que ordenar.',
        paso: 'Elegí dos o tres personas curiosas, de áreas distintas, y dales una hora por semana durante un mes para probar la IA en una tarea concreta de su puesto. Que anoten qué funcionó.',
      },
      'Algunos, por su cuenta': {
        peso: 0,
        lectura: 'Ya hay gente que la usa, pero por iniciativa propia. Dirección no sabe bien en qué ni con qué resultado, y si esa persona cambia de tarea, lo aprendido se va con ella.',
        paso: 'Juntá a quienes ya la usan en una charla de 30 minutos: que cada uno muestre una tarea en la que le ahorra tiempo. Es la forma más barata de saber qué está pasando y quiénes pueden empujar al resto.',
      },
      'Varios, sin coordinación': {
        peso: 1,
        lectura: 'Hay uso en varias áreas, pero cada una resuelve por su lado. Se repiten pruebas, no se comparan resultados y nadie puede decir qué le está dejando a la empresa.',
        paso: 'Armá una planilla simple: quién usa IA, para qué tarea y qué resultado ve. Con esa foto vas a poder decidir qué se sigue, qué se deja y qué conviene llevar a otras áreas.',
      },
      'Hay un uso ordenado': {
        peso: 2,
        lectura: 'El uso está ordenado, que es justo lo que a la mayoría le cuesta. El desafío ahora es que ese orden no dependa de una o dos personas.',
        paso: 'Poné por escrito cómo se hacen las tareas que ya mejoraron con IA (qué se le pide, cómo se revisa el resultado), así cualquiera del equipo las puede repetir.',
      },
    },
  },
  'Suscripciones': {
    opciones: {
      'Ninguna': {
        peso: 1,
        lectura: 'No hay gasto en herramientas, y está bien: para arrancar alcanzan las versiones gratuitas. Lo que importa al principio es el tiempo del equipo, no la herramienta.',
        paso: 'Antes de pagar cualquier herramienta, definí qué tarea querés mejorar. La herramienta se elige después.',
      },
      'Una o dos': {
        peso: 2,
        lectura: 'El gasto es acotado y fácil de seguir. Es una buena base.',
        paso: 'Una vez cada tres meses, revisá quién usa cada cuenta y para qué. Si una cuenta no se abre en un mes, se puede pasar a otra persona.',
      },
      'Entre tres y cinco': {
        peso: 1,
        lectura: 'Hay gasto repartido en varias herramientas. Sin una lista, es difícil saber cuál se usa de verdad.',
        paso: 'Hacé una lista de una hoja: herramienta, quién la usa, para qué y cuánto cuesta. Casi siempre aparecen herramientas que hacen lo mismo y se pueden dar de baja.',
      },
      'Más de cinco': {
        peso: 0,
        lectura: 'Son muchas herramientas para una PyME: es probable que algunas funciones se paguen dos veces y que haya cuentas que ya nadie abre.',
        paso: 'Hacé la lista de herramientas, costos y usuarios, y elegí una herramienta principal para todo el equipo. Las demás, sólo si resuelven algo que la principal no hace.',
      },
      'No sabemos': {
        peso: 0,
        lectura: 'Nadie tiene la cuenta de lo que se paga en IA. No es grave, pero es lo primero para ordenar, y no requiere comprar nada.',
        paso: 'Pedile a administración el detalle de lo que se debitó en tarjetas los últimos tres meses y separá lo que es IA. En una tarde tenés el mapa.',
      },
    },
  },
  'Capacitación': {
    opciones: {
      'No': {
        peso: 0,
        lectura: 'El equipo no tiene todavía una base común: cada persona usa la IA, o no, según lo que entendió por su cuenta.',
        paso: 'No hace falta un curso largo. Una o dos sesiones prácticas, con tareas reales de la empresa, alcanzan para que todos arranquen desde el mismo lugar.',
      },
      'Sí, y no cambió nada': {
        peso: 0,
        lectura: 'La inversión en aprender ya se hizo. Lo que falta no es más contenido: es llevarlo al trabajo de todos los días.',
        paso: 'Elegí una tarea concreta por área y poné una fecha para mostrar cómo quedó con IA. Lo que se aprende se sostiene cuando tiene un lugar en el trabajo diario.',
      },
      'Sí, y se aplica': {
        peso: 2,
        lectura: 'La formación se aplicó, que es lo más difícil.',
        paso: 'Medí el antes y el después de dos o tres tareas: tiempo, errores, trabajo que hubo que rehacer. Con números, las próximas decisiones se toman más rápido.',
      },
    },
  },
  'Prioridades': {
    opciones: {
      'Ni idea': {
        peso: 0,
        lectura: 'Es lo más común: se sabe que la IA puede ayudar, pero no por dónde empezar. Sin una lista ordenada, la discusión vuelve a arrancar en cada reunión.',
        paso: 'Pedile a cada área que anote las tres tareas que más tiempo le llevan cada semana. La mejor primera candidata es una tarea frecuente, con pasos claros y donde un error se corrige fácil.',
      },
      'Tenemos una intuición': {
        peso: 1,
        lectura: 'Hay una intuición, pero no una vara común: cada área defiende su prioridad.',
        paso: 'Puntuá cada idea con tres preguntas: ¿cuántas horas por semana ocupa?, ¿cuántas personas la hacen?, ¿qué tan grave es un error? Empezá por la que más horas sume y menos riesgo tenga.',
      },
      'Lo tenemos claro': {
        peso: 2,
        lectura: 'Saben qué tarea mejorar primero. Eso ahorra semanas de discusión.',
        paso: 'Ponele fecha de inicio y un responsable, y definí cómo vas a saber si funcionó; por ejemplo, horas por semana antes y después.',
      },
    },
  },
  'Lo que se aprende': {
    opciones: {
      'No, cada uno queda con lo suyo': {
        peso: 0,
        lectura: 'Lo que aprende una persona se queda con ella: el resto sigue trabajando igual y la empresa no suma nada.',
        paso: 'Reservá 20 minutos en una reunión que ya exista, como la semanal, para que alguien muestre algo que le funcionó con IA. Rotá quién muestra.',
      },
      'A veces, de manera informal': {
        peso: 1,
        lectura: 'Algo se comparte de pasillo, pero depende de las ganas de cada uno. Sin una forma de hacerlo, se pierde.',
        paso: 'Abrí un lugar fijo donde quede lo que funciona: un documento compartido o un canal del chat interno, con lo que se le pidió a la IA y el resultado.',
      },
      'Sí, se comparte y se usa': {
        peso: 2,
        lectura: 'Lo que aprende una persona llega al resto. Eso es lo que hace que aprenda la empresa y no sólo algunas personas.',
        paso: 'Sumá a ese intercambio a las áreas que todavía no participan, empezando por la que tenga más tareas repetitivas.',
      },
    },
  },
};

const PRUEBA_MANANA =
  'Elegí un mail o un informe que tengas que escribir esta semana. Pedile a la IA un primer borrador y dale contexto: para quién es, qué querés lograr y un ejemplo de cómo lo escribirías vos. Después comparalo con lo que tardás normalmente. Es la forma más rápida de ver, con algo tuyo, qué puede hacer y qué no.';

// ---------------------------------------------------------------------
// DATOS DE LA FILA
// ---------------------------------------------------------------------
const cuerpo = $json.body || $json;
const fila = cuerpo.record || {};
const datos = (fila.datos && typeof fila.datos === 'object') ? fila.datos : {};
const inf = (datos.informe && typeof datos.informe === 'object') ? datos.informe : {};
const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const email = String(fila.email || '').trim().toLowerCase();
const nombre = String(fila.nombre || '').trim().slice(0, 120);
const empresa = String(fila.empresa || '').trim().slice(0, 160);
const partes = nombre.split(/\s+/).filter(Boolean);
const primerNombre = partes[0] || '';
const apellido = partes.slice(1).join(' ');

// Sólo respuestas que coinciden con una opción real.
const elegidas = [];
let nota = '';
for (const r of (Array.isArray(inf.respuestas) ? inf.respuestas : [])) {
  const p = PREGUNTAS[String(r && r.pregunta)];
  const texto = String(r && r.respuesta);
  const op = p && p.opciones[texto];
  if (!op) continue;
  if (p.tamano) { nota = op.nota; continue; }
  elegidas.push({ pregunta: String(r.pregunta), respuesta: texto, ...op });
}

const puntaje = elegidas.reduce((t, e) => t + e.peso, 0);
const idx = Math.max(0, NIVELES.findIndex((n) => puntaje <= n.hasta));
const nivel = NIVELES[idx];

// Hacen falta las cinco preguntas que puntúan para que el informe tenga sentido.
const esValido = fila.origen === 'chequeo'
  && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  && elegidas.length === 5;

// Lo más urgente primero: las respuestas con menos puntaje arriba.
const lecturas = elegidas.slice().sort((a, b) => a.peso - b.peso);

const waTexto = 'Hola Pablo, recibí el informe de la autoevaluación INTEGRA'
  + (empresa ? ' de ' + empresa : '') + ' (resultado: ' + nivel.nombre + ') y me gustaría conversarlo.';
const waLink = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(waTexto);

// ---------------------------------------------------------------------
// HTML
// ---------------------------------------------------------------------
const AZUL = '#1e5cf2';
const MARINO = '#0d1b3d';
const SUAVE = '#4a5a67';
const HIELO = '#eef3fc';
const BORDE = '#dfe6f1';
const VERDE = '#1f9d55';
const P = 'margin:0;font-size:15px;line-height:1.65;color:' + MARINO + ';';
const ROTULO = 'margin:0 0 6px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;font-weight:700;color:' + AZUL + ';';
const H2 = 'margin:0 0 14px;font-size:21px;line-height:1.25;color:' + MARINO + ';';
const SEP = '<tr><td style="padding:0 32px;"><div style="height:1px;background:' + BORDE + ';"></div></td></tr>';
const bloque = (html) => '<tr><td style="padding:28px 32px;">' + html + '</td></tr>';
const titulo = (n, t) => '<p style="' + ROTULO + '">' + n + '</p><h2 style="' + H2 + '">' + esc(t) + '</h2>';
const boton = (href, texto, fondo) => '<a href="' + esc(href) + '" style="display:inline-block;margin:0 8px 10px 0;padding:13px 20px;border-radius:8px;background:' + fondo + ';font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;">' + esc(texto) + '</a>';

const escala = NIVELES.map((n, i) => {
  const actual = i === idx;
  return '<td width="33%" style="padding:0 3px;vertical-align:top;">'
    + '<div style="height:6px;border-radius:3px;background:' + (i <= idx ? AZUL : BORDE) + ';"></div>'
    + '<div style="padding-top:6px;font-size:12px;color:' + (actual ? MARINO : SUAVE) + ';font-weight:' + (actual ? '700' : '400') + ';">' + esc(n.nombre) + '</div></td>';
}).join('');

const htmlLecturas = lecturas.map((e) =>
  '<div style="margin:0 0 22px;">'
  + '<p style="margin:0 0 4px;font-size:13px;color:' + SUAVE + ';"><strong style="color:' + MARINO + ';">' + esc(e.pregunta) + '</strong> · Respondiste: ' + esc(e.respuesta) + '</p>'
  + '<p style="' + P + 'margin-bottom:8px;">' + esc(e.lectura) + '</p>'
  + '<p style="margin:0;padding:12px 14px;background:' + HIELO + ';border-left:3px solid ' + AZUL + ';font-size:14px;line-height:1.6;color:' + MARINO + ';"><strong>Qué hacer:</strong> ' + esc(e.paso) + '</p>'
  + '</div>'
).join('');

const htmlEtapas = nivel.etapas.map((et, i) =>
  '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 18px;"><tr>'
  + '<td width="40" style="vertical-align:top;padding-top:2px;"><div style="width:28px;height:28px;border-radius:14px;background:' + AZUL + ';color:#ffffff;font-size:14px;font-weight:700;line-height:28px;text-align:center;">' + (i + 1) + '</div></td>'
  + '<td style="vertical-align:top;">'
  + '<p style="margin:0 0 2px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;font-weight:700;color:' + SUAVE + ';">' + esc(et.cuando) + '</p>'
  + '<p style="margin:0 0 8px;font-size:16px;font-weight:700;color:' + MARINO + ';">' + esc(et.titulo) + '</p>'
  + et.pasos.map((p) => '<p style="margin:0 0 6px;padding-left:16px;text-indent:-12px;font-size:14px;line-height:1.6;color:' + MARINO + ';">–&nbsp; ' + esc(p) + '</p>').join('')
  + '</td></tr></table>'
).join('');

const saludo = primerNombre ? 'Hola ' + primerNombre + ',' : 'Hola,';
const paraEmpresa = empresa ? ' para ' + empresa : '';

const html = '<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Tu hoja de ruta con IA</title></head>'
  + '<body style="margin:0;padding:0;background:' + HIELO + ';font-family:Arial,Helvetica,sans-serif;">'
  + '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:' + HIELO + ';"><tr><td align="center" style="padding:32px 12px;">'
  + '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;background:#ffffff;border:1px solid ' + BORDE + ';border-radius:12px;">'

  // Encabezado
  + '<tr><td style="padding:30px 32px 26px;background:' + MARINO + ';border-radius:12px 12px 0 0;">'
  + '<p style="margin:0 0 10px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;font-weight:700;color:#a9c8f5;">Programa INTEGRA · Autoevaluación</p>'
  + '<h1 style="margin:0;font-size:26px;line-height:1.2;color:#ffffff;">Tu hoja de ruta con IA' + esc(paraEmpresa) + '</h1>'
  + '</td></tr>'

  // Saludo
  + bloque('<p style="' + P + 'margin-bottom:12px;">' + esc(saludo) + '</p>'
    + '<p style="' + P + '">Gracias por hacer la autoevaluación. Con tus respuestas armé este informe: dónde está hoy tu PyME con la IA, qué dice cada respuesta y una hoja de ruta de 90 días para avanzar. Está pensado para que lo puedas usar tal cual, o reenviárselo a quien lo tenga que llevar adelante.</p>')
  + SEP

  // 1. Dónde está
  + bloque(titulo('1 · Punto de partida', 'Dónde está hoy tu PyME')
    + '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;"><tr>' + escala + '</tr></table>'
    + '<p style="margin:0 0 10px;font-size:24px;font-weight:700;color:' + MARINO + ';">' + esc(nivel.nombre) + '</p>'
    + '<p style="' + P + '">' + esc(nivel.diagnostico) + '</p>'
    + (nota ? '<p style="' + P + 'margin-top:12px;color:' + SUAVE + ';">' + esc(nota) + '</p>' : ''))
  + SEP

  // 2. Lecturas
  + bloque(titulo('2 · Tus respuestas', 'Lo que vemos y qué hacer con cada punto')
    + '<p style="' + P + 'margin-bottom:20px;color:' + SUAVE + ';">Empezamos por lo que más conviene atender.</p>'
    + htmlLecturas)
  + SEP

  // 3. Hoja de ruta
  + bloque(titulo('3 · Próximos 90 días', 'Tu hoja de ruta')
    + '<p style="' + P + 'margin-bottom:20px;color:' + SUAVE + ';">Tres etapas, pensadas para una PyME en tu punto de partida. No hace falta hacerlo todo: con la primera etapa ya vas a notar la diferencia.</p>'
    + htmlEtapas)
  + SEP

  // 4. Prueba
  + bloque(titulo('4 · Para mañana', 'Una prueba de 20 minutos')
    + '<p style="' + P + '">' + esc(PRUEBA_MANANA) + '</p>')

  // CTA
  + '<tr><td style="padding:0 20px 20px;"><div style="padding:26px 22px;background:' + HIELO + ';border-radius:10px;">'
  + '<h2 style="' + H2 + 'margin-bottom:10px;">¿Lo bajamos a tu empresa?</h2>'
  + '<p style="' + P + 'margin-bottom:18px;">En una <strong>Consultoría Estratégica Gratuita</strong> de 30 minutos miramos este informe juntos, lo ajustamos a tu PyME y te llevás definidas las primeras tareas. Sin compromiso.</p>'
  + boton(AGENDA, 'Agendar consultoría gratuita', AZUL)
  + boton(waLink, 'Escribirme por WhatsApp', VERDE)
  + '</div></td></tr>'

  // Firma
  + '<tr><td style="padding:6px 32px 30px;"><p style="' + P + '">Un abrazo,<br><strong>Pablo Brunet</strong><br><span style="color:' + SUAVE + ';font-size:14px;">Programa INTEGRA · pablobrunet.com</span></p></td></tr>'
  + '</table>'
  + '<p style="max-width:620px;margin:16px auto 0;font-size:12px;line-height:1.5;color:' + SUAVE + ';">Te llega porque hiciste la autoevaluación en pablobrunet.com. Si tenés una duda, respondé este correo.</p>'
  + '</td></tr></table></body></html>';

// ---------------------------------------------------------------------
// TEXTO PLANO (para clientes de correo que no muestran HTML)
// ---------------------------------------------------------------------
const textoPlano = [
  saludo,
  '',
  'Tu hoja de ruta con IA' + paraEmpresa,
  '',
  '1. DÓNDE ESTÁ HOY TU PYME: ' + nivel.nombre,
  nivel.diagnostico,
  ...(nota ? ['', nota] : []),
  '',
  '2. LO QUE VEMOS Y QUÉ HACER',
  ...lecturas.flatMap((e) => ['', e.pregunta + ' (respondiste: ' + e.respuesta + ')', e.lectura, 'Qué hacer: ' + e.paso]),
  '',
  '3. TU HOJA DE RUTA',
  ...nivel.etapas.flatMap((et) => ['', et.cuando + ': ' + et.titulo, ...et.pasos.map((p) => '- ' + p)]),
  '',
  '4. UNA PRUEBA DE 20 MINUTOS',
  PRUEBA_MANANA,
  '',
  '¿Lo bajamos a tu empresa? Consultoría Estratégica Gratuita de 30 minutos:',
  'Agendar: ' + AGENDA,
  'WhatsApp: ' + waLink,
  '',
  'Un abrazo,',
  'Pablo Brunet',
].join('\n');

return {
  json: {
    esValido,
    evento: String(cuerpo.type || ''),
    email,
    nombre,
    primerNombre,
    apellido,
    empresa,
    nivel: nivel.nombre,
    asunto: 'Tu hoja de ruta con IA' + (empresa ? ' para ' + empresa : '') + ' · ' + nivel.nombre,
    html,
    texto: textoPlano,
    remitente: REMITENTE,
    responderA: RESPONDER_A,
    locationId: LOCATION_ID,
    idempotencia: 'chequeo-' + String(fila.id || email) + '-' + String(fila.pedidos || 1),
  },
};
