'use client';

import React, { useState } from 'react';
import { ScanLine, Search, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function IdentityScannerPage() {
  const [scanInput, setScanInput] = useState('');
  const router = useRouter();

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scanInput.trim()) return;

    // Simulate scanning a barcode/QR code that contains the credentialPublicId
    // and navigating to the verification page
    router.push(`/verify/${scanInput.trim()}`);
  };

  return (
    <div className="text-white">
      <div className="w-full space-y-8">
        <h1 className="text-4xl font-bold">Identity <span className="text-[#D4AF37]">Scanner</span></h1>
        <p className="text-gray-400 mt-2 text-lg">Scan an employee ID card barcode or QR code to verify credential.</p>
        
        <div className="bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-lg p-12 max-w-2xl mx-auto mt-12">
          <div className="flex flex-col items-center text-center space-y-6">
            
            <div className="w-24 h-24 rounded-full bg-[#111111] border border-[#D4AF37]/50 flex items-center justify-center relative overflow-hidden">
              <ScanLine className="w-10 h-10 text-[#D4AF37]" />
              <div className="absolute w-full h-1 bg-red-500/50 blur-[2px] top-0 animate-[scan_2s_ease-in-out_infinite]" />
            </div>

            <div>
              <h2 className="text-2xl font-bold">Ready to Scan</h2>
              <p className="text-gray-400 mt-2">Aim barcode scanner or enter credential ID manually.</p>
            </div>

            <form onSubmit={handleScan} className="w-full relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input 
                type="text" 
                autoFocus
                placeholder="Awaiting scan input..."
                className="w-full bg-black border-2 border-gray-800 rounded-lg py-4 pl-12 pr-4 text-white text-lg font-mono focus:outline-none focus:border-[#D4AF37] transition-colors"
                value={scanInput}
                onChange={(e) => setScanInput(e.target.value)}
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#D4AF37] text-black px-4 py-2 rounded font-bold hover:bg-[#E8C547]"
              >
                Verify
              </button>
            </form>

            <style dangerouslySetInnerHTML={{__html: `
              @keyframes scan {
                0% { top: -5%; }
                50% { top: 105%; }
                100% { top: -5%; }
              }
            `}} />
            
          </div>
        </div>

      </div>
    </div>
  );
}
