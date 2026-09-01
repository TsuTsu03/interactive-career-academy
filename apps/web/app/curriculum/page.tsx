import type { Metadata } from "next";
import { CurriculumMap } from "@/components/curriculum-map";
import { StructuredData } from "@/components/structured-data";
import { pageOpenGraph } from "@/lib/site";
import { breadcrumbSchema, curriculumSchema } from "@/lib/structured-data";

const DESCRIPTION =
  "The full CodeDaddy path: ten courses from page structure and design judgment through CSS, JavaScript, the DOM, Tailwind, React, TypeScript, and testing.";

export const metadata: Metadata = {
  title: "Curriculum",
  description: DESCRIPTION,
  alternates: { canonical: "/curriculum" },
  openGraph: pageOpenGraph({
    url: "/curriculum",
    title: "Curriculum | CodeDaddy",
    description: DESCRIPTION,
  }),
};

export default function Page() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Curriculum", path: "/curriculum" },
        ])}
      />
      <StructuredData data={curriculumSchema()} />
      <CurriculumMap />
    </>
  );
}
