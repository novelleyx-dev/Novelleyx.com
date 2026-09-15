'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface AntigravityCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export default function AntigravityCard({ children, className = '', intensity = 10 }: AntigravityCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Physics-based spring config for 3D tilt
  const springConfig = { damping: 20, stiffness: 200 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  // Map mouse coordinates to 3D rotation
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${intensity}deg`, `-${intensity}deg`]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${intensity}deg`, `${intensity}deg`]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    
    // Normalize mouse position between -0.5 and 0.5
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: 'spring', 
        damping: 20, 
        stiffness: 100,
        opacity: { duration: 0.8 }
      }}
      className={`glass-panel relative group ${className}`}
    >
      {/* Specular highlight that follows the mouse */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, transparent 60%)`,
          x: useTransform(mouseXSpring, [-0.5, 0.5], ['-20%', '20%']),
          y: useTransform(mouseYSpring, [-0.5, 0.5], ['-20%', '20%']),
        }}
      />
      
      {/* Content wrapper with internal depth offset */}
      <div 
        style={{ transform: 'translateZ(30px)' }}
        className="relative z-10 w-full h-full"
      >
        {children}
      </div>
    </motion.div>
  );
}
