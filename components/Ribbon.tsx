"use client";

/**
 * Cinta carmín rotativa — sello editorial entre el hero y el manifiesto.
 * Alterna serif italic y mono, al estilo de las bandas de los grandes
 * proyectos inmobiliarios.
 */
const ITEMS = [
  { t: "Boutique corporativo", mono: false },
  { t: "Mono-propietario", mono: true },
  { t: "100% corporativo", mono: false },
  { t: "Compliance", mono: true },
  { t: "Milla Zero", mono: false },
  { t: "Equipetrol Norte", mono: true },
];

export default function Ribbon() {
  const row = ITEMS.map((it, i) => (
    <span key={i} className="flex shrink-0 items-center">
      <span
        className={`whitespace-nowrap px-10 md:px-14 ${
          it.mono
            ? "font-mono text-[0.72rem] tracking-[0.3em] uppercase text-bone/75"
            : "display-italic text-[1.5rem] text-bone md:text-[1.8rem]"
        }`}
      >
        {it.t}
      </span>
      <span className="h-1 w-1 shrink-0 rotate-45 bg-bone/50" />
    </span>
  ));

  return (
    <div className="relative z-10 -my-6 -rotate-1 md:-my-8">
      <div className="overflow-hidden border-y border-ink/30 bg-carmine py-4 shadow-[0_20px_60px_rgba(10,14,24,0.35)] md:py-5">
        <div className="marquee-track flex w-max items-center">
          <div className="flex items-center">{row}</div>
          <div className="flex items-center" aria-hidden>
            {row}
          </div>
        </div>
      </div>
    </div>
  );
}
