"use client";

import { MapPinIcon } from "@/components/icons/icons";
import { siteTheme } from "@/lib/site-config";

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

                </div>

                {/* Location Footer Context */}
                <div className={style.contentFooter}>
                    <div className={style.rowAlign}>
                        <div className={style.iconContainer}>
                            <MapPinIcon className={style.iconColor} />
                        </div>
                        <h4 className={style.textLabel}>Location</h4>
                    </div>
                    <p className={style.textSub}>{location}</p>
                </div>
            </div>
        </div>
    );
}