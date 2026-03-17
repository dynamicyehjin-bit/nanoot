import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Check if user is admin again (double check in server component)
  const { data: userData } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single();

  if (userData?.role !== 'ADMIN') {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-8">
      <div className="max-w-4xl mx-auto w-full">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Admin Dashboard</h1>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
              MASTER ADMIN
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="text-sm text-gray-500 mb-1">Total Users</div>
            <div className="text-2xl font-bold text-gray-900">1,284</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="text-sm text-gray-500 mb-1">Active Co-buyings</div>
            <div className="text-2xl font-bold text-gray-900">42</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="text-sm text-gray-500 mb-1">Pending Settlements</div>
            <div className="text-2xl font-bold text-gray-900">12</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <h2 className="font-semibold text-gray-900">Admin Control Panel</h2>
          </div>
          <div className="p-6">
            <p className="text-gray-600 mb-6">Welcome, {user.email}. This area is restricted to administrators.</p>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors">
                Manage User Access
              </button>
              <button className="p-4 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                System Logs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
