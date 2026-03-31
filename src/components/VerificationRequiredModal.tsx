'use client';

import { Button } from '@/components/ui/Button';
import { X, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface VerificationRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  buildingId: string;
  buildingName?: string;
}

export function VerificationRequiredModal({ 
  isOpen, 
  onClose, 
  buildingId,
  buildingName = '이 건물'
}: VerificationRequiredModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleVerify = () => {
    router.push(`/building/verify?id=${buildingId}`);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex flex-col justify-end bg-black/60 backdrop-blur-[2px] animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-[440px] mx-auto bg-white rounded-t-[32px] p-8 shadow-2xl relative overflow-hidden animate-in slide-in-from-bottom duration-300 ease-out"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle for Bottom Sheet */}
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />

        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
            <ShieldCheck size={40} className="text-[#22C55E]" />
          </div>

          <h3 className="text-[22px] font-bold text-gray-900 mb-2 leading-tight">
            건물 인증이 필요해요
          </h3>
          
          <p className="text-gray-500 text-[15px] leading-relaxed mb-10 px-4">
            <strong>{buildingName}</strong> 이웃들과 <br />
            공구에 참여하시려면 거주 인증이 필수입니다. <br />
          </p>

          <div className="flex flex-col gap-3 w-full pb-safe">
            <Button 
              onClick={handleVerify}
              className="w-full h-15 bg-[#C1EB3B] text-gray-900 hover:bg-[#A3CE2A] border-none font-bold text-[16px] rounded-2xl flex items-center justify-center"
            >
              인증하러 가기
            </Button>
            
            <button 
              onClick={onClose}
              className="w-full h-12 text-[15px] text-gray-400 font-medium hover:text-gray-600 transition-colors"
            >
              나중에 하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
