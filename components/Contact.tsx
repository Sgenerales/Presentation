"use client";

import { CONTACT } from "@/lib/tower";
import { Eyebrow, Reveal, RevealLines } from "./ui";

export default function Contact() {
  return (
    <>
      {/* CTA final */}
      <section
        id="contacto"
        className="relative border-t border-line bg-bone py-32 text-ink md:py-44"
      >
        <div className="mx-auto max-w-[1440px] px-6 text-center md:px-12">
          <Reveal>
            <Eyebrow tone="dark" className="justify-center">
              07 — Visitas privadas, con cita previa
            </Eyebrow>
          </Reveal>

          <RevealLines
            className="display mx-auto mt-12 text-[clamp(2.6rem,6.5vw,6rem)]"
            delay={0.1}
            lines={[
              <span key="1">Una dirección con presencia</span>,
              <span key="2">
                se conoce <em className="display-italic">en persona.</em>
              </span>,
            ]}
          />

          <Reveal delay={0.35}>
            <p className="mx-auto mt-10 max-w-xl text-[1rem] leading-relaxed font-light text-stone-dark">
              Una visita privada permite recorrer la torre, revisar los espacios
              disponibles y evaluar una implantación a la medida de su operación.
            </p>
          </Reveal>

          <Reveal delay={0.45}>
            <div className="mt-14 flex flex-col items-center justify-center gap-6 sm:flex-row">
              <a
                href={CONTACT.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="lux-sheen group relative inline-flex cursor-pointer items-center gap-3 overflow-hidden bg-ink px-10 py-5 text-[0.8rem] tracking-[0.24em] text-bone uppercase"
              >
                <span className="absolute inset-0 -translate-x-full bg-carmine transition-transform duration-500 ease-out group-hover:translate-x-0" />
                <span className="relative">Ubicar Milla Zero</span>
              </a>
              <span className="font-mono text-[0.7rem] tracking-[0.2em] text-stone-dark uppercase">
                {CONTACT.descriptor} · {CONTACT.city}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-line-faint bg-ink py-16">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <div className="flex flex-col justify-between gap-12 md:flex-row md:items-start">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-sans text-2xl font-light tracking-[0.18em] text-bone">
                  MILLA
                </span>
                <span className="font-sans text-2xl font-light tracking-[0.18em] text-carmine-soft">
                  ZERO
                </span>
              </div>
              <p className="mt-4 max-w-xs text-[0.9rem] leading-relaxed font-light text-bone/65">
                Milla Zero — Edificio ITC Tower. Bienes Raíces ITC Tropical
                S.R.L., una inversión del grupo Tropical Tours, desde 1980.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 sm:gap-12 md:gap-20">
              <div>
                <p className="eyebrow text-stone">Perfil</p>
                <p className="mt-4 text-[0.92rem] leading-relaxed font-light text-bone/75">
                  {CONTACT.descriptor}
                </p>
              </div>
              <div>
                <p className="eyebrow text-stone">Ubicación</p>
                <p className="mt-4 text-[0.92rem] leading-relaxed font-light text-bone/75">
                  {CONTACT.city}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 flex flex-col justify-between gap-4 border-t border-line-faint pt-8 md:flex-row">
            <p className="font-mono text-[0.7rem] tracking-[0.18em] text-bone/55 uppercase">
              © {new Date().getFullYear()} BRITC Tropical S.R.L. — Todos los
              derechos reservados
            </p>
            <p className="font-mono text-[0.7rem] tracking-[0.18em] text-bone/55 uppercase">
              {CONTACT.coords}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
