'use client';
import { Header } from "@/components/header";
import { VerificationReport } from "@/components/verification-report";
import { VerifyPropertyOutput } from "@/ai/flows/verify-property";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// NOTE: This is a temporary solution to display the report.
// In a real application, you would fetch the report data from a database
// using the `id` from the URL. For this demo, we are passing the data
// through client-side state, which is not persistent.

export default function ReportPage({ params }: { params: { id: string } }) {
    const [report, setReport] = useState<VerifyPropertyOutput | null>(null);
    
    // This is a workaround to get the state from the previous page.
    useEffect(() => {
       const reportData = (window as any).__ASSETRAZ_REPORT;
       if (reportData) {
            setReport(reportData);
       }
    }, [])


  return (
    <div className="bg-secondary/50 text-foreground flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12 md:py-20">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-2">
              Verification Report
            </h1>
            <p className="text-lg text-muted-foreground text-center mb-8">
              A summary of the checks performed on the property. Report ID: {params.id}
            </p>
           {report ? (
             <VerificationReport report={report} />
           ) : (
            <div className="text-center text-muted-foreground">
                <p>Report data not found. Please start a new verification.</p>
            </div>
           )}
        </div>
      </main>
    </div>
  );
}

// Another temporary solution to persist state across navigation.
if (typeof window !== 'undefined') {
  const originalPush = window.history.pushState;
  window.history.pushState = function(...args) {
    const state = args[0];
    if (state && state.report) {
        (window as any).__ASSETRAZ_REPORT = state.report;
    }
    return originalPush.apply(this, args);
  }
}
