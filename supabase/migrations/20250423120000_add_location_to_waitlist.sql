-- Adds optional `location` to an existing `public.waitlist` table.
--
-- Your current table (baseline) looks like:
--   id uuid PK default gen_random_uuid()
--   email text NOT NULL UNIQUE
--   phone text NULL
--   role text NOT NULL
--   created_at timestamptz NULL default now()
--
-- Run this once in Supabase: SQL Editor → New query → Run.
-- Then refresh Table Editor → waitlist; you should see column `location`.

alter table public.waitlist
  add column if not exists location text null;

comment on column public.waitlist.location is 'User-entered city, country, or freeform location (optional)';

-- Optional: if you ever recreate the table from scratch, include `location`:
-- create table public.waitlist (
--   id uuid not null default gen_random_uuid (),
--   email text not null,
--   phone text null,
--   role text not null,
--   location text null,
--   created_at timestamp with time zone null default now(),
--   constraint waitlist_pkey primary key (id),
--   constraint waitlist_email_key unique (email)
-- );
