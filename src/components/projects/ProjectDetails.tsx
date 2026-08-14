"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Play,
  X,
} from "lucide-react";

import { Highlighter } from "@/components/ui/highlighter";
import { ProjectVideo } from "@/components/projects/ProjectVideo";

gsap.registerPlugin(ScrollTrigger);


type Project = (typeof import("@/data/projects").projects)[number];

interface ProjectDetailsProps {
  project: Project;
}

export function ProjectDetails({
  project,
}: ProjectDetailsProps) {
 const pageRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLElement>(null);

  const [selectedImage, setSelectedImage] = useState<string | null>(
    null,
  );

  

  useLayoutEffect(() => {
    const gallery = galleryRef.current;

if (!gallery) return;

const galleryItems = gallery.querySelectorAll(
  ".project-gallery-item",
);

gsap.fromTo(
  galleryItems,
  {
    opacity: 0,
    y: 60,
    scale: 0.97,
  },
  {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.8,
    stagger: 0.12,
    ease: "power3.out",
    scrollTrigger: {
      trigger: gallery,
      start: "top 75%",
      once: true,
    },
  },
);
    const page = pageRef.current;

    if (!page) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .from(".project-back", {
          opacity: 0,
          x: -20,
          duration: 0.5,
        })
        .from(
          ".project-category",
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
          },
          "-=0.2",
        )
        .from(
          ".project-title",
          {
            opacity: 0,
            y: 50,
            duration: 0.9,
          },
          "-=0.3",
        )
        .from(
          ".project-description",
          {
            opacity: 0,
            y: 25,
            duration: 0.7,
          },
          "-=0.5",
        )
        .from(
          ".project-hero-image",
          {
            opacity: 0,
            scale: 0.96,
            y: 30,
            duration: 1,
          },
          "-=0.4",
        );
    }, page);

    return () => context.revert();
  }, []);

  const galleryImages = [project.image, ...project.gallery];

  return (
    <>
      <main
        ref={pageRef}
        className="min-h-screen overflow-hidden bg-[#0a0a0a] text-white"
      >
        {/* Navigation */}
        <header className="project-back sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl">
          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6">
            <Link
              href="/#projects"
              className="group inline-flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
            >
              <ArrowLeft
                size={18}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />

              <span>Back to Projects</span>
            </Link>

            <span className="text-sm font-medium text-white/30">
              {project.number}
            </span>
          </div>
        </header>

        {/* Hero */}
        <section className="px-5 pb-20 pt-20 sm:px-6 md:pb-28 md:pt-28">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-4xl">
              <p className="project-category text-xs font-semibold uppercase tracking-[0.3em] text-[#00ffb2] sm:text-sm">
                {project.category}
              </p>

              <h1 className="project-title mt-5 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-6xl md:text-8xl">
                {project.title}
              </h1>

              <p className="project-description mt-8 max-w-3xl text-base leading-8 text-white/60 sm:text-lg">
  <Highlighter
    action="highlight"
    color="#00ffb2"
    strokeWidth={1.5}
    animationDuration={700}
    iterations={2}
    padding={3}
    multiline
    isView
  >
    {project.description}
  </Highlighter>
</p>
            </div>

            {/* Hero image */}
            <div className="project-hero-image mt-12 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-2xl sm:mt-16 sm:rounded-3xl">
              <img
                src={project.image}
                alt={`${project.title} homepage`}
                className="block h-auto w-full"
              />
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="border-y border-white/10 px-5 py-20 sm:px-6 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Features */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#00ffb2]">
                What I Built
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                Building a complete product ecosystem.
              </h2>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-4 text-sm text-white/65"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#00ffb2]/10">
                      <Check
                        size={14}
                        className="text-[#00ffb2]"
                      />
                    </span>

                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#00ffb2]">
                Technology
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                Built with a modern stack.
              </h2>

              <div className="mt-8 flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white/65 transition-colors hover:border-[#00ffb2]/30 hover:text-[#00ffb2]"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Video */}
        {project.video && (
          <section className="px-5 py-20 sm:px-6 md:py-28">
            <div className="mx-auto max-w-7xl">
              <div className="flex items-center gap-3">
                <Play
                  size={17}
                  className="fill-[#00ffb2] text-[#00ffb2]"
                />

                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50">
                  Project Walkthrough
                </p>
              </div>

              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
                See it in action.
              </h2>

              <div className="mt-8">
                <ProjectVideo src={project.video} />
              </div>
            </div>
          </section>
        )}

        {/* Gallery */}
       {galleryImages.length > 1 && (
  <section
    ref={galleryRef}
    className="px-5 py-20 sm:px-6 md:py-28"
  >
    <div className="mx-auto max-w-7xl">
      {/* Heading */}
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#00ffb2]">
            Project Gallery
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Explore the platform.
          </h2>
        </div>

        <p className="max-w-md text-sm leading-6 text-white/40">
          A closer look at the interfaces and product experiences
          I worked on.
        </p>
      </div>

      {/* Gallery */}
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {galleryImages.map((image, index) => {
          const imageName = image
            .split("/")
            .pop()
            ?.replace(/\.[^/.]+$/, "")
            .replace(/[-_]/g, " ");

          const title =
            index === 0
              ? "Project Overview"
              : imageName
                ? imageName
                    .split(" ")
                    .map(
                      (word) =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1),
                    )
                    .join(" ")
                : `Project Screen ${index + 1}`;

          return (
            <button
              key={image}
              type="button"
              onClick={() => setSelectedImage(image)}
              className={`project-gallery-item group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] text-left sm:rounded-3xl ${
                index === 0 ? "md:col-span-2" : ""
              }`}
            >
              {/* Image */}
              <img
                src={image}
                alt={`${project.title} — ${title}`}
                className="block h-auto w-full transition duration-700 ease-out group-hover:scale-[1.025]"
              />

              {/* Gradient */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Image information */}
              <div className="absolute inset-x-0 bottom-0 flex translate-y-3 items-end justify-between gap-4 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:p-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#00ffb2]">
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <p className="mt-1 text-sm font-semibold text-white sm:text-base">
                    {title}
                  </p>
                </div>

                <span className="shrink-0 rounded-full border border-white/15 bg-black/30 px-3 py-1.5 text-xs text-white/70 backdrop-blur-md">
                  View
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  </section>
)}

        {/* Bottom CTA */}
        <section className="px-5 pb-20 pt-10 sm:px-6 md:pb-28">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-8 rounded-3xl border border-white/10 bg-white/[0.025] p-7 sm:p-10 md:flex-row md:items-center md:justify-between md:p-12">
              <div>
                <p className="text-sm text-white/35">
                  Want to explore the live product?
                </p>

                <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
                  Visit {project.title}.
                </h2>
              </div>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-[#00ffb2] px-6 py-3 text-sm font-semibold text-black transition duration-300 hover:scale-[1.03]"
                >
                  Visit Live Project
                  <ArrowUpRight size={17} />
                </a>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Image Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Project screenshot preview"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            aria-label="Close image preview"
            className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
          >
            <X size={20} />
          </button>

          <img
            src={selectedImage}
            alt={`${project.title} enlarged screenshot`}
            className="max-h-[90vh] max-w-[95vw] rounded-xl object-contain shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}