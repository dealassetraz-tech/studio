"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Mail, Phone, MapPin } from "lucide-react";

const formSchema = z.object({
  fullName: z.string().min(1, "Full name is required."),
  workEmail: z.string().email("Invalid email address."),
  organisation: z.string().min(1, "Organisation is required."),
  interest: z.string().min(1, "Please select an interest."),
  message: z.string().min(1, "Message is required."),
});

const contactInfo = [
    {
        icon: <Mail className="h-6 w-6 text-blue-500" />,
        label: "Email",
        value: "info@assetraz.co.uk",
    },
    {
        icon: <Phone className="h-6 w-6 text-green-500" />,
        label: "Phone",
        value: "020 1234 5678",
    },
    {
        icon: <MapPin className="h-6 w-6 text-purple-500" />,
        label: "Address",
        value: "123 Property Lane\nLondon, UK\nSW1A 1AA",
    }
]

export function ContactPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      workEmail: "",
      organisation: "",
      interest: "General enquiry",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Handle form submission
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold">Get in touch</h1>
            <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
              Interested in piloting ASSETRAZ UK with your organisation, or integrating the API into your platform? Leave your details and we'll follow up.
            </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-start">
            <Card className="shadow-lg">
                <CardContent className="p-8">
                     <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full name</FormLabel>
                              <FormControl>
                                  <Input placeholder="Jane Smith" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="workEmail"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Work email</FormLabel>
                              <FormControl>
                                  <Input placeholder="jane@agency.co.uk" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                         <FormField
                          control={form.control}
                          name="organisation"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Organisation</FormLabel>
                              <FormControl>
                                  <Input placeholder="Example Estates Ltd" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                            control={form.control}
                            name="interest"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>What are you interested in?</FormLabel>
                                 <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select an interest" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="General enquiry">General enquiry</SelectItem>
                                        <SelectItem value="Pilot program">Pilot program</SelectItem>
                                        <SelectItem value="API integration">API integration</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Tell us a bit about your use case..."
                                  className="resize-none"
                                  rows={5}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" className="w-full">
                          Send message
                        </Button>
                      </form>
                    </Form>
                </CardContent>
            </Card>
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {contactInfo.map((item, index) => (
                        <div key={index} className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                                {item.icon}
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">{item.label}</h3>
                                <p className="text-muted-foreground whitespace-pre-line">{item.value}</p>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
