import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CapstoneSubmission } from "@/components/capstone-submission";
import { capstones } from "@/content/capstones";

export function generateStaticParams() {
  return capstones.map((capstone) => ({ capstoneId: capstone.id }));
}

export const metadata: Metadata = {
  title: "Submit a capstone project",
  description: "Record the repository and live links for a finished capstone project.",
  robots: { index: false, follow: false },
};

export default async function CapstoneSubmissionPage({ params }: { params: Promise<{ capstoneId: string }> }) {
  const { capstoneId } = await params;
  const capstone = capstones.find((item) => item.id === capstoneId);
  if (!capstone) notFound();
  return <CapstoneSubmission capstone={capstone} />;
}
