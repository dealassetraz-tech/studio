
'use client';

import { useState } from 'react';
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
import { ArrowLeft, Building, Info, Handshake } from 'lucide-react';
import { useCollection, useFirestore, useMemoFirebase, useUser } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';

type DealStatus = 'Pending' | 'Accepted' | 'Rejected' | 'Active' | 'Closed' | 'Cancelled';

interface Deal {
  id: string;
  property: {
      address: string;
      image: string;
  };
  seller: {
    name: string;
    avatar: string;
  },
   buyer: {
    name: string;
    avatar: string;
  },
  offerPrice: number;
  status: DealStatus;
  commission: number;
}

export default function ManagedDealsPage() {
  const router = useRouter();
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();

  const dealsQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return query(collection(firestore, 'deals'));
  }, [firestore, user]);

  const { data: deals, isLoading: dealsLoading } = useCollection<Deal>(dealsQuery);
  const isLoading = isUserLoading || dealsLoading;

  const getStatusBadge = (status: DealStatus) => {
    switch (status) {
      case 'Active':
        return <Badge variant="secondary" className="bg-blue-500/10 text-blue-500 border-blue-500/20">Active</Badge>;
      case 'Closed':
        return <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Closed</Badge>;
      case 'Pending':
        return <Badge variant="outline" className="text-amber-500 border-amber-500/50">Pending</Badge>;
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
            <TableCell><div className="h-10 w-full bg-muted animate-pulse rounded-md" /></TableCell>
        </TableRow>
    ))
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl font-bold font-headline">Managed Deals</h1>
            <p className="text-muted-foreground">
            Oversee and facilitate all your ongoing and past deals.
            </p>
        </div>
        <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Deals</CardTitle>
          <CardDescription>
            A comprehensive list of deals you are brokering.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead>Seller</TableHead>
                  <TableHead>Buyer</TableHead>
                  <TableHead className="text-right">Price</TableHead>
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
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={deal.seller.avatar} />
                           <AvatarFallback>
                            {deal.seller.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span>{deal.seller.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={deal.buyer.avatar} />
                           <AvatarFallback>
                            {deal.buyer.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span>{deal.buyer.name}</span>
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
             {!isLoading && (!deals || deals.length === 0) && (
                <div className="h-64 flex flex-col items-center justify-center text-center">
                    <Handshake className="w-12 h-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold text-foreground">No Deals Found</h3>
                    <p className="text-muted-foreground mt-2">
                        You are not currently managing any deals.
                    </p>
                </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
