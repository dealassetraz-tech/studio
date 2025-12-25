'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Handshake,
  LogOut,
  LayoutDashboard,
  Users,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth, useUser } from '@/firebase';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from './ui/button';
import { DealLockLogo } from './deallock-logo';
import { useEffect, useState } from 'react';

const navLinks = [
  { href: '/admin-dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { href: '/admin-dashboard/deals', label: 'Deals', icon: <Handshake className="w-5 h-5" /> },
  { href: '/admin-dashboard/approvals', label: 'Approvals', icon: <ShieldCheck className="w-5 h-5" /> },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const auth = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (user && user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
        router.push('/admin/signin');
    }
  }, [user, router]);

  const handleSignOut = async () => {
    await auth.signOut();
    router.push('/admin/signin');
  };

  return (
    <aside className="w-64 min-h-screen bg-background text-foreground flex flex-col p-4 border-r">
      <Link href="/admin-dashboard" className="flex items-center gap-2.5 mb-8">
        <DealLockLogo />
        <span className="text-xl font-bold text-foreground">DealLock Admin</span>
      </Link>

      {user && (
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.photoURL || ''} />
              <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm">{user.displayName || 'Admin'}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
          {isMounted && (
            <div className="mt-4">
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-500/10 text-red-500">Admin</span>
            </div>
          )}
        </div>
      )}

      <nav className="flex flex-col gap-2 flex-grow">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              pathname === link.href
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-accent'
            )}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </nav>

      <Button variant="ghost" onClick={handleSignOut} className="w-full justify-start gap-3 px-4 text-muted-foreground hover:bg-accent">
        <LogOut className="w-5 h-5" />
        Sign Out
      </Button>
    </aside>
  );
}
