
'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';

const banks = ["HDFC Bank", "ICICI Bank", "State Bank of India", "Axis Bank", "Kotak Mahindra Bank", "Other"];

const formSchema = z.object({
  bank: z.string().min(1, "Please select a bank."),
});

export function NetBankingForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bank: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    console.log("Bank selected:", values.bank);
    // Simulate redirection to bank's portal
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsLoading(false);
    // In a real app, the bank would redirect back to a success/failure URL.
    // Here we simulate a successful payment.
    router.push(`/payment/success?plan=${plan}`);
  };

  return (
     <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-md mx-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Net Banking Payment</CardTitle>
            <CardDescription>Select your bank to proceed with the payment for the {plan} plan.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="bank"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Choose your bank</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a bank from the list" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {banks.map(bank => (
                            <SelectItem key={bank} value={bank}>{bank}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                   {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                   {isLoading ? 'Redirecting to bank...' : `Proceed to Pay`}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
