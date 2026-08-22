create table public.inquiry (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text,
  phone text not null,
  email text,
  address text not null,
  date_from date not null,
  date_to date not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.inquiry enable row level security;

-- 익명 사용자가 문의를 "등록"만 할 수 있도록 허용 (조회/수정/삭제는 정책이 없으므로 기본 차단)
create policy "Allow public inquiry submissions"
  on public.inquiry
  for insert
  to anon
  with check (true);
