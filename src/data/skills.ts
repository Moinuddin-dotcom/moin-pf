import {
  siReact,
  siNextdotjs,
  siTypescript,
  siJavascript,
  siTailwindcss,
  siNodedotjs,
  siExpress,
  siNestjs,
  siSocketdotio,
  siPostgresql,
  siMongodb,
  siPrisma,
  siRedis,
  siDocker,
  siGit,
  siGithub,
  siFirebase,
  siCloudinary,
  siStripe,
} from "simple-icons";

export const skills = [
  {
    name: "React",
    icon: siReact,
    category: "Frontend",
  },
  {
    name: "Next.js",
    icon: siNextdotjs,
    category: "Frontend",
  },
  {
    name: "TypeScript",
    icon: siTypescript,
    category: "Frontend",
  },
  {
    name: "JavaScript",
    icon: siJavascript,
    category: "Frontend",
  },
  {
    name: "Tailwind CSS",
    icon: siTailwindcss,
    category: "Frontend",
  },

  {
    name: "Node.js",
    icon: siNodedotjs,
    category: "Backend",
  },
  {
    name: "Express.js",
    icon: siExpress,
    category: "Backend",
  },
  {
    name: "NestJS",
    icon: siNestjs,
    category: "Backend",
  },
  {
    name: "Socket.IO",
    icon: siSocketdotio,
    category: "Backend",
  },

  {
    name: "PostgreSQL",
    icon: siPostgresql,
    category: "Database",
  },
  {
    name: "MongoDB",
    icon: siMongodb,
    category: "Database",
  },
  {
    name: "Prisma",
    icon: siPrisma,
    category: "Database",
  },
  {
    name: "Redis",
    icon: siRedis,
    category: "Database",
  },

  {
    name: "Docker",
    icon: siDocker,
    category: "Tools",
  },
  {
    name: "Git",
    icon: siGit,
    category: "Tools",
  },
  {
    name: "GitHub",
    icon: siGithub,
    category: "Tools",
  },
  {
    name: "Firebase",
    icon: siFirebase,
    category: "Services",
  },
  {
    name: "Cloudinary",
    icon: siCloudinary,
    category: "Services",
  },
  {
    name: "Stripe",
    icon: siStripe,
    category: "Services",
  },
] as const;