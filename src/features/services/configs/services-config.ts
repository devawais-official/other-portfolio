import { AndroidIcon, ComposeMultiplatformIcon, FlutterIcon, StackOutlinedIcon, type IconProps } from "@/components/icons/icons";

export const SERVICES_ICON_MAP: Record<string, React.ComponentType<IconProps>> = {
    // Agar data mein "AndroidIcon" aa raha hai to theek, nahi to lowercase strings add karein:
    "android": AndroidIcon,
    "AndroidIcon": AndroidIcon,

    "compose": ComposeMultiplatformIcon,
    "ComposeMultiplatformIcon": ComposeMultiplatformIcon,

    "flutter": FlutterIcon,
    "FlutterIcon": FlutterIcon,

    "native": StackOutlinedIcon,
    "StackOutlinedIcon": StackOutlinedIcon,
};

export interface LocalizedServiceItem {
    id: string | number;
    title: string;
    description: string;
    tech: string[];
    iconName: string;
    themeId: string;
}

export function getLocalizedServices(
    translate: (key: string) => string,
    rawServices: any[]
): LocalizedServiceItem[] {
    return rawServices.map((service) => {
        const titleKey = `services.items.${service.id}.title`;
        const descKey = `services.items.${service.id}.description`;

        return {
            id: service.id,
            title: translate(titleKey).startsWith("services.items") ? service.title : translate(titleKey),
            description: translate(descKey).startsWith("services.items") ? service.description : translate(descKey),
            tech: service.tech,
            iconName: service.icon,
            // themeId contains values mapping straight to siteTheme system ('android', 'kmp', etc.)
            themeId: service.themeId || "primary",
        };
    });
}