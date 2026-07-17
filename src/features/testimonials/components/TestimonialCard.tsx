import { Quote, Star } from "lucide-react";
import { getHomeData } from "@/features/home/data";
import { siteTheme } from "@/lib/theme-config";
import { getInitials } from "@/utils/string";

type Testimonial = ReturnType<typeof getHomeData>["featuredTestimonials"][number];

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const { testimonialCard: cardStyle } = siteTheme;

  return (
    <div className={cardStyle.container}>
      <div className="flex items-center justify-between">
        <Quote size={20} className={cardStyle.quoteIcon} />

        <div className="flex gap-0.5">
          {Array.from({ length: testimonial.rating }).map((_, index) => (
            <Star
              key={index}
              size={12}
              className={cardStyle.starIcon}
            />
          ))}
        </div>
      </div>

      <p className={cardStyle.messageText}>
        &ldquo;{testimonial.message}&rdquo;
      </p>

      <div className={cardStyle.avatarContainer}>
        <span className={cardStyle.avatarBadge}>
          {getInitials(testimonial.clientName)}
        </span>

        <div>
          <p className={cardStyle.clientName}>{testimonial.clientName}</p>
          <p className={cardStyle.clientRole}>{testimonial.clientRole}</p>
        </div>
      </div>
    </div>
  );
}