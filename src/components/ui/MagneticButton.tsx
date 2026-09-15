'use client';

import React, { useRef, useState } from 'react';
import { motion, useSpring, HTMLMotionProps } from 'framer-motion';

interface MagneticButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  magneticPull?: number;
}

export default function MagneticButton({ children, magneticPull = 0.3, className = '', ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Spring configuration for smooth, physics-based motion
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    
    // Calculate the distance from center
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Apply magnetic pull
    x.set((clientX - centerX) * magneticPull);
    y.set((clientY - centerY) * magneticPull);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      whileTap={{ scale: 0.95 }}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      {/* Liquid flare effect on hover */}
      <motion.div
        className="absolute inset-0 bg-white/10 pointer-events-none rounded-full"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.5 : 0.5
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
