"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Separator } from "../../../components/ui/separator";
import { DropdownMenu } from "../../../components/DropdownMenu";
import { PricingCard } from "../../../components/PricingCard";
import { signOut } from "../../../lib/actions/auth";

const plans = [
  {
    name: "FREE",
    price: "₹0",
    period: "forever",
    credits: 10,
    features: [
      "10 emails / month",
      "All 7 email types",
      "All 5 tones",
      "Copy to clipboard",
    ],
    buttonText: "GET STARTED",
  },
  {
    name: "PRO",
    price: "₹49",
    period: "/ month",
    credits: 100,
    features: [
      "100 emails / month",
      "All 7 email types",
      "All 5 tones",
      "GPT-4o model",
      "Priority generation",
      "Email history",
    ],
    buttonText: "SUBSCRIBE",
    highlighted: true,
    badge: "MOST POPULAR",
  },
  {
    name: "TEAM",
    price: "₹149",
    period: "/ month",
    credits: 500,
    features: [
      "500 emails / month",
      "All 7 email types",
      "All 5 tones",
      "GPT-4o model",
      "Priority generation",
      "Email history",
    ],
    buttonText: "SUBSCRIBE",
    badge: "BEST VALUE",
  },
];

const comparisonFeatures = [
  { name: "Emails per month", free: "10", pro: "100", team: "500" },
  { name: "Email types", free: "7", pro: "7", team: "7" },
  { name: "Tone options", free: "5", pro: "5", team: "5" },
  { name: "AI model", free: "GPT-4o mini", pro: "GPT-4o", team: "GPT-4o" },
  { name: "Profile-based generation", free: "✓", pro: "✓", team: "✓" },
  { name: "Copy to clipboard", free: "✓", pro: "✓", team: "✓" },
  { name: "Custom subject line", free: "✓", pro: "✓", team: "✓" },
  { name: "Job description context", free: "✓", pro: "✓", team: "✓" },
  { name: "Priority generation", free: "—", pro: "✓", team: "✓" },
];

export default function PricingPage() {
  const router = useRouter();
  const [credits, setCredits] = useState<number | null>(null);
  const [maxCredits, setMaxCredits] = useState(10);
  const [tier, setTier] = useState("free");
  const [signingOut, setSigningOut] = useState(false);
  const [showComparison, setShowComparison] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/profile");
        if (res.ok) {
          const data = await res.json();
          setCredits(data.credits ?? 10);
          setTier(data.subscription_tier || "free");
          const plan = plans.find((p) => p.name.toLowerCase() === (data.subscription_tier || "free"));
          setMaxCredits(plan?.credits || 10);
        }
      } catch {
        setCredits(10);
      }
    };
    fetchProfile();
  }, []);

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut();
    router.push("/sign-in");
  };

  const usagePercent = credits !== null ? Math.round((credits / maxCredits) * 100) : 0;
  const emailsUsed = credits !== null ? maxCredits - credits : 0;

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-white font-mono">
      
      <div className="flex items-center justify-between px-4 py-3 md:px-8 border-b border-white/10 bg-[#111110]">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center rounded-md bg-[#E8FF4D] p-1.5">
            <img src="/logo/logo.svg" alt="MailCraft logo" width={22} height={22} />
          </span>
          <span className="text-sm font-bold tracking-tight text-white">
            MAILCRAFT
          </span>
          <span className="text-xs text-gray-500 tracking-wider hidden sm:inline">
            AI EMAIL GENERATOR
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-xs">
            {credits === null ? (
              <span className="h-4 w-8 bg-white/10 rounded animate-pulse" />
            ) : (
              <span className="text-[#E8FF4D] font-bold">{credits}</span>
            )}
            <span className="text-gray-500">credits</span>
          </span>
          <Link
            href="/dashboard"
            className="text-xs font-medium text-gray-400 hover:text-white hidden sm:inline"
          >
            Dashboard
          </Link>
          <Separator orientation="vertical" className="h-4 bg-white/10 hidden sm:block" />
          <DropdownMenu
            trigger={
              <div className="w-8 h-8 rounded-full bg-[#E8FF4D] flex items-center justify-center text-black text-xs font-bold cursor-pointer hover:opacity-80 transition-opacity">
                S
              </div>
            }
            items={[
              {
                label: "Profile",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                ),
                href: "/dashboard/profile",
              },
              {
                label: credits === null ? "Loading..." : `${credits} credits`,
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="8"/>
                    <path d="M12 8v8"/>
                    <path d="M8 12h8"/>
                  </svg>
                ),
              },
              { label: "separator" },
              {
                label: signingOut ? "Signing out..." : "Sign out",
                icon: signingOut ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                ),
                onClick: handleSignOut,
                danger: true,
                closeOnClick: false,
              },
            ]}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 md:p-10">
        <div className="max-w-5xl mx-auto flex flex-col gap-12">
          {/* Header */}
          <div className="flex flex-col gap-2">
            <span className="text-xs tracking-widest text-gray-500">
              — PRICING
            </span>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
              PICK YOUR PLAN.
            </h1>
            <p className="text-sm text-gray-400 max-w-lg mt-2">
              Start free. Upgrade when you need more. Downgrade any time. No lock-in, no surprises.
            </p>
          </div>

          {/* Current Usage */}
          <div className="bg-[#111110] border border-white/10 rounded-xl p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs tracking-widest text-gray-500">CURRENT USAGE</span>
              <span className="text-sm text-white">
                {credits === null ? (
                  <span className="h-4 w-12 bg-white/10 rounded animate-pulse inline-block" />
                ) : (
                  <>
                    <span className="font-bold">{emailsUsed}</span>
                    <span className="text-gray-500"> / {maxCredits} emails</span>
                  </>
                )}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-white uppercase">{tier} plan</span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#E8FF4D] transition-all duration-500"
                style={{ width: `${usagePercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">
                {credits === null ? (
                  <span className="h-3 w-40 bg-white/10 rounded animate-pulse inline-block" />
                ) : (
                  <>
                    <span className="font-bold text-white">{credits}</span> emails remaining this month
                  </>
                )}
              </span>
              <span className="text-gray-500">{usagePercent}%</span>
            </div>

            {/* Capacity warning */}
            {credits !== null && credits <= 3 && credits > 0 && (
              <div className="bg-[#E8FF4D]/10 border border-[#E8FF4D]/30 rounded-lg px-4 py-3 text-sm text-[#E8FF4D]">
                ⚡ You&apos;re at <span className="font-bold">{100 - usagePercent}% capacity.</span> Upgrade to Pro for unlimited emails.
              </div>
            )}
            {credits !== null && credits === 0 && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-sm text-red-400">
                ⚡ You&apos;ve used all your credits. Upgrade to Pro to continue generating emails.
              </div>
            )}
          </div>

          {/* Plans */}
          <div className="flex flex-col gap-2">
            <span className="text-xs tracking-widest text-gray-500">— PLANS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <PricingCard
                key={plan.name}
                name={plan.name}
                price={plan.price}
                period={plan.period}
                features={plan.features}
                buttonText={plan.buttonText}
                highlighted={plan.highlighted}
                isCurrent={tier === plan.name.toLowerCase()}
                badge={plan.badge}
              />
            ))}
          </div>

          {/* Feature Comparison */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-xs tracking-widest text-gray-500">— COMPARE</span>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                  FULL FEATURE BREAKDOWN.
                </h2>
              </div>
              <button
                onClick={() => setShowComparison(!showComparison)}
                className="text-xs tracking-widest text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                {showComparison ? "HIDE ^" : "SHOW v"}
              </button>
            </div>

            {showComparison && (
              <div className="bg-[#111110] border border-white/10 rounded-xl overflow-hidden">
                {/* Table header */}
                <div className="grid grid-cols-4 gap-4 px-6 py-4 border-b border-white/10">
                  <span className="text-xs tracking-widest text-gray-500">FEATURE</span>
                  <span className="text-xs tracking-widest text-gray-500 text-center">FREE</span>
                  <span className="text-xs tracking-widest text-[#E8FF4D] text-center">PRO</span>
                  <span className="text-xs tracking-widest text-gray-500 text-center">TEAM</span>
                </div>

                {/* Table rows */}
                {comparisonFeatures.map((feature, i) => (
                  <div
                    key={feature.name}
                    className={`grid grid-cols-4 gap-4 px-6 py-4 ${
                      i < comparisonFeatures.length - 1 ? "border-b border-white/5" : ""
                    }`}
                  >
                    <span className="text-sm text-white">{feature.name}</span>
                    <span className={`text-sm text-center ${feature.free === "✓" ? "text-[#E8FF4D]" : "text-gray-400"}`}>
                      {feature.free}
                    </span>
                    <span className={`text-sm text-center ${feature.pro === "✓" ? "text-[#E8FF4D]" : "text-gray-400"}`}>
                      {feature.pro}
                    </span>
                    <span className={`text-sm text-center ${feature.team === "✓" ? "text-[#E8FF4D]" : "text-gray-400"}`}>
                      {feature.team}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
