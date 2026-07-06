import Link from "next/link";

const footerLinks = [
  { label: "PRIVACY", href: "#" },
  { label: "TERMS", href: "#" },
  { label: "STATUS", href: "#" },
  { label: "DOCS", href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-[#0c0c0a] border-t border-white/10 px-6 py-8 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center rounded-md bg-[#E8FF4D] p-1">
            <img src="/logo/logo.svg" alt="MailCraft logo" width={18} height={18} />
          </span>
          <span className="text-sm font-bold tracking-tight text-white">
            MAILCRAFT
          </span>
          <span className="text-xs text-gray-500">© 2025</span>
        </div>

        <div className="flex items-center gap-6">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-medium text-gray-500 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/sign-in"
            className="text-xs font-medium text-[#E8FF4D] hover:underline"
          >
            SIGN IN
          </Link>
        </div>
      </div>
    </footer>
  );
}