import { useMemo } from "react";
import { BsGithub } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { Mail } from "lucide-react";
import { siteConfig, socialLinks } from "@/lib/site-config";

const iconMap = {
    email: Mail,
    github: BsGithub,
    linkedin: FaLinkedinIn,
};

export function useSocialLinks() {
    return useMemo(() => {
        const formattedLinks = socialLinks.map((link) => ({
            label: link.label,
            href: link.href,
            displayValue: link.displayValue,
            isEmail: link.isEmail,
            icon: iconMap[link.id as keyof typeof iconMap] || link.icon,
        }));

        return [
            ...formattedLinks,
            {
                label: "Email",
                href: `mailto:${siteConfig.email}`,
                displayValue: siteConfig.email,
                isEmail: true,
                icon: Mail
            }
        ];
    }, []);
}