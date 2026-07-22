"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type WheelEvent,
} from "react";
import { PROPOSAL, type ProposalSheet } from "@/lib/tower";
import { EASE, Eyebrow, Img, Reveal } from "./ui";

/**
 * Propuesta integral de interiorismo (pisos 1–3): cuatro láminas, una sola propuesta.
 * Visor de láminas con tabs por planta y lightbox a pantalla completa.
 * Vive dentro de la sección Espacios como demostración del llave en mano.
 */
export default function ProposalSet() {
  const [sheet, setSheet] = useState<ProposalSheet>(PROPOSAL.sheets[0]);
  const [zoom, setZoom] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    scrollLeft: number;
    scrollTop: number;
  } | null>(null);

  const closeZoom = useCallback(() => {
    setZoom(false);
    setZoomLevel(1);
  }, []);

  const changeZoom = useCallback((amount: number) => {
    setZoomLevel((current) =>
      Math.min(2.5, Math.max(1, Number((current + amount).toFixed(2)))),
    );
  }, []);

  const handleCanvasWheel = useCallback(
    (event: WheelEvent<HTMLDivElement>) => {
      event.preventDefault();
      changeZoom(event.deltaY < 0 ? 0.15 : -0.15);
    },
    [changeZoom],
  );

  const handlePointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (event.pointerType !== "mouse" || event.button !== 0) return;

      const canvas = event.currentTarget;
      canvas.setPointerCapture(event.pointerId);
      dragState.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        scrollLeft: canvas.scrollLeft,
        scrollTop: canvas.scrollTop,
      };
      setIsDragging(true);
    },
    [],
  );

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const drag = dragState.current;
      if (!drag || drag.pointerId !== event.pointerId) return;

      event.currentTarget.scrollLeft = drag.scrollLeft - (event.clientX - drag.startX);
      event.currentTarget.scrollTop = drag.scrollTop - (event.clientY - drag.startY);
    },
    [],
  );

  const finishDragging = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (dragState.current?.pointerId !== event.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    dragState.current = null;
    setIsDragging(false);
  }, []);

  // Cerrar lightbox con ESC y bloquear el scroll del fondo
  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeZoom();
      if (e.key === "+" || e.key === "=") changeZoom(0.25);
      if (e.key === "-") changeZoom(-0.25);
      if (e.key === "0") setZoomLevel(1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [zoom, closeZoom, changeZoom]);

  return (
    <div className="mt-20 border-t border-line pt-16 md:mt-28 md:pt-20">
      <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
        <div>
          <Reveal>
            <Eyebrow tone="carmine">{PROPOSAL.kicker}</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h3 className="display mt-8 max-w-xl text-[clamp(2rem,4vw,3.6rem)]">
              {PROPOSAL.title.split(", ")[0]},{" "}
              <em className="display-italic">{PROPOSAL.title.split(", ")[1]}</em>
            </h3>
          </Reveal>
        </div>
        <Reveal delay={0.12}>
          <div className="max-w-md">
            <p className="text-[1.02rem] leading-relaxed font-light text-stone-dark">
              {PROPOSAL.intro}
            </p>
            <Link
              href="/presentacion/propuesta"
              className="link-lux mt-5 inline-flex cursor-pointer items-center gap-2 font-mono text-[0.68rem] tracking-[0.22em] text-carmine uppercase"
            >
              Ver en modo presentación →
            </Link>
          </div>
        </Reveal>
      </div>

      {/* Tabs de láminas */}
      <Reveal delay={0.08}>
        <div
          role="tablist"
          aria-label="Láminas de la propuesta"
          className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-4"
        >
          {PROPOSAL.sheets.map((s) => {
            const on = s.id === sheet.id;
            return (
              <button
                key={s.id}
                role="tab"
                aria-selected={on}
                onClick={() => setSheet(s)}
                className={`min-h-18 w-full cursor-pointer touch-manipulation border px-4 py-3.5 text-left transition-all duration-300 sm:px-5 ${
                  on
                    ? "border-ink bg-ink text-bone"
                    : "border-line text-ink hover:border-ink/40"
                }`}
              >
                <span
                  className={`font-mono text-[0.74rem] tracking-[0.22em] uppercase ${
                    on ? "text-carmine-soft" : "text-stone"
                  }`}
                >
                  Lámina {s.code}
                </span>
                <span className="display mt-0.5 block text-[1.2rem] leading-tight">
                  {s.name}
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* Visor + ficha */}
      <div className="relative mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-8">
          <AnimatePresence initial={false}>
            <motion.figure
              key={sheet.id}
              data-reveal
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99, position: "absolute" }}
              transition={{ duration: 0.4, ease: EASE }}
              className="w-full"
            >
              <div className="group relative border border-line bg-white">
                <button
                  onClick={() => {
                    setZoomLevel(1);
                    setZoom(true);
                  }}
                  aria-label={`Ampliar lámina ${sheet.name}`}
                  className="block w-full cursor-zoom-in"
                >
                  <Img
                    src={sheet.sheet}
                    alt={`Lámina de diseño mobiliario · ${sheet.name}`}
                    className="aspect-[842/595] w-full object-contain"
                  />
                </button>
                <span className="pointer-events-none absolute top-4 left-4 bg-ink/75 px-4 py-2 font-mono text-[0.7rem] tracking-[0.2em] text-bone uppercase backdrop-blur-sm">
                  Diseño mobiliario · {sheet.code}
                </span>
                <span className="pointer-events-none absolute right-4 bottom-4 flex items-center gap-2 bg-ink/75 px-4 py-2 font-mono text-[0.65rem] tracking-[0.14em] text-bone/85 uppercase opacity-100 backdrop-blur-sm transition-opacity duration-300 sm:text-[0.7rem] sm:tracking-[0.18em] sm:opacity-0 sm:group-hover:opacity-100">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Ampliar lámina
                </span>
              </div>
              <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <span className="text-[1.02rem] font-light text-stone-dark italic">
                  {sheet.role} · toque la lámina para ampliarla.
                </span>
                <span className="font-mono text-[0.7rem] tracking-[0.18em] text-stone uppercase">
                  {PROPOSAL.note}
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        {/* Ficha de la lámina */}
        <div className="lg:col-span-4">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={sheet.id}
              data-reveal
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <p className="eyebrow text-carmine">{sheet.name}</p>
              <p className="display mt-4 text-[1.7rem] leading-tight">
                {sheet.capacity}
              </p>
              <ul className="mt-7 flex flex-col">
                {sheet.program.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-4 border-t border-line py-3.5 text-[1.02rem] font-light text-ink/80"
                  >
                    <span className="mt-[0.6rem] h-px w-5 shrink-0 bg-carmine" />
                    {p}
                  </li>
                ))}
              </ul>
              <p className="mt-8 font-mono text-[0.72rem] leading-relaxed tracking-[0.14em] text-stone uppercase">
                {PROPOSAL.credit}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox pantalla completa */}
      <AnimatePresence>
        {zoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[95] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm md:p-10"
            onClick={closeZoom}
            role="dialog"
            aria-modal="true"
            aria-label={`Lámina ampliada · ${sheet.name}`}
          >
            <motion.div
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.97 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="flex h-[calc(100dvh-2rem)] w-full max-w-[1600px] flex-col overflow-hidden bg-white shadow-2xl md:h-[calc(100dvh-5rem)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex shrink-0 items-center justify-between border-b border-line bg-bone px-3 py-2 text-ink md:px-4">
                <p className="font-mono text-[0.65rem] tracking-[0.16em] uppercase">
                  Zoom {Math.round(zoomLevel * 100)}%
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => changeZoom(-0.25)}
                    disabled={zoomLevel <= 1}
                    aria-label="Alejar plano"
                    className="flex h-11 min-w-11 cursor-pointer items-center justify-center border border-line px-3 text-lg transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    −
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoomLevel(1)}
                    aria-label="Ajustar plano a la pantalla"
                    className="h-11 cursor-pointer border border-line px-3 font-mono text-[0.62rem] tracking-[0.12em] uppercase transition-colors hover:border-ink"
                  >
                    Ajustar
                  </button>
                  <button
                    type="button"
                    onClick={() => changeZoom(0.25)}
                    disabled={zoomLevel >= 2.5}
                    aria-label="Acercar plano"
                    className="flex h-11 min-w-11 cursor-pointer items-center justify-center border border-line px-3 text-lg transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    +
                  </button>
                </div>
              </div>
              <div
                data-lenis-prevent
                onWheel={handleCanvasWheel}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={finishDragging}
                onPointerCancel={finishDragging}
                onDragStart={(event) => event.preventDefault()}
                title="Use la rueda para hacer zoom y arrastre con clic izquierdo para recorrer el plano"
                className={`flex min-h-0 flex-1 items-center justify-center overflow-auto overscroll-contain bg-white p-2 touch-pan-x touch-pan-y select-none md:p-4 ${
                  isDragging ? "cursor-grabbing" : "cursor-grab"
                }`}
              >
                <Img
                  src={sheet.sheet}
                  alt={`Lámina ampliada · ${sheet.name}`}
                  className="pointer-events-none block shrink-0 object-contain"
                  style={{
                    maxWidth: zoomLevel === 1 ? "100%" : "none",
                    maxHeight: zoomLevel === 1 ? "100%" : "none",
                    height: zoomLevel === 1 ? "auto" : `${zoomLevel * 100}%`,
                    width: "auto",
                  }}
                />
              </div>
            </motion.div>
            <button
              onClick={closeZoom}
              aria-label="Cerrar lámina"
              className="absolute top-5 right-5 flex h-12 w-12 cursor-pointer items-center justify-center border border-bone/25 bg-ink/80 text-bone transition-colors hover:border-carmine"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
            <span className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-[0.72rem] tracking-[0.2em] text-bone/60 uppercase">
              {sheet.name} · {sheet.capacity}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
