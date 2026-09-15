"use client";

import React, { useState } from 'react';
import { BrainCircuit, Send, ChevronRight, Loader2, Sparkles, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const PROGRESS_STATES = [
  "UNDERSTANDING",
  "ANALYZING",
  "MATCHING SERVICES",
  "PREPARING RECOMMENDATION",
  "READY"
];

export default function AIPage() {
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressIndex, setProgressIndex] = useState(-1);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    setIsProcessing(true);
    setResult(null);
    setProgressIndex(0);

    // Simulate progress states
    for (let i = 0; i < PROGRESS_STATES.length - 1; i++) {
      await new Promise(res => setTimeout(res, 800));
      setProgressIndex(i + 1);
    }

    try {
      const response = await fetch('/api/ai-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      
      const data = await response.json();
      if (data.success) {
        setResult(data); // data contains { isBlueprint, data, text }
      }
    } catch (error) {
      console.error("AI Analysis failed", error);
    } finally {
      setIsProcessing(false);
      setProgressIndex(-1);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 relative overflow-hidden flex flex-col items-center px-4 md:px-8 pb-20 pt-32">
      
      {/* Premium Background Ambience */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#D4AF37]/10 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      <div className="w-full max-w-4xl space-y-12 relative z-10">
        
        {/* Header Section */}
        <div className="text-center space-y-6">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="inline-flex items-center justify-center p-5 bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 border border-[#D4AF37]/30 rounded-2xl mb-2 shadow-[0_0_30px_rgba(212,175,55,0.15)]"
          >
            <BrainCircuit size={40} className="text-[#D4AF37]" strokeWidth={1.5} />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight"
          >
            NOVELLEYX <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F59E0B]">AI CORE</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-[#A8A8A8] max-w-2xl mx-auto leading-relaxed"
          >
            Ask ANY question in the world, or describe your digital vision. Our hyper-intelligent AI architect will instantly synthesize a premium blueprint, matching NOVELLEYX services to your exact needs.
          </motion.p>
        </div>

        {/* Glassmorphic Input Area */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative group"
        >
          {/* Internal Hover Glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
          
          <form onSubmit={handleSubmit} className="relative z-10">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-3 ml-1">
              Command Prompt
            </label>
            <div className="relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything, or say e.g., 'We need a high-performance e-commerce platform with an AI recommendation engine...'"
                className="w-full h-40 bg-black/50 text-white border border-white/10 rounded-2xl p-5 pr-16 focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/50 resize-none placeholder:text-gray-600 custom-scrollbar text-lg leading-relaxed transition-all shadow-inner"
                disabled={isProcessing}
              />
              <button
                type="submit"
                disabled={!input.trim() || isProcessing}
                className="absolute bottom-5 right-5 w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[#D4AF37] to-[#F59E0B] text-black rounded-xl hover:scale-105 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
              >
                {isProcessing ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} className="ml-1" />}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Progress Indicators */}
        {isProcessing && progressIndex >= 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0A0A0A]/90 backdrop-blur-md border border-[#D4AF37]/30 rounded-2xl p-8 flex flex-col items-center justify-center space-y-8 shadow-[0_0_40px_rgba(212,175,55,0.1)] relative overflow-hidden"
          >
            {/* Scanning Line Effect */}
            <motion.div 
              className="absolute top-0 left-0 w-full h-1 bg-[#D4AF37]/50"
              animate={{ y: [0, 200, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            
            <div className="relative">
              <div className="absolute inset-0 bg-[#D4AF37] blur-[30px] opacity-20 animate-pulse rounded-full" />
              <BrainCircuit className="text-[#D4AF37] relative z-10 animate-pulse" size={48} strokeWidth={1.5} />
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs md:text-sm font-bold tracking-wider uppercase">
              {PROGRESS_STATES.map((state, idx) => (
                <React.Fragment key={state}>
                  <span className={`px-3 py-1 rounded-full border transition-all duration-500 ${
                    idx === progressIndex 
                      ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37] scale-110 shadow-[0_0_15px_rgba(212,175,55,0.2)]' 
                      : idx < progressIndex 
                        ? 'bg-green-500/10 border-green-500/30 text-green-500' 
                        : 'border-transparent text-gray-700'
                  }`}>
                    {state}
                  </span>
                  {idx < PROGRESS_STATES.length - 1 && (
                    <ChevronRight size={14} className={idx < progressIndex ? 'text-green-500' : 'text-gray-800'} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        )}

        {/* Results Dashboard */}
        {result && !isProcessing && result.isBlueprint && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0A0A0A]/90 backdrop-blur-2xl border border-[#D4AF37]/40 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative"
          >
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#D4AF37]/5 blur-[100px] pointer-events-none" />
            
            <div className="bg-gradient-to-r from-[#D4AF37]/10 to-transparent p-6 md:p-8 border-b border-[#D4AF37]/20 flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3 tracking-tight">
                <Sparkles className="text-[#D4AF37]" size={28} /> AI Architect Blueprint
              </h2>
              <div className="flex items-center gap-2 px-4 py-2 bg-black/50 border border-[#D4AF37]/30 rounded-full w-fit">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-[#D4AF37] font-bold uppercase tracking-wider">
                  Confidence: {result.data.confidence || 95}%
                </span>
              </div>
            </div>
            
            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 relative z-10">
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-bold mb-3 flex items-center gap-2">
                    <span className="w-6 h-[1px] bg-[#D4AF37]/50" /> Core Objective
                  </h3>
                  <p className="text-xl text-white font-medium leading-relaxed">{result.data.goal}</p>
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold mb-3">Identified Problem</h3>
                  <p className="text-[#A8A8A8] leading-relaxed">{result.data.problem}</p>
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold mb-3">Customer Profile</h3>
                  <div className="inline-block px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white font-semibold">
                    {result.data.customer_type}
                  </div>
                </div>
              </div>

              <div className="space-y-8 bg-black/40 p-6 md:p-8 rounded-2xl border border-white/5">
                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-bold mb-4 flex items-center gap-2">
                    <span className="w-6 h-[1px] bg-[#D4AF37]/50" /> Recommended Services
                  </h3>
                  <ul className="space-y-3">
                    {result.data.recommended_services?.map((service: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-200 bg-white/[0.02] p-3 rounded-xl border border-white/[0.05]">
                        <CheckCircle2 size={20} className="text-[#D4AF37] shrink-0 mt-0.5" />
                        <span className="font-medium">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="pt-6 border-t border-white/10">
                  <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold mb-2">Indicative Investment</h3>
                  <p className="text-4xl font-black text-white tracking-tight">{result.data.indicative_investment}</p>
                </div>
              </div>

            </div>

            <div className="p-6 md:p-8 bg-black/60 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center border border-[#D4AF37]/20">
                  <ArrowRight className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <span className="text-gray-400 text-sm">Next Step: <strong className="text-white text-base block md:inline mt-1 md:mt-0">{result.data.next_step}</strong></span>
              </div>
              <button className="w-full md:w-auto bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-black font-extrabold px-8 py-4 rounded-xl hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.3)] tracking-wide">
                <FileText size={20} />
                PROCEED TO APPRAISAL
              </button>
            </div>
          </motion.div>
        )}

        {/* General Text Answer Dashboard */}
        {result && !isProcessing && !result.isBlueprint && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0A0A0A]/90 backdrop-blur-2xl border border-[#D4AF37]/40 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative"
          >
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#D4AF37]/5 blur-[100px] pointer-events-none" />
            
            <div className="bg-gradient-to-r from-[#D4AF37]/10 to-transparent p-6 md:p-8 border-b border-[#D4AF37]/20 flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3 tracking-tight">
                <Sparkles className="text-[#D4AF37]" size={28} /> AI Response
              </h2>
            </div>
            
            <div className="p-6 md:p-8 relative z-10 prose prose-invert max-w-none text-lg text-gray-300 leading-relaxed whitespace-pre-wrap">
              {result.text}
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
