
import React from "react";
import GradientBlob from "../ui/GradientBlob";
import { cn } from "@/lib/utils";

// ============================================================================
// TYPES & PROPS
// ============================================================================
interface SectionWrapperProps {
    children: React.ReactNode;
    className?: string;
    blobColorLeft?: string;
    blobColorRight?: string;
    showBlobs?: boolean;
    id?: string;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function SectionWrapper({
    children,
    className = "",
    blobColorLeft = "var(--color-brand-subtle)",
    blobColorRight = "var(--color-accent-subtle)",
    showBlobs = true,
    id,
}: SectionWrapperProps) {
    return (

        <section id={id} className={cn("relative overflow-hidden", className)}>
            {showBlobs && (
                <>
                    <GradientBlob
                        color={blobColorRight}
                        className="right-[-10%] top-[-10%] h-[500px] w-[500px] opacity-40 blur-[120px]"
                    />
                    <GradientBlob
                        color={blobColorLeft}
                        className="bottom-[-10%] left-[-10%] h-[450px] w-[450px] opacity-40 blur-[120px]"
                    />
                </>
            )}

            <div className="relative z-10 w-full">{children}</div>
        </section>
    );
}