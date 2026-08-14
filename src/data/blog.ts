/* =====================================================================
   BLOG / INSIGHTS — /blog y /blog/[slug]
   ---------------------------------------------------------------------
   El `cuerpo` de cada artículo es una lista de bloques que renderiza
   <Prose />. Tipos disponibles:

     parrafo   → texto; admite **negrita** y [enlaces](https://…)
     subtitulo → h2 dentro del artículo
     lista     → viñetas
     cita      → frase destacada
     dato      → cifra grande + explicación (para un número que pega fuerte)
     tabla     → columnas + filas + fuente
     grafico   → barras horizontales comparables (una sola unidad)
     apilado   → una barra 100% partida en tres (parte-sobre-el-todo)
     fuentes   → listado de links al pie del artículo

   Todas las cifras citadas acá salen de informes públicos y están
   enlazadas a su fuente. Si actualizás un número, actualizá también el
   bloque `fuentes`.
   ===================================================================== */

export interface Barra {
  label: string;
  valor: number; // define el largo de la barra
  texto?: string; // qué se imprime en la punta (por defecto, el valor)
  tono?: "neutro"; // gris pizarra en lugar del verde de marca
}

export type Bloque =
  | { tipo: "parrafo"; texto: string }
  | { tipo: "subtitulo"; texto: string }
  | { tipo: "lista"; items: string[] }
  | { tipo: "cita"; texto: string }
  | { tipo: "dato"; valor: string; texto: string }
  | { tipo: "tabla"; titulo?: string; columnas: string[]; filas: string[][]; fuente?: string }
  | {
      tipo: "grafico";
      titulo: string;
      bajada?: string;
      barras: Barra[];
      nota?: string;
      fuente?: string;
    }
  | {
      tipo: "apilado";
      titulo: string;
      bajada?: string;
      partes: { label: string; valor: number }[];
      nota?: string;
      fuente?: string;
    }
  | { tipo: "fuentes"; items: { label: string; url: string }[] };

export interface Post {
  slug: string;
  titulo: string;
  categoria: string;
  fecha: string; // formato ISO
  fechaLabel: string; // cómo se muestra
  lectura: string;
  resumen: string;
  img: string;
  imgLabel: string;
  cuerpo: Bloque[];
}

export const blogMeta = {
  eyebrow: "Blog · Insights",
  titulo: "Ideas sobre *IA aplicada*",
  subtitulo:
    "Datos, lecturas y aprendizajes sobre cómo la inteligencia artificial está cambiando el trabajo y los negocios.",
};

export const blog: Post[] = [
  /* =================================================================
     01 — AUDITAR LAS SUSCRIPCIONES DE IA
     ================================================================= */
  {
    slug: "auditar-suscripciones-de-ia-pyme",
    titulo: "Por qué tu PyME paga suscripciones de IA que no usa",
    categoria: "Costos",
    fecha: "2026-08-04",
    fechaLabel: "4 de agosto de 2026",
    lectura: "7 min de lectura",
    resumen:
      "Nadie decidió gastar eso. Se fue acumulando: una prueba acá, una licencia allá, un plan que se duplicó. Cómo hacer el inventario completo en una tarde y qué hacer con lo que aparece.",
    img: "/images/blog/01-suscripciones-ia-no-usadas.png",
    imgLabel: "/images/blog/01-suscripciones-ia-no-usadas.png",
    cuerpo: [
      {
        tipo: "parrafo",
        texto:
          "Hay un ejercicio que hago en la primera reunión con casi cualquier empresa y que nunca falla. Pido una lista de todas las herramientas de inteligencia artificial que la empresa paga hoy, con el monto mensual al lado. Nadie la tiene. En el mejor de los casos alguien dice «tenemos el ChatGPT», y en el peor —que es el más frecuente— tres personas distintas empiezan a acordarse en voz alta de cosas que contrataron.",
      },
      {
        tipo: "parrafo",
        texto:
          "No es desprolijidad. Es la consecuencia natural de cómo entró la IA a las PyMEs: por abajo, de a una persona por vez, con montos chicos que nunca activaron ninguna alarma.",
      },
      {
        tipo: "subtitulo",
        texto: "El gasto no está en el presupuesto de IA. Está repartido en cinco lugares",
      },
      {
        tipo: "parrafo",
        texto:
          "Una licencia de veinte dólares no pasa por ningún comité. La aprueba quien la necesita, se paga con la tarjeta que esté a mano y se rinde como gasto menor. El problema no es el primer cargo: es que ese cargo se repite todos los meses durante dos años sin que nadie vuelva a preguntarse si sigue haciendo falta.",
      },
      {
        tipo: "tabla",
        titulo: "Dónde suele esconderse el gasto en IA de una PyME",
        columnas: ["Dónde está", "Cómo entró", "Por qué no se ve"],
        filas: [
          [
            "Tarjeta personal de un empleado",
            "Alguien probó una herramienta para su trabajo y la siguió pagando",
            "Se reintegra como gasto menor, sin categoría propia",
          ],
          [
            "Tarjeta corporativa de un socio",
            "Se contrató en un momento de entusiasmo, después de una charla o un congreso",
            "El resumen lo mira contabilidad, no quien podría dar de baja",
          ],
          [
            "Dentro de un software que ya pagabas",
            "El proveedor sumó un módulo de IA con costo adicional por usuario",
            "Llega en la misma factura de siempre, con un total un poco más alto",
          ],
          [
            "Planes por asiento con asientos vacíos",
            "Se compraron diez licencias para un equipo de diez",
            "Se factura por asiento contratado, no por asiento usado",
          ],
          [
            "Herramientas de un proyecto que terminó",
            "Se contrató para una campaña, una migración o un piloto puntual",
            "El proyecto cerró, la suscripción no",
          ],
        ],
      },
      {
        tipo: "subtitulo",
        texto: "El inventario, en una tarde",
      },
      {
        tipo: "parrafo",
        texto:
          "No hace falta una herramienta de gestión de gastos ni un proyecto de tres semanas. Con estos cinco pasos, en una tarde tenés la foto completa:",
      },
      {
        tipo: "lista",
        items: [
          "**Extractos de los últimos 12 meses** de todas las tarjetas de la empresa. Buscá los cargos en dólares y los importes chicos que se repiten. Ahí está el 80 % de lo que no sabés que pagás.",
          "**Una pregunta a cada responsable de área**, formulada sin sospecha: «¿qué herramientas de IA usás o pagás para tu trabajo, aunque sean tuyas?». Si la pregunta suena a auditoría, la respuesta va a ser incompleta.",
          "**Las facturas de tus proveedores de software habituales**. Compará el importe de hoy contra el de hace un año: los módulos de IA se agregaron casi siempre sin que nadie los pidiera explícitamente.",
          "**La lista de accesos**. Por cada herramienta, quién tiene usuario y quién es el titular de la cuenta. Si el titular es alguien que ya no trabaja en la empresa, tenés un problema más grande que el gasto.",
          "**El detalle de asientos contratados contra asientos activos**. Casi todas las plataformas lo muestran en la pantalla de administración, y casi nadie la abre.",
        ],
      },
      {
        tipo: "subtitulo",
        texto: "Cuatro columnas convierten la lista en una decisión",
      },
      {
        tipo: "parrafo",
        texto:
          "Una lista de herramientas y precios no sirve para nada por sí sola. Lo que la vuelve accionable es cruzarla con el uso real. Cuatro columnas alcanzan:",
      },
      {
        tipo: "tabla",
        titulo: "La planilla mínima de auditoría",
        columnas: ["Columna", "Qué contestar", "Qué te dice"],
        filas: [
          [
            "Herramienta y costo anual",
            "El monto mensual multiplicado por doce, en pesos",
            "El número anual duele mucho más que el mensual, y es el que corresponde para decidir",
          ],
          [
            "Quién la pidió y para qué",
            "Nombre y el problema concreto que iba a resolver",
            "Si nadie se acuerda del problema original, la respuesta ya está",
          ],
          [
            "Cuántas personas la usaron en los últimos 30 días",
            "El número real, sacado del panel de administración",
            "Separa las herramientas vivas de las que solo generan débito",
          ],
          [
            "Qué pasa si la damos de baja mañana",
            "Una frase concreta: qué proceso se rompe y de quién es",
            "Si nadie puede completar esta celda, no hay nada que romper",
          ],
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "La cuarta columna es la más incómoda y la más útil. En la mayoría de las auditorías que acompañé, entre un tercio y la mitad de las herramientas se quedan con esa celda en blanco.",
      },
      {
        tipo: "cita",
        texto:
          "El problema de las PyMEs con la IA no es que gasten poco. Es que gastan sin haber decidido nada.",
      },
      {
        tipo: "subtitulo",
        texto: "Gastar no es lo mismo que adoptar",
      },
      {
        tipo: "parrafo",
        texto:
          "Vale la pena poner el hallazgo en contexto, porque el problema no es local. El estudio [The Widening AI Value Gap](https://media-publications.bcg.com/The-Widening-AI-Value-Gap-Sept-2025.pdf) de BCG, de septiembre de 2025, clasificó a las organizaciones del mundo según su capacidad de convertir la IA en resultados y encontró que la enorme mayoría todavía no lo logra.",
      },
      {
        tipo: "dato",
        valor: "60 %",
        texto:
          "de las organizaciones del mundo está en el grupo de las rezagadas: impacto mínimo en ingresos y costos, aun cuando ya están pagando por la tecnología.",
      },
      {
        tipo: "parrafo",
        texto:
          "Dicho de otro modo: la factura llega igual en todos los grupos. Lo que cambia entre uno y otro no es cuánto se contrató, sino si alguien decidió para qué.",
      },
      {
        tipo: "subtitulo",
        texto: "Qué hacer con lo que encontraste",
      },
      {
        tipo: "lista",
        items: [
          "**Dar de baja lo que nadie tocó en 60 días.** Sin reuniones ni comités. Si alguien la extraña, se vuelve a contratar en dos minutos, y esa es exactamente la prueba que necesitabas.",
          "**Consolidar en cuentas de empresa.** Las herramientas que sí se usan tienen que estar a nombre de la empresa, con facturación única y un administrador identificado. Además de ordenar el gasto, evita que el acceso se vaya con la persona.",
          "**Ajustar los asientos al uso real.** Casi todos los planes permiten bajar la cantidad de licencias en el ciclo siguiente. Es el ahorro más rápido de toda la auditoría.",
          "**Poner un dueño por herramienta.** Una persona responsable de decir, cada trimestre, si sigue o no. Sin dueño, todo sigue por defecto.",
          "**Agendar la próxima revisión.** Trimestral, con fecha en el calendario. Una auditoría que se hace una sola vez vuelve al punto de partida en un año.",
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "El resultado de este ejercicio, en las empresas que lo hicieron, casi nunca es el ahorro. Es el mapa. Por primera vez alguien puede mirar en una hoja qué usa la empresa, quién lo usa y para qué — que es la única base sólida sobre la que se puede decidir qué probar después.",
      },
      {
        tipo: "parrafo",
        texto:
          "Si al terminar la planilla te queda la sensación de que estás pagando bastante y decidiendo poco, ese es exactamente el punto de partida del [Método INTEGRA](/programa-integra): ordenar lo que ya hay antes de sumar una herramienta más.",
      },
      {
        tipo: "fuentes",
        items: [
          {
            label: "BCG — The Widening AI Value Gap, septiembre de 2025",
            url: "https://media-publications.bcg.com/The-Widening-AI-Value-Gap-Sept-2025.pdf",
          },
          {
            label: "McKinsey — The State of AI, 2025",
            url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
          },
        ],
      },
    ],
  },

  /* =================================================================
     02 — LA CAPACITACIÓN SOLA NO ALCANZA
     ================================================================= */
  {
    slug: "capacitacion-de-ia-no-alcanza",
    titulo: "Tu equipo usa ChatGPT pero nada cambió",
    categoria: "Adopción",
    fecha: "2026-07-31",
    fechaLabel: "31 de julio de 2026",
    lectura: "7 min de lectura",
    resumen:
      "Capacitaste a cuarenta personas, salieron entusiasmadas y tres meses después los indicadores son idénticos. No es que la capacitación esté mal: es que sola no alcanza. Qué le falta alrededor.",
    img: "/images/blog/02-chatgpt-y-nada-cambio.png",
    imgLabel: "/images/blog/02-chatgpt-y-nada-cambio.png",
    cuerpo: [
      {
        tipo: "parrafo",
        texto:
          "Doy capacitaciones de IA hace años, así que lo que voy a decir juega en contra de mi propio negocio: una capacitación sola, por buena que sea, casi nunca cambia los números de una empresa.",
      },
      {
        tipo: "parrafo",
        texto:
          "Lo aprendí de la peor manera. Una empresa mediana me contrató para formar a cuarenta personas. Las evaluaciones fueron excelentes, la gente salió entusiasmada, hubo aplausos. Tres meses después volví por otro tema y pregunté qué había cambiado. Silencio. Después alguien dijo: «usamos bastante el ChatGPT ahora». Los tiempos de respuesta al cliente eran los mismos, las horas de administración eran las mismas, los errores eran los mismos.",
      },
      {
        tipo: "subtitulo",
        texto: "El problema no es la capacitación. Es lo que pasa el lunes",
      },
      {
        tipo: "parrafo",
        texto:
          "El principio 10-20-70 de BCG, que ya usé [en otro artículo](https://www.bcg.com/publications/2025/closing-the-ai-impact-gap), explica bien por qué. El 70 % del valor de una iniciativa de IA sale de personas, procesos y cultura. Una capacitación trabaja sobre las personas — que es una parte real de ese 70 %, pero es una parte. Si el proceso no se toca, si nadie decide qué se hace distinto y si no hay quien sostenga el cambio, la formación queda flotando.",
      },
      {
        tipo: "tabla",
        titulo: "Lo que una capacitación deja y lo que no",
        columnas: ["Lo que sí entrega", "Lo que no puede entregar sola"],
        filas: [
          [
            "Criterio: qué sirve, qué no, dónde están los límites",
            "La decisión de qué proceso se rediseña",
          ],
          ["Habilidad concreta para usar las herramientas", "El tiempo protegido para aplicarla"],
          ["Lenguaje común dentro del equipo", "Un responsable que sostenga la aplicación"],
          ["Entusiasmo y permiso para probar", "Una línea de base contra la cual medir la mejora"],
          ["Ejemplos aplicados al negocio", "La cadencia de seguimiento que evita que se apague"],
        ],
      },
      {
        tipo: "subtitulo",
        texto: "Tres razones por las que el efecto se apaga",
      },
      {
        tipo: "lista",
        items: [
          "**No hay dónde aplicarlo.** La persona vuelve a un proceso que no cambió, con los mismos plazos y la misma carga. Aprender a redactar más rápido no sirve de nada si el cuello de botella estaba en la aprobación, no en la redacción.",
          "**Nadie decidió qué se hace distinto.** Sin una decisión explícita —«a partir de ahora los informes mensuales se arman así»—, cada persona improvisa su propio uso y el resultado no se acumula en ningún lado.",
          "**No hay quien lo sostenga.** Las primeras semanas hay energía. En la cuarta aparece una urgencia, y lo nuevo, que todavía cuesta un poco más, se abandona por lo conocido. Sin una revisión periódica no hay forma de detectarlo a tiempo.",
        ],
      },
      {
        tipo: "cita",
        texto:
          "Capacitar sin rediseñar el proceso es enseñarle a alguien a manejar y devolverlo al mismo colectivo de siempre.",
      },
      {
        tipo: "subtitulo",
        texto: "El test de las dos semanas",
      },
      {
        tipo: "parrafo",
        texto:
          "Hay una forma barata de saber si una capacitación va a dejar algo. A los catorce días, pedí que tres personas muestren **un entregable real de su trabajo hecho de otra manera**: un informe, una propuesta, una respuesta al cliente, un análisis. No una demostración, no un ejercicio del curso: algo que se usó de verdad.",
      },
      {
        tipo: "parrafo",
        texto:
          "Si aparecen los tres, la formación agarró y lo que falta es escalarla. Si no aparece ninguno, no perdiste el dinero de la capacitación: perdiste la ventana de las dos semanas, que es cuando todavía hay energía disponible para cambiar algo.",
      },
      {
        tipo: "subtitulo",
        texto: "Cómo se arma una formación que sí mueve la aguja",
      },
      {
        tipo: "tabla",
        titulo: "Los tres momentos que definen el resultado",
        columnas: ["Momento", "Qué hay que hacer", "Por qué"],
        filas: [
          [
            "Antes",
            "Elegir dos o tres procesos concretos sobre los que va a trabajar la formación y medir cómo están hoy",
            "Sin línea de base no hay forma de saber después si algo mejoró, y sin foco la capacitación se vuelve un panorama general",
          ],
          [
            "Durante",
            "Trabajar sobre material propio de la empresa, no sobre ejemplos genéricos",
            "El salto difícil no es aprender la herramienta, es traducirla al caso propio. Si eso no pasa en la sala, después no pasa",
          ],
          [
            "Después",
            "Compromisos de aplicación con nombre y fecha, y una revisión a los 30 días",
            "Es la diferencia entre un evento y un cambio. La revisión no controla: destraba lo que se atascó",
          ],
        ],
      },
      {
        tipo: "subtitulo",
        texto: "Y el que capacita primero es el que dirige",
      },
      {
        tipo: "parrafo",
        texto:
          "El [State of AI 2025 de McKinsey](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai) encontró que las organizaciones de alto desempeño en IA son tres veces más propensas que sus pares a afirmar que sus líderes senior demuestran compromiso real con las iniciativas — y aclara que ese compromiso incluye usar las herramientas ellos mismos, a la vista del equipo.",
      },
      {
        tipo: "parrafo",
        texto:
          "Es la parte que ninguna capacitación puede reemplazar. Si el equipo sale de la formación entusiasmado y vuelve a un lugar donde nadie que decide usa lo que se enseñó, la conclusión que saca no es «esto no sirve». Es algo peor: «esto no es prioridad».",
      },
      {
        tipo: "parrafo",
        texto:
          "Por eso, cuando me piden una capacitación, la primera pregunta que hago no es cuántas personas son ni cuántas horas quieren. Es qué proceso esperan que esté funcionando distinto dentro de dos meses. Si hay respuesta, la formación va a rendir. Si no la hay, lo que hace falta primero no es una [capacitación](/servicios/speaker-y-capacitador): es decidir.",
      },
      {
        tipo: "fuentes",
        items: [
          {
            label: "McKinsey — The State of AI, 2025",
            url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
          },
          {
            label: "BCG — From Potential to Profit: Closing the AI Impact Gap",
            url: "https://www.bcg.com/publications/2025/closing-the-ai-impact-gap",
          },
        ],
      },
    ],
  },

  /* =================================================================
     03 — LÍMITE DE TRABAJO EN CURSO
     ================================================================= */
  {
    slug: "limite-de-iniciativas-de-ia-en-curso",
    titulo: "Cinco iniciativas de IA abiertas y ninguna cierra",
    categoria: "Método",
    fecha: "2026-07-28",
    fechaLabel: "28 de julio de 2026",
    lectura: "6 min de lectura",
    resumen:
      "Empezar una prueba es gratis y se siente como avanzar. Cerrarla obliga a decidir. Por qué limitar a una prueba activa por área no es una restricción burocrática, sino lo único que hace que las cosas terminen.",
    img: "/images/blog/03-cinco-iniciativas-ninguna-cierra.png",
    imgLabel: "/images/blog/03-cinco-iniciativas-ninguna-cierra.png",
    cuerpo: [
      {
        tipo: "parrafo",
        texto:
          "En una reunión de seguimiento, un gerente me mostró el pizarrón de iniciativas de IA de la empresa. Cinco tarjetas, todas en la columna «en curso». Le pregunté desde cuándo. La más nueva tenía seis semanas; la más vieja, cinco meses. Ninguna había producido todavía una decisión.",
      },
      {
        tipo: "parrafo",
        texto:
          "Le hice una sola pregunta más: ¿cuál de las cinco vas a terminar esta semana? Se quedó pensando y contestó lo que contesta todo el mundo: «un poco de todas».",
      },
      {
        tipo: "subtitulo",
        texto: "Empezar es gratis. Terminar cuesta",
      },
      {
        tipo: "parrafo",
        texto:
          "Abrir una iniciativa da una señal inmediata de movimiento. Se anuncia en la reunión, queda lindo en el pizarrón y no obliga a nadie a comprometerse con nada. Cerrarla es lo contrario: exige mirar un resultado y decidir si se adopta, si se escala o si se descarta. Y descartar, en la mayoría de las empresas, todavía se lee como fracaso.",
      },
      {
        tipo: "parrafo",
        texto:
          "Entonces pasa lo previsible. Nadie cierra nada, todo queda «en curso», y la energía disponible se reparte entre cinco frentes hasta volverse insuficiente en todos.",
      },
      {
        tipo: "tabla",
        titulo: "El pizarrón típico de una PyME que arrancó con entusiasmo",
        columnas: ["Iniciativa", "Semanas abierta", "Estado real"],
        filas: [
          [
            "Bot de respuestas para atención al cliente",
            "20",
            "Alguien lo probó dos tardes; quedó esperando una decisión sobre el tono de las respuestas",
          ],
          [
            "Lectura automática de facturas de proveedores",
            "14",
            "Funcionó en las pruebas; falta definir quién revisa las excepciones",
          ],
          [
            "Generación de contenido para redes",
            "11",
            "Lo usa una persona por su cuenta; nunca se comparó contra lo que hacía antes",
          ],
          [
            "Análisis de datos de ventas",
            "8",
            "Frenado hasta que exporten bien la información del sistema",
          ],
          [
            "Asistente interno de consultas de RRHH",
            "6",
            "Se anunció en la reunión de gerentes; todavía nadie lo tocó",
          ],
        ],
        fuente: "Ejemplo compuesto, armado con casos reales anonimizados",
      },
      {
        tipo: "parrafo",
        texto:
          "Mirado así, el pizarrón no muestra cinco proyectos avanzando. Muestra cinco decisiones postergadas.",
      },
      {
        tipo: "subtitulo",
        texto: "El límite de trabajo en curso no frena: acelera",
      },
      {
        tipo: "parrafo",
        texto:
          "La regla que instalo en las empresas que acompaño es simple hasta la incomodidad: **una sola prueba activa por área**. No una por persona, no una por herramienta. Una por área, con responsable, plazo y criterio de cierre.",
      },
      {
        tipo: "parrafo",
        texto:
          "La reacción inicial siempre es la misma: «así vamos a ir más lento». Pasa exactamente lo contrario, y por una razón aritmética. Cinco pruebas que avanzan un 20 % por semana no terminan nada en cinco semanas. Una prueba que recibe toda la atención termina en dos, y después empieza la siguiente. A las cinco semanas, en el primer caso tenés cinco cosas a medio hacer; en el segundo, dos decisiones tomadas y una prueba en marcha.",
      },
      {
        tipo: "cita",
        texto:
          "Una empresa no avanza por la cantidad de cosas que empieza. Avanza por la cantidad de decisiones que cierra.",
      },
      {
        tipo: "subtitulo",
        texto: "Qué cambia cuando el límite es uno",
      },
      {
        tipo: "lista",
        items: [
          "**La prioridad se vuelve explícita.** Con cinco iniciativas abiertas, la prioridad es una opinión. Con una sola activa, hay que elegir, y esa elección se discute con dirección en lugar de resolverse por quién grita más fuerte.",
          "**El cierre pasa a ser la condición para empezar lo próximo.** Es el mecanismo entero: si querés arrancar la siguiente idea —y siempre hay una siguiente idea—, primero tenés que cerrar la que está.",
          "**Nadie queda esperando.** En un frente único, cuando algo se traba se ve al día siguiente. Repartido en cinco, un bloqueo puede pasar tres semanas sin que nadie lo note.",
          "**El equipo ve resultados.** Y eso importa más de lo que parece: una prueba terminada, aunque haya salido que no, sostiene la credibilidad de todo el proceso mucho mejor que cinco iniciativas eternamente prometedoras.",
        ],
      },
      {
        tipo: "subtitulo",
        texto: "Cómo bajarlo a la práctica esta semana",
      },
      {
        tipo: "lista",
        items: [
          "Listá **todo** lo que hoy está abierto, incluyendo lo que nadie llama proyecto: la herramienta que alguien está probando por su cuenta también ocupa atención.",
          "Elegí una por área. El criterio que mejor funciona no es cuál es más importante, sino **cuál se puede cerrar antes** con la información que ya tenés.",
          "Al resto ponele estado «congelado» y una fecha de revisión. Congelado no es cancelado, y esa distinción hay que decirla en voz alta.",
          "Para la prueba activa, escribí en una línea qué significa terminar: qué se va a mirar y qué decisión se va a tomar con eso.",
          "Revisala una vez por semana, siempre el mismo día. Sin cadencia fija, el límite de uno se convierte en un límite de cero.",
        ],
      },
      {
        tipo: "subtitulo",
        texto: "El error frecuente: confundir congelar con cancelar",
      },
      {
        tipo: "parrafo",
        texto:
          "Cuando una iniciativa se congela sin explicación, la persona que la impulsaba entiende que su idea se descartó y no vuelve a proponer nada. El costo de eso es mucho más alto que el de la iniciativa misma.",
      },
      {
        tipo: "parrafo",
        texto:
          "La conversación correcta dura treinta segundos: «tu idea entra en el tablero, no la vamos a probar ahora porque estamos terminando esta otra, y la fecha en que la miramos es el 15». Una idea con fecha se sostiene sola. Una idea sin fecha se muere, y con ella la voluntad de proponer la próxima.",
      },
      {
        tipo: "parrafo",
        texto:
          "Vale la pena mirar el contexto: el [State of AI de McKinsey](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai) encontró que el 88 % de las organizaciones ya usa IA en al menos una función, pero solo alrededor de un tercio logró escalarla. La distancia entre esos dos números no se explica por falta de ideas. Se explica por falta de cierres.",
      },
      {
        tipo: "fuentes",
        items: [
          {
            label: "McKinsey — The State of AI, 2025",
            url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
          },
          {
            label: "BCG — The Widening AI Value Gap, septiembre de 2025",
            url: "https://media-publications.bcg.com/The-Widening-AI-Value-Gap-Sept-2025.pdf",
          },
        ],
      },
    ],
  },

  /* =================================================================
     04 — DE LA IDEA VAGA AL PROYECTO DECIDIBLE
     ================================================================= */
  {
    slug: "de-la-idea-al-proyecto-de-ia",
    titulo: "Una idea no se puede probar si sigue siendo una frase",
    categoria: "Método",
    fecha: "2026-07-24",
    fechaLabel: "24 de julio de 2026",
    lectura: "8 min de lectura",
    resumen:
      "«Usemos IA en compras» no es una oportunidad: es un deseo. Ocho preguntas que convierten una frase de pasillo en algo que se puede probar, medir y decidir — con ejemplos en compras, administración y atención.",
    img: "/images/blog/04-idea-a-prueba-aplicada.png",
    imgLabel: "/images/blog/04-idea-a-prueba-aplicada.png",
    cuerpo: [
      {
        tipo: "parrafo",
        texto:
          "«Queremos usar IA en compras.» La frase la escuché tal cual, con esas seis palabras, en una empresa de ochenta personas. Pregunté qué esperaban que pasara. La respuesta fue: «que sea más eficiente».",
      },
      {
        tipo: "parrafo",
        texto:
          "No hay forma de probar eso. No porque la idea sea mala —probablemente haya algo bueno adentro—, sino porque tal como está enunciada no se puede empezar, no se puede medir y, sobre todo, no se puede terminar. Cualquier resultado va a poder interpretarse como éxito o como fracaso según el humor de la reunión.",
      },
      {
        tipo: "subtitulo",
        texto: "La diferencia entre una idea y una oportunidad",
      },
      {
        tipo: "parrafo",
        texto:
          "Una idea es una intuición: alguien vio algo, escuchó algo, sintió que ahí hay una mejora. Es valiosa y hay que cuidarla. Una oportunidad es otra cosa: es una idea que ya pasó por suficientes preguntas como para saber qué se va a hacer, quién, con qué información y cómo vamos a saber si funcionó.",
      },
      {
        tipo: "parrafo",
        texto:
          "El trabajo de traducción entre una y otra lleva menos de una hora y es, en mi experiencia, el paso que más veces se saltea. Ocho preguntas alcanzan.",
      },
      {
        tipo: "tabla",
        titulo: "Las ocho preguntas que vuelven decidible una idea",
        columnas: ["Pregunta", "Qué revela"],
        filas: [
          [
            "1. ¿Qué tarea concreta hace hoy una persona, paso por paso?",
            "Si no se puede describir el paso a paso actual, no hay proceso: hay una idea sobre un proceso",
          ],
          [
            "2. ¿Cuántas veces por semana pasa y cuánto tiempo lleva cada vez?",
            "El volumen define si vale la pena. Una tarea de dos horas por mes rara vez justifica el esfuerzo",
          ],
          [
            "3. ¿Qué duele exactamente: el tiempo, los errores, la demora o la carga mental?",
            "Cada dolor se mide distinto y se resuelve distinto. «Es ineficiente» no es un dolor",
          ],
          [
            "4. ¿Con qué información se hace hoy y en qué estado está?",
            "Es el filtro que más iniciativas frena. Si el dato está en la cabeza de alguien o en un PDF escaneado torcido, eso es el proyecto",
          ],
          [
            "5. ¿Qué pasa si sale mal una vez?",
            "Distingue entre lo que se puede probar de entrada y lo que necesita revisión humana obligatoria",
          ],
          [
            "6. ¿Quién es el dueño de este proceso y está dispuesto a cambiarlo?",
            "Sin un dueño que quiera, la mejor prueba del mundo muere en la implementación",
          ],
          [
            "7. ¿Cómo se ve hoy ese número y cuánto tendría que mejorar para que valga la pena?",
            "La línea de base y el umbral. Escritos antes, no después de ver el resultado",
          ],
          [
            "8. ¿En cuántas semanas podríamos tener una respuesta?",
            "Si la respuesta es «unos meses», la prueba está mal recortada: hay que buscar adentro una pregunta más chica",
          ],
        ],
      },
      {
        tipo: "subtitulo",
        texto: "Los mismos ocho filtros en tres áreas distintas",
      },
      {
        tipo: "parrafo",
        texto:
          "Lo interesante es que el ejercicio no cambia según el área. Cambia el contenido, no el método. Estos son tres ejemplos de recorrido completo, con la frase de entrada tal como suele decirse y la versión que ya se puede probar:",
      },
      {
        tipo: "tabla",
        titulo: "De la frase de pasillo a la prueba con fecha",
        columnas: ["Área", "Cómo se dice", "Cómo queda después de las ocho preguntas"],
        filas: [
          [
            "Compras",
            "«Usemos IA en compras»",
            "Extraer automáticamente producto, cantidad y precio de las ~120 cotizaciones que llegan por mail cada mes, para armar el cuadro comparativo. Hoy lleva 6 horas semanales a una persona. Éxito: bajar a menos de 2 horas con menos del 5 % de correcciones, en 3 semanas",
          ],
          [
            "Administración",
            "«Que la IA nos ordene la facturación»",
            "Clasificar y cargar las facturas de proveedores que llegan en PDF, dejando en una bandeja de excepciones las que no se leen bien. Hoy son ~400 por mes y dos personas dedican 3 días. Éxito: que el 70 % pase sin intervención, en 4 semanas",
          ],
          [
            "Atención al cliente",
            "«Pongamos un bot»",
            "Redactar el borrador de respuesta a las 5 consultas más frecuentes —que son el 60 % del total— para que el equipo revise y envíe. Hoy el tiempo medio de respuesta es de 5 horas. Éxito: bajarlo a menos de 1 hora sin caída en la valoración del cliente, en 3 semanas",
          ],
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "Fijate lo que pasó en los tres casos. Ninguna de las versiones de la derecha es más ambiciosa que la de la izquierda: todas son **más chicas**. La idea vaga siempre suena más grande, porque no tiene bordes. La oportunidad tiene bordes, y por eso se puede empezar el lunes.",
      },
      {
        tipo: "cita",
        texto:
          "Achicar la idea no es bajar la ambición. Es lo único que permite averiguar, en tres semanas, si la ambición tenía razón.",
      },
      {
        tipo: "subtitulo",
        texto: "La prueba del sobre cerrado",
      },
      {
        tipo: "parrafo",
        texto:
          "Cuando dudo de si una idea ya está lista para probarse, uso un truco. Imaginá que escribís en un papel qué vas a mirar dentro de tres semanas y en qué caso vas a decir que funcionó, lo metés en un sobre y lo abrís recién ese día. Si podés escribir esa línea sin ambigüedad, la idea está lista. Si necesitás explicar «depende de cómo venga», todavía no.",
      },
      {
        tipo: "parrafo",
        texto:
          "Este ejercicio, además, protege de un sesgo bastante humano: cuando el resultado ya está a la vista, es facilísimo acomodar el criterio de éxito para que lo que pasó cuente como éxito.",
      },
      {
        tipo: "subtitulo",
        texto: "Un filtro extra: ¿está dentro de la frontera?",
      },
      {
        tipo: "parrafo",
        texto:
          "Hay una pregunta novena, opcional pero valiosa. El experimento [Navigating the Jagged Technological Frontier](https://aiinstitute.hbs.edu/navigating-the-jagged-technological-frontier/), de Harvard Business School junto con BCG, mostró que la IA mejora fuerte los resultados dentro de cierto terreno y los empeora fuera de él: en las tareas que quedaban afuera, los consultores que la usaron fueron 19 puntos porcentuales más propensos a entregar respuestas incorrectas.",
      },
      {
        tipo: "parrafo",
        texto:
          "La consecuencia práctica es concreta: antes de invertir tres semanas, probá la tarea a mano diez veces. No es una prueba estadística ni pretende serlo; es un sondeo barato. Si en diez intentos el resultado es errático de una forma que no podés explicar, probablemente estés parado sobre un saliente de esa frontera, y conviene recortar la tarea a la parte que sí funciona de manera consistente.",
      },
      {
        tipo: "subtitulo",
        texto: "Dónde hacer este ejercicio",
      },
      {
        tipo: "parrafo",
        texto:
          "No hace falta un taller ni un consultor. Alcanza con una hora, la persona que hace la tarea hoy —no su jefe: quien la hace— y alguien que pregunte sin dar por obvio nada. La regla es que no se habla de herramientas hasta terminar la pregunta ocho. En cuanto aparece un nombre de producto, la conversación se muda a las funcionalidades y ya no vuelve al proceso.",
      },
      {
        tipo: "parrafo",
        texto:
          "Cuando una empresa arma el hábito de hacer pasar cada idea por estas ocho preguntas, cambia algo más de fondo que la calidad de los proyectos: deja de depender de que aparezca alguien iluminado. Las oportunidades empiezan a salir de donde tienen que salir, que es de la gente que hace el trabajo todos los días. Ese es, exactamente, el sistema que instalo en el [Programa INTEGRA](/programa-integra).",
      },
      {
        tipo: "fuentes",
        items: [
          {
            label: "Harvard Business School / BCG — Navigating the Jagged Technological Frontier",
            url: "https://aiinstitute.hbs.edu/navigating-the-jagged-technological-frontier/",
          },
          {
            label: "BCG — From Potential to Profit: Closing the AI Impact Gap",
            url: "https://www.bcg.com/publications/2025/closing-the-ai-impact-gap",
          },
        ],
      },
    ],
  },

  /* =================================================================
     05 — ADOPCIÓN DE IA EN AMÉRICA LATINA
     ================================================================= */
  {
    slug: "adopcion-ia-empresas-latinoamerica-datos",
    titulo: "La región que más usa la IA y menos invierte en ella",
    categoria: "Datos",
    fecha: "2026-07-21",
    fechaLabel: "21 de julio de 2026",
    lectura: "8 min de lectura",
    resumen:
      "América Latina aporta el 14 % de las visitas mundiales a herramientas de IA y el 1,12 % de la inversión. Los números detrás de una adopción entusiasta que todavía no se traduce en valor.",
    // ⚠️ Esta imagen es una vista previa de stock CON MARCA DE AGUA de 123RF.
    // Reemplazala por la versión licenciada antes de publicar el sitio.
    img: "/images/blog/adopcion-latam.jpg",
    imgLabel: "/images/blog/adopcion-latam.jpg",
    cuerpo: [
      {
        tipo: "parrafo",
        texto:
          "Hay una escena que se repite en casi todas las empresas medianas que visito. Alguien del equipo comercial abre el ChatGPT en el celular y muestra, con una mezcla de orgullo y culpa, cómo redacta las propuestas. Nadie se lo pidió. Nadie se lo prohibió. Tampoco figura en ningún proceso, en ningún manual, en ninguna métrica.",
      },
      {
        tipo: "parrafo",
        texto:
          "Esa escena explica bastante bien la paradoja latinoamericana con la inteligencia artificial: la usamos mucho más de lo que la gestionamos, y la gestionamos mucho más de lo que la financiamos.",
      },
      {
        tipo: "subtitulo",
        texto: "Consumimos IA de primer mundo con presupuestos de tercero",
      },
      {
        tipo: "parrafo",
        texto:
          "La tercera edición del [Índice Latinoamericano de Inteligencia Artificial (ILIA)](https://www.cepal.org/en/pressreleases/latin-america-and-caribbean-accelerate-adoption-artificial-intelligence-though), publicada en octubre de 2025 y elaborada sobre más de cien subindicadores en diecinueve países, dejó un contraste difícil de ignorar. América Latina y el Caribe concentran el **14 % de las visitas globales a soluciones de IA**, con apenas el 11 % de los internautas del mundo. Es decir: usamos estas herramientas por encima de nuestro peso demográfico.",
      },
      {
        tipo: "parrafo",
        texto:
          "Del otro lado del mostrador, la foto se invierte. La región recibe el **1,12 % de la inversión global en IA**, mientras aporta el 6,6 % del PBI mundial. Ningún país de la región supera el promedio mundial de inversión en IA relativa a su PBI per cápita; el promedio regional está seis veces por debajo de ese umbral.",
      },
      {
        tipo: "grafico",
        titulo: "El desbalance latinoamericano en una sola imagen",
        bajada: "Participación de América Latina y el Caribe en cuatro indicadores globales.",
        barras: [
          { label: "Visitas globales a soluciones de IA", valor: 14, texto: "14 %" },
          { label: "Internautas del mundo", valor: 11, texto: "11 %", tono: "neutro" },
          { label: "PBI mundial", valor: 6.6, texto: "6,6 %", tono: "neutro" },
          { label: "Inversión global en IA", valor: 1.12, texto: "1,12 %" },
        ],
        nota: "Consumimos por encima de nuestro peso demográfico e invertimos muy por debajo de nuestro peso económico.",
        fuente: "ILIA 2025 (CEPAL), tercera edición · octubre de 2025",
      },
      {
        tipo: "parrafo",
        texto:
          "El ILIA agrupa a los países en tres categorías según su madurez. La distancia entre el primer grupo y el último es la distancia entre tener política pública de IA y tener buenas intenciones.",
      },
      {
        tipo: "tabla",
        titulo: "Madurez en IA por país",
        columnas: ["Grupo", "Países", "Qué los distingue"],
        filas: [
          [
            "Pioneros (60+ puntos)",
            "Chile, Brasil, Uruguay",
            "Estrategia nacional en ejecución, infraestructura de cómputo y ecosistema de investigación consolidado",
          ],
          [
            "Adoptantes",
            "Colombia, Ecuador, Costa Rica, República Dominicana y otros (8 en total)",
            "Marcos regulatorios en desarrollo y adopción empresarial creciente, con brechas de talento",
          ],
          [
            "Exploradores",
            "Más de un tercio de los países analizados",
            "Iniciativas aisladas, sin política sostenida ni capacidad de cómputo propia",
          ],
        ],
        fuente: "ILIA 2025 (CEPAL) · 19 países relevados",
      },
      {
        tipo: "subtitulo",
        texto: "Una de cada diez empresas la usa. Seis de cada cien le sacan provecho",
      },
      {
        tipo: "parrafo",
        texto:
          "Si el dato de arriba es el macro, el micro es todavía más incómodo. Un informe del Centro para la Convergencia de América Latina publicado en julio de 2026 —firmado por Víctor Muñoz y Ángel Melguizo— midió el uso empresarial real y encontró que **apenas una de cada diez empresas de la región utiliza inteligencia artificial**, y que solo el 6 % captura valor significativo de esa tecnología.",
      },
      {
        tipo: "dato",
        valor: "6 %",
        texto:
          "de las empresas latinoamericanas captura valor significativo de la IA, según el informe del CCLATAM (julio de 2026).",
      },
      {
        tipo: "parrafo",
        texto:
          "El detalle que más me llamó la atención del mismo informe: cerca de la mitad de las empresas de la región ya cuenta con banda ancha de alta velocidad. La conectividad, que durante veinte años fue la excusa favorita, dejó de ser el cuello de botella. El cuello de botella se mudó.",
      },
      {
        tipo: "cita",
        texto:
          "La infraestructura dejó de ser el problema. Lo que falta ahora no se compra: se decide, se organiza y se practica.",
      },
      {
        tipo: "subtitulo",
        texto: "No es un problema latinoamericano, es un problema de management",
      },
      {
        tipo: "parrafo",
        texto:
          "Antes de sacar conclusiones regionalistas, conviene mirar afuera. El [State of AI 2025 de McKinsey](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai) encontró que el 88 % de las organizaciones del mundo ya usa IA en al menos una función. Pero solo alrededor de un tercio logró escalarla al conjunto de la empresa. Adoptar es fácil. Escalar es otra cosa.",
      },
      {
        tipo: "parrafo",
        texto:
          "El estudio [The Widening AI Value Gap](https://media-publications.bcg.com/The-Widening-AI-Value-Gap-Sept-2025.pdf) de BCG, de septiembre de 2025, pone números a esa distancia con una clasificación que se volvió referencia.",
      },
      {
        tipo: "grafico",
        titulo: "Dónde está parada cada empresa del mundo con la IA",
        bajada: "Distribución global de organizaciones según su capacidad de generar valor.",
        barras: [
          { label: "Rezagadas · impacto mínimo en ingresos y costos", valor: 60, texto: "60 %", tono: "neutro" },
          { label: "En escalamiento · empiezan a generar valor", valor: 35, texto: "35 %", tono: "neutro" },
          { label: "Preparadas a futuro · capacidades de IA en todas las áreas", valor: 5, texto: "5 %" },
        ],
        nota: "Solo el 5 % de las empresas del mundo construye capacidades de IA de forma sistemática en todas sus funciones.",
        fuente: "BCG, The Widening AI Value Gap · septiembre de 2025",
      },
      {
        tipo: "parrafo",
        texto:
          "Puesto de otro modo: el 75 % de los ejecutivos considera que la IA es una prioridad estratégica, pero solo el 25 % consigue traducir esa ambición en valor concreto. La brecha no está entre países ricos y pobres. Está entre empresas que trataron a la IA como un proyecto de tecnología y empresas que la trataron como un cambio en la forma de trabajar.",
      },
      {
        tipo: "subtitulo",
        texto: "Lo que sí es un problema estructural nuestro",
      },
      {
        tipo: "parrafo",
        texto:
          "Dicho todo eso, hay condiciones locales que no se resuelven con buena gestión. El informe del CCLATAM estima un **déficit de financiamiento de 99.000 millones de dólares anuales hasta 2030** para cerrar la brecha digital de la región. Y recuerda un dato que ordena cualquier discusión sobre productividad: la productividad laboral latinoamericana equivale a alrededor de un tercio de la de las economías de altos ingresos.",
      },
      {
        tipo: "parrafo",
        texto:
          "El talento también preocupa. El ILIA señala que la brecha regional de talento en IA respecto del promedio mundial **se amplió desde 2022**, y que la formación avanzada sigue siendo escasa y concentrada en unos pocos países. Formamos gente que sabe usar herramientas, no gente que sabe construirlas ni gobernarlas.",
      },
      {
        tipo: "subtitulo",
        texto: "Qué haría yo si dirigiera una pyme latinoamericana hoy",
      },
      {
        tipo: "parrafo",
        texto:
          "Los datos son un diagnóstico, no una receta. Pero si tuviera que traducirlos en decisiones para una empresa de veinte, cien o quinientas personas en la región, serían estas cuatro:",
      },
      {
        tipo: "lista",
        items: [
          "Dejar de preguntar «¿qué podemos hacer con IA?» y empezar por «¿qué proceso nos duele y cuánto nos cuesta al mes?». El caso de uso sale del dolor, no del catálogo de herramientas.",
          "Sacar la IA de la sombra. Si la gente ya la usa sin permiso —y la usa—, conviene saber en qué, con qué datos y con qué criterio. Prohibir no funciona; ordenar sí.",
          "Medir antes de empezar. Sin una línea de base —horas, errores, tiempo de respuesta— no hay forma de saber si algo funcionó, y sin eso ningún proyecto sobrevive al segundo trimestre.",
          "Elegir un caso, terminarlo y contarlo internamente. Un proceso resuelto de punta a punta convence más que diez pilotos abiertos.",
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "La buena noticia escondida en estos informes es que la mayor parte de la brecha no depende de comprar tecnología de frontera. Depende de decisiones de gestión que están al alcance de cualquier empresa que se lo tome en serio. Y en una región donde el 90 % todavía no arrancó, eso es una ventaja competitiva enorme para el que arranque primero.",
      },
      {
        tipo: "fuentes",
        items: [
          {
            label: "ILIA 2025 — Índice Latinoamericano de IA (CEPAL), octubre de 2025",
            url: "https://www.cepal.org/en/pressreleases/latin-america-and-caribbean-accelerate-adoption-artificial-intelligence-though",
          },
          {
            label:
              "CCLATAM — Unlocking the Digital Potential of Latin America and the Caribbean, julio de 2026",
            url: "https://www.infobae.com/america/america-latina/2026/07/14/america-latina-podria-sumar-48-millones-de-empleos-formales-si-acelera-la-adopcion-de-inteligencia-artificial/",
          },
          {
            label: "McKinsey — The State of AI, 2025",
            url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
          },
          {
            label: "BCG — The Widening AI Value Gap, septiembre de 2025",
            url: "https://media-publications.bcg.com/The-Widening-AI-Value-Gap-Sept-2025.pdf",
          },
        ],
      },
    ],
  },

  /* =================================================================
     06 — EL CRITERIO DE ABANDONO, ESCRITO ANTES
     ================================================================= */
  {
    slug: "cuando-abandonar-una-prueba-de-ia",
    titulo: "La pregunta que hay que hacerse antes de empezar cualquier prueba de IA",
    categoria: "Decisiones",
    fecha: "2026-07-17",
    fechaLabel: "17 de julio de 2026",
    lectura: "6 min de lectura",
    resumen:
      "¿Qué tendría que pasar para que digamos que no? Definir de antemano qué evidencia te haría abandonar una prueba es la decisión más barata de todo el proceso — y la que casi nadie toma.",
    img: "/images/blog/05-pregunta-antes-de-empezar.png",
    imgLabel: "/images/blog/05-pregunta-antes-de-empezar.png",
    cuerpo: [
      {
        tipo: "parrafo",
        texto:
          "Cuando una empresa me presenta una prueba de IA que está por arrancar, hago siempre la misma pregunta, y siempre incomoda un poco: «¿qué tendría que pasar para que dentro de tres semanas digamos que no?».",
      },
      {
        tipo: "parrafo",
        texto:
          "La respuesta habitual es una versión de «bueno, si no funciona». Y eso no es un criterio: es una manera de dejar la decisión para después, cuando ya haya plata invertida, expectativas creadas y alguien que puso su nombre en el proyecto.",
      },
      {
        tipo: "subtitulo",
        texto: "Por qué la pregunta se evita",
      },
      {
        tipo: "parrafo",
        texto:
          "Nadie arranca algo pensando en cómo va a dejarlo. Preguntarlo en el día uno suena a desconfianza, casi a mala onda. Pero el momento en que se define el criterio de abandono determina qué tan honesto va a ser ese criterio: escrito antes, es una regla; escrito después, es una justificación.",
      },
      {
        tipo: "parrafo",
        texto:
          "Y hay un motivo psicológico bastante estudiado detrás. A medida que una iniciativa acumula horas, reuniones y explicaciones a dirección, el costo de decir que no sube — no el costo real, el social. A las tres semanas, abandonar es sensato. A los cinco meses, abandonar parece admitir que se desperdiciaron cinco meses, así que se sigue.",
      },
      {
        tipo: "cita",
        texto:
          "El criterio de abandono es lo único que se abarata escribiéndolo temprano. Todo lo demás de un proyecto se puede definir sobre la marcha.",
      },
      {
        tipo: "subtitulo",
        texto: "Cómo se escribe, en concreto",
      },
      {
        tipo: "parrafo",
        texto:
          "Un criterio de abandono útil tiene cuatro partes y entra en tres renglones. No es un documento: es una fila de una planilla.",
      },
      {
        tipo: "tabla",
        titulo: "Las cuatro columnas del criterio, escritas antes de tocar una herramienta",
        columnas: ["Columna", "Ejemplo — lectura de facturas de proveedores"],
        filas: [
          [
            "Qué decisión toma esta prueba",
            "Si automatizamos o no la carga de facturas de proveedores en el sistema contable",
          ],
          [
            "Qué medimos, contra qué línea de base",
            "Porcentaje de facturas procesadas sin intervención humana. Hoy: 0 %. Tiempo actual: 3 días-persona por mes sobre ~400 facturas",
          ],
          [
            "Umbral para seguir",
            "70 % o más sin intervención, con menos de 2 % de errores que lleguen al sistema",
          ],
          [
            "Umbral para cortar",
            "Menos del 50 % sin intervención, o cualquier error que pase sin detectarse al asiento contable",
          ],
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "Entre los dos umbrales queda una zona gris deliberada —entre el 50 % y el 70 %— y está bien que quede. Esa franja es la que se discute en la reunión, con datos sobre la mesa en lugar de impresiones. Lo que no puede quedar difuso son los extremos.",
      },
      {
        tipo: "subtitulo",
        texto: "Por qué descartar rápido sale más barato",
      },
      {
        tipo: "parrafo",
        texto:
          "El costo visible de una prueba que se estira es el tiempo de la gente. El invisible, que es mayor, se compone de tres cosas:",
      },
      {
        tipo: "lista",
        items: [
          "**Ocupa el cupo.** Si tu empresa sostiene una prueba activa por área —que es lo que recomiendo—, una iniciativa que no cierra bloquea todas las que vienen atrás. El costo real no es lo que gastás en ella: es lo que no probaste mientras tanto.",
          "**Gasta credibilidad.** Cada vez que alguien pregunta «¿cómo viene lo de la IA?» y la respuesta es «ahí va», el proceso entero pierde un poco de crédito. A la cuarta vez, la gente deja de preguntar y de proponer.",
          "**Contamina la próxima decisión.** Una prueba sin cierre no deja aprendizaje. Seis meses después alguien propone algo parecido y nadie puede decir con precisión por qué la anterior no anduvo.",
        ],
      },
      {
        tipo: "subtitulo",
        texto: "Hay tareas donde la IA no falla: acierta con seguridad cosas equivocadas",
      },
      {
        tipo: "parrafo",
        texto:
          "Un motivo adicional, y menos obvio, para definir el umbral de corte por adelantado. El experimento de Harvard Business School y BCG con 758 consultores, [Navigating the Jagged Technological Frontier](https://aiinstitute.hbs.edu/navigating-the-jagged-technological-frontier/), encontró que en las tareas fuera del terreno donde el modelo es competente, quienes usaron IA fueron más propensos a entregar respuestas incorrectas que quienes trabajaron sin ella.",
      },
      {
        tipo: "dato",
        valor: "+19 pp",
        texto:
          "más de probabilidad de entregar una solución incorrecta usando IA, en las tareas ubicadas fuera de la frontera de capacidad del modelo.",
      },
      {
        tipo: "parrafo",
        texto:
          "Esto tiene una consecuencia práctica para el criterio de abandono: no alcanza con medir velocidad. Una prueba puede mostrar que ahora todo se hace tres veces más rápido y estar produciendo, sin que nadie lo note, resultados peores. Por eso todo umbral de corte necesita, además de la métrica de eficiencia, **una métrica de error revisada por una persona sobre una muestra**.",
      },
      {
        tipo: "subtitulo",
        texto: "Las cuatro cosas que se escriben antes de empezar",
      },
      {
        tipo: "lista",
        items: [
          "**Qué decisión toma esta prueba.** Si no hay una decisión esperando el resultado, no es una prueba: es una demostración.",
          "**Qué medimos y contra qué.** Con la línea de base tomada antes, aunque sea a ojo. Una estimación escrita el día uno vale más que un dato exacto conseguido el día treinta.",
          "**Cuánto dura y quién la lleva.** Fecha de cierre en el calendario y un nombre. Sin fecha no hay prueba, hay una nueva forma de trabajar que se instaló sin que nadie la aprobara.",
          "**Qué resultado nos hace cortar.** El umbral explícito, incluyendo al menos un error que sea inaceptable por sí solo, sin importar cuán buenos sean los demás números.",
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "Escribir esas cuatro líneas lleva veinte minutos. Es, de lejos, la mejor relación entre esfuerzo y riesgo evitado de todo el proceso de adopción — y lo que convierte una prueba en algo que efectivamente termina, en lugar de en una actividad que se va apagando sin que nadie recuerde bien cómo empezó.",
      },
      {
        tipo: "fuentes",
        items: [
          {
            label: "Harvard Business School / BCG — Navigating the Jagged Technological Frontier",
            url: "https://aiinstitute.hbs.edu/navigating-the-jagged-technological-frontier/",
          },
          {
            label: "BCG — The Widening AI Value Gap, septiembre de 2025",
            url: "https://media-publications.bcg.com/The-Widening-AI-Value-Gap-Sept-2025.pdf",
          },
        ],
      },
    ],
  },

  /* =================================================================
     07 — LIDERAZGO EN LA ERA DE LA IA
     ================================================================= */
  {
    slug: "liderazgo-en-la-era-de-la-ia",
    titulo: "El cuello de botella de la IA está en la oficina de dirección",
    categoria: "Liderazgo",
    fecha: "2026-07-14",
    fechaLabel: "14 de julio de 2026",
    lectura: "7 min de lectura",
    resumen:
      "Solo el 10 % del valor de la inteligencia artificial viene de los algoritmos. El otro 70 % sale de personas, procesos y cultura: el territorio exacto donde manda la dirección.",
    // 672x378 px: se ve algo blanda al ancho completo del artículo (~1080 px).
    // Si tenés el original más grande, reemplazala.
    img: "/images/blog/liderazgo-ia.png",
    imgLabel: "/images/blog/liderazgo-ia.png",
    cuerpo: [
      {
        tipo: "parrafo",
        texto:
          "En una reunión de directorio, hace unos meses, un gerente general me hizo la pregunta más honesta que escuché en mucho tiempo: «Pablo, ¿yo tengo que aprender a usar esto o alcanza con que lo entienda?».",
      },
      {
        tipo: "parrafo",
        texto:
          "Le dije que la respuesta estaba en los datos, no en mi opinión. Y los datos son bastante crudos al respecto.",
      },
      {
        tipo: "subtitulo",
        texto: "El 70 % del valor está donde menos se mira",
      },
      {
        tipo: "parrafo",
        texto:
          "BCG lleva años sistematizando el trabajo con cientos de empresas en lo que llama el principio 10-20-70. La proporción describe de dónde sale, efectivamente, el valor de una iniciativa de IA.",
      },
      {
        tipo: "apilado",
        titulo: "De dónde sale el valor de una iniciativa de IA",
        bajada: "Distribución del esfuerzo que separa a las empresas que capturan valor de las que no.",
        partes: [
          { label: "Algoritmos", valor: 10 },
          { label: "Datos y tecnología", valor: 20 },
          { label: "Personas, procesos y cultura", valor: 70 },
        ],
        nota: "El modelo es la parte más pequeña del problema. Y la única que se puede comprar.",
        fuente: "BCG · principio 10-20-70",
      },
      {
        tipo: "parrafo",
        texto:
          "Leído al revés, el número dice algo incómodo: el 90 % de lo que determina si la IA funciona en una empresa no está en manos del proveedor de tecnología. Está en manos de quien decide cómo se trabaja. Y eso es, textualmente, la definición del rol de dirección.",
      },
      {
        tipo: "cita",
        texto:
          "El algoritmo se compra. El rediseño del proceso, la decisión de qué se automatiza y la confianza del equipo, no.",
      },
      {
        tipo: "subtitulo",
        texto: "Los que escalan tienen líderes que lo usan, no que lo aprueban",
      },
      {
        tipo: "parrafo",
        texto:
          "El [State of AI 2025 de McKinsey](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai) buscó qué distingue a las organizaciones de alto desempeño en IA del resto. El predictor más fuerte no fue el presupuesto, ni el tamaño, ni el sector. Fue el involucramiento real de la dirección.",
      },
      {
        tipo: "parrafo",
        texto:
          "Las organizaciones de alto desempeño son **tres veces más propensas** que sus pares a afirmar con convicción que sus líderes senior demuestran compromiso con las iniciativas de IA. Y no compromiso declarativo: el informe destaca específicamente que esos líderes modelan el uso —usan las herramientas ellos mismos, delante de sus equipos.",
      },
      {
        tipo: "parrafo",
        texto:
          "Es un detalle que parece menor y no lo es. Un equipo lee muy rápido la diferencia entre un director que aprobó el presupuesto de IA y uno que llega a la reunión con un análisis que preparó él mismo con la herramienta.",
      },
      {
        tipo: "subtitulo",
        texto: "Tu gente ya la está usando, y probablemente vos no lo sepas",
      },
      {
        tipo: "parrafo",
        texto:
          "El informe [Superagency in the workplace](https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/superagency-in-the-workplace-empowering-people-to-unlock-ais-full-potential) de McKinsey, de enero de 2025, encontró un desfasaje sistemático: los empleados están adoptando IA generativa mucho más rápido de lo que sus líderes creen. La brecha no es de porcentajes menores; es de percepción estructural.",
      },
      {
        tipo: "parrafo",
        texto:
          "Esto genera una situación que en las empresas argentinas veo todo el tiempo. La IA entra por abajo, se usa en la sombra, y la dirección se entera cuando ya hay costumbres formadas, criterios dispares y —en el peor de los casos— información sensible pegada en un chat que nadie audita. La conclusión operativa del informe es directa: el trabajo del liderazgo no es prohibir, es habilitar con reglas claras.",
      },
      {
        tipo: "subtitulo",
        texto: "La frontera irregular: dónde la IA ayuda y dónde arruina",
      },
      {
        tipo: "parrafo",
        texto:
          "Hay un experimento que debería ser lectura obligatoria en cualquier comité de dirección. Investigadores de Harvard Business School, junto con BCG, tomaron a **758 consultores reales** y les dieron dieciocho tareas de consultoría con y sin acceso a GPT-4. Lo llamaron [Navigating the Jagged Technological Frontier](https://aiinstitute.hbs.edu/navigating-the-jagged-technological-frontier/).",
      },
      {
        tipo: "tabla",
        titulo: "Qué pasó con 758 consultores de BCG",
        columnas: ["Indicador", "Con acceso a IA", "Qué significa"],
        filas: [
          ["Tareas completadas", "+12,2 %", "Más volumen de trabajo terminado en el mismo período"],
          ["Velocidad", "25,1 % más rápido", "Reducción directa del tiempo por tarea"],
          ["Calidad del resultado", "40 % del grupo mejoró", "Evaluado por jurados ciegos sobre el output final"],
          [
            "Tareas fuera de la frontera",
            "+19 puntos de error",
            "Mayor probabilidad de entregar soluciones incorrectas con la IA que sin ella",
          ],
        ],
        fuente:
          "Dell'Acqua et al., Harvard Business School / BCG · publicado en Organization Science",
      },
      {
        tipo: "parrafo",
        texto:
          "Las tres primeras filas se citan en todas las presentaciones. La cuarta casi nunca. Y es la más importante para quien dirige: fuera del terreno donde el modelo es competente, los consultores que usaron IA fueron **19 puntos porcentuales más propensos a entregar respuestas incorrectas** que los que trabajaron sin ella.",
      },
      {
        tipo: "parrafo",
        texto:
          "La capacidad de la IA no es una línea recta que avanza parejo: es una frontera irregular, con entrantes y salientes que no se ven desde afuera. Adentro, multiplica. Afuera, convence con seguridad de cosas que están mal. Y quien tiene que definir de qué lado de esa frontera se toman las decisiones de la empresa no es el equipo de tecnología.",
      },
      {
        tipo: "subtitulo",
        texto: "Cuatro preguntas para la próxima reunión de dirección",
      },
      {
        tipo: "lista",
        items: [
          "¿Cuántas horas de esta semana usé yo, personalmente, alguna herramienta de IA para trabajar? Si la respuesta es cero, el equipo ya sacó sus conclusiones.",
          "¿Qué está usando mi gente hoy, con qué datos, y quién lo sabe? El mapa del uso real suele sorprender más que cualquier diagnóstico externo.",
          "¿En qué decisiones aceptamos que la IA participe y en cuáles no? Sin ese límite escrito, cada persona improvisa el suyo.",
          "¿Qué proceso vamos a rediseñar? No «qué herramienta vamos a comprar»: qué proceso. El 70 % del valor vive ahí.",
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "Volviendo a la pregunta del gerente general del principio. La respuesta es que no alcanza con entenderla. No porque haya que convertirse en técnico, sino porque las decisiones que definen el 70 % del valor —qué se rediseña, qué se automatiza, dónde está el límite, cómo se forma el equipo— no se pueden delegar a alguien que no las va a tomar.",
      },
      {
        tipo: "fuentes",
        items: [
          {
            label: "McKinsey — The State of AI, 2025",
            url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
          },
          {
            label: "McKinsey — Superagency in the workplace, enero de 2025",
            url: "https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/superagency-in-the-workplace-empowering-people-to-unlock-ais-full-potential",
          },
          {
            label: "Harvard Business School / BCG — Navigating the Jagged Technological Frontier",
            url: "https://aiinstitute.hbs.edu/navigating-the-jagged-technological-frontier/",
          },
          {
            label: "BCG — From Potential to Profit: Closing the AI Impact Gap",
            url: "https://www.bcg.com/publications/2025/closing-the-ai-impact-gap",
          },
        ],
      },
    ],
  },

  /* =================================================================
     08 — DESCARTAR CON EVIDENCIA
     ================================================================= */
  {
    slug: "descartar-una-iniciativa-de-ia-con-evidencia",
    titulo: "«Probamos IA, no funcionó y lo cerramos en dos semanas»",
    categoria: "Decisiones",
    fecha: "2026-07-10",
    fechaLabel: "10 de julio de 2026",
    lectura: "6 min de lectura",
    resumen:
      "Me lo contaron con vergüenza, como si fuera una confesión. Les dije que era el mejor resultado del trimestre. Por qué un descarte bien cerrado vale más que una iniciativa que sigue abierta porque nadie se anima a matarla.",
    img: "/images/blog/06-probamos-ia-y-cerramos.png",
    imgLabel: "/images/blog/06-probamos-ia-y-cerramos.png",
    cuerpo: [
      {
        tipo: "parrafo",
        texto:
          "«Che, tengo que contarte algo. Probamos lo del asistente para atención al cliente y no funcionó. Lo cerramos a las dos semanas.» Me lo dijo bajando la voz, con el tono de quien está a punto de que lo reten.",
      },
      {
        tipo: "parrafo",
        texto:
          "Le pedí que me contara cómo lo habían cerrado. Habían medido el tiempo de respuesta, comparado contra el mes anterior, revisado a mano cuarenta respuestas, encontrado que en las consultas sobre garantías el asistente inventaba plazos que no existían, y decidido cortar. Todo escrito en una página.",
      },
      {
        tipo: "parrafo",
        texto:
          "Eso no es un fracaso. Es una empresa que en dos semanas aprendió algo verdadero sobre su operación, gastando menos de lo que cuesta una reunión larga.",
      },
      {
        tipo: "subtitulo",
        texto: "La iniciativa zombi cuesta más que el fracaso",
      },
      {
        tipo: "parrafo",
        texto:
          "El verdadero problema de las empresas con la IA no son los proyectos que salen mal. Son los que nunca terminan de salir. La iniciativa zombi tiene una característica que la vuelve especialmente cara: consume recursos sin producir información.",
      },
      {
        tipo: "tabla",
        titulo: "Dos formas de que algo no funcione",
        columnas: ["Dimensión", "Descarte con evidencia", "Iniciativa zombi"],
        filas: [
          ["Duración", "2 a 4 semanas", "Meses, sin fecha de cierre"],
          [
            "Costo",
            "Acotado y conocido desde el inicio",
            "Difuso: horas dispersas que nadie suma nunca",
          ],
          [
            "Qué queda escrito",
            "Qué se probó, con qué datos, qué se midió y por qué se cortó",
            "Nada. A los seis meses nadie recuerda en qué quedó",
          ],
          [
            "Efecto en el equipo",
            "Confianza: se prueba, se decide, se sigue",
            "Cinismo: «acá se anuncian cosas y no pasa nada»",
          ],
          [
            "Efecto en la próxima idea",
            "Sale mejor formulada, porque hay un aprendizaje concreto",
            "Sale igual de vaga, y arrastra la sospecha de que tampoco va a terminar",
          ],
          [
            "Qué habilita",
            "El cupo queda libre para la siguiente prueba",
            "Bloquea el cupo por tiempo indefinido",
          ],
        ],
      },
      {
        tipo: "cita",
        texto:
          "Una prueba cerrada con un «no» produce más valor que tres pruebas abiertas con un «ahí va».",
      },
      {
        tipo: "subtitulo",
        texto: "Tres descartes que valieron lo que costaron",
      },
      {
        tipo: "parrafo",
        texto:
          "Estos casos son reales y están anonimizados. Los elijo porque en los tres, lo que se aprendió al cortar valía más que el ahorro que se buscaba.",
      },
      {
        tipo: "lista",
        items: [
          "**Lectura automática de remitos en una distribuidora.** Se cortó a las tres semanas: los remitos llegaban fotografiados con el celular, arrugados y con mala luz, y la tasa de error era inaceptable. El aprendizaje real no fue sobre IA — fue que el problema estaba en cómo se recibían los remitos. Cambiaron eso primero, y un año después la automatización sí funcionó.",
          "**Generación de contenido para redes en una empresa de servicios.** Se cortó a las dos semanas. Los textos salían rápido y eran correctos, pero no sonaban a la empresa, y la revisión para que sonaran llevaba más tiempo que escribirlos de cero. Descubrieron que no tenían escrito en ningún lado cómo hablaba la marca. Ese, y no la herramienta, era el proyecto.",
          "**Asistente interno de consultas de RRHH en una industria.** Se cortó a la semana y media, y fue el descarte más barato de los tres. Las respuestas dependían de convenios y adicionales que cambiaban por sector y que estaban en la cabeza de dos personas. No había base documental para sostener nada. La conclusión fue que primero había que escribir esa información — algo que además hacía falta por muchas otras razones.",
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "En los tres casos, el descarte destapó el problema de fondo: información desordenada, criterios no escritos, procesos que dependían de personas. La IA funcionó como reactivo, no como solución. Y eso solo se ve cuando la prueba se cierra y alguien se sienta a escribir por qué.",
      },
      {
        tipo: "subtitulo",
        texto: "Cómo se cierra bien",
      },
      {
        tipo: "parrafo",
        texto:
          "Un cierre bien hecho es una página. Cinco puntos, sin florituras, guardados donde el próximo los pueda encontrar:",
      },
      {
        tipo: "lista",
        items: [
          "**Qué se probó exactamente.** La tarea concreta, no el título del proyecto. «Extraer tres campos de las cotizaciones que llegan por mail», no «IA en compras».",
          "**Con qué información y en qué condiciones.** Volumen, calidad de los datos, quién participó. Es lo que permite saber, más adelante, si algo cambió lo suficiente como para volver a intentarlo.",
          "**Qué se midió y qué dio.** Los números, contra la línea de base. Incluyendo lo que salió bien: casi todos los descartes tienen una parte que funcionó.",
          "**Por qué se corta.** Contra el umbral que se había escrito antes. Si no había umbral escrito, esta es la lección principal del cierre.",
          "**En qué condiciones se revisaría.** «Si migramos el sistema de facturación», «si conseguimos los remitos en digital». Esto convierte el descarte en una idea archivada con criterio, y no en una puerta cerrada.",
        ],
      },
      {
        tipo: "subtitulo",
        texto: "Lo que esto le hace a la cultura de la empresa",
      },
      {
        tipo: "parrafo",
        texto:
          "Hay una consecuencia que se ve recién unos meses después. Si descartar se castiga —aunque sea con una cara larga en la reunión—, la gente aprende rápido que la forma segura de no equivocarse es no proponer. Y si nadie propone, las oportunidades tienen que bajar siempre desde arriba, que es exactamente el modelo que no escala.",
      },
      {
        tipo: "parrafo",
        texto:
          "Cuando en cambio el descarte se cuenta en la reunión con el mismo tono que un éxito, pasa algo distinto: la gente propone cosas más audaces, porque sabe que probarlas no le va a costar la reputación. El [State of AI de McKinsey](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai) señala que lo que más distingue a las organizaciones que escalan IA no es el presupuesto sino el compromiso visible de sus líderes. Cómo se recibe un descarte es una de las señales más fuertes que puede dar un líder.",
      },
      {
        tipo: "parrafo",
        texto:
          "Por eso, cuando alguien me cuenta un cierre en dos semanas con la voz baja, lo primero que hago es pedirle que lo cuente en la reunión siguiente en voz alta. No para hacer terapia de grupo: porque descartar con evidencia es un resultado, y los resultados se comunican.",
      },
      {
        tipo: "fuentes",
        items: [
          {
            label: "McKinsey — The State of AI, 2025",
            url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
          },
          {
            label: "BCG — The Widening AI Value Gap, septiembre de 2025",
            url: "https://media-publications.bcg.com/The-Widening-AI-Value-Gap-Sept-2025.pdf",
          },
        ],
      },
    ],
  },

  /* =================================================================
     09 — CÓMO CAMBIAN LOS ROLES
     ================================================================= */
  {
    slug: "como-cambian-los-roles-con-ia",
    titulo: "Tu puesto no va a desaparecer: se va a reescribir",
    categoria: "Futuro del trabajo",
    fecha: "2026-07-07",
    fechaLabel: "7 de julio de 2026",
    lectura: "8 min de lectura",
    resumen:
      "El Foro Económico Mundial proyecta 170 millones de empleos nuevos y 92 millones desplazados hacia 2030. El dato que más importa no es ese: es que el 39 % de las competencias de tu puesto van a cambiar.",
    img: "/images/blog/roles-ia.png",
    imgLabel: "/images/blog/roles-ia.png",
    cuerpo: [
      {
        tipo: "parrafo",
        texto:
          "La pregunta llega siempre en el mismo momento de las capacitaciones, cuando ya bajó la guardia el grupo y alguien se anima: «¿Esto me va a dejar sin trabajo?».",
      },
      {
        tipo: "parrafo",
        texto:
          "La respuesta honesta es que depende de qué entendamos por «trabajo». Si es el puesto —el título en el organigrama—, probablemente no. Si es el conjunto de tareas que hacés hoy de lunes a viernes, casi con seguridad sí, y bastante antes de lo que la mayoría calcula.",
      },
      {
        tipo: "subtitulo",
        texto: "El saldo neto es positivo. El movimiento debajo, enorme",
      },
      {
        tipo: "parrafo",
        texto:
          "El [Future of Jobs Report 2025](https://www.weforum.org/press/2025/01/future-of-jobs-report-2025-78-million-new-job-opportunities-by-2030-but-urgent-upskilling-needed-to-prepare-workforces/) del Foro Económico Mundial encuestó a alrededor de mil empleadores que representan a más de catorce millones de trabajadores, en veintidós sectores y cincuenta y cinco economías. Su proyección al 2030 es la referencia que hoy usa casi todo el mundo.",
      },
      {
        tipo: "grafico",
        titulo: "Movimiento de empleo global proyectado al 2030",
        bajada: "Millones de puestos creados, desplazados y saldo neto.",
        barras: [
          { label: "Empleos creados", valor: 170, texto: "170 M" },
          { label: "Empleos desplazados", valor: 92, texto: "92 M", tono: "neutro" },
          { label: "Saldo neto", valor: 78, texto: "+78 M" },
        ],
        nota: "El 22 % de todos los puestos de trabajo se verá afectado de alguna forma por esta reconfiguración.",
        fuente: "World Economic Forum, Future of Jobs Report 2025 · enero de 2025",
      },
      {
        tipo: "parrafo",
        texto:
          "Un saldo positivo de 78 millones de empleos suena tranquilizador hasta que uno se detiene en la letra chica: los 170 millones que se crean y los 92 millones que se pierden no son las mismas personas, ni están en los mismos lugares, ni requieren las mismas capacidades. El neto es una estadística. La transición es un problema individual.",
      },
      {
        tipo: "subtitulo",
        texto: "El número que de verdad importa es el 39 %",
      },
      {
        tipo: "dato",
        valor: "39 %",
        texto:
          "de las competencias clave de los puestos actuales van a cambiar hacia 2030, según los propios empleadores. En 2023 la estimación era del 44 %.",
      },
      {
        tipo: "parrafo",
        texto:
          "Que la cifra haya bajado de 44 % a 39 % no significa que la disrupción se esté frenando. Significa que las empresas ya empezaron a moverse: parte de esa reconversión dejó de ser futuro y pasó a ser presente. Los que se preparan reducen el porcentaje pendiente.",
      },
      {
        tipo: "grafico",
        titulo: "Lo que esperan los empleadores hacia 2030",
        bajada: "Porcentaje de empleadores encuestados que afirma cada punto.",
        barras: [
          { label: "Espera mayor demanda de habilidades en IA y big data", valor: 90, texto: "90 %" },
          {
            label: "Espera que la IA transforme su negocio",
            valor: 86,
            texto: "86 %",
            tono: "neutro",
          },
          {
            label: "Se compromete a reconvertir y capacitar a su gente",
            valor: 77,
            texto: "77 %",
            tono: "neutro",
          },
          { label: "Competencias clave que cambiarán", valor: 39, texto: "39 %" },
        ],
        nota: "Casi todos ven venir el cambio. Tres de cada cuatro dicen que van a invertir en su gente para atravesarlo.",
        fuente: "World Economic Forum, Future of Jobs Report 2025",
      },
      {
        tipo: "subtitulo",
        texto: "Qué crece y qué se apaga",
      },
      {
        tipo: "parrafo",
        texto:
          "El informe distingue entre los roles que más crecen en términos relativos y los que más caen. Vale mirar las dos columnas juntas, porque el patrón que las une dice más que cualquiera de las dos por separado.",
      },
      {
        tipo: "tabla",
        titulo: "Roles en crecimiento y en retroceso hacia 2030",
        columnas: ["Los que más crecen", "Los que más caen"],
        filas: [
          ["Especialistas en big data", "Empleados de servicios postales"],
          ["Ingenieros fintech", "Cajeros de banco y roles afines"],
          ["Especialistas en IA y machine learning", "Empleados de carga de datos"],
          ["Desarrolladores de software y aplicaciones", "Personal administrativo y de secretaría"],
          ["Especialistas en gestión de seguridad", "Empleados de contabilidad y facturación"],
        ],
        fuente: "World Economic Forum, Future of Jobs Report 2025",
      },
      {
        tipo: "parrafo",
        texto:
          "La columna de la derecha tiene una característica común: son puestos construidos alrededor de **trasladar información de un lado a otro sin transformarla**. Cargar un dato, verificar un formulario, pasar un número de una planilla a un sistema. Es exactamente la clase de tarea que un modelo hace bien, barato y sin cansarse.",
      },
      {
        tipo: "parrafo",
        texto:
          "La columna de la izquierda, en cambio, agrupa puestos donde alguien tiene que decidir algo: qué significa este dato, qué riesgo estamos tomando, qué arquitectura conviene. Ahí la IA acelera, pero no reemplaza el criterio.",
      },
      {
        tipo: "cita",
        texto:
          "Lo que se automatiza primero no son los trabajos difíciles. Son los trabajos repetitivos, por difíciles que parezcan.",
      },
      {
        tipo: "subtitulo",
        texto: "El caso raro: la IA crea y destruye casi en la misma proporción",
      },
      {
        tipo: "parrafo",
        texto:
          "Hay un dato del informe que suele pasar desapercibido y que conviene tener a mano cuando alguien afirma que «la IA va a destruir el empleo». Dentro del rubro específico de IA y procesamiento de datos, el Foro proyecta **11 millones de puestos creados y 9 millones reemplazados**. Es de los rubros más equilibrados de todo el estudio.",
      },
      {
        tipo: "parrafo",
        texto:
          "La tecnología que más miedo genera es, en su propio terreno, bastante menos destructiva de lo que anuncia el titular promedio. Lo que sí hace, y con fuerza, es empujar competencias hacia arriba: el 90 % de los empleadores espera un aumento de la demanda de habilidades en IA y big data hacia 2030 —el crecimiento más rápido de todas las competencias medidas.",
      },
      {
        tipo: "subtitulo",
        texto: "Cómo se reescribe un puesto, en concreto",
      },
      {
        tipo: "parrafo",
        texto:
          "En las formaciones uso un ejercicio simple que se puede hacer en veinte minutos, solo o con el equipo. Consiste en desarmar el puesto en tareas y clasificarlas en tres columnas:",
      },
      {
        tipo: "lista",
        items: [
          "**Tareas que puedo delegar.** Repetitivas, con criterio estable y bajo costo de error. Redacción de borradores, resúmenes, transcripciones, primeras versiones de un análisis. Acá la IA gana tiempo y hay que dárselo.",
          "**Tareas que puedo amplificar.** Donde hoy hacés una versión y con ayuda podrías hacer cinco y elegir la mejor: ideas de campaña, escenarios financieros, revisiones de un contrato. Acá el valor no está en ir más rápido sino en explorar más opciones.",
          "**Tareas que son tuyas y no se negocian.** Decisiones con impacto en personas, juicios sobre información incompleta, conversaciones difíciles, cualquier cosa que requiera hacerse cargo del resultado. Acá la IA puede aportar insumos, nunca la firma.",
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "Cuando alguien termina ese ejercicio y ve que la primera columna se llevó el 30 o el 40 % de su semana, la pregunta cambia sola. Deja de ser «¿me van a reemplazar?» y pasa a ser «¿qué hago con el tiempo que se libera?». Esa segunda pregunta es mucho más difícil, y es la que verdaderamente define quién sale ganando.",
      },
      {
        tipo: "parrafo",
        texto:
          "Porque la reconversión no la va a resolver ninguna empresa por vos, aunque el 77 % diga que va a invertir en su gente. La va a acompañar. La decisión de qué columna querés que crezca en tu semana sigue siendo, todavía, bastante personal.",
      },
      {
        tipo: "fuentes",
        items: [
          {
            label: "World Economic Forum — Future of Jobs Report 2025, enero de 2025",
            url: "https://www.weforum.org/press/2025/01/future-of-jobs-report-2025-78-million-new-job-opportunities-by-2030-but-urgent-upskilling-needed-to-prepare-workforces/",
          },
          {
            label: "WEF — Los empleos que más crecen y más caen hacia 2030",
            url: "https://www.weforum.org/stories/2025/01/future-of-jobs-report-2025-the-fastest-growing-and-declining-jobs/",
          },
          {
            label: "WEF — Los empleos del futuro y las habilidades para conseguirlos",
            url: "https://www.weforum.org/stories/2025/01/future-of-jobs-report-2025-jobs-of-the-future-and-the-skills-you-need-to-get-them/",
          },
        ],
      },
    ],
  },

  /* =================================================================
     10 — LA REUNIÓN SEMANAL QUE SOSTIENE LA ADOPCIÓN
     ================================================================= */
  {
    slug: "reunion-semanal-de-adopcion-de-ia",
    titulo: "Sesenta minutos por semana es lo que sostiene una adopción de IA",
    categoria: "Método",
    fecha: "2026-07-03",
    fechaLabel: "3 de julio de 2026",
    lectura: "6 min de lectura",
    resumen:
      "Las adopciones de IA no se caen por falta de plan. Se caen en la semana cuatro, cuando aparece la primera urgencia. La cadencia fija es lo único que las sostiene: qué pasa en esa reunión, quién va y qué se revisa.",
    img: "/images/blog/07-sesenta-minutos-por-semana.png",
    imgLabel: "/images/blog/07-sesenta-minutos-por-semana.png",
    cuerpo: [
      {
        tipo: "parrafo",
        texto:
          "Si tuviera que quedarme con una sola práctica de todo lo que instalo en una empresa, y tirar el resto, me quedaría con la reunión semanal. No con el tablero de oportunidades, no con el protocolo de pruebas, no con la capacitación. Con los sesenta minutos del jueves.",
      },
      {
        tipo: "parrafo",
        texto:
          "Suena a poco. Es lo único que hace que todo lo demás siga existiendo en la semana seis.",
      },
      {
        tipo: "subtitulo",
        texto: "La adopción no se cae por falta de plan. Se cae en la semana cuatro",
      },
      {
        tipo: "parrafo",
        texto:
          "El patrón se repite con una regularidad casi aburrida. Semana uno: entusiasmo, todo el mundo participa. Semana dos: avances reales, se prueban cosas. Semana tres: aparece la primera urgencia del negocio y alguien no puede venir. Semana cuatro: la reunión «se pasa para la próxima». Semana seis: ya nadie la agenda, y si preguntás por el proyecto te dicen que quedó medio parado.",
      },
      {
        tipo: "parrafo",
        texto:
          "Nunca hay una decisión de abandonar. Es siempre lo mismo: la adopción de IA compite contra lo urgente en igualdad de condiciones, y en esa pelea pierde todas las veces. La cadencia fija es lo que la saca de esa competencia.",
      },
      {
        tipo: "cita",
        texto:
          "Nadie decide dejar de adoptar IA. Simplemente se deja de tener la reunión, que es la forma silenciosa de decidirlo.",
      },
      {
        tipo: "subtitulo",
        texto: "Los sesenta minutos, minuto a minuto",
      },
      {
        tipo: "parrafo",
        texto:
          "La agenda importa más de lo que parece, porque sin ella la reunión se convierte en una charla sobre herramientas nuevas. Esta es la que uso, y el reparto de tiempos no es decorativo:",
      },
      {
        tipo: "tabla",
        titulo: "Agenda de la reunión semanal de adopción",
        columnas: ["Bloque", "Minutos", "Qué pasa"],
        filas: [
          [
            "Compromisos de la semana pasada",
            "10",
            "Se leen uno por uno: hecho, no hecho, trabado. Sin discusión todavía. El objetivo es que quede a la vista lo que no avanzó",
          ],
          [
            "La prueba en curso",
            "20",
            "Quien la lleva muestra lo que hizo y los números que tiene hasta ahora, contra la línea de base. Se muestra el trabajo, no se cuenta",
          ],
          [
            "Decisiones",
            "15",
            "Cada prueba que llegó a su fecha se cierra con una de cinco palabras: adoptar, iterar, pausar, descartar o escalar. No se sale de la reunión sin la palabra dicha",
          ],
          [
            "Tablero de oportunidades",
            "10",
            "Ideas nuevas que aparecieron en la semana. Se anotan y se priorizan; no se discute su viabilidad acá",
          ],
          [
            "Compromisos",
            "5",
            "Qué hace cada uno hasta la próxima, con nombre. Se escribe en el momento y se manda al grupo antes de que termine el día",
          ],
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "El bloque más importante es el tercero, y es el que más se saltea cuando la reunión se estira. Si las decisiones quedan siempre para el final y el final siempre se come, la reunión se transforma en un informe de avance semanal — que es exactamente el formato que nadie sostiene más de dos meses.",
      },
      {
        tipo: "subtitulo",
        texto: "Quién va, y sobre todo quién no",
      },
      {
        tipo: "lista",
        items: [
          "**El referente de adopción.** Una persona de la casa que sostiene el proceso: convoca, modera, escribe los compromisos y persigue lo que quedó trabado. Le lleva tres o cuatro horas semanales contando la reunión.",
          "**Un responsable por cada área con prueba activa.** No el área entera: quien la está llevando adelante. Si un área no tiene prueba activa esa semana, no necesita estar.",
          "**Alguien de dirección, cada quince días.** No todas las semanas: cada dos. Presente en el bloque de decisiones, que es donde su participación cambia algo. Su presencia intermitente y previsible funciona mejor que la permanente, que termina convirtiendo la reunión en una rendición de cuentas.",
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "Lo que no es esta reunión: una reunión de todos. Si van doce personas, se vuelve una presentación y deja de ser un espacio de trabajo. Con cuatro o cinco alcanza y sobra.",
      },
      {
        tipo: "subtitulo",
        texto: "Las tres reglas que la mantienen viva",
      },
      {
        tipo: "lista",
        items: [
          "**Día y hora fijos, en el calendario, recurrente.** Si cada semana hay que coordinar cuándo, la reunión ya está muerta y todavía no se dieron cuenta. Elegí un horario que no compita con el pico de trabajo del negocio.",
          "**Se hace igual aunque no haya novedades.** Es la regla más resistida y la más importante. Una reunión de quince minutos donde se dice «esta semana no avanzamos por X» es información valiosísima: es la señal temprana de que algo se está apagando. Cancelarla por falta de novedades es tapar justo el dato que hacía falta ver.",
          "**Termina con decisiones escritas.** Cinco líneas en el grupo de trabajo, el mismo día. Sin ese registro, la semana siguiente arranca discutiendo qué se había acordado.",
        ],
      },
      {
        tipo: "subtitulo",
        texto: "Cómo se ve a los tres meses",
      },
      {
        tipo: "parrafo",
        texto:
          "Una empresa que sostuvo la cadencia doce semanas llega a un lugar bastante distinto del que imaginaba al empezar. Suele tener entre cuatro y seis pruebas cerradas —con varias descartadas, que es lo esperable—, dos o tres procesos funcionando de otra manera, un tablero con más ideas de las que puede probar y, sobre todo, gente que ya sabe cómo se hace. Ese último punto es el que importa: para ese momento, la reunión ya no la sostengo yo.",
      },
      {
        tipo: "parrafo",
        texto:
          "El [State of AI 2025 de McKinsey](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai) encontró que las organizaciones de alto desempeño en IA son tres veces más propensas a que sus líderes senior muestren compromiso sostenido con las iniciativas. «Sostenido» es una palabra difícil de convertir en una acción concreta. Aparecer una hora cada quince días, siempre el mismo día, es lo más concreto que se me ocurre.",
      },
      {
        tipo: "parrafo",
        texto:
          "Instalar esa cadencia, y dejarla funcionando con gente de la casa, es literalmente el objetivo del [Programa INTEGRA](/programa-integra). Todo lo demás —el tablero, el protocolo, los roles— existe para darle contenido a esos sesenta minutos.",
      },
      {
        tipo: "fuentes",
        items: [
          {
            label: "McKinsey — The State of AI, 2025",
            url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
          },
          {
            label: "BCG — From Potential to Profit: Closing the AI Impact Gap",
            url: "https://www.bcg.com/publications/2025/closing-the-ai-impact-gap",
          },
        ],
      },
    ],
  },

  /* =================================================================
     11 — DEL CAOS AL CRITERIO COMÚN
     ================================================================= */
  {
    slug: "criterio-comun-de-ia-en-la-empresa",
    titulo: "De «cada uno usa una IA distinta» a tener un criterio común",
    categoria: "Adopción",
    fecha: "2026-06-30",
    fechaLabel: "30 de junio de 2026",
    lectura: "7 min de lectura",
    resumen:
      "Seis herramientas, ninguna regla y datos de clientes viajando por chats que nadie audita. El recorrido de una empresa que pasó del uso disperso a un método común, y los tres pasos que marcaron la diferencia.",
    img: "/images/blog/08-de-fragmentacion-a-criterio-comun.png",
    imgLabel: "/images/blog/08-de-fragmentacion-a-criterio-comun.png",
    cuerpo: [
      {
        tipo: "parrafo",
        texto:
          "Una distribuidora de sesenta personas me llamó con un pedido raro: querían «poner orden con la IA». Cuando pregunté qué estaba desordenado, la respuesta fue larga. Comercial armaba propuestas con una herramienta, administración usaba otra para resumir mails, alguien de marketing había contratado una tercera con su tarjeta, y el gerente de operaciones le pasaba planillas con datos de clientes a un chat para que se las analizara.",
      },
      {
        tipo: "parrafo",
        texto:
          "Nadie estaba haciendo nada malo. Cada uno resolvía su problema con lo que tenía a mano. El problema era que la suma de esas soluciones individuales no era una capacidad de la empresa: era ruido con riesgo adentro.",
      },
      {
        tipo: "subtitulo",
        texto: "El diagnóstico: seis herramientas, ningún criterio",
      },
      {
        tipo: "parrafo",
        texto:
          "El primer hallazgo fue de escala. El uso real era mucho mayor de lo que la dirección creía. Es un desfasaje sistemático, no una particularidad de esta empresa: el informe [Superagency in the workplace](https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/superagency-in-the-workplace-empowering-people-to-unlock-ais-full-potential) de McKinsey encontró que los empleados adoptan IA generativa mucho más rápido de lo que sus líderes estiman.",
      },
      {
        tipo: "parrafo",
        texto:
          "El segundo hallazgo fue de criterio. Preguntamos a doce personas la misma cosa: «¿qué información de la empresa no pondrías en una de estas herramientas?». Hubo doce respuestas distintas. Algunas muy prudentes, algunas muy despreocupadas, ninguna equivocada — porque no había ninguna regla contra la cual estar equivocado.",
      },
      {
        tipo: "cita",
        texto:
          "Cuando no hay criterio escrito, cada persona improvisa el suyo. Y después la empresa descubre que tenía sesenta políticas de datos distintas.",
      },
      {
        tipo: "subtitulo",
        texto: "Los tres pasos que marcaron la diferencia",
      },
      {
        tipo: "parrafo",
        texto:
          "Lo que hicieron en los dos meses siguientes fue notablemente poco sofisticado. Tres pasos, en este orden, que es el orden que importa:",
      },
      {
        tipo: "lista",
        items: [
          "**Primero, mapear el uso real sin castigar a nadie.** La dirección mandó un mensaje explícito: queremos saber qué usás, no vamos a prohibir nada y no hay consecuencias. Sin esa aclaración —dicha por el dueño, no por el área de sistemas— el mapa habría salido incompleto y no habría servido para nada.",
          "**Segundo, escribir un criterio de una página.** Una sola página, en el idioma de la empresa: qué se puede hacer sin preguntar, qué información no sale nunca de la empresa, y qué salidas requieren revisión humana antes de mandarse a un cliente. Nada de un reglamento de veinte páginas que nadie va a leer.",
          "**Tercero, elegir una herramienta común con cuentas de empresa y un dueño.** No la mejor del mercado: una que cubriera el 80 % de los usos, contratada a nombre de la empresa, con una persona responsable de administrarla y de contestar dudas.",
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "El orden es lo que hace que funcione. Casi todas las empresas que fracasan en esto empiezan por el tercer paso —compran una plataforma— y después descubren que nadie sabe para qué usarla ni con qué límites.",
      },
      {
        tipo: "tabla",
        titulo: "Antes y después, a los dos meses",
        columnas: ["Dimensión", "Antes", "Después"],
        filas: [
          [
            "Herramientas",
            "Seis, contratadas por cuatro personas distintas",
            "Una común con cuenta de empresa, más dos específicas justificadas",
          ],
          [
            "Datos sensibles",
            "Cada uno decidía por su cuenta qué pegar en un chat",
            "Una regla escrita de tres líneas que todos conocen",
          ],
          [
            "Dueño",
            "Nadie",
            "Una persona con nombre, con tres horas semanales asignadas",
          ],
          [
            "Lo que funcionaba bien",
            "Se quedaba en el escritorio de quien lo descubría",
            "Se comparte en la reunión quincenal y queda en un repositorio",
          ],
          [
            "Gasto",
            "Disperso en tarjetas personales, sin total conocido",
            "Una factura, un número, revisión trimestral",
          ],
        ],
      },
      {
        tipo: "subtitulo",
        texto: "Lo que no hicieron",
      },
      {
        tipo: "lista",
        items: [
          "**No prohibieron nada.** La prohibición no elimina el uso: lo esconde, y lo esconde justo de la gente que necesitaría verlo. Un uso invisible no se puede mejorar ni proteger.",
          "**No compraron una plataforma cara.** La tentación de resolver un problema de criterio con una compra es enorme, porque una compra se ejecuta en una tarde y un criterio lleva conversaciones. Pero la plataforma sin criterio reproduce el mismo caos con mejor interfaz.",
          "**No armaron un comité.** Un dueño con tiempo asignado y una reunión quincenal funcionaron mucho mejor que seis personas reunidas una vez por mes para aprobar cosas.",
        ],
      },
      {
        tipo: "subtitulo",
        texto: "Lo que sí cambió de fondo",
      },
      {
        tipo: "parrafo",
        texto:
          "El efecto más importante no fue el orden ni el ahorro. Fue que lo que descubría una persona empezó a servirle a las demás. Antes, alguien de administración encontraba una manera mucho mejor de resolver una tarea y esa mejora moría en su escritorio; nadie más se enteraba. Después, esa misma mejora aparecía en la reunión quincenal y a la semana la estaban usando tres áreas.",
      },
      {
        tipo: "parrafo",
        texto:
          "Ese es el cambio real entre uso individual y capacidad organizacional: no que la gente use mejor las herramientas, sino que los hallazgos se acumulen en algún lado en vez de evaporarse.",
      },
      {
        tipo: "parrafo",
        texto:
          "Y ninguna de las tres cosas que hicieron requería tecnología. Requerían estructura: alguien que decida, algo escrito y un lugar donde las cosas se junten. Eso es lo que hay que instalar antes —no después— de comprar la próxima herramienta.",
      },
      {
        tipo: "fuentes",
        items: [
          {
            label: "McKinsey — Superagency in the workplace, enero de 2025",
            url: "https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/superagency-in-the-workplace-empowering-people-to-unlock-ais-full-potential",
          },
          {
            label: "McKinsey — The State of AI, 2025",
            url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
          },
        ],
      },
    ],
  },

  /* =================================================================
     12 — DE LA ANSIEDAD DEL DUEÑO A UN PLAN
     ================================================================= */
  {
    slug: "el-dueno-quiere-hacer-algo-con-ia",
    titulo: "Del «el dueño quiere hacer algo con IA» a un plan ejecutable",
    categoria: "Liderazgo",
    fecha: "2026-06-26",
    fechaLabel: "26 de junio de 2026",
    lectura: "7 min de lectura",
    resumen:
      "Vuelve de un congreso convencido de que se están quedando atrás y baja la orden. La ansiedad es buen combustible y pésima brújula: siete preguntas que la convierten en una dirección concreta.",
    img: "/images/blog/09-de-idea-del-dueno-a-plan.png",
    imgLabel: "/images/blog/09-de-idea-del-dueno-a-plan.png",
    cuerpo: [
      {
        tipo: "parrafo",
        texto:
          "El llamado empieza casi siempre igual: «Pablo, el dueño volvió de un congreso y quiere que hagamos algo con IA. No sabemos bien qué, pero quiere que arranquemos ya».",
      },
      {
        tipo: "parrafo",
        texto:
          "Del otro lado hay un gerente incómodo, que necesita llevar una respuesta a una reunión y que sabe que si contesta cualquier cosa va a terminar sosteniendo un proyecto que nadie definió.",
      },
      {
        tipo: "subtitulo",
        texto: "La ansiedad es buen combustible y pésima brújula",
      },
      {
        tipo: "parrafo",
        texto:
          "Conviene decir algo a favor del dueño: esa urgencia suele estar bien fundada. Vio algo real, entendió que el contexto cambió y quiere moverse. La energía que trae es un activo escaso — muchos proyectos de IA fracasan justamente por falta de esa convicción arriba.",
      },
      {
        tipo: "parrafo",
        texto:
          "El problema es que la ansiedad empuja pero no orienta. Y como no orienta, la empresa hace lo primero que se le ocurre, que casi siempre es comprar una herramienta o contratar una capacitación general. Dos meses después la energía se gastó, no pasó nada medible, y la próxima vez que el dueño proponga algo va a encontrar un equipo bastante más escéptico.",
      },
      {
        tipo: "cita",
        texto:
          "La pregunta no es qué hacemos con IA. Es qué problema de esta empresa vale la pena que la IA toque primero.",
      },
      {
        tipo: "subtitulo",
        texto: "Las siete preguntas que convierten urgencia en dirección",
      },
      {
        tipo: "parrafo",
        texto:
          "Esta conversación dura una hora y hay que tenerla con el dueño, no sobre el dueño. Es la diferencia entre volver con una orden y volver con un encuadre.",
      },
      {
        tipo: "tabla",
        titulo: "La conversación que cambia todo",
        columnas: ["Pregunta", "Por qué funciona"],
        filas: [
          [
            "¿Qué viste que te impresionó?",
            "Recupera el caso concreto que disparó todo. Muchas veces es algo mucho más acotado de lo que parecía, y ahí ya hay un candidato a primera prueba",
          ],
          [
            "¿Qué te preocupa que pase si no hacemos nada?",
            "Distingue miedo competitivo de dolor operativo. Son urgencias distintas y llevan a proyectos distintos",
          ],
          [
            "Si dentro de seis meses esto salió bien, ¿qué es distinto acá adentro?",
            "Obliga a describir un resultado observable. Si la respuesta es «estaríamos más avanzados», hay que insistir hasta que aparezca algo que se pueda ver",
          ],
          [
            "¿Qué proceso de la empresa te duele hoy?",
            "Trae la conversación desde la tecnología hacia la operación, que es donde vive el valor",
          ],
          [
            "¿Cuánto estás dispuesto a poner: plata, horas de tu gente y tiempo tuyo?",
            "Las tres, y en ese orden de dificultad. El tercero es el que predice el resultado — un dueño que no pone tiempo propio está delegando algo que no se delega",
          ],
          [
            "¿Quién va a ser el dueño interno de esto?",
            "Sin un nombre y horas asignadas, cualquier plan es una lista de deseos. Y ese nombre no puede ser «el de sistemas» por defecto",
          ],
          [
            "¿Qué NO estamos dispuestos a cambiar?",
            "La más subestimada. Define los límites reales del proyecto antes de chocar contra ellos en la semana cinco",
          ],
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "La quinta pregunta es la que más incomoda y la que más información da. El principio 10-20-70 de BCG estima que el 70 % del valor de una iniciativa de IA sale de personas, procesos y cultura — es decir, del territorio que solo se mueve si quien dirige se involucra. Un presupuesto sin tiempo de dirección compra tecnología, no resultados.",
      },
      {
        tipo: "subtitulo",
        texto: "De las respuestas al plan: tres decisiones",
      },
      {
        tipo: "parrafo",
        texto:
          "Con esas siete respuestas, el plan sale en media hora y tiene tres decisiones. No más:",
      },
      {
        tipo: "lista",
        items: [
          "**Alcance: un área, no la empresa.** La que combine dolor real con un responsable dispuesto. Empezar por todos lados es la manera más segura de no terminar en ninguno.",
          "**Dueño interno con horas asignadas.** Tres o cuatro horas semanales, sacadas de algo que deje de hacer. Si esas horas se suman a su carga actual, el proyecto ya está compitiendo contra lo urgente y va a perder.",
          "**Primera prueba con fecha de cierre.** Chica, medible y cerrada en tres o cuatro semanas. La primera prueba no busca el mayor impacto posible: busca demostrar que en esta empresa las cosas se prueban y se cierran.",
        ],
      },
      {
        tipo: "subtitulo",
        texto: "El error más caro: contestar con una herramienta",
      },
      {
        tipo: "parrafo",
        texto:
          "Cuando el dueño baja la urgencia, la respuesta más rápida —y la más tentadora, porque se ejecuta en una tarde— es comprar algo. Una plataforma, licencias para todos, un curso para cuarenta personas. Se puede informar en la próxima reunión y suena a acción.",
      },
      {
        tipo: "parrafo",
        texto:
          "El costo aparece después. La herramienta llega a una empresa que no definió qué proceso quería cambiar, así que cada uno la usa como puede o no la usa. A los tres meses la conclusión que circula no es «no supimos implementarlo», que sería útil, sino «la IA no era para nosotros», que cierra la puerta por un año.",
      },
      {
        tipo: "parrafo",
        texto:
          "Por eso, cuando me llaman con el pedido del título, mi primera propuesta nunca es un plan de trabajo. Es una reunión de una hora con el dueño y estas siete preguntas. En la mayoría de los casos, de esa hora sale un proyecto bastante más chico, bastante más concreto y bastante más ambicioso que el que estaba en la cabeza de todos.",
      },
      {
        tipo: "fuentes",
        items: [
          {
            label: "BCG — From Potential to Profit: Closing the AI Impact Gap",
            url: "https://www.bcg.com/publications/2025/closing-the-ai-impact-gap",
          },
          {
            label: "McKinsey — The State of AI, 2025",
            url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
          },
        ],
      },
    ],
  },

  /* =================================================================
     13 — QUE NO DEPENDA DE UNA SOLA PERSONA
     ================================================================= */
  {
    slug: "adopcion-de-ia-sin-depender-de-una-persona",
    titulo: "Si el experto en IA se va, se cae todo",
    categoria: "Equipos",
    fecha: "2026-06-23",
    fechaLabel: "23 de junio de 2026",
    lectura: "7 min de lectura",
    resumen:
      "Toda empresa que arrancó con IA tiene un entusiasta que sabe más que el resto. Es el mejor activo del proceso y su punto más frágil. Cómo pasar de excepciones personales a un sistema que sobrevive a las vacaciones.",
    img: "/images/blog/10-si-el-experto-se-va.png",
    imgLabel: "/images/blog/10-si-el-experto-se-va.png",
    cuerpo: [
      {
        tipo: "parrafo",
        texto:
          "Una empresa me escribió en marzo con un problema muy concreto: se les iba Martín. Martín no era el gerente de sistemas ni el director de innovación. Era un analista de veintiocho años que había aprendido a usar bien las herramientas de IA y que, sin que nadie se lo pidiera formalmente, había terminado resolviendo con ellas media docena de tareas de tres áreas distintas.",
      },
      {
        tipo: "parrafo",
        texto:
          "Cuando renunció, nadie sabía qué hacía exactamente ni cómo. Los informes que él armaba en veinte minutos volvieron a llevar medio día. Y lo peor: nadie podía explicar por qué antes salían bien.",
      },
      {
        tipo: "subtitulo",
        texto: "La diferencia entre una excepción y un sistema",
      },
      {
        tipo: "parrafo",
        texto:
          "Todo lo que Martín había construido era una excepción: funcionaba porque él estaba. Un sistema es lo contrario — funciona porque está escrito, tiene dueño y se puede transferir. La distinción parece obvia enunciada así, pero en la práctica cuesta verla, porque una excepción que funciona muy bien se parece bastante a un sistema.",
      },
      {
        tipo: "tabla",
        titulo: "Cómo distinguir una de otro",
        columnas: ["Dimensión", "Excepción", "Sistema"],
        filas: [
          ["Quién sabe cómo se hace", "Una persona", "Al menos dos, y está escrito"],
          [
            "Dónde vive el conocimiento",
            "En su cabeza y en su historial de chats",
            "En un repositorio que el resto puede abrir hoy",
          ],
          [
            "Si esa persona falta tres semanas",
            "La tarea vuelve al método anterior o no se hace",
            "Otro la toma con una hora de lectura",
          ],
          [
            "Cómo mejora",
            "Cuando a esa persona se le ocurre algo",
            "Cualquiera propone un cambio y se revisa en la reunión",
          ],
          [
            "Cómo se detecta un error",
            "Cuando explota",
            "Hay un control definido y alguien que lo mira",
          ],
        ],
      },
      {
        tipo: "cita",
        texto:
          "Si tu adopción de IA depende de una persona, no tenés una capacidad instalada. Tenés un talento contratado, y los talentos se van.",
      },
      {
        tipo: "subtitulo",
        texto: "Qué documentación importa de verdad",
      },
      {
        tipo: "parrafo",
        texto:
          "Acá hay una trampa. Cuando una empresa se asusta con esto, la reacción típica es pedir «documentación», y lo que llega son cuarenta páginas explicando cómo se usa una herramienta que además cambia cada tres meses. Eso no sirve y nadie lo lee.",
      },
      {
        tipo: "parrafo",
        texto:
          "Lo que hay que documentar es mucho más corto y mucho más específico de tu empresa:",
      },
      {
        tipo: "lista",
        items: [
          "**La instrucción que funciona, y por qué.** El texto exacto que se usa, pegado tal cual, con dos renglones explicando qué se probó antes y por qué esta versión quedó. El «por qué» es lo que permite adaptarla cuando algo cambie.",
          "**Qué información entra y cuál no.** Qué archivos, de qué sistema, en qué formato. Y explícitamente qué no se carga nunca.",
          "**Qué se revisa antes de que salga.** El control humano concreto: qué mira una persona antes de mandar el resultado a un cliente, a un proveedor o al sistema contable.",
          "**Qué se probó y se descartó.** Es la parte que más se olvida y la que más tiempo ahorra. Sin esto, el reemplazo de Martín va a pasar tres semanas redescubriendo los mismos callejones sin salida.",
          "**Dónde está el error típico.** En qué casos falla, cómo se nota y qué hacer cuando pasa.",
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "Son cinco puntos y entran en una página por proceso. La regla que uso: si documentar un proceso lleva más de treinta minutos, probablemente el proceso todavía no está lo suficientemente entendido como para documentarlo.",
      },
      {
        tipo: "subtitulo",
        texto: "Roles, no héroes",
      },
      {
        tipo: "parrafo",
        texto:
          "El otro pilar es que las responsabilidades estén repartidas por rol y no concentradas en quien más entusiasmo tiene. Con tres roles alcanza para una PyME:",
      },
      {
        tipo: "tabla",
        titulo: "Los tres roles mínimos",
        columnas: ["Rol", "Qué decide", "Cuánto tiempo pide"],
        filas: [
          [
            "Referente de adopción",
            "Sostiene el método: convoca la reunión, mantiene el tablero y el repositorio, persigue lo trabado. No decide qué se prueba: garantiza que se decida",
            "3 o 4 horas por semana",
          ],
          [
            "Dueño de proceso",
            "Es de cada área. Decide si el cambio se adopta en su proceso, porque después va a convivir con él todos los días",
            "2 horas por semana mientras hay una prueba activa en su área",
          ],
          [
            "Dirección",
            "Prioriza entre áreas, habilita recursos y ratifica los cierres. Aparece cada quince días",
            "1 hora cada dos semanas",
          ],
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "Lo importante de esta tabla no son los roles sino la última columna. Un rol sin horas asignadas es un título honorífico: la persona lo va a atender con lo que le sobre, y en una PyME nunca sobra nada.",
      },
      {
        tipo: "subtitulo",
        texto: "La prueba de las tres semanas",
      },
      {
        tipo: "parrafo",
        texto:
          "Hay una manera muy simple de saber si tenés un sistema o una excepción, y no requiere que se te vaya nadie: mandá de vacaciones a la persona que más sabe y no la llames.",
      },
      {
        tipo: "parrafo",
        texto:
          "Si a las tres semanas los procesos siguen funcionando —quizás un poco más lento, con alguna consulta—, tenés un sistema. Si a los tres días alguien la está llamando por WhatsApp para preguntarle cómo se hacía algo, tenés una excepción muy bien disfrazada. Y es mejor descubrirlo mientras esa persona todavía trabaja con vos.",
      },
      {
        tipo: "parrafo",
        texto:
          "El principio 10-20-70 de BCG dice que el 70 % del valor de la IA sale de personas, procesos y cultura. Lo que casi nunca se aclara es que ese 70 % es también la parte más frágil: los algoritmos no renuncian, la gente sí. Por eso la meta no puede ser que alguien de la casa sepa mucho de IA. Tiene que ser que la empresa sepa — que es una cosa distinta y bastante más difícil de construir.",
      },
      {
        tipo: "fuentes",
        items: [
          {
            label: "BCG — From Potential to Profit: Closing the AI Impact Gap",
            url: "https://www.bcg.com/publications/2025/closing-the-ai-impact-gap",
          },
          {
            label: "McKinsey — The State of AI, 2025",
            url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
          },
        ],
      },
    ],
  },
];

export const getPost = (slug: string) => blog.find((p) => p.slug === slug);
