import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Loader2, Inbox, Plus } from 'lucide-react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabase';
import CaseCard from '../components/CaseCard';
import PageBanner from '../components/PageBanner';

interface CaseStudy {
  id: string;
  title: string;
  thumbnail_url: string;
}

export default function CasesPage() {
  const [cases, setCases] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('case_study')
        .select('id, title, thumbnail_url')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Failed to load case studies:', error);
        setError('설치사례를 불러오는 데 실패했습니다.');
      } else {
        setCases(data ?? []);
      }
      setLoading(false);
    })();

    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <>
      <PageBanner title="설치사례" subtitle="Eco Power Gen이 함께한 현장을 소개합니다." />

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {session && (
            <div className="flex justify-end mb-6">
              <Link
                to="/admin/cases/new"
                className="border-2 border-[#053573] text-[#053573] hover:bg-[#053573] hover:text-white px-5 py-2.5 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
              >
                <Plus size={16} /> 등록하기
              </Link>
            </div>
          )}

          {error && (
            <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
              {error}
            </div>
          )}

          {loading ? (
            <div className="py-24 text-center text-gray-300">
              <Loader2 size={28} className="mx-auto mb-3 animate-spin" />
              <p className="text-sm">불러오는 중...</p>
            </div>
          ) : cases.length === 0 ? (
            <div className="py-24 text-center text-gray-300">
              <Inbox size={36} className="mx-auto mb-3" />
              <p className="text-sm">등록된 설치사례가 없습니다.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10">
              {cases.map((c) => (
                <CaseCard key={c.id} id={c.id} title={c.title} thumbnailUrl={c.thumbnail_url} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
