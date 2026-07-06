"use client";

import { AMENITIES } from "@/lib/tower";
import { Eyebrow, Img, Reveal } from "./ui";

/**
 * Experiencia del edificio — galería editorial asimétrica.
 * Patrón de 6 tarjetas con ritmo 2/3 + 1/3 alternado (estilo One Vanderbilt).
 */
export default function Amenities() {
  return (
    <section id="experiencia" className="grain relative bg-ink py-28 md:py-40">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <Reveal>
          <Eyebrow>La experiencia — servicios del edificio</Eyebrow>
        </Reveal>
        <div className="mt-10 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <Reveal delay={0.1}>
            <h2 className="display max-w-2xl text-[clamp(2.2rem,4.6vw,4.2rem)] text-bone">
              Más que oficinas,{" "}
              <em className="display-italic text-bone/70">una operación.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="max-w-sm text-[0.95rem] leading-relaxed font-light text-bone/60">
              Todos los servicios — recepción, limpieza, seguridad y
              mantenimiento — se incluyen en la expensa mensual del espacio.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:mt-24 md:grid-cols-6 md:gap-8">
          {AMENITIES.map((a, i) => {
            // Ritmo editorial: ancha, angosta / angosta, ancha / ancha, angosta
            const wide = i % 4 === 0 || i % 4 === 3;
            return (
              <Reveal
                key={a.title}
                delay={(i % 2) * 0.12}
                className={wide ? "md:col-span-4" : "md:col-span-2"}
              >
                <figure className="group">
                  <div className="img-zoom relative bg-ink-soft">
                    <Img
                      src={a.img}
                      alt={a.title}
                      className={`w-full object-cover ${
                        wide ? "aspect-[16/9]" : "aspect-[4/5] md:aspect-[3/4]"
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-50" />
                    <span className="eyebrow absolute bottom-5 left-5 text-[0.58rem] text-bone/80">
                      {a.meta}
                    </span>
                  </div>
                  <figcaption className="mt-5">
                    <h3 className="display text-[1.5rem] text-bone">
                      {a.title}
                    </h3>
                    <p className="mt-2 max-w-md text-[0.88rem] leading-relaxed font-light text-bone/55">
                      {a.desc}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
