'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface TimelineStep {
  title: string;
  description: string;
}

interface TransparentTimelineProps {
  steps: TimelineStep[];
}

export default function TransparentTimeline({ steps }: TransparentTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative max-w-4xl mx-auto py-12">
      {/* The Central Z-Axis Light Beam */}
      <div className="absolute left-[28px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-white/5" />
      <motion.div 
        className="absolute left-[28px] md:left-1/2 md:-translate-x-1/2 top-0 w-[2px] bg-gradient-to-b from-[#D4AF37] to-transparent shadow-[0_0_15px_rgba(212,175,55,0.8)]"
        style={{ height: lineHeight }}
      />

      <div className="space-y-16 md:space-y-24">
        {steps.map((step, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className={`relative flex flex-col md:flex-row items-start ${isEven ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Step Node */}
              <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-14 h-14 bg-[#050505] border border-white/10 rounded-full z-10 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                <CheckCircle2 className="w-6 h-6 text-[#D4AF37]" />
              </div>

              {/* Content Panel */}
              <div className={`ml-20 md:ml-0 w-full md:w-[45%] ${isEven ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                <div className="glass-panel p-8 group hover:border-[#D4AF37]/30 transition-colors duration-500 cursor-default">
                  <span className="text-[#D4AF37] font-mono text-sm tracking-widest mb-2 block">
                    STEP 0{index + 1}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-balance">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
