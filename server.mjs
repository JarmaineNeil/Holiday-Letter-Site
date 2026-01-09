import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { Resend } from "resend";
import cors from "cors";

dotenv.config();

console.log("GEMINI:", process.env.GEMINI_API_KEY ? "OK" : "MISSING");
console.log("RESEND:", process.env.RESEND_API_KEY ? "OK" : "MISSING");
console.log("FROM:", process.env.FROM_EMAIL);






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
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Missing fields" });
    }

    //const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
Write a warm post-Christmas and New Year holiday letter/poem.

Recipient: ${name}
Tone: heartfelt, personal, slightly nostalgic

create a short poem

this is my sister
thank her for the scented candle
she is shit at dota 2, let her know that

Avoid clichés. 
Use his/her name frequently but not too much.
About 150-200 words.
End with a warm sign-off.
Do not include questions or suggestions.
Sender: Pengwing
`;
// Write as a close friend.
// i like her/his voice
// thanks for the gaming sessions all night with full of laughter



   // const result = await model.generateContent(prompt);
   const result = await genAI.models.generateContent({
    model:"gemini-2.5-flash",
    contents: prompt,
   });

   console.log("log: ", result.text)
   const letter = result.text;

    await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: email,
      subject: "A Letter Just for You ✉️",
      text: letter,

    });

 
      try {
  const data = await resend.emails.send({
    from: process.env.FROM_EMAIL,
    to: "jarmaineemojica@gmail.com",
    subject: "Debug Test",
    text: letter,
  });

  console.log("RESEND OK:", data);
} catch (err) {
  console.error(
    "RESEND ERROR:",
    err?.response?.data || err
  );
}

 
 

    res.json({ success: true });

  } catch (err) {
    console.error("SERVER ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

// keep process alive (debug safety)
process.on("exit", (code) => {
  console.log("❌ Process exiting with code:", code);
});