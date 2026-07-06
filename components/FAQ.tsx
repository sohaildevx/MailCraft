"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Does Mailcraft store my email data?",
    answer: "No. Your generated emails are not stored on our servers. They exist only in your browser session. We prioritize your privacy and data security.",
  },
  {
    question: "How is this different from ChatGPT for emails?",
    answer: "MailCraft is purpose-built for email writing. It uses your profile data (skills, projects, experience) to personalize emails, offers predefined tones and email types, and gives you a clean copy-ready output — no prompt engineering needed.",
  },
  {
    question: "Can I edit the generated email?",
    answer: "Yes. The generated email is fully editable. You can copy it and make any changes before sending. We encourage you to add your personal touch.",
  },
  {
    question: "What email types are supported?",
    answer: "MailCraft supports 7 email types: Cold Outreach, Follow-up, Proposal, Apology, Thank You, Introduction, and Partnership. Each type is optimized for its specific purpose.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="px-6 py-20 md:px-12 lg:px-20 border-t border-white/10">
      <div className="max-w-3xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-2">
          <span className="text-xs tracking-widest text-gray-500">
            — FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            QUESTIONS <br />
            ANSWERED.
          </h2>
        </div>

        <div className="flex flex-col">
          {faqs.map((faq, i) => (
            <div key={i} className="border-t border-white/10">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between py-6 text-left cursor-pointer"
              >
                <span className="text-base md:text-lg font-medium text-white pr-4">
                  {faq.question}
                </span>
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
                  className={`text-gray-500 shrink-0 transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {openIndex === i && (
                <div className="pb-6">
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
          <div className="border-t border-white/10" />
        </div>
      </div>
    </section>
  );
}