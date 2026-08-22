import { Zap } from 'lucide-react';

export default function PlaceholderPage() {
  return (
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
  );
}
