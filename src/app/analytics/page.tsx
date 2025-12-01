import { Header } from "@/components/header";
import { Analytics } from "@/components/analytics/analytics";

export default function AnalyticsPage() {
  return (
    <div className="bg-secondary/50 text-foreground flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Analytics />
      </main>
    </div>
  );
}
