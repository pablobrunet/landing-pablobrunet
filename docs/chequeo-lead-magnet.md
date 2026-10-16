# Formularios → Supabase → n8n

La autoevaluación de `/programa-integra` pide nombre, empresa y correo
después de la última pregunta y manda el informe por mail. Usa el mismo
circuito que la newsletter y los recursos: la misma tabla, con un tercer
origen.

```
Navegador (captcha de Cloudflare Turnstile, casi siempre invisible)
 ├─ Newsletter / Recursos → POST /api/lead     ─┐
 └─ Autoevaluación        → POST /api/chequeo  ─┤   firewall de Vercel: 5 envíos por minuto por IP
                                                ▼
             api/ (funciones de Vercel): mismo sitio → datos válidos → captcha válido
                                                │   clave sb_secret_… (nunca llega al navegador)
             registrar_lead()  /  registrar_chequeo()
                                                ▼
              Supabase: tabla newsletter-prospects
              (una fila por correo y origen: newsletter | guias-y-materiales | chequeo)
                                                │
        ┌──────── trigger lead_pedidos_a_n8n ───┴──── trigger chequeo_a_n8n ────────┐
        ▼  (newsletter, guias-y-materiales)                       (chequeo)          ▼
 n8n "INTEGRA - Newsletter + Recursos gratuitos"     n8n "INTEGRA - Chequeo con informe por mail"
   └─ GHL: contacto + campo "INTEGRA - Registro mail"   ├─ Resend: mail con el informe
      (los mails los manda la automatización de GHL)    └─ GHL: contacto + "Chequeo web"
```

**Si la persona repite el chequeo**, su fila NO se actualiza: se suma un
pedido y nada más. Nombre, empresa e informe quedan como la primera vez, para
que nadie pueda pisar el chequeo de otro con sólo saber su correo. Como el
trigger dispara igual, le llega otra vez el mail, con el informe del primero.

**La respuesta es siempre la misma**, sea un correo nuevo o uno que ya estaba:
ni la pantalla ni la API dicen si alguien está en la lista.

Sin correo no se ve el resultado. La única excepción es que falle el envío
(captcha, API o Supabase): ahí se muestra igual, con un aviso de que el mail no
salió.

## Estado

| Pieza | Estado |
|---|---|
| Supabase: tabla, funciones, triggers | Aplicado el 2026-09-28 — `supabase/migracion-03-chequeo.sql` |
| Supabase: el chequeo no pisa datos, respuesta única | Aplicado el 2026-10-16 — `supabase/migracion-04-chequeo-sin-pisar.sql` |
| Supabase: `anon` sin permiso | Aplicado el 2026-10-16 — `supabase/migracion-05-cerrar-anon.sql`. Llamada directa con la clave pública: 401 |
| Web y `api/` | Listas en el repositorio |
| Variables en Vercel | Cargadas. Falta borrar `PUBLIC_SUPABASE_URL` y `PUBLIC_SUPABASE_PUBLISHABLE_KEY` |
| Firewall de Vercel | Activo: 5 envíos por minuto por IP en `/api/` (probado: el sexto da 429) |
| n8n | Activo, sin cambios. Remitente: `comunicaciones@integra.innerflowai.com` |
| GHL | Falta la opción `Chequeo web` en el campo y la automatización (abajo) |

## Puesta en marcha (en este orden)

1. **Cloudflare → Turnstile → Add widget.** Dominios: `pablobrunet.com` y
   `www.pablobrunet.com`. Modo: *Managed*. Copiar la clave del sitio y la
   secreta.
2. **Supabase → SQL Editor:** correr las consultas de control del final de
   `migracion-04`, después la migración 04 entera.
3. **Vercel → Settings → Environment Variables** (Production y Preview):
   `PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`, `SUPABASE_URL` y
   `SUPABASE_SECRET_KEY` (Supabase → API Keys → Secret keys). Ver
   `.env.example`.
4. **Vercel → Firewall → Configure → New Rule.** Por API no se puede
   mientras el firewall del proyecto no se haya abierto nunca desde el panel.
   - Nombre: `Formularios: 5 envíos por minuto por IP`
   - If: *Request Path* · *Starts with* · `/api/`
   - Then: *Rate Limit* · *Fixed Window* · 60 segundos · 5 pedidos · por *IP Address* · acción *Too Many Requests (429)*
   - *Save* y después *Review Changes* → *Publish*.
5. **Deploy.** Probar los cuatro casos de abajo.
6. **Supabase:** correr `migracion-05-cerrar-anon.sql`.
7. **Vercel:** borrar `PUBLIC_SUPABASE_URL` y
   `PUBLIC_SUPABASE_PUBLISHABLE_KEY`, que ya no se usan, y volver a publicar.

## Por qué las funciones están en `api/` y no en Astro

El sitio es 100% estático. Las dos funciones de `api/` las arma Vercel
aparte, con el Node del proyecto. El adaptador de Vercel para Astro 4 las
habría armado para Node 18, que Vercel ya no acepta. Si algún día se pasa a
Astro 5 o posterior, se pueden mover a `src/pages/api/`.

Con `astro dev` las rutas `/api/*` no existen. Para probar los formularios
en local: `npx vercel dev`, con las claves de prueba de Turnstile en `.env`.

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

## Pruebas

Con la web nueva publicada. Usar un correo propio.

**1. Envío normal.** Hacer la autoevaluación en `/programa-integra` y
anotarse en la newsletter del home. Las dos pantallas muestran el éxito.

```sql
select email, origen, nombre, empresa, pedidos, ultimo_pedido
from "newsletter-prospects" where email = 'tu@correo.com';
```

En n8n → Executions, las dos ejecuciones terminan en verde; llega el mail del
informe.

**2. Correo repetido.** Repetir la autoevaluación con el mismo correo pero
otro nombre y otra empresa. La pantalla muestra lo mismo que la primera vez.
En la tabla: `pedidos` sube a 2, y `nombre`, `empresa` y `datos` siguen
siendo los de la primera vez.

**3. Envío sin captcha.** Tiene que dar 403 y no guardar nada:

```bash
curl -i -X POST https://pablobrunet.com/api/lead \
  -H "Origin: https://pablobrunet.com" -H "Content-Type: application/json" \
  -d '{"email":"bot@ejemplo.com","origen":"newsletter"}'
```

Con `"captcha":"cualquier-cosa"` también da 403. Repetido más de 5 veces en un
minuto, el firewall de Vercel responde 429.

**4. Llamada directa a Supabase con la clave pública** (después de la
migración 05). Tiene que fallar con 401 o 403 y `"code":"42501"`:

```bash
curl -i -X POST "https://qiucglxylkidfpwbuibb.supabase.co/rest/v1/rpc/registrar_lead" \
  -H "apikey: <PUBLISHABLE_KEY>" -H "Content-Type: application/json" \
  -d '{"p_email":"bot@ejemplo.com","p_origen":"newsletter"}'
```

Lo mismo con `/rpc/registrar_chequeo`.

**Borrar las pruebas:**

```sql
delete from "newsletter-prospects" where email = 'tu@correo.com';
```
