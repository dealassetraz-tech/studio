
'use client';

import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, Building, User as UserIcon, IndianRupee, MessageSquare, Briefcase, FileUp, CheckCircle, Clock, Paperclip, ShieldQuestion, Shuffle, Bed, Link as LinkIcon, MapPin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { useState, useMemo, useEffect } from 'react';
import { FileUpload } from '@/components/file-upload';

interface Deal {
  id: string;
  property: {
      address: string;
      image: string;
      price: number;
      bedrooms: number;
      bathrooms: number;
      type: string;
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
  status: 'Pending' | 'Accepted' | 'Rejected' | 'Active' | 'Closed' | 'Cancelled' | 'Pending Approval';
  commission: number;
  closureProof?: {
    fileName: string;
    url: string; 
  };
}

type LogEvent = "Assigned to deal" | "Communicated with seller" | "Communicated with buyer" | "Requested closure" | "Uploaded closure proof";

interface DealLog {
    id: string;
    event: LogEvent;
    timestamp: {
        seconds: number;
        nanoseconds: number;
    };
    userId: string;
}

interface Requirement {
    location: string;
    type: string;
    bedrooms: number;
    budget: number;
}

interface BuyerRequest {
    id: string;
    buyer: {
        name: string;
        avatar: string;
    },
    requirements: Requirement;
}

const logIcons: Record<LogEvent, React.ReactElement> = {
    "Assigned to deal": <Briefcase className="w-5 h-5 text-primary" />,
    "Communicated with seller": <MessageSquare className="w-5 h-5 text-blue-500" />,
    "Communicated with buyer": <MessageSquare className="w-5 h-5 text-green-500" />,
    "Requested closure": <CheckCircle className="w-5 h-5 text-amber-500" />,
    "Uploaded closure proof": <FileUp className="w-5 h-5 text-purple-500" />,
};

const mockDeal: Deal = {
    id: 'deal1',
    property: {
        address: '101, Ocean View, Marine Drive, Mumbai',
        image: 'https://picsum.photos/seed/prop1/600/400',
        price: 150000000,
        bedrooms: 3,
        bathrooms: 3,
        type: 'Apartment'
    },
    seller: { name: 'Vikram S.', avatar: 'https://picsum.photos/seed/seller1/100/100' },
    buyer: { name: 'Aarav G.', avatar: 'https://picsum.photos/seed/buyerA/100/100' },
    offerPrice: 148000000,
    status: 'Active',
    commission: 2,
};

const mockLogs: DealLog[] = [
    { id: 'log1', event: 'Communicated with seller', timestamp: { seconds: 1766699280, nanoseconds: 0 }, userId: 'broker1' }, // Dec 25, 2025
    { id: 'log2', event: 'Communicated with seller', timestamp: { seconds: 1679396400, nanoseconds: 0 }, userId: 'broker1' }, // Mar 21, 2023
];

const mockBuyerRequests: BuyerRequest[] = [
    { 
        id: 'req1', 
        buyer: { name: 'Suresh G.', avatar: 'https://picsum.photos/seed/buyerS/100/100' }, 
        requirements: { location: 'Marine Drive, Mumbai', type: 'Apartment', bedrooms: 3, budget: 160000000 } 
    },
    { 
        id: 'req2', 
        buyer: { name: 'Nisha D.', avatar: 'https://picsum.photos/seed/buyerN/100/100' }, 
        requirements: { location: 'Bandra, Mumbai', type: 'Apartment', bedrooms: 3, budget: 140000000 } 
    },
];

const findMatches = (deal: Deal | null, buyerRequests: BuyerRequest[]) => {
    if (!deal) return [];
    
    return buyerRequests.filter(req => {
        const priceMatch = deal.property.price <= req.requirements.budget * 1.1 && deal.property.price >= req.requirements.budget * 0.9;
        const typeMatch = deal.property.type === req.requirements.type;
        const bedroomMatch = deal.property.bedrooms === req.requirements.bedrooms;
        const locationMatch = deal.property.address.toLowerCase().includes(req.requirements.location.toLowerCase().split(',')[0]);
        return priceMatch && typeMatch && bedroomMatch && locationMatch;
    });
};


export default function DealDetailsPage() {
  const router = useRouter();
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [deal, setDeal] = useState<Deal | null>(null);
  const [logs, setLogs] = useState<DealLog[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
        setDeal(mockDeal);
        setLogs(mockLogs);
        setIsLoading(false);
    }, 1000);
  }, []);

  const sortedLogs = useMemo(() => {
    if (!logs) return [];
    return [...logs].sort((a,b) => b.timestamp.seconds - a.timestamp.seconds);
  }, [logs]);


  const potentialMatches = useMemo(() => findMatches(deal, mockBuyerRequests), [deal]);

  const addLogEntry = async (event: LogEvent) => {
    const toastId = toast.loading(`Adding log: "${event}"...`);

    setTimeout(() => {
        const newLog: DealLog = {
            id: `log${(logs?.length || 0) + 1}`,
            event,
            timestamp: { seconds: Math.floor(Date.now()/1000), nanoseconds: 0 },
            userId: 'broker1',
        };
        setLogs(currentLogs => [newLog, ...(currentLogs || [])]);
        toast.success("Log added successfully!", { id: toastId });
    }, 500);
  };

   const handleUploadComplete = async (fileName: string, fileUrl: string) => {
    const toastId = toast.loading("Attaching proof to deal...");
    setTimeout(() => {
        setDeal(d => d ? { ...d, closureProof: { fileName, url: fileUrl } } : null);
        addLogEntry("Uploaded closure proof");
        toast.success("Closure proof attached!", { id: toastId });
        setIsUploadDialogOpen(false);
    }, 500);
  };

  const handleRequestApproval = async () => {
    const toastId = toast.loading("Requesting approval...");
    setTimeout(() => {
        setDeal(d => d ? { ...d, status: "Pending Approval" } : null);
        toast.success("Approval requested!", { id: toastId });
    }, 500);
  };

  const renderSkeleton = () => (
    <Card>
      <CardHeader><div className="h-8 w-3/4 bg-muted animate-pulse rounded-md" /></CardHeader>
      <CardContent className="space-y-6">
        <div className="h-24 w-full bg-muted animate-pulse rounded-md" />
        <div className="h-32 w-full bg-muted animate-pulse rounded-md" />
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
        <div className="container mx-auto px-4 py-8 space-y-8">
            <div className="h-8 w-1/4 bg-muted animate-pulse rounded-md" />
            {renderSkeleton()}
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
      <FileUpload
        isOpen={isUploadDialogOpen}
        onClose={() => setIsUploadDialogOpen(false)}
        onUploadComplete={handleUploadComplete}
      />
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-headline truncate max-w-xl">
            Deal: {deal.property.address}
          </h1>
        </div>
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            {/* Deal Details */}
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
                                <IndianRupee className="w-5 h-5" />
                                <span className="font-bold">{deal.offerPrice.toLocaleString('en-IN')}</span>
                            </div>
                        </div>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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

             {/* Potential Matches */}
            {potentialMatches.length > 0 && (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Shuffle className="w-5 h-5 text-primary" />
                        Potential Buyer Matches
                    </CardTitle>
                    <CardDescription>Buyers whose requirements may fit this property.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {potentialMatches.map((match) => (
                        <Card key={match.id} className="bg-muted/30">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-3">
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage src={match.buyer.avatar} />
                                        <AvatarFallback>{match.buyer.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <span>{match.buyer.name}</span>
                                        <CardDescription>Is looking for...</CardDescription>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm">
                                 <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-muted-foreground" /> <span>{match.requirements.location}</span></div>
                                <div className="flex items-center gap-2"><Building className="w-4 h-4 text-muted-foreground" /> <span>{match.requirements.type}</span></div>
                                <div className="flex items-center gap-2"><Bed className="w-4 h-4 text-muted-foreground" /> <span>{match.requirements.bedrooms} Bedrooms</span></div>
                                <div className="flex items-center gap-2"><IndianRupee className="w-4 h-4 text-muted-foreground" /> <span>Budget: ~₹{match.requirements.budget.toLocaleString('en-IN')}</span></div>
                            </CardContent>
                            <div className="p-4 pt-0 text-right">
                                <Button size="sm">
                                    <LinkIcon className="w-4 h-4 mr-2" />
                                    Initiate Contact
                                </Button>
                            </div>
                        </Card>
                    ))}
                </CardContent>
            </Card>
            )}

             {deal.closureProof && (
                <Card>
                    <CardHeader>
                        <CardTitle>Closure Proof</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-3 p-3 rounded-md bg-muted">
                            <Paperclip className="w-5 h-5 text-primary" />
                            <a href={deal.closureProof.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-foreground hover:underline">
                                {deal.closureProof.fileName}
                            </a>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Broker Actions */}
            <Card>
                <CardHeader>
                    <CardTitle>Broker Actions</CardTitle>
                    <CardDescription>Log your activities and manage this deal.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <Button variant="outline" onClick={() => addLogEntry("Communicated with seller")}>Log Seller Talk</Button>
                    <Button variant="outline" onClick={() => addLogEntry("Communicated with buyer")}>Log Buyer Talk</Button>
                    <Button variant="outline" onClick={() => addLogEntry("Requested closure")}>Request Closure</Button>
                    <Button variant="outline" onClick={() => setIsUploadDialogOpen(true)}>Upload Proof</Button>
                    <Button onClick={handleRequestApproval}>
                        <ShieldQuestion className="w-4 h-4 mr-2" />
                        Request Approval
                    </Button>
                </CardContent>
            </Card>
        </div>

        {/* Activity Log */}
        <div className="lg:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle>Activity Log</CardTitle>
                </CardHeader>
                <CardContent>
                    {sortedLogs && sortedLogs.length > 0 ? (
                        <div className="space-y-6">
                            {sortedLogs.map((log, index) => (
                                <div key={log.id} className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                                            {logIcons[log.event]}
                                        </span>
                                        {index < sortedLogs.length -1 && <div className="h-full w-px bg-border my-2" />}
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
                            <p className="text-sm text-muted-foreground">Broker actions will appear here.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
