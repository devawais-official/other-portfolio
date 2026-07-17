// src/components/layout/Footer.tsx
"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/i18n-provider";
import { siteTheme } from "@/lib/theme-config";
import { navLinks, siteConfig, socialLinks } from "@/lib/site-config";

export default function Footer() {
  const { translate } = useI18n();
  const { footer: style } = siteTheme;

  const tagline = translate("about.role");
  const availabilityText = translate("about.availability");

  // Specialties parsing safely
  const rawSpecialties = translate("footer.specialtiesList", { returnObjects: true });
  const specialties: string[] = Array.isArray(rawSpecialties)
    ? (rawSpecialties as string[])
    : [];

  return (
    <footer className={style.container}>
      <div className={style.grid}>

        {/* 1. Brand Component */}
        <FooterBrand name={siteConfig.name} tagline={tagline} style={style} />

        {/* 2. Navigation Column */}
        <FooterCol title={translate("footer.navigate")} style={style}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={style.linkText}>
                {translate(`nav.${link.label.toLowerCase()}`)}
              </Link>
            </li>
          ))}
        </FooterCol>

        {/* 3. Specialties Column */}
        {specialties.length > 0 && (
          <FooterCol title={translate("footer.specialties")} style={style} isStatic>
            {specialties.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </FooterCol>
        )}

        {/* 4. Contact & Social Column */}
        <FooterCol title={translate("footer.getInTouch")} style={style} isStatic>
          <li>
            <a href={`mailto:${siteConfig.email}`} className={style.linkText}>
              {siteConfig.email}
            </a>
          </li>
          <li>
            {translate("about.infoLocation")} — {availabilityText}
          </li>
          {/* Social Icons Render */}
          <FooterSocials links={socialLinks} style={style} />
        </FooterCol>

      </div>

      {/* 5. Bottom Copyright Row */}
      <FooterMeta
        copyright={translate("footer.copyright", { year: new Date().getFullYear().toString() })}
        poweredBy={translate("footer.poweredBy")}
        style={style}
      />
    </footer>
  );
}

// ==========================================
// Sub-Components (Keep them inside same file or create a footer/ sub-folder)
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
      <p className={style.brandTagline}>{tagline}</p>
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

/* 🌐 Social Links */
function FooterSocials({ links, style }: FooterStyleProps & { links: typeof socialLinks }) {
  return (
    <div className={style.socialContainer}>
      {links.map(({ href, icon: Icon, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={`Visit our ${label} profile`}
          className={style.socialIconLink}
        >
          <Icon size={18} />
        </a>
      ))}
    </div>
  );
}

/* 📝 Meta copyrights footer */
function FooterMeta({ copyright, poweredBy, style }: FooterStyleProps & { copyright: string; poweredBy: string }) {
  return (
    <div className={style.metaRow}>
      <div className={style.metaLayout}>
        <p>{copyright}</p>
        <p>{poweredBy}</p>
      </div>
    </div>
  );
}