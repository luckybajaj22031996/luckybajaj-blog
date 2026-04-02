"use client";

import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import MagneticButton from "./MagneticButton";

interface FeaturedPostProps {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readingTime: string;
  pullquote?: string;
}

export default function FeaturedPost({
  slug,
  title,
  category,
  excerpt,
  date,
  readingTime,
  pullquote,
}: FeaturedPostProps) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <ScrollReveal>
      <Link
        href={`/posts/${slug}`}
        className="block mb-20 group cursor-pointer relative"
      >
        {/* Large background category label */}
        <span
          className="absolute -top-4 right-0 text-[6rem] md:text-[8rem] font-bold leading-none tracking-tight text-[var(--color-border)] opacity-50 dark:opacity-20 select-none pointer-events-none"
          style={{ fontFamily: "var(--font-display)" }}
          aria-hidden="true"
        >
          {category}
        </span>

        <div className="relative">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[var(--color-accent)]">
              Latest &middot; {category}
            </span>
            <span className="text-xs text-[var(--color-text-muted)]">
              {formattedDate} &middot; {readingTime}
            </span>
          </div>

          <h3
            className="text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[1.15] tracking-[-0.01em] text-[var(--color-text)] mb-6 max-w-3xl group-hover:text-[var(--color-accent)] transition-colors duration-500"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </h3>

          {pullquote && (
            <p
              className="text-lg italic text-[var(--color-text-muted)] leading-relaxed max-w-xl mb-6 border-l-2 border-[var(--color-accent)] pl-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              &ldquo;{pullquote}&rdquo;
            </p>
          )}

          {!pullquote && (
            <p className="text-[1.05rem] text-[var(--color-text-muted)] leading-relaxed max-w-xl mb-6 font-light">
              {excerpt}
            </p>
          )}

          <MagneticButton className="inline-block" strength={0.2}>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors duration-300">
              Read this story
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-500 group-hover:translate-x-2"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          </MagneticButton>
        </div>

        <div className="mt-10 border-b-2 border-[var(--color-text)] dark:border-[var(--color-text-muted)] group-hover:border-[var(--color-accent)] transition-colors duration-500" />
      </Link>
    </ScrollReveal>
  );
}
