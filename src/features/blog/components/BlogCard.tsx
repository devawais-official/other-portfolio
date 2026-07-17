"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, Clock } from "lucide-react";
import { BlogPost } from "../types";
import { formatFullDateTime } from "@/utils/date";
import { siteTheme } from "@/lib/theme-config";

interface BlogCardProps {
    post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
    const { blog: style } = siteTheme;
    const fallbackImage = "/images/blog-fallback.jpg";

    const [imgSrc, setImgSrc] = useState(
        post.thumbnailUrl || fallbackImage
    );

    return (
        <article className={style.card}>
            {/* IMAGE AREA */}
            <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
            >
                <div className={style.imageWrapper}>
                    <Image
                        src={imgSrc}
                        alt={post.title || "blog"}
                        width={400}
                        height={200}
                        className={style.image}
                        onError={() => setImgSrc(fallbackImage)}
                    />

                    {/* Gradient Screen */}
                    <div className={style.imageOverlay} />

                    {/* Meta Time Badge */}
                    <div className={style.readTimeBadge}>
                        <Clock size={10} />
                        {post.readTime}m
                    </div>

                    {/* Dynamic Tag */}
                    {post.category && (
                        <div className={style.categoryBadge}>
                            {post.category}
                        </div>
                    )}
                </div>
            </a>

            {/* CONTENT AREA */}
            <div className={style.contentWrapper}>
                <span className={style.date}>
                    {formatFullDateTime(post.publishDate)}
                </span>

                <h2 className={style.title}>
                    {post.title}
                </h2>

                {post.excerpt && (
                    <p className={style.excerpt}>
                        {post.excerpt}
                    </p>
                )}

                {/* INTERACTION FOOTER */}
                <div className={style.footer}>
                    <span className="relative">
                        Read
                        <span className={style.footerUnderline} />
                    </span>

                    <ArrowUpRight
                        size={13}
                        className={style.arrowIcon}
                    />
                </div>
            </div>
        </article>
    );
}