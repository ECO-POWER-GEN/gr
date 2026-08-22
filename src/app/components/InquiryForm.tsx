import React, { useState } from 'react';
import { Send, MapPin, Calendar, User, Building2, Phone, Mail, FileText, Loader2, CheckCircle2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

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

const inputClass = 'w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8BC34A]/40 focus:border-[#8BC34A] transition-colors text-sm';
const labelClass = 'flex items-center gap-2 text-sm font-medium text-gray-700 mb-2';

export default function InquiryForm() {
  const [form, setForm] = useState<FormData>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof FormData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const { error } = await supabase.from('Inquiry').insert([form]);

    if (error) {
      console.error('Inquiry submit failed:', error);
      setError('문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
      setSubmitting(false);
      return;
    }

    setForm(emptyForm);
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 text-center">
        <div className="w-16 h-16 bg-[#8BC34A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="text-[#8BC34A]" size={32} />
        </div>
        <h2 className="text-2xl font-bold mb-3">문의가 접수되었습니다</h2>
        <p className="text-gray-500 mb-8">빠른 시일 내에 담당자가 연락드리겠습니다.</p>
        <button
          onClick={() => setSubmitted(false)}
          className="border border-gray-300 hover:border-gray-400 text-gray-600 px-8 py-2.5 rounded-lg transition-colors text-sm"
        >
          추가 문의하기
        </button>
      </div>
    );
  }

  return (
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
  );
}
