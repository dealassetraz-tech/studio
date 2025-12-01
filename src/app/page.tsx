import { EndToEndSteps } from "@/components/end-to-end-steps";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { WhyProfessionals } from "@/components/why-professionals";

export default function Home() {
  return (
    <div className="bg-background text-foreground flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <WhyProfessionals />
        <EndToEndSteps />
      </main>
    </div>
  );
}
