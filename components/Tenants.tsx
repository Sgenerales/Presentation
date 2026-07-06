"use client";

import { TENANTS } from "@/lib/tower";
import { Eyebrow, Reveal } from "./ui";

/** Prueba social: marquee editorial gigante con los arrendatarios. */
export default function Tenants() {
  const row = TENANTS.map((t, i) => (
    <span key={i} className="flex shrink-0 items-center">
      <span className="display px-8 text-[clamp(2.6rem,6vw,5.5rem)] whitespace-nowrap text-ink/85 md:px-12">
        {t}
      </span>
      <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-carmine" />
    </span>
  ));

  return (
    <section className="relative overflow-hidden bg-bone py-24 text-ink md:py-32">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <Eyebrow tone="dark">En buena compañía</Eyebrow>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="max-w-md text-[0.95rem] leading-relaxed font-light text-stone-dark">
              Multinacionales y grandes empresas eligen ITC Tower como su
              dirección en Bolivia. Ocupación del 87%.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mt-14 -rotate-1 md:mt-20">
        <div className="overflow-hidden border-y border-line bg-bone py-6">
          <div className="marquee-track flex w-max items-center">
            <div className="flex items-center">{row}</div>
            <div className="flex items-center" aria-hidden>
              {row}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
