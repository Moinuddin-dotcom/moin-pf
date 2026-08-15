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
const panelsRef = useRef<HTMLElement[]>([]);
  const activeProjectRef = useRef(0);

  const [activeProject, setActiveProject] = useState(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;

    if (!section || !stage) return;

    const context = gsap.context(() => {
      const panels = panelsRef.current.filter(Boolean);

      if (!panels.length) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        gsap.set(panels, {
          opacity: 0,
          scale: 0.94,
          y: 50,
        });

        gsap.set(panels[0], {
          opacity: 1,
          scale: 1,
          y: 0,
        });

        const timeline = gsap.timeline({
          defaults: {
            ease: "power2.inOut",
          },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: `+=${projects.length * 100}%`,
            pin: stage,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,

            onUpdate: (self) => {
              const progress = self.progress;

              const nextIndex = Math.min(
                projects.length - 1,
                Math.floor(progress * projects.length),
              );

              if (nextIndex !== activeProjectRef.current) {
                activeProjectRef.current = nextIndex;
                setActiveProject(nextIndex);
              }
            },
          },
        });

        projects.forEach((_, index) => {
          if (index === 0) return;

          const previousPanel = panels[index - 1];
          const currentPanel = panels[index];

          timeline
            .to(
              previousPanel,
              {
                opacity: 0,
                scale: 0.94,
                y: -40,
                duration: 1,
              },
              index - 1,
            )
            .fromTo(
              currentPanel,
              {
                opacity: 0,
                scale: 0.94,
                y: 50,
              },
              {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 1,
              },
              index - 1,
            );
        });

        return () => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
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
        className="relative bg-[#0a0a0a] text-white"
      >
        {/* Desktop pinned stage */}
        <div
          ref={stageRef}
          className="relative hidden min-h-screen overflow-hidden md:block"
        >
          <div className="mx-auto flex min-h-screen max-w-7xl items-center px-6 py-12 lg:py-24">
            <div className="grid w-full grid-cols-[0.3fr_1fr_0.7fr] items-center gap-8">
              {/* Project number */}
              <div className="self-start pt-20">
                <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#00ffb2]/70">
                  Selected Work
                </p>

                <div className="mt-8 flex items-end gap-2">
                  <span className="text-7xl font-semibold tracking-[-0.06em]">
                    {projects[activeProject].number}
                  </span>

                  <span className="pb-2 text-white/20">
                    / {projects.length.toString().padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* Project panels */}
              <div className="relative aspect-[16/10]">
                {projects.map((project, index) => (
                  <article
                    key={project.title}
                    ref={(element) => {
                      if (element) {
                        panelsRef.current[index] = element;
                      }
                    }}
                    className="absolute inset-0"
                  >
                    <div className="h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-2xl">
                      <img
                        src={project.image}
                        alt={`${project.title} homepage`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </article>
                ))}
              </div>

              {/* Project information */}
              <div className="relative min-h-[420px]">
                {projects.map((project, index) => (
                  <div
                    key={project.title}
                    className={`absolute inset-0 flex flex-col justify-center transition-opacity duration-300 ${
                      activeProject === index
                        ? "pointer-events-auto opacity-100"
                        : "pointer-events-none opacity-0"
                    }`}
                  >
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#00ffb2]">
                      {project.category}
                    </p>

                    <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] lg:text-5xl">
                      {project.title}
                    </h2>

                    <p className="mt-5 text-sm leading-7 text-white/50">
                      {project.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.technologies.slice(0, 5).map((technology) => (
                        <span
                          key={technology}
                          className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/55"
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
                        className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2 text-sm font-semibold text-white transition hover:border-[#00ffb2]/50 hover:text-[#00ffb2]"
                      >
                        Live Project
                        <ArrowUpRight size={17} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-2">
              {projects.map((project, index) => (
                <div
                  key={project.title}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    activeProject === index
                      ? "w-10 bg-[#00ffb2]"
                      : "w-3 bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="mx-auto max-w-2xl px-6 py-24 md:hidden">
          <div className="mb-14">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#00ffb2]/70">
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
                <div className="overflow-hidden rounded-2xl border border-white/10">
                  <img
                    src={project.image}
                    alt={`${project.title} homepage`}
                    className="w-full object-cover"
                  />
                </div>

                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#00ffb2]">
                  {project.category}
                </p>

                <h3 className="mt-3 text-3xl font-semibold">{project.title}</h3>

                <p className="mt-4 text-sm leading-7 text-white/50">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/55"
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
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2 text-sm font-semibold"
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
