"use client";

import { PricingCard } from "./PricingCard";

const plans = [
  {
    name: "FREE",
    price: "₹0",
    period: "forever",
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
  },
  {
    name: "TEAM",
    price: "₹149",
    period: "/ month",
    features: [
      "500 emails / month",
      "All 7 email types",
      "All 5 tones",
      "GPT-4o model",
      "Priority generation",
      "Email history",
    ],
    buttonText: "SUBSCRIBE",
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
            <PricingCard
              key={plan.name}
              name={plan.name}
              price={plan.price}
              period={plan.period}
              features={plan.features}
              buttonText={plan.buttonText}
              highlighted={plan.highlighted}
            />
          ))}
        </div>
      </div>
    </section>
  );
}