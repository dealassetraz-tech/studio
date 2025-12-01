"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, LogOut, User, Settings } from "lucide-react";
import { AssetrazLogo } from "./assetraz-logo";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useUser } from "@/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/firebase";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/verify", label: "Verify Property" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
      router.push("/");
    }
  };
  
  const userName = user?.displayName || "User";
  const userInitials = userName?.charAt(0) || "U";

  return (
    <header className="bg-transparent absolute top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5">
                <div className="bg-white p-1.5 rounded-md">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-background">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        <polyline points="9 22 9 12 15 12 15 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></polyline>
                    </svg>
                </div>
              <div>
                <span className="text-xl font-bold text-white">ASSETRAZ UK</span>
                <p className="text-xs text-purple-200">Property & Owner Verification</p>
              </div>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-purple-200">
            {navLinks.map((link) => (
               <Link key={link.href} href={link.href} className="flex items-center gap-1 hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
             <div className="hidden md:flex items-center gap-2">
                {!loading && user ? (
                   <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                        <Avatar>
                          <AvatarImage src={user.photoURL ?? ''} alt={userName} />
                          <AvatarFallback>{userInitials}</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{userName}</p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                    <Button asChild className="bg-white text-background hover:bg-gray-200">
                        <Link href="/verify">Start Verification</Link>
                    </Button>
                )}
            </div>
             <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="text-white hover:text-white hover:bg-white/10">
                  <Menu />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background text-white">
                <SheetHeader>
                  <Link href="/" className="flex items-center gap-2 mb-4" onClick={() => setIsMenuOpen(false)}>
                    <AssetrazLogo className="h-8 w-8 text-white" />
                    <div>
                      <span className="text-xl font-bold">ASSETRAZ</span>
                    </div>
                  </Link>
                </SheetHeader>
                 <nav className="flex flex-col gap-4 text-lg font-medium">
                    {navLinks.map((link) => (
                      <Link key={link.href} href={link.href} className="flex items-center gap-2 hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                  <div className="flex flex-col gap-2 mt-6">
                    {!loading && user ? (
                        <div className="flex items-center gap-4 p-2 rounded-md bg-muted">
                             <Avatar>
                                <AvatarImage src={user.photoURL ?? ''} alt={userName} />
                                <AvatarFallback>{userInitials}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{userName}</p>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                        </div>
                    ) : (
                        <Button asChild className="w-full bg-white text-background hover:bg-gray-200">
                            <Link href="/verify" onClick={() => setIsMenuOpen(false)}>Start Verification</Link>
                        </Button>
                    )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
