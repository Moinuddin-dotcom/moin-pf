"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

import { Highlighter } from "@/components/ui/highlighter";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { projects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

export function ProjectShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const activeProjectRef = useRef(0);

  const [activeProject, setActiveProject] = useState(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const track = trackRef.current;

    if (!section || !stage || !track) return;

    const context = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: pin the stage and slide the project track horizontally,
      // so scrolling down moves through the projects from left to right.
      mm.add("(min-width: 768px)", () => {
        const getDistance = () => track.scrollWidth - track.clientWidth;
        const lastIndex = projects.length - 1;

        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: stage,
            // The stage is only as tall as its content, so pin it centred
            // in the viewport (or at the top if it is taller than the screen).
            start: () =>
              stage.offsetHeight < window.innerHeight
                ? "center center"
                : "top top",
            end: () => `+=${getDistance()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            snap:
              lastIndex > 0
                ? {
                    snapTo: 1 / lastIndex,
                    duration: { min: 0.2, max: 0.6 },
                    ease: "power1.inOut",
                  }
                : undefined,

            onUpdate: (self) => {
              const nextIndex = Math.round(self.progress * lastIndex);

              if (nextIndex !== activeProjectRef.current) {
                activeProjectRef.current = nextIndex;
                setActiveProject(nextIndex);
              }
            },
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });

      mm.add("(max-width: 767px)", () => {
        gsap.utils
          .toArray<HTMLElement>(".project-mobile-card")
          .forEach((card) => {
            gsap.fromTo(
              card,
              {
                opacity: 0,
                y: 40,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 85%",
                  toggleActions: "play none none reverse",
                },
              },
            );
          });
      });

      return () => mm.revert();
    }, section);

    return () => context.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="projects"
        className="relative bg-surface text-ink"
      >
        {/* Desktop pinned horizontal stage */}
        <div
          ref={stageRef}
          className="relative hidden overflow-hidden py-12 md:block"
        >
          {/* Heading and project counter */}
          <div className="pointer-events-none">
            <div className="mx-auto flex max-w-7xl items-end justify-between px-6">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-brand/70">
                Selected Work
              </p>

              <div className="flex items-end gap-2">
                <span className="text-5xl font-semibold tracking-[-0.06em] lg:text-6xl">
                  {projects[activeProject].number}
                </span>

                <span className="pb-1.5 text-ink/20">
                  / {projects.length.toString().padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>

          {/* Project track */}
          <div ref={trackRef} className="mt-8 flex w-full">
            {projects.map((project) => (
              <article
                key={project.title}
                className="flex w-full shrink-0 items-center"
              >
                <div className="mx-auto grid w-full max-w-7xl grid-cols-[1.15fr_0.85fr] items-center gap-10 px-6 lg:gap-14">
                  {/* Project image */}
                  <div className="aspect-[16/10] max-h-[62vh] w-full overflow-hidden rounded-3xl border border-ink/10 bg-ink/[0.03] shadow-2xl">
                    <img
                      src={project.image}
                      alt={`${project.title} homepage`}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>

                  {/* Project information */}
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand">
                      {project.category}
                    </p>

                    <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] lg:text-5xl">
                      {project.title}
                    </h2>

                    <p className="mt-5 text-sm leading-7 text-ink/50">
                      {project.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.technologies.slice(0, 5).map((technology) => (
                        <span
                          key={technology}
                          className="rounded-full border border-ink/10 px-3 py-1.5 text-xs text-ink/55"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <InteractiveHoverButton
                        href={`/projects/${project.slug}`}
                      >
                        View Case Study
                      </InteractiveHoverButton>

                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2 text-sm font-semibold text-ink transition hover:border-brand/50 hover:text-brand"
                      >
                        Live Project
                        <ArrowUpRight size={17} />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Bottom indicator */}
          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-2">
              {projects.map((project, index) => (
                <div
                  key={project.title}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    activeProject === index
                      ? "w-10 bg-brand"
                      : "w-3 bg-ink/20"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="mx-auto max-w-2xl px-6 py-24 md:hidden">
          <div className="mb-14">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-brand/70">
              Selected Work
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">
              Projects that{" "}
              <Highlighter
                action="underline"
                color="#00ffb2"
                strokeWidth={2}
                animationDuration={700}
                iterations={2}
                padding={2}
                isView
              >
                solve real problems
              </Highlighter>
              .
            </h2>
          </div>

          <div className="space-y-20">
            {projects.map((project) => (
              <article key={project.title} className="project-mobile-card">
                <div className="overflow-hidden rounded-2xl border border-ink/10">
                  <img
                    src={project.image}
                    alt={`${project.title} homepage`}
                    className="w-full object-cover"
                  />
                </div>

                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                  {project.category}
                </p>

                <h3 className="mt-3 text-3xl font-semibold">{project.title}</h3>

                <p className="mt-4 text-sm leading-7 text-ink/50">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full border border-ink/10 px-3 py-1.5 text-xs text-ink/55"
                    >
                      {technology}
                    </span>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <InteractiveHoverButton href={`/projects/${project.slug}`}>
                    View Case Study
                  </InteractiveHoverButton>

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2 text-sm font-semibold"
                  >
                    Live Project
                    <ArrowUpRight size={17} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
