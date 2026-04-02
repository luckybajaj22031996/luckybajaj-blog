"use client";

import ScrollReveal from "./ScrollReveal";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface AboutProps {
  site: {
    about: {
      intro: string;
      body: string;
      outro: string;
      interests: string[];
    };
  };
}

export default function About({ site }: AboutProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="about"
      className="py-32 px-6 border-t border-[var(--color-border)]"
    >
      <div className="max-w-[800px] mx-auto">
        {/* Screenplay-style character introduction */}
        <ScrollReveal>
          <span className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-10 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] shadow-[0_0_10px_var(--color-accent)]" />
            About
          </span>
        </ScrollReveal>

        {/* Scene heading */}
        <ScrollReveal delay={0.1}>
          <p
            className="text-xs md:text-sm tracking-[0.15em] uppercase text-[var(--color-text-muted)] mb-10"
            style={{ fontFamily: "var(--font-display)" }}
          >
            INT. MUMBAI APARTMENT - EVENING
          </p>
        </ScrollReveal>

        {/* Photo — grayscale, masked, like a casting headshot */}
        <ScrollReveal delay={0.12}>
          <div className="flex justify-center mb-10">
            <div
              className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden"
            >
              <Image
                src="/lucky.jpg"
                alt="Lucky Bajaj"
                fill
                sizes="192px"
                className="object-cover object-[center_30%] grayscale contrast-[1.1]"
              />
            </div>
          </div>
        </ScrollReveal>

        {/* Character name — screenplay style: centered, uppercase */}
        <ScrollReveal delay={0.15}>
          <h2
            className="text-center text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.05] tracking-[0.05em] uppercase mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Lucky Bajaj
          </h2>
          <p className="text-center text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)] mb-12">
            Product Manager &middot; Writer &middot; Mumbai
          </p>
        </ScrollReveal>

        {/* Character description — like screenplay action lines */}
        <div ref={ref} className="space-y-0">
          {[site.about.intro, site.about.body, site.about.outro].map(
            (paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{
                  duration: 0.7,
                  delay: i * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-[1rem] text-[var(--color-text-muted)] leading-[2] font-light mb-6"
                dangerouslySetInnerHTML={{ __html: paragraph }}
              />
            )
          )}
        </div>

        {/* Interests — styled as parenthetical character notes */}
        <ScrollReveal delay={0.3}>
          <div className="mt-10 pt-8 border-t border-[var(--color-border)]">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-[var(--color-text-muted)] mb-5">
              (character notes)
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {site.about.interests.map((interest, i) => (
                <motion.span
                  key={interest}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.5 + i * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors duration-300 cursor-default"
                >
                  {interest}
                </motion.span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
