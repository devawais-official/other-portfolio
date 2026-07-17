export const siteTheme = {
    htmlStyles: "scroll-smooth dark",
    bodyStyles: "bg-bg text-foreground font-sans antialiased min-h-screen flex flex-col",
    glowStyles: "pointer-events-none fixed inset-0 -z-10 bg-radial-glow opacity-30",

    heroBlobs: {
        right: "#8b5cf6",
        left: "#06b6d4"
    },
    processBlobs: {
        left: "#1d4ed8",
        right: "#3b82f6"
    },
    projects: {
        sectionPadding: "pb-24",
        container: "container-page",
        cardWrapper: "h-full", // Card wrap classes if any

        // Card custom states/transitions for Next Image & Icon Fallbacks
        imageTransition: "object-cover transition-all duration-700 [.is-hovered_&]:scale-110 [.is-hovered_&]:blur-[2px] [.is-hovered_&]:brightness-75",
        iconFallbackTransition: "absolute inset-0 flex items-center justify-center transition-transform duration-700 [.is-hovered_&]:scale-105",

        // Icon configurations
        fallbackIconColorOpacity: "opacity-30",
        storeIconStyle: "h-3.5 w-3.5 shrink-0"
    },
    services: {
        sectionPadding: "pb-24",
        grid: "container-page grid gap-5 sm:grid-cols-2",
        card: "card-surface p-6 sm:p-7 flex flex-col justify-between h-full group relative transition-all duration-300",
        iconContainer: "flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary-light transition-transform duration-500 group-hover:scale-105",
        title: "mt-4 font-display text-xl font-semibold text-ink group-hover:text-primary-light transition-colors duration-300",
        description: "mt-2.5 text-sm leading-relaxed text-muted",
        badgeContainer: "mt-5 flex flex-wrap gap-2",
        badge: "rounded-full border border-border px-3 py-1.5 font-mono text-xs text-muted bg-white/5 transition-all duration-300 group-hover:border-primary-light/30"
    },
    contact: {
        sectionPadding: "pb-24",
        containerClass: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative",
        grid: "grid lg:grid-cols-12 gap-8 items-stretch",

        // LEFT PANEL: Globe & Live Status Theme
        statusPanel: {
            // Outer dynamic layout structure
            wrapper: "w-full h-full p-0 bg-primary/5 backdrop-blur-3xl border border-primary/20 rounded-[2rem] relative overflow-hidden flex flex-col",
            innerContainer: "relative flex-1 w-full overflow-hidden bg-bg group/loc flex flex-col",
            bgGlow: "absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--color-primary),0.08)_0%,transparent_70%)]",
            globeOpacity: "absolute inset-0 opacity-40 group-hover/loc:opacity-80 transition-opacity duration-1000 pointer-events-none",
            globeClass: "w-full h-full object-cover scale-150 translate-x-10",
            // Bottom footer metadata frame
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
    },
    blog: {
        sectionPadding: "pb-24",
        grid: "container-page grid gap-6 sm:grid-cols-2",
        emptyState: "col-span-full py-16 text-center text-muted",
        emptyIcon: "mx-auto h-12 w-12 mb-4 opacity-30",

        // Blog Card styles
        card: "group relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-black/30",
        imageWrapper: "relative w-full h-28 overflow-hidden rounded-t-xl",
        image: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105",
        imageOverlay: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent",
        readTimeBadge: "absolute top-2 right-2 flex items-center gap-1 rounded-full bg-black/50 px-2 py-0.5 text-[9px] text-white backdrop-blur",
        categoryBadge: "absolute bottom-2 left-2 rounded-full bg-primary/20 px-2 py-0.5 text-[9px] uppercase tracking-wide text-primary-light backdrop-blur",
        contentWrapper: "flex flex-col gap-2 p-3",
        date: "text-[10px] text-gray-400",
        title: "text-[13px] font-semibold leading-snug text-white line-clamp-2 transition-colors group-hover:text-primary-light",
        excerpt: "text-[11px] text-gray-400 line-clamp-2",
        footer: "mt-1 flex items-center justify-between border-t border-white/10 pt-2 text-[11px] text-primary-light",
        footerUnderline: "absolute left-0 -bottom-0.5 h-px w-0 bg-primary-light transition-all group-hover:w-full",
        arrowIcon: "transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
    },
    about: {
        sectionPadding: "pb-16",
        mainGrid: "container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr]",

        // Bio Card (Left Column)
        bioCard: "card-surface p-6 sm:p-8",
        avatarBadge: "flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/60 font-display text-xl font-bold text-white",
        bioName: "mt-5 font-display text-2xl font-semibold",
        bioTagline: "text-sm text-muted",
        infoList: "mt-6 space-y-3 border-t border-border pt-6 text-sm",
        infoRow: "flex justify-between gap-4",
        infoLabel: "text-muted",
        infoValue: "text-right",

        // Stats Block
        statsGrid: "mt-8 grid grid-cols-2 gap-5 border-t border-border pt-6",
        statValue: "font-display text-xl font-semibold text-ink",
        statLabel: "mt-1 text-xs text-muted",

        // Expertise Block (Right Column)
        expertiseGrid: "mt-8 grid gap-4 sm:grid-cols-2",
        expertiseCard: "card-surface p-5",
        expertiseTitle: "font-display text-sm font-semibold text-primary-light",
        tagsContainer: "mt-3 flex flex-wrap gap-1.5",
        tagSpan: "rounded-full border border-border px-2.5 py-1 text-xs text-muted",

        // Experience Timeline Section
        timelineSection: "section-pad border-t border-border bg-surface/30",
        timelineLayout: "container-page",
        timelineHeaderClass: "max-w-xl",
        timelineContainer: "mt-12 space-y-8",
        experienceCard: "card-surface grid gap-4 p-6 sm:grid-cols-[180px_1fr] sm:gap-8 sm:p-7",
        expDuration: "font-mono text-xs text-primary-light",
        expRole: "mt-1 font-display text-lg font-semibold",
        expCompany: "text-sm text-muted",
        expDesc: "text-sm leading-relaxed text-muted",
        achievementsList: "mt-4 space-y-2",
        achievementItem: "flex items-start gap-2.5 text-sm text-ink/80",
        bulletPoint: "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
    },
    footer: {
        container: "border-t border-border bg-surface/40",
        grid: "container-page grid gap-10 py-14 sm:grid-cols-2 md:grid-cols-4",

        // Brand Block
        brandCol: "flex flex-col items-start sm:col-span-2 md:col-span-1",
        logoLink: "relative block mb-4 w-14 h-14 md:w-16 md:h-16 group cursor-pointer",
        logoGradientBg: "absolute inset-0 rotate-45 rounded-lg bg-gradient-to-r from-primary via-mint to-accent transition-transform duration-500 group-hover:rotate-90 shadow-[0_0_20px_rgba(74,105,88,0.25)]",
        logoInnerBg: "absolute inset-2 rotate-45 rounded-lg flex items-center justify-center bg-bg transition-transform duration-500 group-hover:rotate-0",
        logoMask: "w-8 h-8 -rotate-45 transition-transform duration-500 bg-ink group-hover:rotate-0",
        brandTitle: "text-xl md:text-2xl font-black text-ink tracking-tighter uppercase italic",
        brandTagline: "mt-1 text-[10px] font-bold uppercase tracking-widest text-primary-light",

        // Typography & List
        eyebrow: "eyebrow",
        listContainer: "mt-4 space-y-2.5",
        linkText: "text-sm text-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:underline min-h-[32px] inline-flex items-center",
        staticText: "text-sm text-muted",

        // Socials
        socialContainer: "mt-5 flex gap-3",
        socialIconLink: "flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-muted transition-all duration-300 hover:border-white/30 hover:text-primary-light hover:bg-white/[0.08] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light",
        // Meta
        metaRow: "border-t border-border py-6",
        metaLayout: "container-page flex flex-col items-center justify-between gap-2 text-xs text-muted sm:flex-row"
    },
    button: {
        base: "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-300 active:scale-95 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",

        variants: {
            ghost: "bg-transparent hover:bg-surface text-ink/90 hover:text-ink",
            solid: "bg-primary-accent-gradient text-bg font-semibold shadow-[0_4px_20px_0_rgba(74,105,88,0.35)] hover:shadow-[0_4px_25px_0_rgba(142,175,157,0.5)] hover:opacity-95",
            outline: "border border-border bg-surface text-ink hover:border-primary/40 hover:bg-surface2/50",
        },

        sizes: {
            default: "h-11 px-5 text-sm",
            sm: "h-9 px-3.5 text-xs",
            icon: "h-10 w-10 p-0",
        }
    },
    header: {
        // 1. Wrapper ka background bhi bg-bg/80 karo (pehle bg-background/80 tha)
        wrapper: "fixed top-0 left-0 w-full z-50 transition-transform duration-300 ease-in-out bg-bg/80 backdrop-blur-md border-b border-border/10",
        container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between",
        desktopNavWrapper: "hidden md:flex items-center gap-6",
        desktopNav: "flex items-center gap-1 bg-muted/30 px-3 py-1.5 rounded-full border border-border/20",
        desktopLink: "relative px-4 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none rounded-full",
        activeTab: "absolute inset-0 bg-primary/10 rounded-full -z-10",
        activeTabDot: "absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full",

        // Social Block
        socialDivider: "flex items-center gap-1 border-l border-border/40 pl-3 ml-2",
        socialBtn: "w-8 h-8 rounded-full flex items-center justify-center text-muted hover:text-primary transition-all duration-200",
        socialIcon: "w-4 h-4",

        mobileToggle: "md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-muted/50",

        mobileDrawer: "fixed top-16 left-0 w-full h-[calc(100vh-4rem)] bg-bg/98 backdrop-blur-xl z-[100] md:hidden flex flex-col justify-between p-6 border-t border-border/20",
        mobileGrid: "grid grid-cols-1 gap-4 py-6",
        mobileLinkActive: "flex items-center justify-between p-4 rounded-xl bg-primary/10 text-primary font-semibold transition-all duration-200",
        mobileLinkInactive: "flex items-center justify-between p-4 rounded-xl hover:bg-muted/50 text-muted transition-all duration-200",
        mobileLinkLabel: "text-sm font-semibold tracking-wide uppercase",
        mobileDivider: "border-t border-border/10",
        mobileSocialWrapper: "flex items-center justify-center gap-6 py-6 border-t border-border/20",
        mobileSocialIconBtn: "w-12 h-12 rounded-full flex items-center justify-center border border-border/20 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200",
        mobileSocialIconClass: "w-5 h-5 text-ink transition-colors",
    },
    sectionHeader: {
        container: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        eyebrow: "eyebrow",
        title: "mt-3 font-display text-3xl font-semibold sm:text-4xl",
        actionLink: "inline-flex w-fit items-center gap-1 text-sm font-medium text-primary-light transition-colors hover:text-primary"
    },
    hero: {
        wrapper: "pb-8 pt-24 sm:pt-28 lg:pt-24",
        layoutGrid: "container-page grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]",
        eyebrow: "eyebrow flex items-center gap-2",
        heading: "mt-5 font-display text-4xl font-semibold leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl",
        headingGradient: "bg-brand-gradient bg-clip-text text-transparent",
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
    },
    // Testimonial Card ke styles, colors aur typography tokens
    testimonialCard: {
        container: "card-surface flex h-full flex-col p-6",

        // Icons & Visuals
        quoteIcon: "text-primary-light opacity-70",
        starIcon: "fill-accent text-accent",

        // Message Typography
        messageText: "mt-4 flex-1 text-sm leading-relaxed text-ink/90",

        // Avatar & Meta Info
        avatarContainer: "mt-6 flex items-center gap-3 border-t border-border pt-4",
        avatarBadge: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20 font-mono text-xs font-semibold text-primary-light",

        // Client Meta Typography
        clientName: "text-sm font-semibold text-ink",
        clientRole: "text-xs text-muted"
    },
    notFoundPage: {
        container: "container-page flex min-h-[60vh] flex-col items-center justify-center text-center",
        eyebrow: "eyebrow",
        title: "mt-4 font-display text-3xl font-semibold sm:text-4xl",
        description: "mt-3 max-w-sm text-muted",
        homeButton: "btn-primary mt-8 min-h-[44px]"
    }
};