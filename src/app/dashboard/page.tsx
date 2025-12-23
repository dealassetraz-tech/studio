"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCollection, useFirestore, useUser, useMemoFirebase } from "@/firebase";
import { collection, query, where } from "firebase/firestore";
import { DollarSign, Home, Briefcase, Building } from "lucide-react";
import { useMemo } from "react";

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

export default function SellerDashboard() {
  const { user } = useUser();
  const firestore = useFirestore();

  const propertiesQuery = useMemoFirebase(
    () =>
      user
        ? query(collection(firestore, "properties"), where("ownerId", "==", user.uid))
        : null,
    [firestore, user]
  );
  const { data: properties, isLoading: isLoadingProperties } = useCollection<Property>(propertiesQuery);

  const dealsQuery = useMemoFirebase(
    () =>
      user
        ? query(collection(firestore, "deals"), where("sellerId", "==", user.uid))
        : null,
    [firestore, user]
  );
  const { data: deals, isLoading: isLoadingDeals } = useCollection<Deal>(dealsQuery);

  const stats = useMemo(() => {
    const totalProperties = properties?.length || 0;
    const activeDeals = deals?.filter(d => d.status === 'Active').length || 0;
    const totalValue = properties?.reduce((sum, prop) => sum + prop.price, 0) || 0;

    return [
      {
        title: "Total Properties",
        value: totalProperties.toString(),
        icon: <Home className="w-6 h-6 text-primary" />,
        isLoading: isLoadingProperties,
      },
      {
        title: "Active Deals",
        value: activeDeals.toString(),
        icon: <Briefcase className="w-6 h-6 text-yellow-500" />,
        isLoading: isLoadingDeals,
      },
      {
        title: "Total Value",
        value: `$${totalValue.toLocaleString()}`,
        icon: <DollarSign className="w-6 h-6 text-green-500" />,
        isLoading: isLoadingProperties,
      },
    ];
  }, [properties, deals, isLoadingProperties, isLoadingDeals]);


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
        <CardContent className="h-auto">
          {isLoadingProperties ? (
             <div className="space-y-4">
                <div className="h-12 bg-muted animate-pulse rounded-md" />
                <div className="h-12 bg-muted animate-pulse rounded-md" />
                <div className="h-12 bg-muted animate-pulse rounded-md" />
             </div>
          ) : properties && properties.length > 0 ? (
            <ul className="space-y-4">
              {properties.map(prop => (
                <li key={prop.id} className="flex items-center justify-between p-4 bg-accent rounded-lg">
                  <div className="flex items-center gap-4">
                    <Building className="w-6 h-6 text-primary" />
                    <div>
                      <p className="font-semibold">{prop.address}</p>
                      <p className="text-sm text-muted-foreground">${prop.price.toLocaleString()}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">{prop.status}</span>
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
