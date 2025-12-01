import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { HowItWorksNew } from "./how-it-works-new";

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-[#1E2A78] to-[#6042A4] min-h-screen flex items-center justify-center pt-24 pb-20 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url(/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="container mx-auto px-4 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <div className="text-sm font-medium text-purple-300 mb-4">
              UK Property • Land Registry • Companies House
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Verify UK property & ownership before the deal moves.
            </h1>
            <p className="text-lg md:text-xl text-purple-200 mb-10 max-w-xl mx-auto md:mx-0">
              ASSETRAZ UK connects to official sources to confirm that a property exists, who owns it, and what its history looks like – in one standardised report for agents, platforms and professionals.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <Button size="lg" className="h-12 w-full sm:w-auto bg-white text-background hover:bg-gray-200" asChild>
                <Link href="/verify">
                  Start a demo verification
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 w-full sm:w-auto text-white border-white/50 hover:bg-white/10 hover:text-white" asChild>
                <Link href="#how-it-works">
                  See how it works
                </Link>
              </Button>
            </div>
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center md:text-left">
                <div>
                    <h3 className="font-bold text-white text-lg">Single view</h3>
                    <p className="text-purple-200 text-sm">Title, owner & price history in one report.</p>
                </div>
                <div>
                    <h3 className="font-bold text-white text-lg">Official data</h3>
                    <p className="text-purple-200 text-sm">Powered by UK government data sources.</p>
                </div>
                <div>
                    <h3 className="font-bold text-white text-lg">For pros</h3>
                    <p className="text-purple-200 text-sm">Built for agents, conveyancers & platforms.</p>
                </div>
            </div>
          </div>
          <div>
            <HowItWorksNew />
          </div>
        </div>
      </div>
    </section>
  );
}
