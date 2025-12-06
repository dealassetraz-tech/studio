import type {Metadata} from 'next';
import './globals.css';
import { Inter, Space_Grotesk } from 'next/font/google';
import { FirebaseClientProvider } from '@/firebase';
import { ToasterProvider } from '@/components/toaster-provider';
import { Footer } from '@/components/footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk', display: 'swap' });

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
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
       <body className="font-sans flex flex-col min-h-screen">
        <FirebaseClientProvider>
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
        </FirebaseClientProvider>
        <ToasterProvider />
      </body>
    </html>
  );
}
