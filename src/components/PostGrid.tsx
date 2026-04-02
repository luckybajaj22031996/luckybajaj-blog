"use client";

import PostCard from "./PostCard";

interface Post {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readingTime: string;
}

interface PostGridProps {
  posts: Post[];
}

export default function PostGrid({ posts }: PostGridProps) {
  // Split posts into two columns for the staggered layout
  const leftPosts = posts.filter((_, i) => i % 2 === 0);
  const rightPosts = posts.filter((_, i) => i % 2 === 1);

  return (
    <div className="relative">
      {/* Desktop: staggered two-column layout */}
      <div className="hidden md:grid md:grid-cols-2 md:gap-x-12 lg:gap-x-16 relative">
        {/* Center divider line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[var(--color-border)] -translate-x-1/2" />

        {/* Left column */}
        <div>
          {leftPosts.map((post, i) => (
            <PostCard
              key={post.slug}
              slug={post.slug}
              title={post.title}
              category={post.category}
              excerpt={post.excerpt}
              date={post.date}
              readingTime={post.readingTime}
              index={i * 2}
            />
          ))}
        </div>

        {/* Right column — offset downward for stagger */}
        <div className="mt-24">
          {rightPosts.map((post, i) => (
            <PostCard
              key={post.slug}
              slug={post.slug}
              title={post.title}
              category={post.category}
              excerpt={post.excerpt}
              date={post.date}
              readingTime={post.readingTime}
              index={i * 2 + 1}
            />
          ))}
        </div>
      </div>

      {/* Mobile: clean single column */}
      <div className="md:hidden">
        {posts.map((post, i) => (
          <PostCard
            key={post.slug}
            slug={post.slug}
            title={post.title}
            category={post.category}
            excerpt={post.excerpt}
            date={post.date}
            readingTime={post.readingTime}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}
