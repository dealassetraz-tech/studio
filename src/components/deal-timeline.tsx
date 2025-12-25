
'use client';

import { cn } from "@/lib/utils";
import { Check, Circle, Sparkles } from "lucide-react";

export type DealStatus = 
  | 'Property Posted'
  | 'Broker Assigned'
  | 'Got Buyer'
  | 'Deal Closure Approval'
  | 'Approval Granted'
  | 'Deal Closed';

const timelineSteps: DealStatus[] = [
  'Property Posted',
  'Broker Assigned',
  'Got Buyer',
  'Deal Closure Approval',
  'Approval Granted',
  'Deal Closed',
];

interface DealTimelineProps {
  currentStatus: DealStatus;
}

export function DealTimeline({ currentStatus }: DealTimelineProps) {
  const currentIndex = timelineSteps.indexOf(currentStatus);

  return (
    <div className="w-full">
      <div className="relative flex items-center justify-between">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-border" />
        <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-primary transition-all duration-500"
            style={{ width: `${(currentIndex / (timelineSteps.length - 1)) * 100}%` }}
        />
        {timelineSteps.map((step, index) => {
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
                  {isCompleted && <Check className="w-5 h-5" />}
                  {isCurrent && (currentStatus === 'Approval Granted' ? <Sparkles className="w-5 h-5 animate-pulse" /> : <Check className="w-5 h-5" />) }
                  {isFuture && <Circle className="w-3 h-3 text-border fill-current" />}
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
