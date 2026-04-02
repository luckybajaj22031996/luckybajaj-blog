"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface PostCardProps {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readingTime: string;
  index: number;
}

export default function PostCard({
  slug,
  title,
  category,
  excerpt,
  date,
  readingTime,
  index,
}: PostCardProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link
        href={`/posts/${slug}`}
        className="block group cursor-pointer py-7 border-b border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all duration-500 relative"
      >
        {/* Hover indicator line */}
        <span className="absolute left-0 top-0 w-[2px] h-0 bg-[var(--color-accent)] transition-all duration-500 group-hover:h-full" />

        <div className="pl-0 group-hover:pl-4 transition-all duration-500">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-accent)]">
              {category}
            </span>
            <span className="text-[0.65rem] text-[var(--color-text-muted)] tabular-nums">
              {formattedDate}
            </span>
          </div>

          <h4
            className="text-base md:text-lg font-bold text-[var(--color-text)] leading-snug mb-2 group-hover:text-[var(--color-accent)] transition-colors duration-300"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </h4>

          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed font-light line-clamp-2 mb-3">
            {excerpt}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-[0.65rem] text-[var(--color-text-muted)]">
              {readingTime}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[0.65rem] font-medium text-[var(--color-text-muted)] opacity-0 group-hover:opacity-100 group-hover:text-[var(--color-accent)] transition-all duration-300 translate-x-[-4px] group-hover:translate-x-0">
              Read
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
