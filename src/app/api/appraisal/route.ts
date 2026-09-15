import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate required fields
    if (!body.name || !body.email || !body.customerType || !body.problem) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Missing required appraisal fields.' } },
        { status: 400 }
      );
    }

    // In a real app, save to database
    console.log('Appraisal submission received:', body);

    return NextResponse.json({
      success: true,
      data: { 
        id: crypto.randomUUID(), 
        message: 'Appraisal received. Our team will contact you shortly.' 
      }
    });
  } catch (error) {
    console.error('Appraisal API error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred.' } },
      { status: 500 }
    );
  }
}
