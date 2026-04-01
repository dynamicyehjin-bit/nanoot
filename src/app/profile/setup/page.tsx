'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Camera } from 'lucide-react';
import Image from 'next/image';

export default function ProfileSetupPage() {
  const [nickname, setNickname] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!nickname.trim()) return;

    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }

      let profileImageUrl: string | undefined;
      if (image) {
        const fileExt = image.name.split('.').pop();
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('profile-images')
          .upload(fileName, image);

        if (!uploadError) {
          const { data: { publicUrl } } = supabase.storage
            .from('profile-images')
            .getPublicUrl(fileName);
          profileImageUrl = publicUrl;
        }
      }

      const { error: updateError } = await supabase
        .from('users')
        .update({
          nickname: nickname.trim(),
          ...(profileImageUrl ? { profile_image_url: profileImageUrl } : {}),
        })
        .eq('id', user.id);

      if (updateError) throw updateError;

      // Redirect based on building_id
      const { data: profile } = await supabase
        .from('users')
        .select('building_id')
        .eq('id', user.id)
        .single();

      if (profile?.building_id) {
        router.push('/');
      } else {
        router.push('/building/setup');
      }
    } catch (error) {
      console.error('Error setting up profile:', error);
      alert('프로필 설정 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 px-6 pt-12 pb-10 h-screen bg-white max-w-[440px] mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-2">프로필을 설정해주세요</h1>
        <p className="text-gray-500 text-[15px]">
          나눗에서 사용할 닉네임을 등록해주세요{' '}
          <span className="text-gray-400">(프로필 사진은 선택 사항)</span>
        </p>
      </header>

      <div className="flex-1 flex flex-col">
        {/* Profile Image Upload */}
        <div className="flex justify-center mb-10">
          <div className="relative">
            <label className="block w-28 h-28 rounded-full border-2 border-gray-100 bg-gray-50 overflow-hidden cursor-pointer group relative">
              {previewUrl ? (
                <Image src={previewUrl} alt="프로필 미리보기" fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Camera size={36} className="text-gray-300" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/5 hidden group-hover:block transition-all" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-[#84CC16] rounded-full flex items-center justify-center border-2 border-white pointer-events-none">
              <Camera size={14} className="text-white" />
            </div>
          </div>
        </div>

        {/* Nickname Input */}
        <div className="flex flex-col gap-2 mb-4">
          <label className="text-sm font-bold text-gray-900 px-1">닉네임</label>
          <Input
            placeholder="예: 닉네임/층수 (예: 홍길동/7층) "
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="h-14 rounded-xl border-gray-200 focus:border-black focus:ring-black"
            maxLength={20}
          />
        </div>

        {/* Nickname Tip Box */}
        <div className="rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-gray-700 leading-relaxed">
          <p className="font-semibold mb-1">💡 오픈채팅방 닉네임과 통일을 권장해요!</p>
          <p className="text-gray-500 text-[13px]">
            건물 오픈채팅방에서 입금 확인 시 닉네임으로<br />
            참여자를 확인하기 때문에, 오픈채팅방 닉네임과<br />
            동일하게 설정하면 더 원활한 수령이 가능해요.
          </p>
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={isSubmitting || !nickname.trim()}
        className="w-full h-14 rounded-xl font-bold text-[16px] bg-[#84CC16] text-white hover:bg-[#6aad0d] transition-all"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            처리 중...
          </span>
        ) : (
          '회원가입 완료'
        )}
      </Button>
    </div>
  );
}
