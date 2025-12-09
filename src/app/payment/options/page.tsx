
"use client";

import { Header } from "@/components/header";
import { PaymentOptionsPage as PaymentOptionsComponent } from "@/components/payment-options-page";
import { Suspense } from "react";

function PaymentOptions() {
  return (
    <div className="bg-background text-foreground flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Suspense fallback={<div>Loading payment options...</div>}>
            <PaymentOptionsComponent />
        </Suspense>
      </main>
    </div>
  );
}

export default PaymentOptions;
