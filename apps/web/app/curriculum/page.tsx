import type { Metadata } from "next";
import { CurriculumMap } from "@/components/curriculum-map";

export const metadata: Metadata = { title: "Curriculum" };

export default function Page() {
  return <CurriculumMap />;
}
