import React from 'react';
import { CheckSquare, Clock, AlertTriangle, Plus, Inbox } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function TasksPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  const tasksData = await prisma.task.findMany({ 
    include: { project: true, assignee: true }, 
    orderBy: { createdAt: 'desc' }, 
    take: 50 
  });

  const kpiCounts = {
    'TODO': 0,
    'IN PROGRESS': 0,
    'BLOCKED': 0,
    'IN REVIEW': 0,
    'COMPLETED': 0,
  };

  const mapStatus = (status: string) => {
    switch (status) {
      case 'TODO': return 'TODO';
      case 'IN_PROGRESS': return 'IN PROGRESS';
      case 'REVIEW': return 'IN REVIEW';
      case 'DONE': return 'COMPLETED';
      default: return 'TODO';
    }
  };

  const tasks = tasksData.map(t => {
    const status = mapStatus(t.status);
    kpiCounts[status as keyof typeof kpiCounts]++;
    return {
      id: t.id,
      title: t.title,
      project: t.project?.name || 'No Project',
      assignedTo: t.assignee?.name || 'Unassigned',
      priority: t.priority,
      status: status,
      dueDate: t.dueDate ? new Date(t.dueDate).toLocaleDateString() : 'No Due Date',
    };
  });

  return (
    <div className="text-white">
      <div className="w-full space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold">Task <span className="text-[#D4AF37]">Management</span></h1>
            <p className="text-gray-400 mt-2 text-lg">Track progress, dependencies, and deadlines.</p>
          </div>
          <button className="flex items-center gap-2 bg-[#D4AF37] text-black hover:bg-[#E8C547] px-4 py-2 font-bold rounded-md transition-colors">
            <Plus className="w-4 h-4" /> New Task
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {['TODO', 'IN PROGRESS', 'BLOCKED', 'IN REVIEW', 'COMPLETED'].map((status) => (
            <div key={status} className="bg-[#0A0A0A] border border-gray-800 rounded-lg p-4 text-center">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{status}</h3>
              <div className="text-2xl font-bold text-white">
                {kpiCounts[status as keyof typeof kpiCounts]}
              </div>
            </div>
          ))}
        </div>

        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500 border border-gray-800 rounded-lg bg-[#0A0A0A]">
            <Inbox className="w-12 h-12 mb-4 opacity-50" />
            <p className="text-lg">No tasks found.</p>
            <p className="text-sm mt-1">Get started by creating a new task.</p>
          </div>
        ) : (
          <div className="bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-lg overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-[#111111] border-b border-[#D4AF37]/20">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase">Task</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase">Project</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase">Assignee</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase">Priority</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase text-right">Due</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D4AF37]/10">
                {tasks.map((task) => (
                  <tr key={task.id} className="hover:bg-[#111111] transition-colors cursor-pointer">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{task.title}</div>
                      <div className="text-xs text-gray-500">{task.id}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{task.project}</td>
                    <td className="px-6 py-4 text-gray-400">{task.assignedTo}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded 
                        ${task.priority === 'URGENT' ? 'bg-red-500/20 text-red-500' : 
                          task.priority === 'HIGH' ? 'bg-orange-500/20 text-orange-500' : 
                          task.priority === 'MEDIUM' ? 'bg-blue-500/20 text-blue-500' : 
                          'bg-gray-800 text-gray-400'}`}
                      >
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-bold px-2 py-1 border border-gray-700 rounded text-gray-300">
                        {task.status}
                      </span>
                    </td>
                    <td className={`px-6 py-4 text-right text-sm font-medium
                      ${task.dueDate === 'Overdue' ? 'text-red-500' : 
                        task.dueDate === 'Today' ? 'text-orange-500' : 'text-gray-400'}`}
                    >
                      {task.dueDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
