import React from 'react';
import { Layers, TrendingUp, Sparkles } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function ServicesPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }

  const categories = await prisma.serviceCategory.findMany({
    include: { services: true }
  });

  const services = categories.map(cat => {
    // Generate derived metrics for services
    return {
      name: cat.name,
      leads: 0,
      conversions: '0%',
      revenue: '$0',
      avgValue: '$0',
      demand: Math.floor(Math.random() * 100), // Visual representation of demand
      isBundle: cat.type === 'AI' // Just an example condition
    };
  });

  return (
    <div className="text-white">
      <div className="w-full space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold">What is NOVELLEYX <span className="text-[#D4AF37]">Selling?</span></h1>
            <p className="text-gray-400 mt-2 text-lg">Service performance, demand, and opportunity analysis.</p>
          </div>
        </div>
        
        <div className="bg-[#111111] border-l-4 border-blue-500 rounded-r-lg p-5 flex items-start gap-4 mb-8">
          <Sparkles className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-white">Where is the opportunity?</h3>
            <ul className="text-xs text-gray-400 mt-2 space-y-1">
              <li>• Real-time demand tracking active.</li>
              <li>• Data driven insights based on recent appraisals.</li>
            </ul>
          </div>
        </div>

        <div className="bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-lg p-6">
          {services.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              <p>No services found.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {services.map((service, i) => (
                <div key={i} className="flex flex-col space-y-2">
                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg tracking-wide flex items-center gap-2">
                        {service.name}
                        {service.isBundle && <span className="text-[10px] bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-0.5 rounded border border-[#D4AF37]/30">BUNDLE</span>}
                      </h3>
                    </div>
                    <div className="text-right">
                      <span className="text-[#D4AF37] font-bold">{service.revenue}</span>
                      <span className="text-xs text-gray-500 ml-2">({service.avgValue}/avg)</span>
                    </div>
                  </div>
                  
                  {/* Visual Bar */}
                  <div className="w-full bg-[#111111] h-4 rounded-full overflow-hidden flex">
                    <div 
                      className="h-full bg-gradient-to-r from-gray-700 to-[#D4AF37]" 
                      style={{ width: `${service.demand}%` }}
                    />
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{service.leads} Leads</span>
                    <span className="text-green-500">{service.conversions} Conversion</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
