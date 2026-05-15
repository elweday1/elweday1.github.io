import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import sitemap from "@astrojs/sitemap";
import { SITE, RESUME } from "./src/config";
import compress from "astro-compress";
import preload from "astro-preload";
import remarkMermaid from "remark-mermaidjs";
import cloudflare from "@astrojs/cloudflare";

/*
const browser = await playwright.launch({
  args: chromium.args,
  executablePath: await chromium.executablePath(),
});
*/

// https://astro.build/config
export default defineConfig({
  site: "https://" + SITE.website,
  adapter: cloudflare(),
  devToolbar: {
    enabled: false,
  },
  integrations: [
    preload(),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
    compress(),
  ],
  markdown: {
    syntaxHighlight: "shiki",
    remarkPlugins: [
      [
        remarkToc,
        {
          heading: "Contents",
          tight: true,
          maxDepth: 3,
        },
      ],
      [
        remarkCollapse,
        {
          test: "Contents",
          content: "show contents",
        },
      ],
      //[stripMarkdown, {}]
    ],
    smartypants: true,
    shikiConfig: {
      wrap: true,
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    },
  },
  output: "server",
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  scopedStyleStrategy: "where",
});
