import React from 'react';
import { 
  Bot, 
  BrainCircuit, 
  Zap, 
  BarChart2, 
  DollarSign, 
  MessageSquare,
  TrendingUp,
  Cpu,
  Layers
} from 'lucide-react';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function AICommandCenterPage() {
  const totalSessions = await prisma.aISession.count();
  const completedSessions = await prisma.aISession.count({ where: { status: 'COMPLETED' } });
  const appraisalsGenerated = await prisma.appraisal.count();
  
  const aiAppraisalRate = totalSessions > 0 ? ((appraisalsGenerated / totalSessions) * 100).toFixed(1) : '0';

  const topRequirements = await prisma.requirement.findMany({ 
    orderBy: { createdAt: 'desc' }, 
    take: 5, 
    include: { lead: { include: { customer: { include: { user: true } } } } } 
  });

  const latestInsights = await prisma.aIMessage.findMany({
    where: { role: 'ASSISTANT' },
    orderBy: { createdAt: 'desc' },
    take: 4,
  });

  const topRecommendations = await prisma.recommendation.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
  });

  return (
    <div className="text-white">
      <div className="w-full space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold">AI <span className="text-[#D4AF37]">Command Center</span></h1>
            <p className="text-gray-400 mt-2 text-lg">Real-time metrics and insights from the AI engine.</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-md">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm text-gray-300 font-medium">AI Engine Online</span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: 'AI SESSIONS', value: totalSessions.toLocaleString(), icon: MessageSquare, change: '+0%' },
            { label: 'COMPLETED ANALYSES', value: completedSessions.toLocaleString(), icon: BrainCircuit, change: '+0%' },
            { label: 'APPRAISALS GENERATED', value: appraisalsGenerated.toLocaleString(), icon: Zap, change: '+0%' },
            { label: 'AI -> APPRAISAL RATE', value: `${aiAppraisalRate}%`, icon: BarChart2, change: '+0%' },
            { label: 'AI COST (MTD)', value: 'TBD', icon: DollarSign, change: '0%' },
            { label: 'COST / APPRAISAL', value: 'TBD', icon: Cpu, change: '0%' },
          ].map((metric, idx) => (
            <div key={idx} className="bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-lg p-5 hover:border-[#D4AF37]/40 transition-all flex flex-col gap-3">
              <div className="flex justify-between items-start text-gray-400">
                <metric.icon className="w-5 h-5 text-[#D4AF37]" />
                <span className={`text-xs font-semibold ${metric.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {metric.change}
                </span>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
                <div className="text-xs text-gray-500 uppercase font-semibold">{metric.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI Insight Engine */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Bot className="w-6 h-6 text-[#D4AF37]" />
              AI Insight Engine
            </h2>
            <div className="bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-lg p-6 space-y-4 h-full">
              {latestInsights.length > 0 ? (
                latestInsights.map((insight, idx) => (
                  <div key={idx} className="p-4 bg-black border border-gray-800 rounded-md">
                    <p className="text-sm text-gray-300 leading-relaxed mb-3 line-clamp-3">"{insight.content}"</p>
                    <div className="flex justify-between items-center text-xs">
                      <span className="px-2 py-1 rounded border bg-blue-500/10 text-blue-500 border-blue-500/20">
                        Info
                      </span>
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">No AI insights yet</div>
              )}
            </div>
          </div>

          {/* Tables Section */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Top Requirements */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Layers className="w-6 h-6 text-[#D4AF37]" />
                Top Customer Requirements
              </h2>
              <div className="bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-lg overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-800 bg-black/50">
                      <th className="p-4 text-sm font-semibold text-gray-400">Requirement Identified</th>
                      <th className="p-4 text-sm font-semibold text-gray-400">Client / Lead</th>
                      <th className="p-4 text-sm font-semibold text-gray-400 text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {topRequirements.length > 0 ? (
                      topRequirements.map((req, idx) => (
                        <tr key={idx} className="hover:bg-gray-900/50 transition-colors">
                          <td className="p-4 text-sm font-medium text-gray-300 line-clamp-2" title={req.details}>
                            {req.details.substring(0, 50)}...
                          </td>
                          <td className="p-4 text-sm text-gray-400">
                            {req.lead?.customer?.user?.name || req.lead?.customer?.companyName || 'Unknown'}
                          </td>
                          <td className="p-4 text-sm font-semibold text-right text-gray-500">
                            {new Date(req.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="p-4 text-center text-gray-500">No requirements found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top Recommended Services */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Zap className="w-6 h-6 text-[#D4AF37]" />
                Latest Recommended Services
              </h2>
              <div className="bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-lg overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-800 bg-black/50">
                      <th className="p-4 text-sm font-semibold text-gray-400">Service / Solution</th>
                      <th className="p-4 text-sm font-semibold text-gray-400 text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {topRecommendations.length > 0 ? (
                      topRecommendations.map((rec, idx) => (
                        <tr key={idx} className="hover:bg-gray-900/50 transition-colors">
                          <td className="p-4 text-sm font-medium text-gray-300 line-clamp-2">
                            {rec.details}
                          </td>
                          <td className="p-4 text-sm font-medium text-[#D4AF37] text-right">
                            {new Date(rec.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={2} className="p-4 text-center text-gray-500">No recommendations found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
