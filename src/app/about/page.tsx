import { Header } from "@/components/header";
import { AboutPage } from "@/components/about-page";

export default function About() {
  return (
    <div className="bg-background text-foreground flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <AboutPage />
      </main>
    </div>
  );
}
