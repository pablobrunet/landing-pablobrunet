/* =====================================================================
   COMENTARIOS Y TESTIMONIOS — muro en movimiento
   ---------------------------------------------------------------------
   Lo dibuja components/MuroComentarios.astro: tres filas infinitas,
   pegadas entre sí, que se cruzan en direcciones contrarias
   (derecha · izquierda · derecha). Entre cada par de comentarios se cuela
   una foto de Pablo del mismo alto que las tarjetas.

   DE DÓNDE SALEN
   Son mensajes reales de participantes de las charlas y capacitaciones,
   tal como los escribieron (con sus emojis, sus "jaja" y sus faltas). No
   se corrigen ni se pulen: esa es justamente la prueba de que son
   auténticos. Lo único que se saca son las comillas de apertura y cierre
   —las pone el diseño— y los saltos de línea, que en una tarjeta de cuatro
   líneas no aportan.

   CÓMO CARGAR UNO NUEVO
     { texto: "…", nombre: "Nombre", rol: "Cargo · Empresa",
       origen: "LinkedIn" }
   · `texto`  la cita, sin comillas.
   · `rol`    opcional. Si falta, la tarjeta muestra solo el nombre. Hoy
              ninguno lo tiene: los mensajes llegaron por WhatsApp, sin
              cargo ni empresa.
   · `origen` opcional. Etiqueta chiquita de dónde salió el comentario
              (LinkedIn, WhatsApp, Google, encuesta del taller…).

   EL ORDEN IMPORTA UN POCO
   El muro reparte la lista en tres tramos seguidos, uno por fila. Si van
   todos los mensajes cortos juntos al principio, la primera fila queda
   raleada y las otras dos apretadas. Por eso la lista alterna largos y
   cortos en vez de seguir el orden en que fueron llegando.

   FOTOS: viven en /public/images/ y se listan en `fotosMuro`. Podés poner
   las que quieras; el muro las va rotando en orden.
   ===================================================================== */

export interface Comentario {
  texto: string;
  nombre: string;
  rol?: string;
  origen?: string;
}

export interface FotoMuro {
  img: string;
  alt: string;
  /** Encuadre, para las fotos que el recorte centrado deja mal. */
  pos?: string;
}

export const comentarios: Comentario[] = [
  {
    texto: "Buenismo todo cheeeee. Un viaje tremendo. Gracias a todos!!",
    nombre: "Eduardo H.",
  },
  {
    texto:
      "Muy bueno todo! Súper dinámico y con ejemplos que realmente sirven. Me llevo varias cosas para empezar a probar esta semana 🙌",
    nombre: "Juli S.",
  },
  {
    texto:
      "La verdad muy bueno. Pensé que iba a ser bastante más teórico y terminamos probando un montón de cosas. Me fui con varias ideas para aplicar.",
    nombre: "Nico R.",
  },
  {
    texto:
      "La verdad que excelente. Había usado IA alguna vez pero muy por arriba. Ahora entendí mucho mejor cómo sacarle provecho.",
    nombre: "Pato G.",
  },
  {
    texto: "Muy bueno el último módulo 💪🏼💪🏼 Excelente capacitación",
    nombre: "Alfredo G.",
  },
  {
    texto:
      "Muy práctico, que para mí es lo más importante. No quedó solamente en conceptos, hicimos cosas y vimos resultados ahí mismo.",
    nombre: "Marce",
  },
  {
    texto:
      "Excelente!! Súper claro y práctico. Sobre todo para los que veníamos medio de cero con todo esto 😅",
    nombre: "Carla M.",
  },
  {
    texto:
      "Buenísimo!! Pensé que iba a ser más técnico y nada que ver. Se entendió todo perfecto 👏",
    nombre: "Cami R.",
  },
  {
    texto:
      "Si a mi me pareció espectacular, bien práctico. Nos da un contexto e idea de las herramientas y lo que podemos hacer con IA",
    nombre: "Matías B.",
  },
  {
    texto:
      "Me sorprendió para bien. Hay un montón de cosas simples que uno podría estar usando todos los días y ni se te ocurre.",
    nombre: "Ezequiel T.",
  },
  {
    texto:
      "Tremendo todo 👏👏 Me voló la cabeza algunas cosas que se pueden hacer y que ni sabía que existían.",
    nombre: "Juanma P.",
  },
  {
    texto:
      "Excelente Pablo! Muy clara la forma de explicar y sin complicarla de más. Ahora toca ponerse a practicar jaja.",
    nombre: "Diego A.",
  },
  {
    texto:
      "Estuvo muy bueno. Sirvió para empezar a tener un primer acercamiento con la herramienta y poder empezar a probar las distintas funcionalidades",
    nombre: "Miki ⭐",
  },
  {
    texto:
      "Muy buena experiencia. Me ayudó sobre todo a perderle un poco el miedo y empezar a meter mano con las herramientas.",
    nombre: "Vane 💫",
  },
  {
    texto:
      "Muy bueno! Yo ya usaba ChatGPT bastante pero igual me llevé varias cosas nuevas y formas distintas de encararlo.",
    nombre: "Sofi G.",
  },
  {
    texto:
      "Estuvo genial. Yo venía medio escéptico con todo el tema IA pero después de verlo aplicado cambia bastante la mirada.",
    nombre: "Seba M.",
  },
  {
    texto:
      "Estuvo muy bueno! En mí caso yo fui con la idea de participar de una charla sobre IA, pero terminé aplicando algunas cosas y me sirvieron 😉👍",
    nombre: "LT Emprende",
  },
  {
    texto:
      "Me encantó porque fueron cosas que tranquilamente mañana las puedo aplicar en el laburo. Eso hizo la diferencia para mí.",
    nombre: "Agus",
  },
  {
    texto:
      "Me gustó mucho que fuera al grano. Nada de tanta teoría y bastante de sentarse a probar y ver qué sirve realmente.",
    nombre: "Mariano L.",
  },
  {
    texto:
      "Muy completo y llevadero. Se pasó rapidísimo y me quedaron un montón de ideas dando vueltas para seguir probando 😅",
    nombre: "Lean F.",
  },
  {
    texto:
      "Muy buena la capacitación Pablo. Me sirvió para ordenar un poco todo lo que venía escuchando de IA y entender por dónde arrancar.",
    nombre: "Fede",
  },
  {
    texto:
      "Excelente experiencia. En mi caso entré sin saber prácticamente nada y ahora por lo menos ya sé qué preguntar, qué herramienta usar y cómo empezar 😂",
    nombre: "Lau",
  },
  {
    texto:
      "Muy buena charla y muy llevadera. Pensé que después de dos horas iba a quedar quemado jaja y fue todo lo contrario.",
    nombre: "Nacho",
  },
  {
    texto:
      "Estuvo buenísimo. Creo que lo mejor fue poder ver ejemplos de cosas del día a día y no solamente hablar de “lo que viene” con la IA.",
    nombre: "Gonza C.",
  },
  {
    texto:
      "Muy recomendable. Me quedé con ganas de seguir metiéndole porque te das cuenta de que hay un montón para aprovechar.",
    nombre: "Belu ⭐",
  },
  {
    texto:
      "La verdad 10 puntos. Había probado algunas herramientas pero bastante a los tumbos. Ahora siento que tengo un poco más claro cómo usarlas.",
    nombre: "Ale G.",
  },
  {
    texto:
      "Me encantó. Sobre todo porque no quedó solamente en “mirá qué hace la inteligencia artificial”, sino que pudimos llevarlo a situaciones concretas de nuestro trabajo. Eso suma muchísimo.",
    nombre: "Florencia B.",
  },
];

/* Fotos intercaladas. Una cada dos comentarios, en orden. */
export const fotosMuro: FotoMuro[] = [
  { img: "/images/testimonials/muro-01.jpg", alt: "Pablo Brunet dando una charla" },
  { img: "/images/speaker/evento-01.jpg", alt: "Pablo Brunet en un evento" },
  { img: "/images/testimonials/muro-02.jpg", alt: "Pablo Brunet con un equipo de trabajo" },
  { img: "/images/speaker/evento-07.jpg", alt: "Pablo Brunet capacitando" },
  { img: "/images/testimonials/muro-03.jpg", alt: "Pablo Brunet en una capacitación" },
  { img: "/images/speaker/evento-03.jpg", alt: "Pablo Brunet frente a un auditorio" },
  { img: "/images/testimonials/muro-04.jpg", alt: "Pablo Brunet con asistentes a una charla" },
  { img: "/images/about/tedindx-charla.jpg", alt: "Pablo Brunet en TEDIND-X" },
];

/* ---- Encabezados de cada página ----
   ⚠️ Los comentarios son de charlas y capacitaciones, NO del Programa
   INTEGRA. Por eso ninguno de los dos subtítulos dice que quien escribió
   hizo el programa: sería atribuirles algo que no dijeron. */
export const muroHome = {
  eyebrow: "Testimonios",
  titulo: "Lo que dicen quienes *pasaron por una capacitación*",
  subtitulo:
    "Mensajes de participantes de mis charlas y capacitaciones en IA, tal como los escribieron.",
};

export const muroIntegra = {
  eyebrow: "Testimonios",
  titulo: "Lo que dicen",
  tituloResalte: "quienes ya trabajaron conmigo",
  subtitulo:
    "Mensajes de participantes de mis charlas y capacitaciones en IA, tal como los escribieron.",
};
