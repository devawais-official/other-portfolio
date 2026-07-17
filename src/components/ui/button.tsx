import { forwardRef } from "react";
import { Slot } from "./slot";
import { cn } from "@/lib/utils";
import { siteTheme } from "@/lib/theme-config";

type Variant = "ghost" | "solid" | "outline";
type Size = "default" | "icon" | "sm";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "solid", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const { button: style } = siteTheme;
    return (
      <Comp
        ref={ref}
        className={cn(
          style.base,
          style.variants[variant],
          style.sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";