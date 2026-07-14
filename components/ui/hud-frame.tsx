"use client";

import { motion } from "framer-motion";

/**
 * The decorative "chrome" (corner brackets, energy rails, scan line) is
 * visual noise that has nothing to do with a project's content, so it's
 * split out from ProjectCard entirely. Any future card that wants the
 * same tactical-HUD treatment wraps its content with this instead of
 * re-implementing the SVG/motion layers (DRY).
 */
export function HudFrame({ isHovered }: { isHovered: boolean }) {
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-30 h-px w-full bg-gradient-to-r from-transparent via-primary-light to-transparent opacity-0 group-hover:opacity-100"
        animate={{ x: isHovered ? ["-100%", "100%"] : "-100%" }}
        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 z-30 h-px w-full bg-gradient-to-r from-transparent via-secondary to-transparent opacity-0 group-hover:opacity-100"
        animate={{ x: isHovered ? ["100%", "-100%"] : "100%" }}
        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
      />

      <div aria-hidden className="pointer-events-none absolute inset-0 z-20 p-5">
        <svg className="h-full w-full" viewBox="0 0 100 100" fill="none">
          {[
            "M 6 2 L 2 2 L 2 6",
            "M 94 2 L 98 2 L 98 6",
            "M 6 98 L 2 98 L 2 94",
            "M 94 98 L 98 98 L 98 94",
          ].map((d) => (
            <path
              key={d}
              d={d}
              stroke="currentColor"
              strokeWidth="0.6"
              className="text-primary-light opacity-40 transition-opacity duration-300 group-hover:opacity-100"
            />
          ))}
        </svg>
      </div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-20 h-[12%] w-full bg-gradient-to-b from-primary/25 to-transparent opacity-0 group-hover:opacity-100"
        initial={{ top: "-12%" }}
        animate={{ top: isHovered ? "100%" : "-12%" }}
        transition={{ duration: 0.9, ease: "easeIn" }}
      />
    </>
  );
}
