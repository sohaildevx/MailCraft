const steps = [
  {
    number: "01",
    title: "DESCRIBE YOUR CONTEXT",
    description:
      "Enter who you're emailing, your goal, and a few key points you want to land. Takes 30 seconds.",
  },
  {
    number: "02",
    title: "CHOOSE TYPE & TONE",
    description:
      "Pick from 7 email types and 5 tones. Professional cold outreach? Friendly follow-up? Formal apology? Got it.",
  },
  {
    number: "03",
    title: "GENERATE & COPY",
    description:
      "Hit generate. Review your email. Copy with one click. Done. No editing required — though you can if you want.",
  },
];

const Arrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="shrink-0"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="px-6 py-16 md:px-12 lg:px-20 md:py-24">
      <div className="flex flex-col gap-4 mb-12">
        <span className="text-xs tracking-widest text-gray-500">
          — HOW IT WORKS
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-white">
          THREE STEPS.{" "}
          <br className="hidden md:block" />
          ONE GREAT EMAIL.
        </h2>
      </div>

      <div className="rounded-xl border border-[#2a2a24] bg-[#141410] p-8 md:p-10">
        <div className="flex flex-col md:flex-row items-start gap-8 md:gap-0">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-start gap-4 flex-1">
              <span className="text-4xl md:text-5xl font-bold text-[#E8FF4D]/40">
                {step.number}
              </span>
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-bold tracking-wider text-white">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <span className="hidden md:flex items-center ml-auto pr-8 text-[#E8FF4D]">
                  <Arrow />
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
