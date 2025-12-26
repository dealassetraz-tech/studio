'use client';

import { AdminSignInForm } from "@/components/admin-signin-form";
import AuthLayout from "../../auth/layout";
import { useFirestore, useUser } from "@/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { doc, getDoc } from "firebase/firestore";

export default function AdminSignInPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCheckingRole, setIsCheckingRole] = useState(true);

  useEffect(() => {
    if (isUserLoading) {
      return;
    }
    if (!user) {
      setIsCheckingRole(false);
      return;
    }

    const checkAdminRole = async () => {
      const userDocRef = doc(firestore, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists() && userDoc.data().role === 'admin') {
        setIsAdmin(true);
        router.push('/admin-dashboard');
      } else {
        setIsAdmin(false);
      }
      setIsCheckingRole(false);
    };

    checkAdminRole();
  }, [user, isUserLoading, router, firestore]);

  if (isUserLoading || isCheckingRole || isAdmin) {
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
