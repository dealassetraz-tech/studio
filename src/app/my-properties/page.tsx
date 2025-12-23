"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IndianRupee, Tag } from "lucide-react";
import placeholderImages from "@/lib/placeholder-images.json";

interface Property {
  id: string;
  address: string;
  price: number;
  status: "Listed" | "Under Contract" | "Sold";
  image: {
    src: string;
    "data-ai-hint": string;
  };
}

const mockProperties: Property[] = [
  {
    id: "prop1",
    address: "2 BHK Apartment, HSR Layout, Bengaluru",
    price: 9500000,
    status: "Listed",
    image: {
      src: placeholderImages.properties[0].src,
      "data-ai-hint": placeholderImages.properties[0].hint,
    },
  },
  {
    id: "prop2",
    address: "3 BHK Villa, Jubilee Hills, Hyderabad",
    price: 18000000,
    status: "Under Contract",
    image: {
        src: placeholderImages.properties[0].src,
        "data-ai-hint": "modern house",
    },
  },
  {
    id: "prop3",
    address: "1 RK Studio, Bandra West, Mumbai",
    price: 7200000,
    status: "Sold",
    image: {
        src: placeholderImages.properties[0].src,
        "data-ai-hint": "apartment building",
    },
  },
   {
    id: "prop4",
    address: "4 BHK Penthouse, DLF Phase 5, Gurgaon",
    price: 25000000,
    status: "Listed",
    image: {
        src: placeholderImages.properties[0].src,
        "data-ai-hint": "luxury condo",
    },
  },
];

export default function MyPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProperties(mockProperties.filter(p => p.status === 'Listed'));
      setIsLoading(false);
    }, 1000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl font-bold font-headline">My Properties</h1>
            <p className="text-muted-foreground">Manage your properties here.</p>
        </div>
        <Button>+ Add Property</Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
             <Card key={i}>
                <div className="h-48 w-full bg-muted animate-pulse rounded-t-lg" />
                <CardContent className="p-4 space-y-3">
                    <div className="h-5 w-3/4 bg-muted animate-pulse rounded-md" />
                    <div className="h-5 w-1/2 bg-muted animate-pulse rounded-md" />
                </CardContent>
             </Card>
          ))}
        </div>
      ) : properties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((prop) => (
            <Card key={prop.id} className="overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
                <div className="relative">
                    <Image
                        src={prop.image.src}
                        alt={prop.address}
                        width={600}
                        height={400}
                        className="w-full h-48 object-cover"
                        data-ai-hint={prop.image["data-ai-hint"]}
                    />
                    <div className={`absolute top-2 right-2 px-3 py-1 text-xs font-semibold rounded-full text-white ${
                      prop.status === 'Listed' ? 'bg-primary' :
                      prop.status === 'Under Contract' ? 'bg-amber-500' :
                      'bg-emerald-500'
                    }`}>{prop.status}</div>
                </div>

              <CardContent className="p-4">
                <h3 className="font-semibold text-lg truncate text-foreground">{prop.address}</h3>
                <div className="flex items-center text-muted-foreground mt-2">
                  <IndianRupee className="w-5 h-5 mr-1" /> 
                  <span className="text-xl font-bold text-foreground">
                    {prop.price.toLocaleString("en-IN")}
                  </span>
                </div>
                <Button variant="outline" className="w-full mt-4">
                    View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="h-64 flex flex-col items-center justify-center text-center bg-muted/30 rounded-lg">
          <Tag className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold text-foreground">No Active Properties</h3>
          <p className="text-muted-foreground mt-2">
            You don't have any properties listed for sale right now.
          </p>
           <Button className="mt-4">+ Add Property</Button>
        </div>
      )}
    </div>
  );
}
