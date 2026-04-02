import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import MagneticButton from "./MagneticButton";

interface ContactProps {
  site: {
    email: string;
    social: { instagram: string; twitter: string; linkedin: string };
  };
}

export default function Contact({ site }: ContactProps) {
  return (
    <section
      id="contact"
      className="py-32 px-6 border-t border-[var(--color-border)] text-center relative overflow-hidden"
    >
      <div className="max-w-xl mx-auto relative z-10">
        <ScrollReveal>
          <span className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-4 inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] shadow-[0_0_10px_var(--color-accent)]" />
            Get in touch
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2
            className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-[1.2] mb-5 mt-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Let&rsquo;s have a{" "}
            <em className="text-[var(--color-accent)] not-italic italic">
              chai
            </em>{" "}
            sometime
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-[var(--color-text-muted)] mb-10 font-light">
            Or just drop a message &mdash; even if it&rsquo;s a movie
            recommendation.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <MagneticButton className="inline-block" strength={0.25}>
          <Link
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-3 px-8 py-4 border border-[var(--color-border)] text-sm font-medium text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-500 group"
          >
            {site.email}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
          </MagneticButton>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="flex justify-center gap-8 mt-10">
            {[
              { href: site.social.instagram, label: "Instagram" },
              { href: site.social.twitter, label: "Twitter" },
              { href: site.social.linkedin, label: "LinkedIn" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium uppercase tracking-[0.08em] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--color-accent)] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
