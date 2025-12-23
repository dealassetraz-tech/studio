import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, FileText, Shield, Users } from "lucide-react";

const rolesData = [
  {
    icon: <FileText className="w-8 h-8 text-primary" />,
    title: "For Sellers",
    description: "List properties privately, assign trusted brokers, and manage offers with complete control.",
    features: [
      "Private property listings",
      "Broker assignment",
      "Offer management",
      "Deal tracking",
    ],
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: "For Buyers",
    description: "Browse curated properties and work with verified brokers to secure your dream home or investment.",
    features: [
      "Curated property discovery",
      "Verified broker connections",
      "Secure messaging",
      "Transaction status tracking",
    ],
  },
  {
    icon: <Shield className="w-8 h-8 text-primary" />,
    title: "For Brokers",
    description: "Facilitate deals as the trusted intermediary with powerful negotiation and management tools.",
    features: [
      "Deal facilitation",
      "Secure party communication",
      "Offer negotiation",
      "Commission tracking",
    ],
  },
];

export function Roles() {
  return (
    <section id="roles" className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rolesData.map((role, index) => (
            <Card key={index} className="bg-background backdrop-blur-sm rounded-2xl shadow-lg border overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-primary/20">
              <CardHeader className="p-8">
                <div className="p-4 bg-muted rounded-xl w-fit mb-4 border">
                  {role.icon}
                </div>
                <CardTitle className="text-3xl font-headline text-foreground">{role.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                <p className="text-muted-foreground mb-6 h-20">{role.description}</p>
                <ul className="space-y-3">
                  {role.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
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
