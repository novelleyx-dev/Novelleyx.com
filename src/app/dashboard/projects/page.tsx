import React from 'react';
import { 
  Activity, 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  Play,
  Box,
  Calendar,
  MoreHorizontal,
  FolderOpen
} from 'lucide-react';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

const priorityColors = {
  'Low': 'text-green-500',
  'Medium': 'text-blue-500',
  'High': 'text-orange-500',
  'Critical': 'text-red-500',
};

const statusConfig = {
  'ACTIVE': { icon: Play, color: 'text-blue-500', bg: 'bg-blue-500' },
  'DELAYED': { icon: Clock, color: 'text-orange-500', bg: 'bg-orange-500' },
  'AT RISK': { icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-500' },
  'TESTING': { icon: Activity, color: 'text-purple-500', bg: 'bg-purple-500' },
  'DELIVERY': { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500' },
};

export default async function ProjectsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  const projectsData = await prisma.project.findMany({ 
    include: { customer: { include: { user: true } } }, 
    orderBy: { createdAt: 'desc' } 
  });

  const kpiCounts = {
    'ACTIVE': 0,
    'DELAYED': 0,
    'AT RISK': 0,
    'TESTING': 0,
    'DELIVERY': 0,
  };

  const mappedProjects = projectsData.map(p => {
    let mappedStatus = 'ACTIVE';
    if (p.status === 'PLANNING') mappedStatus = 'ACTIVE';
    else if (p.status === 'ACTIVE') mappedStatus = 'ACTIVE';
    else if (p.status === 'ON_HOLD') mappedStatus = 'DELAYED';
    else if (p.status === 'COMPLETED') mappedStatus = 'DELIVERY';
    else if (p.status === 'CANCELLED') mappedStatus = 'AT RISK';

    kpiCounts[mappedStatus as keyof typeof kpiCounts]++;

    return {
      id: p.id,
      objective: p.name,
      customer: p.customer?.user?.name || 'Unknown Customer',
      status: mappedStatus,
      progress: 0,
      deadline: p.endDate ? new Date(p.endDate).toLocaleDateString() : 'No Deadline',
      priority: 'Medium',
    };
  });

  return (
    <div className="text-white">
      <div className="w-full space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold">Project <span className="text-[#D4AF37]">Control Center</span></h1>
            <p className="text-gray-400 mt-2 text-lg">Monitor health and progress of all ongoing projects.</p>
          </div>
          <button className="bg-[#D4AF37] text-black font-semibold px-6 py-3 rounded-md hover:bg-[#E8C547] transition-all flex items-center gap-2">
            <Box className="w-5 h-5" />
            New Project
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: 'ACTIVE PROJECTS', count: kpiCounts['ACTIVE'], icon: Play, color: 'text-blue-500' },
            { label: 'DELAYED', count: kpiCounts['DELAYED'], icon: Clock, color: 'text-orange-500' },
            { label: 'AT RISK', count: kpiCounts['AT RISK'], icon: AlertTriangle, color: 'text-red-500' },
            { label: 'TESTING', count: kpiCounts['TESTING'], icon: Activity, color: 'text-purple-500' },
            { label: 'DELIVERY', count: kpiCounts['DELIVERY'], icon: CheckCircle, color: 'text-green-500' },
          ].map((kpi, idx) => (
            <div key={idx} className="bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-lg p-6 hover:border-[#D4AF37]/40 transition-all flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <div className="text-4xl font-bold">{kpi.count}</div>
                <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
              </div>
              <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">{kpi.label}</div>
            </div>
          ))}
        </div>

        {/* Projects Grid */}
        {mappedProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500 border border-gray-800 rounded-lg bg-[#0A0A0A]">
            <FolderOpen className="w-12 h-12 mb-4 opacity-50" />
            <p className="text-lg">No projects found.</p>
            <p className="text-sm mt-1">Get started by creating a new project.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mappedProjects.map((project, idx) => {
              const StatusIcon = statusConfig[project.status as keyof typeof statusConfig].icon;
              const statusColor = statusConfig[project.status as keyof typeof statusConfig].color;
              const statusBg = statusConfig[project.status as keyof typeof statusConfig].bg;

              return (
                <div key={idx} className="bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-lg p-6 hover:border-[#D4AF37]/40 transition-all flex flex-col h-full group">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">{project.id}</div>
                      <h3 className="text-xl font-semibold text-white leading-tight mb-2">{project.objective}</h3>
                      <div className="text-sm text-gray-400">{project.customer}</div>
                    </div>
                    <button className="text-gray-600 hover:text-white transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mb-6">
                    <span className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-gray-900 border border-gray-800 ${statusColor}`}>
                      <StatusIcon className="w-3 h-3" />
                      {project.status}
                    </span>
                    <span className={`text-xs font-medium ${priorityColors[project.priority as keyof typeof priorityColors]}`}>
                      • {project.priority} Priority
                    </span>
                  </div>

                  <div className="mt-auto space-y-4">
                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-white font-medium">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-900 rounded-full h-2">
                        <div className={`${statusBg} h-2 rounded-full transition-all duration-1000`} style={{ width: `${project.progress}%` }}></div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-400 pt-4 border-t border-gray-800">
                      <Calendar className="w-4 h-4" />
                      Due: <span className="text-gray-300 font-medium">{project.deadline}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
