
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DealLockLogo } from "./deallock-logo";
import Link from "next/link";
import { useAuth, useFirestore } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { doc, getDoc } from "firebase/firestore";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export function SignInForm() {
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const toastId = toast.loading('Signing in...');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;

      // Fetch user role from Firestore
      const userDocRef = doc(firestore, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        toast.success("Signed in successfully!", { id: toastId });

        // Redirect based on role
        if (userData.role === 'buyer') {
          router.push("/buyer-dashboard");
        } else if (userData.role === 'broker') {
          router.push("/broker-dashboard");
        } else if (userData.role === 'seller') {
          router.push("/dashboard"); 
        } else {
           // Fallback for any other roles or if role is not set
          router.push("/dashboard");
        }
      } else {
        // Fallback if user doc doesn't exist for some reason
        toast.error("User data not found. Redirecting to default dashboard.", { id: toastId });
        router.push("/dashboard");
      }

    } catch (error: any) {
      console.error("Sign in error:", error);
      toast.error(error.message || "Failed to sign in.", { id: toastId });
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">
            <DealLockLogo className="w-16 h-16 p-4" />
        </div>
        <CardTitle className="text-2xl font-headline">Welcome Back</CardTitle>
        <p className="text-muted-foreground">Sign in to continue to DealLock</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Sign In</Button>
            <div className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/signup" className="text-primary hover:underline">
                    Sign Up
                </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
