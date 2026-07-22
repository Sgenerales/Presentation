"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { EXCLUSIVES } from "@/lib/tower";
import { EASE, Eyebrow, Reveal } from "./ui";

/**
 * "Sólo aquí" — el argumento central: lo que ningún otro edificio de la
 * ciudad puede ofrecer. Libro mayor editorial de exclusivos + el recorrido
 * parqueo→escritorio en menos de 3 minutos.
 */

const JOURNEY = [
  { label: "Parqueo subsuelo", note: "ingreso con tarjeta" },
  { label: "Ascensor directo", note: "3 unidades + carga" },
  { label: "Su escritorio", note: "acceso propio por piso" },
];

export default function Exclusives() {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <section id="concepto" className="grain relative bg-ink py-28 md:py-40">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <Reveal>
          <Eyebrow>00 · Sólo aquí</Eyebrow>
        </Reveal>
        <div className="mt-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal delay={0.08}>
            <h2 className="display max-w-3xl text-[clamp(2.2rem,4.8vw,4.4rem)] text-bone">
              Lo que ningún otro edificio{" "}
              <em className="display-italic text-bone/70">
                de la ciudad puede ofrecer.
              </em>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="max-w-sm text-[1.02rem] leading-relaxed font-light text-bone/60">
              Milla Zero no compite en metros cuadrados: compite en criterio.
              Siete decisiones de diseño que definen un edificio boutique, y
              que no se consiguen en ningún otro lugar de Santa Cruz.
            </p>
          </Reveal>
        </div>

        {/* Libro mayor de exclusivos */}
        <div className="mt-16 border-t border-line-faint md:mt-24">
          {EXCLUSIVES.map((x, i) => {
            const on = hover === x.code;
            return (
              <Reveal key={x.code} delay={Math.min(i * 0.05, 0.3)}>
                <div
                  onMouseEnter={() => setHover(x.code)}
                  onMouseLeave={() => setHover(null)}
                  className="group grid cursor-default grid-cols-12 items-baseline gap-4 border-b border-line-faint py-6 transition-colors duration-500 hover:bg-ink-soft/40 md:py-8"
                >
                  <span
                    className={`col-span-2 font-mono text-[0.78rem] tracking-[0.26em] transition-colors duration-300 md:col-span-1 ${
                      on ? "text-carmine-soft" : "text-stone"
                    }`}
                  >
                    {x.code}
                  </span>
                  <h3
                    className={`display col-span-10 text-[clamp(1.4rem,2.6vw,2.3rem)] leading-tight transition-colors duration-300 md:col-span-5 ${
                      on ? "text-bone" : "text-bone/80"
                    }`}
                  >
                    {x.title}
                  </h3>
                  <p className="col-span-10 col-start-3 text-[0.95rem] leading-relaxed font-light text-bone/70 md:col-span-6 md:col-start-7">
                    {x.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Recorrido: parqueo → escritorio */}
        <div className="mt-20 md:mt-28">
          <Reveal>
            <p className="eyebrow text-stone">
              El trayecto que define un boutique
            </p>
          </Reveal>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="relative">
                {/* Línea que se dibuja */}
                <div className="absolute top-[7px] right-0 left-0 h-px bg-line-faint" />
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 1.6, ease: EASE, delay: 0.2 }}
                  className="absolute top-[7px] right-0 left-0 h-px origin-left bg-carmine"
                />
                <div className="relative grid grid-cols-3">
                  {JOURNEY.map((j, i) => (
                    <motion.div
                      key={j.label}
                      data-reveal
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{
                        duration: 0.6,
                        delay: 0.25 + i * 0.45,
                        ease: EASE,
                      }}
                      className={
                        i === 0
                          ? "text-left"
                          : i === 1
                            ? "text-center"
                            : "text-right"
                      }
                    >
                      <span
                        className={`relative z-10 inline-block h-[15px] w-[15px] rounded-full border-2 border-carmine bg-ink ${
                          i === JOURNEY.length - 1 ? "bg-carmine" : ""
                        }`}
                      />
                      <p className="display mt-4 text-[1.2rem] text-bone md:text-[1.4rem]">
                        {j.label}
                      </p>
                      <p className="eyebrow mt-1.5 text-[0.64rem] text-stone">
                        {j.note}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 lg:text-right">
              <Reveal delay={0.4}>
                <div>
                  <span className="display block text-[clamp(3.4rem,7vw,6.5rem)] leading-none text-bone">
                    &lt;3<span className="display-italic text-carmine-soft"> min</span>
                  </span>
                  <p className="mt-3 text-[0.95rem] font-light text-bone/70 lg:ml-auto lg:max-w-[260px]">
                    Desde que estaciona hasta que está sentado en su
                    escritorio. Sin calle, sin filas, sin fricción.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
