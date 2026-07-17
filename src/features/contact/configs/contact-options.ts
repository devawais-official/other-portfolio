import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";
import { ContactOption } from "../types";
import { siteTheme } from "@/lib/theme-config"; // 🎯 Direct Theme Import

export const transformSocialLinksToOptions = (
    socialLinks: Array<{ label: string; href: string; icon: LucideIcon | IconType; isEmail?: boolean }>
): ContactOption[] => {
    const channels = siteTheme.contact.channels;

    return socialLinks.map((link) => {
        // Safe check for channel config
        const theme = channels[link.label as keyof typeof channels] || channels.Default;

        const displayValue = link.isEmail
            ? link.href.replace("mailto:", "")
            : `@${link.href.replace(/https?:\/\/(www\.)?(github|linkedin)\.com\/(in\/)?/, "").replace(/\/$/, "")}`;

        return {
            icon: link.icon,
            label: theme.labelSuffix,
            value: displayValue,
            meta: theme.meta,
            themeStyles: {
                iconColor: theme.iconColor,
                glow: theme.glow,
            },
            href: link.isEmail && !link.href.startsWith("mailto:") ? `mailto:${link.href}` : link.href,
            isObfuscated: !!link.isEmail,
            obfuscateType: "email",
        };
    });
};