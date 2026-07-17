"use client";

import { MapPin } from "lucide-react";
import { Globe } from "@/components/ui/globe";
import { siteTheme } from "@/lib/theme-config";

interface SystemStatusPanelProps {
    location: string;
}

export default function SystemStatusPanel({ location }: SystemStatusPanelProps) {
    const style = siteTheme.contact.statusPanel;

    return (
        <div className={style.wrapper}>
            <div className={style.innerContainer}>
                {/* Dynamic Theme Glow */}
                <div className={style.bgGlow} />

                {/* Globe Canvas */}
                <div className={style.globeOpacity}>
                    <Globe className={style.globeClass} />
                </div>

                {/* Location Footer Context */}
                <div className={style.contentFooter}>
                    <div className={style.rowAlign}>
                        <div className={style.iconContainer}>
                            <MapPin className={style.iconColor} />
                        </div>
                        <h4 className={style.textLabel}>Location</h4>
                    </div>
                    <p className={style.textSub}>{location}</p>
                </div>
            </div>
        </div>
    );
}