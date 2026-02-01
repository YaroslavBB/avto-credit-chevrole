import Image from "next/image";
import { getStrapiMediaUrl } from "@/lib/api";

type FooterCar = { id: string | number; title: string };

type FooterProps = {
  cars: FooterCar[];
  phones: string[];
  socialLinks: { icon?: { url: string; alternativeText?: string | null } | null; label: string; url: string }[];
  disclaimer?: string | null;
};

export default function Footer({ cars, phones, socialLinks, disclaimer }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-3">Автомобили</h3>
          <ul className="space-y-1 text-gray-300">
            {cars.map((car) => (
              <li key={car.id}>
                <a href={`#car-${car.id}`} className="hover:text-white">
                  {car.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-3">Контакты</h3>
          <ul className="space-y-2 text-gray-300">
            {phones.map((phone, i) => (
              <li key={i}>
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-white">
                  {phone}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-3">Соцсети</h3>
          <ul className="flex flex-col gap-3 text-gray-300">
            {socialLinks.map((s, i) => (
              <li key={i}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
                >
                  {s.icon?.url ? (
                    <Image
                      src={getStrapiMediaUrl(s.icon.url)}
                      alt={s.icon.alternativeText ?? s.label}
                      width={18}
                      height={18}
                      className="h-4 w-4 object-contain"
                      unoptimized={s.icon.url.includes("localhost")}
                    />
                  ) : (
                    <span className="h-4 w-4 rounded bg-white/20" />
                  )}
                  <span>{s.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-gray-700 text-gray-500 text-xs leading-relaxed">
        <div className="flex gap-2">
          <span className="text-gray-500">*</span>
          <p>{disclaimer ?? "Сведения о ценах носят информационный характер."}</p>
        </div>
      </div>
    </footer>
  );
}
