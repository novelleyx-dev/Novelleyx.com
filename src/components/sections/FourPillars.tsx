'use client';

import { Film, Code2, Brain, GraduationCap, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ScrollReveal, HoverCard } from '@/components/animations';

const pillars = [
  {
    title: 'Media & Content',
    icon: Film,
    desc: 'Strategic communication and immersive media built to resonate.',
    href: '/services#media',
    delay: 0.1
  },
  {
    title: 'IT & Engineering',
    icon: Code2,
    desc: 'Scalable software architecture and robust digital ecosystems.',
    href: '/services#it',
    delay: 0.2
  },
  {
    title: 'Applied AI',
    icon: Brain,
    desc: 'Practical, integrated artificial intelligence to automate and analyze.',
    href: '/services#ai',
    delay: 0.3
  },
  {
    title: 'Education & Career',
    icon: GraduationCap,
    desc: 'Bridging the gap between raw talent and real-world opportunities.',
    href: '/services#education',
    delay: 0.4
  }
];

export default function FourPillars() {
  return (
    <section id="pillars" className="relative section-padding">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <ScrollReveal delay={0}>
            <span className="text-amber-500 text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
              OUR FOUR PILLARS
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Capabilities engineered for <br className="hidden md:block"/> comprehensive impact.
            </h2>
          </ScrollReveal>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {pillars.map((pillar, i) => (
            <ScrollReveal key={i} delay={pillar.delay} className="h-full flex">
              <Link href={pillar.href} className="block group w-full">
                <HoverCard className="h-full flex flex-col group-hover:bg-white/[0.04]">
                  <div className="w-14 h-14 rounded-full bg-amber-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                    <pillar.icon className="w-6 h-6 text-amber-500" strokeWidth={1.5} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-amber-500 transition-colors">
                    {pillar.title}
                  </h3>
                  
                  <p className="text-neutral-400 text-sm leading-relaxed mb-8">
                    {pillar.desc}
                  </p>

                  <div className="flex items-center text-xs font-semibold text-gray-500 uppercase tracking-wider group-hover:text-white transition-colors mt-auto">
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </HoverCard>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
