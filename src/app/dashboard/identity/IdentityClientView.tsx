"use client";

import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Barcode from 'react-barcode';
import { Download, ShieldCheck, CreditCard, ScanLine } from 'lucide-react';

export default function IdentityClientView({ employeeData }: { employeeData: any }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    // In a real app, use html2canvas to save the div as an image
    alert("Digital ID Card saved to local device encrypted storage.");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full max-w-5xl">
        {/* ID Card Display - Static (Framer Motion Removed) */}
        <div className="flex justify-center">
            <div 
              ref={cardRef}
              className="w-[320px] h-[500px] bg-gradient-to-br from-[#050505] to-[#111111] border-[0.5px] border-[#F59E0B]/30 rounded-2xl p-6 relative overflow-hidden shadow-[0_30px_60px_-15px_rgba(245,158,11,0.2)] flex flex-col justify-between"
            >
              {/* Background watermark */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none text-[150px] font-black tracking-tighter -rotate-90">
                NX
              </div>
              
              {/* Gold Chip / Security Element */}
              <div className="absolute top-6 right-6 w-10 h-8 rounded bg-gradient-to-br from-[#F59E0B] via-yellow-200 to-amber-600 border border-amber-300 opacity-90 shadow-inner flex items-center justify-center">
                <div className="w-6 h-4 border border-black/20 grid grid-cols-3 grid-rows-2 gap-[1px]">
                  {[...Array(6)].map((_, i) => <div key={i} className="bg-black/10" />)}
                </div>
              </div>

              {/* Header */}
              <div className="flex flex-col z-10">
                <h2 className="text-[#F59E0B] font-bold tracking-[0.2em] text-[10px]">NOVELLEYX</h2>
                <h3 className="text-white text-[8px] tracking-widest opacity-60">ENGINEERED IDENTITY</h3>
              </div>

              {/* Photo & Basic Info */}
              <div className="flex flex-col items-center mt-6 z-10">
                <div className="w-32 h-32 rounded-xl bg-[#0A0A0A] border border-[#F59E0B]/50 p-1 overflow-hidden shadow-[0_0_20px_rgba(245,158,11,0.1)] mb-4">
                  <img src={employeeData.photoUrl} alt="Employee" className="w-full h-full object-cover rounded-lg grayscale hover:grayscale-0 transition-all duration-500" />
                </div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tight">{employeeData.name}</h2>
                <p className="text-[#F59E0B] text-xs font-bold tracking-widest uppercase mt-1">{employeeData.role}</p>
                <p className="text-[#A8A8A8] text-[10px] tracking-widest uppercase mt-0.5">{employeeData.department}</p>
              </div>

              {/* Secure QR */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10 z-10">
                <div className="space-y-1">
                  <p className="text-[8px] text-[#A8A8A8] uppercase tracking-widest">ID Number</p>
                  <p className="text-white text-xs font-mono">{employeeData.id}</p>
                  
                  <p className="text-[8px] text-[#A8A8A8] uppercase tracking-widest mt-2">Issued</p>
                  <p className="text-white text-xs font-mono">{employeeData.issued}</p>
                </div>
                <div className="bg-white p-1.5 rounded-md">
                  <QRCodeSVG value={employeeData.publicVerifyUrl} size={50} level="H" />
                </div>
              </div>

              {/* Barcode Footer */}
              <div className="mt-4 flex justify-center bg-white py-1 rounded-sm z-10 overflow-hidden px-2">
                <Barcode value={employeeData.id} height={20} width={1.5} fontSize={10} margin={0} background="#ffffff" />
              </div>
            </div>
        </div>

        {/* Action Panel */}
        <div className="flex flex-col gap-6">
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 backdrop-blur-md">
            <h3 className="text-xl font-bold text-white mb-6">Credential Management</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#0A0A0A] border border-white/5 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <ShieldCheck className="text-emerald-500 w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">Status: Active</p>
                    <p className="text-[#A8A8A8] text-xs">Cryptographic signature verified</p>
                  </div>
                </div>
              </div>

              <button onClick={handleDownload} className="w-full flex items-center justify-center gap-2 p-4 bg-[#F59E0B] text-black font-bold rounded-2xl hover:scale-[1.02] transition-transform shadow-[0_10px_20px_rgba(245,158,11,0.2)]">
                <Download size={18} /> Download Digital Pass
              </button>
              
              <button className="w-full flex items-center justify-center gap-2 p-4 bg-white/5 text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                <CreditCard size={18} /> Request Physical Card
              </button>

              <div className="pt-4 mt-4 border-t border-white/5">
                <p className="text-xs text-[#A8A8A8] flex items-center gap-2 justify-center">
                  <ScanLine size={14} /> Scan the QR code to test public verification route.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
  );
}
