import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { CheckCircle, XCircle, AlertTriangle, ShieldCheck } from 'lucide-react';

const prisma = new PrismaClient();

// Disable caching for this route so it's always verified live
export const dynamic = 'force-dynamic';

export default async function VerifyCredentialPage({ params }: { params: { credential_id: string } }) {
  const credentialId = params.credential_id;

  // 1. Fetch Credential
  const credential = await prisma.employeeCredential.findUnique({
    where: { credentialPublicId: credentialId },
    include: {
      employee: true
    }
  });

  // If entirely unknown credential, show INVALID
  if (!credential) {
    return <VerificationResult status="INVALID" />;
  }

  // 2. Check statuses
  let verificationStatus: 'VERIFIED' | 'INVALID' | 'REVOKED' | 'INACTIVE' | 'SUSPENDED' | 'EXPIRED' = 'INVALID';
  
  if (credential.status === 'ACTIVE' && credential.employee.status === 'ACTIVE') {
    verificationStatus = 'VERIFIED';
  } else if (credential.status === 'REVOKED') {
    verificationStatus = 'REVOKED';
  } else if (credential.status === 'SUSPENDED') {
    verificationStatus = 'SUSPENDED';
  } else if (credential.status === 'EXPIRED') {
    verificationStatus = 'EXPIRED';
  } else if (credential.status === 'INACTIVE' || credential.employee.status === 'INACTIVE') {
    verificationStatus = 'INACTIVE';
  }

  // 3. Log Verification Event
  await prisma.credentialVerificationLog.create({
    data: {
      credentialId: credential.id,
      verificationResult: verificationStatus,
      verificationMethod: 'QR', // Defaulting to QR for public scans, can be extended to use headers to detect source
    }
  });

  return (
    <VerificationResult 
      status={verificationStatus} 
      employee={credential.employee} 
      credential={credential} 
    />
  );
}

function VerificationResult({ status, employee, credential }: { status: string, employee?: any, credential?: any }) {
  const getStatusConfig = () => {
    switch (status) {
      case 'VERIFIED':
        return { icon: ShieldCheck, color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/20' };
      case 'REVOKED':
        return { icon: XCircle, color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20' };
      case 'SUSPENDED':
      case 'INACTIVE':
      case 'EXPIRED':
        return { icon: AlertTriangle, color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/20' };
      default:
        return { icon: XCircle, color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20' };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div className="min-h-screen bg-transparent text-white flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-2xl overflow-hidden shadow-2xl relative">
        
        {/* Header */}
        <div className="bg-[#111111] p-6 text-center border-b border-[#D4AF37]/20">
          <h1 className="text-xl font-bold tracking-widest text-[#D4AF37]">NOVELLEYX</h1>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Official Credential Verification</p>
        </div>

        {/* Status Indicator */}
        <div className={`p-6 flex flex-col items-center justify-center border-b border-gray-800 ${config.bg}`}>
          <Icon className={`w-16 h-16 ${config.color} mb-3`} />
          <h2 className={`text-2xl font-bold tracking-widest ${config.color}`}>{status}</h2>
        </div>

        {/* Employee Info (Only if Valid or explicitly showing who it belongs to, but usually we show info if we found it) */}
        {employee && (
          <div className="p-8 flex flex-col items-center text-center">
            {employee.profilePhoto ? (
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#D4AF37] mb-4">
                <img src={employee.profilePhoto} alt={employee.fullName} width={96} height={96} className="object-cover w-full h-full" />
              </div>
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-800 border-2 border-[#D4AF37] mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-500">{employee.fullName.charAt(0)}</span>
              </div>
            )}
            
            <h3 className="text-2xl font-bold text-white mb-1">{employee.fullName}</h3>
            <p className="text-[#D4AF37] font-medium mb-1">{employee.designation}</p>
            <p className="text-sm text-gray-400 mb-6">{employee.department}</p>
            
            <div className="w-full space-y-3 text-left bg-[#111111] p-4 rounded-lg border border-gray-800">
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Employee ID</span>
                <span className="font-mono text-white text-sm">{employee.employeeId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Joined</span>
                <span className="text-white text-sm">{new Date(employee.joiningDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Credential Status</span>
                <span className="text-white text-sm">{credential.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Issued</span>
                <span className="text-white text-sm">{new Date(credential.issuedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        )}

        {!employee && (
          <div className="p-8 text-center text-gray-400">
            The requested credential identifier does not exist in the NOVELLEYX Identity System.
          </div>
        )}

        {/* Footer */}
        <div className="bg-[#111111] p-4 text-center border-t border-gray-800">
          <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
            Verified by NOVELLEYX Identity System
          </p>
          <p className="text-[10px] text-gray-600 mt-1">
            {new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
          </p>
        </div>
      </div>
    </div>
  );
}
