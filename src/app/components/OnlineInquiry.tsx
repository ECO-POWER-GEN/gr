import React, { useState, useEffect } from 'react';
import { Send, ChevronLeft, PenLine, MapPin, Calendar, User, Building2, Phone, Mail, FileText, Inbox, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface InquiryPost {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  address: string;
  dateFrom: string;
  dateTo: string;
  message: string;
  created_at: string;
}

type View = 'list' | 'form' | 'detail';

type FormData = {
  name: string;
  company: string;
  phone: string;
  email: string;
  address: string;
  dateFrom: string;
  dateTo: string;
  message: string;
};

const emptyForm: FormData = {
  name: '', company: '', phone: '', email: '',
  address: '', dateFrom: '', dateTo: '', message: '',
};

const pageHeader = (
  <section className="bg-gradient-to-r from-[#33691E] to-[#8BC34A] py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">온라인 문의</h1>
      <p className="text-lg text-white/80">궁금하신 사항을 남겨주세요. 빠르게 답변해 드립니다.</p>
    </div>
  </section>
);

export default function OnlineInquiry() {
  const [view, setView] = useState<View>('list');
  const [posts, setPosts] = useState<InquiryPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<InquiryPost | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from('Inquiry')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      setError('문의 목록을 불러오는 데 실패했습니다.');
    } else {
      setPosts(data ?? []);
    }
    setLoading(false);
  }

  const handleChange = (field: keyof FormData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const { error } = await supabase.from('Inquiry').insert([form]);

    if (error) {
      setError(`오류: ${error.message} (code: ${error.code})`);
      setSubmitting(false);
      return;
    }

    setForm(emptyForm);
    setSubmitting(false);
    await fetchPosts();
    setView('list');
  };

  const inputClass = 'w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8BC34A]/40 focus:border-[#8BC34A] transition-colors text-sm';
  const labelClass = 'flex items-center gap-2 text-sm font-medium text-gray-700 mb-2';

  /* ── LIST ──────────────────────────────────────────────── */
  if (view === 'list') {
    return (
      <>
        {pageHeader}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-5">
              <p className="text-sm text-gray-600">
                총 <span className="font-semibold text-gray-600">{posts.length}</span>건
              </p>
              <button
                onClick={() => { setError(null); setView('form'); }}
                className="bg-[#8BC34A] hover:bg-[#689F38] text-white px-5 py-2.5 rounded-lg transition-colors flex items-center gap-2 font-medium text-sm"
              >
                <PenLine size={15} />
                문의하기
              </button>
            </div>

            {error && (
              <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
                {error}
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b-2 border-gray-100">
                    <th className="pb-4 text-center w-14 text-xs font-medium text-gray-400 tracking-widest uppercase">No</th>
                    <th className="pb-4 text-left text-xs font-medium text-gray-400 tracking-widest uppercase">현장 주소</th>
                    <th className="pb-4 text-left w-28 text-xs font-medium text-gray-400 tracking-widest uppercase">작성자</th>
                    <th className="pb-4 text-left w-40 text-xs font-medium text-gray-400 tracking-widest uppercase">기간</th>
                    <th className="pb-4 text-center w-24 text-xs font-medium text-gray-400 tracking-widest uppercase">작성날짜</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="py-24 text-center text-gray-300">
                        <Loader2 size={28} className="mx-auto mb-3 animate-spin" />
                        <p className="text-sm">불러오는 중...</p>
                      </td>
                    </tr>
                  ) : posts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-24 text-center text-gray-300">
                        <Inbox size={36} className="mx-auto mb-3" />
                        <p className="text-sm">등록된 문의가 없습니다.</p>
                      </td>
                    </tr>
                  ) : (
                    posts.map((post, index) => (
                      <tr
                        key={post.id}
                        onClick={() => { setSelectedPost(post); setView('detail'); }}
                        className="group hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <td className="py-5 text-center text-sm text-gray-300">{posts.length - index}</td>
                        <td className="py-5 text-sm font-medium text-gray-800 max-w-xs truncate pr-4 group-hover:text-[#689F38] transition-colors">
                          {post.address || '-'}
                        </td>
                        <td className="py-5 text-sm text-gray-500">{post.name}</td>
                        <td className="py-5 text-xs text-gray-400 leading-relaxed">
                          {post.dateFrom} ~ {post.dateTo}
                        </td>
                        <td className="py-5 text-center text-xs text-gray-400">
                          {new Date(post.created_at).toLocaleDateString('ko-KR')}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </>
    );
  }

  /* ── DETAIL ────────────────────────────────────────────── */
  if (view === 'detail' && selectedPost) {
    return (
      <>
        {pageHeader}
        <section className="py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setView('list')}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors"
            >
              <ChevronLeft size={16} /> 목록으로
            </button>

            <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
              <div className="grid grid-cols-2 gap-x-8 gap-y-5 text-sm mb-8">
                <div>
                  <p className="text-gray-400 mb-1">성함</p>
                  <p className="font-medium text-gray-800">{selectedPost.name}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">회사명</p>
                  <p className="font-medium text-gray-800">{selectedPost.company || '-'}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">연락처</p>
                  <p className="font-medium text-gray-800">{selectedPost.phone}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">이메일</p>
                  <p className="font-medium text-gray-800">{selectedPost.email || '-'}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-400 mb-1">현장 주소</p>
                  <p className="font-medium text-gray-800">{selectedPost.address}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-400 mb-1">기간</p>
                  <p className="font-medium text-gray-800">{selectedPost.dateFrom} ~ {selectedPost.dateTo}</p>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-7">
                <p className="text-gray-400 text-sm mb-3">상세 문의 내용</p>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm">{selectedPost.message}</p>
              </div>

              <div className="flex justify-end mt-6">
                <span className="text-xs text-gray-400">
                  등록일: {new Date(selectedPost.created_at).toLocaleDateString('ko-KR')}
                </span>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={() => setView('list')}
                className="border border-gray-300 hover:border-gray-400 text-gray-600 px-8 py-2.5 rounded-lg transition-colors text-sm"
              >
                목록으로
              </button>
            </div>
          </div>
        </section>
      </>
    );
  }

  /* ── FORM ──────────────────────────────────────────────── */
  return (
    <>
      {pageHeader}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setView('list')}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors"
          >
            <ChevronLeft size={16} /> 목록으로
          </button>

          <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
            {error && (
              <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>
                    <User size={15} className="text-[#8BC34A]" />
                    성함 <span className="text-red-400">*</span>
                  </label>
                  <input type="text" required value={form.name}
                    onChange={e => handleChange('name', e.target.value)}
                    placeholder="이름을 입력해 주세요" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>
                    <Building2 size={15} className="text-[#8BC34A]" />
                    회사명
                  </label>
                  <input type="text" value={form.company}
                    onChange={e => handleChange('company', e.target.value)}
                    placeholder="회사명을 입력해 주세요" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>
                    <Phone size={15} className="text-[#8BC34A]" />
                    연락처 <span className="text-red-400">*</span>
                  </label>
                  <input type="tel" required value={form.phone}
                    onChange={e => handleChange('phone', e.target.value)}
                    placeholder="010-0000-0000" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>
                    <Mail size={15} className="text-[#8BC34A]" />
                    이메일
                  </label>
                  <input type="email" value={form.email}
                    onChange={e => handleChange('email', e.target.value)}
                    placeholder="example@email.com" className={inputClass} />
                </div>
              </div>

              <div>
                <label className={labelClass}>
                  <MapPin size={15} className="text-[#8BC34A]" />
                  현장 주소 <span className="text-red-400">*</span>
                </label>
                <input type="text" required value={form.address}
                  onChange={e => handleChange('address', e.target.value)}
                  placeholder="현장 주소를 입력해 주세요" className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>
                  <Calendar size={15} className="text-[#8BC34A]" />
                  기간 <span className="text-red-400">*</span>
                </label>
                <div className="flex items-center gap-3">
                  <input type="date" required value={form.dateFrom}
                    onChange={e => handleChange('dateFrom', e.target.value)}
                    className={`flex-1 ${inputClass}`} />
                  <span className="text-gray-400 text-sm shrink-0">~</span>
                  <input type="date" required min={form.dateFrom} value={form.dateTo}
                    onChange={e => handleChange('dateTo', e.target.value)}
                    className={`flex-1 ${inputClass}`} />
                </div>
              </div>

              <div>
                <label className={labelClass}>
                  <FileText size={15} className="text-[#8BC34A]" />
                  상세 문의 내용 <span className="text-red-400">*</span>
                </label>
                <textarea required rows={6} value={form.message}
                  onChange={e => handleChange('message', e.target.value)}
                  placeholder={"문의하실 내용을 자세히 입력해 주세요\n(필요한 전력 용량, 사용 기간, 현장 특이사항 등)"}
                  className={`${inputClass} resize-none`} />
              </div>

              <p className="text-xs text-gray-400">
                <span className="text-red-400">*</span> 표시는 필수 입력 항목입니다.
              </p>

              <button type="submit" disabled={submitting}
                className="w-full bg-[#8BC34A] hover:bg-[#689F38] disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 rounded-lg transition-colors flex items-center justify-center gap-3 font-semibold text-base">
                {submitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                {submitting ? '제출 중...' : '문의 보내기'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
