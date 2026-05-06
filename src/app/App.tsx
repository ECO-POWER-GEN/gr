import { useState } from 'react';
import { Menu, X, Phone, Mail, MapPin, Zap, Truck, Shield, CheckCircle } from 'lucide-react';
import logoImage from '../imports/logo_1줄.png';
import bannerImage from '../imports/banner.png';

type TabType = '메인화면' | '차량소개' | '설치사례' | '온라인문의';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('메인화면');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs: TabType[] = ['메인화면', '차량소개', '설치사례', '온라인문의'];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center">
              <img src={logoImage} alt="Eco Power Gen" className="h-12 w-auto" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-4">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 transition-all font-medium text-sm ${
                    activeTab === tab
                      ? 'text-black font-semibold'
                      : 'text-gray-500 hover:text-black hover:font-semibold'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden pb-4 space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                    activeTab === tab
                      ? 'bg-[#8BC34A] text-white font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>
        {activeTab === '메인화면' ? (
          <>
            {/* Hero Section */}
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
                      href="tel:010-4884-6596"
                      className="bg-[#8BC34A] hover:bg-[#689F38] text-white px-8 py-4 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Phone size={20} />
                      상담 문의하기
                    </a>
                    {/* <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-lg transition-colors border border-white/30">
                      서비스 더 알아보기
                    </button> */}
                  </div>
                </div>
              </div>
            </section>

            {/* Services Section */}
            <section className="py-20 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-4xl mb-4 font-semibold">
                    <span className="text-[#8BC34A]">Eco Power Gen</span>의 서비스
                  </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                    <div className="w-16 h-16 bg-[#8BC34A]/10 rounded-full flex items-center justify-center mb-6">
                      <Zap className="text-[#8BC34A]" size={32} />
                    </div>
                    <h3 className="text-2xl mb-4 font-bold">현장 맞춤형 전력 공급</h3>
                    <p className="text-gray-600 leading-relaxed">
                      다양한 용량의 발전기로, <br/>
                      현장에 최적화된 전력 솔루션을 제공합니다.
                    </p>
                  </div>

                  <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                    <div className="w-16 h-16 bg-[#FDD835]/10 rounded-full flex items-center justify-center mb-6">
                      <Truck className="text-[#FDD835]" size={32} />
                    </div>
                    <h3 className="text-2xl mb-4 font-bold">저공해 방음 시스템</h3>
                    <p className="text-gray-600 leading-relaxed">
                      도심/행사/야간 작업에도 <br/>
                      소음 걱정 없이 전력을 공급합니다.
                    </p>
                  </div>

                  <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                    <div className="w-16 h-16 bg-[#689F38]/10 rounded-full flex items-center justify-center mb-6">
                      <Shield className="text-[#689F38]" size={32} />
                    </div>
                    <h3 className="text-2xl mb-4 font-bold">신속한 비상 전력 대응</h3>
                    <p className="text-gray-600 leading-relaxed">
                      예상치 못한 정전이나 긴급 상황에서도<br/>
                      안정적으로 전력을 공급합니다.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Applications Section */}
            <section className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 font-semibold">
                  <h2 className="text-4xl mb-4 font-semibold">다양한 분야에서의 활용</h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { title: '드라마 · 영화 · 방송' },
                    { title: '축제 · 콘서트' },
                    { title: '전시 · 박람회' },
                    { title: '지역행사' },
                    { title: '비상전원' },
                    { title: 'VIP 의전행사' },
                    { title: '건설 현장' },
                    { title: '야외 행사' },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 p-6 rounded-xl hover:bg-[#8BC34A]/5 hover:border-[#8BC34A] border-2 border-transparent transition-all"
                    >
                      <h3 className="text-lg text-center">{item.title}</h3>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Contact Section
            <section className="py-20 bg-[#1A237E] text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-4xl mb-8">지금 바로 문의하세요</h2>
                <p className="text-xl mb-12 text-gray-300">
                  전문 상담을 통해 최적의 발전 솔루션을 제안해 드립니다
                </p>
                <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                  <div className="flex items-center gap-3">
                    <Phone className="text-[#8BC34A]" size={24} />
                    <span className="text-xl">010-XXXX-XXXX</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="text-[#8BC34A]" size={24} />
                    <span className="text-xl">info@ecopowergen.com</span>
                  </div>
                </div>
              </div>
            </section> */}
          </>
        ) : (
          <section className="py-32 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="bg-white p-16 rounded-2xl shadow-sm">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="text-gray-400" size={48} />
                </div>
                <h2 className="text-3xl mb-4">페이지 준비 중입니다</h2>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-3">
              <div className="flex flex-wrap items-center gap-x-12 gap-y-2 text-sm">
                <span>Eco Power Gen</span>
                <span>대표자: 이기춘</span>
                <span className="flex items-center gap-1.5"><Phone size={16}/>010-4884-6596</span>
                <span className="flex items-center gap-1.5"><Mail size={16}/>seoul812@naver.com</span>
              </div>
            </div>
            
          </div>
          <div className="border-t border-gray-800 pt-8 text-sm">
            <p>©Eco Power Gen. All rights reserved. Hosting by gr.kim.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}