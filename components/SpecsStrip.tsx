"use client";

import { SPECS } from "@/lib/tower";

/** Cinta técnica infinita: lenguaje de plano arquitectónico. */
export default function SpecsStrip() {
  const renderRow = (copy: string) =>
    SPECS.map((s, i) => (
      <span key={`${copy}-${i}`} className="flex shrink-0 items-center gap-10 pr-10">
        <span className="font-mono text-[0.74rem] tracking-[0.18em] whitespace-nowrap text-bone/55 uppercase">
          {s}
        </span>
        <span className="jewel-pulse h-1 w-1 shrink-0 rotate-45 bg-carmine/70" />
      </span>
    ));

  return (
    <div
      className="ticker-shell relative overflow-hidden border-y border-line-faint bg-ink-soft py-5"
      aria-label="Especificaciones técnicas del edificio"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-carmine/40 to-transparent" />
      <div
        className="mq-duo mq-triple"
        style={{ "--mq": "28s" } as React.CSSProperties}
      >
        <div className="mq-outer">
          <div className="mq-inner">
            {["a", "b", "c"].map((copy) => (
              <div key={copy} className="flex">
                {renderRow(copy)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
