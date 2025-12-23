'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Handshake, Wallet, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function BrokerDashboard() {

  const stats = [
    {
      title: "Active Deals",
      value: "5",
      icon: <Handshake className="w-6 h-6 text-amber-500" />,
      description: "Deals you are currently managing.",
    },
    {
      title: "Potential Commission",
      value: "₹12,50,000",
      icon: <Wallet className="w-6 h-6 text-primary" />,
      description: "Estimated earnings from active deals.",
    },
    {
      title: "Average Commission",
      value: "1.8%",
      icon: <Percent className="w-6 h-6 text-emerald-500" />,
      description: "Your average commission rate.",
    },
  ];

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
          <CardTitle>Welcome, Broker!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This is your professional dashboard. Use the links in the sidebar to manage deals, view properties, and track your commissions.</p>
        </CardContent>
      </Card>
    </div>
  )
}
