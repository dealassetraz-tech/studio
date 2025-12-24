import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FileUp, Bot, Settings, KeyRound, FileSearch, Signature, TriangleAlert, CalendarClock, Info, ShieldCheck, Wallet, History, BellRing, CheckCircle2 } from "lucide-react";

const registrationSteps = [
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

const verificationSteps = [
  {
    icon: <FileSearch className="w-6 h-6 text-primary" />,
    title: "Document Review",
    description: "Admin verifies authenticity, checks compliance with network standards, and validates all parties.",
  },
  {
    icon: <Signature className="w-6 h-6 text-primary" />,
    title: "Signature Collection",
    description: "Buyer, seller, and required parties digitally sign. Each signature updates the token lock state.",
  },
  {
    icon: <TriangleAlert className="w-6 h-6 text-primary" />,
    title: "Contingency Tracking",
    description: "Monitor inspection, financing, and title contingencies. Lock remains until all conditions satisfied.",
  },
    {
    icon: <CalendarClock className="w-6 h-6 text-primary" />,
    title: "Milestone Updates",
    description: "Real-time status updates notify all parties. Automated reminders prevent delays.",
  },
];

const closureSteps = [
    {
        icon: <ShieldCheck className="w-6 h-6 text-primary" />,
        title: "Final Admin Approval",
        description: "Administrator confirms all documentation is complete and accurate, triggering token unlock.",
    },
    {
        icon: <Wallet className="w-6 h-6 text-primary" />,
        title: "Commission Distribution",
        description: "Automated payments to broker, referral partners, and transaction coordinators per agreement.",
    },
    {
        icon: <History className="w-6 h-6 text-primary" />,
        title: "Audit Trail",
        description: "Complete transaction history recorded with timestamps, signatures, and all document versions.",
    },
    {
        icon: <BellRing className="w-6 h-6 text-primary" />,
        title: "Completion Notifications",
        description: "All parties receive confirmation with payment details, tax documents, and receipt records.",
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
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Step 1 */}
            <div className="flex items-start gap-8">
                <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground text-xl font-bold border-4 border-background ring-4 ring-primary">
                        1
                    </div>
                    <div className="w-px h-full bg-border my-4" />
                </div>
                <div className="flex-1 pb-8">
                    <h3 className="text-2xl font-headline font-semibold text-foreground mb-2">Deal Registration & Initial Submission</h3>
                    <p className="text-muted-foreground mb-8">
                        Brokers initiate the deal process through our secure platform, submitting comprehensive documentation and deal parameters.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {registrationSteps.map((step, index) => (
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
            {/* Step 2 */}
            <div className="flex items-start gap-8">
                <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground text-xl font-bold border-4 border-background ring-4 ring-primary">
                        2
                    </div>
                    <div className="w-px h-full bg-border my-4" />
                </div>
                <div className="flex-1 pb-8">
                    <h3 className="text-2xl font-headline font-semibold text-foreground mb-2">Multi-Party Verification & Approval Workflow</h3>
                    <p className="text-muted-foreground mb-8">
                        Administrator and designated parties review all deal components. Token lock ensures funds remain secured throughout the verification process.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {verificationSteps.map((step, index) => (
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
                     <Alert className="mt-8 bg-blue-900/10 border-blue-500/20 text-blue-300">
                        <Info className="h-4 w-4 text-blue-400" />
                        <AlertDescription>
                           <span className="font-bold text-blue-300">Key Protection:</span> Token lock mechanism ensures funds cannot be released without explicit administrator approval AND completion of all required signatures. No premature payouts possible.
                        </AlertDescription>
                    </Alert>
                </div>
            </div>
            {/* Step 3 */}
            <div className="flex items-start gap-8">
                <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground text-xl font-bold border-4 border-background ring-4 ring-primary">
                        3
                    </div>
                </div>
                <div className="flex-1 pb-8">
                    <h3 className="text-2xl font-headline font-semibold text-foreground mb-2">Closure Verification & Automated Payout</h3>
                    <p className="text-muted-foreground mb-8">
                        Final verification confirms successful closure. System automatically releases funds to all parties according to agreed terms.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {closureSteps.map((step, index) => (
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
                    <Alert className="mt-8 bg-emerald-900/20 border-emerald-500/20 text-emerald-300">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        <AlertDescription>
                           <span className="font-bold text-emerald-300">Complete Transparency:</span> Every action is logged and visible to authorized parties. Dispute resolution supported by comprehensive documentation trail.
                        </AlertDescription>
                    </Alert>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
