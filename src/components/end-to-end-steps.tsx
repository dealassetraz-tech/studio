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

export function EndToEndSteps() {
  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            End-to-end in three steps
          </h2>
          <p className="text-lg text-muted-foreground">
            The same flow powers the dashboard and the API.
          </p>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={step.title} className="shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                </div>
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
