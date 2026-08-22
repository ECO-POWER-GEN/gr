import { Phone } from 'lucide-react';
import bannerImage from '../../imports/banner.png';
import { CONTACT } from '../../lib/constants';

export default function HeroSection() {
  return (
    <section className="relative h-[600px] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={bannerImage}
          alt="Eco Power Gen 발전차량"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="text-white max-w-2xl">
          <h1 className="text-5xl md:text-6xl mb-6 font-bold">
            <span className="text-xl md:text-2xl">현장에 안정적인 전력을 공급하는</span> <br />
            Eco Power Gen<br />
          </h1>
          <p className="text-xs md:text-lg mb-8 font-semibold">
            저공해 방음 발전기 · 방음 발전차 임대 · 비상 전력 공급
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={CONTACT.phoneHref}
              className="bg-[#8BC34A] hover:bg-[#689F38] text-white px-8 py-4 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone size={20} />
              상담 문의하기
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
