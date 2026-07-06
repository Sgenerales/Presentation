"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { A, CONTACT } from "@/lib/tower";
import { EASE } from "./ui";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yImg = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "42%"]);

  return (
    <section
      id="inicio"
      ref={ref}
      className="grain relative flex h-[100svh] min-h-[640px] flex-col justify-end overflow-hidden"
    >
      {/* Imagen de fondo con Ken Burns + parallax */}
      <motion.div style={{ y: yImg }} className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${A}/hero-facade-sunset.jpg`}
          alt="Fachada de ITC Tower al atardecer, Santa Cruz de la Sierra"
          className="kenburns h-full w-full scale-105 object-cover"
          fetchPriority="high"
        />
      </motion.div>

      {/* Scrims cinematográficos */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/45" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/55 via-transparent to-transparent" />

      {/* Coordenadas verticales — detalle arquitectónico */}
      <motion.div
        data-reveal
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1.2 }}
        className="absolute top-1/2 right-6 hidden -translate-y-1/2 rotate-90 md:block"
      >
        <span className="eyebrow text-bone/40">{CONTACT.coords}</span>
      </motion.div>

      {/* Contenido */}
      <motion.div
        style={{ y: yText, opacity }}
        className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-24 md:px-12 md:pb-28"
      >
        <motion.p
          data-reveal
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.35, duration: 1, ease: EASE }}
          className="eyebrow mb-8 text-bone/70"
        >
          Equipetrol Norte · Santa Cruz de la Sierra · Bolivia
        </motion.p>

        <h1 className="display text-bone">
          {[
            ["El centro", ""],
            ["empresarial por", ""],
            ["excelencia", "de Bolivia."],
          ].map(([a, b], i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span
                data-reveal
                initial={reduced ? { opacity: 0 } : { y: "112%" }}
                animate={reduced ? { opacity: 1 } : { y: 0 }}
                transition={{ delay: 2.5 + i * 0.14, duration: 1.2, ease: EASE }}
                className="block text-[clamp(2.9rem,8.2vw,7.5rem)]"
              >
                {a}{" "}
                {b && <em className="display-italic text-bone/75">{b}</em>}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          data-reveal
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.15, duration: 1, ease: EASE }}
          className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
        >
          <p className="max-w-md text-[0.95rem] leading-relaxed font-light text-bone/70">
            Una torre corporativa de gestión privada, concebida para compañías
            que necesitan presencia, reserva y continuidad operativa en Santa
            Cruz.
          </p>

          <div className="flex items-center gap-8">
            <a
              href="#espacios"
              className="lux-sheen group relative inline-flex cursor-pointer items-center gap-3 overflow-hidden border border-bone/30 px-8 py-4 text-[0.72rem] tracking-[0.22em] text-bone uppercase transition-colors duration-500 hover:border-carmine"
            >
              <span className="absolute inset-0 -translate-x-full bg-carmine transition-transform duration-500 ease-out group-hover:translate-x-0" />
              <span className="relative">Ver disponibilidad</span>
            </a>
            <a
              href="#torre"
              className="link-lux hidden cursor-pointer text-[0.72rem] tracking-[0.22em] text-bone/60 uppercase transition-colors hover:text-bone md:inline"
            >
              Explorar la torre
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Indicador de scroll */}
      <motion.div
        data-reveal
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        aria-hidden
      >
        <span className="eyebrow text-[0.55rem] text-bone/40">Scroll</span>
        <div className="h-10 w-px bg-bone/20">
          <div className="scroll-cue h-3 w-px bg-bone/70" />
        </div>
      </motion.div>
    </section>
  );
}
