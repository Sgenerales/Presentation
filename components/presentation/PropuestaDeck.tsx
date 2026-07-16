"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { PROPOSAL, type ProposalSheet } from "@/lib/tower";
import { EASE, Img } from "../ui";
import Deck, { type SlideDef } from "./Deck";
import {
  ClosingSlide,
  CoverSlide,
  GhostNum,
  Kicker,
  MetaRow,
  SheetTicks,
  stag,
} from "./SlideKit";

/**
 * DECK A — Propuesta integral (Pisos 1 · 2A · 2B · 3).
 * Cuatro plantas resueltas como una sola operación: cada piso se presenta
 * como lámina clara con su render ejecutivo cenital y el conmutador a la
 * lámina técnica de mobiliario.
 */

const SHEETS = PROPOSAL.sheets;

/** Lámina de piso: render ejecutivo ⇄ lámina técnica. */
function FloorShowcase({
  sheet,
  order,
}: {
  sheet: ProposalSheet;
  order: number;
}) {
  const [view, setView] = useState<"render" | "lamina">("render");
  const numeral = String(order + 1).padStart(2, "0");

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#faf8f3] text-ink">
      <SheetTicks tone="dark" />

      {/* Numeral fantasma */}
      <GhostNum
        tone="dark"
        className="absolute -top-6 right-[30%] z-0 text-[clamp(10rem,24vw,22rem)]"
      >
        {numeral}
      </GhostNum>

      <div data-deck-scroll className="relative z-10 grid h-full grid-cols-1 gap-6 overflow-y-auto overscroll-contain px-8 pt-20 pb-28 md:px-14 lg:grid-cols-12 lg:gap-12 lg:pt-20">
        {/* Ficha */}
        <div className="flex min-h-0 flex-col justify-center lg:col-span-4">
          <motion.div {...stag(0, 0.15)}>
            <Kicker tone="carmine">
              Lámina {numeral} / {String(SHEETS.length).padStart(2, "0")} —{" "}
              {sheet.role}
            </Kicker>
          </motion.div>

          <motion.h2
            {...stag(1, 0.2)}
            className="display mt-6 text-[clamp(2.1rem,4vw,3.8rem)]"
          >
            {sheet.name}
          </motion.h2>

          <motion.p
            {...stag(2, 0.28)}
            className="display-italic mt-3 text-[clamp(1.25rem,1.9vw,1.8rem)] text-carmine"
          >
            {sheet.capacity}
          </motion.p>

          <ul className="mt-8 hidden flex-col md:flex">
            {sheet.program.map((p, i) => (
              <motion.li
                key={p}
                {...stag(i, 0.42)}
                className="flex items-start gap-4 border-t border-line py-3 text-[0.98rem] font-light text-ink/80"
              >
                <span className="mt-[0.58rem] h-px w-5 shrink-0 bg-carmine" />
                {p}
              </motion.li>
            ))}
          </ul>

          <motion.p
            {...stag(5, 0.6)}
            className="mt-8 font-mono text-[0.62rem] tracking-[0.2em] text-stone-dark uppercase"
          >
            {PROPOSAL.note}
          </motion.p>
        </div>

        {/* Visual: render ⇄ lámina */}
        <div className="flex min-h-[320px] flex-col lg:col-span-8 lg:min-h-0">
          <motion.div
            {...stag(1, 0.3)}
            role="tablist"
            aria-label="Modo de vista de la lámina"
            className="mb-4 flex justify-end gap-2"
          >
            {(
              [
                ["render", "Render ejecutivo"],
                ["lamina", "Lámina técnica"],
              ] as const
            ).map(([v, label]) => (
              <button
                key={v}
                role="tab"
                aria-selected={view === v}
                onClick={() => setView(v)}
                className={`min-h-11 cursor-pointer border px-4 py-2 font-mono text-[0.62rem] tracking-[0.16em] uppercase transition-all duration-300 md:px-5 md:py-2.5 md:tracking-[0.2em] ${
                  view === v
                    ? "border-ink bg-ink text-bone"
                    : "border-line text-stone-dark hover:border-ink/40"
                }`}
              >
                {label}
              </button>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
            className="relative min-h-0 flex-1"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={view}
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.995 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="flex h-full flex-col"
              >
                <div className="relative min-h-0 flex-1 border border-line bg-white shadow-[0_30px_80px_-30px_rgba(10,14,24,0.28)]">
                  <Img
                    src={view === "render" ? sheet.render : sheet.sheet}
                    alt={
                      view === "render"
                        ? `Render ejecutivo cenital — ${sheet.name}`
                        : `Lámina técnica de mobiliario — ${sheet.name}`
                    }
                    eager
                    className="absolute inset-0 h-full w-full object-contain p-2 md:p-3"
                  />
                </div>
                <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2 font-mono text-[0.6rem] tracking-[0.16em] text-stone-dark uppercase md:gap-4 md:text-[0.66rem] md:tracking-[0.18em]">
                  <span>
                    {view === "render"
                      ? "Vista cenital foto-realista · mobiliario según propuesta"
                      : "Diseño mobiliario · acústica e iluminación definidas"}
                  </span>
                  <span className="shrink-0 text-carmine">
                    Milla Zero · {sheet.code}
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/** Lámina 02 — el encargo, en números. */
function IntroSlide() {
  const stats = [
    { value: "3", label: "Plantas resueltas" },
    { value: "4", label: "Láminas de diseño" },
    { value: "183", label: "Puestos operativos" },
    { value: "200+", label: "Posiciones totales" },
  ];
  return (
    <div className="grain relative h-full w-full overflow-hidden bg-ink">
      <SheetTicks />
      <div data-deck-scroll className="relative z-10 grid h-full grid-cols-1 gap-10 overflow-y-auto overscroll-contain px-8 pt-24 pb-28 md:px-16 lg:grid-cols-12 lg:items-center lg:pt-20">
        <div className="lg:col-span-6">
          <motion.div {...stag(0, 0.15)}>
            <Kicker tone="carmine">01 — El encargo</Kicker>
          </motion.div>
          <motion.h2
            {...stag(1, 0.2)}
            className="display mt-7 text-[clamp(2.2rem,4.4vw,4.2rem)] text-bone"
          >
            Una operación continua,{" "}
            <em className="display-italic">resuelta al detalle.</em>
          </motion.h2>
          <motion.p
            {...stag(2, 0.32)}
            className="mt-8 max-w-xl text-[1.04rem] leading-relaxed font-light text-bone/65"
          >
            {PROPOSAL.intro}
          </motion.p>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <div className="grid grid-cols-2 gap-x-10 gap-y-10">
            {stats.map((s, i) => (
              <motion.div key={s.label} {...stag(i, 0.45)}>
                <p className="display text-[clamp(2.6rem,5vw,4.6rem)] text-bone">
                  {s.value}
                </p>
                <div className="mt-2 h-px w-full bg-gradient-to-r from-carmine/70 to-transparent" />
                <p className="mt-2.5 font-mono text-[0.62rem] tracking-[0.2em] text-bone/70 uppercase md:text-[0.68rem] md:tracking-[0.24em]">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Recorrido */}
          <motion.div {...stag(4, 0.75)} className="mt-12">
            <p className="font-mono text-[0.62rem] tracking-[0.26em] text-bone/65 uppercase">
              El recorrido
            </p>
            <div className="mt-4 grid grid-cols-4 gap-2.5">
              {SHEETS.map((s) => (
                <figure key={s.id}>
                  <div className="aspect-[4/3] overflow-hidden border border-line-faint bg-white">
                    <Img
                      src={s.render}
                      alt={s.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <figcaption className="mt-1.5 font-mono text-[0.58rem] tracking-[0.18em] text-bone/70 uppercase">
                    {s.code}
                  </figcaption>
                </figure>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/** Lámina de síntesis: las cuatro plantas como tableros sobre tinta. */
function SynthesisSlide() {
  return (
    <div className="grain relative h-full w-full overflow-hidden bg-ink">
      <SheetTicks />
      <div data-deck-scroll className="relative z-10 flex h-full flex-col overflow-y-auto overscroll-contain px-8 pt-20 pb-28 md:px-16 lg:pt-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <motion.div {...stag(0, 0.15)}>
              <Kicker tone="carmine">06 — Síntesis</Kicker>
            </motion.div>
            <motion.h2
              {...stag(1, 0.2)}
              className="display mt-5 text-[clamp(1.9rem,3.6vw,3.4rem)] text-bone"
            >
              Tres plantas, <em className="display-italic">un solo trazo.</em>
            </motion.h2>
          </div>
          <motion.div {...stag(2, 0.35)} className="hidden md:block">
            <MetaRow items={["Mobiliario definido", "Acústica", "Iluminación", "Llave en mano"]} />
          </motion.div>
        </div>

        <div className="mt-8 grid min-h-[360px] flex-1 grid-cols-2 gap-4 md:gap-5 lg:min-h-0 lg:grid-cols-4">
          {SHEETS.map((s, i) => (
            <motion.figure
              key={s.id}
              {...stag(i, 0.4)}
              className="flex min-h-0 flex-col"
            >
              <div className="img-zoom relative min-h-0 flex-1 border border-line-faint bg-white">
                <Img
                  src={s.render}
                  alt={`${s.name} — render ejecutivo`}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <figcaption className="mt-3">
                <p className="font-mono text-[0.6rem] tracking-[0.22em] text-carmine-soft uppercase">
                  {s.code}
                </p>
                <p className="display mt-1 text-[1.02rem] leading-tight text-bone/90 md:text-[1.15rem]">
                  {s.capacity}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PropuestaDeck() {
  const slides: SlideDef[] = [
    {
      id: "portada",
      chapter: "Portada",
      title: "Tres plantas, un solo trazo",
      content: (
        <CoverSlide
          eyebrow="Milla Zero — Sala privada"
          lines={["Tres plantas,", "un solo trazo."]}
          meta={[
            "Propuesta integral · Pisos 1 — 2 — 3",
            "Equipetrol Norte · Santa Cruz",
            "07 · 2026",
            "Documento privado",
          ]}
          bg={SHEETS[3].render}
        />
      ),
    },
    {
      id: "encargo",
      chapter: "El encargo",
      title: "Una operación continua",
      content: <IntroSlide />,
    },
    ...SHEETS.map((sheet, i) => ({
      id: sheet.id,
      chapter: sheet.code,
      title: `${sheet.name} — ${sheet.capacity}`,
      thumb: sheet.render,
      content: <FloorShowcase sheet={sheet} order={i} />,
    })),
    {
      id: "sintesis",
      chapter: "Síntesis",
      title: "Las cuatro láminas",
      content: <SynthesisSlide />,
    },
    {
      id: "cierre",
      chapter: "Cierre",
      title: "Visita privada",
      content: (
        <ClosingSlide
          title="Listo para"
          titleItalic="recorrerlo en persona."
          siblingHref="/presentacion/niveles"
          siblingLabel="Ver espacios disponibles"
        />
      ),
    },
  ];

  return (
    <Deck
      code="DOSSIER 01"
      name="Propuesta integral"
      slides={slides}
      preload={SHEETS.flatMap((s) => [s.render, s.sheet])}
    />
  );
}
