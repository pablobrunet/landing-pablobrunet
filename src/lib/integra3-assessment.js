/** Las respuestas son índices de opción en el orden de src/data/integra3.ts. */
export function orientar(respuestas) {
  const hallazgos = [];
  const agregar = (prioridad, origen, texto) => hallazgos.push({ prioridad, origen, texto });

  const [tamano, uso, inventario, tarea, responsable, decision] = respuestas;
  void tamano; // contexto para conversar; nunca indica madurez.

  if (uso === 1 || uso === 2) agregar(1, 'Uso de IA', 'Acordar qué usos se permiten y cómo se revisan sus resultados entre áreas.');
  if (decision === 1) agregar(2, 'Revisión de pruebas', 'Definir qué se observará y registrar por qué una prueba continúa, cambia o se descarta.');
  if (responsable === 1 || responsable === 2) agregar(3, 'Responsable', 'Asignar una persona y tiempo concreto para dar seguimiento a las iniciativas.');
  if (tarea === 1 || tarea === 2) agregar(4, 'Tarea priorizada', 'Elegir una tarea real antes de sumar más herramientas o contenidos.');
  if (inventario === 1 || inventario === 2) agregar(5, 'Herramientas', 'Revisar qué se paga, quién lo usa y para qué; la cantidad de licencias por sí sola no indica un problema.');
  if (uso === 0) agregar(6, 'Primer paso', 'Elegir una tarea acotada y una persona responsable para comenzar a explorar su uso.');
  if (decision === 2 && uso !== 0) agregar(7, 'Pruebas', 'Definir una primera prueba pequeña y la forma de revisar su resultado.');

  return hallazgos.sort((a, b) => a.prioridad - b.prioridad).slice(0, 3).map(({ origen, texto }) => ({ origen, texto }));
}
