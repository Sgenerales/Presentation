"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export interface TourScene {
  type: "equirect" | "flat";
  src: string;
  label: string;
  note?: string;
}

/**
 * Visor inmersivo con three.js — estándar urbania3d.
 * - "equirect": panorama 360° real (esfera invertida), drag + inercia + zoom.
 * - "flat": render proyectado en superficie cilíndrica sutil — permite
 *   "mirar dentro" de un render normal con parallax, sin distorsionarlo.
 * Se inicializa solo al entrar en viewport y libera recursos al salir.
 */
export default function Tour360({
  scenes,
  className = "",
}: {
  scenes: TourScene[];
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [sceneIdx, setSceneIdx] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isFull, setIsFull] = useState(false);

  const safeSceneIdx = Math.min(sceneIdx, Math.max(scenes.length - 1, 0));
  const scene = scenes[safeSceneIdx];

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas || !scene) return;

    let disposed = false;
    let raf = 0;
    let renderer: THREE.WebGLRenderer | null = null;
    let tex: THREE.Texture | null = null;
    let geo: THREE.BufferGeometry | null = null;
    let mat: THREE.MeshBasicMaterial | null = null;

    const three = new THREE.Scene();
    three.background = new THREE.Color(0x0a0e18);
    const camera = new THREE.PerspectiveCamera(70, 16 / 9, 0.1, 200);
    camera.position.set(0, 0, 0.01);

    const isEqui = scene.type === "equirect";

    // Estado de vista — el contenido queda centrado en +Z (lon 90)
    let lon = 90;
    let lat = 0;
    let vLon = 0;
    let vLat = 0;
    let targetFov = isEqui ? 78 : 62;
    const arc = 2.1; // radianes visibles del cilindro para renders
    const maxLonFlat = THREE.MathUtils.radToDeg(arc / 2) - 26;

    setLoading(true);
    const loader = new THREE.TextureLoader();
    loader.load(scene.src, (t) => {
      if (disposed) return;
      tex = t;
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 4;

      if (isEqui) {
        geo = new THREE.SphereGeometry(60, 72, 48);
        (geo as THREE.SphereGeometry).scale(-1, 1, 1);
        mat = new THREE.MeshBasicMaterial({ map: t });
        three.add(new THREE.Mesh(geo, mat));
      } else {
        const img = t.image as HTMLImageElement;
        const r = 42;
        const width = r * arc;
        const height = width * (img.height / img.width);
        // Segmento centrado en +Z (θ=0) — coincide con la mirada inicial
        // de la cámara (lon 90). El espejado en X corrige la orientación
        // del texto al verse desde adentro.
        geo = new THREE.CylinderGeometry(
          r, r, height, 64, 1, true,
          -arc / 2, arc,
        );
        (geo as THREE.CylinderGeometry).scale(-1, 1, 1);
        mat = new THREE.MeshBasicMaterial({ map: t, side: THREE.DoubleSide });
        three.add(new THREE.Mesh(geo, mat));
      }
      setLoading(false);
    });

    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const resize = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      renderer!.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    // Interacción
    let dragging = false;
    let px = 0;
    let py = 0;
    let auto = isEqui;

    const onDown = (e: PointerEvent) => {
      dragging = true;
      auto = false;
      setInteracted(true);
      px = e.clientX;
      py = e.clientY;
      canvas.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - px;
      const dy = e.clientY - py;
      px = e.clientX;
      py = e.clientY;
      const k = camera.fov / 600;
      vLon = -dx * k * 2.2;
      vLat = dy * k * 2.2;
      lon += vLon;
      lat += vLat;
    };
    const onUp = () => (dragging = false);
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setInteracted(true);
      targetFov = THREE.MathUtils.clamp(
        targetFov + e.deltaY * 0.04,
        isEqui ? 42 : 46,
        isEqui ? 92 : 70,
      );
    };

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.addEventListener("wheel", onWheel, { passive: false });

    // Render solo cuando está en viewport
    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => (visible = entry.isIntersecting),
      { threshold: 0.05 },
    );
    io.observe(wrap);

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible || !renderer) return;

      if (auto) lon += 0.028;
      if (!dragging) {
        vLon *= 0.93;
        vLat *= 0.93;
        lon += vLon;
        lat += vLat;
      }

      const maxLat = isEqui ? 72 : 22;
      lat = THREE.MathUtils.clamp(lat, -maxLat, maxLat);
      if (!isEqui)
        lon = THREE.MathUtils.clamp(lon, 90 - maxLonFlat, 90 + maxLonFlat);

      camera.fov += (targetFov - camera.fov) * 0.08;
      camera.updateProjectionMatrix();

      const phi = THREE.MathUtils.degToRad(90 - lat);
      const theta = THREE.MathUtils.degToRad(lon);
      camera.lookAt(
        Math.sin(phi) * Math.cos(theta),
        Math.cos(phi),
        Math.sin(phi) * Math.sin(theta),
      );
      renderer.render(three, camera);
    };
    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("wheel", onWheel);
      tex?.dispose();
      geo?.dispose();
      mat?.dispose();
      renderer?.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene?.src, scene?.type]);

  // Fullscreen
  const toggleFull = () => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      wrap.requestFullscreen?.();
    }
  };
  useEffect(() => {
    const onFs = () => setIsFull(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  if (!scene) return null;

  return (
    <div
      ref={wrapRef}
      className={`group relative aspect-[16/10] w-full overflow-hidden bg-ink select-none ${className} ${
        isFull ? "aspect-auto" : ""
      }`}
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full cursor-grab touch-none active:cursor-grabbing"
        aria-label={`Vista inmersiva: ${scene.label}`}
      />

      {/* Cargando */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-ink">
          <span className="eyebrow animate-pulse text-stone">
            Cargando vista…
          </span>
        </div>
      )}

      {/* Etiquetas */}
      <div className="pointer-events-none absolute top-4 left-4 flex flex-col gap-1.5">
        <span className="eyebrow w-fit bg-ink/70 px-3.5 py-2 text-[0.66rem] text-bone backdrop-blur-sm">
          {scene.type === "equirect" ? "Tour 360°" : "Vista inmersiva"} ·{" "}
          {scene.label}
        </span>
        {scene.note && (
          <span className="w-fit bg-ink/60 px-3.5 py-1.5 font-mono text-[0.64rem] tracking-[0.14em] text-bone/55 uppercase backdrop-blur-sm">
            {scene.note}
          </span>
        )}
      </div>

      {/* Hint de arrastre */}
      {!interacted && !loading && (
        <div className="pointer-events-none absolute inset-x-0 bottom-20 flex justify-center px-4 sm:bottom-16">
          <span className="flex items-center gap-3 bg-ink/70 px-4 py-2.5 font-mono text-[0.62rem] tracking-[0.14em] text-bone/85 uppercase backdrop-blur-sm sm:px-5 sm:text-[0.68rem] sm:tracking-[0.22em]">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M4 12h16M4 12l4-4M4 12l4 4M20 12l-4-4M20 12l-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="sm:hidden">Deslice para explorar</span>
            <span className="hidden sm:inline">Arrastre para explorar · rueda para acercar</span>
          </span>
        </div>
      )}

      {/* Fullscreen */}
      <button
        onClick={toggleFull}
        aria-label={isFull ? "Salir de pantalla completa" : "Pantalla completa"}
        className="absolute top-4 right-4 flex h-11 w-11 cursor-pointer items-center justify-center bg-ink/70 text-bone/80 backdrop-blur-sm transition-colors hover:text-bone"
      >
        {isFull ? (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {/* Selector de escenas */}
      {scenes.length > 1 && (
        <div className="absolute inset-x-0 bottom-4 flex flex-wrap justify-center gap-2 px-4">
          {scenes.map((s, i) => (
            <button
              key={s.src + i}
              onClick={() => {
                setSceneIdx(i);
                setInteracted(false);
              }}
              aria-pressed={i === safeSceneIdx}
              className={`min-h-11 cursor-pointer touch-manipulation border px-3 py-2 font-mono text-[0.6rem] tracking-[0.1em] uppercase backdrop-blur-sm transition-all duration-300 sm:px-4 sm:text-[0.65rem] sm:tracking-[0.16em] ${
                i === safeSceneIdx
                  ? "border-carmine bg-ink/80 text-bone"
                  : "border-bone/20 bg-ink/55 text-bone/60 hover:text-bone"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
