"use client";

import {
  motion,
  useInView,
  useMotionValue,
  animate,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Aparición suave al entrar en viewport. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      data-reveal
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-40px" }}
      transition={{ duration: 0.65, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Revelado línea a línea para titulares editoriales.
 *  Con "reducir movimiento" activo cae a un fade simple — las animaciones
 *  solo-transform se descartan y dejarían el texto oculto. */
export function RevealLines({
  lines,
  className = "",
  lineClassName = "",
  delay = 0,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
}) {
  return (
    <div className={className}>
      {lines.map((line, i) => (
        <div key={i} className="overflow-hidden">
          <motion.div
            data-reveal
            initial={{ y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.85, delay: delay + i * 0.09, ease: EASE }}
            className={lineClassName}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </div>
  );
}

/** Contador animado al entrar en viewport. */
export function Counter({
  value,
  suffix = "",
  className = "",
  delay = 0,
  duration = 2.2,
}: {
  value: number;
  suffix?: string;
  className?: string;
  delay?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const [text, setText] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, {
      duration,
      delay,
      ease: EASE,
      onUpdate: (v) => setText(Math.round(v).toLocaleString("es-BO")),
    });
    return controls.stop;
  }, [inView, value, mv, delay, duration]);

  return (
    <span ref={ref} className={className}>
      {text}
      {suffix}
    </span>
  );
}

/** Imagen con fallback elegante (degradado tinta) si el asset falta. */
export function Img({
  src,
  alt,
  className = "",
  style,
  eager = false,
}: {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  eager?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        style={style}
        className={`bg-gradient-to-br from-ink-mist via-ink-soft to-ink ${className}`}
      />
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      style={style}
      loading={eager ? "eager" : "lazy"}
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

/** Etiqueta arquitectónica con línea. */
export function Eyebrow({
  children,
  className = "",
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark" | "carmine";
}) {
  const color =
    tone === "carmine"
      ? "text-carmine"
      : tone === "dark"
        ? "text-stone-dark"
        : "text-stone";
  return (
    <div className={`flex items-center gap-4 ${color} ${className}`}>
      <span className="hairline w-10 shrink-0" style={{ opacity: 0.5 }} />
      <span className="eyebrow">{children}</span>
    </div>
  );
}
