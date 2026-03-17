'use client';

import { Check } from 'lucide-react';

interface CoBuyingTimelineProps {
  status: string;
}

const STAGES = [
  { id: 1, label: '모집중', statuses: ['RECRUITING'] },
  { id: 2, label: '입금중', statuses: ['PAYMENT_WAITING'] },
  { id: 3, label: '주문중', statuses: ['ORDER_IN_PROGRESS'] },
  { id: 4, label: '나눔중', statuses: ['READY_FOR_PICKUP'] },
  { id: 5, label: '완료', statuses: ['COMPLETED'] },
];

export function CoBuyingTimeline({ status }: CoBuyingTimelineProps) {
  const isFailed = status === 'RECRUITING_FAILED' || status === 'CANCELLED';
  
  // Find current stage index
  const currentStageIndex = isFailed ? -1 : STAGES.findIndex(stage => stage.statuses.includes(status));
  
  return (
    <div className="w-full py-4">
      <div className="relative flex items-center justify-between">
        {/* Connector Lines */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-gray-200" />
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-[#84CC16] transition-all duration-500"
          style={{ width: `${currentStageIndex >= 0 ? (currentStageIndex / (STAGES.length - 1)) * 100 : 0}%` }}
        />

        {/* Stages */}
        {STAGES.map((stage, index) => {
          const isCompleted = !isFailed && index < currentStageIndex;
          const isCurrent = !isFailed && index === currentStageIndex;

          return (
            <div key={stage.id} className="relative z-10 flex flex-col items-center">
              {/* Circle */}
              <div 
                className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${
                  isCompleted || isCurrent 
                    ? 'bg-[#84CC16] border-[#84CC16]' 
                    : 'bg-white border-gray-200'
                }`}
              >
                {(isCompleted || isCurrent) && (
                  <Check size={14} className="text-white stroke-[3px]" />
                )}
              </div>
              
              {/* Label */}
              <span className={`absolute top-8 whitespace-nowrap text-[11px] transition-colors duration-300 ${
                isCurrent 
                  ? 'text-[#84CC16] font-bold' 
                  : 'text-gray-400 font-medium'
              }`}>
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>
      {/* Spacer for labels */}
      <div className="h-8" />
    </div>
  );
}
