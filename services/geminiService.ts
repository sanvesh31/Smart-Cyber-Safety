
import { GoogleGenAI, Type } from "@google/genai";
import { SafetyStatus, ScanResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeMessage = async (message: string): Promise<ScanResult> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze the following message for cyber threats, phishing attempts, or fraudulent patterns. Determine if it is safe or dangerous.
      
      Message: "${message}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            status: {
              type: Type.STRING,
              description: "Must be one of SAFE, SUSPICIOUS, or DANGEROUS",
            },
            score: {
              type: Type.NUMBER,
              description: "Threat score from 0 (safe) to 100 (lethal threat)",
            },
            threats: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of identified threats (e.g., 'URL spoofing', 'Urgency tactic')",
            },
            recommendation: {
              type: Type.STRING,
              description: "What the user should do immediately",
            },
            explanation: {
              type: Type.STRING,
              description: "Simple explanation of why this was flagged",
            }
          },
          required: ["status", "score", "threats", "recommendation", "explanation"]
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    return {
      status: result.status as SafetyStatus,
      score: result.score,
      threats: result.threats,
      recommendation: result.recommendation,
      explanation: result.explanation
    };
  } catch (error) {
    console.error("Gemini analysis error:", error);
    return {
      status: SafetyStatus.UNKNOWN,
      score: 0,
      threats: [],
      recommendation: "Unable to analyze at this time. Exercise caution.",
      explanation: "There was an error communicating with the safety server."
    };
  }
};
