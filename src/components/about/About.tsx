"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Highlighter } from "@/components/ui/highlighter";
import { ProjectVideo } from "@/components/projects/ProjectVideo";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const aboutVideo =
    "https://www.loom.com/share/94eccf3cf5404a88af397d979bb24530";

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        ".about-reveal",
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-[#0a0a0a] px-6 py-10 lg:py-28 text-white md:py-36"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00ffb2]/5 blur-[140px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Heading */}
        <div className="about-reveal mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#00ffb2]/70">
            About Me
          </p>

          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl md:text-6xl">
            Building products across{" "}
            <Highlighter
              action="underline"
              color="#00ffb2"
              strokeWidth={2}
              animationDuration={800}
              iterations={2}
              padding={2}
              isView
            >
              the full stack
            </Highlighter>
            .
          </h2>
        </div>

        {/* Content */}
        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          {/* Description */}
          <div className="about-reveal">
            <p className="text-lg leading-8 text-white/65 md:text-xl">
              I’m a Full-Stack Developer focused on building scalable,
              production-ready web applications from frontend interfaces to
              backend services, databases, authentication, real-time systems,
              and deployment.
            </p>

            <p className="mt-6 text-base leading-7 text-white/50 md:text-lg">
              I enjoy turning complex requirements into clean, maintainable
              solutions while keeping performance, usability, and architecture
              in mind.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              {[
                "Full-Stack Development",
                "REST APIs",
                "Real-Time Applications",
                "Database Design",
                "Authentication",
                "Cloud & Deployment",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/60 transition-colors duration-300 hover:border-[#00ffb2]/40 hover:text-white"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Expertise Card */}
          <div className="about-reveal relative">
            <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-7 backdrop-blur-sm md:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#00ffb2]">
                Core Expertise
              </p>

              <div className="mt-8 space-y-7">
                <Expertise
                  title="Frontend"
                  description="React, Next.js, TypeScript, Tailwind CSS"
                />

                <Expertise
                  title="Backend"
                  description="Node.js, Express.js, NestJS, REST APIs"
                />

                <Expertise
                  title="Data & Infrastructure"
                  description="PostgreSQL, MongoDB, Prisma, Redis, Docker"
                />

                <Expertise
                  title="Real-Time & Services"
                  description="Socket.IO, authentication, Cloudinary, Stripe"
                />
              </div>
            </div>
          </div>
        </div>
        {/* About Video */}
        <div className="about-reveal mx-auto mt-20 max-w-5xl md:mt-28">
          <div className="mb-7 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#00ffb2]">
              A little more about me
            </p>

            <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              Let me introduce myself.
            </h3>
          </div>

          <ProjectVideo src={aboutVideo} />
        </div>
      </div>
    </section>
  );
}

function Expertise({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="border-b border-white/10 pb-5 last:border-0 last:pb-0">
      <h3 className="text-base font-semibold text-white">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-white/45">{description}</p>
    </div>
  );
}
