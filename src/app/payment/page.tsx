import { Header } from "@/components/header";
import { PricingPage } from "@/components/pricing-page";

export default function PaymentPage() {
  return (
    <div className="bg-background text-foreground flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <PricingPage />
      </main>
    </div>
  );
}
