
"use client";

import { Header } from "@/components/header";
import { VerificationForm } from "@/components/verification-form";
import { useState } from "react";
import { VerifyPropertyOutput } from "@/ai/flows/verify-property";
import { VerificationReport } from "@/components/verification-report";
import { Button } from "@/components/ui/button";
import { Download, Upload, Share2, AlertTriangle } from "lucide-react";
import { DownloadDialog } from "@/components/download-dialog";
import { ShareDialog } from "@/components/share-dialog";

export default function VerifyPage() {
  const [report, setReport] = useState<VerifyPropertyOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloadDialogOpen, setIsDownloadDialogOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);


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
                </div>
            <VerificationReport report={report} />
             <div className="max-w-4xl mx-auto mt-8">
                 <div className="flex flex-col sm:flex-row gap-4">
                    <Button onClick={() => setIsDownloadDialogOpen(true)} className="flex-1">
                        <Download className="mr-2 h-4 w-4" />
                        Download Report
                    </Button>
                    <Button onClick={() => setIsShareDialogOpen(true)} variant="outline" className="flex-1">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share Report
                    </Button>
                </div>
                <div className="mt-6 bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <div>
                        <p className="font-semibold">Demo Data</p>
                        <p className="text-sm">This is sample data for demonstration purposes. In production, this would show actual data from HM Land Registry and Companies House APIs.</p>
                    </div>
                </div>
             </div>
            </div>
        </main>
        </div>
        <DownloadDialog
            isOpen={isDownloadDialogOpen}
            onClose={() => setIsDownloadDialogOpen(false)}
            report={report}
        />
        <ShareDialog
            isOpen={isShareDialogOpen}
            onClose={() => setIsShareDialogOpen(false)}
            reportId={report.verificationId}
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
