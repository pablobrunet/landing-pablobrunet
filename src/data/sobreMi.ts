/* =====================================================================
   SOBRE MÍ — alimenta la sección del home y la página completa /sobre-mi
   ---------------------------------------------------------------------
   Los datos de formación y trayectoria salen de tu bio publicada en la
   Escuela Expone de ASSAL y en El Santafesino, más lo que fuiste
   agregando. Lo marcado "REVISAR" necesita tu confirmación.
   ===================================================================== */

export const sobreMi = {
  eyebrow: "Sobre mí",
  /* El título anterior ("Una identidad que transmite confianza, claridad y
     visión en movimiento") describía atributos propios. Este describe un
     método: la autoridad la aportan los datos de abajo, no los adjetivos.
     Además retoma tu frase de prensa: "no se empieza por la herramienta". */
  titulo: "Primero entender la empresa. Después, la herramienta.",
  parrafo:
    "Trabajo con pymes desde bastante antes de que la IA fuera un tema de conversación. Eso cambia el punto de partida: no traigo una herramienta a ver dónde encaja, arranco por el proceso que duele y recién ahí evalúo si la IA aporta algo. A veces la respuesta es que no.",

  // PNG recortado (fondo transparente) → lo dibuja <Retrato />, no <Frame />
  img: "/images/about/retrato-sobre-mi.png",

  // Foto apaisada para la sección del home (va a lo ancho, con epígrafe)
  fotoHome: {
    img: "/images/about/tedindx-charla.jpg",
    imgLabel: "/images/about/tedindx-charla.jpg",
    epigrafe: "Charla en TEDIND-X · Santa Fe",
  },

  /* Cuatro datos duros para la sección del home. Reemplazaron a los pilares
     "Preciso / Humano / Orientado a resultados": un número verificable pesa
     más que un adjetivo. Textos de una línea: con cuatro columnas, un
     párrafo largo estira las tarjetas de más. */
  datos: [
    {
      icon: "people",
      valor: "+16 años",
      titulo: "Trabajando con pymes",
      texto: "Conozco la operación real de una empresa chica y mediana.",
    },
    {
      icon: "target",
      valor: "8 años",
      titulo: "Como consultor",
      texto: "Suficiente para distinguir lo que cambia un negocio de lo que no.",
    },
    {
      icon: "growth",
      valor: "+2.500",
      titulo: "Personas capacitadas",
      texto: "En empresas, cámaras y universidades.",
    },
    {
      icon: "mic",
      valor: "+30",
      titulo: "Charlas y eventos",
      texto: "Como speaker, ante públicos muy distintos entre sí.",
    },
  ],

  /* ---- Contenido extendido para la página /sobre-mi ---- */
  pagina: {
    hero:
      "Ayudo a empresas a convertir la inteligencia artificial en una ventaja real.",

    /* Texto de presentación escrito por Pablo. Versión corta.
       Los párrafos admiten **negrita** (la procesa `enriquecer()`).
       Resalté las dos marcas propias y la frase que resume la propuesta. */
    bioTitulo:
      "Entiendo a las PyMEs porque hace más de dieciséis años que trabajo con ellas",
    bio: [
      "Soy Pablo Brunet. Ayudo a dueños y equipos a ordenar prioridades, tomar mejores decisiones y convertir ideas en cambios que realmente puedan sostener.",
      "Conozco de cerca lo que pasa dentro de una PyME: poco tiempo, demasiadas urgencias, procesos que dependen de personas clave y proyectos que se traban al momento de implementarlos.",
      "Por eso, cuando apareció la inteligencia artificial, no me interesó solo aprender herramientas. Me interesó entender cómo aplicarla en empresas reales, sin frenar la operación ni sumar complejidad innecesaria.",
      "Hoy lidero **InnerFlow AI** y creé el **Método INTEGRA**, el sistema con el que las empresas integran inteligencia artificial con método. También doy charlas y capacitaciones para empresarios y equipos de dirección.",
      "Mi trabajo, en cualquier formato, es siempre el mismo: **hacer simple lo complejo** y convertir la inteligencia artificial en algo concreto, útil y aplicable.",
    ],

    /* ---- OPENAI PARTNER NETWORK ----
       Reemplazó la sección de "certificaciones verificables", que estaba con
       datos de plantilla. Esta es la única credencial confirmada, así que va
       sola y en grande.
       REVISAR el texto de `significa`: describe la red en términos generales.
       Si OpenAI te dio una definición propia del tier "Select Partner",
       conviene usar esa. */
    openai: {
      eyebrow: "Credencial oficial",
      titulo: "OpenAI *Select Partner*",
      badge: "/images/credenciales/openai-partner-network.png",
      badgeAlt: "Insignia oficial OpenAI Select Partner",
      significa: [
        "El OpenAI Partner Network es la red de socios que OpenAI reconoce por su experiencia implementando su tecnología. «Select Partner» es el nivel con el que está acreditada InnerFlow AI.",
        "En concreto: acceso a formación y recursos oficiales, y trabajo alineado con las prácticas que recomienda quien desarrolla los modelos. Para una empresa que contrata, es la diferencia entre alguien que aprendió mirando tutoriales y alguien acreditado por la fuente.",
      ],
    },

    /* ---- FORMACIÓN ----
       La única foto de diploma que hay es la del posgrado en UCEMA, así que
       ese va destacado con imagen y los otros dos como lista al costado.
       Si conseguís las fotos del máster o la licenciatura, se pueden
       promover a destacadas repitiendo la estructura de `destacada`. */
    formacionMeta: {
      eyebrow: "Formación",
      titulo: "Dónde me *formé*",
      subtitulo:
        "Gestión de negocios primero, inteligencia artificial después. La combinación es la que me permite traducir entre las dos.",
    },
    formacionDestacada: {
      titulo: "Posgrado en Gestión Estratégica de Inteligencia Artificial y Automatización Empresarial",
      institucion: "Universidad del CEMA",
      // Fecha leída en el diploma de la foto: expedido el 21/07/2025.
      detalle: "Egresado en 2025",
      img: "/images/formacion/ucema1.jpg",
      imgLabel: "/images/formacion/ucema1.jpg",
      ratio: "4/5",
    },
    /* Dos grupos con subtítulo: la columna quedaba desbalanceada contra la
       foto del diploma, que es alta. */
    formacionGrupos: [
      {
        subtitulo: "Títulos académicos",
        items: [
          {
            titulo: "Master in Business Administration",
            institucion: "Universidad Nacional del Litoral",
          },
          {
            titulo: "Licenciatura en Administración",
            institucion: "Universidad Nacional del Litoral",
          },
        ],
      },
      {
        subtitulo: "Licencias y certificaciones",
        items: [
          {
            titulo: "Experto PyME",
            institucion: "Secretaría de Industria y Desarrollo Productivo de la Nación",
          },
          {
            titulo: "Scrum Fundamentals Certified (SFC)",
            institucion: "SCRUMstudy México by SIXD",
          },
          {
            titulo: "Consultor CRM e Inteligencia Artificial en Ventas",
            institucion: "Agile Sales",
          },
        ],
      },
    ],

    /* ---- SPEAKER ----
       Reemplazó la línea de tiempo "Mi experiencia", que estaba vacía.
       PARA AGREGAR MÁS FOTOS: copialas en /public/images/speaker/ con el
       nombre siguiente de la serie (evento-07.jpg, evento-08.jpg…) y sumá
       una línea acá. El carrusel se acomoda solo.
       El `alt` no se ve en pantalla: es para lectores de pantalla y SEO. */
    speaker: {
      eyebrow: "Speaker",
      titulo: "En el *escenario*",
      texto: [
        "Doy charlas y keynotes sobre inteligencia artificial aplicada a negocios en eventos, empresas y universidades. Paso por públicos que no se parecen entre sí —productores agropecuarios, industria alimentaria, jóvenes emprendedores, equipos de dirección— y esa es justamente la parte que más me interesa: encontrar la forma de contar lo mismo de manera que a cada uno le sirva.",
      ],
      fotos: [
        { img: "/images/speaker/evento-01.jpg", imgLabel: "/images/speaker/evento-01.jpg", alt: "Pablo Brunet dando una charla" },
        { img: "/images/speaker/evento-07.jpg", imgLabel: "/images/speaker/evento-07.jpg", alt: "Pablo Brunet con el grupo de participantes al cierre de una charla" },
        { img: "/images/speaker/evento-08.jpg", imgLabel: "/images/speaker/evento-08.jpg", alt: "Pablo Brunet exponiendo en el faro de AgroActiva" },
        { img: "/images/speaker/evento-02.jpg", imgLabel: "/images/speaker/evento-02.jpg", alt: "Pablo Brunet dando una charla" },
        { img: "/images/speaker/evento-09.webp", imgLabel: "/images/speaker/evento-09.webp", alt: "Pablo Brunet en el escenario de TEDx" },
        { img: "/images/speaker/evento-03.jpg", imgLabel: "/images/speaker/evento-03.jpg", alt: "Pablo Brunet dando una charla" },
        { img: "/images/speaker/evento-04.jpg", imgLabel: "/images/speaker/evento-04.jpg", alt: "Pablo Brunet dando una charla" },
        { img: "/images/speaker/evento-05.jpg", imgLabel: "/images/speaker/evento-05.jpg", alt: "Pablo Brunet dando una charla" },
        { img: "/images/speaker/evento-06.jpg", imgLabel: "/images/speaker/evento-06.jpg", alt: "Pablo Brunet dando una charla" },
      ],
    },

    /* ---- REFORMA CONSTITUCIONAL DE SANTA FE ----
       Participación presentando el proyecto sobre IA y pymes.
       Subí las fotos a /public/images/reforma/ y poné las rutas acá. */
    reforma: {
      eyebrow: "Participación pública",
      titulo: "IA y pymes en la *reforma constitucional de Santa Fe*",
      texto: [
        "Expuse ante la Comisión de Declaraciones, Derechos y Garantías de la Convención Reformadora de la Constitución de Santa Fe.",
        "La propuesta: darle rango constitucional al desarrollo de políticas de formación y calificación del empleo privado, con foco en la incorporación de inteligencia artificial y automatización en las micro, pequeñas y medianas empresas santafesinas.",
      ],
      /* Las tres son 3:2, así que el marco va en esa proporción y no recorta.
         Ordenadas de más a menos elocuente: primero vos exponiendo.
         `alt` no se ve en pantalla: es para lectores de pantalla y SEO.
         REVISAR: las fotos traen el sello "Convencionales por un día" y son
         de principios de julio de 2025. */
      fotosRatio: "3/2",
      fotos: [
        {
          img: "/images/reforma/convencionales-exposicion.jpg",
          imgLabel: "/images/reforma/convencionales-exposicion.jpg",
          alt: "Pablo Brunet exponiendo la propuesta en el recinto",
        },
        {
          img: "/images/reforma/convencionales-votacion.jpg",
          imgLabel: "/images/reforma/convencionales-votacion.jpg",
          alt: "Votación a mano alzada durante la sesión",
        },
        {
          img: "/images/reforma/convencionales-recinto.jpg",
          imgLabel: "/images/reforma/convencionales-recinto.jpg",
          alt: "Vista general del recinto durante la sesión",
        },
      ],
    },

  },
};
