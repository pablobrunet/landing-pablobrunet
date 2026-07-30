-- =====================================================================
-- MIGRACIÓN 01 — de "email único" a "(email, origen) único"
-- ---------------------------------------------------------------------
-- CUÁNDO CORRERLA: si creaste la tabla `leads` con la primera versión del
-- esquema, donde `email` era único a secas. Si la creás de cero con el
-- leads.sql actual, no hace falta.
--
-- POR QUÉ: con `email` único, una persona suscripta al newsletter que
-- después pedía las guías chocaba contra la restricción y el pedido se
-- perdía. En la base seguía figurando solo como 'newsletter', así que no
-- había forma de saber a quién mandarle los materiales.
--
-- Es segura de correr: no borra filas ni cambia los datos existentes,
-- solo reemplaza la restricción.
-- =====================================================================

-- 1) Fuera la restricción vieja.
--    El nombre que le pone Postgres por defecto es leads_email_key, pero
--    puede variar: este bloque busca la que aplique sobre (email) sola.
do $$
declare
  nombre text;
begin
  select con.conname into nombre
  from pg_constraint con
  join pg_class rel on rel.oid = con.conrelid
  join pg_namespace nsp on nsp.oid = rel.relnamespace
  where nsp.nspname = 'public'
    and rel.relname = 'leads'
    and con.contype = 'u'
    and con.conkey = array[
      (select attnum from pg_attribute
       where attrelid = rel.oid and attname = 'email')
    ]::smallint[];

  if nombre is not null then
    execute format('alter table public.leads drop constraint %I', nombre);
    raise notice 'Restricción vieja eliminada: %', nombre;
  else
    raise notice 'No había restricción única sobre email sola. Nada que hacer.';
  end if;
end $$;

-- 2) La restricción nueva: única por PAR.
--    Si quedaran duplicados de (email, origen) —no debería, porque antes el
--    email era único— este paso fallaría. En ese caso, mirá primero:
--      select email, origen, count(*) from public.leads
--      group by email, origen having count(*) > 1;
alter table public.leads
  add constraint leads_email_origen_key unique (email, origen);

-- 3) Índice por persona, para consultar todo lo que pidió alguien.
create index if not exists leads_email_idx on public.leads (email);

-- =====================================================================
-- COMPROBACIÓN
-- Con un correo que YA esté en la tabla como 'newsletter':
--   insert into public.leads (email, origen)
--   values ('el-que-ya-existe@ejemplo.com', 'guias-y-materiales');
-- Antes daba error de duplicado. Ahora tiene que entrar.
-- =====================================================================
