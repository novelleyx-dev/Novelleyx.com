'use client';

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Barcode from 'react-barcode';

import AntigravityCard from '@/components/ui/AntigravityCard';

interface IDCardProps {
  employee: {
    employeeId: string;
    fullName: string;
    designation: string;
    role: string;
    department: string;
    joiningDate: string | Date;
    profilePhoto?: string | null;
    signature?: string | null;
  };
  credentialPublicId: string;
}

export default function IDCard({ employee, credentialPublicId }: IDCardProps) {
  const verifyUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/verify/${credentialPublicId}`
    : `https://novelleyx.com/verify/${credentialPublicId}`;

  return (
    <div className="flex flex-col md:flex-row gap-12 items-center justify-center p-8 bg-transparent rounded-xl">
      
      {/* FRONT CARD */}
      <AntigravityCard intensity={20} className="w-[300px] h-[500px] !p-0 !border-2 !border-[#D4AF37]/40">
        <div className="relative w-full h-full bg-[#050505]/80 backdrop-blur-3xl flex flex-col items-center p-6 text-white rounded-[14px]">
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-[200%] bg-gradient-to-b from-[#D4AF37]/10 to-transparent pointer-events-none rounded-full" />
          
          {/* Header */}
          <div className="text-center z-10 w-full mb-6">
            <h1 className="text-2xl font-bold tracking-[0.2em] text-[#D4AF37]">NOVELLEYX</h1>
            <p className="text-[8px] uppercase tracking-widest text-gray-400 mt-1">We Build. We Grow. We Earn.</p>
          </div>

          {/* Profile Photo */}
          <div className="w-32 h-32 rounded-full border-4 border-[#D4AF37] mb-6 overflow-hidden z-10 bg-[#0A0A0A] flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            {employee.profilePhoto ? (
              <img src={employee.profilePhoto} alt={employee.fullName} className="w-full h-full object-cover" />
            ) : (
              <span className="text-4xl text-[#D4AF37] font-bold">{employee.fullName.charAt(0)}</span>
            )}
          </div>

          {/* Details */}
          <div className="text-center z-10 flex-1 flex flex-col justify-center w-full">
            <h2 className="text-xl font-bold uppercase tracking-wide mb-1 leading-tight text-white drop-shadow-md">{employee.fullName}</h2>
            <p className="text-[#D4AF37] text-sm font-medium tracking-wide mb-4 drop-shadow-sm">{employee.designation}</p>
            
            <div className="bg-black/50 border border-[#D4AF37]/30 rounded py-1.5 px-4 inline-block mx-auto mb-auto backdrop-blur-sm">
              <p className="font-mono text-sm tracking-wider text-[#D4AF37]">{employee.employeeId}</p>
            </div>
          </div>

          {/* Footer */}
          <div className="w-full flex justify-between items-end z-10 mt-4 border-t border-[#D4AF37]/20 pt-3">
            <div className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded-full">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[8px] text-gray-300 uppercase tracking-widest font-semibold">NFC</span>
            </div>
            {employee.signature && (
              <img src={employee.signature} alt="Signature" className="h-6 opacity-80 mix-blend-screen" />
            )}
            {!employee.signature && (
              <div className="h-6 w-16 border-b border-gray-600 border-dashed" />
            )}
          </div>
          <div className="absolute bottom-2 left-0 w-full text-center z-10">
            <p className="text-[8px] text-gray-500 tracking-widest font-medium">NOVELLEYX.COM</p>
          </div>
        </div>
      </AntigravityCard>

      {/* BACK CARD */}
      <AntigravityCard intensity={20} className="w-[300px] h-[500px] !p-0 !border-2 !border-white/10">
        <div className="relative w-full h-full bg-[#050505]/90 backdrop-blur-3xl flex flex-col items-center p-6 text-white rounded-[14px]">
          <div className="w-full flex items-center justify-between mb-6 border-b border-white/10 pb-3">
            <h1 className="text-sm font-bold tracking-[0.2em] text-[#D4AF37]">NOVELLEYX</h1>
            <p className="font-mono text-xs text-gray-400 bg-white/5 px-2 py-1 rounded">{employee.employeeId}</p>
          </div>

          <div className="w-full space-y-2 mb-6">
            <div className="bg-white/5 p-2 rounded">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">Role</p>
              <p className="text-xs font-medium text-white">{employee.role.replace('_', ' ')}</p>
            </div>
            <div className="bg-white/5 p-2 rounded">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">Department</p>
              <p className="text-xs font-medium text-white">{employee.department}</p>
            </div>
            <div className="bg-white/5 p-2 rounded">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">Joining Date</p>
              <p className="text-xs font-medium text-white">{new Date(employee.joiningDate).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center w-full">
            <div className="bg-white p-2 rounded-lg mb-2 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              <QRCodeSVG value={verifyUrl} size={100} level="H" includeMargin={false} />
            </div>
            <p className="text-[8px] text-gray-400 text-center mb-6 max-w-[200px] leading-relaxed">
              Scan QR code to verify this credential securely on the NOVELLEYX Identity System.
            </p>

            <div className="bg-white px-2 py-1 rounded w-full overflow-hidden flex justify-center shadow-inner">
              <Barcode 
                value={credentialPublicId} 
                format="CODE128" 
                width={1.2} 
                height={40} 
                displayValue={false} 
                background="#ffffff"
                lineColor="#000000"
                margin={0}
              />
            </div>
            <p className="text-[8px] text-gray-500 font-mono mt-1 tracking-widest">{credentialPublicId}</p>
          </div>

          <div className="w-full text-center border-t border-white/10 pt-3 mt-4">
            <p className="text-[7px] text-gray-500 leading-tight">
              This card is the property of NOVELLEYX.<br/>
              If found, please return to the NOVELLEYX corporate office.<br/>
              Verification: novelleyx.com/verify
            </p>
          </div>
        </div>
      </AntigravityCard>

    </div>
  );
}
