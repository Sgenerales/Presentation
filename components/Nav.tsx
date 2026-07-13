"use client";

import { AnimatePresence, motion } from "framer-motion";
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
          ? "border-b border-line-faint bg-ink/85 py-4 backdrop-blur-xl"
          : "bg-transparent py-7"
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 md:px-12">
        {/* Logo */}
        <a
          href="#inicio"
          className="flex items-baseline gap-2"
          aria-label="Milla Zero — inicio"
        >
          <span className="font-sans text-lg font-light tracking-[0.18em] text-bone">
            MILLA
          </span>
          <span className="font-sans text-lg font-light tracking-[0.18em] text-carmine-soft">
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

        <div className="hidden lg:block">
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
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-[7px] lg:hidden"
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="overflow-hidden border-t border-line-faint bg-ink/95 backdrop-blur-xl lg:hidden"
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
                  className="display cursor-pointer text-3xl text-bone/85"
                >
                  {l.label}
                </motion.a>
              ))}
              <a
                href="#contacto"
                onClick={() => setOpen(false)}
                className="mt-2 inline-block cursor-pointer border border-carmine px-7 py-3 text-center text-[0.78rem] tracking-[0.22em] text-bone uppercase"
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
