-- =====================================================================
-- TABLA DE CORREOS — newsletter + desbloqueo de recursos
-- ---------------------------------------------------------------------
-- Pegá esto tal cual en Supabase → SQL Editor → Run.
-- (Si la tabla ya existe con `email` único, corré antes el archivo
--  migracion-01-unique-por-origen.sql).
--
-- MODELO: cada fila es UN PEDIDO, no una persona.
-- La misma persona puede suscribirse al newsletter y, más adelante, pedir
-- las guías: son dos intenciones distintas y quedan como dos filas. Lo que
-- no se repite es la combinación (email, origen), así que nadie se anota
-- dos veces a lo mismo.
--
--   ana@ejemplo.com  |  newsletter          |  10 de marzo
--   ana@ejemplo.com  |  guias-y-materiales  |  02 de abril   <- permitido
--   ana@ejemplo.com  |  newsletter          |  05 de abril   <- rechazado
--
-- Si `email` fuera único a secas, el segundo pedido se perdería y no
-- habría forma de saber que esa persona además quiere las guías: habría
-- que mandárselas a toda la lista o a nadie.
-- =====================================================================

create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  email       text not null,
  -- 'newsletter' | 'guias-y-materiales'. Es lo que después usás en n8n
  -- para decidir qué mandarle a cada persona.
  origen      text not null default 'desconocido',
  creado_en   timestamptz not null default now(),

  -- La clave del modelo: único por PAR, no por correo.
  constraint leads_email_origen_key unique (email, origen)
);

-- Búsquedas por origen (para segmentar en n8n o exportar)
create index if not exists leads_origen_idx on public.leads (origen);
-- Búsquedas por persona (para ver todo lo que pidió alguien)
create index if not exists leads_email_idx on public.leads (email);

-- ---------------------------------------------------------------------
-- SEGURIDAD
-- La web inserta desde el navegador con la publishable key, que es pública.
-- Lo que hace que eso sea seguro es esto: se permite INSERT y NADA MÁS.
-- Sin política de SELECT, la tabla es invisible desde afuera — nadie
-- puede leerse tu lista de correos aunque tenga la clave.
--
-- La publishable key corre como rol `anon`, igual que la clave anterior,
-- así que la política de abajo sirve para las dos.
-- ---------------------------------------------------------------------
alter table public.leads enable row level security;

drop policy if exists "anon puede insertar" on public.leads;
create policy "anon puede insertar"
  on public.leads
  for insert
  to anon
  with check (
    -- Validación mínima del lado del servidor: que parezca un correo.
    email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    and length(email) <= 254
    and origen in ('newsletter', 'guias-y-materiales')
  );

-- =====================================================================
-- CONSULTAS ÚTILES — para el SQL Editor, no para la web
-- =====================================================================

-- Lista maestra sin repetidos, con lo que pidió cada uno:
--   select email,
--          array_agg(origen order by creado_en) as pidio,
--          min(creado_en) as primer_contacto
--   from public.leads
--   group by email
--   order by primer_contacto desc;

-- Solo quienes pidieron las guías:
--   select email, creado_en from public.leads
--   where origen = 'guias-y-materiales'
--   order by creado_en desc;

-- Newsletter puro: los que NO pidieron las guías.
--   select email from public.leads where origen = 'newsletter'
--   except
--   select email from public.leads where origen = 'guias-y-materiales';

-- =====================================================================
-- COMPROBACIÓN
--   insert into public.leads (email, origen)
--     values ('prueba@ejemplo.com', 'newsletter');          -- entra
--   insert into public.leads (email, origen)
--     values ('prueba@ejemplo.com', 'guias-y-materiales');  -- entra también
--   insert into public.leads (email, origen)
--     values ('prueba@ejemplo.com', 'newsletter');          -- rechazado (409)
-- =====================================================================
