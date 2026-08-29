import { PageSkeleton } from "@/components/skeleton";

export default function Loading() {
  return <PageSkeleton variant="list" cards={2} label="Loading your review session" />;
}
