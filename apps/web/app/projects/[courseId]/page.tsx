import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectSubmission } from "@/components/project-submission";
import { curriculum, courseById } from "@/content/curriculum";

export function generateStaticParams() {
  return curriculum.courses.map((course) => ({ courseId: course.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseId: string }>;
}): Promise<Metadata> {
  const { courseId } = await params;
  const course = courseById(courseId);
  return {
    title: course ? `${course.project} | Project Draft` : "Project Not Found",
    description: course ? `Prepare repository and live project links for ${course.project}.` : undefined,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const course = courseById(courseId);
  if (!course) notFound();

  return <ProjectSubmission course={course} />;
}
