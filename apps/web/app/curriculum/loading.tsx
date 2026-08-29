import { PageSkeleton } from "@/components/skeleton";

export default function Loading() {
  return <PageSkeleton variant="list" cards={4} label="Loading the curriculum" />;
}
