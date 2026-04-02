import ScrollReveal from "./ScrollReveal";

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
  return (
    <section id="about" className="py-32 px-6 border-t border-[var(--color-border)]">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-16 md:gap-20 items-start">
        <ScrollReveal>
          <div className="md:sticky md:top-32">
            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] shadow-[0_0_10px_var(--color-accent)]" />
              About
            </span>
            <h2
              className="text-[clamp(2.5rem,4.5vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.02em] mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="block text-[var(--color-text)]">Lucky</span>
              <span className="block text-[var(--color-accent)]">Bajaj</span>
            </h2>
            <p className="text-sm uppercase tracking-[0.12em] text-[var(--color-text-muted)] mb-8">
              Product Manager &middot; Writer &middot; Mumbai
            </p>
            <div className="flex flex-wrap gap-2">
              {site.about.interests.map((interest) => (
                <span
                  key={interest}
                  className="text-xs font-medium px-3 py-1.5 border border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-300 cursor-default"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="text-[1.05rem] text-[var(--color-text-muted)] leading-[2] font-light space-y-6">
            <p dangerouslySetInnerHTML={{ __html: site.about.intro }} />
            <p dangerouslySetInnerHTML={{ __html: site.about.body }} />
            <p dangerouslySetInnerHTML={{ __html: site.about.outro }} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
