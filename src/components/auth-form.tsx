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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { Alert, AlertDescription } from "./ui/alert";
import { useAuth, useFirestore } from "@/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const formSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Invalid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

type FormSchema = z.infer<typeof formSchema>;

export function AuthForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isNewUser, setIsNewUser] = useState<boolean | null>(null);
  const auth = useAuth();
  const firestore = useFirestore();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleSignIn = async (values: FormSchema) => {
    if (!auth) return;
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      router.push("/verify");
    } catch (e: any) {
       switch (e.code) {
        case 'auth/user-not-found':
          setIsNewUser(true);
          break;
        case 'auth/wrong-password':
          setError("Incorrect password. Please try again.");
          break;
        case 'auth/invalid-credential':
           setError("Invalid credentials. Please try again.");
           break;
        default:
          setError("An unexpected error occurred during sign-in. Please try again.");
          break;
      }
    }
  };

  const handleSignUp = async (values: FormSchema) => {
    if (!auth || !firestore || !values.name) {
        setError("Name is required for new accounts.");
        return;
    };

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: values.name });

      const userRef = doc(firestore, 'users', user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: values.name,
        createdAt: serverTimestamp(),
      }, { merge: true });

      router.push("/verify");
    } catch (e: any) {
      if (e.code === 'auth/email-already-in-use') {
        setError("This email is already in use. Please try to sign in.");
        setIsNewUser(false);
      } else {
        setError("An unexpected error occurred during sign-up. Please try again.");
      }
    }
  };

  async function onSubmit(values: FormSchema) {
    setError(null);
    if (isNewUser) {
        await handleSignUp(values);
    } else {
        await handleSignIn(values);
    }
  }

  return (
    <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
            <CardTitle>{isNewUser ? 'Create an Account' : 'Sign In or Sign Up'}</CardTitle>
            <CardDescription>{isNewUser ? 'Welcome! Please provide your name to continue.' : 'Enter your email and password to continue to ASSETRAZ'}</CardDescription>
        </CardHeader>
        <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {isNewUser && (
                     <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} />
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
                        <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    {!isNewUser && (
                        <div className="text-right">
                            <Link href="#" className="text-sm text-primary hover:underline">
                                Forgot password?
                            </Link>
                        </div>
                    )}
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit" className="w-full">
                    {isNewUser ? 'Sign Up' : 'Continue'}
                </Button>
            </form>
            </Form>

            {isNewUser === false && (
                 <p className="mt-6 text-center text-sm text-muted-foreground">
                    New user? We'll create an account for you.
                </p>
            )}
        </CardContent>
    </Card>
  );
}
