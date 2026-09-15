"use client";
import { motion } from "framer-motion";

export function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-[#050505]">
      {/* Deep charcoal and faint gold radial gradient mesh */}
      <motion.div
        className="absolute top-[40%] left-1/2 w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[100px]"
        style={{
          background: "radial-gradient(circle, rgba(245,158,11,0.3) 0%, rgba(5,5,5,0) 70%)"
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      {/* Secondary accent mesh */}
      <motion.div
        className="absolute top-[60%] left-[60%] w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-[80px]"
        style={{
          background: "radial-gradient(circle, rgba(245,158,11,0.2) 0%, rgba(5,5,5,0) 70%)"
        }}
        animate={{
          scale: [1, 1.1, 1],
          x: ["0%", "-5%", "0%"],
          y: ["0%", "5%", "0%"],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}
