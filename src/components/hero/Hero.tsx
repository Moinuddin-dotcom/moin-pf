"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

import { Globe } from "@/components/ui/globe";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { VideoText } from "@/components/ui/video-text";
import { Highlighter } from "@/components/ui/highlighter";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const handleViewWork = () => {
    const projectsSection = document.querySelector("#projects");

    if (!projectsSection) return;

    projectsSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useLayoutEffect(() => {
    const hero = heroRef.current;
    const globe = globeRef.current;
    const content = contentRef.current;

    if (!hero || !globe || !content) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const context = gsap.context(() => {
      const elements = content.children;

      const timeline = gsap.timeline({
        delay: 0.15,
      });

      timeline
        .fromTo(
          globe,
          {
            opacity: 0,
            scale: 0.85,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 1.4,
            ease: "power3.out",
          },
        )
        .fromTo(
          elements,
          {
            opacity: 0,
            y: 35,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.8",
        );
    }, hero);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0a0a] px-6 mt-6 md:mt-0 lg:mt-4 xl:mt-2 text-white"
    >
      {/* Globe Background */}
      <div
        ref={globeRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="relative h-[800px] w-[800px] md:h-[1000px] md:w-[1000px] lg:h-[1200px] lg:w-[1200px]">
          <Globe className="h-full w-full scale-125 opacity-70" />
        </div>
      </div>

      {/* Dark Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[#0a0a0a]/45"
      />

      {/* Accent Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00ffb2]/10 blur-[140px]"
      />

      {/* Hero Content */}
      <div
        ref={contentRef}
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center"
      >
        <p className="mb-5 text-sm font-medium uppercase tracking-[0.35em] text-white/60">
          Hello, I'm
        </p>

        <h1 className="text-5xl font-semibold leading-[0.95] tracking-[-0.05em] sm:text-6xl md:text-7xl lg:text-8xl">
          Md. Moinuddin
          <br />
          Chowdhury
        </h1>

        {/* Video Text */}
        <div className="mt-8 h-[100px] w-full sm:h-[120px] md:h-[150px]">
          <VideoText
            src="https://cdn.magicui.design/ocean-small.webm"
            fontSize="clamp(48px, 9vw, 110px)"
            fontWeight={800}
            className="h-full w-full"
          >
            BUILD. SHIP. SCALE.
          </VideoText>
        </div>

        <p className="mt-7 text-xl font-medium text-[#00ffb2] sm:text-2xl">
          Frontend / Full-Stack Developer
        </p>

        <p className="mt-6 max-w-3xl text-base leading-7 text-white/65 sm:text-lg">
          I build{" "}
          <Highlighter
            action="underline"
            color="#00ffb2"
            strokeWidth={2}
            animationDuration={800}
            iterations={2}
            padding={2}
          >
            scalable, production-ready web applications
          </Highlighter>{" "}
          across the full stack — from interactive interfaces and APIs to
          databases, authentication, real-time systems, and deployment — using
          React, Next.js, TypeScript, Node.js, NestJS, PostgreSQL, MongoDB,
          Prisma, Redis, and Docker.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <InteractiveHoverButton onClick={handleViewWork}>
            View My Work
          </InteractiveHoverButton>

          <InteractiveHoverButton
            href="/Moinuddin_Chowdhury_Resume.pdf"
            download="Md-Moinuddin-Chowdhury-Resume.pdf"
          >
            Download Resume
          </InteractiveHoverButton>
        </div>
      </div>
    </section>
  );
}
