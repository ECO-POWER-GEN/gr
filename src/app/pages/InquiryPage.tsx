import InquiryForm from '../components/InquiryForm';
import PageBanner from '../components/PageBanner';

export default function InquiryPage() {
  return (
    <>
      <PageBanner title="온라인 문의" subtitle="궁금하신 사항을 남겨주세요. 빠르게 답변해 드립니다." />
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <InquiryForm />
        </div>
      </section>
    </>
  );
}
