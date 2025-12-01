
"use client";

import { Header } from "@/components/header";
import { VerificationForm } from "@/components/verification-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { VerifyPropertyOutput } from "@/ai/flows/verify-property";
import { VerificationReport } from "@/components/verification-report";

export default function VerifyPage() {
  const [report, setReport] = useState<VerifyPropertyOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleVerification = async (data: VerifyPropertyOutput) => {
    setReport(data);
    setIsLoading(false);
    // This is a temporary way to show the report. 
    // In a real app, you would likely save the report and get an ID.
    const reportId = data.propertyDetails.titleNumber || 'report';
    router.push(`/verify/report/${reportId}`, { scroll: false });
  };
  
  if (report) {
    return (
     <div className="bg-secondary/50 text-foreground flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12 md:py-20">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-2">
              Verification Report
            </h1>
            <p className="text-lg text-muted-foreground text-center mb-8">
              A summary of the checks performed on the property.
            </p>
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
