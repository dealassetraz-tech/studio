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
  const [isRoleChecked, setIsRoleChecked] = useState(false);

  useEffect(() => {
    if (isUserLoading || !firestore) {
      return;
    }
    
    if (!user) {
      // If no user is logged in, we are done checking. Show the sign-in form.
      setIsRoleChecked(true);
      return;
    }

    const checkAdminRole = async () => {
      const userDocRef = doc(firestore, "users", user.uid);
      try {
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists() && userDoc.data().role === 'admin') {
          // If the user is an admin, redirect them to the dashboard.
          router.push('/admin-dashboard');
        } else {
          // If the user is not an admin, we are done checking. Show the sign-in form.
          setIsRoleChecked(true);
        }
      } catch (error) {
        console.error("Error checking admin role:", error);
        setIsRoleChecked(true);
      }
    };

    checkAdminRole();
  }, [user, isUserLoading, router, firestore]);

  if (!isRoleChecked) {
    // While checking the user's role, show a skeleton loader.
    // This prevents the sign-in form from flashing briefly for a logged-in admin.
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

  // If the role check is complete and the user is not an admin (or not logged in), show the form.
  return (
    <AuthLayout>
      <AdminSignInForm />
    </AuthLayout>
  );
}
