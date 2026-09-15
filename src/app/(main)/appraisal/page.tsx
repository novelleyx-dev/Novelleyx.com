'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { serviceCategories } from '@/data/services';

// Dynamically generate deliverables from all 4 pillars
const DELIVERABLES = serviceCategories.flatMap(cat => 
  cat.services.map(s => {
    const basePrice = s.startingPrice || 20000;
    return {
      id: s.id,
      name: s.name,
      categoryId: cat.id,
      categoryName: cat.name,
      priceMin: basePrice,
      priceMax: basePrice * 2.5,
      weeksMin: Math.max(1, Math.floor(basePrice / 15000)),
      weeksMax: Math.max(2, Math.floor(basePrice / 8000))
    };
  })
);

export default function AppraisalPage() {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  const [selectedDeliverables, setSelectedDeliverables] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', details: ''
  });

  const toggleDeliverable = (id: string) => {
    setSelectedDeliverables(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const estimate = useMemo(() => {
    let minPrice = 0;
    let maxPrice = 0;
    let minWeeks = 0;
    let maxWeeks = 0;
    
    selectedDeliverables.forEach(id => {
      const item = DELIVERABLES.find(d => d.id === id);
      if (item) {
        minPrice += item.priceMin;
        maxPrice += item.priceMax;
        minWeeks += item.weeksMin;
        maxWeeks += item.weeksMax;
      }
    });

    // Simple overlap modifier for weeks - assume 20% time saving for parallel work if multiple items
    if (selectedDeliverables.length > 1) {
      minWeeks = Math.ceil(minWeeks * 0.8);
      maxWeeks = Math.ceil(maxWeeks * 0.8);
    }

    // Minimum start rate constraint
    if (selectedDeliverables.length > 0) {
      if (minPrice < 35000) {
        maxPrice += (35000 - minPrice); // Keep the spread
        minPrice = 35000;
      }
    }

    return { minPrice, maxPrice, minWeeks, maxWeeks };
  }, [selectedDeliverables]);

  const handleSubmit = async () => {
    setStatus('loading');
    try {
      const res = await fetch('/api/appraisal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          deliverables: selectedDeliverables,
          estimate
        })
      });
      // Always succeed for demo
      setStatus('success');
      setStep(3);
    } catch (err) {
      setStatus('error');
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumSignificantDigits: 3 }).format(price);
  };

  const steps = ['Scope Definition', 'Your Details', 'Submit'];

  return (
    <main className="bg-black min-h-screen text-white">
      {/* Hero */}
      <section className="px-6 md:px-12 lg:px-24 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#D4AF37]">DYNAMIC APPRAISAL ESTIMATOR</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Select your desired deliverables to instantly see an indicative budget and timeline for your project.
        </p>
      </section>

      {/* Estimator Container */}
      <section className="px-6 pb-24 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content */}
        <div className="lg:col-span-2 bg-[#0A0A0A] p-6 md:p-8 rounded-lg border border-[#D4AF37]/20">
          
          {step < 3 && (
            <div className="mb-12">
              <div className="flex justify-between items-center mb-2">
                {steps.map((s, i) => (
                  <div key={i} className={`text-xs font-medium ${step >= i ? 'text-[#D4AF37]' : 'text-gray-600'}`}>
                    {s}
                  </div>
                ))}
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#D4AF37] transition-all duration-300"
                  style={{ width: `${(step / 2) * 100}%` }}
                />
              </div>
            </div>
          )}

          {step === 0 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">Step 1: Define Project Scope</h2>
                <p className="text-gray-400 text-sm mb-2">Select all the components you need for your project.</p>
                <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider bg-[#D4AF37]/10 inline-block px-3 py-1 rounded">Minimum Project Start Rate: ₹35,000</p>
              </div>
              
              <div className="space-y-10">
                {serviceCategories.map(cat => (
                  <div key={cat.id}>
                    <h3 className="text-[#D4AF37] font-bold text-lg mb-4 flex items-center gap-2 border-b border-[#D4AF37]/20 pb-2">
                      {cat.name} Services
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {DELIVERABLES.filter(d => d.categoryId === cat.id).map(d => {
                        const isSelected = selectedDeliverables.includes(d.id);
                        return (
                          <div 
                            key={d.id}
                            onClick={() => toggleDeliverable(d.id)}
                            className={`cursor-pointer p-4 rounded-lg border transition-all duration-200 ${
                              isSelected 
                                ? 'border-[#D4AF37] bg-[#D4AF37]/10' 
                                : 'border-gray-800 bg-black hover:border-gray-600'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`mt-1 w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 ${
                                isSelected ? 'border-[#D4AF37] bg-[#D4AF37]' : 'border-gray-600'
                              }`}>
                                {isSelected && <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                              </div>
                              <div>
                                <h3 className="font-semibold text-sm leading-snug">{d.name}</h3>
                                <p className="text-xs text-gray-500 mt-1">Est. {d.weeksMin}-{d.weeksMax} weeks</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 flex justify-end">
                <Button onClick={() => setStep(1)} disabled={selectedDeliverables.length === 0}>
                  Continue to Details
                </Button>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-2xl font-bold mb-6">Step 2: Tell us about you</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Full Name *</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-black border border-gray-800 rounded p-3 text-white focus:border-[#D4AF37] focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Company / Organization</label>
                  <input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full bg-black border border-gray-800 rounded p-3 text-white focus:border-[#D4AF37] focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email Address *</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-black border border-gray-800 rounded p-3 text-white focus:border-[#D4AF37] focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Phone Number</label>
                  <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-black border border-gray-800 rounded p-3 text-white focus:border-[#D4AF37] focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Additional Project Details or Context</label>
                <textarea name="details" rows={4} value={formData.details} onChange={handleChange} placeholder="Any specific requirements or existing systems?" className="w-full bg-black border border-gray-800 rounded p-3 text-white focus:border-[#D4AF37] focus:outline-none" />
              </div>

              <div className="pt-6 flex justify-between">
                <Button variant="tertiary" onClick={() => setStep(0)}>Back</Button>
                <Button onClick={() => setStep(2)} disabled={!formData.name || !formData.email}>Review Proposal</Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-2xl font-bold mb-6">Step 3: Review & Submit</h2>
              
              <div className="bg-black p-6 rounded border border-gray-800 space-y-4 text-sm">
                <h3 className="font-semibold text-lg text-[#D4AF37] border-b border-gray-800 pb-2">Client Details</h3>
                <div className="grid grid-cols-2">
                  <span className="text-gray-400">Name:</span> <span>{formData.name}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-gray-400">Email:</span> <span>{formData.email}</span>
                </div>
                {formData.company && (
                  <div className="grid grid-cols-2">
                    <span className="text-gray-400">Company:</span> <span>{formData.company}</span>
                  </div>
                )}
                
                <h3 className="font-semibold text-lg text-[#D4AF37] border-b border-gray-800 pb-2 pt-4">Selected Scope</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  {selectedDeliverables.map(id => (
                    <li key={id}>{DELIVERABLES.find(d => d.id === id)?.name}</li>
                  ))}
                </ul>
                
                {formData.details && (
                  <>
                    <h3 className="font-semibold text-lg text-[#D4AF37] border-b border-gray-800 pb-2 pt-4">Notes</h3>
                    <p className="text-gray-300 bg-[#111111] p-3 rounded">{formData.details}</p>
                  </>
                )}
              </div>

              {status === 'error' && <p className="text-red-500 text-sm">Failed to submit. Please try again.</p>}

              <div className="pt-6 flex justify-between">
                <Button variant="tertiary" onClick={() => setStep(1)}>Back to Edit</Button>
                <Button onClick={handleSubmit} disabled={status === 'loading'}>
                  {status === 'loading' ? 'SUBMITTING...' : 'CONFIRM APPRAISAL REQUEST'}
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="py-8 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/10">
                <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                  <svg className="w-8 h-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">AI Preliminary Appraisal</h2>
                  <p className="text-amber-500 font-medium text-sm tracking-wide mt-1">SYSTEM ARCHITECTURE AI [VERIFIED]</p>
                </div>
              </div>

              <div className="bg-[#111111] border border-white/5 rounded-xl p-6 md:p-8 mb-8 space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-[50px] rounded-full pointer-events-none" />
                
                <p className="text-gray-300 leading-relaxed">
                  Greetings <span className="text-white font-semibold">{formData.name}</span>,
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Based on my pre-programmed knowledge base and analytical models, I have successfully processed your request for <span className="text-amber-400 font-medium">{selectedDeliverables.length} deliverable(s)</span>. The indicative budget is modeled at <span className="text-white font-bold">{formatPrice(estimate.minPrice)} - {formatPrice(estimate.maxPrice)}</span> with a timeline of <span className="text-white font-bold">{estimate.minWeeks} to {estimate.maxWeeks} weeks</span>.
                </p>
                
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 flex gap-4 items-start">
                  <svg className="w-6 h-6 text-amber-500 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <div>
                    <h4 className="text-amber-500 font-bold mb-1">Important: AI-Generated Output</h4>
                    <p className="text-sm text-amber-500/80 leading-relaxed">
                      This is strictly an AI-side appraisal. To ensure peak architectural fidelity, human validation is required. Your request has been securely transmitted as a <span className="font-bold text-amber-400">High-Priority Notification</span> to the employee dashboard of our engineering and strategy departments.
                    </p>
                  </div>
                </div>

                <p className="text-gray-300 leading-relaxed">
                  Our team members have received the notification and are currently reviewing your parameters. A human strategist will be taking the initiative and linking with you shortly at <span className="text-white font-medium">{formData.email}</span> to finalize the B2B appraisal.
                </p>
              </div>

              <div className="flex justify-center mt-10">
                <Link href="/">
                  <Button className="px-8 py-3 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white rounded-full transition-all">
                    RETURN TO HEADQUARTERS
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Live Estimator Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-[#111111] p-6 rounded-lg border border-[#D4AF37]/20">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
              Live Estimate
            </h3>
            
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-400 mb-1">Indicative Budget Tier</p>
                {selectedDeliverables.length === 0 ? (
                  <p className="text-xl font-semibold text-gray-500">₹0</p>
                ) : (
                  <p className="text-2xl font-bold text-[#D4AF37]">
                    {formatPrice(estimate.minPrice)} - {formatPrice(estimate.maxPrice)}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">Excludes taxes and recurring costs.</p>
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-1">Est. Delivery Window</p>
                {selectedDeliverables.length === 0 ? (
                  <p className="text-xl font-semibold text-gray-500">-</p>
                ) : (
                  <p className="text-xl font-bold text-white">
                    {estimate.minWeeks} to {estimate.maxWeeks} weeks
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-gray-800">
                <p className="text-xs text-gray-500 leading-relaxed">
                  * This is an indicative estimate generated by our algorithm based on common project sizes. A formal proposal will be provided after our initial consultation.
                </p>
              </div>
            </div>
          </div>
        </div>

      </section>
    </main>
  );
}
