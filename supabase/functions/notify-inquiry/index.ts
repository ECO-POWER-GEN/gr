// Supabase Database Webhook 대상: inquiry 테이블 INSERT 발생 시 담당자에게 이메일 알림
// 배포: Supabase 대시보드 → Edge Functions → 새 함수 생성(notify-inquiry) → 이 코드 붙여넣기
// 필요 시크릿: RESEND_API_KEY (Edge Functions → notify-inquiry → Settings → Secrets)

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const NOTIFY_EMAIL = "seoul812@naver.com";

interface InquiryRecord {
  name: string;
  company: string | null;
  phone: string;
  email: string | null;
  address: string;
  date_from: string;
  date_to: string;
  message: string;
}

serve(async (req) => {
  const payload = await req.json();
  const record: InquiryRecord = payload.record;

  const text = `새로운 온라인 문의가 접수되었습니다.

이름: ${record.name}
회사명: ${record.company ?? "-"}
연락처: ${record.phone}
이메일: ${record.email ?? "-"}
현장 주소: ${record.address}
기간: ${record.date_from} ~ ${record.date_to}

문의 내용:
${record.message}`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Eco Power Gen 문의알림 <noreply@ecopowergen.co.kr>",
      to: NOTIFY_EMAIL,
      subject: `[신규 문의] ${record.name}님 (${record.address})`,
      text,
    }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    console.error("Resend API error:", errBody);
    return new Response(errBody, { status: 500 });
  }

  return new Response("ok", { status: 200 });
});
