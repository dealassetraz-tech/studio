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
import { ArrowUpDown, Building, User, Check, X, ArrowLeft } from 'lucide-react';
import { useCollection, useFirestore, useUser, useMemoFirebase, updateDocumentNonBlocking } from '@/firebase';
import { collection, query, where, doc, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

type DealStatus = 'Pending' | 'Accepted' | 'Rejected' | 'Active' | 'Closed' | 'Cancelled';

interface Deal {
  id: string;
  property: {
    address: string;
    image: string;
  };
   broker: {
    name: string;
    avatar: string;
  };
  offerPrice: number;
  status: DealStatus;
  date: string;
}


type SortKey = 'property.address' | 'offerPrice' | 'status' | 'date';

export default function DealsPage() {
  const router = useRouter();
  const firestore = useFirestore();
  const { user } = useUser();
  
  const dealsQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return query(collection(firestore, 'deals'), where('sellerId', '==', user.uid));
  }, [firestore, user]);

  const { data: deals, isLoading } = useCollection<Deal>(dealsQuery);

  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    direction: 'ascending' | 'descending';
  } | null>({ key: 'date', direction: 'descending' });


  const handleDealStatusChange = async (dealId: string, newStatus: 'Accepted' | 'Rejected') => {
    if(!firestore) return;
    const toastId = toast.loading("Updating status...");
    try {
        const dealDocRef = doc(firestore, 'deals', dealId);
        await updateDoc(dealDocRef, { status: newStatus });
        toast.success(`Deal ${newStatus.toLowerCase()}`, { id: toastId });
    } catch(error) {
        console.error("Error updating deal status", error);
        toast.error("Failed to update status", { id: toastId });
    }
  }

  const sortedDeals = [...(deals || [])].sort((a, b) => {
    if (!sortConfig) return 0;

    let aValue: any;
    let bValue: any;

    if (sortConfig.key === 'property.address') {
        aValue = a.property.address;
        bValue = b.property.address;
    } else {
        aValue = a[sortConfig.key as keyof Deal];
        bValue = b[sortConfig.key as keyof Deal];
    }
    

    if (aValue < bValue) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key: SortKey) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getStatusBadge = (status: DealStatus) => {
    switch (status) {
      case 'Pending':
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-500/50">
            Pending
          </Badge>
        );
      case 'Accepted':
        return (
          <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border border-primary/50">
            Accepted
          </Badge>
        );
      case 'Rejected':
        return (
          <Badge variant="destructive" className="bg-destructive/10 text-destructive hover:bg-destructive/20 border border-destructive/50">
            Rejected
          </Badge>
        );
      default:
         return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const renderSkeleton = () => (
    [...Array(4)].map((_, i) => (
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
            <h1 className="text-3xl font-bold font-headline">Deals</h1>
            <p className="text-muted-foreground">
            Review and manage offers on your properties.
            </p>
        </div>
        <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Incoming Offers</CardTitle>
          <CardDescription>
            Deals offered by potential buyers via brokers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead onClick={() => requestSort('property.address')} className="cursor-pointer">
                    <div className="flex items-center gap-2">
                        Property <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </TableHead>
                  <TableHead>Broker</TableHead>
                  <TableHead onClick={() => requestSort('offerPrice')} className="text-right cursor-pointer">
                     <div className="flex items-center justify-end gap-2">
                        Offer Price <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </TableHead>
                  <TableHead onClick={() => requestSort('status')} className="cursor-pointer">
                    <div className="flex items-center gap-2">
                        Status <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? renderSkeleton() : sortedDeals.map((deal) => (
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
                      {deal.status === 'Pending' ? (
                        <div className="flex gap-2 justify-center">
                          <Button variant="outline" size="sm" className="border-primary/50 text-primary hover:bg-primary/10 hover:text-primary" onClick={() => handleDealStatusChange(deal.id, 'Accepted')}>
                            <Check className="w-4 h-4 mr-1" />
                            Accept
                          </Button>
                          <Button variant="outline" size="sm" className="border-destructive/50 text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => handleDealStatusChange(deal.id, 'Rejected')}>
                            <X className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      ) : (
                        <Button variant="outline" size="sm" disabled>
                          Viewed
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
             {!isLoading && (!deals || deals.length === 0) && (
                <div className="h-64 flex flex-col items-center justify-center text-center">
                    <User className="w-12 h-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold text-foreground">No Offers Yet</h3>
                    <p className="text-muted-foreground mt-2">
                        You have not received any offers on your properties.
                    </p>
                </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
