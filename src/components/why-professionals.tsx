import { BadgeCheck, PlugZap, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const features = [
  {
    icon: <Zap className="w-8 h-8 text-orange-500" />,
    title: "One-click verification",
    description: "Verify title, owner and history from a single screen, instead of juggling multiple portals.",
  },
  {
    icon: <BadgeCheck className="w-8 h-8 text-green-500" />,
    title: "Standardised reports",
    description: "Every property check produces a consistent report your teams can actually understand.",
  },
  {
    icon: <PlugZap className="w-8 h-8 text-blue-500" />,
    title: "API-ready",
    description: "Embed verification into your own platform, form or workflow with a simple REST API.",
  },
]

export function WhyProfessionals() {
  return (
    <section id="why-us" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why professionals use ASSETRAZ UK
          </h2>
          <p className="text-lg text-muted-foreground">
            Reduce fraud, stop time-wasting on bad data, and standardise property & owner checks across your organisation.
          </p>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto bg-secondary/50 rounded-full w-16 h-16 flex items-center justify-center">
                  {feature.icon}
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
