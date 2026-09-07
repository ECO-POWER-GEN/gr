-- Database Webhooks UI가 "schema supabase_functions does not exist" 에러로
-- 저장이 안 될 때의 우회 방법: pg_net 확장으로 직접 트리거를 만든다.
-- 사전 준비: Database → Extensions 에서 "pg_net" 활성화 후 아래 실행.

create or replace function public.notify_new_inquiry()
returns trigger
language plpgsql
as $$
begin
  perform net.http_post(
    url := 'https://ghcbsfhkkuegdavvvshq.supabase.co/functions/v1/notify-inquiry',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdoY2JzZmhra3VlZ2RhdnZ2c2hxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5MDc0MDAsImV4cCI6MjA4NzQ4MzQwMH0.Qkui_FXduZTnA7eklmrUTpmYtYvMbAYc5dZTpJ6y2IQ'
    ),
    body := jsonb_build_object('record', to_jsonb(new))
  );
  return new;
end;
$$;

drop trigger if exists on_inquiry_created on public.inquiry;

create trigger on_inquiry_created
after insert on public.inquiry
for each row
execute function public.notify_new_inquiry();
