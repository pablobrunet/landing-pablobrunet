/* Orientación de la autoevaluación de /programa-integra-4.
   Sin puntaje ni niveles: cada observación sale de UNA respuesta y dice
   cuál. Devuelve hasta tres, en orden de prioridad, cada una con el índice de
   la pregunta que la origina (`pregunta`) para poder citar la respuesta.

   `respuestas` son índices de opción en el orden de integra4.auto.preguntas:
     [tamano, uso, inventario, tarea, responsable, decision]
   El tamaño es contexto para la charla; nunca suma ni resta.
   "No sé" no se lee como una falta confirmada: se sugiere averiguarlo. */
export function orientar(respuestas) {
  const [, uso, inventario, tarea, responsable, decision] = respuestas;
  const lista = [];
  const sumar = (prioridad, pregunta, tema, texto) => lista.push({ prioridad, pregunta, tema, texto });
  const yaUsan = uso === 1 || uso === 2 || uso === 3;

  if (yaUsan && decision === 1)
    sumar(1, 5, "Cómo deciden", "Antes de la próxima prueba, escribí qué tiene que pasar para darla por buena. Así la decisión no depende de quién opine más fuerte.");
  if (uso === 1 || uso === 2)
    sumar(2, 1, "Uso sin coordinar", "Juntá en una lista quién usa IA y para qué. Es el punto de partida para acordar qué se permite y cómo se revisa lo que devuelve.");
  if (responsable === 1 || responsable === 2)
    sumar(3, 4, "Responsable", "Definí una persona con unas horas por semana asignadas. Sin eso, lo urgente del día siempre gana.");
  if (tarea === 1 || tarea === 2)
    sumar(4, 3, "Tarea elegida", "Elegí una sola tarea que se repita seguido y en la que un error se detecte antes de llegar al cliente. Mejor una bien probada que cinco a medias.");
  if (inventario === 1 || inventario === 2)
    sumar(5, 2, "Herramientas", "Revisá qué se paga, quién lo usa y para qué. No importa cuántas licencias son, sino si alguien sabe para qué está cada una.");
  if (yaUsan && decision === 2)
    sumar(6, 5, "Primera prueba", "Hay uso, pero nada probado de forma ordenada. Tomá una tarea, probala con casos reales y anotá qué pasó.");
  if (uso === 0)
    sumar(0, 1, "Primer paso", "No hace falta empezar grande: una tarea acotada, una persona a cargo y un par de semanas de prueba alcanzan para aprender mucho.");

  const noSe = [
    [1, uso, 4, "Averiguá cómo se usa la IA hoy en cada área. Muchas veces se usa más de lo que dirección sabe."],
    [4, responsable, 3, "Averiguá si alguien tiene esto asignado. Si no está claro, conviene definirlo."],
    [2, inventario, 4, "Pedí a administración la lista de suscripciones de software. Es un buen punto de partida."],
  ].find(([, r, i]) => r === i);
  if (noSe) sumar(8, noSe[0], "Para averiguar", noSe[3]);

  return lista
    .sort((a, b) => a.prioridad - b.prioridad)
    .slice(0, 3)
    .map(({ pregunta, tema, texto }) => ({ pregunta, tema, texto }));
}
