"use client";

import React from "react";
import { IconCloud } from "@/components/ui/icon-cloud";
import { Highlighter } from "@/components/ui/highlighter";
import { skills } from "@/data/skills";

function createIcon(
  path: string,
  title: string,
  color: string,
) {
  return (
    <svg
      key={title}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="100"
      height="100"
      fill={`#${color}`}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <path d={path} />
    </svg>
  );
}

export function Skills() {
 const icons = skills.map((skill) =>
  createIcon(
    skill.icon.path,
    skill.name,
    skill.icon.hex,
  ),
);

  return (
    <section
      id="skills"
      className="relative min-h-screen overflow-hidden bg-surface px-6 md:py-24 text-ink"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-brand/70">
            My Tech Stack
          </p>

          <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Tools I use to{" "}
            <Highlighter
              action="underline"
              color="#00ffb2"
              strokeWidth={2}
              animationDuration={700}
              iterations={2}
              padding={2}
              isView
            >
              build
            </Highlighter>{" "}
            full-stack products.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-ink/55 sm:text-lg">
            A modern stack for building interactive interfaces, scalable APIs,
            real-time systems, data-driven applications, and production
            infrastructure.
          </p>
        </div>

        {/* Icon Cloud */}
       <div className="relative  mx-auto mt-8 flex h-[250px] md:h-[300px] lg:h-[400px] w-full max-w-[550px] items-center justify-center">
  <IconCloud
    icons={icons}
    showControl={false}
  />
</div>

        {/* Skill categories */}
        <div className="mx-auto grid max-w-5xl gap-4 md:gap-6 grid-cols-2 lg:grid-cols-4">
          <SkillCategory
            title="Frontend"
            items={[
              "React",
              "Next.js",
              "TypeScript",
              "JavaScript",
              "Tailwind CSS",
            ]}
          />

          <SkillCategory
            title="Backend"
            items={[
              "Node.js",
              "Express.js",
              "NestJS",
              "Socket.IO",
            ]}
          />

          <SkillCategory
            title="Database"
            items={[
              "PostgreSQL",
              "MongoDB",
              "Prisma",
              "Redis",
            ]}
          />

          <SkillCategory
            title="Tools & Services"
            items={[
              "Docker",
              "Git",
              "GitHub",
              "Firebase",
              "Cloudinary",
              "Stripe",
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function SkillCategory({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-ink/[0.02] p-6">
      <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
        {title}
      </h3>

      <ul className="mt-5 space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="text-sm text-ink/60 transition-colors hover:text-ink"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}