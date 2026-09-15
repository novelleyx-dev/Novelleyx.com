'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname();

  // Navigation Links
  const primaryLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'NOVELLEYX AI', href: '/ai' },
    { label: 'Bundles', href: '/bundles' },
  ];

  const drawerLinks = [
    { label: 'About', href: '/#about' },
    { label: 'How We Work', href: '/#how-we-work' },
    { label: 'Why NOVELLEYX', href: '/why-novelleyx' },
    { label: 'Our Pillars', href: '/pillars' },
    { label: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isDrawerOpen]);

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-500 flex items-center ${
          isScrolled 
            ? 'h-16 bg-[#0A0A0A]/70 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' 
            : 'h-20 bg-transparent'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          
          {/* Left: Logo */}
          <div className="flex-1 flex justify-start items-center">
            <Link href="/" className="flex items-center group relative z-[60]">
              <span className="text-xl font-bold tracking-wider text-white group-hover:text-amber-400 transition-colors duration-300">
                NOVELLEYX
              </span>
              <span className="ml-1 w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.6)]"></span>
            </Link>
          </div>

          {/* Center: Navigation Links (Desktop Only) */}
          <nav className="hidden xl:flex justify-center items-center gap-6 lg:gap-8 flex-shrink-0 px-4">
            {primaryLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-semibold tracking-wide transition-colors duration-300 relative group py-2 ${
                    isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {link.label}
                  {/* Floating Gold Glow Line */}
                  <span className={`absolute -bottom-1 left-0 h-[2px] bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)] transition-all duration-300 rounded-full ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-50'}`}></span>
                </Link>
              );
            })}
          </nav>

          {/* Right: Unified Action Group */}
          <div className="flex-1 flex justify-end items-center gap-2 lg:gap-3 relative z-[160]">
            
            {/* Login Portal Button */}
            <Link href="/login" className="hidden lg:block">
              <button className="h-9 px-4 lg:px-5 text-xs font-bold text-white bg-white/5 backdrop-blur-md border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-white/5">
                Login
              </button>
            </Link>

            {/* Register Portal Button */}
            <Link href="/register" className="hidden lg:block">
              <button className="h-9 px-4 lg:px-5 text-xs font-bold text-amber-500 bg-amber-500/10 backdrop-blur-md border border-amber-500/20 rounded-full hover:bg-amber-500/20 hover:border-amber-400 hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] transition-all duration-300 flex items-center justify-center">
                Register
              </button>
            </Link>

            {/* Primary CTA Button */}
            <Link href="/appraisal">
              <button className="h-9 px-3 lg:px-5 text-[10px] sm:text-xs font-extrabold text-black bg-gradient-to-r from-amber-400 to-amber-500 rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(245,158,11,0.4)] flex items-center justify-center whitespace-nowrap tracking-wide">
                GET AN APPRAISAL
              </button>
            </Link>
            
            {/* Hamburger Icon */}
            <button
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              className="h-9 w-9 flex items-center justify-center text-neutral-300 hover:text-amber-400 border border-transparent hover:border-amber-500/30 rounded-full hover:bg-amber-500/10 transition-all duration-300 z-[160]"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isDrawerOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>

        </div>
      </header>

      {/* Slide-Out Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[150]"
            />
            
            {/* Drawer Panel - Glassmorphism */}
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-[#050505]/95 backdrop-blur-2xl border-l border-white/10 z-[150] pt-28 px-8 pb-12 overflow-y-auto custom-scrollbar shadow-[-20px_0_50px_rgba(0,0,0,0.5)]"
            >
              {/* Internal Glow Effect */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none translate-y-1/2 translate-x-1/3" />

              <div className="flex flex-col space-y-8 relative z-10">
                
                {/* Mobile Only: Show primary links in drawer if on small screen */}
                <div className="flex flex-col space-y-6 lg:hidden mb-6 pb-6 border-b border-white/10">
                  <span className="text-[10px] font-bold text-amber-500 tracking-[0.2em] uppercase mb-2">Primary Pages</span>
                  {primaryLinks.map((link, index) => (
                    <motion.div 
                      key={link.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                    >
                      <Link 
                        href={link.href}
                        onClick={() => setIsDrawerOpen(false)}
                        className="text-xl font-bold text-white hover:text-amber-400 transition-colors duration-300"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                  
                  {/* Mobile Portal Login */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex gap-4 pt-4"
                  >
                    <Link href="/login" onClick={() => setIsDrawerOpen(false)} className="flex-1">
                      <button className="w-full h-12 px-5 text-sm font-bold text-white bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.2)]">
                        Login
                      </button>
                    </Link>
                    <Link href="/register" onClick={() => setIsDrawerOpen(false)} className="flex-1">
                      <button className="w-full h-12 px-5 text-sm font-bold text-black bg-gradient-to-r from-amber-400 to-amber-500 rounded-full hover:scale-[1.02] transition-all duration-300 shadow-[0_4px_15px_rgba(245,158,11,0.3)]">
                        Register
                      </button>
                    </Link>
                  </motion.div>
                </div>

                {/* Blueprint Navigation */}
                <div className="flex flex-col mt-4">
                  <span className="text-[11px] font-bold text-amber-500/70 tracking-[0.25em] uppercase mb-6 px-2">Main Directory</span>
                  <div className="flex flex-col space-y-2">
                    {drawerLinks.map((link, index) => (
                      <motion.div 
                        key={link.label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.05 }}
                      >
                        <Link 
                          href={link.href}
                          onClick={() => setIsDrawerOpen(false)}
                          className="flex items-center justify-between group py-4 px-2 border-b border-white/5 hover:border-amber-500/20 hover:bg-white/[0.02] rounded-lg transition-all duration-300"
                        >
                          <span className="text-xl md:text-2xl font-bold text-gray-300 group-hover:text-amber-400 group-hover:translate-x-2 transition-all duration-300">
                            {link.label}
                          </span>
                          <span className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300 text-amber-500">
                            →
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
