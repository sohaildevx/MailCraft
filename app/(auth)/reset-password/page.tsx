"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { Loader2 } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { updatePassword } from "../../../lib/actions/auth";

const ResetPasswordPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [validToken, setValidToken] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) {
      setChecking(false);
      return;
    }

    const params = new URLSearchParams(hash.substring(1));
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");

    if (accessToken && refreshToken) {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
      );

      supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      }).then(({ error }: { error: Error | null }) => {
        if (!error) {
          setValidToken(true);
        }
        setChecking(false);
      });
    } else {
      setChecking(false);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);
      const result = await updatePassword(formData);
      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/sign-in?reset=true");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
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
        </div>
        <div className="flex flex-1 items-center justify-center">
          <span className="text-gray-400">Verifying link...</span>
        </div>
      </div>
    );
  }

  if (!validToken) {
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
        </div>
        <div className="flex flex-1 items-center justify-center px-6">
          <div className="flex flex-col items-center gap-4">
            <span className="text-red-400">Invalid or expired reset link.</span>
            <Link href="/forgot-password" className="text-[#E8FF4D] hover:underline">
              Request a new link →
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
            RESET PASSWORD
          </span>
          <Link
            href="/sign-in"
            className="flex items-center gap-1 text-xs md:text-sm font-medium tracking-wider text-gray-400 border border-white/20 rounded px-2 md:px-3 py-1.5 hover:bg-white/5 transition-colors"
          >
            ← BACK TO SIGN IN
          </Link>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-xs tracking-widest text-gray-500">
              — NEW PASSWORD
            </span>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight text-white">
              SET NEW{" "}
              <br />
              PASSWORD.
            </h1>
            <p className="text-sm text-gray-400 mt-2">
              Enter your new password below.
            </p>
          </div>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <Label className="text-xs tracking-widest text-gray-500">NEW PASSWORD</Label>
              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  minLength={6}
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
                  <Loader2 className="animate-spin" size={16} />
                  UPDATING PASSWORD...
                </span>
              ) : (
                "UPDATE PASSWORD →"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;