"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FLOORS, type Floor, type Side } from "@/lib/tower";
import { PlanChip } from "./FloorPlans";
import { EASE, Eyebrow, Reveal } from "./ui";

/** Notifica a SpaceFocus qué espacio abrir (secciones desacopladas). */
export function requestSpace(spaceId: string) {
  window.dispatchEvent(
    new CustomEvent("itc:select-space", { detail: spaceId }),
  );
}

function StatusDot({ side }: { side: Side }) {
  const cls =
    side.status === "libre"
      ? "jewel-pulse bg-carmine-soft"
      : side.status === "proyecto"
        ? "bg-stone"
        : "bg-bone/25";
  return <span className={`inline-block h-1.5 w-1.5 rounded-full ${cls}`} />;
}

function sideLabel(side: Side) {
  return side.status === "libre" ? "Disponible" : side.note;
}

export default function TowerExplorer() {
  const [active, setActive] = useState<Floor>(FLOORS[0]);

  const hasFree = (f: Floor) =>
    f.norte.status === "libre" || f.sur.status === "libre";

  return (
    <section id="torre" className="grain relative bg-ink py-28 md:py-40">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <Reveal>
          <Eyebrow>02 — La torre, nivel por nivel</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display mt-10 max-w-3xl text-[clamp(2.2rem,4.6vw,4.2rem)] text-bone">
            Diez niveles.{" "}
            <em className="display-italic text-bone/70">
              Cada uno, una condición precisa.
            </em>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-16">
          {/* Corte vertical interactivo */}
          <div className="lg:col-span-5">
            <ul
              role="listbox"
              aria-label="Pisos de la torre"
              className="flex flex-col"
            >
              {FLOORS.map((f) => {
                const selected = active.id === f.id;
                return (
                  <li key={f.id}>
                    <button
                      role="option"
                      aria-selected={selected}
                      onMouseEnter={() => setActive(f)}
                      onFocus={() => setActive(f)}
                      onClick={() => {
                        setActive(f);
                        if (f.spaceId) requestSpace(f.spaceId);
                      }}
                      className={`group relative flex w-full cursor-pointer items-center justify-between gap-4 border-b border-line-faint px-4 py-[1.05rem] text-left transition-colors duration-500 md:px-6 ${
                        selected ? "bg-ink-soft" : "hover:bg-ink-soft/50"
                      }`}
                    >
                      {/* Barra indicadora */}
                      <span
                        className={`absolute top-0 bottom-0 left-0 w-[2px] origin-top bg-carmine transition-transform duration-500 ${
                          selected ? "scale-y-100" : "scale-y-0"
                        }`}
                      />
                      <span className="flex items-baseline gap-5">
                        <span
                          className={`font-mono text-[0.76rem] tracking-[0.2em] transition-colors duration-300 ${
                            selected ? "text-carmine-soft" : "text-stone"
                          }`}
                        >
                          {f.code}
                        </span>
                        <span
                          className={`display text-[1.35rem] transition-colors duration-300 md:text-[1.6rem] ${
                            selected ? "text-bone" : "text-bone/55"
                          }`}
                        >
                          {f.name}
                        </span>
                      </span>
                      <span className="flex shrink-0 items-center gap-2">
                        {hasFree(f) && (
                          <span className="eyebrow hidden text-[0.64rem] text-carmine-soft md:inline">
                            Disponible
                          </span>
                        )}
                        <StatusDot side={f.norte} />
                        <StatusDot side={f.sur} />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="eyebrow mt-6 flex items-center gap-3 text-[0.66rem] text-stone">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-carmine-soft" />
              Disponible
              <span className="ml-4 inline-block h-1.5 w-1.5 rounded-full bg-bone/25" />
              Ocupado · ala Norte / ala Sur
            </p>
          </div>

          {/* Panel de detalle */}
          <div className="relative lg:col-span-7">
            <div className="sticky top-28">
              <AnimatePresence mode="wait">
                <motion.div
                  data-reveal
                  key={active.id}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <div className="ghost-number pointer-events-none absolute -top-16 right-0 text-[clamp(8rem,18vw,16rem)] leading-none select-none">
                    {active.code}
                  </div>

                  <div className="relative border border-line-faint bg-ink-soft/60 p-8 backdrop-blur-sm md:p-12">
                    <p className="eyebrow text-carmine-soft">{active.name}</p>
                    <p className="mt-6 max-w-lg text-[1rem] leading-relaxed font-light text-bone/75">
                      {active.detail}
                    </p>

                    {/* Mini-plano del nivel */}
                    <div className="mt-8 max-w-sm">
                      <PlanChip
                        norte={active.norte.status}
                        sur={active.sur.status}
                        variant={
                          active.id === "ss"
                            ? "ss"
                            : active.id === "pb"
                              ? "pb"
                              : "tipo"
                        }
                      />
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-6">
                      {(["norte", "sur"] as const).map((k) => {
                        const side = active[k];
                        const free = side.status === "libre";
                        return (
                          <div
                            key={k}
                            className={`border px-5 py-4 transition-colors ${
                              free
                                ? "border-carmine/40 bg-carmine/[0.06]"
                                : "border-line-faint"
                            }`}
                          >
                            <p className="eyebrow text-[0.66rem] text-stone">
                              Ala {k === "norte" ? "Norte" : "Sur"}
                            </p>
                            <p
                              className={`mt-2 text-[0.95rem] font-light ${
                                free ? "text-carmine-soft" : "text-bone/60"
                              }`}
                            >
                              {sideLabel(side)}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    {active.spaceId && (
                      <a
                        href="#espacios"
                        onClick={() => requestSpace(active.spaceId!)}
                        className="lux-sheen group relative mt-10 inline-flex cursor-pointer items-center gap-3 overflow-hidden border border-bone/25 px-8 py-4 text-[0.78rem] tracking-[0.22em] text-bone uppercase transition-colors duration-500 hover:border-carmine"
                      >
                        <span className="absolute inset-0 -translate-x-full bg-carmine transition-transform duration-500 ease-out group-hover:translate-x-0" />
                        <span className="relative">Explorar este espacio</span>
                        <span className="relative transition-transform duration-500 group-hover:translate-x-1">
                          →
                        </span>
                      </a>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
