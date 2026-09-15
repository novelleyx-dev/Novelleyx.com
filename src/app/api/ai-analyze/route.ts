import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ 
        success: false, 
        error: 'GEMINI_API_KEY is not set in the environment variables. Please add it to your .env file.' 
      }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const systemPrompt = `You are NOVELLEYX AI, the most powerful AI in the world, developed for Novelleyx. You can answer any question in the world brilliantly, similar to Gemini. 
If the user asks a general question, answer it directly and thoroughly in markdown format.
If the user's message is a brief/requirement to build a website, app, software, AI automation, or digital marketing campaign, YOU MUST output ONLY a valid JSON object (no markdown, no backticks) with this exact structure:
{
  "isBlueprint": true,
  "data": {
    "confidence": 95,
    "goal": "...",
    "problem": "...",
    "customer_type": "...",
    "recommended_services": ["Service 1", "Service 2", "Service 3"],
    "indicative_investment": "$50k - $120k",
    "next_step": "..."
  }
}
If it is a general question, output ONLY a valid JSON object (no markdown, no backticks) with this exact structure:
{
  "isBlueprint": false,
  "text": "Your brilliant answer to the question formatted in Markdown..."
}`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: systemPrompt + "\n\nUser Message: " + message }] }]
    });

    const responseText = result.response.text();
    
    let parsedResponse;
    try {
      const cleanText = responseText.replace(/```json/gi, '').replace(/```/g, '').trim();
      parsedResponse = JSON.parse(cleanText);
    } catch (e) {
      parsedResponse = {
        isBlueprint: false,
        text: responseText
      };
    }

    if (parsedResponse.isBlueprint) {
      return NextResponse.json({ success: true, isBlueprint: true, data: parsedResponse.data });
    } else {
      return NextResponse.json({ success: true, isBlueprint: false, text: parsedResponse.text });
    }

  } catch (error: any) {
    console.error("AI Analysis Error:", error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to process request' }, { status: 500 });
  }
}
