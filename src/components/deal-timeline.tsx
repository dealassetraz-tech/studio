
'use client';

import { cn } from "@/lib/utils";
import { Check, Sparkles } from "lucide-react";

export type DealStatus = 
  | 'Property Posted'
  | 'Broker Assigned'
  | 'Got Buyer'
  | 'Deal Closure Approval'
  | 'Approval Granted'
  | 'Deal Closed';

const timelineSteps: {step: DealStatus, icon: React.ReactNode}[] = [
  { step: 'Property Posted', icon: <Check className="w-5 h-5" /> },
  { step: 'Broker Assigned', icon: <Check className="w-5 h-5" /> },
  { step: 'Got Buyer', icon: <Check className="w-5 h-5" /> },
  { step: 'Deal Closure Approval', icon: <Check className="w-5 h-5" /> },
  { step: 'Approval Granted', icon: <Sparkles className="w-5 h-5" /> },
  { step: 'Deal Closed', icon: <Check className="w-5 h-5" /> },
];

interface DealTimelineProps {
  currentStatus: DealStatus;
}

export function DealTimeline({ currentStatus }: DealTimelineProps) {
  const currentIndex = timelineSteps.findIndex(s => s.step === currentStatus);

  return (
    <div className="w-full pt-4">
        <div className="relative flex justify-between items-start">
            <div className="absolute left-0 top-4 -translate-y-1/2 w-full h-0.5 bg-border" />
            <div 
                className="absolute left-0 top-4 -translate-y-1/2 h-0.5 bg-primary transition-all duration-500"
                style={{ width: `${(currentIndex / (timelineSteps.length - 1)) * 100}%` }}
            />
            {timelineSteps.map(({step, icon}, index) => {
                const isCompleted = index < currentIndex;
                const isCurrent = index === currentIndex;
                const isFuture = index > currentIndex;

                return (
                    <div key={step} className="relative z-10 flex flex-col items-center text-center px-2">
                        <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                            isCompleted && "bg-primary border-primary text-primary-foreground",
                            isCurrent && "bg-primary border-primary ring-4 ring-primary/30 text-primary-foreground",
                            isFuture && "bg-background border-border text-muted-foreground"
                        )}>
                             {isCompleted ? <Check className="w-5 h-5" /> : icon }
                        </div>
                        <p className={cn(
                            "mt-2 text-xs md:text-sm",
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
