"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { A, SPACES, type Space } from "@/lib/tower";
import { PlanP8, PlanTipo } from "../FloorPlans";
import { EASE, Img } from "../ui";
import Deck, { type SlideDef } from "./Deck";
import {
  ChapterSlide,
  ClosingSlide,
  CoverSlide,
  Kicker,
  SheetTicks,
  stag,
} from "./SlideKit";

/**
 * DECK B — Los últimos niveles (Piso 8 · Piso 7).
 * Los dos únicos espacios disponibles de la torre, presentados como
 * capítulos separados: renders, video, plano interactivo y contexto.
 */

const P8 = SPACES.find((s) => s.id === "p8-modulo") as Space;
const P7 = SPACES.find((s) => s.id === "p7-completo") as Space;

/** Galería a sangre completa con Ken Burns y flechas. */
function GallerySlide({ space, kicker }: { space: Space; kicker: string }) {
  const [frame, setFrame] = useState(0);
  const total = space.renders.length;
  const current = space.renders[frame];
  const step = (d: number) => setFrame((f) => (f + d + total) % total);

  return (
    <div className="relative h-full w-full overflow-hidden bg-ink">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={frame}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="absolute inset-0"
        >
          <Img
            src={current.src}
            alt={current.caption}
            eager
            className="kenburns-slow h-full w-full object-cover"
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-ink/45" />
      <SheetTicks />

      {/* Flechas */}
      {total > 1 && (
        <>
          <button
            aria-label="Render anterior"
            onClick={() => step(-1)}
            className="absolute top-1/2 left-5 z-20 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center border border-bone/20 bg-ink/45 text-bone/85 backdrop-blur-sm transition-colors duration-300 hover:border-carmine hover:bg-carmine md:left-8"
          >
            ←
          </button>
          <button
            aria-label="Render siguiente"
            onClick={() => step(1)}
            className="absolute top-1/2 right-5 z-20 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center border border-bone/20 bg-ink/45 text-bone/85 backdrop-blur-sm transition-colors duration-300 hover:border-carmine hover:bg-carmine md:right-8"
          >
            →
          </button>
        </>
      )}

      <div className="absolute inset-x-0 bottom-0 z-10 px-8 pb-24 md:px-16">
        <motion.div {...stag(0, 0.2)}>
          <Kicker tone="carmine">{kicker}</Kicker>
        </motion.div>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <motion.p
            {...stag(1, 0.28)}
            className="display max-w-2xl text-[clamp(1.5rem,2.8vw,2.6rem)] text-bone"
          >
            {current.caption}
          </motion.p>
          <motion.p
            {...stag(2, 0.35)}
            className="font-mono text-[0.7rem] tracking-[0.24em] text-bone/60 tabular-nums"
          >
            {String(frame + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </motion.p>
        </div>
      </div>
    </div>
  );
}

/** Video render a sangre completa, con selector si hay más de uno. */
function VideoSlide({ space, kicker }: { space: Space; kicker: string }) {
  const videos = space.videos ?? [];
  const [idx, setIdx] = useState(0);
  const v = videos[idx];
  if (!v) return null;

  return (
    <div className="relative h-full w-full overflow-hidden bg-ink">
      <AnimatePresence mode="wait" initial={false}>
        <motion.video
          key={v.src}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          src={v.src}
          poster={v.poster}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/40" />
      <SheetTicks />

      <div className="absolute inset-x-0 bottom-0 z-10 px-8 pb-24 md:px-16">
        <motion.div {...stag(0, 0.2)}>
          <Kicker tone="carmine">{kicker}</Kicker>
        </motion.div>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-5">
          <motion.p
            {...stag(1, 0.28)}
            className="display max-w-2xl text-[clamp(1.5rem,2.8vw,2.6rem)] text-bone"
          >
            {v.caption}
          </motion.p>
          {videos.length > 1 && (
            <motion.div {...stag(2, 0.35)} className="flex gap-2">
              {videos.map((vv, i) => (
                <button
                  key={vv.src}
                  onClick={() => setIdx(i)}
                  aria-label={`Video ${i + 1}`}
                  className={`cursor-pointer border px-4 py-2 font-mono text-[0.62rem] tracking-[0.2em] uppercase transition-all duration-300 ${
                    i === idx
                      ? "border-carmine bg-carmine text-bone"
                      : "border-bone/25 text-bone/70 hover:border-bone/60"
                  }`}
                >
                  Video {String(i + 1).padStart(2, "0")}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

/** Plano interactivo sobre lámina clara + ficha programática. */
function PlanSlide({
  kicker,
  title,
  titleItalic,
  plan,
  program,
  highlights,
  legend,
}: {
  kicker: string;
  title: string;
  titleItalic?: string;
  plan: React.ReactNode;
  program?: { name: string; detail: string }[];
  highlights?: string[];
  legend: string;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#faf8f3] text-ink">
      <SheetTicks tone="dark" />
      <div className="relative z-10 grid h-full grid-cols-1 gap-8 overflow-y-auto px-8 pt-16 pb-24 md:px-14 lg:grid-cols-12 lg:items-center lg:gap-12 lg:overflow-visible lg:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.25, ease: EASE }}
          className="lg:col-span-7"
        >
          {plan}
        </motion.div>

        <div className="lg:col-span-5">
          <motion.div {...stag(0, 0.2)}>
            <Kicker tone="carmine">{kicker}</Kicker>
          </motion.div>
          <motion.h2
            {...stag(1, 0.26)}
            className="display mt-5 text-[clamp(1.8rem,3.2vw,3rem)]"
          >
            {title}{" "}
            {titleItalic && (
              <em className="display-italic">{titleItalic}</em>
            )}
          </motion.h2>

          {highlights && (
            <ul className="mt-7 flex flex-col">
              {highlights.map((h, i) => (
                <motion.li
                  key={h}
                  {...stag(i, 0.4)}
                  className="flex items-start gap-4 border-t border-line py-3 text-[0.95rem] font-light text-ink/80"
                >
                  <span className="mt-[0.55rem] h-px w-5 shrink-0 bg-carmine" />
                  {h}
                </motion.li>
              ))}
            </ul>
          )}

          {program && (
            <motion.div {...stag(3, 0.55)} className="mt-7">
              <p className="font-mono text-[0.62rem] tracking-[0.24em] text-stone uppercase">
                Programa propuesto
              </p>
              <div className="mt-3 grid grid-cols-2 gap-px border border-line bg-line">
                {program.map((p) => (
                  <div key={p.name} className="bg-[#faf8f3] p-3.5">
                    <p className="text-[0.85rem] font-medium text-ink">
                      {p.name}
                    </p>
                    <p className="mt-0.5 text-[0.74rem] font-light text-stone-dark">
                      {p.detail}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          <motion.p
            {...stag(4, 0.68)}
            className="mt-7 font-mono text-[0.62rem] tracking-[0.2em] text-stone uppercase"
          >
            {legend}
          </motion.p>
        </div>
      </div>
    </div>
  );
}

/** Contexto a sangre completa: foto + especificaciones clave. */
function ContextSlide({
  img,
  kicker,
  title,
  titleItalic,
  chips,
  note,
}: {
  img: string;
  kicker: string;
  title: string;
  titleItalic: string;
  chips: string[];
  note?: string;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-ink">
      <div className="absolute inset-0">
        <Img
          src={img}
          alt=""
          eager
          className="kenburns-slow h-full w-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-ink/40" />
      <SheetTicks />

      <div className="absolute inset-x-0 bottom-0 z-10 px-8 pb-24 md:px-16">
        <motion.div {...stag(0, 0.2)}>
          <Kicker tone="carmine">{kicker}</Kicker>
        </motion.div>
        <motion.h2
          {...stag(1, 0.28)}
          className="display mt-4 max-w-3xl text-[clamp(1.9rem,3.8vw,3.6rem)] text-bone"
        >
          {title} <em className="display-italic">{titleItalic}</em>
        </motion.h2>
        <div className="mt-7 flex flex-wrap gap-2.5">
          {chips.map((c, i) => (
            <motion.span
              key={c}
              {...stag(i, 0.45)}
              className="border border-bone/20 bg-ink/40 px-4 py-2 font-mono text-[0.62rem] tracking-[0.18em] text-bone/80 uppercase backdrop-blur-sm"
            >
              {c}
            </motion.span>
          ))}
        </div>
        {note && (
          <motion.p
            {...stag(5, 0.6)}
            className="mt-5 font-mono text-[0.6rem] tracking-[0.2em] text-bone/40 uppercase"
          >
            {note}
          </motion.p>
        )}
      </div>
    </div>
  );
}

export default function NivelesDeck() {
  const slides: SlideDef[] = [
    {
      id: "portada",
      chapter: "Portada",
      title: "Los últimos niveles",
      content: (
        <CoverSlide
          eyebrow="Milla Zero — Sala privada"
          lines={["Los últimos", "niveles."]}
          meta={[
            "Disponibilidad actual · Pisos 7 y 8",
            "Equipetrol Norte · Santa Cruz",
            "Entrega llave en mano",
            "Documento privado",
          ]}
          bg={P8.renders[0].src}
        />
      ),
    },

    /* ---- Capítulo Piso 8 ---- */
    {
      id: "p8-capitulo",
      chapter: "P8",
      title: "El último nivel",
      thumb: P8.renders[0].src,
      content: (
        <ChapterSlide
          numeral="8"
          eyebrow="Capítulo 01 — Piso Ocho"
          title="El último piso,"
          titleItalic="con terraza propia."
          bg={P8.renders[0].src}
          facts={[
            { label: "Superficie", value: "183,17 m²" },
            { label: "Terraza", value: "Uso exclusivo" },
            { label: "Entrega", value: "Llave en mano" },
          ]}
        />
      ),
    },
    {
      id: "p8-renders",
      chapter: "P8",
      title: "El espacio, en imagen",
      thumb: P8.renders[1].src,
      content: (
        <GallerySlide space={P8} kicker="Piso 8 — Renders de la propuesta" />
      ),
    },
    {
      id: "p8-video",
      chapter: "P8",
      title: "El espacio, en movimiento",
      thumb: P8.renders[0].src,
      content: (
        <VideoSlide space={P8} kicker="Piso 8 — Recorrido animado" />
      ),
    },
    {
      id: "p8-plano",
      chapter: "P8",
      title: "La planta, en detalle",
      content: (
        <PlanSlide
          kicker="Piso 8 — Plano interactivo"
          title="183,17 m²"
          titleItalic="en el nivel más alto."
          plan={<PlanP8 />}
          program={P8.program}
          legend="Pase el cursor por los ambientes del plano"
        />
      ),
    },
    {
      id: "p8-terraza",
      chapter: "P8",
      title: "La terraza exclusiva",
      thumb: `${A}/terraza-sur.jpg`,
      content: (
        <ContextSlide
          img={`${A}/terraza-sur.jpg`}
          kicker="Piso 8 — El exterior"
          title="Una terraza"
          titleItalic="que es suya."
          chips={[
            "Uso exclusivo del módulo",
            "Contigua al futuro rooftop",
            "Vista despejada de Equipetrol",
          ]}
        />
      ),
    },

    /* ---- Capítulo Piso 7 ---- */
    {
      id: "p7-capitulo",
      chapter: "P7",
      title: "La única planta entera",
      thumb: `${A}/glass-abstract.jpg`,
      content: (
        <ChapterSlide
          numeral="7"
          eyebrow="Capítulo 02 — Piso Siete"
          title="Una planta completa,"
          titleItalic="una sola compañía."
          bg={`${A}/glass-abstract.jpg`}
          facts={[
            { label: "Alas", value: "Norte + Sur" },
            { label: "Estructura", value: "Libre de columnas" },
            { label: "Condición", value: "Única planta entera" },
          ]}
        />
      ),
    },
    {
      id: "p7-plano",
      chapter: "P7",
      title: "La planta, en detalle",
      content: (
        <PlanSlide
          kicker="Piso 7 — Plano interactivo"
          title="Ambas alas,"
          titleItalic="libres."
          plan={<PlanTipo norte="libre" sur="libre" focus="ambas" />}
          highlights={P7.highlights}
          legend="Pase el cursor por las alas y el núcleo"
        />
      ),
    },
    {
      id: "p7-contexto",
      chapter: "P7",
      title: "El lienzo, antes del trazo",
      thumb: `${A}/pano-planta-libre.jpg`,
      content: (
        <ContextSlide
          img={`${A}/pano-planta-libre.jpg`}
          kicker="Piso 7 — La planta libre"
          title="El lienzo,"
          titleItalic="antes del trazo."
          chips={[
            "Altura piso–cielo 3,72 m",
            "Doble vidriado · −35% energía",
            "Atenuación acústica −30 dB",
            "Núcleo central de servicios",
            "Fit-out llave en mano",
          ]}
          note="Referencia ilustrativa · espacio antes del fit-out"
        />
      ),
    },

    {
      id: "cierre",
      chapter: "Cierre",
      title: "Agendar visita privada",
      content: (
        <ClosingSlide
          title="Los últimos niveles"
          titleItalic="esperan su firma."
          siblingHref="/presentacion/propuesta"
          siblingLabel="Ver propuesta integral"
        />
      ),
    },
  ];

  return (
    <Deck
      code="DOSSIER 02"
      name="Los últimos niveles"
      slides={slides}
      preload={[
        ...P8.renders.map((r) => r.src),
        `${A}/terraza-sur.jpg`,
        `${A}/glass-abstract.jpg`,
        `${A}/pano-planta-libre.jpg`,
      ]}
    />
  );
}
