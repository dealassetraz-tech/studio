import { cn } from "@/lib/utils";

export function AssetrazLogo({ className, isDark }: { className?: string, isDark?: boolean }) {
    return (
        <div className={cn(
            "p-1.5 rounded-md",
            isDark ? "bg-foreground" : "bg-primary",
            className
        )}>
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={cn(isDark ? "text-background" : "text-primary-foreground")}
            >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                <polyline points="9 22 9 12 15 12 15 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></polyline>
            </svg>
        </div>
    );
}
