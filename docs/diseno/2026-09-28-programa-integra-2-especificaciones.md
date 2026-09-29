# Programa INTEGRA 2 — especificaciones de diseño y experiencia

Fecha: 28 de septiembre de 2026. Estado: propuesta de dirección para revisión de Pablo y posterior implementación con SOL. Este documento define el producto y sus criterios de aceptación; no supone aprobación del diseño ni autorización de despliegue.

## 1. Decisión central

Diseñar la página como un **cuaderno de decisiones de INTEGRA**: una presentación editorial donde se ve cómo una empresa identifica una tarea, prepara una prueba y decide a partir de lo que observa.

“Cuaderno de decisiones” es el concepto interno de diseño. El nombre comercial sigue siendo **Programa INTEGRA**. No agregar “60” al nombre, crear una submarca ni simular un cuaderno físico con anillas, papel arrugado o anotaciones decorativas.

La pieza distintiva será una muestra navegable del trabajo del método. La fotografía documental, la tipografía y la composición le darán carácter. La originalidad debe surgir de decisiones específicas sobre INTEGRA y del material propio de Pablo.

Objetivo comercial: ayudar a una persona que dirige una PyME a comprender la propuesta, evaluar si puede participar y reservar un diagnóstico con expectativas correctas.

Hipótesis de audiencia: dirección, dueños y referentes de PyMEs no técnicas, con distintos niveles de uso de IA. Es una hipótesis de diseño derivada del contenido actual; no se consultaron analíticas ni entrevistaron clientes en esta revisión.

## 2. Fuentes y límites

Se leyeron la revisión aportada por Pablo, sus cuatro capturas enlazadas y el código local de ambas versiones. También se revisaron los tokens de marca, los componentes compartidos, la autoevaluación y la configuración del sitemap.

Hay una diferencia temporal importante: las capturas muestran “Tu PyME ya paga por IA. Todavía no cobró nada a cambio”. El contenido local actual dice “El resultado no es usar IA. Es saber qué hacer con ella”. Las observaciones sobre ese titular anterior pertenecen a las capturas, no al estado local actual.

No se hizo una nueva auditoría de navegación en vivo, medición de conversiones, prueba de agenda ni ensayo de rendimiento. Los requisitos técnicos de este documento son objetivos por verificar.

| Evidencia | Lectura útil | Consecuencia en la propuesta |
| --- | --- | --- |
| Captura de portada de la revisión | Fotografía oscurecida y superposición de recursos visuales | Foto con protagonismo propio; reducir capas decorativas |
| Captura del método | Tarjetas similares, recorrido vertical largo y contenido atenuado durante aparición | Estructura compacta y contenido visible sin esperar animaciones |
| Captura del portal | Captura rodeada de mucho marco y texto | Mostrar un recorte legible y permitir ampliar la imagen real |
| Captura de testimonios | Muro de comentarios con movimiento y abundancia de elementos | Selección estática, contexto y atribución |
| `src/data/integra2.ts` | Se puntúa la cantidad de suscripciones y se extraen conclusiones no demostradas | Reescribir la autoevaluación como orientación por respuestas |
| `src/pages/programa-integra-2/index.astro` | Reutiliza hero, portal, autoridad y FAQ de la versión actual | Aislar los cambios visuales y editoriales de la alternativa |
| `astro.config.mjs` | La lista explícita de exclusiones del sitemap no incluye la ruta alternativa | Comprobar y excluir la alternativa en el futuro build de publicación |

Referencias visuales aportadas:

- [Portada](C:/Users/Usuario/Documents/Codex/2026-09-28/esta-es-una-p-gina-web/outputs/01-integra-2-portada.png).
- [Método](C:/Users/Usuario/Documents/Codex/2026-09-28/esta-es-una-p-gina-web/outputs/02-integra-2-metodo.png).
- [Portal](C:/Users/Usuario/Documents/Codex/2026-09-28/esta-es-una-p-gina-web/outputs/03-integra-2-portal.png).
- [Testimonios](C:/Users/Usuario/Documents/Codex/2026-09-28/esta-es-una-p-gina-web/outputs/04-integra-2-testimonios.png).

## 3. Direcciones consideradas

| Dirección | Fortaleza | Costo o limitación | Decisión |
| --- | --- | --- | --- |
| Cuaderno de decisiones | Permite experimentar el criterio de INTEGRA, mostrar materiales y construir identidad propia | Exige editar un ejemplo con cuidado | Recomendada |
| Reportaje sobre Pablo y sus clientes | Cercanía, confianza y protagonismo de fotografías y voces reales | Depende de casos documentados; puede explicar poco el método | Usar su tratamiento fotográfico como apoyo |
| Experiencia inmersiva con escenas animadas al desplazarse | Impacto visual inmediato | Mayor carga, mantenimiento y riesgo de distraer del servicio | Fuera del alcance inicial |

La propuesta combina el primer enfoque con fotografía documental del segundo. No necesita nuevas funciones de IA ni una experiencia 3D.

## 4. Promesa y límites de la oferta

Promesa de trabajo: durante 60 días, acompañar a la empresa para desarrollar una forma de identificar oportunidades de IA, priorizarlas, hacer pruebas acotadas y decidir con evidencia.

Hacer visible lo que queda: responsables, criterios compartidos, oportunidades priorizadas, registros de pruebas y un próximo ciclo definido. Presentar estos elementos como resultados del trabajo conjunto, condicionado a la participación acordada.

Reglas obligatorias:

- La empresa participa y ejecuta las pruebas; INTEGRA aporta método, formación, acompañamiento y revisión.
- El desarrollo de automatizaciones e integraciones técnicas se cotiza aparte, según el alcance actual documentado.
- No prometer ahorro económico, retorno, cantidad fija de implementaciones ni autonomía garantizada al día 60.
- Sustituir “queda andando sin nosotros” por una descripción comprobable: responsables, próximos pasos y dinámica de continuidad definidos.
- Mantener RADAR Usuarios al inicio del trabajo. Explicar después la detección de tareas, su validación y la selección de oportunidades. La narrativa comercial no debe alterar el método.
- No convertir el diagnóstico comercial ni la autoevaluación pública en el RADAR operativo del programa.
- Mantener los 60 días y la modalidad actualmente publicados como base del borrador. Revisar antes de publicar la carga horaria, el acceso al portal, el alcance y la vigencia de credenciales.

La prioridad de RADAR también recupera una decisión previa de Pablo; el detalle operativo final debe contrastarse con los materiales vigentes del programa.

## 5. Recorrido del visitante

Tres recorridos deben funcionar sin obligar a completar actividades:

1. **Quiere hablar:** portada → agenda → reserva confirmada por el proveedor.
2. **Necesita entender:** portada → ejemplo de decisión → programa y dedicación → evidencia → agenda.
3. **Todavía no sabe dónde está:** enlace a autoevaluación → orientación útil → agenda opcional.

La navegación propia de la alternativa tendrá enlaces a “Cómo trabajamos”, “El programa”, “Preguntas” y el CTA de agenda. Mantener acceso a la marca Pablo Brunet sin modificar la navegación compartida de producción.

No bloquear información, ejemplo, materiales de muestra o resultado de autoevaluación detrás de un correo electrónico.

## 6. Arquitectura de información: ocho bloques

### 6.1 Portada — entender la propuesta

Pregunta del usuario: “¿Qué es esto y para qué me serviría?”.

Copy inicial propuesto:

> **La próxima decisión sobre IA, con evidencia de tu empresa.**
>
> En 60 días, acompañamos a tu equipo para elegir qué vale la pena probar, hacerlo sobre tareas reales y decidir cómo seguir. Con responsables, formación y criterios compartidos.

Identificación visible: Programa INTEGRA · Para PyMEs. Dato secundario: 60 días · encuentros remotos · trabajo sobre tareas de la empresa.

CTA principal: **Agendar Consultoría Estratégica Gratuita**. Aclaración: 30 minutos por videollamada. Enlace secundario: **Ver cómo trabajamos**, dirigido al ejemplo. La autoevaluación tendrá un enlace textual discreto, sin competir como tercer botón.

Composición de escritorio: texto sobre fondo claro en aproximadamente siete columnas; fotografía real en cinco columnas. La imagen debe mostrar personas y contexto de trabajo con luz legible. Pie de foto factual; no llamar “sesión del programa” a una charla general.

Composición móvil: identificación, titular, explicación, CTA y fotografía, en ese orden. Evitar fijar una altura de una pantalla que recorte contenido. El CTA debe aparecer antes de la foto.

Criterio de aceptación: alguien ajeno a INTEGRA puede explicar qué se ofrece, para quién y cuál es el siguiente paso después de una lectura breve.

### 6.2 Una decisión por dentro — la pieza distintiva

Pregunta: “¿Qué hacen concretamente?”.

Título propuesto: **Así se toma una decisión en INTEGRA.**

Presentar una sola tarea y seguirla de principio a fin. El usuario explora cuatro momentos: tarea, prueba, observación y decisión. Mostrar un resumen completo desde el inicio; la interacción amplía el detalle.

Ejemplo editorial propuesto, rotulado siempre **“Ejemplo ilustrativo. No corresponde a un resultado de cliente”**:

| Momento | Contenido de la muestra |
| --- | --- |
| Tarea | Preparar el borrador de una propuesta comercial usando un brief y condiciones aprobadas |
| Prueba | Comparar el procedimiento habitual con un borrador asistido; revisar tiempo total, correcciones y exactitud |
| Observación ficticia | El borrador ayuda a organizar el texto, pero introduce una condición comercial que no aparece en la fuente |
| Decisión ilustrativa | Ajustar la prueba: restringir las fuentes y mantener revisión humana de condiciones antes del envío |

Incluir explícitamente responsable de la revisión, criterio de aceptación y siguiente paso. La decisión “ajustar” muestra el valor del método sin obligar a que toda prueba termine en adopción.

Requisitos de interacción:

- Una sola muestra en la primera versión; sin selector de industrias ni personalización ficticia.
- Cuatro controles claramente etiquetados; sin avance automático ni dependencia del scroll.
- En escritorio, índice a la izquierda y detalle a la derecha. En móvil, cuatro desplegables verticales con contenido equivalente.
- El resumen y la conclusión son legibles sin hacer clic.
- Contenido disponible sin JavaScript. La mejora interactiva no debe eliminarlo ni duplicarlo para lectores de pantalla.
- Sin llamada a modelos de IA, carga de documentos del visitante o persistencia remota.
- La ficha es una explicación editorial del método; no simula una pantalla del portal que todavía no existe.
- Transiciones opcionales de 150–200 ms, sin movimiento al activar la preferencia de movimiento reducido.

Si aparece un caso real documentado y autorizado, reemplazar la muestra completa con su evidencia. No mezclar observaciones ficticias y cifras reales en la misma ficha.

### 6.3 El programa — recorrido y dedicación

Pregunta: “¿Cómo sucede esto durante los 60 días y qué nos pide?”.

Conservar cuatro tramos comerciales, visibles simultáneamente, con una frase de actividad y un entregable por tramo. Evitar representar el día exacto del programa mediante la posición del scroll.

| Tramo de lectura | Trabajo | Evidencia o entregable |
| --- | --- | --- |
| Punto de partida | RADAR, contexto, herramientas, personas y tareas | Mapa inicial y responsables |
| Prioridades y diseño | Validar tareas, priorizar y acotar pruebas | Oportunidades ordenadas y fichas de prueba |
| Pruebas aplicadas | Trabajar sobre tareas reales y revisar | Registro de observaciones y correcciones |
| Decisión y continuidad | Adoptar, ajustar o descartar; acordar próximos pasos | Decisiones documentadas y próximo ciclo |

Usar los hitos 15, 30, 45 y 60 como referencias del recorrido. Evitar rangos solapados o apariencia de fechas rígidas si la operación se adapta a cada empresa.

Recuperar el nombre del método mediante una correspondencia secundaria y accesible: I Identificar; N Negociar prioridades; T Transformar; E Ejecutar; G Gestionar; R Rentabilizar; A Acelerar. Mantener G como actividad transversal. No presentar siete etapas consecutivas diferentes de los cuatro tramos comerciales.

Debajo, una tabla compacta de dedicación por rol. El contenido local indica aproximadamente 1,5 horas semanales por participante, 3–4 horas para el referente y 1 hora quincenal para dirección. Presentar estas cifras como estimadas; verificar si incluyen el encuentro y las tareas aplicadas antes de convertirlas en copy definitivo. No sumarlas ni reinterpretarlas por cuenta propia.

### 6.4 Materiales que se usan — evidencia tangible

Pregunta: “¿Con qué vamos a trabajar?”.

Mostrar una captura real del portal, grande y legible, y una muestra del registro de trabajo cuando exista un archivo verificable. Conectar cada pieza con una acción: ver el recurso necesario, preparar la prueba, registrar observaciones o decidir.

Requisitos:

- Ampliación accesible de la captura con cierre por teclado y devolución de foco.
- Recortes que preserven el contexto; pie que diga qué pantalla se está viendo.
- No presentar una captura pequeña dentro de múltiples marcos de navegador.
- No adjudicar al portal funciones que solo existen en otro recurso o que no fueron verificadas.
- Si falta un entregable real publicable, usar una muestra editorial claramente identificada o mostrar únicamente el portal disponible.
- Revisar datos personales y permisos de exposición de materiales de clientes.

### 6.5 Encaje y alcance — evaluar si sirve

Pregunta: “¿Mi empresa puede aprovecharlo?”.

Presentar condiciones concretas: un referente con tiempo asignado, participación de dirección en las decisiones y disposición para revisar tareas reales. Explicar el lugar de la formación para personas con niveles distintos.

Una columna breve de alcance debe aclarar el desarrollo técnico aparte y el carácter conjunto del trabajo. Este límite comercial ayuda a que lleguen consultas adecuadas y no debe quedar escondido únicamente en preguntas frecuentes.

Precio: mantener la explicación vigente de cotización según participantes mientras Pablo no defina una política diferente. No inventar valores, descuentos o rangos.

### 6.6 Quién acompaña y qué pueden respaldar otros

Pregunta: “¿Por qué confiar en Pablo?”.

Fotografía real, presentación de 80–110 palabras y un testimonio principal con contexto verificable. Seleccionar hasta seis logos pertinentes y, si aportan información distinta, hasta dos comentarios adicionales estáticos.

El testimonio de Miguel figura en el código, pero esta revisión no verifica su procedencia ni autorización. Antes de presentarlo como evidencia del programa, confirmar a qué servicio corresponde, el texto autorizado y la atribución. Si no se confirma, omitirlo del bloque de resultados; no completar una identidad a partir de iniciales.

Separar conceptualmente testimonios del programa, referencias de consultoría y comentarios sobre charlas. Los logos deben tener una descripción fiel de la relación. Conservar credenciales solo con su denominación exacta y vigente; no ampliar su significado.

No usar cinta infinita de testimonios, estrellas sin fuente, números de clientes inventados o frases rotatorias.

### 6.7 Preguntas para decidir

Pregunta: “¿Qué me falta saber antes de conversar?”.

Cinco o seis desplegables nativos, con respuestas breves: diferencias con una capacitación, dedicación y roles, desarrollo técnico, resultado de una prueba que se descarta, modalidad y acceso, precio.

Las condiciones indispensables ya deben estar explicadas en el recorrido principal. Las preguntas amplían; no contienen información que contradiga o limite silenciosamente la portada.

### 6.8 Próximo paso — agenda y orientación opcional

Pregunta: “¿Qué hago ahora?”.

Agenda directa con el nombre consistente **Consultoría Estratégica Gratuita**, duración, modalidad y una descripción concreta: revisar el punto de partida y conversar sobre prioridades y encaje del programa.

La autoevaluación vive en un subbloque opcional identificable por ancla. El enlace desde la portada debe llevar directamente a ella; el botón de agenda debe llegar al calendario sin obligar a pasar por el cuestionario.

No añadir presión mediante cuentas regresivas o escasez genérica. Mostrar disponibilidad real a través de la agenda.

## 7. Sistema visual

### 7.1 Marca y color

Usar la paleta azul definida en `src/styles/integra.css`, que el proyecto identifica como fuente de verdad para INTEGRA:

| Uso | Color |
| --- | --- |
| Texto principal y bloque de cierre | Marino `#0D1B3D` |
| CTA y estados activos | Azul `#1E5CF2` |
| Apoyo gráfico | Denim `#3B6CB7` |
| Apoyo sobre oscuro | Celeste `#A9C8F5` |
| Superficie secundaria | Neblina `#DCE6F6` |
| Fondo de lectura | Blanco y `#F4F6FA` |

Predominio claro, azul intenso reservado a acciones y selecciones, y un único bloque oscuro de cierre. Verificar cada combinación de texto y fondo. No trasladar automáticamente el verde de la marca personal al programa.

### 7.2 Tipografía y composición

Mantener inicialmente **Sora** y **DM Sans**, ya presentes. Sora en titulares con peso 600–700; DM Sans en lectura. La diferenciación vendrá de escala, edición y ritmo, sin introducir otra tipografía por inercia.

- Ancho máximo de contenido: 1160 px, consistente con el proyecto.
- Grilla de escritorio: 12 columnas; separaciones de 24–32 px.
- H1 propuesto: 52–64 px en escritorio y 34–40 px en móvil, con adaptación fluida. Ajustar por legibilidad y longitud real, no por forzar saltos.
- Texto: 18 px en escritorio y 17 px en móvil; interlineado de aproximadamente 1,55–1,65.
- Columna de lectura: aproximadamente 55–70 caracteres.
- Separación vertical orientativa: 80–104 px en escritorio y 48–64 px en móvil.
- Margen lateral móvil: 20–24 px, reducido si el ancho útil lo requiere.
- Alineación a la izquierda en las secciones narrativas. Evitar repetir título centrado + subtítulo + tres tarjetas.
- Usar filetes, márgenes y jerarquía tipográfica para agrupar información; reservar contenedores para fichas o funciones que necesitan límites.
- Radios de 6–10 px en controles; fotografías y documentos con esquinas discretas. Sombra únicamente cuando explica elevación, como en una ampliación.

La portada, la ficha de decisión, el recorrido del programa y la fotografía deben tener composiciones diferentes y reconocibles. No convertir cada bloque en una grilla de tarjetas intercambiables.

### 7.3 Fotografía y recursos

Priorizar las fotos propias disponibles en `src/assets/hero/integra1.jpg` y `public/images/servicios/estrategia-tarjeta.jpg`, tras verificar qué encuentro muestran y elegir su recorte.

Tratamiento: luz natural, personas reconocibles, contexto visible y pie factual. No usar un filtro azul tan intenso que borre el trabajo. No generar fotografías de clientes, equipos, encuentros o testimonios con IA.

La marca INTEGRA puede funcionar como firma de las fichas y los registros. Reutilizar el activo original. Evitar convertir su símbolo en un circuito decorativo o una ilustración tecnológica genérica.

### 7.4 Movimiento

Sin carruseles automáticos, parallax, scroll controlado por código, cifras que cuentan desde cero, halos en movimiento o textos que tardan en aparecer. El movimiento se limita a comunicar respuesta a una acción del usuario. Todo contenido principal aparece legible en el render inicial.

## 8. Edición del lenguaje

Voz: español rioplatense, claro y profesional. Voseo consistente. Pablo habla en primera persona al presentarse; el trabajo conjunto se describe con sujeto explícito.

Cada bloque debe aportar una respuesta nueva. Evitar repetir en secciones separadas “problema”, “costo”, “hoy versus día 60” y “qué queda” con las mismas ideas.

| Evitar | Forma propuesta |
| --- | --- |
| “Herramientas usadas al 10%” sin registro | “Suscripciones cuya utilización no se revisa” |
| “Tu empresa está por delante de la mayoría” | Describir las respuestas concretas del visitante |
| “Es el factor que mejor predice…” sin estudio | “Sin una persona a cargo, conviene definir quién dará seguimiento” |
| “Queda andando sin nosotros” como garantía | “Definimos responsables y próximos pasos para continuar” |
| “Desbloqueá todo el potencial de la IA” | Nombrar la tarea o decisión que se trabaja |
| “No es X, es Y” en cada sección | Explicar directamente qué hace INTEGRA |

Presupuesto editorial orientativo: 900–1200 palabras visibles del recorrido principal, excluyendo respuestas desplegadas, detalle del ejemplo, cuestionario y calendario. Ajustarlo para mantener claridad, sin eliminar límites de alcance. La altura en píxeles no es un criterio independiente de calidad.

Todo texto debe seguir siendo seleccionable y editable. No rasterizar titulares, condiciones, resultados o llamadas a la acción.

## 9. Autoevaluación: utilidad y credibilidad

El código actual convierte cinco dimensiones en un puntaje y usa la cantidad de suscripciones como señal de madurez. También contiene afirmaciones comparativas y predictivas que las respuestas no permiten sostener. El rediseño debe corregir la lógica, además del aspecto.

Propuesta: conservar seis preguntas breves, sin puntaje global ni clasificación “Con método”.

| Pregunta | Información que aporta |
| --- | --- |
| Tamaño del equipo, con rangos sin solapamiento | Contexto; nunca suma o resta mérito |
| Cómo se usa IA hoy | Ausencia, iniciativas individuales o coordinación |
| Si se sabe qué herramientas se pagan y para qué | Visibilidad del inventario; no castigar cantidad de licencias |
| Si existe una tarea priorizada con criterio explícito | Claridad del siguiente trabajo |
| Si hay responsable y tiempo asignado | Condiciones de seguimiento |
| Cómo se revisan resultados y se decide continuar | Evidencia, controles y cierre de pruebas |

Rangos de tamaño propuestos: 1–9, 10–29, 30–79, 80–149, 150 o más. Incorporar “No sé” o “Todavía no aplica” donde tenga sentido. No inferir mala gestión de una empresa que todavía no usa IA.

Resultado: “Según tus respuestas, estos son los próximos puntos que podrías revisar”. Mostrar hasta tres observaciones, cada una vinculada a la respuesta que la origina, con un paso concreto. Prioridad editorial: revisión y controles cuando ya hay uso; responsable; elección de tarea; inventario; documentación de continuidad. Si todavía no hay uso, comenzar por una tarea acotada y una persona responsable, sin atribuir pérdidas.

No interpretar un dato desconocido como una carencia confirmada. Si no aparecen brechas en las respuestas, reconocerlo y sugerir revisar evidencia de una prueba reciente. No forzar una necesidad de contratación.

Estados obligatorios: inicio, pregunta, respuesta seleccionada, retroceso, finalización, resultado, edición y reinicio. Seleccionar no avanza automáticamente. Usar radios con etiquetas, progreso textual y botón Continuar.

Procesamiento local por defecto; sin guardar respuestas en un servidor ni enviarlas a analítica. Si se ofrece compartir por WhatsApp, mostrar antes el resumen que saldrá del sitio y abrir un mensaje preparado que el usuario puede editar y enviar. El botón no equivale a un mensaje enviado.

“Sin registro” puede describir el cuestionario. No extender esa frase a toda la página si la agenda o terceros procesan datos.

## 10. Móvil y accesibilidad

Objetivo de implementación: WCAG 2.2 AA, con revisión manual de los recorridos. Contraste de al menos 4,5:1 para texto normal y 3:1 para texto grande; verificar también contraste de controles y foco. Lectura sin pérdida a 320 CSS px y funcionamiento con zoom de texto. Referencia: [W3C, WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/).

Decisiones del proyecto:

- Probar 390 px como referencia móvil y ampliar a 320, 768, 1024 y 1440 px.
- Área táctil propuesta de al menos 44 × 44 px para controles principales; es una elección de comodidad del proyecto.
- Orden de foco coherente, enlace para saltar al contenido y foco visible sin quedar tapado.
- Una jerarquía semántica de títulos y etiquetas comprensibles.
- No depender de hover, color, arrastre o animaciones para comprender o completar una acción.
- Respetar movimiento reducido y mantener el contenido visible cuando falla JavaScript.
- Desactivar para esta alternativa el WhatsApp flotante en móvil; mantener contacto en el flujo. Ningún elemento fijo debe tapar textos, opciones, errores o controles del calendario.
- No agregar una barra inferior fija en la primera versión; el CTA del encabezado y los puntos de decisión deben bastar.
- Modales con cierre, Escape, control de foco y regreso al elemento que los abrió.
- En el cuestionario, anunciar cambios de pregunta y resultado de forma accesible sin leer todo repetidamente.

Una revisión automatizada sin errores no demuestra conformidad completa. El widget externo debe inspeccionarse por separado y contar con una vía alternativa de contacto si impide completar la reserva.

## 11. Rendimiento y comportamiento de agenda

Objetivos de experiencia real: LCP ≤ 2,5 s, INP ≤ 200 ms y CLS ≤ 0,1 en percentil 75, distinguiendo móvil y escritorio. Son los umbrales publicados por [Google, Web Vitals](https://web.dev/articles/vitals). No afirmar que se cumplieron con una única prueba local.

Presupuestos iniciales propios del proyecto, revisables con evidencia:

- JavaScript propio de la landing: hasta 50 KB comprimidos, excluido el proveedor de agenda; registrar aparte el costo del tercero.
- Imagen principal móvil: objetivo de hasta 180 KB transferidos, ajustando formato y tamaño sin degradar rostros.
- Recursos iniciales: objetivo de hasta 800 KB transferidos antes del calendario y ampliaciones, contando fuentes, estilos e imágenes iniciales.
- Mantener Astro y la generación estática. No migrar de framework ni sumar un framework cliente para resolver esta página.

Cargar fotos con tamaños adaptados y dimensiones reservadas. Priorizar la imagen de portada si es el elemento LCP; diferir las imágenes inferiores. Reutilizar la tipografía actual sin duplicar descargas.

La agenda actual ya intenta cargarse cuando su sección se aproxima. Conservar esa idea, reservar su espacio y verificar que el salto desde el CTA active la carga sin exigir otro clic.

Estados: carga, disponibilidad del widget y alternativa persistente de reserva/contacto. Un evento `load` del iframe no demuestra disponibilidad ni reserva. Ante espera prolongada, habilitar reintento y enlace externo real al mismo calendario; el contacto alternativo debe seguir visible.

No cambiar identificadores del calendario, destinos de WhatsApp, formularios del proveedor ni automatizaciones como parte del rediseño visual. Si una dependencia impide el flujo, documentar el problema y su alcance específico.

## 12. Analítica y evaluación comercial

Métrica principal propuesta: reuniones confirmadas que cumplen condiciones básicas de encaje, divididas por sesiones de la landing dentro del mismo período y reglas de atribución. La calificación depende del proceso comercial; no inferirla de un clic.

Medir como señales secundarias: CTA de agenda, apertura del ejemplo, inicio y finalización de autoevaluación, clic en contacto y avance a la agenda. No llamar “conversión” a cada interacción.

Contrato de eventos propuesto:

| Evento | Momento | Datos admitidos |
| --- | --- | --- |
| `integra_agenda_click` | Clic en agenda | Versión y ubicación del CTA |
| `integra_example_open` | Apertura voluntaria de un detalle | Versión e identificador de paso |
| `integra_assessment_start` | Inicio del cuestionario | Versión |
| `integra_assessment_complete` | Resultado mostrado | Versión; sin respuestas ni clasificación |
| `integra_contact_click` | Apertura de contacto | Versión y ubicación |
| `integra_booking_confirmed` | Confirmación verificada del proveedor | Identificador técnico no sensible para deduplicar, si la integración lo permite |

Reutilizar el sistema analítico existente si existe y es adecuado. No sumar proveedores por defecto. La confirmación requiere una señal fiable del sistema de reservas; visitar manualmente una página de gracias no basta. Si esa integración no está disponible, reportar clics y reconciliar reservas, dejando explícita la limitación.

No fijar un porcentaje arbitrario de mejora ni declarar ganadora una versión por pocas visitas. Primero registrar volumen y calidad actuales; luego acordar una comparación con tráfico equivalente. En tráfico bajo, priorizar observación cualitativa y evidencia comercial.

## 13. Límites técnicos para SOL

Ámbito principal de implementación futura:

- `src/pages/programa-integra-2/index.astro`.
- `src/data/integra2.ts`.
- `src/components/integra2/`.
- Un archivo de estilo específico de la alternativa si resulta útil, con alcance inequívoco.

El proyecto contiene cambios locales previos al documento. Antes de editar, registrar el estado y conservarlos. No restaurar, sobrescribir ni incluirlos accidentalmente en una entrega.

Los componentes compartidos son una dependencia real: la versión alternativa importa el hero, portal, autoridad y FAQ actuales. Para cambiarlos, crear componentes propios o variantes por props con valores predeterminados que conserven el comportamiento anterior. Evitar duplicar servicios, datos de contacto o configuraciones de calendario innecesariamente.

Mantener copy separado de presentación. La muestra debe declarar su naturaleza ilustrativa en sus datos y en el render. Las reglas de autoevaluación deben poder verificarse como lógica independiente del DOM.

No agregar backend, base de datos, autenticación, chatbot, generador de propuestas, API de IA, cotizador ni integración nueva con CRM. Es una landing con una muestra editorial y una autoevaluación local.

Durante la comparación: conservar `noindex` en la alternativa y verificar que el sitemap generado la excluya. `noindex` no controla acceso y no reemplaza la exclusión del sitemap. Un ajuste acotado en `astro.config.mjs` puede ser necesario al implementar.

La promoción a producción debe ser una tarea posterior explícita: decidir URL final, indexación y metadatos, revisar destinos de conversión y hacer comprobaciones del resultado publicado. Estas especificaciones no autorizan reemplazar la landing vigente.

## 14. Activos y decisiones pendientes, con salida prevista

| Elemento | Estado observado | Resolución prevista |
| --- | --- | --- |
| Logo y paleta | Existen en el proyecto | Reutilizar |
| Sora y DM Sans | Ya se cargan | Mantener |
| Fotos de trabajo | Existen dos candidatas | Revisar contexto y recorte |
| Captura del portal | Existe | Revisar vigencia, legibilidad y datos expuestos |
| Caso con resultados documentados | No verificado en esta revisión | Usar ejemplo ilustrativo; no inventar caso |
| Testimonio de Miguel | Texto presente en el código | Confirmar servicio, atribución y permiso; omitir si no se confirma |
| Dedicación y alcance | Cifras y condiciones presentes en el código | Base provisional; validar antes de publicar |
| Credenciales | Presentes en el contenido | Verificar vigencia y denominación antes de publicar |
| Precio | Se conversa según participantes | Mantener ese criterio, sin inventar un importe |
| Conversión actual | Sin datos revisados | Instrumentar o consultar registros antes de comparar |

Estos pendientes no impiden producir la composición local: cada uno tiene un reemplazo explícito. Impiden presentar como verificado lo que todavía no tiene respaldo.

## 15. Prioridades y condiciones de aceptación

### P0 — esencia y credibilidad

1. Portada comprensible con una sola idea dominante y CTA claro.
2. Ejemplo completo de tarea, prueba, observación y decisión, identificado según su fuente.
3. Secuencia fiel al método, con RADAR al inicio y roles visibles.
4. Oferta y límites consistentes en toda la página.
5. Corrección de inferencias y puntuación de autoevaluación.
6. Aislamiento respecto de la landing vigente.

### P1 — experiencia lista para revisión

7. Ocho bloques con funciones distintas y sin repetición sustancial.
8. Composición móvil completa, sin superposiciones ni desplazamiento horizontal de página.
9. Agenda y contacto con estados de espera y recuperación.
10. Selección de pruebas, fotos y testimonios con atribución.
11. Accesibilidad y rendimiento verificados dentro del alcance disponible.
12. Eventos de medición con significado correcto.

### P2 — mejora posterior basada en evidencia

13. Sustituir la muestra por un caso real cuando exista material autorizado.
14. Ajustar jerarquías y copy con observaciones de usuarios y consultas comerciales.
15. Comparar versiones cuando el volumen permita una conclusión defendible.

Antes de considerar terminada la implementación local:

- Ejecutar el build y revisar la salida, enlaces, anclas, assets, `noindex` y sitemap.
- Comparar la landing vigente y páginas compartidas con su estado previo; documentar cualquier cambio intencional.
- Inspeccionar capturas de portada, ejemplo y agenda a 390 y 1440 px; revisar además los otros anchos indicados.
- Recorrer menú, ejemplo, ampliación, cuestionario y contacto con teclado.
- Probar cuestionario con ausencia de uso, uso coordinado, respuestas desconocidas, retroceso y edición; evitar conclusiones contradictorias.
- Comprobar página sin JavaScript y con movimiento reducido.
- Simular calendario lento o bloqueado; comprobar vía alternativa.
- Reservas: inspeccionar el flujo sin crear una cita real durante QA salvo autorización específica o entorno de prueba.
- Medir carga local bajo condiciones documentadas; distinguir laboratorio de datos de campo.
- Hacer una prueba formativa propuesta con cinco personas cercanas al perfil comprador: pedir que expliquen oferta, dedicación, alcance y próximo paso. Como umbral interno, al menos cuatro deberían poder explicarlos sin ayuda; es un criterio de diseño, no una estadística de conversión.

Entregables de SOL: vista local funcional, capturas de referencia móvil y escritorio, lista de archivos modificados, evidencia de verificación y pendientes de publicación. La evaluación estética debe hacerse sobre estas vistas concretas.

## 16. Instrucción de arranque para SOL

> Usá este documento como especificación de producto, diseño y aceptación para Programa INTEGRA 2. Primero inspeccioná el estado actual del repositorio y preservá los cambios existentes. Trabajá en la ruta alternativa, manteniendo aislada la landing vigente. Desarrollá primero portada, ejemplo de decisión y recorrido del programa como una muestra coherente en escritorio y móvil. Usá la paleta azul, Sora, DM Sans y activos propios; hacé visibles la actividad y el criterio de INTEGRA. El ejemplo debe estar claramente identificado como ilustrativo mientras no exista un caso real verificado. Completá luego el recorrido y los estados funcionales definidos. No agregues funciones fuera de alcance ni publiques. Entregá una vista local revisable y evidencia de los criterios comprobados. Si el código cambió desde esta especificación, documentá las diferencias antes de adaptar la solución.

El documento funciona como brief e instrucciones de contexto para SOL; no requiere entrenar un modelo.
