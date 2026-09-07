import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ImagePlus, X, Loader2 } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

const inputClass = 'w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#053573]/40 focus:border-[#053573] transition-colors text-sm';
const labelClass = 'flex items-center gap-2 text-sm font-medium text-gray-700 mb-2';

interface PendingImage {
  id: string;
  file: File;
  previewUrl: string;
}

export default function AdminCaseFormPage() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<PendingImage[]>([]);
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      const { data, error } = await supabase
        .from('case_study')
        .select('title, content, images')
        .eq('id', id)
        .single();

      if (error || !data) {
        setError('게시글을 불러오지 못했습니다.');
      } else {
        setTitle(data.title);
        setContent(data.content);
        setExistingImages(data.images ?? []);
      }
      setLoading(false);
    })();
  }, [id, isEdit]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const added = Array.from(e.target.files).map((file) => ({
        id: crypto.randomUUID(),
        file,
        previewUrl: URL.createObjectURL(file),
      }));
      setNewImages(prev => [...prev, ...added]);
    }
    e.target.value = '';
  };

  const removeExistingImage = (url: string) => {
    setExistingImages(prev => prev.filter(u => u !== url));
  };

  const removeNewImage = (imageId: string) => {
    setNewImages(prev => {
      const target = prev.find(img => img.id === imageId);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter(img => img.id !== imageId);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (existingImages.length + newImages.length === 0) {
      setError('사진을 최소 1장 이상 등록해 주세요.');
      return;
    }

    setSubmitting(true);

    const uploadedUrls: string[] = [];
    for (const { file } of newImages) {
      const path = `${crypto.randomUUID()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('case-images')
        .upload(path, file);

      if (uploadError) {
        console.error('Image upload failed:', uploadError);
        setError(`사진 업로드 중 오류가 발생했습니다: ${uploadError.message}`);
        setSubmitting(false);
        return;
      }

      const { data } = supabase.storage.from('case-images').getPublicUrl(path);
      uploadedUrls.push(data.publicUrl);
    }

    const images = [...existingImages, ...uploadedUrls];
    const payload = {
      title,
      content,
      images,
      thumbnail_url: images[0],
    };

    const { error: saveError } = isEdit
      ? await supabase.from('case_study').update(payload).eq('id', id)
      : await supabase.from('case_study').insert([payload]);

    if (saveError) {
      console.error('Failed to save case study:', saveError);
      setError('저장 중 오류가 발생했습니다.');
      setSubmitting(false);
      return;
    }

    navigate('/cases');
  };

  if (loading) {
    return (
      <div className="py-32 text-center text-gray-300">
        <Loader2 size={28} className="mx-auto animate-spin" />
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-50 min-h-[70vh]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-8">{isEdit ? '설치사례 수정' : '새 설치사례 작성'}</h1>

        <div className="bg-white rounded-2xl shadow-sm p-8">
          {error && (
            <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className={labelClass}>제목 <span className="text-red-400">*</span></label>
              <input
                type="text" required value={title}
                onChange={e => setTitle(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>본문 <span className="text-red-400">*</span></label>
              <textarea
                required rows={8} value={content}
                onChange={e => setContent(e.target.value)}
                className={`${inputClass} resize-none`}
              />
            </div>

            <div>
              <label className={labelClass}>사진 <span className="text-red-400">*</span></label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-3">
                {existingImages.map((url) => (
                  <div key={url} className="relative aspect-square rounded-lg overflow-hidden group">
                    <img src={url} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(url)}
                      className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
                {newImages.map((img) => (
                  <div key={img.id} className="relative aspect-square rounded-lg overflow-hidden group">
                    <img src={img.previewUrl} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeNewImage(img.id)}
                      className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
                <label className="aspect-square rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:border-[#8BC34A] transition-colors">
                  <ImagePlus size={24} className="text-gray-300" />
                  <input type="file" accept="image/*" multiple className="hidden" onChange={handleFileChange} />
                </label>
              </div>
              <p className="text-xs text-gray-400">첫 번째 사진이 목록에 보이는 썸네일로 사용됩니다.</p>
            </div>

            <button
              type="submit" disabled={submitting}
              className="w-full border-2 border-[#053573] text-[#053573] hover:bg-[#053573] hover:text-white disabled:opacity-60 py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2 font-semibold text-sm"
            >
              {submitting ? <Loader2 size={16} className="animate-spin" /> : null}
              {submitting ? '저장 중...' : isEdit ? '수정하기' : '등록하기'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
