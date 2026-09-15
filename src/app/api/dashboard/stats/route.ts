import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [
      projectCount,
      activeProjectCount,
      taskCount,
      todayTaskCount,
      appraisalCount,
      readyAppraisalCount,
      customerCount,
      leadCount,
      serviceCount,
      employeeCount,
      totalRevenue,
      pipelineValue,
    ] = await Promise.all([
      prisma.project.count(),
      prisma.project.count({ where: { status: 'ACTIVE' } }),
      prisma.task.count(),
      prisma.task.count({ where: { status: { in: ['TODO', 'IN_PROGRESS'] } } }),
      prisma.appraisal.count(),
      prisma.appraisal.count({ where: { status: { in: ['PENDING', 'IN_REVIEW'] } } }),
      prisma.customer.count(),
      prisma.lead.count(),
      prisma.serviceCategory.count(),
      prisma.employee.count({ where: { status: 'ACTIVE' } }),
      prisma.appraisal.aggregate({ where: { status: 'COMPLETED' }, _sum: { totalAmount: true } }),
      prisma.appraisal.aggregate({ where: { status: { in: ['PENDING', 'IN_REVIEW'] } }, _sum: { totalAmount: true } }),
    ]);

    return NextResponse.json({
      projects: { total: projectCount, active: activeProjectCount },
      tasks: { total: taskCount, today: todayTaskCount },
      appraisals: { total: appraisalCount, ready: readyAppraisalCount },
      customers: { total: customerCount },
      leads: { total: leadCount },
      services: { pillars: serviceCount },
      employees: { active: employeeCount },
      revenue: {
        actual: totalRevenue._sum.totalAmount || 0,
        pipeline: pipelineValue._sum.totalAmount || 0,
      },
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
