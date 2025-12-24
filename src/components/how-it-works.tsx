import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Handshake, Search, ShieldCheck, FileUp, Bot, Settings, KeyRound } from "lucide-react";

const subSteps = [
  {
    icon: <FileUp className="w-6 h-6 text-primary" />,
    title: "Document Upload",
    description: "Purchase agreements, property details, buyer/seller information, and required disclosures.",
  },
  {
    icon: <Bot className="w-6 h-6 text-primary" />,
    title: "Automated Validation",
    description: "AI-powered checks verify document completeness, detect anomalies, and flag missing information.",
  },
  {
    icon: <Settings className="w-6 h-6 text-primary" />,
    title: "Commission Setup",
    description: "Define commission structure, payment terms, and contingency conditions.",
  },
    {
    icon: <KeyRound className="w-6 h-6 text-primary" />,
    title: "Token Generation",
    description: "System generates unique token lock tied to deal terms and approval requirements.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-12 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground">How DealLock Works</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            Complete deal lifecycle management with multi-layer verification and enforcement.
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-8">
                <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground text-xl font-bold border-4 border-background ring-4 ring-primary">
                        1
                    </div>
                </div>
                <div className="flex-1 pb-8">
                    <h3 className="text-2xl font-headline font-semibold text-foreground mb-2">Deal Registration & Initial Submission</h3>
                    <p className="text-muted-foreground mb-8">
                        Brokers initiate the deal process through our secure platform, submitting comprehensive documentation and deal parameters.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {subSteps.map((step, index) => (
                            <Card key={index} className="bg-background/70 shadow-md hover:shadow-primary/10 transition-shadow duration-300">
                                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                    {step.icon}
                                    <CardTitle className="font-headline text-lg text-foreground">{step.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground text-sm">{step.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
