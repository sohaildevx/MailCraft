"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "../components/ui/button";

const navLinks = [
  { label: "FEATURES", href: "#features" },
  { label: "HOW IT WORKS", href: "#how-it-works" },
  { label: "PRICING", href: "#pricing" },
  { label: "TESTIMONIALS", href: "#testimonials" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav aria-label="Main navigation" className="w-full sticky top-0 z-50 bg-[#0c0c0a]/80 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-4 md:px-12 lg:px-20 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <span className="flex items-center justify-center rounded-md bg-[#E8FF4D] p-1.5">
            <img src="/logo/logo.svg" alt="MailCraft logo" width={28} height={28} />
          </span>
          <span className="text-sm md:text-xl font-bold tracking-tight text-white">
            MAILCRAFT
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link href="/sign-in" className="hidden md:inline-flex items-center justify-center text-sm font-medium text-white hover:text-[#E8FF4D] transition-colors cursor-pointer">
            SIGN IN
          </Link>
          <Link href="/sign-up">
            <Button
              size="sm"
              className="bg-[#E8FF4D] text-black font-semibold hover:bg-[#d4eb44] text-sm md:text-base cursor-pointer p-3 md:p-5"
            >
              TRY FREE
            </Button>
          </Link>

          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`block w-5 h-0.5 bg-white transition-transform duration-200 ${
                menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-white transition-opacity duration-200 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-white transition-transform duration-200 ${
                menuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#1a1a16] border-t border-[#2a2a24] px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/sign-in"
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            SIGN IN
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
