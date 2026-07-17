"use client";

import { BookOpen } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import AnimatedSection from "@/components/layout/AnimatedSection";
import { siteTheme } from "@/lib/theme-config";
import BlogCard from "./BlogCard";
import { BlogPost } from "../types";
import { StandardPageLabels } from "@/utils/label-helper";

interface BlogViewProps {
    posts: BlogPost[];
    labels: StandardPageLabels;
}

export default function BlogView({ posts, labels }: BlogViewProps) {
    const { blog: style } = siteTheme;

    return (
        <>
            <PageHeader
                eyebrow={labels.title}
                title={labels.headerTitle}
                description={labels.headerDesc}
            />

            <section className={style.sectionPadding}>
                <div className={style.grid}>
                    {posts.map((post, i) => (
                        <AnimatedSection key={post.id || i} delay={i * 0.06}>
                            <BlogCard post={post} />
                        </AnimatedSection>
                    ))}

                    {posts.length === 0 && (
                        <div className={style.emptyState}>
                            <BookOpen className={style.emptyIcon} />
                            <p>{labels.headerDesc}</p>
                        </div>
                    )}
                </div>
            </section>

        </>
    );
}