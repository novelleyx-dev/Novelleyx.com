'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { bundles } from '@/data/bundles';
import { UserPlus, Sparkles, Rocket, Bot, Briefcase, TrendingUp, ShoppingCart, Cpu, UserCheck, Code } from 'lucide-react';

const iconMap: Record<string, any> = { UserPlus, Sparkles, Rocket, Bot, Briefcase, TrendingUp, ShoppingCart, Cpu, UserCheck, Code };

const FILTERS = [
  { label: 'ALL', value: 'ALL' },
  { label: 'FOR STUDENTS', value: 'Students' },
  { label: 'FOR CREATORS', value: 'Creators' },
  { label: 'FOR STARTUPS', value: 'Startups' },
  { label: 'FOR BUSINESSES', value: 'Businesses' },
  { label: 'FOR COMPANIES', value: 'Companies' },
];

export default function BundlesPage() {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filteredBundles = activeFilter === 'ALL' 
    ? bundles 
    : bundles?.filter((b: any) => b.filterCategory.includes(activeFilter));

  return (
    <main className="bg-[#050505] min-h-screen text-white relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#F59E0B]/5 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* Hero */}
      <section className="px-6 md:px-12 lg:px-24 pt-32 pb-16 relative z-10 text-center">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[#F59E0B] font-semibold tracking-[0.2em] uppercase mb-4"
        >
          PRE-PACKAGED OUTCOMES
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight"
        >
          ONE GOAL. ONE TEAM. ONE SOLUTION.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-[#A8A8A8] max-w-3xl mx-auto"
        >
          Pre-packaged solutions combining multiple services to achieve a specific outcome.
        </motion.p>
      </section>

      {/* Filters */}
      <section className="px-6 md:px-12 lg:px-24 pb-12 relative z-10">
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {FILTERS.map(f => {
            const isActive = activeFilter === f.value;
            return (
              <button 
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`relative px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all ${isActive ? 'text-black' : 'text-[#A8A8A8] hover:text-white'}`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeFilterBubble"
                    className="absolute inset-0 bg-[#F59E0B] rounded-full shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{f.label}</span>
              </button>
            )
          })}
        </div>
      </section>

      {/* Bundles Grid */}
      <section className="px-6 md:px-12 lg:px-24 pb-32 relative z-10">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredBundles?.map((bundle: any) => {
              const Icon = iconMap[bundle.icon];
              return (
                <motion.div
                  layout
                  key={bundle.id}
                  initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <Card className="p-8 bg-white/[0.02] backdrop-blur-md border border-white/5 flex flex-col h-full rounded-3xl hover:border-[#F59E0B]/40 hover:-translate-y-1 transition-all duration-300 shadow-xl group">
                    <div className="mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-[#0A0A0A] border border-white/10 flex items-center justify-center mb-6 group-hover:border-[#F59E0B]/30 group-hover:bg-[#F59E0B]/10 transition-colors">
                        {Icon && <Icon className="w-6 h-6 text-[#F59E0B]" strokeWidth={1.5} />}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{bundle.name}</h3>
                      <p className="text-[#F59E0B] text-xs font-bold tracking-widest uppercase">{bundle.targetAudience?.join(' • ')}</p>
                    </div>
                    
                    <div className="mb-6 flex-grow">
                      <h4 className="text-[10px] font-bold text-neutral-500 mb-3 tracking-[0.2em] uppercase">WHAT'S INCLUDED:</h4>
                      <ul className="space-y-3">
                        {bundle.includes?.map((item: string, idx: number) => (
                          <li key={idx} className="text-[#A8A8A8] flex items-start text-sm font-medium">
                            <span className="text-[#F59E0B] mr-3 mt-0.5">•</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-8 p-5 bg-black/40 border border-white/5 rounded-2xl">
                      <h4 className="text-[10px] font-bold text-neutral-500 mb-2 tracking-[0.2em] uppercase">WHY IT WORKS:</h4>
                      <p className="text-[#A8A8A8] text-sm italic leading-relaxed">{bundle.whyItWorks}</p>
                    </div>

                    <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                      <span className="text-white font-bold text-lg">
                        {bundle.pricingLabel.split(' ')[0]} <span className="text-xs text-[#A8A8A8] font-normal">{bundle.pricingLabel.split(' ').slice(1).join(' ')}</span>
                      </span>
                      <Link href="/appraisal">
                        <Button variant="secondary" className="px-5 py-2.5 rounded-xl text-sm hover:scale-105 transition-transform bg-white/10 text-white border-0 hover:bg-white/20">REQUEST</Button>
                      </Link>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>
    </main>
  );
}
