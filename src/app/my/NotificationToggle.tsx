'use client';

import { useState } from 'react';
import { Settings } from 'lucide-react';
import { Switch } from '@/components/ui/Switch';

export function NotificationToggle() {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="flex justify-between items-center p-5 border-b border-gray-50 hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3 text-gray-800">
        <span className="text-gray-500">
          <Settings size={20} />
        </span>
        <span className="text-[16px] font-medium">알림 설정</span>
      </div>
      <Switch checked={enabled} onCheckedChange={setEnabled} />
    </div>
  );
}
