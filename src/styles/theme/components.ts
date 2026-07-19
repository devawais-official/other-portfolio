export const buttonTheme = {
    base: "inline-flex items-center justify-center gap-2 rounded-full transition-all duration-300 font-semibold text-sm",
    variants: {
        solid: "bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-accent))] text-[rgb(var(--color-bg))] hover:scale-[1.03]",
        outline: "border border-[rgba(var(--color-primary),0.3)] bg-[rgba(var(--color-bg),0.2)] text-[rgb(var(--color-ink))] hover:bg-[rgba(var(--color-primary),0.1)] hover:border-[rgba(var(--color-primary),0.6)] hover:text-[rgb(var(--color-primary-light))]",
        ghost: "text-[rgb(var(--color-ink))] hover:bg-[rgba(var(--color-surface),0.3)]",
    },
    sizes: {
        default: "px-6 py-3",
        sm: "px-4 py-2 text-xs",
        icon: "p-3",
    },
};

export const sectionHeaderTheme = {
    container: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
    eyebrow: "eyebrow",
    title: "mt-3 font-display text-3xl font-semibold sm:text-4xl",
    actionLink: "inline-flex w-fit items-center gap-1 text-sm font-medium text-primary-light transition-colors hover:text-primary"
};

export const testimonialCardTheme = {
    container: "relative flex flex-col gap-5 p-6 rounded-2xl border border-border/40 bg-zinc-950/20 backdrop-blur-sm transition-all duration-300 ease-out overflow-hidden md:hover:-translate-y-1.5 md:hover:scale-[1.02] md:hover:border-primary/40 md:hover:shadow-lg md:hover:shadow-primary/5 cursor-pointer",
    quoteIcon: "text-primary/60",
    starIcon: "fill-primary text-primary",
    messageText: "font-sans text-sm leading-relaxed text-ink/80 flex-1 line-clamp-5",
    avatarContainer: "flex items-center gap-3 pt-4 border-t border-border/20 mt-auto",
    avatarBadge: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase border border-primary/20",
    clientName: "font-sans text-sm font-semibold text-ink",
    clientRole: "font-sans text-xs text-ink/60",
};