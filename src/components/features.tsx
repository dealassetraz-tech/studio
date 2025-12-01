import { FileText, Banknote, Building, Search } from "lucide-react";
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const features = [
  {
    title: "Transparent history",
    description: "Understand how a property has moved over time.",
    imageUrl: PlaceHolderImages.find(p => p.id === 'feature-price-history-chart')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'feature-price-history-chart')?.imageHint || '',
    className: "md:col-span-2 bg-secondary/30",
  },
  {
    title: "Price paid history",
    description: "Access historical transaction data and basic analytics so your teams can spot anomalies early.",
    details: [
      "List of historic sale prices and dates",
      "Simple appreciation / time-on-market signals",
      "Support for valuation & risk decisions",
    ],
    imageUrl: PlaceHolderImages.find(p => p.id === 'feature-price-history-icon')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'feature-price-history-icon')?.imageHint || '',
    className: "bg-white",
  },
  {
    title: "Company ownership",
    description: "When the proprietor is a company, ASSETRAZ pulls company records and shows the ownership structure.",
    details: [
      "Company registration & status",
      "Persons with significant control (PSC)",
      "Basic filing and age indicators",
    ],
    imageUrl: PlaceHolderImages.find(p => p.id === 'feature-company-ownership-icon')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'feature-company-ownership-icon')?.imageHint || '',
    className: "bg-white",
  },
   {
    title: "Deeper visibility",
    description: "Support AML and compliance checks.",
    imageUrl: PlaceHolderImages.find(p => p.id === 'feature-deeper-visibility-icon')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'feature-deeper-visibility-icon')?.imageHint || '',
    className: "md:col-span-2 bg-accent/20",
  },
];

export function Features() {
  return (
    <div className="bg-background text-foreground">
        <div className="container mx-auto px-4 py-12 md:py-20">
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h1 className="text-4xl md:text-5xl font-bold">
                What ASSETRAZ UK can verify
                </h1>
                <p className="text-lg text-muted-foreground mt-2">
                A single source of truth for property and ownership information, designed for professional workflows.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {features.map((feature) => (
                    <div key={feature.title} className={`rounded-xl p-8 ${feature.className}`}>
                        {feature.title === "Transparent history" || feature.title === "Deeper visibility" ? (
                             <div className="flex flex-col items-center justify-center h-full text-center">
                                <div className="relative w-24 h-24 mb-4">
                                    <Image src={feature.imageUrl} alt={feature.title} layout="fill" objectFit="contain" data-ai-hint={feature.imageHint} />
                                </div>
                                <h2 className="text-2xl font-semibold text-foreground">{feature.title}</h2>
                                <p className="text-muted-foreground mt-2">{feature.description}</p>
                            </div>
                        ) : (
                            <div>
                                <div className="relative w-16 h-16 mb-4">
                                     <Image src={feature.imageUrl} alt={feature.title} layout="fill" objectFit="contain" data-ai-hint={feature.imageHint} />
                                </div>
                                <h2 className="text-2xl font-semibold text-foreground mb-2">{feature.title}</h2>
                                <p className="text-muted-foreground mb-4">{feature.description}</p>
                                <ul className="space-y-2 text-muted-foreground">
                                    {feature.details?.map(detail => (
                                        <li key={detail} className="flex items-start">
                                            <span className="text-primary mr-2 mt-1">&#8226;</span>
                                            <span>{detail}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}
