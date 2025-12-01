import { FileText, Banknote, Building, Search, GitBranch, FileJson } from "lucide-react";

const features = [
  {
    icon: <FileText className="w-8 h-8 text-primary" />,
    title: "Title & registration",
    description: "Verify that a property exists at the UK Land Registry and see current title & ownership details.",
  },
  {
    icon: <Banknote className="w-8 h-8 text-primary" />,
    title: "Price paid history",
    description: "Access historical transaction data and basic analytics so your teams can spot anomalies early.",
  },
  {
    icon: <Building className="w-8 h-8 text-primary" />,
    title: "Company ownership",
    description: "When the proprietor is a company, ASSETRAZ pulls company records and shows the ownership structure.",
  },
  {
    icon: <Search className="w-8 h-8 text-primary" />,
    title: "Deeper visibility",
    description: "Support AML and compliance checks with a single source of truth for property and ownership information.",
  },
  {
    icon: <GitBranch className="w-8 h-8 text-primary" />,
    title: "Auditable outputs",
    description: "Every check has an ID, timestamp and trail, giving you a permanent record for compliance.",
  },
  {
    icon: <FileJson className="w-8 h-8 text-primary" />,
    title: "Reports & API payloads",
    description: "Each verification produces both human-readable and machine-readable outputs, so you can store them in files or systems.",
  },
];

export function Features() {
  return (
    <div className="bg-background text-foreground">
        <div className="container mx-auto px-4 py-12 md:py-20">
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h1 className="text-4xl md:text-5xl font-bold">
                What ASSETRAZ UK can verify
                </h1>
                <p className="text-lg text-muted-foreground mt-2">
                A single source of truth for property and ownership information, designed for professional workflows.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature) => (
                    <div key={feature.title} className="bg-secondary/30 rounded-xl p-8 shadow-lg transition-shadow hover:shadow-xl flex flex-col">
                        <div className="flex-shrink-0 w-12 h-12 mb-6 bg-primary/10 rounded-lg flex items-center justify-center">
                            {feature.icon}
                        </div>
                        <h2 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h2>
                        <p className="text-muted-foreground flex-grow">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}
