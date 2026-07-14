"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { useI18n } from "@/lib/i18n";

/* ─── Static config lifted out of component scope (Rule 1: No Inline Configs) ─ */

const PLATFORM_KEYS = ["android", "kmp", "cmp", "flutter", "notsure"] as const;
const PLATFORM_VALUES = [
  "Android Native (Kotlin/Java)",
  "Kotlin Multiplatform (KMP)",
  "Compose Multiplatform (CMP)",
  "Flutter",
  "Not sure yet",
];

const BUDGET_KEYS = ["under10k", "10k_30k", "30k_75k", "over75k"] as const;
const BUDGET_VALUES = ["Under $10k", "10k – $30k", "30k – $75k", "75k+"];

/* ─── Reusable Field wrapper (Rule 3: DRY form layout) ─────────────────────── */

function FormField({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-ink">{label}</label>
      {children}
      {error && <span className="text-xs text-accent-light">{error}</span>}
    </div>
  );
}

/* ─── Validation pipeline (Rule 2: Clean fallback abstractions) ─────────────── */

function validate(name: string, email: string, message: string, t: (k: string) => string) {
  const errors: Record<string, string> = {};
  if (!name) errors.name = t("contact.form.nameRequired");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = t("contact.form.emailRequired");
  if (message.length < 12) errors.message = t("contact.form.detailsRequired");
  return errors;
}

/* ─── ContactForm ────────────────────────────────────────────────────────────── */

export default function ContactForm() {
  const { t } = useI18n();
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");

  // Build option arrays using translation keys (derived, not re-declared)
  const platforms = PLATFORM_VALUES.map((value, i) => ({ value, label: t(`contact.form.platforms.${PLATFORM_KEYS[i]}`) }));
  const budgets = BUDGET_VALUES.map((value, i) => ({ value, label: t(`contact.form.budgets.${BUDGET_KEYS[i]}`) }));

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const message = String(form.get("message") || "").trim();
    const company = String(form.get("company") || ""); // honeypot

    const nextErrors = validate(name, email, message, t);
    setErrors(nextErrors);
    setServerError("");
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, company,
          platform: form.get("platform"), budget: form.get("budget") }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data?.fields) setErrors(data.fields);
        setServerError(data?.error || "Something went wrong. Please try again or email me directly.");
        setStatus("error");
        return;
      }
      setStatus("done");
    } catch {
      setServerError("Network error — please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="card-surface flex flex-col items-center gap-3 px-6 py-16 text-center">
        <CheckCircle2 className="text-mint" size={40} />
        <h3 className="font-display text-xl font-semibold">{t("contact.form.successTitle")}</h3>
        <p className="max-w-sm text-sm text-muted">{t("contact.form.successMessage")}</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="card-surface flex flex-col gap-5 p-6 sm:p-8">
      {/* Honeypot — hidden from users, traps bots */}
      <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label={t("contact.form.nameLabel")} name="name" error={errors.name}>
          <input id="name" name="name" type="text" placeholder={t("contact.form.namePlaceholder")} className="input-base min-h-[44px]" />
        </FormField>
        <FormField label={t("contact.form.emailLabel")} name="email" error={errors.email}>
          <input id="email" name="email" type="email" placeholder={t("contact.form.emailPlaceholder")} className="input-base min-h-[44px]" />
        </FormField>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label={t("contact.form.platformLabel")} name="platform">
          <select id="platform" name="platform" className="input-base min-h-[44px]" defaultValue={platforms[4].value}>
            {platforms.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </FormField>
        <FormField label={t("contact.form.budgetLabel")} name="budget">
          <select id="budget" name="budget" className="input-base min-h-[44px]" defaultValue={budgets[1].value}>
            {budgets.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </FormField>
      </div>

      <FormField label={t("contact.form.detailsLabel")} name="message" error={errors.message}>
        <textarea id="message" name="message" rows={5} placeholder={t("contact.form.detailsPlaceholder")} className="input-base resize-none" />
      </FormField>

      {status === "error" && serverError && (
        <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-2.5 rounded-lg border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-accent-light">
          <AlertCircle size={16} className="mt-0.5 shrink-0" /> {serverError}
        </motion.div>
      )}

      <Button type="submit" disabled={status === "submitting"} className="mt-2 w-full sm:w-fit min-h-[44px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={status} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
            {status === "submitting" ? <><Loader2 size={16} className="animate-spin" /> {t("contact.form.buttonSending")}</> : t("contact.form.buttonSend")}
          </motion.span>
        </AnimatePresence>
      </Button>
      <p className="text-xs text-muted">{t("contact.form.preferDirect")}</p>
    </form>
  );
}
