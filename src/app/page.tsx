import { FAQ } from "@/components/faq";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { KeyFeatures } from "@/components/key-features";
import { Testimonials } from "@/components/testimonials";

export default function Home() {
  return (
    <div className="bg-background text-foreground flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <HowItWorks />
        <KeyFeatures />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}