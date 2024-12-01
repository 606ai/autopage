import { Inter } from 'next/font/google';
import { Providers } from './providers';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'AutoPage - AI-Powered Website Builder',
  description: 'Create stunning websites instantly with AutoPage. Our AI-powered platform helps you build professional websites with smart design suggestions and automated content generation.',
  keywords: 'autopage, website builder, AI website builder, automated web design, content generation',
  metadataBase: new URL('https://autopage.icu'),
  openGraph: {
    title: 'AutoPage - AI-Powered Website Builder',
    description: 'Create stunning websites instantly with AutoPage',
    url: 'https://autopage.icu',
    siteName: 'AutoPage',
    images: [
      {
        url: 'https://autopage.icu/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AutoPage - AI-Powered Website Builder',
    description: 'Create stunning websites instantly with AutoPage',
    images: ['https://autopage.icu/og-image.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans min-h-screen flex flex-col`}>
        <Providers>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
