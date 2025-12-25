
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
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Building, User, Check, X, Bell, Info } from 'lucide-react';
import { useCollection, useFirestore, useUser, useMemoFirebase, useUsers, updateDocumentNonBlocking } from '@/firebase';
import { collection, query, where, doc, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { useMemo } from 'react';
import Link from 'next/link';

interface Property {
  id: string;
  address: string;
  price: number;
  brokerage: number;
  ownerId: string;
}

export default function NewDealsPage() {
  const router = useRouter();
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();

  const propertiesQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return query(
      collection(firestore, "properties"),
      where("brokerId", "==", user.uid),
      where("brokerAssignmentStatus", "==", "pending")
    );
  }, [firestore, user]);

  const { data: properties, isLoading: propertiesLoading } = useCollection<Property>(propertiesQuery);

  const ownerIds = useMemo(() => {
    if (!properties) return [];
    return [...new Set(properties.map(p => p.ownerId))];
  }, [properties]);

  const { data: owners, isLoading: ownersLoading } = useUsers(ownerIds);

  const ownersMap = useMemo(() => {
    if (!owners) return new Map();
    return new Map(owners.map(o => [o.id, o]));
  }, [owners]);

  const isLoading = isUserLoading || propertiesLoading || (ownerIds.length > 0 && ownersLoading);

  const handleAssignmentResponse = async (propertyId: string, status: 'accepted' | 'rejected') => {
    if (!firestore) return;
    const toastId = toast.loading(`Updating assignment to ${status}...`);
    try {
      const propertyDocRef = doc(firestore, 'properties', propertyId);
      await updateDoc(propertyDocRef, { brokerAssignmentStatus: status });
      toast.success('Assignment updated!', { id: toastId });
    } catch (error) {
      console.error('Error responding to assignment:', error);
      toast.error('Failed to update assignment.', { id: toastId });
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
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-headline">New Deal Assignments</h1>
          <p className="text-muted-foreground">
            Review and respond to new property brokerage requests.
          </p>
        </div>
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Assignment Requests</CardTitle>
          <CardDescription>
            These property owners have requested you to be their broker.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Brokerage</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? renderSkeleton() : properties && properties.map((prop) => (
                  <TableRow key={prop.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Building className="w-5 h-5 text-muted-foreground" />
                        <span className="font-medium text-foreground">{prop.address}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {ownersMap.has(prop.ownerId) ? (
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={ownersMap.get(prop.ownerId)?.photoURL || ''} />
                            <AvatarFallback>{ownersMap.get(prop.ownerId)?.fullName?.[0]}</AvatarFallback>
                          </Avatar>
                          <span>{ownersMap.get(prop.ownerId)?.fullName}</span>
                        </div>
                      ) : (
                        <div className="h-9 w-full bg-muted animate-pulse rounded-md" />
                      )}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-foreground">
                      ₹{prop.price.toLocaleString('en-IN')}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-primary">
                      {prop.brokerage}%
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex gap-2 justify-center">
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/broker-dashboard">
                                <Info className="w-4 h-4 mr-1" />
                                Details
                            </Link>
                        </Button>
                        <Button variant="outline" size="sm" className="border-primary/50 text-primary hover:bg-primary/10 hover:text-primary" onClick={() => handleAssignmentResponse(prop.id, 'accepted')}>
                          <Check className="w-4 h-4 mr-1" />
                          Accept
                        </Button>
                        <Button variant="outline" size="sm" className="border-destructive/50 text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => handleAssignmentResponse(prop.id, 'rejected')}>
                          <X className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {!isLoading && (!properties || properties.length === 0) && (
              <div className="h-64 flex flex-col items-center justify-center text-center">
                <Bell className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold text-foreground">No New Assignments</h3>
                <p className="text-muted-foreground mt-2">
                  You have no new brokerage requests at this time.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
