"use client";

import { motion, Variants } from "framer-motion";

/* ==========================================================================
   Types & Configurations
   ========================================================================== */

interface Layer {
  label: string
  color: string
  // Hover positions
  hoverX: number
  hoverY: number
  hoverRotate: number
  glowClass: string
  borderClass: string
  dotClass: string
}

const LAYERS: Layer[] = [
  {
    label: "Flutter",
    color: "#67E8F9",
    hoverX: -130, // Left side slide-out
    hoverY: 20,
    hoverRotate: -15,
    glowClass: "bg-cyan-400/5 group-hover:bg-cyan-400/10",
    borderClass: "border-cyan-400/10 group-hover:border-cyan-400/30",
    dotClass: "bg-cyan-400"
  },
  {
    label: "Compose Multiplatform",
    color: "#FB7185",
    hoverX: 130, // Right side slide-out
    hoverY: 35,
    hoverRotate: 15,
    glowClass: "bg-rose-400/5 group-hover:bg-rose-400/10",
    borderClass: "border-rose-400/10 group-hover:border-rose-400/30",
    dotClass: "bg-rose-400"
  },
  {
    label: "Kotlin Multiplatform",
    color: "#fae48bff",
    hoverX: -10,
    hoverY: -110, // Top slide-out
    hoverRotate: -6,
    glowClass: "bg-yellow-200/5 group-hover:bg-yellow-200/10",
    borderClass: "border-yellow-200/10 group-hover:border-yellow-200/30",
    dotClass: "bg-yellow-200"
  },
]

/* ==========================================================================
   Framer Motion Physics (Spring dynamics for realistic feel)
   ========================================================================== */

const cardVariants: Variants = {
  initial: {
    x: 0,
    y: 0,
    rotate: 0,
    scale: 0.9,
    opacity: 0.3,
  },
  hover: (custom: Layer) => ({
    x: custom.hoverX,
    y: custom.hoverY,
    rotate: custom.hoverRotate,
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 120, // Real physics bounce
      damping: 14,
    }
  })
}

const phoneVariants: Variants = {
  initial: { scale: 1, y: 0 },
  hover: {
    scale: 1.03,
    y: -5,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 15
    }
  }
}

/* ==========================================================================
   Primary Component
   ========================================================================== */

export default function HeroComposeStack() {
  return (
    // Is master container par hover trigger hoga aur viewport control perfect rahega
    <motion.div
      initial="initial"
      whileHover="hover"
      className="relative mx-auto flex h-[400px] w-full max-w-[360px] sm:max-w-[420px] items-center justify-center overflow-visible group cursor-pointer"
    >

      {/* 1. Behind-the-scene Glassmorphic Cards */}
      {LAYERS.map((layer) => (
        <motion.div
          key={layer.label}
          custom={layer}
          variants={cardVariants}
          className={`
            absolute flex h-48 w-34 flex-col justify-between rounded-2xl border p-4 shadow-xl backdrop-blur-sm z-0 pointer-events-none transition-colors duration-300
            ${layer.glowClass} ${layer.borderClass}
          `}
        >
          <span className={`h-2 w-2 rounded-full ${layer.dotClass} shadow-[0_0_8px_currentColor]`} />
          <span className="text-[10px] leading-tight text-neutral-400 tracking-wide font-medium">
            {layer.label}
          </span>
        </motion.div>
      ))}

      {/* 2. Front Premium Phone Frame */}
      <motion.div
        variants={phoneVariants}
        className="relative z-10 flex h-[290px] w-[170px] flex-col items-center rounded-[2.2rem] border border-neutral-800/80 bg-neutral-900/90 p-3 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8)] backdrop-blur-md transition-shadow duration-300 group-hover:shadow-[0_30px_70px_-10px_rgba(59,130,246,0.25)] sm:h-[350px] sm:w-[200px]"
      >
        <PhoneInnerContent />
      </motion.div>

    </motion.div>
  )
}

/* ==========================================================================
   Sub-Components
   ========================================================================== */

function PhoneInnerContent() {
  return (
    <>
      {/* Ear Speaker Notch */}
      <div className="h-1.5 w-10 rounded-full bg-neutral-800" />

      {/* Screen Interface */}
      <div className="mt-3 flex w-full flex-1 flex-col gap-1.5 overflow-hidden rounded-xl bg-black p-2.5 sm:p-3.5">
        <div className="h-2 w-1/2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 animate-pulse" />
        <div className="mt-1 h-18 w-full rounded-lg bg-neutral-900/60 sm:h-22" />
        <div className="h-1.5 w-3/4 rounded-full bg-neutral-900/60" />
        <div className="h-1.5 w-2/3 rounded-full bg-neutral-900/60" />

        {/* Tab/Grid Footer */}
        <div className="mt-auto grid grid-cols-3 gap-1">
          <div className="h-6 rounded-md bg-neutral-900/60" />
          <div className="h-6 rounded-md bg-neutral-900/60" />
          <div className="h-6 rounded-md bg-emerald-500/10 border border-emerald-500/20" />
        </div>
      </div>

      {/* Subtitle */}
      <span className="mt-2 text-[8px] sm:text-[9px] uppercase tracking-widest text-emerald-400 font-bold text-center">
        one core, native UI
      </span>
    </>
  )
}