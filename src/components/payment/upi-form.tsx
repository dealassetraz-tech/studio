
'use client';

import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, QrCode } from 'lucide-react';
import Image from 'next/image';

const formSchema = z.object({
  upiId: z.string().regex(/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/, "Invalid UPI ID"),
});

export function UpiForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      upiId: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    console.log("UPI ID:", values.upiId);
    // Simulate API call and waiting for payment confirmation
    await new Promise(resolve => setTimeout(resolve, 5000));
    setIsLoading(false);
    router.push(`/payment/success?plan=${plan}`);
  };

  return (
     <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-md mx-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>UPI Payment</CardTitle>
            <CardDescription>Enter your UPI ID or scan the QR code to pay for the {plan} plan.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center mb-6">
               <div className="bg-white p-4 rounded-lg border">
                 <Image src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=example@upi" alt="UPI QR Code" width={150} height={150} />
               </div>
            </div>
            
            <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                    OR
                    </span>
                </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="upiId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your UPI ID</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="yourname@bank" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                   {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                   {isLoading ? 'Waiting for confirmation...' : `Pay for ${plan} Plan`}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
