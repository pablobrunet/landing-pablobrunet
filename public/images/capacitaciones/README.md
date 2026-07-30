# Fotos de capacitaciones

Alimentan el carrusel del final de /servicios/speaker-y-capacitador.

## Cómo agregar

1. Copiá las fotos acá con nombres correlativos:
   `capacitacion-01.jpg`, `capacitacion-02.jpg`, …
2. Sumá una línea por foto en `src/data/servicios.ts`, dentro del servicio
   "speaker-y-capacitador" → `galeria.fotos`.

Mientras el array esté vacío la sección NO se dibuja, así que no queda un
hueco en la página hasta que las cargues.

## Formato

- **Apaisadas** (3:2 o 16:9). El carrusel las muestra en 4:3 y recorta al centro.
- Ancho **1600 px** alcanza; más pesa de más sin verse mejor.
- JPEG de calidad ~82. Si son PNG de cámara o captura, convertilas: un PNG de
  foto pesa entre 5 y 10 veces más que el JPEG equivalente.
- Cuidá que en las fotos de aula se vea el contexto (gente trabajando,
  pantalla, pizarra): dicen más que un plano del disertante solo.
