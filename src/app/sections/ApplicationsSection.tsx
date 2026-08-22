const APPLICATIONS = [
  '드라마 · 영화 · 방송',
  '축제 · 콘서트',
  '전시 · 박람회',
  '지역행사',
  '비상전원',
  'VIP 의전행사',
  '건설 현장',
  '야외 행사',
];

export default function ApplicationsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 font-semibold">
          <h2 className="text-4xl mb-4 font-semibold">다양한 분야에서의 활용</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {APPLICATIONS.map((title) => (
            <div
              key={title}
              className="bg-gray-50 p-6 rounded-xl hover:bg-[#8BC34A]/5 hover:border-[#8BC34A] border-2 border-transparent transition-all"
            >
              <h3 className="text-lg text-center">{title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
