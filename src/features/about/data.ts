// src/features/about/data.ts
import { experiences, stats } from "@/data";
import { AboutData } from "./types";
import expertise from "@/data/expertise.json";

export const getAboutData = (): AboutData => ({
    expertiseGroups: [
        { label: "Languages", items: expertise.languages },
        { label: "Android", items: expertise.android },
        { label: "Multiplatform (KMP / CMP)", items: expertise.multiplatform },
        { label: "Flutter", items: expertise.flutter },
        { label: "Architecture", items: expertise.architecture },
        { label: "Tools", items: expertise.tools }
    ],
    experiences,
    stats,
});