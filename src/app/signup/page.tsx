import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SignupForm } from "@/components/signup-form";

export default function SignupPage() {
  return (
    <div className="bg-background text-foreground flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <SignupForm />
      </main>
      <Footer />
    </div>
  );
}
