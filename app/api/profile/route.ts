import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

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

export async function GET(req: NextRequest) {
  try {
  
    const supabase = createClient(req);
    console.log("Supabase client created");

    const { data: { user }, error: authError } = await supabase.auth.getUser();


    if (authError || !user) {
      console.log("Not authenticated, returning 401");
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    let { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

  
    if (error && error.code === "PGRST116") {
      const { error: insertError } = await supabase
        .from("profiles")
        .insert({ id: user.id, name: user.email || "", email: user.email || "" });

      if (insertError) {
        console.log("Insert error:", insertError);
        return NextResponse.json({ error: insertError.message }, { status: 500 });
      }


      const { data: newData, error: newError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (newError) {
        return NextResponse.json({ error: newError.message }, { status: 500 });
      }

      data = newData;
    } else if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.log("CAUGHT ERROR:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient(req);
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const projectsStr = Array.isArray(body.projects)
      ? body.projects
          .filter((p: { name: string }) => p.name.trim())
          .map((p: { name: string; description: string }) =>
            p.description ? `${p.name} — ${p.description}` : p.name
          )
          .join("\n---\n")
      : "";

    const { error } = await supabase
      .from("profiles")
      .update({
        name: body.fullName || "",
        job_title: body.jobTitle || "",
        experience_level: body.experienceLevel || "Student",
        tech_stack: Array.isArray(body.techStack) ? body.techStack.join(", ") : "",
        projects: projectsStr,
        github_url: body.githubUrl || "",
        linkedin_url: body.linkedinUrl || "",
        portfolio_url: body.portfolioUrl || "",
      })
      .eq("id", user.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
