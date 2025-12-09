
"use client";

import { Header } from "@/components/header";
import { UpiForm } from "@/components/payment/upi-form";
import { Suspense } from "react";

function UpiPaymentPage() {
  return (
    <div className="bg-background text-foreground flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Suspense fallback={<div>Loading...</div>}>
          <UpiForm />
        </Suspense>
      </main>
    </div>
  );
}

export default UpiPaymentPage;
