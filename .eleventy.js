const markdownIt = require("markdown-it");

module.exports = function (eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("static");

  // Markdown config
  const md = markdownIt({ html: true, breaks: true, linkify: true });
  eleventyConfig.setLibrary("md", md);

  // Collection: all posts sorted by date
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/posts/*.md")
      .sort((a, b) => b.date - a.date);
  });

  // Collection: by category
  eleventyConfig.addCollection("categories", function (collectionApi) {
    const posts = collectionApi.getFilteredByGlob("src/posts/*.md");
    const categories = {};
    posts.forEach((post) => {
      const cat = post.data.category || "Uncategorized";
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(post);
    });
    return categories;
  });

  // Date filter
  eleventyConfig.addFilter("dateDisplay", function (date) {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  // Reading time filter
  eleventyConfig.addFilter("readingTime", function (content) {
    const words = (content || "").split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  });

  // Excerpt filter
  eleventyConfig.addFilter("excerpt", function (content) {
    if (!content) return "";
    const text = content.replace(/<[^>]*>/g, "").replace(/\n+/g, " ").trim();
    return text.length > 180 ? text.substring(0, 180) + "..." : text;
  });

  // Slug filter for categories
  eleventyConfig.addFilter("slug", function (str) {
    return (str || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
