"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, LogOut, User, Settings } from "lucide-react";
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
import { AssetrazLogo } from "./assetraz-logo";

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
  const userInitials = userName?.charAt(0)?.toUpperCase() || "U";

  return (
    <header className="bg-background/95 backdrop-blur-sm sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5">
                <AssetrazLogo />
              <div>
                <span className="text-xl font-bold text-foreground">ASSETRAZ UK</span>
                <p className="text-xs text-muted-foreground hidden sm:block">Property & Owner Verification</p>
              </div>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-foreground">
            {navLinks.map((link) => (
               <Link key={link.href} href={link.href} className="flex items-center gap-1 hover:text-primary transition-colors">
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
                    <>
                        <Button variant="ghost" asChild>
                            <Link href="/auth?type=login">Login</Link>
                        </Button>
                        <Button asChild>
                            <Link href="/auth?type=signup">Sign Up</Link>
                        </Button>
                    </>
                )}
            </div>
             <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background text-foreground">
                <SheetHeader>
                  <Link href="/" className="flex items-center gap-2 mb-4" onClick={() => setIsMenuOpen(false)}>
                    <AssetrazLogo />
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
                  <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2 mt-6">
                    {!loading && user ? (
                        <div className="flex items-center gap-4 p-2 rounded-md border">
                             <Avatar>
                                <AvatarImage src={user.photoURL ?? ''} alt={userName} />
                                <AvatarFallback>{userInitials}</AvatarFallback>
                            </Avatar>
                            <div className="truncate">
                                <p className="font-semibold truncate">{userName}</p>
                                <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <Button variant="ghost" asChild className="w-full">
                                <Link href="/auth?type=login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                            </Button>
                            <Button asChild className="w-full">
                                <Link href="/auth?type=signup" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                            </Button>
                        </div>
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
