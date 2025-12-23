import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Handshake, Search, ShieldCheck } from "lucide-react";

const steps = [
  {
    icon: <Search className="w-10 h-10 text-primary" />,
    title: "Find Your Deal",
    description: "Browse curated properties across Tier-1 and Tier-2 cities. Our advanced search helps you find the perfect match for your investment portfolio or dream home.",
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-primary" />,
    title: "Secure Verification",
    description: "We verify every property and seller to ensure a safe transaction. Our RERA compliance checks and due diligence give you peace of mind.",
  },
  {
    icon: <Handshake className="w-10 h-10 text-primary" />,
    title: "Close with Confidence",
    description: "Our streamlined process makes closing your deal straightforward. Connect with brokers and sellers securely and manage all your documents in one place.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-12 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground">How It Works</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            A simple, three-step process to secure your next real estate deal in India.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="text-center bg-background shadow-lg hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-300">
              <CardHeader>
                <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4 border border-primary/20">
                  {step.icon}
                </div>
                <CardTitle className="font-headline text-2xl text-foreground">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
