
'use client';

import { VerifyPropertyOutput } from "@/ai/flows/verify-property";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeCheck } from "lucide-react";
import { TrustScoreAnalysis } from "./trust-score-analysis";

type VerificationReportProps = {
  report: VerifyPropertyOutput;
};

const InfoBlock = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <div className="bg-secondary/50 p-4 rounded-lg">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-semibold text-foreground">{value}</p>
    </div>
);

export function VerificationReport({ report }: VerificationReportProps) {
  // Use a placeholder if registrationDate is not available
  const registrationDate = report.ownership.registrationDate
    ? new Date(report.ownership.registrationDate).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'Not Available';
    
  return (
    <div className="max-w-4xl mx-auto space-y-8">
        {/* Verified Banner */}
        <div className="bg-green-600 text-white rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center shadow-lg">
            <div className="flex items-center gap-3">
                <BadgeCheck className="w-8 h-8" />
                <div>
                    <h2 className="font-bold text-xl">Property Verified</h2>
                    <p className="text-sm opacity-90">Verification ID: {report.verificationId}</p>
                </div>
            </div>
             <div className="text-sm mt-2 sm:mt-0 sm:text-right">
                <p className="font-semibold">Verified on</p>
                <p className="opacity-90">{new Date(report.timestamp).toLocaleString('en-GB')}</p>
            </div>
        </div>

        {/* Property Information */}
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle>Property Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                    <InfoBlock label="Title Number" value={report.propertyDetails.titleNumber} />
                    <InfoBlock label="Tenure Type" value={report.propertyDetails.tenure} />
                </div>
                <InfoBlock label="Property Address" value={report.propertyDetails.address} />
            </CardContent>
        </Card>

        {/* Current Ownership */}
         <Card className="shadow-lg">
            <CardHeader>
                <CardTitle>Current Ownership</CardTitle>
            </CardHeader>
            <CardContent>
                 <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                        <div>
                            <p className="text-sm text-muted-foreground">Registered Proprietor</p>
                            <p className="font-bold text-lg text-foreground">{report.ownership.proprietors[0] || 'N/A'}</p>
                        </div>
                         <div>
                            <p className="text-sm text-muted-foreground">Registration Date</p>
                            <p className="font-bold text-lg text-foreground">{registrationDate}</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Proprietor Address</p>
                        <p className="font-semibold text-foreground">{report.propertyDetails.address}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
        
         {/* Trust Score Analysis */}
        <TrustScoreAnalysis />

    </div>
  );
}
