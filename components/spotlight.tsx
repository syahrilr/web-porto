"use client";

import { useEffect, useRef } from "react";

// ponytail: writes CSS vars straight to the element, no React state, no re-render per mouse move
export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      ref.current?.style.setProperty("--x", `${e.clientX}px`);
      ref.current?.style.setProperty("--y", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 motion-reduce:hidden [@media(pointer:coarse)]:hidden"
      style={{ background: "radial-gradient(600px at var(--x, -100%) var(--y, -100%), rgba(45,212,191,0.08), transparent 80%)" }}
    />
  );
}
