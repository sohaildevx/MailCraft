import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OpenAI API key not configured. Add OPENAI_API_KEY to .env.local" },
      { status: 500 }
    );
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

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
      { error: "Company name, job role, and purpose are required" },
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
        { error: "AI returned empty response. Try again." },
        { status: 500 }
      );
    }

    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch {
      return NextResponse.json(
        { error: "AI returned invalid format. Try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      subject: parsed.subject || subjectLine || `${emailType}: ${whatApplyingFor} at ${companyName}`,
      body: parsed.body || "",
    });
  } catch (error: unknown) {
    console.error("OpenAI error:", error);

    if (error instanceof OpenAI.APIError) {
      const status = error.status;
      if (status === 401) {
        return NextResponse.json(
          { error: "Invalid API key. Check your OPENAI_API_KEY in .env.local" },
          { status: 401 }
        );
      }
      if (status === 429) {
        return NextResponse.json(
          { error: "Rate limited. Wait a moment and try again." },
          { status: 429 }
        );
      }
      if (status === 503) {
        return NextResponse.json(
          { error: "OpenAI is overloaded. Try again in a few seconds." },
          { status: 503 }
        );
      }
    }

    return NextResponse.json(
      { error: "Something went wrong. Try again." },
      { status: 500 }
    );
  }
}
