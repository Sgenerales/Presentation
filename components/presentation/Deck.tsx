"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { EASE } from "../ui";

/**
 * SALA PRIVADA — motor de presentación.
 * Un deck es una secuencia de láminas a pantalla completa navegable con
 * teclado (←/→, espacio, Home/End, F pantalla completa, I índice), rueda,
 * swipe táctil y ticks de capítulo. El chrome se desvanece tras unos
 * segundos de inactividad para dejar la lámina sola frente al cliente.
 */

export interface SlideDef {
  id: string;
  /** Etiqueta corta de capítulo para el riel y el índice (ej. "P2·A") */
  chapter: string;
  /** Título de la lámina en el índice */
  title: string;
  /** Miniatura para el índice */
  thumb?: string;
  content: ReactNode;
}

export default function Deck({
  code,
  name,
  slides,
  preload = [],
}: {
  code: string;
  name: string;
  slides: SlideDef[];
  preload?: string[];
}) {
  const total = slides.length;
  const [[index, dir], setNav] = useState<[number, number]>([0, 0]);
  const [showIndex, setShowIndex] = useState(false);
  const [chrome, setChrome] = useState(true);
  const wheelLock = useRef(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const goTo = useCallback(
    (i: number) => {
      setNav(([cur]) => {
        const next = Math.max(0, Math.min(total - 1, i));
        if (next === cur) return [cur, 0];
        return [next, next > cur ? 1 : -1];
      });
    },
    [total],
  );
  const next = useCallback(
    () => setNav(([cur]) => (cur >= total - 1 ? [cur, 0] : [cur + 1, 1])),
    [total],
  );
  const prev = useCallback(
    () => setNav(([cur]) => (cur <= 0 ? [cur, 0] : [cur - 1, -1])),
    [],
  );

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void document.documentElement.requestFullscreen?.();
    }
  }, []);

  // Posición inicial desde el hash (#4) y sincronización al navegar,
  // para que un refresh en plena reunión no vuelva a la portada.
  useEffect(() => {
    const m = window.location.hash.match(/^#(\d+)$/);
    if (!m) return;
    const i = parseInt(m[1], 10) - 1;
    if (i <= 0 || i >= total) return;
    const raf = requestAnimationFrame(() => setNav([i, 0]));
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    window.history.replaceState(null, "", `#${index + 1}`);
  }, [index]);

  // Teclado
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        prev();
      } else if (e.key === "Home") {
        goTo(0);
      } else if (e.key === "End") {
        goTo(total - 1);
      } else if (e.key.toLowerCase() === "f") {
        toggleFullscreen();
      } else if (e.key.toLowerCase() === "i") {
        setShowIndex((v) => !v);
      } else if (e.key === "Escape") {
        setShowIndex(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, goTo, total, toggleFullscreen]);

  // Chrome auto-ocultable
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const poke = () => {
      setChrome(true);
      clearTimeout(t);
      t = setTimeout(() => setChrome(false), 4200);
    };
    poke();
    window.addEventListener("pointermove", poke);
    window.addEventListener("keydown", poke);
    window.addEventListener("pointerdown", poke);
    return () => {
      clearTimeout(t);
      window.removeEventListener("pointermove", poke);
      window.removeEventListener("keydown", poke);
      window.removeEventListener("pointerdown", poke);
    };
  }, []);

  // Bloquear el scroll del documento mientras el deck está montado
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  const onWheel = (e: React.WheelEvent) => {
    if (showIndex) return;
    // Ignora el ruido leve del trackpad — exige un gesto deliberado.
    if (Math.abs(e.deltaY) < 42) return;
    const now = Date.now();
    const idle = now - wheelLock.current > 850;
    // Reinicia el bloqueo en cada evento: mientras el gesto de scroll siga
    // activo no se encadenan saltos; solo avanza una lámina por gesto.
    wheelLock.current = now;
    if (!idle) return;
    if (e.deltaY > 0) next();
    else prev();
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "touch")
      touchStart.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const s = touchStart.current;
    touchStart.current = null;
    if (!s || e.pointerType !== "touch") return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    if (Math.abs(dx) > 64 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      if (dx < 0) next();
      else prev();
    }
  };

  // Capítulos: primera lámina de cada etiqueta → ticks del riel
  const chapters = slides.reduce<{ i: number; chapter: string }[]>(
    (acc, s, i) => {
      if (!acc.length || acc[acc.length - 1].chapter !== s.chapter)
        acc.push({ i, chapter: s.chapter });
      return acc;
    },
    [],
  );

  const slide = slides[index];

  return (
    <div
      role="region"
      aria-roledescription="presentación"
      aria-label={name}
      onWheel={onWheel}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      className="fixed inset-0 touch-pan-y overflow-hidden bg-ink text-bone"
    >
      {/* Lámina activa */}
      <AnimatePresence initial={false} custom={dir}>
        <motion.div
          key={slide.id}
          custom={dir}
          initial="enter"
          animate="center"
          exit="exit"
          variants={{
            enter: (d: number) => ({
              clipPath:
                d >= 0 ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)",
            }),
            center: {
              clipPath: "inset(0% 0% 0% 0%)",
              transition: { duration: 0.85, ease: EASE },
            },
            exit: {
              opacity: 0,
              scale: 0.992,
              transition: { duration: 0.55, ease: EASE },
            },
          }}
          className="absolute inset-0 z-10"
        >
          {slide.content}
        </motion.div>
      </AnimatePresence>

      {/* ---- Chrome ---- */}
      <div
        className={`transition-opacity duration-700 ${chrome ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        {/* Cabecera */}
        <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-5 md:px-10">
          <Link
            href="/presentacion"
            aria-label="Índice de presentaciones"
            className="flex cursor-pointer items-baseline gap-2 mix-blend-difference"
          >
            <span className="font-sans text-[0.85rem] font-light tracking-[0.18em] text-bone">
              MILLA
            </span>
            <span className="font-sans text-[0.85rem] font-light tracking-[0.18em] text-carmine-soft">
              ZERO
            </span>
          </Link>

          <p className="hidden font-mono text-[0.64rem] tracking-[0.28em] text-bone uppercase mix-blend-difference md:block">
            {code} — {name}
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowIndex(true)}
              aria-label="Abrir índice de láminas"
              className="cursor-pointer px-3 py-2 font-mono text-[0.64rem] tracking-[0.24em] text-bone uppercase mix-blend-difference transition-opacity hover:opacity-70"
            >
              Índice
            </button>
            <button
              onClick={toggleFullscreen}
              aria-label="Pantalla completa"
              className="cursor-pointer px-3 py-2 text-bone mix-blend-difference transition-opacity hover:opacity-70"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <Link
              href="/presentacion"
              aria-label="Salir de la presentación"
              className="cursor-pointer px-3 py-2 text-bone mix-blend-difference transition-opacity hover:opacity-70"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M5 5l14 14M19 5L5 19"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </Link>
          </div>
        </header>

        {/* Pie: riel de progreso + navegación */}
        <footer className="absolute inset-x-0 bottom-0 z-30 px-6 pb-5 md:px-10 md:pb-6">
          <div className="flex items-end justify-between gap-6">
            <p className="min-w-0 truncate font-mono text-[0.62rem] tracking-[0.24em] text-bone uppercase mix-blend-difference md:text-[0.66rem]">
              <span className="text-carmine-soft">{slide.chapter}</span>
              <span className="mx-3 opacity-40">·</span>
              <span className="opacity-80">{slide.title}</span>
            </p>
            <div className="flex shrink-0 items-center gap-5">
              <p className="font-mono text-[0.66rem] tracking-[0.24em] text-bone mix-blend-difference tabular-nums">
                {String(index + 1).padStart(2, "0")} —{" "}
                {String(total).padStart(2, "0")}
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={prev}
                  aria-label="Lámina anterior"
                  disabled={index === 0}
                  className="cursor-pointer px-2.5 py-1.5 text-bone mix-blend-difference transition-opacity hover:opacity-70 disabled:cursor-default disabled:opacity-25"
                >
                  ←
                </button>
                <button
                  onClick={next}
                  aria-label="Lámina siguiente"
                  disabled={index === total - 1}
                  className="cursor-pointer px-2.5 py-1.5 text-bone mix-blend-difference transition-opacity hover:opacity-70 disabled:cursor-default disabled:opacity-25"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          {/* Riel con ticks de capítulo */}
          <div className="relative mt-3 h-4">
            <div className="absolute top-1/2 h-px w-full -translate-y-1/2 bg-bone/15" />
            <motion.div
              className="absolute top-1/2 h-px -translate-y-1/2 bg-carmine"
              animate={{ width: `${(index / Math.max(total - 1, 1)) * 100}%` }}
              transition={{ duration: 0.6, ease: EASE }}
            />
            {chapters.map((c) => (
              <button
                key={c.i}
                onClick={() => goTo(c.i)}
                aria-label={`Ir a ${c.chapter}`}
                title={c.chapter}
                style={{ left: `${(c.i / Math.max(total - 1, 1)) * 100}%` }}
                className="group absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              >
                <span
                  className={`absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border transition-all duration-300 ${
                    index >= c.i
                      ? "border-carmine bg-carmine"
                      : "border-bone/40 bg-ink group-hover:border-bone"
                  }`}
                />
              </button>
            ))}
          </div>
        </footer>
      </div>

      {/* ---- Índice ---- */}
      <AnimatePresence>
        {showIndex && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 z-40 overflow-y-auto bg-ink/[0.97] backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label="Índice de láminas"
          >
            <div className="mx-auto max-w-6xl px-8 py-16 md:py-20">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[0.7rem] tracking-[0.3em] text-bone/55 uppercase">
                  Índice — {name}
                </p>
                <button
                  onClick={() => setShowIndex(false)}
                  aria-label="Cerrar índice"
                  className="cursor-pointer p-2 text-bone transition-opacity hover:opacity-70"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {slides.map((s, i) => (
                  <motion.button
                    key={s.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: i * 0.04, ease: EASE }}
                    onClick={() => {
                      goTo(i);
                      setShowIndex(false);
                    }}
                    className={`group cursor-pointer border p-4 text-left transition-colors duration-300 ${
                      i === index
                        ? "border-carmine/70 bg-ink-soft"
                        : "border-line-faint hover:border-bone/30"
                    }`}
                  >
                    {s.thumb && (
                      <div className="mb-4 aspect-video overflow-hidden bg-ink-soft">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={s.thumb}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-cover opacity-80 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                        />
                      </div>
                    )}
                    <p className="font-mono text-[0.6rem] tracking-[0.22em] text-carmine-soft uppercase">
                      {String(i + 1).padStart(2, "0")} · {s.chapter}
                    </p>
                    <p className="display mt-1.5 text-[1.05rem] leading-tight text-bone/90">
                      {s.title}
                    </p>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Precarga de imágenes del deck */}
      <div className="hidden" aria-hidden>
        {preload.map((src) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={src} src={src} alt="" />
        ))}
      </div>
    </div>
  );
}
