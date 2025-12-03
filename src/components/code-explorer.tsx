'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, File as FileIcon, Folder as FolderIcon } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';

type File = {
  name: string;
  content: string;
};

type Directory = {
  name: string;
  files: File[];
  dirs: Directory[];
};

const fileTree: Directory = {
  name: 'root',
  dirs: [
    {
      name: 'src',
      dirs: [
        {
          name: 'app',
          dirs: [
            { name: 'about', files: [{ name: 'page.tsx', content: `import { Header } from "@/components/header";
import { AboutPage } from "@/components/about-page";

export default function About() {
  return (
    <div className="bg-background text-foreground flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <AboutPage />
      </main>
    </div>
  );
}
` }], dirs: [] },
            { name: 'analytics', files: [{ name: 'page.tsx', content: `import { Header } from "@/components/header";
import { Analytics } from "@/components/analytics/analytics";

export default function AnalyticsPage() {
  return (
    <div className="bg-secondary/50 text-foreground flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Analytics />
      </main>
    </div>
  );
}
` }], dirs: [] },
            { name: 'api', files: [{ name: 'page.tsx', content: `import { Header } from "@/components/header";
import { ApiDocumentation } from "@/components/api-documentation";

export default function ApiPage() {
  return (
    <div className="bg-background text-foreground flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <ApiDocumentation />
      </main>
    </div>
  );
}
` }], dirs: [] },
            { name: 'auth', files: [{ name: 'page.tsx', content: `import { Header } from "@/components/header";
import { AuthForm } from "@/components/auth-form";

export default function AuthPage() {
  return (
    <div className="bg-background text-foreground flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <AuthForm />
      </main>
    </div>
  );
}
` }], dirs: [] },
            { name: 'contact', files: [{ name: 'page.tsx', content: `import { Header } from "@/components/header";
import { ContactPage } from "@/components/contact-page";

export default function Contact() {
  return (
    <div className="bg-background text-foreground flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <ContactPage />
      </main>
    </div>
  );
}
` }], dirs: [] },
            { name: 'dashboard', files: [{ name: 'page.tsx', content: `import { Header } from "@/components/header";
import { Dashboard } from "@/components/dashboard/dashboard";

export default function DashboardPage() {
  return (
    <div className="bg-secondary/50 text-foreground flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Dashboard />
      </main>
    </div>
  );
}
` }], dirs: [] },
            { name: 'features', files: [{ name: 'page.tsx', content: `import { Header } from "@/components/header";
import { Features } from "@/components/features";

export default function FeaturesPage() {
  return (
    <div className="bg-background text-foreground flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Features />
      </main>
    </div>
  );
}
` }], dirs: [] },
            { name: 'pricing', files: [{ name: 'page.tsx', content: `import { Header } from "@/components/header";
import { PricingPage } from "@/components/pricing-page";

export default function Pricing() {
  return (
    <div className="bg-background text-foreground flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <PricingPage />
      </main>
    </div>
  );
}
` }], dirs: [] },
            { name: 'verify', files: [{ name: 'page.tsx', content: `"use client";

import { Header } from "@/components/header";
import { VerificationForm } from "@/components/verification-form";
import { useState } from "react";
import { VerifyPropertyOutput } from "@/ai/flows/verify-property";
import { VerificationReport } from "@/components/verification-report";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function VerifyPage() {
  const [report, setReport] = useState<VerifyPropertyOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVerification = async (data: VerifyPropertyOutput) => {
    setReport(data);
    setIsLoading(false);
  };
  
  const handleDownload = () => {
    if (!report) return;

    let reportText = \`ASSETRAZ UK - Verification Report\n\`;
    reportText += \`====================================\n\n\`;
    reportText += \`Report ID: \${report.verificationId}\n\`;
    reportText += \`Timestamp: \${new Date(report.timestamp).toLocaleString()}\n\n\`;

    reportText += \`--- Property Details ---\n\`;
    reportText += \`Title Number: \${report.propertyDetails.titleNumber}\n\`;
    reportText += \`Address: \${report.propertyDetails.address}\n\`;
    reportText += \`Tenure: \${report.propertyDetails.tenure}\n\n\`;

    reportText += \`--- Ownership ---\n\`;
    reportText += \`Ownership Type: \${report.ownership.ownershipType}\n\`;
    reportText += \`Proprietors:\n\`;
    report.ownership.proprietors.forEach(p => {
      reportText += \`  - \${p}\n\`;
    });
    reportText += \`\n\`;

    if (report.companyDetails) {
      reportText += \`--- Company Details ---\n\`;
      reportText += \`Company Name: \${report.companyDetails.companyName}\n\`;
      reportText += \`Company Number: \${report.companyDetails.companyNumber}\n\`;
      reportText += \`Directors:\n\`;
      report.companyDetails.directors.forEach(d => {
        reportText += \`  - \${d}\n\`;
      });
      reportText += \`\n\`;
    }

    if (report.pricePaidHistory && report.pricePaidHistory.length > 0) {
      reportText += \`--- Price Paid History ---\n\`;
      report.pricePaidHistory.forEach(h => {
        reportText += \`Date: \${new Date(h.date).toLocaleDateString()}, Price: \${h.price}\n\`;
      });
      reportText += \`\n\`;
    }

    reportText += \`--- Alerts & Notices ---\n\`;
    report.alerts.forEach(a => {
      reportText += \`[\${a.level.toUpperCase()}] \${a.message}\n\`;
    });
    
    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = \`verification-report-\${report.verificationId}.txt\`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (report) {
    return (
     <div className="bg-secondary/50 text-foreground flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12 md:py-20">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
               <div>
                 <h1 className="text-4xl md:text-5xl font-bold text-left">
                  Verification Report
                </h1>
                <p className="text-lg text-muted-foreground text-left mt-1">
                  A summary of the checks performed on the property.
                </p>
               </div>
                <Button onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" />
                    Download Report
                </Button>
            </div>
           <VerificationReport report={report} />
        </div>
      </main>
    </div>
    )
  }

  return (
    <div className="bg-secondary/50 text-foreground flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h1 className="text-4xl md:text-5xl font-bold">
              Property Verification
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Enter property details to run a verification.
            </p>
          </div>
          <VerificationForm onVerify={handleVerification} setIsLoading={setIsLoading} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
}
` }], dirs: [] },
          ],
          files: [
            { name: 'globals.css', content: `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 240 10% 100%; /* Almost white */
    --foreground: 240 60% 9%; /* Dark Blue-Purple */
    --card: 240 10% 100%;
    --card-foreground: 240 60% 9%;
    --popover: 240 10% 100%;
    --popover-foreground: 240 60% 9%;
    --primary: 250 80% 60%; /* Vibrant Purple */
    --primary-foreground: 210 40% 98%;
    --secondary: 240 50% 95%;
    --secondary-foreground: 240 60% 9%;
    --muted: 240 50% 90%;
    --muted-foreground: 240 5% 45%;
    --accent: 250 80% 95%;
    --accent-foreground: 250 80% 20%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 10% 90%;
    --input: 240 10% 90%;
    --ring: 250 80% 70%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 240 60% 9%;
    --foreground: 210 40% 98%;
    --card: 240 50% 15%;
    --card-foreground: 210 40% 98%;
    --popover: 240 50% 15%;
    --popover-foreground: 210 40% 98%;
    --primary: 250 80% 60%;
    --primary-foreground: 210 40% 98%;
    --secondary: 240 50% 25%;
    --secondary-foreground: 210 40% 98%;
    --muted: 240 40% 20%;
    --muted-foreground: 240 5% 65%;
    --accent: 250 80% 70%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 240 40% 25%;
    --input: 240 40% 25%;
    --ring: 250 80% 70%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
  h1, h2, h3, h4, h5, h6 {
    @apply font-headline;
  }
}
` },
            { name: 'layout.tsx', content: `import type {Metadata} from 'next';
import './globals.css';
import { Inter, Space_Grotesk } from 'next/font/google';
import { FirebaseClientProvider } from '@/firebase';
import { Toaster } from '@/components/ui/toaster';
import { Footer } from '@/components/footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });

export const metadata: Metadata = {
  title: 'ASSETRAZ UK',
  description: 'Property & Owner Verification',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={\`\${inter.variable} \${spaceGrotesk.variable}\`}>
       <body className="font-sans flex flex-col min-h-screen">
        <FirebaseClientProvider>
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
        </FirebaseClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
` },
            { name: 'page.tsx', content: `import { EndToEndSteps } from "@/components/end-to-end-steps";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { WhyProfessionals } from "@/components/why-professionals";

export default function Home() {
  return (
    <div className="bg-background text-foreground flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <WhyProfessionals />
        <EndToEndSteps />
      </main>
    </div>
  );
}
` },
          ],
        },
        {
          name: 'components',
          dirs: [
            { name: 'analytics', files: [
                { name: 'analytics.tsx', content: `import { Charts } from "./charts";
import { Stats } from "./stats";

export function Analytics() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8">
            <div>
                <h1 className="text-3xl md:text-4xl font-bold">Analytics Overview</h1>
                <p className="text-muted-foreground mt-1">
                    Track key metrics and performance indicators.
                </p>
            </div>
        </div>
        <Stats />
        <div className="mt-8">
          <Charts />
        </div>
    </div>
  );
}
`},
                { name: 'charts.tsx', content: `import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart, PieChart } from "lucide-react";

export function Charts() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Verification Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex flex-col items-center justify-center bg-muted/50 rounded-lg">
            <BarChart className="w-12 h-12 text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">
              Interactive Chart Placeholder
            </p>
            <p className="text-sm text-muted-foreground/70">
              Demo: Verification trends over time
            </p>
          </div>
        </CardContent>
      </Card>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Success Rate Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex flex-col items-center justify-center bg-muted/50 rounded-lg">
            <PieChart className="w-12 h-12 text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">Pie Chart Placeholder</p>
            <p className="text-sm text-muted-foreground/70">
              Demo: Success rate breakdown
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
`},
                { name: 'stats.tsx', content: `import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    value: "2.1s",
    label: "Average Response Time",
    description: "15% faster than industry average",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    value: "99.9%",
    label: "System Uptime",
    description: "Exceeds SLA requirements",
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    value: "97.3%",
    label: "AI Accuracy Rate",
    description: "Continuously improving",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
];

export function Stats() {
  return (
    <div className="grid gap-8 md:grid-cols-3 mt-8">
      {stats.map((stat) => (
        <Card key={stat.label} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-6 text-center">
            <p className={\`text-4xl font-bold \${stat.color}\`}>{stat.value}</p>
            <p className="text-sm font-medium text-muted-foreground mt-2">
              {stat.label}
            </p>
            <p className={\`text-sm mt-1 text-green-600\`}>
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
`}
            ], dirs: [] },
            { name: 'dashboard', files: [
                { name: 'dashboard.tsx', content: `"use client";

import { Button } from "@/components/ui/button";
import { StatsCards } from "./stats-cards";
import { RecentActivity } from "./recent-activity";

export function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8">
            <div>
                <h1 className="text-3xl md:text-4xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground mt-1">
                    Monitor your verification activities and system performance
                </p>
            </div>
            <div className="flex items-center gap-4 mt-4 sm:mt-0">
                <Button>View All Results</Button>
                <p className="text-sm text-muted-foreground hidden md:block">
                    Last updated: 25 Nov 2025, 10:30 pm
                </p>
            </div>
        </div>
        <StatsCards />
        <RecentActivity />
        <p className="text-sm text-muted-foreground text-center mt-4 md:hidden">
            Last updated: 25 Nov 2025, 10:30 pm
        </p>
    </div>
  );
}
`},
                { name: 'recent-activity.tsx', content: `import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

const activities = [
  {
    id: "TN123456789",
    status: "Verification Completed",
    time: "25 Nov 2025, 10:25 pm",
  },
  {
    id: "TN987654321",
    status: "Verification Processing",
    time: "25 Nov 2025, 10:15 pm",
  },
  {
    id: "TN555666777",
    status: "Certificate Issued",
    time: "25 Nov 2025, 10:00 pm",
  },
  {
    id: "TN111222333",
    status: "Verification Completed",
    time: "25 Nov 2025, 09:45 pm",
  },
];

export function RecentActivity() {
  return (
    <Card className="mt-8 shadow-lg">
      <CardHeader>
        <CardTitle>Recent Verification Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">{activity.id}</p>
                  <p className="text-sm text-muted-foreground">{activity.status}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{activity.time}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
`},
                { name: 'stats-cards.tsx', content: `import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowDown, ArrowUp, CheckCircle, Clock, FileText, Users } from "lucide-react";

const stats = [
  {
    title: "Total Verifications",
    value: "1,250",
    change: "+12%",
    changeType: "increase",
    icon: <FileText className="w-6 h-6 text-blue-500" />,
    iconBg: "bg-blue-100",
  },
  {
    title: "Success Rate",
    value: "97.3%",
    change: "+0.3% improvement",
    changeType: "increase",
    icon: <CheckCircle className="w-6 h-6 text-green-500" />,
    iconBg: "bg-green-100",
  },
  {
    title: "Avg Processing Time",
    value: "2.1s",
    change: "-0.2s faster",
    changeType: "decrease",
    icon: <Clock className="w-6 h-6 text-yellow-500" />,
    iconBg: "bg-yellow-100",
  },
  {
    title: "Active Users",
    value: "152",
    change: "+8 new today",
    changeType: "increase",
    icon: <Users className="w-6 h-6 text-purple-500" />,
    iconBg: "bg-purple-100",
  },
];

export function StatsCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <div className={\`p-2 rounded-lg \${stat.iconBg}\`}>
                {stat.icon}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              {stat.changeType === "increase" ? (
                <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span className={stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}>
                {stat.change}
              </span>
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
`}
            ], dirs: [] },
          ],
          files: [
              { name: 'about-page.tsx', content: `import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">About ASSETRAZ UK</h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
          ASSETRAZ UK is a property data and verification layer focused on making UK property information accessible, reliable and actionable.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card className="shadow-lg text-left">
            <CardHeader>
                <CardTitle>Our mission</CardTitle>
            </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To reduce friction and risk in UK property transactions by giving professionals instant, standardised access to the data they need to make decisions and protect their clients.
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-lg text-left">
             <CardHeader>
                <CardTitle>Who we serve</CardTitle>
            </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Estate agents, online marketplaces, conveyancers, lenders and proptech platforms that want to embed property and owner verification earlier in the journey.
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="max-w-6xl mx-auto text-center mt-16 md:mt-24">
        <h2 className="text-3xl md:text-4xl font-bold">Our Core Values</h2>
        <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
          The principles that guide our work and our commitment to the UK property market.
        </p>
        <div className="grid md:grid-cols-3 gap-8 mt-12 text-left">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Data Integrity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We are committed to providing the most accurate and reliable property data by connecting directly to official sources.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Radical Transparency</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We believe in making property information clear and accessible to empower professionals and protect consumers.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Customer-Centric Innovation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We build tools that solve real-world problems, designing our products with the professional workflow at the forefront.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
` },
              { name: 'api-documentation.tsx', content: `import { Button } from "@/components/ui/button";
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
` },
              { name: 'assetraz-logo.tsx', content: `import { cn } from "@/lib/utils";

export function AssetrazLogo({ className, isDark }: { className?: string, isDark?: boolean }) {
    return (
        <div className={cn(
            "p-1.5 rounded-md bg-primary",
            className
        )}>
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={cn("text-primary-foreground")}
            >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                <polyline points="9 22 9 12 15 12 15 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></polyline>
            </svg>
        </div>
    );
}
` },
              { name: 'auth-form.tsx', content: `"use client";

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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState, useEffect } from "react";
import { Alert, AlertDescription } from "./ui/alert";
import { useAuth, useFirestore } from "@/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { checkSubscriptionStatus } from "@/ai/flows/check-subscription-status";

const formSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Invalid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

type FormSchema = z.infer<typeof formSchema>;

export function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [authType, setAuthType] = useState<'login' | 'signup'>('signup');
  const auth = useAuth();
  const firestore = useFirestore();

  useEffect(() => {
    const type = searchParams.get('type');
    if (type === 'login' || type === 'signup') {
        setAuthType(type);
    }
  }, [searchParams]);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleSuccessfulAuth = async (userId: string) => {
    const subStatus = await checkSubscriptionStatus({ userId });

    if (subStatus.action === 'REDIRECT_TO_PRICING') {
      router.push('/pricing');
    } else {
      router.push('/verify');
    }
  };

  const handleSignIn = async (values: FormSchema) => {
    if (!auth) return;
    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      await handleSuccessfulAuth(userCredential.user.uid);
    } catch (e: any) {
       switch (e.code) {
        case 'auth/user-not-found':
          setError("No account found with this email. Please sign up.");
          setAuthType('signup');
          break;
        case 'auth/wrong-password':
          setError("Incorrect password. Please try again.");
          break;
        case 'auth/invalid-credential':
           setError("Invalid credentials. Please try again.");
           break;
        default:
          setError("An unexpected error occurred during sign-in. Please try again.");
          break;
      }
    }
  };

  const handleSignUp = async (values: FormSchema) => {
    if (!auth || !firestore || !values.name) {
        setError("Name is required for new accounts.");
        return;
    };

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: values.name });

      const userRef = doc(firestore, 'users', user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: values.name,
        createdAt: serverTimestamp(),
        isSubscribed: false,
        plan: 'none',
        subscriptionExpiry: null
      });
      await handleSuccessfulAuth(user.uid);
    } catch (e: any) {
      if (e.code === 'auth/email-already-in-use') {
        setError("This email is already in use. Please sign in.");
        setAuthType('login');
      } else {
        setError("An unexpected error occurred during sign-up. Please try again.");
      }
    }
  };

  async function onSubmit(values: FormSchema) {
    setError(null);
    if (authType === 'signup') {
        await handleSignUp(values);
    } else {
        await handleSignIn(values);
    }
  }
  
  const isSignUp = authType === 'signup';

  return (
    <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
            <CardTitle>{isSignUp ? 'Create an Account' : 'Sign In'}</CardTitle>
            <CardDescription>{isSignUp ? 'Welcome! Please provide your details to continue.' : 'Enter your email and password to access your account.'}</CardDescription>
        </CardHeader>
        <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {isSignUp && (
                     <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    {!isSignUp && (
                        <div className="text-right">
                            <Link href="#" className="text-sm text-primary hover:underline">
                                Forgot password?
                            </Link>
                        </div>
                    )}
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit" className="w-full">
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </Button>
            </form>
            </Form>
            <p className="mt-6 text-center text-sm text-muted-foreground">
                {isSignUp ? "Already have an account?" : "Don't have an account?"}{' '}
                <Link 
                    href={isSignUp ? "/auth?type=login" : "/auth?type=signup"} 
                    className="text-primary hover:underline font-medium"
                    onClick={() => setError(null)}
                >
                    {isSignUp ? "Sign In" : "Sign Up"}
                </Link>
            </p>
        </CardContent>
    </Card>
  );
}
` },
              { name: 'contact-page.tsx', content: `"use client";

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
` },
              { name: 'end-to-end-steps.tsx', content: `import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const steps = [
  {
    title: "Enter a UK property",
    description: "Use address, postcode or Land Registry title number from your CRM, portal or form.",
  },
  {
    title: "We call official sources",
    description: "ASSETRAZ fetches title, owner and company data from official UK sources in real time.",
  },
  {
    title: "You get a clean report",
    description: "A standardised report (JSON + PDF) you can attach to deals, compliance files or your platform.",
  },
];

export function EndToEndSteps() {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            End-to-end in three steps
          </h2>
          <p className="text-lg text-muted-foreground">
            The same flow powers the dashboard and the API.
          </p>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={step.title} className="shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
` },
              { name: 'features.tsx', content: `import { FileText, Banknote, Building, Search, GitBranch, FileJson } from "lucide-react";

const features = [
  {
    icon: <FileText className="w-8 h-8 text-primary" />,
    title: "Title & registration",
    description: "Verify that a property exists at the UK Land Registry and see current title & ownership details.",
  },
  {
    icon: <Banknote className="w-8 h-8 text-primary" />,
    title: "Price paid history",
    description: "Access historical transaction data and basic analytics so your teams can spot anomalies early.",
  },
  {
    icon: <Building className="w-8 h-8 text-primary" />,
    title: "Company ownership",
    description: "When the proprietor is a company, ASSETRAZ pulls company records and shows the ownership structure.",
  },
  {
    icon: <Search className="w-8 h-8 text-primary" />,
    title: "Deeper visibility",
    description: "Support AML and compliance checks with a single source of truth for property and ownership information.",
  },
  {
    icon: <GitBranch className="w-8 h-8 text-primary" />,
    title: "Auditable outputs",
    description: "Every check has an ID, timestamp and trail, giving you a permanent record for compliance.",
  },
  {
    icon: <FileJson className="w-8 h-8 text-primary" />,
    title: "Reports & API payloads",
    description: "Each verification produces both human-readable and machine-readable outputs, so you can store them in files or systems.",
  },
];

export function Features() {
  return (
    <div className="bg-background text-foreground">
        <div className="container mx-auto px-4 py-12 md:py-20">
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h1 className="text-4xl md:text-5xl font-bold">
                What ASSETRAZ UK can verify
                </h1>
                <p className="text-lg text-muted-foreground mt-2">
                A single source of truth for property and ownership information, designed for professional workflows.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature) => (
                    <div key={feature.title} className="bg-secondary/30 rounded-xl p-8 shadow-lg transition-shadow hover:shadow-xl flex flex-col">
                        <div className="flex-shrink-0 w-12 h-12 mb-6 bg-primary/10 rounded-lg flex items-center justify-center">
                            {feature.icon}
                        </div>
                        <h2 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h2>
                        <p className="text-muted-foreground flex-grow">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}
` },
              { name: 'footer.tsx', content: `import Link from "next/link";
import { Github, Twitter } from "lucide-react";
import { AssetrazLogo } from "./assetraz-logo";

export function Footer() {
  return (
    <footer style={{ backgroundColor: '#3C3C8E' }} className="text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <AssetrazLogo isDark={true} />
              <span className="text-xl font-bold">ASSETRAZ UK</span>
            </Link>
            <p className="text-sm text-purple-200">
              UK's most trusted property verification platform powered by AI.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#how-it-works" className="text-purple-200 hover:text-white">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/api" className="text-purple-200 hover:text-white">
                  API Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-purple-200 hover:text-white">
                  Security
                </Link>
              </li>
              <li>
                <Link href="#" className="text-purple-200 hover:text-white">
                  Compliance
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/api" className="text-purple-200 hover:text-white">
                  API Documentation
                </Link>
              </li>
               <li>
                <Link href="#" className="text-purple-200 hover:text-white">
                  User Guide
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-purple-200 hover:text-white">
                  Support
                </Link>
              </li>
              <li>
                <Link href="#" className="text-purple-200 hover:text-white">
                  Status Page
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <p className="text-sm text-purple-200 mb-4">
              Follow our development and contribute to the platform.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-purple-200 hover:text-white">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-purple-200 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20 mt-8 pt-6 text-center text-sm text-purple-200">
          <p>© 2024 ASSETRAZ Technologies. All rights reserved. | Property Verification Platform</p>
        </div>
      </div>
    </footer>
  );
}
` },
              { name: 'header.tsx', content: `"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, LogOut, User, Settings, Code } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useUser } from "@/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/firebase";
import { AssetrazLogo } from "./assetraz-logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/verify", label: "Verify Property" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
      router.push("/");
    }
  };
  
  const userName = user?.displayName || "User";
  const userInitials = userName?.charAt(0)?.toUpperCase() || "U";

  return (
    <header className="bg-background/95 backdrop-blur-sm sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5">
                <AssetrazLogo />
              <div>
                <span className="text-xl font-bold text-foreground">ASSETRAZ UK</span>
                <p className="text-xs text-muted-foreground hidden sm:block">Property & Owner Verification</p>
              </div>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-foreground">
            {navLinks.map((link) => (
               <Link key={link.href} href={link.href} className="flex items-center gap-1 hover:text-primary transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
             <div className="hidden md:flex items-center gap-2">
                {!loading && user ? (
                   <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                        <Avatar>
                          <AvatarImage src={user.photoURL ?? ''} alt={userName} />
                          <AvatarFallback>{userInitials}</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{userName}</p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                        <User className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </DropdownMenuItem>
                       <DropdownMenuItem onClick={() => router.push('/code')}>
                        <Code className="mr-2 h-4 w-4" />
                        <span>Code Explorer</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                    <>
                        <Button variant="ghost" asChild>
                            <Link href="/auth?type=login">Login</Link>
                        </Button>
                        <Button asChild>
                            <Link href="/auth?type=signup">Sign Up</Link>
                        </Button>
                    </>
                )}
            </div>
             <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background text-foreground">
                <SheetHeader>
                  <Link href="/" className="flex items-center gap-2 mb-4" onClick={() => setIsMenuOpen(false)}>
                    <AssetrazLogo />
                    <div>
                      <span className="text-xl font-bold">ASSETRAZ</span>
                    </div>
                  </Link>
                </SheetHeader>
                 <nav className="flex flex-col gap-4 text-lg font-medium">
                    {navLinks.map((link) => (
                      <Link key={link.href} href={link.href} className="flex items-center gap-2 hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                  <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2 mt-6">
                    {!loading && user ? (
                        <div className="flex items-center gap-4 p-2 rounded-md border">
                             <Avatar>
                                <AvatarImage src={user.photoURL ?? ''} alt={userName} />
                                <AvatarFallback>{userInitials}</AvatarFallback>
                            </Avatar>
                            <div className="truncate">
                                <p className="font-semibold truncate">{userName}</p>
                                <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <Button variant="ghost" asChild className="w-full">
                                <Link href="/auth?type=login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                            </Button>
                            <Button asChild className="w-full">
                                <Link href="/auth?type=signup" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                            </Button>
                        </div>
                    )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
` },
              { name: 'hero.tsx', content: `"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { HowItWorksNew } from "./how-it-works-new";
import { useUser } from "@/firebase";

export function Hero() {
  const { user, loading } = useUser();
  const verificationHref = !loading && user ? "/verify" : "/auth?type=signup";

  return (
    <section className="relative bg-gradient-to-br from-[#2A3E90] to-[#6042A4] py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url(/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="container mx-auto px-4 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                    Verify UK property & ownership before the deal moves.
                </h1>
                <p className="text-lg md:text-xl text-purple-200 mb-10 max-w-2xl mx-auto md:mx-0">
                    ASSETRAZ UK connects to official sources to confirm that a property exists, who owns it, and what its history looks like – in one standardised report for agents, platforms and professionals.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                    <Button size="lg" className="h-12 w-full sm:w-auto bg-white text-blue-900 hover:bg-gray-200" asChild>
                    <Link href={verificationHref}>
                        Start a verification
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="h-12 w-full sm:w-auto text-white border-white/50 hover:bg-white/10 hover:text-white" asChild>
                    <Link href="/contact">
                        Contact Sales
                    </Link>
                    </Button>
                </div>
            </div>
            <div>
                <HowItWorksNew />
            </div>
        </div>
      </div>
    </section>
  );
}
` },
              { name: 'how-it-works-new.tsx', content: `import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const steps = [
  {
    title: "Enter a UK property",
    description: "Use address, postcode or Land Registry title number from your CRM, portal or form.",
  },
  {
    title: "We call official sources",
    description: "ASSETRAZ fetches title, owner and company data from official UK sources in real time.",
  },
  {
    title: "You get a clean report",
    description: "A standardised report (JSON + PDF) you can attach to deals, compliance files or your platform.",
  },
];

export function HowItWorksNew() {
  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white shadow-2xl">
        <CardHeader className="p-8">
            <CardTitle className="text-2xl">How ASSETRAZ UK works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8 p-8 pt-0 py-12">
            {steps.map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-purple-300 ring-2 ring-white/20">
                        {index + 1}
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-white">{step.title}</h3>
                        <p className="text-purple-200">
                            {step.description}
                        </p>
                    </div>
                </div>
            ))}
        </CardContent>
    </Card>
  );
}
` },
              { name: 'pricing-page.tsx', content: `"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useUser } from "@/firebase";

const tiers = [
  {
    name: "Pay-as-you-go",
    price: "£7",
    priceValue: 7,
    period: "/check",
    description: "Ideal for small agencies & occasional checks.",
    priceDescription: "Example price, ex VAT.",
    features: [
      "Title & proprietor details",
      "Tenure & registration info",
      "Price paid history",
      "Downloadable PDF",
    ],
    buttonText: "Get Started",
    highlight: false,
  },
  {
    name: "Professional",
    price: "£199",
    priceValue: 199,
    period: "/month",
    description: "For agencies & platforms doing regular checks.",
    priceDescription: "Example: includes a bundle of checks.",
    features: [
      "Everything in pay-as-you-go",
      "Dashboard & team access",
      "Basic API integration",
      "Priority support",
    ],
    buttonText: "Get Started",
    highlight: true,
    badge: "For growing teams",
  },
  {
    name: "Enterprise",
    price: "Custom",
    priceValue: null,
    period: "",
    description: "For portals, lenders and large platforms.",
    priceDescription: "Based on expected volume & SLA.",
    features: [
      "High-volume API access",
      "Bulk & batch processing",
      "Custom data bundles",
      "Dedicated support & onboarding",
    ],
    buttonText: "Contact Sales",
    highlight: false,
  },
];

export function PricingPage() {
  const { user, loading } = useUser();
  const getButtonLink = (tier: typeof tiers[0]) => {
    if (tier.name === 'Enterprise' || tier.name === 'Pay-as-you-go') {
        return '/contact';
    }
    if (!loading && user) {
        return '/verify';
    }
    return '/auth?type=signup';
  }


  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">Pricing examples</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Actual pricing depends on data costs and volume. These tiers show how ASSETRAZ UK could be packaged.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
        {tiers.map((tier) => (
          <Card
            key={tier.name}
            className={cn(
                "shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full",
                tier.highlight && "border-primary border-2 relative"
            )}
          >
             {tier.badge && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 text-sm font-semibold rounded-full">
                {tier.badge}
              </div>
            )}
            <CardHeader className="text-left">
              <CardTitle className="text-2xl">{tier.name}</CardTitle>
              <CardDescription>{tier.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow">
              <div className="mb-6">
                <span className="text-5xl font-bold">{tier.price}</span>
                {tier.period && (
                    <span className="text-xl text-muted-foreground">{tier.period}</span>
                )}
                <p className="text-sm text-muted-foreground mt-1">{tier.priceDescription}</p>
              </div>
              <ul className="space-y-3 text-left flex-grow">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="w-full mt-8" variant={tier.highlight ? 'default' : 'secondary'}>
                <Link href={getButtonLink(tier)}>
                    {tier.buttonText}
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
` },
              { name: 'verification-form.tsx', content: `"use client";

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
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "./ui/checkbox";
import React from "react";
import { VerifyPropertyInput, VerifyPropertyOutput, verifyProperty } from "@/ai/flows/verify-property";
import { Loader2 } from "lucide-react";
import { useUser } from "@/firebase";
import { useRouter } from "next/navigation";
import { checkSubscriptionStatus } from "@/ai/flows/check-subscription-status";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  verificationMethod: z.enum(["title", "postcode", "address"]),
  titleNumber: z.string().optional(),
  postcode: z.string().optional(),
  street: z.string().optional(),
  city: z.string().optional(),
  pricePaid: z.boolean().default(false),
  companyOwnership: z.boolean().default(false),
  localData: z.boolean().default(false),
}).refine(data => {
    if (data.verificationMethod === 'title') return !!data.titleNumber;
    if (data.verificationMethod === 'postcode') return !!data.postcode;
    if (data.verificationMethod === 'address') return !!data.street && !!data.city && !!data.postcode;
    return false;
}, {
    message: "Please fill in the required fields for the selected verification method.",
    path: ["titleNumber"], // you can pick any field to show the error
});

type VerificationFormProps = {
    onVerify: (data: VerifyPropertyOutput) => void;
    setIsLoading: (isLoading: boolean) => void;
    isLoading: boolean;
}

export function VerificationForm({ onVerify, setIsLoading, isLoading }: VerificationFormProps) {
  const { user } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      verificationMethod: "title",
      titleNumber: "DN123456",
      postcode: "SW1A 2AA",
      street: "10 Downing Street",
      city: "London",
      pricePaid: true,
      companyOwnership: true,
      localData: false,
    },
  });

  const verificationMethod = form.watch("verificationMethod");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) {
      router.push('/auth?type=login');
      return;
    }
    
    setIsLoading(true);

    const subStatus = await checkSubscriptionStatus({ userId: user.uid });

    if (subStatus.action === 'REDIRECT_TO_PRICING') {
      toast({
        title: "Subscription Required",
        description: \`Your status is: \${subStatus.status}. Please upgrade your plan.\`,
        variant: "destructive",
      });
      router.push('/pricing');
      setIsLoading(false);
      return;
    }
    
    // Proceed with verification if subscription is active
    let propertyIdentifier = '';
    if (values.verificationMethod === 'title') {
        propertyIdentifier = values.titleNumber || '';
    } else if (values.verificationMethod === 'postcode') {
        propertyIdentifier = values.postcode || '';
    } else if (values.verificationMethod === 'address') {
        propertyIdentifier = \`\${values.street}, \${values.city}, \${values.postcode}\`;
    }

    const input: VerifyPropertyInput = {
      propertyIdentifier: propertyIdentifier,
      identifierType: values.verificationMethod,
      checks: {
        pricePaid: values.pricePaid,
        companyOwnership: values.companyOwnership,
        localData: values.localData,
      }
    };
    
    try {
      const report = await verifyProperty(input);
      onVerify(report);
    } catch (error) {
      console.error("Verification failed:", error);
      toast({
        title: "Verification Failed",
        description: "An unexpected error occurred during verification.",
        variant: "destructive",
      })
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <Card className="max-w-3xl mx-auto shadow-2xl">
      <CardContent className="p-4 sm:p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="verificationMethod"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-muted-foreground font-semibold tracking-wider">VERIFICATION METHOD</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                            <div className="flex items-center w-full p-4 border rounded-md has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                                <RadioGroupItem value="title" />
                                <FormLabel className="font-normal ml-3 cursor-pointer">
                                    Title number
                                    <p className="text-xs text-muted-foreground">e.g. DN123456</p>
                                </FormLabel>
                            </div>
                        </FormControl>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                           <div className="flex items-center w-full p-4 border rounded-md has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                                <RadioGroupItem value="postcode" />
                                <FormLabel className="font-normal ml-3 cursor-pointer">
                                    Postcode
                                    <p className="text-xs text-muted-foreground">e.g. SW1A 1AA</p>
                                </FormLabel>
                            </div>
                        </FormControl>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                           <div className="flex items-center w-full p-4 border rounded-md has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                                <RadioGroupItem value="address" />
                                <FormLabel className="font-normal ml-3 cursor-pointer">
                                    Full address
                                    <p className="text-xs text-muted-foreground">Street, city & postcode</p>
                                </FormLabel>
                            </div>
                        </FormControl>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {verificationMethod === "title" && (
              <FormField
                control={form.control}
                name="titleNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground font-semibold tracking-wider">TITLE NUMBER</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {verificationMethod === "postcode" && (
                <FormField
                control={form.control}
                name="postcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground font-semibold tracking-wider">POSTCODE</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. SW1A 2AA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

             {verificationMethod === "address" && (
                <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="street"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-muted-foreground font-semibold tracking-wider">STREET</FormLabel>
                                <FormControl>
                                <Input placeholder="e.g. 10 Downing Street" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-muted-foreground font-semibold tracking-wider">CITY</FormLabel>
                                <FormControl>
                                <Input placeholder="e.g. London" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </div>
                     <FormField
                        control={form.control}
                        name="postcode"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-muted-foreground font-semibold tracking-wider">POSTCODE</FormLabel>
                            <FormControl>
                            <Input placeholder="e.g. SW1A 2AA" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
              )}
            
            <div className="p-6 bg-secondary/30 rounded-lg">
                <FormLabel className="text-muted-foreground font-semibold tracking-wider">INCLUDE CHECKS</FormLabel>
                <div className="space-y-4 mt-4">
                    <FormField
                        control={form.control}
                        name="pricePaid"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                                <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                Price paid history
                                </FormLabel>
                            </div>
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="companyOwnership"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                                <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                Company ownership if applicable
                                </FormLabel>
                            </div>
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="localData"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                                <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                Additional local data (concept only)
                                </FormLabel>
                            </div>
                            </FormItem>
                        )}
                    />
                </div>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? 'Verifying...' : 'Run verification'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
` },
              { name: 'verification-report.tsx', content: `'use client';

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
` },
              { name: 'why-professionals.tsx', content: `import { BadgeCheck, PlugZap, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const features = [
  {
    icon: <Zap className="w-8 h-8 text-orange-500" />,
    title: "One-click verification",
    description: "Verify title, owner and history from a single screen, instead of juggling multiple portals.",
  },
  {
    icon: <BadgeCheck className="w-8 h-8 text-green-500" />,
    title: "Standardised reports",
    description: "Every property check produces a consistent report your teams can actually understand.",
  },
  {
    icon: <PlugZap className="w-8 h-8 text-blue-500" />,
    title: "API-ready",
    description: "Embed verification into your own platform, form or workflow with a simple REST API.",
  },
]

export function WhyProfessionals() {
  return (
    <section id="why-us" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why professionals use ASSETRAZ UK
          </h2>
          <p className="text-lg text-muted-foreground">
            Reduce fraud, stop time-wasting on bad data, and standardise property & owner checks across your organisation.
          </p>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto bg-secondary/50 rounded-full w-16 h-16 flex items-center justify-center">
                  {feature.icon}
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
` },
          ],
        },
      ],
      files: [],
    },
  ],
  files: [
      { name: 'README.md', content: `# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.
`},
      { name: 'apphosting.yaml', content: `# Settings to manage and configure a Firebase App Hosting backend.
# https://firebase.google.com/docs/app-hosting/configure

runConfig:
  # Increase this value if you'd like to automatically spin up
  # more instances in response to increased traffic.
  maxInstances: 1
`},
      { name: 'components.json', content: `{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
`},
  ],
};

function FileItem({ name, content, path }: { name: string; content: string; path: string }) {
  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex items-center justify-between p-2 pl-4 hover:bg-muted rounded-md">
      <div className="flex items-center gap-2">
        <FileIcon className="h-4 w-4 text-muted-foreground" />
        <span className="font-mono text-sm">{name}</span>
      </div>
      <Button variant="ghost" size="icon" onClick={handleDownload} aria-label={`Download ${name}`}>
        <Download className="h-4 w-4" />
      </Button>
    </div>
  );
}

function DirectoryView({ directory, path }: { directory: Directory; path: string }) {
  const [isOpen, setIsOpen] = useState(directory.name === 'src');
  const currentPath = path === 'root' ? directory.name : \`\${path}/\${directory.name}\`;
  
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="w-full">
        <div className="flex items-center gap-2 p-2 hover:bg-muted rounded-md w-full text-left">
          <FolderIcon className="h-4 w-4 text-primary" />
          <span className="font-semibold">{directory.name}</span>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="pl-4 border-l ml-4">
        {directory.dirs.map((dir) => (
          <DirectoryView key={dir.name} directory={dir} path={currentPath} />
        ))}
        {directory.files.map((file) => (
          <FileItem key={file.name} name={file.name} content={file.content} path={currentPath} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

export function CodeExplorer() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Code Explorer</CardTitle>
            <CardDescription>Browse and download the project files.</CardDescription>
          </CardHeader>
          <CardContent>
            {fileTree.files.map((file) => (
              <FileItem key={file.name} name={file.name} content={file.content} path="root" />
            ))}
            {fileTree.dirs.map((dir) => (
              <DirectoryView key={dir.name} directory={dir} path="root" />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
