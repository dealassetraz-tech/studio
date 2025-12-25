
"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IndianRupee, Bed, Bath, ArrowLeft, Filter, Heart } from "lucide-react";
import placeholderImages from "@/lib/placeholder-images.json";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";


interface Property {
  id: string;
  address: string;
  price: number;
  status: "Listed" | "Under Contract" | "Sold";
  image?: {
    src: string;
    "data-ai-hint": string;
  };
  details: {
    bedrooms: number;
    bathrooms: number;
  };
  type: 'Apartment' | 'Villa' | 'Studio' | 'Penthouse';
  location: string;
}

const mockProperties: Property[] = [
    { id: 'prop1', address: '101, Ocean View, Marine Drive, Mumbai', price: 150000000, status: 'Listed', image: placeholderImages.properties[0], details: { bedrooms: 3, bathrooms: 3 }, type: 'Apartment', location: 'Mumbai' },
    { id: 'prop2', address: '2B, Green Park, Hauz Khas, Delhi', price: 85000000, status: 'Listed', image: { src: "https://picsum.photos/seed/property2/600/400", "data-ai-hint": "luxury villa"}, details: { bedrooms: 4, bathrooms: 5 }, type: 'Villa', location: 'Delhi' },
    { id: 'prop3', address: 'Penthouse, The Imperial, Tardeo, Mumbai', price: 300000000, status: 'Listed', image: { src: "https://picsum.photos/seed/property3/600/400", "data-ai-hint": "modern penthouse"}, details: { bedrooms: 5, bathrooms: 6 }, type: 'Penthouse', location: 'Mumbai' },
    { id: 'prop5', address: 'Modern Studio, Koramangala, Bengaluru', price: 9000000, status: 'Listed', image: { src: "https://picsum.photos/seed/property5/600/400", "data-ai-hint": "compact studio"}, details: { bedrooms: 1, bathrooms: 1 }, type: 'Studio', location: 'Bengaluru' },
];

export default function BrowsePropertiesPage() {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [wishlist, setWishlist] = useState<string[]>(['prop2']);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
        setProperties(mockProperties);
        setIsLoading(false);
    }, 1000);
  }, []);
  
  const [propertyTypeFilter, setPropertyTypeFilter] = useState('All');
  const [priceRangeFilter, setPriceRangeFilter] = useState([200000000]);
  const [locationFilter, setLocationFilter] = useState('');

  const toggleWishlist = async (propertyId: string) => {
    const isWishlisted = wishlist.includes(propertyId);
    
    if (isWishlisted) {
        setWishlist(wishlist.filter(id => id !== propertyId));
        toast.success("Removed from wishlist");
    } else {
        setWishlist([...wishlist, propertyId]);
        toast.success("Added to wishlist");
    }
  };


  const formatPrice = (value: number) => {
    if (value >= 10000000) {
        return `${(value / 10000000).toFixed(1)} Cr`;
    }
    return `${(value / 100000).toFixed(0)} L`;
  };

  const filteredProperties = useMemo(() => {
    if (!properties) return [];
    return properties.filter(prop => {
      const typeMatch = propertyTypeFilter === 'All' || prop.type === propertyTypeFilter;
      const priceMatch = prop.price <= priceRangeFilter[0];
      const locationMatch = locationFilter === '' || prop.location.toLowerCase().includes(locationFilter.toLowerCase());
      return typeMatch && priceMatch && locationMatch;
    });
  }, [properties, propertyTypeFilter, priceRangeFilter, locationFilter]);


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl font-bold font-headline">Browse Properties</h1>
            <p className="text-muted-foreground">Find your next investment or dream home.</p>
        </div>
        <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
        </Button>
      </div>

       <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary" />
            <CardTitle>Filter Properties</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Label htmlFor="location-filter">Location</Label>
            <Input 
              id="location-filter"
              placeholder="e.g., Bengaluru, Mumbai..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="type-filter">Property Type</Label>
            <Select value={propertyTypeFilter} onValueChange={setPropertyTypeFilter}>
              <SelectTrigger id="type-filter">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Types</SelectItem>
                <SelectItem value="Apartment">Apartment</SelectItem>
                <SelectItem value="Villa">Villa</SelectItem>
                <SelectItem value="Studio">Studio</SelectItem>
                <SelectItem value="Penthouse">Penthouse</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="price-filter">Max Price (₹)</Label>
            <div className="flex items-center gap-4 pt-2">
                <Slider
                    id="price-filter"
                    min={2000000}
                    max={200000000}
                    step={100000}
                    value={priceRangeFilter}
                    onValueChange={setPriceRangeFilter}
                />
                <span className="text-lg font-semibold w-24 text-right">{formatPrice(priceRangeFilter[0])}</span>
             </div>
          </div>
        </CardContent>
      </Card>

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
      ) : filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((prop) => (
            <Card key={prop.id} className="overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow duration-300 group">
                <div className="relative">
                    <Image
                        src={prop.image?.src || placeholderImages.properties[0].src}
                        alt={prop.address}
                        width={600}
                        height={400}
                        className="w-full h-48 object-cover"
                        data-ai-hint={prop.image?.["data-ai-hint"] || 'modern apartment'}
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button asChild>
                            <Link href={`/make-offer/${prop.id}`}>Make an Offer</Link>
                        </Button>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 rounded-full h-10 w-10 bg-black/30 hover:bg-black/50 text-white"
                        onClick={() => toggleWishlist(prop.id)}
                    >
                        <Heart className={cn("w-5 h-5", wishlist.includes(prop.id) ? 'fill-rose-500 text-rose-500' : 'text-white')} />
                    </Button>
                </div>

              <CardContent className="p-4">
                <h3 className="font-semibold text-lg truncate text-foreground">{prop.address}</h3>
                <div className="flex items-center text-muted-foreground mt-2">
                  <IndianRupee className="w-5 h-5 mr-1" /> 
                  <span className="text-xl font-bold text-foreground">
                    {prop.price.toLocaleString("en-IN")}
                  </span>
                </div>
                 <div className="flex items-center text-muted-foreground mt-2 gap-4 text-sm">
                    <div className="flex items-center gap-1.5">
                        <Bed className="w-4 h-4"/>
                        <span>{prop.details.bedrooms} Beds</span>
                    </div>
                     <div className="flex items-center gap-1.5">
                        <Bath className="w-4 h-4"/>
                        <span>{prop.details.bathrooms} Baths</span>
                    </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="h-64 flex flex-col items-center justify-center text-center bg-muted/30 rounded-lg">
          <h3 className="text-xl font-semibold text-foreground">No Properties Found</h3>
          <p className="text-muted-foreground mt-2">
            No properties match your current filter criteria. Try adjusting your filters.
          </p>
        </div>
      )}
    </div>
  );
}
