
'use client';

import { VerifyPropertyOutput } from "@/ai/flows/verify-property";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, BadgeCheck, Building, Calendar, Download, FileText, Home, Landmark, List, Siren, User, Users } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

type VerificationReportProps = {
  report: VerifyPropertyOutput;
};

const getAlertIcon = (level: 'info' | 'warning' | 'critical') => {
  switch (level) {
    case 'info':
      return <BadgeCheck className="h-5 w-5 text-blue-500" />;
    case 'warning':
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    case 'critical':
      return <Siren className="h-5 w-5 text-red-500" />;
  }
};


export function VerificationReport({ report }: VerificationReportProps) {

  return (
    <div className="max-w-4xl mx-auto space-y-8">
       <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-4">
             <FileText className="w-8 h-8 text-primary" />
            <div>
              <CardTitle>Verification Summary</CardTitle>
              <CardDescription>
                Report ID: {report.verificationId}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div>
                    <p className="text-muted-foreground">Generated</p>
                    <p className="font-semibold">{new Date(report.timestamp).toLocaleString()}</p>
                </div>
                 <div>
                    <p className="text-muted-foreground">Title Number</p>
                    <p className="font-semibold">{report.propertyDetails.titleNumber}</p>
                </div>
                 <div>
                    <p className="text-muted-foreground">Tenure</p>
                    <p className="font-semibold">{report.propertyDetails.tenure}</p>
                </div>
            </div>
            <Separator className="my-4" />
            <div className="text-sm">
                 <p className="text-muted-foreground">Address</p>
                 <p className="font-semibold">{report.propertyDetails.address}</p>
            </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
            <div className="flex items-center gap-4">
                <Users className="w-8 h-8 text-primary" />
                <div>
                    <CardTitle>Ownership Details</CardTitle>
                    <CardDescription>
                        Registered proprietors of the property.
                    </CardDescription>
                </div>
            </div>
        </CardHeader>
        <CardContent>
           <p className="text-sm text-muted-foreground mb-1">Ownership Type</p>
           <p className="font-semibold mb-4">{report.ownership.ownershipType}</p>
           <p className="text-sm text-muted-foreground mb-2">Proprietors</p>
           <ul className="space-y-2">
            {report.ownership.proprietors.map((p, i) => (
                <li key={i} className="flex items-center gap-2 font-semibold">
                    <User className="w-4 h-4 text-muted-foreground" />
                    {p}
                </li>
            ))}
           </ul>
        </CardContent>
      </Card>
      
      {report.companyDetails && (
        <Card className="shadow-lg">
          <CardHeader>
             <div className="flex items-center gap-4">
                <Building className="w-8 h-8 text-primary" />
                <div>
                    <CardTitle>Company Details</CardTitle>
                    <CardDescription>
                        Information on the owning company.
                    </CardDescription>
                </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
             <div>
                <p className="text-muted-foreground">Company Name</p>
                <p className="font-semibold">{report.companyDetails.companyName}</p>
              </div>
               <div>
                <p className="text-sm text-muted-foreground">Company Number</p>
                <p className="font-semibold">{report.companyDetails.companyNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Directors</p>
                <ul className="list-disc list-inside font-semibold">
                    {report.companyDetails.directors.map(d => <li key={d}>{d}</li>)}
                </ul>
              </div>
          </CardContent>
        </Card>
      )}

      {report.pricePaidHistory && report.pricePaidHistory.length > 0 && (
        <Card className="shadow-lg">
          <CardHeader>
             <div className="flex items-center gap-4">
                <Landmark className="w-8 h-8 text-primary" />
                <div>
                    <CardTitle>Price Paid History</CardTitle>
                    <CardDescription>
                        Historical sales data for the property.
                    </CardDescription>
                </div>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {report.pricePaidHistory.map((h, i) => (
                <li key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="font-semibold">{h.price}</span>
                    </div>
                    <span className="text-muted-foreground text-sm">{new Date(h.date).toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

       <Card className="shadow-lg">
        <CardHeader>
             <div className="flex items-center gap-4">
                <Siren className="w-8 h-8 text-primary" />
                <div>
                    <CardTitle>Alerts & Notices</CardTitle>
                    <CardDescription>
                        Important notices found during verification.
                    </CardDescription>
                </div>
            </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {report.alerts.map((alert, index) => (
            <div key={index} className="flex items-start gap-4 p-4 bg-secondary/50 rounded-lg">
                <div className="flex-shrink-0">{getAlertIcon(alert.level)}</div>
                <div>
                    <p className="font-semibold">{alert.message}</p>
                </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
