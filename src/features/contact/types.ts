

export interface ContactInfoItem {
    id: string;
    icon: React.ComponentType<any>;
    label: string;
    isLink: boolean;
    href?: string;
}

export interface ContactOption {
    icon: React.ComponentType<any>
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