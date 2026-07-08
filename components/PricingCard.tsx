"use client";

interface PricingCardProps {
  name: string;
  price: string;
  period: string;
  features: string[];
  buttonText: string;
  highlighted?: boolean;
  isCurrent?: boolean;
  badge?: string;
  onClick?: () => void;
}

export function PricingCard({
  name,
  price,
  period,
  features,
  buttonText,
  highlighted = false,
  isCurrent = false,
  badge,
  onClick,
}: PricingCardProps) {
  return (
    <div
      className={`relative flex flex-col p-8 rounded-xl border ${
        highlighted
          ? "bg-[#E8FF4D] border-[#E8FF4D]"
          : "bg-[#1a1a16] border-white/10"
      }`}
    >
     
      {badge && (
        <span
          className={`absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] tracking-widest font-bold px-3 py-1 rounded-full ${
            highlighted ? "bg-white text-black" : "bg-white/10 text-white"
          }`}
        >
          {badge}
        </span>
      )}

     
      {isCurrent && (
        <span className="absolute top-4 right-4 text-[10px] tracking-widest text-gray-500 border border-white/10 rounded px-2 py-0.5">
          CURRENT
        </span>
      )}

      <span
        className={`text-xs tracking-widest ${
          highlighted ? "text-black/60" : "text-gray-500"
        }`}
      >
        {name}
      </span>
      <div className="flex items-baseline gap-1 mt-3">
        <span
          className={`text-4xl font-bold ${
            highlighted ? "text-black" : "text-white"
          }`}
        >
          {price}
        </span>
        <span
          className={`text-sm ${
            highlighted ? "text-black/60" : "text-gray-500"
          }`}
        >
          {period}
        </span>
      </div>

      <div className="flex flex-col gap-3 mt-8 flex-1">
        {features.map((feature) => (
          <span
            key={feature}
            className={`flex items-center gap-2 text-sm ${
              highlighted ? "text-black/80" : "text-gray-400"
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
              className={highlighted ? "text-black" : "text-[#E8FF4D]"}
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {feature}
          </span>
        ))}
      </div>

      <button
        onClick={onClick}
        disabled={isCurrent}
        className={`w-full mt-8 py-3 rounded-lg text-sm font-semibold tracking-wider cursor-pointer transition-colors ${
          highlighted
            ? "bg-black text-[#E8FF4D] hover:bg-gray-900 disabled:opacity-50"
            : "border border-white/20 text-white hover:bg-white/5 disabled:opacity-50"
        }`}
      >
        {isCurrent ? "CURRENT" : buttonText}
      </button>
    </div>
  );
}
