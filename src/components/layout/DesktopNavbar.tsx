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
            <div className={style.desktopNav}>
                {navLinks.map((link) => (
                    <Magnetic key={link.href} strength={0.15}>
                        <Link
                            href={getLocalizedHref(link.href)}
                            className={cn(style.desktopLink, isActive(link.href) ? "text-primary-light font-semibold" : "text-muted hover:text-ink/90")}
                        >
                            {translate(`nav.${link.label.toLowerCase()}`)}
                            {isActive(link.href) && (
                                <motion.div
                                    layoutId="active-tab-indicator"
                                    className={style.activeTab}
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
                                    className={cn(style.socialBtn, "hover:bg-primary/10")}
                                >
                                    <social.icon className={style.socialIcon} />
                                </ObfuscatedContact>
                            ) : (
                                <Button variant="ghost" size="icon" className={style.socialBtn} asChild>
                                    <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                                        <social.icon className={cn(style.socialIcon,)} />
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