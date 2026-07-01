"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Separator } from "../../components/ui/separator";
import { signOut } from "../../lib/actions/auth";

const emailTypes = [
  "Cold Outreach",
  "Follow-up",
  "Proposal",
  "Apology",
  "Thank You",
  "Introduction",
  "Partnership",
];

const tones = [
  "Professional",
  "Friendly",
  "Casual",
  "Formal",
  "Persuasive",
];

const fields = [
  { key: "companyName", label: "COMPANY NAME *", placeholder: "e.g. Google", type: "input" },
  { key: "hiringManager", label: "HIRING MANAGER NAME (OPTIONAL)", placeholder: "e.g. Sarah Johnson", type: "input" },
  { key: "jobRole", label: "JOB ROLE *", placeholder: "e.g. Frontend Developer Intern", type: "input" },
  { key: "whatApplyingFor", label: "WHAT ARE YOU APPLYING FOR? *", placeholder: "Applying for Frontend Internship", type: "input" },
  { key: "subjectLine", label: "SUBJECT LINE (OPTIONAL)", placeholder: "Leave blank to let AI generate", type: "input" },
  { key: "jobDescription", label: "JOB DESCRIPTION (OPTIONAL)", placeholder: "Paste the job description here...", type: "textarea" },
  { key: "additionalContext", label: "ADDITIONAL CONTEXT", placeholder: "Mention my React experience\nMention my ExpenseFlow project\nMention my open-source work", type: "textarea" },
];

const initialForm = {
  companyName: "",
  hiringManager: "",
  jobRole: "",
  emailType: "Cold Outreach",
  tone: "Professional",
  whatApplyingFor: "",
  subjectLine: "",
  jobDescription: "",
  additionalContext: "",
};

const DashboardPage = () => {
  const [mobileTab, setMobileTab] = useState<"compose" | "preview">("compose");
  const [form, setForm] = useState(initialForm);
  const [generatedSubject, setGeneratedSubject] = useState("");
  const [generatedBody, setGeneratedBody] = useState("");
  const [generating, setGenerating] = useState(false);
  const [copiedSubject, setCopiedSubject] = useState(false);
  const [copiedBody, setCopiedBody] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);
  const [error, setError] = useState("");
  const [credits] = useState(5);

  const updateField = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleGenerate = async () => {
    setGenerating(true);
    setError("");

    try {
      const res = await fetch("/api/generate-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      setGeneratedSubject(data.subject);
      setGeneratedBody(data.body);
      setMobileTab("preview");
    } catch {
      setError("Failed to generate email. Try again.");
    } finally {
      setGenerating(false);
    }
  };

  const handleReset = () => {
    setForm(initialForm);
    setGeneratedSubject("");
    setGeneratedBody("");
  };

  const handleCopySubject = async () => {
    await navigator.clipboard.writeText(generatedSubject);
    setCopiedSubject(true);
    setTimeout(() => setCopiedSubject(false), 2000);
  };

  const handleCopyBody = async () => {
    await navigator.clipboard.writeText(generatedBody);
    setCopiedBody(true);
    setTimeout(() => setCopiedBody(false), 2000);
  };

  const handleCopyAll = async () => {
    await navigator.clipboard.writeText(
      `Subject: ${generatedSubject}\n\n${generatedBody}`
    );
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const wordCount = generatedBody
    ? generatedBody.trim().split(/\s+/).length
    : 0;

  return (
    <div className="flex flex-col h-screen bg-[#f0f0f0] text-black font-mono">
     
      <div className="flex items-center justify-between px-4 py-3 md:px-8 border-b border-gray-300 bg-[#e8e8e8]">
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <span className="flex items-center justify-center rounded-md bg-[#E8FF4D] p-1.5">
            <img src="/logo/logo.svg" alt="MailCraft logo" width={22} height={22} />
          </span>
          <span className="text-sm font-bold tracking-tight text-black">
            MAILCRAFT
          </span>
          <span className="text-xs text-gray-400 tracking-wider hidden sm:inline">
            AI EMAIL GENERATOR
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-xs">
            <span className="text-[#65a30d] font-bold">{credits}</span>
            <span className="text-gray-400">credits</span>
          </span>
          <Link
            href="/pricing"
            className="text-xs font-medium text-[#65a30d] hover:underline hidden sm:inline"
          >
            Buy credits
          </Link>
          <Separator orientation="vertical" className="h-4 bg-gray-200 hidden sm:block" />
          <form action={signOut}>
            <Button
              type="submit"
              variant="outline"
              size="sm"
              className="border-gray-300 text-gray-500 hover:bg-[#65a30d] hover:text-white hover:border-[#65a30d] text-xs cursor-pointer transition-all duration-200"
            >
              SIGN OUT
            </Button>
          </form>
        </div>
      </div>

      
      <div className="flex md:hidden border-b border-gray-300 bg-[#e8e8e8]">
        <button
          onClick={() => setMobileTab("compose")}
          className={`flex-1 py-3 text-xs font-bold tracking-wider transition-all duration-200 ${
            mobileTab === "compose"
              ? "text-black border-b-2 border-[#65a30d]"
              : "text-gray-400"
          }`}
        >
          COMPOSE
        </button>
        <button
          onClick={() => setMobileTab("preview")}
          className={`flex-1 py-3 text-xs font-bold tracking-wider transition-all duration-200 relative ${
            mobileTab === "preview"
              ? "text-black border-b-2 border-[#65a30d]"
              : "text-gray-400"
          }`}
        >
          PREVIEW
          {generatedSubject && mobileTab === "compose" && (
            <span className="absolute top-2.5 ml-1 w-2 h-2 inline-block rounded-full bg-[#65a30d]" />
          )}
        </button>
      </div>

     
      <div className="flex flex-1 overflow-hidden">
        
        <div className={`w-full md:w-[420px] flex-shrink-0 overflow-y-auto border-r border-gray-300 p-6 flex flex-col gap-5 bg-[#e4e4e4] ${mobileTab === "compose" ? "flex" : "hidden md:flex"}`}>
          <span className="text-xs tracking-widest text-gray-400">
            01 — COMPOSE CONTEXT
          </span>

          {fields.map((field) =>
            field.type === "textarea" ? (
              <div key={field.key} className="flex flex-col gap-2">
                <Label className="text-xs tracking-widest text-gray-500">
                  {field.label}
                </Label>
                <textarea
                  value={form[field.key as keyof typeof form]}
                  onChange={(e) => updateField(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  rows={4}
                  className="w-full bg-[#f5f5f5] border border-gray-300 rounded-md px-3 py-2 text-sm text-black placeholder:text-gray-400 focus:ring-[#65a30d] focus:border-[#65a30d] resize-none outline-none"
                />
              </div>
            ) : (
              <div key={field.key} className="flex flex-col gap-2">
                <Label className="text-xs tracking-widest text-gray-500">
                  {field.label}
                </Label>
                <Input
                  value={form[field.key as keyof typeof form]}
                  onChange={(e) => updateField(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="bg-[#f5f5f5] border-gray-300 text-black placeholder:text-gray-400 focus-visible:ring-[#65a30d] focus-visible:border-[#65a30d]"
                />
              </div>
            )
          )}

          <div className="flex gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <Label className="text-xs tracking-widest text-gray-500">
                EMAIL TYPE
              </Label>
              <select
                value={form.emailType}
                onChange={(e) => updateField("emailType", e.target.value)}
                className="w-full bg-[#f5f5f5] border border-gray-300 rounded-md px-3 py-2 text-sm text-black focus:ring-[#65a30d] focus:border-[#65a30d] outline-none"
              >
                {emailTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <Label className="text-xs tracking-widest text-gray-500">
                TONE
              </Label>
              <select
                value={form.tone}
                onChange={(e) => updateField("tone", e.target.value)}
                className="w-full bg-[#f5f5f5] border border-gray-300 rounded-md px-3 py-2 text-sm text-black focus:ring-[#65a30d] focus:border-[#65a30d] outline-none"
              >
                {tones.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-md px-3 py-2">
              {error}
            </p>
          )}

          <Button
            onClick={handleGenerate}
            disabled={!form.companyName || !form.jobRole || !form.whatApplyingFor || generating || credits <= 0}
            className="w-full bg-black text-white font-bold hover:bg-[#E8FF4D] hover:text-black cursor-pointer disabled:opacity-50 transition-all duration-200"
          >
            {generating ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                GENERATING...
              </span>
            ) : (
              "GENERATE EMAIL →"
            )}
          </Button>
        </div>

       
        <div className={`flex-1 overflow-y-auto p-6 flex flex-col ${mobileTab === "preview" ? "flex" : "hidden md:flex"}`}>
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs tracking-widest text-gray-400">
              02 — GENERATED EMAIL
            </span>
            {generatedSubject && (
              <Button
                onClick={handleCopyAll}
                variant="outline"
                size="sm"
                className="border-gray-300 text-gray-500 hover:bg-[#65a30d] hover:text-white hover:border-[#65a30d] text-xs cursor-pointer transition-all duration-200"
              >
                {copiedAll ? (
                  <span className="flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#65a30d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    COPIED!
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                    </svg>
                    COPY ALL
                  </span>
                )}
              </Button>
            )}
          </div>

          {generatedSubject ? (
            <div className="flex flex-col gap-6 max-w-2xl">
              
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs tracking-widest text-gray-400">
                    SUBJECT
                  </span>
                  <button
                    onClick={handleCopySubject}
                    className="text-gray-400 hover:text-black hover:bg-gray-100 rounded-md transition-all duration-200 p-1.5"
                  >
                    {copiedSubject ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#65a30d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                      </svg>
                    )}
                  </button>
                </div>
                <p className="text-lg font-bold text-black">{generatedSubject}</p>
              </div>

              <Separator className="bg-gray-300" />

             
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs tracking-widest text-gray-400">
                    BODY
                  </span>
                  <button
                    onClick={handleCopyBody}
                    className="text-gray-400 hover:text-black hover:bg-gray-100 rounded-md transition-all duration-200 p-1.5"
                  >
                    {copiedBody ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#65a30d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                      </svg>
                    )}
                  </button>
                </div>
                <p className="text-sm text-black leading-relaxed whitespace-pre-wrap">
                  {generatedBody}
                </p>
              </div>

              <Separator className="bg-gray-300" />

              
              <div className="flex items-center gap-8 text-xs">
                <div className="flex flex-col gap-1">
                  <span className="tracking-widest text-gray-400">TYPE</span>
                  <span className="font-bold text-black">{form.emailType}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="tracking-widest text-gray-400">TONE</span>
                  <span className="font-bold text-black uppercase">{form.tone}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="tracking-widest text-gray-400">WORDS</span>
                  <span className="font-bold text-black">{wordCount}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center flex-1 text-center">
              <span className="text-4xl mb-4">✉️</span>
              <h3 className="text-lg font-bold text-black mb-2">
                Your email will appear here
              </h3>
              <p className="text-sm text-gray-400 max-w-xs">
                Fill in the form on the left and hit generate to see your
                polished email.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
