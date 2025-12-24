
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Building, Home, User, CheckCircle } from "lucide-react";
import Link from "next/link";
import { DealLockLogo } from "./deallock-logo";
import { useAuth, useFirestore } from "@/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Label } from "./ui/label";
import { useState, useEffect } from "react";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  role: z.enum(["seller", "buyer", "broker"], {
    required_error: "You need to select a role.",
  }),
});

const roles = [
    {
        value: "seller",
        label: "Seller",
        description: "List and manage your properties",
        icon: <Home className="w-6 h-6 text-primary" />,
    },
    {
        value: "buyer",
        label: "Buyer",
        description: "Browse and purchase properties",
        icon: <Building className="w-6 h-6 text-primary" />,
    },
    {
        value: "broker",
        label: "Broker",
        description: "Facilitate property transactions",
        icon: <User className="w-6 h-6 text-primary" />,
    }
]

export function SignUpForm() {
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });
  
  useEffect(() => {
    setIsMounted(true);
  }, []);


  async function onSubmit(values: z.infer<typeof formSchema>) {
    const toastId = toast.loading('Creating account...');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: values.fullName });

      await setDoc(doc(firestore, "users", user.uid), {
        id: user.uid,
        email: values.email,
        fullName: values.fullName,
        role: values.role,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        wishlist: [],
      });

      toast.success("Account created successfully!", { id: toastId });
      
      if (values.role === 'buyer') {
        router.push("/buyer-dashboard");
      } else if (values.role === 'broker') {
        router.push("/broker-dashboard");
      } else {
        router.push("/dashboard");
      }

    } catch (error: any) {
      console.error("Sign up error:", error);
      toast.error(error.message || "Failed to create account.", { id: toastId });
    }
  }

  if (!isMounted) {
    return null; // or a loading spinner
  }

  return (
    <Card className="w-full max-w-lg my-8">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">
          <DealLockLogo className="w-16 h-16 p-4" />
        </div>
        <CardTitle className="text-2xl font-headline">Create Account</CardTitle>
        <p className="text-muted-foreground">
          Join DealLock to start your real estate journey in India
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
                    <Input placeholder="Ramesh Kumar" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Select Your Role</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-3"
                    >
                        {roles.map(role => (
                            <FormItem key={role.value}>
                                 <FormControl>
                                    <RadioGroupItem value={role.value} className="sr-only" />
                                </FormControl>
                                <Label
                                  htmlFor={field.name + role.value}
                                  className="flex items-center gap-4 rounded-lg border p-4 cursor-pointer hover:bg-accent hover:text-accent-foreground data-[state=checked]:border-primary data-[state=checked]:bg-primary/10 relative"
                                >
                                    <RadioGroupItem value={role.value} id={field.name + role.value} className="sr-only" />
                                    <div className="p-3 bg-muted rounded-lg border">
                                        {role.icon}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-semibold">{role.label}</span>
                                        <span className="text-sm text-muted-foreground">{role.description}</span>
                                    </div>

                                    {isMounted && field.value === role.value && 
                                        <div className="absolute top-4 right-4">
                                            <CheckCircle className="w-6 h-6 text-primary" />
                                        </div>
                                    }
                                </Label>
                            </FormItem>
                        ))}
                    </RadioGroup>
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
                    <Input placeholder="you@example.com" {...field} />
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
              Create Account
            </Button>
            <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/signin" className="text-primary hover:underline">
                    Sign In
                </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
