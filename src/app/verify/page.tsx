
"use client";

import { Header } from "@/components/header";
import { VerificationForm } from "@/components/verification-form";
import { useState } from "react";
import { VerifyPropertyOutput } from "@/ai/flows/verify-property";
import { VerificationReport } from "@/components/verification-report";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { DownloadDialog } from "@/components/download-dialog";

export default function VerifyPage() {
  const [report, setReport] = useState<VerifyPropertyOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloadDialogOpen, setIsDownloadDialogOpen] = useState(false);

  const handleVerification = async (data: VerifyPropertyOutput) => {
    setReport(data);
    setIsLoading(false);
  };

  if (report) {
    return (
     <>
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
                    <Button onClick={() => setIsDownloadDialogOpen(true)}>
                        <Download className="mr-2 h-4 w-4" />
                        Download Report
                    </Button>
                </div>
            <VerificationReport report={report} />
            </div>
        </main>
        </div>
        <DownloadDialog
            isOpen={isDownloadDialogOpen}
            onClose={() => setIsDownloadDialogOpen(false)}
            report={report}
        />
     </>
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
