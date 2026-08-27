import { notFound } from "next/navigation";
import { CourseGate } from "@/components/course-gate";
import { Workspace } from "@/components/workspace";
import { courseById, curriculum } from "@/content/curriculum";

type Params = { courseId: string };

export function generateStaticParams(): Params[] {
  return curriculum.courses.map((c) => ({ courseId: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { courseId } = await params;
  const course = courseById(courseId);
  return { title: course ? `${course.title} — CodeDaddy` : "CodeDaddy" };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { courseId } = await params;
  const course = courseById(courseId);
  if (!course) notFound();
  return course.requires.length > 0 ? <CourseGate course={course} /> : <Workspace course={course} />;
}
