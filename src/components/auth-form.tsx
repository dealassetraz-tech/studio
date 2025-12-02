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
import { useRouter, useSearchParams } from "next/navigation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState, useEffect } from "react";
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
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [authType, setAuthType] = useState<'login' | 'signup'>('signup');
  const auth = useAuth();
  const firestore = useFirestore();

  useEffect(() => {
    const type = searchParams.get('type');
    if (type === 'login' || type === 'signup') {
        setAuthType(type);
    }
  }, [searchParams]);

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
          setError("No account found with this email. Please sign up.");
          setAuthType('signup');
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
        hasActiveSubscription: false,
      }, { merge: true });

      router.push("/verify");
    } catch (e: any) {
      if (e.code === 'auth/email-already-in-use') {
        setError("This email is already in use. Please sign in.");
        setAuthType('login');
      } else {
        setError("An unexpected error occurred during sign-up. Please try again.");
      }
    }
  };

  async function onSubmit(values: FormSchema) {
    setError(null);
    if (authType === 'signup') {
        await handleSignUp(values);
    } else {
        await handleSignIn(values);
    }
  }
  
  const isSignUp = authType === 'signup';

  return (
    <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
            <CardTitle>{isSignUp ? 'Create an Account' : 'Sign In'}</CardTitle>
            <CardDescription>{isSignUp ? 'Welcome! Please provide your details to continue.' : 'Enter your email and password to access your account.'}</CardDescription>
        </CardHeader>
        <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {isSignUp && (
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
                    {!isSignUp && (
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
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </Button>
            </form>
            </Form>
            <p className="mt-6 text-center text-sm text-muted-foreground">
                {isSignUp ? "Already have an account?" : "Don't have an account?"}{' '}
                <Link 
                    href={isSignUp ? "/auth?type=login" : "/auth?type=signup"} 
                    className="text-primary hover:underline font-medium"
                    onClick={() => setError(null)}
                >
                    {isSignUp ? "Sign In" : "Sign Up"}
                </Link>
            </p>
        </CardContent>
    </Card>
  );
}
