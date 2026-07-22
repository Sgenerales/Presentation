"use client";

import { A, STATS } from "@/lib/tower";
import { Counter, Eyebrow, Img, Reveal, RevealLines } from "./ui";

export default function Manifesto() {
  return (
    <section className="relative bg-bone text-ink">
      <div className="mx-auto max-w-[1440px] px-6 py-28 md:px-12 md:py-40">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow tone="dark">01 · Propiedad única, gestión directa</Eyebrow>
            </Reveal>
            <RevealLines
              className="display mt-10 text-[clamp(2.2rem,4.6vw,4.2rem)] text-ink"
              delay={0.1}
              lines={[
                <span key="1">Una torre privada.</span>,
                <span key="2">
                  Un estándar <em className="display-italic">continuo.</em>
                </span>,
              ]}
            />
            <Reveal delay={0.35} className="mt-10 max-w-xl">
              <p className="text-[1.02rem] leading-relaxed font-light text-stone-dark">
                Milla Zero es una propiedad horizontal mono-propietaria:
                pertenece íntegramente a Bienes Raíces ITC Tropical, del grupo
                Tropical Tours, fundado en 1980. Un solo dueño significa un
                solo estándar, y la certeza de que sus condiciones nunca se
                verán ni negociarán frente a otro arrendatario.
              </p>
            </Reveal>
            <Reveal delay={0.45} className="mt-8 max-w-xl">
              <p className="text-[1.02rem] leading-relaxed font-light text-stone-dark">
                Sus ocupantes son grandes corporaciones (casi todas
                internacionales) unidas por el mismo compromiso: sostener un
                edificio de alto valor, alto apego a la normativa y cultura de
                compliance. Los espacios se entregan llave en mano, con orden,
                privacidad y representatividad.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.2} y={48}>
              <figure className="img-zoom relative">
                <Img
                  src={`${A}/facade-estropical.jpg`}
                  alt="Fachada de Milla Zero con la señalética de estropical.com"
                  className="aspect-square w-full object-cover object-top"
                />
                <figcaption className="eyebrow mt-4 flex justify-between text-stone">
                  <span>Fachada oriente</span>
                  <span>Doble vidriado hermético</span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>

        <div className="mt-28 border-t border-line pt-14 md:mt-36">
          <Reveal>
            <p className="eyebrow mb-12 text-stone">Indicadores del edificio</p>
          </Reveal>
          <div className="grid grid-cols-2 gap-x-8 gap-y-14 md:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="stat-frame pb-4">
                  <div className="display text-[clamp(2.6rem,5vw,4.6rem)] text-ink tabular-nums">
                    <Counter
                      value={s.value}
                      suffix={s.suffix}
                      delay={0.1 + i * 0.12}
                      duration={2.4}
                    />
                  </div>
                  <p className="eyebrow mt-3 text-stone">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
