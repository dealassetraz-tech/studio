import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";

export function DealLockLogo({ className }: { className?: string }) {
    return (
        <div className={cn(
            "p-2 rounded-md bg-primary text-primary-foreground",
            className
        )}>
            <Lock className="w-5 h-5" />
        </div>
    );
}
