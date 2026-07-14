"use client";

import { FaGithub, FaLinkedin, FaMedium, FaStackOverflow, FaTwitter } from "react-icons/fa6";
import type { IconType } from "react-icons";
import Link from "next/link";
import { navLinks, siteConfig } from "@/lib/siteConfig";
import { useI18n } from "@/lib/i18n";

/* ─── Static config lifted outside component ────────────────────────────────── */

const SOCIAL_LINKS: { href: string; icon: IconType; label: string }[] = [
  { href: siteConfig.social.github, icon: FaGithub, label: "GitHub" },
  { href: siteConfig.social.linkedin, icon: FaLinkedin, label: "LinkedIn" },
  { href: siteConfig.social.twitter, icon: FaTwitter, label: "Twitter" },
  { href: siteConfig.social.stackoverflow, icon: FaStackOverflow, label: "Stack Overflow" },
  { href: siteConfig.social.medium, icon: FaMedium, label: "Medium" },
];

const SPECIALTIES = [
  "Android Native (Kotlin/Java)",
  "Kotlin Multiplatform (KMP)",
  "Compose Multiplatform (CMP)",
  "Flutter",
];

/* ─── Footer ─── */

export default function Footer() {
  const { locale, t } = useI18n();
  const tagline = locale === "ur" ? t("home.availability") : siteConfig.tagline;

  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 md:grid-cols-4">

        {/* Brand */}
        <div className="flex flex-col items-start sm:col-span-2 md:col-span-1">
          <Link href="/" className="relative block mb-4 w-14 h-14 md:w-16 md:h-16 group cursor-pointer"
            aria-label={`Go to ${siteConfig.name} homepage`}>
            <div className="absolute inset-0 rotate-45 rounded-lg bg-gradient-to-r from-primary via-mint to-accent transition-transform duration-500 group-hover:rotate-90 shadow-[0_0_20px_rgba(74,105,88,0.25)]" />
            <div className="absolute inset-2 rotate-45 rounded-lg flex items-center justify-center bg-bg transition-transform duration-500 group-hover:rotate-0">
              <div className="w-8 h-8 -rotate-45 transition-transform duration-500 bg-ink group-hover:rotate-0"
                style={{
                  maskImage: 'url("/images/ma%20logo.svg")',
                  WebkitMaskImage: 'url("/images/ma%20logo.svg")',
                  maskSize: "contain", WebkitMaskSize: "contain",
                  maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat",
                  maskPosition: "center",
                }}>
                <span className="sr-only">{siteConfig.name} Logo</span>
              </div>
            </div>
          </Link>
          <h3 className="text-xl md:text-2xl font-black text-ink tracking-tighter uppercase italic">{siteConfig.name}</h3>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-primary-light">{tagline}</p>
        </div>

        {/* Navigation */}
        <div>
          <p className="eyebrow">{t("footer.navigate")}</p>
          <ul className="mt-4 space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}
                  className="text-sm text-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:underline min-h-[32px] inline-flex items-center">
                  {t(`nav.${link.label.toLowerCase()}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Specialties */}
        <div>
          <p className="eyebrow">{t("footer.specialties")}</p>
          <ul className="mt-4 space-y-2.5 text-sm text-muted">
            {SPECIALTIES.map((s) => <li key={s}>{s}</li>)}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="eyebrow">{t("footer.getInTouch")}</p>
          <ul className="mt-4 space-y-2.5 text-sm text-muted">
            <li>
              <a href={`mailto:${siteConfig.email}`}
                className="transition-colors hover:text-ink focus-visible:outline-none focus-visible:underline min-h-[32px] inline-flex items-center">
                {siteConfig.email}
              </a>
            </li>
            <li>{t("about.infoLocation")} — {locale === "ur" ? t("home.availability") : siteConfig.availability}</li>
          </ul>
          <div className="mt-5 flex gap-3">
            {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={`Visit our ${label} profile`}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted transition-all duration-200 hover:border-primary-light/50 hover:text-primary-light hover:bg-surface2/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light min-h-[44px] min-w-[44px]">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Meta row */}
      <div className="border-t border-border py-6">
        <div className="container-page flex flex-col items-center justify-between gap-2 text-xs text-muted sm:flex-row">
          <p>{t("footer.copyright", { year: new Date().getFullYear().toString() })}</p>
          {/* 🛠️ Removed "font-mono" from here too */}
          <p>{t("footer.poweredBy")}</p>
        </div>
      </div>
    </footer>
  );
}