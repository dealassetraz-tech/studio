
"use client";

import { Header } from "@/components/header";
import { CreditCardForm } from "@/components/payment/credit-card-form";
import { Suspense } from "react";

function CardPaymentPage() {
  return (
    <div className="bg-background text-foreground flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Suspense fallback={<div>Loading...</div>}>
            <CreditCardForm />
        </Suspense>
      </main>
    </div>
  );
}

export default CardPaymentPage;

