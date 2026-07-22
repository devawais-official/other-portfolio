import { GithubIcon, SparkleIcon, PlayStoreIcon, ArrowUpRightIcon } from "../icons/icons";

export default function TechMarquee() {
  const techList = [
    { name: "GitHub", icon: <GithubIcon size={24} /> },
    { name: "AI Sparkle", icon: <SparkleIcon size={24} /> },
    { name: "Play Store", icon: <PlayStoreIcon size={24} /> },
    { name: "Quick Actions", icon: <ArrowUpRightIcon size={24} /> },
  ];

  return (
    <div className="relative w-full overflow-hidden py-8 bg-background">
      <div className="absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
      <div className="absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>

      {/* Marquee Track */}
      <div className="animate-marquee flex gap-6 items-center">
        {[...techList, ...techList, ...techList].map((tech, index) => (
          <div
            key={index}
            className="flex items-center gap-3 px-5 py-3 rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all hover:border-primary/50"
          >
            <span className="text-primary">{tech.icon}</span>
            <span className="font-medium text-sm tracking-wide">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}