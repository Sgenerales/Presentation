"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { A, PROPOSAL } from "@/lib/tower";
import { EASE, Img } from "../ui";
import { Kicker, MetaRow, SheetTicks, stag } from "./SlideKit";

/**
 * SALA PRIVADA — antesala.
 * Dos dossiers, dos presentaciones: la propuesta integral (P1·2·3) y los
 * últimos niveles disponibles (P7·P8). Teclas 1 / 2 para entrar directo.
 */

const DOSSIERS = [
  {
    href: "/presentacion/propuesta",
    code: "Dossier 01",
    key: "1",
    title: "La propuesta",
    titleItalic: "integral.",
    desc: "Pisos 1, 2 y 3 resueltos como una sola operación de 200+ posiciones — render ejecutivo y planos de cada planta.",
    meta: ["Pisos 1 — 2 — 3", "8 láminas"],
    img: PROPOSAL.sheets[0].render,
    imgClass: "object-cover",
  },
  {
    href: "/presentacion/niveles",
    code: "Dossier 02",
    key: "2",
    title: "Los últimos",
    titleItalic: "niveles.",
    desc: "Los dos únicos espacios disponibles de la torre — el módulo del Piso 8 en el nivel más alto y la planta completa del Piso 7.",
    meta: ["Pisos 7 — 8", "10 láminas"],
    img: `${A}/render-p8-1.jpg`,
    imgClass: "object-cover",
  },
];

export default function Selector() {
  const router = useRouter();
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const d = DOSSIERS.find((x) => x.key === e.key);
      if (d) router.push(d.href);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  return (
    <main className="grain relative flex min-h-dvh flex-col overflow-x-hidden bg-ink text-bone">
      <SheetTicks />

      {/* Cabecera */}
      <header className="relative z-10 flex items-center justify-between px-8 pt-8 md:px-14">
        <Link href="/" className="flex cursor-pointer items-baseline gap-2">
          <span className="font-sans text-[0.9rem] font-light tracking-[0.18em] text-bone">
            MILLA
          </span>
          <span className="font-sans text-[0.9rem] font-light tracking-[0.18em] text-carmine-soft">
            ZERO
          </span>
        </Link>
        <Link
          href="/"
          className="link-lux flex min-h-11 cursor-pointer items-center font-mono text-[0.64rem] tracking-[0.2em] text-bone/75 uppercase transition-colors hover:text-bone md:tracking-[0.22em]"
        >
          ← Volver al sitio
        </Link>
      </header>

      <motion.div {...stag(0, 0.15)} className="relative z-10 px-8 pt-10 md:px-14">
        <Kicker>Sala privada de presentación</Kicker>
        <h1 className="display mt-5 text-[clamp(1.9rem,3.6vw,3.2rem)]">
          Elige tu <em className="display-italic">espacio.</em>
        </h1>
      </motion.div>

      {/* Dossiers */}
      <div className="relative z-10 mt-8 flex min-h-[580px] flex-1 flex-col gap-px border-t border-line-faint md:mt-10 md:min-h-[420px] md:flex-row">
        {DOSSIERS.map((d, i) => (
          <motion.div
            key={d.href}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.35 + i * 0.14, ease: EASE }}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            className="relative min-h-[290px] flex-1 transition-all duration-700 md:min-h-0"
            style={{ flexGrow: hover === i ? 1.35 : 1 }}
          >
            <Link
              href={d.href}
              className="group relative flex h-full cursor-pointer flex-col justify-end overflow-hidden border-b border-line-faint md:border-r md:border-b-0"
            >
              {/* Fondo */}
              <div className="absolute inset-0">
                <Img
                  src={d.img}
                  alt=""
                  eager
                  className={`h-full w-full transition-all duration-1000 ${d.imgClass} ${
                    hover === i
                      ? "scale-105 opacity-45 grayscale-0"
                      : "scale-100 opacity-[0.16] grayscale"
                  }`}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />

              {/* Contenido */}
              <div className="relative z-10 p-8 md:p-12">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[0.62rem] tracking-[0.26em] text-carmine-soft uppercase">
                    {d.code}
                  </p>
                  <p className="hidden font-mono text-[0.62rem] tracking-[0.22em] text-bone/60 uppercase md:block">
                    Tecla {d.key}
                  </p>
                </div>
                <h2 className="display mt-4 text-[clamp(2rem,4.2vw,4rem)] leading-[1.02]">
                  {d.title}{" "}
                  <em className="display-italic">{d.titleItalic}</em>
                </h2>
                <p className="mt-4 max-w-md text-[0.98rem] leading-relaxed font-light text-bone/78">
                  {d.desc}
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <MetaRow items={d.meta} />
                  <span className="flex items-center gap-3 font-mono text-[0.66rem] tracking-[0.24em] text-bone uppercase">
                    Iniciar
                    <span className="inline-block transition-transform duration-500 group-hover:translate-x-2">
                      →
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Pie */}
      <footer className="relative z-10 flex items-center justify-between px-8 py-5 md:px-14">
        <p className="font-mono text-[0.6rem] tracking-[0.18em] text-bone/55 uppercase md:tracking-[0.2em]">
          Documento privado · Milla Zero
        </p>
        <p className="hidden font-mono text-[0.6rem] tracking-[0.2em] text-bone/55 uppercase md:block">
          En la presentación: ← → navegar · F pantalla completa · I índice
        </p>
      </footer>
    </main>
  );
}
