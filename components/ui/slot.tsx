import { cloneElement, isValidElement, forwardRef } from "react";
import type { HTMLAttributes, ReactElement } from "react";

/**
 * Minimal Radix-style Slot: merges the props passed to <Component asChild>
 * onto its single child element instead of rendering a wrapper node.
 * Enough for our use case (Button asChild wrapping an <a>) without pulling
 * in @radix-ui/react-slot as a dependency.
 */
export const Slot = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  ({ children, className, ...props }, ref) => {
    if (!isValidElement(children)) return null;

    const child = children as ReactElement<{ className?: string }>;

    return cloneElement(child, {
      ...props,
      // @ts-expect-error — ref forwarding onto an arbitrary child element
      ref,
      className: [className, child.props.className].filter(Boolean).join(" "),
    });
  }
);

Slot.displayName = "Slot";
