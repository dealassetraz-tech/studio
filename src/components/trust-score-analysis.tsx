
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Info, Bot } from "lucide-react";
import { CircularProgress } from "./circular-progress";

const legalChecks = [
  {
    title: "HM Land Registry Verified",
    description: "Title registered since 1998, no registration gaps or irregularities",
    points: 15,
  },
  {
    title: "Clear Title",
    description: "No restrictions, charges, or legal disputes on record",
    points: 12,
  },
  {
    title: "No Mortgages/Charges",
    description: "Property is unencumbered, no outstanding mortgages or liens",
    points: 8,
  },
];

const ownershipChecks = [
  {
    title: "Identity Verified",
    description: "Owner identity cross-referenced with electoral roll and credit agencies",
    points: 10,
    icon: CheckCircle,
    iconClass: "text-green-500",
    borderClass: "border-green-500",
  },
  {
    title: "Ownership Stability",
    description: "Current owner for 6+ years, indicates genuine long-term ownership",
    points: 10,
    icon: CheckCircle,
    iconClass: "text-green-500",
    borderClass: "border-green-500",
  },
  {
    title: "Owner-Occupied Status",
    description: "Address matches proprietor address, lower fraud risk for occupied properties",
    points: 5,
    icon: Info,
    iconClass: "text-blue-500",
    borderClass: "border-blue-500",
  },
];

const transactionChecks = [
    {
        title: "Market-Aligned Pricing",
        description: "All sales within ±15% of comparable properties, no £1 transfers",
        points: 8,
    },
    {
        title: "Normal Transaction Velocity",
        description: "4 sales in 26 years (avg 6.5 years per ownership) - healthy pattern",
        points: 7,
    },
    {
        title: "SDLT Records Match",
        description: "Stamp Duty Land Tax paid correctly on all transactions",
        points: 5,
    }
]

const antiFraudChecks = [
    {
        title: "No Fraud Markers",
        description: "Property not flagged by CIFAS, Action Fraud, or police databases",
        points: 5,
    },
    {
        title: "No Repossession History",
        description: "No records of forced sales or repossessions at this address",
        points: 3,
    }
]

const additionalVerificationChecks = [
    {
        title: "Planning Permissions Valid",
        description: "No unauthorized works, all planning applications properly approved",
        points: 3,
        icon: CheckCircle,
        iconClass: "text-green-500",
        borderClass: "border-green-500",
    },
    {
        title: "Council Tax Up-to-Date",
        description: "No arrears or disputes with local authority",
        points: 3,
        icon: CheckCircle,
        iconClass: "text-green-500",
        borderClass: "border-green-500",
    },
    {
        title: "EPC Available",
        description: "Valid Energy Performance Certificate on record (Rating: C)",
        points: 2,
        icon: Info,
        iconClass: "text-blue-500",
        borderClass: "border-blue-500",
    },
]


export function TrustScoreAnalysis() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Trust Score Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-secondary/30 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <p className="text-sm text-muted-foreground">Overall Trust Score</p>
                    <div className="flex items-baseline gap-2">
                        <p className="text-5xl font-bold text-green-600">95</p>
                        <div>
                            <p className="font-semibold text-green-600">Excellent</p>
                            <p className="text-sm text-muted-foreground">High confidence</p>
                        </div>
                    </div>
                </div>
                <CircularProgress value={95} />
            </div>

            <div>
                <h3 className="text-sm font-semibold tracking-wider text-primary mb-3 flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                    LEGAL & REGISTRATION (35 POINTS)
                </h3>
                <div className="space-y-2">
                    {legalChecks.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-background rounded-md border-l-4 border-green-500">
                             <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <div>
                                    <p className="font-semibold">{item.title}</p>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                </div>
                            </div>
                            <p className="font-semibold text-green-600">+{item.points}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6">
                <h3 className="text-sm font-semibold tracking-wider text-primary mb-3 flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                    OWNERSHIP & IDENTITY (25 POINTS)
                </h3>
                 <div className="space-y-2">
                    {ownershipChecks.map((item, index) => (
                        <div key={index} className={`flex items-center justify-between p-3 bg-background rounded-md border-l-4 ${item.borderClass}`}>
                           <div className="flex items-center gap-3">
                                <item.icon className={`w-5 h-5 ${item.iconClass}`} />
                                <div>
                                    <p className="font-semibold">{item.title}</p>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                </div>
                            </div>
                            <p className={`font-semibold ${item.iconClass}`}>+{item.points}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6">
                <h3 className="text-sm font-semibold tracking-wider text-green-600 mb-3 flex items-center">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                    TRANSACTION & PRICING (20 POINTS)
                </h3>
                 <div className="space-y-2">
                    {transactionChecks.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-background rounded-md border-l-4 border-green-500">
                           <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <div>
                                    <p className="font-semibold">{item.title}</p>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                </div>
                            </div>
                            <p className="font-semibold text-green-600">+{item.points}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6">
                <h3 className="text-sm font-semibold tracking-wider text-red-600 mb-3 flex items-center">
                    <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                    ANTI-FRAUD & COMPLIANCE (8 POINTS)
                </h3>
                 <div className="space-y-2">
                    {antiFraudChecks.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-background rounded-md border-l-4 border-green-500">
                           <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <div>
                                    <p className="font-semibold">{item.title}</p>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                </div>
                            </div>
                            <p className="font-semibold text-green-600">+{item.points}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6">
                <h3 className="text-sm font-semibold tracking-wider text-orange-500 mb-3 flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                    ADDITIONAL VERIFICATION (8 POINTS)
                </h3>
                 <div className="space-y-2">
                    {additionalVerificationChecks.map((item, index) => (
                        <div key={index} className={`flex items-center justify-between p-3 bg-background rounded-md border-l-4 ${item.borderClass}`}>
                           <div className="flex items-center gap-3">
                                <item.icon className={`w-5 h-5 ${item.iconClass}`} />
                                <div>
                                    <p className="font-semibold">{item.title}</p>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                </div>
                            </div>
                            <p className={`font-semibold ${item.iconClass}`}>+{item.points}</p>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="mt-6">
                <h3 className="text-sm font-semibold tracking-wider text-green-600 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Risk Assessment: Low Risk
                </h3>
                <div className="grid sm:grid-cols-3 gap-4">
                    <div className="bg-background p-4 rounded-lg text-center">
                        <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
                        <p className="font-semibold">No Fraud Flags</p>
                        <p className="text-sm text-muted-foreground">Clean history</p>
                    </div>
                    <div className="bg-background p-4 rounded-lg text-center">
                        <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
                        <p className="font-semibold">No Disputes</p>
                        <p className="text-sm text-muted-foreground">Clear title</p>
                    </div>
                    <div className="bg-background p-4 rounded-lg text-center">
                        <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
                        <p className="font-semibold">Verified Owner</p>
                        <p className="text-sm text-muted-foreground">Identity confirmed</p>
                    </div>
                </div>
            </div>
            
            <div className="mt-8 bg-primary/5 p-6 rounded-lg border border-primary/20">
                <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                    <Bot className="w-5 h-5" />
                    AI-Powered Insights
                </h3>
                <ul className="space-y-2 text-sm list-disc list-inside text-foreground/90">
                    <li>Property has appreciated consistently above London market average (+359% vs +280% market avg)</li>
                    <li>Owner-occupied status suggests long-term stability and lower investment risk</li>
                    <li>Transaction intervals (6-7 years) indicate stable ownership patterns</li>
                    <li>Freehold tenure provides maximum ownership security and investment value</li>
                </ul>
            </div>

            <div className="mt-8 pt-6 border-t">
                <h3 className="text-lg font-semibold mb-2">Score Methodology</h3>
                <p className="text-sm text-muted-foreground mb-4">Trust Score Range: 0-100 (Higher is better)</p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-sm bg-red-500"></div>
                        <span>0-40 High Risk</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-sm bg-yellow-500"></div>
                        <span>41-60 Medium</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-sm bg-blue-500"></div>
                        <span>61-80 Good</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-sm bg-green-500"></div>
                        <span>81-100 Excellent</span>
                    </div>
                </div>
            </div>

        </div>
      </CardContent>
    </Card>
  );
}
