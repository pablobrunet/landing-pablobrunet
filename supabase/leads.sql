-- =====================================================================
-- TABLA DE CORREOS — newsletter + desbloqueo de recursos
-- ---------------------------------------------------------------------
-- Pegá esto tal cual en Supabase → SQL Editor → Run.
-- =====================================================================

create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique,
  -- 'newsletter' | 'guias-y-materiales'. Es lo que después usás en n8n
  -- para decidir qué mandarle a cada persona.
  origen      text not null default 'desconocido',
  creado_en   timestamptz not null default now()
);

-- Búsquedas por origen (para segmentar en n8n o exportar)
create index if not exists leads_origen_idx on public.leads (origen);

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

-- ---------------------------------------------------------------------
-- COMPROBACIÓN
-- Después de correr todo, esto debería insertar una fila:
--   insert into public.leads (email, origen)
--   values ('prueba@ejemplo.com', 'newsletter');
-- Y esto NO debería devolver nada desde el navegador:
--   select * from public.leads;
-- ---------------------------------------------------------------------
