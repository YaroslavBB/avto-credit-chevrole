type AboutProps = {
  title: string;
  text: string;
  advantages: { title: string }[];
  address: string;
  workHours: string;
};

export default function About({ title, text, advantages, address, workHours }: AboutProps) {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">{title}</h2>
        {text && <p className="text-gray-600 whitespace-pre-line mb-8">{text}</p>}
        {advantages.length > 0 && (
          <ul className="space-y-2 mb-8">
            {advantages.map((a, i) => (
              <li key={i} className="flex items-center gap-2 text-gray-700">
                <span className="text-primary">✓</span>
                <span className="font-semibold">{a.title}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="border-t border-gray-200 pt-6 text-gray-600">
          {address && <p><strong>Адрес:</strong> {address}</p>}
          {workHours && <p className="mt-1"><strong>Режим работы:</strong> {workHours}</p>}
        </div>
      </div>
    </section>
  );
}
