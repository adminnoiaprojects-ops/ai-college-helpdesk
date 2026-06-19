import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.warn("VITE_GEMINI_API_KEY is not set in the environment variables.");
}

// Initialize the Google Generative AI SDK
const genAI = new GoogleGenerativeAI(apiKey || "dummy-key-to-prevent-crash");

// The system prompt gives the AI its persona and constraints
const systemPrompt = `You are the official Noia AI College Helpdesk Assistant. 
You answer queries about college admissions, hostel fees, semester examinations, and corporate placement drives. 
Keep your answers helpful, concise, and professional. 
If asked about something unrelated, politely steer the conversation back to college topics.`;

/**
 * Generates a response from the Gemini AI model.
 * @param {string} prompt - The user's input message.
 * @returns {Promise<string>} The generated text response.
 */
export const generateResponse = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: systemPrompt 
    });
    
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error generating Gemini response:", error);
    return "I'm sorry, I am currently experiencing connection issues and cannot process your request. Please try again later.";
  }
};
