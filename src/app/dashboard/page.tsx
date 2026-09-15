"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AreaChart, Area, ResponsiveContainer, Tooltip, YAxis, XAxis } from 'recharts';
import { 
  Plus, Edit2, CloudUpload, CheckCircle2, Circle, MoreHorizontal,
  LineChart, UserPlus, FolderKanban, CheckSquare, FileCheck, Building2,
  Briefcase, Users, ShieldCheck, ArrowRight
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

const chartData = [
  { time: '10am', value: 30 },
  { time: '11am', value: 45 },
  { time: '12pm', value: 35 },
  { time: '1pm', value: 60 },
  { time: '2pm', value: 50 },
  { time: '3pm', value: 75 },
];

interface DashboardStats {
  projects: { total: number; active: number };
  tasks: { total: number; today: number };
  appraisals: { total: number; ready: number };
  customers: { total: number };
  leads: { total: number };
  services: { pillars: number };
  employees: { active: number };
  revenue: { actual: number; pipeline: number };
}

function formatRevenue(amount: number): string {
  if (amount >= 1000000) return `₹${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}K`;
  return `₹${amount}`;
}

export default function DashboardOverview() {
  const [mounted, setMounted] = useState(false);
  const { user, tasks, updateTaskProgress, notes, toggleNote } = useAppStore();
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    setMounted(true);
    fetch('/api/dashboard/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error('Failed to load dashboard stats:', err));
  }, []);

  const QUICK_DASHBOARDS = [
    { name: 'Analytics & Revenue', href: '/dashboard/analytics', count: stats ? formatRevenue(stats.revenue.actual) : '—', badge: 'Live', icon: LineChart, color: 'text-amber-400' },
    { name: 'Leads Pipeline', href: '/dashboard/leads', count: stats ? `${stats.leads.total} Leads` : '—', badge: 'CRM', icon: UserPlus, color: 'text-emerald-400' },
    { name: 'Projects Control', href: '/dashboard/projects', count: stats ? `${stats.projects.total} Projects` : '—', badge: `${stats?.projects.active || 0} Active`, icon: FolderKanban, color: 'text-blue-400' },
    { name: 'Tasks Board', href: '/dashboard/tasks', count: stats ? `${stats.tasks.total} Tasks` : '—', badge: `${stats?.tasks.today || 0} Open`, icon: CheckSquare, color: 'text-purple-400' },
    { name: 'Appraisals', href: '/dashboard/appraisals', count: stats ? `${stats.appraisals.total} Total` : '—', badge: `${stats?.appraisals.ready || 0} Pending`, icon: FileCheck, color: 'text-yellow-400' },
    { name: 'Customers', href: '/dashboard/customers', count: stats ? `${stats.customers.total} Clients` : '—', badge: 'All Segments', icon: Building2, color: 'text-cyan-400' },
    { name: 'Services Demand', href: '/dashboard/services', count: stats ? `${stats.services.pillars} Pillars` : '—', badge: 'Live', icon: Briefcase, color: 'text-rose-400' },
    { name: 'Digital Identity', href: '/dashboard/identity', count: stats ? `${stats.employees.active} Active` : '—', badge: 'Encrypted', icon: ShieldCheck, color: 'text-amber-300' },
  ];

  return (
    <div className="relative min-h-full pb-10">
      
      {/* Background Ambience (Replacing blue with Gold/Champagne) */}
      <div className="fixed top-[-10%] right-[-5%] w-[800px] h-[800px] bg-[#F59E0B]/10 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-6 pt-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">
            Welcome back, <span className="text-[#D4AF37]">{user?.name || 'Commander'}</span>
          </h1>
          <p className="text-[#A8A8A8] text-sm">
            {user?.role === 'ADMIN' ? "Here is your Command Center overview for today." : "Your customized B2B workspace is ready."}
            {user?.company && user.company !== 'N/A' && ` Associated with: ${user.company}`}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#0A0A0A]/80 backdrop-blur-md border border-[rgba(255,255,255,0.08)] p-1 rounded-full overflow-x-auto custom-scrollbar">
            {['To do', 'Work', 'High priority'].map((filter, i) => (
              <button 
                key={filter}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${i === 0 ? 'bg-white/10 text-white' : 'text-[#A8A8A8] hover:text-white hover:bg-white/5'}`}
              >
                {filter}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F59E0B] text-black font-bold text-sm shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:scale-105 transition-all shrink-0">
            <Plus size={16} />
            <span>New task</span>
          </button>
        </div>
      </div>

      {/* Quick Dashboards Grid */}
      <div className="relative z-10 mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Command Center Dashboards & Workspaces</span>
          <span className="text-xs text-[#D4AF37]">All Available Dashboards</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3.5">
          {QUICK_DASHBOARDS.map((dash) => {
            const Icon = dash.icon;
            return (
              <Link 
                key={dash.name} 
                href={dash.href}
                className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#D4AF37]/40 hover:bg-white/[0.05] transition-all duration-300 group relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-xl bg-black/40 border border-white/5 ${dash.color} group-hover:scale-110 transition-transform`}>
                    <Icon size={18} />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5 text-neutral-400 group-hover:text-white group-hover:bg-[#D4AF37]/20 transition-colors">
                    {dash.badge}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-[#D4AF37] transition-colors">{dash.name}</h4>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-neutral-500">{dash.count}</p>
                  <ArrowRight size={13} className="text-neutral-600 group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        
        {/* Task List Widget (Large Left) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 flex flex-col gap-6"
        >
          <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/5 rounded-3xl p-6 sm:p-8 h-full shadow-xl">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-white">Today's meetings</h2>
              <button className="text-[#A8A8A8] hover:text-white"><MoreHorizontal size={20} /></button>
            </div>

            <div className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="bg-[#050505]/50 border border-[rgba(255,255,255,0.05)] rounded-2xl p-5 hover:bg-[#0A0A0A] transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#F59E0B] transition-colors">{task.title}</h3>
                      <p className="text-xs text-[#A8A8A8]">{task.time}</p>
                    </div>
                    <div className="flex -space-x-2">
                      {Array.from({ length: Math.min(task.participants, 3) }).map((_, i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-neutral-800 border-2 border-[#0A0A0A] flex items-center justify-center overflow-hidden">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${task.id}${i}&backgroundColor=b6e3f4`} alt="Avatar" />
                        </div>
                      ))}
                      {task.participants > 3 && (
                        <div className="w-8 h-8 rounded-full bg-[#121212] border-2 border-[#0A0A0A] flex items-center justify-center text-[10px] font-bold text-white">
                          +{task.participants - 3}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-6" onClick={(e) => { e.stopPropagation(); updateTaskProgress(task.id, task.progress >= 100 ? 0 : task.progress + 25); }}>
                    <div className="flex justify-between text-xs font-semibold mb-2">
                      <span className="text-white">Progress (Click to update)</span>
                      <span className="text-[#F59E0B]">{task.progress}%</span>
                    </div>
                    <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${task.progress}%` }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="h-full bg-[#F59E0B] rounded-full"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column: Notes & Files */}
        <div className="flex flex-col gap-6">
          
          {/* Today Note Widget */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#D4AF37]/10 backdrop-blur-2xl border border-[#D4AF37]/20 rounded-3xl p-6 relative overflow-hidden group shadow-[0_0_30px_rgba(212,175,55,0.05)]"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F59E0B]/20 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            
            <div className="flex justify-between items-start mb-6 relative z-10">
              <h2 className="text-lg font-bold text-white">Today note</h2>
              <button className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-[#F59E0B] hover:text-black transition-colors">
                <Edit2 size={14} />
              </button>
            </div>

            <div className="space-y-3 relative z-10">
              {notes.map(note => (
                <div key={note.id} className="flex items-start gap-3 cursor-pointer" onClick={() => toggleNote(note.id)}>
                  {note.completed ? (
                    <CheckCircle2 size={18} className="text-[#F59E0B] mt-0.5 shrink-0" />
                  ) : (
                    <Circle size={18} className="text-white/40 mt-0.5 shrink-0" />
                  )}
                  <span className={`text-sm transition-all ${note.completed ? 'text-white line-through opacity-70' : 'text-white'}`}>
                    {note.text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Performance & Earnings Widget */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/[0.03] backdrop-blur-2xl border border-white/5 rounded-3xl p-6 flex-1 flex flex-col shadow-xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-white">Performance</h2>
              <span className="px-3 py-1 bg-[#F59E0B]/20 text-[#F59E0B] rounded-full text-xs font-bold tracking-widest uppercase">Live</span>
            </div>

            <div className="space-y-6">
              {/* Revenue */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-[#A8A8A8] uppercase tracking-wider">Total Revenue</span>
                  <span className="text-white">{stats ? formatRevenue(stats.revenue.actual) : '—'}</span>
                </div>
                <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" style={{ width: stats && stats.revenue.pipeline > 0 ? `${Math.min((stats.revenue.actual / (stats.revenue.actual + stats.revenue.pipeline)) * 100, 100)}%` : '0%' }} />
                </div>
                <p className="text-[10px] text-[#A8A8A8] mt-2">Pipeline: {stats ? formatRevenue(stats.revenue.pipeline) : '—'}</p>
              </div>

              {/* Active Stats */}
              <div>
                <p className="text-[10px] font-bold text-neutral-500 tracking-[0.2em] uppercase mb-3">Active Metrics</p>
                <div className="flex gap-2">
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-black/50 border border-[#F59E0B]/30 rounded-lg text-xs font-semibold text-[#F59E0B]">
                    <span>📊</span> {stats?.projects.active || 0} Projects
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-black/50 border border-purple-500/30 rounded-lg text-xs font-semibold text-purple-400">
                    <span>✅</span> {stats?.tasks.today || 0} Open Tasks
                  </div>
                </div>
              </div>

              {/* Earnings */}
              <div className="pt-4 border-t border-white/5">
                <p className="text-[10px] font-bold text-neutral-500 tracking-[0.2em] uppercase mb-1">Total Revenue (All Time)</p>
                <p className="text-2xl font-black text-white tracking-tight">{stats ? formatRevenue(stats.revenue.actual) : '—'}</p>
                <div className="flex justify-between mt-2 text-xs text-[#A8A8A8]">
                  <span>Completed: {stats ? formatRevenue(stats.revenue.actual) : '—'}</span>
                  <span>Pipeline: {stats ? formatRevenue(stats.revenue.pipeline) : '—'}</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Activity Chart Widget (Bottom Full Width) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-3 bg-white/[0.03] backdrop-blur-2xl border border-white/5 rounded-3xl p-6 sm:p-8 h-[300px] flex flex-col shadow-xl"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Activity Tracking</h2>
              <p className="text-xs text-[#A8A8A8]">System resource and workflow performance</p>
            </div>
            <select className="bg-[#121212] border border-[rgba(255,255,255,0.08)] text-xs text-[#A8A8A8] rounded-md px-3 py-1.5 outline-none font-medium">
              <option>Today</option>
              <option>This Week</option>
            </select>
          </div>

          <div className="flex-1 w-full relative">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="activityGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="#A8A8A8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#A8A8A8" fontSize={12} tickLine={false} axisLine={false} hide />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#050505', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    itemStyle={{ color: '#F59E0B', fontWeight: 'bold' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#F59E0B" 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#activityGlow)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>
        
      </div>
    </div>
  );
}
