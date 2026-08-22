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
  },

  enlaces: {
    agenda: AGENDA,
    whatsapp: WHATSAPP,
    linkedin: "https://linkedin.com/in/pablobrunet",
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
      title: "Programas AI First para empresas | Pablo Brunet",
      description:
        "Formación aplicada, adopción práctica e implementación de IA orientada a valor, productividad y rentabilidad. Tres programas de cuatro semanas con hoja de ruta de 90 días.",
    },

    /* Barra de secciones propia del anexo, debajo del navbar del sitio */
    anclas: [
      { label: "Soluciones", href: "#soluciones" },
      { label: "Metodología", href: "#metodologia" },
      { label: "Programa ejecutivo", href: "/programa-ejecutivos/programa" },
    ],

    hero: {
      chip: "Consultoría de vanguardia",
      titulo: "Convertí a la ",
      tituloResalte: "Inteligencia Artificial",
      tituloCierre: " en una ventaja real.",
      subtitulo:
        "Ayudamos a líderes a pasar de la confusión a una hoja de ruta concreta y aplicada, transformando la incertidumbre en ventaja competitiva.",
      ctaPrimario: "Agendar reunión de descubrimiento",
      ctaSecundario: "Ver nuestra mirada",
      imagen:
        "https://assets.cdn.filesafe.space/wSkZuDdnT8tbCo2X89Pu/media/69e0e5a22c135a8c8387aca0.jpg",
      imagenAlt: "Equipo trabajando en la adopción de inteligencia artificial",
      cita: "“La parte más difícil de la inteligencia artificial no es la tecnología, sino lograr que las personas cambien su forma de trabajar”",
      citaAutor: "Satya Nadella, CEO de Microsoft",
    },

    video: {
      titulo: "Nuestra Propuesta en Acción.",
      subtitulo:
        "Vea cómo transformamos la incertidumbre en ROI real para su organización.",
      wistiaId: "uwn7n5dwy9",
      aspecto: "1.5841584158415842",
    },

    /* Las tres tarjetas que giran al pasar el mouse */
    dolores: {
      titulo: "La IA ya es una realidad.",
      tituloLinea2: "El problema es cómo adoptarla.",
      subtitulo:
        "Tres patrones que vemos en casi todas las empresas que aún no lograron que la IA genere valor real.",
      items: [
        {
          icono: "alerta",
          titulo: "Parálisis por Análisis",
          desc: "Demasiadas herramientas, poca claridad estratégica. El equipo prueba en abstracto y la IA nunca llega a los procesos que importan.",
          color: "#1747c2",
        },
        {
          icono: "tendencia",
          titulo: "Inversión sin Retorno",
          desc: "Licencias activas, capacitaciones genéricas y ningún caso de uso que impacte en productividad, conversión o margen operativo.",
          color: "#1e5cf2",
        },
        {
          icono: "cerebro",
          titulo: "La IA como Amenaza",
          desc: "La tecnología avanza más rápido que la cultura interna. Los equipos la esquivan en lugar de adoptarla como copiloto de trabajo diario.",
          color: "#3b6cb7",
        },
      ],
    },

    /* Grilla tipo bento de cuatro bloques */
    transformacion: {
      titulo: "De la confusión a",
      tituloResalte: "una hoja de ruta concreta.",
      roadmap: {
        titulo: "Roadmap de 90 días",
        desc: "No entregamos manuales teóricos. Cada programa termina con casos de uso priorizados, métricas visibles y un plan concreto para los próximos 90 días.",
        cta: "Agendar reunión de descubrimiento",
        imagen:
          "https://assets.cdn.filesafe.space/wSkZuDdnT8tbCo2X89Pu/media/69e0cda7a2661c2e8f83c9ee.jpg",
        imagenAlt: "Roadmap estratégico de adopción de IA",
      },
      adopcion: {
        titulo: "Adopción que se sostiene",
        desc: "Llevamos lo aprendido del taller al trabajo cotidiano. Prompts reutilizables, pilotos probados y buenas prácticas instaladas en el equipo.",
      },
      mentalidad: {
        titulo: "Mentalidad de Transformación",
        desc: "Preparamos a los equipos para adoptar la IA como copiloto, no como amenaza. Sin resistencia al cambio, con criterio.",
      },
      cierre: {
        texto:
          "Integrar Inteligencia Artificial en una organización no se trata de incorporar herramientas, ",
        textoFuerte:
          "sino de rediseñar cómo la empresa opera, decide y crece.",
        imagen:
          "https://assets.cdn.filesafe.space/wSkZuDdnT8tbCo2X89Pu/media/69e0cba91bd4245879e34b46.png",
        imagenAlt: "Implementación humana de IA en empresas",
      },
    },

    pilares: {
      titulo: "Qué nos diferencia",
      tituloLinea2: "de una capacitación común.",
      subtitulo:
        "Combinamos visión estratégica, práctica operativa y lenguaje de negocio. Buscamos impacto medible en tiempo, calidad, eficiencia y rentabilidad.",
      items: [
        {
          titulo: "Formación Aplicada",
          desc: "No enseñamos herramientas en abstracto: trabajamos sobre tareas y decisiones reales de tu operación.",
        },
        {
          titulo: "Casos de Uso Concretos",
          desc: "Aterrizamos la IA en funciones y procesos específicos de tu empresa para generar impacto medible.",
        },
        {
          titulo: "Criterio de Adopción",
          desc: "Construimos criterio de priorización: qué automatizar, qué asistir y qué mantener bajo control humano.",
        },
        {
          titulo: "Capacidad Instalada",
          desc: "El objetivo final es que tu empresa use IA con autonomía y mayor rentabilidad, sin depender de agencias externas.",
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
      { valor: "3 Programas", label: "Modulares y adaptables" },
      { valor: "4 Semanas", label: "Por programa" },
      { valor: "90 Días", label: "Roadmap al finalizar" },
      { valor: "100% Aplicado", label: "Sin teoría vacía" },
    ],

    programas: {
      titulo: "Tres programas, una misma lógica.",
      subtitulo:
        "Cada programa resuelve un nivel distinto de madurez y necesidad. Las empresas pueden tomar uno o recorrer un camino progresivo de adopción.",
      cta: "Consultar programa",
      items: [
        {
          nombre: "IA en Ventas, Atención y Marketing",
          publico: "Equipos comerciales, atención al cliente y marketing",
          objetivo:
            "Mejorar productividad, calidad de respuesta y ejecución comercial",
          formato: "4 semanas · Talleres aplicados",
          destacado: false,
        },
        {
          nombre: "Programa Ejecutivo AI First",
          publico: "Mandos medios, gerentes y responsables de área",
          objetivo:
            "Usar IA con criterio, rediseñar procesos y construir un roadmap aplicable de 90 días",
          formato: "4 semanas · Talleres aplicados",
          destacado: true,
        },
        {
          nombre: "Uso Intensivo de Herramientas de IA",
          publico: "Equipos transversales que necesitan adopción práctica",
          objetivo:
            "Dominar ChatGPT, Gemini y Claude en tareas reales del trabajo diario",
          formato: "4 semanas · Formación práctica",
          destacado: false,
        },
      ],
    },

    metodo: {
      titulo: "Dejamos capacidad instalada",
      tituloLinea2: "en tu organización.",
      subtitulo:
        "No queremos que su empresa dependa de consultores. Queremos que la IA quede integrada en sus procesos, con criterio, métricas y autonomía para seguir creciendo.",
      pasos: [
        {
          titulo: "Marco conceptual",
          desc: "Ordenamos criterio y lenguaje común. Entendemos qué es la IA, para qué sirve y cuáles son sus límites en el contexto del negocio.",
        },
        {
          titulo: "Talleres hands-on",
          desc: "Trabajamos sobre casos, ejercicios y aplicaciones reales del equipo. No demostraciones: práctica sobre las tareas de cada rol.",
        },
        {
          titulo: "Compromisos entre sesiones",
          desc: "Los participantes llevan lo aprendido al trabajo cotidiano. La implementación empieza en la semana 1, no al terminar el programa.",
        },
        {
          titulo: "Hoja de ruta aplicable",
          desc: "Cerramos con casos de uso priorizados, métricas básicas y un plan concreto de 60 a 90 días para continuar con foco.",
        },
      ],
    },

    resultados: {
      titulo: "Qué dejamos en cada empresa.",
      subtitulo:
        "Cuatro resultados concretos, visibles y sostenibles para que la adopción no quede en entusiasmo inicial sino en una capacidad real de la organización.",
      items: [
        {
          icono: "rayo",
          titulo: "Uso concreto de IA",
          desc: "Los equipos salen usando IA en sus tareas diarias, no con conocimiento declarativo que se olvida.",
        },
        {
          icono: "diana",
          titulo: "Pilotos priorizados",
          desc: "Casos de uso identificados, diseñados y probados con métricas básicas de impacto operativo.",
        },
        {
          icono: "escudo",
          titulo: "Adopción responsable",
          desc: "Buenas prácticas instaladas para un uso seguro, criterioso y sostenible de la IA en la organización.",
        },
        {
          icono: "barras",
          titulo: "Roadmap aplicable",
          desc: "Hoja de ruta de 60 a 90 días con quick wins, responsables y próximos pasos claros por área.",
        },
      ],
    },

    equipo: {
      titulo: "Construido desde tecnología, consultoría y formación.",
      subtitulo:
        "Una alianza de profesionales con experiencia práctica en transformación empresarial y IA aplicada.",
      personas: [
        {
          nombre: "Pablo Brunet",
          rol: "Especialista en IA Aplicada",
          bio: "Especialista en inteligencia artificial aplicada, automatización y adopción empresarial. Experiencia en consultoría, diseño de procesos comerciales y desarrollo de soluciones de IA para empresas. Speaker y divulgador.",
          img: "https://assets.cdn.filesafe.space/wSkZuDdnT8tbCo2X89Pu/media/69c928e35c9128f3ea7a109d.png",
          linkedin: "https://linkedin.com/in/pablobrunet",
        },
        {
          nombre: "Alejandro Rostagno",
          rol: "Experiencia de Cliente y Rentabilidad",
          bio: "Perfil con trayectoria en experiencia de cliente, rentabilidad operativa, liderazgo y ejecución comercial. Enfocado en transformación empresarial con sentido de negocio.",
          img: "https://assets.cdn.filesafe.space/wSkZuDdnT8tbCo2X89Pu/media/69dabf72d7871cddf75e68de.webp",
          linkedin: "https://ar.linkedin.com/in/alejandro-f-rostagno",
        },
      ],
    },

    carrusel: {
      titulo: "Impacto en Acción.",
      subtitulo: "Momentos de transformación con nuestros clientes.",
      fotos: [
        {
          src: "https://assets.cdn.filesafe.space/wSkZuDdnT8tbCo2X89Pu/media/69c92a8f9dbb423b2be83974.jpg",
          titulo: "Workshop de Ventas Modernas con Inteligencia Artificial",
          subtitulo:
            "Transformación digital y adopción de IA generativa en herramientas para áreas comerciales.",
          alt: "Workshop estratégico con clientes",
        },
        {
          src: "https://assets.cdn.filesafe.space/wSkZuDdnT8tbCo2X89Pu/media/69c92b73e025690abce9f1c5.jpeg",
          titulo: "Workshop de Automatizaciones Inteligentes para Negocios",
          subtitulo:
            "Taller práctico sobre implementación de soluciones automatizadas.",
          alt: "Sesión ejecutiva sobre adopción de IA",
        },
        {
          src: "https://assets.cdn.filesafe.space/wSkZuDdnT8tbCo2X89Pu/media/69c92b99386c5a024087fa58.jpg",
          titulo: "Transformación de empresas con enfoque AI-First",
          subtitulo:
            "Diseño e implementación de soluciones para la transformación interna de empresas.",
          alt: "Equipo trabajando en implementación de IA",
        },
        {
          src: "https://assets.cdn.filesafe.space/wSkZuDdnT8tbCo2X89Pu/media/69c576a322e1ed1920ed5532.jpg",
          titulo: "Workshop con Empresas del Parque Industrial Sauce Viejo",
          subtitulo:
            "Ventas modernas y recursos para la transformación de áreas comerciales con IA.",
          alt: "Encuentro de formación aplicada con clientes",
        },
      ],
    },

    agenda: {
      titulo: "Es momento de tomar la delantera.",
      subtitulo:
        "Reservá una sesión privada para discutir sus desafíos actuales. Sin compromisos, sólo perspectiva experta para su próximo gran paso.",
      garantias: [
        { icono: "escudo", texto: "Confidencialidad Garantizada" },
        { icono: "calendario", texto: "Sesión estratégica de 30 minutos" },
      ],
      /* El calendario embebido de LeadConnector. El id del iframe es el que
         espera form_embed.js para ajustarle el alto. */
      calendarioSrc:
        "https://api.leadconnectorhq.com/widget/booking/g5UrpACyzbvWn41Hv1dK",
      calendarioId: "g5UrpACyzbvWn41Hv1dK_1774622934219",
    },

    faq: {
      titulo: "Preguntas Frecuentes.",
      items: [
        {
          q: "¿Para qué tipo de empresas son estos programas?",
          a: "Trabajamos con empresas de cualquier sector y tamaño que quieren adoptar IA de manera práctica y ordenada. La propuesta se adapta a distintos niveles de madurez digital y puede ajustarse según las prioridades estratégicas de cada organización.",
        },
        {
          q: "¿Cuánto dura cada programa?",
          a: "Cada programa tiene una duración de 4 semanas, con sesiones de 1,5 a 2 horas. El foco está en el trabajo aplicado: entre un 60 y 70% del tiempo es práctica hands-on sobre tareas reales del equipo.",
        },
        {
          q: "¿Necesito un equipo técnico para participar?",
          a: "No. Los programas están diseñados para líderes, gerentes y equipos de negocio, no para perfiles técnicos. El lenguaje es de negocio y el foco está en usar IA para mejorar procesos y resultados reales, no en programar.",
        },
        {
          q: "¿Qué diferencia a esto de una capacitación de IA común?",
          a: "No enseñamos herramientas en abstracto. Trabajamos sobre tareas y decisiones reales de su operación. El objetivo no es el conocimiento declarativo, sino la capacidad instalada: que la empresa use IA todos los días con criterio y resultados medibles.",
        },
      ],
    },

    cierre: {
      tituloSuave: "El futuro no espera.",
      titulo: "Tu competencia tampoco.",
      subtitulo:
        "Transformá tu organización hoy con una perspectiva orientada a generar el mayor impacto en su empresa.",
      ctaPrimario: "Agendar Sesión Estratégica",
      ctaSecundario: "Hablá con Nosotros",
    },
  },

  /* =====================================================================
     PÁGINA 2 — /programa-ejecutivos/programa
     ===================================================================== */
  programa: {
    seo: {
      title: "Programa AI First para Ejecutivos | Pablo Brunet",
      description:
        "Resumen del Programa AI First para Ejecutivos, orientado a líderes y mandos medios que necesitan aplicar inteligencia artificial a gestión, estrategia y toma de decisiones.",
    },

    hero: {
      chip: "Resumen del programa",
      titulo: "Programa AI First para Ejecutivos",
      bajada: "IA aplicada a gestión, estrategia y toma de decisiones.",
      subtitulo:
        "Esta página resume el enfoque, el formato y el recorrido del programa. La propuesta está pensada para líderes y mandos medios que necesitan entender el contexto, bajar oportunidades a su realidad y empezar a incorporarlas a la gestión diaria.",
      datos: [
        { label: "Duración", valor: "4 semanas" },
        { label: "Modalidad", valor: "1 encuentro por semana" },
        {
          label: "Dinámica",
          valor: "Sesiones de trabajo + ejercicios entre encuentros",
        },
      ],
      objetivo: {
        eyebrow: "Objetivo del programa",
        titulo:
          "Buscamos ejecutivos que entiendan, prioricen y empiecen a accionar con más criterio.",
        desc: "Ayudamos a que cada participante pueda detectar oportunidades, ordenar prioridades y empezar a liderar cambios reales dentro de su equipo.",
      },
      imagen:
        "https://assets.cdn.filesafe.space/wSkZuDdnT8tbCo2X89Pu/media/69e253cec56ad27908695e4e.jpeg",
      imagenAlt: "Sesión del Programa AI First para Ejecutivos",
    },

    audiencia: {
      eyebrow: "Para quién está pensado",
      titulo: "Especialmente útil para quienes tienen que",
      tituloResalte: "traducir contexto en gestión.",
      subtitulo:
        "El programa está orientado a personas que necesitan entender qué hacer con la IA en su área, sin volverse técnicas ni especialistas.",
      items: [
        "Mandos medios con responsabilidad sobre equipos, procesos o resultados.",
        "Líderes de área que necesitan bajar la IA a decisiones concretas.",
        "Perfiles que hoy sienten que tienen que meterse en el tema, pero todavía no lo aterrizaron a la gestión diaria.",
      ],
    },

    modulos: {
      eyebrow: "Estructura del programa",
      titulo:
        "Cuatro módulos para pasar de la lectura del contexto a una hoja de ruta inicial.",
      subtitulo:
        "La lógica del recorrido es progresiva: primero entender, después explorar posibilidades, luego aterrizarlo al área y finalmente definir próximos pasos concretos.",
      items: [
        {
          paso: "Módulo 1",
          titulo: "Contexto, impacto y cambio de mindset",
          icono: "chispa",
          bullets: [
            "Qué está cambiando en el contexto actual y por qué ya no es un tema accesorio.",
            "Cómo leer el impacto de la IA en la empresa, el rol y la forma de decidir.",
            "Dónde aparecen hoy puntos de dolor, ineficiencias y cuellos de botella.",
            "Qué cambio de mirada necesita un líder para no quedarse solo en la novedad.",
          ],
        },
        {
          paso: "Módulo 2",
          titulo: "Herramientas, casos de uso y posibilidades reales",
          icono: "diana",
          bullets: [
            "Qué herramientas existen hoy y para qué tipo de trabajo sirven mejor.",
            "Qué casos de uso son realmente aplicables a áreas de negocio y gestión.",
            "Cómo evaluar dónde vale la pena avanzar según tareas, procesos o comunicación.",
            "Qué mejoras pueden lograrse en productividad, análisis, atención o coordinación.",
          ],
        },
        {
          paso: "Módulo 3",
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
          titulo: "Roadmap de acción",
          icono: "calendario",
          bullets: [
            "Cómo ordenar prioridades y oportunidades de corto plazo.",
            "Qué quick wins pueden activarse primero dentro de la función o el área.",
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
      desc: "La idea es que el trabajo no quede solo en el momento de sesión. La plataforma suma materiales, ejercicios y recursos para seguir bajando ideas a la operación real del área.",
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
            "Un espacio para seguir bajando ideas a la operación real del área.",
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
        "Conocimiento aplicado, criterio para anticiparse y herramientas para derramarlo al equipo.",
      subtitulo:
        "El objetivo final es que cada persona no solo entienda el contexto y las herramientas, sino que pueda incorporarlas a su forma de gestionar, mejorar conversaciones internas y mover mejores prácticas dentro de su área.",
      items: [
        "Comprensión clara del impacto de la IA en el negocio y en el rol.",
        "Herramientas para anticiparse y ordenar mejor decisiones futuras.",
        "Oportunidades detectadas dentro del área.",
        "Capacidad de derramar aprendizajes al equipo e incorporarlos a la gestión diaria.",
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
      title: "Agenda confirmada | Pablo Brunet",
      description:
        "Página de confirmación para quienes reservaron su reunión de descubrimiento.",
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
          "Una conversación clara para transformar interés en dirección.",
        items: [
          "Vamos a ordenar prioridades reales, no ideas sueltas.",
          "La reunión está pensada desde negocio, no desde humo técnico.",
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
        titulo: "No es una página más dentro del funnel.",
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
