// src/components/layout/Footer.tsx
"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/i18n-provider";
import { siteTheme } from "@/lib/site-config";
import { siteConfig, socialLinks } from "@/lib/site-config";

export default function Footer() {
  const { translate } = useI18n();
  const { footer: style } = siteTheme;

  // Fallbacks in case translation keys are missing
  const tagline = translate("about.role") !== "about.role" ? translate("about.role") : "Mobile App Developer";
  const availabilityText = translate("about.availability") !== "about.availability" ? translate("about.availability") : "Available for freelance";

  const rawSpecialties = translate("footer.specialtiesList", { returnObjects: true });
  const specialties: string[] = Array.isArray(rawSpecialties)
    ? (rawSpecialties as string[])
    : [];

  return (
    <footer className={style.container}>
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">

        <div className={style.grid}>

          {/* 1. Brand Column */}
          <FooterBrand name={siteConfig.name} tagline={tagline} style={style} />

          {/* 2. Specialties Column */}
          {specialties.length > 0 && (
            <FooterCol title={translate("footer.specialties")} style={style} isStatic>
              {specialties.map((s) => (
                <li key={s} className="leading-relaxed">{s}</li>
              ))}
            </FooterCol>
          )}

          {/* 3. Contact & Social Column */}
          <FooterCol title={translate("footer.getInTouch")} style={style} isStatic>
            <li className="mb-1">
              <a
                href={`mailto:${siteConfig.email}`}
                className={style.linkText}
                aria-label={`Send an email to ${siteConfig.email}`}
              >
                {siteConfig.email}
              </a>
            </li>

            {/* FIX 1: Standalone text ko clean <li> ke andar safe kiya */}
            <li className="text-xs text-muted/80 leading-relaxed mb-3">
              {translate("about.infoLocation") !== "about.infoLocation" ? translate("about.infoLocation") : "Lahore, Pakistan"} — {availabilityText}
            </li>

            {/* FIX 2: Socials wrapper div ko direct parent list ke badle <li> ke andar encompass kiya */}
            <li className="block w-full">
              <FooterSocials links={socialLinks} style={style} />
            </li>
          </FooterCol>

        </div>

        {/* 4. Bottom Copyright Row */}
        {/* FIX 3: Year string ko dynamic server/client safe context diya (2026) */}
        <FooterMeta
          copyright={translate("footer.copyright", { year: "2026" })}
          style={style}
        />
      </div>
    </footer>
  );
}

// ==========================================
// Sub-Components
// ==========================================

interface FooterStyleProps {
  style: any;
}

/* 🏢 Brand Block */
function FooterBrand({ name, tagline, style }: FooterStyleProps & { name: string; tagline: string }) {
  return (
    <div className={style.brandCol}>
      <Link href="/" className={style.logoLink} aria-label={`Go to ${name} homepage`}>
        <div className={style.logoGradientBg} />
        <div className={style.logoInnerBg}>
          <div
            className={style.logoMask}
            style={{
              maskImage: 'url("/images/ma-logo.svg")',
              WebkitMaskImage: 'url("/images/ma-logo.svg")',
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskPosition: "center",
            }}
          />
        </div>
      </Link>
      <h3 className={style.brandTitle}>{name}</h3>
      <p className={style.brandTagline}>
        {tagline}
      </p>
    </div>
  );
}

/* 📦 Reusable Footer Column Wrapper */
interface FooterColProps extends FooterStyleProps {
  title: string;
  children: React.ReactNode;
  isStatic?: boolean;
}

function FooterCol({ title, children, style, isStatic = false }: FooterColProps) {
  return (
    <div>
      <p className={style.eyebrow}>{title}</p>
      <ul className={`${style.listContainer} ${isStatic ? style.staticText : ""}`}>
        {children}
      </ul>
    </div>
  );
}

/* 🌐 Clean Social Links (Tooltips Removed & Discernible Names Added) */
function FooterSocials({ links, style }: FooterStyleProps & { links: typeof socialLinks }) {
  return (
    <div className={style.socialContainer}>
      {links.map(({ href, icon: Icon, label }) => (
        <a
          key={label}
          href={href || "#"}
          target="_blank"
          rel="noreferrer"
          aria-label={`Visit my ${label} profile`}
          className={style.socialIconLink}
        >
          <Icon size={15} />
        </a>
      ))}
    </div>
  );
}

/* 📝 Meta copyrights footer */
function FooterMeta({ copyright, style }: FooterStyleProps & { copyright: string }) {
  return (
    <div className={style.metaContainer}>
      <div className={style.metaLayout}>
        <p className="tracking-wide text-left text-ink/80 text-sm antialiased selection:bg-selection-bg">{copyright}</p>
      </div>
    </div>
  );
}