"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface StoryLink {
  slug: string;
  title: string;
  category: string;
}

interface NextStoryProps {
  prev: StoryLink | null;
  next: StoryLink | null;
}

export default function NextStory({ prev, next }: NextStoryProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  if (!prev && !next) return null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-[720px] mx-auto px-6 pb-20"
    >
      <div className="border-t border-[var(--color-border)] pt-12">
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-[var(--color-text-muted)] mb-8 block">
          Continue reading
        </span>
        <div className={`grid gap-8 ${prev && next ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
          {prev && (
            <Link
              href={`/posts/${prev.slug}`}
              className="group block"
            >
              <span className="text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-[var(--color-text-muted)] mb-2 flex items-center gap-2">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:-translate-x-1"
                >
                  <path d="M19 12H5" />
                  <path d="m12 19-7-7 7-7" />
                </svg>
                Previous
              </span>
              <span className="text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-[var(--color-accent)] block mb-1">
                {prev.category}
              </span>
              <span
                className="text-base font-bold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors duration-300 block leading-snug"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {prev.title}
              </span>
            </Link>
          )}
          {next && (
            <Link
              href={`/posts/${next.slug}`}
              className={`group block ${prev ? "md:text-right" : ""}`}
            >
              <span className={`text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-[var(--color-text-muted)] mb-2 flex items-center gap-2 ${prev ? "md:justify-end" : ""}`}>
                Next
                <svg
                  width="14"
                  height="14"
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
              <span className="text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-[var(--color-accent)] block mb-1">
                {next.category}
              </span>
              <span
                className="text-base font-bold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors duration-300 block leading-snug"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {next.title}
              </span>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}
