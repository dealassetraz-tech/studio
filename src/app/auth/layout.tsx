import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DealLockLogo } from "@/components/deallock-logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <header className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2.5 text-lg font-semibold">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
          <Link href="/" className="flex items-center gap-2.5">
            <DealLockLogo />
            <span className="text-xl font-bold text-foreground">DealLock</span>
          </Link>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center">
        {children}
      </main>
    </div>
  );
}
