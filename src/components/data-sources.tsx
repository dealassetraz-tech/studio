"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const dataSources = [
  { name: "TNREGINET", description: "Registration Records", integrated: true },
  { name: "TN RERA", description: "Project Database", integrated: true },
  { name: "Land Records", description: "Survey Numbers", integrated: true },
  { name: "ULB Tax", description: "Property Tax", integrated: true },
  { name: "eCourts", description: "Legal Cases", integrated: true },
];

export function DataSources() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Integrated Data Sources
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {dataSources.map((source) => (
            <Card key={source.name} className="text-center shadow-md hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg">{source.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{source.description}</p>
                {source.integrated && (
                  <Badge variant="secondary">API Integrated</Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
