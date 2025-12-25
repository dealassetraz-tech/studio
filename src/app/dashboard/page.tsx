
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Briefcase, Building, Filter, User } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { IndianRupee } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Property {
  id: string;
  address: string;
  price: number;
  status: string;
  brokerage: number;
  brokerId?: string;
  brokerAssignmentStatus?: 'pending' | 'accepted' | 'rejected';
}

interface Deal {
  id: string;
  propertyId: string;
  status: 'Active' | 'Closed' | 'Cancelled';
}

const mockProperties: Property[] = [
    { id: 'prop1', address: '101, Ocean View, Marine Drive, Mumbai', price: 150000000, status: 'Listed', brokerage: 2, brokerId: 'broker1', brokerAssignmentStatus: 'accepted' },
    { id: 'prop2', address: '2B, Green Park, Hauz Khas, Delhi', price: 85000000, status: 'Under Contract', brokerage: 1.5, brokerId: 'broker2', brokerAssignmentStatus: 'accepted' },
    { id: 'prop3', address: 'Penthouse, The Imperial, Tardeo, Mumbai', price: 300000000, status: 'Listed', brokerage: 1, brokerId: 'broker1', brokerAssignmentStatus: 'pending' },
    { id: 'prop4', address: '45, Jubilee Hills, Hyderabad', price: 120000000, status: 'Sold', brokerage: 2.5, brokerId: 'broker3', brokerAssignmentStatus: 'accepted' },
];

const mockDeals: Deal[] = [
    { id: 'deal1', propertyId: 'prop1', status: 'Active' },
    { id: 'deal2', propertyId: 'prop2', status: 'Active' },
    { id: 'deal3', propertyId: 'prop4', status: 'Closed' },
];

const mockBrokers = [
    { id: 'broker1', fullName: 'Rajesh Sharma', photoURL: 'https://picsum.photos/seed/broker1/100/100' },
    { id: 'broker2', fullName: 'Sunita Singh', photoURL: 'https://picsum.photos/seed/broker2/100/100' },
    { id: 'broker3', fullName: 'Amit Patel', photoURL: 'https://picsum.photos/seed/broker3/100/100' },
];


export default function SellerDashboard() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [brokers, setBrokers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
        setProperties(mockProperties);
        setDeals(mockDeals);
        setBrokers(mockBrokers);
        setIsLoading(false);
    }, 1000);
  }, []);

  
  const brokersMap = useMemo(() => {
    if (!brokers) return new Map();
    return new Map(brokers.map(b => [b.id, b]));
  }, [brokers]);


  const [priceFilter, setPriceFilter] = useState<number[]>([200000000]);
  const [brokerageFilter, setBrokerageFilter] = useState<number[]>([5]);


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

  const filteredProperties = useMemo(() => {
      if (!properties) return [];
      return properties.filter(prop => {
          const priceMatch = prop.price <= priceFilter[0];
          const brokerageMatch = prop.brokerage <= brokerageFilter[0];
          return priceMatch && brokerageMatch;
      });
  }, [properties, priceFilter, brokerageFilter]);

  const formatPrice = (value: number) => {
    if (value >= 10000000) {
        return `${(value / 10000000).toFixed(1)} Cr`;
    }
    return `${(value / 100000).toFixed(0)} L`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
        case 'pending': return <Badge variant="outline" className="text-amber-500 border-amber-500/50">Pending</Badge>;
        case 'accepted': return <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Accepted</Badge>;
        case 'rejected': return <Badge variant="destructive">Rejected</Badge>;
        default: return <Badge variant="secondary">{status}</Badge>;
    }
  };


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-headline">Seller Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your properties and deals
          </p>
        </div>
        <Button asChild>
          <Link href="/add-property">+ Add Property</Link>
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
              {stat.isLoading ? (
                <div className="h-8 w-24 bg-muted animate-pulse rounded-md" />
              ) : (
                <div className="text-2xl font-bold">{stat.value}</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      
       <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary" />
            <CardTitle>Filters</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="price-filter">Max Expected Price (₹)</Label>
            <div className="flex items-center gap-4 pt-2">
                <Slider
                    id="price-filter"
                    min={5000000}
                    max={200000000}
                    step={1000000}
                    value={priceFilter}
                    onValueChange={setPriceFilter}
                />
                <span className="text-lg font-semibold w-24 text-right">{formatPrice(priceFilter[0])}</span>
             </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="brokerage-filter">Max Broker Percentage (%)</Label>
             <div className="flex items-center gap-4 pt-2">
                <Slider
                    id="brokerage-filter"
                    min={0}
                    max={5}
                    step={0.5}
                    value={brokerageFilter}
                    onValueChange={setBrokerageFilter}
                />
                <span className="text-lg font-semibold w-12 text-right">{brokerageFilter[0]}%</span>
             </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>My Properties</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
             <div className="space-y-4">
                <div className="h-16 bg-muted animate-pulse rounded-md" />
                <div className="h-16 bg-muted animate-pulse rounded-md" />
                <div className="h-16 bg-muted animate-pulse rounded-md" />
             </div>
          ) : filteredProperties && filteredProperties.length > 0 ? (
            <ul className="space-y-4">
              {filteredProperties.map(prop => (
                <li key={prop.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <Building className="w-6 h-6 text-primary" />
                    <div>
                      <p className="font-semibold">{prop.address}</p>
                      <p className="text-sm text-muted-foreground">₹{prop.price.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                         {prop.brokerId && brokersMap.get(prop.brokerId) ? (
                            <>
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={brokersMap.get(prop.brokerId)?.photoURL || ''} />
                                    <AvatarFallback>{brokersMap.get(prop.brokerId)?.fullName?.[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-medium text-foreground">{brokersMap.get(prop.brokerId)?.fullName}</p>
                                    <p className="text-xs text-muted-foreground">Broker</p>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback><User className="w-4 h-4" /></AvatarFallback>
                                </Avatar>
                                <p className="text-sm text-muted-foreground">No Broker Assigned</p>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-4 w-48 justify-end">
                        {prop.brokerAssignmentStatus && (
                            <div className="text-center">
                                {getStatusBadge(prop.brokerAssignmentStatus)}
                                <p className="text-xs text-muted-foreground mt-1">Assignment</p>
                            </div>
                        )}
                        <div className="text-center">
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                prop.status === 'Listed' ? 'bg-primary/10 text-primary' :
                                prop.status === 'Under Contract' ? 'bg-amber-500/10 text-amber-500' :
                                'bg-emerald-500/10 text-emerald-500'
                            }`}>{prop.status}</span>
                            <p className="text-xs text-muted-foreground mt-1">Property</p>
                        </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="h-64 flex items-center justify-center">
              <p className="text-muted-foreground">
                {properties && properties.length > 0 ? 'No properties match the current filters.' : 'You have not listed any properties yet.'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
