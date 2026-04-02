"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface HeroProps {
  pullquotes: string[];
}

// Typewriter sound using Web Audio API — generates a short mechanical click
function createTypeSound(ctx: AudioContext) {
  const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.04, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    // Sharp attack, fast decay — mechanical click
    const t = i / ctx.sampleRate;
    data[i] = (Math.random() * 2 - 1) * Math.exp(-t * 120) * 0.3;
  }
  return buffer;
}

function createCarriageSound(ctx: AudioContext) {
  const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.15, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    const t = i / ctx.sampleRate;
    // Longer, lower rumble for carriage return
    data[i] =
      (Math.random() * 2 - 1) * Math.exp(-t * 25) * 0.15 +
      Math.sin(t * 200) * Math.exp(-t * 30) * 0.1;
  }
  return buffer;
}

function playBuffer(ctx: AudioContext, buffer: AudioBuffer) {
  // Always try to resume — will succeed once user has interacted
  if (ctx.state === "suspended") {
    ctx.resume();
  }
  if (ctx.state !== "running") return;

  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.playbackRate.value = 0.9 + Math.random() * 0.3;
  source.connect(ctx.destination);
  source.start();
}

export default function Hero({ pullquotes }: HeroProps) {
  // Check if animation already played this session
  const hasPlayed = typeof window !== "undefined" && sessionStorage.getItem("hero-played") === "1";

  const [typedChars, setTypedChars] = useState<
    { char: string; line: number; index: number; rotation: number; isScene: boolean }[]
  >([]);
  const [typingDone, setTypingDone] = useState(hasPlayed);
  const [caretVisible, setCaretVisible] = useState(!hasPlayed);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [lineShake, setLineShake] = useState<number | null>(null);
  const [sceneDone, setSceneDone] = useState(hasPlayed);
  const prefersReduced = useRef(false);
  const typingRef = useRef(hasPlayed);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const typeSoundRef = useRef<AudioBuffer | null>(null);
  const carriageSoundRef = useRef<AudioBuffer | null>(null);

  // Scene heading typed first, then the main title
  const sceneHeading = "INT. A WRITER'S DESK - NIGHT";

  const titleLines = [
    { text: "Stories", accentRange: null },
    { text: "about small", accentRange: [6, 11] as [number, number] },
    { text: "beautiful", accentRange: null },
    { text: "things", accentRange: null },
  ];

  // Scene heading is line 0, title lines start at 1
  const allLines = [
    { text: sceneHeading, accentRange: null, isScene: true },
    ...titleLines.map((l) => ({ ...l, isScene: false })),
  ];

  const allChars = allLines.flatMap((line, lineIdx) =>
    line.text.split("").map((char, charIdx) => ({
      char,
      line: lineIdx,
      index: charIdx,
      isAccent:
        line.accentRange !== null &&
        charIdx >= line.accentRange[0] &&
        charIdx < line.accentRange[1],
      isScene: line.isScene,
    }))
  );

  // Skip animation if already played or reduced motion
  useEffect(() => {
    prefersReduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced.current || hasPlayed) {
      const filled = allChars.map((c) => ({
        char: c.char,
        line: c.line,
        index: c.index,
        rotation: 0,
        isScene: c.isScene,
      }));
      setTypedChars(filled);
      setSceneDone(true);
      setTypingDone(true);
      setCaretVisible(false);
    }
  }, []);

  // Create audio context — needs to be in useEffect (SSR safety)
  // but also needs a user gesture listener to reliably resume
  useEffect(() => {
    if (hasPlayed) return; // No audio needed if animation already done

    try {
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;
      typeSoundRef.current = createTypeSound(ctx);
      carriageSoundRef.current = createCarriageSound(ctx);

      // Aggressively try to resume on any user gesture
      function tryResume() {
        if (ctx.state === "suspended") ctx.resume();
        if (ctx.state === "running") {
          ["mousedown", "touchstart", "keydown"].forEach((e) =>
            window.removeEventListener(e, tryResume)
          );
        }
      }

      ["mousedown", "touchstart", "keydown"].forEach((e) =>
        window.addEventListener(e, tryResume, { passive: true })
      );

      // Also try immediately
      tryResume();
    } catch {
      // Audio not available
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
        sessionStorage.setItem("hero-played", "1");
        setTimeout(() => setCaretVisible(false), 1200);
        return;
      }

      const entry = allChars[i];
      const isNewLine = entry.line !== prevLine;
      const isSpace = entry.char === " ";
      const isTransitionToTitle = prevLine === 0 && entry.line === 1;

      const rotation = entry.isScene ? 0 : (Math.random() - 0.5) * 1.4;

      // Shake effect (not on scene heading — it types cleanly)
      if (!entry.isScene) {
        setLineShake(entry.line);
        setTimeout(() => setLineShake(null), 60);
      }

      // Play type sound
      if (audioCtxRef.current && typeSoundRef.current) {
        if (isNewLine && carriageSoundRef.current) {
          playBuffer(audioCtxRef.current, carriageSoundRef.current);
        } else if (!isSpace) {
          playBuffer(audioCtxRef.current, typeSoundRef.current);
        }
      }

      setTypedChars((prev) => [
        ...prev,
        { char: entry.char, line: entry.line, index: entry.index, rotation, isScene: entry.isScene },
      ]);

      // Mark scene heading done when transitioning to title
      if (isTransitionToTitle) {
        setSceneDone(true);
      }

      prevLine = entry.line;
      i++;

      // Timing
      let delay: number;
      if (isTransitionToTitle) {
        // Longer pause after scene heading — dramatic beat
        delay = 900 + Math.random() * 200;
      } else if (isNewLine) {
        delay = 500 + Math.random() * 200;
      } else if (isSpace) {
        delay = entry.isScene ? 80 + Math.random() * 30 : 140 + Math.random() * 60;
      } else {
        // Scene heading types faster (more confident), title types slower
        if (entry.isScene) {
          delay = 50 + Math.random() * 25;
        } else {
          delay = 90 + Math.random() * 40;
          if (Math.random() < 0.1) delay += 80;
        }
      }

      setTimeout(typeNext, delay);
    }

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
        {/* Scene heading */}
        <div className="mb-6 h-8">
          {typedChars.filter((c) => c.line === 0).length > 0 && (
            <p
              className="text-xs md:text-sm tracking-[0.15em] uppercase text-[var(--color-text-muted)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {typedChars
                .filter((c) => c.line === 0)
                .map((tc, i) => (
                  <motion.span
                    key={`scene-${i}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.05 }}
                    className="inline-block"
                  >
                    {tc.char === " " ? "\u00A0" : tc.char}
                  </motion.span>
                ))}
              {currentLine === 0 && caretVisible && (
                <span className="typewriter-caret" />
              )}
            </p>
          )}
        </div>

        {/* Title */}
        <h1
          className="text-[clamp(2.8rem,7vw,5.5rem)] font-normal leading-[1.15] tracking-[0.01em] mb-12"
          style={{ fontFamily: "var(--font-hero)" }}
        >
          {titleLines.map((line, titleIdx) => {
            const lineIdx = titleIdx + 1; // offset by 1 because scene heading is line 0
            const lineChars = typedChars.filter((c) => c.line === lineIdx);
            const isCurrentLine = lineIdx === currentLine && !typingDone;
            const hasContent = lineChars.length > 0;

            return (
              <span
                key={lineIdx}
                className="block relative"
                style={{
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
                        y: [null, 1, 0],
                        scale: [null, 0.98, 1],
                      }}
                      transition={{
                        duration: 0.12,
                        ease: [0.2, 0, 0, 1],
                        y: { duration: 0.18, times: [0, 0.6, 1] },
                        scale: { duration: 0.18, times: [0, 0.6, 1] },
                      }}
                      className={`inline-block ${
                        isAccent ? "text-[var(--color-accent)] italic" : ""
                      }`}
                      style={{
                        transform: `rotate(${tc.rotation}deg)`,
                        textShadow: "0 0 0px currentColor",
                      }}
                    >
                      {tc.char === " " ? "\u00A0" : tc.char}
                    </motion.span>
                  );
                })}

                {isCurrentLine && caretVisible && hasContent && (
                  <span className="typewriter-caret" />
                )}
                {lineIdx === 1 && !hasContent && sceneDone && !typingDone && caretVisible && (
                  <span className="typewriter-caret" />
                )}
                {typingDone &&
                  titleIdx === titleLines.length - 1 &&
                  caretVisible && <span className="typewriter-caret" />}
              </span>
            );
          })}
        </h1>

        {/* Subtitle + CTA */}
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
