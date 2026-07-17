// src/hooks/useSocialLinks.ts
import { useMemo } from "react"
import { BsGithub } from "react-icons/bs"
import { FaLinkedinIn } from "react-icons/fa"
import { Mail } from "lucide-react"
import { siteConfig } from "@/lib/site-config"

export function useSocialLinks() {
    return useMemo(() => [
        { label: "GitHub", href: siteConfig.social.github, icon: BsGithub },
        { label: "LinkedIn", href: siteConfig.social.linkedin, icon: FaLinkedinIn },
        { label: "Email", href: siteConfig.email, icon: Mail, isEmail: true },
    ], [])
}