
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
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
  },
  {
    title: "Ownership Stability",
    description: "No recent, rapid changes in ownership",
    points: 10,
  },
];

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
                        <p className="text-5xl font-bold text-green-600">87</p>
                        <div>
                            <p className="font-semibold text-green-600">Excellent</p>
                            <p className="text-sm text-muted-foreground">High confidence</p>
                        </div>
                    </div>
                </div>
                <CircularProgress value={87} />
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
        </div>
      </CardContent>
    </Card>
  );
}
