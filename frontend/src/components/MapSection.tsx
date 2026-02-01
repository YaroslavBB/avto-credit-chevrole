type MapSectionProps = {
  mapEmbedUrl: string | null;
  address: string;
};

function getMapEmbedSrc(value: string | null): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (!trimmed.includes("<iframe")) return trimmed;
  const match = trimmed.match(/src\s*=\s*["']([^"']+)["']/i);
  return match?.[1] ?? null;
}

export default function MapSection({ mapEmbedUrl, address }: MapSectionProps) {
  const embedSrc = getMapEmbedSrc(mapEmbedUrl);
  return (
    <section id="location" className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Как нас найти</h2>
        {address && <p className="text-gray-600 mb-4">{address}</p>}
        {embedSrc ? (
          <div className="aspect-video w-full rounded-xl overflow-hidden border border-gray-200">
            <iframe
              title="Карта"
              src={embedSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full min-h-[300px]"
            />
          </div>
        ) : (
          <div className="aspect-video w-full rounded-xl bg-gray-200 flex items-center justify-center text-gray-500">
            Добавьте ссылку на карту (Яндекс или Google) в настройках сайта
          </div>
        )}
      </div>
    </section>
  );
}
