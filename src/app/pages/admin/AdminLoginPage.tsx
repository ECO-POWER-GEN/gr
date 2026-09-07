import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Lock, Mail, Loader2 } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

const inputClass = 'w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#053573]/40 focus:border-[#053573] transition-colors text-sm';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
      setSubmitting(false);
      return;
    }

    navigate('/');
  };

  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-gray-50 py-16">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm p-8">
        <h1 className="text-xl font-bold text-center mb-8">관리자 로그인</h1>

        {error && (
          <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Mail size={15} className="text-[#053573]" /> 이메일
            </label>
            <input
              type="email" required value={email}
              onChange={e => setEmail(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Lock size={15} className="text-[#053573]" /> 비밀번호
            </label>
            <input
              type="password" required value={password}
              onChange={e => setPassword(e.target.value)}
              className={inputClass}
            />
          </div>
          <button
            type="submit" disabled={submitting}
            className="w-full border-2 border-[#053573] text-[#053573] hover:bg-[#053573] hover:text-white disabled:opacity-60 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 font-semibold text-sm"
          >
            {submitting ? <Loader2 size={16} className="animate-spin" /> : null}
            {submitting ? '로그인 중...' : '로그인'}
          </button>
        </form>
      </div>
    </section>
  );
}
