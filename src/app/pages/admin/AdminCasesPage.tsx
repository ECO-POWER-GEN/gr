import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Plus, Pencil, Trash2, LogOut, Loader2, Inbox } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

interface CaseStudy {
  id: string;
  title: string;
  thumbnail_url: string;
  created_at: string;
}

export default function AdminCasesPage() {
  const navigate = useNavigate();
  const [cases, setCases] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchCases = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('case_study')
      .select('id, title, thumbnail_url, created_at')
      .order('created_at', { ascending: false });
    if (error) console.error('Failed to load case studies:', error);
    setCases(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchCases();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('이 게시글을 삭제하시겠습니까?')) return;
    setDeletingId(id);
    const { error } = await supabase.from('case_study').delete().eq('id', id);
    if (error) {
      console.error('Failed to delete case study:', error);
      alert('삭제 중 오류가 발생했습니다.');
    } else {
      setCases(prev => prev.filter(c => c.id !== id));
    }
    setDeletingId(null);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  return (
    <section className="py-16 bg-gray-50 min-h-[70vh]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">설치사례 관리</h1>
          <div className="flex items-center gap-3">
            <Link
              to="/admin/cases/new"
              className="border-2 border-[#053573] text-[#053573] hover:bg-[#053573] hover:text-white px-4 py-2.5 transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <Plus size={16} /> 새 글 작성
            </Link>
            <button
              onClick={handleLogout}
              className="text-gray-500 hover:text-gray-800 px-3 py-2.5 flex items-center gap-2 text-sm transition-colors"
            >
              <LogOut size={16} /> 로그아웃
            </button>
          </div>
        </div>

        {loading ? (
          <div className="py-24 text-center text-gray-300">
            <Loader2 size={28} className="mx-auto mb-3 animate-spin" />
          </div>
        ) : cases.length === 0 ? (
          <div className="py-24 text-center text-gray-300 bg-white rounded-2xl shadow-sm">
            <Inbox size={36} className="mx-auto mb-3" />
            <p className="text-sm">등록된 설치사례가 없습니다.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm divide-y divide-gray-50">
            {cases.map((c) => (
              <div key={c.id} className="flex items-center gap-4 p-4">
                <img src={c.thumbnail_url} alt={c.title} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 truncate">{c.title}</p>
                  <p className="text-xs text-gray-400">{new Date(c.created_at).toLocaleDateString('ko-KR')}</p>
                </div>
                <Link
                  to={`/admin/cases/${c.id}/edit`}
                  className="p-2 text-gray-400 hover:text-gray-700 transition-colors"
                >
                  <Pencil size={16} />
                </Link>
                <button
                  onClick={() => handleDelete(c.id)}
                  disabled={deletingId === c.id}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
