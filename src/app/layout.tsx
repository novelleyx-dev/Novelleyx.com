import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import PremiumBackground from '@/components/ui/PremiumBackground';
import AICompass from '@/components/ui/AICompass';
import HustleToolkit from '@/components/ui/HustleToolkit';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NOVELLEYX — Technology, AI, Media & Skills for Real-World Impact',
  description: 'NOVELLEYX brings technology, artificial intelligence, media, education and career solutions together to help people and organizations turn problems into practical possibilities. For a better change. For a better India.',
  keywords: 'NOVELLEYX, AI solutions, IT services, web development, AI automation, media services, career services, technology solutions, India',
  openGraph: {
    title: 'NOVELLEYX',
    description: 'NOVELLEYX brings technology, artificial intelligence, media, education and career solutions together to help people and organizations turn problems into practical possibilities.',
    siteName: 'NOVELLEYX',
    type: 'website',
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-transparent text-gray-300 flex flex-col min-h-screen antialiased`}>
        <ThemeProvider>
          <AuthProvider>
            <PremiumBackground />
            {children}
            <AICompass />
            <HustleToolkit />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
