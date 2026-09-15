'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileText, Users, FolderKanban, MessageSquare, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function GlobalSearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const mockResults = [
    { type: 'Overview', title: 'Command Center Overview', icon: FolderKanban, link: '/dashboard' },
    { type: 'Analytics', title: 'Revenue & Performance Analytics', icon: FolderKanban, link: '/dashboard/analytics' },
    { type: 'Leads', title: 'Lead Pipeline Kanban', icon: MessageSquare, link: '/dashboard/leads' },
    { type: 'Project', title: 'Projects Control Center', icon: FolderKanban, link: '/dashboard/projects' },
    { type: 'Task', title: 'Task Management Board', icon: FileText, link: '/dashboard/tasks' },
    { type: 'Appraisals', title: 'Client Appraisals & Proposals', icon: FileText, link: '/dashboard/appraisals' },
    { type: 'Customers', title: 'Customer Segments & Cohorts', icon: Users, link: '/dashboard/customers' },
    { type: 'Services', title: 'Services & Market Demand', icon: FolderKanban, link: '/dashboard/services' },
    { type: 'Team', title: 'NOVELLEYX Team Capacity', icon: Users, link: '/dashboard/team' },
    { type: 'Identity', title: 'Digital Credential Generator', icon: FileText, link: '/dashboard/identity' },
    { type: 'AI', title: 'AI Intelligence Suite', icon: MessageSquare, link: '/dashboard/ai' },
  ].filter(res => res.title.toLowerCase().includes(query.toLowerCase()) || res.type.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        className="relative w-full max-w-2xl bg-[#121212] border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
      >
        <div className="flex items-center px-4 border-b border-white/5">
          <Search className="w-5 h-5 text-neutral-500" />
          <input
            autoFocus
            type="text"
            placeholder="Search NOVELLEYX Command Center..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent border-none px-4 py-5 text-white focus:outline-none placeholder-neutral-600 text-lg"
          />
          <div className="text-[10px] font-bold tracking-widest text-neutral-600 uppercase border border-white/10 px-2 py-1 rounded bg-black/50">
            ESC
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto custom-scrollbar p-2">
          {mockResults.length > 0 ? (
            <div className="space-y-1">
              <div className="px-3 py-2 text-xs font-bold text-neutral-600 uppercase tracking-wider">Results</div>
              {mockResults.map((result, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    router.push(result.link);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 group transition-colors"
                >
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-8 h-8 rounded-lg bg-black border border-white/5 flex items-center justify-center text-neutral-400 group-hover:text-[#F59E0B] group-hover:border-[#F59E0B]/30 transition-colors">
                      <result.icon size={16} />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white">{result.title}</h4>
                      <span className="text-xs text-neutral-500">{result.type}</span>
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-neutral-600 opacity-0 group-hover:opacity-100 group-hover:text-[#F59E0B] transition-all -translate-x-2 group-hover:translate-x-0" />
                </button>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-neutral-500">
              No results found for "{query}".
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
