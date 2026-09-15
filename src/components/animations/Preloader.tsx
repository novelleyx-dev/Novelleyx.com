"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cinematicEase } from "./variants";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 10) + 5;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
        }, 500); // Hold at 100% for a moment
      }
      setProgress(current);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.2, ease: cinematicEase }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]"
        >
          <div className="flex flex-col items-center max-w-sm w-full px-6">
            <h1 className="text-3xl tracking-widest text-white font-bold mb-8">NOVELLEYX</h1>
            
            <div className="w-full h-px bg-white/10 relative mb-4">
              <motion.div
                className="absolute top-0 left-0 h-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear", duration: 0.2 }}
              />
            </div>
            
            <div className="flex justify-between w-full text-xs font-semibold tracking-widest text-neutral-500 uppercase">
              <span>{progress}%</span>
              <span>INITIALIZED</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
