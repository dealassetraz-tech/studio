
'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Handshake, Building, Users } from 'lucide-react';
import { useMemo, useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { useFirestore } from '@/firebase';

interface Property {
  id: string;
}

interface Deal {
  id: string;
}

interface User {
  id: string;
}

export default function AdminDashboard() {
  const firestore = useFirestore();
  const [propertiesCount, setPropertiesCount] = useState(0);
  const [dealsCount, setDealsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const unsubProperties = onSnapshot(collection(firestore, 'properties'), (snapshot) => {
      setPropertiesCount(snapshot.size);
      setIsLoading(false);
    });

    const unsubDeals = onSnapshot(collection(firestore, 'deals'), (snapshot) => {
      setDealsCount(snapshot.size);
    });

    const unsubUsers = onSnapshot(collection(firestore, 'users'), (snapshot) => {
      setUsersCount(snapshot.size);
    });

    return () => {
      unsubProperties();
      unsubDeals();
      unsubUsers();
    };
  }, [firestore]);

  const stats = useMemo(() => [
    {
      title: "Total Users",
      value: isLoading ? '...' : usersCount.toString(),
      icon: <Users className="w-6 h-6 text-primary" />,
      description: "All registered users.",
    },
    {
      title: "Total Properties",
      value: isLoading ? '...' : propertiesCount.toString(),
      icon: <Building className="w-6 h-6 text-amber-500" />,
      description: "All listed properties.",
    },
    {
      title: "Total Deals",
      value: isLoading ? '...' : dealsCount.toString(),
      icon: <Handshake className="w-6 h-6 text-emerald-500" />,
      description: "All deals across the platform.",
    },
  ], [usersCount, propertiesCount, dealsCount, isLoading]);

  return (
    <div className="container mx-auto px-4 py-8">
       <div className="mb-8">
          <h1 className="text-3xl font-bold font-headline">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Platform-wide monitoring and management.
          </p>
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
          <CardTitle>Welcome, Admin!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Use the sidebar to navigate through deals, approvals, and user management sections. This dashboard provides a high-level overview of the platform's activity.</p>
        </CardContent>
      </Card>
    </div>
  )
}
