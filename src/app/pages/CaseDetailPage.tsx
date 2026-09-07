import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface CaseStudy {
  id: string;
  title: string;
  content: string;
  images: string[];
  created_at: string;
}

export default function CaseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('case_study')
        .select('id, title, content, images, created_at')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Failed to load case study:', error);
        setError('게시글을 찾을 수 없습니다.');
      } else {
        setCaseStudy(data);
      }
      setLoading(false);
    })();
  }, [id]);

  return (
    <section className="py-16 bg-gray-50 min-h-[60vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/cases"
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors"
        >
          <ChevronLeft size={16} /> 목록으로
        </Link>

        {loading ? (
          <div className="py-24 text-center text-gray-300">
            <Loader2 size={28} className="mx-auto mb-3 animate-spin" />
            <p className="text-sm">불러오는 중...</p>
          </div>
        ) : error || !caseStudy ? (
          <div className="bg-white rounded-2xl shadow-sm p-16 text-center text-gray-400">
            {error ?? '게시글을 찾을 수 없습니다.'}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{caseStudy.title}</h1>
            <p className="text-sm text-gray-400 mb-8">
              작성일 {new Date(caseStudy.created_at).toLocaleDateString('ko-KR')}
            </p>

            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap mb-8">{caseStudy.content}</p>

            {caseStudy.images.length > 0 && (
              <div className="flex flex-col gap-4">
                {caseStudy.images.map((url, i) => (
                  <img
                    key={url + i}
                    src={url}
                    alt={`${caseStudy.title} 사진 ${i + 1}`}
                    className="w-full rounded-lg object-cover"
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
