import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Clock, BookOpen } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import AnimatedSection from "@/components/AnimatedSection";
import CTASection from "@/components/CTASection";
import { getLocaleServer, getTranslationServer } from "@/lib/i18n-server";
import Parser from "rss-parser";

/* ─── Types and Fetch Abstraction (Rule 1 & 2) ────────────────────────────── */

interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
  content: string;
  thumbnail: string;
  category: string;
  readTime: number;
}

async function getMediumBlogs(): Promise<MediumPost[]> {
  const parser = new Parser();

  try {
    const res = await fetch("https://medium.com/feed/@devawais", {
      next: { revalidate: 3600 },
    });
    const xmlText = await res.text();
    const feed = await parser.parseString(xmlText);

    return feed.items.map((item) => {
      const content = item["content:encoded"] || item.content || "";
      const match = content.match(/<img[^>]+src="([^">]+)"/);
      const thumbnail = match ? match[1] : "";

      // Clean snippet from HTML tags
      const rawSnippet = item["content:encodedSnippet"] || item.contentSnippet || "";
      const contentSnippet = rawSnippet.length > 160 
        ? rawSnippet.substring(0, 160).trim() + "..."
        : rawSnippet;

      // Extract category
      const rawCategory = item.categories && item.categories.length > 0 
        ? item.categories[0] 
        : "Android";
      const category = rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1);

      // Estimate read time
      const textOnly = content.replace(/<[^>]*>/g, "");
      const wordCount = textOnly.split(/\s+/).length;
      const readTime = Math.max(1, Math.ceil(wordCount / 200));

      return {
        title: item.title || "",
        link: item.link || "",
        pubDate: item.pubDate || item.isoDate || "",
        contentSnippet,
        content,
        thumbnail,
        category,
        readTime,
      };
    }) as MediumPost[];
  } catch (error) {
    console.error("Medium feed fetch error:", error);
    return [];
  }
}

export const metadata: Metadata = {
  title: "Mobile Architecture & Kotlin Multiplatform Blog",
  description: "Practical engineering notes and tutorials on Android, Kotlin Multiplatform, and Compose Multiplatform from Muhammad Awais.",
  alternates: {
    canonical: "/blog",
  }
};

function formatDate(iso: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

/* ─── BlogPage ───────────────────────────────────────────────────────────────── */

export default async function BlogPage() {
  const locale = await getLocaleServer();
  const t = getTranslationServer(locale);
  const posts = await getMediumBlogs();

  return (
    <>
      <PageHeader
        eyebrow={t("blog.title")}
        title={t("blog.headerTitle")}
        description={t("blog.headerDesc")}
      />

      <section className="pb-24">
        <div className="container-page grid gap-6 sm:grid-cols-2">
          {posts.map((post, i) => (
            <AnimatedSection key={post.link || i} delay={i * 0.06}>
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="card-surface group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary-light/40"
              >
                {/* Thumbnail Image Wrapper */}
                <div className="relative h-48 w-full overflow-hidden bg-muted/20">
                  {post.thumbnail ? (
                    <Image
                      src={post.thumbnail}
                      alt={post.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-all duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent flex items-center justify-center">
                      <BookOpen className="w-10 h-10 text-primary-light/30" />
                    </div>
                  )}
                  {/* Reading Time Badge */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className="inline-flex items-center gap-1 bg-background/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-medium text-ink">
                      <Clock size={12} className="text-primary-light" />
                      {post.readTime} min read
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-primary-light">
                      {post.category}
                    </span>
                    <span className="text-xs text-muted">{formatDate(post.pubDate)}</span>
                  </div>
                  <h2 className="mt-4 font-display text-lg font-semibold leading-snug group-hover:text-primary-light transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted line-clamp-3">
                    {post.contentSnippet || "Click to read the full deep dive on Medium."}
                  </p>
                  <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-xs font-medium text-primary-light">
                    <span>Read on Medium</span>
                    <ArrowUpRight
                      size={16}
                      className="text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary-light"
                    />
                  </div>
                </div>
              </a>
            </AnimatedSection>
          ))}

          {posts.length === 0 && (
            <div className="col-span-full py-16 text-center text-muted">
              <BookOpen className="mx-auto w-12 h-12 opacity-30 mb-4" />
              <p>No blog posts found. Check back later!</p>
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
