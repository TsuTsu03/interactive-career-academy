import type { Metadata } from "next";
import { LearnerHome } from "@/components/learner-home";

export const metadata: Metadata = { robots: { index: false, follow: false }, title: "Learner home" };

export default function Page() {
  return <LearnerHome />;
}
