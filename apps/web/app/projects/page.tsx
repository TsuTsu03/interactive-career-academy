import type { Metadata } from "next";
import { ProjectsScreen } from "@/components/projects-screen";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Projects",
  description: "Track course projects and prepare repository and live project links.",
};

export default function ProjectsPage() {
  return <ProjectsScreen />;
}
