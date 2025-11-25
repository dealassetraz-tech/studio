import { ShieldCheck, Cpu, Award } from "lucide-react";

export function Hero() {
  return (
    <section className="bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <ShieldCheck className="h-10 w-10 text-primary mb-4" />
            <h3 className="font-semibold mb-2">Secure Upload</h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              Upload property documents for verification through our secure platform.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Cpu className="h-10 w-10 text-primary mb-4" />
            <h3 className="font-semibold mb-2">AI Analysis</h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              Our AI engine analyzes documents across multiple government databases.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Award className="h-10 w-10 text-primary mb-4" />
            <h3 className="font-semibold mb-2">Blockchain Certificate</h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              Receive tamper-proof verification certificate secured by blockchain.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
