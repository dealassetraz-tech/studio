import { cn } from "@/lib/utils";

export function AssetrazLogo({ className }: { className?: string }) {
    return (
        <div className={cn("bg-primary p-1.5 rounded-md", className)}>
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary-foreground"
            >
                <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 12v5c0 1.66 4 3 10 3s10-1.34 10-3v-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    );
}
