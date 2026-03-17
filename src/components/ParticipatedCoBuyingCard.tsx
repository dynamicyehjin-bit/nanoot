'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { CoBuyingTimeline } from '@/components/common/CoBuyingTimeline';

export interface ParticipatedCoBuyingCardProps {
  id: string;
  title: string;
  status: 'RECRUITING' | 'PAYMENT_WAITING' | 'ORDER_IN_PROGRESS' | 'READY_FOR_PICKUP' | 'COMPLETED' | 'CANCELLED' | 'RECRUITING_FAILED';
  thumbnailUrl?: string;
  myQuantity: number;
  myTotalPay: number;
  remainingQuantity?: number;
}

const statusConfig: Record<string, { label: string; description: string; colorClass: string }> = {
  RECRUITING: { 
    label: '모집중', 
    description: '다른 신청자들을 모집하고 있어요. 모집 완료까지 수량이 조금 남았어요!', 
    colorClass: 'bg-[#84CC16]/10 text-[#84CC16]' 
  },
  PAYMENT_WAITING: { 
    label: '결제대기', 
    description: '입금 기한 내 입금을 완료해주세요', 
    colorClass: 'bg-yellow-100 text-yellow-700' 
  },
  ORDER_IN_PROGRESS: { 
    label: '주문진행', 
    description: '주문이 진행 중이에요', 
    colorClass: 'bg-blue-100 text-blue-700' 
  },
  READY_FOR_PICKUP: { 
    label: '픽업대기', 
    description: '물건이 도착했어요! 수령 장소를 확인하세요', 
    colorClass: 'bg-purple-100 text-purple-700' 
  },
  COMPLETED: { 
    label: '완료됨', 
    description: '공구가 완료됐어요', 
    colorClass: 'bg-gray-100 text-gray-600' 
  },
  CANCELLED: { 
    label: '취소됨', 
    description: '공구가 취소됐어요', 
    colorClass: 'bg-red-100 text-red-700' 
  },
  RECRUITING_FAILED: { 
    label: '모집실패', 
    description: '공구가 취소됐어요', 
    colorClass: 'bg-red-100 text-red-700' 
  },
};

export function ParticipatedCoBuyingCard({
  id,
  title,
  status,
  thumbnailUrl,
  myQuantity,
  myTotalPay,
  remainingQuantity,
}: ParticipatedCoBuyingCardProps) {
  const config = statusConfig[status] || { label: status, description: '', colorClass: 'bg-gray-100 text-gray-700' };
  
  // Custom description for RECRUITING if remainingQuantity provided
  const description = (status === 'RECRUITING' && remainingQuantity !== undefined)
    ? `다른 신청자들을 모집하고 있어요. 모집 완료까지 남은 수량 ${remainingQuantity}개 남았어요!`
    : config.description;

  return (
    <div className="bg-white border-b border-gray-100 p-5 flex flex-col">
      <div className="flex gap-4">
        {/* Thumbnail */}
        <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0 flex items-center justify-center">
          {thumbnailUrl ? (
            <img src={thumbnailUrl} alt={title} className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-400 text-xs text-center">No Image</span>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col flex-1 gap-1">
          <div className="flex justify-between items-start">
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${config.colorClass}`}>
              {config.label}
            </span>
          </div>
          <h3 className="font-bold text-[15px] leading-tight text-gray-900 line-clamp-2">
            {title}
          </h3>
        </div>
      </div>

      {/* Timeline */}
      <div className="mt-2 px-1">
        <CoBuyingTimeline status={status} />
      </div>

      {/* Status Guide Text */}
      <p className={`text-[12px] leading-normal font-medium mb-4 ${
        status === 'RECRUITING_FAILED' || status === 'CANCELLED' ? 'text-red-500' : 'text-[#84CC16]'
      }`}>
        {description}
      </p>

      <div className="bg-gray-50 rounded-lg p-3 flex justify-between items-center">
        <div className="flex flex-col gap-0.5">
           <span className="text-[11px] text-gray-400 font-medium">내 신청 내역</span>
           <span className="text-[13px] font-bold text-gray-700">
             {myQuantity}개 / ₩{myTotalPay.toLocaleString()}
           </span>
        </div>
        <Link href={`/my/co-buying/${id}`}>
           <Button variant="outline" size="sm" className="h-8 text-[12px] font-bold border-gray-200 text-gray-600 bg-white hover:bg-gray-50">
             자세히 보기
           </Button>
        </Link>
      </div>
    </div>
  );
}

