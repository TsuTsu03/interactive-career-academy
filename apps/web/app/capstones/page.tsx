import type { Metadata } from "next";
import { CapstonesScreen } from "@/components/capstones-screen";
import { StructuredData } from "@/components/structured-data";
import { pageOpenGraph } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/structured-data";

const DESCRIPTION =
  "Five independent front-end project briefs with automated acceptance checks. Build each one your own way and let the browser checks tell you when it meets the brief.";

export const metadata: Metadata = {
  title: "Front-End Capstones",
  description: DESCRIPTION,
  alternates: { canonical: "/capstones" },
  openGraph: pageOpenGraph({
    url: "/capstones",
    title: "Front-End Capstones | CodeDaddy",
    description: DESCRIPTION,
  }),
};

export default function CapstonesPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Capstones", path: "/capstones" },
        ])}
      />
      <CapstonesScreen />
    </>
  );
}
