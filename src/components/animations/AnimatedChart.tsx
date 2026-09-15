"use client";
import React from "react";
import { motion } from "framer-motion";

interface AnimatedChartProps {
  className?: string;
}

export function AnimatedChart({ className = "" }: AnimatedChartProps) {
  return (
    <div className={`relative w-full h-full min-h-[200px] flex items-center justify-center ${className}`}>
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] rounded-xl [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]" />
      
      <svg
        viewBox="0 0 800 400"
        className="w-full h-full drop-shadow-[0_0_15px_rgba(245,158,11,0.5)] z-10"
        preserveAspectRatio="none"
      >
        {/* Glow path */}
        <motion.path
          d="M 0 350 C 150 350, 250 200, 400 250 C 550 300, 650 100, 800 50"
          fill="none"
          stroke="rgba(245,158,11,0.2)"
          strokeWidth="12"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="blur-sm"
        />
        {/* Main path */}
        <motion.path
          d="M 0 350 C 150 350, 250 200, 400 250 C 550 300, 650 100, 800 50"
          fill="none"
          stroke="#F59E0B"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        
        {/* Data Points */}
        {[
          { cx: 0, cy: 350, delay: 0 },
          { cx: 400, cy: 250, delay: 1 },
          { cx: 800, cy: 50, delay: 2 },
        ].map((point, i) => (
          <motion.circle
            key={i}
            cx={point.cx}
            cy={point.cy}
            r="6"
            fill="#050505"
            stroke="#F59E0B"
            strokeWidth="3"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: point.delay, type: "spring" }}
          />
        ))}
      </svg>
      
      {/* Soft gradient below the chart */}
      <motion.div
        className="absolute bottom-0 w-full h-[80%] bg-gradient-to-t from-amber-500/10 to-transparent"
        style={{ clipPath: "polygon(0 87%, 50% 62%, 100% 12%, 100% 100%, 0 100%)" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 1 }}
      />
    </div>
  );
}
