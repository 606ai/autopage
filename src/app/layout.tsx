import { Inter } from 'next/font/google';
import { Providers } from './providers';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'AutoPage - AI-Powered Website Builder',
  description: 'Create stunning websites instantly with AutoPage. Our AI-powered platform helps you build professional websites with smart design suggestions and automated content generation.',
  keywords: 'autopage, website builder, AI website builder, automated web design, content generation',
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
      </body>
    </html>
  );
}
