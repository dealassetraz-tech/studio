
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
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "./ui/checkbox";
import React from "react";
import { VerifyPropertyInput, VerifyPropertyOutput, verifyProperty } from "@/ai/flows/verify-property";
import { Loader2 } from "lucide-react";
import { useUser } from "@/firebase";
import { useRouter } from "next/navigation";
import { checkSubscriptionStatus } from "@/ai/flows/check-subscription-status";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  verificationMethod: z.enum(["title", "postcode", "address"]),
  titleNumber: z.string().optional(),
  postcode: z.string().optional(),
  street: z.string().optional(),
  city: z.string().optional(),
  pricePaid: z.boolean().default(false),
  companyOwnership: z.boolean().default(false),
  localData: z.boolean().default(false),
}).refine(data => {
    if (data.verificationMethod === 'title') return !!data.titleNumber;
    if (data.verificationMethod === 'postcode') return !!data.postcode;
    if (data.verificationMethod === 'address') return !!data.street && !!data.city && !!data.postcode;
    return false;
}, {
    message: "Please fill in the required fields for the selected verification method.",
    path: ["titleNumber"], // you can pick any field to show the error
});

type VerificationFormProps = {
    onVerify: (data: VerifyPropertyOutput) => void;
    setIsLoading: (isLoading: boolean) => void;
    isLoading: boolean;
}

export function VerificationForm({ onVerify, setIsLoading, isLoading }: VerificationFormProps) {
  const { user } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      verificationMethod: "title",
      titleNumber: "DN123456",
      postcode: "SW1A 2AA",
      street: "10 Downing Street",
      city: "London",
      pricePaid: true,
      companyOwnership: true,
      localData: false,
    },
  });

  const verificationMethod = form.watch("verificationMethod");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) {
      router.push('/auth?type=login');
      return;
    }
    
    setIsLoading(true);

    const subStatus = await checkSubscriptionStatus({ userId: user.uid });

    if (subStatus.action === 'REDIRECT_TO_PRICING') {
      toast({
        title: "Subscription Required",
        description: `Your status is: ${subStatus.status}. Please upgrade your plan.`,
        variant: "destructive",
      });
      router.push('/pricing');
      setIsLoading(false);
      return;
    }
    
    // Proceed with verification if subscription is active
    let propertyIdentifier = '';
    if (values.verificationMethod === 'title') {
        propertyIdentifier = values.titleNumber || '';
    } else if (values.verificationMethod === 'postcode') {
        propertyIdentifier = values.postcode || '';
    } else if (values.verificationMethod === 'address') {
        propertyIdentifier = `${values.street}, ${values.city}, ${values.postcode}`;
    }

    const input: VerifyPropertyInput = {
      propertyIdentifier: propertyIdentifier,
      identifierType: values.verificationMethod,
      checks: {
        pricePaid: values.pricePaid,
        companyOwnership: values.companyOwnership,
        localData: values.localData,
      }
    };
    
    try {
      const report = await verifyProperty(input);
      onVerify(report);
    } catch (error) {
      console.error("Verification failed:", error);
      toast({
        title: "Verification Failed",
        description: "An unexpected error occurred during verification.",
        variant: "destructive",
      })
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <Card className="max-w-3xl mx-auto shadow-2xl">
      <CardContent className="p-4 sm:p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="verificationMethod"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-muted-foreground font-semibold tracking-wider">VERIFICATION METHOD</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                            <div className="flex items-center w-full p-4 border rounded-md has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                                <RadioGroupItem value="title" />
                                <FormLabel className="font-normal ml-3 cursor-pointer">
                                    Title number
                                    <p className="text-xs text-muted-foreground">e.g. DN123456</p>
                                </FormLabel>
                            </div>
                        </FormControl>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                           <div className="flex items-center w-full p-4 border rounded-md has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                                <RadioGroupItem value="postcode" />
                                <FormLabel className="font-normal ml-3 cursor-pointer">
                                    Postcode
                                    <p className="text-xs text-muted-foreground">e.g. SW1A 1AA</p>
                                </FormLabel>
                            </div>
                        </FormControl>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                           <div className="flex items-center w-full p-4 border rounded-md has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                                <RadioGroupItem value="address" />
                                <FormLabel className="font-normal ml-3 cursor-pointer">
                                    Full address
                                    <p className="text-xs text-muted-foreground">Street, city & postcode</p>
                                </FormLabel>
                            </div>
                        </FormControl>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {verificationMethod === "title" && (
              <FormField
                control={form.control}
                name="titleNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground font-semibold tracking-wider">TITLE NUMBER</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {verificationMethod === "postcode" && (
                <FormField
                control={form.control}
                name="postcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground font-semibold tracking-wider">POSTCODE</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. SW1A 2AA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

             {verificationMethod === "address" && (
                <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="street"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-muted-foreground font-semibold tracking-wider">STREET</FormLabel>
                                <FormControl>
                                <Input placeholder="e.g. 10 Downing Street" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-muted-foreground font-semibold tracking-wider">CITY</FormLabel>
                                <FormControl>
                                <Input placeholder="e.g. London" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </div>
                     <FormField
                        control={form.control}
                        name="postcode"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-muted-foreground font-semibold tracking-wider">POSTCODE</FormLabel>
                            <FormControl>
                            <Input placeholder="e.g. SW1A 2AA" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
              )}
            
            <div className="p-6 bg-secondary/30 rounded-lg">
                <FormLabel className="text-muted-foreground font-semibold tracking-wider">INCLUDE CHECKS</FormLabel>
                <div className="space-y-4 mt-4">
                    <FormField
                        control={form.control}
                        name="pricePaid"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                                <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                Price paid history
                                </FormLabel>
                            </div>
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="companyOwnership"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                                <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                Company ownership if applicable
                                </FormLabel>
                            </div>
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="localData"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                                <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                Additional local data (concept only)
                                </FormLabel>
                            </div>
                            </FormItem>
                        )}
                    />
                </div>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? 'Verifying...' : 'Run verification'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
