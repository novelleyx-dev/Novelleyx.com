import { NextResponse } from 'next/server';
import { enqueueIntake, IntakeData } from '@/lib/queue/intake-queue';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Basic validation to simulate an external webhook payload
    if (!body.name || !body.email || !body.projectDetails) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, or projectDetails' },
        { status: 400 }
      );
    }

    const intakeData: IntakeData = {
      name: body.name,
      email: body.email,
      company: body.company,
      projectDetails: body.projectDetails,
      source: body.source || 'webhook',
    };

    // Push data into the intake-queue
    enqueueIntake(intakeData);

    return NextResponse.json({
      success: true,
      message: 'Intake received and queued successfully',
    }, { status: 202 }); // 202 Accepted, indicating it's processing asynchronously
  } catch (error) {
    console.error('[Webhook Error]:', error);
    return NextResponse.json(
      { error: 'Internal server error processing webhook' },
      { status: 500 }
    );
  }
}
