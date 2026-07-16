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
          : "bg-transparent py-5 sm:py-7"
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
        <nav className="hidden items-center gap-10 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="link-lux cursor-pointer text-[0.88rem] font-light tracking-[0.14em] text-bone/65 uppercase transition-colors duration-300 hover:text-bone"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href="/presentacion"
            aria-label="Presentaciones — sala de propuestas para clientes"
            className="lux-sheen group relative inline-flex cursor-pointer items-center gap-2.5 overflow-hidden border border-carmine-soft/55 bg-carmine/[0.12] px-5 py-3 font-mono text-[0.74rem] tracking-[0.2em] text-bone uppercase transition-all duration-300 hover:border-carmine-soft hover:bg-carmine/25"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden className="text-carmine-soft">
              <rect x="3" y="4" width="18" height="13" rx="1" stroke="currentColor" strokeWidth="1.6" />
              <path d="M10.5 8.2l4 2.8-4 2.8z" fill="currentColor" />
              <path d="M8.5 20h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <span className="relative">Presentaciones</span>
          </Link>
          <a
            href="#contacto"
            className="group relative inline-flex cursor-pointer items-center gap-3 overflow-hidden border border-bone/25 px-7 py-3 text-[0.78rem] tracking-[0.22em] text-bone uppercase transition-colors duration-500 hover:border-carmine"
          >
            <span className="absolute inset-0 -translate-x-full bg-carmine transition-transform duration-500 ease-out group-hover:translate-x-0" />
            <span className="relative">Agendar visita</span>
          </a>
        </div>

        {/* Toggle móvil */}
        <button
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="menu-principal"
          onClick={() => setOpen((v) => !v)}
          className="flex h-12 w-12 cursor-pointer touch-manipulation flex-col items-center justify-center gap-[7px] lg:hidden"
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
            className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-line-faint bg-ink/95 backdrop-blur-xl lg:hidden"
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
                className="mt-2 inline-flex min-h-12 cursor-pointer items-center justify-center gap-2.5 border border-carmine-soft/55 bg-carmine/[0.12] px-6 py-4 text-center font-mono text-[0.82rem] tracking-[0.16em] text-bone uppercase"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden className="text-carmine-soft">
                  <rect x="3" y="4" width="18" height="13" rx="1" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M10.5 8.2l4 2.8-4 2.8z" fill="currentColor" />
                  <path d="M8.5 20h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                Presentaciones
              </Link>
              <a
                href="#contacto"
                onClick={() => setOpen(false)}
                className="inline-flex min-h-12 cursor-pointer items-center justify-center border border-carmine px-7 py-3 text-center text-[0.78rem] tracking-[0.22em] text-bone uppercase"
              >
                Agendar visita
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
