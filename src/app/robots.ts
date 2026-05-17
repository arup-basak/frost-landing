import type { MetadataRoute } from "next";
import { siteMeta } from "@/lib/site-meta";

// AI crawlers and training bots — search engine bots (Googlebot, Bingbot, etc.) are intentionally excluded
const BLOCKED_BOTS = [
  // OpenAI
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  // Anthropic
  "ClaudeBot",
  "Claude-Web",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  // Google AI (not search — Google-Extended opts out of Gemini training)
  "Google-Extended",
  "GoogleOther",
  // Perplexity AI
  "PerplexityBot",
  "Perplexity-User",
  // Apple AI training (Applebot for search is allowed via wildcard)
  "Applebot-Extended",
  // Amazon AI
  "Amazonbot",
  // ByteDance / TikTok
  "Bytespider",
  "ByteDance",
  "TikTokSpider",
  // Common Crawl (used for LLM training datasets)
  "CCBot",
  // Cohere
  "cohere-ai",
  "cohere-training-data-crawler",
  // Diffbot (AI data extraction)
  "Diffbot",
  // Meta AI
  "FacebookBot",
  "facebot",
  "Meta-ExternalAgent",
  "Meta-ExternalFetcher",
  // Dataset / image scrapers
  "FriendlyCrawler",
  "ImagesiftBot",
  "img2dataset",
  "VelenPublicWebCrawler",
  "Webzio-Extended",
  // Mistral
  "Mistral",
  "MistralAI-User",
  // Omgili / Brandwatch AI
  "OmgiliBot",
  "Omgili",
  // Huawei AI
  "PanguBot",
  // DuckDuckGo AI assistant (DuckDuckBot search crawler is allowed via wildcard)
  "DuckAssistBot",
  // You.com AI
  "YouBot",
  // Other AI/scraping bots
  "Kangaroo Bot",
  "iaskspider/2.0",
  "ISSCyberRiskCrawler",
  "news-please",
  "peer39_crawler",
  "peer39_crawler/1.0",
  "QuillBot",
  "Timpibot",
  "Scrapy",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...BLOCKED_BOTS.map((userAgent) => ({
        userAgent,
        disallow: "/",
      })),
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${siteMeta.url}/sitemap.xml`,
    host: siteMeta.url,
  };
}
