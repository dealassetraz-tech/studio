"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail, Menu } from "lucide-react";
import { AssetrazLogo } from "./assetraz-logo";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/login", label: "Verify Property" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/analytics", label: "Analytics" },
  { href: "/api", label: "API" },
  { href: "/contact", label: "Contact", icon: <Mail className="h-4 w-4" /> },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-background shadow-sm sticky top-0 z-50">
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
            {navLinks.map((link) => (
               <Link key={link.href} href={link.href} className="flex items-center gap-1 text-foreground hover:text-primary transition-colors">
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
             <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" asChild>
                    <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                    <Link href="/signup">Sign Up</Link>
                </Button>
            </div>
             <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <Link href="/" className="flex items-center gap-2 mb-4" onClick={() => setIsMenuOpen(false)}>
                    <AssetrazLogo className="h-8 w-8 text-primary" />
                    <div>
                      <span className="text-xl font-bold">ASSETRAZ</span>
                    </div>
                  </Link>
                </SheetHeader>
                 <nav className="flex flex-col gap-4 text-lg font-medium">
                    {navLinks.map((link) => (
                      <Link key={link.href} href={link.href} className="flex items-center gap-2 text-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                        {link.icon}
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                  <div className="flex items-center gap-2 mt-6">
                    <Button variant="ghost" asChild className="w-full">
                        <Link href="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                    </Button>
                    <Button asChild className="w-full">
                        <Link href="/signup" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                    </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
