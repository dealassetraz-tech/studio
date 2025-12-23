"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4 text-center">
        <div className="inline-flex items-center justify-center bg-secondary text-secondary-foreground rounded-full px-4 py-2 mb-6 border">
            <Star className="w-4 h-4 mr-2 text-primary fill-primary" />
            <span className="text-sm">Trusted by 1,000+ brokers and investors across India</span>
        </div>
        <h1 className="font-headline text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            The Secure Way to Finalize
            <br />
            <span className="text-primary">Real Estate Deals in India</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            The only platform where sellers, buyers, and brokers connect with verified listings. Every transaction is protected, every detail is private.
        </p>
        <div className="flex items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/signup">
                  Start Free Today
                  <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
