
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

export function BlockchainCertificate() {
  const transactionHash = "0xe4c62448f1367a7d432514f7b53f0e2d3d9f3f1a6b0c2e3a5d8b7a6f9c8d0e1f";
  return (
    <Card className="bg-primary/5 border-primary/20 shadow-lg">
        <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Blockchain Certificate</h2>
            <div className="bg-background p-6 rounded-lg border">
                <div className="flex items-center gap-3 mb-4">
                    <ShieldCheck className="w-6 h-6 text-primary" />
                    <h3 className="text-lg font-semibold">Tamper-Proof Verification</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                    This verification has been timestamped on the Ethereum blockchain, providing immutable proof of verification.
                </p>
                <div>
                    <label className="text-sm font-medium text-muted-foreground">Blockchain Transaction Hash</label>
                    <div className="mt-1 p-3 bg-secondary rounded-md font-mono text-sm break-all">
                       {transactionHash}
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
  )
}
