import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  organization: z.string().optional(),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const appraisalFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(1, 'Phone is required'),
  customerType: z.enum(['STARTUP', 'ENTERPRISE', 'INDIVIDUAL', 'OTHER']),
  serviceCategory: z.string().optional(),
  problem: z.string().min(20, 'Please describe your problem in at least 20 characters'),
  currentSituation: z.string().optional(),
  desiredOutcome: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  existingTechnology: z.string().optional(),
  additionalRequirements: z.string().optional(),
});

export const aiMessageSchema = z.object({
  sessionId: z.string(),
  message: z.string().min(1, 'Message cannot be empty'),
});
