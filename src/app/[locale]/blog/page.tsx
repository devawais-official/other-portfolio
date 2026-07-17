// src/app/[locale]/blog/page.tsx
import { fetchMediumBlogs } from "@/features/blog/services/medium-service";
import BlogView from "@/features/blog/components/BlogView";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { getTranslationServer } from "@/i18n/i18n-server";
import { getStandardPageLabels } from "@/utils/label-helper";

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}
export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "blog");
}
export default async function BlogPage({ params }: BlogPageProps) {
  const posts = await fetchMediumBlogs("devawais");
  const { locale } = await params;
  const translate = getTranslationServer(locale as any);

  const labels = getStandardPageLabels(translate, "blog");

  return <BlogView posts={posts} labels={labels} />;
}