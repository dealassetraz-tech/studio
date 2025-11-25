import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Analytics } from "@/components/analytics/analytics";

export default function AnalyticsPage() {
  return (
    <div className="bg-secondary/50 text-foreground flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Analytics />
      </main>
      <Footer />
    </div>
  );
}
