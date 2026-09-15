import React from 'react';
import { Users, Filter, ArrowRight, UserCheck, Inbox } from 'lucide-react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function CustomersPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  const customers = await prisma.customer.findMany({
    include: { leads: true, projects: true }
  });

  const customerAnalytics: Record<string, any> = {};

  let totalCustomers = 0;
  let activeProjects = 0;
  let totalRevenue = 0; // Simulated revenue as it isn't tracked on project level simply
  let totalLeads = 0;
  let convertedLeads = 0;

  customers.forEach(customer => {
    totalCustomers++;
    
    if (!customerAnalytics[customer.type]) {
      customerAnalytics[customer.type] = {
        type: customer.type,
        count: 0,
        leads: 0,
        convertedLeads: 0,
        revenue: 0,
        projects: 0,
      };
    }
    
    customerAnalytics[customer.type].count++;
    
    customer.leads.forEach(lead => {
      customerAnalytics[customer.type].leads++;
      totalLeads++;
      if (lead.status === 'CONVERTED') {
        customerAnalytics[customer.type].convertedLeads++;
        convertedLeads++;
      }
    });

    customer.projects.forEach(project => {
      customerAnalytics[customer.type].projects++;
      if (project.status === 'ACTIVE' || project.status === 'PLANNING') {
        activeProjects++;
      }
      customerAnalytics[customer.type].revenue += 50000;
      totalRevenue += 50000;
    });
  });

  const avgConversionGlobal = totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(1) : '0';

  const analyticsArray = Object.values(customerAnalytics).map(seg => ({
    type: seg.type,
    count: seg.count,
    leads: seg.leads,
    conversion: seg.leads > 0 ? `${((seg.convertedLeads / seg.leads) * 100).toFixed(1)}%` : '0%',
    revenue: `₹${(seg.revenue / 100000).toFixed(2)}L`,
    avgProject: seg.projects > 0 ? `₹${(seg.revenue / seg.projects / 100000).toFixed(2)}L` : '₹0L'
  }));

  const formatCurrency = (val: number) => {
    if (val >= 10000000) return `₹${(val/10000000).toFixed(2)}Cr`;
    if (val >= 100000) return `₹${(val/100000).toFixed(2)}L`;
    return `₹${val}`;
  };

  return (
    <div className="text-white">
      <div className="w-full space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold">Customer <span className="text-[#D4AF37]">Analytics</span></h1>
            <p className="text-gray-400 mt-2 text-lg">Understand customer segments and conversion metrics.</p>
          </div>
          <button className="flex items-center gap-2 text-gray-400 hover:text-white px-4 py-2 border border-gray-800 rounded-md bg-[#0A0A0A]">
            <Filter className="w-4 h-4" /> Filter Segments
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Total Customers</h3>
            <div className="text-3xl font-bold text-white">{totalCustomers}</div>
          </div>
          <div className="bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Active Projects</h3>
            <div className="text-3xl font-bold text-blue-500">{activeProjects}</div>
          </div>
          <div className="bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Est. Revenue</h3>
            <div className="text-3xl font-bold text-[#D4AF37]">{formatCurrency(totalRevenue)}</div>
          </div>
          <div className="bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Avg Conversion</h3>
            <div className="text-3xl font-bold text-green-500">{avgConversionGlobal}%</div>
          </div>
        </div>

        {analyticsArray.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500 border border-gray-800 rounded-lg bg-[#0A0A0A]">
            <Users className="w-12 h-12 mb-4 opacity-50" />
            <p className="text-lg">No customer data found.</p>
            <p className="text-sm mt-1">Start by adding customers to track analytics.</p>
          </div>
        ) : (
          <div className="bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-lg overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-[#111111] border-b border-[#D4AF37]/20">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase">Customer Segment</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase text-center">Count</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase text-center">Leads Generated</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase text-center">Conversion</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase text-right">Avg Project</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#D4AF37] uppercase text-right">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D4AF37]/10">
                {analyticsArray.map((segment, i) => (
                  <tr key={i} className="hover:bg-[#111111] transition-colors">
                    <td className="px-6 py-4 font-bold text-white">{segment.type}</td>
                    <td className="px-6 py-4 text-center text-gray-300">{segment.count}</td>
                    <td className="px-6 py-4 text-center text-gray-400">{segment.leads}</td>
                    <td className="px-6 py-4 text-center font-medium text-green-500">{segment.conversion}</td>
                    <td className="px-6 py-4 text-right text-gray-300">{segment.avgProject}</td>
                    <td className="px-6 py-4 text-right font-bold text-[#D4AF37]">{segment.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex justify-end">
          <Link href="/dashboard/leads" className="text-sm text-[#D4AF37] hover:text-white flex items-center gap-1 transition-colors font-medium">
            View Lead Pipeline <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
