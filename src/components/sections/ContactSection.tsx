'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from '@/components/animations';
import Link from 'next/link';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          service: 'General Inquiry',
          company: 'N/A'
        })
      });

      if (!res.ok) {
        throw new Error('Failed to submit');
      }

      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 bg-[#050505] text-white overflow-hidden flex items-center justify-center">
      {/* Background Watermark & Glows */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h2 className="text-[15vw] font-black text-white/[0.02] tracking-tighter select-none">
          CONTACT
        </h2>
      </div>
      
      {/* Ambient Gold Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F59E0B]/5 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Circuit / Vector Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_80%)]" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Info */}
          <div className="space-y-8">
            <ScrollReveal>
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-widest text-[#F59E0B] mb-6">
                Contact
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 uppercase">
                Let's build something useful.
              </h2>
              <p className="text-[#A8A8A8] text-lg max-w-md leading-relaxed">
                Have an idea, problem, project or requirement? Tell NOVELLEYX what you're trying to achieve.
              </p>
            </ScrollReveal>

            <div className="space-y-4">
              <ScrollReveal delay={0.1}>
                {/* Contact Card 1 */}
                <a href="mailto:novelleyx@gmail.com" className="group block bg-neutral-900/50 hover:bg-neutral-900/80 border border-white/5 hover:border-white/10 rounded-2xl p-5 transition-all duration-300 relative overflow-hidden">
                  <ArrowUpRight className="absolute top-5 right-5 w-5 h-5 text-neutral-500 group-hover:text-white transition-colors" />
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-black/50 border border-white/5 flex items-center justify-center shrink-0 group-hover:border-[#F59E0B]/30 transition-colors">
                      <Mail className="w-5 h-5 text-[#F59E0B]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-neutral-400 mb-0.5">Email</h4>
                      <p className="text-lg font-medium text-white group-hover:text-[#F59E0B] transition-colors">novelleyx@gmail.com</p>
                    </div>
                  </div>
                </a>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                {/* Contact Card 2 */}
                <a href="tel:+917075853225" className="group block bg-neutral-900/50 hover:bg-neutral-900/80 border border-white/5 hover:border-white/10 rounded-2xl p-5 transition-all duration-300 relative overflow-hidden">
                  <ArrowUpRight className="absolute top-5 right-5 w-5 h-5 text-neutral-500 group-hover:text-white transition-colors" />
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-black/50 border border-white/5 flex items-center justify-center shrink-0 group-hover:border-[#F59E0B]/30 transition-colors">
                      <Phone className="w-5 h-5 text-[#F59E0B]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-neutral-400 mb-0.5">Call us</h4>
                      <p className="text-lg font-medium text-white group-hover:text-[#F59E0B] transition-colors">+91 70758 53225</p>
                    </div>
                  </div>
                </a>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <div className="flex gap-4 mt-8">
                  <Link href="/dashboard/ai" className="flex-1 text-center py-3 px-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors font-bold text-sm uppercase">
                    Start with AI
                  </Link>
                  <Link href="/appraisal" className="flex-1 text-center py-3 px-4 bg-[#F59E0B] text-black rounded-lg hover:bg-[#E8C547] transition-colors font-bold text-sm uppercase">
                    Request Appraisal
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Right Column: Form */}
          <ScrollReveal delay={0.4} direction="up">
            <div>
              <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent rounded-3xl pointer-events-none" />
                
                <form className="relative z-10 space-y-6" onSubmit={handleSubmit}>
                  {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm">
                      {error}
                    </div>
                  )}
                  {success && (
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-sm flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Message sent successfully! Our AI system has logged your inquiry.
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">Full Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#F59E0B]/50 focus:ring-1 focus:ring-[#F59E0B]/50 transition-all placeholder-neutral-600 shadow-inner"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">Email Address</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#F59E0B]/50 focus:ring-1 focus:ring-[#F59E0B]/50 transition-all placeholder-neutral-600 shadow-inner"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">Message</label>
                    <textarea
                      rows={4}
                      placeholder="How can we help you?"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#F59E0B]/50 focus:ring-1 focus:ring-[#F59E0B]/50 transition-all placeholder-neutral-600 shadow-inner resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-white text-black font-bold py-4 rounded-full hover:bg-neutral-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {loading ? 'Sending to Command Center...' : 'Send Message'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
