'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const steps = [
  { num: '01', title: 'DISCOVER', desc: 'We listen.', icon: '🔍' },
  { num: '02', title: 'ANALYZE', desc: 'We understand.', icon: '🧠' },
  { num: '03', title: 'APPRAISE', desc: 'We recommend.', icon: '📋' },
  { num: '04', title: 'PLAN', desc: 'We prepare.', icon: '📐' },
  { num: '05', title: 'BUILD', desc: 'We execute.', icon: '⚙️' },
  { num: '06', title: 'TEST', desc: 'We validate.', icon: '🧪' },
  { num: '07', title: 'DELIVER', desc: 'We hand over.', icon: '📦' },
  { num: '08', title: 'SUPPORT', desc: 'We continue where required.', icon: '🤝' }
];

export default function HowWeWorkPreview() {
  return (
    <section id="how-we-work" className="bg-[#050505] relative py-24 md:py-32 px-6 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-amber-500/5 blur-[150px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none translate-y-1/3 -translate-x-1/3" />
      
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center max-w-3xl mx-auto mb-20 relative z-10">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-amber-500 text-sm font-bold tracking-[0.2em] uppercase mb-4 block"
          >
            THE WORKFLOW
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight tracking-tight uppercase"
          >
            From Problem <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">to Possibility.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl leading-relaxed font-light"
          >
            We don't sell generic services; we solve specific problems. Our systematic approach ensures every solution is meticulously tailored to your business architecture.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (idx % 4) * 0.15, duration: 0.6, ease: "easeOut" }}
              className="relative group"
            >
              {/* Connector Line (Desktop) */}
              {(idx + 1) % 4 !== 0 && idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[80%] w-full h-[1px] bg-gradient-to-r from-amber-500/30 to-transparent z-0" />
              )}
              
              <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 hover:border-amber-500/40 hover:bg-white/[0.02] transition-all duration-500 h-full relative z-10 overflow-hidden shadow-2xl group-hover:-translate-y-2">
                
                {/* Header: Icon & Flowing Number */}
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-black border border-white/10 flex items-center justify-center text-2xl group-hover:border-amber-500/50 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all duration-500 group-hover:-translate-y-1">
                    {step.icon}
                  </div>
                  
                  {/* The Flow Transition Number */}
                  <div className="text-5xl md:text-6xl font-black text-white/10 tracking-tighter transform origin-top-right transition-all duration-500 ease-out select-none group-hover:text-amber-500/80 group-hover:scale-110 group-hover:-translate-x-1 group-hover:translate-y-1 drop-shadow-none group-hover:drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">
                    {step.num}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 tracking-wide group-hover:text-amber-400 transition-colors duration-300 relative z-10">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-base leading-relaxed relative z-10">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
