"use client";

import { CLIENTS } from "@/lib/portfolio";

export function Marquee() {
  // duplicate items to create a seamless loop
  const items = [...CLIENTS, ...CLIENTS];

  return (
    <section
      aria-label="Clientes"
      className="relative overflow-hidden border-y border-white/10 bg-black/40 py-4 md:py-5"
    >
      <div className="marquee-track flex w-max items-center gap-8 will-change-transform">
        {items.map((client, i) => (
          <div
            key={`${client}-${i}`}
            className="flex shrink-0 items-center gap-8"
          >
            <span className="font-display text-lg italic text-white/85 md:text-2xl">
              {client}
            </span>
            <span
              aria-hidden
              className="text-lg text-white/25 md:text-2xl"
            >
              ·
            </span>
          </div>
        ))}
      </div>

      {/* Edge fades */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0A0A0A] to-transparent md:w-40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0A0A0A] to-transparent md:w-40"
      />
    </section>
  );
}
