'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, X, User } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export default function AICompass() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([]);
  const [query, setQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const addLead = useAppStore((state) => state.addLead);

  const simulateAIChat = (input: string) => {
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setIsTyping(true);
    setQuery('');

    setTimeout(() => {
      setIsTyping(false);
      
      const q = input.toLowerCase();
      let aiText = `I understand you need assistance with "${input}". Let me build out a structured plan for you.`;
      
      if (q.includes('app') || q.includes('mobile')) {
         aiText = "Based on your request for a mobile app, I have analyzed the complexity. We should proceed with a React Native build backed by our edge-computed database structure. I've automatically compiled this requirement into a new lead for our engineering team to review.";
         addLead({
           goal: 'Build Mobile Application',
           problem: 'Need a scalable cross-platform solution',
           complexity: 'HIGH',
           recommended_services: ['Mobile App Development', 'API Development', 'UI/UX Design'],
           status: 'NEW'
         });
      } else if (q.includes('bot') || q.includes('ai') || q.includes('automate')) {
         aiText = "I see you're looking for AI automation. A neural-symbolic routing system will be perfect. I've drafted the requirements and injected them straight into the NOVELLEYX Command Center pipeline.";
         addLead({
           goal: 'Implement AI Automation Workflow',
           problem: 'Manual repetitive tasks slowing down growth',
           complexity: 'MEDIUM',
           recommended_services: ['AI Automation', 'Custom AI Application'],
           status: 'NEW'
         });
      } else {
        // Generic fallback lead creation
         addLead({
           goal: input.slice(0, 30) + '...',
           problem: 'General inquiry captured from AI Compass',
           complexity: 'LOW',
           recommended_services: ['IT Support', 'Consultation'],
           status: 'NEW'
         });
         aiText = "I have processed your query and securely logged a new Lead ticket into the NOVELLEYX Command Center for our architects to review.";
      }
      
      setMessages(prev => [...prev, { role: 'ai', content: aiText }]);
    }, 1500);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    simulateAIChat(query);
  };

  return (
    <>
      {/* Floating Cyber-Dock Widget (Compact) */}
      <motion.div
        initial={{ scale: 0, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 1 }}
        className="fixed bottom-6 right-6 z-[100]"
      >
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center justify-center w-14 h-14 bg-neutral-950/90 backdrop-blur-xl border border-[#F59E0B]/50 shadow-[0_0_25px_rgba(245,158,11,0.2)] rounded-full hover:shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:scale-105 hover:border-[#F59E0B] transition-all duration-300"
        >
          {/* Live Pulse Dot */}
          <div className="absolute top-0 right-0 flex h-3 w-3 -mt-1 -mr-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-neutral-950"></span>
          </div>
          
          <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
            <Sparkles className="text-[#F59E0B] w-6 h-6 group-hover:text-amber-300 transition-colors" />
          </div>
          
          {/* Subtle Cyber Glow inside button */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#F59E0B]/0 via-[#F59E0B]/10 to-[#F59E0B]/0 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </button>
      </motion.div>

      {/* Expanded Consultation Window (Slide-Over) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 z-[101] bg-black/40 flex justify-end"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()} // Prevent close on clicking inside panel
              className="bg-[#050505] border-l border-[#F59E0B]/20 w-full max-w-md h-full flex flex-col shadow-[-30px_0_80px_rgba(245,158,11,0.1)] relative"
            >
              {/* Subtle top glow line */}
              <div className="absolute top-0 inset-y-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-[#F59E0B] to-transparent opacity-30" />

              <div className="flex justify-between items-center p-6 bg-[#0A0A0A] border-b border-white/5 shrink-0">
                <div className="flex items-center space-x-3 text-[#F59E0B]">
                  <Sparkles size={20} />
                  <span className="font-bold tracking-widest text-sm uppercase">NOVELLEYX AI</span>
                  <div className="flex items-center gap-1.5 ml-2 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[10px] text-emerald-400 font-medium uppercase tracking-wider">Online</span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-neutral-400 hover:text-white hover:bg-white/10 transition-colors p-2 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Chat Area */}
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 custom-scrollbar">
                
                {messages.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col h-full justify-center space-y-6 mt-10"
                  >
                    <div className="text-white text-xl font-bold tracking-tight">
                      How can we architect your growth today?
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      {['Build a custom AI workflow', 'Develop a mobile app', 'Scale my brand', 'Generate an enterprise RFQ'].map((qp, idx) => (
                        <button 
                          key={idx}
                          onClick={() => { simulateAIChat(qp); }}
                          className="text-left px-4 py-3 bg-[#0A0A0A] border border-white/5 rounded-xl text-sm font-semibold text-[#A8A8A8] hover:text-white hover:border-[#F59E0B]/50 hover:bg-[#F59E0B]/10 transition-all"
                        >
                          {qp}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-start gap-3`}
                  >
                    {msg.role === 'ai' && (
                      <div className="w-8 h-8 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 flex items-center justify-center shrink-0 mt-1">
                        <Sparkles size={14} className="text-[#F59E0B]" />
                      </div>
                    )}
                    <div className={`px-5 py-3.5 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-[#F59E0B] text-black font-medium rounded-tr-sm' : 'bg-[#0A0A0A] border border-white/10 text-white rounded-tl-sm'}`}>
                      {msg.content}
                    </div>
                    {msg.role === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-[#121212] border border-white/10 flex items-center justify-center shrink-0 mt-1">
                        <User size={14} className="text-[#A8A8A8]" />
                      </div>
                    )}
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 flex items-center justify-center shrink-0 mt-1">
                      <Sparkles size={14} className="text-[#F59E0B]" />
                    </div>
                    <div className="flex space-x-1.5 items-center bg-[#0A0A0A] border border-white/10 px-4 py-4 rounded-2xl rounded-tl-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </motion.div>
                )}
                
                {/* Dummy div to scroll to bottom */}
                <div className="pb-10" />
              </div>

              {/* Input Form */}
              <div className="p-6 bg-[#0A0A0A] border-t border-white/5 shrink-0">
                <form onSubmit={handleSearch} className="relative flex items-center">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Type your requirement..."
                    className="w-full bg-[#050505] border border-white/10 rounded-full pl-6 pr-14 py-4 text-white placeholder-neutral-600 focus:outline-none focus:border-[#F59E0B]/50 focus:ring-1 focus:ring-[#F59E0B]/30 transition-all text-sm font-medium"
                  />
                  <button 
                    type="submit"
                    disabled={!query.trim() || isTyping}
                    className="absolute right-2 p-2.5 bg-[#F59E0B] text-black rounded-full hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                  >
                    <ArrowRight size={18} strokeWidth={3} />
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
