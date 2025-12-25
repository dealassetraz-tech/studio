
'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Handshake, Heart, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function BuyerDashboard() {
    const [dealsLoading, setDealsLoading] = useState(true);
    const [userLoading, setUserLoading] = useState(true);
    const [wishlistCount, setWishlistCount] = useState(0);
    const [activeOffersCount, setActiveOffersCount] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            setWishlistCount(3);
            setActiveOffersCount(2);
            setUserLoading(false);
            setDealsLoading(false);
        }, 1000);
    }, []);

  const stats = [
    {
      title: "Active Offers",
      value: dealsLoading ? '...' : activeOffersCount.toString(),
      icon: <Handshake className="w-6 h-6 text-amber-500" />,
      description: "Offers you've made",
    },
    {
      title: "Saved Properties",
      value: userLoading ? '...' : wishlistCount.toString(),
      icon: <Heart className="w-6 h-6 text-rose-500" />,
      description: "Properties you're watching",
    },
    {
      title: "Properties Viewed",
      value: "28", // This would likely come from another data source
      icon: <Search className="w-6 h-6 text-primary" />,
      description: "Properties you've explored",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
       <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-headline">Buyer Dashboard</h1>
          <p className="text-muted-foreground">
            Your journey to finding the perfect property starts here.
          </p>
        </div>
        <Button asChild>
          <Link href="/buyer-dashboard/browse-properties">
            <Search className="mr-2 h-4 w-4" /> Browse Properties
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
          <CardTitle>Welcome, Buyer!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This is your personal dashboard. Use the links in the sidebar to browse properties, view your active deals, and manage your account settings.</p>
        </CardContent>
      </Card>
    </div>
  )
}
