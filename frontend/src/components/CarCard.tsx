import Image from "next/image";
import type { Car } from "@/lib/api";
import { getStrapiMediaUrl } from "@/lib/api";

type CarCardProps = {
  car: Car;
};

function formatSum(value?: number | null) {
  if (!value) return "";
  return `${new Intl.NumberFormat("ru-RU").format(value)} сум`;
}

export default function CarCard({ car }: CarCardProps) {
  const desktopUrl = car.photoDesktop?.url ? getStrapiMediaUrl(car.photoDesktop.url) : null;
  const mobileUrl = car.photoMobile?.url ? getStrapiMediaUrl(car.photoMobile.url) : null;
  const fallbackUrl = desktopUrl ?? mobileUrl;
  const anchorId = `car-${car.documentId ?? car.id}`;

  return (
    <article
      id={anchorId}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden scroll-mt-28"
    >
      <div className="relative aspect-[4/3] md:aspect-[16/6.3] bg-gray-200">
        {fallbackUrl ? (
          <>
            {mobileUrl && (
              <Image
                src={mobileUrl}
                alt={car.photoMobile?.alternativeText ?? car.title}
                fill
                className="object-cover md:hidden"
                sizes="100vw"
                quality={90}
                unoptimized={mobileUrl.includes("localhost")}
              />
            )}
            {desktopUrl && (
              <Image
                src={desktopUrl}
                alt={car.photoDesktop?.alternativeText ?? car.title}
                fill
                className="object-cover hidden md:block"
                sizes="100vw"
                quality={90}
                unoptimized={desktopUrl.includes("localhost")}
              />
            )}
            {!mobileUrl && desktopUrl && (
              <Image
                src={desktopUrl}
                alt={car.photoDesktop?.alternativeText ?? car.title}
                fill
                className="object-cover md:hidden"
                sizes="100vw"
                quality={90}
                unoptimized={desktopUrl.includes("localhost")}
              />
            )}
            {!desktopUrl && mobileUrl && (
              <Image
                src={mobileUrl}
                alt={car.photoMobile?.alternativeText ?? car.title}
                fill
                className="object-cover hidden md:block"
                sizes="100vw"
                quality={90}
                unoptimized={mobileUrl.includes("localhost")}
              />
            )}
            <div className="absolute inset-x-0 bottom-0 md:hidden bg-gradient-to-t from-black/70 via-black/30 to-transparent px-4 pt-10 pb-4">
              <h3 className="text-white text-xl font-semibold">{car.title}</h3>
              {car.shortDescription && <p className="text-white/80 text-sm mt-1">{car.shortDescription}</p>}
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            {car.title}
          </div>
        )}
        {car.discountAmount ? (
          <div className="absolute top-4 left-4 rounded-full bg-amber-400 text-gray-900 text-sm font-bold px-4 py-2 shadow-lg shadow-amber-400/40">
            Скидка до {formatSum(car.discountAmount)}
          </div>
        ) : null}
      </div>

      <div className="p-6 lg:p-8 flex flex-col gap-6 bg-[#f5f7f8]">
        <div className="hidden md:block">
          <h2 className="text-3xl font-semibold text-gray-900">{car.title}</h2>
          {car.shortDescription && <p className="mt-2 text-base text-gray-600">{car.shortDescription}</p>}
        </div>

          <div className="flex items-baseline gap-3">
          {car.discountedPrice ? (
            <>
                <span className="text-2xl font-semibold text-gray-900">{formatSum(car.discountedPrice)}</span>
                <span className="text-sm text-gray-400 line-through">{formatSum(car.price)}</span>
            </>
          ) : (
              <span className="text-2xl font-semibold text-gray-900">{formatSum(car.price)}</span>
          )}
        </div>

        {car.advantages?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-3 text-base sm:text-base text-gray-700">
            {car.advantages.map((a, i) => (
              <div
                key={i}
                className="rounded-lg border border-transparent bg-transparent px-0 py-0 sm:border-gray-200 sm:bg-white/80 sm:px-3 sm:py-2"
              >
                <div className="font-semibold text-gray-900">{a.title}</div>
                {a.text ? <div className="text-sm font-medium text-gray-600 mt-1">{a.text}</div> : null}
              </div>
            ))}
          </div>
        )}

        {car.documentLinks?.length > 0 && (
          <div className="flex flex-wrap gap-4 text-sm text-primary">
            {car.documentLinks.slice(0, 3).map((doc, i) => (
              <a
                key={i}
                href={doc.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {doc.title || "Документы"}
              </a>
            ))}
          </div>
        )}

        <div>
          <a
            href="#cta"
            className="inline-flex px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium"
          >
            Получить консультацию
          </a>
        </div>
      </div>
    </article>
  );
}
