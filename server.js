require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const { GoogleGenAI } = require("@google/genai");

const app = express();

// ===============================
// CORS Configuration
// ===============================
const corsOptions = {
    origin: "*", // GitHub Pages aur baaki sabhi domains allow karne ke liye
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(__dirname));

// Render provides PORT automatically. Local development uses 3000.
const PORT = process.env.PORT || 3000;

// ===============================
// Gemini AI Configuration
// ===============================
if (!process.env.GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY is missing.");
    process.exit(1);
}

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

// ===============================
// Health Check
// ===============================
app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        message: "CareerGuide AI backend is running."
    });
});

// ===============================
// Home Page
// ===============================
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// ===============================
// AI Chat API
// ===============================
app.post("/api/chat", async (req, res) => {
    try {
        const { message } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({
                error: "Please enter a message."
            });
        }

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: message.trim()
        });

        const reply = response.text;

        if (!reply) {
            return res.status(500).json({
                error: "Gemini returned an empty response."
            });
        }

        res.json({
            reply
        });

    } catch (error) {
        console.error("Gemini API Error:", error.message);

        res.status(500).json({
            error: "Sorry, I could not generate a response right now."
        });
    }
});

// ===============================
// Start Server
// ===============================
app.listen(PORT, "0.0.0.0", () => {
    console.log("======================================");
    console.log("   CareerGuide AI Server Started");
    console.log(`   Port: ${PORT}`);
    console.log("======================================");
});