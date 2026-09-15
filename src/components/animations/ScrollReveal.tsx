"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export function ScrollReveal({ children, className = "", delay = 0, direction = "up" }: ScrollRevealProps) {
  const getInitialY = () => {
    if (direction === "up") return 20;
    if (direction === "down") return -20;
    return 0;
  };
  
  const getInitialX = () => {
    if (direction === "left") return 20;
    if (direction === "right") return -20;
    return 0;
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: getInitialY(), x: getInitialX() }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        type: "spring", 
        damping: 20, 
        stiffness: 100,
        delay: delay 
      }}
    >
      {children}
    </motion.div>
  );
}
