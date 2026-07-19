import { siteTheme } from "@/lib/site-config";
import { SERVICES_ICON_MAP, LocalizedServiceItem } from "../configs/services-config";

interface ServiceCardProps {
    service: LocalizedServiceItem;
}

export default function ServiceCard({ service }: ServiceCardProps) {
    // Map se icon nikala
    const Icon = SERVICES_ICON_MAP[service.iconName];
    const styles = siteTheme.services;

    return (
        <div className={styles.card}>
            <div>
                <span className={styles.iconContainer}>
                    {Icon ? <Icon size={20} /> : <div style={{ width: 20, height: 20 }} />}
                </span>

                <h2 className={styles.title}>
                    {service.title}
                </h2>
                <p className={styles.description}>
                    {service.description}
                </p>
            </div>

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