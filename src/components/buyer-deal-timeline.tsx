
'use client';

import { cn } from "@/lib/utils";
import { Check, Circle, Search, FileText, Handshake, KeyRound } from "lucide-react";

export type BuyerDealStatus = 
  | 'Offer Made'
  | 'Offer Accepted'
  | 'Due Diligence'
  | 'Deal Closed';

const timelineSteps: {step: BuyerDealStatus, icon: React.ReactNode}[] = [
  { step: 'Offer Made', icon: <Handshake className="w-5 h-5" /> },
  { step: 'Offer Accepted', icon: <FileText className="w-5 h-5" /> },
  { step: 'Due diligence', icon: <Search className="w-5 h-5" /> },
  { step: 'Deal Closed', icon: <KeyRound className="w-5 h-5" /> },
];

interface BuyerDealTimelineProps {
  currentStatus: BuyerDealStatus;
}

export function BuyerDealTimeline({ currentStatus }: BuyerDealTimelineProps) {
  const currentIndex = timelineSteps.findIndex(s => s.step === currentStatus);

  return (
    <div className="w-full">
      <div className="relative flex items-center justify-between">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-border" />
        <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-primary transition-all duration-500"
            style={{ width: `${(currentIndex / (timelineSteps.length - 1)) * 100}%` }}
        />
        {timelineSteps.map(({step, icon}, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isFuture = index > currentIndex;

          return (
            <div key={step} className="relative z-10 flex flex-col items-center">
              <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-white border-2 transition-all duration-300",
                  isCompleted && "bg-primary border-primary",
                  isCurrent && "bg-primary border-primary ring-4 ring-primary/30",
                  isFuture && "bg-background border-border"
              )}>
                  {isCompleted ? <Check className="w-5 h-5" /> : icon }
              </div>
              <p className={cn(
                  "mt-2 text-xs md:text-sm text-center absolute top-full",
                  isCurrent ? "font-bold text-primary" : "text-muted-foreground"
              )}>
                {step}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
