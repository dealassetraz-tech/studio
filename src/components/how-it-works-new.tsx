import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const steps = [
  {
    title: "Enter a UK property",
    description: "Use address, postcode or Land Registry title number from your CRM, portal or form.",
  },
  {
    title: "We call official sources",
    description: "ASSETRAZ fetches title, owner and company data from official UK sources in real time.",
  },
  {
    title: "You get a clean report",
    description: "A standardised report (JSON + PDF) you can attach to deals, compliance files or your platform.",
  },
];

export function HowItWorksNew() {
  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white shadow-2xl">
        <CardHeader className="p-8">
            <CardTitle className="text-2xl">How ASSETRAZ UK works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8 p-8 pt-0">
            {steps.map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-purple-300 ring-2 ring-white/20">
                        {index + 1}
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-white">{step.title}</h3>
                        <p className="text-purple-200">
                            {step.description}
                        </p>
                    </div>
                </div>
            ))}
        </CardContent>
    </Card>
  );
}
