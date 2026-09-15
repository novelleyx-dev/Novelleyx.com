import { EventEmitter } from 'events';

// Create a local event emitter to act as our queue
class IntakeQueue extends EventEmitter {}

export const intakeQueue = new IntakeQueue();

export interface IntakeData {
  name: string;
  email: string;
  company?: string;
  projectDetails: string;
  source?: string;
}

// Process the intake event
intakeQueue.on('process-intake', async (data: IntakeData) => {
  try {
    console.log(`[Intake Queue] Processing new intake for: ${data.name} (${data.email})`);
    
    // Simulate routing to a Slack/Discord webhook
    await simulateWebhookRouting(data);

    // Simulate generating an automated client receipt
    await generateAutomatedReceipt(data);

    console.log(`[Intake Queue] Successfully processed intake for: ${data.name}`);
  } catch (error) {
    console.error(`[Intake Queue] Error processing intake for ${data.name}:`, error);
  }
});

// Helper function to enqueue an intake
export const enqueueIntake = (data: IntakeData) => {
  console.log(`[Intake Queue] Enqueuing intake for: ${data.name}`);
  // Emit the event to be processed asynchronously
  intakeQueue.emit('process-intake', data);
};

// Simulated actions
async function simulateWebhookRouting(data: IntakeData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`[Webhook Alert] New Lead Received! Name: ${data.name}, Project: ${data.projectDetails}`);
      resolve(true);
    }, 500);
  });
}

async function generateAutomatedReceipt(data: IntakeData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`[Email Service] Sending automated receipt to: ${data.email}`);
      console.log(`[Email Service] Receipt Content: Hello ${data.name}, we have received your project details. We will be in touch shortly!`);
      resolve(true);
    }, 500);
  });
}
