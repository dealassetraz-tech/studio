import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Check } from "lucide-react";

// This component uses state, but it can be a server component if we extract the copy logic.
// For now, we will keep it as a server component and the copy functionality will not work.
// A future improvement could be to create a client component for the copy functionality.

export function ApiDocumentation() {
  const apiKey = "**************"; // This will be replaced by a secure method
  const baseUrl = "https://api.assetraz.com/v1";

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">API Documentation</h1>
        <p className="text-lg text-muted-foreground mb-10">
          Integrate with ASSETRAZ to automate property verification.
        </p>

        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle>Your API Credentials</CardTitle>
            <CardDescription>
              Use these credentials to authenticate your API requests. Keep your API key secure.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="font-medium">API Key</label>
              <div className="flex items-center gap-2">
                <Input type="password" readOnly value={apiKey} className="font-mono" />
                <Button variant="outline" size="icon" disabled>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
             <div className="space-y-2">
              <label className="font-medium">Base URL</label>
              <div className="flex items-center gap-2">
                <Input readOnly value={baseUrl} className="font-mono" />
                <Button variant="outline" size="icon" disabled>
                   <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-bold mt-12 mb-4">Endpoints</h2>
        
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle>/verify</CardTitle>
                <CardDescription>
                    Submit a property for verification.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="font-mono text-sm bg-muted p-4 rounded-lg">
                    <span className="text-green-600">POST</span> {baseUrl}/verify
                </p>
            </CardContent>
        </Card>

      </div>
    </div>
  );
}
