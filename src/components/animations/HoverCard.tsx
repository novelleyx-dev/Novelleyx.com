"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface HoverCardProps {
  children: ReactNode;
  className?: string;
}

export function HoverCard({ children, className = "" }: HoverCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`glass-panel p-6 sm:p-8 hover:border-amber-500/50 hover:shadow-[0_4px_20px_rgba(245,158,11,0.1)] transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
}
