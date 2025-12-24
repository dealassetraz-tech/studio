'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { IndianRupee, Percent } from 'lucide-react';
import { useFirestore, useUser } from '@/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const propertyFormSchema = z.object({
  address: z.string().min(10, {
    message: 'Address must be at least 10 characters.',
  }),
  price: z.coerce.number().min(100000, { message: 'Price must be at least ₹1,00,000.' }),
  brokerage: z.coerce.number().min(0).max(10, { message: 'Brokerage must be between 0% and 10%.' }),
  status: z.enum(['Listed', 'Under Contract', 'Sold']),
});

export default function AddPropertyPage() {
  const router = useRouter();
  const firestore = useFirestore();
  const { user } = useUser();

  const form = useForm<z.infer<typeof propertyFormSchema>>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      address: '',
      price: undefined,
      brokerage: undefined,
      status: 'Listed',
    },
  });

  async function onSubmit(values: z.infer<typeof propertyFormSchema>) {
    if (!user) {
      toast.error('You must be logged in to add a property.');
      return;
    }

    const toastId = toast.loading('Listing property...');
    try {
      const propertiesCollection = collection(firestore, 'properties');
      await addDoc(propertiesCollection, {
        ...values,
        ownerId: user.uid,
        createdAt: serverTimestamp(),
      });
      toast.success('Property listed successfully!', { id: toastId });
      router.push('/dashboard');
    } catch (error) {
      console.error('Error adding property: ', error);
      toast.error('Failed to list property.', { id: toastId });
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Add New Property</CardTitle>
          <CardDescription>Enter the details of your new property to list it on the market.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Address</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 123 Sunshine Apartments, HSR Layout, Bengaluru" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Listing Price</FormLabel>
                      <FormControl>
                         <div className="relative">
                            <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input type="number" placeholder="50,00,000" className="pl-8" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="brokerage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brokerage</FormLabel>
                       <FormControl>
                        <div className="relative">
                            <Percent className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input type="number" placeholder="2" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
               <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select property status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Listed">Listed</SelectItem>
                          <SelectItem value="Under Contract">Under Contract</SelectItem>
                          <SelectItem value="Sold">Sold</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </CardContent>
            <CardFooter className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => router.push('/dashboard')}>Cancel</Button>
                <Button type="submit">Save Property</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
