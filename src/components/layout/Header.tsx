// src/components/layout/Header.tsx
"use client"

import { useState, useEffect, useMemo } from "react"
import { usePathname, useParams } from "next/navigation"
import Link from "next/link"
import { useScroll, useMotionValueEvent } from "framer-motion"
import { Menu, X } from "lucide-react"
import { navLinks, siteConfig } from "@/lib/site-config"
import { siteTheme } from "@/lib/theme-config"
import { useI18n } from "@/i18n/i18n-provider"
import { Magnetic } from "../ui/Magnetic"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import DesktopNavbar from "./DesktopNavbar"
import MobileDrawer from "./MobileDrawer"


const { header: style } = siteTheme

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const [mounted, setMounted] = useState(false)

  const pathname = usePathname()
  const params = useParams()
  const { scrollYProgress } = useScroll()
  const { translate } = useI18n()
  const locale = (params?.locale as string) || "en"

  useEffect(() => {
    setMounted(true)
  }, [])

  // Show/Hide Header on Scroll
  useMotionValueEvent(scrollYProgress, "change", (current) => {
    const previous = scrollYProgress.getPrevious() ?? 0
    setVisible(current < 0.05 || current - previous < 0)
  })

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Localized Navigation Helper
  const getLocalizedHref = useMemo(() => {
    return (href: string) => (href === "/" ? `/${locale}` : `/${locale}${href}`)
  }, [locale])

  if (!mounted || pathname?.startsWith("/wallpaper")) return null

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
        <DesktopNavbar getLocalizedHref={getLocalizedHref} translate={translate} />

        {/* MOBILE TOGGLE BUTTON */}
        <Button
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          variant="ghost"
          size="icon"
          className={style.mobileToggle}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* MOBILE DRAWER */}
      <MobileDrawer
        isOpen={mobileMenuOpen}
        getLocalizedHref={getLocalizedHref}
        translate={translate}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  )
}