import Image from 'next/image';
import Link from 'next/link';
import { getCategoryEmoji } from '@/lib/categories';

export interface CoBuyingCardProps {
  id: string;
  title: string;
  category: string;
  status: 'RECRUITING' | 'PAYMENT_WAITING' | 'ORDER_IN_PROGRESS' | 'READY_FOR_PICKUP' | 'COMPLETED' | 'CANCELLED' | 'RECRUITING_FAILED' | string;
  totalQuantity: number;
  currentQuantity: number;
  deadline: string;
  thumbnailUrl?: string;
  buildingId?: string;
  href?: string;
  totalPrice: number;
}

export function CoBuyingCard({
  id,
  title,
  category,
  status,
  totalQuantity,
  currentQuantity,
  deadline,
  thumbnailUrl,
  buildingId = '1',
  href,
  totalPrice,
}: CoBuyingCardProps) {
  // 모집중: RECRUITING + deadline 안 지남 / 그 외 전부: 모집 마감
  const isExpired = new Date(deadline).getTime() - new Date().getTime() < 0;
  const isRecruiting = status === 'RECRUITING' && !isExpired;
  const badgeLabel = isRecruiting ? '모집중' : '모집 마감';
  const badgeClass = isRecruiting
    ? 'bg-green-100 text-green-700'
    : 'bg-gray-200 text-gray-500';

  const linkHref = href || `/${buildingId}/co-buying/${id}`;
  
  return (
    <Link href={linkHref} className="block">
      <div className="flex gap-4 p-4 border-b border-gray-100 bg-white hover:bg-gray-50 transition-colors">
        {/* Thumbnail */}
        <div className="w-24 h-24 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0 flex items-center justify-center relative">
          {thumbnailUrl ? (
            <Image src={thumbnailUrl} alt={title} width={96} height={96} className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-400 text-sm">No Image</span>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 justify-between py-0.5">
          <div>
            <div className="flex justify-between items-start mb-1">
              <span className="text-[11px] text-gray-500 flex items-center gap-1">
                <span>{getCategoryEmoji(category)}</span>
                {category || '기타'}
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${badgeClass}`}>
                {badgeLabel}
              </span>
            </div>
            <h3 className="font-semibold text-[15px] leading-snug line-clamp-2 text-gray-900">
              {title}
            </h3>
            <div className="mt-1 text-[13px] text-gray-900 font-bold">
              {totalQuantity > 0 ? Math.round(totalPrice / totalQuantity).toLocaleString() : 0}원 <span className="text-gray-400 font-normal ml-0.5">개당</span>
            </div>
          </div>
          
          <div className="flex justify-between items-end mt-2">
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-blue-600 font-semibold">{currentQuantity}개 신청</span>
              <span className="text-gray-400">/</span>
              <span className="text-gray-500">{totalQuantity}개 목표</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
