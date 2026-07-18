// src/components/layout/DesktopNavbar.tsx
"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { navLinks } from "@/lib/site-config"
import { siteTheme } from "@/lib/site-config";
import { useSocialLinks } from "@/hooks/useSocialLinks"
import { Magnetic } from "../ui/Magnetic"
import { ObfuscatedContact } from "../ui/ObfuscatedContact"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"

const { header: style } = siteTheme

interface DesktopNavbarProps {
    getLocalizedHref: (href: string) => string
    translate: (key: string) => string
}

export default function DesktopNavbar({ getLocalizedHref, translate }: DesktopNavbarProps) {
    const pathname = usePathname()
    const socialLinks = useSocialLinks()

    const isActive = (href: string) => {
        const localized = getLocalizedHref(href)
        return pathname === localized
    }

    return (
        <nav className={style.desktopNavWrapper}>
            {/* FIX 1: Wrapper to ensure strong contrast context */}
            <div className={cn(style.desktopNav, "bg-surface/90 border border-border/90 backdrop-blur-md shadow-xl")}>
                {navLinks.map((link) => (
                    <Magnetic key={link.href} strength={0.15}>
                        <Link
                            href={getLocalizedHref(link.href)}
                            /* FIX 2: Text brightness upgraded from text-muted to text-ink/85 */
                            className={cn(
                                style.desktopLink,
                                "relative z-10 transition-colors duration-200 text-sm font-medium",
                                isActive(link.href)
                                    ? "text-ink font-bold"
                                    : "text-ink/85 hover:text-primary-light"
                            )}
                        >
                            {translate(`nav.${link.label.toLowerCase()}`)}
                            {isActive(link.href) && (
                                /* FIX 3: Active background layer enhanced to 25% opacity with subtle border */
                                <motion.div
                                    layoutId="active-tab-indicator"
                                    className={cn(style.activeTab, "bg-primary/25 border border-primary-light/20 rounded-full")}
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                >
                                    <div className={style.activeTabDot} />
                                </motion.div>
                            )}
                        </Link>
                    </Magnetic>
                ))}

                {/* SOCIAL LINKS */}
                <div className={style.socialDivider}>
                    {socialLinks.map((social) => (
                        <Magnetic key={social.label} strength={0.3}>
                            {social.isEmail ? (
                                <ObfuscatedContact
                                    type="email"
                                    value={social.href}
                                    /* FIX 4: Hover state brightness boosted */
                                    className={cn(style.socialBtn, "text-ink/85 hover:text-primary-light hover:bg-primary/20 transition-colors")}
                                >
                                    <social.icon className={style.socialIcon} />
                                </ObfuscatedContact>
                            ) : (
                                <Button variant="ghost" size="icon" className={cn(style.socialBtn, "text-ink/85 hover:text-primary-light hover:bg-primary/20 transition-colors")} asChild>
                                    <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                                        <social.icon className={style.socialIcon} />
                                    </a>
                                </Button>
                            )}
                        </Magnetic>
                    ))}
                </div>
            </div>
        </nav>
    )
}