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
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.6,
        delay: (index % 3) * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link
        href={`/posts/${slug}`}
        className="block py-6 border-b border-[var(--color-border)] group cursor-pointer transition-all duration-500"
      >
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[var(--color-accent)] mb-3 block">
          {category}
        </span>
        <h4
          className="text-lg font-bold text-[var(--color-text)] mb-2 leading-snug group-hover:text-[var(--color-accent)] transition-colors duration-300"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title}
        </h4>
        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-3 font-light">
          {excerpt}
        </p>
        <span className="text-xs text-[var(--color-text-muted)] font-light">
          {formattedDate} &middot; {readingTime}
        </span>
      </Link>
    </motion.div>
  );
}
