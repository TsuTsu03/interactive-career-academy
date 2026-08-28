import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseGate } from "@/components/course-gate";
import { Workspace } from "@/components/workspace";
import { StructuredData } from "@/components/structured-data";
import { courseById, curriculum } from "@/content/curriculum";
import { copy } from "@/lib/lesson-ir";
import { pageOpenGraph } from "@/lib/site";
import { courseSchema } from "@/lib/structured-data";

type Params = { courseId: string };

export function generateStaticParams(): Params[] {
  return curriculum.courses.map((c) => ({ courseId: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { courseId } = await params;
  const course = courseById(courseId);
  if (!course) return { title: "CodeDaddy" };

  const title = course.title;
  const description = copy(course.summary);

  return {
    title,
    description,
    alternates: { canonical: `/learn/${course.id}` },
    openGraph: pageOpenGraph({
      url: `/learn/${course.id}`,
      title: `${title} | CodeDaddy`,
      description,
    }),
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { courseId } = await params;
  const course = courseById(courseId);
  if (!course) notFound();
  return (
    <>
      <StructuredData data={courseSchema(course)} />
      {course.requires.length > 0 ? <CourseGate course={course} /> : <Workspace course={course} />}
    </>
  );
}
