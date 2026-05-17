import { GoogleGenAI } from "@google/genai";

// Note: This service is intended for server-side usage in server.ts
// to protect the API key.
export class AIService {
  private genAI: GoogleGenAI;

  constructor(apiKey: string) {
    this.genAI = new GoogleGenAI({ apiKey });
  }

  async detectRagaFromTranscription(transcription: string) {
    const prompt = `
      You are an expert in Indian Classical Music. 
      Given the following swara transcription: "${transcription}",
      Identify the raga, its thaat, vadi, samvadi, and mood.
      Output format: JSON with fields: name, thaat, vadi, samvadi, mood (array), arohana, avarohana, pakad.
    `;

    try {
      const response = await this.genAI.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt
      });
      return JSON.parse(response.text || "{}");
    } catch (error) {
      console.error("AI Raga Detection failed:", error);
      throw error;
    }
  }

  async giveRiyazFeedback(targetRaga: string, userSwaras: string) {
    const prompt = `
      The student is practicing Raga ${targetRaga}.
      Their sung swaras are: ${userSwaras}.
      Provide constructive feedback on their pitch accuracy and raga adherence.
      Be encouraging but precise.
    `;

    try {
      const response = await this.genAI.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt
      });
      return response.text;
    } catch (error) {
      console.error("AI Feedback failed:", error);
      throw error;
    }
  }
}
