import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

const SITE = "https://footballcentral.com"; // must match astro.config site

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

export const GET: APIRoute = async () => {
  const posts = await getCollection("posts");
  const categories = [...new Set(posts.map((p) => p.data.category))];

  const staticPages = ["/", "/about", "/contact", "/privacy", "/blog"];

  const urls: { loc: string; lastmod?: string }[] = [];

  // Static pages
  for (const path of staticPages) {
    urls.push({ loc: `${SITE}${path}` });
  }

  // Category pages
  for (const cat of categories) {
    urls.push({ loc: `${SITE}/category/${slugify(cat)}` });
  }

  // Blog posts
  for (const post of posts) {
    const lastmod =
      post.data.publishedAt instanceof Date
        ? post.data.publishedAt.toISOString().split("T")[0]
        : undefined;

    urls.push({
      loc: `${SITE}/blog/${post.slug}`,
      lastmod,
    });
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ""}
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
};
