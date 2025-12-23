import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Lock, MessageCircle, Users } from "lucide-react";

const features = [
  {
    icon: <Lock className="w-8 h-8 text-primary" />,
    title: "Verified Listings",
    description: "Every property is manually verified by our team, ensuring authenticity and preventing fraud.",
  },
  {
    icon: <FileText className="w-8 h-8 text-primary" />,
    title: "Document Management",
    description: "A centralized and secure place to manage all your deal-related documents, from NDAs to contracts.",
  },
  {
    icon: <MessageCircle className="w-8 h-8 text-primary" />,
    title: "Secure Messaging",
    description: "Communicate with buyers, sellers, and brokers through our encrypted messaging platform.",
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: "Broker Collaboration",
    description: "Invite and collaborate with your trusted brokers in a secure environment designed for professionals.",
  },
];

export function KeyFeatures() {
  return (
    <section id="features" className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground">Key Features</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            Everything you need for a secure and seamless real estate transaction.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-border/50 shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="p-3 bg-primary/10 rounded-full border border-primary/20">{feature.icon}</div>
                <CardTitle className="font-headline text-xl text-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
