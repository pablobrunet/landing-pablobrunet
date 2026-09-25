/* =====================================================================
   /programa-ejecutivos — contenido del anexo
   ---------------------------------------------------------------------
   TODO el texto de las tres páginas del anexo vive acá. Los componentes
   de /src/components/ejecutivos sólo lo dibujan: para cambiar una palabra
   no hace falta tocar código.

   El contenido es el del repo ai-first-landing, portado tal cual: mismas
   secciones, mismo orden y mismos textos. Si cambia algo allá, este
   archivo es el único punto de sincronización.

   IMÁGENES: son las URLs del CDN que ya usaba el original. Si en algún
   momento se quieren servir desde el sitio, hay que bajarlas a
   /public/images/ejecutivos/ y cambiar sólo estas rutas.
   ===================================================================== */

const AGENDA =
  "https://api.leadconnectorhq.com/widget/bookings/ai-first-reunin-de-descubrimie";
const WHATSAPP = "https://wa.me/5493426112533";

export const ejecutivos = {
  /* ---- Rutas del anexo (una sola fuente de verdad para los enlaces) ---- */
  rutas: {
    inicio: "/programa-ejecutivos",
    programa: "/programa-ejecutivos/programa",
    gracias: "/programa-ejecutivos/agenda-confirmada",
    rostagno: "/programa-ejecutivos/alejandro-rostagno",
  },

  enlaces: {
    agenda: AGENDA,
    whatsapp: WHATSAPP,
  },

  /* ---- Marca del anexo: Programas AI First ----
     Las versiones recortadas y livianas de los logos que están en
     /public/images/programas ai first/ (los originales, cuadrados y con
     mucho aire alrededor). `monograma` es sólo "pAI", sin la leyenda. */
  marca: {
    nombre: "Programas AI First",
    monograma: "/images/programas-ai-first/mark-color.webp",
    logoColor: "/images/programas-ai-first/logo-color.webp",
    logoBlanco: "/images/programas-ai-first/logo-blanco.webp",
    favicon: "/images/programas-ai-first/favicon.png",
  },

  /* Menú de la barra superior de las tres páginas. Lo dibuja el mismo
     <Navbar /> del sitio, así que se ve igual que en pablobrunet.com. Los
     enlaces a secciones llevan la ruta completa para que funcionen también
     desde /programa. */
  nav: {
    items: [
      { label: "Soluciones", href: "/programa-ejecutivos#soluciones" },
      { label: "Resultados", href: "/programa-ejecutivos#resultados" },
      { label: "Programa ejecutivo", href: "/programa-ejecutivos/programa" },
      {
        label: "Quiénes somos",
        href: "/programa-ejecutivos#equipo",
        menu: {
          verTodos: "/programa-ejecutivos#equipo",
          verTodosLabel: "Conocé al equipo",
          items: [
            {
              label: "Pablo Brunet",
              desc: "Especialista en IA aplicada, automatización y adopción empresarial.",
              /* Su mini sitio dentro del anexo (data/pablo.ts) */
              href: "/programa-ejecutivos/pablo-brunet",
              icon: "mic",
            },
            {
              label: "Alejandro Rostagno",
              desc: "Experiencia de cliente, rentabilidad y ejecución comercial.",
              /* Su mini sitio dentro del anexo (data/rostagno.ts) */
              href: "/programa-ejecutivos/alejandro-rostagno",
              icon: "growth",
            },
          ],
        },
      },
    ],
    cta: { label: "Agendar reunión", href: AGENDA, externo: true },
  },

  /* Mensaje con el que abre el botón flotante en las páginas del anexo */
  whatsapp: {
    mensaje:
      "Hola, te escribo desde la página de los programas para ejecutivos. Quería consultarte por…",
    etiqueta: "Escribinos por WhatsApp",
  },

  /* =====================================================================
     PÁGINA 1 — /programa-ejecutivos (la landing completa)
     ===================================================================== */
  home: {
    seo: {
      title: "Programas AI First | IA aplicada para equipos directivos",
      description:
        "Capacitación en IA sobre las tareas y los problemas reales de tu empresa. Tres programas de cuatro semanas que terminan con un plan de trabajo para los próximos 90 días.",
    },


    /* El hero abre el relato para los tres programas: adoptar IA no es
       comprar herramientas, es convertirla en estrategia y en forma de
       trabajar. Todo lo que sigue en la página desarrolla esa idea. */
    hero: {
      chip: "Programas AI First para empresas",
      titulo: "Adoptar IA no es sumar herramientas. ",
      tituloResalte: "Es cambiar cómo trabaja tu empresa.",
      tituloCierre: "",
      subtitulo:
        "Trabajamos con tus líderes, tus equipos comerciales y el resto de la empresa sobre las tareas que hacen todos los días, para que la inteligencia artificial deje de ser algo que alguien probó una vez y empiece a ahorrar tiempo y mejorar resultados.",
      ctaPrimario: "Agendar una reunión",
      ctaSecundario: "Ver los programas",
      /* Foto de fondo a sangre: taller con profesionales en la UISF */
      imagen: "/images/capacitaciones/uisf.jpg",
      imagenAlt: "Taller de IA aplicada con líderes de empresa",
    },

    /* Las tres tarjetas que giran al pasar el mouse */
    dolores: {
      titulo: "La IA ya es una realidad.",
      tituloLinea2: "El problema es cómo adoptarla.",
      subtitulo:
        "Tres situaciones que vemos en casi todas las empresas donde la IA todavía no cambió nada.",
      items: [
        {
          icono: "alerta",
          titulo: "Parálisis por análisis",
          desc: "Hay demasiadas herramientas y nadie sabe por dónde empezar. El equipo prueba cosas sueltas y la IA nunca llega al trabajo que de verdad importa.",
          color: "#1747c2",
        },
        {
          icono: "tendencia",
          titulo: "Inversión sin retorno",
          desc: "Se pagan licencias y se hacen cursos genéricos, pero nadie vende más, atiende mejor ni ahorra horas gracias a eso.",
          color: "#1e5cf2",
        },
        {
          icono: "cerebro",
          titulo: "La IA como amenaza",
          desc: "La tecnología avanza más rápido que la gente. Los equipos la esquivan por miedo en lugar de usarla como una ayuda en el trabajo de todos los días.",
          color: "#3b6cb7",
        },
      ],
    },

    pilares: {
      titulo: "Qué nos diferencia",
      tituloLinea2: "de una capacitación común.",
      subtitulo:
        "Hablamos el idioma de tu negocio y trabajamos sobre tu día a día. Buscamos que se note: menos horas en tareas repetitivas, mejores respuestas y más rentabilidad.",
      items: [
        {
          titulo: "Sobre tu trabajo real",
          desc: "No enseñamos herramientas en el aire: practicamos con las tareas y las decisiones de todos los días en tu empresa.",
        },
        {
          titulo: "Problemas concretos",
          desc: "Elegimos problemas puntuales de cada área y los resolvemos con IA durante el programa, midiendo cuánto se gana.",
        },
        {
          titulo: "Saber qué conviene",
          desc: "Aprendés a distinguir qué conviene dejarle a la IA, en qué te puede dar una mano y qué tiene que seguir decidiendo una persona.",
        },
        {
          titulo: "Tecnología y negocio juntos",
          desc: "Del lado de la IA, alguien que la implementa en empresas. Del lado del negocio, alguien que viene de ventas, atención y rentabilidad. Se nota en cada ejemplo.",
        },
      ],
      fotos: [
        {
          src: "https://assets.cdn.filesafe.space/wSkZuDdnT8tbCo2X89Pu/media/69c576825ebd49e05c696637.jpg",
          alt: "Taller aplicado con un equipo de trabajo",
        },
        {
          src: "https://assets.cdn.filesafe.space/wSkZuDdnT8tbCo2X89Pu/media/68df33670ee85090b460de39.jpeg",
          alt: "Sesión de formación con equipos de negocio",
        },
      ],
    },

    /* Franja oscura de cuatro cifras */
    franja: [
      { valor: "3 programas", label: "Adaptados a tu empresa" },
      { valor: "4 semanas", label: "Por programa" },
      { valor: "90 días", label: "De plan de trabajo al finalizar" },
      { valor: "100% aplicado", label: "Sobre tareas reales" },
    ],

    programas: {
      titulo: "Tres programas.<br />Elegí por dónde empezar.",
      subtitulo: "Se pueden tomar por separado o uno detrás del otro.",
      cta: "Consultar programa",
      items: [
        {
          nombre: "IA en ventas, atención y marketing",
          publico: "Equipos comerciales, atención al cliente y marketing",
          objetivo:
            "Responder mejor y más rápido a los clientes, y vender más con el mismo equipo",
          formato: "4 semanas · Talleres aplicados",
          destacado: false,
        },
        {
          nombre: "Programa Ejecutivo AI First",
          publico: "Mandos medios, gerentes y responsables de área",
          objetivo:
            "Usar IA con criterio, mejorar la forma de trabajar del área y salir con un plan de 90 días",
          formato: "4 semanas · Talleres aplicados",
          destacado: true,
        },
        {
          nombre: "Uso intensivo de herramientas de IA",
          publico: "Personas de cualquier área que quieren usar IA en su trabajo diario",
          objetivo:
            "Manejar ChatGPT, Gemini y Claude en las tareas de todos los días",
          formato: "4 semanas · Formación práctica",
          destacado: false,
        },
      ],
    },

    /* Qué dejamos en cada empresa: cuatro tarjetas con el círculo que se
       expande al pasar el mouse (EjeResultados). */
    resultados: {
      titulo: "Qué dejamos en cada empresa.",
      subtitulo:
        "Cuatro resultados concretos para que la IA no quede en el entusiasmo de los primeros días, sino en algo que tu equipo sabe hacer solo.",
      items: [
        {
          icono: "rayo",
          titulo: "Uso concreto de IA",
          desc: "Los equipos salen usando IA en sus tareas de todos los días, no con teoría que se olvida a la semana.",
        },
        {
          icono: "diana",
          titulo: "Problemas resueltos",
          desc: "Elegimos problemas puntuales de cada área, los resolvemos con IA durante el programa y medimos cuánto tiempo se ahorra.",
        },
        {
          icono: "escudo",
          titulo: "Uso responsable",
          desc: "Reglas claras para usar la IA con cuidado y criterio: qué información no se carga, qué se revisa y qué sigue decidiendo una persona.",
        },
        {
          icono: "barras",
          titulo: "Hoja de ruta aplicable",
          desc: "Un plan de 60 a 90 días con los primeros problemas para atacar, quién se ocupa de cada uno y los próximos pasos por área.",
        },
      ],
    },

    equipo: {
      titulo: "Quiénes están detrás.",
      subtitulo:
        "Uno viene de implementar IA en empresas; el otro, de liderar equipos comerciales y de atención. Los programas combinan las dos miradas.",
      personas: [
        {
          nombre: "Pablo Brunet",
          rol: "Especialista en IA aplicada",
          bio: "Especialista en inteligencia artificial aplicada, automatización y adopción empresarial. Experiencia en consultoría, diseño de procesos comerciales y desarrollo de soluciones de IA para empresas. Speaker y divulgador.",
          img: "https://assets.cdn.filesafe.space/wSkZuDdnT8tbCo2X89Pu/media/69c928e35c9128f3ea7a109d.png",
          /* "Conocer más": su mini sitio dentro del anexo */
          masInfo: "/programa-ejecutivos/pablo-brunet",
        },
        {
          nombre: "Alejandro Rostagno",
          rol: "Experiencia de cliente y rentabilidad",
          bio: "Perfil con trayectoria en experiencia de cliente, rentabilidad operativa, liderazgo y ejecución comercial. Enfocado en transformación empresarial con sentido de negocio.",
          img: "https://assets.cdn.filesafe.space/wSkZuDdnT8tbCo2X89Pu/media/69dabf72d7871cddf75e68de.webp",
          /* "Conocer más": su mini sitio dentro del anexo */
          masInfo: "/programa-ejecutivos/alejandro-rostagno",
        },
      ],
    },

    carrusel: {
      titulo: "Talleres que ya hicimos.",
      subtitulo: "Algunos de los talleres que hicimos con empresas.",
      /* Intercaladas: una foto de un taller de Pablo y una de Alejandro
         (las de él salen de su dossier, public/images/rostagno) */
      fotos: [
        {
          src: "https://assets.cdn.filesafe.space/wSkZuDdnT8tbCo2X89Pu/media/69c92a8f9dbb423b2be83974.jpg",
          titulo: "Workshop de Ventas Modernas con Inteligencia Artificial",
          subtitulo:
            "Transformación digital y adopción de IA generativa en herramientas para áreas comerciales.",
          alt: "Workshop estratégico con clientes",
        },
        {
          src: "/images/rostagno/sancor-buenos-aires.webp",
          titulo: "Grupo Sancor Seguros: Venta Consultiva en Buenos Aires",
          subtitulo:
            "Workshop para vender entendiendo primero qué necesita el cliente, a cargo de Alejandro Rostagno.",
          alt: "Workshop de venta consultiva con el equipo de Grupo Sancor Seguros en Buenos Aires",
        },
        {
          src: "https://assets.cdn.filesafe.space/wSkZuDdnT8tbCo2X89Pu/media/69c92b73e025690abce9f1c5.jpeg",
          titulo: "Workshop de Automatizaciones Inteligentes para Negocios",
          subtitulo:
            "Taller práctico sobre implementación de soluciones automatizadas.",
          alt: "Sesión ejecutiva sobre adopción de IA",
        },
        {
          src: "/images/rostagno/aguared.webp",
          titulo: "Capacitación in company con el equipo de Aguared",
          subtitulo:
            "Taller con el equipo de la empresa, a cargo de Alejandro Rostagno.",
          alt: "Alejandro Rostagno con el equipo de Aguared después de una capacitación",
        },
        {
          src: "https://assets.cdn.filesafe.space/wSkZuDdnT8tbCo2X89Pu/media/69c92b99386c5a024087fa58.jpg",
          titulo: "Transformación de empresas con enfoque AI-First",
          subtitulo:
            "Diseño e implementación de soluciones para la transformación interna de empresas.",
          alt: "Equipo trabajando en implementación de IA",
        },
        {
          src: "/images/rostagno/sancor-equipo.webp",
          titulo: "Masterclass: Experiencias Memorables",
          subtitulo:
            "Experiencia de cliente para equipos de atención y ventas, a cargo de Alejandro Rostagno.",
          alt: "Alejandro Rostagno con los participantes de la masterclass",
        },
        {
          src: "https://assets.cdn.filesafe.space/wSkZuDdnT8tbCo2X89Pu/media/69c576a322e1ed1920ed5532.jpg",
          titulo: "Workshop con Empresas del Parque Industrial Sauce Viejo",
          subtitulo:
            "Ventas modernas y recursos para la transformación de áreas comerciales con IA.",
          alt: "Encuentro de formación aplicada con clientes",
        },
        {
          src: "/images/rostagno/sancor-sunchales.webp",
          titulo: "Grupo Sancor Seguros: Secretos de la Venta Consultiva",
          subtitulo:
            "Capacitación y workshop con el equipo comercial en Sunchales, a cargo de Alejandro Rostagno.",
          alt: "Taller de venta consultiva con el equipo comercial de Grupo Sancor Seguros en Sunchales",
        },
        {
          src: "/images/capacitaciones/camara-estaciones-de-servicio.jpg",
          titulo: "Taller de IA aplicada en la Cámara de Estaciones de Servicio",
          subtitulo:
            "Taller práctico para usar IA en las tareas de todos los días de una estación de servicio.",
          alt: "Taller de IA aplicada en la Cámara de Estaciones de Servicio",
        },
        {
          src: "/images/rostagno/convergencia.webp",
          titulo: "Convergencia Santa Fe",
          subtitulo:
            "Conferencia para empresarios y líderes de la región, a cargo de Alejandro Rostagno.",
          alt: "Alejandro Rostagno dando una conferencia en Convergencia Santa Fe",
        },
        {
          src: "/images/capacitaciones/espacio-demos.jpg",
          titulo: "Taller de Agentes de IA en Espacio DEMOS",
          subtitulo:
            "Cómo armar asistentes que hagan solos las tareas repetitivas del negocio.",
          alt: "Taller de Agentes de IA en Espacio DEMOS",
        },
        {
          src: "/images/rostagno/sancor-taller.webp",
          titulo: "Grupo Sancor Seguros: IA aplicada a la gestión comercial",
          subtitulo:
            "Taller con el equipo comercial, a cargo de Alejandro Rostagno.",
          alt: "Alejandro Rostagno con el equipo de Grupo Sancor Seguros en un taller",
        },
        {
          src: "/images/capacitaciones/cefose-galvez.jpg",
          titulo: "IA y Ventas para empresas en el CeFoSe Gálvez",
          subtitulo:
            "Taller para usar IA en la venta y en la atención de clientes.",
          alt: "Capacitación de IA y Ventas en el CeFoSe de Gálvez",
        },
        {
          src: "/images/rostagno/meta.webp",
          titulo: "Meta: Transformación digital en Salud",
          subtitulo:
            "Capacitación sobre transformación digital en el sector salud, a cargo de Alejandro Rostagno.",
          alt: "Alejandro Rostagno en una capacitación de Meta sobre transformación digital en salud",
        },
        {
          src: "/images/capacitaciones/ceca.jpg",
          titulo: "Taller de IA aplicada en CECA",
          subtitulo:
            "Taller práctico de IA sobre los problemas concretos de cada empresa.",
          alt: "Taller de IA aplicada en CECA",
        },
      ],
    },

    agenda: {
      titulo: "Contanos en qué está tu empresa.",
      subtitulo:
        "Reservá una charla de 30 minutos para contarnos qué está pasando en tu empresa. Sin compromiso: te vas con una idea clara de por dónde empezar.",
      garantias: [
        { icono: "escudo", texto: "Confidencialidad garantizada" },
        { icono: "calendario", texto: "Charla de 30 minutos" },
      ],
      /* El calendario embebido de LeadConnector. El id del iframe es el que
         espera form_embed.js para ajustarle el alto. */
      calendarioSrc:
        "https://api.leadconnectorhq.com/widget/booking/g5UrpACyzbvWn41Hv1dK",
      calendarioId: "g5UrpACyzbvWn41Hv1dK_1774622934219",
    },

    faq: {
      titulo: "Preguntas frecuentes.",
      items: [
        {
          q: "¿Para qué tipo de empresas son estos programas?",
          a: "Trabajamos con empresas de cualquier rubro y tamaño que quieren empezar a usar IA de forma práctica y ordenada. No importa cuánto hayan avanzado con la tecnología: la propuesta se ajusta a lo que cada empresa necesita resolver.",
        },
        {
          q: "¿Cuánto dura cada programa?",
          a: "Cada programa tiene una duración de 4 semanas, con sesiones de 1,5 a 2 horas. El foco está en el trabajo aplicado: entre un 60 y 70% del tiempo es práctica sobre tareas reales del equipo.",
        },
        {
          q: "¿Necesito un equipo técnico para participar?",
          a: "No. Los programas están diseñados para líderes, gerentes y equipos de negocio, no para perfiles técnicos. El lenguaje es de negocio y el foco está en usar IA para mejorar procesos y resultados reales, no en programar.",
        },
        {
          q: "¿Qué queda en la empresa cuando termina el programa?",
          a: "Cuatro cosas: equipos que ya usan IA en sus tareas diarias; problemas concretos resueltos durante el programa, con números de cuánto tiempo ahorran; reglas claras de uso responsable (qué información se puede cargar, qué hay que revisar y qué no conviene delegar); y un plan de 90 días con las primeras mejoras, quién se ocupa de cada una y los próximos pasos por área.",
        },
      ],
    },

    cierre: {
      tituloSuave: "¿No sabés por dónde empezar?",
      titulo: "Lo vemos juntos en 30 minutos.",
      subtitulo:
        "Nos contás cómo trabaja tu equipo hoy y te decimos qué programa tiene sentido, o si todavía no es el momento.",
      ctaPrimario: "Agendar una reunión",
      ctaSecundario: "Hablá con nosotros",
    },
  },

  /* =====================================================================
     PÁGINA 2 — /programa-ejecutivos/programa
     ===================================================================== */
  programa: {
    seo: {
      title: "Programa para Ejecutivos | Programas AI First",
      description:
        "Resumen del Programa AI First para Ejecutivos, pensado para líderes y mandos medios que necesitan usar inteligencia artificial para gestionar y tomar decisiones.",
    },

    hero: {
      chip: "Resumen del programa",
      titulo: "Programa AI First para Ejecutivos",
      bajada: "IA aplicada a gestión, estrategia y toma de decisiones.",
      subtitulo:
        "Esta página resume el enfoque, el formato y el recorrido del programa. Está pensado para líderes y mandos medios que necesitan entender qué está pasando con la IA, ver dónde les sirve en su área y empezar a usarla en el día a día.",
      /* Botones del hero: escribir y bajar al recorrido */
      ctaPrimario: "Consultar por WhatsApp",
      ctaSecundario: "Ver los cuatro módulos",
      datos: [
        { icono: "calendario", label: "Duración", valor: "4 semanas" },
        { icono: "personas", label: "Modalidad", valor: "1 encuentro por semana" },
        {
          icono: "rayo",
          label: "Dinámica",
          valor: "Práctica + ejercicios entre encuentros",
        },
      ],
      objetivo: {
        eyebrow: "Objetivo del programa",
        titulo:
          "Que cada ejecutivo entienda, elija por dónde empezar y se ponga en marcha.",
        desc: "Ayudamos a que cada participante encuentre los problemas de su área que la IA puede resolver, decida cuáles atacar primero y empiece a liderar el cambio en su equipo.",
        /* Los tres verbos del título, dibujados como un recorrido */
        pasos: [
          { verbo: "Entender", desc: "Qué está cambiando y cómo toca a su área." },
          { verbo: "Elegir", desc: "Qué problemas atacar primero con IA." },
          { verbo: "Arrancar", desc: "Con un plan concreto y el equipo detrás." },
        ],
      },
      imagen:
        "https://assets.cdn.filesafe.space/wSkZuDdnT8tbCo2X89Pu/media/69e253cec56ad27908695e4e.jpeg",
      imagenAlt: "Sesión del Programa AI First para Ejecutivos",
    },

    audiencia: {
      eyebrow: "Para quién está pensado",
      titulo: "Especialmente útil para quienes tienen que",
      tituloResalte: "llevar la IA al día a día de su equipo.",
      subtitulo:
        "El programa está orientado a personas que necesitan entender qué hacer con la IA en su área, sin volverse técnicas ni especialistas.",
      items: [
        {
          icono: "personas",
          titulo: "Mandos medios",
          texto: "Con responsabilidad sobre equipos, procesos o resultados.",
        },
        {
          icono: "diana",
          titulo: "Líderes de área",
          texto: "Que necesitan llevar la IA a decisiones concretas.",
        },
        {
          icono: "chispa",
          titulo: "Quienes saben que tienen que meterse",
          texto: "Pero todavía no saben cómo usar la IA en su trabajo diario.",
        },
      ],
      /* Dos fotos superpuestas de talleres con equipos de empresa */
      fotos: [
        {
          src: "/images/pablo/estaciones-de-servicio.webp",
          alt: "Taller de IA con directivos alrededor de una mesa de trabajo",
        },
        {
          src: "/images/rostagno/sancor-taller.webp",
          alt: "Equipo comercial trabajando durante un taller",
        },
      ],
    },

    modulos: {
      eyebrow: "Estructura del programa",
      titulo:
        "Cuatro módulos para pasar de entender qué está pasando a tener un plan de trabajo.",
      subtitulo:
        "La lógica del recorrido es progresiva: primero entender, después explorar posibilidades, luego llevarlo al área y finalmente definir próximos pasos concretos.",
      items: [
        {
          paso: "Módulo 1",
          semana: "Semana 1",
          foto: "/images/pablo/fragmentacion.webp",
          fotoAlt: "Pablo Brunet explicando qué está cambiando con la IA",
          titulo: "Qué está cambiando y cómo nos afecta",
          icono: "chispa",
          bullets: [
            "Qué está cambiando en el contexto actual y por qué ya no es un tema accesorio.",
            "Cómo leer el impacto de la IA en la empresa, el rol y la forma de decidir.",
            "Dónde se pierde hoy tiempo, plata o calidad en el trabajo del área.",
            "Qué cambio de mirada necesita un líder para no quedarse solo en la novedad.",
          ],
        },
        {
          paso: "Módulo 2",
          semana: "Semana 2",
          foto: "/images/pablo/assal.webp",
          fotoAlt: "Presentación sobre herramientas de IA y los problemas que resuelven",
          titulo: "Herramientas y problemas que resuelven",
          icono: "diana",
          bullets: [
            "Qué herramientas existen hoy y para qué tipo de trabajo sirven mejor.",
            "Qué problemas concretos de un área de negocio se pueden resolver hoy con IA.",
            "Cómo evaluar dónde vale la pena avanzar según tareas, procesos o comunicación.",
            "Qué mejoras pueden lograrse en productividad, análisis, atención o coordinación.",
          ],
        },
        {
          paso: "Módulo 3",
          semana: "Semana 3",
          foto: "/images/pablo/espacio-demos.webp",
          fotoAlt: "Participantes trabajando en grupos sobre problemas de su área",
          titulo: "Aplicación al área: personas, procesos y sistemas",
          icono: "personas",
          bullets: [
            "Qué tareas conviene revisar primero dentro del área.",
            "Qué procesos pueden repensarse para ganar eficiencia y claridad.",
            "Qué conversaciones conviene abrir con el equipo para ordenar la adopción.",
            "Cómo empezar a integrar la IA en la gestión cotidiana sin sobredimensionarla.",
          ],
        },
        {
          paso: "Módulo 4",
          semana: "Semana 4",
          foto: "/images/capacitaciones/camara-estaciones-de-servicio.jpg",
          fotoAlt: "Directivos armando su plan de trabajo en una mesa",
          titulo: "Plan de acción",
          icono: "calendario",
          bullets: [
            "Cómo ordenar prioridades y oportunidades de corto plazo.",
            "Qué mejoras rápidas se pueden poner en marcha primero en el área.",
            "Qué próximos pasos son realistas para empezar a mover después del programa.",
            "Cómo salir con una hoja de ruta inicial clara, ordenada y accionable.",
          ],
        },
      ],
    },

    plataforma: {
      eyebrow: "Trabajo entre sesiones",
      titulo:
        "Una plataforma de recursos para sostener el aprendizaje entre encuentros.",
      desc: "La idea es que el trabajo no quede solo en el momento de sesión. La plataforma suma materiales, ejercicios y recursos para seguir aplicando lo aprendido en el trabajo real del área.",
      items: [
        {
          icono: "panel",
          texto: "Recursos prácticos para trabajar entre sesión y sesión.",
        },
        {
          icono: "calendario",
          texto: "Material complementario, ejercicios y resúmenes por módulo.",
        },
        {
          icono: "red",
          texto:
            "Un espacio para seguir aplicando lo aprendido en el trabajo real del área.",
        },
      ],
      tarjeta: {
        eyebrow: "Espacio visual",
        titulo: "Plataforma y recursos de trabajo",
        detalle:
          "Además de los encuentros, el programa se apoya en un espacio con materiales y recursos para seguir trabajando entre sesión y sesión.",
        src: "https://assets.cdn.filesafe.space/wSkZuDdnT8tbCo2X89Pu/media/69e268871c1a09bb0186c91d.jpeg",
        alt: "Plataforma de recursos del programa",
      },
    },

    resultados: {
      eyebrow: "Qué se lleva el participante",
      titulo:
        "Lo que aprende lo aplica en su área y lo puede enseñar a su equipo.",
      subtitulo:
        "El objetivo final es que cada persona no solo entienda el contexto y las herramientas, sino que pueda incorporarlas a su forma de gestionar, mejorar las conversaciones internas y contagiar buenas prácticas en su área.",
      items: [
        "Comprensión clara del impacto de la IA en el negocio y en el rol.",
        "Herramientas para anticiparse y ordenar mejor decisiones futuras.",
        "Una lista de problemas concretos de su área que se pueden resolver con IA.",
        "Capacidad de enseñarle a su equipo lo aprendido y usarlo en el día a día.",
      ],
      tarjeta: {
        eyebrow: "Certificación",
        titulo: "Certificado de participación",
        detalle:
          "Al finalizar, emitimos un certificado para quienes completan el recorrido, como respaldo formal de la participación en el programa.",
        src: "https://assets.cdn.filesafe.space/wSkZuDdnT8tbCo2X89Pu/media/69e2615ac87cb8c8016f7a3b.png",
        alt: "Certificado emitido a quienes participan del curso",
      },
    },

    cierre: {
      /* Tira de fotos que corre sola arriba del llamado final */
      fotos: [
        { src: "/images/capacitaciones/uisf.jpg", alt: "Taller en la UISF" },
        { src: "/images/rostagno/sancor-sunchales.webp", alt: "Taller con Grupo Sancor Seguros en Sunchales" },
        { src: "/images/capacitaciones/cefose-galvez.jpg", alt: "Capacitación en el CeFoSe de Gálvez" },
        { src: "/images/rostagno/aguared.webp", alt: "Capacitación in company con Aguared" },
        { src: "/images/capacitaciones/ceca.jpg", alt: "Taller de IA aplicada en CECA" },
        { src: "/images/rostagno/sancor-equipo.webp", alt: "Masterclass con equipos de atención y ventas" },
        { src: "/images/capacitaciones/venado-tuerto.jpg", alt: "Taller en Venado Tuerto" },
        { src: "/images/rostagno/convergencia.webp", alt: "Conferencia en Convergencia Santa Fe" },
      ],
      titulo:
        "Adaptamos el programa a la dinámica y estructura de cada empresa.",
      subtitulo:
        "Si querés más información sobre el formato, el alcance o cómo podría implementarse en tu organización, contactanos.",
      cta: "Escribir por WhatsApp",
    },
  },

  /* =====================================================================
     PÁGINA 3 — /programa-ejecutivos/agenda-confirmada
     ---------------------------------------------------------------------
     Es la página de gracias a la que cae quien ya reservó. Va con
     `noindex`: no es contenido del sitio, es el final de un embudo.
     ===================================================================== */
  gracias: {
    seo: {
      title: "Agenda confirmada | Programas AI First",
      description:
        "Página de confirmación para quienes reservaron una reunión.",
    },

    hero: {
      chip: "Agenda confirmada",
      titulo: "Gracias por agendar.",
      tituloResalte: "Este es el primer paso.",
      subtitulo:
        "La reunión está pensada para entender tu contexto, detectar oportunidades concretas y ayudarte a definir por dónde conviene empezar.",
      ctaPrimario: "Ver video de bienvenida",
      ctaSecundario: "Adelantar contexto",
      beneficios: {
        eyebrow: "Qué te llevás de esta instancia",
        titulo:
          "Una conversación clara para pasar de las ganas a un primer paso concreto.",
        items: [
          "Vamos a ordenar prioridades reales, no ideas sueltas.",
          "Hablamos de tu negocio, no de tecnicismos.",
          "Te vas a ir con un siguiente paso mucho más claro.",
        ],
      },
    },

    video: {
      eyebrow: "Mensaje de bienvenida",
      titulo: "Un video corto para llegar mejor a la reunión.",
      subtitulo:
        "Acá podés agradecer, bajar el tono comercial y reforzar por qué esta conversación importa.",
      /* Cuando haya video grabado, poné acá el id de Wistia (o una URL de
         embed en `embedUrl`) y el placeholder desaparece solo. En el repo
         original esto venía por variables de entorno de Vite; en un sitio
         estático de Astro es más simple tenerlo en los datos. */
      /* El `as string` es para que el `as const` del final no los congele
         como el literal "": si no, TypeScript da por hecho que están
         vacíos para siempre y marca el condicional del componente. */
      wistiaId: "" as string,
      embedUrl: "" as string,
      placeholder: {
        titulo: "Conectá tu video acá",
        desc: "Cargá el id de Wistia o la URL de embed en data/ejecutivos.ts (gracias.video) para mostrar el video real.",
      },
    },

    proximo: {
      izquierda: {
        eyebrow: "Por qué vale esta reunión",
        titulo: "No es una reunión de venta más.",
        desc: "Es una instancia para ordenar dónde la IA puede generar valor real en tu negocio y evitar empezar por el lugar equivocado.",
      },
      derecha: {
        eyebrow: "Llegá con esto preparado",
        items: [
          "Traé 2 o 3 procesos con fricción o demora.",
          "Pensá qué equipo necesita resultados primero.",
          "Si querés, adelantanos tu contexto por WhatsApp.",
        ],
      },
    },

    cierre: {
      eyebrow: "Nos vemos pronto",
      titulo: "Si querés, podés enviarnos contexto antes de la reunión.",
      subtitulo:
        "Eso nos ayuda a entrar más rápido en tu realidad y tener una conversación más útil desde el minuto uno.",
      ctaPrimario: "Escribir por WhatsApp",
      ctaSecundario: "Ver mi reserva",
    },
  },
} as const;
