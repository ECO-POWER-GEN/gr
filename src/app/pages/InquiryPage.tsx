import InquiryForm from '../components/InquiryForm';

export default function InquiryPage() {
  return (
    <>
      <section className="bg-gradient-to-r from-[#33691E] to-[#8BC34A] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">온라인 문의</h1>
          <p className="text-lg text-white/80">궁금하신 사항을 남겨주세요. 빠르게 답변해 드립니다.</p>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <InquiryForm />
        </div>
      </section>
    </>
  );
}
