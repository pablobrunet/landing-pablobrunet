/* =====================================================================
   PROGRAMA INTEGRA · VERSIÓN 4 — contenido de /programa-integra-4
   ---------------------------------------------------------------------
   Alternativa complementaria a la v3. Toma de las specs lo que suma
   (un ejemplo de punta a punta, alcance honesto, autoevaluación sin
   puntaje) y cambia lo que la v3 dejó igual de genérico:

     · La voz es la de Pablo, en primera persona.
     · El ejemplo y el recorrido de 60 días son UNA sola pieza: una
       ficha de trabajo que se va completando mientras bajás, con el
       contador de días de la v2.
     · La autoevaluación es una hoja con las seis preguntas a la vista,
       no un asistente de a una pregunta.

   Todo vive aparte. Para descartarla, borrar:
     · src/pages/programa-integra-4/
     · src/data/integra4.ts (este archivo)
     · src/styles/integra4.css
     · src/scripts/integra4.ts
     · src/lib/integra4-orientacion.js
     · la ruta en EXCLUIDAS_DEL_SITEMAP de astro.config.mjs
   ===================================================================== */

export const integra4 = {
  seo: {
    title: "Programa INTEGRA — IA probada en tareas reales de tu PyME | Pablo Brunet",
    description:
      "En 60 días tu equipo elige tareas concretas, las prueba con IA en su trabajo de todos los días y decide qué se queda. Acompaña Pablo Brunet. Primer paso: una Consultoría Estratégica Gratuita de 30 minutos.",
  },

  nav: [
    { label: "Una tarea de punta a punta", href: "#una-tarea" },
    { label: "Qué te pide", href: "#dedicacion" },
    { label: "Preguntas", href: "#preguntas" },
  ],

  /* ============================== PORTADA ============================== */
  portada: {
    marca: "Programa INTEGRA · para PyMEs",
    titulo: "En 60 días, tu equipo prueba la IA en tareas reales y decide qué se queda.",
    bajada:
      "Soy Pablo Brunet. En INTEGRA acompaño a tu equipo a elegir dos o tres tareas donde la IA puede ayudar, probarlas con la gente que las hace todos los días y decidir, con lo que pasó a la vista, qué se adopta, qué se ajusta y qué se deja.",
    cta: "Agendar Consultoría Estratégica Gratuita",
    ctaNota: "30 minutos por videollamada, sin costo.",
    secundario: "Ver una tarea de punta a punta",
    datos: ["60 días", "Un encuentro en vivo por semana, remoto", "Sobre el trabajo de tu empresa"],
    foto: "/images/servicios/estrategia-tarjeta.jpg",
    fotoAlt:
      "Pablo Brunet de pie frente a una mesa larga donde un grupo de personas lo escucha, con hojas, lapiceras y una notebook sobre la mesa",
    fotoPie: "Capacitación con un equipo de empresa, alrededor de la mesa donde trabaja.",
  },

  /* ============================ UNA TAREA ==============================
     El corazón de la página. Una sola tarea recorre los cuatro tramos.
     Cada tramo completa campos de la ficha (`campos`); el script los va
     mostrando a medida que el tramo pasa por la pantalla. Sin JavaScript
     la ficha se ve completa.

     Letras del método por tramo (de la v1: puntos de control 15/30/45/60):
       I → días 1 a 15 · N y T → 16 a 30 · E → 31 a 45 · R y A → 46 a 60
       G → todo el tiempo
     ===================================================================== */
  tarea: {
    titulo: "Una tarea, del día 1 al día 60.",
    bajada:
      "Así se ve el programa sobre un caso concreto. Lo armé como ejemplo para mostrar cómo trabajamos: la empresa, los números y lo que pasó son inventados, el procedimiento es el real.",
    ficha: {
      titulo: "Ficha de prueba",
      asunto: "Propuestas comerciales",
      empresa: "Distribuidora de ejemplo · 35 personas",
    },
    tramos: [
      {
        dias: "Días 1 a 15",
        desde: 1,
        hasta: 15,
        letras: "I",
        letrasNombre: "Identificar",
        titulo: "Primero miramos cómo se trabaja hoy.",
        texto:
          "Arrancamos con RADAR Usuarios: quién usa IA, para qué, con qué herramientas y qué tareas le comen más tiempo a cada área. De esa lista sale, entre otras, esta: las propuestas comerciales. Tres personas las arman a mano y cada una tarda casi una hora.",
        equipo: "Responde RADAR y cuenta sus tareas.",
        integra: "Ordeno lo relevado y propongo candidatas.",
        campos: ["tarea", "hoy"],
      },
      {
        dias: "Días 16 a 30",
        desde: 16,
        hasta: 30,
        letras: "N · T",
        letrasNombre: "Negociar prioridades · Transformar",
        titulo: "Elegimos esta y no otra, y definimos cómo probarla.",
        texto:
          "Con dirección comparamos las candidatas con la misma vara: cuánto tiempo se va, qué riesgo hay si sale mal y qué tan fácil es probarla. Ganan las propuestas. Antes de tocar nada, escribimos qué tiene que pasar para que la prueba se considere buena.",
        equipo: "Dirección decide. La jefa comercial queda a cargo.",
        integra: "Facilito la priorización y diseño la prueba con ella.",
        campos: ["porque", "prueba", "criterio", "responsable"],
      },
      {
        dias: "Días 31 a 45",
        desde: 31,
        hasta: 45,
        letras: "E",
        letrasNombre: "Ejecutar",
        titulo: "El equipo la prueba en propuestas de verdad.",
        texto:
          "Diez propuestas reales se arman con un borrador de IA y las mismas condiciones de siempre. Se anota cuánto se tardó y qué hubo que corregir. El texto sale más ordenado y más rápido, pero en dos de las diez el borrador ofrece un descuento que nadie autorizó.",
        equipo: "Arma las propuestas y registra cada corrección.",
        integra: "Reviso los registros cada semana y ajustamos sobre la marcha.",
        campos: ["paso"],
      },
      {
        dias: "Días 46 a 60",
        desde: 46,
        hasta: 60,
        letras: "R · A",
        letrasNombre: "Rentabilizar · Acelerar",
        titulo: "Se decide con lo que pasó, no con lo que se esperaba.",
        texto:
          "La prueba no se aprueba así como está, y tampoco se tira. Se ajusta: la herramienta sólo puede usar la lista de precios vigente y las condiciones las revisa una persona antes de enviar. Queda escrito quién sigue, qué se vuelve a medir y cuál es la próxima tarea de la lista.",
        equipo: "Adopta el procedimiento ajustado.",
        integra: "Dejo la decisión documentada y el próximo ciclo armado.",
        campos: ["decision", "siguiente"],
      },
    ],
    /* Los campos de la ficha, en el orden en que se leen. */
    campos: {
      tarea: { etiqueta: "Tarea", valor: "Armar la primera versión de cada propuesta comercial." },
      hoy: { etiqueta: "Cómo se hace hoy", valor: "A mano, 3 personas, casi 1 hora cada una." },
      porque: { etiqueta: "Por qué esta", valor: "Se repite todas las semanas y un error se detecta antes de enviar." },
      prueba: { etiqueta: "Cómo se prueba", valor: "10 propuestas reales con borrador de IA, comparadas con las hechas a mano." },
      criterio: { etiqueta: "Qué tiene que cumplir", valor: "Ninguna condición que no esté en la lista de precios aprobada." },
      responsable: { etiqueta: "Responsable", valor: "Jefa comercial." },
      paso: { etiqueta: "Qué pasó", valor: "Borrador en 20 minutos. En 2 de 10 apareció un descuento no autorizado." },
      decision: { etiqueta: "Decisión", valor: "Ajustar: fuentes limitadas a la lista vigente y revisión humana de condiciones." },
      siguiente: { etiqueta: "Próximo paso", valor: "Repetir con 10 propuestas más. Después, la tarea 2 de la lista." },
    },
    transversal:
      "Durante los 60 días corre la G de Gestionar: un encuentro en vivo por semana, formación según el rol de cada persona y seguimiento para que nada quede a mitad de camino.",
    nota:
      "Prefiero una prueba que se ajusta o se descarta con motivo antes que una que sigue viva por inercia. Esa decisión, escrita, es lo que le queda a la empresa.",
  },

  /* ============================ DEDICACIÓN ============================ */
  dedicacion: {
    titulo: "Lo que le pide a tu empresa.",
    bajada:
      "El trabajo lo hace tu equipo, conmigo al lado. Por eso conviene saber desde el principio cuánto tiempo lleva. Son referencias iniciales; en el diagnóstico vemos cómo encajan en tu caso.",
    roles: [
      { rol: "Cada participante", tiempo: "1,5 h", unidad: "por semana", texto: "El encuentro en vivo y lo que avanza en el portal." },
      { rol: "El referente interno", tiempo: "3 a 4 h", unidad: "por semana", texto: "Coordina adentro y sostiene el ritmo entre encuentros." },
      { rol: "Dirección", tiempo: "1 h", unidad: "cada 15 días", texto: "Para decidir con lo que se fue viendo." },
    ],
    reparto: {
      equipo: {
        titulo: "Lo hace tu equipo",
        items: [
          "Cuenta cómo trabaja y qué le lleva tiempo.",
          "Prueba sobre tareas reales y anota lo que pasa.",
          "Decide, con dirección, qué se queda.",
        ],
      },
      integra: {
        titulo: "Lo hago yo",
        items: [
          "Relevo, ordeno y propongo por dónde empezar.",
          "Diseño las pruebas y formo a cada persona según su rol.",
          "Reviso los resultados y dejo documentado cómo seguir.",
        ],
      },
    },
    noIncluye: {
      titulo: "Lo que no incluye",
      texto:
        "Si después de probar conviene automatizar algo o conectar sistemas, ese desarrollo se define y se cotiza aparte. El programa sirve justamente para saber si vale la pena antes de invertir en eso.",
    },
    noEs: {
      titulo: "Cuándo no te lo recomiendo",
      texto:
        "Si hoy nadie en la empresa puede dedicarle unas horas por semana, o si buscás que alguien de afuera lo resuelva sin que el equipo participe. En esos casos te lo voy a decir en el diagnóstico.",
    },
  },

  /* ============================== PORTAL ============================== */
  portal: {
    titulo: "Entre encuentro y encuentro, el portal.",
    texto:
      "Cada participante tiene acceso al portal de INTEGRA, con cursos cortos según su rol y los materiales del programa. Sirve para avanzar a su ritmo y para retomar lo que se vio en el encuentro.",
    img: "/images/integra/portal-integra.png",
    alt: "Pantalla del Portal INTEGRA con un curso en progreso, el catálogo de cursos y el acceso a archivos compartidos",
    pie: "Pantalla de inicio del portal, tal como la ve un participante.",
  },

  /* ============================== PABLO ============================== */
  pablo: {
    titulo: "Quién va a estar del otro lado.",
    texto: [
      "Soy Pablo Brunet. Hace años que trabajo con PyMEs, cámaras e instituciones de la región llevando la inteligencia artificial a tareas concretas: primero en charlas y capacitaciones, después sentado con equipos a probar sobre su propio trabajo.",
      "INTEGRA nació de ver siempre lo mismo: mucho entusiasmo después de una capacitación y, un mes más tarde, todo igual que antes. Lo que faltaba no era otra herramienta, era alguien que acompañe a elegir, probar y decidir. Eso es lo que hago en el programa.",
    ],
    foto: "/images/capacitaciones/ceca.jpg",
    fotoAlt: "Pablo Brunet junto a un grupo de nueve personas frente a una pared azul con el logo de CECA, detrás de una mesa de reuniones con papeles, notebooks y un mate",
    fotoPie: "Taller de IA aplicada en CECA, la cámara de estaciones de servicio de Santa Fe.",
    mensajesTitulo: "Mensajes que me mandaron después de capacitaciones",
    mensajesNota: "Tal como llegaron por WhatsApp. Son de charlas y talleres, no del programa.",
    mensajes: ["Mariano L.", "Florencia B.", "Seba M."],
    logosTitulo: "Algunas empresas e instituciones donde di charlas, capacitaciones o consultoría",
    logos: [
      "SpeedAgro",
      "Grupo Santa María",
      "Bolsa de Comercio de Santa Fe",
      "Unión Industrial de Santa Fe (UISF)",
      "Sociedad Rural de Rafaela",
      "Universidad Tecnológica Nacional",
      "Parque Industrial Sauce Viejo",
      "El Emporio de la Construcción",
    ],
  },

  /* ============================= PREGUNTAS ============================ */
  faq: [
    {
      pregunta: "¿En qué se diferencia de una capacitación?",
      respuesta:
        "La capacitación es una parte. El resto del tiempo trabajamos sobre tareas de tu empresa: elegimos cuáles, las probamos y decidimos. Al final no te queda sólo lo aprendido, te quedan decisiones tomadas y un próximo paso.",
    },
    {
      pregunta: "¿Cuánto tiempo le lleva al equipo?",
      respuesta:
        "Como referencia: una hora y media por semana cada participante, entre tres y cuatro horas el referente interno y una hora cada quince días para dirección. Lo ajustamos en el diagnóstico.",
    },
    {
      pregunta: "¿Ustedes desarrollan las automatizaciones?",
      respuesta:
        "Dentro del programa, no. Si una prueba muestra que conviene automatizar o integrar sistemas, lo cotizo como un proyecto aparte, con el alcance ya claro.",
    },
    {
      pregunta: "¿Y si una prueba no funciona?",
      respuesta:
        "Se anota qué pasó, se revisa por qué y se decide si se ajusta o se deja. Descartar con motivo también es un resultado: evita invertir en algo que no iba a andar.",
    },
    {
      pregunta: "¿Es presencial?",
      respuesta:
        "Los encuentros semanales son por videollamada. Entre encuentros, cada participante trabaja con el portal y con las tareas de su puesto.",
    },
    {
      pregunta: "¿Cuánto cuesta?",
      respuesta:
        "Depende de cuántas personas participan y del alcance. Lo vemos después de la Consultoría Estratégica Gratuita, cuando ya conozco tu punto de partida.",
    },
  ],

  /* ========================== AUTOEVALUACIÓN ==========================
     Las seis preguntas en una sola hoja. Sin puntaje ni niveles: la
     orientación sale de src/lib/integra4-orientacion.js, que mira cada
     respuesta por separado. Los índices de `opciones` importan: la
     lógica los usa, así que si cambiás el orden, revisala.
     ===================================================================== */
  auto: {
    titulo: "¿Por dónde conviene empezar en tu empresa?",
    bajada:
      "Seis preguntas, dos minutos. Respondé como está hoy. Todo se calcula en tu navegador: no se guarda ni se envía nada.",
    aclaracion:
      "Es una orientación rápida. No reemplaza RADAR Usuarios, que es el primer paso real dentro del programa.",
    preguntas: [
      { id: "tamano", texto: "¿Cuántas personas trabajan en tu empresa?", opciones: ["1 a 9", "10 a 29", "30 a 79", "80 a 149", "150 o más"] },
      { id: "uso", texto: "¿Cómo se usa la IA hoy?", opciones: ["Todavía no la usamos", "Algunos, por su cuenta", "En varias áreas, sin coordinación", "Con criterios compartidos y seguimiento", "No sé"] },
      { id: "inventario", texto: "¿Saben qué herramientas de IA pagan y para qué se usan?", opciones: ["Sí, lo revisamos", "Algunas sí, otras no", "No tenemos esa lista", "Todavía no pagamos ninguna", "No sé"] },
      { id: "tarea", texto: "¿Hay una tarea concreta elegida para mejorar?", opciones: ["Sí, y acordamos por qué", "Hay ideas, pero no elegimos", "Todavía no", "No sé"] },
      { id: "responsable", texto: "¿Hay alguien a cargo, con tiempo asignado?", opciones: ["Sí", "Alguien lo lleva cuando puede", "Todavía no", "No sé"] },
      { id: "decision", texto: "Cuando prueban algo, ¿cómo deciden si sigue?", opciones: ["Anotamos resultados y decidimos", "Lo charlamos, sin dejar nada escrito", "Todavía no probamos nada", "No sé"] },
    ],
    boton: "Ver por dónde empezar",
    resultadoTitulo: "Según lo que respondiste, yo miraría esto:",
    resultadoNota: "Es una lectura rápida de tus respuestas, no un diagnóstico.",
    compartir: "Mandarme esto por WhatsApp",
    compartirNota: "Se abre WhatsApp con este texto. Lo podés editar antes de enviarlo.",
  },

  /* ============================== CIERRE ============================== */
  cierre: {
    titulo: "Charlemos 30 minutos sobre tu empresa.",
    texto:
      "En la Consultoría Estratégica Gratuita vemos cómo se usa la IA hoy, qué tareas podrían ir primero y si el programa tiene sentido para ustedes. Si no lo tiene, te lo digo.",
    detalle: "Consultoría Estratégica Gratuita · 30 minutos · por videollamada",
    alternativa: "¿El calendario no carga? Abrí la agenda en otra pestaña o escribime por WhatsApp.",
    whatsappMensaje: "Hola Pablo, vengo de la página del Programa INTEGRA y quiero consultar por la Consultoría Estratégica Gratuita.",
  },
} as const;

export type CampoFicha = keyof typeof integra4.tarea.campos;
