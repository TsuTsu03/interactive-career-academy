import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PracticeWorkspace } from "@/components/practice-workspace";
import { practiceActivities } from "@/content/practice-activities";
import { StructuredData } from "@/components/structured-data";
import { pageOpenGraph } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/structured-data";

export function generateStaticParams() {
  return practiceActivities.map((activity) => ({ activityId: activity.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ activityId: string }> }): Promise<Metadata> {
  const { activityId } = await params;
  const activity = practiceActivities.find((item) => item.id === activityId);
  if (!activity) return { title: "Practice" };

  return {
    title: activity.title,
    description: activity.summary,
    alternates: { canonical: `/practice/${activity.id}` },
    openGraph: pageOpenGraph({
      url: `/practice/${activity.id}`,
      title: `${activity.title} | CodeDaddy`,
      description: activity.summary,
    }),
  };
}
export default async function PracticeActivityPage({ params }: { params: Promise<{ activityId: string }> }) {
  const { activityId } = await params;
  const activity = practiceActivities.find((item) => item.id === activityId);
  if (!activity) notFound();
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Practice Lab", path: "/practice" },
          { name: activity.title, path: `/practice/${activity.id}` },
        ])}
      />
      <PracticeWorkspace activity={activity} />
    </>
  );
}
