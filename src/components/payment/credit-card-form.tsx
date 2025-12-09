
'use client';

import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  number: z.string().min(16, "Card number must be 16 digits").max(16, "Card number must be 16 digits"),
  name: z.string().min(1, "Name is required"),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Invalid expiry date (MM/YY)"),
  cvc: z.string().min(3, "CVC must be 3 digits").max(4, "CVC can be up to 4 digits"),
});


export function CreditCardForm() {
  const [focus, setFocus] = useState<any>('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan');
  const price = searchParams.get('price') || 'your plan';


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      number: "",
      name: "",
      expiry: "",
      cvc: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    console.log(values);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    router.push(`/payment/success?plan=${plan}`);
  };

  return (
     <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-md mx-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Credit/Debit Card Payment</CardTitle>
            <CardDescription>Enter your card details to complete the payment for the {plan} plan.</CardDescription>
          </CardHeader>
          <CardContent>
            <Cards
                number={form.watch('number')}
                name={form.watch('name')}
                expiry={form.watch('expiry')}
                cvc={form.watch('cvc')}
                focused={focus}
            />

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-8">
                <FormField
                  control={form.control}
                  name="number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Number</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onFocus={(e) => setFocus(e.target.name)}
                          placeholder="0000 0000 0000 0000"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cardholder Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onFocus={(e) => setFocus(e.target.name)}
                          placeholder="John Doe"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-4">
                    <FormField
                    control={form.control}
                    name="expiry"
                    render={({ field }) => (
                        <FormItem className='w-1/2'>
                        <FormLabel>Expiry Date</FormLabel>
                        <FormControl>
                            <Input
                            {...field}
                            onFocus={(e) => setFocus(e.target.name)}
                            placeholder="MM/YY"
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="cvc"
                    render={({ field }) => (
                        <FormItem className='w-1/2'>
                        <FormLabel>CVC</FormLabel>
                        <FormControl>
                            <Input
                             {...field}
                            onFocus={(e) => setFocus(e.target.name)}
                            placeholder="123"
                            type="password"
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                   {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                   {isLoading ? 'Processing...' : `Pay for ${plan} Plan`}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
