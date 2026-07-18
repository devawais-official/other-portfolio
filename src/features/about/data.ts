import { stats } from "@/data";
import { AboutData, Experience } from "./types";
import expertise from "@/data/expertise.json";
// Dono files import karein
import experiencesMeta from "@/data/experiences.json";
import experiencesContent from "@/i18n/locales/en/experiences.json";

export const getAboutData = (): AboutData => {

    // Metadata list ko iterate karenge aur content ko lookup karenge
    const mergedExperiences: Experience[] = experiencesMeta.map((meta) => {
        // slug ke zariye content data nikalna
        const content = (experiencesContent as any)[meta.slug];

        return {
            id: String(meta.id), // ID string chahiye thi
            slug: meta.slug,
            company: meta.company,
            duration: meta.duration,
            role: content?.role || "", // Agar content na mile toh default empty string
            description: content?.description || "",
            // Achievements object ko string array mein convert karna
            achievements: content ? Object.values(content.achievements) as string[] : []
        };
    });

    return {
        expertiseGroups: [
            { label: "Languages", items: expertise.languages },
            { label: "Android", items: expertise.android },
            { label: "Multiplatform (KMP / CMP)", items: expertise.multiplatform },
            { label: "Flutter", items: expertise.flutter },
            { label: "Architecture", items: expertise.architecture },
            { label: "Tools", items: expertise.tools }
        ],
        experiences: mergedExperiences, // Yahan hamara merged data chala gaya
        stats,
    };
};