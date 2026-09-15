import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { CredentialManager } from '@/lib/identity/credentialManager';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Validate request data (basic validation for MVP)
    if (!data.fullName || !data.designation || !data.department || !data.joiningDate || !data.employmentType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Generate Employee ID
    // Find the latest employee to increment the ID
    const latestEmployee = await prisma.employee.findFirst({
      orderBy: { employeeId: 'desc' },
    });
    
    const nextEmployeeId = CredentialManager.generateEmployeeId(latestEmployee?.employeeId);

    // 2. Generate Secure Credential
    const credentialPublicId = CredentialManager.generateCredentialPublicId();
    const credentialHash = CredentialManager.hashCredential(credentialPublicId);

    // 3. Create Employee and Credential in Database
    const newEmployee = await prisma.employee.create({
      data: {
        employeeId: nextEmployeeId,
        fullName: data.fullName,
        designation: data.designation,
        role: data.role || 'TEAM_MEMBER',
        department: data.department,
        joiningDate: new Date(data.joiningDate),
        employmentType: data.employmentType,
        profilePhoto: data.profilePhoto,
        email: data.email,
        phone: data.phone,
        status: 'ACTIVE',
        credentials: {
          create: {
            credentialPublicId: credentialPublicId,
            credentialHash: credentialHash,
            status: 'ACTIVE',
            activatedAt: new Date(), // Automatically activated for this MVP
          }
        }
      },
      include: {
        credentials: true
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        employee: newEmployee,
        // Send back the credential Public ID so it can be used for QR/Barcode generation
        credentialId: credentialPublicId 
      }
    });

  } catch (error) {
    console.error('Error creating employee:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
