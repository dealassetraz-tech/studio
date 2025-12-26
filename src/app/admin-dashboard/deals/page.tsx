
'use client';

import { useState, useEffect } from 'react';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Building, Handshake, Shield, User, Briefcase, ArrowRightLeft } from 'lucide-react';
import Link from 'next/link';

type DealStatus = 'Pending' | 'Accepted' | 'Rejected' | 'Active' | 'Closed' | 'Cancelled' | 'Pending Approval';

interface Deal {
  id: string;
  property: { address: string; image: string };
  seller: { name: string; avatar: string };
  buyer: { name: string; avatar: string };
  broker: { name: string; avatar: string };
  offerPrice: number;
  status: DealStatus;
  commission: number;
}

const initialMockDeals: Deal[] = [
    { id: 'deal1', property: { address: '101, Ocean View, Marine Drive, Mumbai', image: 'https://picsum.photos/seed/prop1/100/100' }, seller: { name: 'Vikram S.', avatar: 'https://picsum.photos/seed/seller1/100/100' }, buyer: { name: 'Aarav G.', avatar: 'https://picsum.photos/seed/buyerA/100/100' }, broker: { name: 'Rajesh K.', avatar: 'https://picsum.photos/seed/brokerR/100/100' }, offerPrice: 148000000, status: 'Active', commission: 2 },
    { id: 'deal2', property: { address: '2B, Green Park, Hauz Khas, Delhi', image: 'https://picsum.photos/seed/prop2/100/100' }, seller: { name: 'Priya K.', avatar: 'https://picsum.photos/seed/seller2/100/100' }, buyer: { name: 'Nisha D.', avatar: 'https://picsum.photos/seed/buyerB/100/100' }, broker: { name: 'Sunita P.', avatar: 'https://picsum.photos/seed/brokerS/100/100' }, offerPrice: 84000000, status: 'Pending Approval', commission: 1.5 },
    { id: 'deal3', property: { address: '45, Jubilee Hills, Hyderabad', image: 'https://picsum.photos/seed/prop4/100/100' }, seller: { name: 'Rohan M.', avatar: 'https://picsum.photos/seed/seller3/100/100' }, buyer: { name: 'Suresh P.', avatar: 'https://picsum.photos/seed/buyerC/100/100' }, broker: { name: 'Amit V.', avatar: 'https://picsum.photos/seed/brokerA/100/100' }, offerPrice: 119000000, status: 'Closed', commission: 2.5 },
    { id: 'deal4', property: { address: 'Villa, ECR, Chennai', image: 'https://picsum.photos/seed/prop5/100/100' }, seller: { name: 'Meena R.', avatar: 'https://picsum.photos/seed/seller4/100/100' }, buyer: { name: 'Karthik V.', avatar: 'https://picsum.photos/seed/buyerD/100/100' }, broker: { name: 'Deepa S.', avatar: 'https://picsum.photos/seed/brokerD/100/100' }, offerPrice: 95000000, status: 'Accepted', commission: 2.0 },
];

const SESSION_STORAGE_KEY = 'managedDealsMockData';

export default function AdminDealsPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    try {
      const storedDeals = sessionStorage.getItem(SESSION_STORAGE_KEY);
      const allDeals = storedDeals ? JSON.parse(storedDeals) : initialMockDeals;
      setDeals(allDeals);
      
      if (!storedDeals) {
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(initialMockDeals));
      }
    } catch (error) {
      console.error("Could not load deals from session storage", error);
      setDeals(initialMockDeals);
    }
    setIsLoading(false);
  }, []);

  const getStatusBadge = (status: DealStatus) => {
    switch (status) {
      case 'Active': return <Badge variant="secondary" className="bg-blue-500/10 text-blue-500 border-blue-500/20">Active</Badge>;
      case 'Accepted': return <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Accepted</Badge>;
      case 'Pending Approval': return <Badge variant="outline" className="text-orange-500 border-orange-500/50">Pending Approval</Badge>;
      case 'Closed': return <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500">Closed</Badge>;
      case 'Rejected': return <Badge variant="destructive">Rejected</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };
  
  const renderSkeleton = () => (
    [...Array(5)].map((_, i) => (
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline">All Deals</h1>
        <p className="text-muted-foreground">Monitor all deals across the platform.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Deals Overview</CardTitle>
          <CardDescription>A comprehensive list of every deal, regardless of status.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead>Parties Involved</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? renderSkeleton() : deals && deals.map((deal) => (
                  <TableRow key={deal.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 rounded-md">
                          <AvatarImage src={deal.property.image} />
                          <AvatarFallback className="rounded-md"><Building className="w-5 h-5" /></AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-foreground truncate max-w-xs">{deal.property.address}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2" title={`Seller: ${deal.seller.name}`}>
                                <User className="w-4 h-4 text-muted-foreground" />
                                <Avatar className="h-8 w-8"><AvatarImage src={deal.seller.avatar} /><AvatarFallback>{deal.seller.name.charAt(0)}</AvatarFallback></Avatar>
                            </div>
                            <ArrowRightLeft className="w-4 h-4 text-muted-foreground" />
                             {deal.broker && (
                                <>
                                    <div className="flex items-center gap-2" title={`Broker: ${deal.broker.name}`}>
                                        <Briefcase className="w-4 h-4 text-muted-foreground" />
                                        <Avatar className="h-8 w-8"><AvatarImage src={deal.broker.avatar} /><AvatarFallback>{deal.broker.name.charAt(0)}</AvatarFallback></Avatar>
                                    </div>
                                    <ArrowRightLeft className="w-4 h-4 text-muted-foreground" />
                                </>
                             )}
                             <div className="flex items-center gap-2" title={`Buyer: ${deal.buyer.name}`}>
                                <User className="w-4 h-4 text-muted-foreground" />
                                <Avatar className="h-8 w-8"><AvatarImage src={deal.buyer.avatar} /><AvatarFallback>{deal.buyer.name.charAt(0)}</AvatarFallback></Avatar>
                            </div>
                        </div>
                    </TableCell>
                    <TableCell className="text-right font-semibold text-foreground">₹{deal.offerPrice.toLocaleString('en-IN')}</TableCell>
                    <TableCell>{getStatusBadge(deal.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {!isLoading && (!deals || deals.length === 0) && (
                <div className="h-64 flex flex-col items-center justify-center text-center">
                    <Handshake className="w-12 h-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold text-foreground">No Deals Found</h3>
                    <p className="text-muted-foreground mt-2">There are no deals on the platform yet.</p>
                </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// A simple arrow component to show transaction direction
function ArrowRightLeft({className}: {className?: string}) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className={className}
      >
        <path
          fillRule="evenodd"
          d="M13.293 4.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L10 7.586l3.293-3.293z"
          clipRule="evenodd"
        />
         <path
          fillRule="evenodd"
          d="M6.707 15.707a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L10 12.414l-3.293 3.293z"
          clipRule="evenodd"
        />
      </svg>
    );
}