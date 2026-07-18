// src/components/layout/MobileDrawer.tsx
"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { navLinks } from "@/lib/site-config"
import { siteTheme } from "@/lib/site-config";
import { useSocialLinks } from "@/hooks/useSocialLinks"
import { ObfuscatedContact } from "../ui/ObfuscatedContact"

const { header: style } = siteTheme

interface MobileDrawerProps {
    isOpen: boolean
    getLocalizedHref: (href: string) => string
    translate: (key: string) => string
    onClose: () => void
}

const drawerVariants: Variants = {
    hidden: {
        opacity: 0,
        y: "-100%",
        transition: {
            type: "tween",
            ease: "easeInOut",
            duration: 0.3,
            staggerChildren: 0.05,
            staggerDirection: -1,
            when: "afterChildren"
        }
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 120,
            damping: 18,
            staggerChildren: 0.07,
            delayChildren: 0.1
        }
    }
}

const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20, filter: "blur(4px)" },
    visible: {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        transition: { type: "spring", stiffness: 200, damping: 22 }
    }
}

export default function MobileDrawer({ isOpen, getLocalizedHref, translate, onClose }: MobileDrawerProps) {
    const pathname = usePathname()
    const socialLinks = useSocialLinks()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    if (!mounted) return null

    const isActive = (href: string) => {
        const localized = getLocalizedHref(href)
        return pathname === localized
    }

    return createPortal(
        <AnimatePresence mode="wait">
            {isOpen && (
                <>
                    {/* BACKDROP OVERLAY */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-md md:hidden"
                    />

                    {/* MAIN DRAWER */}
                    <motion.div
                        variants={drawerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        style={{ backgroundColor: "rgb(var(--color-bg))" }}
                        className={`${style.mobileDrawer} fixed top-16 left-0 w-full h-[calc(100vh-4rem)] z-[9999] overflow-y-auto`}
                    >
                        {/* MENU LINKS */}
                        <div className={style.mobileGrid}>
                            {navLinks.map((link) => (
                                <motion.div key={link.href} variants={itemVariants}>
                                    <Link
                                        href={getLocalizedHref(link.href)}
                                        onClick={onClose}
                                        className={isActive(link.href) ? style.mobileLinkActive : style.mobileLinkInactive}
                                    >
                                        <span className={style.mobileLinkLabel}>
                                            {translate(`nav.${link.label.toLowerCase()}`)}
                                        </span>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* SEPARATOR */}
                        <motion.div variants={itemVariants} className={style.mobileDivider} />

                        {/* SOCIAL LINKS */}
                        <motion.div variants={itemVariants} className={style.mobileSocialWrapper}>
                            {socialLinks.map((social) => (
                                social.isEmail ? (
                                    <ObfuscatedContact
                                        key={social.label}
                                        type="email"
                                        value={social.href}
                                        className={style.mobileSocialIconBtn}
                                    >
                                        <social.icon className={style.mobileSocialIconClass} />
                                    </ObfuscatedContact>
                                ) : (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        className={style.mobileSocialIconBtn}
                                        onClick={onClose}
                                    >
                                        <social.icon className={style.mobileSocialIconClass} />
                                    </a>
                                )
                            ))}
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    )
}