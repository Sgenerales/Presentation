"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { CONTACT } from "@/lib/tower";
import { EASE, Img } from "../ui";

/**
 * SALA PRIVADA — primitivas compartidas de las láminas.
 * Cada slide se enmarca como una lámina de dibujo técnico: ticks de
 * esquina, metadatos mono y jerarquía editorial. Las piezas de acá se
 * combinan en los decks (PropuestaDeck / NivelesDeck).
 */

/** Stagger editorial: props listos para motion.div */
export const stag = (i: number, base = 0.1) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: base + i * 0.09, ease: EASE },
});

/** Ticks de esquina — la lámina técnica que enmarca cada slide. */
export function SheetTicks({ tone = "light" }: { tone?: "light" | "dark" }) {
  const c = tone === "light" ? "border-bone/25" : "border-ink/25";
  const pos = [
    "top-4 left-4 border-t border-l md:top-6 md:left-6",
    "top-4 right-4 border-t border-r md:top-6 md:right-6",
    "bottom-4 left-4 border-b border-l md:bottom-6 md:left-6",
    "bottom-4 right-4 border-b border-r md:bottom-6 md:right-6",
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-20">
      {pos.map((p) => (
        <span key={p} className={`absolute h-5 w-5 md:h-6 md:w-6 ${c} ${p}`} />
      ))}
    </div>
  );
}

/** Kicker mono con hairline — encabezado de lámina. */
export function Kicker({
  children,
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  tone?: "light" | "dark" | "carmine";
  className?: string;
}) {
  const color =
    tone === "carmine"
      ? "text-carmine-soft"
      : tone === "dark"
        ? "text-stone-dark"
        : "text-bone/75";
  return (
    <div className={`flex items-center gap-4 ${color} ${className}`}>
      <span className="hairline w-9 shrink-0" style={{ opacity: 0.6 }} />
      <span className="font-mono text-[0.68rem] tracking-[0.3em] uppercase md:text-[0.74rem]">
        {children}
      </span>
    </div>
  );
}

/** Fila de metadatos mono separados por puntos — pie de lámina. */
export function MetaRow({
  items,
  tone = "light",
  className = "",
}: {
  items: string[];
  tone?: "light" | "dark";
  className?: string;
}) {
  const color = tone === "light" ? "text-bone/70" : "text-stone-dark";
  return (
    <div
      className={`flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.62rem] tracking-[0.22em] uppercase md:text-[0.7rem] ${color} ${className}`}
    >
      {items.map((it, i) => (
        <span key={it} className="flex items-center gap-5">
          {i > 0 && <span className="h-1 w-1 rounded-full bg-carmine/70" />}
          {it}
        </span>
      ))}
    </div>
  );
}

/** Numeral fantasma gigante — trazo sin relleno detrás del contenido. */
export function GhostNum({
  children,
  tone = "light",
  className = "",
  style,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      aria-hidden
      style={{
        WebkitTextStroke:
          tone === "light"
            ? "1.5px rgba(242,239,232,0.16)"
            : "1.5px rgba(10,14,24,0.14)",
        color: "transparent",
        fontFamily: "var(--font-display), Georgia, serif",
        fontWeight: 300,
        lineHeight: 0.8,
        ...style,
      }}
      className={`pointer-events-none select-none ${className}`}
    >
      {children}
    </span>
  );
}

/** Portada de deck: tinta, título display enorme, metadatos. */
export function CoverSlide({
  eyebrow,
  lines,
  meta,
  bg,
  hint = "← → para navegar · F pantalla completa · I índice",
}: {
  eyebrow: string;
  lines: [string, string];
  meta: string[];
  bg?: string;
  hint?: string;
}) {
  return (
    <div className="grain relative h-full w-full overflow-hidden bg-ink">
      {bg && (
        <>
          <div className="absolute inset-0">
            <Img
              src={bg}
              alt=""
              eager
              className="kenburns-slow h-full w-full object-cover opacity-[0.16]"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/70" />
        </>
      )}
      <div className="relative z-10 flex h-full flex-col justify-between px-8 py-16 md:px-20 md:py-20">
        <motion.div {...stag(0, 0.25)}>
          <Kicker>{eyebrow}</Kicker>
        </motion.div>

        <div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "108%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.95, delay: 0.4, ease: EASE }}
              className="display text-[clamp(2.6rem,7.2vw,7rem)] text-bone"
            >
              {lines[0]}
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "108%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.95, delay: 0.52, ease: EASE }}
              className="display-italic text-[clamp(2.6rem,7.2vw,7rem)] text-bone"
            >
              {lines[1]}
            </motion.h1>
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, delay: 0.75, ease: EASE }}
            className="mt-10 h-px w-full origin-left bg-gradient-to-r from-carmine/80 via-bone/20 to-transparent"
          />
        </div>

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <motion.div {...stag(1, 0.8)}>
            <MetaRow items={meta} />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="shrink-0 font-mono text-[0.62rem] tracking-[0.18em] text-bone/65 uppercase md:text-[0.66rem] md:tracking-[0.2em]"
          >
            {hint}
          </motion.p>
        </div>
      </div>
    </div>
  );
}

/** Divisor de capítulo: numeral fantasma + hechos clave sobre foto tenue. */
export function ChapterSlide({
  numeral,
  eyebrow,
  title,
  titleItalic,
  facts,
  bg,
  bgPos,
}: {
  numeral: string;
  eyebrow: string;
  title: string;
  titleItalic?: string;
  facts: { label: string; value: string }[];
  bg?: string;
  bgPos?: string;
}) {
  return (
    <div className="grain relative h-full w-full overflow-hidden bg-ink">
      {bg && (
        <>
          <div className="absolute inset-0">
            <Img
              src={bg}
              alt=""
              eager
              style={bgPos ? { objectPosition: bgPos } : undefined}
              className="kenburns-slow h-full w-full object-cover opacity-25"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/72 to-ink/30" />
        </>
      )}

      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
        className="absolute top-1/2 right-[-2vw] -translate-y-1/2"
      >
        <GhostNum className="text-[clamp(16rem,42vw,42rem)]">
          {numeral}
        </GhostNum>
      </motion.div>

      <div className="relative z-10 flex h-full flex-col justify-center px-8 md:px-20">
        <motion.div {...stag(0, 0.2)}>
          <Kicker tone="carmine">{eyebrow}</Kicker>
        </motion.div>
        <motion.h2
          {...stag(1, 0.25)}
          className="display mt-8 max-w-3xl text-[clamp(2.4rem,5.6vw,5.4rem)] text-bone"
        >
          {title}{" "}
          {titleItalic && (
            <em className="display-italic text-bone/90">{titleItalic}</em>
          )}
        </motion.h2>

        <div className="mt-14 flex max-w-3xl flex-wrap gap-x-14 gap-y-8">
          {facts.map((f, i) => (
            <motion.div key={f.label} {...stag(i, 0.55)}>
              <p className="font-mono text-[0.62rem] tracking-[0.24em] text-bone/65 uppercase md:text-[0.68rem] md:tracking-[0.26em]">
                {f.label}
              </p>
              <p className="display mt-2 text-[clamp(1.5rem,2.6vw,2.4rem)] text-bone">
                {f.value}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Cierre de deck: llamado a la acción + contacto. */
export function ClosingSlide({
  title,
  titleItalic,
  siblingHref,
  siblingLabel,
}: {
  title: string;
  titleItalic: string;
  siblingHref: string;
  siblingLabel: string;
}) {
  return (
    <div data-deck-scroll className="grain relative flex h-full w-full flex-col items-center justify-start overflow-y-auto overscroll-contain bg-ink px-8 pt-24 pb-28 text-center [@media(min-height:700px)]:justify-center [@media(min-height:700px)]:py-16">
      <motion.div {...stag(0, 0.2)}>
        <Kicker className="justify-center">Milla Zero — Sala privada</Kicker>
      </motion.div>
      <motion.h2
        {...stag(1, 0.25)}
        className="display mt-9 max-w-4xl text-[clamp(2.4rem,6vw,5.6rem)] text-bone"
      >
        {title} <em className="display-italic">{titleItalic}</em>
      </motion.h2>

      <motion.div {...stag(2, 0.5)} className="mt-14">
        <Link
          href="/#contacto"
          className="lux-sheen group relative inline-flex cursor-pointer items-center gap-3 overflow-hidden border border-bone/25 px-10 py-5 font-mono text-[0.74rem] tracking-[0.26em] text-bone uppercase transition-colors duration-500 hover:border-carmine"
        >
          <span className="absolute inset-0 -translate-x-full bg-carmine transition-transform duration-500 ease-out group-hover:translate-x-0" />
          <span className="relative">Conocer Milla Zero</span>
        </Link>
      </motion.div>

      <motion.div {...stag(3, 0.65)} className="mt-12">
        <MetaRow
          className="justify-center"
          items={[CONTACT.descriptor, CONTACT.city]}
        />
      </motion.div>

      <motion.div
        {...stag(4, 0.8)}
        className="mt-10 flex flex-col items-center gap-5 font-mono text-[0.66rem] tracking-[0.18em] uppercase sm:mt-14 sm:flex-row sm:gap-10 sm:tracking-[0.22em]"
      >
        <Link
          href={siblingHref}
          className="link-lux cursor-pointer text-bone/75 transition-colors hover:text-bone"
        >
          {siblingLabel} →
        </Link>
        <Link
          href="/presentacion"
          className="link-lux cursor-pointer text-bone/75 transition-colors hover:text-bone"
        >
          Índice de presentaciones
        </Link>
      </motion.div>
    </div>
  );
}
