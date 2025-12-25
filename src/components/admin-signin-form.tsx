
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
import { useAuth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export function AdminSignInForm() {
  const auth = useAuth();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: process.env.NEXT_PUBLIC_ADMIN_EMAIL || "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
        toast.error("This is not a valid admin email address.");
        return;
    }

    const toastId = toast.loading('Signing in as admin...');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      toast.success("Admin signed in successfully!", { id: toastId });
      router.push("/admin-dashboard");
    } catch (error: any) {
      console.error("Admin sign in error:", error);
      toast.error(error.message || "Failed to sign in.", { id: toastId });
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">
            <DealLockLogo className="w-16 h-16 p-4" />
        </div>
        <CardTitle className="text-2xl font-headline">Admin Portal</CardTitle>
        <p className="text-muted-foreground">Sign in to access the administrator dashboard</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Admin Email</FormLabel>
                  <FormControl>
                    <Input placeholder="admin@deallock.com" {...field} readOnly={!!process.env.NEXT_PUBLIC_ADMIN_EMAIL} />
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
            <Button type="submit" className="w-full">Sign In as Admin</Button>
            <div className="text-center text-sm text-muted-foreground">
                Not an admin?{" "}
                <Link href="/signin" className="text-primary hover:underline">
                    User Sign In
                </Link>
                {" or "}
                <Link href="/admin/signup" className="text-primary hover:underline">
                    Admin Sign Up
                </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
