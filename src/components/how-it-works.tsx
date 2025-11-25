import { ShieldCheck, Cpu, Award, UploadCloud, FileJson, Stamp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const steps = [
  {
    icon: <UploadCloud className="h-10 w-10 text-primary" />,
    title: "Secure Upload",
    description: "Upload property documents for verification through our secure, encrypted platform.",
  },
  {
    icon: <FileJson className="h-10 w-10 text-primary" />,
    title: "AI Analysis",
    description: "Our AI engine analyzes documents, cross-referencing multiple government databases for inconsistencies.",
  },
  {
    icon: <Stamp className="h-10 w-10 text-primary" />,
    title: "Blockchain Certificate",
    description: "Receive a tamper-proof verification certificate, immutably recorded on the blockchain.",
  },
];


export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">A Simplified, Secure Process</h2>
            <p className="text-lg text-muted-foreground mt-2">Three steps to confident property ownership.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 text-center">
            {steps.map((step, index) => (
                <Card key={index} className="border-2 border-transparent hover:border-primary transition-colors duration-300 shadow-lg">
                    <CardHeader className="items-center">
                        <div className="p-4 bg-primary/10 rounded-full mb-4">
                            {step.icon}
                        </div>
                        <CardTitle>{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-sm">
                            {step.description}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </section>
  );
}
