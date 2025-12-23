import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Handshake, Search, ShieldCheck } from "lucide-react";

const steps = [
  {
    icon: <Search className="w-10 h-10 text-primary" />,
    title: "Find Your Deal",
    description: "Browse through a curated list of properties and find the one that matches your criteria. Our advanced search filters make it easy to narrow down your options.",
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-primary" />,
    title: "Secure Verification",
    description: "We verify every property and seller to ensure a safe transaction. Our comprehensive checks give you peace of mind and protect you from fraud.",
  },
  {
    icon: <Handshake className="w-10 h-10 text-primary" />,
    title: "Close with Confidence",
    description: "Our streamlined process makes closing your deal straightforward. Connect with brokers and sellers securely and manage all your documents in one place.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground">How It Works</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            A simple, three-step process to secure your next real estate deal.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="text-center border-border/50 shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
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