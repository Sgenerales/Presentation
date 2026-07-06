"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE } from "./ui";

/**
 * Cortina de entrada cinematográfica: logotipo ITC TOWER + línea que crece.
 * Breve (~2 s), se omite si el usuario prefiere menos movimiento.
 */
export default function Preloader() {
  const reduced = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), reduced ? 150 : 2050);
    return () => clearTimeout(t);
  }, [reduced]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="preloader-failsafe pointer-events-none fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
          aria-hidden
        >
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: "120%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
              className="flex items-baseline gap-3"
            >
              <span className="font-sans text-3xl font-light tracking-[0.18em] text-bone md:text-4xl">
                ITC
              </span>
              <span className="font-sans text-3xl font-light tracking-[0.18em] text-carmine-soft md:text-4xl">
                TOWER
              </span>
            </motion.div>
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.35, ease: EASE }}
            className="mt-6 h-px w-48 origin-left bg-bone/25 md:w-64"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="eyebrow mt-6 text-stone"
          >
            Santa Cruz de la Sierra
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
