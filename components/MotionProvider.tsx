"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * La landing es una pieza de presentación: las animaciones son parte del
 * mensaje. `reducedMotion="never"` evita que el ajuste de accesibilidad del
 * OS (muy común activado por defecto en Windows) congele los reveals,
 * contadores y cintas.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="never">{children}</MotionConfig>;
}
