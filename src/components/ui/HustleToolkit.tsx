'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Code, PenTool, Database, Lock, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HustleToolkit() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const actions = [
    { id: 'b2b-rfq', title: 'Generate RFQ', icon: Lock, type: 'B2B', desc: 'Secure B2B Request', href: '/services' },
    { id: 'b2b-arch', title: 'View Architecture', icon: Database, type: 'B2B', desc: 'Enterprise Systems', href: '/appraisal' },
    { id: 'student-design', title: 'Design Frameworks', icon: PenTool, type: 'STUDENT', desc: 'UI/UX Kits', href: '/services' },
    { id: 'student-prompts', title: 'Technical Prompts', icon: Code, type: 'STUDENT', desc: 'AI Engineering', href: '/ai' },
  ];

  const filtered = actions.filter(a => a.title.toLowerCase().includes(query.toLowerCase()) || a.type.toLowerCase().includes(query.toLowerCase()));

  const handleAction = (href: string) => {
    setIsOpen(false);
    setQuery('');
    router.push(href);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-start justify-center pt-32 sm:pt-40 px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full max-w-xl bg-[#050505] border border-white/10 rounded-xl shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] relative z-10 overflow-hidden flex flex-col"
          >
            {/* Header / Input */}
            <div className="flex items-center px-4 py-4 border-b border-white/10 bg-white/[0.02]">
              <Search className="text-gray-400 w-5 h-5 mr-3" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tools, workflows, or resources..."
                className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none text-lg"
                autoFocus
              />
              <span className="text-[10px] text-gray-500 font-mono border border-gray-700 rounded px-1.5 py-0.5 ml-2">ESC</span>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  No tools found for "{query}"
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="px-3 py-2 text-[10px] font-mono text-gray-500 tracking-wider">SUGGESTED ACTIONS</div>
                  {filtered.map((action) => (
                    <button
                      key={action.id}
                      onClick={() => handleAction(action.href)}
                      className="w-full flex items-center p-3 rounded-lg hover:bg-white/5 transition-colors group text-left"
                    >
                      <div className={`p-2 rounded-md border border-white/5 bg-black/50 mr-4 ${action.type === 'B2B' ? 'group-hover:text-green-400 group-hover:border-green-400/30 group-hover:shadow-[0_0_10px_rgba(74,222,128,0.2)]' : 'group-hover:text-[#D4AF37] group-hover:border-[#D4AF37]/30 group-hover:shadow-[0_0_10px_rgba(212,175,55,0.2)]'} transition-all`}>
                        <action.icon size={16} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-medium">{action.title}</h4>
                        <p className="text-xs text-gray-500">{action.desc}</p>
                      </div>
                      <div className="text-[9px] font-mono tracking-widest text-gray-600 border border-gray-800 rounded px-2 py-1 uppercase">
                        {action.type}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="px-4 py-3 border-t border-white/10 bg-black/50 flex justify-between items-center">
              <div className="flex space-x-4 text-[10px] text-gray-500">
                <span className="flex items-center"><span className="border border-gray-700 rounded px-1 mr-1">↑↓</span> Navigate</span>
                <span className="flex items-center"><span className="border border-gray-700 rounded px-1 mr-1">↵</span> Select</span>
              </div>
              <span className="text-[10px] font-mono text-[#D4AF37]">NOVELLEYX HUSTLE TOOLKIT</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
