'use client';

import Link from 'next/link';
import { AmbientTerrain, TextReveal, ScrollReveal, AnimatedChart } from '@/components/animations';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden section-padding">
      <AmbientTerrain />
      
      {/* Abstract Chart Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
        <AnimatedChart />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center mt-20">
        <ScrollReveal delay={0}>
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-gray-300 tracking-[0.2em] text-xs font-bold uppercase">
              Technology, AI, Media & Skills — Built for Real-World Impact.
            </span>
          </div>
        </ScrollReveal>
        
        <div className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tighter mb-8 flex flex-col items-center">
          <TextReveal text="WE BUILD." className="text-white mb-2" as="div" />
          <TextReveal text="WE GROW." className="text-gray-400 mb-2" as="div" />
          <TextReveal text="WE EARN." className="gold-text drop-shadow-[0_0_30px_rgba(245,158,11,0.3)]" as="div" />
        </div>
        
        <ScrollReveal delay={0.4}>
          <div className="space-y-4 mb-12">
            <p className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed">
              NOVELLEYX brings technology, artificial intelligence, media, education and career solutions together to help people and organizations turn problems into practical possibilities.
            </p>
            <p className="text-amber-500 font-bold tracking-widest uppercase text-sm">
              For a better change. For a better India.
            </p>
          </div>
        </ScrollReveal>
        
        <ScrollReveal delay={0.6}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link href="/#contact" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-4 bg-amber-500 text-black font-bold rounded-full hover:bg-amber-400 transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] flex items-center justify-center gap-2 uppercase">
                Get an Appraisal
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </Link>
            <Link href="/services" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-4 glass-pill text-white font-bold hover:bg-white/10 transition-all uppercase">
                Explore Services
              </button>
            </Link>
            <Link href="/dashboard/ai" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-4 bg-transparent border border-amber-500/50 text-amber-500 font-bold rounded-full hover:bg-amber-500/10 transition-all uppercase">
                Ask Novelleyx AI
              </button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
