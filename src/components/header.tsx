"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DealLockLogo } from "./deallock-logo";

const navLinks = [
  { href: "#", label: "Sign In" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-background/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2.5">
              <DealLockLogo />
              <span className="text-xl font-bold text-foreground">DealLock</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-foreground">
            <Link href="#" className="flex items-center gap-1 hover:text-primary transition-colors">
              Sign In
            </Link>
            <Button asChild>
                <Link href="#">Get Started</Link>
            </Button>
          </nav>
          <div className="flex items-center gap-4 md:hidden">
             <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background text-foreground">
                 <nav className="flex flex-col gap-4 text-lg font-medium mt-8">
                    {navLinks.map((link) => (
                      <Link key={link.href} href={link.href} className="flex items-center gap-2 hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                        {link.label}
                      </Link>
                    ))}
                    <Button asChild>
                        <Link href="#" onClick={() => setIsMenuOpen(false)}>Get Started</Link>
                    </Button>
                  </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
