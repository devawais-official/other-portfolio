"use client"; // 🎯 React Client Component

import { expertise } from "@/data";
import { useI18n } from "@/i18n/i18n-provider";
import SectionWrapper from "@/components/layout/SectionWrapper";
import { siteTheme } from "@/lib/theme-config";
import SectionHeader from "../ui/SectionHeader";

interface TechItem {
  name: string;
  iconSlug: string;
}

const iconMapping: Record<string, string> = {
  "Kotlin": "kotlin",
  "Java": "openjdk",
  "Dart": "dart",
  "TypeScript": "typescript",
  "JavaScript": "javascript",

  // Android & KMP
  "Jetpack Compose": "jetpackcompose",
  "Material Design 3": "materialdesign",
  "Coroutines": "kotlin",
  "Flow": "reactivex",
  "Room DB": "sqlite",
  "Hilt": "android",
  "Kotlin Multiplatform (KMP)": "kotlin",
  "Compose Multiplatform (CMP)": "jetpackcompose",
  "SQLDelight": "sqlite",
  "Ktor": "kotlin",

  // Flutter
  "Flutter": "flutter",
  "Firebase": "firebase",
  "Custom Widgets": "flutter",

  // Tools & Architecture
  "Android Studio": "androidstudio",
  "Git": "git",
  "CI/CD": "githubactions",
  "Retrofit": "square",
  "GraphQL": "graphql",
  "SQLite": "sqlite",
  "Google AdMob": "googleadmob",
  "Google Analytics": "googleanalytics",
  "Google Maps": "googlemaps",
  "Google Nearby": "googlenearby"
};

const rawStack = [
  ...expertise.languages,
  ...expertise.android.slice(0, 3),
  ...expertise.multiplatform.slice(0, 3),
  ...expertise.flutter.slice(0, 2),
  ...expertise.tools.slice(0, 4)
];

const stack: TechItem[] = rawStack.map((name) => ({
  name,
  iconSlug: iconMapping[name] || "android"
}));

export default function TechMarquee() {
  const { translate, locale } = useI18n(); // 🎯 'locale' ko extract kiya context se
  const items = [...stack, ...stack, ...stack];

  const eyebrowText = translate("home.skillsEyebrow") || "TOOLKIT";
  const titleText = translate("home.skillsTitle") || "Technical Skills";

  const styles = siteTheme.home.marquee;

  return (
    // 🎯 Re-render purely when locale changes (key is dynamic now)
    <SectionWrapper
      key={`marquee-sec-${locale}`}
      className={styles.wrapper}
      blobColorLeft=""
    >

      {/* 🎯 Header respects LTR/RTL correctly */}
      <div className="container-page mx-auto px-6 md:px-8">
        <SectionHeader
          eyebrow={eyebrowText}
          title={titleText}
          className="max-w-2xl mb-14 text-left rtl:text-right" // RTL alignment handles Urdu seamlessly
        />
      </div>

      {/* 🎯 FORCE LTR on Marquee container: 'dir="ltr"' stops the track from going blank! */}
      <div
        dir="ltr"
        className="relative flex w-full flex-col gap-6 overflow-hidden py-4"
        style={styles.maskStyle}
      >
        {/* Running Track */}
        <div className={styles.track}>
          {items.map((item, i) => (
            <div
              key={`${item.name}-${i}`}
              className={styles.capsule}
            >
              <div className={styles.iconContainer}>
                <img
                  src={`https://cdn.simpleicons.org/${item.iconSlug}`}
                  alt={item.name}
                  className={styles.iconImg}
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://cdn.simpleicons.org/android/3DDC84";
                  }}
                />
              </div>

              <span className={styles.text}>
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}