
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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { DealLockLogo } from "./deallock-logo";
import { useAuth, useFirestore } from "@/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export function AdminSignUpForm() {
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const toastId = toast.loading('Creating admin account...');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: values.fullName });

      await setDoc(doc(firestore, "users", user.uid), {
        id: user.uid,
        email: values.email,
        fullName: values.fullName,
        role: "admin", // Explicitly set role to admin
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      toast.success("Admin account created successfully!", { id: toastId });
      router.push("/admin-dashboard");

    } catch (error: any) {
      console.error("Admin sign up error:", error);
      if (error.code === 'auth/email-already-in-use') {
        toast.error("An account with this email already exists. Please sign in instead.", { id: toastId });
      } else {
        toast.error(error.message || "Failed to create admin account.", { id: toastId });
      }
    }
  }

  return (
    <Card className="w-full max-w-lg my-8">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">
          <DealLockLogo className="w-16 h-16 p-4" />
        </div>
        <CardTitle className="text-2xl font-headline">Admin Account Setup</CardTitle>
        <p className="text-muted-foreground">
          Create a primary administrator account for DealLock.
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                    <Input placeholder="Admin User" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input type="email" placeholder="admin@example.com" {...field} />
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
            <Button type="submit" className="w-full">
            Create Admin Account
            </Button>
        </form>
        </Form>
        <div className="text-center text-sm text-muted-foreground mt-6">
            Already have an admin account?{" "}
            <Link href="/admin/signin" className="text-primary hover:underline">
                Admin Sign In
            </Link>
        </div>
      </CardContent>
    </Card>
  );
}
