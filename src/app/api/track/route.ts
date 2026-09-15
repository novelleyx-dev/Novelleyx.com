import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Just log analytics events for now
    console.log('Tracking Event:', body.event, body.properties, body.timestamp);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    // Silently handle errors for analytics so we don't break the client
    return NextResponse.json({ success: true });
  }
}
