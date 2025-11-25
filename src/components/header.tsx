"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Menu, X } from "lucide-react";
import { AssetrazLogo } from "./assetraz-logo";
import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/verify", label: "Verify Property" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/analytics", label: "Analytics" },
  { href: "/contact", label: "Contact", icon: <Mail className="h-4 w-4" /> },
];

const loggedOutNavLinks = [
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/contact", label: "Contact", icon: <Mail className="h-4 w-4" /> },
  { href: "/login", label: "Login" },
  { href: "/signup", label: "Sign Up" },
];


export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; initial: string } | null>(null);

  // Simulate authentication check
  useEffect(() => {
    // In a real app, you'd check for a token, session, etc.
    // For now, we'll set it to false by default.
    const loggedIn = false; 
    setIsLoggedIn(loggedIn);
    if (loggedIn) {
      // In a real app, you'd fetch user data from your backend
      // For example: setUser({ name: "Jane Doe", initial: "J" });
      setUser({ name: "Jane Doe", initial: "J" });
    }
  }, []);

  const currentNavLinks = isLoggedIn ? navLinks : [
    { href: "/#how-it-works", label: "How It Works" },
    { href: "/contact", label: "Contact" },
  ];
  
  const mobileNavLinks = isLoggedIn ? navLinks : loggedOutNavLinks;


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
            {currentNavLinks.map((link) => (
               <Link key={link.href} href={link.href} className="flex items-center gap-1 text-foreground hover:text-primary transition-colors">
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
             {isLoggedIn && user ? (
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">{user.initial}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium hidden sm:inline">{user.name}</span>
                </div>
             ) : (
                <div className="hidden md:flex items-center gap-2">
                    <Button variant="ghost" asChild>
                        <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/signup">Sign Up</Link>
                    </Button>
                </div>
             )}
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
                    {mobileNavLinks.map((link) => (
                      <Link key={link.href} href={link.href} className="flex items-center gap-2 text-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                        {link.icon}
                        {link.label}
                      </Link>
                    ))}
                  </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
