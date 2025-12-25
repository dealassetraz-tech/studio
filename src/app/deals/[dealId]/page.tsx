
'use client';

import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, Building, User as UserIcon, IndianRupee, Briefcase, Clock, MessageSquare, CheckCircle, FileUp } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { useMemo, useState, useEffect } from 'react';
import { useUser } from '@/firebase';
import { cn } from '@/lib/utils';
import { BuyerDealTimeline, type BuyerDealStatus } from '@/components/buyer-deal-timeline';


interface Deal {
  id: string;
  property: {
      address: string;
      image: string;
  };
  seller: {
    name: string;
    avatar: string;
  };
  buyer: {
    name: string;
    avatar: string;
  };
  broker: {
    name: string;
    avatar: string;
  };
  offerPrice: number;
  status: 'Pending' | 'Accepted' | 'Rejected' | 'Active' | 'Closed' | 'Cancelled' | 'Pending Approval';
  commission: number;
}

type LogEvent = "Assigned to deal" | "Communicated with seller" | "Communicated with buyer" | "Requested closure" | "Uploaded closure proof" | "Deal approved" | "Offer made";

interface DealLog {
    id: string;
    event: LogEvent;
    timestamp: {
        seconds: number;
        nanoseconds: number;
    };
    userId: string;
}

const mockDeal: Deal = {
    id: 'deal2',
    property: { address: '2B, Green Park, Hauz Khas, Delhi', image: 'https://picsum.photos/seed/prop2/100/100' },
    seller: { name: 'Vikram Singh', avatar: 'https://picsum.photos/seed/seller1/100/100' },
    buyer: { name: 'Priya Patel', avatar: 'https://picsum.photos/seed/buyer2/100/100' },
    broker: { name: 'Sunita Singh', avatar: 'https://picsum.photos/seed/broker2/100/100' },
    offerPrice: 84000000,
    status: 'Active',
    commission: 1.5,
};

const mockLogs: DealLog[] = [
    { id: 'log0', event: 'Offer made', timestamp: { seconds: 1679223600, nanoseconds: 0 }, userId: 'buyer-id' }, // Added for buyer timeline
    { id: 'log1', event: 'Assigned to deal', timestamp: { seconds: 1679310000, nanoseconds: 0 }, userId: 'broker2' },
    { id: 'log2', event: 'Communicated with seller', timestamp: { seconds: 1679396400, nanoseconds: 0 }, userId: 'broker2' },
    { id: 'log3', event: 'Communicated with buyer', timestamp: { seconds: 1679482800, nanoseconds: 0 }, userId: 'broker2' },
    { id: 'log4', event: 'Deal approved', timestamp: { seconds: 1679569200, nanoseconds: 0 }, userId: 'admin' },
];

const logIcons: Record<LogEvent, React.ReactElement> = {
    "Offer made": <Briefcase className="w-5 h-5 text-primary" />,
    "Assigned to deal": <Briefcase className="w-5 h-5 text-primary" />,
    "Communicated with seller": <MessageSquare className="w-5 h-5 text-blue-500" />,
    "Communicated with buyer": <MessageSquare className="w-5 h-5 text-green-500" />,
    "Requested closure": <CheckCircle className="w-5 h-5 text-amber-500" />,
    "Uploaded closure proof": <FileUp className="w-5 h-5 text-purple-500" />,
    "Deal approved": <CheckCircle className="w-5 h-5 text-emerald-500" />,
};


export default function SellerDealTrackingPage() {
  const router = useRouter();
  const { user } = useUser();
  const [deal, setDeal] = useState<Deal | null>(null);
  const [logs, setLogs] = useState<DealLog[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
        setDeal(mockDeal);
        setLogs(mockLogs.sort((a,b) => b.timestamp.seconds - a.timestamp.seconds)); // Descending
        setIsLoading(false);
    }, 1000);
  }, []);
  
  const userRole = useMemo(() => {
    // This is a simplified role detection for mock purposes.
    // In a real app, this would come from the user's profile in the database.
    if (typeof window === 'undefined') return 'seller';
    const path = window.location.pathname;
    if (path.includes('buyer-dashboard')) return 'buyer';
    if (path.includes('broker-dashboard')) return 'broker';
    if (path.includes('dashboard')) return 'seller';
    
    // Fallback based on mock data if path is not specific
    if (!user || !deal) return 'unknown';
    if (user.displayName === deal.buyer.name) return 'buyer';
    if (user.displayName === deal.seller.name) return 'seller';
    if (user.displayName === deal.broker.name) return 'broker';
    
    return 'seller'; // Default for generic /deals/[dealId] path
  }, [user, deal]);

  const buyerTimelineStatus = useMemo((): BuyerDealStatus => {
    if (!deal) return 'Registered Interest';
    switch (deal.status) {
        case 'Pending': return 'Offer Placed';
        case 'Active': return 'Deal Review';
        case 'Accepted': return 'Approval Granted';
        case 'Closed': return 'Deal Closed';
        default: return 'Registered Interest';
    }
  }, [deal]);


  const renderSkeleton = () => (
    <div className="space-y-8">
        <Card>
            <CardHeader><div className="h-8 w-3/4 bg-muted animate-pulse rounded-md" /></CardHeader>
            <CardContent className="space-y-6">
                <div className="h-24 w-full bg-muted animate-pulse rounded-md" />
                <div className="h-32 w-full bg-muted animate-pulse rounded-md" />
            </CardContent>
        </Card>
        <Card>
            <CardHeader><div className="h-8 w-1/2 bg-muted animate-pulse rounded-md" /></CardHeader>
            <CardContent className="space-y-6">
                <div className="h-16 w-full bg-muted animate-pulse rounded-md" />
                <div className="h-16 w-full bg-muted animate-pulse rounded-md" />
            </CardContent>
        </Card>
    </div>
  );

  if (isLoading) {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <div className="h-9 w-1/3 bg-muted animate-pulse rounded-md" />
                <div className="h-10 w-24 bg-muted animate-pulse rounded-md" />
            </div>
            {renderSkeleton()}
        </div>
    )
  }

  if (!deal) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold">Deal not found</h2>
        <p className="text-muted-foreground">This deal may have been removed or the link is incorrect.</p>
        <Button onClick={() => router.back()} className="mt-4">Go Back</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-headline truncate max-w-xl">
            Track Deal: {deal.property.address}
          </h1>
        </div>
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Deals
        </Button>
      </div>
      

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-3 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Deal Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4 mb-6">
                        <Avatar className="h-20 w-20 rounded-md">
                            <AvatarImage src={deal.property.image} />
                            <AvatarFallback className="rounded-md"><Building className="w-8 h-8" /></AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-xl font-semibold text-foreground">{deal.property.address}</p>
                            <div className="flex items-center gap-2 text-lg text-muted-foreground">
                                <span className="text-sm">Offer:</span>
                                <IndianRupee className="w-5 h-5" />
                                <span className="font-bold">{deal.offerPrice.toLocaleString('en-IN')}</span>
                            </div>
                        </div>
                    </div>
                    <Separator />
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                         <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10"><AvatarImage src={deal.seller.avatar} /><AvatarFallback>{deal.seller.name.charAt(0)}</AvatarFallback></Avatar>
                            <div>
                                <p className="text-sm text-muted-foreground">Seller</p>
                                <p className="font-semibold text-foreground">{deal.seller.name}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10"><AvatarImage src={deal.buyer.avatar} /><AvatarFallback>{deal.buyer.name.charAt(0)}</AvatarFallback></Avatar>
                            <div>
                                <p className="text-sm text-muted-foreground">Buyer</p>
                                <p className="font-semibold text-foreground">{deal.buyer.name}</p>
                            </div>
                        </div>
                         <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10"><AvatarImage src={deal.broker.avatar} /><AvatarFallback>{deal.broker.name.charAt(0)}</AvatarFallback></Avatar>
                            <div>
                                <p className="text-sm text-muted-foreground">Broker</p>
                                <p className="font-semibold text-foreground">{deal.broker.name}</p>
                            </div>
                        </div>
                    </div>
                     <div className="mt-6 flex justify-between items-center bg-muted/50 p-4 rounded-lg">
                        <div>
                            <p className="text-sm text-muted-foreground">Status</p>
                            <Badge variant={
                                deal.status === "Active" ? "default" : 
                                deal.status === "Pending Approval" ? "outline" :
                                "secondary"
                            }>
                                {deal.status}
                            </Badge>
                        </div>
                         <div>
                            <p className="text-sm text-muted-foreground">Commission</p>
                            <p className="font-bold text-lg text-foreground">{deal.commission}%</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

             {userRole === 'buyer' && (
                <Card>
                    <CardHeader>
                        <CardTitle>Deal Progress</CardTitle>
                        <CardDescription>Follow the journey of your deal from start to finish.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <BuyerDealTimeline currentStatus={buyerTimelineStatus} />
                    </CardContent>
                </Card>
            )}

            {userRole !== 'buyer' && (
                <Card>
                    <CardHeader>
                        <CardTitle>Activity Log</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {logs && logs.length > 0 ? (
                            <div className="space-y-6">
                                {logs.map(log => (
                                    <div key={log.id} className="flex gap-4">
                                        <div className="flex flex-col items-center">
                                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                                                {logIcons[log.event]}
                                            </span>
                                            {logs[logs.length-1].id !== log.id && <div className="h-full w-px bg-border my-2" />}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-foreground">{log.event}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {format(new Date(log.timestamp.seconds * 1000), "MMM d, yyyy 'at' h:mm a")}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                             <div className="h-40 flex flex-col items-center justify-center text-center">
                                <Clock className="w-10 h-10 text-muted-foreground mb-3" />
                                <h3 className="font-semibold">No Activity Yet</h3>
                                <p className="text-sm text-muted-foreground">Deal activities will appear here.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
      </div>
    </div>
  );
}
