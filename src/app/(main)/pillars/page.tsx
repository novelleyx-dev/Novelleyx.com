"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { User, Phone, Instagram, ArrowUpRight } from 'lucide-react';
import { teamMembers } from '@/data/team';

export default function PillarsPage() {
  return (
    <main className="bg-[#050505] min-h-screen text-white relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#F59E0B]/5 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-white/[0.02] blur-[100px] rounded-full pointer-events-none z-0" />

      <section className="px-6 md:px-12 lg:px-24 pt-32 pb-24 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-20">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[#F59E0B] font-semibold tracking-[0.2em] uppercase mb-4"
            >
              THE ARCHITECTS
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
            >
              Meet All Pillars
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-[#A8A8A8] max-w-2xl mx-auto"
            >
              The driving forces behind NOVELLEYX's vision. A team of engineers, strategists, and designers dedicated to building exceptional infrastructure.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <div className="bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-[#F59E0B]/50 transition-all duration-500 h-full flex flex-col relative overflow-hidden">
                  
                  {/* Subtle Glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#F59E0B]/5 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-[#F59E0B]/50 group-hover:bg-[#F59E0B]/10 transition-colors">
                      <User className="w-8 h-8 text-[#A8A8A8] group-hover:text-[#F59E0B] transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-[#F59E0B] transition-colors">{member.fullName}</h3>
                      <p className="text-sm text-gray-400 mt-1">{member.role}</p>
                    </div>
                  </div>

                  {/* Expertise Tags */}
                  <div className="mb-6 flex flex-wrap gap-2">
                    {member.expertise.map((exp, i) => (
                      <span key={i} className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded bg-[#050505] border border-white/5 text-[#A8A8A8]">
                        {exp}
                      </span>
                    ))}
                  </div>

                  {/* About */}
                  <p className="text-sm text-gray-400 leading-relaxed mb-8 flex-grow">
                    {member.about}
                  </p>

                  {/* Contact Links */}
                  <div className="mt-auto pt-6 border-t border-white/5 flex gap-4">
                    <a 
                      href={`tel:${member.phone.replace(/\s+/g, '')}`} 
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors text-xs font-bold tracking-wider"
                    >
                      <Phone className="w-4 h-4" /> Phone
                    </a>
                    <a 
                      href={member.instagramUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-amber-500/10 to-amber-600/10 border border-amber-500/20 hover:border-amber-500/50 text-amber-500 transition-all text-xs font-bold tracking-wider group/link"
                    >
                      <Instagram className="w-4 h-4" /> Insta <ArrowUpRight className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}
