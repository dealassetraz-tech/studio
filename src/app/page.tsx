import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { DataSources } from "@/components/data-sources";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <DataSources />
      </main>
      <Footer />
    </div>
  );
}
