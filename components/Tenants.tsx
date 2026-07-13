"use client";

import { TENANTS } from "@/lib/tower";
import { Eyebrow, Reveal } from "./ui";

/** Prueba social: marquee editorial gigante con arrendatarios actuales. */
export default function Tenants() {
  const renderRow = (copy: string) =>
    TENANTS.map((t, i) => (
      <span key={`${copy}-${i}`} className="flex shrink-0 items-center">
        <span className="display px-8 text-[clamp(2.6rem,6vw,5.5rem)] whitespace-nowrap text-ink/85 transition-colors duration-500 hover:text-carmine md:px-12">
          {t}
        </span>
        <span className="jewel-pulse h-1.5 w-1.5 shrink-0 rotate-45 bg-carmine" />
      </span>
    ));

  return (
    <section className="relative overflow-hidden bg-bone py-24 text-ink md:py-32">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <Eyebrow tone="dark">05 — Comunidad corporativa</Eyebrow>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="max-w-md text-[1.02rem] leading-relaxed font-light text-stone-dark">
              Grandes corporaciones — casi todas internacionales — con un
              mismo compromiso: operar bajo el estándar normativo y de
              compliance más alto de la ciudad.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mt-14 -rotate-1 md:mt-20">
        <div
          className="ticker-shell mq-duo mq-triple overflow-hidden border-y border-line bg-bone py-6"
          style={{ "--mq": "48s" } as React.CSSProperties}
        >
          <div className="mq-outer">
            <div className="mq-inner items-center">
              {["a", "b", "c"].map((copy) => (
                <div key={copy} className="flex items-center">
                  {renderRow(copy)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
