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
 * initial HTML. Protects against scrapers while keeping keyboard focus active.
 */
export function ObfuscatedContact({ type, value, className, children }: ObfuscatedContactProps) {
  const [revealed, setRevealed] = useState(false);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (revealed) return;

    // Prevent default anchor jump for '#'
    e.preventDefault();
    setRevealed(true);

    const href = type === "email" ? `mailto:${value}` : `tel:${value}`;
    window.location.href = href;
  }

  const computedHref = revealed
    ? (type === "email" ? `mailto:${value}` : `tel:${value}`)
    : "javascript:void(0);"; // 👈 Better than "#" to prevent page jumping on click

  return (
    <a
      href={computedHref}
      onClick={handleClick}
      className={className}
      role="button" // 👈 Better accessibility for screen readers before reveal
      aria-label={type === "email" ? "Send an email" : "Call contact number"}
    >
      {children}
    </a>
  );
}