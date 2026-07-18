import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteTheme } from "@/lib/site-config";
import AnimatedSection from "../layout/AnimatedSection";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  actionText?: string;
  actionHref?: string;
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  actionText,
  actionHref,
  className = "",
}: SectionHeaderProps) {
  const { sectionHeader: style } = siteTheme;

  return (
    <AnimatedSection
      className={`${style.container} ${className}`.trim()}
    >
      <div>
        <p className={style.eyebrow}>{eyebrow}</p>
        <h2 className={style.title}>{title}</h2>
      </div>

      {actionText && actionHref && (
        <Link href={actionHref} className={style.actionLink}>
          {actionText} <ArrowUpRight size={15} />
        </Link>
      )}
    </AnimatedSection>
  );
}