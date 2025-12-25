
'use client';

import { cn } from "@/lib/utils";
import { CheckCircle, Circle, Loader } from "lucide-react";

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
    <div className="flex items-center justify-between w-full text-sm">
      {timelineSteps.map((step, index) => {
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;
        const isFuture = index > currentIndex;
        
        return (
          <div key={step} className="flex flex-col items-center text-center flex-1 relative">
            <div className="flex items-center w-full">
                {/* Connector line */}
                {index > 0 && (
                    <div className={cn(
                        "flex-1 h-0.5",
                        isCompleted || isCurrent ? "bg-primary" : "bg-border"
                    )} />
                )}

                {/* Step Icon */}
                <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-white",
                    isCompleted && "bg-primary",
                    isCurrent && "bg-primary ring-4 ring-primary/30",
                    isFuture && "bg-muted border-2 border-border"
                )}>
                    {isCompleted && <CheckCircle className="w-5 h-5" />}
                    {isCurrent && <Loader className="w-5 h-5 animate-spin" />}
                    {isFuture && <Circle className="w-5 h-5 text-muted-foreground" />}
                </div>

                {index < timelineSteps.length -1 && (
                     <div className={cn(
                        "flex-1 h-0.5",
                        isCompleted ? "bg-primary" : "bg-border"
                    )} />
                )}
            </div>

            {/* Step Label */}
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
  );
}
