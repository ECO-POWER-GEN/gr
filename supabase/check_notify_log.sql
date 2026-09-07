-- 최근 pg_net 요청들의 응답 상태 확인 (트리거가 실제로 발동했는지, 어떤 응답을 받았는지)
select
  id,
  status_code,
  content::text as response_body,
  created
from net._http_response
order by created desc
limit 5;
