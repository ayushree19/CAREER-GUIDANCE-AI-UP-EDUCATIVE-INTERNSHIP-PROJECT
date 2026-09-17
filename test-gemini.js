console.log("TEST FILE STARTED");

require("dotenv").config();

console.log("DOTENV LOADED");

const { GoogleGenAI } = require("@google/genai");

console.log("GOOGLE GENAI LOADED");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

console.log("AI OBJECT CREATED");

async function testGemini() {
    try {
        console.log("Testing Gemini...");

        const response = await ai.models.generateContent({
            model: "gemini-3.6-flash",
            contents: "Say hello in one sentence."
        });

        console.log("SUCCESS!");
        console.log(response.text);

    } catch (error) {
        console.error("ERROR:");
        console.error(error);
    }
}

testGemini();