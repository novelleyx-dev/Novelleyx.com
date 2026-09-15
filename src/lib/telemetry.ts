/**
 * NOVELLEYX Telemetry & Observability
 * 
 * This module provides a unified interface for telemetry and tracking, mimicking
 * services like Sentry for error tracking and PostHog for event analytics.
 * In a production environment, these functions would hook into real services
 * to monitor API latency, diagnostic drop-offs, and user behavior.
 */

interface TelemetryConfig {
  apiKey: string;
  environment: string;
  enablePerformanceMonitoring?: boolean;
}

interface EventProperties {
  [key: string]: string | number | boolean | null;
}

/**
 * Initializes the telemetry services.
 * Would hook into real services like Sentry.init() or posthog.init() here.
 */
export const initTelemetry = (config: TelemetryConfig): void => {
  console.log(`[Telemetry] Initialized for environment: ${config.environment}`);
  if (config.enablePerformanceMonitoring) {
    console.log('[Telemetry] Performance monitoring enabled.');
  }
};

/**
 * Tracks a custom event.
 * Would be sent to PostHog, Mixpanel, or custom analytics backend.
 * 
 * @param eventName Name of the event to track (e.g., 'sow_generated', 'api_latency_high')
 * @param properties Additional properties associated with the event
 */
export const trackEvent = (eventName: string, properties?: EventProperties): void => {
  // In a real application: posthog.capture(eventName, properties);
  console.log(`[Telemetry/Event] ${eventName}`, properties || {});
};

/**
 * Captures an error or exception.
 * Would be sent to Sentry, DataDog, etc.
 * 
 * @param error The Error object or message
 * @param context Additional context where the error occurred
 */
export const captureError = (error: Error | string, context?: Record<string, any>): void => {
  // In a real application: Sentry.captureException(error, { extra: context });
  console.error(`[Telemetry/Error] Captured error:`, error);
  if (context) {
    console.error(`[Telemetry/Error] Context:`, context);
  }
};
