import Link from "next/link";

export function CTA() {
  return (
    <section className="bg-[#E8FF4D] px-6 py-24 md:py-32">
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-8">
        <span className="flex items-center justify-center w-12 h-12 bg-[#0c0c0a] rounded-lg">
          <img src="/logo/logo.svg" alt="MailCraft" width={28} height={28} />
        </span>

        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-[#0c0c0a] leading-tight">
          STOP STARING <br />
          AT A BLANK SCREEN.
        </h2>

        <p className="text-base md:text-lg text-[#0c0c0a]/70 max-w-xl font-mono">
          Join 12,400+ professionals who use Mailcraft to write better emails, faster. Free forever — no credit card required.
        </p>

        <Link href="/sign-up">
          <button className="bg-[#0c0c0a] text-[#E8FF4D] px-8 py-4 rounded-lg text-sm font-semibold tracking-wider hover:bg-gray-900 transition-colors cursor-pointer">
            GENERATE YOUR FIRST EMAIL →
          </button>
        </Link>
      </div>
    </section>
  );
}