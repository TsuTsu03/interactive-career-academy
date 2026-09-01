import type { Metadata } from "next";
import { PracticeScreen } from "@/components/practice-screen";
import { StructuredData } from "@/components/structured-data";
import { pageOpenGraph } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/structured-data";

const DESCRIPTION =
  "Optional rebuild and debugging activities that use CodeDaddy's existing browser checks. Practise a skill from an earlier course without starting a new project.";

export const metadata: Metadata = {
  title: "Practice Lab",
  description: DESCRIPTION,
  alternates: { canonical: "/practice" },
  openGraph: pageOpenGraph({
    url: "/practice",
    title: "Practice Lab | CodeDaddy",
    description: DESCRIPTION,
  }),
};

export default function PracticePage() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Practice Lab", path: "/practice" },
        ])}
      />
      <PracticeScreen />
    </>
  );
}
