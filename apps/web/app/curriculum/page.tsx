import type { Metadata } from "next";
import { CurriculumMap } from "@/components/curriculum-map";
import { StructuredData } from "@/components/structured-data";
import { pageOpenGraph } from "@/lib/site";
import { breadcrumbSchema, curriculumSchema } from "@/lib/structured-data";

const DESCRIPTION =
  "Explore web design, front-end development, and browser database lessons, followed by planned courses for development on your own computer.";

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
