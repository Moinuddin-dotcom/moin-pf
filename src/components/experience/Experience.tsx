"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BriefcaseBusiness, MapPin } from "lucide-react";

import { Highlighter } from "@/components/ui/highlighter";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    period: "Present",
    role: "Full Stack Developer",
    company: "Pixel & Code",
    location: "Chattogram, Bangladesh",
    type: "Professional Experience",

    description:
      "Working on modern, production-ready web applications and full-stack product experiences, contributing across frontend interfaces, backend services, databases, authentication, real-time systems, and deployment.",

    highlights: [
      "React & Next.js application development",
      "TypeScript-based application architecture",
      "Full-stack feature development",
      "E-commerce and marketplace solutions",
      "Reusable and scalable UI components",
      "Real-time application features",
    ],

    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "NestJS",
      "PostgreSQL",
      "MongoDB",
      "Prisma",
      "Redis",
      "Docker",
      "Socket.IO",
      "NextAuth",
      "Cloudinary",
      "Stripe",
    ],
  },

  {
    period: "April 2021 — October 2025",
    role: "Assistant Manager — Admin & Modern Facility",
    company: "Scarlett Management Services",
    companyContext: "Under Robi Axiata PLC",
    location: "Chattogram, Bangladesh",
    type: "Professional Experience",

    description:
      "Managed administrative and facility operations while supporting employees, branch offices, infrastructure, vendors, transportation, and day-to-day operational continuity.",

    highlights: [
      "Supported operations across 32 branch offices",
      "Managed daily administration and facility operations",
      "Supported employee and workplace requirements",
      "Coordinated maintenance and infrastructure management",
      "Managed transportation and operational scheduling",
      "Managed inventory, vendors, petty cash, and budgeting",
      "Supported operational continuity and workplace services",
    ],

    technologies: [
      "Administration",
      "Operations",
      "Facility Management",
      "Vendor Management",
      "Inventory Management",
      "Budget Management",
      "Transportation Management",
      "Team Coordination",
    ],
  },
];

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const context = gsap.context(() => {
      // Experience content reveal
      gsap.fromTo(
        ".experience-reveal",
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Timeline progress
      gsap.fromTo(
        ".experience-line",
        {
          scaleY: 0,
        },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "power3.out",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
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
      id="experience"
      className="relative overflow-hidden bg-[#0a0a0a] px-6 py-12 lg:py-28 text-white "
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-200px] top-1/3 h-[500px] w-[500px] rounded-full bg-[#00ffb2]/5 blur-[150px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="experience-reveal max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#00ffb2]/70">
            Experience
          </p>

          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl md:text-6xl">
            Where I&apos;ve worked and{" "}
            <Highlighter
              action="underline"
              color="#00ffb2"
              strokeWidth={2}
              animationDuration={800}
              iterations={2}
              padding={2}
              isView
            >
              what I&apos;ve built
            </Highlighter>
            .
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-7 text-white/50 sm:text-lg">
            A combination of software development and professional
            operations experience that shaped how I approach products,
            systems, and problem solving.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="relative mt-20 md:mt-28">
          {/* Timeline */}
          <div
            aria-hidden="true"
            className="absolute left-[7px] top-2 hidden h-[calc(100%-10px)] w-px bg-white/10 md:block"
          >
            <div className="experience-line h-full w-full origin-top bg-[#00ffb2]/60" />
          </div>

          <div className="space-y-16 md:space-y-24">
            {experiences.map((experience) => (
              <article
                key={`${experience.company}-${experience.role}`}
                className="experience-reveal relative md:pl-16"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-1 hidden h-4 w-4 items-center justify-center rounded-full border border-[#00ffb2]/50 bg-[#0a0a0a] md:flex">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00ffb2]" />
                </div>

                <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-16">
                  {/* Period */}
                  <div>
                    <p className="text-sm font-medium text-[#00ffb2]">
                      {experience.period}
                    </p>

                    <div className="mt-3 flex items-center gap-2 text-xs text-white/35">
                      <BriefcaseBusiness size={14} />
                      {experience.type}
                    </div>
                  </div>

                  {/* Experience Card */}
                  <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-8 md:p-10">
                    {/* Header */}
                    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                      <div>
                        <h3 className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                          {experience.role}
                        </h3>

                        <p className="mt-2 text-base font-medium text-white/60">
                          {experience.company}
                        </p>

                        {experience.companyContext && (
                          <p className="mt-1 text-sm text-white/35">
                            {experience.companyContext}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-white/35">
                        <MapPin size={15} />
                        {experience.location}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="mt-7 max-w-3xl text-base leading-7 text-white/55">
                      {experience.description}
                    </p>

                    {/* Highlights */}
                    <div className="mt-8 grid gap-3 sm:grid-cols-2">
                      {experience.highlights.map((highlight) => (
                        <div
                          key={highlight}
                          className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm leading-6 text-white/55 transition-colors duration-300 hover:border-[#00ffb2]/20 hover:text-white/70"
                        >
                          {highlight}
                        </div>
                      ))}
                    </div>

                    {/* Technology / Skill Tags */}
                    <div className="mt-8 flex flex-wrap gap-2">
                      {experience.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/45 transition-colors duration-300 hover:border-[#00ffb2]/30 hover:text-[#00ffb2]"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}