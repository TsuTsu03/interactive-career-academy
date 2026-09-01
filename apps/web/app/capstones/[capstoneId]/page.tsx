import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PracticeWorkspace } from "@/components/practice-workspace";
import { capstones } from "@/content/capstones";
import { StructuredData } from "@/components/structured-data";
import { pageOpenGraph } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/structured-data";

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
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Capstones", path: "/capstones" },
          { name: capstone.title, path: `/capstones/${capstone.id}` },
        ])}
      />
      <PracticeWorkspace activity={capstone} />
    </>
  );
}
