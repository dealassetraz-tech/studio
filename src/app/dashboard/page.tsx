import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Dashboard } from "@/components/dashboard/dashboard";

export default function DashboardPage() {
  return (
    <div className="bg-secondary/50 text-foreground flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Dashboard />
      </main>
      <Footer />
    </div>
  );
}
