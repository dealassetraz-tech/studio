
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CreditCard, Banknote, Landmark } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const paymentOptions = [
  {
    name: "Credit / Debit Card",
    icon: <CreditCard className="w-6 h-6 text-primary" />,
    description: "Pay with your Visa, Mastercard, or Amex.",
    path: "card"
  },
  {
    name: "UPI Payment",
    icon: <Banknote className="w-6 h-6 text-primary" />,
    description: "Pay with any supported UPI app.",
    path: "upi"
  },
  {
    name: "Net Banking / Online Banking",
    icon: <Landmark className="w-6 h-6 text-primary" />,
    description: "Pay from your bank account directly.",
    path: "netbanking"
  },
];

export function PaymentOptionsPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const plan = searchParams.get('plan');

    const handleOptionClick = (path: string) => {
        const paymentUrl = plan ? `/payment/${path}?plan=${encodeURIComponent(plan)}` : `/payment/${path}`;
        router.push(paymentUrl);
    }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">Choose a Payment Method</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Select how you'd like to pay for your {plan || 'plan'}.
        </p>
      </div>

      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardContent className="p-6">
            <div className="space-y-4">
                {paymentOptions.map((option) => (
                    <button
                        key={option.name}
                        onClick={() => handleOptionClick(option.path)}
                        className="w-full text-left p-4 border rounded-lg hover:bg-accent hover:border-primary transition-all flex items-center gap-4"
                    >
                        <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            {option.icon}
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">{option.name}</h3>
                            <p className="text-muted-foreground text-sm">{option.description}</p>
                        </div>
                    </button>
                ))}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
