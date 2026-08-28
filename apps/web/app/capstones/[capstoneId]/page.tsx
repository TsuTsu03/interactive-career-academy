import { notFound } from "next/navigation";
import { PracticeWorkspace } from "@/components/practice-workspace";
import { capstones } from "@/content/capstones";

export function generateStaticParams() { return capstones.map((capstone) => ({ capstoneId: capstone.id })); }
export default async function CapstonePage({ params }: { params: Promise<{ capstoneId: string }> }) {
  const { capstoneId } = await params;
  const capstone = capstones.find((item) => item.id === capstoneId);
  if (!capstone) notFound();
  return <PracticeWorkspace activity={capstone} />;
}
