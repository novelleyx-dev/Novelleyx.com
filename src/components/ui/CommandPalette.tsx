'use client';

import React, { useEffect, useState } from 'react';
import { Search, FileText, Users, Folder, Briefcase, Activity } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
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

  if (!isOpen) return null;

  const mockResults = [
    { id: 1, title: 'Global Tech Corp', type: 'Customer', icon: Users, path: '/dashboard/leads' },
    { id: 2, title: 'AI Automation Project', type: 'Lead', icon: Activity, path: '/dashboard/leads/1' },
    { id: 3, title: 'E-commerce Overhaul', type: 'Project', icon: Folder, path: '/dashboard/projects' },
    { id: 4, title: 'Website Development', type: 'Service', icon: Briefcase, path: '/services' },
    { id: 5, title: 'HIPAA Compliant Data Lake', type: 'Appraisal', icon: FileText, path: '/dashboard/appraisals' },
  ].filter(item => item.title.toLowerCase().includes(search.toLowerCase()) || search === '');

  const handleSelect = (path: string) => {
    setIsOpen(false);
    setSearch('');
    router.push(path);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] bg-black/80 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
      <div 
        className="w-full max-w-2xl bg-[#0A0A0A] border border-[#D4AF37]/30 rounded-lg shadow-[0_0_40px_rgba(212,175,55,0.15)] overflow-hidden animate-in fade-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center border-b border-gray-800 px-4 py-4">
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <input 
            type="text" 
            autoFocus
            placeholder="Search leads, projects, appraisals... (Esc to close)"
            className="flex-1 bg-transparent text-white outline-none placeholder:text-gray-600 text-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="text-xs text-gray-500 bg-gray-800/50 px-2 py-1 rounded border border-gray-700">ESC</div>
        </div>
        
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {mockResults.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No results found for "{search}"</div>
          ) : (
            <div className="space-y-1">
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Results</div>
              {mockResults.map((result) => (
                <button 
                  key={result.id}
                  onClick={() => handleSelect(result.path)}
                  className="w-full flex items-center px-3 py-3 rounded-md hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-colors text-left group"
                >
                  <result.icon className="w-4 h-4 mr-3 text-gray-400 group-hover:text-[#D4AF37]" />
                  <span className="flex-1 text-gray-200 group-hover:text-[#D4AF37]">{result.title}</span>
                  <span className="text-xs text-gray-500 group-hover:text-[#D4AF37]/70">{result.type}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="bg-[#111111] px-4 py-3 border-t border-gray-800 text-xs text-gray-500 flex justify-between">
          <span>Search powered by NOVELLEYX Command Center</span>
          <span className="text-[#D4AF37]">Enter to select</span>
        </div>
      </div>
    </div>
  );
}
