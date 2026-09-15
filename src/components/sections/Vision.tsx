"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Rocket, Heart, Brain, Building2, Cpu, Globe, Zap } from "lucide-react";

export default function Vision() {
  const items = [
    { title: 'Problems solved', icon: <CheckCircle2 className="w-5 h-5 text-amber-500" /> },
    { title: 'People helped', icon: <Heart className="w-5 h-5 text-amber-500" /> },
    { title: 'Skills developed', icon: <Brain className="w-5 h-5 text-amber-500" /> },
    { title: 'Businesses supported', icon: <Building2 className="w-5 h-5 text-amber-500" /> },
    { title: 'Technology built', icon: <Cpu className="w-5 h-5 text-amber-500" /> },
    { title: 'Opportunities created', icon: <Globe className="w-5 h-5 text-amber-500" /> },
    { title: 'Products developed', icon: <Rocket className="w-5 h-5 text-amber-500" /> },
    { title: 'Ideas transformed', icon: <Zap className="w-5 h-5 text-amber-500" /> }
  ];

  const containerVariants: import("framer-motion").Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: import("framer-motion").Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <section id="vision" className="relative bg-[#050505] px-6 md:px-12 lg:px-24 py-32 overflow-hidden text-center">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold tracking-[0.2em] uppercase mb-6">
            Our Vision
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight uppercase">
            Technology built for tomorrow.
          </h2>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 tracking-tight drop-shadow-sm uppercase">
            Grounded in today.
          </h2>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto mb-20 space-y-6 text-gray-300 text-lg md:text-xl font-light leading-relaxed"
        >
          <p>
            We are building NOVELLEYX to be an organization that respects the problem before assuming the solution.
          </p>
          <p>
            Whether it's developing AI automation, designing complex web applications, executing media strategies, or guiding talent—our objective remains singular: we want to build things that matter.
          </p>
          <p className="text-amber-500 font-semibold">
            We don't just want to be an agency. We want to be the engine behind the organizations and people shaping the future.
          </p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {items.map((item, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              className="flex flex-col items-center justify-center p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] hover:border-amber-500/30 transition-all duration-300 group shadow-lg"
            >
              <div className="w-12 h-12 rounded-full bg-black border border-white/10 flex items-center justify-center mb-4 group-hover:border-amber-500/50 group-hover:scale-110 transition-all duration-300 shadow-[0_0_15px_rgba(245,158,11,0.1)] group-hover:shadow-[0_0_25px_rgba(245,158,11,0.3)]">
                {item.icon}
              </div>
              <p className="text-gray-300 font-bold text-xs md:text-sm uppercase tracking-wider text-center group-hover:text-white transition-colors">
                {item.title}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
