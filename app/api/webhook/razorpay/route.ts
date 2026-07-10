import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const PLAN_CREDITS: Record<string, number> = {
  pro: 100,
  team: 500,
};

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

function verifySignature(body: string, signature: string | null): boolean {
  if (!signature || !process.env.RAZORPAY_WEBHOOK_SECRET) return false;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
    .update(body)
    .digest("hex");

  return expectedSignature === signature;
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("x-razorpay-signature");

  if (!verifySignature(body, signature)) {
    console.error("Invalid Razorpay webhook signature");
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(body);

  console.log("Razorpay webhook event:", event.event);

  if (event.event === "payment.captured") {
    const payment = event.payload.payment.entity;
    const userId = payment.notes?.user_id;
    const plan = payment.notes?.plan;

    if (!userId || !plan || !PLAN_CREDITS[plan]) {
      console.error("Missing user_id or plan in payment notes");
      return NextResponse.json({ received: true });
    }

    const supabase = getSupabaseAdmin();
    const credits = PLAN_CREDITS[plan];

    const { error } = await supabase
      .from("profiles")
      .update({
        subscription_tier: plan,
        credits: credits,
        credits_reset_at: new Date().toISOString(),
        subscription_status: "active",
        subscription_id: payment.subscription_id || payment.order_id,
      })
      .eq("id", userId);

    if (error) {
      console.error("Failed to update profile:", error);
      return NextResponse.json({ error: "DB update failed" }, { status: 500 });
    }

    await supabase.from("credit_history").insert({
      user_id: userId,
      amount: credits,
      type: "earn",
      description: `Upgraded to ${plan} plan`,
    });

    console.log(`User ${userId} upgraded to ${plan} with ${credits} credits`);
  }

  if (event.event === "payment.failed") {
    const payment = event.payload.payment.entity;
    console.error("Payment failed:", payment.id, payment.error_description);
  }

  return NextResponse.json({ received: true });
}
