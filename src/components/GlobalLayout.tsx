'use client';

import { usePathname } from 'next/navigation';
import { BottomNav } from '@/components/BottomNav';

const NO_NAV_PATHS = ['/login', '/signup', '/building', '/auth'];

export function GlobalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showNav = !NO_NAV_PATHS.some(p => pathname.startsWith(p));

  return (
    <>
      <div className={`flex flex-col flex-1 ${showNav ? 'pb-16' : ''}`}>
        {children}
      </div>
      {showNav && <BottomNav />}
    </>
  );
}
