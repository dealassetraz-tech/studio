'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Handshake, Wallet, Percent, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useCollection, useFirestore, useUser, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { useMemo } from 'react';

interface Property {
  id: string;
  address: string;
  price: number;
  status: string;
  brokerage: number;
}

export default function BrokerDashboard() {
  const firestore = useFirestore();
  const { user } = useUser();

  const propertiesQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return query(
      collection(firestore, "properties"), 
      where("brokerId", "==", user.uid), 
      where("brokerAssignmentStatus", "==", "accepted")
    );
  }, [firestore, user]);

  const { data: properties, isLoading } = useCollection<Property>(propertiesQuery);

  const stats = useMemo(() => {
    const activeDeals = properties?.filter(p => p.status === 'Listed' || p.status === 'Under Contract').length || 0;
    const potentialCommission = properties?.reduce((sum, prop) => sum + (prop.price * (prop.brokerage / 100)), 0) || 0;
    const averageCommission = (properties && properties.length > 0) 
      ? (properties.reduce((sum, prop) => sum + prop.brokerage, 0) / properties.length) 
      : 0;

    return [
      {
        title: "Active Properties",
        value: isLoading ? '...' : activeDeals.toString(),
        icon: <Handshake className="w-6 h-6 text-amber-500" />,
        description: "Properties you are managing.",
      },
      {
        title: "Potential Commission",
        value: isLoading ? '...' : `₹${potentialCommission.toLocaleString('en-IN')}`,
        icon: <Wallet className="w-6 h-6 text-primary" />,
        description: "Estimated earnings from active deals.",
      },
      {
        title: "Average Commission",
        value: isLoading ? '...' : `${averageCommission.toFixed(2)}%`,
        icon: <Percent className="w-6 h-6 text-emerald-500" />,
        description: "Your average commission rate.",
      },
    ];
  }, [properties, isLoading]);

  return (
    <div className="container mx-auto px-4 py-8">
       <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-headline">Broker Dashboard</h1>
          <p className="text-muted-foreground">
            Facilitate deals and manage your portfolio.
          </p>
        </div>
        <Button asChild>
          <Link href="/broker-dashboard/managed-deals">
            <Handshake className="mr-2 h-4 w-4" /> Manage Deals
          </Link>
        </Button>
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
               <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

       <Card>
        <CardHeader>
          <CardTitle>My Accepted Properties</CardTitle>
          <CardDescription>Properties you have agreed to broker.</CardDescription>
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
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">Commission: {prop.brokerage}%</span>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        prop.status === 'Listed' ? 'bg-primary/10 text-primary' :
                        prop.status === 'Under Contract' ? 'bg-amber-500/10 text-amber-500' :
                        'bg-emerald-500/10 text-emerald-500'
                      }`}>{prop.status}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="h-40 flex items-center justify-center text-center">
              <p className="text-muted-foreground">You have not accepted any properties to broker yet. <br/> Check for pending deals.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
