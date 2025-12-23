"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DealLockLogo } from "./deallock-logo";

const navLinks = [
  { href: "#how-it-works", label: "How it Works" },
  { href: "#features", label: "Features" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const href = e.currentTarget.href;
    const targetId = href.replace(/.*#/, "");
    const elem = document.getElementById(targetId);
    elem?.scrollIntoView({
      behavior: "smooth",
    });
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-background/95 backdrop-blur-sm sticky top-0 z-50 border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2.5">
              <DealLockLogo />
              <span className="text-xl font-bold text-foreground">DealLock</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-foreground">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-primary transition-colors" onClick={handleScroll}>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Sign In
            </Link>
            <Button asChild>
                <Link href="#">Get Started</Link>
            </Button>
          </div>
          <div className="flex items-center gap-4 md:hidden">
             <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background text-foreground">
                 <div className="p-4">
                    <Link href="/" className="flex items-center gap-2.5 mb-8" onClick={() => setIsMenuOpen(false)}>
                        <DealLockLogo />
                        <span className="text-xl font-bold text-foreground">DealLock</span>
                    </Link>
                    <nav className="flex flex-col gap-4 text-lg font-medium">
                        {navLinks.map((link) => (
                          <Link key={link.href} href={link.href} className="flex items-center gap-2 hover:text-primary transition-colors" onClick={handleScroll}>
                            {link.label}
                          </Link>
                        ))}
                         <hr className="my-2 border-border"/>
                         <Link href="#" className="flex items-center gap-2 hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                            Sign In
                         </Link>
                        <Button asChild>
                            <Link href="#" onClick={() => setIsMenuOpen(false)}>Get Started</Link>
                        </Button>
                    </nav>
                 </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}