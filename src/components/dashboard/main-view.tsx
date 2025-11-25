"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UploadCloud } from "lucide-react";
import { useRef } from "react";

export function MainView() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("File selected:", file.name);
      // Future implementation: handle the file upload, read it as a data URI,
      // and update state to show the screenshot and trigger AI generation.
    }
  };

  return (
    <div className="flex items-center justify-center w-full" style={{ minHeight: 'calc(100vh - 10rem)' }}>
      <Card className="w-full max-w-3xl shadow-lg">
        <CardContent className="p-10 text-center">
            <div className="border-2 border-dashed border-muted-foreground/30 rounded-xl p-12 flex flex-col items-center hover:border-primary/50 transition-colors duration-300">
              <UploadCloud className="mx-auto h-16 w-16 text-primary" />
              <h2 className="mt-6 text-3xl font-headline font-bold tracking-tight text-foreground sm:text-4xl">
                Visually Enhanced Website Generator
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                Start by uploading a screenshot of your reference website. Our AI will analyze it and generate an enhanced, production-ready codebase.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button size="lg" onClick={handleUploadClick}>
                  <UploadCloud className="mr-2 h-5 w-5" />
                  Upload Screenshot
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/png, image/jpeg, image/webp"
                />
              </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
