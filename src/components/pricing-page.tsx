"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useUser } from "@/firebase";

const tiers = [
  {
    name: "Pay-as-you-go",
    price: "£7",
    priceValue: 7,
    period: "/check",
    description: "Ideal for small agencies & occasional checks.",
    priceDescription: "Example price, ex VAT.",
    features: [
      "Title & proprietor details",
      "Tenure & registration info",
      "Price paid history",
      "Downloadable PDF",
    ],
    buttonText: "Get Started",
    highlight: false,
  },
  {
    name: "Professional",
    price: "£199",
    priceValue: 199,
    period: "/month",
    description: "For agencies & platforms doing regular checks.",
    priceDescription: "Example: includes a bundle of checks.",
    features: [
      "Everything in pay-as-you-go",
      "Dashboard & team access",
      "Basic API integration",
      "Priority support",
    ],
    buttonText: "Get Started",
    highlight: true,
    badge: "For growing teams",
  },
  {
    name: "Enterprise",
    price: "Custom",
    priceValue: null,
    period: "",
    description: "For portals, lenders and large platforms.",
    priceDescription: "Based on expected volume & SLA.",
    features: [
      "High-volume API access",
      "Bulk & batch processing",
      "Custom data bundles",
      "Dedicated support & onboarding",
    ],
    buttonText: "Contact Sales",
    highlight: false,
  },
];

export function PricingPage() {
  const { user, loading } = useUser();
  const getButtonLink = (tier: typeof tiers[0]) => {
    if (tier.name === 'Enterprise' || tier.name === 'Pay-as-you-go') {
        return '/contact';
    }
    if (!loading && user) {
        return '/verify';
    }
    return '/auth?type=signup';
  }


  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">Pricing examples</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Actual pricing depends on data costs and volume. These tiers show how ASSETRAZ UK could be packaged.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
        {tiers.map((tier) => (
          <Card
            key={tier.name}
            className={cn(
                "shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full",
                tier.highlight && "border-primary border-2 relative"
            )}
          >
             {tier.badge && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 text-sm font-semibold rounded-full">
                {tier.badge}
              </div>
            )}
            <CardHeader className="text-left">
              <CardTitle className="text-2xl">{tier.name}</CardTitle>
              <CardDescription>{tier.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow">
              <div className="mb-6">
                <span className="text-5xl font-bold">{tier.price}</span>
                {tier.period && (
                    <span className="text-xl text-muted-foreground">{tier.period}</span>
                )}
                <p className="text-sm text-muted-foreground mt-1">{tier.priceDescription}</p>
              </div>
              <ul className="space-y-3 text-left flex-grow">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="w-full mt-8" variant={tier.highlight ? 'default' : 'secondary'}>
                <Link href={getButtonLink(tier)}>
                    {tier.buttonText}
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
