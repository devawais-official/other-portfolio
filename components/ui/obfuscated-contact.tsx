"use client";

import { useState, type ReactNode } from "react";

type ObfuscatedContactProps = {
  type: "email" | "phone";
  value: string;
  className?: string;
  children: ReactNode;
};

/**
 * Renders a contact link without the raw address/number present in the
 * initial HTML — the href is only constructed on click, in memory. This is
 * a deterrent against basic static-HTML scrapers, not real cryptographic
 * protection, but meaningfully cuts down automated harvesting. Used
 * anywhere an email/phone link appears so the obfuscation logic lives in
 * exactly one place (DRY).
 */
export function ObfuscatedContact({ type, value, className, children }: ObfuscatedContactProps) {
  const [revealed, setRevealed] = useState(false);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (revealed) return;
    e.preventDefault();
    setRevealed(true);
    const href = type === "email" ? `mailto:${value}` : `tel:${value}`;
    window.location.href = href;
  }

  return (
    <a
      href={revealed ? (type === "email" ? `mailto:${value}` : `tel:${value}`) : "#"}
      onClick={handleClick}
      className={className}
      aria-label={type === "email" ? "Send an email" : "Call"}
    >
      {children}
    </a>
  );
}
