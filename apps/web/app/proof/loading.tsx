import { PageSkeleton } from "@/components/skeleton";

export default function Loading() {
  return <PageSkeleton variant="list" cards={3} label="Loading your proof page" />;
}
