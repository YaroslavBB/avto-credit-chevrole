"use client";

import { useState } from "react";

const MAX_DIGITS = 9;

function formatUzLocal(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, MAX_DIGITS);
  const parts = [];
  if (digits.length > 0) parts.push(digits.slice(0, 2));
  if (digits.length > 2) parts.push(digits.slice(2, 5));
  if (digits.length > 5) parts.push(digits.slice(5, 7));
  if (digits.length > 7) parts.push(digits.slice(7, 9));
  if (parts.length <= 1) return parts.join("");
  return `${parts[0]} ${parts[1] ?? ""}${parts[2] ? `-${parts[2]}` : ""}${parts[3] ? `-${parts[3]}` : ""}`.trim();
}

type CtaSectionProps = {
  className?: string;
  buttonLabel?: string;
  consentText?: string;
  phoneErrorText?: string;
  consentErrorText?: string;
  variant?: "dark" | "light";
  inputId?: string;
};

export default function CtaSection({
  className,
  buttonLabel = "Получить консультацию",
  consentText = "Принимаю правила обработки данных",
  phoneErrorText = "Введите корректный номер телефона.",
  consentErrorText = "Подтвердите согласие на обработку данных.",
  variant = "dark",
  inputId = "cta-phone",
}: CtaSectionProps) {
  const [phoneDigits, setPhoneDigits] = useState("");
  const [consent, setConsent] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isValid = phoneDigits.length === MAX_DIGITS && consent;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) {
      if (phoneDigits.length !== MAX_DIGITS) {
        setError(phoneErrorText);
        return;
      }
      if (!consent) {
        setError(consentErrorText);
        return;
      }
    }
    setError(null);
    setSent(true);
    setPhoneDigits("");
    setConsent(false);
  };

  const isLight = variant === "light";
  const inputWrapClass = isLight
    ? "w-full sm:max-w-[320px] flex items-center rounded-lg bg-white text-gray-900 border border-gray-200 focus-within:ring-2 focus-within:ring-primary/50"
    : "w-full sm:max-w-[320px] flex items-center rounded-lg bg-white text-gray-900 focus-within:ring-2 focus-within:ring-white/70";
  const buttonClass = isLight
    ? "px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark"
    : "px-6 py-3 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-800";
  const errorClass = isLight ? "text-sm text-red-600" : "text-sm text-red-200";
  const consentClass = isLight ? "flex items-center gap-2 text-sm text-gray-700" : "flex items-center gap-2 text-sm text-white/90";

  return (
    <div className={className}>
      {sent ? (
        <div className={isLight ? "bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-700" : "bg-black/40 border border-white/20 rounded-lg px-4 py-3"}>
          Спасибо! Мы свяжемся с вами в ближайшее время.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <label className="sr-only" htmlFor={inputId}>Номер телефона</label>
            <div className={inputWrapClass}>
              <span className="pl-4 pr-2 text-sm font-semibold text-gray-900">+998</span>
              <input
                id={inputId}
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                value={formatUzLocal(phoneDigits)}
                onChange={(e) => setPhoneDigits(e.target.value.replace(/\D/g, "").slice(0, MAX_DIGITS))}
                className="w-full py-3 pr-4 bg-transparent placeholder-gray-400 focus:outline-none"
                placeholder="00 000-00-00"
              />
            </div>
            <button
              type="submit"
              className={buttonClass}
            >
              {buttonLabel}
            </button>
          </div>
          {error && <div className={errorClass}>{error}</div>}
          <label className={consentClass}>
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className={isLight ? "h-4 w-4 rounded border-gray-300 text-primary" : "h-4 w-4 rounded border-white/30 text-white"}
            />
            <span>{consentText}</span>
          </label>
        </form>
      )}
    </div>
  );
}
