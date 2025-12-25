
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useDoc, useCollection, useFirestore, useUser, useMemoFirebase, updateDocumentNonBlocking } from '@/firebase';
import { doc, collection, addDoc, serverTimestamp, query, orderBy, updateDoc } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, Building, User as UserIcon, IndianRupee, MessageSquare, Briefcase, FileUp, CheckCircle, Clock, Paperclip, ShieldQuestion } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { useState } from 'react';
import { FileUpload } from '@/components/file-upload';

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
  status: 'Pending' | 'Accepted' | 'Rejected' | 'Active' | 'Closed' | 'Cancelled' | 'Pending Approval';
  commission: number;
  closureProof?: {
    fileName: string;
    url: string; // In a real app, this would be a URL to the uploaded file in cloud storage
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

const logIcons: Record<LogEvent, React.ReactElement> = {
    "Assigned to deal": <Briefcase className="w-5 h-5 text-primary" />,
    "Communicated with seller": <MessageSquare className="w-5 h-5 text-blue-500" />,
    "Communicated with buyer": <MessageSquare className="w-5 h-5 text-green-500" />,
    "Requested closure": <CheckCircle className="w-5 h-5 text-amber-500" />,
    "Uploaded closure proof": <FileUp className="w-5 h-5 text-purple-500" />,
};

export default function DealDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const dealId = params.dealId as string;
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  const firestore = useFirestore();
  const { user } = useUser();

  const dealDocRef = useMemoFirebase(() => {
    if (!firestore || !dealId) return null;
    return doc(firestore, 'deals', dealId);
  }, [firestore, dealId]);

  const logsCollectionRef = useMemoFirebase(() => {
    if(!dealDocRef) return null;
    return collection(dealDocRef, 'logs');
  }, [dealDocRef]);
  
  const logsQuery = useMemoFirebase(() => {
    if (!logsCollectionRef) return null;
    return query(logsCollectionRef, orderBy('timestamp', 'desc'));
  }, [logsCollectionRef]);

  const { data: deal, isLoading: isDealLoading } = useDoc<Deal>(dealDocRef);
  const { data: logs, isLoading: areLogsLoading } = useCollection<DealLog>(logsQuery);

  const isLoading = isDealLoading || areLogsLoading;
  
  const addLogEntry = async (event: LogEvent) => {
    if (!user || !logsCollectionRef) {
        toast.error("You must be logged in to add a log entry.");
        return;
    }
    
    const toastId = toast.loading(`Adding log: "${event}"...`);

    try {
        await addDoc(logsCollectionRef, {
            event,
            timestamp: serverTimestamp(),
            userId: user.uid,
        });
        toast.success("Log added successfully!", { id: toastId });
    } catch (error) {
        console.error("Error adding log:", error);
        toast.error("Failed to add log.", { id: toastId });
    }
  };

   const handleUploadComplete = async (fileName: string, fileUrl: string) => {
    if (!dealDocRef) return;
    
    const toastId = toast.loading("Attaching proof to deal...");
    try {
        await updateDoc(dealDocRef, {
            closureProof: {
                fileName,
                url: fileUrl,
            }
        });
        await addLogEntry("Uploaded closure proof");
        toast.success("Closure proof attached!", { id: toastId });
        setIsUploadDialogOpen(false);
    } catch (error) {
        console.error("Error attaching proof:", error);
        toast.error("Failed to attach proof.", { id: toastId });
    }
  };

  const handleRequestApproval = async () => {
    if (!dealDocRef) return;
    const toastId = toast.loading("Requesting approval...");
    try {
      await updateDoc(dealDocRef, { status: "Pending Approval" });
      toast.success("Approval requested!", { id: toastId });
    } catch (error) {
      console.error("Error requesting approval:", error);
      toast.error("Failed to request approval.", { id: toastId });
    }
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
                    {deal.status === 'Active' ? (
                        <>
                            <Button variant="outline" onClick={() => addLogEntry("Communicated with seller")}>Log Seller Talk</Button>
                            <Button variant="outline" onClick={() => addLogEntry("Communicated with buyer")}>Log Buyer Talk</Button>
                            <Button variant="outline" onClick={() => addLogEntry("Requested closure")}>Request Closure</Button>
                            <Button variant="outline" onClick={() => setIsUploadDialogOpen(true)}>Upload Proof</Button>
                        </>
                    ) : deal.status === 'Accepted' ? (
                        <Button onClick={handleRequestApproval}>
                            <ShieldQuestion className="w-4 h-4 mr-2" />
                            Request Approval
                        </Button>
                    ) : (
                        <p className="text-sm text-muted-foreground col-span-full">
                            Actions will be available once the deal is approved and active.
                        </p>
                    )}
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
