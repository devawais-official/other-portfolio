import { getTranslationServer } from "@/i18n/i18n-server";
import HomeView from "@/features/home/components/HomeView";
import { getHomeData } from "@/features/home/data";
import { siteRoutes } from "@/lib/site-config";
import { getLocalizedPath } from "@/utils/navigation";
import { Locale } from "@/i18n/config";
import { generatePageMetadata } from "@/lib/metadata";

interface HomeProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "home");
}

export default async function HomePage({ params }: HomeProps) {
  const { locale } = await params;

  const translate = getTranslationServer(locale);
  const rawHomeData = getHomeData();

  const availabilityText = translate("home.availability");

  const contactPath = getLocalizedPath(siteRoutes.contact, locale);
  const projectsPath = getLocalizedPath(siteRoutes.projects, locale);
  const testimonialsPath = getLocalizedPath("/testimonials", locale);

  const homeData = {
    ...rawHomeData,
    availabilityText,
    contactPath,
    projectsPath,
    testimonialsPath,
  };

  const processSteps = homeData.processStepIds.map((step: string) => ({
    step,
    title: translate(`home.processSteps.${step}.title`),
    body: translate(`home.processSteps.${step}.body`),
  }));

  return (
    <HomeView
      locale={locale}
      translate={translate}
      homeData={homeData}
      processSteps={processSteps}
    />
  );
}