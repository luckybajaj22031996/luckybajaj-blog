"use client";

import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

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
        className="block mb-16 group cursor-pointer"
      >
        <div className="flex items-center gap-4 mb-6">
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[var(--color-accent)]">
            {category}
          </span>
          <span className="text-xs text-[var(--color-text-muted)]">
            {formattedDate} &middot; {readingTime}
          </span>
        </div>
        <h3
          className="text-[clamp(1.6rem,3.5vw,2.5rem)] font-bold leading-[1.2] tracking-[-0.01em] text-[var(--color-text)] mb-6 max-w-2xl group-hover:text-[var(--color-accent)] transition-colors duration-500"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title}
        </h3>
        <p className="text-[1.05rem] text-[var(--color-text-muted)] leading-relaxed max-w-xl mb-6 font-light">
          {excerpt}
        </p>
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
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </span>
        <div className="mt-8 border-b border-[var(--color-border)]" />
      </Link>
    </ScrollReveal>
  );
}
