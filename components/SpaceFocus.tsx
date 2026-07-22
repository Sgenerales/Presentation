"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SPACES, type Space } from "@/lib/tower";
import { PlanP8, PlanTipo } from "./FloorPlans";
import ProposalSet from "./ProposalSet";
import Tour360, { type TourScene } from "./Tour360";
import { EASE, Eyebrow, Img, Reveal } from "./ui";

type View = "renders" | "video" | "plano" | "tour";

// Vista inmersiva sobre los renders reales del espacio. Sin panorámica
// genérica: solo material real del proyecto, explorable con parallax.
function tourScenes(space: Space): TourScene[] {
  return space.renders.map((r) => ({
    type: "flat",
    src: r.src,
    label: r.tag,
    note: r.caption,
  }));
}

function SpacePlan({ space }: { space: Space }) {
  if (space.id === "p8-modulo") return <PlanP8 />;
  if (space.id === "p7-completo")
    return <PlanTipo norte="libre" sur="libre" focus="ambas" />;
  return <PlanTipo norte="libre" sur="ocupado" focus="norte" />;
}

export default function SpaceFocus() {
  const [space, setSpace] = useState<Space>(SPACES[0]);
  const [view, setView] = useState<View>("renders");
  const [frame, setFrame] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Escucha selecciones desde el explorador de la torre
  useEffect(() => {
    const onSelect = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      const found = SPACES.find((s) => s.id === id);
      if (found) {
        setSpace(found);
        setView("renders");
        setFrame(0);
      }
    };
    window.addEventListener("itc:select-space", onSelect);
    return () => window.removeEventListener("itc:select-space", onSelect);
  }, []);

  const current = space.renders[frame] ?? space.renders[0];
  const total = space.renders.length;
  const step = (d: number) => setFrame((f) => (f + d + total) % total);

  return (
    <section
      id="espacios"
      ref={sectionRef}
      className="relative bg-bone py-24 text-ink md:py-36"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <Reveal>
              <Eyebrow tone="dark">03 · Espacios disponibles</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="display mt-10 max-w-2xl text-[clamp(2.2rem,4.6vw,4.2rem)]">
                Espacios que se leen en planta{" "}
                <em className="display-italic">y se sienten en recorrido.</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <div className="max-w-sm">
              <p className="text-[1.02rem] leading-relaxed font-light text-stone-dark">
                Renders, planos y recorrido inmersivo para evaluar cada
                decisión con claridad antes de una visita privada.
              </p>
              <Link
                href="/presentacion/niveles"
                className="link-lux mt-5 inline-flex cursor-pointer items-center gap-2 font-mono text-[0.68rem] tracking-[0.22em] text-carmine uppercase"
              >
                Ver en modo presentación →
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Selector de espacios */}
        <Reveal delay={0.08}>
          <div
            role="tablist"
            aria-label="Espacios disponibles"
            className="mt-12 grid gap-3 sm:mt-14 sm:grid-cols-3"
          >
            {SPACES.map((s) => {
              const on = s.id === space.id;
              return (
                <button
                  key={s.id}
                  role="tab"
                  aria-selected={on}
                  onClick={() => {
                    setSpace(s);
                    setView("renders");
                    setFrame(0);
                  }}
                  className={`group min-h-20 w-full cursor-pointer touch-manipulation border px-5 py-4 text-left transition-all duration-300 sm:px-6 ${
                    on
                      ? "border-ink bg-ink text-bone"
                      : "border-line bg-transparent text-ink hover:border-ink/40"
                  }`}
                >
                  <span
                    className={`font-mono text-[0.7rem] tracking-[0.24em] uppercase ${
                      on ? "text-carmine-soft" : "text-stone"
                    }`}
                  >
                    Nivel {s.code} · {s.area}
                  </span>
                  <span className="display mt-1 block text-[1.25rem] leading-tight">
                    {s.name}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Escenario visual */}
        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Visor */}
          <div className="relative lg:col-span-8">
            {/* Controles de vista */}
            <div
              className="mb-5 grid grid-cols-2 gap-2 sm:flex"
              role="tablist"
              aria-label="Modo de vista"
            >
              {(
                [
                  ["renders", "Renders"],
                  ...(space.videos?.length
                    ? ([["video", "Video"]] as [View, string][])
                    : []),
                  ["plano", "Plano interactivo"],
                  ["tour", "Vista inmersiva"],
                ] as [View, string][]
              ).map(([v, label]) => (
                <button
                  key={v}
                  role="tab"
                  aria-selected={view === v}
                  onClick={() => setView(v)}
                  className={`min-h-11 cursor-pointer touch-manipulation border px-3 py-2.5 text-[0.66rem] tracking-[0.12em] uppercase transition-all duration-300 sm:px-5 sm:text-[0.72rem] sm:tracking-[0.18em] ${
                    view === v
                      ? "border-ink bg-ink text-bone"
                      : "border-line text-stone-dark hover:border-ink/40"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <AnimatePresence initial={false}>
              <motion.div
                data-reveal
                key={space.id + view}
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99, position: "absolute" }}
                transition={{ duration: 0.4, ease: EASE }}
                className="w-full"
              >
                {view === "renders" && (
                  <figure>
                    <div className="img-zoom group relative bg-ink">
                      <motion.div
                        key={frame}
                        data-reveal
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, ease: EASE }}
                      >
                        <Img
                          src={current.src}
                          alt={current.caption}
                          className="aspect-[16/10] w-full object-cover"
                        />
                      </motion.div>
                      <span className="eyebrow absolute top-5 left-5 z-10 bg-ink/70 px-4 py-2 text-[0.66rem] text-bone backdrop-blur-sm">
                        {current.tag}
                      </span>

                      {/* Flechas */}
                      {total > 1 && (
                        <>
                          <button
                            aria-label="Render anterior"
                            onClick={() => step(-1)}
                            className="absolute top-1/2 left-3 z-10 flex h-12 w-12 -translate-y-1/2 cursor-pointer touch-manipulation items-center justify-center bg-ink/60 text-bone/80 opacity-100 backdrop-blur-sm transition-all duration-300 hover:bg-carmine hover:text-bone sm:left-4 md:opacity-0 md:group-hover:opacity-100"
                          >
                            ←
                          </button>
                          <button
                            aria-label="Render siguiente"
                            onClick={() => step(1)}
                            className="absolute top-1/2 right-3 z-10 flex h-12 w-12 -translate-y-1/2 cursor-pointer touch-manipulation items-center justify-center bg-ink/60 text-bone/80 opacity-100 backdrop-blur-sm transition-all duration-300 hover:bg-carmine hover:text-bone sm:right-4 md:opacity-0 md:group-hover:opacity-100"
                          >
                            →
                          </button>
                        </>
                      )}
                    </div>
                    <figcaption className="mt-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-6">
                      <span className="text-[0.95rem] font-light text-stone-dark italic">
                        {current.caption}
                      </span>
                      <span className="flex w-full items-center justify-between gap-4 sm:w-auto sm:shrink-0">
                        <span className="font-mono text-[0.7rem] tracking-[0.2em] text-stone tabular-nums">
                          {String(frame + 1).padStart(2, "0")} /{" "}
                          {String(total).padStart(2, "0")}
                        </span>
                        {total > 1 && (
                          <span className="flex max-w-[calc(100vw-3rem)] items-center gap-2 overflow-x-auto pb-1 sm:max-w-none sm:overflow-visible sm:pb-0">
                            {space.renders.map((r, i) => (
                              <button
                                key={r.src + i}
                                aria-label={`Render ${i + 1}`}
                                onClick={() => setFrame(i)}
                                className={`cursor-pointer border transition-all duration-300 ${
                                  i === frame
                                    ? "border-carmine opacity-100"
                                    : "border-transparent opacity-50 hover:opacity-90"
                                }`}
                              >
                                <Img
                                  src={r.src}
                                  alt=""
                                  className="h-10 w-14 object-cover"
                                />
                              </button>
                            ))}
                          </span>
                        )}
                      </span>
                    </figcaption>
                  </figure>
                )}

                {view === "video" && space.videos && (
                  <div className="flex flex-col gap-8">
                    {space.videos.map((v, i) => (
                      <figure key={v.src}>
                        <div className="relative bg-ink">
                          <video
                            src={v.src}
                            poster={v.poster}
                            controls
                            muted
                            loop
                            playsInline
                            autoPlay={i === 0}
                            preload={i === 0 ? "auto" : "metadata"}
                            className="aspect-video w-full object-cover"
                          />
                          <span className="eyebrow pointer-events-none absolute top-5 left-5 z-10 bg-ink/70 px-4 py-2 text-[0.66rem] text-bone backdrop-blur-sm">
                            Video render · {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <figcaption className="mt-3 text-[0.95rem] font-light text-stone-dark italic">
                          {v.caption}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                )}

                {view === "plano" && (
                  <figure>
                    <SpacePlan space={space} />
                    <figcaption className="mt-4 text-[0.95rem] font-light text-stone-dark italic">
                      {space.plan.caption} · plano interactivo, toque o pase el
                      cursor por los ambientes.
                    </figcaption>
                  </figure>
                )}

                {view === "tour" && (
                  <figure>
                    <Tour360 scenes={tourScenes(space)} />
                    <figcaption className="mt-4 text-[0.95rem] font-light text-stone-dark italic">
                      Vista inmersiva · arrastre o deslice para explorar el
                      render; use los controles para acercar o ampliar.
                    </figcaption>
                  </figure>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Ficha del espacio */}
          <div className="lg:col-span-4">
            <AnimatePresence mode="wait">
              <motion.div
                data-reveal
                key={space.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="lg:sticky lg:top-28"
              >
                <p className="eyebrow text-carmine">{space.kicker}</p>
                <h3 className="display mt-5 text-[clamp(1.8rem,2.8vw,2.6rem)] leading-tight">
                  {space.headline}
                </h3>
                <p className="mt-6 text-[1.02rem] leading-relaxed font-light text-stone-dark">
                  {space.description}
                </p>

                <ul className="mt-8 flex flex-col gap-0">
                  {space.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-4 border-t border-line py-3.5 text-[0.95rem] font-light text-ink/80"
                    >
                      <span className="mt-[0.55rem] h-px w-5 shrink-0 bg-carmine" />
                      {h}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contacto"
                  className="lux-sheen group relative mt-10 inline-flex cursor-pointer items-center gap-3 overflow-hidden bg-ink px-8 py-4 text-[0.78rem] tracking-[0.22em] text-bone uppercase"
                >
                  <span className="absolute inset-0 -translate-x-full bg-carmine transition-transform duration-500 ease-out group-hover:translate-x-0" />
                  <span className="relative">Consultar por este espacio</span>
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Programa propuesto · bloque de ancho completo, independiente de la ficha lateral */}
        {space.program && (
          <AnimatePresence mode="wait">
            <motion.div
              key={space.id + "-programa"}
              data-reveal
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="mt-16 border-t border-line pt-12 md:mt-20 md:pt-14"
            >
              <p className="eyebrow text-stone">
                Programa propuesto · llave en mano Milla Zero
              </p>
              <div className="mt-6 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3 lg:grid-cols-6">
                {space.program.map((p) => (
                  <div key={p.name} className="bg-bone p-4 sm:p-5">
                    <p className="text-[0.88rem] font-medium text-ink">
                      {p.name}
                    </p>
                    <p className="mt-1 text-[0.78rem] font-light text-stone-dark">
                      {p.detail}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Propuesta integral de interiorismo - pisos 1 a 3 */}
        <ProposalSet />
      </div>
    </section>
  );
}
