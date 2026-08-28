import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PracticeWorkspace } from "@/components/practice-workspace";
import { capstones } from "@/content/capstones";
import { pageOpenGraph } from "@/lib/site";

export function generateStaticParams() { return capstones.map((capstone) => ({ capstoneId: capstone.id })); }

export async function generateMetadata({ params }: { params: Promise<{ capstoneId: string }> }): Promise<Metadata> {
  const { capstoneId } = await params;
  const capstone = capstones.find((item) => item.id === capstoneId);
  if (!capstone) return { title: "Capstone" };

  return {
    title: `${capstone.title} capstone`,
    description: capstone.summary,
    alternates: { canonical: `/capstones/${capstone.id}` },
    openGraph: pageOpenGraph({
      url: `/capstones/${capstone.id}`,
      title: `${capstone.title} capstone | CodeDaddy`,
      description: capstone.summary,
    }),
  };
}
export default async function CapstonePage({ params }: { params: Promise<{ capstoneId: string }> }) {
  const { capstoneId } = await params;
  const capstone = capstones.find((item) => item.id === capstoneId);
  if (!capstone) notFound();
  return <PracticeWorkspace activity={capstone} />;
}
