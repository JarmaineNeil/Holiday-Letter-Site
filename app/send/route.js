// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST(req) {
//   const { name, email } = await req.json();

//   if (!name || !email) {
//     return Response.json({ error: "Missing fields" }, { status: 400 });
//   }

//   const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//   const prompt = `
// Write a warm Christmas holiday letter.

// Recipient: ${name}
// Tone: heartfelt, personal, slightly nostalgic

// Write as a close friend.
// Avoid clichés.
// About 150–180 words.
// End with a warm sign-off.
// `;

//   const letter = (await model.generateContent(prompt))
//     .response.text();

//   await resend.emails.send({
//     from: `Holiday Letters <${process.env.FROM_EMAIL}>`,
//     to: email,
//     subject: "A Holiday Letter Just for You 🎄",
//     text: letter
//   });

//   return Response.json({ success: true });
// }
