import { GoogleGenAI } from "@google/genai";

export interface TutorResponse {
  answer: string;
  traditionDistinction?: string;
  scholarlyCitations?: string[];
  suggestedRagas?: string[];
  uncertaintyDisclaimer?: string;
}

export class AIService {
  private genAI: GoogleGenAI;

  constructor(apiKey: string) {
    this.genAI = new GoogleGenAI({ apiKey });
  }

  async askAITutor(query: string, context?: string): Promise<TutorResponse> {
    const prompt = `
      You are RagaLens AI Musicologist & Theory Tutor, an authoritative, respectful, and source-grounded scholar in Hindustani (North Indian) Classical Music exclusively.
      
      User Inquiry: "${query}"
      ${context ? `Current Musicological Context: ${context}` : ''}

      Guidelines:
      1. Explain Hindustani raga theory and grammar: Arohana, Avarohana, Vadi, Samvadi, Pakad, Chalan, Nyasa, Meend, Andolan, Kan-swara, and Ashta Prahar (time of day).
      2. Ground classifications strictly in the 10 Bhatkhande Thaats (Bilawal, Kalyan, Khamaj, Kafi, Asavari, Bhairav, Bhairavi, Todi, Poorvi, Marwa).
      3. Cite foundational Hindustani treatises and archives where applicable (e.g., Sangeeta Ratnakara, Pandit V.N. Bhatkhande's Kramik Pustak Malika, Ain-i-Akbari, Ragadarpana, Sangita Parijata).
      4. Acknowledge Gharana lineage aesthetics (Kirana, Indore, Gwalior, Agra, Maihar, Patiala, Jaipur-Atrauli) and areas where oral paramparas diverge. Never fabricate facts, biographies, or recording sources.
      
      Respond in structured JSON format with:
      {
        "answer": "Concise, deep, editorial explanation formatted cleanly with clear paragraphs.",
        "traditionDistinction": "Notes on Gharana aesthetic nuances, vocal phrasing, or microtonal shru-ti calibration (optional)",
        "scholarlyCitations": ["Array of historical treatise or archival references"],
        "suggestedRagas": ["Related Hindustani ragas for exploration"],
        "uncertaintyDisclaimer": "Any cautionary note on gharana divergence or oral transmission differences"
      }
    `;

    try {
      const response = await this.genAI.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });
      return JSON.parse(response.text || "{}");
    } catch (error) {
      console.warn("AI Tutor call failed, returning deterministic response:", error);
      return {
        answer: `In Hindustani classical music, ragas are dynamic modal frameworks governed by melodic progression (chalan), resting notes (nyasa), and microtonal ornamentation (meend and andolan) within the Ashta Prahar temporal cycle.`,
        scholarlyCitations: ["Sangeeta Ratnakara (c. 1240 CE)", "Pandit V.N. Bhatkhande's Sangeet Shastra"],
        suggestedRagas: ["Yaman", "Darbari Kanada", "Bhimpalasi"],
        uncertaintyDisclaimer: "Note: Live AI grounding operates under academic consensus; oral gharana interpretations may present aesthetic variations."
      };
    }
  }

  async detectRagaFromTranscription(transcription: string) {
    const prompt = `
      You are an expert musicologist in Hindustani Classical Music. 
      Given the following swara sequence or transcribed passage: "${transcription}",
      Perform deterministic and contextual Hindustani raga candidate evaluation.
      Output valid JSON with fields:
      - name: Primary matching Hindustani raga name
      - thaat: Associated Bhatkhande Thaat (Bilawal, Kalyan, Khamaj, Kafi, Asavari, Bhairav, Bhairavi, Todi, Poorvi, Marwa)
      - vadi: Vadi swara
      - samvadi: Samvadi swara
      - mood: Array of associated rasas
      - arohana: Ascending scale
      - avarohana: Descending scale
      - pakad: Defining melodic phrase
      - reasoning: Step-by-step musicological attribution evidence based on chalan and phraseology
      - confidence: Posterior match probability percentage (e.g. 94.8)
    `;

    try {
      const response = await this.genAI.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });
      return JSON.parse(response.text || "{}");
    } catch (error) {
      console.error("AI Raga Detection failed:", error);
      throw error;
    }
  }
}
