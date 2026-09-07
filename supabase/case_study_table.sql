create table public.case_study (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  thumbnail_url text not null,
  images text[] not null default '{}',
  created_at timestamptz not null default now()
);

alter table public.case_study enable row level security;

-- 누구나 조회 가능
create policy "public read case_study"
  on public.case_study
  for select
  to anon, authenticated
  using (true);

-- 로그인한 사람(=관리자)만 등록/수정/삭제 가능
create policy "admin write case_study"
  on public.case_study
  for all
  to authenticated
  using (true)
  with check (true);
