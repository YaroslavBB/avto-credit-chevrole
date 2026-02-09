import { getCars, getHeader, getMainPage } from "@/lib/api";
import Hero from "@/components/Hero";
import CarsSection from "@/components/CarsSection";
import About from "@/components/About";
import MapSection from "@/components/MapSection";
import LogoScriptBlock from "@/components/LogoScriptBlock";
import BottomCtaSection from "@/components/BottomCtaSection";
import HeaderWithMenu from "@/components/HeaderWithMenu";
import Footer from "@/components/Footer";

export default async function HomeRu() {
  let settings = await getMainPage("ru");
  let header = await getHeader("ru");
  let cars = await getCars("ru");
  if (!settings) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-10 text-center text-gray-600">
        Нет опубликованных данных для главной страницы.
      </main>
    );
  }

  return (
    <>
      <HeaderWithMenu header={header} cars={cars} />
      <main className="pt-16">
        <Hero
          title={settings.heroTitle}
          subtitle={settings.heroSubtitle}
          advantages={settings.heroAdvantages}
          imageDesktopUrl={settings.heroImageDesktop?.url}
          imageMobileUrl={settings.heroImageMobile?.url}
          ctaButtonText={settings.ctaButtonText}
          ctaConsentText={settings.ctaConsentText}
          ctaPhoneErrorText={settings.ctaPhoneErrorText}
          ctaConsentErrorText={settings.ctaConsentErrorText}
        />
        <CarsSection cars={cars} />
        <BottomCtaSection
          title={settings.ctaBottomTitle ?? "Свяжитесь с нами для консультации"}
          subtitle={settings.ctaBottomSubtitle}
          socialLinks={settings.socialLinks}
          ctaButtonText={settings.ctaButtonText}
          ctaConsentText={settings.ctaConsentText}
          ctaPhoneErrorText={settings.ctaPhoneErrorText}
          ctaConsentErrorText={settings.ctaConsentErrorText}
          imageDesktopUrl={settings.ctaBottomImageDesktop?.url}
          imageMobileUrl={settings.ctaBottomImageMobile?.url}
        />
        <LogoScriptBlock
          script={settings.logoScript}
          subtitle={settings.logoSubtitle}
        />
        <About
          title={settings.aboutTitle}
          text={settings.aboutText}
          advantages={settings.aboutAdvantages}
          address={settings.address}
          workHours={settings.workHours}
        />
        <MapSection mapEmbedUrl={settings.mapEmbedUrl} address={settings.address} />
      </main>
      <Footer
        cars={cars.map((c) => ({ id: c.documentId ?? c.id, title: c.title }))}
        phones={settings.phones}
        socialLinks={settings.socialLinks}
        disclaimer={settings.footerDisclaimer}
      />
    </>
  );
}
