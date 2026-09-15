import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { contactInfo } from '@/data/navigation';
import { Button } from '@/components/ui/Button';

export default function ContactPage() {
  return (
    <main className="bg-[#050505] min-h-screen text-white relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#F59E0B]/5 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/[0.02] blur-[100px] rounded-full pointer-events-none z-0" />

      <section className="px-6 md:px-12 lg:px-24 pt-32 pb-24 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          <div className="mb-16">
            <p className="text-[#F59E0B] font-semibold tracking-[0.2em] uppercase mb-4">INITIATE CONNECTION</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Let's build something exceptional.</h1>
            <p className="text-xl text-[#A8A8A8] max-w-2xl">
              Whether you need to overhaul your enterprise architecture or build a scalable AI solution, our specialists are ready to architect your future.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Information */}
            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Direct Channels</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-[#F59E0B]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 uppercase tracking-wider mb-1 font-bold">Email</p>
                      <a href={`mailto:${contactInfo.email}`} className="text-lg text-white hover:text-[#F59E0B] transition-colors">{contactInfo.email}</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-[#F59E0B]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 uppercase tracking-wider mb-1 font-bold">Phone Network</p>
                      <div className="flex flex-col gap-1">
                        {contactInfo.phones.map(phone => (
                          <a key={phone} href={`tel:${phone.replace(/\s+/g, '')}`} className="text-lg text-white hover:text-[#F59E0B] transition-colors">{phone}</a>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-[#F59E0B]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 uppercase tracking-wider mb-1 font-bold">Headquarters</p>
                      <p className="text-lg text-white">Hyderabad, India</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Social Network</h3>
                <div className="flex gap-4">
                  <a href={contactInfo.instagramUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-[#F59E0B]/10 hover:border-[#F59E0B]/30 hover:text-[#F59E0B] transition-all font-semibold">
                    Instagram
                  </a>
                  <a href={contactInfo.youtubeUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-[#F59E0B]/10 hover:border-[#F59E0B]/30 hover:text-[#F59E0B] transition-all font-semibold">
                    YouTube
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form Wrapper (Redirect to Appraisal) */}
            <div className="bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-white mb-4">Project Appraisal</h3>
              <p className="text-[#A8A8A8] mb-8 leading-relaxed">
                For detailed project inquiries, we require a formal architecture scoping. Use our AI-assisted appraisal system to define your exact requirements.
              </p>
              
              <a href="/appraisal" className="block">
                <Button className="w-full py-4 text-sm font-bold tracking-wide flex items-center justify-center gap-2">
                  START APPRAISAL <ArrowRight className="w-4 h-4" />
                </Button>
              </a>

              <div className="mt-8 pt-8 border-t border-white/5">
                <p className="text-sm text-gray-500 text-center">
                  Or reach out directly for general business queries via the contact channels provided.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
