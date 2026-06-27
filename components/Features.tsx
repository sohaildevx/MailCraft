import { Card, CardContent } from "../components/ui/card";

const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: "INSTANT GENERATION",
    description:
      "From blank page to polished email in under three seconds. Powered by state-of-the-art language models trained on millions of high-performing emails.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: "35 TONE × TYPE COMBOS",
    description:
      "7 email types × 5 tones. Cold outreach, follow-ups, proposals, apologies — every scenario, every register, every audience.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    title: "CONVERSION-OPTIMISED",
    description:
      "Our outputs are benchmarked against real reply-rate data. Every generated email is structured to hook, persuade, and earn a response.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: "PRIVACY FIRST",
    description:
      "Your context never trains our models. Input data is processed in-memory and discarded immediately — no storage, no leakage.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
    ),
    title: "ONE-CLICK COPY",
    description:
      "Copy subject and body independently or together. Paste directly into Gmail, Outlook, or any email client without reformatting.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
    title: "NO FLUFF GUARANTEE",
    description:
      "We strip filler phrases, hollow pleasantries, and padding. If a word doesn't serve your goal, it doesn't appear in the output.",
  },
];

const Features = () => {
  return (
    <section id="features" className="px-6 py-16 md:px-12 lg:px-20 md:py-24 border-b border-white/10">
      <div className="flex flex-col gap-4 mb-12">
        <span className="text-xs tracking-widest text-gray-500">
          — FEATURES
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-white">
          BUILT FOR PEOPLE{" "}
          <br className="hidden md:block" />
          WHO HATE WRITING EMAILS.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="group bg-[#141410] border-[#2a2a24] ring-0 hover:bg-[#1a1a16] hover:border-[#E8FF4D]/30 transition-colors duration-200"
          >
            <CardContent className="flex flex-col gap-4">
              <span className="flex items-center justify-center w-10 h-10 rounded-lg border border-[#2a2a24] text-gray-400 group-hover:border-[#E8FF4D] group-hover:text-[#E8FF4D] transition-colors duration-200">
                {feature.icon}
              </span>
              <h3 className="text-sm font-bold tracking-wider text-white">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Features;
