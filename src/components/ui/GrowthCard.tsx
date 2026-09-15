'use client';

import React from 'react';
import AntigravityCard from './AntigravityCard';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface GrowthCardProps {
  title: string;
  impactMetric: string;
  impactLabel: string;
  description: string;
  icon: React.ElementType;
}

export default function GrowthCard({ title, impactMetric, impactLabel, description, icon: Icon }: GrowthCardProps) {
  return (
    <AntigravityCard intensity={10} className="h-full flex flex-col p-6 group cursor-pointer overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-bl-full -z-10 group-hover:bg-[#D4AF37]/10 transition-colors duration-500" />
      
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:border-[#D4AF37]/30 transition-colors">
          <Icon className="w-6 h-6 text-[#D4AF37]" />
        </div>
        <ArrowUpRight className="text-gray-500 group-hover:text-white transition-colors" />
      </div>

      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400 mb-8 flex-grow">{description}</p>

      {/* The Impact Section */}
      <div className="mt-auto pt-4 border-t border-white/5 group-hover:border-white/10 transition-colors">
        <div className="flex items-end gap-2">
          <motion.span 
            className="text-3xl font-extrabold text-[#D4AF37] tracking-tighter"
            whileHover={{ scale: 1.05 }}
          >
            {impactMetric}
          </motion.span>
          <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1">
            {impactLabel}
          </span>
        </div>
      </div>
    </AntigravityCard>
  );
}
