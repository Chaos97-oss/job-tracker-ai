import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { description } = await req.json();

  if (!description) {
    return NextResponse.json({ error: "Missing job description." }, { status: 400 });
  }

  const prompt = `
You are an AI resume coach. From the job description below, respond ONLY with valid JSON.

Return exactly:
{
  "summary": "a short summary here",
  "skills": ["Skill 1", "Skill 2", "Skill 3"]
}

Do not include any explanation or commentary. Just respond with JSON.

Job Description:
"${description}"
`;

  const chat = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    {
      role: "system",
      content: "Respond only with valid JSON. No explanations or markdown. JSON only.",
    },
    {
      role: "user",
      content: prompt,
    },
  ],
});

console.log("✅ GPT RAW RESPONSE OBJECT >>>", chat); // FULL response

let raw = chat.choices[0].message.content || "";
console.log("🧠 GPT MESSAGE CONTENT >>>", raw);
}
