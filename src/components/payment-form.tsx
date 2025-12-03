"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/firebase";
import { updateUserSubscription } from "@/ai/flows/update-user-subscription";

const cardSchema = z.object({
    cardNumber: z.string().min(16, 'Card number must be 16 digits.').max(16, 'Card number must be 16 digits.'),
    expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiry date must be in MM/YY format.'),
    cvv: z.string().min(3, 'CVV must be 3 digits.').max(3, 'CVV must be 3 digits.'),
    nameOnCard: z.string().min(1, 'Name is required.'),
});

const upiSchema = z.object({
    upiId: z.string().min(1, 'UPI ID is required.'),
});

export function PaymentForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { toast } = useToast();
    const { user } = useUser();
    const plan = searchParams.get('plan') || 'Professional';
    const price = searchParams.get('price') || '£199';
    
    const [isLoading, setIsLoading] = useState(false);
    
    const cardForm = useForm({
        validate: zodResolver(cardSchema),
        initialValues: {
            cardNumber: '',
            expiryDate: '',
            cvv: '',
            nameOnCard: '',
        }
    });

    const upiForm = useForm({
        validate: zodResolver(upiSchema),
        initialValues: {
            upiId: '',
        }
    });

    const handlePayment = async () => {
        if (!user) {
            toast({
                title: "Authentication Error",
                description: "You must be logged in to make a payment.",
                variant: "destructive"
            });
            router.push('/auth?type=login');
            return;
        }

        setIsLoading(true);
        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        const result = await updateUserSubscription({ userId: user.uid, plan });

        setIsLoading(false);

        if (result.success) {
            toast({
                title: "Payment Successful!",
                description: `Your subscription for the ${plan} plan is now active.`,
            });
            router.push('/verify');
        } else {
             toast({
                title: "Payment Failed",
                description: result.message,
                variant: "destructive",
            });
        }
    };
    

    return (
        <Card className="w-full max-w-lg shadow-2xl">
            <CardHeader>
                <CardTitle>Complete Your Purchase</CardTitle>
                <CardDescription>You are subscribing to the <span className="font-bold text-primary">{plan}</span> plan for <span className="font-bold">{price}/month</span>.</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="card" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="card">Card</TabsTrigger>
                        <TabsTrigger value="upi">UPI</TabsTrigger>
                        <TabsTrigger value="banking">Banking</TabsTrigger>
                    </TabsList>
                    <TabsContent value="card">
                        <form onSubmit={cardForm.onSubmit(handlePayment)} className="space-y-4 mt-4">
                             <div className="space-y-2">
                                <Label htmlFor="nameOnCard">Name on Card</Label>
                                <Input id="nameOnCard" placeholder="John Doe" {...cardForm.getInputProps('nameOnCard')} />
                                {cardForm.errors.nameOnCard && <p className="text-sm font-medium text-destructive">{cardForm.errors.nameOnCard}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cardNumber">Card Number</Label>
                                <Input id="cardNumber" placeholder="•••• •••• •••• ••••" {...cardForm.getInputProps('cardNumber')} />
                                {cardForm.errors.cardNumber && <p className="text-sm font-medium text-destructive">{cardForm.errors.cardNumber}</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="expiryDate">Expiry Date</Label>
                                    <Input id="expiryDate" placeholder="MM/YY" {...cardForm.getInputProps('expiryDate')} />
                                    {cardForm.errors.expiryDate && <p className="text-sm font-medium text-destructive">{cardForm.errors.expiryDate}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cvv">CVV</Label>
                                    <Input id="cvv" placeholder="•••" {...cardForm.getInputProps('cvv')} />
                                    {cardForm.errors.cvv && <p className="text-sm font-medium text-destructive">{cardForm.errors.cvv}</p>}
                                </div>
                            </div>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? <Loader2 className="animate-spin" /> : `Pay ${price}`}
                            </Button>
                        </form>
                    </TabsContent>
                    <TabsContent value="upi">
                         <form onSubmit={upiForm.onSubmit(handlePayment)} className="space-y-4 mt-4">
                             <div className="space-y-2">
                                <Label htmlFor="upiId">UPI ID</Label>
                                <Input id="upiId" placeholder="yourname@bank" {...upiForm.getInputProps('upiId')} />
                                {upiForm.errors.upiId && <p className="text-sm font-medium text-destructive">{upiForm.errors.upiId}</p>}
                             </div>
                             <Button type="submit" className="w-full" disabled={isLoading}>
                                 {isLoading ? <Loader2 className="animate-spin" /> : `Pay ${price}`}
                             </Button>
                         </form>
                    </TabsContent>
                     <TabsContent value="banking">
                        <div className="text-center space-y-4 mt-4 py-8">
                             <p className="text-muted-foreground">Select your bank to pay via online banking.</p>
                             <Button onClick={handlePayment} className="w-full" disabled={isLoading}>
                                 {isLoading ? <Loader2 className="animate-spin" /> : `Proceed to Online Banking`}
                             </Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
