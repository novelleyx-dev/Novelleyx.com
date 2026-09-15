import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Basic validation
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Name, email, and message are required.' } },
        { status: 400 }
      );
    }

    // In a real application, you would send an email or save to a database here
    console.log('Contact form submission received:', body);

    return NextResponse.json({
      success: true,
      data: { message: 'Your message has been received successfully.' }
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred.' } },
      { status: 500 }
    );
  }
}
