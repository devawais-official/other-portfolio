export const homeTheme = {
    marquee: {
        wrapper: "py-6 border-t border-border/40 px-0",
        maskStyle: {
            WebkitMaskImage: "linear-gradient(to right, transparent, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, transparent)",
            maskImage: "linear-gradient(to right, transparent, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, transparent)"
        },
        track: "flex w-max animate-marquee gap-4 hover:[animation-play-state:paused] cursor-pointer py-1",
        capsule: "liquid-glass flex items-center gap-3 px-5 py-2.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5",
        iconContainer: "flex h-6 w-6 items-center justify-center",
        iconImg: "h-full w-full object-contain transition-transform duration-300 group-hover:scale-105",
        text: "font-sans text-xs sm:text-sm font-medium text-ink/90 whitespace-nowrap",
    }
};
export const heroTheme = {
    wrapper: "pb-8 pt-24 sm:pt-28 lg:pt-24",
    layoutGrid: "container-page grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]",
    eyebrow: "eyebrow flex items-center gap-2",
    heading: "mt-5 font-display text-4xl font-semibold leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl",
    headingGradient: "bg-gradient-to-r from-primary to-zinc-100 bg-clip-text text-transparent inline-block pb-3 -mb-1.5 pt-1",
    description: "mt-6 max-w-lg text-base text-muted sm:text-lg",
    buttonContainer: "mt-8 flex flex-col gap-3 sm:flex-row w-full sm:w-auto",
    statsContainer: "mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8 w-full",

    // --- Nayi Extracted Spacings & Portrait Classes ---
    contentCol: "flex flex-col justify-center items-center lg:items-start text-center lg:text-left w-full",
    portraitCol: "flex justify-center lg:justify-end items-center w-full",

    // Portrait sizing and aspect ratio
    imageContainer: "relative w-full max-w-[260px] sm:max-w-[320px] md:max-w-[340px] lg:max-w-[370px] aspect-[4/5]",

    // Echo shape layers
    echoShape1: "absolute inset-0 -rotate-3 md:-rotate-6 scale-[0.98] border border-primary/25 pointer-events-none",
    echoShape2: "absolute -inset-2 md:-inset-3 rotate-2 md:rotate-3 border border-primary/10 pointer-events-none",

    // Main cropped image frame
    imageMask: "relative w-full h-full overflow-hidden bg-gradient-to-br from-primary/15 to-transparent z-10",
    imageElement: "object-cover object-top transition-transform duration-500 hover:scale-105",

    badgeContainer: "absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/10 bg-black/85 px-4 py-2 backdrop-blur-md z-20 shadow-lg whitespace-nowrap",
    badgeItem: "relative group flex h-8 w-8 items-center justify-center rounded-full bg-primary/25 text-primary-light transition-all duration-300 hover:bg-primary hover:text-black cursor-pointer",
};
export const aboutTheme = {

    sectionPadding: "pb-16",
    mainGrid: "container-page grid gap-8 lg:grid-cols-[0.9fr_1.1fr] items-stretch", // stretch items for uniform heights

    // Bio Card (Left Column)
    bioCard: "p-6 rounded-2xl border border-white/5 bg-white/[0.02] flex flex-col justify-between h-full min-h-[500px]",
    bioName: "mt-5 font-display text-2xl font-semibold",
    bioTagline: "text-sm text-muted",
    infoList: "mt-6 space-y-3 border-t border-border pt-6 text-sm",
    infoRow: "flex justify-between gap-4",
    infoLabel: "text-muted",
    infoValue: "text-right",
    avatarBadge: "w-12 h-12 rounded-xl flex items-center justify-center bg-primary/10 text-primary font-bold text-lg border border-primary/20",

    // Stats Block
    statsGrid: "mt-8 grid grid-cols-2 gap-5 border-t border-border pt-6",
    statValue: "font-display text-xl font-semibold text-ink",
    statLabel: "mt-1 text-xs text-muted",

    // 🎯 RE-DESIGNED EXPERTISE CLASSES (Clean & Modern Grid)
    expertiseGrid: "grid grid-cols-1 sm:grid-cols-2 gap-4",
    expertiseCard: "group p-5 rounded-xl border border-white/5 bg-white/[0.015] hover:bg-white/[0.035] hover:border-primary/15 transition-all duration-300 flex flex-col justify-between min-h-[140px] relative overflow-hidden",
    expertiseTitle: "text-xs font-mono font-bold tracking-wider text-ink/90 uppercase",
    tagsContainer: "flex flex-wrap gap-1.5 mt-3", // Normal static top margin instead of forcing dynamic bottom stretch
    tagSpan: "px-2.5 py-1 text-[11px] font-mono font-medium rounded-lg bg-white/[0.03] text-muted/90 hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-all duration-300 border border-white/[0.03]",

    // Bio Card (Left Column)

    statsDivider: "border-t border-white/5 my-5",
    socialStatsGrid: "grid grid-cols-2 gap-4 my-5 pt-4 border-t border-white/5",
    socialStatItem: "flex flex-col gap-1 p-3 rounded-lg bg-white/[0.01] border border-white/[0.03]",
    cvButton: "w-full mt-4 py-2.5 px-4 rounded-xl text-center text-xs font-mono font-bold tracking-wider uppercase border border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 hover:border-primary/40 transition-all duration-300"
    ,   // Expertise Block (Right Column)

    // Experience Timeline Section
    timelineSection: "py-24 border-t border-white/5",
    timelineLayout: "container-page mx-auto max-w-6xl px-5 sm:px-8",
    timelineHeaderClass: "max-w-xl mb-12",
    timelineContainer: "flex flex-col gap-6 mt-12", // thoda sa gap kam kiya cards ke beech

    // Grid layout: Left 1 part for Meta, Right 3 parts for content
    experienceCard: "p-6 md:p-8 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-300 grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-10",
    // Left column metadata (Duration, role and company)
    expDuration: "inline-block px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-primary/90 bg-primary/5 rounded-md border border-primary/10 w-fit mb-2",
    expRole: "text-base font-bold text-ink leading-snug",
    expCompany: "text-[11px] font-mono text-muted/60 uppercase tracking-widest mt-1",

    // Right column content details
    expDesc: "text-sm text-zinc-100/95 leading-relaxed",
    achievementsList: "flex flex-col gap-3 mt-2",
    achievementItem: "flex items-start gap-3 text-sm text-muted/80 leading-relaxed",
    bulletPoint: "text-primary/70 text-xs mt-[6px] shrink-0 font-mono font-bold"
};
export const contactTheme = {
    sectionPadding: "pb-24",
    containerClass: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative",
    grid: "grid lg:grid-cols-12 gap-8 items-stretch",

    // LEFT PANEL: Globe & Live Status Theme
    statusPanel: {
        // Outer dynamic layout structure
        wrapper: "w-full h-full p-0 bg-primary/5 backdrop-blur-3xl border border-primary/20 rounded-[2rem] relative overflow-hidden flex flex-col",
        innerContainer: "relative flex-1 w-full overflow-hidden bg-bg group/loc flex flex-col",
        bgGlow: "absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--color-primary),0.08)_0%,transparent_70%)]",
        globeOpacity: "absolute inset-0 z-0 opacity-80",
        globeClass: "w-full h-full object-cover scale-150 translate-x-10 transition-transform duration-1000 ease-out will-change-transform",            // Bottom footer metadata frame
        contentFooter: "mt-auto p-8 sm:p-12 z-10 bg-gradient-to-t from-bg via-bg/60 to-transparent",
        rowAlign: "flex items-center gap-3 mb-2",

        // Icons and typography badges
        iconContainer: "w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center",
        iconColor: "w-4 h-4 text-primary animate-pulse",
        textLabel: "text-ink font-display text-lg font-black tracking-tighter uppercase italic",
        textSub: "text-muted text-[10px] font-mono font-bold uppercase tracking-widest truncate",
    },

    // RIGHT PANEL: Dynamic Action Nodes (Cards)
    card: {
        // Outer wrapper & micro interaction rails
        wrapper: "group relative flex items-center p-6 bg-surface/40 backdrop-blur-3xl border border-border/10 rounded-2xl transition-all duration-500 hover:border-primary/30 hover:bg-primary/5 hover:-translate-x-2 overflow-hidden w-full cursor-pointer",
        energyRail: "absolute top-0 left-0 w-1 h-full bg-primary/40 opacity-0 group-hover:opacity-100",

        // Left brand/icon layout
        iconWrapper: "w-14 h-14 bg-bg/50 backdrop-blur-md border border-border/10 rounded-xl flex items-center justify-center mr-6 group-hover:scale-110 group-hover:border-primary/30 transition-all duration-500 shadow-2xl",
        iconClass: "w-6 h-6", // 🎯 Hardcoded icon size extracted

        // Middle text block layout
        textContainer: "flex-1 min-w-0",
        labelRow: "flex items-center gap-3 mb-1",
        textLabel: "text-[10px] font-mono font-bold text-muted uppercase tracking-[0.2em]",
        textValue: "text-ink font-display text-lg sm:text-xl font-semibold tracking-tight truncate",

        // Right utility arrow
        arrowWrapper: "w-12 h-12 rounded-full border border-border/10 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:rotate-[360deg] transition-all duration-700 ml-4",
        arrowClass: "w-5 h-5 text-primary-light", // 🎯 Arrow styles and sizes extracted

        // Bottom corner ambient element
        ambientDot: "absolute bottom-2 right-2 w-1 h-1 bg-white/5 rounded-full animate-pulse" // 🎯 Dot class extracted
    },

    // Tactical channels and platform badges dynamic setups
    channels: {
        Email: {
            meta: "UPLINK_01",
            iconColor: "text-primary-light",
            glow: "shadow-primary/10",
            labelSuffix: "Direct_Email"
        },
        LinkedIn: {
            meta: "UPLINK_02",
            iconColor: "text-accent-light",
            glow: "shadow-accent/10",
            labelSuffix: "Linkedin Profile"
        },
        GitHub: {
            meta: "UPLINK_03",
            iconColor: "text-mint",
            glow: "shadow-mint/10",
            labelSuffix: "Github Account"
        },
        Default: {
            meta: "UPLINK_GENERIC",
            iconColor: "text-muted",
            glow: "shadow-white/5",
            labelSuffix: "Social_Node"
        }
    }
};
export const projectsTheme = {
    sectionPadding: "pb-24",
    container: "container-page",
    cardWrapper: "group relative p-5 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500 flex flex-col justify-between h-full relative overflow-hidden",
    // Card custom states/transitions for Next Image & Icon Fallbacks
    imageTransition: "object-cover transition-all duration-700 [.is-hovered_&]:scale-110 [.is-hovered_&]:blur-[2px] [.is-hovered_&]:brightness-75",
    iconFallbackTransition: "absolute inset-0 flex items-center justify-center transition-transform duration-700 [.is-hovered_&]:scale-105",
    imageContainer: "w-full aspect-[4/3] rounded-xl bg-gradient-to-b from-white/[0.02] to-transparent border border-white/[0.03] overflow-hidden flex items-center justify-center p-8 relative",
    // Icon configurations
    hoverGlow: "absolute inset-0 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-500 pointer-events-none",
    fallbackIconColorOpacity: "opacity-30",
    storeIconStyle: "h-3.5 w-3.5 shrink-0",
    title: "mt-5 font-display text-lg font-bold text-ink leading-tight group-hover:text-primary transition-colors duration-300",
    description: "mt-2 text-xs text-muted/70 leading-relaxed line-clamp-2",
};
export const servicesTheme = {
    sectionPadding: "pb-24",
    grid: "container-page grid gap-5 sm:grid-cols-2",
    card: "card-surface p-6 sm:p-7 flex flex-col justify-between h-full group relative transition-all duration-300",
    iconContainer: "flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary-light transition-transform duration-500 group-hover:scale-105",
    title: "mt-4 font-display text-xl font-semibold text-ink group-hover:text-primary-light transition-colors duration-300",
    description: "mt-2.5 text-sm leading-relaxed text-muted",
    badgeContainer: "mt-5 flex flex-wrap gap-2",
    badge: "rounded-full border border-border px-3 py-1.5 font-mono text-xs text-muted bg-white/5 transition-all duration-300 group-hover:border-primary-light/30"
};
export const blogTheme = {
    sectionPadding: "pb-24",
    grid: "container-page grid gap-6 sm:grid-cols-2 [&:has(>article:only-child)]:sm:grid-cols-1 [&:has(>div:only-child)]:sm:grid-cols-1 [&:has(>div:only-child)]:max-w-md [&:has(>div:only-child)]:mx-auto",
    emptyState: "col-span-full py-16 text-center text-muted",
    emptyIcon: "mx-auto h-12 w-12 mb-4 opacity-30",

    // Blog Card styles
    card: "group flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-[rgba(var(--color-surface),0.3)] backdrop-blur-sm transition-all hover:border-white/10 hover:bg-[rgba(var(--color-surface),0.5)] max-w-sm",
    imageWrapper: "relative h-36 w-full overflow-hidden",
    image: "object-cover w-full h-full", // Fade hataya
    imageOverlay: "hidden", // Overlay disable kar diya

    readTimeBadge: "absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-[rgba(0,0,0,0.6)] px-3 py-1 text-xs font-medium text-white backdrop-blur-md border border-white/10",
    categoryBadge: "absolute top-3 right-3 rounded-full bg-[rgb(var(--color-primary))] px-2 py-1 text-[10px] font-bold text-[rgb(var(--color-bg))]",
    contentWrapper: "flex flex-1 flex-col p-4",
    date: "mb-1.5 font-mono text-[9px] uppercase tracking-widest text-[rgb(var(--color-muted))]",
    title: "mb-2 font-display text-base font-medium leading-snug text-[rgb(var(--color-ink))]",
    excerpt: "mb-3 line-clamp-2 text-xs text-[rgb(var(--color-muted))]",
    footer: "mt-auto flex items-center justify-between pt-3 border-t border-white/5",
    footerUnderline: "absolute -bottom-1 left-0 h-[1px] w-0 bg-[rgb(var(--color-primary))] transition-all group-hover:w-full",
    arrowIcon: "text-[rgb(var(--color-primary))]"
};
export const notFoundTheme = {
    container: "container-page flex min-h-[60vh] flex-col items-center justify-center text-center",
    eyebrow: "eyebrow",
    title: "mt-4 font-display text-3xl font-semibold sm:text-4xl",
    description: "mt-3 max-w-sm text-muted",
    homeButton: "btn-primary mt-8 min-h-[44px]"
}; 