import { FileText, Banknote, Building } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const features = [
  {
    icon: <FileText className="w-8 h-8 text-primary" />,
    title: "Title & registration",
    description: "Retrieve the official title information for a UK property and present it in a clean, standard layout.",
    details: [
      "Title number & registration date",
      "Proprietor names & addresses",
      "Tenure (freehold/leasehold)",
    ],
  },
  {
    icon: <Banknote className="w-8 h-8 text-primary" />,
    title: "Price paid history",
    description: "Access historical transaction data and basic analytics so your teams can spot trends and risks.",
    details: [
      "Last sale date & price",
      "Full transaction history",
      "Average prices in the area",
    ],
  },
  {
    icon: <Building className="w-8 h-8 text-primary" />,
    title: "Company ownership",
    description: "If a property is owned by a UK company, we'll fetch the details from Companies House.",
    details: [
      "Company name & number",
      "Director & Persons of Significant Control",
      "Registered office address",
    ],
  },
]

export function Features() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">
          What ASSETRAZ UK can verify
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          A single source of truth for property and ownership information, designed for professional workflows.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature) => (
            <Card key={feature.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <CardHeader className="flex-row items-start gap-4 space-y-0">
                 <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-lg flex-shrink-0">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl leading-tight">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow">
                <p className="text-muted-foreground">{feature.description}</p>
                 <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4 flex-grow">
                  {feature.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
