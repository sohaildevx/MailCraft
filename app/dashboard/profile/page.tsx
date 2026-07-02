"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Separator } from "../../../components/ui/separator";
import { DropdownMenu } from "../../../components/DropdownMenu";
import { TagInput } from "../../../components/TagInput";

const experienceLevels = ["Student", "Junior", "Mid-Level", "Senior"];

const initialProfile = {
  fullName: "",
  jobTitle: "",
  experienceLevel: "Student",
  techStack: [] as string[],
  projects: "",
  githubUrl: "",
  linkedinUrl: "",
  portfolioUrl: "",
};

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState(initialProfile);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [credits] = useState(5);

  const hasChanges = useMemo(() => {
    return JSON.stringify(profile) !== JSON.stringify(initialProfile);
  }, [profile]);

  const updateField = <K extends keyof typeof profile>(key: K, value: (typeof profile)[K]) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f0f0f0] text-black font-mono">
     
      <div className="flex items-center justify-between px-4 py-3 md:px-8 border-b border-gray-300 bg-[#e8e8e8]">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center rounded-md bg-[#E8FF4D] p-1.5">
            <img src="/logo/logo.svg" alt="MailCraft logo" width={22} height={22} />
          </span>
          <span className="text-sm font-bold tracking-tight text-black">
            MAILCRAFT
          </span>
          <span className="text-xs text-gray-400 tracking-wider hidden sm:inline">
            AI EMAIL GENERATOR
          </span>
        </div>

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
          <DropdownMenu
            trigger={
              <div className="w-8 h-8 rounded-full bg-[#65a30d] flex items-center justify-center text-white text-xs font-bold cursor-pointer hover:opacity-80 transition-opacity">
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
              },
              {
                label: `${credits} credits`,
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
                label: "Sign out",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                ),
                onClick: () => {
                  setSigningOut(true);
                  router.push("/sign-in");
                },
                danger: true,
              },
            ]}
          />
        </div>
      </div>

     
      <div className="flex-1 overflow-y-auto p-6 md:p-10">
        <div className="max-w-2xl mx-auto flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-xs tracking-widest text-gray-400">
                — YOUR PROFILE
              </span>
              <h1 className="text-2xl font-bold text-black">
                PROFILE SETTINGS
              </h1>
            </div>
            <Link
              href="/dashboard"
              className="text-xs text-gray-400 hover:text-black transition-colors"
            >
              ← Back to dashboard
            </Link>
          </div>

          <div className="bg-[#e4e4e4] border border-gray-300 rounded-xl p-6 flex flex-col gap-5">
            <span className="text-xs tracking-widest text-gray-400">
              PERSONAL INFO
            </span>

            <div className="flex flex-col gap-2">
              <Label className="text-xs tracking-widest text-gray-500">
                FULL NAME
              </Label>
              <Input
                value={profile.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
                placeholder="e.g. Shahid"
                className="bg-[#f5f5f5] border-gray-300 text-black placeholder:text-gray-400 focus-visible:ring-[#65a30d] focus-visible:border-[#65a30d]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-xs tracking-widest text-gray-500">
                JOB TITLE
              </Label>
              <Input
                value={profile.jobTitle}
                onChange={(e) => updateField("jobTitle", e.target.value)}
                placeholder="e.g. Frontend Developer"
                className="bg-[#f5f5f5] border-gray-300 text-black placeholder:text-gray-400 focus-visible:ring-[#65a30d] focus-visible:border-[#65a30d]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-xs tracking-widest text-gray-500">
                EXPERIENCE LEVEL
              </Label>
              <select
                value={profile.experienceLevel}
                onChange={(e) => updateField("experienceLevel", e.target.value)}
                className="w-full bg-[#f5f5f5] border border-gray-300 rounded-md px-3 py-2 text-sm text-black focus:ring-[#65a30d] focus:border-[#65a30d] outline-none"
              >
                {experienceLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-[#e4e4e4] border border-gray-300 rounded-xl p-6 flex flex-col gap-5">
            <span className="text-xs tracking-widest text-gray-400">
              SKILLS & PROJECTS
            </span>

            <div className="flex flex-col gap-2">
              <Label className="text-xs tracking-widest text-gray-500">
                TECH STACK
              </Label>
              <TagInput
                tags={profile.techStack}
                onChange={(tags) => updateField("techStack", tags)}
                placeholder="Type and press Enter to add..."
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-xs tracking-widest text-gray-500">
                PROJECTS
              </Label>
              <textarea
                value={profile.projects}
                onChange={(e) => updateField("projects", e.target.value)}
                placeholder={"ExpenseFlow — React expense tracker with 500+ users\nOpenNote — Open-source note-taking app built with Next.js"}
                rows={4}
                className="w-full bg-[#f5f5f5] border border-gray-300 rounded-md px-3 py-2 text-sm text-black placeholder:text-gray-400 focus:ring-[#65a30d] focus:border-[#65a30d] resize-none outline-none"
              />
            </div>
          </div>

          <div className="bg-[#e4e4e4] border border-gray-300 rounded-xl p-6 flex flex-col gap-5">
            <span className="text-xs tracking-widest text-gray-400">
              LINKS
            </span>

            <div className="flex flex-col gap-2">
              <Label className="text-xs tracking-widest text-gray-500">
                GITHUB URL
              </Label>
              <Input
                value={profile.githubUrl}
                onChange={(e) => updateField("githubUrl", e.target.value)}
                placeholder="https://github.com/yourusername"
                className="bg-[#f5f5f5] border-gray-300 text-black placeholder:text-gray-400 focus-visible:ring-[#65a30d] focus-visible:border-[#65a30d]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-xs tracking-widest text-gray-500">
                LINKEDIN URL
              </Label>
              <Input
                value={profile.linkedinUrl}
                onChange={(e) => updateField("linkedinUrl", e.target.value)}
                placeholder="https://linkedin.com/in/yourusername"
                className="bg-[#f5f5f5] border-gray-300 text-black placeholder:text-gray-400 focus-visible:ring-[#65a30d] focus-visible:border-[#65a30d]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-xs tracking-widest text-gray-500">
                PORTFOLIO URL
              </Label>
              <Input
                value={profile.portfolioUrl}
                onChange={(e) => updateField("portfolioUrl", e.target.value)}
                placeholder="https://yourportfolio.com"
                className="bg-[#f5f5f5] border-gray-300 text-black placeholder:text-gray-400 focus-visible:ring-[#65a30d] focus-visible:border-[#65a30d]"
              />
            </div>
          </div>

          <Button
            onClick={handleSave}
            disabled={saving || !hasChanges}
            className="w-full bg-black text-white font-bold hover:bg-[#E8FF4D] hover:text-black cursor-pointer disabled:opacity-50 disabled:hover:bg-black disabled:hover:text-white transition-all duration-200"
          >
            {saving ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                SAVING...
              </span>
            ) : saved ? (
              <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#65a30d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                SAVED!
              </span>
            ) : (
              "SAVE PROFILE"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
