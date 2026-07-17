import React from "react";
import GradientBlob from "../ui/GradientBlob";

interface SectionWrapperProps {
    children: React.ReactNode;
    className?: string;
    blobColorLeft?: string;
    blobColorRight?: string;
    showBlobs?: boolean;
}
export default function SectionWrapper({
    children,
    className = "",
    blobColorLeft = "rgba(255, 215, 170, 0.6)",
    blobColorRight = "rgba(255, 177, 98, 0.6)",
    showBlobs = true,
}: SectionWrapperProps) {
    return (
        <section className={`relative overflow-hidden ${className}`}>
            {showBlobs && (
                <>
                    {/* Right Blob */}
                    <GradientBlob
                        color={blobColorRight} // 🎯 Dynamic prop use karein
                        className="right-[-5%] top-[-10%] h-[500px] w-[500px] opacity-40"
                    />
                    {/* Left Blob */}
                    <GradientBlob
                        color={blobColorLeft} // 🎯 Dynamic prop use karein
                        className="left-[-5%] bottom-[-10%] h-[450px] w-[450px] opacity-40"
                    />
                </>
            )}

            <div className="relative z-10">
                {children}
            </div>
        </section>
    );
}