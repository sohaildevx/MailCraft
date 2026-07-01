"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Separator } from "../../../components/ui/separator";
import { signIn } from "../../../lib/actions/auth";

const typingTexts = [
  "Write better emails.",
  "Get faster replies.",
  "Close more deals.",
];

const perks = [
  "Free forever plan",
  "No credit card required",
  "Instant access",
];

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);
      const result = await signIn(formData);
      if (result?.error) {
        setError(result.error);
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      
      <div className="flex items-center justify-between px-6 py-4 md:px-12 lg:px-20 border-b border-white/10">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <span className="flex items-center justify-center rounded-md bg-[#E8FF4D] p-1.5">
              <img src="/logo/logo.svg" alt="MailCraft logo" width={24} height={24} />
            </span>
            <span className="text-sm font-bold tracking-tight text-white">
              MAILCRAFT
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <span className="text-xs md:text-sm font-bold tracking-wider text-white border-b-2 border-[#E8FF4D] pb-1">
            SIGN IN
          </span>
          <Link href="/sign-up" className="hidden md:block text-sm font-medium tracking-wider text-gray-500 hover:text-white transition-colors">
            SIGN UP
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1 text-xs md:text-sm font-medium tracking-wider text-gray-400 border border-white/20 rounded px-2 md:px-3 py-1.5 hover:bg-white/5 transition-colors"
          >
            ← BACK
          </Link>
        </div>
      </div>

     
      <div className="flex flex-1 overflow-hidden">
       
        <div className="hidden md:flex flex-col justify-between flex-1 px-12 lg:px-20 py-12 border-r border-white/10">
          <div className="flex flex-col gap-16">
            
            <div className="flex flex-col gap-2">
              {typingTexts.map((text, i) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.3 }}
                >
                  <span className="text-3xl lg:text-4xl font-bold tracking-tight text-white/80">
                    {text}
                  </span>
                </motion.div>
              ))}
            </div>

            
            <div className="flex flex-col gap-3">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="h-0.5 bg-[#E8FF4D]/30 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${60 + i * 10}%` }}
                  transition={{ duration: 0.8, delay: 0.5 + i * 0.15 }}
                />
              ))}
            </div>

            
            <div className="flex flex-col gap-4 border-l-2 border-[#E8FF4D] pl-6">
              <p className="text-sm text-gray-300 leading-relaxed">
                &quot;I used to spend 20 minutes crafting a single cold email. Now I
                generate five in the time it used to take me to write one.&quot;
              </p>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white">Priya Nair</span>
                <span className="text-xs text-gray-500">Founder, Luminara AI</span>
              </div>
            </div>
          </div>

          
          <div className="flex flex-col gap-3">
            {perks.map((perk) => (
              <span key={perk} className="flex items-center gap-2 text-sm text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#E8FF4D]">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {perk}
              </span>
            ))}
          </div>
        </div>

        
        <div className="flex flex-col items-center justify-center flex-1 px-6 py-12">
          <div className="w-full max-w-sm flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-xs tracking-widest text-gray-500">
                — WELCOME BACK
              </span>
              <h1 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight text-white">
                SIGN IN TO{" "}
                <br />
                MAILCRAFT.
              </h1>
            </div>

            
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/5 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GITHUB
              </Button>
              <Button variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/5 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                GOOGLE
              </Button>
            </div>

            
            <div className="flex items-center gap-4">
              <Separator className="flex-1 bg-white/10" />
              <span className="text-xs text-gray-500">OR</span>
              <Separator className="flex-1 bg-white/10" />
            </div>

            
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <Label className="text-xs tracking-widest text-gray-500">EMAIL</Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  required
                  className="bg-transparent border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-[#E8FF4D] focus-visible:border-[#E8FF4D]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label className="text-xs tracking-widest text-gray-500">PASSWORD</Label>
                <div className="relative">
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    className="bg-transparent border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-[#E8FF4D] focus-visible:border-[#E8FF4D] pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 accent-[#E8FF4D] bg-transparent border-white/20 rounded" />
                  Remember me
                </label>
                <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Forgot password?
                </Link>
              </div>

              {error && (
                <div className="flex items-start gap-2 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-md px-3 py-2.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#E8FF4D] text-black font-bold hover:bg-[#d4eb44] cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    SIGNING IN...
                  </span>
                ) : (
                  "SIGN IN →"
                )}
              </Button>
            </form>

            <p className="text-sm text-gray-500 text-center">
              No account?{" "}
              <Link href="/sign-up" className="text-[#E8FF4D] hover:underline">
                Create one free →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
