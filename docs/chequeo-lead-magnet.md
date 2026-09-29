# Autoevaluación INTEGRA → informe por mail

La autoevaluación de `/programa-integra-2` pide nombre, empresa y correo
después de la última pregunta y manda el informe por mail. Usa el mismo
circuito que la newsletter y los recursos: la misma tabla, con un tercer
origen.

```
Web
 ├─ Newsletter / Recursos → registrar_lead()    ─┐
 └─ Autoevaluación        → registrar_chequeo() ─┤
                                                 ▼
              Supabase: tabla newsletter-prospects
              (una fila por correo y origen: newsletter | guias-y-materiales | chequeo)
                                                 │
        ┌──────── trigger lead_pedidos_a_n8n ────┴──── trigger chequeo_a_n8n ────────┐
        ▼  (newsletter, guias-y-materiales)                        (chequeo)          ▼
 n8n "INTEGRA - Newsletter + Recursos gratuitos"     n8n "INTEGRA - Chequeo con informe por mail"
   └─ GHL: contacto + campo "INTEGRA - Registro mail"   ├─ Resend: mail con el informe
      (los mails los manda la automatización de GHL)    └─ GHL: contacto + "Chequeo web"
```

Si la persona repite el chequeo, su fila se actualiza con el último
informe (no se duplica), suma un pedido y le llega un informe nuevo.

Sin correo no se ve el resultado. La única excepción es que falle
Supabase: ahí se muestra igual, con un aviso de que el mail no salió.

## Estado

| Pieza | Estado |
|---|---|
| Supabase (tabla, funciones, triggers) | Aplicado el 2026-09-28 — `supabase/migracion-03-chequeo.sql` |
| Web | Lista en `/programa-integra-2` |
| n8n | Activo. Remitente: `comunicaciones@integra.innerflowai.com` |
| GHL | Falta la opción `Chequeo web` en el campo y la automatización (abajo) |

## El informe

Lo arma n8n, no la web. El código del nodo *Preparar contacto e informe*
está en [n8n/chequeo-informe.js](../n8n/chequeo-informe.js): textos por
nivel, qué hacer según cada respuesta, la hoja de ruta de 90 días, la
prueba para mañana y los dos botones (agenda de la Consultoría Estratégica
Gratuita y WhatsApp). Para cambiar un texto, editar ese archivo y pegarlo
entero en el nodo.

De lo que manda el navegador sólo se usa qué opción eligió la persona en
cada pregunta; el nivel se recalcula ahí. Si se cambia una pregunta u
opción en `src/data/integra2.ts`, hay que cambiarla también en ese archivo
(si no coinciden, el informe no sale).

## Lo que falta

### GHL

El flujo crea o actualiza el contacto (nombre, apellido, empresa) y agrega
`Chequeo web` al campo *INTEGRA - Registro mail*, sin borrar lo que ya
tenía. Es el mismo mecanismo que usa el flujo de newsletter con
`Newsletter` y `Recursos gratuitos`.

1. En el campo *INTEGRA - Registro mail*, agregar la opción `Chequeo web`
   (escrita exactamente así).
2. Crear la automatización de nutrición con disparador "el campo incluye
   `Chequeo web`". Al terminar, agrega `Newsletter` al mismo campo y con
   eso entra en la automatización de newsletter que ya existe.

### n8n

Si Resend falla (por ejemplo, un remitente de un dominio no verificado),
la ejecución se corta ahí y tampoco se actualiza GHL. El remitente se
cambia sólo en el bloque `AJUSTAR` del nodo *Preparar contacto e
informe*, entre comillas simples.

## Prueba de punta a punta

1. Hacer la autoevaluación en `/programa-integra-2` con un correo propio.
2. Supabase:
   `select * from "newsletter-prospects" where origen = 'chequeo' order by ultimo_pedido desc limit 1;`
   La columna `datos` tiene que traer el informe completo.
3. n8n → Executions: la ejecución tiene que pasar por los dos filtros y
   terminar en verde.
4. Revisar el mail y el contacto en GHL (nombre, empresa y "Chequeo web" en *INTEGRA - Registro mail*).
5. Borrar la prueba:
   `delete from "newsletter-prospects" where email = '…' and origen = 'chequeo';`
