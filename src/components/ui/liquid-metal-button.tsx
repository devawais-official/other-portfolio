"use client"

import type React from "react"
import { useState, useRef, useEffect, useMemo } from "react"
import { Sparkles } from "lucide-react"

interface LiquidMetalButtonProps {
    label?: string
    onClick?: () => void
    viewMode?: "text" | "icon"
}

const SMOOTH_TRANSITION = "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.4s ease, height 0.4s ease"

export function LiquidMetalButton({ label = "Get Started", onClick, viewMode = "text" }: LiquidMetalButtonProps) {
    const [isHovered, setIsHovered] = useState(false)
    const [isPressed, setIsPressed] = useState(false)
    const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([])

    const shaderRef = useRef<HTMLDivElement>(null)
    const shaderMount = useRef<any>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const rippleId = useRef(0)

    const dim = useMemo(() => {
        return viewMode === "icon"
            ? { w: 46, h: 46, innerW: 42, innerH: 42, shaderW: 46, shaderH: 46 }
            : { w: 142, h: 46, innerW: 138, innerH: 42, shaderW: 142, shaderH: 46 }
    }, [viewMode])

    useEffect(() => {
        let isMounted = true

        const loadShader = async () => {
            try {
                const { liquidMetalFragmentShader, ShaderMount } = await import("@paper-design/shaders")

                if (isMounted && shaderRef.current) {
                    if (shaderMount.current?.destroy) shaderMount.current.destroy()

                    shaderMount.current = new ShaderMount(
                        shaderRef.current,
                        liquidMetalFragmentShader,
                        {
                            u_repetition: 4,
                            u_softness: 0.55,

                            // 🎨 Shader Color Tuning: Green aur Sage sheen dene ke liye shifts adjust kiye hain
                            u_shiftRed: 0.1,    // Red tone kam ki
                            u_shiftBlue: 0.35,  // Cyan/Green tone ko support karne ke liye

                            u_distortion: 0.1,
                            u_contour: 0.1,
                            u_angle: 45,
                            u_scale: 8,
                            u_shape: 1,
                            u_offsetX: 0.1,
                            u_offsetY: -0.1,
                        },
                        undefined,
                        0.6
                    )
                }
            } catch (error) {
                console.error("[v0] Failed to load shader:", error)
            }
        }

        loadShader()

        return () => {
            isMounted = false
            if (shaderMount.current?.destroy) {
                shaderMount.current.destroy()
                shaderMount.current = null
            }
        }
    }, [dim.w, dim.h])

    const handleMouseEnter = () => {
        setIsHovered(true)
        shaderMount.current?.setSpeed?.(1)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
        setIsPressed(false)
        shaderMount.current?.setSpeed?.(0.6)
    }

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (shaderMount.current?.setSpeed) {
            shaderMount.current.setSpeed(2.4)
            setTimeout(() => {
                shaderMount.current?.setSpeed?.(isHovered ? 1 : 0.6)
            }, 300)
        }

        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect()
            const ripple = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
                id: rippleId.current++
            }

            setRipples((prev) => [...prev, ripple])
            setTimeout(() => {
                setRipples((prev) => prev.filter((r) => r.id !== ripple.id))
            }, 600)
        }

        onClick?.()
    }

    const transformZState = isPressed ? "translateY(1px) scale(0.98)" : "translateY(0) scale(1)"

    return (
        <div className="relative inline-block">
            <style>{`
                .shader-container-exploded canvas {
                    width: 100% !important;
                    height: 100% !important;
                    display: block !important;
                    position: absolute !important;
                    top: 0 !important;
                    left: 0 !important;
                    border-radius: 100px !important;
                }
                @keyframes ripple-animation {
                    0% { transform: translate(-50%, -50%) scale(0); opacity: 0.4; }
                    100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
                }
            `}</style>

            <div style={{ perspective: "1000px", perspectiveOrigin: "50% 50%" }}>
                <div
                    style={{
                        position: "relative",
                        width: `${dim.w}px`,
                        height: `${dim.h}px`,
                        transformStyle: "preserve-3d",
                        transition: SMOOTH_TRANSITION,
                        transform: "none",
                    }}
                >
                    {/* Layer 1: Text / Icon (🎨 Set to Ivory #FFEEDF/#F5F0E1 for readability) */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "6px",
                            transformStyle: "preserve-3d",
                            transition: `${SMOOTH_TRANSITION}, gap 0.4s ease`,
                            transform: "translateZ(20px)",
                            zIndex: 30,
                            pointerEvents: "none",
                        }}
                    >
                        {viewMode === "icon" ? (
                            <Sparkles
                                size={16}
                                style={{
                                    color: "#F5F0E1", // Ivory tone
                                    filter: "drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.6))",
                                    transition: SMOOTH_TRANSITION,
                                }}
                            />
                        ) : (
                            <span
                                style={{
                                    fontSize: "14px",
                                    color: "#F5F0E1", // Ivory tone
                                    fontWeight: 600,  // Thoda bold kiya taake forest background par pop kare
                                    textShadow: "0px 1px 3px rgba(0, 0, 0, 0.7)",
                                    transition: SMOOTH_TRANSITION,
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {label}
                            </span>
                        )}
                    </div>

                    {/* Layer 2: Inner Dark Button Body (🎨 Upgraded to deep Forest Green gradient) */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            transformStyle: "preserve-3d",
                            transition: SMOOTH_TRANSITION,
                            transform: `translateZ(10px) ${transformZState}`,
                            zIndex: 20,
                        }}
                    >
                        <div
                            style={{
                                width: `${dim.innerW}px`,
                                height: `${dim.innerH}px`,
                                margin: "2px",
                                borderRadius: "100px",
                                // 🎨 #0A2E27 (Darker Forest Green) se lekar #0F3D34 tak ka natural blend
                                background: "linear-gradient(180deg, #0F3D34 0%, #061B17 100%)",
                                border: "1px solid rgba(142, 182, 155, 0.15)", // Sage Green subtle inner border
                                boxShadow: isPressed
                                    ? "inset 0px 2px 4px rgba(0, 0, 0, 0.5)"
                                    : "none",
                                transition: `${SMOOTH_TRANSITION}, box-shadow 0.15s`,
                            }}
                        />
                    </div>

                    {/* Layer 3: The Shader Background (Liquid Metal / Sage Sheen) */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            transformStyle: "preserve-3d",
                            transition: SMOOTH_TRANSITION,
                            transform: `translateZ(0px) ${transformZState}`,
                            zIndex: 10,
                        }}
                    >
                        <div
                            style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "100px",
                                // Dark Forest background par soft gold/green shadow
                                boxShadow: isPressed
                                    ? "0px 0px 0px 1px rgba(15, 61, 52, 0.5)"
                                    : isHovered
                                        ? "0px 0px 0px 1px rgba(142, 182, 155, 0.3), 0px 8px 16px rgba(15, 61, 52, 0.3)"
                                        : "0px 0px 0px 1px rgba(142, 182, 155, 0.15), 0px 4px 8px rgba(0, 0, 0, 0.2)",
                                transition: `${SMOOTH_TRANSITION}, box-shadow 0.15s`,
                                background: "transparent",
                            }}
                        >
                            <div
                                ref={shaderRef}
                                className="shader-container-exploded"
                                style={{
                                    borderRadius: "100px",
                                    overflow: "hidden",
                                    position: "relative",
                                    width: `${dim.shaderW}px`,
                                    height: `${dim.shaderH}px`,
                                    transition: "width 0.4s ease, height 0.4s ease",
                                }}
                            />
                        </div>
                    </div>

                    {/* Layer 4: Interactive Layer with Sage/Ivory ripples */}
                    <button
                        ref={buttonRef}
                        onClick={handleClick}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onMouseDown={() => setIsPressed(true)}
                        onMouseUp={() => setIsPressed(false)}
                        aria-label={label}
                        style={{
                            position: "absolute",
                            inset: 0,
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            outline: "none",
                            zIndex: 40,
                            transformStyle: "preserve-3d",
                            transform: "translateZ(25px)",
                            transition: SMOOTH_TRANSITION,
                            overflow: "hidden",
                            borderRadius: "100px",
                        }}
                    >
                        {ripples.map((ripple) => (
                            <span
                                key={ripple.id}
                                style={{
                                    position: "absolute",
                                    left: `${ripple.x}px`,
                                    top: `${ripple.y}px`,
                                    width: "20px",
                                    height: "20px",
                                    borderRadius: "50%",
                                    // 🎨 Sage Green/Ivory mix ripple effect
                                    background: "radial-gradient(circle, rgba(142, 182, 155, 0.5) 0%, rgba(255, 255, 255, 0) 70%)",
                                    pointerEvents: "none",
                                    animation: "ripple-animation 0.6s ease-out",
                                }}
                            />
                        ))}
                    </button>
                </div>
            </div>
        </div>
    )
}