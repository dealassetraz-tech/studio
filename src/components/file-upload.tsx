
'use client';

import { useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { UploadCloud, File, Loader2 } from 'lucide-react';
import { Progress } from './ui/progress';

interface FileUploadProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadComplete: (fileName: string, fileUrl: string) => void;
}

export function FileUpload({ isOpen, onClose, onUploadComplete }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          // In a real app, the `fileUrl` would come from a file storage service like Firebase Storage
          onUploadComplete(file.name, `/uploads/${file.name}`);
          return 100;
        }
        return prev + 20;
      });
    }, 500);
  };
  
  const resetState = () => {
    setFile(null);
    setIsUploading(false);
    setUploadProgress(0);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Closure Proof</DialogTitle>
          <DialogDescription>
            Select a document to upload as proof of deal closure (e.g., signed agreement, payment receipt).
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {file ? (
            <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 rounded-md border bg-muted">
                    <File className="w-6 h-6 text-primary" />
                    <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
                    </div>
                </div>
                {isUploading && (
                    <div className="space-y-2">
                         <Progress value={uploadProgress} />
                         <p className="text-sm text-muted-foreground text-center">{uploadProgress}% uploaded...</p>
                    </div>
                )}
            </div>
          ) : (
            <div
              className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg cursor-pointer hover:bg-accent"
              onClick={() => fileInputRef.current?.click()}
            >
              <UploadCloud className="w-12 h-12 text-muted-foreground" />
              <p className="mt-4 text-sm font-medium text-foreground">Click or drag file to this area to upload</p>
              <p className="text-xs text-muted-foreground">PDF, PNG, JPG accepted.</p>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.png,.jpg,.jpeg"
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isUploading}>
            Cancel
          </Button>
          <Button onClick={handleUpload} disabled={!file || isUploading}>
            {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isUploading ? 'Uploading...' : 'Upload & Attach'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
