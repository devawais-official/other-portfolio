"use client"; // 🎯 Yeh line missing thi!
import { expertise } from "@/data";
import { useI18n } from "@/i18n/i18n-provider";

interface TechItem {
  name: string;
  // Simple Icons CDN slug (Hum lower-case direct mappings use karenge)
  iconSlug: string;
}

// 🎯 One single source mapping for icons. 
// Agar koi naya skill dynamic JSON me add ho, to yahan bas icon mapping define karni hogi.
const iconMapping: Record<string, string> = {
  // Languages
  "Kotlin": "kotlin",
  "Java": "openjdk", // using openjdk icon for java
  "Dart": "dart",
  "TypeScript": "typescript",
  "JavaScript": "javascript",

  // Android & KMP
  "Jetpack Compose": "jetpackcompose",
  "Material Design 3": "materialdesign",
  "Coroutines": "kotlin", // Fallback to Kotlin
  "Flow": "reactive x", // Rx logo style fallback
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
};

// 🎯 DRY - Pulling directly from our raw json file (Zero manual drifts!)
const rawStack = [
  ...expertise.languages,
  ...expertise.android.slice(0, 3), // composition limits
  ...expertise.multiplatform.slice(0, 3),
  ...expertise.flutter.slice(0, 2),
  ...expertise.tools.slice(0, 4)
];

// Map standard text list to fully formed TechItem objects
const stack: TechItem[] = rawStack.map((name) => ({
  name,
  iconSlug: iconMapping[name] || "android" // Safe fallback logo
}));
export default function TechMarquee() {
  const { translate } = useI18n();
  // Double the items dynamically to make the scroll seamless and infinite
  const items = [...stack, ...stack, ...stack];

  return (
    <section className="relative w-full overflow-hidden bg-bg py-16">

      {/* 2. Infinite Marquee Container */}
      <div className="relative flex w-full flex-col gap-6 overflow-hidden py-4">

        {/* Left & Right Elegant Edge Fading Mask */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-bg to-transparent sm:w-48" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-bg to-transparent sm:w-48" />

        {/* Dynamic Running Track */}
        <div className="flex w-max animate-marquee gap-6 hover:[animation-play-state:paused] cursor-pointer">
          {items.map((item, i) => (
            <div
              key={`${item.name}-${i}`}
              className="flex w-36 flex-col items-center justify-center gap-3 rounded-3xl border border-border bg-surface px-4 py-6 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              {/* Icon Container (Using Simple Icons CDN safely) */}
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 p-2.5">
                <img
                  src={`https://cdn.simpleicons.org/${item.iconSlug}`}
                  alt={item.name}
                  className="h-full w-full object-contain"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to a standard android/code icon if CDN fails or key is missing
                    (e.target as HTMLImageElement).src = "https://cdn.simpleicons.org/android/3DDC84";
                  }}
                />
              </div>

              {/* Skill Label (Matching screenshot sizing) */}
              <span className="text-center font-sans text-xs font-medium text-ink/80 truncate max-w-full">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}