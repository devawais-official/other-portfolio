"use client"; // 🎯 React Client Component

import { expertise } from "@/data";
import { useI18n } from "@/i18n/i18n-client";
import SectionWrapper from "@/components/layout/SectionWrapper";
import SectionHeader from "../ui/SectionHeader";
import Image from "next/image";

const marqueeStyles = {
  wrapper: "py-6 border-t border-border/40 px-0",
  maskStyle: {
    WebkitMaskImage: "linear-gradient(to right, transparent, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, transparent)",
    maskImage: "linear-gradient(to right, transparent, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, transparent)",
  },
  track: "flex w-max animate-marquee gap-4 hover:[animation-play-state:paused] cursor-pointer py-1",
  capsule: "liquid-glass flex items-center gap-3 px-5 py-2.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5",
  iconContainer: "flex h-6 w-6 items-center justify-center",
  iconImg: "h-full w-full object-contain transition-transform duration-300 group-hover:scale-105",
  text: "font-sans text-xs sm:text-sm font-medium text-ink/90 whitespace-nowrap",
};

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

  const eyebrowText = translate("home.skillsEyebrow") || "TOOLKITs";
  const titleText = translate("home.skillsTitle") || "Technical Skill";

  return (
    // 🎯 Re-render purely when locale changes (key is dynamic now)
    <SectionWrapper
      key={`marquee-sec-${locale}`}
      className={marqueeStyles.wrapper}
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
        className="relative flex w-full flex-col gap-6 overflow-hidden py-4 marquee-mask"
      >
        {/* Running Track */}
        <div className={marqueeStyles.track}>
          {items.map((item, i) => (
            <div
              key={`${item.name}-${i}`}
              className={marqueeStyles.capsule}
            >
              <div className={marqueeStyles.iconContainer}>
                <Image
                  src={`https://cdn.simpleicons.org/${item.iconSlug}`}
                  alt={item.name}
                  className={marqueeStyles.iconImg}
                  width={24}
                  height={24}
                  unoptimized
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://cdn.simpleicons.org/android/3DDC84";
                  }}
                />
              </div>

              <span className={marqueeStyles.text}>
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}