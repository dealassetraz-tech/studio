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
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Building, Check, ShieldCheck, X } from 'lucide-react';
import toast from 'react-hot-toast';

type DealStatus = 'Pending' | 'Accepted' | 'Rejected' | 'Active' | 'Closed' | 'Cancelled' | 'Pending Approval';

interface Deal {
  id: string;
  property: { address: string; image: string; };
  seller: { name: string; avatar: string; };
  buyer: { name: string; avatar: string; };
  broker: { name: string; avatar: string };
  offerPrice: number;
  status: DealStatus;
  commission: number;
}

const initialMockDeals: Deal[] = [
    { id: 'deal1', property: { address: '101, Ocean View, Marine Drive, Mumbai', image: 'https://picsum.photos/seed/prop1/100/100' }, seller: { name: 'Vikram S.', avatar: 'https://picsum.photos/seed/seller1/100/100' }, buyer: { name: 'Aarav G.', avatar: 'https://picsum.photos/seed/buyerA/100/100' }, broker: { name: 'Rajesh K.', avatar: 'https://picsum.photos/seed/brokerR/100/100' }, offerPrice: 148000000, status: 'Active', commission: 2.0 },
    { id: 'deal2', property: { address: '2B, Green Park, Hauz Khas, Delhi', image: 'https://picsum.photos/seed/prop2/100/100' }, seller: { name: 'Priya K.', avatar: 'https://picsum.photos/seed/seller2/100/100' }, buyer: { name: 'Nisha D.', avatar: 'https://picsum.photos/seed/buyerB/100/100' }, broker: { name: 'Sunita P.', avatar: 'https://picsum.photos/seed/brokerS/100/100' }, offerPrice: 84000000, status: 'Pending Approval', commission: 1.5 },
    { id: 'deal4', property: { address: 'Villa, ECR, Chennai', image: 'https://picsum.photos/seed/prop5/100/100' }, seller: { name: 'Meena R.', avatar: 'https://picsum.photos/seed/seller4/100/100' }, buyer: { name: 'Karthik V.', avatar: 'https://picsum.photos/seed/buyerD/100/100' }, broker: { name: 'Deepa S.', avatar: 'https://picsum.photos/seed/brokerD/100/100' }, offerPrice: 95000000, status: 'Accepted', commission: 2.0 },
];

const SESSION_STORAGE_KEY = 'managedDealsMockData';

export default function AdminApprovalsPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    try {
      const storedDeals = sessionStorage.getItem(SESSION_STORAGE_KEY);
      const allDeals = storedDeals ? JSON.parse(storedDeals) : initialMockDeals;
      setDeals(allDeals.filter((d: Deal) => d.status === 'Accepted'));

      if (!storedDeals) {
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(initialMockDeals));
      }
    } catch (error) {
      console.error("Could not load deals from session storage", error);
      setDeals(initialMockDeals.filter((d: Deal) => d.status === 'Accepted'));
    }
    setIsLoading(false);
  }, []);
  
  const handleApprovalAction = async (dealId: string, newStatus: 'Active' | 'Rejected') => {
    const toastId = toast.loading(`Updating deal to ${newStatus}...`);
    
    let allDeals: Deal[] = [];
    try {
        const storedDeals = sessionStorage.getItem(SESSION_STORAGE_KEY);
        allDeals = storedDeals ? JSON.parse(storedDeals) : initialMockDeals;
    } catch(e) {
        allDeals = initialMockDeals;
    }
    
    const updatedDeals = allDeals.map(d => d.id === dealId ? {...d, status: newStatus} : d);
    
    setDeals(updatedDeals.filter(d => d.status === 'Accepted'));
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(updatedDeals));
    
    toast.success(`Deal has been ${newStatus === 'Active' ? 'approved' : 'rejected'}.`, { id: toastId });
  };
  
  const renderSkeleton = () => (
    [...Array(2)].map((_, i) => (
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Deal Approvals</h1>
        <p className="text-muted-foreground">Review and approve or reject new deals initiated by brokers.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Approval Queue</CardTitle>
          <CardDescription>These deals require administrative review before they can become active.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead>Broker</TableHead>
                  <TableHead>Seller</TableHead>
                  <TableHead>Buyer</TableHead>
                  <TableHead className="text-right">Offer Price</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? renderSkeleton() : deals && deals.length > 0 ? deals.map((deal) => (
                  <TableRow key={deal.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 rounded-md"><AvatarImage src={deal.property.image} /><AvatarFallback className="rounded-md"><Building className="w-5 h-5" /></AvatarFallback></Avatar>
                        <span className="font-medium text-foreground truncate max-w-xs">{deal.property.address}</span>
                      </div>
                    </TableCell>
                     <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9"><AvatarImage src={deal.broker.avatar} /><AvatarFallback>{deal.broker.name.charAt(0)}</AvatarFallback></Avatar>
                        <span>{deal.broker.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9"><AvatarImage src={deal.seller.avatar} /><AvatarFallback>{deal.seller.name.charAt(0)}</AvatarFallback></Avatar>
                        <span>{deal.seller.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9"><AvatarImage src={deal.buyer.avatar} /><AvatarFallback>{deal.buyer.name.charAt(0)}</AvatarFallback></Avatar>
                        <span>{deal.buyer.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-semibold text-foreground">₹{deal.offerPrice.toLocaleString('en-IN')}</TableCell>
                    <TableCell className="text-center">
                        <div className='flex items-center justify-center gap-2'>
                           <Button variant="outline" size="sm" className="border-emerald-500 text-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-500" onClick={() => handleApprovalAction(deal.id, 'Active')}>
                            <Check className="w-4 h-4 mr-1" /> Approve
                          </Button>
                          <Button variant="outline" size="sm" className="border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => handleApprovalAction(deal.id, 'Rejected')}>
                            <X className="w-4 h-4 mr-1" /> Reject
                          </Button>
                        </div>
                    </TableCell>
                  </TableRow>
                )) : null}
              </TableBody>
            </Table>
            {!isLoading && (!deals || deals.length === 0) && (
                <div className="h-64 flex flex-col items-center justify-center text-center">
                    <ShieldCheck className="w-12 h-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold text-foreground">Approval Queue is Empty</h3>
                    <p className="text-muted-foreground mt-2">There are no deals awaiting approval at this time.</p>
                </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
