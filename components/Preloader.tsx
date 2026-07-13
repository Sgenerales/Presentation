"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE } from "./ui";

/**
 * Cortina de entrada cinematográfica: logotipo MILLA ZERO + línea que crece.
 * Breve (~2 s), se omite si el usuario prefiere menos movimiento.
 */
export default function Preloader() {
  const [leaving, setLeaving] = useState(false);
  const [done, setDone] = useState(false);

  // Dos fases: el contenido se desvanece primero, luego la cortina
  // sube con una curva suave, sin corte brusco.
  useEffect(() => {
    const t1 = setTimeout(() => setLeaving(true), 1150);
    const t2 = setTimeout(() => setDone(true), 1500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="preloader-failsafe pointer-events-none fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
          aria-hidden
        >
          <motion.div
            animate={leaving ? { opacity: 0, y: -18 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="flex flex-col items-center"
          >
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: "120%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
              className="flex items-baseline gap-3"
            >
              <span className="font-sans text-3xl font-light tracking-[0.18em] text-bone md:text-4xl">
                MILLA
              </span>
              <span className="font-sans text-3xl font-light tracking-[0.18em] text-carmine-soft md:text-4xl">
                ZERO
              </span>
            </motion.div>
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            className="mt-6 h-px w-48 origin-left bg-bone/25 md:w-64"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="eyebrow mt-6 text-stone"
          >
            Edificio corporativo boutique
          </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
