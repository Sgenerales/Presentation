"use client";

import { SPECS } from "@/lib/tower";

/** Cinta técnica infinita — lenguaje de plano arquitectónico. */
export default function SpecsStrip() {
  const row = SPECS.map((s, i) => (
    <span key={i} className="flex shrink-0 items-center gap-10 pr-10">
      <span className="font-mono text-[0.68rem] tracking-[0.18em] whitespace-nowrap text-bone/55 uppercase">
        {s}
      </span>
      <span className="h-1 w-1 shrink-0 rotate-45 bg-carmine/70" />
    </span>
  ));

  return (
    <div
      className="overflow-hidden border-y border-line-faint bg-ink-soft py-5"
      aria-label="Especificaciones técnicas del edificio"
    >
      <div className="marquee-track flex w-max">
        <div className="flex">{row}</div>
        <div className="flex" aria-hidden>
          {row}
        </div>
      </div>
    </div>
  );
}
