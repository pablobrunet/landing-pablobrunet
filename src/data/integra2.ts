/* =====================================================================
   PROGRAMA INTEGRA — contenido de /programa-integra
   ---------------------------------------------------------------------
   Texto de la landing rediseñada (se trabajó como /programa-integra-2 y
   reemplazó a la primera versión). Lo leen src/pages/programa-integra/ y
   src/components/integra2/.
   Las secciones que no cambiaron (portal, quién soy, preguntas, datos del
   calendario y WhatsApp) siguen leyendo data/integra.ts.

   Qué cambió respecto de la v1:
     · El hero es el de la v1, sin cambios (IntegraHero).
     · Sale el espejo de tarjetas para tocar: repetía al chequeo. Los
       dolores pasan a la sección del problema, como texto fijo.
     · Las siete fases con pestañas pasan a cuatro tramos de 15 días,
       todos a la vista, con una línea que se llena al bajar.
     · "Cómo es una semana" sube desde las preguntas frecuentes.
     · "Qué queda" se cuenta con cosas concretas, no con "capacidades".
     · Un solo nombre para la reunión: Consultoría Estratégica Gratuita. Y uno para
       el cuestionario: Autoevaluación.
     · Disponibilidad y cierre en una sola sección.
   ===================================================================== */

import { integra } from "./integra";

export interface OpcionAuto {
  texto: string;
  /** 0 (peor) a 2 (mejor). Sin peso, no puntúa: sólo da contexto. */
  peso?: number;
  hallazgo?: string;
}

export interface PreguntaAuto {
  id: string;
  /** Rótulo corto para la lista de pasos del panel lateral. */
  corto: string;
  texto: string;
  opciones: OpcionAuto[];
}

export const integra2 = {
  seo: {
    title: "Programa INTEGRA",
    description:
      "En 60 días tu PyME ordena su uso de inteligencia artificial: un equipo que sabe usar IA, una lista clara de qué mejorar, pruebas sobre trabajo real y decisiones con evidencia. Primer paso: una Consultoría Estratégica Gratuita de 30 minutos.",
  },

  anclas: {
    programa: "como-funciona",
    auto: "chequeo", // mismo id que la v1: el botón del hero original apunta acá
    agenda: "agenda-integra",
  },

  /* ============================== PROBLEMA ============================== */
  /* Cada tarjeta junta lo que se ve en la oficina con lo que eso cuesta.
     Reemplaza al espejo interactivo y a la sección de costo: eran la misma
     idea contada dos veces.

     Los tres dolores son los que Pablo escucha en las PyMEs con las que
     trabaja (2026-09-28): no saber por dónde arrancar, gente que sabe pero
     no contagia al resto, y pruebas sueltas que no llegan a un resultado.
     Se sacaron a propósito "suscripciones que nadie controla" y "el equipo
     hizo cursos": pocas PyMEs pagan suscripciones y casi ninguna invirtió
     en capacitación, así que no eran su problema. */
  problema: {
    titulo: "El problema no es lo que la IA te va a costar.",
    tituloResalte: "Es lo que ya te está costando.",
    etiquetaPasa: "Lo que pasa",
    etiquetaCuesta: "Lo que cuesta",
    casos: [
      {
        pasa: "Sabés que la IA puede ayudarte, pero no sabés por dónde empezar.",
        cuesta:
          "Mientras tanto pasan los meses. Las tareas que ya se podrían hacer mejor se siguen haciendo como siempre, y cada semana sin arrancar son horas que no vuelven.",
      },
      {
        pasa: "Hay gente en el equipo que ya sabe usar IA, pero eso no se contagia.",
        cuesta:
          "Lo que aprende una persona se queda con ella. El resto de las áreas trabaja igual que antes, y desde dirección no sabés bien qué se está haciendo con la IA ni para qué.",
      },
      {
        pasa: "Cada uno prueba por su lado y nadie sabe qué conviene mejorar primero.",
        cuesta:
          "Las pruebas no se suman ni llegan a un resultado. Se prueba mucho, pero la empresa como tal no aprende y nada queda instalado.",
      },
    ],
    cierre: "No falta IA. Falta una forma de trabajar juntos para sacarle el jugo.",
    cta: "Agendar Consultoría Estratégica Gratuita",
  },

  /* ============================ CÓMO FUNCIONA ============================
     Cuatro tramos de 15 días, en el orden en que los vive el cliente.
     Sin días ni fechas a la vista, a pedido de Pablo: las fichas y los
     puntos que las unen cuentan el orden; el calendario se habla en el
     diagnóstico.

     La sigla INTEGRA se sacó a propósito de esta sección: mostrar siete
     fases al lado de cuatro tramos confundía. Por si hace falta, el
     reparto sale de los puntos de control de la v1 (15, 30, 45, 60):
       I → días 1 a 15 · N y T → 15 a 30 · E → 30 a 45 · R y A → 45 a 60
       G → corre todo el tiempo
     ===================================================================== */
  programa: {
    eyebrow: "Cómo funciona",
    titulo: "Cómo trabajamos,",
    tituloResalte: "paso a paso.",
    subtitulo:
      "Nada de teoría suelta: cada tramo trabaja sobre lo que ya pasa en tu PyME y termina con algo concreto en la mano.",
    tramos: [
      {
        titulo: "Ordenamos el punto de partida",
        texto:
          "Relevamos qué herramientas se usan, quién las usa y qué sabe hoy cada persona. Con eso a la vista aparecen los primeros problemas que vale la pena resolver.",
        queda: "Un inventario real y la primera lista de problemas a resolver.",
      },
      {
        titulo: "Elegimos qué probar primero",
        texto:
          "Cada idea se ordena con la misma vara: impacto, esfuerzo y riesgo. Las mejores se convierten en pruebas chicas y acotadas, fáciles de hacer sin frenar el trabajo.",
        queda: "Una lista ordenada y dos o tres pruebas listas para arrancar.",
      },
      {
        titulo: "Tu equipo lo prueba en su trabajo",
        texto:
          "Las pruebas se corren sobre tareas reales, no sobre ejercicios. Las hace tu gente, con nuestro acompañamiento y registrando lo que pasa.",
        queda: "Evidencia de qué funciona y qué no, en tu propia operación.",
      },
      {
        titulo: "Decidimos y dejamos todo andando",
        texto:
          "Cada prueba termina en una decisión: adoptar, ajustar o descartar, con su motivo por escrito. Y queda armada la forma de seguir cuando terminamos.",
        queda: "Decisiones tomadas y un ritmo de trabajo que sigue sin nosotros.",
      },
    ],
    meta: "Y queda andando sin nosotros.",
  },

  /* ========================= CÓMO ES ESTAR ADENTRO =========================
     Reemplaza a dos bloques que Pablo sentía "apagados": la banda "Durante
     todo el programa" y la grilla de horas "Cómo es una semana". La idea es
     que quien lee se imagine el programa: cuatro momentos, cada uno con una
     mini pantalla de cómo se ve. Sin rótulos de quién participa ni cuánto
     tiempo lleva, ni la nota de "100% remoto": Pablo las sacó (2026-09-28).

     `video`: cuando exista el video de Pablo contando la experiencia, poner
     acá la URL de embed (YouTube/Vimeo) y aparece arriba de los momentos.
     Mientras sea null, no se muestra nada.
     ===================================================================== */
  experiencia: {
    eyebrow: "Cómo es estar en el programa",
    titulo: "Así se vive",
    tituloResalte: "desde adentro.",
    subtitulo:
      "No hace falta frenar la operación para aprender: se trabaja sobre lo que tu equipo ya está haciendo. Esto es lo que pasa mientras dura el programa.",
    video: null as string | null,
    videoTitulo: "Pablo cuenta cómo es el programa por dentro",
    momentos: [
      {
        escena: "encuentro",
        titulo: "Un encuentro en vivo por semana",
        texto:
          "Todo el equipo que participa, por videollamada. Se revisa lo que se probó, se destraban dudas y se define qué sigue.",
      },
      {
        escena: "portal",
        titulo: "Entre encuentros, cada uno avanza a su ritmo",
        texto:
          "En el portal, con cursos cortos según el nivel de cada uno. Quien arranca de cero se pone al día; quien ya sabe, saltea.",
      },
      {
        escena: "prueba",
        titulo: "Las pruebas se hacen sobre el trabajo real",
        texto:
          "Cada área prueba en sus propias tareas y anota qué pasó. Antes de arrancar se define qué tiene que pasar para darla por buena. Te acompañamos y revisamos.",
      },
      {
        escena: "decision",
        titulo: "Dirección decide con lo que se vio",
        texto:
          "Una reunión corta con dirección para decidir qué se adopta, qué se ajusta y qué se descarta, con el motivo por escrito.",
      },
    ],
  },

  /* ============================ QUÉ QUEDA ============================== */
  resultado: {
    eyebrow: "De cómo está hoy",
    eyebrowResalte: "a cómo queda al día 60",
    titulo: "De uso aislado a",
    tituloResalte: "un sistema real.",
    subtitulo:
      "Misma gente. Más claridad. Un equipo que sabe cómo usar la IA, decide mejor y sigue avanzando.",
    etiquetaAntes: "Hoy",
    etiquetaDespues: "Día 60",
    /* Columna de hoy: cada problema con su ícono. */
    hoy: [
      { icono: "brujula", texto: "Se quiere usar la IA, pero nadie sabe por dónde arrancar." },
      { icono: "persona", texto: "Lo que sabe una persona se queda con ella." },
      { icono: "charla", texto: "Cada área defiende su idea y se discute todo de nuevo." },
      { icono: "hoja", texto: "Se prueban cosas sueltas que nunca terminan en nada." },
      { icono: "equipo", texto: "Cada uno usa la IA como entiende, sin controles." },
      { icono: "reloj", texto: "Nadie tiene tiempo asignado para ocuparse de esto." },
      { icono: "bateria", texto: "Cuando baja el entusiasmo, todo se apaga." },
    ],
    /* Tarjeta oscura: el resultado en una frase. */
    dia60: {
      titulo: "Un sistema que sigue",
      tituloResalte: "funcionando.",
      texto: "Lo que aprende uno lo usan todos. Ideas que avanzan. Un equipo con claridad para el próximo ciclo.",
      pie: "Mismas personas. Más claridad.",
    },
    /* Las cuatro tarjetas chicas, cada una con un ejemplo de cómo se ve. */
    lista: {
      titulo: "Una lista ordenada de qué mejorar",
      texto: "Se sabe qué va primero y por qué.",
      cabecera: "Lista de mejoras",
      filas: [
        { area: "Atención al cliente", prioridad: "Alta" },
        { area: "Presupuestos", prioridad: "Media" },
        { area: "Operaciones", prioridad: "Media" },
        { area: "Marketing", prioridad: "Baja" },
        { area: "Administración", prioridad: "Baja" },
      ],
    },
    pruebas: {
      titulo: "Pruebas cerradas con una decisión",
      texto: "Cada prueba termina en adoptar, ajustar o descartar.",
      cabecera: "Prueba: resúmenes de reuniones",
      pasos: ["Probar", "Evaluar resultados"],
      decision: "Decisión",
      opcion: "Adoptar",
    },
    equipo: {
      titulo: "Un equipo que sabe cómo usarla",
      texto: "Cada uno sabe qué usa, para qué y con qué controles.",
      filas: [
        { area: "Dirección", hace: "Define y prioriza", tono: "intenso" },
        { area: "Operaciones", hace: "Usa y valida", tono: "denim" },
        { area: "Marketing", hace: "Explora y propone", tono: "marino" },
        { area: "Administración", hace: "Revisa y habilita", tono: "claro" },
      ],
    },
    ritmo: {
      titulo: "Un ritmo que sigue",
      texto: "La reunión semanal y la carga de ideas mantienen el ciclo.",
      cabecera: "Ciclo semanal",
      rango: "Lun – Vie",
      dias: ["Lun", "Mar", "Mié", "Jue", "Vie"],
      diaActivo: 1,
      eventos: [
        { t: "Revisión de avances", hora: "10:00 – 11:00" },
        { t: "Nuevas ideas", hora: "" },
      ],
    },
    cta: "Agendar Consultoría Estratégica Gratuita",
  },

  /* ---- Muro de comentarios: rotulado por lo que es ----
     Son mensajes de charlas y capacitaciones, no del programa. En la v1
     iban pegados al método y se leían como si fueran de clientes de
     INTEGRA. Acá van después de "quién soy": respaldan a la persona. */
  muro: {
    eyebrow: "Charlas y capacitaciones",
    titulo: "Lo que dicen quienes",
    tituloResalte: "ya se formaron con nosotros",
    subtitulo: "Mensajes de participantes de nuestras charlas y capacitaciones en IA, tal como los escribieron.",
  },

  /* ---- Textos propios para secciones compartidas con la v1 ----
     IntegraPortal e IntegraFaq leen data/integra.ts; acá van las versiones
     sin roles internos ("referente", "responsable"), que en la landing no
     se entienden sin el contexto del programa. */
  portalClaves: integra.portal.claves.map((c) =>
    c.titulo === "Se ve cómo viene el equipo"
      ? { ...c, texto: "Cursos en progreso y completados por persona: se sabe dónde está cada uno sin tener que preguntar de a uno." }
      : c
  ),
  /* Mismas preguntas que la v1, con respuestas más largas: Pablo sentía
     que las cortas no le contestaban nada concreto a la empresa. Los
     párrafos van separados por "\n\n". La de "¿ustedes nos implementan?"
     sigue siendo la respuesta estándar del brief: se amplía, no se suaviza.
     No poner precios ni cifras que no estén en el resto de la página. */
  faq: [
    {
      q: "¿Esto es otro curso de IA?",
      a: "No. Hay cursos, pero son una parte, no el programa. Un curso te enseña a usar una herramienta; lo que casi nunca te dice es en qué tareas de tu empresa conviene usarla, quién se ocupa y cómo se sabe si sirvió. Eso es lo que resolvemos juntos.\n\nDurante los 60 días relevamos cómo trabaja hoy tu PyME, armamos la lista ordenada de qué conviene mejorar, hacemos pruebas sobre tareas reales con un encuentro en vivo por semana y cerramos cada prueba con una decisión. Los cursos del portal sirven para que el equipo llegue parejo a cada encuentro, no para mirarlos sueltos.",
    },
    {
      q: "¿Ustedes nos implementan las automatizaciones?",
      a: "No dentro de este programa, y es a propósito. INTEGRA te ayuda a definir el problema, acotar la solución, preparar una prueba y decidir con evidencia. Lo hace tu gente, porque la idea es que la capacidad quede adentro de la empresa y no dependa de alguien de afuera.\n\nMuchas mejoras se resuelven con herramientas que ya tienen o que cualquiera del equipo puede usar. Si alguna necesita un desarrollo, una automatización o una integración técnica, vas a llegar con el problema bien definido y probado, y eso se cotiza como un proyecto independiente.",
    },
    {
      q: "No somos técnicos.",
      a: "Mejor. El programa está pensado para la gente que resuelve el trabajo de todos los días en una PyME: administración, ventas, atención al cliente, compras, dirección. No hace falta saber programar ni entender cómo funciona la IA por dentro.\n\nArrancamos por problemas que ya conocés, como cotizaciones que tardan, respuestas a clientes que se repiten o reportes que se arman a mano. Cada persona empieza desde su nivel: quien nunca usó IA se pone al día con los cursos cortos del portal, y quien ya la usa aprovecha para ordenar lo que hace.",
    },
    {
      q: "No tenemos tiempo para esto.",
      a: "No te pedimos que dejes de trabajar para capacitarte: se trabaja sobre lo que tu equipo ya está haciendo. Las pruebas se hacen en las tareas de todos los días, no en ejercicios aparte.\n\nEn números: unas 1,5 horas por semana por persona, contando el encuentro en vivo y el portal, y una hora cada quince días para dirección. Es poco al lado de las horas que hoy se van en tareas que se podrían hacer mejor, y el objetivo es justamente recuperar parte de ese tiempo.",
    },
    {
      q: "¿Y si las pruebas no salen bien?",
      a: "Es parte del trabajo. Antes de arrancar cada prueba se define qué tiene que pasar para darla por buena, así que al final no se discute por impresiones: se mira lo que pasó.\n\nSi una prueba no funciona, se descarta con el motivo por escrito, y eso también es un resultado: tu PyME se ahorró una inversión que no iba a rendir y el equipo aprendió a decidir. El programa no se mide por cuántas cosas se automatizan, sino por lo que queda instalado para seguir decidiendo bien.",
    },
    {
      q: "¿Cuánto cuesta?",
      a: "El programa tiene un valor único que depende de cuántas personas de tu PyME participen. No es un abono mensual ni se cobra por herramienta.\n\nLo conversamos en la Consultoría Estratégica Gratuita: en 30 minutos vemos dónde está hoy tu empresa, qué tendría sentido trabajar y cuánta gente conviene sumar. Con eso te pasamos el número exacto, sin compromiso.",
    },
    {
      q: "¿Es presencial?",
      a: "Es 100% remoto. Los encuentros son en vivo por videollamada, una vez por semana, y entre encuentro y encuentro cada persona avanza en el portal cuando le queda cómodo.\n\nFunciona igual si tu equipo trabaja en una misma oficina o repartido en distintos lugares. Si en algún momento hace falta una jornada presencial, se acuerda aparte.",
    },
  ],

  /* ========================== AUTOEVALUACIÓN ==========================
     Mismas preguntas que el chequeo de la v1. Cambia el diseño y el
     resultado: sin número ni emojis, una escala de tres niveles y la
     opción de mandar el resultado por WhatsApp para llegar a la reunión
     con eso ya contado. El tamaño no puntúa: viaja en ese mensaje.

     Antes del resultado se pide nombre, empresa y correo para mandar el
     informe por mail (Supabase → n8n → Resend, y el alta en GHL). Es
     obligatorio: sin correo no se ve el resultado.
     ===================================================================== */
  auto: {
    eyebrow: "Autoevaluación",
    titulo: "¿En qué punto está tu PyME con la IA?",
    subtitulo: "Seis preguntas, dos minutos. Al final te mandamos por correo una hoja de ruta para tu PyME.",
    panelTitulo: "Respondé como está hoy, no como te gustaría.",
    panelTexto: "Al final te mostramos en qué punto está tu PyME y qué conviene ordenar primero.",
    // Paso entre la última pregunta y el resultado.
    datos: {
      kicker: "Tu informe está listo",
      titulo: "¿A dónde te lo mandamos?",
      texto:
        "Te mandamos por correo un informe con una hoja de ruta de 90 días: qué dice cada respuesta y qué hacer, etapa por etapa. El resultado lo ves acá apenas lo mandes.",
      boton: "Ver mi resultado",
      aviso:
        "Con tu correo también te sumamos a los mails de INTEGRA: casos reales y cosas que se pueden aplicar. Te das de baja cuando quieras.",
      // Debajo del resultado, cuando el correo se guardó bien.
      enviado: "Te mandamos la hoja de ruta completa a",
      enviadoPie: "Si en unos minutos no lo ves, revisá la carpeta de spam.",
      // Cuando no se pudo guardar: el resultado se muestra igual.
      fallo:
        "No pudimos mandarte el informe por correo, pero lo tenés acá completo. Si querés, mandanoslo por WhatsApp.",
    },
    empezar: "Empezar",
    preguntas: [
      {
        id: "tamano",
        corto: "Tamaño",
        texto: "¿Cuánta gente trabaja en tu PyME?",
        opciones: [
          { texto: "Menos de 10" },
          { texto: "Entre 10 y 30" },
          { texto: "Entre 30 y 80" },
          { texto: "Entre 80 y 150" },
          { texto: "Más de 150" },
        ],
      },
      {
        id: "uso",
        corto: "Uso de IA",
        texto: "¿Quiénes usan IA hoy?",
        opciones: [
          { texto: "Nadie, o casi nadie", peso: 0, hallazgo: "Todavía no hay uso real: la oportunidad completa está sin abrir, y también el riesgo de que empiece desordenado." },
          { texto: "Algunos, por su cuenta", peso: 0, hallazgo: "El uso arrancó por iniciativa personal. Cuando esa persona se ocupa de otra cosa, la iniciativa se apaga con ella." },
          { texto: "Varios, sin coordinación", peso: 1, hallazgo: "Hay uso, pero cada área resuelve por su lado: no existe un criterio común para decidir dónde aplicarla." },
          { texto: "Hay un uso ordenado", peso: 2, hallazgo: "El uso está ordenado. El paso siguiente es que ese orden sobreviva a un cambio de gente." },
        ],
      },
      {
        id: "suscripciones",
        corto: "Suscripciones",
        texto: "¿Cuántas suscripciones de IA pagan por mes?",
        opciones: [
          { texto: "Ninguna", peso: 1 },
          { texto: "Una o dos", peso: 2 },
          { texto: "Entre tres y cinco", peso: 1, hallazgo: "Hay gasto mensual repartido en varias herramientas: sin un inventario, es imposible saber cuál se está usando de verdad." },
          { texto: "Más de cinco", peso: 0, hallazgo: "Son muchas herramientas para una sola PyME: casi siempre hay funciones que se pagan dos veces y licencias que ya nadie abre." },
          { texto: "No sabemos", peso: 0, hallazgo: "Nadie tiene la cuenta de lo que se paga. Ese es el primer gasto a revisar, y no requiere comprar nada nuevo." },
        ],
      },
      {
        id: "capacitacion",
        corto: "Capacitación",
        texto: "¿Hicieron alguna capacitación en IA?",
        opciones: [
          { texto: "No", peso: 0, hallazgo: "El equipo todavía no tiene una base común: hoy cada quien aplica lo que entendió por su cuenta." },
          { texto: "Sí, y no cambió nada", peso: 0, hallazgo: "La inversión en aprender ya se hizo. Lo que falta no es más contenido: es la forma de llevarlo al trabajo." },
          { texto: "Sí, y se aplica", peso: 2, hallazgo: "La formación se aplicó, que es lo difícil. Falta que las mejoras se elijan y se decidan con evidencia." },
        ],
      },
      {
        id: "prioridad",
        corto: "Prioridades",
        texto: "¿Saben qué tarea mejorar primero con IA?",
        opciones: [
          { texto: "Ni idea", peso: 0, hallazgo: "No hay una lista ordenada de qué mejorar: sin eso, la discusión vuelve a empezar en cada reunión." },
          { texto: "Tenemos una intuición", peso: 1, hallazgo: "Hay intuición pero no una vara común: cada área defiende su prioridad." },
          { texto: "Lo tenemos claro", peso: 2 },
        ],
      },
      {
        id: "contagio",
        corto: "Lo que se aprende",
        texto: "Lo que aprende una persona con la IA, ¿llega al resto del equipo?",
        opciones: [
          { texto: "No, cada uno queda con lo suyo", peso: 0, hallazgo: "Lo que aprende una persona se queda con ella: el resto sigue trabajando igual y la empresa no suma nada." },
          { texto: "A veces, de manera informal", peso: 1, hallazgo: "Algo se comparte de pasillo, pero depende de las ganas de cada uno. Sin una forma de hacerlo, se pierde." },
          { texto: "Sí, se comparte y se usa", peso: 2 },
        ],
      },
    ] as PreguntaAuto[],
    /* Ordenados de menor a mayor. `hasta` es el tope del tramo sobre el
       puntaje máximo (10 con los pesos actuales). */
    niveles: [
      {
        hasta: 3,
        nombre: "Uso disperso",
        texto:
          "La IA está, pero sin dueño ni criterio: cada persona resuelve como puede y lo aprendido no queda en ningún lado. Es donde más plata se pierde sin que aparezca en ningún informe.",
        recomendacion:
          "Ordenar antes de sumar: un punto de partida claro, una forma de trabajar entre todos y una lista corta de qué mejorar primero.",
      },
      {
        hasta: 6,
        nombre: "En transición",
        texto:
          "Hay movimiento y gente con ganas, pero falta una forma común de decidir qué se prueba, quién lo hace y cómo se cierra. Es el punto donde una PyME avanza rápido o se estanca.",
        recomendacion:
          "Lo que falta no es otra herramienta: es una lista ordenada, una forma de probar y un espacio para decidir con dirección.",
      },
      {
        hasta: 10,
        nombre: "Con método",
        texto:
          "Tu PyME está por delante de la mayoría: hay uso ordenado y lo que se aprende se comparte. El riesgo ahora es que todo dependa de las mismas dos o tres personas.",
        recomendacion:
          "Dejarlo por escrito, formar a más gente y que el ciclo siga corriendo sin que nadie lo tenga que empujar.",
      },
    ],
    resultadoCta: "Agendar Consultoría Estratégica Gratuita",
    whatsappCta: "Mandar mi resultado por WhatsApp",
    reiniciar: "Volver a empezar",
  },

  /* ============================== CIERRE ==============================
     Junta la vieja sección de disponibilidad con el calendario. La
     escasez es la real (~25 h por PyME por ciclo): no convertirla en
     contador de lugares ni en cuenta regresiva.
     ===================================================================== */
  cierre: {
    eyebrow: "Primer paso",
    titulo: "Consultoría Estratégica Gratuita",
    subtitulo:
      "En 30 minutos miramos cómo usa IA tu PyME, dónde están las brechas y por dónde convendría empezar. Te vas con claridad, avances con nosotros o no.",
    refuerzos: ["Sin costo", "Sin compromiso", "30 minutos"],
    cupos: "Trabajamos con pocas empresas a la vez, así que los espacios semanales son limitados.",
  },
} as const;
