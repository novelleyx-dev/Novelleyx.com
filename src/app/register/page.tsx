"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "", password: "", confirmPassword: "",
    name: "", phone: "",
    company: "", industry: "", role: "",
    accountType: "B2B"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (res.ok) {
        // Automatically route them to the login or dashboard upon successful DB entry
        router.push("/login?registered=true");
      } else {
        setError(data.error || "Failed to register in DB");
        setLoading(false);
      }
    } catch (err) {
      setError("Server connection failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white flex flex-col md:flex-row overflow-hidden relative">
      
      {/* Background Graphic Lines (Techy) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30">
        <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 20 L20 40 L50 30 L80 60 L100 40" fill="none" stroke="#D4AF37" strokeWidth="0.1" className="opacity-50" />
          <path d="M0 80 L30 50 L60 70 L90 30 L100 50" fill="none" stroke="#D4AF37" strokeWidth="0.1" className="opacity-30" />
        </svg>
      </div>
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-[#D4AF37]/10 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* Header Mobile / Absolute */}
      <header className="absolute top-0 w-full p-6 md:p-8 flex justify-between items-center z-50">
        <Link href="/" className="flex items-center group">
          <span className="text-xl md:text-2xl font-bold tracking-wider text-white">NOVELLEYX</span>
          <span className="ml-1 w-2 h-2 rounded-full bg-[#D4AF37]"></span>
        </Link>
        <Link href="/" className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold hover:bg-white/10 transition-colors">
          Back to Home
        </Link>
      </header>

      {/* LEFT COLUMN: Gallery & Info */}
      <div className="w-full md:w-1/2 lg:w-5/12 hidden md:flex flex-col relative z-10 border-r border-white/5 bg-[#050505]/80 backdrop-blur-md pt-32 pb-12 px-12 h-screen">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4 tracking-tight">Enterprise Standard. <br/><span className="text-[#D4AF37]">Human Approach.</span></h2>
          <p className="text-[#A8A8A8] leading-relaxed">
            NOVELLEYX integrates with visionaries across media, IT, AI, and education. See how our network drives real-world impact.
          </p>
        </div>

        {/* Vertical Auto-scrolling Gallery */}
        <div className="relative flex-1 overflow-hidden rounded-2xl border border-white/10 bg-black/50 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
          <motion.div 
            className="flex flex-col gap-4 absolute w-full"
            animate={{ y: ["0%", "-50%"] }}
            transition={{ duration: 25, ease: "linear", repeat: Infinity }}
          >
            {[
              "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
              "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
              "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
              "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
              "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
              "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
              "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
              "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
              "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
              "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
            ].map((src, i) => (
              <div key={i} className="relative h-48 w-full rounded-xl overflow-hidden group">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                <img src={src} alt="Novelleyx Deals" className="object-cover w-full h-full grayscale-[50%] group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* RIGHT COLUMN: Wizard */}
      <div className="w-full md:w-1/2 lg:w-7/12 flex flex-col justify-center items-center p-6 md:p-12 relative z-10 min-h-screen pt-32 md:pt-0">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg"
        >
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-3">Join Network</h1>
            <p className="text-[#A8A8A8]">Register for B2B portal access.</p>
          </div>

          <div className="mb-6 px-2">
            <div className="flex justify-between items-center mb-3">
              {['Account', 'Profile', 'Business', 'Review'].map((label, idx) => (
                <span key={label} className={`text-[10px] font-bold uppercase tracking-wider ${step > idx ? 'text-[#D4AF37]' : 'text-gray-600'}`}>
                  {label}
                </span>
              ))}
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB]"
                initial={{ width: '25%' }}
                animate={{ width: `${(step / 4) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <div className="bg-[#0A0A0A]/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            <AnimatePresence mode="wait">
              
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-xl font-bold text-white mb-6">Account Details</h2>
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold tracking-widest text-gray-500 uppercase">Email Address</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/50 transition-all placeholder-neutral-700" placeholder="admin@example.com" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold tracking-widest text-gray-500 uppercase">Password</label>
                      <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/50 transition-all placeholder-neutral-700" placeholder="••••••••" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold tracking-widest text-gray-500 uppercase">Confirm Password</label>
                      <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/50 transition-all placeholder-neutral-700" placeholder="••••••••" />
                    </div>
                  </div>
                  <button onClick={handleNext} disabled={!formData.email || !formData.password || !formData.confirmPassword} className="w-full mt-8 bg-white text-black font-extrabold py-4 rounded-xl hover:bg-[#D4AF37] transition-all disabled:opacity-50 flex justify-center items-center gap-2">
                    Next Step <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-xl font-bold text-white mb-6">Personal Profile</h2>
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold tracking-widest text-gray-500 uppercase">Full Name</label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/50 transition-all placeholder-neutral-700" placeholder="John Doe" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold tracking-widest text-gray-500 uppercase">Phone Number</label>
                      <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/50 transition-all placeholder-neutral-700" placeholder="+1 (555) 000-0000" />
                    </div>
                  </div>
                  <div className="flex gap-4 mt-8">
                    <button onClick={handleBack} className="w-1/3 bg-transparent border border-white/10 text-white font-bold py-4 rounded-xl hover:bg-white/5 transition-all flex justify-center items-center">
                      <ChevronLeft className="w-4 h-4 mr-1" /> Back
                    </button>
                    <button onClick={handleNext} disabled={!formData.name} className="w-2/3 bg-white text-black font-extrabold py-4 rounded-xl hover:bg-[#D4AF37] transition-all disabled:opacity-50 flex justify-center items-center">
                      Next Step <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-xl font-bold text-white mb-4">Professional Data</h2>
                  
                  <div className="flex bg-black/40 border border-white/10 rounded-xl p-1 mb-6">
                    <button 
                      onClick={() => setFormData({...formData, accountType: 'B2B'})} 
                      className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${formData.accountType === 'B2B' ? 'bg-[#D4AF37] text-black shadow-md' : 'text-gray-400 hover:text-white'}`}
                    >
                      B2B (Business)
                    </button>
                    <button 
                      onClick={() => setFormData({...formData, accountType: 'B2C'})} 
                      className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${formData.accountType === 'B2C' ? 'bg-[#D4AF37] text-black shadow-md' : 'text-gray-400 hover:text-white'}`}
                    >
                      B2C (Individual)
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold tracking-widest text-gray-500 uppercase">
                        {formData.accountType === 'B2B' ? 'Company / Organization' : 'Institution / Optional Org'}
                      </label>
                      <input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/50 transition-all placeholder-neutral-700" placeholder={formData.accountType === 'B2B' ? "Acme Corp" : "University / None"} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold tracking-widest text-gray-500 uppercase">
                        {formData.accountType === 'B2B' ? 'Industry' : 'Field of Interest'}
                      </label>
                      <input type="text" name="industry" value={formData.industry} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/50 transition-all placeholder-neutral-700" placeholder={formData.accountType === 'B2B' ? "Technology, Finance, etc." : "IT, Media, AI, etc."} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold tracking-widest text-gray-500 uppercase">
                        {formData.accountType === 'B2B' ? 'Your Role' : 'Your Status / Profession'}
                      </label>
                      <input type="text" name="role" value={formData.role} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/50 transition-all placeholder-neutral-700" placeholder={formData.accountType === 'B2B' ? "CEO, Manager, Engineer" : "Student, Creator, Freelancer"} />
                    </div>
                  </div>
                  <div className="flex gap-4 mt-8">
                    <button onClick={handleBack} className="w-1/3 bg-transparent border border-white/10 text-white font-bold py-4 rounded-xl hover:bg-white/5 transition-all flex justify-center items-center">
                      <ChevronLeft className="w-4 h-4 mr-1" /> Back
                    </button>
                    <button onClick={handleNext} disabled={formData.accountType === 'B2B' && !formData.company} className="w-2/3 bg-white text-black font-extrabold py-4 rounded-xl hover:bg-[#D4AF37] transition-all disabled:opacity-50 flex justify-center items-center">
                      Final Review <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2 className="text-xl font-bold text-white mb-6">Review & Submit</h2>
                  
                  <div className="bg-black/40 border border-white/5 rounded-xl p-5 space-y-3 mb-8 text-sm">
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-gray-500">Account Type</span>
                      <span className="text-[#D4AF37] font-bold">{formData.accountType === 'B2B' ? 'Business' : 'Individual'}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-gray-500">Name</span>
                      <span className="text-white font-medium">{formData.name}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-gray-500">Email</span>
                      <span className="text-white font-medium">{formData.email}</span>
                    </div>
                    {(formData.accountType === 'B2B' || formData.company) && (
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-gray-500">{formData.accountType === 'B2B' ? 'Company' : 'Institution'}</span>
                        <span className="text-white font-medium">{formData.company || 'N/A'}</span>
                      </div>
                    )}
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-gray-500">{formData.accountType === 'B2B' ? 'Industry' : 'Interest'}</span>
                      <span className="text-white font-medium">{formData.industry || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="text-gray-500">Storage</span>
                      <span className="text-amber-500 font-medium flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Excel DB Ready</span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button onClick={handleBack} disabled={loading} className="w-1/3 bg-transparent border border-white/10 text-white font-bold py-4 rounded-xl hover:bg-white/5 transition-all flex justify-center items-center">
                      <ChevronLeft className="w-4 h-4 mr-1" /> Back
                    </button>
                    <button onClick={handleSubmit} disabled={loading} className="w-2/3 bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-black font-extrabold py-4 rounded-xl hover:scale-[1.02] transition-transform flex justify-center items-center shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                      {loading ? 'STORING...' : 'REGISTER'}
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-[#A8A8A8]">
              Already connected?{' '}
              <Link href="/login" className="text-white hover:text-[#D4AF37] transition-colors font-bold">
                Sign In
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
