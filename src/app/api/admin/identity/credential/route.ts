import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST: Manage credential lifecycle (Revoke, Suspend, Activate)
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { action, credentialId, reason } = data; // action: 'REVOKE', 'SUSPEND', 'ACTIVATE'

    if (!action || !credentialId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const credential = await prisma.employeeCredential.findUnique({
      where: { credentialPublicId: credentialId }
    });

    if (!credential) {
      return NextResponse.json({ error: 'Credential not found' }, { status: 404 });
    }

    let updatedData: any = {};

    switch (action) {
      case 'REVOKE':
        updatedData = {
          status: 'REVOKED',
          revokedAt: new Date(),
          revocationReason: reason || 'Revoked by admin'
        };
        break;
      case 'SUSPEND':
        updatedData = {
          status: 'SUSPENDED'
        };
        break;
      case 'ACTIVATE':
        updatedData = {
          status: 'ACTIVE',
          activatedAt: new Date()
        };
        break;
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    const updatedCredential = await prisma.employeeCredential.update({
      where: { credentialPublicId: credentialId },
      data: updatedData
    });

    return NextResponse.json({
      success: true,
      data: updatedCredential
    });

  } catch (error) {
    console.error('Error updating credential:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
