
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { VerifyPropertyOutput } from "@/ai/flows/verify-property";
import { FileText, FileType, FileUp } from "lucide-react";
import jsPDF from "jspdf";
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import { saveAs } from "file-saver";

type DownloadDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  report: VerifyPropertyOutput;
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

export function DownloadDialog({ isOpen, onClose, report }: DownloadDialogProps) {
    if (!report) return null;

  const handleDownload = (format: "txt" | "pdf" | "docx") => {
    if (format === 'txt') {
        const reportText = generateReportText(report);
        const blob = new Blob([reportText], { type: "text/plain;charset=utf-8" });
        saveAs(blob, `verification-report-${report.verificationId}.txt`);
    } else if (format === 'pdf') {
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
    } else if (format === 'docx') {
        const doc = new Document({
            sections: [{
                children: [
                    new Paragraph({
                        text: "ASSETRAZ UK - Verification Report",
                        heading: HeadingLevel.TITLE,
                    }),
                    new Paragraph({ text: `Report ID: ${report.verificationId}`, style: "compact" }),
                    new Paragraph({ text: `Timestamp: ${new Date(report.timestamp).toLocaleString()}`, style: "compact" }),
                    
                    new Paragraph({ text: "Property Details", heading: HeadingLevel.HEADING_1, spacing: { before: 200, after: 100 } }),
                    new Paragraph({ text: `Title Number: ${report.propertyDetails.titleNumber}`, style: "compact" }),
                    new Paragraph({ text: `Address: ${report.propertyDetails.address}`, style: "compact" }),
                    new Paragraph({ text: `Tenure: ${report.propertyDetails.tenure}`, style: "compact" }),

                    new Paragraph({ text: "Ownership", heading: HeadingLevel.HEADING_1, spacing: { before: 200, after: 100 } }),
                    new Paragraph({ text: `Ownership Type: ${report.ownership.ownershipType}`, style: "compact" }),
                    new Paragraph({ text: "Proprietors:", style: "compact" }),
                    ...report.ownership.proprietors.map(p => new Paragraph({ text: p, bullet: { level: 0 } })),

                    ...(report.companyDetails ? [
                      new Paragraph({ text: "Company Details", heading: HeadingLevel.HEADING_1, spacing: { before: 200, after: 100 } }),
                      new Paragraph({ text: `Company Name: ${report.companyDetails.companyName}`, style: "compact" }),
                      new Paragraph({ text: `Company Number: ${report.companyDetails.companyNumber}`, style: "compact" }),
                      new Paragraph({ text: "Directors:", style: "compact" }),
                      ...report.companyDetails.directors.map(d => new Paragraph({ text: d, bullet: { level: 0 } })),
                    ] : []),

                     ...(report.pricePaidHistory && report.pricePaidHistory.length > 0 ? [
                        new Paragraph({ text: "Price Paid History", heading: HeadingLevel.HEADING_1, spacing: { before: 200, after: 100 } }),
                        ...report.pricePaidHistory.map(h => new Paragraph({ text: `Date: ${new Date(h.date).toLocaleDateString()}, Price: ${h.price}`, bullet: { level: 0 }})),
                     ] : []),

                    new Paragraph({ text: "Alerts & Notices", heading: HeadingLevel.HEADING_1, spacing: { before: 200, after: 100 } }),
                    ...report.alerts.map(a => new Paragraph({ text: `[${a.level.toUpperCase()}] ${a.message}`, bullet: { level: 0 }})),
                ],
            }],
        });

        Packer.toBlob(doc).then(blob => {
            saveAs(blob, `verification-report-${report.verificationId}.docx`);
        });
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Choose Download Format</DialogTitle>
          <DialogDescription>
            Select the file format for your verification report.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
            <Button variant="outline" onClick={() => handleDownload('txt')}>
                <FileText className="mr-2"/> TXT
            </Button>
            <Button variant="outline" onClick={() => handleDownload('pdf')}>
                <FileType className="mr-2"/> PDF
            </Button>
             <Button variant="outline" onClick={() => handleDownload('docx')}>
                <FileUp className="mr-2"/> DOCX
            </Button>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
