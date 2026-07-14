import { forwardRef } from "react";
import { Slot } from "./slot";
import { cn } from "@/lib/utils";

type Variant = "ghost" | "solid" | "outline";
type Size = "default" | "icon" | "sm";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
};

// Yahan humne classes ko update kiya hai taake ReGrowth theme ke sath sahi glow kare
const variantClasses: Record<Variant, string> = {
  ghost: "bg-transparent hover:bg-surface text-ink/90 hover:text-ink",
  // Soft Green Glow matching our brand gradient
  solid: "bg-primary-accent-gradient text-bg font-semibold shadow-[0_4px_20px_0_rgba(74,105,88,0.35)] hover:shadow-[0_4px_25px_0_rgba(142,175,157,0.5)] hover:opacity-95",
  // Outline with our new surface and subtle border glow on hover
  outline: "border border-border bg-surface text-ink hover:border-primary/40 hover:bg-surface2/50",
};

const sizeClasses: Record<Size, string> = {
  default: "h-11 px-5 text-sm", // Mobile modern feels ke liye height ko halka sa enhance kiya hai (10 -> 11)
  sm: "h-9 px-3.5 text-xs",
  icon: "h-10 w-10 p-0",
};

/**
 * Single reusable Button primitive. Every icon/ghost/outline button in the
 * app composes this instead of redefining its own class strings — keeps
 * hover/focus/disabled behavior consistent in one place (DRY).
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "solid", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-300 active:scale-95 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";