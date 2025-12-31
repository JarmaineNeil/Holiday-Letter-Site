

import dotenv from "dotenv";
dotenv.config();

  if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is missing");
}

export async function POST(req) {
  const { name, email } = await req.json();

  if (!name || !email) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
Write a warm Christmas and New Year holiday letter/ poem.

Recipient: ${name}
Tone: heartfelt, personal, slightly nostalgic

Write as a close friend.
Avoid clichés.
About 209-300 words.
End with a warm sign-off.
Do not include questions or suggestions about the prompt, reply with just the answer.
`;

  const letter = (await model.generateContent(prompt))
    .response.text();

  await resend.emails.send({
    from: `Holiday Letters <${process.env.FROM_EMAIL}>`,
    to: email,
    subject: "A Holiday Letter Just for You 🎄",
    text: letter
  });

  return Response.json({ success: true });
}

// import { GoogleGenAI } from "@google/genai";
// import { Resend } from "resend";

//GET NAME AND EMAIL
// export async function POST(req) {
//   const { name, email } = await req.json();

//     if (!name || !email) {
//     return Response.json({ error: "Missing fields" }, { status: 400 });
//   }



// const ai = new GoogleGenAI(process.env.GEMINI_API_KEY); 
// const resend = new Resend(process.env.RESEND_API_KEY);

// async function main() {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: "Write an email for coworker pointing out random facts",
//   });

//   await resend.emails.send({
//   from: "Neil <onboarding@yourdomain.com>",
//   to: ["friend@email.com"],
//   subject: "Happy Holidays 🎄",
//   html: "<p>This is a test email</p>",
// });

//   console.log(response.text);
// }

// await main();

