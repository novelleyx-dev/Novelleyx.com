"use client";
import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function MouseGlow() {
  const [isTouch, setIsTouch] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  
  // Use springs for smooth following
  const mouseX = useSpring(-500, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(-500, { stiffness: 50, damping: 20 });

  useEffect(() => {
    // Check if it's a touch device
    const checkTouch = () => {
      setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();
    
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
    };
  }, [isTouch, isVisible, mouseX, mouseY]);

  if (isTouch) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-50 w-[800px] h-[800px] rounded-full mix-blend-screen"
      style={{
        x: mouseX,
        y: mouseY,
        translateX: "-50%",
        translateY: "-50%",
        background: "radial-gradient(circle, rgba(245,158,11,0.1) 0%, rgba(0,0,0,0) 50%)",
        opacity: isVisible ? 1 : 0,
      }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    />
  );
}
