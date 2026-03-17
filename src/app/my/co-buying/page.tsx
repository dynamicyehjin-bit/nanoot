import { createClient } from '@/lib/supabase/server';
import { CoBuyingCard } from '@/components/CoBuyingCard';
import { BottomNav } from '@/components/BottomNav';

export default async function MyCoBuyingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return null; // Middlewares handle redirect
  }

  // Get user's participated co-buyings
  const { data: joinerData } = await supabase
    .from('joiners')
    .select(`
      id,
      co_buyings (
        id,
        title,
        category,
        status,
        total_quantity,
        deadline,
        building_id
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  // Map data to expected shape for CoBuyingCard
  // For each cobuying, we need its total current quantity. 
  // This is a bit expensive in a map, usually we join or use a view.
  // For now, let's keep it simple or use the joiner's own quantity as a placeholder if aggregate is missing.
  
  const participatedItems = await Promise.all((joinerData || []).map(async (j: any) => {
    const item = j.co_buyings;
    if (!item) return null;

    // Fetch total current quantity for this specific item
    const { data: allJoiners } = await supabase
      .from('joiners')
      .select('joiner_total_quantity')
      .eq('co_buying_id', item.id);
    
    const currentQuantity = allJoiners?.reduce((sum, join) => sum + join.joiner_total_quantity, 0) || 0;

    return {
      ...item,
      current_quantity: currentQuantity
    };
  }));

  const filteredItems = participatedItems.filter(Boolean);

  return (
    <div className="flex flex-col flex-1 pb-20 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md z-10 px-4 py-4 flex items-center justify-center border-b border-gray-100">
        <h1 className="text-lg font-bold text-gray-900">참여한 공구 목록</h1>
      </header>

      {/* List */}
      <div className="flex-1 bg-white">
        {filteredItems.length === 0 ? (
          <div className="h-40 flex items-center justify-center text-gray-400 text-sm">
            참여한 공구가 없습니다.
          </div>
        ) : (
          filteredItems.map((item: any) => (
            <CoBuyingCard
              key={item.id}
              id={item.id}
              buildingId={item.building_id || '1'}
              href={`/my/co-buying/${item.id}`} // go to detailed participated page
              title={item.title}
              category={item.category}
              status={item.status}
              totalQuantity={item.total_quantity}
              currentQuantity={item.current_quantity}
              deadline={item.deadline}
              thumbnailUrl={'https://images.unsplash.com/photo-1590481845199-3543ebce321f?q=80&w=2670&auto=format&fit=crop'} 
            />
          ))
        )}
      </div>

      <BottomNav />
    </div>
  );
}
