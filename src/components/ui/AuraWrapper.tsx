'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface AuraWrapperProps {
  children: React.ReactNode;
  className?: string;
  auraColor?: string;
  auraSize?: number;
}

export default function AuraWrapper({ 
  children, 
  className = '',
  auraColor = 'rgba(212, 175, 55, 0.15)', // Default Novelleyx Gold
  auraSize = 400
}: AuraWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth the mouse movement slightly for a more premium feel
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group ${className}`}
    >
      {/* The Aura / Flashlight Effect */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: useTransform(
            [smoothX, smoothY],
            ([x, y]) => `radial-gradient(${auraSize}px circle at ${x}px ${y}px, ${auraColor}, transparent 100%)`
          )
        }}
      />
      
      {/* The micro-dot matrix texture revealed by the aura */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay transition-opacity duration-500 opacity-0 group-hover:opacity-30"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '8px 8px',
          maskImage: useTransform(
            [smoothX, smoothY],
            ([x, y]) => `radial-gradient(${auraSize * 0.8}px circle at ${x}px ${y}px, black, transparent 100%)`
          ),
          WebkitMaskImage: useTransform(
            [smoothX, smoothY],
            ([x, y]) => `radial-gradient(${auraSize * 0.8}px circle at ${x}px ${y}px, black, transparent 100%)`
          )
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
