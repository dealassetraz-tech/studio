
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

type ShareDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  reportId: string;
};

export function ShareDialog({ isOpen, onClose, reportId }: ShareDialogProps) {
    const [copied, setCopied] = useState(false);
    const { toast } = useToast();
    const reportUrl = `${window.location.origin}/verify/report/${reportId}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(reportUrl).then(() => {
            setCopied(true);
            toast({
                title: "Copied to clipboard!",
                description: "You can now share the link to the report.",
            });
            setTimeout(() => setCopied(false), 2000);
        });
    }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Verification Report</DialogTitle>
          <DialogDescription>
            Anyone with this link will be able to view the verification report.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
            <Input value={reportUrl} readOnly />
            <Button onClick={handleCopy} size="icon">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
