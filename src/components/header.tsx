import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mail } from "lucide-react";
import { AssetrazLogo } from "./assetraz-logo";

export function Header() {
  return (
    <header className="bg-background shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <AssetrazLogo className="h-8 w-8 text-primary" />
              <div>
                <span className="text-xl font-bold">ASSETRAZ</span>
                <p className="text-xs text-muted-foreground">Global Property Verification Platform</p>
              </div>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="#" className="text-foreground hover:text-primary">How It Works</Link>
            <Link href="#" className="text-foreground hover:text-primary">Verify Property</Link>
            <Link href="#" className="text-foreground hover:text-primary">Dashboard</Link>
            <Link href="#" className="text-foreground hover:text-primary">Analytics</Link>
            <Link href="#" className="text-foreground hover:text-primary">API</Link>
            <Link href="#" className="flex items-center gap-1 text-foreground hover:text-primary">
              <Mail className="h-4 w-4" />
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2">
               <Avatar className="h-8 w-8">
                 <AvatarFallback className="bg-primary text-primary-foreground">D</AvatarFallback>
               </Avatar>
               <span className="text-sm font-medium hidden sm:inline">Admin User</span>
             </div>
             <Button className="md:hidden" variant="ghost" size="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
             </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
