"use client"

import { useState, useEffect, useMemo } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useScroll, useMotionValueEvent } from "framer-motion"
import { siteConfig } from "@/lib/site-config"
import { siteTheme } from "@/lib/site-config";
import { useI18n } from "@/i18n/i18n-provider"
import { Magnetic } from "../ui/Magnetic"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import DesktopNavbar from "./DesktopNavbar"
import MobileDrawer from "./MobileDrawer"
import { MenuIcon, XIcon } from "../icons/icons"

const { header: style } = siteTheme

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const [mounted, setMounted] = useState(false)

  const pathname = usePathname()

  // 🎯 Single source of truth from your i18n context provider
  const { translate, locale } = useI18n()

  const { scrollYProgress } = useScroll()

  useEffect(() => {
    requestAnimationFrame(() => {
      setMounted(true);
    });
  }, []);

  // Show/Hide Header on Scroll
  useMotionValueEvent(scrollYProgress, "change", (current) => {
    const previous = scrollYProgress.getPrevious() ?? 0
    setVisible(current < 0.05 || current - previous < 0)
  })

  // Close mobile menu on route change
  useEffect(() => {
    requestAnimationFrame(() => {
      setMobileMenuOpen(false);
    });
  }, [pathname]);

  // 🎯 Recalculate local links dynamically whenever 'locale' switches
  const getLocalizedHref = useMemo(() => {
    return (href: string) => {
      const activeLocale = locale || "en"
      return href === "/" ? `/${activeLocale}` : `/${activeLocale}${href}`
    }
  }, [locale])

  // Hydration safety check (Wallpaper block completely removed!)
  if (!mounted) return null

  return (
    <header className={cn(style.wrapper, visible ? "translate-y-0" : "-translate-y-full")}>
      <div className={style.container}>
        {/* LOGO */}
        <Magnetic strength={0.2}>
          <Link href={`/${locale}`} className="group relative flex items-center focus:outline-none">
            <div
              className="w-24 h-8 sm:w-28 sm:h-10 bg-gradient-to-r from-primary via-mint to-accent [mask-image:url('/images/ma-logo.svg')] [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center_left]"
              aria-label={siteConfig.shortName}
            />
          </Link>
        </Magnetic>

        {/* DESKTOP NAVBAR */}
        {/* 🎯 Re-rendering navbar components strictly on local key change */}
        <DesktopNavbar
          key={`desktop-nav-${locale}`}
          getLocalizedHref={getLocalizedHref}
          translate={translate}
        />

        {/* MOBILE TOGGLE BUTTON */}
        <Button
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          variant="ghost"
          size="icon"
          className={style.mobileToggle}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          {mobileMenuOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </Button>
      </div>

      {/* MOBILE DRAWER */}
      <MobileDrawer
        key={`mobile-nav-${locale}`}
        isOpen={mobileMenuOpen}
        getLocalizedHref={getLocalizedHref}
        translate={translate}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  )
}