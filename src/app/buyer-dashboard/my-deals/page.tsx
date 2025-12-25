
'use client';

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
import { useCollection, useFirestore, useUser, useMemoFirebase, useUsers } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import Link from 'next/link';
import { useMemo } from 'react';

type DealStatus = 'Pending' | 'Accepted' | 'Rejected' | 'Active' | 'Closed' | 'Cancelled';

interface Deal {
  id: string;
  property: {
    address: string;
    image: string;
  };
  brokerId?: string;
  offerPrice: number;
  status: DealStatus;
  date: string;
}

interface Broker {
    id: string;
    fullName: string;
    photoURL?: string;
}

export default function BuyerDealsPage() {
  const router = useRouter();
  const firestore = useFirestore();
  const { user } = useUser();

  const dealsQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return query(collection(firestore, 'deals'), where('buyerId', '==', user.uid));
  }, [firestore, user]);

  const { data: deals, isLoading: dealsLoading } = useCollection<Deal>(dealsQuery);

  const brokerIds = useMemo(() => {
    if (!deals) return [];
    return [...new Set(deals.map(d => d.brokerId).filter(Boolean) as string[])];
  }, [deals]);

  const { data: brokers, isLoading: brokersLoading } = useUsers(brokerIds);

  const brokersMap = useMemo(() => {
    if (!brokers) return new Map<string, Broker>();
    return new Map(brokers.map(b => [b.id, b]));
  }, [brokers]);

  const isLoading = dealsLoading || (brokerIds.length > 0 && brokersLoading);

  const getStatusBadge = (status: DealStatus) => {
    switch (status) {
      case 'Pending':
        return <Badge variant="outline" className="text-amber-500 border-amber-500/50">Pending Seller Review</Badge>;
      case 'Accepted':
        return <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border border-primary/50">Accepted</Badge>;
      case 'Rejected':
        return <Badge variant="destructive" className="bg-destructive/10 text-destructive hover:bg-destructive/20 border border-destructive/50">Rejected by Seller</Badge>;
       case 'Active':
        return <Badge variant="secondary" className="bg-blue-500/10 text-blue-500 border-blue-500/20">Active</Badge>;
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
                {isLoading ? renderSkeleton() : deals && deals.map((deal) => (
                  <TableRow key={deal.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 rounded-md">
                          <AvatarImage src={deal.property.image} />
                          <AvatarFallback className="rounded-md">
                            <Building className="w-5 h-5" />
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-foreground truncate max-w-xs">{deal.property.address}</span>
                      </div>
                    </TableCell>
                     <TableCell>
                      {deal.brokerId && brokersMap.has(deal.brokerId) ? (
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={brokersMap.get(deal.brokerId)?.photoURL} />
                             <AvatarFallback>
                              {brokersMap.get(deal.brokerId)?.fullName?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span>{brokersMap.get(deal.brokerId)?.fullName}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">Not Assigned</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-foreground">
                      ₹{deal.offerPrice.toLocaleString('en-IN')}
                    </TableCell>
                    <TableCell>{getStatusBadge(deal.status)}</TableCell>
                    <TableCell className="text-center">
                        <Button variant="outline" size="sm" asChild>
                           <Link href={`/deals/${deal.id}`}>
                                <Info className="w-4 h-4 mr-1" />
                                Details
                           </Link>
                        </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
             {!isLoading && (!deals || deals.length === 0) && (
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
