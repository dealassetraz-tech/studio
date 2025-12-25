
'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { IndianRupee, Bed, Bath, ArrowLeft, Heart, X } from 'lucide-react';
import placeholderImages from '@/lib/placeholder-images.json';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';

interface Property {
  id: string;
  address: string;
  price: number;
  status: 'Listed' | 'Under Contract' | 'Sold';
  image?: {
    src: string;
    'data-ai-hint': string;
  };
  details: {
    bedrooms: number;
    bathrooms: number;
  };
  type: 'Apartment' | 'Villa' | 'Studio' | 'Penthouse';
  location: string;
}

const mockWishlistItems: Property[] = [
    { id: 'prop2', address: '2B, Green Park, Hauz Khas, Delhi', price: 85000000, status: 'Listed', image: { src: "https://picsum.photos/seed/property2/600/400", "data-ai-hint": "luxury villa"}, details: { bedrooms: 4, bathrooms: 5 }, type: 'Villa', location: 'Delhi' },
    { id: 'prop3', address: 'Penthouse, The Imperial, Tardeo, Mumbai', price: 300000000, status: 'Listed', image: { src: "https://picsum.photos/seed/property3/600/400", "data-ai-hint": "modern penthouse"}, details: { bedrooms: 5, bathrooms: 6 }, type: 'Penthouse', location: 'Mumbai' },
];

export default function WishlistPage() {
  const router = useRouter();
  const [wishlistItems, setWishlistItems] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
        setWishlistItems(mockWishlistItems);
        setIsLoading(false);
    }, 1000);
  }, []);

  const removeFromWishlist = async (propertyId: string) => {
    setWishlistItems(currentItems => currentItems.filter(item => item.id !== propertyId));
    toast.success("Removed from wishlist");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-headline">My Wishlist</h1>
          <p className="text-muted-foreground">Your saved properties for future consideration.</p>
        </div>
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <div className="h-48 w-full bg-muted animate-pulse rounded-t-lg" />
              <CardContent className="p-4 space-y-3">
                <div className="h-5 w-3/4 bg-muted animate-pulse rounded-md" />
                <div className="h-5 w-1/2 bg-muted animate-pulse rounded-md" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : wishlistItems && wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map(prop => (
            <Card key={prop.id} className="overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow duration-300 group">
              <div className="relative">
                <Image
                  src={prop.image?.src || placeholderImages.properties[0].src}
                  alt={prop.address}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                  data-ai-hint={prop.image?.['data-ai-hint'] || 'modern apartment'}
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button asChild>
                    <Link href={`/make-offer/${prop.id}`}>Make an Offer</Link>
                  </Button>
                </div>
                 <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 rounded-full h-10 w-10 bg-destructive/80 hover:bg-destructive text-white"
                    onClick={() => removeFromWishlist(prop.id)}
                >
                    <X className="w-5 h-5" />
                </Button>
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold text-lg truncate text-foreground">{prop.address}</h3>
                <div className="flex items-center text-muted-foreground mt-2">
                  <IndianRupee className="w-5 h-5 mr-1" />
                  <span className="text-xl font-bold text-foreground">
                    {prop.price.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex items-center text-muted-foreground mt-2 gap-4 text-sm">
                  <div className="flex items-center gap-1.5">
                    <Bed className="w-4 h-4" />
                    <span>{prop.details.bedrooms} Beds</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Bath className="w-4 h-4" />
                    <span>{prop.details.bathrooms} Baths</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="h-64 flex flex-col items-center justify-center text-center bg-muted/30 rounded-lg">
          <Heart className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold text-foreground">Your Wishlist is Empty</h3>
          <p className="text-muted-foreground mt-2">
            Start browsing properties and add your favorites to your wishlist.
          </p>
           <Button asChild className="mt-4">
                <Link href="/buyer-dashboard/browse-properties">Browse Properties</Link>
            </Button>
        </div>
      )}
    </div>
  );
}
