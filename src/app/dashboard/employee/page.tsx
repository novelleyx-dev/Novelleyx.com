import React from 'react';
import IDCard from '@/components/identity/IDCard';
import { Download, Copy, ShieldAlert } from 'lucide-react';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export default async function EmployeeDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  // Find the employee profile associated with the current user's email
  const employee = await prisma.employee.findFirst({
    where: { email: session.user.email },
    include: { credentials: { where: { status: 'ACTIVE' }, orderBy: { issuedAt: 'desc' }, take: 1 } }
  });

  if (!employee) {
    return (
      <div className="text-white">
        <div className="w-full space-y-8">
          <h1 className="text-4xl font-bold">My <span className="text-[#D4AF37]">Identity</span></h1>
          <div className="bg-[#111111] border-l-4 border-orange-500 rounded-r-lg p-5">
            <h3 className="text-lg font-semibold text-white">No Employee Profile Found</h3>
            <p className="text-gray-400 mt-2">
              We couldn't find an active employee profile linked to your account ({session.user.email}). 
              If you believe this is an error, please contact HR or system administrator.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const activeCredential = employee.credentials?.[0];
  const credentialPublicId = activeCredential?.credentialPublicId || 'PENDING_ISSUE';

  return (
    <div className="text-white">
      <div className="w-full space-y-8">
        <h1 className="text-4xl font-bold">My <span className="text-[#D4AF37]">Identity</span></h1>
        <p className="text-gray-400 mt-2 text-lg">Manage your NOVELLEYX digital credential and identity card.</p>
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          <div className="xl:col-span-2 bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-lg p-6 lg:p-12 overflow-x-auto flex justify-center items-center">
            <IDCard employee={employee} credentialPublicId={credentialPublicId} />
          </div>
          
          <div className="space-y-6">
            <div className="bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Credential Status</h2>
              {activeCredential ? (
                <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 p-4 rounded-lg">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                  <div>
                    <p className="text-green-500 font-bold">ACTIVE</p>
                    <p className="text-xs text-green-400/70">Verified by NOVELLEYX Security</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 bg-orange-500/10 border border-orange-500/20 p-4 rounded-lg">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <div>
                    <p className="text-orange-500 font-bold">PENDING</p>
                    <p className="text-xs text-orange-400/70">Awaiting Credential Issuance</p>
                  </div>
                </div>
              )}
              
              <div className="mt-6 space-y-3">
                <button className="w-full bg-[#111111] border border-gray-800 text-gray-300 font-semibold px-4 py-3 rounded-md hover:border-gray-600 hover:text-white transition-all flex justify-center items-center gap-2">
                  <Download className="w-4 h-4" /> Download PDF Card
                </button>
                <button className="w-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] font-semibold px-4 py-3 rounded-md hover:bg-[#D4AF37]/20 transition-all flex justify-center items-center gap-2">
                  <Copy className="w-4 h-4" /> Copy Verification Link
                </button>
              </div>
            </div>

            <div className="bg-[#111111] border-l-4 border-orange-500 rounded-r-lg p-5 flex items-start gap-4">
              <ShieldAlert className="w-6 h-6 text-orange-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-white">Lost your physical card?</h3>
                <p className="text-xs text-gray-400 mt-1">
                  Report it immediately. Your current digital credential will be revoked and a replacement will be issued.
                </p>
                <button className="mt-2 text-xs text-orange-500 font-medium hover:underline">
                  Report Lost Card
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
