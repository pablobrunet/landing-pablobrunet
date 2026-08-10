/* =====================================================================
   BISCAYART — contenido de /cotizacion-biscayart
   ---------------------------------------------------------------------
   Propuesta de servicios para UN cliente concreto. Todo el texto vive
   acá; los componentes de /src/components/biscayart sólo lo dibujan.

   ⚠️ QUÉ ES ESTA PÁGINA, Y QUÉ NO
   Es una propuesta escrita, publicada como página web en vez de como
   PDF. De ahí las dos reglas que la gobiernan y que hay que sostener si
   se agrega contenido nuevo:

   1 · EL LENGUAJE ES EL DE UNA PROPUESTA, NO EL DE UNA LANDING.
       Registro descriptivo —"el servicio comprende", "queda a cargo de
       la empresa", "quedan fuera del alcance"—. Los títulos nombran lo
       que hay debajo ("Alcance del servicio"), no buscan convencer. No
       hay promesas de resultado, no hay adjetivos de venta, no hay
       llamados a la acción. Quien abre esto ya pidió el presupuesto: lo
       que necesita es saber con precisión qué se contrata.

   2 · LA FORMA APROVECHA QUE ES HTML.
       Secciones con aire, índice navegable, tarjetas, selector de áreas
       sin JavaScript, línea de tiempo de la jornada. La lectura tiene
       que ser cómoda; lo que no puede es volverse publicitaria.

   Numeración: cada sección lleva su número (01 a 11) en el rótulo
   superior, y los subpuntos (4.1, 9.2) se citan en el texto de otras
   secciones. El índice se arma con el array `indice` del final. Si se
   agrega, se saca o se reordena una sección, hay que tocar el array, el
   `n` de la sección y el orden de los componentes en la página.

   Tratamiento: "la empresa" en las condiciones, "ustedes" sólo cuando la
   frase se dirige al destinatario. El nombre propio queda en la ficha de
   la portada, el <title> y el asunto del correo.

   QUÉ SE COTIZA (cerrado el 2026-08-10, en pesos argentinos):
     · Honorarios — $ 1.800.000 por el programa completo, con una jornada
       presencial de 8 horas en un único viaje a Pergamino.
     · Los viáticos NO están incluidos y se facturan aparte.
   La página no aclara si el valor lleva IVA, y es la misma decisión que
   se tomó en la propuesta de Royjo: no agregar esa línea.

   FORMA DE PAGO (confirmada por Pablo): 50 % a la confirmación, como
   reserva de fecha, y el 50 % restante hasta 24 horas antes de la
   jornada. Los viáticos se facturan después de realizada.

   REPROGRAMACIÓN (confirmada por Pablo): 3 días corridos de preaviso
   para reprogramar sin cargo. Ver `generales.bloques`, punto 9.3.

   ⚠️ DECISIÓN REDACTADA QUE HAY QUE CONFIRMAR ANTES DE ENVIAR
     · `economicas.detalles` — la validez de 30 días, y la fecha de
       emisión de la ficha, calculadas sobre el 10/08/2026.

   ⚠️ EL PORTAL NO FORMA PARTE DEL ALCANCE
   La sección 10 lo presenta como servicio NO comprendido ni en el
   alcance ni en el importe, y lo declara antes de mostrarlo. Esa
   aclaración no se saca ni se ablanda.

   ⚠️ NINGÚN ÁREA ES "LA PRINCIPAL"
   Las cinco áreas y los dos grupos se presentan con el mismo peso. Que
   administración y contabilidad tengan un bloque propio se explica por
   tamaño y afinidad de tareas, nunca por importancia.

   NOTA DE INDEXACIÓN: la página va con `noindex`. Es una propuesta, no
   contenido del sitio: se comparte por enlace directo.
   ===================================================================== */

/* ---------------------------------------------------------------------
   01 · OBJETO
   ------------------------------------------------------------------- */
const objeto = {
  n: "01",
  id: "objeto",
  eyebrow: "01 · Objeto",
  titulo: "Objeto de la propuesta",
  parrafos: [
    "El presente documento detalla el alcance, la organización y las condiciones de un programa de adopción de Inteligencia Artificial destinado al personal de las áreas administrativa y contable, comercial, de marketing, de laboratorio y de producción.",
    "El programa se estructura en tres etapas: un relevamiento previo, una jornada presencial de trabajo en las instalaciones de la empresa y la entrega de material de referencia para su uso posterior.",
  ],
  finalidadTitulo: "Finalidad",
  finalidad:
    "Que cada área identifique aplicaciones concretas de Inteligencia Artificial sobre sus propias tareas, las resuelva durante la jornada con acompañamiento, y disponga después de los criterios y el material necesarios para sostener esas prácticas sin asistencia externa.",
} as const;

/* ---------------------------------------------------------------------
   02 · SITUACIÓN ACTUAL
   Lo que se afirma acá sale de la conversación previa y nada más. Todo
   lo demás queda sujeto al relevamiento del punto 4.1: es lo que evita
   que el documento suene a diagnóstico inventado.
   ------------------------------------------------------------------- */
const situacion = {
  n: "02",
  id: "situacion",
  eyebrow: "02 · Situación actual",
  titulo: "Situación actual y consideraciones previas",
  intro: "De la información relevada hasta el momento surgen las siguientes consideraciones:",
  puntos: [
    "La empresa utiliza actualmente una única cuenta de ChatGPT compartida entre las distintas áreas.",
    "El personal alcanzado ronda las treinta personas, con funciones, herramientas y necesidades marcadamente distintas entre sí.",
    "El nivel de utilización es desparejo: conviven personas con uso frecuente y personas sin experiencia previa.",
    "No se ha identificado un criterio común sobre qué tareas conviene resolver con asistencia de Inteligencia Artificial ni sobre qué información puede volcarse en estas herramientas.",
  ],
  cuentaTitulo: "Sobre el esquema de cuentas",
  cuentaTexto:
    "Durante la jornada se destina un tramo a revisar las implicancias de trabajar con una cuenta compartida —trazabilidad, personalización del historial de cada usuario y tratamiento de la información— y a describir las alternativas disponibles. La decisión sobre el esquema de licenciamiento, su contratación y su configuración quedan fuera del alcance de esta propuesta.",
  cierre:
    "Estas consideraciones son preliminares. Se verifican durante el relevamiento descrito en el punto 4.1, y el detalle definitivo de los contenidos se ajusta a partir de sus resultados.",
} as const;

/* ---------------------------------------------------------------------
   03 · ENFOQUE
   Los cinco criterios van con el mismo peso visual: no hay uno
   principal. Los títulos son etiquetas, no argumentos.
   ------------------------------------------------------------------- */
const enfoque = {
  n: "03",
  id: "enfoque",
  eyebrow: "03 · Enfoque",
  titulo: "Enfoque de trabajo",
  parrafos: [
    "El programa se organiza por áreas de trabajo y no por herramientas. La utilidad de estas tecnologías no se demuestra en abstracto: se verifica sobre tareas concretas, con los documentos, los plazos y los criterios propios de cada función. Un mismo contenido dictado para treinta personas de cinco áreas distintas obliga a trabajar sobre el promedio, y el promedio no modifica la forma de trabajar de nadie.",
  ],
  criteriosTitulo: "Criterios que ordenan el trabajo",
  criterios: [
    {
      numero: "01",
      icono: "documento",
      titulo: "Tareas reales",
      texto:
        "Se trabaja sobre tareas aportadas por los propios participantes, no sobre ejemplos genéricos.",
    },
    {
      numero: "02",
      icono: "people",
      titulo: "Grupos reducidos",
      texto:
        "Los participantes se organizan en grupos que permitan atender casos individuales durante la sesión.",
    },
    {
      numero: "03",
      icono: "chip",
      titulo: "Herramientas disponibles",
      texto:
        "Se prioriza el uso de las herramientas con las que la empresa ya cuenta antes de proponer la incorporación de otras.",
    },
    {
      numero: "04",
      icono: "lista",
      titulo: "Registro de lo trabajado",
      texto:
        "Los casos se resuelven durante la jornada y las instrucciones construidas quedan documentadas para su reutilización.",
    },
    {
      numero: "05",
      icono: "shield",
      titulo: "Límites explícitos",
      texto:
        "Se tratan la verificación de resultados, los errores frecuentes y el manejo de información sensible.",
    },
  ],
} as const;

/* ---------------------------------------------------------------------
   04 · ALCANCE
   La sección que define qué se contrata. Los subpuntos 4.1 a 4.4 se
   citan desde el punto 2, el 8, el 9 y el 11: la numeración viene de los
   datos y tiene que ser estable.
   ------------------------------------------------------------------- */
const alcance = {
  n: "04",
  id: "alcance",
  eyebrow: "04 · Alcance",
  titulo: "Alcance del servicio",
  intro:
    "El servicio comprende las cuatro instancias que se detallan a continuación. Todas están incluidas en el importe indicado en el punto 8.",
  etapas: [
    {
      n: "4.1",
      icono: "lupa",
      titulo: "Relevamiento previo",
      texto:
        "Instancia de diagnóstico destinada a definir la composición de los grupos y los contenidos de cada bloque. Se desarrolla de manera remota y comprende:",
      items: [
        "Un formulario individual, breve, para la totalidad de los participantes, que releva rol, responsabilidades, herramientas digitales de uso habitual, frecuencia de utilización de IA, dificultades percibidas y tareas repetitivas o de alto consumo de tiempo.",
        "Una reunión de trabajo, de hasta noventa minutos, con los referentes de las áreas involucradas, para relevar procesos, circuitos de información, herramientas disponibles y prioridades de la empresa.",
        "El procesamiento de ambas instancias y la devolución de un resumen con la composición propuesta de los grupos y los casos seleccionados para trabajar.",
      ],
    },
    {
      n: "4.2",
      icono: "flow",
      titulo: "Diseño de los contenidos",
      texto:
        "A partir del relevamiento se define el contenido definitivo de cada bloque:",
      items: [
        "Selección de los casos de uso a trabajar por área.",
        "Preparación de ejercicios y ejemplos sobre información propia de la empresa.",
        "Elaboración de la agenda definitiva de la jornada, que se comparte con no menos de cinco días hábiles de anticipación.",
      ],
    },
    {
      n: "4.3",
      icono: "calendario",
      titulo: "Jornada presencial",
      texto:
        "Una jornada de ocho horas de trabajo en las instalaciones de la empresa, en Pergamino, organizada en dos grupos y un bloque de cierre. Cada bloque grupal se compone de tres tramos:",
      items: [
        "Marco común de trabajo con Inteligencia Artificial: alcances y límites actuales, formulación de instrucciones, errores frecuentes, verificación de resultados y criterios sobre qué información puede utilizarse.",
        "Aplicaciones propias del área: desarrollo de los casos de uso seleccionados en el relevamiento, con demostración y práctica.",
        "Clínica en vivo: resolución asistida de tareas reales aportadas por los participantes, con registro escrito de las instrucciones que se van construyendo.",
      ],
      cierre:
        "La jornada finaliza con un bloque junto a los referentes de las áreas, destinado a revisar lo trabajado, acordar criterios de uso de la información y definir las prácticas que la empresa sostendrá internamente.",
    },
    {
      n: "4.4",
      icono: "lista",
      titulo: "Material y documentación",
      texto:
        "Dentro de los diez días hábiles posteriores a la jornada se entrega, en formato digital:",
      items: [
        "Biblioteca de instrucciones (prompts) organizada por área, incluyendo las construidas durante la clínica.",
        "Guías prácticas y plantillas de trabajo de los casos desarrollados.",
        "Documento de criterios de uso responsable de la información de la empresa.",
        "Informe final con la síntesis de lo trabajado, las buenas prácticas identificadas y las recomendaciones de continuidad.",
      ],
    },
  ],
} as const;

/* ---------------------------------------------------------------------
   05 · ORGANIZACIÓN DE LOS PARTICIPANTES
   Los dos grupos llevan exactamente los mismos campos: cualquier
   asimetría en el detalle se leería como que uno importa más.

   ⚠️ NO SE DECLARA CUÁNTA GENTE TIENE CADA GRUPO. No sabemos cómo se
   reparten las treinta personas entre las áreas, y poner una estimación
   por grupo sería inventar un dato que después hay que sostener. El
   único número de participantes que aparece en toda la propuesta es el
   total, en la ficha de la portada. Si el relevamiento devuelve la
   distribución real, ahí sí se puede agregar.
   ------------------------------------------------------------------- */
const organizacion = {
  n: "05",
  id: "organizacion",
  eyebrow: "05 · Participantes",
  titulo: "Organización de los participantes",
  intro:
    "Los participantes se distribuyen en dos grupos de trabajo, reunidos por afinidad de tareas. La conformación definitiva se establece a partir del relevamiento previo y puede ajustarse si sus resultados aconsejan otro agrupamiento.",
  grupos: [
    {
      letra: "A",
      icono: "documento",
      etiqueta: "Grupo A",
      nombre: "Administración y Contabilidad",
      duracion: "3 h 30 min",
      texto:
        "Bloque destinado a las tareas de gestión: documentación, planillas de cálculo, comprobantes, correspondencia y reportes de elaboración periódica.",
    },
    {
      letra: "B",
      icono: "flow",
      etiqueta: "Grupo B",
      nombre: "Comercial, Marketing, Laboratorio y Producción",
      duracion: "3 h 15 min",
      texto:
        "Bloque destinado a las áreas que trabajan sobre clientes, contenidos, información técnica y operación, con tareas comunes de investigación, redacción y documentación.",
    },
  ],
  cierre: {
    icono: "people",
    etiqueta: "Bloque de cierre",
    nombre: "Referentes de todas las áreas",
    duracion: "45 min",
    texto:
      "Instancia final conjunta, destinada a revisar lo trabajado en ambos grupos, acordar criterios de uso de la información y definir las prácticas que la empresa sostendrá internamente.",
  },
  notas: [
    "La totalidad de los participantes se releva de manera individual, con independencia del grupo al que se incorpore.",
  ],
} as const;

/* ---------------------------------------------------------------------
   06 · CONTENIDOS POR ÁREA
   El selector usa radios + `:has()`, sin JavaScript. Las claves están
   nombradas UNA POR UNA en el CSS del componente: si se agrega o se
   renombra un área, hay que tocar también esa regla.

   Las listas están emparejadas en cantidad a propósito: los cinco
   paneles se apilan en la misma celda y el bloque mide lo que el más
   largo.
   ------------------------------------------------------------------- */
const contenidos = {
  n: "06",
  id: "contenidos",
  eyebrow: "06 · Contenidos",
  titulo: "Contenidos previstos por área",
  intro:
    "El detalle siguiente corresponde a las aplicaciones previstas para cada área y constituye el punto de partida del diseño. La selección definitiva se establece a partir del relevamiento descrito en el punto 4.1.",
  comunesTitulo: "Contenidos comunes a ambos grupos",
  comunesTexto:
    "Cada bloque grupal abre con un tramo idéntico para los dos grupos, previo al trabajo por área:",
  comunes: [
    "Alcances y límites actuales de la Inteligencia Artificial generativa",
    "Formulación de instrucciones: contexto, objetivo, restricciones y formato de salida",
    "Errores frecuentes y criterios de verificación de resultados",
    "Tratamiento de la información de la empresa: qué puede utilizarse y qué no",
    "Diferencias entre el trabajo con cuentas individuales y con una cuenta compartida",
    "Organización del propio trabajo con asistencia de IA",
  ],
  listado: [
    {
      clave: "admin",
      icono: "documento",
      nombre: "Administración y Contabilidad",
      corto: "Administración",
      aplicaciones: [
        "Trabajo asistido sobre planillas de cálculo",
        "Control y cruce de información entre fuentes",
        "Redacción y revisión de correspondencia",
        "Lectura y síntesis de documentación extensa",
        "Elaboración de reportes de periodicidad fija",
        "Ordenamiento de comprobantes e información administrativa",
        "Sistematización de respuestas a consultas frecuentes",
        "Preparación de informes internos",
      ],
    },
    {
      clave: "comercial",
      icono: "brujula",
      nombre: "Comercial",
      corto: "Comercial",
      aplicaciones: [
        "Investigación de clientes y potenciales clientes",
        "Preparación de visitas y reuniones",
        "Elaboración de argumentos y respuestas a objeciones",
        "Redacción de comunicaciones personalizadas",
        "Organización del seguimiento comercial",
        "Recuperación de clientes inactivos",
        "Síntesis posterior a reuniones",
        "Preparación de presupuestos y propuestas",
      ],
    },
    {
      clave: "marketing",
      icono: "campana",
      nombre: "Marketing y comunicación",
      corto: "Marketing",
      aplicaciones: [
        "Planificación y desarrollo de contenidos",
        "Redacción y adaptación de piezas por canal",
        "Investigación de mercado y de competencia",
        "Elaboración de guiones y textos de campaña",
        "Preparación de materiales comerciales",
        "Generación de recursos visuales",
        "Análisis e interpretación de resultados",
      ],
    },
    {
      clave: "laboratorio",
      icono: "lupa",
      nombre: "Laboratorio",
      corto: "Laboratorio",
      aplicaciones: [
        "Síntesis de bibliografía y documentación técnica",
        "Traducción de documentación",
        "Redacción de protocolos, procedimientos e informes",
        "Ordenamiento de resultados y registros",
        "Búsqueda de antecedentes",
        "Análisis de datos en planillas",
        "Traducción de información técnica a lenguaje llano",
      ],
    },
    {
      clave: "produccion",
      icono: "flow",
      nombre: "Producción",
      corto: "Producción",
      aplicaciones: [
        "Redacción de instructivos y procedimientos de trabajo",
        "Diseño de registros y planillas de seguimiento",
        "Apoyo a la planificación y programación",
        "Elaboración de listas de verificación",
        "Redacción de informes de incidencias",
        "Consulta asistida de manuales y fichas técnicas",
        "Preparación de material para capacitación interna",
      ],
    },
  ],
} as const;

/* ---------------------------------------------------------------------
   07 · PROGRAMA DE LA JORNADA
   Los horarios suman 8 horas de trabajo entre las 9.00 y las 18.00, con
   una hora de intermedio. Si se corrige un tramo, revisar que la cuenta
   siga cerrando: el total está afirmado en la ficha de la portada, en el
   punto 4.3 y en el 8.

   Las filas sin grupo asignado llevan `pausa: true` y se dibujan
   atenuadas: son parte del día pero no son actividad de los
   participantes.
   ------------------------------------------------------------------- */
const programa = {
  n: "07",
  id: "programa",
  eyebrow: "07 · Programa",
  titulo: "Programa de la jornada",
  intro:
    "El esquema siguiente es orientativo y se ajusta a la operación de la empresa. Contempla ocho horas de trabajo entre las 9.00 y las 18.00, con una hora de intermedio al mediodía.",
  filas: [
    { horario: "09.00 – 09.30", actividad: "Preparación técnica de la sala", quienes: "", pausa: true },
    { horario: "09.30 – 10.15", actividad: "Marco común de trabajo con Inteligencia Artificial", quienes: "Grupo A", pausa: false },
    { horario: "10.15 – 11.30", actividad: "Aplicaciones propias del área", quienes: "Grupo A", pausa: false },
    { horario: "11.30 – 11.45", actividad: "Intervalo", quienes: "", pausa: true },
    { horario: "11.45 – 13.00", actividad: "Clínica en vivo sobre casos propios", quienes: "Grupo A", pausa: false },
    { horario: "13.00 – 14.00", actividad: "Intermedio", quienes: "", pausa: true },
    { horario: "14.00 – 14.45", actividad: "Marco común de trabajo con Inteligencia Artificial", quienes: "Grupo B", pausa: false },
    { horario: "14.45 – 16.00", actividad: "Aplicaciones propias de cada área", quienes: "Grupo B", pausa: false },
    { horario: "16.00 – 16.15", actividad: "Intervalo", quienes: "", pausa: true },
    { horario: "16.15 – 17.15", actividad: "Clínica en vivo sobre casos propios", quienes: "Grupo B", pausa: false },
    { horario: "17.15 – 18.00", actividad: "Cierre y acuerdos de continuidad", quienes: "Referentes", pausa: false },
  ],
  clinicaTitulo: "Sobre la clínica en vivo",
  clinicaTexto:
    "Se denomina así al tramo de trabajo asistido sobre tareas reales. Cada participante concurre con una tarea propia —una comunicación que le insume tiempo, una planilla de elaboración periódica, un informe, una búsqueda técnica— y se la resuelve durante la sesión, en pantalla y con el grupo presente. Las instrucciones que se construyen quedan registradas y se incorporan al material descrito en el punto 4.4.",
} as const;

/* ---------------------------------------------------------------------
   08 · CONDICIONES ECONÓMICAS
   ⚠️ La validez de 30 días es una redacción propuesta: confirmar con
   Pablo antes de enviar. La forma de pago sí está confirmada.
   La fórmula de los viáticos es textual de Pablo — no reescribirla.
   ------------------------------------------------------------------- */
const economicas = {
  n: "08",
  id: "condiciones-economicas",
  eyebrow: "08 · Condiciones económicas",
  titulo: "Condiciones económicas",
  conceptoTitulo: "Concepto",
  concepto:
    "Programa completo: relevamiento previo, diseño de contenidos, jornada presencial de ocho horas y material de referencia posterior.",
  incluye: [
    "Relevamiento individual y reunión con referentes (4.1)",
    "Diseño de los contenidos por área (4.2)",
    "Jornada presencial de 8 horas en Pergamino (4.3)",
    "Material, biblioteca de instrucciones e informe final (4.4)",
  ],
  importeTitulo: "Honorarios",
  importe: "$ 1.800.000",
  moneda: "ARS",
  monedaNota: "Pesos argentinos",
  pendiente: "A definir",
  detalles: [
    {
      icono: "location",
      titulo: "Viáticos",
      texto:
        "No están incluidos en el importe indicado y se facturan por separado. El monto se obtiene de un calculador propio, cuyo cálculo será compartido oportunamente a la empresa. Se calcula sobre la base de un único viaje a Pergamino.",
    },
    {
      icono: "documento",
      titulo: "Forma de pago",
      texto:
        "50 % a la confirmación de la propuesta, en concepto de reserva de fecha, y el 50 % restante hasta 24 horas antes de la jornada. Los viáticos se facturan con posterioridad a su realización.",
    },
    {
      icono: "clock",
      titulo: "Validez",
      texto:
        "Los valores indicados mantienen su vigencia durante treinta días corridos desde la fecha de emisión de esta propuesta.",
    },
    {
      icono: "calendario",
      titulo: "Jornada adicional",
      texto:
        "Si la empresa resolviera incorporar una segunda jornada presencial, se cotiza por separado y con sus propios viáticos, sobre la base de la agenda que se acuerde.",
    },
  ],
} as const;

/* ---------------------------------------------------------------------
   09 · CONDICIONES GENERALES
   Lo que hace que esto sea una propuesta y no un folleto. La lista de
   prestaciones no comprendidas (9.2) es deliberadamente exhaustiva: lo
   que no se dice acá se discute después.
   ------------------------------------------------------------------- */
const generales = {
  n: "09",
  id: "condiciones-generales",
  eyebrow: "09 · Condiciones generales",
  titulo: "Condiciones generales",
  bloques: [
    {
      n: "9.1",
      icono: "check",
      titulo: "Requisitos a cargo de la empresa",
      texto: "Para el desarrollo de la jornada, la empresa provee:",
      items: [
        "Sala con capacidad para el grupo, con mesas de trabajo que permitan el uso de equipos.",
        "Proyector o pantalla, con conexión para computadora portátil.",
        "Conexión a internet estable, con capacidad suficiente para el uso simultáneo de todos los participantes.",
        "Que cada participante concurra con el equipo que utiliza habitualmente para trabajar.",
        "Acceso operativo a las cuentas y herramientas de Inteligencia Artificial que se vayan a utilizar durante la jornada.",
        "La designación de un referente por área para el relevamiento previo y el bloque de cierre.",
        "La respuesta del relevamiento individual completo con una anticipación no menor a diez días corridos respecto de la fecha acordada.",
      ],
    },
    {
      n: "9.2",
      icono: "shield",
      titulo: "Prestaciones no comprendidas",
      texto: "Quedan expresamente fuera del alcance de esta propuesta:",
      items: [
        "Los viáticos y gastos de traslado, alojamiento y comidas, que se facturan por separado según el punto 8.",
        "La contratación, el pago y la configuración de licencias, suscripciones o cuentas de las herramientas que se utilicen.",
        "El desarrollo o la implementación de automatizaciones, integraciones o soluciones de software a medida.",
        "Tareas de infraestructura, auditoría de sistemas, migración o normalización de datos.",
        "El asesoramiento legal, contable, impositivo o técnico específico de cualquiera de las áreas.",
        "Instancias adicionales de formación, acompañamiento, seguimiento o soporte posteriores a la jornada.",
        "La provisión de equipamiento informático para los participantes.",
      ],
    },
    {
      n: "9.3",
      icono: "calendario",
      titulo: "Reprogramación y cancelación",
      texto: "",
      items: [
        "La fecha queda reservada con la confirmación de la propuesta.",
        "La reprogramación solicitada con una anticipación no menor a tres días corridos no genera cargo y queda sujeta a disponibilidad de agenda.",
        "En caso de reprogramación o cancelación con una anticipación menor, los gastos comprometidos y no reintegrables —pasajes y alojamiento, entre otros— quedan a cargo de la empresa.",
      ],
    },
    {
      n: "9.4",
      icono: "candado",
      titulo: "Confidencialidad",
      texto:
        "La información de la empresa a la que se acceda durante el relevamiento y la jornada recibe tratamiento confidencial y se utiliza exclusivamente para la ejecución de este trabajo. Existe disponibilidad para suscribir el acuerdo de confidencialidad que la empresa disponga.",
      items: [],
    },
    {
      n: "9.5",
      icono: "lupa",
      titulo: "Alcance de los resultados",
      texto:
        "Las herramientas de Inteligencia Artificial pueden producir resultados incorrectos o incompletos. Su verificación queda a cargo de los responsables de cada área, y el trabajo desarrollado no sustituye el asesoramiento profesional específico que cada materia requiera. Durante la jornada no se incorpora a estas herramientas información sensible de la empresa sin acuerdo previo sobre su tratamiento.",
      items: [],
    },
    {
      n: "9.6",
      icono: "lista",
      titulo: "Material entregado",
      texto:
        "El material descrito en el punto 4.4 se entrega para uso interno de la empresa y de su personal. No se autoriza su comercialización ni su distribución a terceros ajenos a la organización.",
      items: [],
    },
  ],
} as const;

/* ---------------------------------------------------------------------
   10 · SERVICIOS COMPLEMENTARIOS
   ⚠️ NO SE OFRECE NADA ACÁ. Se informa que el recurso existe, se declara
   que no está comprendido y se deja abierta la posibilidad de cotizarlo
   por separado. El aviso va ANTES de la descripción y de la imagen.

   La captura vive en /public/images/integra/ y mide 1358×594. Si se
   reemplaza por una de otra proporción, actualizar `width`/`height` en
   BiscayartComplementarios.astro.
   ------------------------------------------------------------------- */
const complementarios = {
  n: "10",
  id: "complementarios",
  eyebrow: "10 · No comprendido",
  titulo: "Servicios complementarios no comprendidos",
  aviso:
    "Lo descrito en este punto no forma parte del alcance detallado en el punto 4 ni está comprendido en el importe indicado en el punto 8. Se incluye a título informativo, para conocimiento de la empresa.",
  parrafos: [
    "Los programas de este tipo suelen plantear, una vez finalizada la instancia presencial, la cuestión de cómo sostener lo trabajado. Para esos casos se dispone de un portal privado de formación, en el que cada participante accede con un usuario propio, cursa contenidos en video organizados por nivel y por herramienta, y conserva el registro de su avance.",
    "Si la empresa resolviera incorporarlo con posterioridad a la jornada, se cotiza por separado en función de la cantidad de usuarios y del período de acceso.",
  ],
  captura: "/images/integra/portal-integra.png",
  capturaAlt:
    "Portal de formación: panel de un participante, con el curso en progreso, su barra de avance y el catálogo de cursos organizados por nivel",
  capturaPie: "Vista del portal de formación para un participante.",
} as const;

/* ---------------------------------------------------------------------
   11 · PRÓXIMOS PASOS
   Los plazos repiten los del punto 4 y el 9.1. Si cambia uno, cambian
   los tres.

   El bloque de contacto NO es un llamado a la acción: es la vía para
   consultar sobre el documento. Por eso el título pregunta por dudas y
   no propone reservar nada, y no hay calendario embebido.
   ------------------------------------------------------------------- */
const pasos = {
  n: "11",
  id: "proximos-pasos",
  eyebrow: "11 · Próximos pasos",
  titulo: "Próximos pasos",
  intro: "En caso de avanzar, la secuencia prevista es la siguiente:",
  items: [
    "Confirmación de la propuesta y acuerdo de la fecha de la jornada.",
    "Envío del formulario de relevamiento individual a los participantes.",
    "Reunión de relevamiento con los referentes de las áreas.",
    "Devolución de la composición de los grupos y de los casos seleccionados.",
    "Envío de la agenda definitiva, con no menos de cinco días hábiles de anticipación.",
    "Realización de la jornada presencial.",
    "Entrega del material y del informe final, dentro de los diez días hábiles posteriores.",
  ],
  cierre:
    "Quedo a disposición para ampliar cualquiera de los puntos de este documento o para ajustar el alcance a lo que la empresa considere necesario.",
  contactoTitulo: "Consultas sobre la propuesta",
  contactoTexto:
    "Por cualquier aclaración sobre el alcance, las condiciones o la fecha, por la vía que les resulte más cómoda.",
  ctaWhatsapp: "Escribir por WhatsApp",
  ctaEmail: "Escribir por correo",
  firma: "Pablo Brunet",
  firmaPie: "Inteligencia Artificial aplicada a negocios",
} as const;

/* =====================================================================
   DOCUMENTO
   ===================================================================== */
export const biscayart = {
  seo: {
    title: "Propuesta para Biscayart Semillas — Programa de adopción de IA por áreas de trabajo",
    description:
      "Alcance, organización, programa y condiciones de un programa de adopción de Inteligencia Artificial por áreas de trabajo: relevamiento previo, jornada presencial y material de referencia.",
  },

  /* =====================================================================
     PORTADA
     El titular nombra el servicio; no argumenta a favor de contratarlo.
     La ficha es lo primero que se chequea en una propuesta, así que va a
     la altura del título y no al pie.
     ===================================================================== */
  hero: {
    /* Logo del cliente, arriba de todo, a modo de membrete. El archivo lo
       aporta la empresa y vive en /public/images/biscayart/.

       Va sobre una placa blanca porque el logo es azul marino y rojo, y
       sobre el fondo oscuro de la portada el isotipo desaparecería.

       Si `src` se vacía, la portada no dibuja el bloque: no queda hueco
       ni imagen rota. Las medidas son las del archivo original y están
       para reservar el espacio mientras carga. */
    logo: {
      src: "/images/biscayart/biscayart-semillas.png",
      alt: "Biscayart Semillas",
      ancho: 1024,
      alto: 231,
    },
    /* No hay rótulo sobre el título: con el logo del cliente encabezando
       la columna, un chip que repita el nombre debajo suena a etiqueta
       de más. Qué es el documento lo dice la ficha de al lado, en el
       campo Cliente, y el <title> de la pestaña. */
    titulo: "Programa de adopción de Inteligencia Artificial",
    tituloResalte: "aplicada por áreas de trabajo.",
    subtitulo:
      "Relevamiento previo, una jornada presencial de trabajo en las instalaciones de la empresa y material de referencia posterior. Este documento detalla el alcance, la organización y las condiciones del servicio.",
    enlaces: [
      { etiqueta: "Ir al alcance", id: "alcance" },
      { etiqueta: "Ir a las condiciones", id: "condiciones-economicas" },
    ],
    fichaTitulo: "Datos de la propuesta",
    fichaFilas: [
      { etiqueta: "Cliente", valor: "Biscayart Semillas", icono: "people" },
      { etiqueta: "Presentada por", valor: "Pablo Brunet", icono: "estrella" },
      { etiqueta: "Fecha de emisión", valor: "10 de agosto de 2026", icono: "calendario" },
      { etiqueta: "Referencia", valor: "PB-2026-08-BIS", icono: "documento" },
      { etiqueta: "Modalidad", valor: "Presencial, en Pergamino", icono: "location" },
      { etiqueta: "Participantes", valor: "Hasta 30 personas, en dos grupos", icono: "target" },
      { etiqueta: "Duración", valor: "Una jornada de 8 horas de trabajo", icono: "clock" },
      { etiqueta: "Validez", valor: "30 días corridos desde la emisión", icono: "shield" },
    ],
  },

  /* Rótulo del índice navegable que va debajo de la portada. */
  indiceTitulo: "Contenido de la propuesta",

  objeto,
  situacion,
  enfoque,
  alcance,
  organizacion,
  contenidos,
  programa,
  economicas,
  generales,
  complementarios,
  pasos,

  /* Orden del documento y fuente del índice. Debe coincidir con el orden
     de los componentes en la página. */
  indice: [
    objeto,
    situacion,
    enfoque,
    alcance,
    organizacion,
    contenidos,
    programa,
    economicas,
    generales,
    complementarios,
    pasos,
  ],

  /* ---- WhatsApp: mensaje propio de esta propuesta ---- */
  whatsapp: {
    mensaje: "Hola Pablo, te escribo por la propuesta para Biscayart Semillas. Quería consultarte por…",
    etiqueta: "Consultar por la propuesta",
  },
} as const;

export type Biscayart = typeof biscayart;
