"use client";

import { useEffect, useState } from "react";

export function MotionLayer() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);

    const reveals = [
      ...document.querySelectorAll<HTMLElement>("[data-reveal]"),
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -6%" },
    );
    reveals.forEach((node) => observer.observe(node));

    const root = document.documentElement;
    const onPointer = (event: PointerEvent) => {
      root.style.setProperty("--pointer-x", `${event.clientX}px`);
      root.style.setProperty("--pointer-y", `${event.clientY}px`);
      root.style.setProperty(
        "--pointer-nx",
        `${event.clientX / window.innerWidth - 0.5}`,
      );
      root.style.setProperty(
        "--pointer-ny",
        `${event.clientY / window.innerHeight - 0.5}`,
      );
    };
    const onScroll = () =>
      root.style.setProperty("--page-scroll", `${window.scrollY}`);

    if (!media.matches) {
      window.addEventListener("pointermove", onPointer, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    return () => {
      media.removeEventListener("change", sync);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      className="motion-layer"
      data-motion-layer
      data-motion={reduced ? "reduced" : "full"}
      aria-hidden="true"
    >
      <span className="cursor-aura" />
      <span className="ambient ambient-one" />
      <span className="ambient ambient-two" />
      <span className="noise" />
    </div>
  );
}
