import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const body = await req.json();

  const {
    companyName,
    hiringManager,
    jobRole,
    emailType,
    tone,
    whatApplyingFor,
    subjectLine,
    jobDescription,
    additionalContext,
  } = body;

  if (!companyName || !jobRole || !whatApplyingFor) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const systemPrompt = `You are MailCraft, an expert AI email writer. Write a ${tone.toLowerCase()} ${emailType.toLowerCase()} email.

Rules:
- Output ONLY valid JSON: {"subject": "...", "body": "..."}
- Subject line: ${subjectLine ? `Use this exact subject: "${subjectLine}"` : "Generate a compelling, concise subject line"}
- Tone: ${tone}
- Email type: ${emailType}
- No markdown, no code fences, just raw JSON
- The body should be well-structured with proper paragraphs
- Sign off professionally (no name needed, the user will add it later)`;

  const userPrompt = `Write an email for:

Company: ${companyName}
Role: ${jobRole}
${hiringManager ? `Recipient: ${hiringManager}` : ""}
Purpose: ${whatApplyingFor}
${jobDescription ? `Job Description:\n${jobDescription}` : ""}
${additionalContext ? `Additional Context:\n${additionalContext}` : ""}`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = completion.choices[0]?.message?.content?.trim();

    if (!content) {
      return NextResponse.json(
        { error: "No response from AI" },
        { status: 500 }
      );
    }

    const parsed = JSON.parse(content);

    return NextResponse.json({
      subject: parsed.subject || subjectLine || `${emailType}: ${whatApplyingFor} at ${companyName}`,
      body: parsed.body || "",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("OpenAI error:", error.message);
    }
    return NextResponse.json(
      { error: "Failed to generate email" },
      { status: 500 }
    );
  }
}
