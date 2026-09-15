import React from 'react';
import { 
  FileText, 
  Search,
  Filter,
  MoreVertical,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileEdit,
  Send,
  CheckSquare,
  ShieldCheck
} from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

const statusColors = {
  'NEW': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  'IN REVIEW': 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  'NEEDS INFO': 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  'READY': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  'SENT': 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20',
  'ACCEPTED': 'bg-green-500/10 text-green-500 border-green-500/20',
  'REJECTED': 'bg-red-500/10 text-red-500 border-red-500/20',
};

const mapStatus = (status: string) => {
  switch (status) {
    case 'PENDING': return 'NEW';
    case 'IN_REVIEW': return 'IN REVIEW';
    case 'COMPLETED': return 'ACCEPTED';
    case 'REJECTED': return 'REJECTED';
    default: return status;
  }
};

export default async function AppraisalsPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }

  const appraisals = await prisma.appraisal.findMany({ 
    include: { 
      requirement: { 
        include: { 
          lead: { 
            include: { 
              customer: { 
                include: { user: true } 
              } 
            } 
          } 
        } 
      }, 
      reviewer: true, 
      items: true 
    }, 
    orderBy: { createdAt: 'desc' } 
  });

  const counts: Record<string, number> = {
    'NEW': 0,
    'IN REVIEW': 0,
    'NEEDS INFO': 0,
    'READY': 0,
    'SENT': 0,
    'ACCEPTED': 0,
  };

  appraisals.forEach(appraisal => {
    const mapped = mapStatus(appraisal.status);
    if (counts[mapped] !== undefined) {
      counts[mapped]++;
    }
  });

  return (
    <div className="text-white">
      <div className="w-full space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold">Appraisal <span className="text-[#D4AF37]">Control Center</span></h1>
            <p className="text-gray-400 mt-2 text-lg">Manage and track all project appraisals.</p>
          </div>
          <button className="bg-[#D4AF37] text-black font-semibold px-6 py-3 rounded-md hover:bg-[#E8C547] transition-all flex items-center gap-2">
            <FileText className="w-5 h-5" />
            New Appraisal
          </button>
        </div>

        {/* Status Pipeline Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: 'NEW', count: counts['NEW'], icon: FileText, color: 'text-blue-500' },
            { label: 'IN REVIEW', count: counts['IN REVIEW'], icon: Clock, color: 'text-purple-500' },
            { label: 'NEEDS INFO', count: counts['NEEDS INFO'], icon: AlertCircle, color: 'text-orange-500' },
            { label: 'READY', count: counts['READY'], icon: FileEdit, color: 'text-yellow-500' },
            { label: 'SENT', count: counts['SENT'], icon: Send, color: 'text-[#D4AF37]' },
            { label: 'ACCEPTED', count: counts['ACCEPTED'], icon: CheckSquare, color: 'text-green-500' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-lg p-4 hover:border-[#D4AF37]/40 transition-all flex flex-col items-center justify-center text-center group">
              <stat.icon className={`w-6 h-6 mb-2 ${stat.color} group-hover:scale-110 transition-transform`} />
              <div className="text-3xl font-bold mb-1">{stat.count}</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between bg-[#0A0A0A] p-4 rounded-lg border border-[#D4AF37]/20">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search appraisals, customers..." 
              className="w-full bg-black border border-gray-800 rounded-md py-2 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]/50"
            />
          </div>
          <button className="flex items-center gap-2 text-gray-400 hover:text-white px-4 py-2 border border-gray-800 rounded-md hover:border-gray-600 transition-colors">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        {/* Appraisals Table */}
        <div className="bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-800 bg-black/50">
                  <th className="p-4 text-sm font-semibold text-gray-400">ID</th>
                  <th className="p-4 text-sm font-semibold text-gray-400">Customer</th>
                  <th className="p-4 text-sm font-semibold text-gray-400">Requirement</th>
                  <th className="p-4 text-sm font-semibold text-gray-400 hidden md:table-cell">Date</th>
                  <th className="p-4 text-sm font-semibold text-gray-400">Est. Value</th>
                  <th className="p-4 text-sm font-semibold text-gray-400">Status</th>
                  <th className="p-4 text-sm font-semibold text-gray-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {appraisals.length > 0 ? (
                  appraisals.map((appraisal, idx) => {
                    const mappedStatus = mapStatus(appraisal.status);
                    const customerName = appraisal.requirement?.lead?.customer?.companyName || appraisal.requirement?.lead?.customer?.user?.name || 'Unknown Customer';
                    const reqTitle = appraisal.requirement?.details?.substring(0, 50) || 'Unknown Requirement';
                    
                    return (
                      <tr key={appraisal.id || idx} className="hover:bg-gray-900/50 transition-colors">
                        <td className="p-4 text-sm font-medium text-gray-300">{appraisal.id.substring(0, 8)}...</td>
                        <td className="p-4 text-sm font-semibold text-white">{customerName}</td>
                        <td className="p-4 text-sm text-gray-300">{reqTitle}</td>
                        <td className="p-4 text-sm text-gray-400 hidden md:table-cell">
                          {new Date(appraisal.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-4 text-sm font-medium text-[#D4AF37]">
                          ${appraisal.totalAmount?.toString() || '0'}
                        </td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[mappedStatus as keyof typeof statusColors] || statusColors['NEW']}`}>
                            {mappedStatus}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button className="text-gray-500 hover:text-white transition-colors p-1">
                            <MoreVertical className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="p-12 text-center">
                      <ShieldCheck className="w-12 h-12 text-[#D4AF37] mx-auto mb-4 opacity-50" />
                      <h3 className="text-xl font-medium text-gray-300">No Appraisals Found</h3>
                      <p className="text-gray-500 mt-2">There are currently no appraisals in the database.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
