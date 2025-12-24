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
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Building, IndianRupee, Link as LinkIcon, Shuffle, Bed, Bath, MapPin } from 'lucide-react';
import { useCollection, useFirestore, useMemoFirebase, useUser } from '@/firebase';
import { collection, query } from 'firebase/firestore';

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

interface SellerListing {
    id: string;
    seller: {
        name: string;
        avatar: string;
    },
    property: {
        address: string;
        price: number;
        bedrooms: number;
        bathrooms: number;
        type: string;
    }
}

interface Match {
    id: string;
    buyerRequest: BuyerRequest;
    sellerListing: SellerListing;
}

// This is mock data. In a real app, you would fetch this and run matching logic.
const mockBuyerRequests: BuyerRequest[] = [
    { 
        id: 'req1', 
        buyer: { name: 'Suresh G.', avatar: 'https://picsum.photos/seed/buyer1/100/100' }, 
        requirements: { location: 'HSR Layout, Bengaluru', type: 'Apartment', bedrooms: 2, budget: 10000000 } 
    },
    { 
        id: 'req2', 
        buyer: { name: 'Nisha D.', avatar: 'https://picsum.photos/seed/buyer2/100/100' }, 
        requirements: { location: 'Jubilee Hills, Hyderabad', type: 'Villa', bedrooms: 3, budget: 18500000 } 
    },
];

const mockSellerListings: SellerListing[] = [
    {
        id: 'list1',
        seller: { name: 'Priya S.', avatar: 'https://picsum.photos/seed/seller1/100/100' },
        property: { address: '2 BHK Apartment, HSR Layout, Bengaluru', price: 9500000, bedrooms: 2, bathrooms: 2, type: 'Apartment' }
    },
    {
        id: 'list2',
        seller: { name: 'Vikram R.', avatar: 'https://picsum.photos/seed/seller2/100/100' },
        property: { address: '3 BHK Villa, Jubilee Hills, Hyderabad', price: 18000000, bedrooms: 3, bathrooms: 3, type: 'Villa' }
    },
];


const findMatches = (buyers: BuyerRequest[], sellers: SellerListing[]): Match[] => {
    const matches: Match[] = [];
    if (!buyers || !sellers) return matches;

    buyers.forEach(buyerReq => {
        sellers.forEach(sellerList => {
            const priceMatch = sellerList.property.price <= buyerReq.requirements.budget * 1.1 && sellerList.property.price >= buyerReq.requirements.budget * 0.9;
            const typeMatch = sellerList.property.type === buyerReq.requirements.type;
            const bedroomMatch = sellerList.property.bedrooms === buyerReq.requirements.bedrooms;
            const locationMatch = sellerList.property.address.toLowerCase().includes(buyerReq.requirements.location.toLowerCase().split(',')[0]);

            if (priceMatch && typeMatch && bedroomMatch && locationMatch) {
                matches.push({
                    id: `match-${buyerReq.id}-${sellerList.id}`,
                    buyerRequest: buyerReq,
                    sellerListing: sellerList,
                });
            }
        });
    });
    return matches;
}


export default function MatchingRequestsPage() {
    const router = useRouter();
    const firestore = useFirestore();
    const { user } = useUser();

    // In a real app, you would have collections for buyer_requests and seller_listings
    const buyerRequestsQuery = useMemoFirebase(() => {
        if (!firestore || !user) return null;
        return collection(firestore, 'buyer_requests');
    }, [firestore, user]);
    const { data: buyers, isLoading: buyersLoading } = useCollection<BuyerRequest>(buyerRequestsQuery);

    const sellerListingsQuery = useMemoFirebase(() => {
        if (!firestore || !user) return null;
        return collection(firestore, 'seller_listings');
    }, [firestore, user]);
    const { data: sellers, isLoading: sellersLoading } = useCollection<SellerListing>(sellerListingsQuery);
    
    // For demo, using mock data as Firestore collections are not populated.
    const isLoading = false; // buyersLoading || sellersLoading;
    const matches = findMatches(mockBuyerRequests, mockSellerListings);

    const renderSkeleton = () => (
        <Card className="animate-pulse">
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div className="h-6 w-1/2 bg-muted rounded-md" />
                    <div className="h-10 w-full bg-muted rounded-md" />
                    <div className="h-10 w-full bg-muted rounded-md" />
                </div>
                 <div className="space-y-4">
                    <div className="h-6 w-1/2 bg-muted rounded-md" />
                    <div className="h-10 w-full bg-muted rounded-md" />
                    <div className="h-10 w-full bg-muted rounded-md" />
                </div>
            </CardContent>
            <div className="px-6 pb-6 text-center">
                 <div className="h-10 w-40 bg-muted rounded-md mx-auto" />
            </div>
        </Card>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Matching Requests</h1>
                    <p className="text-muted-foreground">
                        Connect buyers and sellers with aligned interests.
                    </p>
                </div>
                <Button variant="outline" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                </Button>
            </div>

            <div className="space-y-6">
                {isLoading ? (
                    [...Array(2)].map((_, i) => renderSkeleton())
                ) : matches.length > 0 ? (
                    matches.map((match) => (
                    <Card key={match.id} className="shadow-lg border-primary/20">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shuffle className="w-6 h-6 text-primary" />
                                Potential Match Found!
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                            {/* Buyer Request Card */}
                            <Card className="bg-muted/30">
                                <CardHeader>
                                    <CardTitle className="text-xl flex items-center gap-3">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src={match.buyerRequest.buyer.avatar} />
                                            <AvatarFallback>{match.buyerRequest.buyer.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <span>Buyer: {match.buyerRequest.buyer.name}</span>
                                            <CardDescription>Is looking for...</CardDescription>
                                        </div>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3 text-sm">
                                    <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-muted-foreground" /> <span>{match.buyerRequest.requirements.location}</span></div>
                                    <div className="flex items-center gap-2"><Building className="w-4 h-4 text-muted-foreground" /> <span>{match.buyerRequest.requirements.type}</span></div>
                                    <div className="flex items-center gap-2"><Bed className="w-4 h-4 text-muted-foreground" /> <span>{match.buyerRequest.requirements.bedrooms} Bedrooms</span></div>
                                    <div className="flex items-center gap-2"><IndianRupee className="w-4 h-4 text-muted-foreground" /> <span>Budget: ~₹{match.buyerRequest.requirements.budget.toLocaleString('en-IN')}</span></div>
                                </CardContent>
                            </Card>

                             {/* Seller Listing Card */}
                             <Card className="bg-muted/30">
                                <CardHeader>
                                    <CardTitle className="text-xl flex items-center gap-3">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src={match.sellerListing.seller.avatar} />
                                            <AvatarFallback>{match.sellerListing.seller.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <span>Seller: {match.sellerListing.seller.name}</span>
                                            <CardDescription>Is offering...</CardDescription>
                                        </div>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3 text-sm">
                                    <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-muted-foreground" /> <span>{match.sellerListing.property.address}</span></div>
                                    <div className="flex items-center gap-2"><Building className="w-4 h-4 text-muted-foreground" /> <span>{match.sellerListing.property.type}</span></div>
                                    <div className="flex items-center gap-2"><Bed className="w-4 h-4 text-muted-foreground" /> <span>{match.sellerListing.property.bedrooms} Beds / {match.sellerListing.property.bathrooms} Baths</span></div>
                                    <div className="flex items-center gap-2"><IndianRupee className="w-4 h-4 text-muted-foreground" /> <span className="font-semibold">Price: ₹{match.sellerListing.property.price.toLocaleString('en-IN')}</span></div>
                                </CardContent>
                            </Card>
                        </CardContent>
                         <div className="p-6 text-center">
                            <Button>
                                <LinkIcon className="w-4 h-4 mr-2" />
                                Initiate Deal
                            </Button>
                        </div>
                    </Card>
                    ))
                ) : (
                    <Card>
                        <CardContent className="h-64 flex flex-col items-center justify-center text-center">
                            <Shuffle className="w-12 h-12 text-muted-foreground mb-4" />
                            <h3 className="text-xl font-semibold text-foreground">No Matches Found</h3>
                            <p className="text-muted-foreground mt-2">
                                There are currently no matching buyer and seller requests.
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
