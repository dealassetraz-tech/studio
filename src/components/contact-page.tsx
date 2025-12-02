
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
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const formSchema = z.object({
  fullName: z.string().min(1, "Full name is required."),
  workEmail: z.string().email("Invalid email address."),
  organisation: z.string().min(1, "Organisation is required."),
  interest: z.string().min(1, "Please select an interest."),
  message: z.string().min(1, "Message is required."),
});

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
            <div className="space-y-8 pt-8 text-muted-foreground">
                <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">Integration & pilots</h3>
                    <ul className="space-y-2 list-disc list-inside">
                        <li>Estate agencies doing 20+ completions per month</li>
                        <li>Portals / marketplaces that want "verified" badges</li>
                        <li>Conveyancing firms exploring automation</li>
                    </ul>
                </div>
                 <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">Implementation notes</h3>
                     <ul className="space-y-2 list-disc list-inside">
                        <li>A production version would include:</li>
                        <li className="ml-4">Secure backend calling official UK data sources</li>
                        <li className="ml-4">Authentication & rate limiting for API use</li>
                        <li className="ml-4">Data retention & audit policies compliant with UK GDPR</li>
                    </ul>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
