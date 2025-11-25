"use client";

import { Button } from "@/components/ui/button";
import { StatsCards } from "./stats-cards";
import { RecentActivity } from "./recent-activity";

export function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8">
            <div>
                <h1 className="text-3xl md:text-4xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground mt-1">
                    Monitor your verification activities and system performance
                </p>
            </div>
            <div className="flex items-center gap-4 mt-4 sm:mt-0">
                <Button>View All Results</Button>
                <p className="text-sm text-muted-foreground hidden md:block">
                    Last updated: 25 Nov 2025, 10:30 pm
                </p>
            </div>
        </div>
        <StatsCards />
        <RecentActivity />
        <p className="text-sm text-muted-foreground text-center mt-4 md:hidden">
            Last updated: 25 Nov 2025, 10:30 pm
        </p>
    </div>
  );
}
