export const dynamic = 'force-dynamic';

import { createClient } from '@/lib/supabase/server';
import { CoBuyingCard } from '@/components/CoBuyingCard';
import { GuestLanding } from '@/components/GuestLanding';
import { cookies } from 'next/headers';
import { BottomNav } from '@/components/BottomNav';

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const cookieStore = await cookies();
  const guestBuildingId = cookieStore.get('guest_building_id')?.value;

  if (!user && !guestBuildingId) {
    return <GuestLanding />;
  }

  // 사용자 정보 더미 (건물 소속 확인용, 게스트의 경우 쿠키 확인)
  let userProfile = { building_id: user ? '1' : guestBuildingId || '1' };

  // Supabase에서 해당 건물의 공동구매 리스트 조회
  const { data: coBuyings } = await supabase
    .from('co_buyings')
    .select('*')
    .eq('building_id', userProfile.building_id)
    .order('created_at', { ascending: false });

  const items = coBuyings || [];

  return (
    <div className="flex flex-col flex-1 pb-20">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md z-10 px-4 py-4 border-b border-gray-100 flex items-center justify-between">
        <h1 className="text-xl font-bold">우리 건물 나눗</h1>
        <button className="w-8 h-8 flex items-center justify-center text-gray-600 bg-gray-100 rounded-full">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </header>

      {/* Tabs */}
      <div className="px-4 py-2 border-b border-gray-100 flex gap-4 text-[15px] font-medium text-gray-500 overflow-x-auto no-scrollbar">
        <button className="text-gray-900 border-b-2 border-gray-900 pb-1 whitespace-nowrap">전체</button>
        <button className="whitespace-nowrap pb-1">식품</button>
        <button className="whitespace-nowrap pb-1">생활용품</button>
        <button className="whitespace-nowrap pb-1">기타</button>
      </div>

      {/* List */}
      <div className="flex-1 bg-white">
        {items.length === 0 ? (
          <div className="h-40 flex items-center justify-center text-gray-400 text-sm">
            진행 중인 공동구매가 없습니다.
          </div>
        ) : (
          items.map(item => (
            <CoBuyingCard
              key={item.id}
              id={item.id}
              buildingId={userProfile?.building_id || '1'}
              title={item.title}
              category={item.category}
              status={item.status}
              totalQuantity={item.total_quantity || 0}
              currentQuantity={item.current_quantity || 0} 
              deadline={item.deadline}
              thumbnailUrl={item.image_url || 'https://images.unsplash.com/photo-1590481845199-3543ebce321f?q=80&w=2670&auto=format&fit=crop'} 
            />
          ))
        )}
      </div>

      {/* Floating Action Button (Write) */}
      <button className="absolute bottom-24 right-4 w-14 h-14 bg-black text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 transition-colors z-30">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

      <BottomNav />
    </div>
  );
}
