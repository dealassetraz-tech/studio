
"use client";

import { Header } from "@/components/header";
import { VerificationForm } from "@/components/verification-form";
import { useState } from "react";
import { VerifyPropertyOutput } from "@/ai/flows/verify-property";
import { VerificationReport } from "@/components/verification-report";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function VerifyPage() {
  const [report, setReport] = useState<VerifyPropertyOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVerification = async (data: VerifyPropertyOutput) => {
    setReport(data);
    setIsLoading(false);
  };
  
  const handleDownload = () => {
    if (!report) return;

    let reportText = `ASSETRAZ UK - Verification Report\n`;
    reportText += `====================================\n\n`;
    reportText += `Report ID: ${report.verificationId}\n`;
    reportText += `Timestamp: ${new Date(report.timestamp).toLocaleString()}\n\n`;

    reportText += `--- Property Details ---\n`;
    reportText += `Title Number: ${report.propertyDetails.titleNumber}\n`;
    reportText += `Address: ${report.propertyDetails.address}\n`;
    reportText += `Tenure: ${report.propertyDetails.tenure}\n\n`;

    reportText += `--- Ownership ---\n`;
    reportText += `Ownership Type: ${report.ownership.ownershipType}\n`;
    reportText += `Proprietors:\n`;
    report.ownership.proprietors.forEach(p => {
      reportText += `  - ${p}\n`;
    });
    reportText += `\n`;

    if (report.companyDetails) {
      reportText += `--- Company Details ---\n`;
      reportText += `Company Name: ${report.companyDetails.companyName}\n`;
      reportText += `Company Number: ${report.companyDetails.companyNumber}\n`;
      reportText += `Directors:\n`;
      report.companyDetails.directors.forEach(d => {
        reportText += `  - ${d}\n`;
      });
      reportText += `\n`;
    }

    if (report.pricePaidHistory && report.pricePaidHistory.length > 0) {
      reportText += `--- Price Paid History ---\n`;
      report.pricePaidHistory.forEach(h => {
        reportText += `Date: ${new Date(h.date).toLocaleDateString()}, Price: ${h.price}\n`;
      });
      reportText += `\n`;
    }

    reportText += `--- Alerts & Notices ---\n`;
    report.alerts.forEach(a => {
      reportText += `[${a.level.toUpperCase()}] ${a.message}\n`;
    });
    
    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `verification-report-${report.verificationId}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (report) {
    return (
     <div className="bg-secondary/50 text-foreground flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12 md:py-20">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
               <div>
                 <h1 className="text-4xl md:text-5xl font-bold text-left">
                  Verification Report
                </h1>
                <p className="text-lg text-muted-foreground text-left mt-1">
                  A summary of the checks performed on the property.
                </p>
               </div>
                <Button onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" />
                    Download Report
                </Button>
            </div>
           <VerificationReport report={report} />
        </div>
      </main>
    </div>
    )
  }

  return (
    <div className="bg-secondary/50 text-foreground flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h1 className="text-4xl md:text-5xl font-bold">
              Property Verification
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Enter property details to run a verification.
            </p>
          </div>
          <VerificationForm onVerify={handleVerification} setIsLoading={setIsLoading} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
}
