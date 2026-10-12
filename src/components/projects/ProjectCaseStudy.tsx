"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Play, X } from "lucide-react";
import { ProjectVideo } from "./ProjectVideo";

type Project = {
  number: string;
  title: string;
  category: string;
  description: string;
  technologies: readonly string[];
  image: string;
  gallery: readonly string[];
  video: string;
  liveUrl: string;
  githubUrl: string;
  features: readonly string[];
};

interface ProjectCaseStudyProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectCaseStudy({
  project,
  onClose,
}: ProjectCaseStudyProps) {
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    if (!project) return;

    setActiveImage(project.image);

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const galleryImages = [project.image, ...project.gallery];

  return (
    <div
      className="fixed inset-0 z-[100] overflow-y-auto bg-surface/95 backdrop-blur-xl"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
    >
      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close case study"
        className="fixed right-5 top-5 z-[110] flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-ink/5 text-ink transition hover:bg-ink/10"
      >
        <X size={20} />
      </button>

      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        {/* Header */}
        <div className="max-w-4xl">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-brand">
            {project.number} / Case Study
          </p>

          <h2 className="mt-5 text-5xl font-semibold tracking-[-0.05em] text-ink sm:text-6xl md:text-8xl">
            {project.title}
          </h2>

          <p className="mt-4 text-xl text-ink/50">
            {project.category}
          </p>

          <p className="mt-8 max-w-3xl text-base leading-8 text-ink/65 sm:text-lg">
            {project.description}
          </p>
        </div>

        {/* Main image */}
        <div className="mt-14 overflow-hidden rounded-3xl border border-ink/10 bg-ink/[0.03]">
          <img
            src={activeImage}
            alt={`${project.title} project preview`}
            className="block h-auto w-full object-cover"
          />
        </div>

        {/* Gallery */}
        <div className="mt-5 flex gap-3 overflow-x-auto pb-2">
          {galleryImages.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActiveImage(image)}
              className={`shrink-0 overflow-hidden rounded-xl border transition ${
                activeImage === image
                  ? "border-brand"
                  : "border-ink/10 opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={image}
                alt={`${project.title} screenshot ${index + 1}`}
                className="h-20 w-32 object-cover"
              />
            </button>
          ))}
        </div>

        {/* Information */}
        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1fr]">
          {/* Features */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">
              What I built
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {project.features.map((feature) => (
                <div
                  key={feature}
                  className="rounded-xl border border-ink/10 bg-ink/[0.025] px-4 py-4 text-sm text-ink/65"
                >
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">
              Technology
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-ink/10 bg-ink/[0.03] px-4 py-2 text-sm text-ink/65"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Video */}
       {project.video && (
  <div className="mt-16">
    <div className="flex items-center gap-3">
      <Play size={18} className="text-brand" />

      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/70">
        Project Walkthrough
      </p>
    </div>

    <div className="mt-6">
      <ProjectVideo src={project.video} />
    </div>
  </div>
)}

        {/* Live project */}
        {project.liveUrl && (
          <div className="mt-16 flex flex-wrap gap-4">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-black transition hover:scale-[1.02]"
            >
              Visit Live Project
              <ArrowUpRight size={17} />
            </a>

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink transition hover:bg-ink/5"
              >
                View GitHub
                <ArrowUpRight size={17} />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}