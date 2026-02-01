import Image from "next/image";
import { getStrapiMediaUrl } from "@/lib/api";
import CtaSection from "@/components/CtaSection";

type HeroProps = {
  title: string;
  subtitle: string;
  advantages: { title: string; subtitle?: string | null }[];
  imageDesktopUrl?: string | null;
  imageMobileUrl?: string | null;
  ctaButtonText?: string | null;
  ctaConsentText?: string | null;
  ctaPhoneErrorText?: string | null;
  ctaConsentErrorText?: string | null;
};

export default function Hero({
  title,
  subtitle,
  advantages,
  imageDesktopUrl,
  imageMobileUrl,
  ctaButtonText,
  ctaConsentText,
  ctaPhoneErrorText,
  ctaConsentErrorText,
}: HeroProps) {
  const desktopUrl = imageDesktopUrl ? getStrapiMediaUrl(imageDesktopUrl) : null;
  const mobileUrl = imageMobileUrl ? getStrapiMediaUrl(imageMobileUrl) : null;
  const fallbackUrl = desktopUrl ?? mobileUrl;

  return (
    <section className="relative overflow-hidden text-white bg-primary">
      {fallbackUrl && (
        <div className="absolute inset-0">
          {mobileUrl && (
            <Image
              src={mobileUrl}
              alt=""
              fill
              priority
              className="object-cover md:hidden"
              sizes="100vw"
              unoptimized={mobileUrl.includes("localhost")}
            />
          )}
          {desktopUrl && (
            <Image
              src={desktopUrl}
              alt=""
              fill
              priority
              className="object-cover hidden md:block"
              sizes="100vw"
              unoptimized={desktopUrl.includes("localhost")}
            />
          )}
          {!mobileUrl && !desktopUrl && null}
          {!mobileUrl && desktopUrl && (
            <Image
              src={desktopUrl}
              alt=""
              fill
              priority
              className="object-cover md:hidden"
              sizes="100vw"
              unoptimized={desktopUrl.includes("localhost")}
            />
          )}
          {!desktopUrl && mobileUrl && (
            <Image
              src={mobileUrl}
              alt=""
              fill
              priority
              className="object-cover hidden md:block"
              sizes="100vw"
              unoptimized={mobileUrl.includes("localhost")}
            />
          )}
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-br from-[#07142d]/75 to-[#0a204a]/35" />
      <div className="relative max-w-6xl mx-auto px-4 pt-16 md:pt-20 lg:pt-24 pb-6 md:pb-8 min-h-[520px] md:min-h-[600px] lg:min-h-[680px] flex flex-col">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">{title}</h1>
          {subtitle && <p className="mt-3 text-lg md:text-xl text-white/90">{subtitle}</p>}
        </div>

        {advantages.length > 0 && (
          <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {advantages.map((item, i) => (
              <div
                key={`${item.title}-${i}`}
                className="rounded-xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-sm"
              >
                <div className="text-base font-semibold">{item.title}</div>
                {item.subtitle && <div className="mt-1 text-sm text-white/80">{item.subtitle}</div>}
              </div>
            ))}
          </div>
        )}

        <div className="mt-auto pt-16 md:pt-10 pb-10 max-w-xl">
          <CtaSection
            buttonLabel={ctaButtonText ?? "Получить консультацию"}
            consentText={ctaConsentText ?? "Принимаю правила обработки данных"}
            phoneErrorText={ctaPhoneErrorText ?? "Введите корректный номер телефона."}
            consentErrorText={ctaConsentErrorText ?? "Подтвердите согласие на обработку данных."}
            inputId="hero-cta-phone"
          />
        </div>
      </div>
    </section>
  );
}
