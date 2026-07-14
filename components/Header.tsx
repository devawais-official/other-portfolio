"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import { Cpu, Menu, X, Mail, Globe } from "lucide-react"
import { BsGithub } from "react-icons/bs"
import { FaLinkedinIn } from "react-icons/fa"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Magnetic } from "@/components/ui/magnetic"
import { ObfuscatedContact } from "@/components/ui/obfuscated-contact"
import { navLinks, siteConfig } from "@/lib/siteConfig"
import { useI18n } from "@/lib/i18n"

/* ==========================================================================
   Types & Configuration Helpers
   ========================================================================== */

interface SocialLink {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  isEmail?: boolean
}

const getSocialLinks = (): SocialLink[] => [
  { label: "GitHub", href: siteConfig.social.github, icon: BsGithub },
  { label: "LinkedIn", href: siteConfig.social.linkedin, icon: FaLinkedinIn },
  { label: "Email", href: siteConfig.email, icon: Mail, isEmail: true },
]

/* ==========================================================================
   Primary Header Component (Orchestrator)
   ========================================================================== */

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const [mounted, setMounted] = useState(false)

  const pathname = usePathname()
  const { scrollYProgress } = useScroll()
  const socialLinks = getSocialLinks()
  const { locale, changeLocale, t } = useI18n()

  // Guard: Mount safety for SSR / Hydration Match
  useEffect(() => {
    setMounted(true)
  }, [])

  // Show/Hide Header on Scroll
  useMotionValueEvent(scrollYProgress, "change", (current) => {
    const previous = scrollYProgress.getPrevious() ?? 0
    const direction = current - previous
    setVisible(current < 0.05 || direction < 0)
  })

  if (!mounted) return null

  // Route Exclusions
  const isExcludedRoute = pathname?.startsWith("/wallpaper")
  if (isExcludedRoute) return null

  const isActive = (href: string) => pathname === href

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500",
        visible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="w-full max-w-7xl mx-auto px-4 py-4 relative">
        <div className="flex items-center justify-between">

          <Logo />

          {/* Desktop Navigation */}
          <DesktopNavbar
            visible={visible}
            socialLinks={socialLinks}
            isActive={isActive}
            locale={locale}
            changeLocale={changeLocale}
            t={t}
          />

          {/* Mobile Navigation Toggle Button */}
          <MobileMenuToggle
            isOpen={mobileMenuOpen}
            onToggle={() => setMobileMenuOpen((prev) => !prev)}
          />

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileDrawer
            socialLinks={socialLinks}
            isActive={isActive}
            onClose={() => setMobileMenuOpen(false)}
            locale={locale}
            changeLocale={changeLocale}
            t={t}
          />
        )}
      </AnimatePresence>
    </header>
  )
}

/* ==========================================================================
   Sub-Components (Decoupled Units of UI)
   ========================================================================== */

function Logo() {
  return (
    <Magnetic strength={0.2}>
      <Link
        href="/"
        className="group relative flex items-center gap-2 focus:outline-none"
      >
        <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-all">
          <Cpu className="w-4 h-4 text-primary group-hover:rotate-90 transition-transform duration-500" />
        </div>
        <div
          className="w-24 h-8 sm:w-28 sm:h-10 bg-gradient-to-r from-primary via-mint to-accent"
          style={{
            maskImage: 'url("/images/ma%20logo.svg")',
            WebkitMaskImage: 'url("/images/ma%20logo.svg")',
            maskSize: 'contain',
            WebkitMaskSize: 'contain',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
            maskPosition: 'center left',
            WebkitMaskPosition: 'center left'
          }}
        >
          <span className="sr-only">{siteConfig.shortName}</span>
        </div>
      </Link>
    </Magnetic>
  )
}

interface NavProps {
  socialLinks: SocialLink[]
  isActive: (href: string) => boolean
  locale: string
  changeLocale: (locale: any) => void
  t: (key: string) => string
}

function DesktopNavbar({ visible, socialLinks, isActive, locale, changeLocale, t }: NavProps & { visible: boolean }) {
  return (
    <div className="hidden md:flex justify-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[5000]">
      <AnimatePresence mode="wait">
        {visible && (
          <motion.nav
            key="navbar"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0, scale: 0.95 }}
            className="bg-bg/40 backdrop-blur-3xl border border-primary/15 shadow-[0_10px_40px_rgba(74,105,88,0.15)] px-1.5 py-1.5 rounded-2xl flex items-center space-x-1"
          >
            {navLinks.map((link) => (
              <Magnetic key={link.href} strength={0.15}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 focus-visible:outline-none",
                    isActive(link.href) ? "text-primary-light" : "text-muted hover:text-ink/90"
                  )}
                >
                  {t(`nav.${link.label.toLowerCase()}`)}
                  {isActive(link.href) && (
                    <motion.div
                      layoutId="active-tab-indicator"
                      className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-xl z-[-1] shadow-[inset_0_0_15px_rgba(74,105,88,0.15)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    >
                      <div className="absolute -bottom-[2px] left-1/2 -translate-x-1/2 w-4 h-[2px] bg-primary-light shadow-[0_0_10px_rgba(142,175,157,0.8)] rounded-full" />
                    </motion.div>
                  )}
                </Link>
              </Magnetic>
            ))}

            {/* Social Block */}
            <div className="flex items-center space-x-1 ml-4 pl-4 border-l border-border/40">
              {socialLinks.map((social) => (
                <Magnetic key={social.label} strength={0.3}>
                  {social.isEmail ? (
                    <ObfuscatedContact
                      type="email"
                      value={social.href}
                      className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-primary/20 transition-all group focus:outline-none"
                    >
                      <social.icon className="h-4 w-4 text-muted group-hover:text-primary-light transition-colors" />
                    </ObfuscatedContact>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 rounded-xl hover:bg-primary/20 transition-all group focus-visible:outline-none"
                      asChild
                    >
                      <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${social.label} profile`}>
                        <social.icon className="h-4 w-4 text-muted group-hover:text-primary-light transition-colors" />
                      </a>
                    </Button>
                  )}
                </Magnetic>
              ))}
            </div>

            {/* Language Switcher */}
            <div className="flex items-center space-x-1 ml-2 pl-2 border-l border-border/40">
              <Magnetic strength={0.3}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 rounded-xl hover:bg-primary/20 transition-all font-mono text-[10px] font-bold text-muted hover:text-primary-light flex items-center justify-center"
                  onClick={() => changeLocale(locale === "en" ? "ur" : "en")}
                  aria-label="Switch Language"
                >
                  <Globe className="h-3.5 w-3.5 mr-0.5" />
                  {locale === "en" ? "UR" : "EN"}
                </Button>
              </Magnetic>
            </div>

          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  )
}

function MobileMenuToggle({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) {
  return (
    <Button
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      variant="ghost"
      size="icon"
      className="md:hidden rounded-full bg-surface2/50 border border-border/60 text-ink relative z-50 w-11 h-11 min-h-[44px] min-w-[44px]"
      onClick={onToggle}
    >
      {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </Button>
  )
}

interface MobileDrawerProps extends NavProps {
  onClose: () => void
}

function MobileDrawer({ socialLinks, isActive, onClose, locale, changeLocale, t }: MobileDrawerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="md:hidden p-6 m-4 rounded-3xl border backdrop-blur-xl shadow-2xl border-border/60 bg-gradient-to-br from-surface to-bg/95 flex flex-col space-y-6 absolute left-0 right-0 top-16 z-40"
    >
      <div className="grid grid-cols-2 gap-3">
        {navLinks.map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className={cn(
              "p-4 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center space-y-2 min-h-[50px]",
              isActive(link.href)
                ? "bg-primary/15 border-primary/30 text-primary-light font-bold"
                : "bg-gradient-to-br from-surface2 to-surface border-border/40 text-muted hover:text-ink hover:bg-surface2"
            )}
            style={{
              animationDelay: `${index * 75}ms`,
            } as React.CSSProperties}
          >
            <span className="text-xs font-semibold tracking-wider uppercase">
              {t(`nav.${link.label.toLowerCase()}`)}
            </span>
          </Link>
        ))}
      </div>

      {/* Mobile Language Switcher */}
      <div className="pt-2">
        <Button
          variant="outline"
          size="sm"
          className="w-full text-xs font-semibold py-2.5 min-h-[44px] rounded-2xl flex items-center justify-center gap-1.5"
          onClick={() => {
            changeLocale(locale === "en" ? "ur" : "en");
            onClose();
          }}
        >
          <Globe className="h-4 w-4" />
          {locale === "en" ? "اردو میں دیکھیں (Urdu)" : "View in English"}
        </Button>
      </div>

      <div className="border-t border-border/30" />

      <div className="flex justify-center space-x-4">
        {socialLinks.map((social) => (
          social.isEmail ? (
            <ObfuscatedContact
              key={social.label}
              type="email"
              value={social.href}
              className="p-4 rounded-full border border-border/60 backdrop-blur-sm hover:scale-110 hover:rotate-6 transition-all duration-300 hover:bg-surface2 group flex items-center justify-center focus:outline-none min-h-[44px] min-w-[44px]"
            >
              <social.icon className="w-6 h-6 text-ink group-hover:text-primary-light transition-colors duration-200" />
            </ObfuscatedContact>
          ) : (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="p-4 rounded-full border border-border/60 backdrop-blur-sm hover:scale-110 hover:rotate-6 transition-all duration-300 hover:bg-surface2 group focus:outline-none flex items-center justify-center min-h-[44px] min-w-[44px]"
              onClick={onClose}
            >
              <social.icon className="w-6 h-6 text-ink group-hover:text-primary-light transition-colors duration-200" />
            </a>
          )
        ))}
      </div>
    </motion.div>
  )
}