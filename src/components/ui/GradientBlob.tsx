import React from "react";

interface GradientBlobProps {
  className?: string;
  style?: React.CSSProperties;
  // Dynamic glow custom color ke liye optional prop
  color?: string;
}

export default function GradientBlob({
  className = "",
  style,
  color,
}: GradientBlobProps) {
  return (
    <></>
    // {<div
    //   aria-hidden
    //   style={{
    //     ...style,
    //     ...(color ? { backgroundColor: color } : {}),
    //   }}
    //   className={`
    //     pointer-events-none absolute 
    //     rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] /* Organic initial shape */
    //     blur-[80px] sm:blur-[120px]                 /* Premium deep blur */
    //     mix-blend-screen
    //     opacity-45 mix-blend-screen                 /* Elegant blending for dark mode */
    //     will-change-transform transform-gpu         /* GPU rendering (Super Smooth) */
    //     animate-liquid-blob                         /* Custom fluid animation */
    //     ${className}
    //   `}
    // />}
  );
}