import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { DataSources } from "@/components/data-sources";
import { Footer } from "@/components/footer";
import { HowItWorks } from "@/components/how-it-works";

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <DataSources />
      </main>
      <Footer />
    </div>
  );
}
