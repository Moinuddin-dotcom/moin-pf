import { notFound } from "next/navigation";

import { projects } from "@/data/projects";
import { ProjectDetails } from "@/components/projects/ProjectDetails";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps) {
  const { slug } = await params;

  const project = projects.find(
    (project) => project.slug === slug,
  );

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} | Md. Moinuddin Chowdhury`,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;

  const project = projects.find(
    (project) => project.slug === slug,
  );

  if (!project) {
    notFound();
  }

  return <ProjectDetails project={project} />;
}