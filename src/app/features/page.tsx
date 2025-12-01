import { Header } from "@/components/header";
import { Features } from "@/components/features";

export default function FeaturesPage() {
  return (
    <div className="bg-background text-foreground flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Features />
      </main>
    </div>
  );
}
