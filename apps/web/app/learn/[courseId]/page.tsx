import Link from "next/link";
import { Icon } from "@/components/icon";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseGate } from "@/components/course-gate";
import { ComputerPrerequisite } from "@/components/computer-prerequisite";
import { Workspace } from "@/components/workspace";
import { StructuredData } from "@/components/structured-data";
import { courseById, curriculum } from "@/content/curriculum";
import { copy } from "@/lib/lesson-ir";
import { pageOpenGraph } from "@/lib/site";
import { breadcrumbSchema, courseSchema } from "@/lib/structured-data";

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
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Curriculum", path: "/curriculum" },
          { name: course.title, path: `/learn/${course.id}` },
        ])}
      />
      <StructuredData data={courseSchema(course)} />
      {course.requiresComputer && <aside className="mx-auto max-w-3xl border-b border-outline-variant px-5 py-5" aria-label="Course device prerequisite"><ComputerPrerequisite /></aside>}
      {course.steps.length === 0 ? (
        <main className="mx-auto max-w-3xl px-5 py-12">
          <h1 className="font-display text-3xl font-bold">{course.title}</h1>
          <p className="mt-4 flex items-center gap-2"><Icon name="schedule" size={18} />Lessons are being prepared.</p>
          <p className="mt-4 text-on-surface-variant">{copy(course.summary)}</p>
          <h2 className="mt-8 text-xl font-bold">Planned projects</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">{course.projects.map(project => <li key={project.id}>{project.title}</li>)}</ul>
          <Link className="mt-8 inline-flex min-h-11 items-center underline" href="/curriculum">Back to the course map</Link>
        </main>
      ) : course.requires.length > 0 ? <CourseGate course={course} /> : <Workspace course={course} />}
    </>
  );
}
