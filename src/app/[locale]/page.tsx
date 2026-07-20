import { getTranslationServer, } from "@/i18n/i18n-server";
import HomeView from "@/features/home/components/HomeView";
import { getHomeData } from "@/features/home/data";
import { siteRoutes } from "@/lib/site-config";
import { getLocalizedPath } from "@/utils/navigation";
import { Locale, locales } from "@/i18n/config";


export const revalidate = 3600;

// 🚀 FIX 2: Build time par hi saare language paths (/en, /ar, etc.) ka HTML generate kar dega
export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale: locale,
  }));
}
interface HomeProps {
  params: Promise<{ locale: Locale }>;
}
export default async function HomePage({ params }: HomeProps) {
  const { locale } = await params;

  const translate = getTranslationServer(locale);

  const rawHomeData = await getHomeData(locale);


  const availabilityText = translate("home.availability");
  const contactPath = getLocalizedPath(siteRoutes.contact, locale);
  const projectsPath = getLocalizedPath(siteRoutes.projects, locale);
  const testimonialsPath = getLocalizedPath("/testimonials", locale);

  const featuredTestimonials = rawHomeData.featuredTestimonials.map((item) => ({
    ...item,
    message: translate(`testimonialsData.${item.slug}.message`)
  }));
  const homeData = {
    ...rawHomeData,
    featuredTestimonials,
    availabilityText: availabilityText,
    contactPath: contactPath,
    projectsPath: projectsPath,
    testimonialsPath: testimonialsPath,
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