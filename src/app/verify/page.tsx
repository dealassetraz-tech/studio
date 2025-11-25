import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { VerificationForm } from "@/components/verification-form";

export default function VerifyPage() {
  return (
    <div className="bg-background text-foreground flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <VerificationForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
