'use client';

import { usePathname } from 'next/navigation';
import { GNB } from '@/components/GNB';

const NO_GNB_PATHS = ['/login', '/signup', '/building', '/auth'];

export function GNBWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showGNB = !NO_GNB_PATHS.some(p => pathname.startsWith(p));

  return (
    <>
      <div className={`flex flex-col flex-1 ${showGNB ? 'pb-16' : ''}`}>
        {children}
      </div>
      {showGNB && <GNB />}
    </>
  );
}
