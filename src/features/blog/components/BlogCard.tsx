"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, Clock } from "lucide-react";
import { BlogPost } from "../types";
import { formatFullDateTime } from "@/utils/date";
import { siteTheme } from "@/lib/site-config";

interface BlogCardProps {
    post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
    const { blog: style } = siteTheme;
    const fallbackImage = "/images/placeholder.svg";

    const [imgSrc, setImgSrc] = useState(
        post.thumbnailUrl || fallbackImage
    );

    return (
        <article className={style.card}>
            <a href={post.link} target="_blank" rel="noopener noreferrer">
                <div className={style.imageWrapper}>
                    <Image
                        src={imgSrc}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Ye line add karo
                        className={style.image}
                        onError={() => setImgSrc(fallbackImage)}
                        priority
                    />

                    {/* Gradient Overlay wala div yahan se HATA DO */}

                    {/* Badge ko proper align kiya */}
                    <div className={style.readTimeBadge}>
                        <Clock size={14} />
                        <span>{post.readTime} min read</span>
                    </div>

                    {/* Category Badge */}
                    {post.category && (
                        <div className={style.categoryBadge}>
                            {post.category}
                        </div>
                    )}
                </div>
            </a>

            <div className={style.contentWrapper}>
                {/* DATE & TIME ALIGNMENT */}
                <div className="flex items-center justify-between mb-3">
                    <span className={style.date}>{formatFullDateTime(post.publishDate)}</span>
                    {post.category && <span className={style.categoryBadge}>{post.category}</span>}
                </div>

                <h2 className={style.title}>{post.title}</h2>
                <p className={style.excerpt}>{post.excerpt}</p>

                <div className={style.footer}>
                    <span className="relative text-sm font-medium text-[rgb(var(--color-primary-light))]">
                        Read more
                        <span className={style.footerUnderline} />
                    </span>
                    <ArrowUpRight size={16} className={style.arrowIcon} />
                </div>
            </div>
        </article>
    );
}