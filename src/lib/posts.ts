import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  pullquote?: string;
  content: string;
  excerpt: string;
  readingTime: string;
}

function getExcerpt(content: string, length = 160): string {
  const text = content.replace(/<[^>]*>/g, "").replace(/\n+/g, " ").trim();
  return text.length > length ? text.substring(0, length) + "..." : text;
}

function getReadingTime(content: string): string {
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

export function getAllPosts(): Post[] {
  const files = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || "Untitled",
      date: data.date ? new Date(data.date).toISOString() : "",
      category: data.category || "Uncategorized",
      pullquote: data.pullquote || undefined,
      content,
      excerpt: getExcerpt(content),
      readingTime: getReadingTime(content),
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): Post | undefined {
  const files = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));
  const filename = files.find((f) => f.replace(/\.md$/, "") === slug);
  if (!filename) return undefined;

  const filePath = path.join(postsDirectory, filename);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || "Untitled",
    date: data.date ? new Date(data.date).toISOString() : "",
    category: data.category || "Uncategorized",
    pullquote: data.pullquote || undefined,
    content,
    excerpt: getExcerpt(content),
    readingTime: getReadingTime(content),
  };
}

export function getSiteData() {
  const filePath = path.join(process.cwd(), "content/site.json");
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw);
}
