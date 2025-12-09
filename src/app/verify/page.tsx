
"use client";

import { Header } from "@/components/header";
import { VerificationForm } from "@/components/verification-form";
import { useState } from "react";
import { VerifyPropertyOutput } from "@/ai/flows/verify-property";
import { VerificationReport } from "@/components/verification-report";
import { Button } from "@/components/ui/button";
import { Download, Upload, Share2, AlertTriangle } from "lucide-react";
import { DownloadDialog } from "@/components/download-dialog";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";
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
  
   const generateReportText = (report: VerifyPropertyOutput): string => {
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

    return reportText;
}

  const handleDownloadPdf = () => {
    if (!report) return;
    const reportText = generateReportText(report);
    const doc = new jsPDF();
    
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(16);
    doc.text("ASSETRAZ UK - Verification Report", 14, 22);

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(12);
    const lines = doc.splitTextToSize(reportText.replace('ASSETRAZ UK - Verification Report\n====================================\n\n', ''), 180);
    doc.text(lines, 14, 35);
    
    doc.save(`verification-report-${report.verificationId}.pdf`);
  };

  const handleDownloadJson = () => {
    if (!report) return;
    const jsonString = JSON.stringify(report, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    saveAs(blob, `verification-report-${report.verificationId}.json`);
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
                    <Button onClick={handleDownloadPdf} className="flex-1">
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF Report
                    </Button>
                    <Button onClick={handleDownloadJson} variant="secondary" className="flex-1">
                        <Upload className="mr-2 h-4 w-4" />
                        Download JSON Data
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
