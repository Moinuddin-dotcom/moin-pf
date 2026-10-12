"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { RetroGrid } from "@/components/ui/retro-grid";

interface WelcomeScreenProps {
  onComplete?: () => void;
}

export function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const welcomeTextRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const welcomeText = welcomeTextRef.current;

    if (!container || !welcomeText) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(container, { autoAlpha: 0 });
      onComplete?.();
      return;
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        onComplete: () => {
          onComplete?.();
        },
      });

      timeline
        .fromTo(
          welcomeText,
          {
            opacity: 0,
            y: 30,
            scale: 0.96,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
          },
        )
        .to({}, { duration: 0.5 })
        .to(welcomeText, {
          opacity: 0,
          y: -30,
          scale: 1.04,
          duration: 0.5,
          ease: "power3.in",
        })
        .to(container, {
          yPercent: -100,
          duration: 0.8,
          ease: "power4.inOut",
        });
    }, container);

    return () => {
      context.revert();
    };
  }, [onComplete]);

  return (
    <section
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden bg-surface"
      aria-label="Welcome to my portfolio"
    >
      <RetroGrid
        angle={65}
        cellSize={50}
        opacity={0.35}
        lightLineColor="#00ffb2"
        darkLineColor="#00ffb2"
      />

      <div
        ref={welcomeTextRef}
        className="relative z-10 px-6 text-center"
      >
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.35em] text-ink/50 sm:text-base">
          Welcome to
        </p>

        <h1 className="text-4xl font-semibold tracking-tight text-ink sm:text-6xl md:text-7xl">
          My Portfolio
        </h1>
      </div>
    </section>
  );
}