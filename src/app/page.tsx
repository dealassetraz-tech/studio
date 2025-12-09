import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import dynamic from "next/dynamic";

const WhyProfessionals = dynamic(() => import('@/components/why-professionals').then(mod => mod.WhyProfessionals));
const EndToEndSteps = dynamic(() => import('@/components/end-to-end-steps').then(mod => mod.EndToEndSteps));

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
