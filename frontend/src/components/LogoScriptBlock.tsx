"use client";

import Script from "next/script";

type LogoScriptBlockProps = {
  script: string | null | undefined;
  subtitle?: string | null;
};

export default function LogoScriptBlock({ script, subtitle }: LogoScriptBlockProps) {
  const trimmed = script?.trim() ?? "";
  if (!trimmed) return null;

  return (
    <section className="py-12 px-4 border-y border-gray-200/70 bg-gray-50/40">
      <div className="max-w-5xl mx-auto text-center">
        <div className="flex justify-center">
          <div id="maxa-logo" />
        </div>
        {subtitle && (
          <p className="mt-4 text-sm uppercase tracking-[0.25em] text-gray-500">
            {subtitle}
          </p>
        )}
      </div>
      <Script id="logo-inline" strategy="afterInteractive">
        {trimmed}
      </Script>
    </section>
  );
}
