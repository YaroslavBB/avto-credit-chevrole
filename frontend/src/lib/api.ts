const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

function unwrapStrapiDoc<T extends Record<string, unknown>>(doc: T): T {
  const maybeAttributes = (doc as { attributes?: T }).attributes;
  if (maybeAttributes && typeof maybeAttributes === "object") {
    return {
      ...maybeAttributes,
      id: (doc as { id?: number }).id ?? (maybeAttributes as { id?: number }).id,
      documentId: (doc as { documentId?: string }).documentId ?? (maybeAttributes as { documentId?: string }).documentId,
    } as T;
  }
  return doc;
}

function unwrapMediaArray(value: unknown): { url: string; alternativeText?: string | null }[] {
  const data = (value as { data?: unknown })?.data ?? value;
  if (!Array.isArray(data)) return [];
  return data.map((item) => {
    const attrs = (item as { attributes?: { url?: string; alternativeText?: string | null } }).attributes
      ?? (item as { url?: string; alternativeText?: string | null });
    return {
      url: attrs?.url ?? "",
      alternativeText: attrs?.alternativeText ?? null,
    };
  });
}

function unwrapMediaSingle(value: unknown): { url: string; alternativeText?: string | null } | null {
  const data = (value as { data?: unknown })?.data ?? value;
  if (!data || typeof data !== "object") return null;
  const attrs = (data as { attributes?: { url?: string; alternativeText?: string | null } }).attributes
    ?? (data as { url?: string; alternativeText?: string | null });
  if (!attrs?.url) return null;
  return { url: attrs.url ?? "", alternativeText: attrs.alternativeText ?? null };
}

function normalizePhones(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (typeof item === "string") return item;
      if (item && typeof item === "object") {
        const v = (item as { value?: string }).value;
        if (typeof v === "string") return v;
      }
      return "";
    })
    .filter(Boolean);
}

export type Car = {
  id: number;
  documentId: string;
  title: string;
  shortDescription?: string | null;
  discountAmount?: number | null;
  price: number;
  discountedPrice?: number | null;
  advantages: { title: string; text: string }[];
  documentLinks: { title: string; link: string }[];
  photoDesktop?: { url: string; alternativeText?: string | null } | null;
  photoMobile?: { url: string; alternativeText?: string | null } | null;
  order?: number | null;
  publishedAt: string | null;
};

export type SiteSettings = {
  heroTitle: string;
  heroSubtitle: string;
  heroAdvantages: { title: string; subtitle?: string | null }[];
  heroImageDesktop?: { url: string; alternativeText?: string | null } | null;
  heroImageMobile?: { url: string; alternativeText?: string | null } | null;
  ctaButtonText?: string | null;
  ctaConsentText?: string | null;
  ctaPhoneErrorText?: string | null;
  ctaConsentErrorText?: string | null;
  aboutTitle: string;
  aboutText: string;
  aboutAdvantages: { title: string }[];
  address: string;
  workHours: string;
  phones: string[];
  socialLinks: { icon?: { url: string; alternativeText?: string | null } | null; label: string; url: string }[];
  mapEmbedUrl: string | null;
  logoScript?: string | null;
  logoSubtitle?: string | null;
  ctaBottomTitle?: string | null;
  ctaBottomSubtitle?: string | null;
  ctaBottomImageDesktop?: { url: string; alternativeText?: string | null } | null;
  ctaBottomImageMobile?: { url: string; alternativeText?: string | null } | null;
  footerDisclaimer?: string | null;
};

export type MainPage = SiteSettings;

export type HeaderSettings = {
  companyLogo?: { url: string; alternativeText?: string | null } | null;
  companyName: string;
  docTitle?: string | null;
  docFile?: { url: string; alternativeText?: string | null } | null;
  ctaLabel?: string | null;
  ctaPhone?: string | null;
};

export async function getCars(): Promise<Car[]> {
  const res = await fetch(
    `${STRAPI_URL}/api/cars?populate=photoDesktop&populate=photoMobile&populate=advantages&populate=documentLinks&sort=order:asc&status=published`,
    { next: { revalidate: 0 }, cache: "no-store" }
  );
  if (!res.ok) return [];
  const json = await res.json();
  const data = json.data ?? json;
  const list = Array.isArray(data) ? data : [];
  return list.map((raw: Record<string, unknown>) => {
    const doc = unwrapStrapiDoc(raw);
    return {
      id: (doc.id as number) ?? 0,
      documentId: (doc.documentId as string) ?? String(doc.id ?? ""),
      title: (doc.title as string) ?? "",
      shortDescription: (doc.shortDescription as string) ?? null,
      discountAmount: (doc.discountAmount as number) ?? null,
      price: Number(doc.price ?? 0),
      discountedPrice: (doc.discountedPrice as number) ?? null,
      advantages: Array.isArray(doc.advantages) ? (doc.advantages as { title: string; text: string }[]) : [],
      documentLinks: Array.isArray(doc.documentLinks) ? (doc.documentLinks as { title: string; link: string }[]) : [],
      photoDesktop: unwrapMediaSingle(doc.photoDesktop),
      photoMobile: unwrapMediaSingle(doc.photoMobile),
      order: (doc.order as number) ?? null,
      publishedAt: (doc.publishedAt as string) ?? null,
    } as Car;
  });
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const res = await fetch(`${STRAPI_URL}/api/site-setting?status=published`, {
    next: { revalidate: 60 },
    cache: "no-store",
  });
  if (!res.ok) return null;
  const json = await res.json();
  const data = json.data ?? json;
  if (!data || typeof data !== "object") return null;
  const d = data as Record<string, unknown>;
  return {
    heroTitle: (d.heroTitle as string) ?? "Chevrolet в рассрочку",
    heroSubtitle: (d.heroSubtitle as string) ?? "",
    heroAdvantages: Array.isArray(d.heroAdvantages) ? (d.heroAdvantages as { title: string; subtitle?: string }[]) : [],
    heroImageDesktop: unwrapMediaSingle(d.heroImageDesktop),
    heroImageMobile: unwrapMediaSingle(d.heroImageMobile),
    ctaButtonText: (d.ctaButtonText as string) ?? "Получить консультацию",
    ctaConsentText: (d.ctaConsentText as string) ?? "Принимаю правила обработки данных",
    ctaPhoneErrorText: (d.ctaPhoneErrorText as string) ?? "Введите корректный номер телефона.",
    ctaConsentErrorText: (d.ctaConsentErrorText as string) ?? "Подтвердите согласие на обработку данных.",
    aboutTitle: (d.aboutTitle as string) ?? "О компании",
    aboutText: (d.aboutText as string) ?? "",
    aboutAdvantages: Array.isArray(d.aboutAdvantages) ? (d.aboutAdvantages as { title: string }[]) : [],
    address: (d.address as string) ?? "",
    workHours: (d.workHours as string) ?? "",
    phones: normalizePhones(d.phones),
    socialLinks: Array.isArray(d.socialLinks)
      ? (d.socialLinks as { icon?: unknown; label: string; url: string }[]).map((link) => ({
          icon: unwrapMediaSingle(link.icon),
          label: link.label,
          url: link.url,
        }))
      : [],
    mapEmbedUrl: (d.mapEmbedUrl as string) ?? null,
    ctaBottomImageDesktop: unwrapMediaSingle(d.ctaBottomImageDesktop),
    ctaBottomImageMobile: unwrapMediaSingle(d.ctaBottomImageMobile),
    footerDisclaimer: (d.footerDisclaimer as string) ?? null,
  };
}

export async function getMainPage(): Promise<MainPage | null> {
  const res = await fetch(
    `${STRAPI_URL}/api/main-page?status=published&populate=heroImageDesktop&populate=heroImageMobile&populate=heroAdvantages&populate=aboutAdvantages&populate=ctaBottomImageDesktop&populate=ctaBottomImageMobile&populate=socialLinks&populate=socialLinks.icon&populate=phones`,
    {
      next: { revalidate: 0 },
      cache: "no-store",
    }
  );
  if (!res.ok) return null;
  const json = await res.json();
  const data = json.data ?? json;
  if (!data || typeof data !== "object") return null;
  const d = unwrapStrapiDoc(data as Record<string, unknown>);
  return {
    heroTitle: (d.heroTitle as string) ?? "Chevrolet в рассрочку",
    heroSubtitle: (d.heroSubtitle as string) ?? "",
    heroAdvantages: Array.isArray(d.heroAdvantages) ? (d.heroAdvantages as { title: string; subtitle?: string }[]) : [],
    heroImageDesktop: unwrapMediaSingle(d.heroImageDesktop),
    heroImageMobile: unwrapMediaSingle(d.heroImageMobile),
    ctaButtonText: (d.ctaButtonText as string) ?? "Получить консультацию",
    ctaConsentText: (d.ctaConsentText as string) ?? "Принимаю правила обработки данных",
    ctaPhoneErrorText: (d.ctaPhoneErrorText as string) ?? "Введите корректный номер телефона.",
    ctaConsentErrorText: (d.ctaConsentErrorText as string) ?? "Подтвердите согласие на обработку данных.",
    aboutTitle: (d.aboutTitle as string) ?? "О компании",
    aboutText: (d.aboutText as string) ?? "",
    aboutAdvantages: Array.isArray(d.aboutAdvantages) ? (d.aboutAdvantages as { title: string }[]) : [],
    address: (d.address as string) ?? "",
    workHours: (d.workHours as string) ?? "",
    phones: normalizePhones(d.phones),
    socialLinks: Array.isArray(d.socialLinks)
      ? (d.socialLinks as { icon?: unknown; label: string; url: string }[]).map((link) => ({
          icon: unwrapMediaSingle(link.icon),
          label: link.label,
          url: link.url,
        }))
      : [],
    mapEmbedUrl: (d.mapEmbedUrl as string) ?? null,
    logoScript: (d.logoScript as string) ?? null,
    logoSubtitle: (d.logoSubtitle as string) ?? null,
    ctaBottomTitle: (d.ctaBottomTitle as string) ?? null,
    ctaBottomSubtitle: (d.ctaBottomSubtitle as string) ?? null,
    ctaBottomImageDesktop: unwrapMediaSingle(d.ctaBottomImageDesktop),
    ctaBottomImageMobile: unwrapMediaSingle(d.ctaBottomImageMobile),
    footerDisclaimer: (d.footerDisclaimer as string) ?? null,
  };
}

export async function getHeader(): Promise<HeaderSettings | null> {
  const res = await fetch(
    `${STRAPI_URL}/api/header?status=published&populate=companyLogo&populate=docFile`,
    {
      next: { revalidate: 0 },
      cache: "no-store",
    }
  );
  if (!res.ok) return null;
  const json = await res.json();
  const data = json.data ?? json;
  if (!data || typeof data !== "object") return null;
  const d = unwrapStrapiDoc(data as Record<string, unknown>);
  return {
    companyLogo: unwrapMediaSingle(d.companyLogo),
    companyName: (d.companyName as string) ?? "Chevrolet",
    docTitle: (d.docTitle as string) ?? null,
    docFile: unwrapMediaSingle(d.docFile),
    ctaLabel: (d.ctaLabel as string) ?? null,
    ctaPhone: (d.ctaPhone as string) ?? null,
  };
}

export function getStrapiMediaUrl(path: string | undefined): string {
  if (!path) return "";
  return path.startsWith("http") ? path : `${STRAPI_URL}${path}`;
}
