import { Header } from "@/components/header";
import { VerificationForm } from "@/components/verification-form";

export default function VerifyPage() {
  return (
    <div className="bg-secondary/50 text-foreground flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h1 className="text-4xl md:text-5xl font-bold">
              Demo: Property Verification
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Enter sample details to see how the verification flow and report layout would look.
            </p>
          </div>
          <VerificationForm />
        </div>
      </main>
    </div>
  );
}
