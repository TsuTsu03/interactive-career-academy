import type { Metadata } from "next";
import { LearningTools } from "@/components/learning-tools";

export const metadata: Metadata = {
  title: "Learning tools",
  description: "Carry CodeDaddy progress between browsers and plan a study session that fits your available time.",
};

export default function ToolsPage() {
  return <LearningTools />;
}
