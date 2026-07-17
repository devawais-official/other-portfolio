import type { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";

export interface ContactInfoItem {
    id: string;
    icon: LucideIcon;
    label: string;
    isLink: boolean;
    href?: string;
}

export interface ContactOption {
    icon: LucideIcon | IconType; // Support both React Icons and Lucide Icons cleanly
    label: string;
    value: string;
    meta: string;
    themeStyles: {
        iconColor: string;
        glow: string;
    };
    href: string;
    isObfuscated: boolean;
    obfuscateType: "email" | "phone";
}