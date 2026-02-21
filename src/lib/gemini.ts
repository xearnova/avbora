import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateSoloResponse = async (message: string, history: { role: string, content: string }[]) => {
  const model = ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      ...history.map(h => ({ role: h.role === 'user' ? 'user' : 'model', parts: [{ text: h.content }] })),
      { role: 'user', parts: [{ text: message }] }
    ],
    config: {
      systemInstruction: "You are Solo, the AI assistant for Avbora. Avbora is a platform that helps store owners track why customers didn't buy. If the user asks for customer service or human support, tell them you are transferring them and provide the WhatsApp link: https://wa.me/201515794174. Keep responses professional and helpful.",
    }
  });

  const response = await model;
  return response.text;
};
