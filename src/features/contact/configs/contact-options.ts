

import { socialLinks } from "@/lib/site-config";
import type { ContactOption } from "../types";

const platformThemeMap: Record<string, { iconColor: string; glow: string }> = {
    github: { iconColor: "text-gray-100 hover:text-white", glow: "hover:shadow-white/30" },
    linkedin: { iconColor: "text-blue-300 hover:text-blue-400", glow: "hover:shadow-blue-400/30" },
    twitter: { iconColor: "text-sky-300 hover:text-sky-400", glow: "hover:shadow-sky-400/30" },
    stackoverflow: { iconColor: "text-orange-300 hover:text-orange-400", glow: "hover:shadow-orange-400/30" },
    medium: { iconColor: "text-green-300 hover:text-green-400", glow: "hover:shadow-green-400/30" },
    email: { iconColor: "text-red-300 hover:text-red-400", glow: "hover:shadow-red-400/30" },
};

export function transformSocialLinksToOptions(): ContactOption[] {
    return socialLinks.map((link) => {
        const theme = platformThemeMap[link.id] || {
            iconColor: "text-primary",
            glow: "hover:shadow-primary/20",
        };

        return {
            icon: link.icon,
            label: link.label,
            value: link.id,
            meta: link.displayValue, // Handles (@devawais, email) to display on screen
            themeStyles: {
                iconColor: theme.iconColor,
                glow: theme.glow,
            },
            href: link.href,
            isObfuscated: Boolean(link.isEmail),
            obfuscateType: link.isEmail ? "email" : "phone",
        };
    });
}