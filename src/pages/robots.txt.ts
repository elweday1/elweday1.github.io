import type { APIRoute } from "astro";
import { SITE } from "@config";

export const GET: APIRoute = () => {
  // Clean the base URL and ensure https:// is present
  const base = SITE.website.replace(/^https?:\/\//, "");
  const sitemapUrl = `https://${base.replace(/\/$/, "")}/sitemap-index.xml`;

  const robots = `
User-agent: Googlebot
Disallow: /nogooglebot/

User-agent: *
Allow: /

Sitemap: ${sitemapUrl}
`.trim();

  return new Response(robots, {
    headers: { "Content-Type": "text/plain" },
  });
};