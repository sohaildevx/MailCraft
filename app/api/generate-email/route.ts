import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import OpenAI from "openai";

const PLAN_CREDITS: Record<string, number> = {
  free: 10,
  pro: 100,
  team: 500,
};


const USAGE_LIMITS_ENABLED = false;

function createClient(req: NextRequest) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll() {},
      },
    }
  );
}

export async function POST(req: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OpenAI API key not configured. Add OPENAI_API_KEY to .env.local" },
      { status: 500 }
    );
  }

  const supabase = createClient(req);
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  
  if (USAGE_LIMITS_ENABLED) {
    const lastReset = new Date(profile.credits_reset_at);
    const now = new Date();
    const daysSinceReset = Math.floor((now.getTime() - lastReset.getTime()) / (1000 * 60 * 60 * 24));

    if (daysSinceReset >= 30) {
      await supabase
        .from("profiles")
        .update({
          subscription_tier: "free",
          credits: 10,
          credits_reset_at: now.toISOString(),
          subscription_status: "inactive",
        })
        .eq("id", user.id);
      profile.subscription_tier = "free";
      profile.credits = 10;
    }
  }

  
  if (USAGE_LIMITS_ENABLED && profile.credits <= 0) {
    return NextResponse.json(
      { error: "No credits left. Upgrade your plan to generate more emails." },
      { status: 403 }
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

  const profileContext = profile
    ? [
        "\nUser Profile:",
        `- Name: ${profile.name || "Unknown"}`,
        `- Job Title: ${profile.job_title || "Unknown"}`,
        `- Experience Level: ${profile.experience_level || "Unknown"}`,
        `- Tech Stack: ${profile.tech_stack || "Unknown"}`,
        `- Projects: ${profile.projects || "None"}`,
        ...(profile.github_url ? [`- GitHub: ${profile.github_url}`] : []),
        ...(profile.portfolio_url ? [`- Portfolio: ${profile.portfolio_url}`] : []),
      ].join("\n")
    : "";

  const systemPrompt = `You are MailCraft, an expert AI email writer. Write a ${tone.toLowerCase()} ${emailType.toLowerCase()} email.

Rules:
- Output ONLY valid JSON: {"subject": "...", "body": "..."}
- Subject line: ${subjectLine ? `Use this exact subject: "${subjectLine}"` : "Generate a compelling, concise subject line"}
- Tone: ${tone}
- Email type: ${emailType}
- No markdown, no code fences, just raw JSON
- The email body must be plain text only: no markdown link syntax, no asterisks, no hashtags. Write URLs as raw https:// links — email clients make them clickable automatically.
- The body should be well-structured with proper paragraphs
- Sign off professionally${profile?.name ? ` as ${profile.name}` : " (no name needed, the user will add it later)"}
- IMPORTANT — skill source: The ONLY technologies you may present as the user's skills are the ones in the profile's Tech Stack line. The Job Description describes the ROLE, never the candidate: if it mentions Django, React, AWS, PostgreSQL or anything else that is not in the Tech Stack line, do not claim it, do not imply it, and do not infer skills from adjacent ones (Python does not imply Django). Technologies from the Job Description may be acknowledged only as something the user wants to learn, never as experience.
- IMPORTANT — stack coverage: The Tech Stack line may contain many technologies — read ALL of them before writing. Choose 2-4 that best fit THIS role (backend role → languages, databases, devops; frontend role → frontend frameworks) and weave them in specifically. Do not default to the first item on the list, and never let a single technology stand in for the whole stack.
- If no tech stack is provided, avoid mentioning specific technologies.
- Links: If a GitHub or portfolio URL is provided in the profile and is relevant to the role, include exactly ONE link, placed INSIDE a sentence that references a specific project or piece of work (e.g. "I built a course-scheduling API used by 400 students — https://github.com/x/y"). Never put the link in its own sentence or use phrases like "You can view my work at...". Prefer GitHub for technical/engineering roles and portfolio for design, writing, or creative roles. Never include both links. If no link is relevant to this role, include no links at all.
- Keep the email concise (150-200 words). Be direct and impactful — cover key points (relevant skills, experience, value you bring) without fluff or filler sentences.
${profileContext}`;

  const userPrompt = `Write an email for:

Company: ${companyName}
Role: ${jobRole}
${hiringManager ? `Recipient: ${hiringManager}` : ""}
Purpose: ${whatApplyingFor}
${jobDescription ? `Job Description:\n${jobDescription}` : ""}
Candidate's actual skills — claim ONLY these: ${profile?.tech_stack || "not provided"}
${additionalContext ? `Additional Context:\n${additionalContext}` : ""}`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 500,
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

   
    let creditsRemaining = profile.credits;
    if (USAGE_LIMITS_ENABLED) {
      const newCredits = profile.credits - 1;
      await supabase
        .from("profiles")
        .update({ credits: newCredits })
        .eq("id", user.id);

      await supabase
        .from("credit_history")
        .insert({
          user_id: user.id,
          amount: -1,
          type: "spend",
          description: `Generated ${emailType} email for ${companyName}`,
        });

      creditsRemaining = newCredits;
    }

    return NextResponse.json({
      subject: parsed.subject || subjectLine || `${emailType}: ${whatApplyingFor} at ${companyName}`,
      body: parsed.body || "",
      creditsRemaining,
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
