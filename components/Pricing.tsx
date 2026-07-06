"use client";

const plans = [
  {
    name: "FREE",
    price: "₹0",
    period: "forever",
    features: [
      "10 emails / month",
      "All 7 email types",
      "3 tones",
      "Copy to clipboard",
    ],
    buttonText: "GET STARTED",
    buttonVariant: "outline" as const,
  },
  {
    name: "PRO",
    price: "₹49",
    period: "/ month",
    features: [
      "100 emails / month",
      "All 7 email types",
      "All 5 tones",
      "Subject line variants",
      "Export to .txt / .eml",
      "Priority generation",
    ],
    buttonText: "SUBSCRIBE",
    buttonVariant: "primary" as const,
    highlighted: true,
  },
  {
    name: "TEAM",
    price: "₹149",
    period: "/ month",
    features: [
      "500 emails / month",
      "All 7 email types",
      "All 5 tones",
      "Subject line variants",
      "Export to .txt / .eml",
      "Priority generation",
    ],
    buttonText: "SUBSCRIBE",
    buttonVariant: "outline" as const,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="px-6 py-20 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-2">
          <span className="text-xs tracking-widest text-gray-500">
            — PRICING
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            SIMPLE PRICING. <br />
            NO SURPRISES.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col p-8 rounded-xl border ${
                plan.highlighted
                  ? "bg-[#E8FF4D] border-[#E8FF4D]"
                  : "bg-[#1a1a16] border-white/10"
              }`}
            >
              <span
                className={`text-xs tracking-widest ${
                  plan.highlighted ? "text-black/60" : "text-gray-500"
                }`}
              >
                {plan.name}
              </span>
              <div className="flex items-baseline gap-1 mt-3">
                <span
                  className={`text-4xl font-bold ${
                    plan.highlighted ? "text-black" : "text-white"
                  }`}
                >
                  {plan.price}
                </span>
                <span
                  className={`text-sm ${
                    plan.highlighted ? "text-black/60" : "text-gray-500"
                  }`}
                >
                  {plan.period}
                </span>
              </div>

              <div className="flex flex-col gap-3 mt-8 flex-1">
                {plan.features.map((feature) => (
                  <span
                    key={feature}
                    className={`flex items-center gap-2 text-sm ${
                      plan.highlighted ? "text-black/80" : "text-gray-400"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={
                        plan.highlighted ? "text-black" : "text-[#E8FF4D]"
                      }
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {feature}
                  </span>
                ))}
              </div>

              <button
                className={`w-full mt-8 py-3 rounded-lg text-sm font-semibold tracking-wider cursor-pointer transition-colors ${
                  plan.highlighted
                    ? "bg-black text-[#E8FF4D] hover:bg-gray-900"
                    : "border border-white/20 text-white hover:bg-white/5"
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}