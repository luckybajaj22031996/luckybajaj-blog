import { getAllPosts, getSiteData } from "@/lib/posts";
import Hero from "@/components/Hero";
import FeaturedPost from "@/components/FeaturedPost";
import PostGrid from "@/components/PostGrid";
import About from "@/components/About";
import Contact from "@/components/Contact";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";

export default function Home() {
  const posts = getAllPosts();
  const site = getSiteData();
  const featured = posts[0];
  const rest = posts.slice(1);

  // Collect pullquotes for the hero cycler
  const pullquotes = posts
    .filter((p) => p.pullquote)
    .map((p) => p.pullquote as string)
    .slice(0, 5);

  return (
    <PageTransition>
      <Hero pullquotes={pullquotes} />

      {/* STORIES */}
      <section id="stories" className="py-24 px-6">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal>
            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] shadow-[0_0_10px_var(--color-accent)]" />
              Writing
            </span>
            <h2
              className="text-[clamp(1.8rem,3.5vw,2.5rem)] font-bold tracking-[-0.01em] mb-16"
              style={{ fontFamily: "var(--font-display)" }}
            >
              All Stories
            </h2>
          </ScrollReveal>

          {/* Featured */}
          {featured && (
            <FeaturedPost
              slug={featured.slug}
              title={featured.title}
              category={featured.category}
              excerpt={featured.excerpt}
              date={featured.date}
              readingTime={featured.readingTime}
              pullquote={featured.pullquote}
            />
          )}

          {/* Staggered grid */}
          <PostGrid posts={rest} />
        </div>
      </section>

      <About site={site} />
      <Contact site={site} />
    </PageTransition>
  );
}
