
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
import { ArrowLeft, Building, Info, Handshake, Check, X } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

type DealStatus = 'Pending' | 'Accepted' | 'Rejected' | 'Active' | 'Closed' | 'Cancelled' | 'Pending Approval';

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

const initialMockDeals: Deal[] = [
    { id: 'deal1', property: { address: '101, Ocean View, Marine Drive, Mumbai', image: 'https://picsum.photos/seed/prop1/100/100' }, seller: { name: 'Vikram S.', avatar: 'https://picsum.photos/seed/seller1/100/100' }, buyer: { name: 'Aarav G.', avatar: 'https://picsum.photos/seed/buyerA/100/100' }, offerPrice: 148000000, status: 'Active', commission: 2 },
    { id: 'deal2', property: { address: '2B, Green Park, Hauz Khas, Delhi', image: 'https://picsum.photos/seed/prop2/100/100' }, seller: { name: 'Priya K.', avatar: 'https://picsum.photos/seed/seller2/100/100' }, buyer: { name: 'Nisha D.', avatar: 'https://picsum.photos/seed/buyerB/100/100' }, offerPrice: 84000000, status: 'Pending Approval', commission: 1.5 },
    { id: 'deal3', property: { address: '45, Jubilee Hills, Hyderabad', image: 'https://picsum.photos/seed/prop4/100/100' }, seller: { name: 'Rohan M.', avatar: 'https://picsum.photos/seed/seller3/100/100' }, buyer: { name: 'Suresh P.', avatar: 'https://picsum.photos/seed/buyerC/100/100' }, offerPrice: 119000000, status: 'Closed', commission: 2.5 },
    { id: 'deal4', property: { address: 'Villa, ECR, Chennai', image: 'https://picsum.photos/seed/prop5/100/100' }, seller: { name: 'Meena R.', avatar: 'https://picsum.photos/seed/seller4/100/100' }, buyer: { name: 'Karthik V.', avatar: 'https://picsum.photos/seed/buyerD/100/100' }, offerPrice: 95000000, status: 'Accepted', commission: 2.0 },
];

const SESSION_STORAGE_KEY = 'managedDealsMockData';

export default function PendingDealsPage() {
  const router = useRouter();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    try {
      const storedDeals = sessionStorage.getItem(SESSION_STORAGE_KEY);
      const allDeals = storedDeals ? JSON.parse(storedDeals) : initialMockDeals;
      setDeals(allDeals.filter((d: Deal) => d.status === 'Pending Approval'));

      if (!storedDeals) {
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(initialMockDeals));
      }
    } catch (error) {
      console.error("Could not load deals from session storage", error);
      setDeals(initialMockDeals.filter((d: Deal) => d.status === 'Pending Approval'));
    }
    setIsLoading(false);
  }, []);
  
  const handleAssignmentResponse = async (dealId: string, status: 'Active' | 'Rejected') => {
    const toastId = toast.loading(`Updating assignment to ${status}...`);
    
    let allDeals: Deal[] = [];
    try {
        const storedDeals = sessionStorage.getItem(SESSION_STORAGE_KEY);
        allDeals = storedDeals ? JSON.parse(storedDeals) : initialMockDeals;
    } catch(e) {
        allDeals = initialMockDeals;
    }
    
    const updatedDeals = allDeals.map(d => d.id === dealId ? {...d, status: status} : d);
    
    setDeals(updatedDeals.filter(d => d.status === 'Pending Approval'));
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(updatedDeals));
    
    toast.success('Assignment updated!', { id: toastId });
    
    if (status === 'Active') {
      router.push(`/broker-dashboard/active-deals/${dealId}`);
    }
  };

  const getStatusBadge = (status: DealStatus) => {
    return <Badge variant="outline" className="text-orange-500 border-orange-500/50">Pending Approval</Badge>;
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
            <h1 className="text-3xl font-bold font-headline">Pending Deals</h1>
            <p className="text-muted-foreground">
              Review and act on deals awaiting your approval.
            </p>
        </div>
        <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Assignments</CardTitle>
          <CardDescription>
            These deals have been assigned to you and are pending your acceptance.
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
                {isLoading ? renderSkeleton() : deals && deals.length > 0 ? deals.map((deal) => (
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
                        <div className='flex items-center justify-center gap-2'>
                           <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/10 hover:text-primary" onClick={() => handleAssignmentResponse(deal.id, 'Active')}>
                            <Check className="w-4 h-4 mr-1" />
                            Accept
                          </Button>
                          <Button variant="outline" size="sm" className="border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => handleAssignmentResponse(deal.id, 'Rejected')}>
                            <X className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                    </TableCell>
                  </TableRow>
                )) : null}
              </TableBody>
            </Table>
             {!isLoading && (!deals || deals.length === 0) && (
                <div className="h-64 flex flex-col items-center justify-center text-center">
                    <Handshake className="w-12 h-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold text-foreground">No Pending Deals</h3>
                    <p className="text-muted-foreground mt-2">
                        You have no new deal assignments.
                    </p>
                </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

    