"use client";
import React from "react";
import { motion } from "framer-motion";

export function AmbientTerrain() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-[#050505]">
      {/* Background glow for atmosphere */}
      <div className="absolute top-0 inset-x-0 h-full bg-[radial-gradient(ellipse_at_top_center,rgba(245,158,11,0.05),transparent_50%)]" />
      
      {/* Terrain Layer 1 (Back) */}
      <motion.div 
        className="absolute bottom-0 w-[200vw] h-[50vh] left-[-50vw]"
        style={{
          background: "radial-gradient(ellipse at center, rgba(30,30,30,1) 0%, rgba(10,10,10,1) 100%)",
          borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
          boxShadow: "inset 0 2px 20px rgba(245,158,11,0.03)"
        }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Terrain Layer 2 (Middle) */}
      <motion.div 
        className="absolute bottom-[-10vh] w-[150vw] h-[40vh] left-[-10vw]"
        style={{
          background: "radial-gradient(ellipse at top, rgba(20,20,20,1) 0%, rgba(5,5,5,1) 100%)",
          borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
          boxShadow: "inset 0 2px 15px rgba(245,158,11,0.05)"
        }}
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Terrain Layer 3 (Front) */}
      <motion.div 
        className="absolute bottom-[-20vh] w-[120vw] h-[35vh] left-[-5vw]"
        style={{
          background: "#080808",
          borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
          boxShadow: "inset 0 1px 10px rgba(245,158,11,0.08)"
        }}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grid overlay for digital feel */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
    </div>
  );
}
