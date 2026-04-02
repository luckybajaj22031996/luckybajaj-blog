"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface HeroProps {
  pullquotes: string[];
}

export default function Hero({ pullquotes }: HeroProps) {
  const [typedChars, setTypedChars] = useState<
    { char: string; line: number; index: number; rotation: number }[]
  >([]);
  const [typingDone, setTypingDone] = useState(false);
  const [caretVisible, setCaretVisible] = useState(true);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [lineShake, setLineShake] = useState<number | null>(null);
  const prefersReduced = useRef(false);
  const typingRef = useRef(false);

  const lines = [
    { text: "Stories", accentRange: null },
    { text: "about small", accentRange: [6, 11] as [number, number] }, // "small" starts at index 6
    { text: "beautiful", accentRange: null },
    { text: "things", accentRange: null },
  ];

  const allChars = lines.flatMap((line, lineIdx) =>
    line.text.split("").map((char, charIdx) => ({
      char,
      line: lineIdx,
      index: charIdx,
      isAccent:
        line.accentRange !== null &&
        charIdx >= line.accentRange[0] &&
        charIdx < line.accentRange[1],
    }))
  );

  // Check for reduced motion
  useEffect(() => {
    prefersReduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced.current) {
      setTypedChars(
        allChars.map((c) => ({
          char: c.char,
          line: c.line,
          index: c.index,
          rotation: 0,
        }))
      );
      setTypingDone(true);
      setCaretVisible(false);
    }
  }, []);

  // Typewriter engine
  useEffect(() => {
    if (prefersReduced.current || typingRef.current) return;
    typingRef.current = true;

    let i = 0;
    let prevLine = 0;

    function typeNext() {
      if (i >= allChars.length) {
        setTypingDone(true);
        setTimeout(() => setCaretVisible(false), 1200);
        return;
      }

      const entry = allChars[i];
      const isNewLine = entry.line !== prevLine;
      const isSpace = entry.char === " ";

      // Random tiny rotation for imperfection (-0.7 to 0.7 degrees)
      const rotation = (Math.random() - 0.5) * 1.4;

      // Trigger line shake on each character
      setLineShake(entry.line);
      setTimeout(() => setLineShake(null), 60);

      setTypedChars((prev) => [
        ...prev,
        { char: entry.char, line: entry.line, index: entry.index, rotation },
      ]);

      prevLine = entry.line;
      i++;

      // Timing: slower, more deliberate, with human variation
      let delay: number;
      if (isNewLine) {
        // Carriage return pause - the big mechanical moment
        delay = 500 + Math.random() * 200;
      } else if (isSpace) {
        delay = 140 + Math.random() * 60;
      } else {
        // Base keystroke: 90-130ms with occasional hesitation
        delay = 90 + Math.random() * 40;
        // 10% chance of a tiny hesitation (like finding the right key)
        if (Math.random() < 0.1) delay += 80;
      }

      setTimeout(typeNext, delay);
    }

    // Initial pause before typing starts
    setTimeout(typeNext, 700);
  }, []);

  // Cycle pull quotes
  useEffect(() => {
    if (!typingDone || pullquotes.length === 0) return;
    const timer = setInterval(() => {
      setQuoteIndex((q) => (q + 1) % pullquotes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [typingDone, pullquotes]);

  // Get the current line being typed (for caret placement)
  const currentLine =
    typedChars.length > 0 ? typedChars[typedChars.length - 1].line : 0;

  return (
    <section className="min-h-screen flex items-center justify-start relative overflow-hidden px-6 pt-32 pb-20 md:pt-40 md:pb-28">
      {/* Mumbai watercolor — seamless background */}
      <div
        className="absolute left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-0 top-1/2 -translate-y-[50%] w-[350px] h-[350px] md:w-[750px] md:h-[550px] pointer-events-none opacity-[0.10] md:opacity-[0.14] dark:opacity-[0.06] dark:md:opacity-[0.09]"
        aria-hidden="true"
        style={{
          maskImage: "radial-gradient(ellipse 80% 70% at 70% 50%, black 20%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 70% 50%, black 20%, transparent 70%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/mumbai-watercolor.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-[1200px] mx-auto w-full relative z-10">
        {/* Headline */}
        <h1
          className="text-[clamp(2.8rem,7vw,5.5rem)] font-normal leading-[1.15] tracking-[0.01em] mb-12"
          style={{ fontFamily: "var(--font-hero)" }}
        >
          {lines.map((line, lineIdx) => {
            const lineChars = typedChars.filter((c) => c.line === lineIdx);
            const isCurrentLine = lineIdx === currentLine && !typingDone;
            const hasContent = lineChars.length > 0;

            return (
              <span
                key={lineIdx}
                className="block relative"
                style={{
                  // Micro-shake when a key strikes on this line
                  transform:
                    lineShake === lineIdx
                      ? `translateX(${(Math.random() - 0.5) * 1.2}px)`
                      : "none",
                  transition: "transform 0.04s ease-out",
                }}
              >
                {lineChars.map((tc, i) => {
                  const isAccent =
                    line.accentRange !== null &&
                    tc.index >= line.accentRange[0] &&
                    tc.index < line.accentRange[1];

                  return (
                    <motion.span
                      key={`${lineIdx}-${i}`}
                      initial={{
                        opacity: 0,
                        y: -6,
                        scale: 1.06,
                      }}
                      animate={{
                        opacity: 1,
                        y: [null, 1, 0], // overshoot: slam past 0, bounce back
                        scale: [null, 0.98, 1], // slight compression on impact
                      }}
                      transition={{
                        duration: 0.12,
                        ease: [0.2, 0, 0, 1],
                        y: { duration: 0.18, times: [0, 0.6, 1] },
                        scale: { duration: 0.18, times: [0, 0.6, 1] },
                      }}
                      className={`inline-block ${
                        isAccent
                          ? "text-[var(--color-accent)] italic"
                          : ""
                      }`}
                      style={{
                        // Tiny imperfect rotation per character
                        transform: `rotate(${tc.rotation}deg)`,
                        // Ink impression: brief text shadow on arrival
                        textShadow: "0 0 0px currentColor",
                      }}
                    >
                      {tc.char === " " ? "\u00A0" : tc.char}
                    </motion.span>
                  );
                })}

                {/* Block caret - solid rectangle like a real typewriter/terminal */}
                {isCurrentLine && caretVisible && hasContent && (
                  <span className="typewriter-caret" />
                )}
                {/* Caret on first line before any typing */}
                {lineIdx === 0 &&
                  !hasContent &&
                  !typingDone &&
                  caretVisible && <span className="typewriter-caret" />}
                {/* Caret at the very end when done */}
                {typingDone &&
                  lineIdx === lines.length - 1 &&
                  caretVisible && <span className="typewriter-caret" />}
              </span>
            );
          })}
        </h1>

        {/* Subtitle + CTA — fade in after typing */}
        <motion.div
          initial={
            prefersReduced.current
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 12 }
          }
          animate={typingDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-lg"
        >
          <p className="text-[1.05rem] text-[var(--color-text-muted)] leading-relaxed mb-8 font-light">
            Stories about the small, beautiful moments we often forget to notice
            — written from Mumbai, one chai at a time.
          </p>
          <Link
            href="#stories"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors duration-300 group"
          >
            Read the stories
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
        </motion.div>

        {/* Cycling pull quotes */}
        {pullquotes.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={typingDone ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
            className="mt-20 max-w-md"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={quoteIndex}
                initial={{ opacity: 0, filter: "blur(8px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(8px)" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm text-[var(--color-text-muted)] italic leading-relaxed"
                style={{ fontFamily: "var(--font-display)" }}
              >
                &ldquo;{pullquotes[quoteIndex]}&rdquo;
              </motion.p>
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
