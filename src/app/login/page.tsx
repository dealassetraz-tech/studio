import { Header } from "@/components/header";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="bg-background text-foreground flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <LoginForm />
      </main>
    </div>
  );
}
