/* =====================================================================
   ESTUDIO MILMAN — contenido de /cotizacion-estudio-milman
   ---------------------------------------------------------------------
   Propuesta de servicios para UN cliente concreto. Todo el texto vive
   acá; los componentes de /src/components/milman sólo lo dibujan.

   FUENTE: reunión del 14/08/2026 entre José Luis Díaz (socio del estudio)
   y Pablo Brunet. Todo lo que la propuesta afirma sobre la situación
   actual sale de esa conversación y de nada más. Lo que no se dijo ahí
   queda sujeto al relevamiento del punto 4.1: es lo que evita que el
   documento suene a diagnóstico inventado.

   ⚠️ QUÉ ES ESTA PÁGINA, Y QUÉ NO
   Es una propuesta escrita, publicada como página web en vez de como
   PDF. De ahí las dos reglas que la gobiernan y que hay que sostener si
   se agrega contenido nuevo:

   1 · EL LENGUAJE ES EL DE UNA PROPUESTA, NO EL DE UNA LANDING.
       Registro descriptivo —"el servicio comprende", "queda a cargo del
       estudio", "quedan fuera del alcance"—. Los títulos nombran lo que
       hay debajo ("Alcance del servicio"), no buscan convencer. No hay
       promesas de resultado, no hay adjetivos de venta, no hay llamados
       a la acción. Quien abre esto ya pidió la propuesta: lo que
       necesita es saber con precisión qué se contrata.

   2 · LA FORMA APROVECHA QUE ES HTML.
       Secciones con aire, índice navegable, tarjetas, calendario de
       fases y selector de áreas sin JavaScript. La lectura tiene que ser
       cómoda; lo que no puede es volverse publicitaria.

   Tratamiento: "el estudio" en las condiciones, "ustedes" sólo cuando la
   frase se dirige al destinatario. El nombre propio queda en la ficha de
   la portada, el <title> y el asunto del correo.

   Numeración: cada sección lleva su número (01 a 10) en el rótulo
   superior, y los subpuntos (4.1, 9.2) se citan en el texto de otras
   secciones. El índice se arma con el array `indice` del final. Si se
   agrega, se saca o se reordena una sección, hay que tocar el array, el
   `n` de la sección y el orden de los componentes en la página.

   ---------------------------------------------------------------------
   ⚠️ LO QUE HAY QUE DEFINIR ANTES DE ENVIAR

   · `economicas.importe` está VACÍO y la banda dibuja "A definir". En la
     reunión no se habló de valores: no hay ningún número que se pueda
     poner sin inventarlo. Cuando Pablo lo cierre, se completa acá y
     aparece solo. Mismo criterio que se usó en la propuesta de Royjo.

   · `economicas.detalles` — la FORMA DE PAGO (dos pagos, uno a la
     confirmación y otro al inicio del segundo mes) y la VALIDEZ de 30
     días son REDACCIONES PROPUESTAS, no confirmadas por Pablo. Si el
     esquema es otro, se corrige acá.

   · MODALIDAD REMOTA. La propuesta está escrita sobre trabajo remoto
     —clínicas semanales en vivo y portal asincrónico—, que es como Pablo
     describió el programa en la reunión. No se habló de instancias
     presenciales ni de viáticos: por eso no hay una línea de viáticos
     como en Biscayart, y las jornadas presenciales figuran en el punto 8
     como algo que se cotiza aparte. Si va a haber presencialidad, hay
     que revisar la ficha de la portada, el punto 4 y el punto 8.

   · La CANTIDAD DE CLÍNICAS (ocho, de 90 minutos) y la de REUNIONES DE
     DIRECCIÓN (tres) son la traducción a números de lo que Pablo
     describió como "reuniones semanales" en un programa de 60 días.
     Confirmar la cadencia antes de enviar.

   ---------------------------------------------------------------------
   ⚠️ EL PORTAL SÍ FORMA PARTE DEL ALCANCE
   A diferencia de la propuesta de Biscayart —donde el portal se declara
   como servicio NO comprendido—, acá el Portal INTEGRA es el punto 4.2 y
   está adentro del programa. Es lo que Pablo mostró en pantalla durante
   la reunión y lo que sostiene el trabajo entre clínica y clínica. Si se
   copia texto de biscayart.ts, revisar que no venga con esa aclaración.

   ⚠️ LO QUE NO CONVIENE RESOLVER CON IA TAMBIÉN SE DICE
   José Luis planteó tres veces la misma duda: buena parte de sus
   circuitos ya está automatizada con los sistemas actuales y no ve dónde
   entra la IA. La propuesta le da la razón por escrito —en el punto 2,
   en el 3 y en la salvedad del punto 7— en lugar de esquivarlo. Esa
   posición no se ablanda: es la que separa el programa de una
   capacitación que promete que todo mejora con IA.

   ⚠️ NINGÚN ÁREA ES "LA PRINCIPAL"
   Las cinco áreas del punto 7 se presentan con el mismo peso y con la
   misma cantidad de aplicaciones previstas. La dirección tiene su propio
   panel porque sus tareas son distintas, nunca porque importe más.

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
    "El presente documento detalla el alcance, la organización y las condiciones de un programa de adopción de Inteligencia Artificial destinado a la totalidad del personal del estudio, con una duración de sesenta días corridos.",
    "El programa se desarrolla bajo el Método INTEGRA y comprende cuatro instancias que corren en paralelo: un diagnóstico inicial, una ruta de formación asincrónica, un ciclo de encuentros semanales de trabajo en vivo y el acompañamiento a la dirección en las decisiones que la adopción requiere.",
  ],
  finalidadTitulo: "Finalidad",
  finalidad:
    "Que el estudio termine el programa con tres cosas concretas: un criterio propio para decidir qué tareas conviene resolver con Inteligencia Artificial y cuáles no; un grupo acotado de procesos del estudio ya resueltos con ese criterio y funcionando en el trabajo diario; y una forma de trabajo instalada para aplicar ese mismo criterio a los procesos que sigan, sin depender de asistencia externa.",
} as const;

/* ---------------------------------------------------------------------
   02 · SITUACIÓN ACTUAL
   Lo que se afirma acá sale de la reunión del 14/08 y nada más. Todo lo
   demás queda sujeto al relevamiento del punto 4.1.

   El punto sobre los circuitos ya automatizados NO es un detalle: es la
   objeción que José Luis planteó tres veces. Va adentro de la lista y
   además tiene su propio bloque debajo.
   ------------------------------------------------------------------- */
const situacion = {
  n: "02",
  id: "situacion",
  eyebrow: "02 · Situación actual",
  titulo: "Situación actual y consideraciones previas",
  intro:
    "De la conversación mantenida el 14 de agosto de 2026 surgen las siguientes consideraciones:",
  puntos: [
    "El estudio reúne alrededor de trece personas, distribuidas entre las áreas contable, impositiva, laboral y administrativa, además de la dirección.",
    "Existe uso de Inteligencia Artificial, pero individual y discrecional: cada persona incorpora la herramienta que le resulta más cómoda, sin que haya un proceso estandarizado ni un criterio común del estudio.",
    "Los usos identificados hasta ahora se concentran en el ordenamiento de extractos bancarios, la redacción de comunicaciones del área laboral y la elaboración de informes.",
    "Buena parte de los circuitos operativos ya fue automatizada con los sistemas actuales —exportaciones, plantillas de cálculo, liquidación de impuestos y sueldos, descarga de comprobantes—. El punto de partida no es una operación manual.",
    "No hay trazabilidad de qué se resuelve hoy con asistencia de Inteligencia Artificial, quién lo hace, con qué resultado ni con qué resguardo sobre la información de los clientes.",
    "La dirección identifica la falta de un punto de partida —por dónde empezar y sobre qué procesos— como el obstáculo principal, por encima del acceso a las herramientas o de la oferta de formación disponible.",
    "Está prevista para los próximos días la incorporación de la herramienta de consulta normativa de Errepar, sobre la que el estudio ya tiene suscripción.",
    "Existe experiencia previa de trabajo conjunto en la sistematización de las planillas de gestión del estudio, que continúan en uso.",
  ],
  cuentaTitulo: "Sobre los circuitos que ya están automatizados",
  cuentaTexto:
    "Lo que la dirección señaló durante la reunión —que buena parte de los circuitos operativos ya está automatizada— es correcto, y ordena el trabajo antes de empezar: una parte de lo que hoy funciona no necesita Inteligencia Artificial y no se toca. Una planilla con buenas fórmulas seguirá siendo la mejor forma de calcular, y un sistema que liquida sueldos bien parametrizado seguirá liquidándolos. Lo que el programa busca no es reemplazar esos circuitos, sino identificar dónde queda trabajo humano repetitivo alrededor de ellos —cargar, controlar, cruzar, redactar, explicar— y qué parte de ese trabajo puede resolverse de otra manera. Esa distinción se establece en el punto 4.3 y se aplica caso por caso.",
  cierre:
    "Estas consideraciones son preliminares y provienen de una única conversación. Se verifican durante el diagnóstico descrito en el punto 4.1, y el detalle definitivo del trabajo se ajusta a partir de sus resultados.",
} as const;

/* ---------------------------------------------------------------------
   03 · ENFOQUE
   Va sobre fondo oscuro. Los seis criterios llevan el mismo peso visual
   y sus títulos son etiquetas, no argumentos.
   ------------------------------------------------------------------- */
const enfoque = {
  n: "03",
  id: "enfoque",
  eyebrow: "03 · Enfoque",
  titulo: "Enfoque de trabajo",
  parrafos: [
    "El programa no es una capacitación extendida. Una capacitación entrega herramientas y termina; lo que queda después depende de la voluntad de cada participante, y en un grupo con niveles dispares eso produce exactamente la situación descrita en el punto 2: algunos avanzan solos, la mayoría no incorpora nada y el estudio no puede sostener ninguna práctica como propia.",
    "Lo que se despliega acá es un método de adopción: un criterio para decidir sobre qué tareas conviene trabajar, un ciclo corto para probarlas sobre trabajo real y una forma de registrar lo que funcionó, de manera que el estudio pueda repetir el ciclo cuando el programa termine.",
  ],
  criteriosTitulo: "Criterios que ordenan el trabajo",
  criterios: [
    {
      numero: "01",
      icono: "documento",
      titulo: "Sobre tareas propias",
      texto:
        "Se trabaja sobre las tareas que el estudio ejecuta todas las semanas, con sus documentos y sus plazos, y no sobre ejercicios de demostración.",
    },
    {
      numero: "02",
      icono: "target",
      titulo: "Primero el criterio",
      texto:
        "Antes de resolver una tarea se establece si conviene resolverla. Las oportunidades se puntúan por impacto, esfuerzo, riesgo y capacidad disponible, y se ordenan con esa vara.",
    },
    {
      numero: "03",
      icono: "cohete",
      titulo: "Resultados tempranos",
      texto:
        "El ciclo empieza por las tareas de alto retorno y baja dificultad. Un resultado visible en las primeras semanas es lo que sostiene la participación durante las restantes.",
    },
    {
      numero: "04",
      icono: "people",
      titulo: "Dos niveles a la vez",
      texto:
        "La dirección y el equipo trabajan en instancias distintas. Las decisiones de inversión, de resguardo de información y de nivel de desvío aceptable no se resuelven en la misma sala que las tareas operativas.",
    },
    {
      numero: "05",
      icono: "lista",
      titulo: "Lo que queda documentado",
      texto:
        "Cada proceso resuelto se registra punta a punta, de modo que su ejecución no dependa de quién lo construyó ni de que esa persona siga en el estudio.",
    },
    {
      numero: "06",
      icono: "shield",
      titulo: "Sin dependencia externa",
      texto:
        "El programa termina. Lo que tiene que quedar funcionando es el ciclo interno: quién detecta oportunidades, quién prioriza, con qué frecuencia se revisa y dónde queda escrito lo que funcionó.",
    },
  ],
} as const;

/* ---------------------------------------------------------------------
   04 · ALCANCE
   La sección que define qué se contrata. Los siete subpuntos —4.1 a
   4.7— se citan desde el punto 2, el 5, el 6, el 8, el 9 y el 11: su
   numeración viene de los datos y tiene que ser estable.

   El 4.2 es el portal. Va con captura propia, dibujada por el
   componente después de la lista de etapas: es la única imagen del
   documento y lo que Pablo mostró en pantalla durante la reunión.
   ------------------------------------------------------------------- */
const alcance = {
  n: "04",
  id: "alcance",
  eyebrow: "04 · Alcance",
  titulo: "Alcance del servicio",
  intro:
    "El servicio comprende las siete instancias que se detallan a continuación. Todas están incluidas en el importe indicado en el punto 8. Las instancias no son consecutivas: la formación, las clínicas y el acompañamiento a la dirección corren en paralelo durante los sesenta días, según el calendario del punto 5.",
  etapas: [
    {
      n: "4.1",
      icono: "lupa",
      titulo: "Diagnóstico y relevamiento inicial",
      texto:
        "Primera instancia del programa, destinada a establecer el punto de partida antes de proponer cualquier cambio. Se desarrolla de manera remota durante las dos primeras semanas y comprende:",
      items: [
        "Un formulario individual, breve, para la totalidad del personal, que releva rol, responsabilidades, herramientas de uso habitual, nivel de experiencia con Inteligencia Artificial, tareas repetitivas y dificultades percibidas.",
        "Una reunión de trabajo con la dirección, de hasta noventa minutos, para relevar procesos, circuitos de información, sistemas en uso y prioridades del estudio.",
        "El inventario de herramientas y suscripciones vigentes, con el detalle de quién las usa efectivamente.",
        "La identificación de los agentes de cambio: las personas que hoy tienen mayor manejo de estas herramientas y que actúan como referentes internos durante el programa.",
        "La devolución de un informe de situación con el nivel de partida por persona y por área, y con las primeras oportunidades registradas.",
      ],
    },
    {
      n: "4.2",
      icono: "play",
      titulo: "Portal de formación y nivelación del equipo",
      texto:
        "Cada participante recibe un usuario propio en el portal privado de formación, con acceso durante toda la duración del programa. El portal sostiene el trabajo entre encuentro y encuentro y comprende:",
      items: [
        "Contenidos en video organizados por nivel y por herramienta, con registro individual de avance.",
        "Una ruta de formación asignada según el rol de cada persona, y no un catálogo igual para todos.",
        "Guías, marcos de trabajo y plantillas descargables.",
        "Contenidos sobre la metodología de adopción, además de los técnicos: cómo se detecta una oportunidad, cómo se acota una prueba y cómo se verifica un resultado.",
      ],
      cierre:
        "La nivelación no busca que todos alcancen el mismo nivel, sino un piso común que permita que las discusiones del programa se den sobre la misma base. La dedicación prevista es de aproximadamente una hora semanal por persona.",
    },
    {
      n: "4.3",
      icono: "lista",
      titulo: "Tablero de Oportunidades y matriz de priorización",
      texto:
        "Instancia en la que el estudio deja de hablar de «usar Inteligencia Artificial» y empieza a hablar de tareas concretas. Comprende:",
      items: [
        "El desgranado de los procesos de cada área en tareas y subtareas, a partir de lo relevado en el punto 4.1.",
        "La puntuación de cada tarea según impacto en el negocio, esfuerzo de implementación, riesgo asociado y capacidad disponible.",
        "La ubicación de cada tarea en una matriz de oportunidad, que separa lo fácilmente resoluble y de alto retorno de lo que conviene postergar o directamente no hacer.",
        "La conformación del Tablero de Oportunidades, con responsable asignado por cada una y con registro explícito de lo que no se aborda en este ciclo.",
      ],
      cierre:
        "El tablero queda en poder del estudio y es la herramienta que permite seguir priorizando después de terminado el programa. Es también el registro de trazabilidad que hoy no existe.",
    },
    {
      n: "4.4",
      icono: "mic",
      titulo: "Clínicas semanales de trabajo en vivo",
      texto:
        "Ocho encuentros remotos, de noventa minutos cada uno, con el equipo del estudio. No son clases: son sesiones de resolución asistida sobre tareas reales aportadas por los participantes. Cada encuentro comprende:",
      items: [
        "La revisión del foco de la semana y del estado de las tareas en curso.",
        "La resolución en pantalla de una o más tareas propuestas por los participantes, con el grupo presente.",
        "El registro escrito de las instrucciones y los pasos construidos durante la sesión.",
        "El acuerdo sobre qué se prueba durante la semana siguiente y quién lo hace.",
      ],
      cierre:
        "Las sesiones se graban y quedan disponibles en el portal para quienes no hayan podido participar en vivo.",
    },
    {
      n: "4.5",
      icono: "play",
      titulo: "Pruebas aplicadas sobre trabajo real",
      texto:
        "Cada oportunidad priorizada se convierte en una prueba acotada que ejecuta el propio equipo del estudio, con acompañamiento. Cada prueba se define con:",
      items: [
        "El problema que resuelve y la mejora esperada, expresada en términos verificables.",
        "Un responsable con nombre y un alcance deliberadamente chico.",
        "Los riesgos identificados y los controles humanos que se mantienen sobre el resultado.",
        "La evidencia que se va a observar y el plazo para observarla.",
        "Una decisión final registrada: adoptar, iterar, pausar, descartar o extender a otras áreas.",
      ],
      cierre:
        "Las pruebas se ejecutan sobre tareas del estudio, no sobre casos de ejemplo. El desarrollo de automatizaciones a medida no forma parte de esta instancia.",
    },
    {
      n: "4.6",
      icono: "brujula",
      titulo: "Acompañamiento a la dirección",
      texto:
        "Tres reuniones específicas con la dirección —al inicio, a la mitad y al cierre del programa—, destinadas a las decisiones que el equipo no puede tomar por su cuenta:",
      items: [
        "El esquema de licenciamiento y la decisión de inversión en herramientas, con sus implicancias de gobierno y de resguardo de la información de los clientes.",
        "El nivel de desvío aceptable: qué se puede resolver con asistencia de Inteligencia Artificial sin revisión, qué requiere control humano y qué no se delega.",
        "El criterio sobre qué información de clientes puede volcarse en estas herramientas y bajo qué condiciones.",
        "El seguimiento del avance, la resolución de bloqueos y la definición de las prioridades del ciclo siguiente.",
      ],
      cierre:
        "La dirección participa además de las instancias que considere pertinentes del punto 4.4, aunque su presencia en todas no es un requisito del programa.",
    },
    {
      n: "4.7",
      icono: "documento",
      titulo: "Documentación y cierre",
      texto:
        "Dentro de los diez días hábiles posteriores a la finalización del programa se entrega, en formato digital:",
      items: [
        "El Tablero de Oportunidades completo, con el estado y la decisión de cada una.",
        "La documentación de los procesos resueltos, escrita para que pueda ejecutarlos cualquier persona del estudio.",
        "La biblioteca de instrucciones construida durante las clínicas, organizada por área.",
        "El documento de criterios internos de uso: qué información puede utilizarse, qué controles se mantienen y qué queda expresamente fuera.",
        "El informe final, con el estado de situación al cierre comparado contra el del punto 4.1, y el plan sugerido para el ciclo siguiente.",
      ],
    },
  ],
  /* La única imagen del documento. Vive en /public/images/integra/ y mide
     1358×594. Si se reemplaza por una de otra proporción, actualizar
     `width`/`height` en MilmanAlcance.astro. */
  portalTitulo: "El portal de formación",
  portalTexto:
    "Es el mismo portal que se mostró durante la reunión. Cada participante entra con su usuario, cursa los contenidos que le corresponden según su rol y conserva el registro de su avance. La dirección puede consultar ese avance en cualquier momento.",
  captura: "/images/integra/portal-integra.png",
  capturaAlt:
    "Portal de formación: panel de un participante, con el curso en progreso, su barra de avance y el catálogo de cursos organizados por nivel",
  capturaPie: "Vista del portal de formación para un participante.",
} as const;

/* ---------------------------------------------------------------------
   05 · CALENDARIO DE LAS SIETE FASES
   Las siete fases del Método INTEGRA, con los días de cada una. La fase
   G va marcada como transversal: no es una semana del calendario, corre
   del día 1 al 60, y el componente la dibuja distinto.

   Si se cambia la duración del programa hay que revisar los rangos de
   días de las siete, la ficha de la portada y el punto 8.
   ------------------------------------------------------------------- */
const fases = {
  n: "05",
  id: "calendario",
  eyebrow: "05 · Calendario",
  titulo: "Las siete fases en sesenta días",
  intro:
    "El programa se ordena en siete fases. Cada una responde una pregunta concreta y deja un resultado verificable. Los plazos son los previstos y se ajustan a la operación del estudio durante el diagnóstico del punto 4.1.",
  listado: [
    {
      letra: "I",
      nombre: "Identificar",
      icono: "lupa",
      dias: "Días 1 a 15",
      pregunta: "¿De dónde partimos y dónde están las oportunidades que valen la pena?",
      texto:
        "Se designan los roles, se releva qué sabe hoy cada persona y se inventaría qué herramientas se pagan y quién las usa efectivamente. Con eso a la vista se registran las primeras oportunidades, expresadas como problemas del estudio y no como herramientas a incorporar.",
      entregable: "Informe de situación por persona y por área",
      transversal: false,
    },
    {
      letra: "N",
      nombre: "Negociar prioridades",
      icono: "lista",
      dias: "Días 15 a 30",
      pregunta: "¿Qué va primero, qué queda para después y qué no se hace en este ciclo?",
      texto:
        "Cada oportunidad se puntúa con la misma vara —impacto, esfuerzo, riesgo y capacidad— y entra al Tablero de Oportunidades con un responsable asignado. Priorizar incluye acordar por escrito qué no se aborda en estos sesenta días.",
      entregable: "Tablero de Oportunidades priorizado",
      transversal: false,
    },
    {
      letra: "T",
      nombre: "Transformar",
      icono: "intercambio",
      dias: "Días 15 a 30",
      pregunta: "¿Cómo convertimos una oportunidad en una prueba chica y segura?",
      texto:
        "Cada oportunidad priorizada se convierte en una prueba aplicada: problema, mejora esperada, responsable, alcance acotado, enfoque o herramienta, riesgos, controles humanos, evidencia a observar y decisión final.",
      entregable: "Pruebas definidas y listas para ejecutar",
      transversal: false,
    },
    {
      letra: "E",
      nombre: "Ejecutar",
      icono: "play",
      dias: "Días 30 a 45",
      pregunta: "¿Qué pasa cuando el equipo prueba el enfoque sobre trabajo real?",
      texto:
        "Las áreas ejecutan sus pruebas sobre tareas y procesos reales del estudio, con alcance chico, controles humanos y registro de lo que se observa. Ejecuta el equipo del estudio; el acompañamiento se da en las clínicas semanales.",
      entregable: "Pruebas corriendo, con evidencia registrada",
      transversal: false,
    },
    {
      letra: "G",
      nombre: "Gestionar",
      icono: "growth",
      dias: "Del día 1 al 60",
      pregunta: "¿Cómo se sostiene el proceso cuando la operación compite por atención?",
      texto:
        "Formación según rol, ritual semanal, seguimiento del avance y resolución de bloqueos. Es la fase que evita que la iniciativa se apague en la primera semana complicada: por eso no ocupa un tramo del calendario, corre todo el tiempo.",
      entregable: "Ritual semanal en funcionamiento",
      transversal: true,
    },
    {
      letra: "R",
      nombre: "Rentabilizar",
      icono: "barras",
      dias: "Días 45 a 60",
      pregunta: "¿Qué produjo cada prueba y qué decisión conviene tomar?",
      texto:
        "Cada prueba termina en una decisión fundada —adoptar, iterar, pausar, descartar o extender— tomada con lo que se observó y no con lo que se esperaba. La decisión queda registrada junto con su motivo.",
      entregable: "Una decisión registrada por prueba",
      transversal: false,
    },
    {
      letra: "A",
      nombre: "Acelerar",
      icono: "cohete",
      dias: "Días 45 a 60",
      pregunta: "¿Cómo repite el estudio el ciclo con más autonomía y menos fricción?",
      texto:
        "Lo aprendido se convierte en forma de trabajo: quién registra las oportunidades nuevas, quién prioriza, qué encuentro interno queda corriendo y dónde vive la documentación de lo que funcionó y de lo que no.",
      entregable: "Ciclo interno documentado y en marcha",
      transversal: false,
    },
  ],
  /* La consideración de calendario sale textual de la reunión: el estudio
     entra en temporada alta entre febrero y julio. */
  notaTitulo: "Sobre el momento de inicio",
  notaTexto:
    "La carga operativa del estudio se concentra entre febrero y julio. Un programa de sesenta días iniciado en el segundo semestre se desarrolla íntegramente fuera de ese período, y llega a la temporada siguiente con los procesos ya resueltos y el ciclo interno funcionando. La fecha de inicio se acuerda con la confirmación de la propuesta.",
} as const;

/* ---------------------------------------------------------------------
   06 · PARTICIPANTES Y DEDICACIÓN
   Los dos grupos llevan exactamente los mismos campos: cualquier
   asimetría en el detalle se leería como que uno importa más.

   La nota sobre la jornada laboral no es un formalismo: es una
   condición que planteó la dirección durante la reunión, y va destacada.
   ------------------------------------------------------------------- */
const participantes = {
  n: "06",
  id: "participantes",
  eyebrow: "06 · Participantes",
  titulo: "Participantes y dedicación prevista",
  intro:
    "El programa alcanza a la totalidad del personal del estudio, organizado en dos instancias con dedicación y contenidos distintos. La composición definitiva se establece a partir del diagnóstico del punto 4.1.",
  grupos: [
    {
      letra: "A",
      icono: "brujula",
      etiqueta: "Instancia de dirección",
      nombre: "Dirección del estudio",
      duracion: "3 reuniones de 90 min",
      texto:
        "Destinada a las decisiones que la adopción requiere y que no se resuelven en la instancia operativa: inversión en herramientas, resguardo de la información de los clientes, nivel de control humano exigido y prioridades del ciclo siguiente. Es también el espacio donde se sostiene la iniciativa cuando la operación compite por atención.",
    },
    {
      letra: "B",
      icono: "people",
      etiqueta: "Instancia de equipo",
      nombre: "Equipo del estudio",
      duracion: "1 encuentro semanal de 90 min",
      texto:
        "Destinada a las áreas contable, impositiva, laboral y administrativa. Comprende las ocho clínicas de trabajo en vivo del punto 4.4, la ruta de formación del portal y la ejecución de las pruebas aplicadas del punto 4.5 sobre las tareas propias de cada función.",
    },
  ],
  cierre: {
    icono: "estrella",
    etiqueta: "Rol transversal",
    nombre: "Agentes de cambio",
    duracion: "Se identifican en 4.1",
    texto:
      "Las personas con mayor manejo actual de estas herramientas asumen un rol de referencia interna durante el programa: acompañan a quienes están empezando y sostienen la práctica en su área entre encuentro y encuentro. No es un rol jerárquico ni implica dedicación adicional a la prevista.",
  },
  notas: [
    "La dedicación indicada está prevista para desarrollarse dentro de la jornada laboral. El programa no supone horas de estudio fuera del horario de trabajo, y el volumen de contenido está deliberadamente acotado a lo que se aplica en el ciclo.",
    "Se releva de manera individual a la totalidad del personal, con independencia de la instancia en la que participe y de su nivel de partida.",
    "La participación en las clínicas no es excluyente: las sesiones quedan grabadas en el portal para quienes no puedan asistir en vivo.",
  ],
} as const;

/* ---------------------------------------------------------------------
   07 · APLICACIONES PREVISTAS POR ÁREA
   El selector usa radios + `:has()`, sin JavaScript. Las claves están
   nombradas UNA POR UNA en el CSS del componente: si se agrega o se
   renombra un área, hay que tocar también esa regla.

   Las cinco listas tienen ocho aplicaciones cada una, a propósito: los
   cinco paneles se apilan en la misma celda y ninguna área tiene que
   parecer más desarrollada que otra.

   ⚠️ LA SALVEDAD DEL FINAL NO SE SACA. Es la contracara honesta de esta
   sección: buena parte de lo que el estudio hace hoy no necesita
   Inteligencia Artificial, y decirlo acá —al lado del listado de
   aplicaciones— es lo que evita que la sección se lea como una promesa.
   ------------------------------------------------------------------- */
const aplicaciones = {
  n: "07",
  id: "aplicaciones",
  eyebrow: "07 · Aplicaciones",
  titulo: "Aplicaciones previstas por área",
  intro:
    "El detalle siguiente responde la pregunta que ordenó la conversación previa: en qué punto del trabajo diario de un estudio contable interviene la Inteligencia Artificial. Es un punto de partida para la discusión, no un plan de trabajo: la selección definitiva sale del diagnóstico del punto 4.1 y de la priorización del punto 4.3.",
  comunesTitulo: "Contenidos comunes a todas las áreas",
  comunesTexto:
    "La ruta de formación del portal abre con un tramo idéntico para todo el estudio, previo al trabajo por área:",
  comunes: [
    "Alcances y límites actuales de la Inteligencia Artificial generativa",
    "Formulación de instrucciones: contexto, objetivo, restricciones y formato de salida",
    "Errores frecuentes y criterios de verificación de resultados",
    "Tratamiento de la información de clientes: qué puede utilizarse y qué no",
    "Diferencias entre trabajar con cuentas individuales y con licencias corporativas",
    "Cómo se detecta una tarea con potencial de ser resuelta de otra manera",
  ],
  listado: [
    {
      clave: "contable",
      icono: "data",
      nombre: "Contabilidad y balances",
      corto: "Contable",
      aplicaciones: [
        "Ordenamiento y normalización de extractos bancarios de origen diverso",
        "Conciliaciones y detección de partidas sin correlato",
        "Revisión de imputaciones e identificación de inconsistencias en mayores",
        "Lectura y síntesis de documentación de respaldo extensa",
        "Comparación entre períodos y detección de variaciones significativas",
        "Redacción de notas y anexos a los estados contables",
        "Preparación de papeles de trabajo de elaboración periódica",
        "Elaboración del informe de análisis del balance en lenguaje llano",
      ],
    },
    {
      clave: "impositiva",
      icono: "documento",
      nombre: "Impositiva",
      corto: "Impositiva",
      aplicaciones: [
        "Consulta asistida de normativa sobre fuentes propias del estudio",
        "Control cruzado entre comprobantes, libros y declaraciones antes de presentar",
        "Detección de diferencias y de datos faltantes en las liquidaciones",
        "Síntesis de novedades normativas y de su impacto por tipo de cliente",
        "Redacción de respuestas a requerimientos y de descargos",
        "Armado de resúmenes de vencimientos y avisos a clientes",
        "Verificación de consistencia en las planillas de liquidación",
        "Documentación del procedimiento completo de cada impuesto",
      ],
    },
    {
      clave: "laboral",
      icono: "people",
      nombre: "Laboral y sueldos",
      corto: "Laboral",
      aplicaciones: [
        "Redacción de telegramas, intimaciones y comunicaciones formales",
        "Consulta asistida de convenios, escalas y actualizaciones aplicables",
        "Control de novedades antes de la carga en el sistema de liquidación",
        "Revisión de consistencia entre novedades, recibos y libro sueldo digital",
        "Redacción de contratos y de documentación del legajo",
        "Respuestas a las consultas frecuentes que hoy interrumpen al área",
        "Síntesis de actualizaciones de convenio por cliente",
        "Documentación del circuito de liquidación punta a punta",
      ],
    },
    {
      clave: "administracion",
      icono: "flow",
      nombre: "Administración y facturación",
      corto: "Administración",
      aplicaciones: [
        "Ordenamiento y control de comprobantes recibidos",
        "Preparación y verificación de la facturación del estudio",
        "Redacción y seguimiento de las comunicaciones con clientes",
        "Armado de reportes internos de periodicidad fija",
        "Sistematización de las respuestas a consultas frecuentes",
        "Seguimiento de cobranzas y estado de cuentas",
        "Organización de la documentación digital del estudio",
        "Preparación de instructivos internos de uso repetido",
      ],
    },
    {
      clave: "direccion",
      icono: "brujula",
      nombre: "Dirección y clientes",
      corto: "Dirección",
      aplicaciones: [
        "Análisis de información de gestión para la toma de decisiones",
        "Preparación de reuniones con clientes sobre su propia información",
        "Informes de análisis como servicio adicional al cliente",
        "Redacción de propuestas, presupuestos y comunicaciones institucionales",
        "Elaboración de guías y materiales de consulta para clientes",
        "Seguimiento de la carga de trabajo y de la capacidad del equipo",
        "Documentación de los procesos internos del estudio",
        "Evaluación de herramientas nuevas antes de incorporarlas",
      ],
    },
  ],
  salvedadTitulo: "Qué no se propone resolver con Inteligencia Artificial",
  salvedadTexto:
    "Una parte del trabajo del estudio ya está resuelta y no requiere ningún cambio: el cálculo que hace una planilla bien construida, la liquidación que produce un sistema correctamente parametrizado, la presentación que exige el aplicativo de cada organismo. En esos casos la Inteligencia Artificial no agrega nada y su incorporación sólo sumaría un punto de falla. Las aplicaciones listadas se concentran en el trabajo humano que ocurre alrededor de esos circuitos —cargar, controlar, cruzar, redactar, explicar y documentar—, que es donde hoy se consume el tiempo. La distinción se aplica caso por caso durante la priorización del punto 4.3, y una conclusión válida de esa priorización es que una tarea determinada se deje como está.",
} as const;

/* ---------------------------------------------------------------------
   08 · CONDICIONES ECONÓMICAS
   ⚠️ `importe` está vacío a propósito: en la reunión no se habló de
   valores. La banda dibuja "A definir" con el mismo peso visual que
   tendría el número, así se ve que el campo existe y está pendiente.

   ⚠️ La forma de pago y la validez de 30 días son redacciones
   propuestas: confirmar con Pablo antes de enviar.
   ------------------------------------------------------------------- */
const economicas = {
  n: "08",
  id: "condiciones-economicas",
  eyebrow: "08 · Condiciones económicas",
  titulo: "Condiciones económicas",
  conceptoTitulo: "Concepto",
  concepto:
    "Programa completo de sesenta días: diagnóstico, portal de formación para la totalidad del personal, tablero de priorización, ocho clínicas de trabajo en vivo, ejecución acompañada de las pruebas, acompañamiento a la dirección y documentación de cierre.",
  incluye: [
    "Diagnóstico y relevamiento inicial (4.1)",
    "Portal de formación, con usuario por participante (4.2)",
    "Tablero de Oportunidades y matriz de priorización (4.3)",
    "Ocho clínicas semanales de trabajo en vivo (4.4)",
    "Acompañamiento en la ejecución de las pruebas (4.5)",
    "Tres reuniones de dirección (4.6)",
    "Documentación, biblioteca de instrucciones e informe final (4.7)",
  ],
  importeTitulo: "Honorarios",
  /* ⚠️ VACÍO A PROPÓSITO. Ver el encabezado del archivo. */
  importe: "",
  moneda: "ARS",
  monedaNota: "Por el programa de trabajo consensuado",
  pendiente: "A definir",
  detalles: [
    {
      icono: "chip",
      titulo: "Licencias y suscripciones",
      texto:
        "No están incluidas en el importe indicado. El programa se desarrolla sobre las herramientas con las que el estudio ya cuenta, y durante la instancia del punto 4.6 se revisan las alternativas de licenciamiento corporativo —que a la fecha rondan los 25 dólares por usuario y por mes— junto con sus implicancias de gobierno y de resguardo de la información. La decisión, la contratación y el pago quedan a cargo del estudio.",
    },
    {
      icono: "documento",
      titulo: "Forma de pago",
      texto:
        "En dos pagos iguales: el primero a la confirmación de la propuesta, en concepto de reserva de la fecha de inicio, y el segundo al comenzar el segundo mes del programa.",
    },
    {
      icono: "clock",
      titulo: "Validez",
      texto:
        "Los valores indicados mantienen su vigencia durante treinta días corridos desde la fecha de emisión de esta propuesta.",
    },
    {
      icono: "calendario",
      titulo: "Duración y ajustes de alcance",
      texto:
        "El programa está previsto en sesenta días, que es la duración con la que el método está diseñado. Admite versiones de treinta días —con menor cantidad de procesos abordados— y extensiones de noventa días o más. Cualquiera de las dos variantes modifica el importe y se cotiza sobre el alcance que se acuerde.",
    },
    {
      icono: "location",
      titulo: "Modalidad",
      texto:
        "El programa se desarrolla íntegramente de manera remota: las clínicas semanales son en vivo y el portal de formación queda disponible de manera asincrónica. Si ambas partes lo acuerdan previamente, puede incorporarse alguna instancia presencial; en ese caso se cotiza por separado, con sus propios viáticos y sobre la base de la agenda que se convenga.",
    },
    {
      icono: "people",
      titulo: "Cantidad de participantes",
      texto:
        "El importe corresponde al personal relevado en el punto 2. Las altas posteriores al inicio del programa se incorporan al portal sin costo adicional durante los sesenta días; una variación significativa en la cantidad de participantes se revisa antes del comienzo.",
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
      titulo: "Requisitos a cargo del estudio",
      texto: "Para el desarrollo del programa, el estudio provee:",
      items: [
        "La designación de un responsable interno del programa, con capacidad de decisión sobre la agenda del equipo.",
        "La respuesta del relevamiento individual completo dentro de los diez días corridos posteriores a su envío.",
        "La disponibilidad del personal para las ocho clínicas semanales, dentro de la jornada laboral.",
        "Conexión a internet estable y equipamiento en condiciones de participar de sesiones remotas con pantalla compartida.",
        "Acceso operativo a las herramientas de Inteligencia Artificial que se utilicen durante el programa.",
        "La información de procesos y circuitos que el diagnóstico requiera, con el nivel de detalle que el estudio considere apropiado.",
        "La decisión de la dirección sobre los criterios de uso de información de clientes, en el marco del punto 4.6.",
      ],
    },
    {
      n: "9.2",
      icono: "shield",
      titulo: "Prestaciones no comprendidas",
      texto: "Quedan expresamente fuera del alcance de esta propuesta:",
      items: [
        "La contratación, el pago y la configuración de licencias, suscripciones o cuentas de las herramientas que se utilicen.",
        "El desarrollo o la implementación de automatizaciones, asistentes, integraciones o soluciones de software a medida.",
        "Tareas de infraestructura, auditoría de sistemas, migración o normalización de datos.",
        "La parametrización, la modificación o el soporte de los sistemas de gestión que el estudio utiliza.",
        "El asesoramiento legal, contable, impositivo o laboral, que es materia del propio estudio.",
        "La ejecución de las tareas operativas del estudio: el programa acompaña, no reemplaza al equipo en su trabajo.",
        "Instancias presenciales, que se cotizan por separado según el punto 8.",
        "Acompañamiento, soporte o acceso al portal con posterioridad a los sesenta días del programa.",
      ],
    },
    {
      n: "9.3",
      icono: "calendario",
      titulo: "Reprogramación y continuidad",
      texto: "",
      items: [
        "La fecha de inicio queda reservada con la confirmación de la propuesta.",
        "Cada clínica semanal puede reprogramarse dentro de la misma semana con una anticipación no menor a veinticuatro horas, sujeta a disponibilidad de agenda.",
        "Las clínicas no realizadas por causas atribuibles al estudio se consideran cumplidas a los efectos del programa; su contenido queda disponible en el portal.",
        "Una interrupción del programa por decisión del estudio no genera reintegro de los importes ya abonados, y el acceso al portal se mantiene hasta completar los sesenta días.",
      ],
    },
    {
      n: "9.4",
      icono: "candado",
      titulo: "Confidencialidad",
      texto:
        "La información del estudio y de sus clientes a la que se acceda durante el diagnóstico y el desarrollo del programa recibe tratamiento confidencial y se utiliza exclusivamente para la ejecución de este trabajo. Existe disponibilidad para suscribir el acuerdo de confidencialidad que el estudio disponga, y se entiende que el secreto profesional que rige la actividad alcanza a toda la información involucrada.",
      items: [],
    },
    {
      n: "9.5",
      icono: "lupa",
      titulo: "Alcance de los resultados",
      texto:
        "Las herramientas de Inteligencia Artificial pueden producir resultados incorrectos o incompletos. Su verificación queda a cargo de los profesionales responsables de cada área, y el trabajo desarrollado no sustituye ni condiciona el criterio profesional que cada materia requiere. Durante el programa no se incorpora a estas herramientas información de clientes sin el acuerdo previo de la dirección sobre su tratamiento, según el punto 4.6.",
      items: [],
    },
    {
      n: "9.6",
      icono: "lista",
      titulo: "Material y acceso al portal",
      texto:
        "Los accesos al portal son individuales e intransferibles y se otorgan por la duración del programa. El material descrito en el punto 4.7 se entrega para uso interno del estudio y de su personal, y su vigencia no está limitada en el tiempo. No se autoriza la comercialización ni la distribución del material de formación a terceros ajenos a la organización.",
      items: [],
    },
  ],
} as const;

/* ---------------------------------------------------------------------
   10 · PRÓXIMOS PASOS
   La secuencia arranca por la segunda reunión con la dirección, que es
   lo que quedó acordado en la conversación del 14/08: la propuesta se
   revisa entre los dos socios antes de decidir.

   El bloque de contacto NO es un llamado a la acción: es la vía para
   consultar sobre el documento. Por eso el título pregunta por dudas y
   no propone reservar nada, y no hay calendario embebido.
   ------------------------------------------------------------------- */
const pasos = {
  n: "10",
  id: "proximos-pasos",
  eyebrow: "10 · Próximos pasos",
  titulo: "Próximos pasos",
  intro:
    "Según lo conversado, la propuesta se revisa primero entre los socios del estudio. La secuencia prevista es la siguiente:",
  items: [
    "Revisión interna de este documento.",
    "Segunda reunión, con la dirección completa, para responder las consultas que surjan de esa revisión y presentar la propuesta final.",
    "Confirmación de la propuesta y acuerdo de la fecha de inicio.",
    "Envío del relevamiento individual a la totalidad del personal y alta de los participantes en el portal.",
    "Reunión de relevamiento con la dirección y devolución del informe de situación.",
    "Desarrollo del programa: sesenta días, según el calendario del punto 5.",
    "Entrega de la documentación y del informe final, dentro de los diez días hábiles posteriores al cierre.",
  ],
  cierre:
    "Quedo a disposición para ampliar cualquiera de los puntos de este documento o para ajustar el alcance a lo que el estudio considere necesario. La segunda reunión puede ser más breve que la primera y concentrarse en lo que la dirección necesite discutir.",
  contactoTitulo: "Consultas sobre la propuesta",
  contactoTexto:
    "Por cualquier aclaración sobre el alcance, las condiciones o el calendario, por la vía que les resulte más cómoda.",
  ctaWhatsapp: "Escribir por WhatsApp",
  ctaEmail: "Escribir por correo",
  firma: "Pablo Brunet",
  firmaPie: "Inteligencia Artificial aplicada a negocios",
} as const;

/* =====================================================================
   DOCUMENTO
   ===================================================================== */
export const milman = {
  seo: {
    title: "Propuesta para Estudio Milman — Programa de adopción de IA, Método INTEGRA",
    description:
      "Alcance, calendario y condiciones de un programa de adopción de Inteligencia Artificial de sesenta días para un estudio contable: diagnóstico, nivelación, clínicas semanales y documentación de cierre.",
  },

  /* =====================================================================
     PORTADA
     El titular nombra el servicio; no argumenta a favor de contratarlo.
     La ficha es lo primero que se chequea en una propuesta, así que va a
     la altura del título y no al pie.
     ===================================================================== */
  hero: {
    /* Logo del cliente, arriba de todo, a modo de membrete. Todavía no lo
       tenemos: con `src` vacío la portada NO dibuja el bloque —no queda
       hueco ni imagen rota— y el título encabeza la columna.

       Cuando el estudio lo aporte, va a /public/images/milman/ y se
       completan las cuatro claves. Las medidas son las del archivo
       original y están para reservar el espacio mientras carga. */
    logo: {
      src: "",
      alt: "Estudio Milman",
      ancho: 1024,
      alto: 231,
    },
    titulo: "Programa de adopción de Inteligencia Artificial",
    tituloResalte: "aplicada al trabajo del estudio.",
    subtitulo:
      "Sesenta días de trabajo sobre los procesos propios: diagnóstico del punto de partida, formación por rol, encuentros semanales de resolución en vivo y documentación de lo que queda funcionando. Este documento detalla el alcance, el calendario y las condiciones del servicio.",
    enlaces: [
      { etiqueta: "Ir al alcance", id: "alcance" },
      { etiqueta: "Ir a las condiciones", id: "condiciones-economicas" },
    ],
    fichaTitulo: "Datos de la propuesta",
    fichaFilas: [
      { etiqueta: "Cliente", valor: "Estudio Milman", icono: "people" },
      { etiqueta: "Presentada por", valor: "Pablo Brunet", icono: "estrella" },
      { etiqueta: "Fecha de emisión", valor: "14 de agosto de 2026", icono: "calendario" },
      { etiqueta: "Referencia", valor: "PB-2026-08-MIL", icono: "documento" },
      { etiqueta: "Modalidad", valor: "Remota, con encuentros semanales en vivo", icono: "location" },
      { etiqueta: "Participantes", valor: "La totalidad del personal del estudio", icono: "target" },
      { etiqueta: "Duración", valor: "60 días corridos", icono: "clock" },
      { etiqueta: "Validez", valor: "30 días corridos desde la emisión", icono: "shield" },
    ],
  },

  /* Rótulo del índice navegable que va debajo de la portada. */
  indiceTitulo: "Contenido de la propuesta",

  objeto,
  situacion,
  enfoque,
  alcance,
  fases,
  participantes,
  aplicaciones,
  economicas,
  generales,
  pasos,

  /* Orden del documento y fuente del índice. Debe coincidir con el orden
     de los componentes en la página. */
  indice: [
    objeto,
    situacion,
    enfoque,
    alcance,
    fases,
    participantes,
    aplicaciones,
    economicas,
    generales,
    pasos,
  ],

  /* ---- WhatsApp: mensaje propio de esta propuesta ---- */
  whatsapp: {
    mensaje: "Hola Pablo, te escribo por la propuesta para Estudio Milman. Quería consultarte por…",
    etiqueta: "Consultar por la propuesta",
  },
} as const;

export type Milman = typeof milman;
