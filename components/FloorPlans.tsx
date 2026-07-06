"use client";

import { useState } from "react";

/**
 * Planos vectoriales interactivos — reemplazan a los escaneos pixelados.
 * Redibujados a partir de los planos reales del edificio, con hover por
 * ambiente y lenguaje de lámina arquitectónica (grilla, norte, escala).
 */

const INK = "#0a0e18";
const STONE = "#8f8a7e";
const CARMINE = "#a8212e";

function Sheet({
  children,
  title,
  code,
  legend,
}: {
  children: React.ReactNode;
  title: string;
  code: string;
  legend: string;
}) {
  return (
    <div className="relative w-full border border-line bg-[#faf8f3]">
      <svg
        viewBox="0 0 1200 880"
        className="h-auto w-full"
        role="img"
        aria-label={title}
      >
        {/* Grilla técnica */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke={INK} strokeOpacity="0.05" strokeWidth="1" />
          </pattern>
          <pattern id="hatch" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="9" stroke={STONE} strokeOpacity="0.5" strokeWidth="1.1" />
          </pattern>
          <pattern id="hatchSoft" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="14" stroke={STONE} strokeOpacity="0.28" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="1200" height="880" fill="url(#grid)" />
        {children}

        {/* Norte */}
        <g transform="translate(1120, 90)" opacity="0.75">
          <circle r="26" fill="none" stroke={INK} strokeOpacity="0.35" strokeWidth="1.2" />
          <path d="M0 -16 L7 10 L0 4 L-7 10 Z" fill={CARMINE} />
          <text y="45" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13" letterSpacing="2" fill={INK} opacity="0.6">N</text>
        </g>

        {/* Escala gráfica */}
        <g transform="translate(80, 836)" opacity="0.7">
          <line x1="0" y1="0" x2="160" y2="0" stroke={INK} strokeWidth="1.4" />
          {[0, 40, 80, 120, 160].map((x) => (
            <line key={x} x1={x} y1="-5" x2={x} y2="5" stroke={INK} strokeWidth="1.2" />
          ))}
          <rect x="0" y="-4" width="40" height="4" fill={INK} />
          <rect x="80" y="-4" width="40" height="4" fill={INK} />
          <text x="0" y="24" fontFamily="var(--font-mono)" fontSize="12" letterSpacing="1.5" fill={INK} opacity="0.75">0</text>
          <text x="152" y="24" fontFamily="var(--font-mono)" fontSize="12" letterSpacing="1.5" fill={INK} opacity="0.75">10 m</text>
        </g>

        {/* Rótulo de lámina */}
        <g transform="translate(1120, 836)" textAnchor="end" opacity="0.8">
          <text fontFamily="var(--font-mono)" fontSize="13" letterSpacing="2.5" fill={INK}>
            ITC TOWER · {code}
          </text>
          <text y="22" fontFamily="var(--font-mono)" fontSize="11" letterSpacing="2" fill={INK} opacity="0.55">
            {title.toUpperCase()}
          </text>
        </g>
      </svg>
      <p className="border-t border-line px-5 py-3 font-mono text-[0.62rem] tracking-[0.16em] text-stone-dark uppercase">
        {legend}
      </p>
    </div>
  );
}

interface Room {
  id: string;
  name: string;
  meta?: string;
  d: string; // path
  kind: "focus" | "core" | "terrace" | "roof" | "hall";
  label?: { x: number; y: number; size?: number; vertical?: boolean };
}

const P8_ROOMS: Room[] = [
  {
    id: "modulo",
    name: "Ampliación Oficina Nº1",
    meta: "183,17 m² · planta libre",
    d: "M140 200 L300 200 L300 130 L640 130 L640 550 L140 550 Z",
    kind: "focus",
    label: { x: 390, y: 330 },
  },
  {
    id: "roof",
    name: "Cubierta 7º piso",
    meta: "nivel inferior",
    d: "M660 130 L940 130 L940 550 L660 550 Z",
    kind: "roof",
    label: { x: 800, y: 340, size: 15 },
  },
  {
    id: "terraza",
    name: "Terraza exterior",
    meta: "uso exclusivo Of. Nº1",
    d: "M960 180 L1100 180 L1100 720 L960 720 Z",
    kind: "terrace",
    label: { x: 1030, y: 450, size: 15, vertical: true },
  },
  { id: "cocina", name: "Cocina", d: "M140 570 L255 570 L255 655 L140 655 Z", kind: "core", label: { x: 197, y: 618, size: 13 } },
  { id: "bdamas", name: "Baño Damas", d: "M270 570 L430 570 L430 655 L270 655 Z", kind: "core", label: { x: 350, y: 618, size: 13 } },
  { id: "ctec", name: "C. Técnico", d: "M445 570 L510 570 L510 655 L445 655 Z", kind: "core", label: { x: 477, y: 618, size: 11 } },
  { id: "asc", name: "Ascensores", d: "M525 570 L640 570 L640 655 L525 655 Z", kind: "core", label: { x: 582, y: 618, size: 13 } },
  { id: "hall", name: "Hall de distribución", d: "M660 570 L940 570 L940 720 L660 720 Z", kind: "hall", label: { x: 800, y: 650, size: 14 } },
  { id: "pasillo", name: "Pasillo centralizado", d: "M140 670 L640 670 L640 700 L140 700 Z", kind: "hall", label: { x: 390, y: 690, size: 11 } },
  { id: "deposito", name: "Depósito", d: "M140 715 L255 715 L255 790 L140 790 Z", kind: "core", label: { x: 197, y: 758, size: 13 } },
  { id: "bvarones", name: "Baño Varones", d: "M270 715 L430 715 L430 790 L270 790 Z", kind: "core", label: { x: 350, y: 758, size: 13 } },
  { id: "escalera", name: "Escalera", d: "M445 715 L560 715 L560 790 L445 790 Z", kind: "core", label: { x: 502, y: 758, size: 13 } },
  { id: "asc2", name: "Ascensor", d: "M575 715 L640 715 L640 790 L575 790 Z", kind: "core", label: { x: 607, y: 758, size: 11 } },
];

function roomFill(kind: Room["kind"], hovered: boolean) {
  switch (kind) {
    case "focus":
      return hovered ? "rgba(168,33,46,0.20)" : "rgba(168,33,46,0.10)";
    case "terrace":
      return "url(#hatch)";
    case "roof":
      return "url(#hatchSoft)";
    case "hall":
      return hovered ? "rgba(10,14,24,0.10)" : "rgba(10,14,24,0.04)";
    default:
      return hovered ? "rgba(10,14,24,0.14)" : "rgba(10,14,24,0.07)";
  }
}

export function PlanP8() {
  const [hover, setHover] = useState<Room | null>(null);
  const active = hover ?? P8_ROOMS[0];

  return (
    <div>
      <Sheet
        title="Piso 8 · Lado Sur"
        code="P8-S"
        legend={`${active.name}${active.meta ? " — " + active.meta : ""}`}
      >
        {/* Contorno general */}
        <path
          d="M120 110 L1120 110 L1120 740 L940 740 L940 810 L120 810 Z"
          fill="none"
          stroke={INK}
          strokeWidth="3"
          strokeOpacity="0.85"
        />
        {P8_ROOMS.map((r) => {
          const hovered = hover?.id === r.id;
          return (
            <g
              key={r.id}
              onMouseEnter={() => setHover(r)}
              onMouseLeave={() => setHover(null)}
              style={{ cursor: "pointer" }}
            >
              <path
                d={r.d}
                fill={roomFill(r.kind, hovered)}
                stroke={r.kind === "focus" ? CARMINE : INK}
                strokeOpacity={r.kind === "focus" ? 0.85 : 0.4}
                strokeWidth={r.kind === "focus" ? 2.4 : 1.3}
                style={{ transition: "fill 0.3s ease" }}
              />
              {r.label && (
                <text
                  x={r.label.x}
                  y={r.label.y}
                  textAnchor="middle"
                  fontFamily="var(--font-mono)"
                  fontSize={r.label.size ?? 17}
                  letterSpacing="1.6"
                  fill={r.kind === "focus" ? CARMINE : INK}
                  fillOpacity={r.kind === "focus" ? 0.95 : hovered ? 0.9 : 0.55}
                  transform={
                    r.label.vertical
                      ? `rotate(-90 ${r.label.x} ${r.label.y})`
                      : undefined
                  }
                  style={{ textTransform: "uppercase", transition: "fill-opacity 0.3s" }}
                >
                  {r.name}
                </text>
              )}
            </g>
          );
        })}
        {/* Área del módulo */}
        <text x="390" y="365" textAnchor="middle" fontFamily="var(--font-display)" fontSize="34" fill={CARMINE} fillOpacity="0.9">
          183,17 m²
        </text>
      </Sheet>
    </div>
  );
}

export function PlanTipo({
  norte,
  sur,
  focus,
}: {
  norte: "libre" | "ocupado";
  sur: "libre" | "ocupado";
  focus?: "norte" | "sur" | "ambas";
}) {
  const [hover, setHover] = useState<string | null>(null);

  const wing = (
    id: "norte" | "sur",
    status: "libre" | "ocupado",
    y: number,
    h: number,
    labelY: number,
  ) => {
    const isFocus = focus === "ambas" || focus === id;
    const hovered = hover === id;
    const free = status === "libre";
    return (
      <g
        onMouseEnter={() => setHover(id)}
        onMouseLeave={() => setHover(null)}
        style={{ cursor: "pointer" }}
      >
        <rect
          x="240"
          y={y}
          width="720"
          height={h}
          fill={
            free
              ? hovered
                ? "rgba(168,33,46,0.20)"
                : isFocus
                  ? "rgba(168,33,46,0.11)"
                  : "rgba(168,33,46,0.06)"
              : hovered
                ? "rgba(10,14,24,0.10)"
                : "rgba(10,14,24,0.05)"
          }
          stroke={free ? CARMINE : INK}
          strokeOpacity={free ? 0.8 : 0.4}
          strokeWidth={free ? 2.4 : 1.3}
          style={{ transition: "fill 0.3s ease" }}
        />
        <text
          x="600"
          y={labelY - 22}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="15"
          letterSpacing="3"
          fill={INK}
          fillOpacity="0.6"
          style={{ textTransform: "uppercase" }}
        >
          Ala {id === "norte" ? "Norte" : "Sur"}
        </text>
        <text
          x="600"
          y={labelY + 14}
          textAnchor="middle"
          fontFamily="var(--font-display)"
          fontSize="30"
          fill={free ? CARMINE : INK}
          fillOpacity={free ? 0.95 : 0.45}
        >
          {free ? "Disponible" : "Ocupada"}
        </text>
        <text
          x="600"
          y={labelY + 44}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="12.5"
          letterSpacing="2"
          fill={INK}
          fillOpacity="0.5"
          style={{ textTransform: "uppercase" }}
        >
          Planta libre de columnas
        </text>
      </g>
    );
  };

  const legend =
    hover === "norte"
      ? `Ala Norte — ${norte === "libre" ? "disponible · llave en mano" : "ocupada"}`
      : hover === "sur"
        ? `Ala Sur — ${sur === "libre" ? "disponible · llave en mano" : "ocupada"}`
        : hover === "core"
          ? "Núcleo central — ascensores, sanitarios y técnica fuera del área de oficina"
          : "Planta tipo · Torre Mayor — pase el cursor por las alas";

  return (
    <Sheet title="Planta tipo · Torre Mayor" code="PT" legend={legend}>
      {/* Contorno */}
      <rect x="240" y="100" width="720" height="680" fill="none" stroke={INK} strokeWidth="3" strokeOpacity="0.85" />

      {wing("norte", norte, 100, 250, 230)}

      {/* Núcleo central */}
      <g
        onMouseEnter={() => setHover("core")}
        onMouseLeave={() => setHover(null)}
        style={{ cursor: "pointer" }}
      >
        <rect
          x="240"
          y="350"
          width="720"
          height="180"
          fill={hover === "core" ? "rgba(10,14,24,0.13)" : "rgba(10,14,24,0.07)"}
          stroke={INK}
          strokeOpacity="0.5"
          strokeWidth="1.4"
          style={{ transition: "fill 0.3s ease" }}
        />
        {/* Sub-bloques del núcleo */}
        {[
          { x: 265, w: 150, t: "Sanit. D" },
          { x: 430, w: 150, t: "Ascensores ×3" },
          { x: 595, w: 150, t: "Sanit. V" },
          { x: 760, w: 175, t: "Técnica · AC" },
        ].map((b) => (
          <g key={b.t}>
            <rect x={b.x} y="375" width={b.w} height="130" fill="rgba(10,14,24,0.05)" stroke={INK} strokeOpacity="0.35" strokeWidth="1.1" />
            <text x={b.x + b.w / 2} y="445" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12.5" letterSpacing="1.5" fill={INK} fillOpacity="0.6" style={{ textTransform: "uppercase" }}>
              {b.t}
            </text>
          </g>
        ))}
      </g>

      {wing("sur", sur, 530, 250, 660)}

      {/* Balcón sur */}
      <rect x="560" y="780" width="80" height="26" fill="url(#hatchSoft)" stroke={INK} strokeOpacity="0.4" strokeWidth="1.2" />
      <text x="600" y="825" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" letterSpacing="1.5" fill={INK} fillOpacity="0.45" style={{ textTransform: "uppercase" }}>
        Balcón
      </text>
    </Sheet>
  );
}
