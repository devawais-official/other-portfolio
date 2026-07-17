"use client";

import createGlobe from "cobe";
import { useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

const MOVEMENT_DAMPING = 1400;

interface Marker {
  location: [number, number];
  size: number;
}

interface GlobeConfig {
  width: number;
  height: number;
  onRender: (state: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
  devicePixelRatio: number;
  phi: number;
  theta: number;
  dark: number;
  diffuse: number;
  mapSamples: number;
  mapBrightness: number;
  baseColor: [number, number, number];
  markerColor: [number, number, number];
  glowColor: [number, number, number];
  markers: Marker[];
}

const GLOBE_CONFIG: GlobeConfig = {
  width: 800,
  height: 800,
  onRender: () => { },
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [1, 1, 1],
  glowColor: [1, 1, 1],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
};

interface GlobeProps {
  className?: string;
  config?: Partial<GlobeConfig>;
}

export function Globe({ className, config = GLOBE_CONFIG }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);

  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  });

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
    }
  };

  const widthRef = useRef(0);
  useEffect(() => {
    if (!canvasRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        widthRef.current = entry.contentRect.width;
      }
    });
    observer.observe(canvasRef.current);
    widthRef.current = canvasRef.current.getBoundingClientRect().width;
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      ...GLOBE_CONFIG,
      ...config,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      onRender: (state: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
        if (!pointerInteracting.current) phi += 0.005;
        state.phi = phi + rs.get();
        state.width = widthRef.current * 2;
        state.height = widthRef.current * 2;
      },
    });

    setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1";
    }, 0);

    return () => {
      globe.destroy();
    };
  }, [rs, config]);

  return (
    <div
      className={twMerge(
        "mx-auto aspect-[1/1] w-full max-w-[600px]",
        className
      )}
    >
      <canvas
        className={twMerge(
          "size-[30rem] opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        )}
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          updatePointerInteraction(e.clientX);
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  );
}