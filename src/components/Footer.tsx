import Link from "next/link";

interface FooterProps {
  site: {
    author: string;
    social: { instagram: string; twitter: string; linkedin: string };
    email: string;
  };
}

export default function Footer({ site }: FooterProps) {
  return (
    <footer className="border-t border-[var(--color-border)] pt-16 pb-10 px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Screenplay end mark */}
        <div className="text-center mb-16">
          <p
            className="text-xs tracking-[0.2em] uppercase text-[var(--color-text-muted)] mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            FADE OUT.
          </p>
          <div className="w-12 h-px bg-[var(--color-border)] mx-auto" />
        </div>

        {/* Main footer content */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-10">
          {/* Left: branding */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span
              className="text-2xl font-bold text-[var(--color-text)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Lucky<span className="text-[var(--color-accent)]">.</span>
            </span>
            <p className="text-xs text-[var(--color-text-muted)] max-w-[280px] text-center md:text-left leading-relaxed">
              Stories about the small, beautiful moments we often forget to
              notice — written from Mumbai, one chai at a time.
            </p>
          </div>

          {/* Center: social links */}
          <div className="flex items-center gap-8">
            {[
              { href: site.social.instagram, label: "IG" },
              { href: site.social.twitter, label: "X" },
              { href: site.social.linkedin, label: "IN" },
              { href: `mailto:${site.email}`, label: "@" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.label !== "@" ? "_blank" : undefined}
                rel={link.label !== "@" ? "noopener noreferrer" : undefined}
                className="text-sm font-bold text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors duration-300 w-8 h-8 flex items-center justify-center border border-[var(--color-border)] hover:border-[var(--color-accent)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: copyright */}
          <div className="text-center md:text-right">
            <p className="text-[0.65rem] text-[var(--color-text-muted)] leading-relaxed">
              &copy; 2025 {site.author}
            </p>
            <p className="text-[0.6rem] text-[var(--color-text-muted)] opacity-50 mt-1">
              Set in Courier Prime
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
