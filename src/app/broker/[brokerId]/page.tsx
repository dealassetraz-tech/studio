
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail, Phone, Handshake, Star, TrendingUp, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface BrokerProfile {
    id: string;
    fullName: string;
    photoURL: string;
    email: string;
    phone: string;
    dealsClosed: number;
    totalVolume: number;
    avgRating: number;
    specialties: string[];
}

const mockBroker: BrokerProfile = {
    id: 'broker1',
    fullName: 'Rajesh Sharma',
    photoURL: 'https://picsum.photos/seed/broker1/200/200',
    email: 'rajesh.sharma@deallock.com',
    phone: '+91 98765 43210',
    dealsClosed: 45,
    totalVolume: 5000000000,
    avgRating: 4.9,
    specialties: ['Luxury Apartments', 'Commercial Real Estate', 'Mumbai South']
};


export default function BrokerProfilePage() {
    const router = useRouter();
    const params = useParams();
    const brokerId = params.brokerId as string;
    
    const [broker, setBroker] = useState<BrokerProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        // Simulate fetching broker data
        setTimeout(() => {
            setBroker(mockBroker);
            setIsLoading(false);
        }, 1000);
    }, [brokerId]);

    const stats = [
        { title: 'Deals Closed', value: broker?.dealsClosed, icon: <Handshake className="w-5 h-5 text-primary" /> },
        { title: 'Total Volume', value: `₹${(broker?.totalVolume || 0).toLocaleString('en-IN')}`, icon: <TrendingUp className="w-5 h-5 text-primary" /> },
        { title: 'Rating', value: broker?.avgRating, icon: <Star className="w-5 h-5 text-primary" /> },
    ];

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                 <div className="h-9 w-1/4 bg-muted animate-pulse rounded-md mb-8" />
                 <Card>
                    <CardHeader><div className="h-8 w-1/2 bg-muted animate-pulse rounded-md" /></CardHeader>
                    <CardContent className="space-y-6">
                        <div className="h-24 w-full bg-muted animate-pulse rounded-md" />
                        <div className="h-32 w-full bg-muted animate-pulse rounded-md" />
                    </CardContent>
                 </Card>
            </div>
        )
    }

    if (!broker) {
        return (
             <div className="container mx-auto px-4 py-8 text-center">
                <h2 className="text-2xl font-bold">Broker not found</h2>
                <p className="text-muted-foreground">This broker may no longer be on the platform.</p>
                <Button onClick={() => router.back()} className="mt-4">Go Back</Button>
            </div>
        )
    }


    return (
        <div className="bg-background min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <Button variant="outline" onClick={() => router.back()}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                    </Button>
                </div>

                <Card className="w-full max-w-4xl mx-auto">
                    <CardHeader className="bg-muted/30 p-8 text-center items-center flex flex-col">
                        <Avatar className="h-24 w-24 mb-4 border-4 border-background ring-4 ring-primary">
                            <AvatarImage src={broker.photoURL} alt={broker.fullName} />
                            <AvatarFallback>{broker.fullName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <CardTitle className="text-3xl font-headline">{broker.fullName}</CardTitle>
                        <CardDescription className="text-lg text-primary flex items-center gap-2">
                           <CheckCircle className="w-5 h-5" /> Verified Broker
                        </CardDescription>
                         <div className="flex items-center gap-6 mt-4 text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                <a href={`mailto:${broker.email}`} className="hover:underline">{broker.email}</a>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                <span>{broker.phone}</span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8">
                        <h3 className="text-lg font-semibold text-foreground mb-4">Broker Stats</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            {stats.map(stat => (
                                <Card key={stat.title} className="bg-muted/50">
                                    <CardContent className="p-4 flex items-center gap-4">
                                        {stat.icon}
                                        <div>
                                            <p className="text-sm text-muted-foreground">{stat.title}</p>
                                            <p className="text-xl font-bold text-foreground">{stat.value}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <Separator className="my-8" />
                        
                        <div>
                             <h3 className="text-lg font-semibold text-foreground mb-4">Specialties</h3>
                             <div className="flex flex-wrap gap-2">
                                {broker.specialties.map(specialty => (
                                    <Badge key={specialty} variant="secondary" className="text-sm py-1 px-3">
                                        {specialty}
                                    </Badge>
                                ))}
                             </div>
                        </div>

                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
