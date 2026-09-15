'use client';

export const EVENTS = {
  PAGE_VIEW: 'PAGE_VIEW',
  SERVICE_VIEW: 'SERVICE_VIEW',
  BUNDLE_VIEW: 'BUNDLE_VIEW',
  AI_STARTED: 'AI_STARTED',
  AI_COMPLETED: 'AI_COMPLETED',
  APPRAISAL_STARTED: 'APPRAISAL_STARTED',
  APPRAISAL_SUBMITTED: 'APPRAISAL_SUBMITTED',
  CONTACT_SUBMITTED: 'CONTACT_SUBMITTED',
} as const;

export async function trackEvent(eventName: string, properties?: Record<string, any>) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    await fetch('/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event: eventName,
        properties,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (error) {
    console.error('Failed to track event:', error);
  }
}
