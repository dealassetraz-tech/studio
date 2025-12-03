
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <div className="bg-background text-foreground flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <Card className="w-full max-w-md shadow-2xl text-center">
            <CardHeader>
                <div className="mx-auto bg-green-100 rounded-full w-16 h-16 flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <CardTitle className="pt-4">Payment Successful</CardTitle>
                <CardDescription>
                    Your subscription to the Professional plan is now active.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-6">
                    You can now access all the features included in your plan.
                </p>
                <Button asChild className="w-full">
                    <Link href="/verify">Start a Verification</Link>
                </Button>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
