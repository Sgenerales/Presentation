"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { A, CONTACT, LOCATION_POINTS } from "@/lib/tower";
import { Eyebrow, Reveal } from "./ui";

export default function LocationSec() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      id="ubicacion"
      ref={ref}
      className="grain relative overflow-hidden bg-ink py-28 md:py-40"
    >
      {/* Fondo parallax: fachada de día, muy atenuada */}
      <motion.div style={{ y }} className="absolute inset-0 scale-110" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${A}/facade-day.jpg`}
          alt=""
          className="h-full w-full object-cover opacity-[0.16]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/60 to-ink" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-12">
        <Reveal>
          <Eyebrow>06 — Equipetrol Norte</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display mt-10 max-w-3xl text-[clamp(2.2rem,4.6vw,4.2rem)] text-bone">
            Una dirección estratégica{" "}
            <em className="display-italic text-bone/70">en la ciudad.</em>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Reveal delay={0.15}>
              <p className="text-[1rem] leading-relaxed font-light text-bone/70">
                {CONTACT.address}. Acceso a dos calles y una avenida principal,
                a metros del 4to anillo: una ubicación pensada para llegar,
                recibir y operar con eficiencia en el eje empresarial de Santa
                Cruz.
              </p>
            </Reveal>
            <Reveal delay={0.25} className="mt-10 flex flex-wrap gap-4">
              <a
                href={CONTACT.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="lux-sheen group relative inline-flex cursor-pointer items-center gap-3 overflow-hidden border border-bone/25 px-7 py-3.5 text-[0.76rem] tracking-[0.22em] text-bone uppercase transition-colors duration-500 hover:border-carmine"
              >
                <span className="absolute inset-0 -translate-x-full bg-carmine transition-transform duration-500 ease-out group-hover:translate-x-0" />
                <span className="relative">Google Maps ↗</span>
              </a>
              <a
                href={CONTACT.earthUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-lux inline-flex cursor-pointer items-center px-2 py-3.5 text-[0.76rem] tracking-[0.22em] text-bone/60 uppercase transition-colors hover:text-bone"
              >
                Ver en Google Earth
              </a>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="eyebrow mt-12 text-stone">{CONTACT.coords}</p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <ul>
              {LOCATION_POINTS.map((p, i) => (
                <Reveal key={p.name} delay={i * 0.07}>
                  <li className="group flex cursor-default items-baseline justify-between gap-6 border-b border-line-faint py-5 transition-colors duration-500 hover:border-carmine/40">
                    <span className="display text-[1.3rem] text-bone/85 transition-colors duration-300 group-hover:text-bone md:text-[1.6rem]">
                      {p.name}
                    </span>
                    <span className="eyebrow shrink-0 text-[0.68rem] text-stone">
                      {p.detail}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
