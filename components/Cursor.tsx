"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

/**
 * Cursor editorial: punto + aro con retardo elástico (GSAP quickTo).
 * Solo en dispositivos con puntero fino; se amplía sobre elementos interactivos.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const dot = dotRef.current!;
    const ring = ringRef.current!;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });

    const dx = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power2.out" });
    const dy = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power2.out" });
    const rx = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const ry = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    let shown = false;
    const onMove = (e: PointerEvent) => {
      if (!shown) {
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
        shown = true;
      }
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };

    const onOver = (e: PointerEvent) => {
      const interactive = (e.target as HTMLElement).closest?.(
        "a, button, [role='tab'], [role='option']",
      );
      gsap.to(ring, {
        scale: interactive ? 2.1 : 1,
        opacity: interactive ? 0.9 : 1,
        duration: 0.35,
        ease: "power3.out",
      });
    };

    const onLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.25 });
      shown = false;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[90] hidden [@media(pointer:fine)]:block"
    >
      <div
        ref={dotRef}
        className="fixed top-0 left-0 h-1.5 w-1.5 rounded-full bg-bone mix-blend-difference"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 h-9 w-9 rounded-full border border-bone/60 mix-blend-difference"
      />
    </div>
  );
}
