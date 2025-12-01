import { Header } from "@/components/header";
import { AuthForm } from "@/components/auth-form";

export default function AuthPage() {
  return (
    <div className="bg-background text-foreground flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <AuthForm />
      </main>
    </div>
  );
}
