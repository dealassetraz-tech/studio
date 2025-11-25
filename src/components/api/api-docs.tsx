"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

const CodeBlock = ({ code, language }: { code: string; language: string }) => (
  <pre className={`language-${language} bg-gray-900 text-white p-4 rounded-lg overflow-x-auto`}>
    <code>{code}</code>
  </pre>
);

const CopyableField = ({ label, value }: { label: string; value: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <p className="text-sm font-medium text-muted-foreground mb-1">{label}</p>
      <div className="flex items-center gap-2">
        <div className="bg-gray-800 text-white font-mono text-sm p-2 rounded-md flex-grow">
          {label === 'Authentication' ? 'Bearer ••••••••••••' : value}
        </div>
        <Button variant="ghost" size="icon" onClick={handleCopy}>
          {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};


export function ApiDocs() {
  const requestBody = JSON.stringify(
    {
      "property_id": "TN123456789",
      "property_type": "residential",
      "address": "123 Main St, Chennai",
      "owner_name": "John Doe",
      "verification_type": "comprehensive"
    },
    null,
    2
  );

  const responseBody = JSON.stringify(
    {
      "verification_id": "ver_abc123",
      "status": "processing",
      "estimated_completion": "2024-01-15T10:30:00Z",
      "webhook_url": "https://your-app.com/webhook"
    },
    null,
    2
  );

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">API Documentation</h1>

      <Card className="mb-12 shadow-lg">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-6">Getting Started</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <CopyableField label="Base URL" value="https://api.assetraz.com/v1" />
            <CopyableField label="Authentication" value="YOUR_API_KEY" />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardContent className="p-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Verify Property</h2>
            <div className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">POST</div>
          </div>
          <div className="bg-gray-800 text-white font-mono text-sm p-4 rounded-lg mb-6">
            <span className="text-green-400">POST</span> /verify
            <p className="text-gray-400 mt-1">Initiate property verification process</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">Request Body</h3>
              <CodeBlock code={requestBody} language="json" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Response</h3>
              <CodeBlock code={responseBody} language="json" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
