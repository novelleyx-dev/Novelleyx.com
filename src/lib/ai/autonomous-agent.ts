import { tool } from 'ai';
import { z } from 'zod';

// Define the tool using Vercel AI SDK's tool function
export const generate_sow_pdf = {
  description: 'Parses raw client briefs, checks project feasibility, and auto-generates a structured scope-of-work draft.',
  parameters: z.object({
    client_brief: z.string().describe('The raw text from the client describing their needs'),
    project_type: z.string().describe('The category of the project, e.g., Web Engineering, Mobile App, AI Integration'),
    budget_range: z.string().describe('The estimated budget range for the project'),
    feasibility_score: z.number().min(0).max(100).describe('A score from 0-100 indicating project feasibility'),
  }),
  execute: async ({ client_brief, project_type, budget_range, feasibility_score }: { client_brief: string, project_type: string, budget_range: string, feasibility_score: number }) => {
    // In a real scenario, this would trigger a background job to generate a PDF and return a URL.
    console.log(`[Autonomous Agent] Generating SOW PDF for brief: "${client_brief.substring(0, 30)}..."`);
    
    // Simulate generation delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      status: 'success',
      sow_id: `SOW-${Math.floor(Math.random() * 10000)}`,
      project_type,
      feasibility: feasibility_score >= 70 ? 'Feasible' : 'Review Required',
      
      // Fields expected by the UI Dashboard:
      confidence: feasibility_score,
      goal: `Execute a state-of-the-art ${project_type} aligned with core business objectives.`,
      problem: `Current infrastructure lacks optimization in ${project_type.toLowerCase()}, leading to efficiency and conversion bottlenecks.`,
      customer_type: 'Enterprise / High-Growth Startup',
      recommended_services: [
        'Architecture Diagnostic & Blueprinting',
        'Custom Cloud Integration',
        'UI/UX Heuristic Evaluation',
        'Automated CI/CD Pipeline Setup'
      ],
      indicative_investment: budget_range,
      next_step: 'Schedule Technical Deep-Dive',
      
      pdf_url: `https://novelleyx.com/sow-drafts/mock-draft-${Date.now()}.pdf`,
      message: 'Scope of Work draft auto-generated successfully based on the client brief.'
    };
  },
};
