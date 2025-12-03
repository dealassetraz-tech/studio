import { Header } from "@/components/header";
import { PaymentForm } from "@/components/payment-form";
import { Suspense } from "react";

function PaymentContent() {
    return (
        <div className="bg-secondary/50 text-foreground flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow flex items-center justify-center">
                <PaymentForm />
            </main>
        </div>
    );
}

export default function PaymentPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PaymentContent />
        </Suspense>
    );
}
