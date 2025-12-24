'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Building, User, Info } from 'lucide-react';
import placeholderImages from '@/lib/placeholder-images.json';

type DealStatus = 'Pending' | 'Accepted' | 'Rejected' | 'Active' | 'Closed' | 'Cancelled';

interface Property {
  id: string;
  ownerId: string;
  address: string;
  image: string;
}

interface Deal {
  id: string;
  propertyId: string;
  broker: {
    name: string;
    avatar: string;
  };
  offerPrice: number;
  status: DealStatus;
  date: string;
}

// Assume this is the logged-in buyer's user ID / name
const currentBuyerName = 'Rohan Mehta'; 

const mockProperties: Property[] = [
  { id: 'prop1', ownerId: 'seller1', address: '2 BHK Apartment, HSR Layout, Bengaluru', image: placeholderImages.properties[0].src, },
  { id: 'prop2', ownerId: 'seller2', address: '4 BHK Penthouse, DLF Phase 5, Gurgaon', image: 'https://picsum.photos/seed/property4/100/100', },
];


const mockDeals: Deal[] = [
  {
    id: 'deal1',
    propertyId: 'prop1',
    broker: {
      name: 'Ramesh K.',
      avatar: placeholderImages.testimonials[1].src,
    },
    offerPrice: 9300000,
    status: 'Pending',
    date: '2023-10-28',
  },
  {
    id: 'deal4',
    propertyId: 'prop2',
     broker: {
      name: 'Sunita M.',
      avatar: placeholderImages.testimonials[2].src,
    },
    offerPrice: 24000000,
    status: 'Accepted',
    date: '2023-10-29',
  },
];


interface DisplayDeal extends Deal {
    property: {
        address: string;
        image: string;
    };
}

export default function BuyerDealsPage() {
  const [deals, setDeals] = useState<DisplayDeal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      // In a real app, you'd filter by buyerId. Here we just show all for demo.
      const buyerDeals = mockDeals
        .map(deal => {
            const property = mockProperties.find(p => p.id === deal.propertyId)!;
            return {
                ...deal,
                property: {
                    address: property.address,
                    image: property.image
                }
            }
        });

      setDeals(buyerDeals);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);


  const getStatusBadge = (status: DealStatus) => {
    switch (status) {
      case 'Pending':
        return <Badge variant="outline" className="text-amber-500 border-amber-500/50">Pending Seller Review</Badge>;
      case 'Accepted':
        return <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border border-primary/50">Accepted</Badge>;
      case 'Rejected':
        return <Badge variant="destructive" className="bg-destructive/10 text-destructive hover:bg-destructive/20 border border-destructive/50">Rejected by Seller</Badge>;
       case 'Active':
        return <Badge variant="secondary">Active</Badge>;
       case 'Closed':
        return <Badge className="bg-emerald-500/10 text-emerald-500">Closed</Badge>;
      default:
         return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const renderSkeleton = () => (
    [...Array(3)].map((_, i) => (
        <TableRow key={i}>
            <TableCell><div className="h-10 w-full bg-muted animate-pulse rounded-md" /></TableCell>
            <TableCell><div className="h-10 w-full bg-muted animate-pulse rounded-md" /></TableCell>
            <TableCell><div className="h-10 w-full bg-muted animate-pulse rounded-md" /></TableCell>
            <TableCell><div className="h-10 w-full bg-muted animate-pulse rounded-md" /></TableCell>
            <TableCell><div className="h-10 w-full bg-muted animate-pulse rounded-md" /></TableCell>
        </TableRow>
    ))
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl font-bold font-headline">My Deals</h1>
            <p className="text-muted-foreground">
            Track the status of your offers and active deals.
            </p>
        </div>
        <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Offers</CardTitle>
          <CardDescription>
            These are the offers you have made on various properties.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead>Broker</TableHead>
                  <TableHead className="text-right">Your Offer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? renderSkeleton() : deals.map((deal) => (
                  <TableRow key={deal.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 rounded-md">
                          <AvatarImage src={deal.property.image} />
                          <AvatarFallback className="rounded-md">
                            <Building className="w-5 h-5" />
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-foreground truncate">{deal.property.address}</span>
                      </div>
                    </TableCell>
                     <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={deal.broker.avatar} />
                           <AvatarFallback>
                            {deal.broker.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span>{deal.broker.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-semibold text-foreground">
                      ₹{deal.offerPrice.toLocaleString('en-IN')}
                    </TableCell>
                    <TableCell>{getStatusBadge(deal.status)}</TableCell>
                    <TableCell className="text-center">
                        <Button variant="outline" size="sm">
                            <Info className="w-4 h-4 mr-1" />
                            Details
                        </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
             {!isLoading && deals.length === 0 && (
                <div className="h-64 flex flex-col items-center justify-center text-center">
                    <User className="w-12 h-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold text-foreground">No Offers Made</h3>
                    <p className="text-muted-foreground mt-2">
                        You have not made any offers yet. Start by browsing properties.
                    </p>
                    <Button asChild className="mt-4">
                        <Link href="/buyer-dashboard/browse-properties">Browse Properties</Link>
                    </Button>
                </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
