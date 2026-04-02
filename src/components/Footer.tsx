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
    <footer className="border-t border-[var(--color-border)] py-12 px-6">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <span
            className="text-lg font-normal text-[var(--color-text)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Lucky<span className="text-[var(--color-accent)]">.</span>
          </span>
          <p className="text-xs text-[var(--color-text-muted)]">
            Stories from Mumbai, one chai at a time.
          </p>
        </div>

        <div className="flex items-center gap-8">
          {[
            { href: site.social.instagram, label: "Instagram" },
            { href: site.social.twitter, label: "Twitter" },
            { href: site.social.linkedin, label: "LinkedIn" },
            { href: `mailto:${site.email}`, label: "Email" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target={link.label !== "Email" ? "_blank" : undefined}
              rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
              className="text-xs font-medium uppercase tracking-[0.08em] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="text-xs text-[var(--color-text-muted)]">
          &copy; 2025 {site.author}
        </div>
      </div>
    </footer>
  );
}
