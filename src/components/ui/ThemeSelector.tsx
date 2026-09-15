'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Palette } from 'lucide-react';

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="relative group">
      <button className="p-2 text-gray-400 hover:text-[#D4AF37] transition-all duration-300 rounded-full hover:bg-white/5 flex items-center justify-center">
        <Palette size={20} />
      </button>
      
      <div className="absolute right-0 top-full mt-2 w-32 bg-[#050505]/90 backdrop-blur-xl border border-[#D4AF37]/20 rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-hidden z-50">
        <button 
          onClick={() => setTheme('gold')}
          className={`w-full text-left px-4 py-2 text-sm hover:bg-white/5 flex items-center gap-2 ${theme === 'gold' ? 'text-[#D4AF37]' : 'text-gray-300'}`}
        >
          <div className="w-3 h-3 rounded-full bg-[#D4AF37]" /> Gold
        </button>
        <button 
          onClick={() => setTheme('silver')}
          className={`w-full text-left px-4 py-2 text-sm hover:bg-white/5 flex items-center gap-2 ${theme === 'silver' ? 'text-gray-300' : 'text-gray-400'}`}
        >
          <div className="w-3 h-3 rounded-full bg-[#C0C0C0]" /> Silver
        </button>
        <button 
          onClick={() => setTheme('cyber')}
          className={`w-full text-left px-4 py-2 text-sm hover:bg-white/5 flex items-center gap-2 ${theme === 'cyber' ? 'text-cyan-400' : 'text-gray-400'}`}
        >
          <div className="w-3 h-3 rounded-full bg-cyan-400" /> Cyber
        </button>
      </div>
    </div>
  );
}
