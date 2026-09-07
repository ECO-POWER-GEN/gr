-- 사전 준비: Supabase 대시보드 → Storage → New bucket
--   이름: case-images / Public bucket: 켜기
-- 만든 뒤 이 SQL을 SQL Editor에서 실행

create policy "public read case-images"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'case-images');

create policy "admin insert case-images"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'case-images');

create policy "admin update case-images"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'case-images');

create policy "admin delete case-images"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'case-images');
