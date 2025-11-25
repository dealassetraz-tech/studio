import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="bg-background py-20 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-4xl mx-auto">
          India's Most Trusted Property Verification Platform
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          Powered by AI and secured by blockchain, ASSETRAZ delivers tamper-proof digital verification for complete peace of mind.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
            <Input 
                type="text" 
                placeholder="Enter Property ID or Address" 
                className="h-12 text-base"
            />
            <Button size="lg" className="h-12 w-full sm:w-auto">
                Verify Property Now
                <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
        </div>
      </div>
    </section>
  );
}
