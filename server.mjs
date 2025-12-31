import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { Resend } from "resend";
import cors from "cors";

dotenv.config();

// console.log("GEMINI:", process.env.GEMINI_API_KEY ? "OK" : "MISSING");
// console.log("RESEND:", process.env.RESEND_API_KEY ? "OK" : "MISSING");
// console.log("FROM:", process.env.FROM_EMAIL);






if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is missing");
}

const app = express();


// CORS middleware — allow all origins (for testing)
app.use(cors());

app.use(express.json());

const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);


// const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);
// async function testAPI() {
//   try {
//     // Simple call to list models — works with any valid key
//     const modelsList = await ai.models.list();
//     console.log("API works! Available models:");
//     modelsList.models.forEach(model => console.log("-", model.name));
//   } catch (err) {
//     console.error("API error:", err);
//   }
// }

// testAPI();



app.post("/send-letter", async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
Write a warm Christmas and New Year holiday letter/poem.

Recipient: ${name}
Tone: heartfelt, personal, slightly nostalgic
Write as a close friend.
Avoid clichés.
About 209–300 words.
End with a warm sign-off.
Do not include questions or suggestions.
`;

  const letter = (await model.generateContent(prompt)).response.text();

  await resend.emails.send({
    from: `Holiday Letters <${process.env.FROM_EMAIL}>`,
    to: email,
    subject: "A Holiday Letter Just for You 🎄",
    text: letter
  });

  res.json({ success: true });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});