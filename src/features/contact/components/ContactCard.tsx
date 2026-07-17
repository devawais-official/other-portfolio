"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ObfuscatedContact } from "@/components/ui/ObfuscatedContact";
import { ContactOption } from "../types";
import { siteTheme } from "@/lib/theme-config";

interface ContactCardProps {
    option: ContactOption;
    variants: any;
}

export default function ContactCard({ option, variants }: ContactCardProps) {
    const { icon: Icon, label, value, themeStyles, href, isObfuscated, obfuscateType } = option;
    const style = siteTheme.contact.card;

    const CardMarkup = (
        <div className={style.wrapper}>
            {/* Edge energy highlight rail */}
            <motion.div
                className={style.energyRail}
                initial={{ height: 0 }}
                whileHover={{ height: "100%" }}
            />

            {/* Platform Brand Icon Frame */}
            <div className={`${style.iconWrapper} ${themeStyles.glow}`}>
                <Icon className={`${style.iconClass} ${themeStyles.iconColor}`} />
            </div>

            {/* Information Context */}
            <div className={style.textContainer}>
                <div className={style.labelRow}>
                    <h3 className={style.textLabel}>{label}</h3>
                </div>
                <p className={style.textValue}>{value}</p>
            </div>

            {/* Micro Interactive Arrow */}
            <div className={style.arrowWrapper}>
                <ArrowRight className={style.arrowClass} />
            </div>

            {/* Cyberpunk Ambient Dot */}
            <div className={style.ambientDot} />
        </div>
    );

    if (isObfuscated) {
        return (
            <motion.div variants={variants}>
                <ObfuscatedContact type={obfuscateType} value={value} className="block w-full">
                    {CardMarkup}
                </ObfuscatedContact>
            </motion.div>
        );
    }

    return (
        <motion.a
            variants={variants}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Contact via ${label}`}
            className="block w-full"
        >
            {CardMarkup}
        </motion.a>
    );
}