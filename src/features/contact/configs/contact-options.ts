import { socialLinks } from "@/lib/site-config";
import { ContactOption } from "../types";
const platformThemeMap: Record<string, { iconColor: string; glow: string }> = {
    github: { iconColor: "text-gray-400 hover:text-white", glow: "hover:shadow-white/20" },
    linkedin: { iconColor: "text-blue-400 hover:text-blue-500", glow: "hover:shadow-blue-500/20" },
    twitter: { iconColor: "text-sky-400 hover:text-sky-500", glow: "hover:shadow-sky-500/20" },
    stackoverflow: { iconColor: "text-orange-400 hover:text-orange-500", glow: "hover:shadow-orange-500/20" },
    medium: { iconColor: "text-green-400 hover:text-green-500", glow: "hover:shadow-green-500/20" },
    email: { iconColor: "text-red-400 hover:text-red-500", glow: "hover:shadow-red-500/20" }
};
export function transformSocialLinksToOptions(): ContactOption[] {
    return socialLinks.map((link) => {
        // Default theme backup agar koi naya platform match na ho (KISS - Crash proofing)
        const theme = platformThemeMap[link.id] || {
            iconColor: "text-primary",
            glow: "hover:shadow-primary/20"
        };

        return {
            icon: link.icon,
            label: link.label,
            value: link.id,
            meta: link.displayValue, // @username ya email jo screen par dikhana hai
            themeStyles: {
                iconColor: theme.iconColor,
                glow: theme.glow,
            },
            href: link.href,
            isObfuscated: link.isEmail, // Agar email hai toh bots se bachane ke liye safe true rakhein
            obfuscateType: link.isEmail ? "email" : ("phone" as any), // Type safety backup
        };
    });
}