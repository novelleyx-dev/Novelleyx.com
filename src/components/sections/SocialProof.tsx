'use client';

import React from 'react';
import { ArrowUpRight, TrendingUp, Clock, Users } from 'lucide-react';

const CASE_STUDIES = [
  {
    id: 1,
    client: 'Elevate E-Commerce',
    logo: 'EE',
    metric: 'Increased conversion by 140%',
    metricIcon: TrendingUp,
    description: 'Redesigned their legacy storefront into a headless Next.js application, resulting in sub-second load times and a massive conversion bump.',
    tags: ['Web App', 'UI/UX', 'Performance']
  },
  {
    id: 2,
    client: 'AutoSync Logistics',
    logo: 'AL',
    metric: 'Saved 20hrs/week with AI',
    metricIcon: Clock,
    description: 'Implemented a custom AI agent workflow to automatically process shipping manifests and generate routing schedules.',
    tags: ['AI Agent', 'Automation', 'Workflow']
  },
  {
    id: 3,
    client: 'CreatorConnect',
    logo: 'CC',
    metric: 'Scaled to 50k+ active users',
    metricIcon: Users,
    description: 'Built a scalable community platform and brand identity from scratch, helping them secure their seed funding round.',
    tags: ['Brand Identity', 'Full-Stack', 'Strategy']
  }
];

export default function SocialProof() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">PROVEN OUTCOMES</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We don't just build software. We engineer business results. See how NOVELLEYX has accelerated growth for our partners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CASE_STUDIES.map((study) => (
            <div 
              key={study.id} 
              className="bg-[#111111] border border-[#D4AF37]/20 rounded-lg overflow-hidden hover:border-[#D4AF37]/50 transition-all group flex flex-col"
            >
              {/* Placeholder image area */}
              <div className="h-48 bg-transparent border-b border-gray-800 relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent"></div>
                <div className="w-16 h-16 rounded-full bg-[#111111] border border-[#D4AF37]/30 flex items-center justify-center shadow-lg relative z-10">
                  <span className="text-[#D4AF37] font-bold text-xl">{study.logo}</span>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                    {study.client}
                    <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <div className="flex items-center gap-2 text-[#D4AF37] mt-3 bg-[#D4AF37]/10 w-fit px-3 py-1.5 rounded-full text-sm font-medium">
                    <study.metricIcon size={16} />
                    {study.metric}
                  </div>
                </div>
                
                <p className="text-gray-400 text-sm mb-6 flex-1">
                  {study.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {study.tags.map(tag => (
                    <span key={tag} className="text-xs text-gray-500 bg-transparent border border-gray-800 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
