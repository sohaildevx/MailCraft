import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

const PLAN_AMOUNTS: Record<string, number> = {
  pro: 4900,
  team: 14900,
};

const PLAN_CREDITS: Record<string, number> = {
  pro: 100,
  team: 500,
};

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
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    return NextResponse.json(
      { error: "Razorpay not configured. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to .env" },
      { status: 500 }
    );
  }

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

  const { plan } = body;

  if (!plan || !PLAN_AMOUNTS[plan]) {
    return NextResponse.json({ error: "Invalid plan. Must be 'pro' or 'team'." }, { status: 400 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("name, email")
    .eq("id", user.id)
    .single();

  try {
    const order = await razorpay.orders.create({
      amount: PLAN_AMOUNTS[plan],
      currency: "INR",
      receipt: `receipt_${user.id}_${Date.now()}`,
      notes: {
        user_id: user.id,
        plan: plan,
        credits: String(PLAN_CREDITS[plan]),
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
      userName: profile?.name || user.email,
      userEmail: profile?.email || user.email,
    });
  } catch (error) {
    console.error("Razorpay order error:", error);
    return NextResponse.json(
      { error: "Failed to create order. Try again." },
      { status: 500 }
    );
  }
}
