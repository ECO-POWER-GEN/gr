import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { ChevronLeft, Loader2, Pencil, Trash2 } from 'lucide-react';
import type { Session } from '@supabase/supabase-js';
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
  const navigate = useNavigate();
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [deleting, setDeleting] = useState(false);

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

    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => listener.subscription.unsubscribe();
  }, [id]);

  const handleDelete = async () => {
    if (!id || !confirm('이 게시글을 삭제하시겠습니까?')) return;
    setDeleting(true);
    const { error } = await supabase.from('case_study').delete().eq('id', id);
    if (error) {
      console.error('Failed to delete case study:', error);
      alert('삭제 중 오류가 발생했습니다.');
      setDeleting(false);
      return;
    }
    navigate('/cases');
  };

  return (
    <section className="py-16 bg-white min-h-[60vh]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/cases"
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
          >
            <ChevronLeft size={16} /> 목록으로
          </Link>

          {session && caseStudy && (
            <div className="flex items-center gap-4">
              <Link
                to={`/admin/cases/${id}/edit`}
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#053573] transition-colors"
              >
                <Pencil size={15} /> 수정
              </Link>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500 disabled:opacity-50 transition-colors"
              >
                <Trash2 size={15} /> 삭제
              </button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="py-24 text-center text-gray-300">
            <Loader2 size={28} className="mx-auto mb-3 animate-spin" />
            <p className="text-sm">불러오는 중...</p>
          </div>
        ) : error || !caseStudy ? (
          <div className="py-24 text-center text-gray-400">
            {error ?? '게시글을 찾을 수 없습니다.'}
          </div>
        ) : (
          <article>
            <header className="pb-6 mb-8 border-b border-gray-200">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{caseStudy.title}</h1>
              <p className="text-sm text-gray-400">
                작성일 {new Date(caseStudy.created_at).toLocaleDateString('ko-KR')}
              </p>
            </header>

            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap mb-8">{caseStudy.content}</p>

            {caseStudy.images.length > 0 && (
              <div className="flex flex-col gap-4">
                {caseStudy.images.map((url, i) => (
                  <img
                    key={url + i}
                    src={url}
                    alt={`${caseStudy.title} 사진 ${i + 1}`}
                    className="w-full object-cover"
                  />
                ))}
              </div>
            )}
          </article>
        )}
      </div>
    </section>
  );
}
