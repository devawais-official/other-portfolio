import { getLocaleServer, getTranslationServer } from "@/i18n/i18n-server";
import Link from "next/link";
import { siteTheme } from "@/lib/theme-config"; // 👈 Centralized theme imported
import { getLocalizedPath } from "@/utils/navigation"; // 👈 Dynamic routing utility

export default async function NotFound() {
  const locale = await getLocaleServer();
  const translate = getTranslationServer(locale); // 👈 Correct descriptive naming

  // 1. Resolve active dynamic home path instead of hardcoding '/'
  const homePath = getLocalizedPath("/", locale);
  const { notFoundPage: style } = siteTheme;

  return (
    <section className={style.container}>
      <p className={style.eyebrow}>
        {translate("notfound.eyebrow")}
      </p>

      <h1 className={style.title}>
        {translate("notfound.title")}
      </h1>

      <p className={style.description}>
        {translate("notfound.desc")}
      </p>

      <Link href={homePath} className={style.homeButton}>
        {translate("notfound.button")}
      </Link>
    </section>
  );
}