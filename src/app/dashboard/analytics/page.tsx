import React from 'react';
import { 
  LineChart, 
  DollarSign, 
  TrendingUp, 
  Users,
  Target,
  ArrowRight,
  Filter
} from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AnalyticsPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }

  // 1. Revenue: Aggregate completed appraisals
  const completedAppraisals = await prisma.appraisal.aggregate({
    where: { status: 'COMPLETED' },
    _sum: { totalAmount: true }
  });
  const actualRevenue = completedAppraisals._sum.totalAmount || 0;

  // 2. Pipeline: Aggregate pending/in-review appraisals
  const pipelineAppraisals = await prisma.appraisal.aggregate({
    where: { status: { in: ['PENDING', 'IN_REVIEW'] } },
    _sum: { totalAmount: true },
    _count: true
  });
  const pipelineValue = pipelineAppraisals._sum.totalAmount || 0;
  const activeAppraisalsCount = pipelineAppraisals._count || 0;

  // 3. Pending Payments: Mocking this based on IN_REVIEW as there's no payment model
  const pendingPaymentsAgg = await prisma.appraisal.aggregate({
    where: { status: 'IN_REVIEW' },
    _sum: { totalAmount: true },
    _count: true
  });
  const pendingPayments = pendingPaymentsAgg._sum.totalAmount || 0;
  const pendingClientsCount = pendingPaymentsAgg._count || 0;

  // 4. Lead Funnel
  const leadCounts = await prisma.lead.groupBy({
    by: ['status'],
    _count: true
  });
  
  let totalLeads = 0;
  const funnel = {
    CONTACTED: 0,
    QUALIFIED: 0,
    PROPOSAL_SENT: 0,
    CONVERTED: 0
  };

  leadCounts.forEach(item => {
    totalLeads += item._count;
    if (item.status === 'CONTACTED') funnel.CONTACTED = item._count;
    if (item.status === 'QUALIFIED') funnel.QUALIFIED = item._count;
    if (item.status === 'PROPOSAL_SENT') funnel.PROPOSAL_SENT = item._count;
    if (item.status === 'CONVERTED') funnel.CONVERTED = item._count;
  });

  // Appraisals count
  const appraisalsCount = await prisma.appraisal.count();
  const wonCount = await prisma.project.count(); // Using projects as won

  // 5. Service Matrix
  const categories = await prisma.serviceCategory.findMany({
    include: { services: true }
  });

  const serviceMatrix = categories.map(cat => {
    // In absence of direct relationship, we show real category but 0 or derived counts.
    return {
      service: cat.name,
      leads: 0,
      appraisals: 0,
      won: 0,
      revenue: '$0'
    };
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="text-white">
      <div className="w-full space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold">Analytics & <span className="text-[#D4AF37]">Revenue</span></h1>
            <p className="text-gray-400 mt-2 text-lg">Financial overview, pipeline performance, and lead conversion.</p>
          </div>
          <button className="flex items-center gap-2 text-gray-400 hover:text-white px-4 py-2 border border-gray-800 rounded-md hover:border-gray-600 transition-colors bg-[#0A0A0A]">
            <Filter className="w-4 h-4" />
            Last 30 Days
          </button>
        </div>

        {/* Financial Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Actual Revenue */}
          <div className="bg-[#0A0A0A] border border-[#D4AF37] rounded-lg p-6 relative overflow-hidden shadow-[0_0_15px_rgba(212,175,55,0.15)]">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <DollarSign className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <h3 className="text-sm font-semibold text-[#D4AF37] uppercase tracking-wider mb-2">Monthly Revenue (Actual)</h3>
              <div className="text-5xl font-bold text-white mb-4">{formatCurrency(actualRevenue)}</div>
              <div className="flex items-center gap-2 text-sm text-green-500 font-medium">
                <TrendingUp className="w-4 h-4" />
                <span>Real-time data</span>
              </div>
            </div>
          </div>

          {/* Pipeline */}
          <div className="bg-[#0A0A0A] border border-gray-800 rounded-lg p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Target className="w-24 h-24 text-white" />
            </div>
            <div className="relative z-10">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Pipeline Value (Potential)</h3>
              <div className="text-5xl font-bold text-gray-300 mb-4">{formatCurrency(pipelineValue)}</div>
              <div className="flex items-center gap-2 text-sm text-blue-400 font-medium">
                <LineChart className="w-4 h-4" />
                <span>{activeAppraisalsCount} Active Appraisals</span>
              </div>
            </div>
          </div>

          {/* Pending Payments */}
          <div className="bg-[#0A0A0A] border border-gray-800 rounded-lg p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Users className="w-24 h-24 text-white" />
            </div>
            <div className="relative z-10">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Pending Payments</h3>
              <div className="text-5xl font-bold text-gray-300 mb-4">{formatCurrency(pendingPayments)}</div>
              <div className="flex items-center gap-2 text-sm text-orange-400 font-medium">
                <Users className="w-4 h-4" />
                <span>Awaiting from {pendingClientsCount} clients</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Lead Funnel Visualization */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Filter className="w-6 h-6 text-[#D4AF37]" />
              Lead Conversion Funnel
            </h2>
            <div className="bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-lg p-8 flex flex-col items-center justify-center space-y-2 h-full">
              
              <div className="w-full max-w-md bg-gray-900 border border-gray-700 py-4 px-6 rounded-t-xl text-center relative">
                <div className="text-sm text-gray-400 uppercase font-semibold mb-1">Total Leads</div>
                <div className="text-3xl font-bold text-white">{totalLeads}</div>
              </div>
              
              <div className="w-full max-w-sm bg-gray-800 border border-gray-600 py-4 px-6 text-center relative">
                <div className="text-sm text-gray-400 uppercase font-semibold mb-1">Contacted</div>
                <div className="text-3xl font-bold text-white">{funnel.CONTACTED}</div>
              </div>
              
              <div className="w-full max-w-xs bg-gray-700 border border-gray-500 py-4 px-6 text-center relative">
                <div className="text-sm text-gray-400 uppercase font-semibold mb-1">Qualified</div>
                <div className="text-3xl font-bold text-white">{funnel.QUALIFIED}</div>
              </div>
              
              <div className="w-full max-w-[16rem] bg-[#D4AF37]/20 border border-[#D4AF37]/50 py-4 px-6 text-center relative">
                <div className="text-sm text-[#D4AF37] uppercase font-semibold mb-1">Appraisals</div>
                <div className="text-3xl font-bold text-[#D4AF37]">{appraisalsCount}</div>
              </div>
              
              <div className="w-full max-w-[12rem] bg-[#D4AF37] border border-[#D4AF37] py-4 px-6 rounded-b-xl text-center shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                <div className="text-sm text-black/80 uppercase font-bold mb-1">Won</div>
                <div className="text-4xl font-extrabold text-black">{wonCount}</div>
              </div>

            </div>
          </div>

          {/* Service Opportunity Matrix */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Target className="w-6 h-6 text-[#D4AF37]" />
              Service Opportunity Matrix
            </h2>
            <div className="bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-lg overflow-hidden h-full">
              {serviceMatrix.length === 0 ? (
                <div className="p-8 text-center text-gray-400">
                  <p>No service categories found.</p>
                </div>
              ) : (
                <table className="w-full text-left border-collapse h-full">
                  <thead>
                    <tr className="border-b border-gray-800 bg-black/50">
                      <th className="p-4 text-sm font-semibold text-gray-400">Service Area</th>
                      <th className="p-4 text-sm font-semibold text-gray-400 text-center">Leads</th>
                      <th className="p-4 text-sm font-semibold text-gray-400 text-center">Appraisals</th>
                      <th className="p-4 text-sm font-semibold text-gray-400 text-center">Won</th>
                      <th className="p-4 text-sm font-semibold text-[#D4AF37] text-right">Revenue</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {serviceMatrix.map((item, idx) => (
                      <tr key={idx} className="hover:bg-gray-900/50 transition-colors">
                        <td className="p-4 text-sm font-medium text-white">{item.service}</td>
                        <td className="p-4 text-sm text-gray-400 text-center">{item.leads}</td>
                        <td className="p-4 text-sm text-gray-400 text-center">{item.appraisals}</td>
                        <td className="p-4 text-sm text-white font-semibold text-center">{item.won}</td>
                        <td className="p-4 text-sm font-bold text-[#D4AF37] text-right">{item.revenue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
