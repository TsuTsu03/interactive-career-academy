import { PageSkeleton } from "@/components/skeleton";

export default function Loading() {
  return <PageSkeleton variant="list" cards={1} label="Loading the feedback form" />;
}
