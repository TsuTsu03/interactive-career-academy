import { notFound } from "next/navigation";
import { PracticeWorkspace } from "@/components/practice-workspace";
import { practiceActivities } from "@/content/practice-activities";

export function generateStaticParams() {
  return practiceActivities.map((activity) => ({ activityId: activity.id }));
}
export default async function PracticeActivityPage({ params }: { params: Promise<{ activityId: string }> }) {
  const { activityId } = await params;
  const activity = practiceActivities.find((item) => item.id === activityId);
  if (!activity) notFound();
  return <PracticeWorkspace activity={activity} />;
}
