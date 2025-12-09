
"use client";

import { Header } from "@/components/header";
import { NetBankingForm } from "@/components/payment/netbanking-form";
import { Suspense } from "react";

function NetBankingPage() {
  return (
    <div className="bg-background text-foreground flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Suspense fallback={<div>Loading...</div>}>
            <NetBankingForm />
        </Suspense>
      </main>
    </div>
  );
}

export default NetBankingPage;
