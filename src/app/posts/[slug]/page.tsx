import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, getAdjacentPosts, getSiteData } from "@/lib/posts";
import Link from "next/link";
import Contact from "@/components/Contact";
import PageTransition from "@/components/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";
import ReadingProgress from "@/components/ReadingProgress";
import NextStory from "@/components/NextStory";
import { MDXRemote } from "next-mdx-remote/rsc";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const site = getSiteData();
  const { prev, next } = getAdjacentPosts(slug);

  if (!post) notFound();

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <PageTransition>
      <ReadingProgress />

      <article className="pt-40 pb-20 px-6 max-w-[720px] mx-auto relative z-10">
        <ScrollReveal>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.06em] text-[var(--color-accent)] mb-12 hover:gap-3 transition-all duration-300"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
            Back to all stories
          </Link>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h1
            className="text-[clamp(1.8rem,4.5vw,2.8rem)] font-bold leading-[1.2] tracking-[-0.01em] mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {post.title}
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="flex items-center gap-4 mb-12 pb-8 border-b border-[var(--color-border)]">
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[var(--color-accent)]">
              {post.category}
            </span>
            <span className="text-xs text-[var(--color-text-muted)]">
              {formattedDate} &middot; {post.readingTime}
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="post-body drop-cap">
            <MDXRemote source={post.content} />
          </div>
        </ScrollReveal>
      </article>

      <NextStory
        prev={prev ? { slug: prev.slug, title: prev.title, category: prev.category } : null}
        next={next ? { slug: next.slug, title: next.title, category: next.category } : null}
      />

      <Contact site={site} />
    </PageTransition>
  );
}
