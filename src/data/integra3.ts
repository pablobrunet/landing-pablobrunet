// Contenido específico del borrador /programa-integra-3. No altera la oferta publicada.
export const integra3 = {
  nav: [
    { label: 'Cómo trabajamos', href: '#como-trabajamos' },
    { label: 'El programa', href: '#programa' },
    { label: 'Preguntas', href: '#preguntas' },
  ],
  ejemplo: [
    {
      numero: '01', nombre: 'La tarea', titulo: 'Preparar una propuesta comercial',
      texto: 'El equipo recibe un brief y condiciones comerciales aprobadas. Quiere preparar el primer borrador sin perder control sobre lo que se le promete al cliente.',
      dato: 'Responsable: la persona que prepara y revisa las propuestas.',
    },
    {
      numero: '02', nombre: 'La prueba', titulo: 'Comparar dos formas de trabajar',
      texto: 'Se prepara una propuesta con el procedimiento habitual y otra con ayuda de IA. Se observan el tiempo total, las correcciones necesarias y la exactitud de las condiciones.',
      dato: 'Criterio: ninguna condición puede salir de las fuentes aprobadas.',
    },
    {
      numero: '03', nombre: 'La observación', titulo: 'Un borrador útil, con un error importante',
      texto: 'En este ejemplo, la IA ordena el texto, pero agrega una condición comercial que no figura en el brief. El ahorro de tiempo aparente no alcanza para aprobar el procedimiento.',
      dato: 'Registro: qué se corrigió y por qué importa.',
    },
    {
      numero: '04', nombre: 'La decisión', titulo: 'Ajustar antes de adoptar',
      texto: 'Se acotan las fuentes que puede usar la herramienta y se mantiene la revisión humana de condiciones antes del envío. La próxima prueba comprobará si ese ajuste reduce el error.',
      dato: 'Siguiente paso: repetir la prueba con fuentes delimitadas.',
    },
  ],
  tramos: [
    { hito: '01—15', titulo: 'Punto de partida', texto: 'RADAR Usuarios al inicio. Relevamos contexto, herramientas, personas y tareas; después se validan las tareas que pueden convertirse en oportunidades.', entrega: 'Mapa inicial y responsables.' },
    { hito: '16—30', titulo: 'Prioridades y diseño', texto: 'Ordenamos oportunidades con criterios comunes y definimos pruebas acotadas: objetivo, responsable, riesgo y forma de observarlas.', entrega: 'Oportunidades ordenadas y fichas de prueba.' },
    { hito: '31—45', titulo: 'Pruebas aplicadas', texto: 'El equipo prueba en su trabajo real. INTEGRA acompaña, forma y revisa lo observado para ajustar el procedimiento.', entrega: 'Registro de observaciones y correcciones.' },
    { hito: '46—60', titulo: 'Decisión y continuidad', texto: 'Se decide adoptar, ajustar o descartar cada prueba. Se acuerdan responsables y próximos pasos para el siguiente ciclo.', entrega: 'Decisiones documentadas y plan de continuidad.' },
  ],
  faq: [
    { pregunta: '¿Es una capacitación más?', respuesta: 'La formación acompaña el trabajo. RADAR, la selección de tareas, las pruebas y las decisiones se hacen sobre la operación de la empresa, con encuentros semanales de seguimiento.' },
    { pregunta: '¿Cuánto tiempo necesita el equipo?', respuesta: 'Como referencia inicial: alrededor de 1,5 horas semanales por participante, entre 3 y 4 horas para el referente interno, y una hora quincenal de dirección. En el diagnóstico se revisa cómo encaja esa dedicación en tu empresa.' },
    { pregunta: '¿Ustedes desarrollan las automatizaciones?', respuesta: 'El programa trabaja la definición del problema, la preparación y revisión de pruebas y la decisión de cómo seguir. Un desarrollo o integración técnica se define y cotiza como proyecto independiente.' },
    { pregunta: '¿Qué pasa si una prueba no funciona?', respuesta: 'Se registra qué ocurrió, se revisa el motivo y se decide si conviene ajustarla o descartarla. Esa decisión fundamentada evita convertir una intuición en un proyecto sin revisar.' },
    { pregunta: '¿Es presencial? ¿Cómo se accede a los materiales?', respuesta: 'Los encuentros regulares son remotos. Las personas que participan acceden al portal del programa para trabajar con sus recursos de formación entre encuentros.' },
    { pregunta: '¿Cuánto cuesta?', respuesta: 'El valor se define según la cantidad de personas que participan y el alcance acordado. Lo conversamos después de entender tu punto de partida; el primer paso es una Consultoría Estratégica Gratuita.' },
  ],
  preguntas: [
    { id: 'tamano', titulo: '¿Cuántas personas trabajan en tu empresa?', opciones: ['1 a 9', '10 a 29', '30 a 79', '80 a 149', '150 o más'] },
    { id: 'uso', titulo: '¿Cómo se usa IA hoy?', opciones: ['Todavía no la usamos', 'Algunas personas la usan por su cuenta', 'Se usa en varias áreas, sin coordinación', 'Hay criterios compartidos y seguimiento', 'No sé'] },
    { id: 'inventario', titulo: '¿Saben qué herramientas de IA pagan y para qué se usan?', opciones: ['Sí, lo revisamos', 'Conocemos algunas, pero no todas', 'No tenemos un inventario', 'Todavía no pagamos herramientas', 'No sé'] },
    { id: 'tarea', titulo: '¿Hay una tarea concreta elegida para mejorar?', opciones: ['Sí, con un criterio acordado', 'Tenemos ideas, pero no elegimos', 'Todavía no', 'No sé'] },
    { id: 'responsable', titulo: '¿Hay una persona responsable con tiempo asignado?', opciones: ['Sí', 'Alguien lo lleva cuando puede', 'Todavía no', 'No sé'] },
    { id: 'decision', titulo: 'Cuando prueban algo, ¿cómo deciden si continúa?', opciones: ['Registramos resultados y tomamos una decisión', 'Lo conversamos, sin dejar registro', 'Todavía no hicimos pruebas', 'No sé'] },
  ],
} as const;
