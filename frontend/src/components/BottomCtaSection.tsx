import Image from "next/image";
import CtaSection from "@/components/CtaSection";
import { getStrapiMediaUrl } from "@/lib/api";

type SocialLink = {
  icon?: { url: string; alternativeText?: string | null } | null;
  label: string;
  url: string;
};

type BottomCtaSectionProps = {
  title: string;
  subtitle?: string | null;
  socialLinks: SocialLink[];
  ctaButtonText?: string | null;
  ctaConsentText?: string | null;
  ctaPhoneErrorText?: string | null;
  ctaConsentErrorText?: string | null;
  imageDesktopUrl?: string | null;
  imageMobileUrl?: string | null;
};

function SocialIcon({
  icon,
  label,
}: {
  icon?: { url: string; alternativeText?: string | null } | null;
  label: string;
}) {
  if (icon?.url) {
    return (
      <Image
        src={getStrapiMediaUrl(icon.url)}
        alt={icon.alternativeText ?? label}
        width={18}
        height={18}
        className="h-5 w-5 object-contain"
        unoptimized={icon.url.includes("localhost")}
      />
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path
        fill="currentColor"
        d="M10.6 13.4a1 1 0 0 1 0-1.4l3-3a1 1 0 1 1 1.4 1.4l-3 3a1 1 0 0 1-1.4 0zM8.5 15.5a3.5 3.5 0 0 1 0-5l2-2a3.5 3.5 0 0 1 5 0 1 1 0 1 1-1.4 1.4 1.5 1.5 0 0 0-2.2 0l-2 2a1.5 1.5 0 0 0 0 2.2 1 1 0 1 1-1.4 1.4zm7-7a3.5 3.5 0 0 1 0 5l-2 2a3.5 3.5 0 0 1-5 0 1 1 0 1 1 1.4-1.4 1.5 1.5 0 0 0 2.2 0l2-2a1.5 1.5 0 0 0 0-2.2 1 1 0 1 1 1.4-1.4z"
      />
    </svg>
  );
}

export default function BottomCtaSection({
  title,
  subtitle,
  socialLinks,
  ctaButtonText,
  ctaConsentText,
  ctaPhoneErrorText,
  ctaConsentErrorText,
  imageDesktopUrl,
  imageMobileUrl,
}: BottomCtaSectionProps) {
  const desktopUrl = imageDesktopUrl ? getStrapiMediaUrl(imageDesktopUrl) : null;
  const mobileUrl = imageMobileUrl ? getStrapiMediaUrl(imageMobileUrl) : null;
  const fallbackUrl = desktopUrl ?? mobileUrl;

  return (
    <section id="cta" className="py-14 px-4 bg-white border-t border-gray-200/70">
      <div className="max-w-7xl mx-auto rounded-2xl overflow-hidden border border-gray-200/80 bg-[#0b1b2f]">
        <div className="relative md:aspect-[16/7] md:min-h-[420px] md:max-h-[720px]">
          {fallbackUrl && (
            <div className="absolute inset-0">
              {mobileUrl && (
                <Image
                  src={mobileUrl}
                  alt=""
                  fill
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
                  className="object-cover hidden md:block"
                  sizes="100vw"
                  unoptimized={desktopUrl.includes("localhost")}
                />
              )}
              {!mobileUrl && desktopUrl && (
                <Image
                  src={desktopUrl}
                  alt=""
                  fill
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
                  className="object-cover hidden md:block"
                  sizes="100vw"
                  unoptimized={mobileUrl.includes("localhost")}
                />
              )}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/55 to-black/35 md:bg-gradient-to-r md:from-black/85 md:via-black/55 md:to-transparent" />
          <div className="relative z-10 px-6 py-10 sm:px-8 sm:py-12 md:px-16 md:py-[80px] text-white">
            <div className="flex max-w-2xl flex-col justify-start gap-[60px]">
              <div>
                <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
                  {title}
                </h2>
                {subtitle && <p className="mt-3 text-base sm:text-lg md:text-xl text-white/85">{subtitle}</p>}
              </div>
              <div>
                <CtaSection
                  variant="dark"
                  buttonLabel={ctaButtonText ?? undefined}
                  consentText={ctaConsentText ?? undefined}
                  phoneErrorText={ctaPhoneErrorText ?? undefined}
                  consentErrorText={ctaConsentErrorText ?? undefined}
                  inputId="bottom-cta-phone"
                />
              </div>
              {socialLinks.length > 0 && (
                <ul className="grid grid-cols-2 gap-x-6 gap-y-4 md:flex md:flex-nowrap md:items-center md:gap-6">
                  {socialLinks.map((link, i) => (
                    <li key={`${link.label}-${i}`}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white/90 hover:text-white"
                      >
                        <span className="h-8 w-8 md:h-9 md:w-9 rounded-lg bg-white/15 flex items-center justify-center text-white/80">
                          <SocialIcon icon={link.icon} label={link.label} />
                        </span>
                        <span className="text-sm md:text-base font-medium">{link.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
