import { GoogleGenAI } from "@google/genai";
import { PROPERTIES } from "../constants";

const apiKey = process.env.API_KEY;
// Initialize securely - assumes process.env.API_KEY is available
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateAssistantResponse = async (
  history: { role: 'user' | 'model'; text: string }[],
  newMessage: string,
  language: 'en' | 'ar'
): Promise<string> => {
  if (!ai) {
    return language === 'ar' 
      ? "وضع العرض: مفتاح API مفقود."
      : "Demo Mode: API Key missing. Please configure the environment to chat with the AI.";
  }

  const model = "gemini-2.5-flash";
  
  // Construct a context-aware system instruction
  const inventoryContext = JSON.stringify(PROPERTIES.map(p => ({
    name: p.name,
    location: p.location,
    rooms: p.rooms,
    price: p.pricePerNight,
    type: p.type,
    guests: p.maxGuests
  })));

  const systemInstruction = `
    You are 'EstateBot', a smart assistant for the EstateFlow asset management platform.
    Your goal is to help users find the best accommodation based on their preferences (rooms, duration, guests, budget, purpose).
    
    Current Language: ${language === 'ar' ? 'Arabic' : 'English'}.
    YOU MUST RESPOND IN ${language === 'ar' ? 'ARABIC' : 'ENGLISH'}.
    
    Here is the current list of available units/properties:
    ${inventoryContext}

    Rules:
    1. Be polite, professional, and helpful.
    2. If a user asks for a recommendation, analyze their needs against the available units list.
    3. If no unit matches perfectly, suggest the closest option.
    4. You can calculate total price if duration is mentioned (Price * Nights).
    5. The currency is SAR (Saudi Riyal).
    6. Mention that to complete a booking, we need: Full Name (3 parts), Address, and Contact Number.
    7. Mention we accept: Apple Pay, Mada, Visa, STC Pay.
    
    Keep responses concise (under 150 words) unless detailed info is requested.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: [
        ...history.map(msg => ({
          role: msg.role,
          parts: [{ text: msg.text }]
        })),
        {
          role: 'user',
          parts: [{ text: newMessage }]
        }
      ],
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || (language === 'ar' ? "عذراً، لا يمكنني الرد الآن." : "I'm sorry, I couldn't generate a response at this time.");
  } catch (error) {
    console.error("Gemini API Error:", error);
    return language === 'ar' ? "أواجه مشكلة تقنية حالياً." : "I am currently experiencing technical difficulties. Please try again later.";
  }
};