"use client";

import { useMemo, useRef } from "react";
import type { Car } from "@/lib/api";

type SideCarMenuProps = {
  cars: Car[];
  open: boolean;
  onClose: () => void;
  docTitle?: string | null;
  docUrl?: string | null;
};

function getCarAnchor(car: Car): string {
  return `car-${car.documentId ?? car.id}`;
}

export default function SideCarMenu({ cars, open, onClose, docTitle, docUrl }: SideCarMenuProps) {
  const items = useMemo(() => cars.filter((c) => c.title), [cars]);
  const touchStartX = useRef<number | null>(null);
  const touchLastX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
    touchLastX.current = touchStartX.current;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchLastX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchLastX.current === null) return;
    const delta = touchLastX.current - touchStartX.current;
    if (delta > 80) {
      onClose();
    }
    touchStartX.current = null;
    touchLastX.current = null;
  };

  if (items.length === 0) return null;
  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-40">
        <div
          className="absolute inset-0 bg-black/40"
          onClick={onClose}
        />
        <aside
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="absolute left-0 top-0 h-full w-full md:w-72 md:max-w-[80vw] bg-white shadow-2xl flex flex-col"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
            <div className="text-sm font-semibold uppercase tracking-widest text-gray-600">
              Автомобили
            </div>
            <button
              type="button"
              onClick={onClose}
              className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100"
              aria-label="Закрыть меню"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                <path
                  fill="currentColor"
                  d="M18.3 5.7a1 1 0 0 0-1.4 0L12 10.6 7.1 5.7A1 1 0 0 0 5.7 7.1L10.6 12l-4.9 4.9a1 1 0 1 0 1.4 1.4L12 13.4l4.9 4.9a1 1 0 0 0 1.4-1.4L13.4 12l4.9-4.9a1 1 0 0 0 0-1.4z"
                />
              </svg>
            </button>
          </div>
          <ul className="flex-1 overflow-auto px-3 py-3 overscroll-contain">
            <li className="border-b border-gray-100">
              <a
                href="#cta"
                onClick={onClose}
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold uppercase tracking-wider text-gray-900 hover:underline hover:decoration-gray-300 hover:underline-offset-4"
              >
                <span className="inline-flex h-5 w-5 items-center justify-center text-gray-700">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                    <path
                      fill="currentColor"
                      d="M12 2a6 6 0 0 1 6 6v1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1H9v1a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2V8a6 6 0 0 1 6-6zm0 2a4 4 0 0 0-4 4v1h8V8a4 4 0 0 0-4-4z"
                    />
                  </svg>
                </span>
                Оставить заявку
              </a>
            </li>
            {docTitle && docUrl && (
              <li className="border-b border-gray-100">
                <a
                  href={docUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold uppercase tracking-wider text-gray-800 hover:underline hover:decoration-gray-300 hover:underline-offset-4 md:hidden"
                >
                  <span className="inline-flex h-5 w-5 items-center justify-center text-gray-700">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                      <path
                        fill="currentColor"
                        d="M12 3a1 1 0 0 1 1 1v8.6l2.3-2.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L11 12.6V4a1 1 0 0 1 1-1zm-7 14a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1z"
                      />
                    </svg>
                  </span>
                  {docTitle}
                </a>
              </li>
            )}
            {items.map((car) => (
              <li key={car.documentId ?? car.id} className="border-b border-gray-100">
                <a
                  href={`#${getCarAnchor(car)}`}
                  onClick={onClose}
                  className="block rounded-lg px-3 py-3 text-sm font-semibold uppercase tracking-widest text-gray-900 hover:underline hover:decoration-gray-300 hover:underline-offset-4"
                >
                  {car.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  );
}
