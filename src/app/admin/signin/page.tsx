
'use client';

import { AdminSignInForm } from "@/components/admin-signin-form";
import AuthLayout from "../../auth/layout";
import { useUser } from "@/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminSignInPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    // If user is loaded and they are the admin, redirect to dashboard
    if (!isUserLoading && user && user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
      router.push('/admin-dashboard');
    }
  }, [user, isUserLoading, router]);

  // If we are checking for user, or if user is admin and we are redirecting, show loading state
  if (isUserLoading || (user && user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL)) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-8 space-y-8">
                <Skeleton className="h-10 w-1/2 mx-auto" />
                <Skeleton className="h-6 w-3/4 mx-auto" />
                <div className="space-y-6">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                </div>
            </div>
        </div>
    );
  }

  // If user is not admin or not logged in, show the form
  return (
    <AuthLayout>
      <AdminSignInForm />
    </AuthLayout>
  );
}
