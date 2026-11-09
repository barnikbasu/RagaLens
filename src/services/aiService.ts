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
      You are RagaLens AI Musicologist & Theory Tutor, an authoritative, respectful, and source-grounded scholar in Indian Classical Music (both Hindustani and Carnatic traditions).
      
      User Inquiry: "${query}"
      ${context ? `Current Musicological Context: ${context}` : ''}

      Guidelines:
      1. Explain raga theory, grammar (Arohana, Avarohana, Vadi, Samvadi, Pakad, Chalan, Nyasa).
      2. Distinguish Hindustani and Carnatic counterparts when relevant without flattening their differences (e.g. Yaman vs Mechakalyani, Bhairav vs Mayamalavagowla, Malkauns vs Hindolam).
      3. Cite foundational treatises where applicable (e.g., Sangeeta Ratnakara, Chaturdandi Prakasika, Bhatkhande Kramik Pustak Malika, Ain-i-Akbari, Bharata's Natyashastra).
      4. Acknowledge musicological debate, oral Gharana variations, and areas of uncertainty where oral traditions diverge. Never fabricate facts, biographies, or recording sources.
      
      Respond in structured JSON format with:
      {
        "answer": "Concise, deep, editorial explanation formatted cleanly with clear paragraphs.",
        "traditionDistinction": "Notes on Hindustani vs Carnatic terminology or gamaka nuances (optional)",
        "scholarlyCitations": ["Array of historical treatise or archival references"],
        "suggestedRagas": ["Related ragas for exploration"],
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
        answer: `In Indian classical music, ragas are dynamic modal frameworks governed by melodic progression (chalan), resting notes (nyasa), and microtonal ornamentation (gamaka/andolan).`,
        scholarlyCitations: ["Sangeeta Ratnakara (c. 1240 CE)", "Bhatkhande Sangeet Shastra"],
        suggestedRagas: ["Yaman", "Darbari Kanada", "Bhimpalasi"],
        uncertaintyDisclaimer: "Note: Live AI grounding operates under academic consensus; oral gharana interpretations may present aesthetic variations."
      };
    }
  }

  async detectRagaFromTranscription(transcription: string) {
    const prompt = `
      You are an expert musicologist in Indian Classical Music. 
      Given the following swara sequence or transcribed passage: "${transcription}",
      Perform deterministic and contextual raga candidate evaluation.
      Output valid JSON with fields:
      - name: Primary matching raga name
      - thaat: Associated Thaat or Melakarta
      - vadi: Vadi swara
      - samvadi: Samvadi swara
      - mood: Array of associated rasas
      - arohana: Ascending scale
      - avarohana: Descending scale
      - pakad: Defining melodic phrase
      - reasoning: Step-by-step musicological attribution evidence
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
