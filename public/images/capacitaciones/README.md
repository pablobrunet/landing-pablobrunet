# Fotos de capacitaciones

Alimentan el carrusel del final de /servicios/speaker-y-capacitador, la
sección que va justo abajo de las charlas grabadas.

## Cómo agregar una

1. Copiá la foto acá con el nombre del lugar en minúsculas y con guiones:
   `club-pyxo.jpg`, `parque-industrial-sauce-viejo.jpg`, …
   **Sin espacios ni acentos en el nombre del archivo**: viajan mal en la URL.
2. Sumá el bloque en `src/data/servicios.ts`, dentro del servicio
   "speaker-y-capacitador" → `galeria.fotos`:

   ```ts
   {
     img: "/images/capacitaciones/club-pyxo.jpg",
     imgLabel: "/images/capacitaciones/club-pyxo.jpg",
     titulo: "Club Pyxo",                    // el lugar
     subtitulo: "Talleres de IA aplicada",   // el tema
     alt: "Taller de IA aplicada en el Club Pyxo",
   },
   ```

`titulo` y `subtitulo` se dibujan sobre la foto, abajo a la izquierda, sobre
un degradado suave que da contraste sin tapar la imagen. `alt` no se ve: es
para lectores de pantalla y buscadores.

Mientras el array esté vacío la sección NO se dibuja, así que no queda un
hueco en la página hasta que las cargues.

## Formato

- **Apaisadas** (3:2 o 16:9). El carrusel las muestra en 4:3 y recorta al centro.
- Ancho **1600 px** alcanza; más pesa de más sin verse mejor.
- JPEG de calidad ~82. Si son PNG de cámara o captura, convertilas: un PNG de
  foto pesa entre 5 y 10 veces más que el JPEG equivalente.
- Cuidá que en las fotos de aula se vea el contexto (gente trabajando,
  pantalla, pizarra): dicen más que un plano del disertante solo.
- El texto va abajo a la izquierda: evitá fotos donde ahí haya algo importante.
