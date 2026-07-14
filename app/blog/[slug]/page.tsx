import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import CTASection from "@/components/CTASection";
import SchemaMarkup from "@/components/SchemaMarkup";
import { blogPosts } from "@/lib/data/blogPosts";
import { getLocaleServer, getTranslationServer } from "@/lib/i18n-server";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return {};

  // Enforce 50-60 character length rule for meta title
  const rawTitle = `${post.title} — Mobile Blog`;
  const title = rawTitle.length > 60 ? rawTitle.substring(0, 60) : rawTitle;

  return {
    title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${params.slug}`,
    }
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const locale = await getLocaleServer();
  const t = getTranslationServer(locale);

  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const articleSchema = {
    headline: post.title,
    description: post.excerpt,
    datePublished: `${post.date}T00:00:00Z`,
    author: {
      "@type": "Person",
      "name": "Muhammad Awais"
    }
  };

  return (
    <>
      <SchemaMarkup type="Article" data={articleSchema} />

      <section className="pb-10 pt-14 sm:pt-20">
        <div className="container-page max-w-2xl">
          <AnimatedSection>
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
              <ArrowLeft size={15} /> {t("blog.backToBlog")}
            </Link>
            <div className="mt-6 flex items-center gap-3">
              <span className="rounded-full bg-primary/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-primary-light">
                {post.category}
              </span>
              <span className="text-xs text-muted">
                {formatDate(post.date)} · {post.readTime}
              </span>
            </div>
            <h1 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl">{post.title}</h1>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-page max-w-2xl">
          <AnimatedSection delay={0.08} className="space-y-5 border-t border-border pt-8">
            <p className="text-base leading-relaxed text-muted">{post.content}</p>
          </AnimatedSection>
        </div>
      </section>

      <CTASection />
    </>
  );
}
