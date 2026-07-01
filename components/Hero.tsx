"use client";

import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import Link from "next/link";

// const stats = [
//   { value: "12,400+", label: "EMAILS GENERATED" },
//   { value: "94%", label: "RESPONSE RATE LIFT" },
//   { value: "< 3s", label: "AVG. GEN. TIME" },
// ];

const Hero = () => {
  const [copied, setCopied] = useState(false);

  const emailContent = `SUBJECT: Partnership Opportunity – Q3

Dear Sarah,

I hope this message finds you well. I'm reaching out regarding a Q3 partnership opportunity.

• 40% conversion uplift on average
• 2-week free pilot, no commitment
• Full API integration in < 1 day

I'd love to schedule a quick call at your earliest convenience.

Best regards,
Alex Rivera`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(emailContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <section className="px-6 py-16 md:px-12 lg:px-20 md:py-24 border-b border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
        
        <div className="md:col-span-3 flex flex-col gap-8">
          <span className="inline-block border border-[#E8FF4D] px-4 py-2 text-xs font-medium tracking-widest text-[#E8FF4D] w-fit">
            AI-POWERED &middot; FREE TO TRY
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white">
            EMAILS THAT{" "}
            <span className="text-[#E8FF4D]">ACTUALLY</span>{" "}
            GET REPLIES.
          </h1>

          <p className="text-base md:text-lg text-gray-400 leading-relaxed max-w-lg">
            Describe your goal, pick a tone, and get a polished, send-ready
            email in seconds &mdash; not hours. No templates. No fluff. Just the
            right words, every time.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link href='/sign-up'>
            <Button
              size="lg"
              className="bg-[#E8FF4D] text-black font-semibold hover:bg-[#d4eb44] text-sm md:text-base cursor-pointer"
            >
              GENERATE YOUR FIRST EMAIL &rarr;
            </Button>
          </Link>
          
            <Button
              variant="outline"
              size="lg"
              onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
              className="border-white/20 text-white hover:bg-white/5 text-sm md:text-base cursor-pointer"
            >
              SEE HOW IT WORKS
            </Button>
          </div>

          {/* <div className="flex items-center gap-10 pt-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-xl md:text-2xl font-bold text-[#E8FF4D]">
                  {stat.value}
                </span>
                <span className="text-[10px] md:text-xs text-gray-500 tracking-wider mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div> */}
        </div>

       
        <div className="md:col-span-2">
          <Card className="bg-[#141410] border-[#2a2a24] ring-0">
            
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#2a2a24]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-gray-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-xs text-gray-500">mailcraft output</span>
            </div>

            <CardContent className="flex flex-col gap-4 text-sm text-gray-300 pt-5">
              <p className="pb-4 border-b border-[#2a2a24]">
                <span className="text-gray-500">SUBJECT:</span>{" "}
                Partnership Opportunity &ndash; Q3
              </p>
              <p>Dear Sarah,</p>
              <p>
                I hope this message finds you well. I&apos;m reaching out
                regarding a Q3 partnership opportunity.
              </p>
              <ul className="flex flex-col gap-1 list-disc pl-4 text-gray-400">
                <li>40% conversion uplift on average</li>
                <li>2-week free pilot, no commitment</li>
                <li>Full API integration in &lt; 1 day</li>
              </ul>
              <p>
                I&apos;d love to schedule a quick call at your earliest
                convenience.
              </p>
              <p>
                Best regards,
                <br />
                Alex Rivera
              </p>
            </CardContent>

            <CardFooter className="flex items-center justify-between border-t border-[#2a2a24] bg-transparent">
              <span className="text-xs text-gray-500">
                78 words &middot; professional
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs text-[#E8FF4D] border border-[#E8FF4D] rounded px-3 py-1 hover:bg-[#E8FF4D]/10 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    COPIED!
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                    </svg>
                    COPY
                  </>
                )}
              </button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Hero;
