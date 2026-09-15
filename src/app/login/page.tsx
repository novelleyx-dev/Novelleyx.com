"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { CheckCircle2, ArrowRight, ShieldCheck, UserCheck, Sparkles, KeyRound, AlertCircle } from "lucide-react";

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
];

const PRESET_ACCOUNTS = [
  {
    roleName: "Founder / Admin",
    email: "admin@novelleyx.demo",
    password: "NOVELLEYX2026",
    badge: "Full Command Access",
    icon: ShieldCheck,
  },
  {
    roleName: "Enterprise Client",
    email: "client@test.com",
    password: "password123",
    badge: "Client Workspace",
    icon: UserCheck,
  }
];

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#020202] text-white flex items-center justify-center">Loading Secure Portal...</div>}>
      <LoginContent />
    </Suspense>
  );
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    
    const success = await login(email, password);
    if (success) {
      const callback = searchParams.get('callbackUrl');
      if (callback && callback.startsWith('/dashboard')) {
        window.location.href = callback;
      } else {
        window.location.href = "/dashboard";
      }
    } else {
      setLoading(false);
      setErrorMessage("Invalid credentials. Try our quick 1-click demo login below or register a new account.");
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white flex flex-col md:flex-row overflow-hidden relative">
      
      {/* Background Graphic Lines (Techy) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30">
        <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,0 L100,100 M100,0 L0,100 M50,0 L50,100 M0,50 L100,50" stroke="rgba(212,175,55,0.1)" strokeWidth="0.2" fill="none" />
          <circle cx="50" cy="50" r="30" stroke="rgba(212,175,55,0.1)" strokeWidth="0.2" fill="none" strokeDasharray="2 2" />
          <circle cx="50" cy="50" r="20" stroke="rgba(255,255,255,0.05)" strokeWidth="0.2" fill="none" />
        </svg>
      </div>

      {/* LEFT: Branding & Dynamic Image (Hidden on small screens) */}
      <div className="hidden lg:flex w-1/2 relative bg-[#050505] flex-col justify-between border-r border-[#111111] z-10">
        {/* Dynamic Image Grid */}
        <div className="absolute inset-0 z-0 grid grid-cols-2 grid-rows-2 gap-1 p-2 opacity-40">
          {GALLERY_IMAGES.slice(0,4).map((src, i) => (
            <div key={i} className="relative overflow-hidden rounded-lg group h-full">
              <div className="absolute inset-0 bg-[#D4AF37]/20 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-700" />
              <img src={src} alt="Novelleyx Work" className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105" />
            </div>
          ))}
        </div>

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020202] to-transparent z-10" />
        
        {/* Top Logo */}
        <div className="relative z-20 p-12">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#F59E0B] flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.3)] group-hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all">
              <span className="font-black text-black text-xl tracking-tighter">N</span>
            </div>
            <span className="font-bold text-2xl tracking-widest uppercase">Novelleyx</span>
          </Link>
        </div>

        {/* Bottom Copy */}
        <div className="relative z-20 p-12">
          <h2 className="text-4xl font-black mb-4 leading-tight">
            Architecting <span className="text-[#D4AF37]">Tomorrow.</span><br />
            Operating <span className="text-white">Today.</span>
          </h2>
          <p className="text-[#A8A8A8] max-w-md text-lg">
            Access your secure command center to monitor projects, track KPIs, and connect with your dedicated AI operations team.
          </p>
          <div className="mt-8 flex items-center gap-6 text-sm font-bold text-gray-500 uppercase tracking-widest">
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#D4AF37]" /> Encrypted</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#D4AF37]" /> Verified</span>
          </div>
        </div>
      </div>

      {/* RIGHT: Login Form Area */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-16 relative z-10 bg-[#020202]/80 backdrop-blur-md">
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md relative"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#F59E0B] flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.3)]">
              <span className="font-black text-black text-xl tracking-tighter">N</span>
            </div>
            <span className="font-bold text-2xl tracking-widest uppercase">Novelleyx</span>
          </div>

          <div className="text-center mb-10">
            <h1 className="text-3xl font-black mb-2 tracking-tight">Secure Portal</h1>
            <p className="text-[#A8A8A8]">Enter your credentials to access the command center.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 relative z-20">
            {errorMessage && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm flex items-start gap-3">
                <AlertCircle className="shrink-0 mt-0.5" size={16} />
                <p>{errorMessage}</p>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-[#222] text-white px-5 py-4 rounded-xl focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/50 transition-all font-medium placeholder:text-gray-700"
                placeholder="commander@novelleyx.com"
              />
            </div>

            <div>
              <div className="flex justify-between items-end mb-2 ml-1 mr-1">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Password</label>
                <Link href="#" className="text-xs text-[#D4AF37] hover:text-white transition-colors">Forgot?</Link>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-[#222] text-white px-5 py-4 rounded-xl focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/50 transition-all font-medium placeholder:text-gray-700"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black font-extrabold px-6 py-4 rounded-xl hover:bg-[#D4AF37] hover:text-black transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed mt-4 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]"
            >
              {loading ? "AUTHENTICATING..." : "INITIATE SEQUENCE"}
              {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          {/* Quick Demo Logins */}
          <div className="mt-12 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#222]"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
              <span className="bg-[#020202] px-4 text-gray-600">Quick Access (Demo)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
            {PRESET_ACCOUNTS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setEmail(preset.email);
                  setPassword(preset.password);
                }}
                className="bg-[#0A0A0A] border border-[#222] hover:border-[#D4AF37]/50 p-4 rounded-xl text-left transition-all group flex flex-col justify-between"
              >
                <div className="flex justify-between items-start mb-3">
                  <preset.icon size={20} className="text-[#A8A8A8] group-hover:text-[#D4AF37] transition-colors" />
                  <span className="text-[9px] font-bold uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded text-gray-400 group-hover:text-white transition-colors">{preset.badge}</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-0.5">{preset.roleName}</h3>
                  <p className="text-xs text-gray-600">{preset.email}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#A8A8A8]">
              Don't have an account?{' '}
              <Link href="/register" className="text-white hover:text-[#D4AF37] transition-colors font-bold">
                Create Account
              </Link>
            </p>
          </div>
        </motion.div>
        
      </div>
    </div>
  );
}
