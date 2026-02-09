"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getStrapiMediaUrl, HeaderSettings } from "@/lib/api";

type HeaderBarProps = {
  data: HeaderSettings | null;
  onMenuClick?: () => void;
};

function normalizePhone(phone: string | null | undefined): string {
  return (phone ?? "").trim();
}

export default function HeaderBar({ data, onMenuClick }: HeaderBarProps) {
  const pathname = usePathname();
  const isRu = pathname?.startsWith("/ru");
  const languageHref = isRu ? "/" : "/ru";
  const languageLabel = isRu ? "UZ" : "RU";
  const companyName = data?.companyName ?? "Chevrolet";
  const phone = normalizePhone(data?.ctaPhone);
  const docTitle = data?.docTitle ?? "";
  const docUrl = data?.docFile?.url ? getStrapiMediaUrl(data.docFile.url) : "";
  const logoUrl = data?.companyLogo?.url ? getStrapiMediaUrl(data.companyLogo.url) : "";

  return (
    <header className="fixed top-0 z-40 w-full bg-white/70 backdrop-blur-xl border-b border-white/50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          {onMenuClick && (
            <button
              type="button"
              onClick={onMenuClick}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-700 hover:text-gray-900"
              aria-label="Открыть меню автомобилей"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                <path
                  fill="currentColor"
                  d="M4 6h16a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2zm0 5h16a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2zm0 5h16a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2z"
                />
              </svg>
            </button>
          )}
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={data?.companyLogo?.alternativeText ?? companyName}
              width={36}
              height={36}
              className="h-9 w-9 rounded-lg object-contain"
              unoptimized={logoUrl.includes("localhost")}
            />
          ) : (
            <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-semibold">
              {companyName.slice(0, 1)}
            </div>
          )}
          <div className="min-w-0">
            <div className="text-lg font-semibold text-gray-900 truncate">{companyName}</div>
          </div>
          {docUrl && docTitle && (
            <a
              href={docUrl}
              className="hidden md:inline-flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 ml-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center text-gray-800">
                <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
                  <path
                    fill="currentColor"
                    d="M12 3a1 1 0 0 1 1 1v8.6l2.3-2.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L11 12.6V4a1 1 0 0 1 1-1zm-7 14a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1z"
                  />
                </svg>
              </span>
              <span className="whitespace-nowrap">{docTitle}</span>
            </a>
          )}
        </div>
        <div className="flex items-center gap-4">
          <Link
            href={languageHref}
            className="inline-flex h-9 items-center rounded-full border border-gray-200 px-3 text-xs font-semibold uppercase tracking-widest text-gray-700 hover:text-gray-900 hover:border-gray-300"
            aria-label={`Переключить язык на ${languageLabel}`}
          >
            {languageLabel}
          </Link>
          <div className="text-right">
            <div className="text-xs uppercase tracking-widest text-gray-500">
              {data?.ctaLabel ?? "Позвоните нам"}
            </div>
            {phone ? (
              <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-base font-semibold text-gray-900">
                {phone}
              </a>
            ) : (
              <span className="text-base font-semibold text-gray-900">+998</span>
            )}
          </div>
          <a
            href="#location"
            className="hidden sm:inline-flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center text-gray-800">
              <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
                <path
                  fill="currentColor"
                  d="M12 2a7 7 0 0 0-7 7c0 4.1 4.2 9.2 6.1 11.3a1.2 1.2 0 0 0 1.8 0C14.8 18.2 19 13.1 19 9a7 7 0 0 0-7-7zm0 18.1C10.2 18 7 13.8 7 9a5 5 0 1 1 10 0c0 4.8-3.2 9-5 11.1zM12 6.5A2.5 2.5 0 1 0 12 11a2.5 2.5 0 0 0 0-5z"
                />
              </svg>
            </span>
            <span>Адрес</span>
          </a>
        </div>
      </div>
    </header>
  );
}
