-- Optional: paste in Supabase SQL editor for phamthanhhiep000@gmail.com
-- Then set NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel.

create table if not exists eight_progress (
  user_id text primary key,
  state jsonb not null,
  updated_at timestamptz default now()
);

alter table eight_progress enable row level security;
create policy "read_write_anon" on eight_progress for all using (true) with check (true);
-- Tighten this before a real public launch.
