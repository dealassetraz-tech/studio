
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
import { ArrowUpDown, Building, User, Check, X, ArrowLeft, AreaChart } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useMemo } from 'react';


type DealStatus = 'Pending' | 'Accepted' | 'Rejected' | 'Active' | 'Closed' | 'Cancelled';

interface Deal {
  id: string;
  property: {
    address: string;
    image: string;
  };
  buyer: {
    name: string;
    avatar: string;
  };
  brokerId?: string;
  offerPrice: number;
  status: DealStatus;
  date: string;
}

const mockDeals: Deal[] = [
    { id: 'deal1', property: { address: '101, Ocean View, Marine Drive, Mumbai', image: 'https://picsum.photos/seed/prop1/100/100' }, buyer: { name: 'Aarav Singh', avatar: 'https://picsum.photos/seed/buyer1/100/100' }, brokerId: 'broker1', offerPrice: 148000000, status: 'Pending', date: '2024-07-20T10:00:00Z' },
    { id: 'deal2', property: { address: '2B, Green Park, Hauz Khas, Delhi', image: 'https://picsum.photos/seed/prop2/100/100' }, buyer: { name: 'Priya Patel', avatar: 'https://picsum.photos/seed/buyer2/100/100' }, brokerId: 'broker2', offerPrice: 84000000, status: 'Accepted', date: '2024-07-19T15:30:00Z' },
    { id: 'deal3', property: { address: 'Penthouse, The Imperial, Tardeo, Mumbai', image: 'https://picsum.photos/seed/prop3/100/100' }, buyer: { name: 'Rohan Mehta', avatar: 'https://picsum.photos/seed/buyer3/100/100' }, brokerId: 'broker1', offerPrice: 295000000, status: 'Rejected', date: '2024-07-18T12:00:00Z' },
];

const mockBrokers = [
    { id: 'broker1', fullName: 'Rajesh Sharma', photoURL: 'https://picsum.photos/seed/broker1/100/100' },
    { id: 'broker2', fullName: 'Sunita Singh', photoURL: 'https://picsum.photos/seed/broker2/100/100' },
];


type SortKey = 'property.address' | 'offerPrice' | 'status' | 'date';

export default function DealsPage() {
  const router = useRouter();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [brokers, setBrokers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
        setDeals(mockDeals);
        setBrokers(mockBrokers);
        setIsLoading(false);
    }, 1000);
  }, []);

  const brokersMap = useMemo(() => {
    if (!brokers) return new Map();
    return new Map(brokers.map(b => [b.id, b]));
  }, [brokers]);


  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    direction: 'ascending' | 'descending';
  } | null>({ key: 'date', direction: 'descending' });


  const handleDealStatusChange = async (dealId: string, newStatus: 'Accepted' | 'Rejected') => {
    const toastId = toast.loading("Updating status...");
    setTimeout(() => {
        setDeals(currentDeals => currentDeals.map(d => d.id === dealId ? {...d, status: newStatus} : d));
        toast.success(`Deal ${newStatus.toLowerCase()}`, { id: toastId });
    }, 500);
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
                      {deal.brokerId && brokersMap.has(deal.brokerId) ? (
                        <Link href={`/broker/${deal.brokerId}`} className="flex items-center gap-3 group">
                            <Avatar className="h-9 w-9">
                            <AvatarImage src={brokersMap.get(deal.brokerId)?.photoURL} />
                            <AvatarFallback>
                                {brokersMap.get(deal.brokerId)?.fullName?.charAt(0)}
                            </AvatarFallback>
                            </Avatar>
                            <div>
                            <p className="font-semibold group-hover:text-primary group-hover:underline">{brokersMap.get(deal.brokerId)?.fullName}</p>
                            <Badge variant="secondary">Assigned</Badge>
                            </div>
                        </Link>
                        ) : (
                           <span className="text-muted-foreground text-sm">Not Assigned</span>
                        )}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-foreground">
                      ₹{deal.offerPrice.toLocaleString('en-IN')}
                    </TableCell>
                    <TableCell>{getStatusBadge(deal.status)}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex gap-2 justify-center">
                        {deal.status === 'Pending' && (
                          <>
                            <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/10 hover:text-primary" onClick={() => handleDealStatusChange(deal.id, 'Accepted')}>
                                <Check className="w-4 h-4 mr-1" />
                                Accept
                            </Button>
                            <Button variant="outline" size="sm" className="border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => handleDealStatusChange(deal.id, 'Rejected')}>
                                <X className="w-4 h-4 mr-1" />
                                Reject
                            </Button>
                          </>
                        )}
                        {(deal.status === 'Accepted' || deal.status === 'Active' || deal.status === 'Closed') && (
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/deals/${deal.id}`}>
                                <AreaChart className="w-4 h-4 mr-1" />
                                Track Deal
                              </Link>
                            </Button>
                        )}
                      </div>
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
