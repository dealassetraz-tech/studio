"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Briefcase, Building } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { IndianRupee } from "lucide-react";

interface Property {
  id: string;
  address: string;
  price: number;
  status: string;
}

interface Deal {
  id: string;
  propertyId: string;
  status: 'Active' | 'Closed' | 'Cancelled';
}

const mockProperties: Property[] = [
    { id: 'prop1', address: '123 Main St, Mumbai, MH', price: 9500000, status: 'Listed' },
    { id: 'prop2', address: '456 Market St, Bengaluru, KA', price: 18000000, status: 'Under Contract' },
    { id: 'prop3', address: '789 Oak St, Delhi, DL', price: 7200000, status: 'Sold' },
];

const mockDeals: Deal[] = [
    { id: 'deal1', propertyId: 'prop1', status: 'Active' },
    { id: 'deal2', propertyId: 'prop2', status: 'Active' },
    { id: 'deal3', propertyId: 'prop3', status: 'Closed' },
];


export default function SellerDashboard() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProperties(mockProperties);
      setDeals(mockDeals);
      setIsLoading(false);
    }, 1000); // Simulate network delay

    return () => clearTimeout(timer);
  }, []);

  const stats = useMemo(() => {
    const totalProperties = properties?.length || 0;
    const activeDeals = deals?.filter(d => d.status === 'Active').length || 0;
    const totalValue = properties?.reduce((sum, prop) => sum + prop.price, 0) || 0;

    return [
      {
        title: "Total Properties",
        value: totalProperties.toString(),
        icon: <Home className="w-6 h-6 text-primary" />,
        isLoading: isLoading,
      },
      {
        title: "Active Deals",
        value: activeDeals.toString(),
        icon: <Briefcase className="w-6 h-6 text-amber-500" />,
        isLoading: isLoading,
      },
      {
        title: "Total Value",
        value: `₹${totalValue.toLocaleString('en-IN')}`,
        icon: <IndianRupee className="w-6 h-6 text-emerald-500" />,
        isLoading: isLoading,
      },
    ];
  }, [properties, deals, isLoading]);


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
              {stat.isLoading ? (
                <div className="h-8 w-24 bg-muted animate-pulse rounded-md" />
              ) : (
                <div className="text-2xl font-bold">{stat.value}</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Properties</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
             <div className="space-y-4">
                <div className="h-12 bg-muted animate-pulse rounded-md" />
                <div className="h-12 bg-muted animate-pulse rounded-md" />
                <div className="h-12 bg-muted animate-pulse rounded-md" />
             </div>
          ) : properties && properties.length > 0 ? (
            <ul className="space-y-4">
              {properties.map(prop => (
                <li key={prop.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <Building className="w-6 h-6 text-primary" />
                    <div>
                      <p className="font-semibold">{prop.address}</p>
                      <p className="text-sm text-muted-foreground">₹{prop.price.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      prop.status === 'Listed' ? 'bg-primary/10 text-primary' :
                      prop.status === 'Under Contract' ? 'bg-amber-500/10 text-amber-500' :
                      'bg-emerald-500/10 text-emerald-500'
                    }`}>{prop.status}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="h-64 flex items-center justify-center">
              <p className="text-muted-foreground">
                No properties found. Start by adding a property!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
