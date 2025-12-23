import type {Metadata} from 'next';
import './globals.css';
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const playfairDisplay = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair-display', display: 'swap' });

export const metadata: Metadata = {
  title: 'DealLock',
  description: 'Secure Real Estate Deal Management',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfairDisplay.variable}`}>
       <body className="font-sans">
        {children}
      </body>
    </html>
  );
}
