export const buttonTheme = {
    // 🎯 FIX: rounded-xl ko hata kar rounded-full kar diya hai pure capsular look ke liye
    base: "inline-flex items-center justify-center gap-2 rounded-full transition-all duration-300 font-mono text-xs font-bold tracking-wider uppercase active:scale-95 shadow-md",
    variants: {
        // Full Solid Contrast button for primary CTA (Start a project)
        solid: "bg-[rgba(var(--color-primary),1)] text-[rgba(var(--color-text-on-accent),1)] hover:bg-[rgba(var(--color-primary-light),1)] hover:scale-[1.02] shadow-[0_4px_20px_rgba(var(--color-primary),0.25)] px-6 py-3.5",
        // Semi-transparent ghost outline for secondary CTA (View projects)
        outline: "border border-[rgba(var(--color-border),0.3)] bg-[rgba(var(--color-bg),0.4)] text-[rgba(var(--color-ink),1)] hover:bg-[rgba(var(--color-surface),0.6)] hover:border-[rgba(var(--color-primary),0.4)] px-6 py-3.5",
        ghost: "text-[rgba(var(--color-ink),1)] hover:bg-[rgba(var(--color-surface),0.4)]",
    },
    sizes: {
        default: "px-6 py-3.5",
        sm: "px-4 py-2 text-[11px]",
        icon: "p-3.5",
    },
};

export const sectionHeaderTheme = {
    container: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
    eyebrow: "eyebrow",
    title: "mt-3 font-display text-3xl font-semibold sm:text-4xl",
    actionLink: "inline-flex w-fit items-center gap-1 text-sm font-medium text-primary-light transition-colors hover:text-primary"
};
export const ctaTheme = {
    // Main Section Wrapper
    sectionPadding: "pb-24 relative overflow-hidden",

    // 🎯 FIX: Hardcoded liquid-glass aur white alpha ko hata kar smooth adaptive surface aur borders lagaye hain
    boxWrapper: "flex flex-col items-center gap-6 px-6 py-14 text-center sm:px-16 rounded-[2rem] border border-[rgba(var(--color-border),0.15)] bg-[rgba(var(--color-surface),0.3)] backdrop-blur-md shadow-2xl shadow-primary/5 relative overflow-hidden",

    // Typography Framework
    eyebrow: "eyebrow",
    title: "max-w-xl font-display text-3xl font-semibold leading-tight sm:text-4xl text-ink",
    description: "max-w-md text-muted text-sm leading-relaxed",

    // Layout and Buttons Spacer
    buttonContainer: "flex flex-col gap-4 sm:flex-row items-center justify-center w-full sm:w-auto mt-2",
};
export const processCardTheme = {
    // 1. Outer Container: Depth lift ki hai background se aur borders ko standard dynamic structure par laya hai
    card: "group p-5 rounded-2xl border border-[rgba(var(--color-border),0.15)] bg-[rgba(var(--color-surface),0.2)] hover:bg-[rgba(var(--color-surface),0.4)] hover:border-[rgba(var(--color-primary),0.3)] transition-all duration-300 flex flex-col justify-between min-h-[160px] relative overflow-hidden backdrop-blur-md shadow-xl md:hover:-translate-y-1",

    // 2. Step Numbers (01, 02, 03, 04): Inhe high-contrast accent pop text banaya hai
    stepNumber: "text-xs font-mono font-bold tracking-wider text-[rgba(var(--color-accent),1)] uppercase",

    // 3. Card Title (Discovery, Architecture, etc.): Solid premium ink contrast
    title: "mt-3 font-display text-base font-bold text-ink group-hover:text-[rgba(var(--color-primary),1)] transition-colors duration-300",

    // 4. Card Description: Clean secondary metadata spacing
    description: "mt-1.5 text-xs leading-relaxed text-muted/90",

    // 5. Back-end hover glow structure (Optional overlay effect matching preview card)
    hoverGlow: "pointer-events-none absolute inset-0 bg-[rgba(var(--color-primary),0.02)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 mix-blend-overlay"
};
export const testimonialCardTheme = {
    // 🎯 FIX: Background ko thoda lift kiya taake yeh background ke sath merge na ho, aur proper dynamic border diya
    container: "relative flex flex-col gap-5 p-6 rounded-2xl border border-[rgba(var(--color-border),0.15)] bg-[rgba(var(--color-surface),0.2)] backdrop-blur-md transition-all duration-300 ease-out overflow-hidden md:hover:-translate-y-1.5 md:hover:scale-[1.01] md:hover:border-[rgba(var(--color-primary),0.3)] md:hover:shadow-lg md:hover:shadow-primary/5 cursor-pointer",

    // Quotes aur stars ka icon setup (Primary/Accent alignment)
    quoteIcon: "text-[rgba(var(--color-primary),0.7)] w-5 h-5",
    starIcon: "fill-[rgba(var(--color-primary),1)] text-[rgba(var(--color-primary),1)] w-3.5 h-3.5",

    // Message text standard readable ink colors
    messageText: "font-sans text-sm leading-relaxed text-ink/90 flex-1 line-clamp-5",

    // Avatar aur separation framework
    avatarContainer: "flex items-center gap-3 pt-4 border-t border-[rgba(var(--color-border),0.1)] mt-auto",

    // Client profile text styling
    avatarBadge: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[rgba(var(--color-primary),0.15)] text-[rgba(var(--color-primary-light),1)] text-xs font-semibold uppercase border border-[rgba(var(--color-primary),0.2)]",
    clientName: "font-sans text-sm font-semibold text-ink",
    clientRole: "font-sans text-xs text-muted/80",
};