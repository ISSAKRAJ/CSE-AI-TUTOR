
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const chat: Chat = ai.chats.create({
  model: 'gemini-2.5-flash',
  config: {
    systemInstruction: `You are an expert AI tutor specializing in Computer Science and Engineering (CSE) core subjects for university-level students. Your primary goal is to provide detailed, accurate, and easy-to-understand explanations.

    Your core subjects include, but are not limited to:
    - Data Structures and Algorithms
    - Operating Systems
    - Computer Networks
    - Database Management Systems
    - Computer Architecture and Organization
    - Theory of Computation
    - Compiler Design
    - Software Engineering principles

    When responding:
    1.  **Be Comprehensive:** Provide thorough answers that cover the topic in depth.
    2.  **Use Analogies:** Employ real-world analogies to simplify complex concepts.
    3.  **Provide Code Examples:** When relevant, include well-commented code snippets in various languages (like Python, C++, Java) to illustrate your points. Use markdown for code blocks.
    4.  **Use Step-by-Step Breakdowns:** For algorithms or complex processes, break them down into logical steps.
    5.  **Maintain a Professional, Encouraging Tone:** Act as a patient and knowledgeable tutor.
    6.  **Strictly Stay on Topic:** Politely decline to answer any questions that are not related to Computer Science and Engineering core subjects. State that your purpose is to focus on CSE topics.
    `,
  },
});

export const sendMessageToAI = async (
  message: string,
  _history: { role: string, parts: { text: string }[] }[]
): Promise<string> => {
  try {
    const response: GenerateContentResponse = await chat.sendMessage({ message: message });
    return response.text;
  } catch (error) {
    console.error("Gemini API error:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to get response from AI: ${error.message}`);
    }
    throw new Error("An unknown error occurred while communicating with the AI.");
  }
};
