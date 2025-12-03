
import { Header } from "@/components/header";
import { PaymentOptionsPage } from "@/components/payment-options-page";

export default function PaymentOptions() {
  return (
    <div className="bg-background text-foreground flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <PaymentOptionsPage />
      </main>
    </div>
  );
}
