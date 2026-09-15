import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { PageLoad, Preloader, MouseGlow } from '@/components/animations';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Preloader />
      <MouseGlow />
      <Navbar />
      <main className="flex-1 flex flex-col">
        <PageLoad>
          {children}
        </PageLoad>
      </main>
      <Footer />
    </>
  );
}
