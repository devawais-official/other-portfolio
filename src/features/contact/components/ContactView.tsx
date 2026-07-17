"use client";

import PageHeader from "@/components/ui/PageHeader";
import { StandardPageLabels } from "@/utils/label-helper";
import { motion, Variants } from "framer-motion";

import { useSocialLinks } from "@/hooks/useSocialLinks";
import { siteTheme } from "@/lib/theme-config";
import { transformSocialLinksToOptions } from "../configs/contact-options";
import SystemStatusPanel from "./SystemStatusPanel";
import ContactCard from "./ContactCard";

interface ContactViewProps {
    labels: StandardPageLabels;
    location: string; // 🎯 Received directly as a prop
}

const systemInitVariants: Variants = {
    hidden: { opacity: 0, filter: "blur(5px)", scale: 0.98, y: 10 },
    visible: {
        opacity: 1,
        filter: "blur(0px)",
        scale: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 20,
            staggerChildren: 0.1
        }
    }
};

export default function ContactView({ labels, location }: ContactViewProps) {
    const rawSocialLinks = useSocialLinks();
    const contactOptions = transformSocialLinksToOptions(rawSocialLinks);
    const layout = siteTheme.contact;

    return (
        <>
            <PageHeader
                eyebrow={labels.title}
                title={labels.headerTitle}
                description={labels.headerDesc}
            />

            <div className={layout.containerClass}>
                <div className={layout.grid}>

                    {/* LEFT PANEL (GLOBE) */}
                    <motion.div variants={systemInitVariants} className="lg:col-span-5">
                        <SystemStatusPanel location={location} />
                    </motion.div>

                    {/* RIGHT PANEL (TACTICAL NODES) */}
                    <div className="lg:col-span-7 grid gap-4">
                        {contactOptions.map((option) => (
                            <ContactCard
                                key={option.label}
                                option={option}
                                variants={systemInitVariants}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </>
    );
}