import Link from "next/link";
import { siteTheme } from "@/lib/site-config";
import AnimatedSection from "../layout/AnimatedSection";
import { ArrowUpRightIcon } from "../icons/icons";

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
          {actionText} <ArrowUpRightIcon size={15} />
        </Link>
      )}
    </AnimatedSection>
  );
}