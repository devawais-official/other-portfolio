import { siteTheme } from "@/lib/site-config";
import { SERVICES_ICON_MAP, LocalizedServiceItem } from "../configs/services-config";
import { Smartphone } from "lucide-react";

interface ServiceCardProps {
    service: LocalizedServiceItem;
}

export default function ServiceCard({ service }: ServiceCardProps) {
    const Icon = SERVICES_ICON_MAP[service.iconName] || Smartphone;
    const styles = siteTheme.services; // 👈 Layout classes extracted cleanly

    return (
        <div className={styles.card}>
            <div>
                {/* Centralized Icon Wrapper styling */}
                <span className={styles.iconContainer}>
                    <Icon size={20} />
                </span>

                {/* Content with theme extracted styles */}
                <h2 className={styles.title}>
                    {service.title}
                </h2>
                <p className={styles.description}>
                    {service.description}
                </p>
            </div>

            {/* Tech Badges mapping clean classes */}
            <div className={styles.badgeContainer}>
                {service.tech.map((tech) => (
                    <span key={tech} className={styles.badge}>
                        {tech}
                    </span>
                ))}
            </div>
        </div>
    );
}