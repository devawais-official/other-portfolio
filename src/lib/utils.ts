import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge conditional class names and resolve Tailwind conflicts.
 * Single source of truth for className composition across the app —
 * every component that needs conditional classes should use this
 * instead of ad-hoc string concatenation, so merge behavior stays
 * consistent (DRY).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
