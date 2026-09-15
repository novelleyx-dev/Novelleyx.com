import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import IdentityClientView from './IdentityClientView';

export default async function IdentityGenerator() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    redirect('/login');
  }

  const employee = await prisma.employee.findFirst({
    where: { email: session.user.email },
    include: {
      credentials: {
        where: { status: 'ACTIVE' },
        take: 1
      }
    }
  });

  if (!employee) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-white text-center">
        <ShieldCheck className="text-red-500 mb-4" size={48} />
        <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
        <p className="text-gray-400">No active employee record found for {session.user.email}.</p>
      </div>
    );
  }

  const employeeData = {
    id: employee.employeeId,
    name: employee.fullName,
    role: employee.role,
    department: employee.department,
    bloodGroup: 'O+', // Hardcoded for now as it's not in schema
    issued: new Date(employee.createdAt).toLocaleDateString('en-GB'),
    photoUrl: employee.profilePhoto || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(employee.fullName)}`,
    publicVerifyUrl: `https://novelleyx.com/verify/${employee.employeeId}`
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 pb-20">
      
      <div className="text-center mb-10 max-w-lg">
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center justify-center gap-3">
          <ShieldCheck className="text-[#F59E0B]" size={28} />
          Digital Credentialing
        </h1>
        <p className="text-[#A8A8A8] text-sm leading-relaxed">
          Secure, cryptographic identification for NOVELLEYX verified personnel. 
          Present this card for facility access and digital clearance.
        </p>
      </div>

      <IdentityClientView employeeData={employeeData} />

    </div>
  );
}
