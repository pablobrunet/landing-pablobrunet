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
     01 — ADOPCIÓN DE IA EN AMÉRICA LATINA
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
     02 — LIDERAZGO EN LA ERA DE LA IA
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
     03 — CÓMO CAMBIAN LOS ROLES
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
];

export const getPost = (slug: string) => blog.find((p) => p.slug === slug);
