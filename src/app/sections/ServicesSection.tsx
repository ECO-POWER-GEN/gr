import { Zap, Truck, Shield } from 'lucide-react';

const SERVICES = [
  {
    icon: Zap,
    color: '#8BC34A',
    title: '현장 맞춤형 전력 공급',
    description: (
      <>다양한 용량의 발전기로, <br />현장에 최적화된 전력 솔루션을 제공합니다.</>
    ),
  },
  {
    icon: Truck,
    color: '#FDD835',
    title: '저공해 방음 시스템',
    description: (
      <>도심/행사/야간 작업에도 <br />소음 걱정 없이 전력을 공급합니다.</>
    ),
  },
  {
    icon: Shield,
    color: '#689F38',
    title: '신속한 비상 전력 대응',
    description: (
      <>예상치 못한 정전이나 긴급 상황에서도<br />안정적으로 전력을 공급합니다.</>
    ),
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4 font-semibold">
            <span className="text-[#8BC34A]">Eco Power Gen</span>의 서비스
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                style={{ backgroundColor: `${service.color}1A` }}
              >
                <service.icon style={{ color: service.color }} size={32} />
              </div>
              <h3 className="text-2xl mb-4 font-bold">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
