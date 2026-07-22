// src/components/layout/Header.tsx
"use client";

import React, { useState, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import { useI18n } from "@/i18n/i18n-client";
import { Magnetic } from "../ui/Magnetic";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import DesktopNavbar from "./DesktopNavbar";
import MobileDrawer from "./MobileDrawer";
import { MenuIcon, XIcon } from "../icons/icons";

// ============================================================================
// MAIN HEADER COMPONENT
// ============================================================================
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();

  // Single source of truth from i18n context provider
  const { translate, locale } = useI18n();

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    requestAnimationFrame(() => {
      setMounted(true);
    });
  }, []);

  // Show/Hide Header on Scroll
  useMotionValueEvent(scrollYProgress, "change", (current) => {
    const previous = scrollYProgress.getPrevious() ?? 0;
    setVisible(current < 0.05 || current - previous < 0);
  });

  // Close mobile menu on route change
  useEffect(() => {
    requestAnimationFrame(() => {
      setMobileMenuOpen(false);
    });
  }, [pathname]);

  // Recalculate local links dynamically whenever 'locale' switches
  const getLocalizedHref = useMemo(() => {
    return (href: string) => {
      const activeLocale = locale || "en";
      return href === "/" ? `/${activeLocale}` : `/${activeLocale}${href}`;
    };
  }, [locale]);

  // Hydration safety check
  if (!mounted) return null;

  return (
    <header
      className={cn(
        "fixed left-1/2 top-4 z-50 w-[92%] max-w-5xl -translate-x-1/2 transition-transform duration-300",
        visible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        {/* BRAND LOGO */}
        <Magnetic strength={0.2}>
          <Link
            href={`/${locale}`}
            className="group relative flex items-center focus:outline-none"
            aria-label={`Go to ${siteConfig.name} home`}
          >
            <div
              className="h-8 w-24 bg-gradient-to-r from-primary via-accent-dark to-accent [mask-image:url('/brand/ma-logo.svg')] [mask-position:center_left] [mask-repeat:no-repeat] [mask-size:contain] sm:h-10 sm:w-28"
              aria-hidden="true"
            />
          </Link>
        </Magnetic>

        {/* DESKTOP NAVBAR */}
        <DesktopNavbar
          key={`desktop-nav-${locale}`}
          getLocalizedHref={getLocalizedHref}
          translate={translate}
        />

        {/* MOBILE TOGGLE BUTTON */}
        <Button
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          variant="ghost"
          size="icon"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border/30 bg-surface/60 text-muted backdrop-blur-md transition-colors hover:border-primary/40 hover:bg-surface hover:text-heading md:hidden"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          {mobileMenuOpen ? (
            <XIcon className="h-5 w-5" aria-hidden="true" />
          ) : (
            <MenuIcon className="h-5 w-5" aria-hidden="true" />
          )}
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
  );
}