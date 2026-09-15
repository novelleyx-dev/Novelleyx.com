"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const nodes = [
  { id: 1, label: "Understand", x: 20, y: 50, detail: "Deep dive into core challenges." },
  { id: 2, label: "Architect", x: 50, y: 20, detail: "Engineered scalable solutions." },
  { id: 3, label: "Automate", x: 80, y: 70, detail: "Seamless AI-driven execution." }
];

export function EcosystemMap() {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  return (
    <div className="relative w-full h-[300px] md:h-[400px] bg-neutral-950/50 rounded-2xl border border-white/5 overflow-hidden">
      {/* Dynamic Connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(245,158,11,0.2)" />
            <stop offset="100%" stopColor="rgba(245,158,11,0.8)" />
          </linearGradient>
        </defs>
        
        {/* Connection 1 -> 2 */}
        <motion.path
          d={`M 20% 50% Q 35% 20% 50% 20%`}
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="2"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        
        {/* Connection 2 -> 3 */}
        <motion.path
          d={`M 50% 20% Q 65% 70% 80% 70%`}
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="2"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
        />
      </svg>

      {/* Nodes */}
      {nodes.map((node, i) => (
        <motion.div
          key={node.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.5, type: "spring", stiffness: 100 }}
        >
          <motion.div
            className={`relative flex items-center justify-center w-16 h-16 md:w-24 md:h-24 rounded-full border-2 cursor-pointer transition-colors duration-300 ${
              hoveredNode === node.id || hoveredNode === null
                ? "bg-amber-500/10 border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.3)]"
                : "bg-black/50 border-white/20"
            }`}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            whileHover={{ scale: 1.1 }}
          >
            <span className="text-xs md:text-sm font-bold text-white tracking-wider">
              0{node.id}
            </span>
            
            {/* Glowing ring */}
            {(hoveredNode === node.id) && (
              <motion.div
                layoutId="nodeGlow"
                className="absolute inset-0 rounded-full border border-amber-400"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1.3 }}
                exit={{ opacity: 0 }}
                transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
              />
            )}
          </motion.div>
          
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 text-center w-32">
            <h4 className="text-sm font-semibold text-white uppercase tracking-widest">{node.label}</h4>
            <AnimatePresence>
              {hoveredNode === node.id && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-xs text-amber-500/80 mt-2 font-medium"
                >
                  {node.detail}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
