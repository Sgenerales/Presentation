"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { EASE } from "./ui";

const LINKS = [
  { href: "#concepto", label: "El concepto" },
  { href: "#torre", label: "La Torre" },
  { href: "#espacios", label: "Espacios" },
  { href: "#experiencia", label: "Experiencia" },
  { href: "#ubicacion", label: "Ubicación" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      data-reveal
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.35, ease: EASE }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled
          ? "border-b border-line-faint bg-ink/85 py-3.5 backdrop-blur-xl md:py-4"
          : "bg-gradient-to-b from-ink/70 via-ink/30 to-transparent py-5 sm:py-7"
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 md:px-12">
        {/* Logo */}
        <a
          href="#inicio"
          className="flex items-baseline gap-2"
          aria-label="Milla Zero — inicio"
        >
          <span className="font-sans text-[0.94rem] font-light tracking-[0.18em] text-bone sm:text-lg">
            MILLA
          </span>
          <span className="font-sans text-[0.94rem] font-light tracking-[0.18em] text-carmine-soft sm:text-lg">
            ZERO
          </span>
        </a>

        {/* Links desktop */}
        <nav className="hidden items-center gap-10 2xl:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="link-lux cursor-pointer whitespace-nowrap text-[0.88rem] font-light tracking-[0.14em] text-bone/82 uppercase transition-colors duration-300 hover:text-bone"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 2xl:flex">
          <Link
            href="/presentacion"
            aria-label="Presentaciones — sala de propuestas para clientes"
            className="lux-sheen group relative inline-flex min-h-12 cursor-pointer items-center gap-3 overflow-hidden border border-bone/25 bg-ink/35 px-4 py-2 backdrop-blur-md transition-all duration-500 hover:border-bone/45 hover:bg-ink/60"
          >
            <span className="absolute inset-y-2 left-0 w-px bg-carmine-soft" />
            <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-carmine-soft/45 bg-carmine/10 text-carmine-soft transition-colors duration-500 group-hover:bg-carmine/20">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <rect x="3" y="4" width="18" height="13" rx="1" stroke="currentColor" strokeWidth="1.5" />
                <path d="M10.5 8.2l4 2.8-4 2.8z" fill="currentColor" />
                <path d="M8.5 20h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
            <span className="relative flex flex-col leading-none">
              <span className="font-mono text-[0.54rem] tracking-[0.18em] text-bone/60 uppercase">Sala privada</span>
              <span className="mt-1.5 font-mono text-[0.68rem] tracking-[0.17em] text-bone uppercase">Presentaciones</span>
            </span>
            <span aria-hidden className="ml-0.5 text-sm text-bone/55 transition-transform duration-500 group-hover:translate-x-1 group-hover:text-bone">→</span>
          </Link>
          <a
            href="#contacto"
            className="group relative inline-flex min-h-12 cursor-pointer items-center gap-3 overflow-hidden border border-bone/40 px-7 py-3 text-[0.78rem] tracking-[0.22em] whitespace-nowrap text-bone uppercase transition-colors duration-500 hover:border-carmine"
          >
            <span className="absolute inset-0 -translate-x-full bg-carmine transition-transform duration-500 ease-out group-hover:translate-x-0" />
            <span className="relative">Visita privada</span>
          </a>
        </div>

        {/* Toggle móvil */}
        <button
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="menu-principal"
          onClick={() => setOpen((v) => !v)}
          className="flex h-12 w-12 cursor-pointer touch-manipulation flex-col items-center justify-center gap-[7px] 2xl:hidden"
        >
          <motion.span
            animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
            className="block h-px w-7 bg-bone"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
            className="block h-px w-7 bg-bone"
          />
        </button>
      </div>

      {/* Menú móvil */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="menu-principal"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-line-faint bg-ink/95 backdrop-blur-xl 2xl:hidden"
          >
            <div className="flex flex-col gap-6 px-6 py-8">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.5, ease: EASE }}
                className="display block cursor-pointer py-1 text-3xl text-bone/85"
                >
                  {l.label}
                </motion.a>
              ))}
              <Link
                href="/presentacion"
                onClick={() => setOpen(false)}
                className="group relative mt-2 inline-flex min-h-14 cursor-pointer items-center justify-start gap-3 overflow-hidden border border-bone/25 bg-ink-soft px-4 py-3 text-left"
              >
                <span className="absolute inset-y-2 left-0 w-px bg-carmine-soft" />
                <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-carmine-soft/45 bg-carmine/10 text-carmine-soft">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <rect x="3" y="4" width="18" height="13" rx="1" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M10.5 8.2l4 2.8-4 2.8z" fill="currentColor" />
                    <path d="M8.5 20h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="flex flex-col leading-none">
                  <span className="font-mono text-[0.58rem] tracking-[0.18em] text-bone/60 uppercase">Sala privada</span>
                  <span className="mt-1.5 font-mono text-[0.76rem] tracking-[0.16em] text-bone uppercase">Presentaciones</span>
                </span>
                <span aria-hidden className="ml-auto text-bone/60">→</span>
              </Link>
              <a
                href="#contacto"
                onClick={() => setOpen(false)}
                className="inline-flex min-h-12 cursor-pointer items-center justify-center border border-carmine px-7 py-3 text-center text-[0.78rem] tracking-[0.22em] text-bone uppercase"
              >
                Visita privada
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
