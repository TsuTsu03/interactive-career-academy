import type { Metadata } from "next";
import { PracticeScreen } from "@/components/practice-screen";

export const metadata: Metadata = {
  title: "Practice Lab",
  description: "Optional rebuild and debugging activities that use CodeDaddy's existing browser checks.",
};

export default function PracticePage() {
  return <PracticeScreen />;
}
