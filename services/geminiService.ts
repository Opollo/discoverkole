
import { GoogleGenAI, Chat } from "@google/genai";

// This is a placeholder for the API key.
// In a real-world scenario, this should be handled securely.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a production environment, you might want to handle this more gracefully.
  // For this example, we'll throw an error.
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const model = 'gemini-2.5-flash';

const systemInstruction = "You are a helpful and friendly AI assistant for the Kole District Local Government in Uganda. You are tasked with handling challenges and providing quick, accurate responses to citizen inquiries regarding local services (like waste management, road maintenance, public health), business permits, local taxes, community events, and general information about the district. Be professional, polite, concise, and informative. If you do not know an answer, say that you cannot provide that information at this time and suggest contacting the district office directly.";

export function createChatSession(): Chat {
  const chat: Chat = ai.chats.create({
    model: model,
    config: {
      systemInstruction: systemInstruction,
    },
  });
  return chat;
}
