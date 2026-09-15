'use client';

export const runtime = 'edge';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { serviceCategories } from '@/data/services';
import { PenTool, Video, Image, FileText, Megaphone, Share2, BarChart3, Palette, Layout, Zap, Globe, Headphones, Terminal, AppWindow, Smartphone, Figma, TrendingUp, Cloud, Database, Plug, Gauge, Shield, Workflow, MessageSquare, Cpu, Briefcase, GitBranch, CircuitBoard, Layers, BarChart, LineChart, Settings, Bot, Award, Linkedin, CheckSquare, BookOpen, Code, BadgeCheck, Trophy, Users, Map, UserCheck, Film, Code2, Brain, GraduationCap, ArrowRight } from 'lucide-react';

const iconMap: Record<string, any> = { PenTool, Video, Image, FileText, Megaphone, Share2, BarChart3, Palette, Layout, Zap, Globe, Headphones, Terminal, AppWindow, Smartphone, Figma, TrendingUp, Cloud, Database, Plug, Gauge, Shield, Workflow, MessageSquare, Cpu, Briefcase, GitBranch, CircuitBoard, Layers, BarChart, LineChart, Settings, Bot, Award, Linkedin, CheckSquare, BookOpen, Code, BadgeCheck, Trophy, Users, Map, UserCheck, Film, Code2, Brain, GraduationCap };

export default function ServicesPage() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const activeCategory = serviceCategories[activeCategoryIndex];

  return (
    <main className="bg-[#050505] min-h-screen text-white relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#F59E0B]/5 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* Hero Section */}
      <section className="px-6 md:px-12 lg:px-24 pt-32 pb-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#F59E0B] font-semibold tracking-[0.2em] uppercase mb-4"
          >
            THE FOUR PILLARS
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12 tracking-tight"
          >
            Explore what we build.
          </motion.h1>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {serviceCategories?.map((category, index) => {
            const isActive = activeCategoryIndex === index;
            const Icon = iconMap[category.icon];
            return (
              <button
                key={category.slug}
                onClick={() => setActiveCategoryIndex(index)}
                className={`relative px-6 py-3 rounded-full font-bold text-sm tracking-wide transition-all flex items-center gap-2 group ${isActive ? 'text-black' : 'text-[#A8A8A8] hover:text-white'}`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#F59E0B] rounded-full shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {isActive && (
                  <div className="absolute inset-0 border border-[#F59E0B]/50 rounded-full scale-105" />
                )}
                <div className={`relative z-10 flex items-center gap-2 ${isActive ? 'text-black' : 'group-hover:text-white transition-colors'}`}>
                  {Icon && <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />}
                  <span>{category.name}</span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Tab Content */}
      <section className="px-6 md:px-12 lg:px-24 pb-32 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory.slug}
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="max-w-7xl mx-auto"
          >
            
            {/* Category Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                {activeCategory.name} Solutions
              </h2>
              <p className="text-xl text-[#A8A8A8] leading-relaxed">
                {activeCategory.intro}
              </p>
            </div>
            
            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeCategory.services?.map((service: any, idx: number) => {
                const ServiceIcon = iconMap[service.icon];
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group"
                  >
                    <Card className="bg-white/[0.02] backdrop-blur-md border-white/5 p-8 hover:border-[#F59E0B]/50 flex flex-col h-full rounded-3xl transition-all duration-300 hover:bg-white/[0.04] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(245,158,11,0.05)] relative overflow-hidden">
                      
                      {/* Subtle hover flare */}
                      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#F59E0B]/10 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                      {ServiceIcon && (
                        <div className="w-14 h-14 rounded-2xl bg-[#0A0A0A] border border-white/10 flex items-center justify-center mb-6 group-hover:border-[#F59E0B]/30 group-hover:bg-[#F59E0B]/10 transition-colors">
                          <ServiceIcon className="w-6 h-6 text-[#F59E0B]" strokeWidth={1.5} />
                        </div>
                      )}
                      
                      <h3 className="font-bold text-white text-xl mb-3 group-hover:text-[#F59E0B] transition-colors">{service.name}</h3>
                      <p className="text-[#A8A8A8] text-sm leading-relaxed mb-8 flex-grow">{service.description || service.shortDescription}</p>
                      
                      <div className="mb-8">
                        <p className="text-[10px] text-neutral-500 mb-3 font-bold tracking-[0.2em] uppercase">Ideal For</p>
                        <div className="flex flex-wrap gap-2">
                          {service.idealFor?.map((type: string) => (
                            <Badge key={type} className="bg-[#050505] border border-white/10 text-[#A8A8A8] text-xs font-semibold px-3 py-1 rounded-full">
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                        <div>
                          {service.pricingType === 'STARTING_FROM' && <p className="text-white font-bold text-lg">₹{service.startingPrice || service.price} <span className="text-xs text-[#A8A8A8] font-normal">onwards</span></p>}
                          {service.pricingType === 'MONTHLY' && <p className="text-white font-bold text-lg">₹{service.startingPrice || service.price}<span className="text-xs text-[#A8A8A8] font-normal">/month</span></p>}
                          {service.pricingType === 'CUSTOM' && <p className="text-white font-bold text-sm">Custom Pricing</p>}
                          {service.pricingType === 'APPRAISAL_REQUIRED' && <p className="text-white font-bold text-sm">Appraisal Required</p>}
                        </div>
                        <Link href="/#contact" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-[#F59E0B] group-hover:border-[#F59E0B] transition-all">
                          <ArrowRight className="w-4 h-4 text-[#A8A8A8] group-hover:text-black transition-colors" />
                        </Link>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

          </motion.div>
        </AnimatePresence>
      </section>
    </main>
  );
}
