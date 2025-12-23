"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Home, Briefcase } from "lucide-react";

const stats = [
  {
    title: "Total Properties",
    value: "0",
    icon: <Home className="w-6 h-6 text-primary" />,
  },
  {
    title: "Active Deals",
    value: "0",
    icon: <Briefcase className="w-6 h-6 text-yellow-500" />,
  },
  {
    title: "Total Value",
    value: "$0",
    icon: <DollarSign className="w-6 h-6 text-green-500" />,
  },
];

export default function SellerDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-headline">Seller Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your properties and deals
          </p>
        </div>
        <Button>+ Add Property</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center">
          <p className="text-muted-foreground">
            No recent activity. Start by adding a property!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
