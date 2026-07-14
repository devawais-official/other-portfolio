import Link from "next/link";
import { getLocaleServer, getTranslationServer } from "@/lib/i18n-server";

export default async function NotFound() {
  const locale = await getLocaleServer();
  const t = getTranslationServer(locale);

  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="eyebrow">{t("notfound.eyebrow")}</p>
      <h1 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">{t("notfound.title")}</h1>
      <p className="mt-3 max-w-sm text-muted">
        {t("notfound.desc")}
      </p>
      <Link href="/" className="btn-primary mt-8 min-h-[44px]">
        {t("notfound.button")}
      </Link>
    </section>
  );
}
