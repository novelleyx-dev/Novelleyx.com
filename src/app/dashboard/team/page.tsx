import React from 'react';
import { UsersRound, Activity, AlertCircle, CheckCircle2 } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function TeamPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }

  const employees = await prisma.employee.findMany({
    where: { status: 'ACTIVE' },
    include: {
      user: {
        include: {
          projectMemberships: true,
          assignedTasks: true
        }
      }
    }
  });

  const teamMembers = employees.map(emp => {
    const user = emp.user;
    const activeProjects = user?.projectMemberships.length || 0;
    const openTasks = user?.assignedTasks.filter(t => t.status !== 'DONE').length || 0;
    const completedTasks = user?.assignedTasks.filter(t => t.status === 'DONE').length || 0;
    
    let workload = 'AVAILABLE';
    if (openTasks > 10) workload = 'OVERLOADED';
    else if (openTasks > 5) workload = 'HIGH LOAD';

    return {
      name: emp.fullName,
      role: emp.designation,
      activeProjects,
      tasks: { open: openTasks, completed: completedTasks },
      workload,
      status: emp.status
    };
  });

  const available = teamMembers.filter(m => m.workload === 'AVAILABLE').length;
  const active = teamMembers.length;
  const highLoad = teamMembers.filter(m => m.workload === 'HIGH LOAD').length;
  const overloaded = teamMembers.filter(m => m.workload === 'OVERLOADED').length;

  const mostLoaded = [...teamMembers].sort((a, b) => b.tasks.open - a.tasks.open)[0];

  return (
    <div className="text-white">
      <div className="w-full space-y-8">
        <h1 className="text-4xl font-bold">NOVELLEYX <span className="text-[#D4AF37]">Team</span></h1>
        <p className="text-gray-400 mt-2 text-lg">Understand project capacity and team coordination.</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Available</h3>
            <div className="text-3xl font-bold text-green-500">{available}</div>
          </div>
          <div className="bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Active</h3>
            <div className="text-3xl font-bold text-blue-500">{active}</div>
          </div>
          <div className="bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">High Load</h3>
            <div className="text-3xl font-bold text-orange-500">{highLoad}</div>
          </div>
          <div className="bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Overloaded</h3>
            <div className="text-3xl font-bold text-red-500">{overloaded}</div>
          </div>
        </div>

        {mostLoaded && mostLoaded.tasks.open > 5 && (
          <div className="bg-[#111111] border-l-4 border-orange-500 rounded-r-lg p-5 flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-orange-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-white">Capacity Warning</h3>
              <p className="text-xs text-gray-400 mt-1">
                {mostLoaded.name} currently has {mostLoaded.tasks.open} active tasks across {mostLoaded.activeProjects} projects. Consider redistributing the load.
              </p>
            </div>
          </div>
        )}

        <div className="bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-lg overflow-hidden">
          {teamMembers.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              <p>No active team members found.</p>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-[#111111] border-b border-[#D4AF37]/20">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase">Team Member</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase text-center">Projects</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase text-center">Open Tasks</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase text-center">Completed</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase text-right">Load</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D4AF37]/10">
                {teamMembers.map((member, i) => (
                  <tr key={i} className="hover:bg-[#111111] transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{member.name}</div>
                      <div className="text-xs text-gray-500">{member.role}</div>
                    </td>
                    <td className="px-6 py-4 text-center font-bold">{member.activeProjects}</td>
                    <td className="px-6 py-4 text-center text-gray-300">{member.tasks.open}</td>
                    <td className="px-6 py-4 text-center text-gray-500">{member.tasks.completed}</td>
                    <td className="px-6 py-4 text-right">
                      <span className={`text-xs font-mono px-2 py-1 rounded 
                        ${member.workload === 'AVAILABLE' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 
                          member.workload === 'HIGH LOAD' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' : 
                          'bg-red-500/10 text-red-500 border border-red-500/20'}`}
                      >
                        {member.workload}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
}
