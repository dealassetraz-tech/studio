"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';

const testimonials = [
  {
    name: "Sarah L.",
    role: "Real Estate Investor",
    testimonial: "DealLock has revolutionized how I handle my property acquisitions. The security and verification features are second to none. I can't imagine going back.",
    rating: 5,
    image: {
      src: placeholderImages.testimonials[0].src,
      "data-ai-hint": placeholderImages.testimonials[0].hint
    },
  },
  {
    name: "Michael B.",
    role: "Commercial Broker",
    testimonial: "As a broker, DealLock gives me the confidence that both sides of the transaction are protected. It's an essential tool for any serious professional in the industry.",
    rating: 5,
     image: {
      src: placeholderImages.testimonials[1].src,
      "data-ai-hint": placeholderImages.testimonials[1].hint
    },
  },
  {
    name: "Jessica P.",
    role: "First-time Seller",
    testimonial: "Selling my property felt daunting, but DealLock made it so simple and secure. The peace of mind knowing everything was verified was priceless.",
    rating: 5,
     image: {
      src: placeholderImages.testimonials[2].src,
      "data-ai-hint": placeholderImages.testimonials[2].hint
    },
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-12 md:py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground">What Our Users Say</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            Real stories from professionals and individuals who trust DealLock.
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="h-full border-border/50 shadow-lg flex flex-col">
                    <CardContent className="p-6 flex-grow flex flex-col">
                      <div className="flex items-center mb-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-primary/50">
                           <Image 
                            src={testimonial.image.src} 
                            alt={testimonial.name}
                            width={100} 
                            height={100}
                            data-ai-hint={testimonial.image['data-ai-hint']}
                          />
                        </div>
                        <div>
                          <p className="font-bold text-foreground">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                      <div className="flex mb-4">
                        {Array(testimonial.rating).fill(0).map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-primary fill-primary" />
                        ))}
                      </div>
                      <blockquote className="text-foreground flex-grow">
                        "{testimonial.testimonial}"
                      </blockquote>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}
