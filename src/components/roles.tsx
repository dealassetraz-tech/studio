import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, FileText, Shield, Users } from "lucide-react";

const rolesData = [
  {
    icon: <FileText className="w-8 h-8 text-green-600" />,
    title: "For Sellers",
    description: "List properties privately, assign trusted brokers, and manage offers with complete control.",
    features: [
      "Private property listings",
      "Broker assignment",
      "Offer management",
      "Deal tracking",
    ],
    featureColor: "text-green-600",
  },
  {
    icon: <Users className="w-8 h-8 text-blue-600" />,
    title: "For Buyers",
    description: "Browse curated properties and work with verified brokers to secure your dream home.",
    features: [
      "Property browsing",
      "Broker connection",
      "Secure messaging",
      "Status tracking",
    ],
    featureColor: "text-blue-600",
  },
  {
    icon: <Shield className="w-8 h-8 text-purple-600" />,
    title: "For Brokers",
    description: "Facilitate deals as the trusted intermediary with powerful negotiation tools.",
    features: [
      "Deal facilitation",
      "Party communication",
      "Offer negotiation",
      "Commission tracking",
    ],
    featureColor: "text-purple-600",
  },
];

export function Roles() {
  return (
    <section id="roles" className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rolesData.map((role, index) => (
            <Card key={index} className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-border/30 overflow-hidden group hover:border-primary/50 transition-all duration-300">
              <CardHeader className="p-8">
                <div className="p-4 bg-muted rounded-xl w-fit mb-4 border border-border/50">
                  {role.icon}
                </div>
                <CardTitle className="text-3xl font-headline text-foreground">{role.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                <p className="text-muted-foreground mb-6 h-20">{role.description}</p>
                <ul className="space-y-3">
                  {role.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className={`w-5 h-5 ${role.featureColor}`} />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
