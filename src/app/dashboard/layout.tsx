"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Users, UserPlus, FolderKanban, 
  BrainCircuit, Settings, Menu, X, Bell, Search,
  ChevronRight, LogOut, Plus, LineChart, CheckSquare,
  FileCheck, Building2, Briefcase, ShieldCheck
} from 'lucide-react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useAppStore } from '@/store/useAppStore';
import { motion, AnimatePresence } from 'framer-motion';
import GlobalSearchModal from '@/components/dashboard/layout/GlobalSearchModal';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Analytics & Revenue', href: '/dashboard/analytics', icon: LineChart },
  { name: 'Leads Pipeline', href: '/dashboard/leads', icon: UserPlus },
  { name: 'Projects Control', href: '/dashboard/projects', icon: FolderKanban },
  { name: 'Task Board', href: '/dashboard/tasks', icon: CheckSquare },
  { name: 'Appraisals', href: '/dashboard/appraisals', icon: FileCheck },
  { name: 'Customers & Segments', href: '/dashboard/customers', icon: Building2 },
  { name: 'Services & Demand', href: '/dashboard/services', icon: Briefcase },
  { name: 'Team Capacity', href: '/dashboard/team', icon: Users },
  { name: 'Digital Identity', href: '/dashboard/identity', icon: ShieldCheck },
  { name: 'AI Intelligence', href: '/dashboard/ai', icon: BrainCircuit },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isSidebarOpen, toggleSidebar, user, logout } = useAppStore();
  const pathname = usePathname();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const pathSegments = pathname.split('/').filter(Boolean);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#050505] text-[#A8A8A8] font-sans flex overflow-hidden">
        
        {/* Sidebar */}
        <aside 
          className={`${
            isSidebarOpen ? 'w-64' : 'w-20'
          } bg-[#050505] border-r border-white/5 flex flex-col transition-all duration-300 shrink-0 z-20 h-screen`}
        >
          {/* Logo */}
          <div className="h-20 flex items-center justify-between px-6 shrink-0">
            {isSidebarOpen && (
              <span className="text-white font-bold text-2xl tracking-tight truncate flex items-center">
                NOVELLEYX<span className="ml-1 w-2 h-2 rounded-full bg-[#F59E0B]"></span>
              </span>
            )}
            <button 
              onClick={toggleSidebar}
              className="text-[#A8A8A8] hover:text-white p-1.5 rounded-md hover:bg-white/5 transition-colors mx-auto"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-6 space-y-2 px-4 custom-scrollbar">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center ${
                    isSidebarOpen ? 'px-4' : 'justify-center px-0'
                  } py-3 rounded-xl transition-all duration-300 relative group`}
                  title={!isSidebarOpen ? item.name : undefined}
                >
                  {/* Glowing Pill Active State */}
                  {isActive && (
                    <motion.div 
                      layoutId="sidebar-active"
                      className="absolute inset-0 bg-white/[0.08] rounded-xl border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                    />
                  )}
                  
                  <item.icon size={20} className={`relative z-10 ${isActive ? 'text-white' : 'text-[#A8A8A8] group-hover:text-white transition-colors'}`} />
                  
                  {isSidebarOpen && (
                    <span className={`relative z-10 ml-4 font-semibold ${isActive ? 'text-white' : 'group-hover:text-white transition-colors'}`}>
                      {item.name}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Actions (Settings & Logout) */}
          <div className="p-4 space-y-2 border-t border-white/5">
            <Link
              href="/dashboard/settings"
              className={`flex items-center ${isSidebarOpen ? 'px-4' : 'justify-center'} py-3 rounded-xl transition-all duration-300 hover:bg-white/5 group`}
              title={!isSidebarOpen ? 'Settings' : undefined}
            >
              <Settings size={20} className="text-[#A8A8A8] group-hover:text-white transition-colors" />
              {isSidebarOpen && <span className="ml-4 font-semibold text-[#A8A8A8] group-hover:text-white transition-colors">Settings</span>}
            </Link>
            
            <button
              onClick={logout}
              className={`w-full flex items-center ${isSidebarOpen ? 'px-4' : 'justify-center'} py-3 rounded-xl transition-all duration-300 hover:bg-red-500/10 hover:text-red-400 group text-[#A8A8A8]`}
              title={!isSidebarOpen ? 'Log Out' : undefined}
            >
              <LogOut size={20} className="group-hover:text-red-400 transition-colors" />
              {isSidebarOpen && <span className="ml-4 font-semibold group-hover:text-red-400 transition-colors">Log Out</span>}
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col relative z-10 h-screen overflow-hidden bg-[#0A0A0A] rounded-tl-[40px] border-l border-t border-white/5 my-2 mr-2">
          
          {/* Top Header */}
          <header className="h-20 flex items-center justify-between px-8 shrink-0 relative z-30">
            
            {/* Breadcrumbs */}
            <div className="flex items-center space-x-2 text-sm font-semibold">
              <span className="text-[#A8A8A8]">Home</span>
              <ChevronRight size={16} className="text-[#A8A8A8]/50" />
              {pathSegments.map((segment, index) => {
                const isLast = index === pathSegments.length - 1;
                return (
                  <React.Fragment key={index}>
                    {index > 0 && <ChevronRight size={16} className="text-[#A8A8A8]/50" />}
                    <span className={`${isLast ? 'text-white capitalize' : 'text-[#A8A8A8] capitalize'}`}>
                      {segment}
                    </span>
                  </React.Fragment>
                );
              })}
            </div>
            
            {/* Right Header Actions */}
            <div className="flex items-center space-x-6">
              
              {/* Overlapping Avatars & Add Member */}
              <div className="hidden md:flex items-center">
                <div className="flex -space-x-3 mr-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-9 h-9 rounded-full bg-neutral-800 border-2 border-[#0A0A0A] flex items-center justify-center overflow-hidden">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+10}&backgroundColor=b6e3f4`} alt="Team" />
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => alert("Add Member modal opening soon!")}
                  className="flex items-center space-x-1.5 text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/5 px-3 py-1.5 rounded-full transition-colors"
                >
                  <Plus size={14} />
                  <span>Add member</span>
                </button>
              </div>

              <div className="w-px h-6 bg-white/10 hidden md:block"></div>

              {/* Global Search Trigger */}
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center justify-center w-10 h-10 bg-[#121212] border border-white/10 rounded-full text-[#A8A8A8] hover:text-white hover:border-[#F59E0B]/50 hover:bg-[#F59E0B]/10 transition-all"
                title="Search (Ctrl+K)"
              >
                <Search size={18} />
              </button>

              {/* Notifications */}
              <button 
                onClick={() => alert("Notifications drawer opening soon!")}
                className="relative flex items-center justify-center w-10 h-10 bg-[#121212] border border-white/10 rounded-full text-[#A8A8A8] hover:text-white hover:border-[#F59E0B]/50 hover:bg-[#F59E0B]/10 transition-all"
              >
                <Bell size={18} />
                <span className="absolute top-0 right-0 w-3 h-3 bg-[#F59E0B] rounded-full border-2 border-[#0A0A0A]"></span>
              </button>

              {/* User Profile */}
              <div className="relative">
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-[#121212] border border-white/10 overflow-hidden hover:border-[#F59E0B]/50 transition-all"
                >
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Abhinav&backgroundColor=b6e3f4" alt="User" />
                </button>
                
                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-[#121212] border border-white/10 rounded-xl shadow-2xl py-2 z-50"
                    >
                      <div className="px-4 py-2 border-b border-white/5 mb-1">
                        <p className="text-sm text-white font-bold">{user?.name}</p>
                        <p className="text-xs text-[#A8A8A8] truncate">{user?.email}</p>
                      </div>
                      <button 
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-sm font-semibold text-red-400 hover:bg-white/5 transition-colors"
                      >
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto px-8 py-6 relative custom-scrollbar">
            <div className="max-w-7xl mx-auto h-full relative z-10">
              {children}
            </div>
          </main>
        </div>
      </div>

      <AnimatePresence>
        {isSearchOpen && <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />}
      </AnimatePresence>
    </ProtectedRoute>
  );
}
