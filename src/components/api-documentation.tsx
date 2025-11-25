"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Check } from "lucide-react";

export function ApiDocumentation() {
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const apiKey = "**************"; // This will be replaced by a secure method
  const baseUrl = "https://api.assetraz.com/v1";

  const handleCopy = (text: string, type: "key" | "url") => {
    navigator.clipboard.writeText(text);
    if (type === "key") {
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    } else {
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    }
  };


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
                <Button variant="outline" size="icon" onClick={() => handleCopy(apiKey, "key")}>
                  {copiedKey ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
             <div className="space-y-2">
              <label className="font-medium">Base URL</label>
              <div className="flex items-center gap-2">
                <Input readOnly value={baseUrl} className="font-mono" />
                <Button variant="outline" size="icon" onClick={() => handleCopy(baseUrl, "url")}>
                  {copiedUrl ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
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