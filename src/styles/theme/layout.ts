export const headerTheme = {
    wrapper: "fixed top-0 left-0 w-full z-50 transition-transform duration-300 ease-in-out bg-bg/80 backdrop-blur-md border-b border-border/10",
    container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between",
    desktopNavWrapper: "hidden md:flex items-center gap-6",
    desktopNav: "flex items-center gap-1 bg-muted/30 px-3 py-1.5 rounded-full border border-border/20",
    desktopLink: "relative px-4 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none rounded-full",
    activeTab: "absolute inset-0 bg-primary/10 rounded-full -z-10",
    activeTabDot: "absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full",
    socialDivider: "flex items-center gap-1 border-l border-border/40 pl-3 ml-2",
    socialIcon: "w-4 h-4 text-muted hover:text-primary-light transition-colors",
    socialBtn: "flex items-center justify-center p-2 rounded-full",
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
};

export const footerTheme = {
    // 🛠️ FIX 1: Pure bg-bg ke sath halka sa zinc/neutral contrast background optimize kiya (bg-bg/95 aur border solid color)
    container: "w-full border-t border-white/[0.08] bg-bg/95 py-14 shadow-inner",
    grid: "grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12",
    brandCol: "flex flex-col items-start gap-2",
    logoLink: "relative block mb-1 w-14 h-14 md:w-16 md:h-16 group cursor-pointer",
    logoGradientBg: "absolute inset-0 rotate-45 rounded-lg bg-gradient-to-r from-primary via-mint to-accent transition-transform duration-500 group-hover:rotate-90 shadow-[0_0_20px_rgba(74,105,88,0.25)]",
    logoInnerBg: "absolute inset-2 rotate-45 rounded-lg flex items-center justify-center bg-bg transition-transform duration-500 group-hover:rotate-0",
    logoMask: "w-8 h-8 -rotate-45 transition-transform duration-500 bg-ink group-hover:rotate-0",
    brandTitle: "text-xl md:text-2xl font-black text-ink tracking-tight uppercase italic leading-none",

    // 🛠️ FIX 2: Tagline se text-muted/70 complete hata kar solid text-ink kiya
    brandTagline: "text-xs text-ink/90 max-w-[200px] leading-relaxed uppercase tracking-wider font-mono font-semibold",

    eyebrow: "eyebrow",
    listContainer: "mt-4 flex flex-col gap-1.5 text-sm",
    linkText: "text-sm text-muted transition-colors hover:text-ink hover:text-primary focus-visible:outline-none focus-visible:underline min-h-[32px] inline-flex items-center",

    // 🛠️ FIX 3: staticText (jo Lahore, Pakistan aur specialties ke liye use hota hai) ko pure text-white/90 standard par update kiya
    staticText: "text-sm text-white/90 font-medium selection:bg-primary/20",

    socialContainer: "flex flex-wrap items-center gap-2.5 mt-3 justify-start",
    socialIconLink: "w-9 h-9 rounded-full border border-white/5 bg-white/[0.02] flex items-center justify-center text-ink/60 hover:text-primary hover:border-primary/30 hover:shadow-[0_0_10px_rgba(255,177,98,0.1)] transition-all duration-300",
    metaContainer: "mt-10 pt-6 border-t border-white/5 text-xs text-muted/50 w-full",
    metaLayout: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
};